import type Grille from '../generator/generatorGrille'
import type Solver from '../solver/solver'
import type Possible from '../solver/possible'

declare global {
    interface Window {
        api: {
            grille: typeof Grille,
            solver: typeof Solver,
            possible: typeof Possible
        }
    }
}

export {}