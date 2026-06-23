const board=[[null,null,null,null,null,null,1,6,null],[null,null,4,null,null,null,null,null,null],[null,null,null,null,1,3,2,null,5],[1,4,null,8,6,2,9,null,null],[null,7,3,1,null,null,null,2,6],[null,null,null,null,null,5,4,null,null],[4,8,null,null,2,null,null,null,null],[null,9,null,null,4,null,6,null,2],[null,null,null,null,3,null,null,4,9]]

import Test_Methods from './dist/evaluation/test_method.js'

//console.table(board)
//const a = new Test_Methods(board)
//console.table(a.board)

import a from './dist/solver/possible.js'
const b = new a(board).isPossible({x:1, y:2, value: 1})
//const c = new a(board).canBeInLigne(1,2)
console.log(b)
//console.log(c)