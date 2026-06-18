//0.2 seek pos uniq dans block pr chiffre
type mattrice = (number | null)[][]

import Possible from '../../solver/possible.js'

export default class Scan {
    static scan(board: mattrice): boolean {
        
        for (let blocky: number = 1; blocky <= 3; blocky++) {
            for (let blockx: number = 1; blockx <= 3; blockx++) {

                for (let num: number = 1; num <= 9; num++) {

                    for (let y: number = 1; y <= 3; y++) {
                        for (let x: number = 1; x <= 3; x++) {
                            const isPossible = possible.isPossible({x: x, y: y}, num)










                        }
                    }

                }

            }
        }
    
    }
}