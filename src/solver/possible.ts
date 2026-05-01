type numbers = (number | null)[]
type num = (number | null)
type coordinate = {x: number, y: number}
type mattrice = (number | null)[][]

export default class possible {
    toSolve: mattrice

    constructor(toSolve: mattrice){
        this.toSolve = toSolve.map(row => [...row]);
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
        const x: number = Math.floor(number.x / 3) * 3;
        const y: number = Math.floor(number.y / 3) * 3;

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