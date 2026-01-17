import type Grille from '../generator/generatorGrille'

declare global {
    interface Window {
        api: {
            grille: typeof Grille
        }
    }
}

export {}