# yourikaramyan.com

Site personnel de Youri Karamyan : portfolio professionnel et CV en ligne.
Objectif : décrocher un stage en marketing digital, de janvier à mai 2027 (CV du 26/10/2026).

**Au début de chaque session, lire `docs/suivi.md`** : décisions validées, contenus validés, éléments en attente, avancement des étapes. Le mettre à jour à la fin de chaque étape.
Avant de coder avec Astro, GSAP, Vercel ou les images de partage, lire `docs/reference-technique.md` (documentation vérifiée en octobre 2026).

## Qui est Youri
- 22 ans, étudiant en 3e bachelier E-Business à la HEPL (Liège).
- Langues : arménien (langue maternelle), français (bilingue), anglais (B2), allemand (notions).
- Débutant en technique : lui expliquer chaque commande à taper, étape par étape, sans rien supposer.

## Source de vérité
- `sources/CV_Youri_Karamyan.pdf` (version du 26/10/2026 : ancienne photo, stage de janvier à mai 2027, introduction, cinq projets dont la Ressourcerie du Pays de Liège, outils et qualités, dates « 2024 - en cours »). Le relire avant toute modification de contenu. Sur le site, la nouvelle photo détourée reste partout (choix de Youri).
- La copie publiée est `public/Youri-Karamyan-CV.pdf`. Si le CV change, remplacer les deux fichiers.
- N'inventer aucune expérience, aucune date, aucun chiffre. Si une information manque : la demander à Youri, ou poser un emplacement visible `[À COMPLÉTER : ...]`.
- **Principe (Youri, 26/10/2026, remplace toutes les demandes précédentes sur le contenu)** : le site est un portfolio professionnel. Il ne recopie pas le CV : il montre ce que Youri a fait, ce qu'il a accompli et avec quels outils. Le CV donne la base : mêmes titres, mêmes dates. Seulement les chiffres validés de `docs/suivi.md` (ou donnés par Youri dans un message, puis notés dans le suivi). Ne rien inventer : ce qui manque est listé dans le suivi et dans le rapport à Youri, jamais affiché avec un emplacement vide. Chiffre d'affaires et taux de conversion de la boutique : jamais affichés.

## Public et ton
- Recruteurs et fondateurs de PME belges. Moins d'une minute sur le site, souvent sur téléphone.
- En quelques secondes, ils voient que Youri est sérieux, concret et capable de faire grandir une marque en ligne.
- Ton professionnel et académique.

## Règles d'écriture (tous les textes du site)
- Textes en français.
- Jamais de tiret long (cadratin). Pour les périodes, trait d'union simple comme dans le CV : « 2022-2024 ».
- Aucune tournure en opposition du type « ce n'est pas X, c'est Y ».
- Phrases affirmatives simples, une idée par phrase.
- Outils d'intelligence artificielle : la règle qui interdisait leur nom est levée (Youri, 26/10/2026). Ils sont cités comme sur le CV (Shopify, Canva, Microsoft Office, ChatGPT, Claude, Gemini) et dans les outils de chaque projet.
- Aucun lien vers youri-digital-edge.base44.app (ancien site).

## Structure du site
Le site présente d'abord la personne (décision de Youri du 21/10/2026). C'est un portfolio professionnel (26/10/2026).

1. Accueil : il ne parle que de Youri. Nom en très grand, une phrase de présentation, boutons « Télécharger mon CV » et « Me contacter », portrait. Sur ordinateur, l'accueil occupe toute la hauteur de l'écran. Effet signature : le premier grand moment animé du site. Les lettres du nom restent toujours serrées (aucune variation de graisse).
2. À propos : le texte de Youri, mot pour mot (26/10/2026) : « Le digital m'intéresse autant pour sa créativité que pour son potentiel commercial. » puis « Étudiant en E-Business, j'ai déjà exploré plusieurs facettes de l'entrepreneuriat : e-commerce, création de contenu et développement de projets. Aujourd'hui, je souhaite mettre cette expérience au service d'une entreprise et continuer à apprendre sur le terrain. » L'accueil garde la phrase sur le stage de janvier à mai 2027.
2 bis. Mes résultats, juste après À propos : une rangée de chiffres avec compteurs animés (+500 inscrits le jour du lancement de l'application, +1 700 sur la liste d'attente, 1,9 M de vues TikTok en 60 jours, +6 500 abonnés TikTok, ~10 clients accompagnés en freelance). `src/components/Resultats.astro`.
3. Projets : une page par projet, `/projets/<slug>/` (`src/pages/projets/[projet].astro`, données dans `src/data/projets.ts`). Pages visibles sur Google, dans le plan du site, chacune avec son image de partage `/og/projet-<slug>.png`. Ordre : Projet d'application mobile (2026 - en cours), Entrepreneuriat e-commerce (boutique en ligne, 2022-2023), Freelance digital (2020-2023), Young Enterprise Project (HEPL, 2025, directeur général de Gob'Eat). Sur l'accueil, une carte par projet (visuel, dates, titre, rôle, un résultat) mène à sa page. Chaque page : le contexte, ce que j'ai fait, ce que j'ai accompli (avec les chiffres), les outils, les visuels, puis le projet suivant et le retour à l'accueil. Application : éventail de téléphones (deuxième et dernier moment animé, quand il arrive à l'écran), statistiques TikTok, grille Instagram, boutons App Store et Google Play. Boutique : logo, sans chiffre d'affaires ni taux de conversion. Young Enterprise Project : deux photos Gob'Eat, aucun autre membre de l'équipe nommé, aucune photo d'équipe (source : `sources/business-plan-gobeat.pdf`). La Ressourcerie du Pays de Liège n'a pas de page : elle est seulement dans le parcours.
4. Parcours : frise chronologique (formation, expériences, projets académiques dont la Ressourcerie, jobs étudiants), dates au format du CV (« 2024 - en cours », « 2023 - en cours »). Les lignes dont le projet a une page ont un lien « Voir le projet » vers cette page au lieu des détails. Les jobs étudiants s'affichent en détail dès le départ.
5. Compétences, qualités, langues et intérêts, repris exactement du CV.
6. Contact : e-mail avec bouton pour le copier, téléphone, LinkedIn, lieu, puis « 22 ans » et « Permis B et véhicule » sur deux lignes séparées.
7. Pages entreprises `/[nom-entreprise]` : absentes du menu, `noindex`, exclues du sitemap. Contenu : accroche adressée à l'équipe, 3 idées concrètes, résumé du profil, CV, bouton de contact. Une nouvelle page se crée en dupliquant un seul fichier.
   - Les 3 idées sont toujours proposées à Youri dans la conversation et validées par lui avant d'être mises sur la page.
   - Première page : `/col-macarthur`. Écrire « Col&McArthur » sur la page (orthographe de leur site).
   - Le portrait de la lettre est dans un cadran de montre (anneau fin, douze index abricot, tracé à l'arrivée), repris de la variante C à la demande de Youri.

## Design
- Couleurs : bleu nuit #18214F, abricot #EE9A35, fond blanc #FFFFFF, teinte claire #EEF1F8.
- L'abricot ne sert jamais de couleur de texte sur fond blanc (contraste insuffisant). Il sert de trait, de décor, ou de texte sur fond bleu nuit.
- Polices : Bricolage Grotesque pour les titres, Instrument Sans pour le texte.
- Utiliser la skill frontend-design. Le site a une vraie personnalité et ne ressemble à aucun template.
- GSAP autorisé. Deux moments animés seulement : le nom de l'accueil, puis l'éventail de téléphones de la page du projet d'application. Les compteurs comptent une fois, sans autre effet. Le reste du site reste calme et précis.
- Portrait : photo détourée (sans fond) posée sur le bleu nuit, avec un léger halo clair derrière Youri. Fichier `src/assets/photos/youri-portrait-detoure.png`, copie de `sources/photo_youri_portrait_transparent.png` (1847 × 1558, en place depuis le 21/10/2026), jamais retouchée : seul le cadrage se fait à l'affichage (format 4:5, centré sur le visage, voir `src/data/portrait.ts`).
- Effet signature : le nom ne pousse jamais le contenu en dessous pendant l'animation. Sa place finale est réservée dès le chargement (aucun décalage de mise en page).
- Respecter `prefers-reduced-motion`.

## Technique
- Site statique avec Astro 7. Consulter la documentation à jour d'Astro et de GSAP via context7.
- Pensé d'abord pour le téléphone. Score Lighthouse mobile supérieur à 90. Images optimisées.
- Balises Open Graph soignées (LinkedIn, e-mail), avec une image de partage au nom de Youri.
- Favicon aux initiales YK.
- Hébergement : Vercel (plan Hobby gratuit). Le domaine yourikaramyan.com sera acheté sur Vercel à l'étape 7. Code sur GitHub, compte `YouriK11`, dépôt privé.
- `sources/` contient les fichiers d'origine (dont des captures non floutées d'autres utilisateurs) : il n'est pas versionné dans git et ne doit jamais être publié. Seules les versions floutées vont dans `src/assets/`.

## Commandes utiles
- `npx astro dev --background` : lance le serveur de prévisualisation sur http://localhost:4321 (`npx astro dev stop`, `npx astro dev status`, `npx astro dev logs`).
- `npm run build` : construit le site final dans `dist/`.
- Youri, lui, lance le serveur avec `npm run dev` dans le terminal de VS Code et l'arrête avec Ctrl+C.

## Vérification
- Après chaque grande étape : ouvrir le site avec Playwright, captures à 390 px et 1440 px de large.
- Corriger tout ce qui ne va pas avant de montrer le résultat à Youri.
- Le Playwright de l'éditeur n'écrit que dans le dossier ouvert dans VS Code : enregistrer les captures dans `captures/` (non versionné).

## Façon de travailler
- Pour toute nouvelle fonctionnalité importante : proposer un plan, attendre la validation de Youri, puis coder.
- Expliquer chaque commande que Youri doit taper, étape par étape.
