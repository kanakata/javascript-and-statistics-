class Stack {
  #dataset = [];
  top = 0;
  add(data) {
    this.#dataset[this.top++] = data;
  }

  size() {
    return this.top;
  }

  peek() {
    return this.#dataset[this.top - 1];
  }

  get() {
    if (this.#dataset.length == 0) return 'empty';
    return this.#dataset[--this.top];
  }

  clear() {
    this.#dataset = [];
    this.top = 0;
  }
}

class Queue {
  #dataset = [];
  #count = 0;
  print() {
    return this.#dataset;
  }
  enqueue(element) {
    this.#dataset.push(element);
  }
  dequeue() {
    return this.#dataset.shift();
  }
  front() {
    return this.#dataset[0];
  }
  count() {
    return this.#dataset.length;
  }
  isEmpty() {
    return this.count() == 0;
  }
}

class PriorityQueue {
  #dataset = [];
  print() {
    return this.#dataset;
  }
  enqueue(array) {
    if (this.isEmpty()) {
      this.#dataset.push(array);
    } else {
      let added = false;
      for (let i = 0; i < this.#dataset.length; i++) {
        if (array[1] < this.#dataset[i][1]) {
          this.#dataset.slice(i, 0, array);
          added = true;
          break;
        }
      }

      if (!added) {
        this.#dataset.push(array);
      }
    }
  }
  dequeue() {
    return this.#dataset.shift()[0];
  }
  front() {
    return this.#dataset[0];
  }
  count() {
    return this.#dataset.length;
  }
  isEmpty() {
    return this.count() == 0;
  }
}

class Set {
  #dataset = [];

  values() {
    return this.#dataset;
  }

  has(element) {
    return this.#dataset.indexOf(element) !== -1;
  }

  add(element) {
    if (!this.has(element)) {
      this.#dataset.push(element);
      return true;
    }
    return false;
  }

  remove(element) {
    if (this.has(element)) {
      const index = this.#dataset.indexOf(element);
      this.#dataset.splice(index, 1);
      return true;
    }
    return false;
  }

  size() {
    return this.#dataset.length;
  }

  union(set) {}
}

class HashTable {
  constructor(params) {
    this.table = new Array(137);
    this.size = 0;
  }
  hash(key) {
    const H = 37;
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += H * total + key.charCodeAt(i);
    }
    return total % this.table.length;
  }

  add(key, value) {
    const index = this.hash(key);

    this.size++;
  }
  delete(key) {
    const index = this.hash(key);
    let current = this.table[index];
    return false;
  }
}