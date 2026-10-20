# Trois variantes de l'accueil (20 octobre 2026)

Les trois variantes sont sur la branche `passe-whaou`, chacune sur une page temporaire. Ces pages ne sont jamais indexées par Google, n'apparaissent ni dans le menu ni dans le plan du site.
Le vrai site n'a pas changé : j'attends ton choix.

Pour les voir sur ton ordinateur : `git switch passe-whaou`, puis `npm run dev`, puis ouvre :

- http://localhost:4321/essai-a/
- http://localhost:4321/essai-b/
- http://localhost:4321/essai-c/

Chaque page montre l'accueil de la variante, puis l'étude de cas MonArc. Recharge la page (F5) pour revoir l'effet d'entrée.

## Côte à côte

| | Ordinateur (1920 px) | Téléphone (390 px) |
|---|---|---|
| **Actuel** (pour comparer) | <img src="../captures/variantes/actuel-1920.png" width="560" alt="Accueil actuel en 1920 px"> | <img src="../captures/variantes/actuel-390.png" width="200" alt="Accueil actuel en 390 px"> |
| **A « Nuit »** | <img src="../captures/variantes/essai-a-1920.png" width="560" alt="Variante A en 1920 px"> | <img src="../captures/variantes/essai-a-390.png" width="200" alt="Variante A en 390 px"> |
| **B « Affiche »** | <img src="../captures/variantes/essai-b-1920.png" width="560" alt="Variante B en 1920 px"> | <img src="../captures/variantes/essai-b-390.png" width="200" alt="Variante B en 390 px"> |
| **C « Élégance »** | <img src="../captures/variantes/essai-c-1920.png" width="560" alt="Variante C en 1920 px"> | <img src="../captures/variantes/essai-c-390.png" width="200" alt="Variante C en 390 px"> |

Sur des écrans de portable courants :

| | 1440 × 900 | 1366 × 768 |
|---|---|---|
| **Actuel** | <img src="../captures/variantes/actuel-1440.png" width="420" alt="Accueil actuel en 1440 px"> | <img src="../captures/variantes/actuel-1366.png" width="420" alt="Accueil actuel en 1366 px"> |
| **A « Nuit »** | <img src="../captures/variantes/essai-a-1440.png" width="420" alt="Variante A en 1440 px"> | <img src="../captures/variantes/essai-a-1366.png" width="420" alt="Variante A en 1366 px"> |
| **B « Affiche »** | <img src="../captures/variantes/essai-b-1440.png" width="420" alt="Variante B en 1440 px"> | <img src="../captures/variantes/essai-b-1366.png" width="420" alt="Variante B en 1366 px"> |
| **C « Élégance »** | <img src="../captures/variantes/essai-c-1440.png" width="420" alt="Variante C en 1440 px"> | <img src="../captures/variantes/essai-c-1366.png" width="420" alt="Variante C en 1366 px"> |

Images de l'effet d'entrée, prises 0,45 seconde après l'arrivée sur la page : [A](../captures/variantes/essai-a-1920-entree.png), [B](../captures/variantes/essai-b-1920-entree.png), [C](../captures/variantes/essai-c-1920-entree.png).

## Ce qui distingue chaque variante

### A « Nuit »

- Fond bleu nuit avec un grain très léger. Ton nom en blanc, en Bricolage Grotesque extra-grasse et serrée.
- Le trait et le bouton principal sont en abricot.
- La photo détourée est posée sur le fond, juste à côté du nom. Elle se tient sur le bord bas de l'accueil.
- **Entrée** : sur ordinateur, chaque ligne du nom monte de derrière sa propre ligne de base, puis le trait abricot se dessine. Sur téléphone, les lignes se posent en douceur, visibles dès la première image.
- **Sur téléphone**, le nom ouvre l'accueil en très grand. La photo arrive en bas de l'accueil, après les boutons.
- Score Lighthouse mobile : 100.

### B « Affiche »

- Ton nom traverse toute la largeur de l'écran, en Archivo très large et très grasse.
- La photo est derrière le nom. Elle s'efface vers le bas, pour que les lettres blanches restent lisibles là où elles croisent ta chemise.
- Les textes et les boutons sont en haut à gauche, comme sur une affiche.
- **Entrée** : le nom s'élargit d'une police étroite à une police très large, ligne après ligne. Les lettres restent serrées pendant tout le mouvement.
- **Sur téléphone**, la photo ouvre l'accueil et le nom traverse sa partie effacée.
- Score Lighthouse mobile : 98.

### C « Élégance »

- Ton nom en Instrument Serif : « Youri » en italique, « Karamyan » en romain. Le reste du texte reste en Instrument Sans.
- Clin d'œil à l'horlogerie : ton portrait est dans un cadran, avec un anneau fin et douze index abricot, celui de midi plus long.
- **Entrée** : l'anneau se dessine depuis midi, dans le sens des aiguilles d'une montre, les index apparaissent un à un derrière lui, et le nom se pose.
- **Sur téléphone**, le nom ouvre l'accueil. Le cadran arrive après les boutons.
- Score Lighthouse mobile : 99.

## Pour les trois

- Ce sont tes textes exacts et tes couleurs. La photo est `photo_youri_chemise_transparent.png`. Elle était dans ton dossier Téléchargements, pas dans `sources/` : je l'ai copiée dans les images du site, sans toucher à son fond.
- Le grand vide entre le nom et la photo a disparu sur grand écran, et aussi sur les écrans de portable (vérifié de 1280 × 720 à 2560 × 1440).
- Une relecture indépendante a trouvé un défaut que mes captures en 1920 px ne montraient pas : sur les portables, la photo de A et de B ne suivait pas la hauteur de l'écran (coupée ou flottante, et dans B le nom blanc passait sur la chemise blanche). C'est corrigé, et les captures ci-dessus sont celles d'après la correction.
- L'en-tête passe en bleu nuit sur ces pages. Le bouton « Télécharger mon CV » y devient abricot, sinon il serait invisible sur le fond bleu nuit.
- Les lettres du nom restent serrées pendant l'entrée, puis au repos. Aucune variante n'a d'effet à la souris sur le nom.
- Accessibilité : 0 erreur au test automatique axe, en 1920 et en 390 px. Aucun décalage de mise en page.

## Le défaut des lettres espacées, corrigé sur l'accueil actuel

Sur ordinateur, les trous entre les lettres de ton nom venaient de l'effet : la souris et l'entrée affinaient les lettres, mais chaque lettre gardait la place de sa version la plus grasse.

Maintenant, sur l'accueil actuel :

- **Entrée** : les lettres montent en vague et apparaissent, déjà à leur graisse finale.
- **Souris** : les lettres proches du pointeur se soulèvent légèrement.
- **Téléphone** : l'effet au défilement est supprimé.

Les lettres ne changent plus jamais d'épaisseur, donc elles restent serrées.

Cette correction est enregistrée sur la branche `passe-whaou` (commit `7f227ab`). Elle n'est pas encore sur `main`.

## Comment me donner ton choix

Dis-moi simplement « A », « B » ou « C ». Tu peux aussi combiner, par exemple « B, mais avec le cadran de C ». J'appliquerai alors la variante à l'accueil du vrai site et je supprimerai les pages d'essai.
