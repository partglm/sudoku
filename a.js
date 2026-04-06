import grille  from './dist/generator/generatorGrille.js'
import solver  from './dist/solver/solver.js'

const matt = new grille('easy')
const solve = new solver(grille.mattrice)

console.table(solve.toSolve)
console.table(grille.mattrice)