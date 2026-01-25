type coordinate = {x: number, y: number}
type numbers = {num1: number, num2: number}

export default class utils {
    static Number (intervalle0to: number, minus: number = -1): number {
        let num: number = Math.floor(Math.random() * (intervalle0to + 1))
        if (minus != -1) {
            while(num < minus) {
                num = Math.floor(Math.random() * (intervalle0to + 1))
            }
        }
        return num
    } 

    static coordinate (deletedCase: coordinate[]): coordinate {
        let returningValue: coordinate = {x: 0, y:0}
        do {
            const colum: number = utils.Number(8)
            const ligne: number = utils.Number(8)

            returningValue = {x: ligne, y: colum}
        }while(deletedCase.some(
            c => c.x === returningValue.x && c.y === returningValue.y
        ))

        deletedCase = [...deletedCase, returningValue]
        
        return returningValue
    }

    static NumsSquare (howMuch: number): number[] {
        const result: number[] = []

        for(let i: number=0; i<howMuch; i++) {
            result.push(utils.Number(2) * 3)
        }

        return result
    }
    
    static numsInSameBlock (): numbers {
            const [block] = this.NumsSquare(1)
            let num1: number = block + utils.Number(2)
            let num2: number = block + utils.Number(2)
    
            while (num1==num2) {
                num2 = block + utils.Number(2)
            }
    
            return { num1, num2 }
    }
}