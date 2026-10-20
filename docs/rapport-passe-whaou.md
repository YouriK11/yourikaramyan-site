# Rapport de la passe « whaou » (20 octobre 2026)

Travail seul à partir de 15 h 32 (heure vérifiée avec `Get-Date`), limite fixée à 17 h 32. Tout était terminé et vérifié à 16 h 30 : je me suis arrêté là, sans ajouter de changements que tu n'avais pas demandés.
Tout est sur la branche git `passe-whaou`. La branche principale `main` n'a pas été touchée.
Rien n'a été mis en ligne ni envoyé sur GitHub. Le dossier `sources/` n'a pas été modifié. Aucun texte factuel n'a changé et aucun chiffre n'a été inventé.

## En bref

- Sur ordinateur, l'accueil remplit l'écran. Le nom est beaucoup plus grand et la photo aussi.
- L'étude de cas s'ouvre sur six résultats en très grand.
- Les trois écrans de MonArc s'ouvrent en éventail, devant un halo clair.
- Le parcours montre d'abord l'essentiel, avec un bouton « Voir tout le parcours ».
- Score Lighthouse mobile : 99 sur l'accueil (5 mesures sur 5), 100 sur la page Col&McArthur et sur la page 404. Accessibilité 100 partout, aucun décalage de mise en page.

## Ce que j'ai changé, point par point

### 1. Échelle (commit `a720f08`)

- La zone de contenu passe à environ 1200 px de large.
- Sur ordinateur, le texte, les titres et les boutons sont plus grands. Sur téléphone, toutes les tailles restent identiques.
- Sur ordinateur, l'accueil occupe toute la hauteur de l'écran.
- Le nom traverse toute la largeur, comme une affiche. La photo, plus grande, se place à droite, à côté de « Youri ». La fin de « Karamyan » passe devant la photo.
- Taille du nom : environ 224 px à 1440 et à 1920 px (avant : 165 px et 163 px). La photo passe de 292 à 388 px de large.
- Sur un écran de portable peu haut, le nom s'adapte pour que les boutons et la ligne MonArc restent visibles sans défiler. Il y reste plus grand qu'avant (par exemple 179 px au lieu de 166 px en 1366 × 768).

### 2. Preuves (commit `95c4a36`)

- Une rangée « Les résultats » en très grand ouvre l'étude de cas, juste sous la présentation de MonArc.
- Six chiffres, avec les compteurs animés : +500 inscrits le jour du lancement, +1 700 sur la liste d'attente, 7j/7 (une vidéo TikTok publiée chaque jour), puis 1,9 M de vues sur TikTok en 60 jours, +6 500 abonnés et +170 000 j'aime. Les chiffres TikTok sont validés dans `docs/suivi.md`.
- Les libellés sont ceux d'avant, mot pour mot. La note sur la période (19 août au 17 octobre 2026) reste sous la rangée.

### 3. Téléphones (commit `c697145`)

- Les trois écrans de l'application sont en éventail et nettement plus grands. Le téléphone du centre mesure 330 px de large à 1440 px et 352 px à 1920 px, contre 264 px avant.
- Le fil des preuves photo est devant et un peu plus haut. Le classement et le profil sont inclinés derrière.
- Un halo clair derrière les téléphones les détache du bleu nuit, et une ombre sépare les plans.
- Quand l'éventail arrive à l'écran, les téléphones s'écartent doucement, en 1,5 seconde, une seule fois. C'est le deuxième et dernier moment animé du site.
- Sans JavaScript, ou si l'appareil demande moins d'animations, l'éventail est déjà ouvert.
- Les captures Instagram et TikTok sont regroupées dans un bloc « Sur les réseaux sociaux », après « Ce que j'ai fait ».

### 4. Parcours (commit `f5a593e`)

- Par défaut, la frise montre MonArc, la boutique e-commerce, le bachelier HEPL, le bachelier HEC et les deux projets académiques.
- Les jobs étudiants tiennent sur une ligne : « Quick Herstal (depuis 2023), Atlas Agency (2023) et Chemin Faisant / Métaphore (2020-2022). »
- Le bouton « Voir tout le parcours » déplie le reste : le freelance, le CESS et le détail de chaque job, avec les textes du CV. Le bouton devient « Réduire le parcours ».
- Sur ordinateur, les années sont beaucoup plus grandes (jusqu'à 80 px).

### Corrections après relecture indépendante (commit `4629440`)

J'ai fait relire la passe par quatre relecteurs indépendants (design, accessibilité, code, faits). Leurs remarques ont été vérifiées une par une. J'ai corrigé les 12 remarques confirmées, dont :

- la loupe du nom au passage de la souris, qui visait mal la ligne « Karamyan » ;
- à 1920 px, le trait abricot se collait au bloc abricot de la photo : le nom est maintenant plafonné à 224 px et le trait passe derrière la photo ;
- un halo plus visible ;
- les téléphones jamais plus petits qu'avant sur mobile (240 px) ;
- les captures réseaux l'une sous l'autre sur téléphone ;
- l'impression, qui montre toujours le parcours entier ;
- après « Voir tout le parcours », le clavier et les lecteurs d'écran reprennent à la première année dépliée.

J'ai aussi mis à jour `CLAUDE.md` et `docs/reference-technique.md` sur la branche.

## Captures avant et après

Les captures sont sur ton ordinateur, dans `captures/passe-whaou/` (jamais envoyé en ligne).

| Partie | 390 px (téléphone) | 1440 px | 1920 px (ton écran) |
|---|---|---|---|
| Accueil, avant | [avant](../captures/passe-whaou/avant-accueil-390.png) | [avant](../captures/passe-whaou/avant-accueil-1440.png) | [avant](../captures/passe-whaou/avant-accueil-1920.png) |
| Accueil, après | [après](../captures/passe-whaou/apres-accueil-390.png) | [après](../captures/passe-whaou/apres-accueil-1440.png) | [après](../captures/passe-whaou/apres-accueil-1920.png) |
| Étude de cas, avant | [avant](../captures/passe-whaou/avant-monarc-390.png) | [avant](../captures/passe-whaou/avant-monarc-1440.png) | [avant](../captures/passe-whaou/avant-monarc-1920.png) |
| Étude de cas, après | [après](../captures/passe-whaou/apres-monarc-390.png) | [après](../captures/passe-whaou/apres-monarc-1440.png) | [après](../captures/passe-whaou/apres-monarc-1920.png) |
| Éventail en train de s'ouvrir | [image](../captures/passe-whaou/point3-eventail-ouverture-390.png) | [image](../captures/passe-whaou/point3-eventail-ouverture-1440.png) | [image](../captures/passe-whaou/point3-eventail-ouverture-1920.png) |
| Parcours, avant | [avant](../captures/passe-whaou/avant-parcours-390.png) | [avant](../captures/passe-whaou/avant-parcours-1440.png) | [avant](../captures/passe-whaou/avant-parcours-1920.png) |
| Parcours, après (replié) | [après](../captures/passe-whaou/apres-parcours-390.png) | [après](../captures/passe-whaou/apres-parcours-1440.png) | [après](../captures/passe-whaou/apres-parcours-1920.png) |
| Parcours, après (déplié) | [après](../captures/passe-whaou/apres-parcours-complet-390.png) | [après](../captures/passe-whaou/apres-parcours-complet-1440.png) | [après](../captures/passe-whaou/apres-parcours-complet-1920.png) |

Les captures prises après chaque point (`point1-…`, `point2-…`, `point3-…`, `point4-…`) sont dans le même dossier.

## Décisions prises sans toi

1. **Branche** : tes changements demandés juste avant ta consigne avaient déjà commencé. J'ai créé `passe-whaou` à partir de la version du 20 octobre (`bb6374f`), puis j'ai refait le travail point par point, avec un enregistrement par point.
2. **Accueil plein écran sur ordinateur seulement** : ton point 1 parle de l'ordinateur. Sur téléphone, l'accueil reste tel quel. Il montrait déjà le haut de l'étude de cas, ce qui invite à défiler.
3. **Nom devant la photo** : pour agrandir à la fois le nom et la photo, le nom traverse toute la largeur et sa fin passe devant la photo. Aux largeurs testées (de 1024 à 2560 px), les lettres passent devant l'épaule, jamais devant le visage. Le trait abricot passe derrière la photo.
4. **Boutons un peu plus grands** sur grand écran, pour rester en proportion avec le nom.
5. **Six chiffres** dans la rangée : j'ai ajouté « +170 000 j'aime », validé lui aussi, aux vues et aux abonnés. « 7j/7 » ne compte pas, car ce n'est pas un nombre.
6. **Trois téléphones dans l'éventail** : pour avoir « celui du milieu », il faut un nombre impair. J'ai gardé les trois écrans sombres de l'application (classement, fil devant, profil). Les captures Instagram et TikTok, claires, sont dans un bloc « Sur les réseaux sociaux ». Ce titre est nouveau, mais il ne contient aucun fait.
7. **Légendes de l'éventail** : sur ordinateur, une légende sous chaque téléphone. Sur téléphone, les légendes forment une liste avec la position entre parenthèses, par exemple « Le fil des preuves photo (au centre) ».
8. **Animation du trait des titres retirée** : je l'avais ajoutée cette nuit. Pour que l'éventail soit le deuxième et dernier moment animé, les traits sont maintenant fixes. Les compteurs restent, car tu les as demandés. Les petits effets au survol de la souris restent aussi : ils répondent à un geste du visiteur.
9. **Parcours replié** : le freelance digital et le CESS ne sont pas dans ta liste d'éléments forts, donc ils sont repliés. La ligne « Jobs étudiants » est placée à la fin de la frise. Une fois dépliés, les jobs retrouvent leur ligne exacte du CV.
10. **Bouton « Réduire le parcours »** pour replier. Le dépliage est instantané, sans animation, pour ne pas créer un troisième moment animé.
11. **Sans JavaScript et à l'impression**, tout le parcours est affiché.
12. **CLAUDE.md mis à jour** sur la branche, pour que les prochaines sessions respectent la passe : deux moments animés, accueil plein écran sur ordinateur.

## Comment voir le résultat sur ton ordinateur

1. Ouvre VS Code sur le dossier `C:\Users\youri\Projets\yourikaramyan-site`.
2. Ouvre le menu **Terminal**, puis **Nouveau terminal**.
3. Tape `git switch passe-whaou` puis Entrée. Les fichiers du dossier passent à la version de la passe.
4. Tape `npm run dev` puis Entrée. Attends la ligne `http://localhost:4321/`.
5. Ouvre `http://localhost:4321/` dans ton navigateur, en plein écran sur ton écran de 1920 px. Réduis aussi la fenêtre à la taille d'un téléphone.
6. Pour comparer avec l'ancienne version : clique dans le terminal, appuie sur **Ctrl+C** pour arrêter le serveur, tape `git switch main`, puis `npm run dev`. Recommence l'étape 3 pour revenir à la passe.

## Garder ces changements ou revenir en arrière

Pour **garder** la passe, tape ces deux commandes :

```
git switch main
git merge passe-whaou
```

La première commande revient sur la branche principale. La seconde y ajoute les enregistrements de la passe. Ensuite, `git branch -d passe-whaou` supprime la branche devenue inutile (facultatif).

Pour **revenir à l'ancienne version**, tape seulement :

```
git switch main
```

La branche `main` est exactement comme avant la passe. La passe reste rangée dans sa branche, au cas où tu changerais d'avis. Pour la supprimer pour de bon, tape `git branch -D passe-whaou`. Attention, c'est définitif.

## À regarder en priorité

- L'accueil sur ton écran de 1920 px : la fin de « Karamyan » devant ta photo.
- L'ouverture de l'éventail : fais défiler jusqu'à MonArc et regarde les téléphones s'écarter.
- Le parcours replié : vérifie que la sélection d'éléments forts te convient.
