import grille from '../generator/generatorGrille.js'

type mattrice = (number | null)[][]
type numbers = (number | null)[]
type num = (number | null)
type coordinate = {x: number, y: number}
type coordinateWithValue = {x: number, y: number, value: number}

export default class solver {
    toSolve: mattrice
    solved: boolean | mattrice

    constructor(toSolve: mattrice) {
        this.toSolve = toSolve

        this.solved = this.solver()
    }

    solver (): mattrice {
        const history: coordinateWithValue[] = []

        for(let y: number = 0; y < 8; y++) {   
            for(let x: number = 0; x < 8; x++) {
                const value: num = this.toSolve[x][y]
                const pos: coordinate = {x: x, y: y}

                if (value == null) {
                    const possibleNumber: number[] = this.possibleNumber(pos)
                    
                    history.push({x: x, y: y, value: possibleNumber[0]})

                    this.toSolve[x][y] = possibleNumber[0]
                }
            }
        }

        return this.toSolve
    }

    possibleNumber (pos: coordinate): number[] {
        const possibleNumber: number[] = []

        for(let i: number = 0; i < 8; i++) {
            if (this.isPossible(pos, i)) {
                possibleNumber.push(i)
            }
        }

        return possibleNumber
    }

    isPossible (pos: coordinate, value: number): boolean {
        if (!this.canBeInBlock(pos, value)) return false 
        if (!this.canBeInColonne(value, pos.y)) return false 
        if (!this.canBeInLigne(value, pos.x)) return false 
        
        return true
    }

    canBeInColonne (number: number, colonne: number): boolean {
        const numbers: numbers = [] 

        for(let i: number = 0; i < 8; i++) {
            const num: num = grille.mattrice[i][colonne]
            numbers.push(num)
        }

        if (numbers.includes(number)) return false

        return true
    }

    canBeInLigne (number: number, ligne: number): boolean {
        const numbers: numbers = [] 

        for(let i: number = 0; i < 8; i++) {
            const num: num = grille.mattrice[ligne][i]
            numbers.push(num)
        }

        if (numbers.includes(number)) return false

        return true
    }

    canBeInBlock (number: coordinate, value: number): boolean {
        const x: number = Math.floor(number.x / 3);
        const y: number = Math.floor(number.y / 3);

        const numbers: numbers = [] 

        for (let blockX: number = x; blockX < x + 3; blockX++) {
            for (let blockY: number = y; blockY < y + 3; blockY++) {

                const num: num = grille.mattrice[blockX][blockY]
                numbers.push(num)

            }
        }

        if (numbers.includes(value)) return false

        return true
    }

}