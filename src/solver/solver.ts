import possible from './possible.js'

type mattrice = (number | null)[][]
type numbers = (number | null)[]
type num = (number | null)
type coordinate = {x: number, y: number}

export default class solver extends possible {
    toSolve: mattrice
    status: boolean

    constructor(toSolve: mattrice) {
        super(toSolve)
        this.toSolve = toSolve.map(row => [...row]);

        this.status = this.solver()
    }

    
    recursiveSolver(): boolean {
        const pos: coordinate = this.SearchNullCase()
        if (pos.x === -1) {
            return true
        }

        const possibleNumber: number[] = this.possibleNumber(pos)
        for (let i = 0; i < possibleNumber.length; i++) {
            this.toSolve[pos.x][pos.y] = possibleNumber[i]
            if (this.recursiveSolver()) {
                return true
            }
            this.toSolve[pos.x][pos.y] = null
        }

        return false
    }

    solver (): boolean {
        return this.recursiveSolver()
    }

    SearchNullCase (): coordinate {
        for(let y: number = 0; y < 9; y++) {   
            for(let x: number = 0; x < 9; x++) {

                if (this.toSolve[x][y] == null) {
                    return {x: x, y: y}
                }

            }
        }

        return {x: -1, y: -1}
    }
}