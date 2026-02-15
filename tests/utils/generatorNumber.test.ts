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

                const exist = deletedCases.some(deletedCase => deletedCase.x === result.x && deletedCase.x === result.x)

                expect(exist).toBe(false)
            }
        })
    })
})