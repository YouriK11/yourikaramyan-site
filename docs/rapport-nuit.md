# Rapport de la nuit du 19 au 20 octobre 2026

Début du travail : 19 octobre, 21 h 37 (vérifié avec `Get-Date`).

**Interruption** : la session s'est arrêtée seule pendant la nuit, peu après 22 h 20, avant la fin de l'étape 5. Rien n'a été perdu. Le 20 octobre à 13 h 18, tu as écrit « continue » : j'ai terminé les étapes 5 et 6 dans l'après-midi, avec les mêmes règles que la nuit (rien en ligne, rien sur GitHub, rien dans `sources/`).

**En bref** : les étapes 3, 4, 5 et 6 sont terminées. Le site est complet sur ton ordinateur. Il n'est pas en ligne : c'est l'étape 7, qui attend tes réponses plus bas.

## Ce qui est terminé

### Étape 3 : étude de cas MonArc (commit `a5b5e9d`)

- Section « MonArc » complète : ta phrase de rôle, le contexte, les quatre étapes de ton travail, les résultats avec des compteurs animés (+500, +1 700, 1,9 M, +6 500, +170 000, 7j/7).
- Quatre captures de l'application dans des cadres de téléphone, en carrousel sur mobile. Les photos de profil et les prénoms des autres participants sont floutés.
- Boutons « Voir MonArc sur l'App Store » et « Ouvrir getmonarcapp.com ». Aucune mention de Google Play.
- Score Lighthouse mobile : 98 (performance), 100 (accessibilité).

### Étape 4 : parcours, compétences, contact (commit `90c7403`)

- Frise chronologique de ton CV, de 2026 à 2016, avec un repère par type (formation, expérience, projet académique, job étudiant). Sur ordinateur, l'année reste visible pendant le défilement.
- Compétences en quatre groupes, langues avec leur niveau, intérêts.
- Contact : ton adresse en grand, un bouton « Copier l'adresse », ton téléphone, ton LinkedIn, ton lieu, ton permis et le CV.
- Relecture indépendante : 6 corrections appliquées (coupures de mots, frise continue, bouton de copie plus fiable pour les lecteurs d'écran).
- Score Lighthouse mobile : 98 à 99 (performance), 100 (accessibilité), aucun décalage de mise en page.

### Étape 5 : page Col&McArthur et pages à dupliquer (commit `630918b`)

- Page `/col-macarthur/` : lettre à l'équipe, tes trois idées validées, ton profil en bref (+500, +1 700, 1,9 M, +21 000 €), ton CV en un coup d'œil, contact avec un objet d'e-mail prérempli.
- Jamais indexée par Google, absente du menu et du plan du site.
- Pour une nouvelle entreprise : copier un seul fichier (`src/content/entreprises/_modele.md`). Le guide pas à pas est dans `docs/guide-page-entreprise.md`.
- Garde-fous testés : un nom de fichier mal écrit, un texte « [À COMPLÉTER » oublié ou un nombre d'idées différent de 3 bloquent la construction avec un message clair en français.
- Relecture indépendante : 15 corrections appliquées (voir décisions 12 à 16).
- Score Lighthouse mobile : 100 (performance), 100 (accessibilité), 100 (bonnes pratiques).

### Étape 6 : finitions (commit `c51d1f6`)

- Images de partage au format LinkedIn (1200 × 630) : une pour l'accueil, une par page entreprise, avec ton nom et ta photo.
- Détails discrets : le trait abricot des titres se dessine une fois à l'arrivée du titre. Les liens, la flèche de téléchargement et les téléphones réagissent au survol de la souris. Tout s'arrête si l'appareil demande moins d'animations. Le nom de l'accueil reste le seul grand effet.
- Page 404 (« Page introuvable ») avec des raccourcis vers MonArc, ton parcours et tes coordonnées.
- Version imprimable propre : un recruteur qui imprime la page obtient un document noir sur blanc lisible.
- Compteur de visites GoatCounter prêt, mais inactif (voir « Ce qui reste à faire »).
- Fichiers de mise en ligne Vercel préparés (`vercel.json`, et `.vercelignore` qui empêche l'envoi du dossier `sources/`).
- Relecture indépendante : 8 corrections appliquées (impression, survol sur téléphone, arrivée directe sur une section depuis une autre page).
- Accessibilité : 0 erreur au test automatique axe sur les 3 pages, en 390 et en 1440 px.
- Score Lighthouse mobile final : accueil 99 (médiane de 3 mesures), page Col&McArthur 100, page 404 100. Accessibilité 100 partout. Aucun décalage de mise en page.
- Le score « SEO » de Lighthouse (69) est bas exprès : tant que le site n'est pas lancé, chaque page demande à Google de ne pas l'indexer.

## Décisions prises sans toi

1. **Winter Arc** : j'ai appliqué ta consigne de ce soir. L'étude de cas dit « Saison en cours : Winter Arc 2026, lancé le 1er octobre », sans date de fin ni saison suivante. J'ai mis à jour `docs/suivi.md` en conséquence.
2. **Badge App Store** : je n'utilise pas le badge officiel d'Apple. Apple réserve son téléchargement au titulaire du compte développeur, sous licence, et MonArc est publiée depuis un autre compte. Le site utilise un bouton texte « Voir MonArc sur l'App Store ». Écrire « App Store » dans un texte est permis.
3. **Accueil** : la ligne de preuve dit « l'application que j'ai conçue » (au lieu de « créée »), pour rester cohérente avec ta phrase de rôle.
4. **Grille Instagram floutée en plus** : la relecture a repéré que la capture laissait lire, en zoomant, les chiffres de « preuves postées aujourd'hui » (260, 300, 330, 361) que tu as refusés, ainsi que « 26e sur 992 cette semaine » et la date de fin « 29 décembre » (vignette Jour 90). Je les ai floutés dans la copie publiée (`src/assets/monarc/`). L'original dans `sources/` n'a pas été touché (empreintes vérifiées).
5. **Fonctionnement de MonArc** : l'étude de cas le décrit comme ta fiche App Store : « Chaque participant choisit trois habitudes et leur rythme. Chaque jour, il valide ce qu'il a fait. Une preuve en photo lui rapporte tous les points. » Ma première version disait qu'une photo était obligatoire chaque jour, ce qui était inexact. **À relire par toi.**
6. **Ta phrase de rôle** n'apparaît qu'une fois dans l'étude de cas (en tête), pour ne pas la répéter à quelques lignes d'écart.
7. **Chiffres avec « + » devant** (« +500 », « +1 700 », « +21 000 € ») : plus naturel en français que « 21 000 €+ ». Même sens : « plus de ».
8. **Résultats de ta boutique 2022 dans la frise** : « Plus de 21 000 € de ventes de mars 2022 à janvier 2023 » et « Taux de conversion : 1,55 % » (chiffres validés, nom de la boutique non affiché). J'ai choisi la valeur exacte 1,55 %.
9. **Accessibilité d'abord** : j'avais accéléré l'affichage avec une technique (`content-visibility`) qui masquait les sections Parcours, Compétences et Contact aux lecteurs d'écran avant défilement. Je l'ai retirée. Le score mobile est resté à 98.
10. **Pas de badge officiel ni de compte GoatCounter** : le compteur de visites est prêt mais inactif. Il s'active en écrivant ton code GoatCounter dans `src/data/site.ts` (créer le compte était interdit cette nuit).
11. **Page entreprise** : la lettre d'accroche à Col&McArthur est rédigée par moi, à partir de faits vérifiés (fragment du mur de Berlin, sable de Normandie, asphalte de Spa-Francorchamps) et de tes chiffres validés. **À relire par toi avant tout envoi.** Pour l'idée 3 (guide cadeau), j'ai ajouté « Mon expérience : une boutique e-commerce créée et gérée de A à Z en 2022, avec plus de 21 000 € de ventes. »
12. **Idée 1, une expression modifiée** : ton texte validé disait que la vidéo « montre le fragment authentique intégré à la montre ». Sur le site de Col&McArthur, la montre Armistice 1918 n'a pas de fragment (seulement des symboles : coquelicot, wagon). J'ai écrit « présente la montre qui lui rend hommage », vrai pour les trois dates. Le reste de l'idée est inchangé. **À relire par toi.**
13. **Bouton « M'écrire »** au lieu de « Écrire à Youri » : toute la lettre est à la première personne.
14. **Petites corrections de la page entreprise** : « 1,9 M de vues sur le TikTok de MonArc en 60 jours » (le chiffre dit maintenant à qui il appartient). Minuscule après « Mon expérience : ». Liste « Mon CV » remise dans l'ordre (en cours d'abord, puis par année de fin).
15. **Noms d'entreprise** : le titre fait l'élision tout seul (« l'équipe d'Ice-Watch »). Deux champs facultatifs s'ajoutent au modèle : `salutation` (le titre complet, si le titre automatique sonne faux) et `apercu` (la ligne de l'image de partage, si l'entreprise n'a pas de boutique en ligne). Sans eux, rien ne change.
16. **Plan du site** : il ne contient que l'accueil, quel que soit le nom des fichiers entreprises. Les noms `404` et `accueil` sont refusés (déjà pris par le site).
17. **Impression** : boutons et menu masqués, captures MonArc côte à côte, nom de l'accueil toujours entier. Les navigateurs n'impriment pas les fonds de couleur par défaut : un bouton bleu nuit serait devenu un cadre vide.
18. **Arrivée sur une section depuis une autre page** (par exemple « Contact » depuis la page Col&McArthur) : l'accueil s'ouvre directement sur la section, sans faire défiler toute la page.

## Captures finales

Les captures sont sur ton ordinateur, dans le dossier `captures/` (jamais envoyé en ligne).

- Étape 3 : [étude de cas 390 px](../captures/etape-3/final-etude-390.png), [étude de cas 1440 px](../captures/etape-3/final-etude-1440.png)
- Étape 4 : [parcours 390](../captures/etape-4/final-parcours-390.png), [parcours 1440](../captures/etape-4/final-parcours-1440.png), [compétences 390](../captures/etape-4/final-competences-390.png), [compétences 1440](../captures/etape-4/final-competences-1440.png), [contact 390](../captures/etape-4/final-contact-390.png), [contact 1440](../captures/etape-4/final-contact-1440.png)
- Étape 5 : [Col&McArthur 390](../captures/etape-5/final-col-macarthur-390.png), [Col&McArthur 1440](../captures/etape-5/final-col-macarthur-1440.png)
- Étape 6 : [accueil complet 390, haut](../captures/etape-6/accueil-complet-390-haut.png), [accueil complet 390, bas](../captures/etape-6/accueil-complet-390-bas.png), [accueil complet 1440](../captures/etape-6/accueil-complet-1440.png), [404 en 390](../captures/etape-6/404-390.png), [404 en 1440](../captures/etape-6/404-1440.png), [impression de l'accueil](../captures/etape-6/impression-1440.png), [impression Col&McArthur](../captures/etape-6/impression-col-macarthur-1440.png), [survol du menu](../captures/etape-6/survol-menu-1440.png), [survol d'un téléphone](../captures/etape-6/survol-telephone-1440.png)
- Images de partage (recréées à chaque construction du site) : `dist/og/accueil.png` et `dist/og/col-macarthur.png`.

## Ce qui reste à faire

1. **Bloquant pour la mise en ligne : Google Play.** Ton CV téléchargeable dit « sur l'App Store, Google Play et en version web ». Tant que MonArc n'est pas publique sur Google Play, cette phrase est inexacte. Le site, lui, ne parle pas de Google Play. Deux solutions : l'app devient publique (tu m'envoies le lien, j'ajoute le bouton), ou tu me donnes un CV corrigé.
2. **Étape 7 : mise en ligne.** Créer le dépôt privé sur GitHub (compte YouriK11), relier Vercel, acheter le domaine yourikaramyan.com sur Vercel, puis passer `SITE.enConstruction` à `false` pour que Google indexe l'accueil. Je t'expliquerai chaque commande, une par une.
3. **Adresse e-mail des enregistrements git.** Ils sont signés avec youri.karamyan@student.hepl.be. Sur le plan gratuit, Vercel refuse de publier un dépôt privé si cette adresse n'est pas reliée à ton compte GitHub. À vérifier avant l'étape 7.
4. **Compteur de visites.** Créer ton compte gratuit sur goatcounter.com, puis écrire ton code dans `src/data/site.ts` (ligne `goatcounter`).
5. **Dates de l'idée 1 pour Col&McArthur.** La page dit « Les trois prochaines dates tombent avant Noël : le 9 novembre, le 11 novembre et le 5 décembre ». Après le 9 novembre, cette phrase devient fausse : envoie la page avant, ou demande-moi de la mettre à jour.
6. **Après la mise en ligne** : tester le lien de la page Col&McArthur dans le LinkedIn Post Inspector, pour vérifier l'aperçu.
7. **CLAUDE.md** dit encore que le CV contient un lien vers l'ancien site base44. Ton CV actuel ne l'a plus : il affiche yourikaramyan.com. Cette ligne pourra être retirée.

## Questions pour toi

1. **Google Play** : MonArc est-elle maintenant publique sur Google Play ? Si oui, envoie-moi le lien. Sinon, préfères-tu me donner un CV corrigé ?
2. **Lettre à Col&McArthur** : peux-tu relire la lettre d'accroche (décision 11) et la nouvelle expression de l'idée 1 (décision 12) ? Je ne change rien d'autre sans ton accord.
3. **Fonctionnement de MonArc** (décision 5) : la description « trois habitudes, validation chaque jour, preuve en photo pour tous les points » est-elle exacte ?
4. **GitHub** : quelle adresse e-mail utilises-tu sur ton compte GitHub YouriK11 ? Ton adresse HEPL, ton Gmail, ou une autre ?
5. **Col&McArthur** : quand comptes-tu envoyer la page ? Avant le 9 novembre, les dates de l'idée 1 restent justes.
