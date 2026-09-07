export class Matrices {
  #identity_matrix = [
    [1, 0],
    [0, 1],
  ];
  add(...matrices) {
    let result = [];
    const matrice_count = matrices.length;
    const rows = matrices[0].length;
    const columns = matrices[0][0].length;

    for (let i = 1; i < matrice_count; i++) {
      if (matrices[i].length != rows || matrices[i][0].length != columns) {
        return console.log('invalid');
      }
    }

    let sum = {};
    for (let i = 0; i < matrice_count; i++) {
      let vector = [];
      for (let k = 0; k < rows; k++) {
        vector.push(...matrices[i][k]);
      }

      if (i == 0) {
        for (let j = 0; j < rows * columns; j++) {
          sum[j] = vector[j];
        }
      } else {
        for (let j = 0; j < rows * columns; j++) {
          sum[j] = vector[j] + sum[j];
        }
      }
    }
    sum = Object.values(sum);

    let start = 0;
    let end = columns;
    for (let i = 0; i < rows; i++) {
      result.push(sum.slice(start, end));
      start += columns;
      end += columns;
    }

    return result;
  }
  subtraction(...matrices) {
    let result = [];
    const matrice_count = matrices.length;
    const rows = matrices[0].length;
    const columns = matrices[0][0].length;

    for (let i = 1; i < matrice_count; i++) {
      if (matrices[i].length != rows || matrices[i][0].length != columns) {
        return console.log('invalid');
      }
    }

    let sum = {};
    for (let i = 0; i < matrice_count; i++) {
      let vector = [];
      for (let k = 0; k < rows; k++) {
        vector.push(...matrices[i][k]);
      }

      if (i == 0) {
        for (let j = 0; j < rows * columns; j++) {
          sum[j] = vector[j];
        }
      } else {
        for (let j = 0; j < rows * columns; j++) {
          sum[j] = vector[j] - sum[j];
        }
      }
    }
    sum = Object.values(sum);

    let start = 0;
    let end = columns;
    for (let i = 0; i < rows; i++) {
      result.push(sum.slice(start, end));
      start += columns;
      end += columns;
    }

    return result;
  }
  multiply(...matrices) {
    if (matrices[0][0].length != matrices[1].length) {
      return console.log('invalid');
    }

    let matrice_two = [];

    for (let i = 0; i < matrices[1].length; i++) {
      for (let j = 0; j < matrices[1][0].length; j++) {
        if (i == 0) {
          matrice_two[j] = [matrices[1][i][j]];
        } else {
          matrice_two[j].push(matrices[1][i][j]);
        }
      }
    }

    let result = [];
    for (let k = 0; k < matrices[0].length; k++) {
      let multiplication = [];
      for (let i = 0; i < matrice_two.length; i++) {
        let computation = 0;
        for (let j = 0; j < matrices[0][0].length; j++) {
          computation += matrices[0][k][j] * matrice_two[i][j];
        }
        multiplication.push(computation);
      }
      result.push(multiplication);
    }
    console.log(result);
  }
  transpose(matrix) {
    let result = [];
  }
}
