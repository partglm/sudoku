//0.3 copie board pr replace tt cases impossibles pr chiffre par undefined and if 8 undefined per block so last pos is where
type mattrice = (number | null)[][]
type impossibleMattrice = (number | null | undefined)[][]
type coordinate = {x: number, y: number}
type returnFuncEval = {use: boolean, mattrice: mattrice}
type num = (number | null)
type undefnum = (number | null |  undefined)

import Possible from '../../solver/possible.js'

export default class CrossHatching {
    static hatching (board: mattrice): returnFuncEval {
        let useful: boolean = false

        for (let num: number = 1; num < 10; num++) {
            let Cboard: impossibleMattrice = board.map(row => [...row])
            const resultLigne: impossibleMattrice = CrossHatching.ligne(Cboard, board, num)
            Cboard = resultLigne
            const resultColonne: impossibleMattrice = CrossHatching.colonne(Cboard, board, num)
            Cboard = resultColonne
            const resultBlock: impossibleMattrice = CrossHatching.block(Cboard, board, num)
            Cboard = resultBlock

            const result = CrossHatching.find(Cboard, board, num)

            useful = result.use
            board = result.mattrice

            if (useful) break
        }

        return {use: useful, mattrice: board}
    }

    static find(undefboard: impossibleMattrice, board: mattrice, num: number): returnFuncEval {
        let useful: boolean = false

        loopBX:
        for (let blockx: number = 0; blockx < 3; blockx++) {
            for (let blocky: number = 0; blocky < 3; blocky++) {
                let howMuchUndef: number = 0
                let howMuchNumber: number = 0
                const toAddX: number = blockx * 3
                const toAddY: number = blocky * 3
                let pos: coordinate = {x: -1, y: -1}

                for (let x: number = 0; x < 3; x++) {
                    for (let y: number = 0; y < 3; y++) {
                        const toCheck: undefnum = undefboard[x+toAddX][y+toAddY]

                        if (typeof toCheck == 'number') {
                            howMuchNumber++; continue
                        }
                        if (typeof toCheck == 'undefined') {
                            howMuchUndef++; continue
                        }
 
                        pos = {x: x + toAddX, y: y + toAddY}
                    }
                }
                
                if (howMuchNumber+howMuchUndef != 8 || pos.x == -1) continue

                board[pos.x][pos.y] = num
                undefboard[pos.x][pos.y] = num
                useful = true

               break loopBX
            }
        }     
        return {use: useful, mattrice: board}
    }

    static block (undefboard: impossibleMattrice, board: mattrice, num: number): impossibleMattrice  {
        for (let blockx: number = 0; blockx < 3; blockx++) {
            for (let blocky: number = 0; blocky < 3; blocky++) {
                const possible: Possible = new Possible(board)
                const isPossible: boolean = possible.canBeInBlock({x: blockx*3, y: blocky*3}, num)
                
                if (isPossible) continue

                for (let x: number = 0; x < 3; x++) {
                    for (let y: number = 0; y < 3; y++) {
                        const toAddX: number = blockx * 3
                        const toAddY: number = blocky * 3
                        const toCheck: num = board[x+toAddX][y+toAddY]
                
                        if (toCheck != null) continue

                        undefboard[x+toAddX][y+toAddY] = undefined
                    }
                }

            }
        }
        return undefboard
    }

    static ligne (undefboard: impossibleMattrice, board: mattrice, num: number): impossibleMattrice {
        for (let ligne: number = 0; ligne < 9; ligne++) {
            const possible: Possible = new Possible(board)
            const isPossible: boolean = possible.canBeInLigne(num, ligne)
            
            if (isPossible) continue

            for (let i: number = 0; i < 9; i++) {
                const toCheck: num = board[ligne][i]

                if (toCheck != null) continue

                undefboard[ligne][i] = undefined
            }
        }
        return undefboard
    }

        static colonne (undefboard: impossibleMattrice, board: mattrice, num: number): impossibleMattrice {
        for (let colonne: number = 0; colonne < 9; colonne++) {
            const possible: Possible = new Possible(board)
            const isPossible: boolean = possible.canBeInColonne(num, colonne)
            
            if (isPossible) continue

            for (let i: number = 0; i < 9; i++) {
                const toCheck: num = board[i][colonne]

                if (toCheck != null) continue

                undefboard[i][colonne] = undefined
            }
        }
        return undefboard
    }
}