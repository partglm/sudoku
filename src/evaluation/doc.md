# Techniques de Sudoku — Guide complet et détaillé

Ce document explique toutes les techniques de résolution du Sudoku, de la plus simple à la plus avancée.  
Chaque technique inclut : définition, reconnaissance, application, logique et exemple conceptuel.

---

# 1. Techniques pour débutants

## Scanning
**Définition :** Balayer les lignes, colonnes et blocs pour repérer les chiffres manquants.  
**Reconnaître :** Une maison manque un chiffre évident.  
**Application :** Examiner chaque chiffre de 1 à 9 et vérifier où il peut aller.  
**Pourquoi ça marche :** Chaque chiffre doit apparaître exactement une fois par maison.

## Cross-Hatching
**Définition :** Croiser les lignes et colonnes d’un bloc pour éliminer des positions.  
**Reconnaître :** Un chiffre ne peut être que dans une ligne/colonne du bloc.  
**Application :** Éliminer ce chiffre dans les autres blocs de la même ligne/colonne.

## Counting
**Définition :** Compter les positions possibles d’un chiffre dans une maison.  
**Reconnaître :** Un chiffre n’a que 2 ou 3 positions possibles.  
**Application :** Réduire les candidats.

## Full House
**Définition :** Une maison n’a plus qu’une seule case vide.  
**Application :** Placer le chiffre manquant.

## Last Free Cell
**Définition :** Une case n’a plus qu’un seul candidat.  
**Application :** Placer ce candidat.

## Last Possible Number
**Définition :** Un chiffre n’a plus qu’une seule position possible dans une maison.  
**Application :** Placer ce chiffre.

## Candidate Elimination
**Définition :** Supprimer les candidats impossibles selon les chiffres déjà placés.

## Pencil Marks
**Définition :** Noter les candidats dans chaque case.

## Snyder Notation
**Définition :** Notation compacte pour suivre les candidats dans les blocs.

---

# 2. Singles, paires, triples et quads

## Naked Single
**Définition :** Une case n’a qu’un seul candidat.  
**Reconnaître :** Tous les autres candidats ont été éliminés.

## Hidden Single
**Définition :** Un chiffre n’a qu’une seule position possible dans une maison.  
**Reconnaître :** La case peut avoir plusieurs candidats, mais un seul est unique dans la maison.

## Naked Pair
**Définition :** Deux cases contiennent exactement les mêmes deux candidats.  
**Application :** Éliminer ces candidats des autres cases de la maison.

## Hidden Pair
**Définition :** Deux candidats n’apparaissent que dans deux cases d’une maison.  
**Application :** Ces deux cases doivent contenir ces candidats.

## Naked Triple / Hidden Triple
Même logique que les paires, mais avec trois candidats.

## Naked Quad / Hidden Quad
Même logique, mais avec quatre candidats.

---

# 3. Techniques de candidats verrouillés

## Locked Candidates
**Définition :** Un candidat est confiné dans une ligne/colonne d’un bloc.  
**Application :** Éliminer ce candidat ailleurs dans la ligne/colonne.

## Pointing Pair / Triple
**Définition :** Dans un bloc, un chiffre ne peut être que dans une seule ligne/colonne.  
**Application :** Éliminer ce chiffre dans cette ligne/colonne hors du bloc.

## Box/Line Reduction
**Définition :** Si un chiffre ne peut apparaître que dans une ligne/colonne d’un bloc, on l’élimine dans le reste du bloc.

## Claiming Pair / Triple
**Définition :** Si un chiffre n’apparaît que dans une ligne/colonne d’un bloc, on l’élimine dans le reste du bloc.

---

# 4. Techniques de poissons (Fish)

## X-Wing
**Définition :** Deux lignes ont exactement deux positions possibles pour un candidat, alignées en colonnes.  
**Application :** Éliminer ce candidat dans les autres cases de ces colonnes.

## Swordfish
Extension du X-Wing à trois lignes et trois colonnes.

## Jellyfish
Extension à quatre lignes et quatre colonnes.

## Finned / Sashimi Variants
**Définition :** Un poisson presque parfait avec une case supplémentaire ("fin").  
**Application :** La fin modifie les éliminations possibles.

## Turbot Fish
**Définition :** Chaîne courte basée sur deux paires fortes/faibles.

## Two-String Kite
**Définition :** Interaction entre deux lignes et deux colonnes via un candidat commun.

## Empty Rectangle
**Définition :** Un bloc forme un rectangle vide pour un candidat.  
**Application :** Éliminations ciblées.

## Skyscraper
**Définition :** Deux lignes avec deux positions possibles chacune.  
**Application :** Éliminations dans les colonnes croisées.

---

# 5. Techniques d’ailes (Wings)

## XY-Wing
**Structure :**  
- Pivot : XY  
- Aile 1 : XZ  
- Aile 2 : YZ  
**Résultat :** Z est éliminé des cases qui voient les deux ailes.

## XYZ-Wing
**Définition :** Pivot avec trois candidats.  
**Application :** Élimination du candidat commun.

## W-Wing
**Définition :** Deux paires fortes reliées par une chaîne simple.

## WXYZ-Wing
**Définition :** Structure à quatre cases permettant une élimination ciblée.

## M-Wing / S-Wing
Variantes basées sur des paires fortes/faibles.

## XY-Chain
**Définition :** Chaîne de paires XY permettant d’éliminer un candidat partagé.

---

# 6. Chaînes et coloration

## Simple Colouring
**Définition :** Coloration binaire d’un candidat → contradictions → éliminations.

## Multi-Colouring
**Définition :** Plusieurs chaînes colorées interagissent.

## Remote Pairs
**Définition :** Chaîne de paires identiques → élimination d’un candidat dans les cases visibles.

## X-Chain
**Définition :** Chaîne alternée forte/faible pour un seul candidat.

## AIC (Alternating Inference Chain)
**Définition :** Chaîne logique alternant liens forts et faibles.

## Nice Loop
**Définition :** Boucle fermée d’inférences → éliminations ou placements.

## Grouped AIC
**Définition :** Version groupée utilisant des ensembles de candidats.

## Forcing Chain
**Définition :** Une hypothèse force une conclusion → élimination ou placement.

## Nishio
**Définition :** Tester une seule hypothèse pour vérifier si elle mène à une contradiction.

## 3D Medusa
**Définition :** Extension des chaînes utilisant plusieurs types de liens et couleurs.

---

# 7. Techniques d’unicité

## Unique Rectangle (Types 1–4)
**Définition :** Évite les motifs qui permettraient deux solutions.

## Hidden Rectangle
Variante basée sur les mêmes principes.

## Avoidable Rectangle
Évite un motif ambigu pouvant mener à plusieurs solutions.

## Unique Loop
Boucle logique qui ne doit pas permettre deux solutions.

## BUG / BUG+1
Cas limite où chaque case a deux candidats → une seule exception permet la résolution.

---

# 8. ALS & techniques expertes

## ALS (Almost Locked Set)
**Définition :** Un ensemble presque verrouillé permet des éliminations ciblées.

## ALS-XZ
Interaction entre deux ALS via un candidat X et un lien Z.

## ALS-XY-Wing
Structure combinant ALS et logique XY-Wing.

## Sue de Coq
Technique experte combinant plusieurs ensembles verrouillés.

## Death Blossom
Structure complexe basée sur plusieurs ALS interconnectés.

## Exocet
Motif très puissant permettant des éliminations massives.

## Pattern Overlay Method
Analyse de motifs possibles pour un chiffre donné.

## Templates
Analyse de tous les modèles possibles d’un chiffre pour éliminer les impossibles.

---

# 9. Techniques de dernier recours

## Bifurcation
Essayer une hypothèse pour débloquer la grille.

## Trial and Error
Tester une possibilité et revenir en arrière si nécessaire.

## Backtracking
Algorithme systématique explorant toutes les possibilités.

## Brute Force
Essayer toutes les combinaisons possibles.

