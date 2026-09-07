import { Matrices } from './javascript/qualitative-analysis/matrices/matrices.js';
const m = new Matrices();
let addition = m.add(
  [
    [3, 2, 1],
    [4, 3, 9],
    [5, 6, 8],
  ],
  [
    [0, 1, 8],
    [3, 7, 6],
    [2, 6, 4],
  ]
);

let multiplication = m.multiply(
  [
    [3, 1],
    [2, 4],
    [7, 4],
  ],
  [
    [8, 0, 5, 4],
    [3, 2, 1, 1],
  ]
);
console.log(
  m.transpose([
    [3, 2, 1],
    [4, 3, 9],
    [5, 6, 8],
  ])
);
