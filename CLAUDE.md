# yourikaramyan.com

Site personnel de Youri Karamyan : CV en ligne et portfolio.
Objectif : décrocher un stage en marketing digital et e-commerce.

**Au début de chaque session, lire `docs/suivi.md`** : décisions validées, contenus validés, éléments en attente, avancement des étapes. Le mettre à jour à la fin de chaque étape.
Avant de coder avec Astro, GSAP, Netlify ou les images de partage, lire `docs/reference-technique.md` (documentation vérifiée en octobre 2026).

## Qui est Youri
- 22 ans, étudiant en 3e bachelier E-Business à la HEPL (Liège).
- Langues : arménien (langue maternelle), français (bilingue), anglais (B2), allemand (notions).
- Débutant en technique : lui expliquer chaque commande à taper, étape par étape, sans rien supposer.

## Source de vérité
- `sources/CV_Youri_Karamyan.pdf` (version du 19/10/2026, avec yourikaramyan.com). Le relire avant toute modification de contenu.
- La copie publiée est `public/Youri-Karamyan-CV.pdf`. Si le CV change, remplacer les deux fichiers.
- N'inventer aucune expérience, aucune date, aucun chiffre. Si une information manque : la demander à Youri, ou poser un emplacement visible `[À COMPLÉTER : ...]`.
- N'afficher que les chiffres listés dans `docs/suivi.md` (section « Chiffres validés »), arrondis comme indiqué.

## Public et ton
- Recruteurs et fondateurs de PME belges. Moins d'une minute sur le site, souvent sur téléphone.
- En quelques secondes, ils voient que Youri est sérieux, concret et capable de faire grandir une marque en ligne.
- Ton professionnel et académique.

## Règles d'écriture (tous les textes du site)
- Textes en français.
- Jamais de tiret long (cadratin). Pour les périodes, trait d'union simple comme dans le CV : « 2022-2024 ».
- Aucune tournure en opposition du type « ce n'est pas X, c'est Y ».
- Phrases affirmatives simples, une idée par phrase.
- Aucun nom d'outil d'intelligence artificielle sur le site. « IA générative » reste dans les compétences (choix de Youri).
- Aucun lien vers youri-digital-edge.base44.app (ancien site).

## Structure du site
1. Accueil : nom en très grand, une phrase de présentation, boutons « Télécharger mon CV » et « Me contacter ». Effet signature : le seul grand moment animé du site.
2. Étude de cas MonArc : contexte, actions (conception, lancement, promotion, gestion de la base clients), résultats en compteurs animés, captures dans des maquettes de téléphone, boutons App Store, Google Play et getmonarcapp.com.
3. Parcours : frise chronologique (formation, expériences, projets académiques, jobs étudiants), reprise du CV.
4. Compétences et langues, reprises du CV.
5. Contact : e-mail avec bouton pour le copier, téléphone, LinkedIn.
6. Pages entreprises `/[nom-entreprise]` : absentes du menu, `noindex`, exclues du sitemap. Contenu : accroche adressée à l'équipe, 3 idées concrètes, résumé du profil, CV, bouton de contact. Une nouvelle page se crée en dupliquant un seul fichier.
   - Les 3 idées sont toujours proposées à Youri dans la conversation et validées par lui avant d'être mises sur la page.
   - Première page : `/col-macarthur`. Écrire « Col&McArthur » sur la page (orthographe de leur site).

## Design
- Couleurs : bleu nuit #18214F, abricot #EE9A35, fond blanc #FFFFFF, teinte claire #EEF1F8.
- L'abricot ne sert jamais de couleur de texte sur fond blanc (contraste insuffisant). Il sert de trait, de décor, ou de texte sur fond bleu nuit.
- Polices : Bricolage Grotesque pour les titres, Instrument Sans pour le texte.
- Utiliser la skill frontend-design. Le site a une vraie personnalité et ne ressemble à aucun template.
- GSAP autorisé. Le reste du site reste calme et précis, pour que l'effet de l'accueil marque les esprits.
- Effet signature : le nom ne pousse jamais le contenu en dessous pendant l'animation. Sa place finale est réservée dès le chargement (aucun décalage de mise en page).
- Respecter `prefers-reduced-motion`.

## Technique
- Site statique avec Astro 7. Consulter la documentation à jour d'Astro et de GSAP via context7.
- Pensé d'abord pour le téléphone. Score Lighthouse mobile supérieur à 90. Images optimisées.
- Balises Open Graph soignées (LinkedIn, e-mail), avec une image de partage au nom de Youri.
- Favicon aux initiales YK.
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
