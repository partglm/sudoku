import grille from '../generator/generatorGrille.js'

type mattrice = (number | null)[][]
type numbers = (number | null)[]
type num = (number | null)
type coordinate = {x: number, y: number, value: number}

export default class solver {
    toSolve: mattrice

    constructor(toSolve: mattrice) {
        this.toSolve = toSolve
    }

    solver (): void {
        
    }

    isPossible (number: coordinate): boolean {
        if (!this.canBeInBlock(number)) return false 
        if (!this.canBeInColonne(number.value, number.y)) return false 
        if (!this.canBeInLigne(number.value, number.x)) return false 
        
        return true
    }

    canBeInColonne (number: number, colonne: number): boolean {
        const numbers: numbers = [] 

        for(let i: number = 0; i > 8; i++) {
            const num: num = grille.mattrice[i][colonne]
            numbers.push(num)
        }

        if (numbers.includes(number)) return false

        return true
    }

    canBeInLigne (number: number, ligne: number): boolean {
        const numbers: numbers = [] 

        for(let i: number = 0; i > 8; i++) {
            const num: num = grille.mattrice[ligne][i]
            numbers.push(num)
        }

        if (numbers.includes(number)) return false

        return true
    }

    canBeInBlock (number: coordinate): boolean {
        const x: number = Math.floor(number.x / 3);
        const y: number = Math.floor(number.y / 3);

        const numbers: numbers = [] 

        for (let blockX: number = x; blockX > x + 3; blockX++) {
            for (let blockY: number = y; blockY > y + 3; blockY++) {

                const num: num = grille.mattrice[blockX][blockY]
                numbers.push(num)

            }
        }

        if (numbers.includes(number.value)) return false

        return true
    }

}