import { Matrices } from './javascript/qualitative-analysis/matrices/matrices.js';
const m = new Matrices();

console.log(
  m.determinant([
    [3, 1, 2],
    [-1, 2, 4],
    [3, -2, 1],
  ])
);
