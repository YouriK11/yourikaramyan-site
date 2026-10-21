# yourikaramyan.com

Site personnel de Youri Karamyan : CV en ligne et portfolio.
Objectif : décrocher un stage en marketing digital et e-commerce.

**Au début de chaque session, lire `docs/suivi.md`** : décisions validées, contenus validés, éléments en attente, avancement des étapes. Le mettre à jour à la fin de chaque étape.
Avant de coder avec Astro, GSAP, Vercel ou les images de partage, lire `docs/reference-technique.md` (documentation vérifiée en octobre 2026).

## Qui est Youri
- 22 ans, étudiant en 3e bachelier E-Business à la HEPL (Liège).
- Langues : arménien (langue maternelle), français (bilingue), anglais (B2), allemand (notions).
- Débutant en technique : lui expliquer chaque commande à taper, étape par étape, sans rien supposer.

## Source de vérité
- `sources/CV_Youri_Karamyan.pdf` (version du 19/10/2026, avec yourikaramyan.com). Le relire avant toute modification de contenu.
- La copie publiée est `public/Youri-Karamyan-CV.pdf`. Si le CV change, remplacer les deux fichiers.
- N'inventer aucune expérience, aucune date, aucun chiffre. Si une information manque : la demander à Youri, ou poser un emplacement visible `[À COMPLÉTER : ...]`.
- N'afficher que les chiffres listés dans `docs/suivi.md` (section « Chiffres validés »), arrondis comme indiqué.
- MonArc est sur Google Play depuis le 21/10/2026 (lien donné par Youri, fiche publique vérifiée le jour même) : https://play.google.com/store/apps/details?id=com.getmonarcapp.app. Le lancement du 1er octobre 2026 s'est fait sur l'App Store et en version web : Google Play est arrivé ensuite.

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
Le site présente d'abord la personne (décision de Youri du 21/10/2026). MonArc est un projet parmi les autres.

1. Accueil : il ne parle que de Youri. Nom en très grand, une phrase de présentation, boutons « Télécharger mon CV » et « Me contacter », portrait. Sur ordinateur, l'accueil occupe toute la hauteur de l'écran. Effet signature : le premier grand moment animé du site. Les lettres du nom restent toujours serrées (aucune variation de graisse).
2. À propos : 4 ou 5 phrases courtes à la première personne (qui il est, ses études, ce qui le motive, ce qu'il cherche), uniquement des faits du CV.
3. Projets : une ligne par projet (MonArc, boutique e-commerce, freelance digital, CRM Odoo, Young Enterprise Project) : titre, année, rôle, une ligne de résultat. Un projet n'a un panneau dépliant `<details>` (fermé par défaut) que si Youri a donné son contexte, ce qu'il a fait et ses résultats : « un panneau qui s'ouvre sur presque rien fait plus de mal que de bien » (Youri, 21/10/2026). Liste dans `src/data/projets.ts` ; depuis le 21/10/2026 : MonArc, boutique e-commerce, freelance digital et Young Enterprise Project (Gob'Eat, source : `sources/business-plan-gobeat.pdf`, n'y nommer aucun autre membre de l'équipe). Le CRM Odoo reste une ligne simple. Le panneau MonArc contient l'étude de cas (chiffres, téléphones en éventail, réseaux sociaux) ; l'éventail s'ouvre à l'ouverture du panneau (deuxième et dernier moment animé du site). Boutons App Store, Google Play et getmonarcapp.com.
4. Parcours : frise chronologique (formation, expériences, projets académiques, jobs étudiants). Les lignes dont le projet a un panneau n'ont pas de détails, seulement un lien « Voir le projet ». Les autres gardent les détails du CV.
5. Compétences et langues, reprises du CV.
6. Contact : e-mail avec bouton pour le copier, téléphone, LinkedIn.
7. Pages entreprises `/[nom-entreprise]` : absentes du menu, `noindex`, exclues du sitemap. Contenu : accroche adressée à l'équipe, 3 idées concrètes, résumé du profil, CV, bouton de contact. Une nouvelle page se crée en dupliquant un seul fichier.
   - Les 3 idées sont toujours proposées à Youri dans la conversation et validées par lui avant d'être mises sur la page.
   - Première page : `/col-macarthur`. Écrire « Col&McArthur » sur la page (orthographe de leur site).
   - Le portrait de la lettre est dans un cadran de montre (anneau fin, douze index abricot, tracé à l'arrivée), repris de la variante C à la demande de Youri.

## Design
- Couleurs : bleu nuit #18214F, abricot #EE9A35, fond blanc #FFFFFF, teinte claire #EEF1F8.
- L'abricot ne sert jamais de couleur de texte sur fond blanc (contraste insuffisant). Il sert de trait, de décor, ou de texte sur fond bleu nuit.
- Polices : Bricolage Grotesque pour les titres, Instrument Sans pour le texte.
- Utiliser la skill frontend-design. Le site a une vraie personnalité et ne ressemble à aucun template.
- GSAP autorisé. Deux moments animés seulement : le nom de l'accueil, puis l'éventail de téléphones du panneau MonArc. Le reste du site reste calme et précis.
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
