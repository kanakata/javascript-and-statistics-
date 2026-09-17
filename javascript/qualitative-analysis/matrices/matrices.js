export class Matrices {
  #identity_matrix = [
    [1, 0],
    [0, 1],
  ];

  #profile(matrix) {
    return {
      rows: matrix.length,
      columns: matrix[0].length,
    };
  }

  #vector(matrix) {
    // convert a 2D array to a 1D array
    let vector = [];
    for (let i = 0; i < matrix.length; i++) {
      vector.push(...matrix[i]);
    }
    return vector;
  }

  add(...matrices) {
    let result = [];
    const matrix_count = matrices.length;
    const rows = matrices[0].length;
    const columns = matrices[0][0].length;

    for (let i = 1; i < matrix_count; i++) {
      if (matrices[i].length != rows || matrices[i][0].length != columns) {
        return console.log('invalid');
      }
    }

    let sum = {};
    for (let i = 0; i < matrix_count; i++) {
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
    const matrix_count = matrices.length;
    const rows = matrices[0].length;
    const columns = matrices[0][0].length;

    for (let i = 1; i < matrix_count; i++) {
      if (matrices[i].length != rows || matrices[i][0].length != columns) {
        return console.log('invalid');
      }
    }

    let sum = {};
    for (let i = 0; i < matrix_count; i++) {
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

  multiply(matrix_one, matrix_two) {
    const profile_one = this.#profile(matrix_one);
    const profile_two = this.#profile(matrix_two);

    if (profile_one.columns != profile_two.rows) {
      return console.log('invalid');
    }

    let result = [];
    for (let i = 0; i < profile_one.rows; i++) {
      result[i] = [];
      for (let j = 0; j < profile_two.columns; j++) {
        result[i][j] = 0;
        for (let k = 0; k < profile_one.columns; k++) {
          result[i][j] += matrix_one[i][k] * matrix_two[k][j];
        }
      }
    }

    return result;
  }

  transpose(matrix) {
    const profile = this.#profile(matrix);

    let result = [];
    for (let i = 0; i < profile.columns; i++) {
      result.push([]);
    }

    // transpose the matrix
    for (let i = 0; i < profile.rows; i++) {
      for (let j = 0; j < profile.columns; j++) {
        result[j][i] = matrix[i][j];
      }
    }

    return result;
  }

  /**
   * calculates the determinant of a matrix using the artisan method for 2x2 and 3x3 matrices
   * @param {*} matrix
   * @returns
   */
  determinant(matrix) {
    const profile = this.#profile(matrix);
    if (profile.rows == profile.columns) {
      if (profile.rows == 2 && profile.columns == 2) {
        let determinant = 0;
        for (let i = 0; i < profile.rows; i++) {
          if (i == 0) {
            determinant += matrix[i][i] * matrix[i + 1][i + 1];
          } else {
            determinant -= matrix[i][i - 1] * matrix[i - 1][i];
          }
        }
        return determinant;
      } else if (profile.rows == 3 && profile.columns == 3) {
        const art = [];

        // artisan method for calculating the determinant of a 3x3 matrix add the first two columns to the right of the matrix
        for (let i = 0; i < profile.rows; i++) {
          art.push([...matrix[i], matrix[i][0], matrix[i][1]]);
        }

        console.log(art);

        let primary = 0;
        let secondary = 0;

        // artisan method for calculating the determinant of a 3x3 matrix
        for (let i = 0; i < art.length; i++) {
          primary += art[0][i] * art[1][i + 1] * art[2][i + 2];
          secondary += art[0][i + 2] * art[1][i + 1] * art[2][i];
        }

        console.log(primary - secondary);
      }
    }
  }

  /**
   * divides a matrix by a scalar
   * @param {*} matrix
   * @param {*} divider
   * @returns
   */
  divide(matrix, divider) {
    const profile = this.#profile(matrix);
    let temp = [];
    for (let i = 0; i < matrix.length; i++) {
      temp.push(...matrix[i]);
    }

    let temp2 = [];
    for (let i = 0; i < temp.length; i++) {
      temp2.push(temp[i] / divider);
    }

    let result = [];
    let start = 0;
    let end = profile.columns;

    // convert the temp2 array back to a 2D array
    for (let i = 0; i < profile.rows; i++) {
      result.push(temp2.slice(start, end));
      start += profile.columns;
      end += profile.columns;
    }

    return result;
  }

  inverse(matrix) {
    const profile = this.#profile(matrix);
    const inverse = this.determinant(matrix);

    const result = [];

    for (let i = 0; i < profile.rows; i++) {
      let temp = [];
      for (let j = 0; j < profile.columns; j++) {
        temp.push(matrix[i][j] / inverse);
      }
      result.push(temp);
    }

    return result;
  }

  markov_chain(initial_state, transition_matrix, steps) {
    let result = [];
    for (let i = 0; i < steps; i++) {
      initial_state = this.multiply(initial_state, transition_matrix);
    }
    return initial_state;
  }

  markov_chain_equilibrium(transition_matrix) {
    return result;
  }
}
