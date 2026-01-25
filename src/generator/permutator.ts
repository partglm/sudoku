import utils from "../utils/generatorNumber.js"
import grille from "./generatorGrille.js"

type nullNumber = (null | number)
type listNumber = (null | number)[]

//TODO: permute symbol

export default class permutator {
        permutingThings (): void {
            for(let i: number=0; i< utils.Number(10000, 1000); i++){
                this.permutingStacksX()
                this.permutingStacksY()
                this.permutingColum()
                this.permutingLigne()
                this.permuteNumber()
            }
        }
        
        permutingStacksX (): void {
            let [bande1,bande2]: number[] = utils.NumsSquare(2)
            
            while (bande1 === bande2) {
                [bande2] = utils.NumsSquare(1)
            }
            
            for (let i: number=0; i<3; i++) {
                const temp: listNumber = grille.mattrice[bande1+i]
                grille.mattrice[bande1+i] = grille.mattrice[bande2+i]
                grille.mattrice[bande2+i] = temp
            }
        }
    
        permutingStacksY (): void {
            let [bande1,bande2]: number[] = utils.NumsSquare(2)
            
            while (bande1 === bande2) {
                [bande2] = utils.NumsSquare(1)
            }

            for (let colonne: number=0; colonne<3; colonne++) {
                for (let i: number=0; i<9; i++) {
                    const temp: nullNumber = grille.mattrice[i][bande1+colonne]
                    grille.mattrice[i][bande1+colonne] = grille.mattrice[i][bande2+colonne]
                    grille.mattrice[i][bande2+colonne] = temp
                }
            }
        }
    
        permutingColum (): void {
            const {num1: colum1, num2: colum2} = utils.numsInSameBlock()
    
            for (let i: number=0; i<9; i++) {
                const temp: nullNumber = grille.mattrice[i][colum1]
                grille.mattrice[i][colum1] = grille.mattrice[i][colum2]
                grille.mattrice[i][colum2] = temp
            }
        }
        
        permutingLigne (): void {
            const {num1: ligne1, num2: ligne2} = utils.numsInSameBlock()
            
            const temp: listNumber = grille.mattrice[ligne1]
            grille.mattrice[ligne1] = grille.mattrice[ligne2]
            grille.mattrice[ligne2] = temp
        }

        permuteNumber (): void {
            const num1 = utils.Number(8) + 1
            const num2 = utils.Number(8) + 1
            
            for (let x: number=0; x<9; x++) {
                for (let y: number=0; y<9; y++) {
                    if (grille.mattrice[x][y]==num1){
                        grille.mattrice[x][y]=num2
                    }else{
                        if (grille.mattrice[x][y]==num2){
                            grille.mattrice[x][y]=num1
                        }
                    }
                }
            }
        }
}