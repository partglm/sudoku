//0.2 seek pos uniq dans block pr chiffre
type mattrice = (number | null)[][]
type coordinate = {x: number, y: number}
type returnFuncEval = {use: boolean, mattrice: mattrice}
type coordinateAndNumber = {whereCanBePlace: coordinate, howMuchInBlock: number}

import Possible from '../../solver/possible.js'

export default class Scan {
    static scan(board: mattrice): returnFuncEval {
        let useful: boolean = false
        for (let num: number = 1; num <= 9; num++) {        
            const result: boolean = Scan.board(board, num)
            if (result) useful = true
        }
        return {use: useful, mattrice: board}
    }

    static board(board: mattrice, num: number): boolean {
        let useful: boolean = false
        for (let blocky: number = 1; blocky <= 3; blocky++) {
            for (let blockx: number = 1; blockx <= 3; blockx++) {
                let howMuchInBlock: number = 0
                let whereCanBePlace: coordinate = {x: -1, y: -1}
                
                Scan.block(board, num, howMuchInBlock, whereCanBePlace)

                if (howMuchInBlock == 1) {
                    const pos: coordinate = whereCanBePlace
                    board[pos.x][pos.y] = num
                    useful = true
                }

            }
        }
        return useful
    }
    
    static block(board: mattrice, num: number, howMuchInBlock: number, whereCanBePlace: coordinate): coordinateAndNumber {
        for (let y: number = 1; y <= 3; y++) {
            for (let x: number = 1; x <= 3; x++) {
                const possible: Possible = new Possible(board)
                const isPossible: boolean = possible.isPossible({x: x, y: y}, num)
                
                if (isPossible) {
                    howMuchInBlock++
                    whereCanBePlace = {x: x, y: y}
                }
            }
        }
        return {whereCanBePlace, howMuchInBlock}
    }
}