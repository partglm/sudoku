/// <reference path="../types.d.ts" />
import grille from '../../../dist/generator/generatorGrille.js'

const instanceGrille = new grille()
console.log(grille.mattrice)

const mattriceID = document.getElementById('mattrice')
for (let x = 0; x < 9; x++) {
    const classColonne = `colonne${x}`
    for (let y = 0; y < 9; y++) {
        const classLigne = `ligne${y}`

        const newElement = document.createElement('div')
        newElement.classList.add(classColonne)
        newElement.classList.add(classLigne)
        newElement.classList.add('case')

        const NumberElement = document.createElement('div')
        const inputElement = document.createElement('input')
        
        const number = grille.mattrice[x][y]

        if (number == null) {
            inputElement.type = 'number'
            inputElement.min = '1'
            inputElement.max = '9'
            inputElement.maxLength = 1

            newElement.appendChild(inputElement)
        }else{
            NumberElement.textContent = number
            newElement.appendChild(NumberElement)
        }

        mattriceID.appendChild(newElement)
    }
}

//document.addEventListener("input", (item) => { 
//    if (item.target.tagName === "INPUT") {
//        if (typeof item.target.value !== 'number') {
//            item.target.value = ''
//            console.log("cleared an input")
//        }
//    }
//})