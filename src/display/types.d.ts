import type Grille from '../generator/generatorGrille'
import type Solver from '../solver/solver'

declare global {
    interface Window {
        api: {
            grille: typeof Grille,
            solver: typeof Solver
        }
    }
}

export {}