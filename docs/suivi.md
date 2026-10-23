# Suivi du projet

Ce fichier garde les décisions de Youri, les contenus validés, les éléments en attente et l'avancement.
À relire au début de chaque session, et à mettre à jour à la fin de chaque étape.

## Session de nuit du 19 au 20/10/2026 (Youri absent, aucune question possible)

Consignes de Youri pour cette nuit :
- Travailler seul jusqu'à 3 h (vérifier l'heure avec `Get-Date`). Objectif : terminer les étapes 3, 4, 5 et 6.
- Ne poser aucune question. Pour chaque décision : choisir l'option la plus sûre et la plus fidèle à CLAUDE.md, puis la noter dans `docs/rapport-nuit.md`.
- Information incertaine : la laisser de côté, ne rien inventer. Pas de Google Play sans lien.
- Après chaque étape : captures 390 et 1440 px, corrections, relecture indépendante, commit git avec un message clair, mise à jour de ce fichier.
- Lighthouse mobile toujours au-dessus de 90. Abandonner toute idée qui le fait baisser.
- Interdit : mise en ligne, envoi vers GitHub, achat, création de compte. Ne rien modifier ni supprimer dans `sources/`. Ne pas toucher au fond des photos (déjà détourées).
- Un seul effet signature (l'accueil). Le reste : précis, calme, haut de gamme.
- À 3 h ou à la fin de l'étape 6 : écrire `docs/rapport-nuit.md` (étapes terminées avec numéros de commit, décisions prises seul, liens vers les captures finales, reste à faire, questions pour Youri).

## Avancement

| Étape | Contenu | État |
|---|---|---|
| 0 | Installation (Astro 7, GSAP, sitemap), dossier hors OneDrive, git | Terminée le 19/10/2026 |
| 1 | Fondations : couleurs, polices, menu, pied de page, favicon YK | Terminée le 19/10/2026 |
| 2 | Accueil et effet signature | Terminée le 19/10/2026 |
| 3 | Étude de cas MonArc | Terminée le 19/10/2026 (nuit), commit a5b5e9d |
| 4 | Parcours, compétences, contact | Terminée le 19/10/2026 (nuit), commit 90c7403 |
| 5 | Page /col-macarthur et système de duplication | Terminée le 20/10/2026, commit 630918b |
| 6 | Finitions : images de partage, accessibilité, Lighthouse mobile, compteur de visites | Terminée le 20/10/2026, commit c51d1f6 (compteur prêt, inactif sans compte GoatCounter) |
| 7 | Mise en ligne sur yourikaramyan.com (GitHub + Vercel, achat du domaine sur Vercel) | 21/10/2026 : étapes A à C terminées (CV final, `enConstruction: false`, dépôt privé `YouriK11/yourikaramyan-site` envoyé par Youri). D faite le 22/10/2026 : https://yourikaramyan-site.vercel.app publie chaque envoi sur GitHub tout seul (vérifié : version c0ff6f5 en ligne une minute après l'envoi, noindex des pages entreprises, CV, images de partage). Reste E (domaine yourikaramyan.com, achat par Youri) puis F (vérifications complètes par Claude) |

Passe visuelle « whaou » (20/10/2026) : branche `passe-whaou`, fusionnée dans `main` le 21/10/2026 avec la refonte. Détail dans `docs/rapport-passe-whaou.md`.

Refonte « la personne d'abord » (21/10/2026, demandée par Youri) : À propos, Projets en panneaux, nouveau menu, parcours allégé. Branche `refonte-projets`, fusionnée dans `main`. Détail dans `docs/rapport-refonte.md`. Les trois variantes de l'accueil (`docs/variantes.md`) sont abandonnées : la refonte les remplace (récupérables sur la branche `passe-whaou`, commit `c99d186`).

Soirée du 20/10/2026 (même branche) : lettres du nom toujours serrées, trois variantes de l'accueil sur `/essai-a`, `/essai-b`, `/essai-c` (**en attente du choix de Youri**, comparatif dans `docs/variantes.md`), puis améliorations sur grand écran. Détail dans `docs/rapport-soiree.md`.

## Décisions validées par Youri (19/10/2026)

- Plan, structure des fichiers et effet signature « le nom qui prend de l'ampleur » : validés.
- Condition sur l'effet signature : pendant l'animation, le nom ne pousse jamais le contenu en dessous. Sa place finale est réservée dès le chargement. Aucun décalage de mise en page.
- Le projet vit dans `C:\Users\youri\Projets\yourikaramyan-site` (hors OneDrive). L'ancien dossier OneDrive reste une sauvegarde.
- Captures de l'app : flouter les photos de profil ET les prénoms des autres utilisateurs. Le profil de Youri reste net.
- Marque : écrire « Col&McArthur » sur la page. Adresse : `/col-macarthur`.
- « IA générative » reste dans les compétences, mot pour mot comme dans le CV.
- Compteur de visites : oui, avec une solution gratuite et sans cookies.

## Décisions validées par Youri (19/10/2026, suite)

- Hébergement : **Vercel** (remplace Netlify, dont la limite d'environ 20 mises en ligne par mois est trop basse pour créer beaucoup de pages entreprises).
- Domaine yourikaramyan.com : pas encore acheté. Youri l'achètera sur Vercel à l'étape 7.
- GitHub : compte existant, identifiant `YouriK11`. Dépôt privé.
- Photo : `sources/photo.png` (1119 × 1730, fond uni proche de #EEF1F8). Remplace la photo extraite du CV.
- MonArc sur l'App Store : https://apps.apple.com/be/app/monarc/id6816906304?l=fr-FR
- ~~MonArc n'est pas encore sur Google Play.~~ Remplacé le 21/10/2026 : MonArc est sur Google Play (voir « Précisions de Youri (21/10/2026) »).
- Chiffres Instagram (preuves photo par jour) : refusés.
- Boutique 2022 : ne pas afficher son nom.

## Chiffres validés (à afficher arrondis)

> **Depuis le 23/10/2026, aucun de ces chiffres n'est affiché sur le site** (direction sobre voulue par Youri, voir « Nouvelle direction (23/10/2026) »). La liste reste comme historique.

MonArc (donnés par Youri et dans le CV) :
- plus de 500 inscrits le jour du lancement, le 1er octobre 2026 ;
- plus de 1 700 inscrits dans la base e-mail ;
- une vidéo TikTok publiée chaque jour, publications régulières sur Instagram (n'est plus un des six grands chiffres depuis le 21/10/2026 : elle reste dans « Ce que j'ai fait ») ;
- **usage de l'app** : l'écran « Aujourd'hui » de Youri affiche « 20e sur 1 056 cette semaine ». Afficher « +1 000 participants dans le classement de la semaine, au 21 octobre 2026 » (date du relevé : celle du message de Youri, qui décrit l'écran au présent ; aucune capture sur l'ordinateur). Remplace « 7j/7 » dans les six chiffres (Youri, 21/10/2026).

Young Enterprise Project, Gob'Eat (business plan `sources/business-plan-gobeat.pdf`, validés par Youri le 21/10/2026) :
- une équipe de dix étudiants (p. 3) ;
- plus de 120 gobelets présentés lors de l'assemblée générale (p. 4), aussi en ligne de résumé ;
- une enquête auprès de 85 personnes (p. 54) ;
- « trois personnes interrogées sur quatre prêtes à essayer le produit » (75,3 % de « oui », question 5, p. 54) ;
- deux cafés du centre de Liège interrogés (p. 29-31, leurs noms ne sont pas affichés).

TikTok @monarc_app (captures du 17/10/2026, validés par Youri) :
- 6 578 abonnés : afficher « plus de 6 500 abonnés » ;
- 172,8 K j'aime sur le profil : afficher « plus de 170 000 j'aime » ;
- sur 60 jours (19 août au 17 octobre 2026) : 1,9 M de vues de publications, 12,6 K partages, 3 K commentaires. Afficher « 1,9 million de vues en 60 jours », « plus de 12 000 partages », « 3 000 commentaires ».

Boutique e-commerce 2022, Shopify (capture, validés par Youri) :
- 21 844,88 € de ventes du 1er mars 2022 au 29 janvier 2023 : afficher « plus de 21 000 € de ventes » ;
- taux de conversion 1,55 % : afficher « 1,5 % » ou la valeur exacte.

Chiffres refusés, à ne pas utiliser :
- les preuves photo publiées par jour (Instagram).

## Contenus validés : page /col-macarthur

Les 3 idées retenues (ordre d'affichage). Texte validé, ajustements de forme possibles.

**Idée 1. Une vidéo courte à chaque date anniversaire**
Chaque montre porte une date de l'Histoire. Ces dates forment un calendrier éditorial tout prêt. Le jour de l'anniversaire, une vidéo verticale de 30 secondes raconte l'événement et présente la montre qui lui rend hommage. *(Ajustement de forme du 20/10/2026 : « montre le fragment authentique intégré à la montre » n'était pas vérifiable pour la montre Armistice 1918.)* Elle est publiée sur Instagram, TikTok et YouTube Shorts. La même histoire part le jour même par e-mail. Les trois prochaines dates tombent avant Noël : le 9 novembre (Berlin 1989), le 11 novembre (Armistice 1918) et le 5 décembre (Hallyday 2017).
Lien avec Youri : une vidéo TikTok publiée chaque jour pour MonArc.

**Idée 2. Une newsletter qui parle à chaque collectionneur**
Votre newsletter promet « Récits, nouveautés et accès privilégié à nos éditions limitées ». Une seule question à l'inscription permet de tenir cette promesse au plus près : quel univers vous passionne ? Chaque nouvel inscrit reçoit ensuite trois e-mails automatiques. Le premier raconte une pièce de son univers. Le deuxième montre les coulisses de fabrication. Le troisième lui ouvre l'accès anticipé à la prochaine édition numérotée. Chaque lancement touche ainsi d'abord les collectionneurs les plus concernés.
Lien avec Youri : base e-mail de plus de 1 700 inscrits, automatisation des leads dans le projet CRM Odoo.

**Idée 3. Un guide cadeau en trois questions**
Pour qui ? Quelle passion ? Quel budget ? Trois questions mènent à la bonne montre et rappellent le paiement en trois fois sans frais. Ce guide sert à Noël, puis à la fête des pères.

Faits vérifiés sur Col&McArthur (octobre 2026) :
- fondée en 2013 par Sébastien Colen ; vente uniquement en ligne ; premier espace éphémère à Liège du 29/11 au 27/12/2025 ; clients aux Émirats, en Italie, au Groenland ; 8 personnes (DH, 14/12/2025) ;
- 7 univers (Icônes, Performance, Battlefront, Milestones, Visionnaires, Interstellar, Signature), montres à partir de 499 €, note 4,8/5 sur 1 139 avis, newsletter, programme de fidélité, paiement en 3 fois avec Alma, site en 4 langues ; réseaux liés : Facebook, Instagram, LinkedIn (colandmacarthur.com) ;
- collection Céline Dion lancée le 3/10/2026, 2 026 exemplaires (FashionUnited).

## En attente de Youri

- [x] **Nouveau CV** : en place le 21/10/2026 vers 20 h 40. Fichier déposé par Youri dans l'ancien dossier OneDrive (`CV_Youri_Karamyan nouveau.pdf`), copié dans `sources/CV_Youri_Karamyan.pdf` et `public/Youri-Karamyan-CV.pdf`. Relu en entier : texte identique à celui du site (ancienne photo, App Store, Google Play et version web), aucun changement dans `profil.ts`. Sur le site, la nouvelle photo reste partout (Youri). `SITE.enConstruction` passé à false à sa demande : l'accueil sera visible sur Google dès la mise en ligne ; les pages entreprises et la 404 restent en noindex. Historique : le 21/10/2026, Youri annonce un nouveau CV avec la nouvelle photo et sans Google Play, dans `sources/CV_Youri_Karamyan.pdf`. Le fichier n'est toujours pas sur l'ordinateur (nouvelle recherche le 21/10 au soir : seul le CV du 19/10, avec Google Play, existe). Le 21/10 vers 19 h, Youri le croit dans `sources/` : le fichier qui s'y trouve est identique, octet pour octet, à celui du 19/10 (ancienne photo sur fond jaune, Google Play). Les étapes B à F peuvent avancer : le site reste caché à Google tant que `enConstruction` vaut true. Ne pas partager le lien avant le nouveau CV. Dès qu'il est là : le relire en entier, mettre `src/data/profil.ts` à jour s'il a changé, retirer le commentaire « Google Play » de la ligne MonArc, copier le fichier dans `public/Youri-Karamyan-CV.pdf`, puis passer `SITE.enConstruction` à false. Ne pas passer à false avant.
- [x] **Nouvelle photo** : en place le 21/10/2026 au soir (trouvée dans Téléchargements, copiée dans `sources/` et `src/assets/photos/youri-portrait-detoure.png`). Accueil, cadran de la page entreprise et image de partage vérifiés en 390, 1024, 1440 et 1920 px.
- [x] **Google Play** : publique le 21/10/2026. Bouton ajouté dans l'étude de cas, plateformes et ligne MonArc du Parcours mises à jour (texte du CV, mot pour mot).
- [x] **Informations sur les projets** : CRM Odoo retiré le 22/10/2026 (plus rien à demander). Historique : le 21/10 vers 19 h, Youri a donné les informations de la boutique, du freelance et du Young Enterprise Project (voir « Précisions de Youri (21/10/2026) »). Ces trois projets ont retrouvé leur panneau. Reste le **CRM Odoo**, ligne simple tant que Youri n'a rien donné (questions dans `docs/rapport-refonte.md`). Pour le freelance, un résultat (nombre de clients ou de missions, un retour client) renforcerait le panneau.
- [ ] Domaine yourikaramyan.com : Youri l'achète lui-même avant l'étape 7.

## Précisions de Youri (19/10/2026)

- **Rôle sur MonArc, phrase imposée** : « J'ai conçu le produit et piloté son développement. » La reprendre mot pour mot, sans citer d'outil d'IA. (Le développeur affiché sur l'App Store, « Anaelle Grambras », vient du compte développeur Apple utilisé pour la publication. Ne pas citer ce nom sur le site.)
- **Liste d'attente** : les 1 700 inscrits forment une liste d'attente constituée avant le lancement.
- **Winter Arc** (consigne du 19/10/2026 au soir, qui remplace la précédente) : écrire seulement « Winter Arc 2026, lancé le 1er octobre ». Aucune date de fin, aucune saison suivante.
- **TikTok** : une vidéo par jour, construite à partir des preuves photo des utilisateurs. Ne mettre en avant aucune vidéo en particulier.
- Youri accepte les deux choix de l'étape 2 : phrase et ligne de preuve visibles dès le départ, léger recalage possible du texte si la police du texte arrive tard.

## Précisions de Youri (21/10/2026)

- **Boutique e-commerce (2022)** : elle vendait des équipements sportifs. Les clients venaient d'une stratégie d'influenceurs sur Twitter et YouTube. Le site écrit « marketing d'influence, sur Twitter et YouTube ». Toujours sans le nom de la boutique ni Shopify.
- **Freelance digital (2020-2023)** : clients indépendants. Le CV dit « particuliers et professionnels » : le site écrit « Mes clients étaient surtout des indépendants » (phrase validée par Youri le 21/10/2026). Mission donnée en exemple : le sous-titrage d'un cours en ligne.
- **Young Enterprise Project** : entreprise étudiante Gob'Eat (gobelet en biscuit nappé de chocolat belge). Youri en était le directeur général et le point de contact commercial (business plan, p. 3 et 10). Le business plan dit « 2025-2026 », le CV dit « 2025 » : le site garde 2025, comme le CV. Le business plan nomme les neuf autres membres de l'équipe et leurs e-mails : ne jamais les afficher.
- **Photo d'équipe Gob'Eat** (`sources/gobeat/visuel-equipe.jpg`) : refusée par Youri le 21/10/2026. Ne pas la mettre sur le site.
- **Base e-mail de MonArc** : l'app est gratuite, on ne parle pas de « clients ». L'étude de cas écrit « Je l'anime par e-mail. » (le CV garde « base clients », `profil.ts` le recopie mais ce texte n'est pas affiché).
- **Capture TikTok Analytics** : recadrée le 21/10/2026 sous les tuiles « J'aime » et « Commentaires », pour cacher « Récompenses estimées $0.00 » (Youri). La rangée « Partages » et le graphique disparaissent aussi ; les partages restent cités dans le texte sous les chiffres. Original intact dans `sources/monarc/tiktok-stats.jpg`.
- **Google Play** : MonArc y est publique (lien donné par Youri vers 20 h : https://play.google.com/store/apps/details?id=com.getmonarcapp.app ; fiche « MonArc – Applications sur Google Play », développeur « YouriK », vérifiée le jour même). Le lancement du 1er octobre s'est fait sur l'App Store et en version web : le site garde cette phrase et ajoute « L'application est aussi disponible sur Google Play. », sans date de sortie (inconnue).
- **Lighthouse mobile avant l'étape D** (21/10/2026, `npx lighthouse` 13.5.0, version finale servie par `astro preview`) : accueil médiane 97 (92 à 99, 5 mesures), /col-macarthur médiane 100 (93 à 100, 3 mesures). Accessibilité 100, bonnes pratiques 100, CLS 0 partout. SEO 69 à cause du seul `noindex` voulu. Lighthouse refuse la page 404 (statut 404). Après l'ajout de Google Play : accueil médiane 99 (5 mesures : 94, 99, 99, 81, 99). Le 81 tombe sur un indice de puissance de 1 694, contre 2 140 à 2 470 pour les autres mesures (machine ralentie). Axe : 0 erreur avec le panneau MonArc ouvert, en 390 et 1440 px. Après `enConstruction: false` : accueil 99, 97, 99 (SEO 100, accessibilité 100, bonnes pratiques 100) ; une mesure à 80 écartée (indice de puissance 796, machine ralentie juste après la construction) ; /col-macarthur SEO 69, voulu (noindex). Cadran de /col-macarthur vérifié en 390, 1440 et 1920 px : 12 index abricot (midi plus long), anneau entièrement tracé, portrait rond centré à 0 px près, comme la variante C.
- **Visuels des projets** (21/10/2026, déposés par Youri dans l'ancien dossier OneDrive `Documents\yourikaramyan-site\yourikaramyan-site\`, copiés dans `sources/`) : logo de la boutique (identique à `sources/boutique-2022/logo.jpg`, sans le nom de la boutique) et deux photos Gob'Eat (gobelets sur le stand, enseigne lumineuse). Versions recadrées en 4:5 (logo carré), sans métadonnées, dans `src/assets/projets/`. La capture Shopify (`sources/boutique-2022/shopify-stats.jpg`) reste hors du site : on y lit le nom de la boutique, « Shopify », « Domicile » et les miniatures de la galerie.

## Précisions de Youri (22/10/2026)

- **Nouveau CV** (22/10/2026, 20 h 10) : encore déposé dans l'ancien dossier OneDrive (`ANCIEN-ne-plus-utiliser\yourikaramyan-site\CV_Youri_Karamyan.pdf`), copié dans `sources/` et `public/Youri-Karamyan-CV.pdf`. Relu en entier. Changements reportés dans `profil.ts` et sur le site :
  - objectif : « Stage en marketing digital, de janvier à mai 2027 » (le site écrit « Je cherche un stage en marketing digital, de janvier à mai 2027. ») : accueil, À propos, contact, titre et description pour Google, image de partage, texte alternatif par défaut, page Col&McArthur et modèle de page entreprise ;
  - accroche : « je me forme au marketing digital et à la relation client. Je veux aider une entreprise à se développer en ligne. » (À propos, phrase 3 : « Je m'y forme au marketing digital et à la relation client. ») ;
  - MonArc : le CV ne nomme plus l'app sous le titre ; le site garde « MonArc, getmonarcapp.com ». Points réordonnés ; le CV dit encore « base clients » (texte non affiché sur le site) ;
  - freelance : « Photo et vidéo, supports marketing, sites web, sous-titrage. » (et ligne du projet dans le même ordre) ;
  - CRM Odoo : retiré du CV, donc du Parcours, des Projets et de la liste « CV » des pages entreprises. Idée 2 de Col&McArthur, « Mon expérience » : « une liste d'attente de plus de 1 700 inscrits pour MonArc, que j'anime par e-mail. » (la mention du projet CRM est retirée) ;
  - compétences : Marketing et communication ; Relation client ; Outils ; Web (WordPress et négociation ne sont plus sur le CV) ;
  - intérêts : « Entrepreneuriat, immobilier, nouvelles technologies, course à pied et vidéo ».
- **Retirés de l'étude de cas MonArc** (demande de Youri) : la phrase sur les partages et commentaires TikTok et la date de relevé du 17/10 ; « Les photos de profil et les prénoms des autres participants sont floutés. » (le floutage reste appliqué aux captures) ; « Saison en cours : Winter Arc 2026, lancé le 1er octobre ».
- **Projets** : la ligne CRM Odoo est retirée. Les quatre projets restants ont tous un panneau.
- **À propos** (22/10/2026, demande de Youri) : retirés « Après des études de sciences de gestion à HEC Liège », la phrase sur la formation (« Je m'y forme au marketing digital… ») et celle sur l'entrepreneuriat. Il reste quatre phrases : « Je m'appelle Youri Karamyan, j'ai 22 ans et j'étudie à Liège. Je suis en 3e bachelier E-Business à la HEPL. Je veux aider une entreprise à se développer en ligne. Je cherche un stage en marketing digital, de janvier à mai 2027. » La troisième vient du CV : ajoutée par Claude pour garder « ce qui le motive » et les 4 phrases de CLAUDE.md ; à retirer si Youri préfère trois phrases.
- **Quick Herstal** (Parcours) : « équipier polyvalent tous les week-ends, en fermeture. », depuis 2023 (formulation de Youri, différente du CV).
- **Chiffres MonArc** (22/10/2026, Youri) : quatre seulement dans le panneau : plus de 500 inscrits le jour du lancement, plus de 1 700 sur la liste d'attente, 1,9 million de vues TikTok en 60 jours, plus de 6 500 abonnés TikTok. « +1 000 participants » et « +170 000 j'aime » ne sont plus affichés (toujours valides). Grille : deux par ligne, quatre sur une ligne à partir de 64em.
- **Jobs étudiants** (22/10/2026) : la ligne résumée « Quick Herstal (depuis 2023), Atlas Agency… » cachait la nouvelle formulation de Quick Herstal (visible seulement après « Voir tout le parcours »). Les trois jobs s'affichent maintenant en détail dès le départ.
- **Page /col-macarthur** (22/10/2026) : la demande « retire la » est arrivée coupée ; rien n'a été modifié sur cette page.

## Nouvelle direction (23/10/2026)

Youri : « je suis quelqu'un de discret et je ne veux rien prouver. Le site doit être sobre sur mes projets personnels. » Appliqué sans question, comme il l'a demandé.

- **CV du 23/10/2026** (13 h 07) : encore déposé dans `ANCIEN-ne-plus-utiliser\yourikaramyan-site\CV_Youri_Karamyan.pdf` (copie dans Téléchargements). Copié dans `sources/` et `public/Youri-Karamyan-CV.pdf`. Relu en entier : chaque projet tient en une phrase, plus de boutique ni de nom d'application, Quick Herstal « équipier polyvalent tous les week-ends, en fermeture ».
- **Projets** : trois cartes (année, titre, une phrase du CV mot pour mot) : Projet d'application mobile (2026), Freelance digital (2020-2023), Young Enterprise Project (HEPL, 2025). Plus de panneaux.
- **Retirés** : chiffres et compteurs, éventail de téléphones, captures TikTok et Instagram, photos Gob'Eat, logo de la boutique, boutons App Store, Google Play et getmonarcapp.com. Fichiers supprimés : `EtudeDeCas.astro`, `Compteur.astro`, `Telephone.astro`, `src/data/projets.ts`, `src/data/nombres.ts`, `src/assets/monarc/`, `src/assets/projets/` (originaux toujours dans `sources/`).
- **Nom de l'application** : n'apparaît plus nulle part sur le site (pages, images de partage, fiche JSON-LD). On écrit « une application de suivi d'habitudes ».
- **Boutique e-commerce** : retirée partout (projets, parcours, pages entreprises).
- **Parcours** : chaque ligne reprend la phrase du CV ; plus de lien « Voir le projet ».
- **Page /col-macarthur** : bloc des chiffres clés retiré, lien vers l'étude de cas remplacé par « Voir mes projets ». « Mon profil en bref » : « J'ai conçu une application de suivi d'habitudes et sa communication. » Accroche : « Pour une application de suivi d'habitudes que j'ai conçue, je publie une vidéo TikTok par jour. Avant le lancement, j'ai constitué une liste d'attente. Voici trois idées concrètes pour vos ventes en ligne. » (« votre boutique en ligne » devient « vos ventes en ligne », pour que le mot « boutique » disparaisse du site). « Mon expérience » sans chiffres : idée 1 « une vidéo TikTok publiée chaque jour pour une application de suivi d'habitudes » ; idée 2 « une liste d'attente constituée avant le lancement d'une application de suivi d'habitudes, et animée par e-mail » ; idée 3 « le Young Enterprise Project à la HEPL, la création d'une entreprise étudiante, de l'étude de marché au lancement ». Liste « Mon CV » sans boutique.
- **Animations** : il ne reste que le nom de l'accueil.
- **Vérifié** (version finale) : aucun « MonArc », « boutique », lien vers l'app ni chiffre de projet dans `dist/` ; images de partage et JSON-LD propres ; 390, 1440 et 1920 px sans décalage ni débordement ; axe 0 erreur (accueil et Col&McArthur, 390 et 1440 px) ; Lighthouse mobile accueil 97, 99, 99 (SEO 100), Col&McArthur 100.
