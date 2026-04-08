/// <reference path="../types.d.ts" />
import grille from '../../../dist/generator/generatorGrille.js'
import solver from '../../../dist/solver/solver.js'

const instanceGrille = new grille()
console.log(grille.mattrice)

const mattriceID = document.getElementById('mattrice')

//initiate postion
changeValueMattrice(grille.mattrice)

document.addEventListener("input", (item) => { 
    if (item.target.tagName === "INPUT") {
        if (!item.target.value.match(/[0-9]/)) {
            item.target.value = ''
            console.log("cleared an input")
        }
    }
})

//solver for start postion
const buttonSolveSV = document.getElementById('solveSV')
buttonSolveSV.addEventListener('click', () => {
    const solution = new solver(grille.mattrice)

    console.table(solution.toSolve)
    mattriceID.innerHTML = "";

    changeValueMattrice(solution.toSolve)
})

//solver for the position given
const buttonSolveP = document.getElementById('solveP')
buttonSolveP.addEventListener('click', () => {
    const mattrice = Array.from({ length: 9 },()=>Array(9).fill(0));

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            mattrice[x][y]
        }
    }

    const solution = new solver(grille.mattrice)

    console.table(solution.toSolve)
    mattriceID.innerHTML = "";

    changeValueMattrice(solution.toSolve)
})

//changing the board with a mattrice in input
function changeValueMattrice(mattrice) {
    //iterate trough each case
    for (let x = 0; x < 9; x++) {
            const classLigne = `ligne${x}`
        for (let y = 0; y < 9; y++) {
            const classColonne = `colonne${y}`

            //create the main element of the case
            const newElement = document.createElement('div')
            newElement.classList.add(classColonne)
            newElement.classList.add(classLigne)
            newElement.classList.add('case')

            //creating interactive case
            const NumberElement = document.createElement('div')
            const inputElement = document.createElement('input')

            //adding the number
            const number = mattrice[x][y]

            //adding interactive case: if the number is null so its a input case and if not its an non interactive case
            if (number == null) {
                inputElement.type = 'text'
                inputElement.maxLength = 1

                newElement.appendChild(inputElement)
            }else{
                NumberElement.textContent = number
                newElement.appendChild(NumberElement)
            }

            //adding the case to the grid
            mattriceID.appendChild(newElement)
        }
    }
}