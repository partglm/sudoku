import utils from '../../src/utils/generatorNumber'



describe("class utils for generating numbers", () => {
    describe("number()", () => {
        it("return number between 0 and intervalle0to (20 runs)", () => {
            for (let i = 0; i < 20; i++) {
                const result1 = utils.Number(15)
                expect(result1).toBeGreaterThanOrEqual(0)
                expect(result1).toBeLessThanOrEqual(15)

                const result2 = utils.Number(40)
                expect(result2).toBeGreaterThanOrEqual(0)
                expect(result2).toBeLessThanOrEqual(40)
            }
        })

        it("return number between minus and intervalle0to (20 runs)", () => {
            for (let i = 0; i < 20; i++) {
                const result1 = utils.Number(15,10)
                expect(result1).toBeGreaterThanOrEqual(10)
                expect(result1).toBeLessThanOrEqual(15)

                const result2 = utils.Number(9,1)
                expect(result2).toBeGreaterThanOrEqual(1)
                expect(result2).toBeLessThanOrEqual(9)
            }
        })
    })

    describe("coordinate()", () => {
        it("return coordinate", () => {
            expect(utils.coordinate([])).toEqual(
                expect.objectContaining({
                    x: expect.any(Number),
                    y: expect.any(Number)
                })
            )
        })

        it("return coordinate that are not a deleted case (20 runs)", () => {
            for (let i = 0; i < 20; i++) {                
                const deletedCases = [{x: 8, y: 1},{x: 2, y: 5},{x: 3, y: 4},{x: 7, y: 1},{x: 6, y: 5},{x: 3, y: 7}]
                const result = utils.coordinate(deletedCases)

                const exist = deletedCases.some(deletedCase => deletedCase.x === result.x && deletedCase.y === result.y)

                expect(exist).toBe(false)
            }
        })
    })

    describe("numSquare()", () => {
        it("return either: 0, 3 or 6 (20 runs)", () => {
            for (let i = 0; i < 20; i++) {
                const response = [0,3,6]
                const [result] = utils.NumsSquare(1)

                let exist = false
                if (response.includes(result)) exist = true
            
                expect(exist).toBe(true)
            }
        })

        it("return 20 numbers that is either: 0, 3 or 6", () => {
            const response = [0,3,6]
            const result = utils.NumsSquare(20)

            let exist = false

            result.forEach(res => {
                if (response.includes(res)) exist = true
            })
            
            expect(exist).toBe(true)
        })
    })

    describe("numsInSameBlock()", () => {
        it("return two different numbers", () => {
            const result = utils.numsInSameBlock()

            expect(result.num1 !== result.num2).toBe(true)
        })

        it("return two numbers between 0 and 2/3 and 5/6 and 8", () => {
            const result = utils.numsInSameBlock()
            const possible = [
                {num1: 0, num2: 1},{num1: 3, num2: 4},{num1: 6, num2: 7},
                {num1: 0, num2: 2},{num1: 3, num2: 5},{num1: 6, num2: 8},
                {num1: 1, num2: 2},{num1: 4, num2: 5},{num1: 7, num2: 8}]

            if (result.num1 > result.num2) {
                [result.num1, result.num2] = [result.num2, result.num1]
            }

            const exist = possible.some(nums => result.num1 === nums.num1 && result.num2 === nums.num2)

            expect(exist).toBe(true)
        })
    })
})