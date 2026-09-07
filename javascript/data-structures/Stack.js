export class Stack {
  #dataset;
  constructor() {
    this.#dataset = [];
  }
  add(data) {
    this.#dataset.push(data);
  }
  get() {
    return this.#dataset.pop();
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
}
