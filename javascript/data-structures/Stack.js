class Stack {
  #dataset;
  constructor() {
    this.#dataset = [];
  }
  data() {
    return this.#dataset.toString();
  }
  add(data) {
    this.#dataset.push(data);
  }
  get() {
    return this.#size != 0 ? this.#dataset.pop() : -1;
  }
  clear() {
    this.#dataset = [];
  }
  peek() {
    return this.#dataset[this.#dataset.length - 1];
  }
  empty() {
    return this.#dataset.length == 0 ? true : false;
  }
  #size() {
    return this.#dataset.length;
  }
}
