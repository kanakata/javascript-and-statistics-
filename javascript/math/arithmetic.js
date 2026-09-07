export class Arithmetic {
  typeCheck(data) {
    if (typeof data != 'object') return 'Data must be of type array';
  }
  add(data) {
    this.typeCheck(data);
    var result = 0;
    for (let i = 0; i < data.length; i++) {
      result += data[i];
    }
    return result;
  }
  subtract(data) {
    this.typeCheck(data);
    var result;
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        result = data[i];
      } else {
        result -= data[i];
      }
    }
    return result;
  }
  multiply(data) {
    this.typeCheck(data);
    var result = 1;
    for (let i = 0; i < data.length; i++) {
      result *= data[i];
    }
    return result;
  }
  divide(data) {
    this.typeCheck(data);
    var result;
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        result = data[i];
      } else {
        result /= data[i];
      }
    }
    return result;
  }
}
