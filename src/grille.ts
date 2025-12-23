type coordinate = {x: number, y: number}
type mattrice = (number | null)[][]
type numbers = {num1: number, num2: number}
type nullNumber = (null | number)
type listNumber = (null | number)[]

export default class grille {
    static mattrice: mattrice = [
        [8,2,7,1,5,4,3,9,6],
        [9,6,5,3,2,7,1,4,8],
        [3,4,1,6,8,9,7,5,2],
        [5,9,3,4,6,8,2,7,1],
        [4,7,2,5,1,3,6,8,9],
        [6,1,8,9,7,2,4,3,5],
        [7,8,6,2,3,5,9,1,4],
        [1,5,4,7,9,6,8,2,3],
        [2,3,9,8,4,1,5,6,7]
    ];
    deletedCase: coordinate[] = []

    constructor() {
        grille.mattrice = this.generateGrille()
        this.deletedCase = []
    }

    generateGrille (): mattrice {
        this.deletingCase()
        this.permutingThings()

        return grille.mattrice
    }

    permutingThings (): void {
        for(let i: number=0; i<this.generateNum(10000, 1000); i++){
            this.permutingSquareByX()
            this.permutingSquareByY()
            this.permutingColum()
            this.permutingLigne()
        }
    }

    generateNumsInSameBlock (): numbers {
        const [block] = this.generatenumsSquare(1)
        let num1: number = block + this.generateNum(2)
        let num2: number = block + this.generateNum(2)

        while (num1==num2) {
            num2 = block + this.generateNum(2)
        }

        return { num1, num2 }
    }

    generatenumsSquare (howMuch: number): number[] {
        const result: number[] = []

        for(let i: number=0; i<howMuch; i++) {
            result.push(this.generateNum(2) * 3)
        }

        return result
    }
    
    permutingSquareByX (): void {
        let [blocks, block1x, block2x] = this.generatenumsSquare(3)
        
        while (block1x == block2x) {
            block2x = this.generateNum(2) * 3
        }

        for(let x: number=0; x<3; x++){
            for(let y: number=0; y<3; y++){
                const temp: nullNumber = grille.mattrice[x+block1x][y+blocks]
                grille.mattrice[x+block1x][y+blocks] = grille.mattrice[x+block2x][y+blocks]
                grille.mattrice[x+block2x][y+blocks] = temp
            }
        }
    }

    permutingSquareByY (): void {
        let [blocks, block1y, block2y] = this.generatenumsSquare(3)
        
        while (block1y == block2y) {
            block2y = this.generateNum(2) * 3
        }

        for(let x: number=0; x<3; x++){
            for(let y: number=0; y<3; y++){
                const temp: nullNumber = grille.mattrice[x+blocks][y+block1y]
                grille.mattrice[x+blocks][y+block1y] = grille.mattrice[x+blocks][y+block2y]
                grille.mattrice[x+blocks][y+block2y] = temp
            }
        }
    }

    permutingColum (): void {
        const {num1: colum1, num2: colum2} = this.generateNumsInSameBlock()

        for (let i: number=0; i<9; i++) {
            const temp: nullNumber = grille.mattrice[i][colum1]
            grille.mattrice[i][colum1] = grille.mattrice[i][colum2]
            grille.mattrice[i][colum2] = temp
        }
    }
    
    permutingLigne (): void {
        const {num1: ligne1, num2: ligne2} = this.generateNumsInSameBlock()
        
        const temp: listNumber = grille.mattrice[ligne1]
        grille.mattrice[ligne1] = grille.mattrice[ligne2]
        grille.mattrice[ligne2] = temp
    }

    deletingCase (): void {
        let i: number = 0
        while(i<50) {
            const coordinate: coordinate = this.generateCoorOfCase()
            if (grille.mattrice[coordinate.x][coordinate.y] !== null) {
                grille.mattrice[coordinate.x][coordinate.y] = null
                i++
            }
        }
    }

    generateNum (intervalle0to: number, minus: (boolean | number)=false): number {
        let num: number = Math.floor(Math.random() * (intervalle0to + 1))
        if (minus != false && typeof minus == 'number') {
            while(num < minus) {
                num = Math.floor(Math.random() * (intervalle0to + 1))
            }
        }
        return num
    }

    generateCoorOfCase (): coordinate {
        let returningValue: coordinate = {x: 0, y:0}
        do {
            const colum: number = this.generateNum(8)
            const ligne: number = this.generateNum(8)

            returningValue = {x: ligne, y: colum}
        }while(this.deletedCase.some(
            c => c.x === returningValue.x && c.y === returningValue.y
        ))

        this.deletedCase = [...this.deletedCase, returningValue]
        
        return returningValue
    }

    static getNumber (x:number, y:number): number | null {
        return grille.mattrice[x][y]
    }

}