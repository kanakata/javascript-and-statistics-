import { Matrices } from './javascript/qualitative-analysis/matrices/matrices.js';
const m = new Matrices();

console.log(
  m.markov_chain(
    [[0.3, 0.7]],

    [
      [0.5, 0.5],
      [0.4, 0.6],
    ],
    
    2
  )
);

console.log(
  m.markov_chain_equilibrium([
    [0.5, 0.5],
    [0.4, 0.6],
  ])
);
