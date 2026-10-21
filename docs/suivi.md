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
| 7 | Mise en ligne sur yourikaramyan.com (GitHub + Vercel, achat du domaine sur Vercel) | Préparée le 21/10/2026 : guide pas à pas `docs/guide-mise-en-ligne.md`. Reste à faire par Youri (comptes et achat) |

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
- MonArc n'est pas encore sur Google Play. Le site affiche l'App Store et la version web (getmonarcapp.com, qui sert aussi aux utilisateurs Android). Pas de bouton Google Play.
- Chiffres Instagram (preuves photo par jour) : refusés.
- Boutique 2022 : ne pas afficher son nom.

## Chiffres validés (à afficher arrondis)

MonArc (donnés par Youri et dans le CV) :
- plus de 500 inscrits le jour du lancement, le 1er octobre 2026 ;
- plus de 1 700 inscrits dans la base e-mail ;
- une vidéo TikTok publiée chaque jour, publications régulières sur Instagram.

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

- [ ] **Nouveau CV (bloquant pour l'étape 7)** : le 21/10/2026, Youri annonce un nouveau CV avec la nouvelle photo et sans Google Play, dans `sources/CV_Youri_Karamyan.pdf`. Le fichier n'est toujours pas sur l'ordinateur (nouvelle recherche le 21/10 au soir : seul le CV du 19/10, avec Google Play, existe). Le 21/10 vers 19 h, Youri le croit dans `sources/` : le fichier qui s'y trouve est identique, octet pour octet, à celui du 19/10 (ancienne photo sur fond jaune, Google Play). Les étapes B à F peuvent avancer : le site reste caché à Google tant que `enConstruction` vaut true. Ne pas partager le lien avant le nouveau CV. Dès qu'il est là : le relire en entier, mettre `src/data/profil.ts` à jour s'il a changé, retirer le commentaire « Google Play » de la ligne MonArc, copier le fichier dans `public/Youri-Karamyan-CV.pdf`, puis passer `SITE.enConstruction` à false. Ne pas passer à false avant.
- [x] **Nouvelle photo** : en place le 21/10/2026 au soir (trouvée dans Téléchargements, copiée dans `sources/` et `src/assets/photos/youri-portrait-detoure.png`). Accueil, cadran de la page entreprise et image de partage vérifiés en 390, 1024, 1440 et 1920 px.
- [ ] **Google Play** : MonArc n'y est pas publique. Ne jamais mentionner Google Play sans lien.
- [ ] **Informations sur les projets** : le 21/10 vers 19 h, Youri a donné les informations de la boutique, du freelance et du Young Enterprise Project (voir « Précisions de Youri (21/10/2026) »). Ces trois projets ont retrouvé leur panneau. Reste le **CRM Odoo**, ligne simple tant que Youri n'a rien donné (questions dans `docs/rapport-refonte.md`). Pour le freelance, un résultat (nombre de clients ou de missions, un retour client) renforcerait le panneau.
- [ ] **Chiffres du Young Enterprise Project, en attente de validation** (business plan Gob'Eat, `sources/business-plan-gobeat.pdf`). Affichés dans le panneau en local, à valider par Youri avant la mise en ligne publique (étape D) :
  - une équipe de dix étudiants (p. 3) ;
  - plus de 120 gobelets présentés lors de l'assemblée générale (p. 4), aussi en ligne de résumé ;
  - une enquête auprès de 85 personnes (p. 54) ;
  - « trois personnes interrogées sur quatre prêtes à essayer le produit » (75,3 % de « oui », question 5, p. 54) ;
  - deux cafés du centre de Liège interrogés (p. 29-31, leurs noms ne sont pas affichés).
- [ ] **Photo d'équipe Gob'Eat** (`sources/gobeat/visuel-equipe.jpg`) : pas affichée. Neuf coéquipiers y sont reconnaissables. À ajouter seulement si Youri confirme leur accord (sinon : la laisser de côté, ou la recadrer sur le stand sans visage).
- [ ] Domaine yourikaramyan.com : Youri l'achète lui-même avant l'étape 7.

## Précisions de Youri (19/10/2026)

- **Rôle sur MonArc, phrase imposée** : « J'ai conçu le produit et piloté son développement. » La reprendre mot pour mot, sans citer d'outil d'IA. (Le développeur affiché sur l'App Store, « Anaelle Grambras », vient du compte développeur Apple utilisé pour la publication. Ne pas citer ce nom sur le site.)
- **Liste d'attente** : les 1 700 inscrits forment une liste d'attente constituée avant le lancement.
- **Winter Arc** (consigne du 19/10/2026 au soir, qui remplace la précédente) : écrire seulement « Winter Arc 2026, lancé le 1er octobre ». Aucune date de fin, aucune saison suivante.
- **TikTok** : une vidéo par jour, construite à partir des preuves photo des utilisateurs. Ne mettre en avant aucune vidéo en particulier.
- Youri accepte les deux choix de l'étape 2 : phrase et ligne de preuve visibles dès le départ, léger recalage possible du texte si la police du texte arrive tard.

## Précisions de Youri (21/10/2026)

- **Boutique e-commerce (2022)** : elle vendait des équipements sportifs. Les clients venaient d'une stratégie d'influenceurs sur Twitter et YouTube. Le site écrit « marketing d'influence, sur Twitter et YouTube ». Toujours sans le nom de la boutique ni Shopify.
- **Freelance digital (2020-2023)** : clients indépendants. Le CV dit « particuliers et professionnels » : le site écrit « Mes clients étaient surtout des indépendants ». Mission donnée en exemple : le sous-titrage d'un cours en ligne.
- **Young Enterprise Project** : entreprise étudiante Gob'Eat (gobelet en biscuit nappé de chocolat belge). Youri en était le directeur général et le point de contact commercial (business plan, p. 3 et 10). Le business plan dit « 2025-2026 », le CV dit « 2025 » : le site garde 2025, comme le CV. Le business plan nomme les neuf autres membres de l'équipe et leurs e-mails : ne jamais les afficher.
- **Visuels des projets** (21/10/2026, déposés par Youri dans l'ancien dossier OneDrive `Documents\yourikaramyan-site\yourikaramyan-site\`, copiés dans `sources/`) : logo de la boutique (identique à `sources/boutique-2022/logo.jpg`, sans le nom de la boutique) et deux photos Gob'Eat (gobelets sur le stand, enseigne lumineuse). Versions recadrées en 4:5 (logo carré), sans métadonnées, dans `src/assets/projets/`. La capture Shopify (`sources/boutique-2022/shopify-stats.jpg`) reste hors du site : on y lit le nom de la boutique, « Shopify », « Domicile » et les miniatures de la galerie.
