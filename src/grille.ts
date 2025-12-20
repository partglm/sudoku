class grille {
    static mattrice: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
    x: number
    y: number

    constructor() {
        this.x = 0
        this.y = 0

        grille.mattrice = this.generateGrille()
    }

    generateGrille (): number[][] {
        for (let x=0; x<9; x++) {
            const choosed: number[] = []

            for (let y=0; y<9; y++) {
                const result = this.generateNumber(choosed)
                
                grille.mattrice[x][y] = result
                choosed.push(result)
            }
        }

        return grille.mattrice
    }

    generateNumber (choosed: number[]): number {
        let choosing: number
        
        do {
            const index: number = Math.round(Math.random() * 9)
            const toChoose: number[] = [1,2,3,4,5,6,7,8,9]
            choosing = toChoose[index]
        } while(choosed.includes(choosing))

        return choosing
    }

    static getNumber (x:number, y:number): number {
        return grille.mattrice[x][y]
    }

}

const a = new grille()
console.table(a.generateGrille())