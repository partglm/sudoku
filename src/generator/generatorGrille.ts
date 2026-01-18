import utils from '../utils/generatorNumber.js'
import permutator from './permutator.js'

type coordinate = {x: number, y: number}
type mattrice = (number | null)[][]
type difficulty = 'very easy' | 'easy' | 'medium' | 'hard' | 'extreme' | 'god'

export default class grille extends permutator {
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
    toDelete: number
    difficultyMap

    constructor(difficulty: difficulty = 'hard') {
        super()

        this.deletedCase = []

        this.difficultyMap = {'very easy':31, 'easy': 38, 'medium': 48, 'hard': 53, 'extreme': 57, 'god': 64}
        this.toDelete = this.difficultyMap[difficulty]

        grille.mattrice = this.generateGrille()
    }

    generateGrille (): mattrice {
        //this.deletingCase(this.toDelete)
        this.permutingThings()

        return grille.mattrice
    }

    deletingCase (HowMuch: number): void {
        let i: number = 0
        while(i<HowMuch) {
            const coordinate: coordinate = utils.coordinate(this.deletedCase)
            if (grille.mattrice[coordinate.x][coordinate.y] !== null) {
                grille.mattrice[coordinate.x][coordinate.y] = null
                i++
            }
        }
    }

    static getNumber (x:number, y:number): number | null {
        return grille.mattrice[x][y]
    }

}