class grille {
    static mattrice: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
//    static mattrice: number[][] = [
//  [5, 3, 4, 6, 7, 8, 9, 1, 2],
//  [6, 7, 2, 1, 9, 5, 3, 4, 8],
//  [1, 9, 8, 3, 4, 2, 5, 6, 7],
//
//  [8, 5, 9, 7, 6, 1, 4, 2, 3],
//  [4, 2, 6, 8, 5, 3, 7, 9, 1],
//  [7, 1, 3, 9, 2, 4, 8, 5, 6],
//
//  [9, 6, 1, 5, 3, 7, 2, 8, 4],
//  [2, 8, 7, 4, 1, 9, 6, 3, 5],
//  [3, 4, 5, 2, 8, 6, 1, 7, 0]
//];

    constructor() {
        grille.mattrice = this.generateGrille()
    }

    generateGrille (): number[][] {
        for (let x=0; x<9; x++) {
            for (let y=0; y<9; y++) {
                const result = this.generateNumber(x,y)

                grille.mattrice[x][y] = result
            }
        }

        return grille.mattrice
    }

    generateNumber (x: number, y: number): number {
        const startTime: number = Date.now();
        const timeoutMs: number = 1000
        let number: number = 0;

        do {
            number = -1
            const possible: number[] = []

            if ((Date.now() - startTime) > timeoutMs) {
                console.warn('too long')

                for(let n=1; n<=9; n++){
                    if(!this.isInColonne(n, y) && !this.isInLigne(n, x) && !this.isInSquare(n, x, y)) {
                        console.log(n)
                        possible.push(n)
                    }
                }

                const index = Math.floor(Math.random() * possible.length)
                number = possible[index]

                break
            }

            number = Math.floor(Math.random() * 9) + 1; 
        } while (this.isInColonne(number, y) || this.isInLigne(number, x) || this.isInSquare(number, x, y));

        return number;
    }

    isInSquare (number: number, x: number, y: number): boolean {
        type Cell = { x: number; y: number };
        type Grid = { [key in 1|2|3|4|5|6|7|8|9]: Cell[] };

        const squareById: Grid = {
            1: [{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}],
            2: [{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:3,y:2},{x:4,y:2},{x:5,y:2}],
            3: [{x:6,y:0},{x:7,y:0},{x:8,y:0},{x:6,y:1},{x:7,y:1},{x:8,y:1},{x:6,y:2},{x:7,y:2},{x:8,y:2}],
            4: [{x:0,y:3},{x:1,y:3},{x:2,y:3},{x:0,y:4},{x:1,y:4},{x:2,y:4},{x:0,y:5},{x:1,y:5},{x:2,y:5}],
            5: [{x:3,y:3},{x:4,y:3},{x:5,y:3},{x:3,y:4},{x:4,y:4},{x:5,y:4},{x:3,y:5},{x:4,y:5},{x:5,y:5}],
            6: [{x:6,y:3},{x:7,y:3},{x:8,y:3},{x:6,y:4},{x:7,y:4},{x:8,y:4},{x:6,y:5},{x:7,y:5},{x:8,y:5}],
            7: [{x:0,y:6},{x:1,y:6},{x:2,y:6},{x:0,y:7},{x:1,y:7},{x:2,y:7},{x:0,y:8},{x:1,y:8},{x:2,y:8}],
            8: [{x:3,y:6},{x:4,y:6},{x:5,y:6},{x:3,y:7},{x:4,y:7},{x:5,y:7},{x:3,y:8},{x:4,y:8},{x:5,y:8}],
            9: [{x:6,y:6},{x:7,y:6},{x:8,y:6},{x:6,y:7},{x:7,y:7},{x:8,y:7},{x:6,y:8},{x:7,y:8},{x:8,y:8}],
        };
        
        const keys: (keyof Grid)[] = [1,2,3,4,5,6,7,8,9];
        let inWhichId: keyof Grid = 1;


        keys.forEach(id => {
            const cells: Cell[] = squareById[id];
            cells.forEach(cell => {
                if (cell.x == x && cell.y == y) {
                    inWhichId = id
                }
            });
        });

        const numbers: number[] = []

        const square: Cell[] = squareById[inWhichId]
        square.forEach(pos => {
            numbers.push(grille.mattrice[pos.x][pos.y])
        })

        return numbers.includes(number)
    }

    isInLigne (number: number, x: number): boolean {
        for (let y = 0; y < 9; y++) {
            if (grille.mattrice[x][y] === number) {
                return true
            }
        }
        return false
    }

    isInColonne (number: number, y: number): boolean {
        for (const ligne of grille.mattrice) {
            if (ligne[y] == number) return true
        }

        return false
    }

    static getNumber (x:number, y:number): number {
        return grille.mattrice[x][y]
    }

}

const a = new grille()
console.table(grille.mattrice)