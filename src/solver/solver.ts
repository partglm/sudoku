type mattrice = (number | null)[][]
type numbers = (number | null)[]
type num = (number | null)
type coordinate = {x: number, y: number}
type HistoryOfCoordinate = {x: number, y: number, value: number, indexPossibleMove: number}

export default class solver {
    toSolve: mattrice
    status: boolean

    constructor(toSolve: mattrice) {
        this.toSolve = toSolve.map(row => [...row]);

        this.status = this.solver()
    }

    solver (): boolean {
        const history: HistoryOfCoordinate[] = []

        while(this.SearchNullCase().x !== -1) {
            const pos: coordinate = this.SearchNullCase()
            const {x, y} = pos

            const possibleNumber: number[] = this.possibleNumber(pos)

            if (possibleNumber.length === 0) {
                const lastMove = history[history.length - 1]
                const posLastMove = {x: lastMove.x, y: lastMove.y}

                this.toSolve[lastMove.x][lastMove.y] = null
                const lastMovePossibleNumber = this.possibleNumber(posLastMove)

                this.toSolve[lastMove.x][lastMove.y] = lastMovePossibleNumber[lastMove.indexPossibleMove + 1]
            }

            const replace = possibleNumber[0]
                    
            history.push({x: x, y: y, value: replace, indexPossibleMove: 0})
                
            this.toSolve[x][y] = replace
        }

        return true

        //for(let y: number = 0; y < 9; y++) {   
        //    for(let x: number = 0; x < 9; x++) {
        //        const value: num = this.toSolve[x][y]
        //        const pos: coordinate = {x: x, y: y}
//
        //        if (value == null) {
        //            const possibleNumber: number[] = this.possibleNumber(pos)
//
        //            console.log(possibleNumber)
        //            if (possibleNumber.length === 0) {
        //                const lastMove = history[history.length - 1]
        //                const posLastMove = {x: lastMove.x, y: lastMove.y}
//
        //                this.toSolve[lastMove.x][lastMove.y] = null
        //                const lastMovePossibleNumber = this.possibleNumber(posLastMove)
//
        //                this.toSolve[lastMove.x][lastMove.y] = lastMovePossibleNumber[lastMove.indexPossibleMove + 1]
        //            }
//
        //            const replace = possibleNumber[0]
        //            
        //            history.push({x: x, y: y, value: replace, indexPossibleMove: 0})
//
        //            this.toSolve[x][y] = replace
        //        }
        //    }
        //}
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

    possibleNumber (pos: coordinate): number[] {
        const possibleNumber: number[] = []

        for(let i: number = 1; i <= 9; i++) {
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

        for(let i: number = 0; i < 9; i++) {
            const num: num = this.toSolve[i][colonne]
            numbers.push(num)
        }

        if (numbers.includes(number)) return false

        return true
    }

    canBeInLigne (number: number, ligne: number): boolean {
        const numbers: numbers = [] 

        for(let i: number = 0; i < 9; i++) {
            const num: num = this.toSolve[ligne][i]
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

                const num: num = this.toSolve[blockX][blockY]
                numbers.push(num)

            }
        }

        if (numbers.includes(value)) return false

        return true
    }

}