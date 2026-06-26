// Barème global :
// 0–1 = Très facile | 2–3 = Facile | 4–5 = Intermédiaire
// 6–7 = Avancé | 8–9 = Expert | 10 = Solveur / non humain
//
// 1. Techniques débutants (0–1)
// Scanning 0.2, Cross-Hatching 0.3, Counting 0.3,
// Full House 0.1, Last Free Cell 0.2, Last Possible Number 0.3,
// Last Remaining Cell 0.3, Candidate Elimination 0.5,
// Pencil Marks 0.1, Snyder Notation 0.1
//
// 2. Singles / Paires / Triples / Quads (1–3)
// Naked Single 1, Hidden Single 1,
// Naked Pair 2, Hidden Pair 2.5,
// Naked Triple 2.5, Hidden Triple 3,
// Naked Quad 3, Hidden Quad 3.5
//
// 3. Candidats verrouillés (2–4)
// Locked Candidates 2, Pointing Pair 2.5, Pointing Triple 3,
// Box/Line Reduction 3, Claiming Pair/Triple 3.5
//
// 4. Poissons (Fish) (4–7)
// X-Wing 4, Swordfish 5, Jellyfish 6,
// Finned X-Wing 5, Finned Swordfish 6, Finned Jellyfish 7,
// Sashimi X-Wing 5.5, Sashimi Swordfish 6.5,
// Turbot Fish 5, Two-String Kite 4.5,
// Empty Rectangle 5, Skyscraper 4.5
//
// 5. Wings (5–7)
// XY-Wing 5, XYZ-Wing 5.5,
// W-Wing 6, WXYZ-Wing 6.5,
// M-Wing 6, S-Wing 6.5,
// XY-Chain 7
//
// 6. Chaînes & Coloration (6–8)
// Simple Colouring 6, Multi-Colouring 6.5,
// Remote Pairs 6, X-Chain 6.5,
// AIC (Alternating Inference Chain) 7,
// Nice Loop 7.5, Grouped AIC 7.5,
// Forcing Chain 7.5, Nishio 8, 3D Medusa 8
//
// 7. Unicité (5–7)
// Unique Rectangle 5–6.5, Hidden Rectangle 6,
// Avoidable Rectangle 6.5, Unique Loop 6,
// BUG / BUG+1 5
//
// 8. ALS & techniques expertes (7–9)
// ALS 7, ALS-XZ 8, ALS-XY-Wing 8.5,
// Sue de Coq 8, Death Blossom 9,
// Exocet 9, Pattern Overlay Method 8.5,
// Templates 8
//
// 9. Dernier recours / Solveur (10)
// Bifurcation 10, Trial and Error 10,
// Backtracking 10, Brute Force 10
//
// ------------------------------------------------------------
// UTILISATION POUR ÉVALUER LA DIFFICULTÉ D’UNE GRILLE :
//
// Exemple de formule :
// difficulté = max(score) + Math.log(1 + sommeDesScores)
//
// Classement :
// 0–2 Facile | 2–4 Moyen | 4–6 Difficile | 6–8 Expert | 8+ Diabolique
// ------------------------------------------------------------
type mattrice = (number | null)[][]
type returnFuncEval = {use: boolean, mattrice: mattrice}

import Scan from './0-1/scanning.js'
import CrossHatching from './0-1/cross_hatching.js'

export default class Test_Methods {
    difficulty: number;
    max_method: number;
    list_method: { func: (arg0: mattrice) => returnFuncEval; value: number; }[];
    board: mattrice;

    constructor(board: mattrice) {
        this.max_method = 0
        this.list_method = [
        {func: Scan.scan, value: 0.2},
        {func: CrossHatching.hatching, value: 0.3}
        ]
        this.board = board.map(row => [...row]);
        this.difficulty = this.init()
    }

 
    init (): number {
        this.list_method.forEach(method => {
            let result: returnFuncEval;
            do{
                result = method.func(this.board)
                
                if (!result.use) return
                this.board = result.mattrice
                
                if (this.max_method <= method.value) {
                    this.max_method = method.value
                }
            }while(result.use==true) 
        })
        return this.max_method
    }
}