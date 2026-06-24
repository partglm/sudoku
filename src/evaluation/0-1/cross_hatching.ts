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
        let Cboard: impossibleMattrice = board.map(row => [...row])
        let resultfind: returnFuncEval = {use: false, mattrice: board}

        for (let num: number = 0; num < 9; num++) {
            const resultLigne: impossibleMattrice = this.ligne(Cboard, board, num)
            Cboard = resultLigne
            const resultColonne: impossibleMattrice = this.colonne(Cboard, board, num)
            Cboard = resultColonne
            const resultBlock: impossibleMattrice = this.block(Cboard, board, num)
            Cboard = resultBlock

            resultfind = this.find(Cboard, board, num)
        }

        return {use: resultfind.use, mattrice: resultfind.mattrice}
    }

    static find(undefboard: impossibleMattrice, board: mattrice, num: number): returnFuncEval {
        let useful: boolean = false

        loopBX:
        for (let blockx: number = 0; blockx < 3; blockx++) {
            for (let blocky: number = 0; blocky < 3; blocky++) {
                let howMuchUndef: number = 0
                let howMuchNotNull: number = 0

                for (let x: number = 0; x < 3; x++) {
                    for (let y: number = 0; y < 3; y++) {
                        const toAddX: number = blockx * 3
                        const toAddY: number = blocky * 3
                        const toCheck: undefnum = undefboard[x+toAddX][y+toAddY]

                        if (toCheck == null) howMuchNotNull++ 
                        if (toCheck == undefined) howMuchUndef++

                        if (howMuchNotNull+howMuchUndef != 9) continue

                        board[x+toAddX][y+toAddY] = num
                        useful = true
                        break loopBX
                    }
                }

            }
        }     
        return {use: useful, mattrice: board}
    }

    static block (undefboard: impossibleMattrice, board: mattrice, which: number): impossibleMattrice  {
        for (let blockx: number = 0; blockx < 3; blockx++) {
            for (let blocky: number = 0; blocky < 3; blocky++) {
                const possible: Possible = new Possible(board)
                const isPossible: boolean = possible.canBeInBlock({x: blockx*3, y: blocky*3}, which)
                
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

    static ligne (undefboard: impossibleMattrice, board: mattrice, which: number): impossibleMattrice {
        for (let ligne: number = 0; ligne < 9; ligne++) {
            const possible: Possible = new Possible(board)
            const isPossible: boolean = possible.canBeInLigne(which, ligne)
            
            if (isPossible) continue

            for (let i: number = 0; i < 9; i++) {
                const toCheck: num = board[ligne][i]

                if (toCheck != null) continue

                undefboard[ligne][i] = undefined
            }
        }
        return undefboard
    }

        static colonne (undefboard: impossibleMattrice, board: mattrice, which: number): impossibleMattrice {
        for (let colonne: number = 0; colonne < 9; colonne++) {
            const possible: Possible = new Possible(board)
            const isPossible: boolean = possible.canBeInColonne(which, colonne)
            
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