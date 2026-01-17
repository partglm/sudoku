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
    }
});
