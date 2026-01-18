import utils from "../utils/generatorNumber.js"
import grille from "./generatorGrille.js"

type nullNumber = (null | number)
type listNumber = (null | number)[]

export default class permutator {
        permutingThings (): void {
            //for(let i: number=0; i< utils.Number(10000, 1000); i++){
                this.permutingSquareByX()
                //this.permutingSquareByY()
                //this.permutingColum()
                //this.permutingLigne()
            //}
        }
        
        permutingSquareByX (): void {
            let [blocks, block1x, block2x] = utils.NumsSquare(3)
            
            while (block1x == block2x) {
                [block2x] = utils.NumsSquare(1)
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
            let [blocks, block1y, block2y] = utils.NumsSquare(3)
            
            while (block1y == block2y) {
                [block2y] = utils.NumsSquare(1)
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
}