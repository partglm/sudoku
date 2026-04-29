const { contextBridge } = require("electron")

contextBridge.exposeInMainWorld("api", {
    async grille() {
        try {
            const mod = await import('../generator/generatorGrille.ts')
            return mod.default
        } catch (err) {
            console.error('Failed to load grille:', err)
            throw err
        }
    },
    async solver() {
        try {
            const mod = await import('../solver/solver.ts')
            return mod.default
        } catch (err) {
            console.error('Failed to load grille:', err)
            throw err
        }
    },
    async possible()  {
        try {
            const mod = await import('../solver/possible.ts')
            return mod.default
        } catch (err) {
            console.error('Failed to load grille:', err)
            throw err
        }
    }
});
