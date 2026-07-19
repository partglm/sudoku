/// <reference path="../types.d.ts" />
import grille from '../../../dist/generator/generatorGrille.js'
import solver from '../../../dist/solver/solver.js'
import possible from '../../../dist/solver/possible.js'

const selectDifficulty = document.getElementById('select')

const StorageValue =  localStorage.getItem('difficulty')
selectDifficulty.value = StorageValue
let difficulty = selectDifficulty.value

if (StorageValue == '') {
    difficulty = 'hard'
    localStorage.setItem('difficulty', 'hard')
}else{
    difficulty = StorageValue
}

const instanceGrille = new grille(difficulty)
console.log(grille.mattrice)

const mattriceID = document.getElementById('mattrice')

//initiate postion
changeValueMattrice(grille.mattrice)

//clear non number input
document.addEventListener("input", (item) => { 
    if (item.target.tagName === "INPUT") {
        if (!item.target.value.match(/[0-9]/)) {
            item.target.value = ''
            console.log("cleared an input")
        }
    }
})

//change the data json value for the difficulty chosen
selectDifficulty.addEventListener("change", () => {
    localStorage.setItem('difficulty', selectDifficulty.value)
})

//change the type of input
let showNumber = true

        //iniate no input case
    const inputElementS = document.querySelectorAll('.inputEL')

    inputElementS.forEach(el => {
        if(el.value == '') {
            el.style.display = 'none'
        }
    })

const inputContent = document.getElementById('inputContent')
inputContent.addEventListener('change', () => {
    if (showNumber) showNumber = false
    else showNumber = true

    if (showNumber) {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                const caseElement = mattriceID.getElementsByClassName(`colonne${y} ligne${x} case`)[0]
                const buttonS = caseElement.getElementsByTagName('button')
                Array.from(buttonS).forEach(el => el.remove())
            
                creatingButtonNOTstart(caseElement, x, y)
            }
        }

        const inputElementS = document.querySelectorAll('.inputEL')
        const buttonElementS = document.querySelectorAll('.buttonEL')

        inputElementS.forEach(el => {
            if(el.value == '') {
                el.style.display = 'none'
            }
        })

        buttonElementS.forEach(el => {
            const div = el.parentElement
            const input = div.querySelector('input')

            if (input.value == '') {
                el.style.display = 'block'
            }
        })
    }else{
        const inputElementS = document.querySelectorAll('.inputEL')
        const buttonElementS = document.querySelectorAll('.buttonEL')

        inputElementS.forEach(el => {
            el.style.display = 'block'
        })

        buttonElementS.forEach(el => {
            el.style.display = 'none'
        })
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

    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            mattrice[x][y] = getValueMattrice(x,y)
        }
    }

    const solution = new solver(mattrice)

    console.table(mattrice)

    if (!solution.status) {
        alert('the position have no solution')
        return
    }

    console.table(solution.toSolve)
    mattriceID.innerHTML = "";

    changeValueMattrice(solution.toSolve)
})

//create a null board
const buttonNullBoard = document.getElementById('NullBoard')
buttonNullBoard.addEventListener('click', () => {
    const mattrice = Array.from({ length: 9 },()=>Array(9).fill(0));

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            mattrice[x][y] = null
        }
    }

    mattriceID.innerHTML = "";

    changeValueMattrice(mattrice)
})

//print the board
const buttonPrintBoard = document.getElementById('printBoard')
buttonPrintBoard.addEventListener('click', () => {
    window.print()
})

function getValueMattrice(x,y)  {
    const caseElement = mattriceID.getElementsByClassName(`colonne${y} ligne${x} case`)

    const valueDiv = getNumberDiv(caseElement)
    if(valueDiv !== null) return valueDiv

    const valueInput = getNumberInput(caseElement)
    if(valueInput !== null) return valueInput

    return null
}

function getNumberDiv (caseElement) {
    const valueArr = caseElement[0].getElementsByTagName('div')

    if (!valueArr.length) return null

    const value = valueArr[0].textContent

    return Number.parseInt(value)
}

function getNumberInput (caseElement) {
    const valueArr = caseElement[0].getElementsByTagName('input')

    if (!valueArr.length) return null

    const value = valueArr[0].value

    if (value === '') return null

    return Number.parseInt(value)
}

//changing the board witdh a mattrice in input
function changeValueMattrice(mattrice) {
    mattriceID.innerHTML = ''
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
                inputElement.classList.add("inputEL")
                inputElement.addEventListener('click', (el) => {
                    if (el.target.value == '') return

                    el.target.value = ''
                    const parent = el.target.parentElement

                    if(showNumber) buttonEvent(el)
                })

                creatingButton(newElement, x, y, mattrice)

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


function creatingButton (newElement, x, y, mattrice) {
    for (let i = 1; i <= 9; i++) {
        const possibleButton = new possible(mattrice).possibleNumber({ x: x , y: y })
        
        if (!possibleButton.includes(i)) continue

        const button =  document.createElement('button')
        
        button.id = `button${i}`
        button.textContent = i
        button.classList.add("buttonEL")

        button.addEventListener('click', (el) => buttonEvent(el))
              
        newElement.appendChild(button)
    }
}

function creatingButtonNOTstart (newElement, x, y) {    
    const mattrice = Array.from({ length: 9 },()=>Array(9).fill(0));

    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            mattrice[x][y] = getValueMattrice(x,y)
        }
    }

    for (let i = 1; i <= 9; i++) {
        //check if it's an interactive case
        const caseElement = mattriceID.getElementsByClassName(`colonne${y} ligne${x} case`)
        
        const divELement = caseElement[0].getElementsByTagName('div')
        if (divELement[0]) return 

        const inputElement = caseElement[0].getElementsByTagName('input')
        if (inputElement[0].value != '') return

        //fonction
        const possibleButton = new possible(mattrice).possibleNumber({ x: x , y: y })
        
        if (!possibleButton.includes(i)) continue

        const button =  document.createElement('button')
        
        button.id = `button${i}`
        button.textContent = i
        button.classList.add("buttonEL")

        button.addEventListener('click', (el)  => buttonEvent(el))
              
        newElement.appendChild(button)
    }
}

function buttonEvent (el) {
    const buttonEL = el.target;
    const value = buttonEL.textContent
       
    const caseDiv = buttonEL.parentElement;
     
    //donner la valeur du bouton a l'input 
    const inputEL = caseDiv.querySelector('input');
    if (inputEL) {
        inputEL.value = value;
    }
          
    //afficher les boutons
    const allButtons = caseDiv.querySelectorAll('button');
    allButtons.forEach(btn => {
        btn.style.display = 'none';
    });
           
    if (inputEL) {
        inputEL.style.display = 'block';
    }
        
    // recreate function init
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const caseElement = mattriceID.getElementsByClassName(`colonne${y} ligne${x} case`)[0]
            const buttonS = caseElement.getElementsByTagName('button')
            Array.from(buttonS).forEach(el => el.remove())
        
            creatingButtonNOTstart(caseElement, x, y)
        }
    } 
}

//export
const exportEl = document.getElementById('export')
exportEl.addEventListener('click', toExport)
function toExport() {
    const mattrice = Array.from({ length: 9 },()=>Array(9).fill(0));

    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            mattrice[x][y] = getValueMattrice(x,y)
        }
    }

    window.api.writeFile('./export.mine', mattrice)
}

//import i'm a witch ??? 
const importEL = document.getElementById('import')
importEL.addEventListener('click', toImport)
async function toImport() {
    const content = await window.api.readFile('./export.mine')
    let data
    try {
        data = JSON.parse(content)
    } catch (e) {
        console.error('Failed to parse import file:', e)
        alert('Le fichier importé est invalide')
        return
    }
    console.table(data)
    changeValueMattrice(data)
}