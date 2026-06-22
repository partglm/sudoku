const board=[[null,null,null,null,null,null,1,6,null],
[null,null,4,null,null,null,null,null,null],
[null,null,null,null,1,3,2,null,5],
[1,4,null,8,6,2,9,null,null],
[null,7,3,1,null,null,null,2,6],
[null,null,null,null,null,5,4,null,null],
[null,8,null,null,2,null,null,null,null],
[null,9,null,null,4,null,6,null,2],
[null,null,null,null,3,null,null,4,9]]

import Scan from './dist/evaluation/0-1/scanning.js'

const a = Scan.scan(board).mattrice
console.table(a)

//page 38, parmis garantie optionnel nom + cmb simple indéxé majorés

//2 index equiv, verif tout rentrés + rentrés valerur en dure (bleu)
// : description + format
//ecrire dégager 0/ valeur nulle
 // -> si couleur entete = bleu alors valeur en dure, 
 //I62
 //inclure si colonne bleu remettre valeur dans tableau
  //mettre en carac bleu si en dure