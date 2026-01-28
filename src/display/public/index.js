/// <reference path="../types.d.ts" />
import grille from '../../../dist/generator/generatorGrille.js'

const instanceGrille = new grille()
console.log(grille.mattrice)

const mattriceID = document.getElementById('mattrice')
for (let x = 0; x < 9; x++) {
        const classLigne = `ligne${x}`
    for (let y = 0; y < 9; y++) {
    const classColonne = `colonne${y}`

        const newElement = document.createElement('div')
        newElement.classList.add(classColonne)
        newElement.classList.add(classLigne)
        newElement.classList.add('case')

        const NumberElement = document.createElement('div')
        const inputElement = document.createElement('input')
        
        const number = grille.mattrice[x][y]

        if (number == null) {
            inputElement.type = 'text'
            inputElement.maxLength = 1

            newElement.appendChild(inputElement)
        }else{
            NumberElement.textContent = number
            newElement.appendChild(NumberElement)
        }

        mattriceID.appendChild(newElement)
    }
}

document.addEventListener("input", (item) => { 
    if (item.target.tagName === "INPUT") {
        if (!item.target.value.match(/[0-9]/)) {
            item.target.value = ''
            console.log("cleared an input")
        }
    }
})

const buttonSolve = document.getElementById('solve')

buttonSolve.addEventListener('click', () => {
    console.table(grille.SolvedMattrice)
    mattriceID.innerHTML = "";

    for (let x = 0; x < 9; x++) {
            const classLigne = `ligne${x}`
        for (let y = 0; y < 9; y++) {
            const classColonne = `colonne${y}`

            const newElement = document.createElement('div')
            newElement.classList.add(classColonne)
            newElement.classList.add(classLigne)
            newElement.classList.add('case')

            const NumberElement = document.createElement('div')
            const inputElement = document.createElement('input')

            const number = grille.SolvedMattrice[x][y]

            if (number == null) {
                inputElement.type = 'text'
                inputElement.maxLength = 1

                newElement.appendChild(inputElement)
            }else{
                NumberElement.textContent = number
                newElement.appendChild(NumberElement)
            }

            mattriceID.appendChild(newElement)
        }
    }
})