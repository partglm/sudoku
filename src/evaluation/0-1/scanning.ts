//0.2 seek pos uniq dans block pr chiffre
type mattrice = (number | null)[][]
type coordinate = {x: number, y: number}
type returnFuncEval = {use: boolean, mattrice: mattrice}
type coordinateAndNumber = {whereCanBePlace: coordinate, howMuchInBlock: number}
type coordinateAndBoolean = {whereCanBePlace: coordinate, useful: boolean}

import Possible from '../../solver/possible.js'

export default class Scan {
    static scan(board: mattrice): returnFuncEval {
        let useful: boolean = false

        for (let num: number = 1; num <= 9; num++) {        
            const result: coordinateAndBoolean = Scan.board(board, num)
            
            console.log(result)
            const pos = result.whereCanBePlace
            if (result.useful && pos.x != -1) {
                useful = true
                console.log(pos)
                
                board[pos.x][pos.y] = num
                break
            }
        }
        return {use: useful, mattrice: board}
    }

    static board(board: mattrice, num: number): coordinateAndBoolean {
        let useful: boolean = false
        let whereCanBePlace: coordinate = {x: -1, y: -1}
        let breaking: boolean = false

        for (let blockX: number = 0; blockX < 3; blockX++) {
            for (let blockY: number = 0; blockY < 3; blockY++) {
                const arg1HowMuch: number = 0
                const arg2Where: coordinate = {x: -1, y: -1}
                
                let result: coordinateAndNumber = Scan.block(board, num, arg1HowMuch, arg2Where, {x: blockX, y: blockY})
                if (result.howMuchInBlock == 1) {
                    useful = true
                    whereCanBePlace = result.whereCanBePlace
                    breaking = true
                    break
                }
            }

            if (breaking) break
        }
        return {useful: useful, whereCanBePlace: whereCanBePlace}
    }
    
    static block(board: mattrice, num: number, HowMuch: number, where: coordinate, blockPos: coordinate): coordinateAndNumber {
        for (let x: number = 1; x <= 3; x++) {
            for (let y: number = 1; y <= 3; y++) {
                const possible: Possible = new Possible(board)
                const pos: coordinate = {x: x+(blockPos.x*3),y: y+(blockPos.y*3)}
                const isPossible: boolean = possible.isPossible({x: pos.x, y: pos.y}, num)
                
                if (isPossible) {
                    HowMuch++
                    where = {x: pos.x, y: pos.y}
                }
            }
        }
        return {whereCanBePlace: where, howMuchInBlock: HowMuch}
    }
}