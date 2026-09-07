class Statistics {
  #data;
  constructor(data) {
    this.#data = data;
  }

  #copy(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);
    }
    return result;
  }

  #output(data, precision = 2) {
    return Number(data.toFixed(precision));
  }

  #root(number, root) {
    return Math.pow(number, 1 / root);
  }

  arithmeticMean() {
    let array = this.#copy(this.#data);

    let sum = 0;

    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return this.#output(sum / array.length, 2);
  }

  geometricMean() {
    let array = this.#copy(this.#data);
    let product = 0;
    for (let i = 0; i < array.length; i++) {
      if (product == 0) {
        product = 1 * array[i];
      } else {
        product = product * array[i];
      }
    }
    return this.#output(this.#root(product, array.length), 2);
  }

  harmonicMean() {
    let array = this.#copy(this.#data);
    let n = array.length;

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += 1 / array[i];
    }
    return this.#output(n / sum, 2);
  }

  probabilityMean(probabilities) {
    if (probabilities.length != this.#data.length) {
      throw Error(
        'The set of probabilities do not match the set of data provided.'
      );
    } else {
      let array = this.#copy(this.#data);
      let mean = 0;
      for (let i = 0; i < probabilities.length; i++) {
        mean += array[i] * probabilities[i];
      }
      return mean;
    }
  }

  median() {
    const array = this.#copy(this.#data);
    array.sort();
    if (array.length == 2) {
      let mode = 0;
      for (let i = 0; i < array.length; i++) {
        mode += array[i];
      }
      return mode / 2;
    } else if (array.length % 2 == 0) {
      let mode = 0;
      for (let i = 0; i <= array.length - 2; i++) {
        array.pop();
        array.shift();
      }

      for (let i = 0; i < array.length; i++) {
        mode += array[i];
      }
      return mode / 2;
    } else {
      for (let i = 0; i < array.length - 1; i++) {
        array.pop();
        array.shift();
      }

      return array[0];
    }
  }

  mode() {
    const array = this.#copy(this.#data);
    const len = array.length;
    let dict = {};
    for (let i = 0; i < len; i++) {
      if (array.length == 0) break;
      let element = array[0];
      dict[element] = 1;
      array.splice(0, 1);

      for (let j = 0; j <= array.length; j++) {
        if (array.indexOf(element) != -1) {
          dict[element] += 1;
          let pos = array.indexOf(element);
          array.splice(pos, 1);
        } else {
          continue;
        }
      }
    }

    let max = Object.values(dict).sort().pop();
    if (max == 1) {
      return 'There is no mode';
    } else {
      for (let property in dict) {
        if (dict[property] == max) {
          return Number(property);
        }
      }
    }
  }

  range() {
    const array = this.#copy(this.#data);
    array.sort();
    let max = array.pop();
    let min = array.shift();
    return max - min;
  }

  factorial(number) {
    let result = 1;
    let num = number;
    for (let i = 0; i < number - 1; i++) {
      if (num <= 1) break;
      result = result * num;
      num -= 1;
    }
    return result;
  }

  combination(data, group) {
    return this.#output(
      this.factorial(data) /
        (this.factorial(group) * this.factorial(data - group)),
      0
    );
  }

  permutation(data, group) {
    return this.#output(this.factorial(data) / this.factorial(data - group), 0);
  }

  variance() {
    let data = this.#copy(this.#data);
    let mean = this.arithmeticMean(data);

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += Math.pow(data[i] - mean, 2);
    }

    return this.#output(sum / data.length, 2);
  }

  standardDeviation() {
    let data = this.#copy(this.#data);
    return this.#output(Math.pow(this.variance(), 1 / 2), 2);
  }
}
