export class Grouped {
  #data;
  #frequencies;
  constructor(data, frequencies) {
    if (
      typeof data == 'object' &&
      typeof frequencies == 'object' &&
      data.length == frequencies.length
    ) {
      this.#data = data;
      this.#frequencies = frequencies;
    } else {
      return console.log('Data and frequencies side do not match');
    }
  }

  #copy(data) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(data[i]);
    }
    return result;
  }

  #sortData(data) {
    return data.sort(this.#order);
  }

  #order(num1, num2) {
    return num1 - num2;
  }

  #output(data, precision) {
    return Number(data.toFixed(precision));
  }

  #sum(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return Number(sum);
  }

  #cumulativeFrequency(frequencies) {
    let cumulative_frequency = [];
    let prev = 0;
    for (let i = 0; i < frequencies.length; i++) {
      if (i == 0) {
        cumulative_frequency.push(frequencies[i]);
        prev = frequencies[i];
      } else {
        cumulative_frequency.push(frequencies[i] + prev);
        prev = frequencies[i] + prev;
      }
    }

    return cumulative_frequency;
  }

  #midpoint(data) {
    let mid_point = [];
    if (this.#check(data).ends_with_zero) {
      for (let i = 0; i < data.length; i++) {
        let cr = data[i];
        for (let j = 0; j < 1; j++) {
          mid_point.push((cr[1] + cr[0]) / 2);
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        let cr = data[i];
        for (let j = 0; j < 1; j++) {
          mid_point.push((cr[1] + 0.5 + (cr[0] - 0.5)) / 2);
        }
      }
    }

    return mid_point;
  }

  /**
   * checks if the data is spread and returns an interval
   * @param {*} data
   * @returns int (interval)
   */
  #check(data) {
    let max = 0;
    let min = 0;
    let is_whole = false;

    for (let i = 0; i < 1; i++) {
      let cr = data[i];
      for (let j = 0; j < cr.length; j++) {
        if (String(cr[0]).endsWith('0')) {
          is_whole = true;
          break;
        }
      }
    }

    if (is_whole) {
      for (let i = 0; i < 1; i++) {
        let cr = data[i];

        for (let j = 0; j < cr.length; j++) {
          if (j == 0) {
            min = cr[j];
          } else {
            max = cr[j];
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < 1; i++) {
        let cr = data[i];

        for (let j = 0; j < cr.length; j++) {
          if (j == 0) {
            min = cr[j] - 0.5;
          } else {
            max = cr[j] + 0.5;
            break;
          }
        }
      }
    }
    return {
      interval: max - min,
      ends_with_zero: is_whole,
    };
  }

  mode() {
    let data = this.#copy(this.#data);
    let frequencies = this.#copy(this.#frequencies);

    let dict = {};
    for (let i = 0; i < data.length; i++) {
      dict[frequencies[i]] = data[i];
    }

    let f0 =
      frequencies[
        frequencies.indexOf(
          this.#sortData(this.#copy(frequencies))[frequencies.length - 1]
        ) - 1
      ];

    let f1 = this.#sortData(this.#copy(frequencies))[frequencies.length - 1];
    let f2 =
      frequencies[
        frequencies.indexOf(
          this.#sortData(this.#copy(frequencies))[frequencies.length - 1]
        ) + 1
      ];

    if (this.#check(data).ends_with_zero) {
      var lm =
        dict[
          this.#sortData(this.#copy(frequencies))[frequencies.length - 1]
        ][0];
    } else {
      var lm =
        dict[
          this.#sortData(this.#copy(frequencies))[frequencies.length - 1]
        ][0] - 0.5;
    }

    let i = this.#check(data).interval;

    let a = f1 - f0;
    let b = f1 - f0 + (f1 - f2);

    return lm + (a / b) * i;
  }

  mean() {
    let data = this.#copy(this.#data);
    let frequencies = this.#copy(this.#frequencies);
    let sum_of_frequencies = this.#sum(frequencies);
    let mid_point = this.#midpoint(data);

    let fx = 0;

    for (let i = 0; i < data.length; i++) {
      fx += frequencies[i] * mid_point[i];
    }

    return fx / sum_of_frequencies;
  }

  median() {
    let data = this.#copy(this.#data);
    let frequencies = this.#copy(this.#frequencies);

    var half_f = this.#sum(frequencies) / 2;
    var cumulative_frequency = this.#cumulativeFrequency(frequencies);
    var median_class;
    var pos;

    for (let i = 0; i < cumulative_frequency.length; i++) {
      if (cumulative_frequency[i] >= half_f) {
        median_class =
          data[cumulative_frequency.indexOf(cumulative_frequency[i])];
        pos = cumulative_frequency.indexOf(cumulative_frequency[i]);
        break;
      }
    }

    if (this.#check(data).ends_with_zero) {
      var lm = median_class[0];
    } else {
      var lm = median_class[0] - 0.5;
    }

    let i = this.#check(data).interval;
    let cf = cumulative_frequency[pos - 1];
    let f = frequencies[pos];

    return Number((lm + ((half_f - cf) / f) * i).toFixed(2));
  }

  loweQuartile() {
    let data = this.#copy(this.#data);
    let frequencies = this.#copy(this.#frequencies);

    var quarter_f = this.#sum(frequencies) / 4;
    var cumulative_frequency = this.#cumulativeFrequency(frequencies);
    var lower_quartile_class;
    var pos;

    for (let i = 0; i < cumulative_frequency.length; i++) {
      if (cumulative_frequency[i] >= quarter_f) {
        lower_quartile_class =
          data[cumulative_frequency.indexOf(cumulative_frequency[i])];
        pos = cumulative_frequency.indexOf(cumulative_frequency[i]);
        break;
      }
    }

    if (this.#check(data).ends_with_zero) {
      var lm = lower_quartile_class[0];
    } else {
      var lm = lower_quartile_class[0] - 0.5;
    }
    let i = this.#check(data).interval;
    let cf = cumulative_frequency[pos - 1];
    let f = frequencies[pos];

    return Number((lm + ((quarter_f - cf) / f) * i).toFixed(2));
  }

  upperQuartile() {
    let data = this.#copy(this.#data);
    let frequencies = this.#copy(this.#frequencies);

    var three_quarter_f = (this.#sum(frequencies) * 3) / 4;
    var cumulative_frequency = this.#cumulativeFrequency(frequencies);
    var upper_quartile_class;
    var pos;

    for (let i = 0; i < cumulative_frequency.length; i++) {
      if (cumulative_frequency[i] >= three_quarter_f) {
        upper_quartile_class =
          data[cumulative_frequency.indexOf(cumulative_frequency[i])];
        pos = cumulative_frequency.indexOf(cumulative_frequency[i]);
        break;
      }
    }

    if (this.#check(data).ends_with_zero) {
      var lm = upper_quartile_class[0];
    } else {
      var lm = upper_quartile_class[0] - 0.5;
    }

    let i = this.#check(data).interval;
    let cf = cumulative_frequency[pos - 1];
    let f = frequencies[pos];

    return Number((lm + ((three_quarter_f - cf) / f) * i).toFixed(2));
  }

  percentile(percentile) {          
    if (!percentile) return 'Percentile missing!!!';
    let data = this.#copy(this.#data);
    let frequencies = this.#copy(this.#frequencies);

    var p_f = (this.#sum(frequencies) * percentile) / 100;
    var cumulative_frequency = this.#cumulativeFrequency(frequencies);
    var upper_quartile_class;
    var pos;

    for (let i = 0; i < cumulative_frequency.length; i++) {
      if (cumulative_frequency[i] >= p_f) {
        upper_quartile_class =
          data[cumulative_frequency.indexOf(cumulative_frequency[i])];
        pos = cumulative_frequency.indexOf(cumulative_frequency[i]);
        break;
      }
    }

    if (this.#check(data).ends_with_zero) {
      var lm = upper_quartile_class[0];
    } else {
      var lm = upper_quartile_class[0] - 0.5;
    }

    let i = this.#check(data).interval;
    let cf = cumulative_frequency[pos - 1];
    let f = frequencies[pos];

    return Number((lm + ((p_f - cf) / f) * i).toFixed(2));
  }

  variance() {
    let data = this.#copy(this.#data);
    let frequencies = this.#copy(this.#frequencies);
    let mid_point = this.#midpoint(data);

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += frequencies[i] * Math.pow(mid_point[i] - this.mean(), 2);
    }

    return this.#output(sum / this.#sum(frequencies), 2);
  }

  standardDeviation() {
    return this.#output(Math.pow(this.variance(), 1 / 2));
  }

  coEfficientOfVariation() {
    return this.standardDeviation() / this.mean();
  }

  quartileDeviation() {
    return this.upperQuartile() - this.loweQuartile();
  }

  skewness() {
    return 3(this.mean() - this.median()) / this.standardDeviation();
  }

  coEfficientOfKurtosis() {
    return (
      0.5(this.upperQuartile() - this.loweQuartile()) /
      (this.percentile(90) - this.percentile(10))
    );
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
}
