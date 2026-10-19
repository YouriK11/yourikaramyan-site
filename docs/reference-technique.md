# Référence technique

Documentation vérifiée le 19/10/2026 : 4 sujets, chacun recherché par un agent puis contre-vérifié par un second (docs officielles, context7, builds de test).
Notes complètes avec sources et extraits de code : `docs/recherche/*.md`. Les chemins `scratchpad/...` cités dedans n'existent plus.
Prototype de l'effet d'accueil (lecture seule, ses fichiers gsap.js et bricolage.woff2 ne sont pas copiés) : `docs/recherche/prototype-accueil/`.

## Versions

| Paquet | Version | Remarque |
|---|---|---|
| astro | 7.4.1 | Node ≥ 22.22.0, versions impaires non supportées. Node local : 24.16. |
| gsap | 3.15.0 | Licence Webflow « Standard No Charge » : usage commercial gratuit, aucune attribution exigée. Tous les plugins sont dans le paquet npm. |
| @astrojs/sitemap | 3.7.4 | Fonctionne avec Astro 7. |
| sharp | 0.35.x | Dépendance optionnelle d'Astro. L'ajouter en dépendance directe dès que notre code l'importe (images de partage). |
| satori | 0.63.0 | Évolue très vite (56 versions en 17 jours). Épingler la version exacte, sans `^`. |

## Astro 7 : pièges vérifiés

- **`compressHTML: true`** (réglé). Le défaut d'Astro 7 (`'jsx'`) colle les mots aux balises en ligne quand un retour à la ligne les sépare : « développeur⏎<strong>web</strong> » devient « développeurweb ».
- **`trailingSlash: 'always'`** (réglé). Les pages sont construites en `/page/index.html` et servies en `/page/` (Vercel : `"trailingSlash": true`). Liens internes toujours avec la barre finale. Les fichiers générés avec extension (`/og/x.png`, `/robots.txt`) s'appellent sans barre finale.
- **Scripts** : un `<script>` sans attribut est du TypeScript, regroupé, chargé en `type="module"` (différé). Il s'affiche là où il est écrit : le mettre dans un composant ou dans la mise en page, jamais après la balise de fermeture de la mise en page. Un script qui doit s'exécuter tout de suite dans `<head>` prend `is:inline`.
- **Compilateur Rust** : HTML strict. Toute balise non vide doit être fermée, pas de `<div>` dans un `<p>`.
- Ne jamais créer `src/fetch.ts` (nom réservé en Astro 7).
- **Collections** : fichier `src/content.config.ts`, `import { z } from 'astro/zod'` (Zod 4), chargeur `glob({ pattern: '**/[^_]*.md', base: './src/content/entreprises' })`. Le motif exclut `_modele.md`. Noms de fichiers en ASCII, minuscules, tirets (`col-macarthur.md`) : le nom devient l'adresse. Trier `getCollection()` explicitement.
- **Routes** : `index.astro` et `404.astro` passent avant `[entreprise].astro`. Un fichier nommé `404.md` dans les entreprises créerait un conflit.
- **Page 404** : `noindex` et aucune balise canonical (sinon elle pointe vers `/404/`).
- **robots.txt** : le générer avec `src/pages/robots.txt.ts`. Pas de `public/robots.txt` (il prendrait le dessus en silence). Ne jamais bloquer les pages entreprises dans robots.txt : Google et LinkedIn doivent pouvoir les lire pour voir le `noindex` et l'aperçu.
- **Sitemap** : `filter()` reçoit l'URL complète avec barre finale. Construire un `Set` des URL à exclure à partir des noms de fichiers de `src/content/entreprises/` (voir `docs/recherche/astro-base.md`, F32).
- **Canonical** : `new URL(Astro.url.pathname, Astro.site)`. `site` doit rester défini dans la config.
- Pas de `<ClientRouter />` : inutile pour ce site, et il compliquerait l'initialisation de GSAP.
- **Vérification des types** : `npm install -D @astrojs/check typescript@^6` (TypeScript 7 est incompatible avec @astrojs/check). Dans les scripts : `querySelectorAll<HTMLElement>(...)`.

## Polices (étape 1)

- L'API Fonts d'Astro est stable : clé `fonts` au premier niveau de la config (`experimental.fonts` est refusé).
- **Bricolage Grotesque** : graisse 200-800 et largeur 75-100, taille optique figée à 96, sous-ensemble `latin` seulement. Fichier d'environ 79,5 Ko, `font-stretch: 75% 100%` généré.
  - Option A : `fontProviders.google()` avec `weights: ["200 800"]`, `styles: ["normal"]`, `subsets: ["latin"]`, `options: { experimental: { variableAxis: { opsz: ["96"], wdth: [["75","100"]] } } }`.
  - Option B (**retenue, en place à l'étape 1**) : fichier `src/assets/fonts/bricolage-grotesque-latin-opsz96.woff2` (79 Ko, axes wght 200-800 et wdth 75-100, défauts 800/100) chargé par `fontProviders.local()` avec `weight: "200 800"`, `stretch: "75% 100%"`. Aucune option expérimentale, aucun accès réseau pendant la construction. Instrument Sans : `src/assets/fonts/instrument-sans-latin.woff2` (30 Ko). Licences OFL à côté.
  - Avec `fallbacks: ['system-ui']`, Astro génère des polices de secours ajustées pour BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue et Arial (vérifié dans `dist/index.html`).
- **Instrument Sans** : `fontProviders.google()`, `weights: ["400 700"]`, `subsets: ["latin"]`. Environ 29,9 Ko. Précharger seulement le style normal : `<Font cssVariable="--font-body" preload={[{ style: "normal" }]} />`.
- **Sous-ensemble `latin` uniquement** : ajouter `latin-ext` fausse les métriques de la police de secours en 7.4.1. Le latin couvre tout le français sauf U+202F.
- **Espace fine insécable U+202F** : absente des deux polices. `Intl.NumberFormat('fr-BE')` en produit une (« 1 700 »). La remplacer par U+00A0 avec un échappement explicite : `.replace(/ /g, " ")`. Utiliser U+00A0 devant « : ; ! ? » et à l'intérieur des guillemets.
- Ne jamais écrire le nom de la police à la main : il est haché. Utiliser `var(--font-display)` et `var(--font-body)`.
- Avec la taille optique figée à 96, Bricolage garde son dessin d'affichage même en petit. Réserver Bricolage aux titres.
- À éviter : `fontProviders.npm()` (cassé en 7.4.1) et l'`index.css` des paquets @fontsource (graisse seule, la largeur ne marche pas).
- Android n'a pas Arial : envisager `fallbacks: ["system-ui"]`, à vérifier.

## Fondations en place (étape 1)

- **Favicon** : monogramme YK tracé à partir de Bricolage (800/100), fond bleu nuit, trait abricot. Pour le refaire :
  1. `python scripts/favicon-svg.py <police.woff2> <dossier>` (fontTools et brotli requis) ;
  2. `node scripts/favicon-png.mjs <dossier>` ;
  3. `favicon.ico` (16/32/48) avec Pillow ;
  4. copier les fichiers dans `public/`.
- **Menu mobile** : panneau plein écran en `popover` natif (s'ouvre sans JS). Le script ajoute :
  - la fermeture au clic sur un lien ;
  - `inert` sur la page derrière pendant l'ouverture (posé au `toggle` ouvert, retiré au `beforetoggle` fermé, pour que le focus revienne sur « Menu ») ;
  - la fermeture quand la largeur passe en mode ordinateur.
  - Sans prise en charge du Popover API, le panneau et son bouton restent masqués.
- **Ancres** : `<body id="haut">` pour « Haut de page ». `#top` laisse le focus sur le lien du pied de page dans Firefox et Safari.
- **Pied de page** collé en bas des pages courtes : `body` en flex colonne, `main { flex: 1 0 auto }`.
- **`SITE.enConstruction`** (`src/data/site.ts`) met toutes les pages en `noindex`. À passer à false à l'étape 7, seulement quand le CV corrigé (sans Google Play) est en place.

## Images

- Images dans `src/assets/`, importées, affichées avec `<Picture formats={["avif","webp"]} layout="constrained" ...>`. Les images de `public/` ne sont jamais optimisées.
- `priority` seulement sur l'image visible au chargement. Préciser `sizes` quand l'image est dans une colonne.
- Astro n'agrandit jamais une image. La source doit faire au moins 2 fois la largeur affichée. `sources/photo-cv.jpg` (640 × 768) : 320 px de large au maximum à l'écran.
- `image: { responsiveStyles: true }` dans la config si on ne gère pas ces styles nous-mêmes. Les attributs générés sont `data-astro-image`, `data-astro-image-fit`, `data-astro-image-pos` (la doc montre une ancienne syntaxe).
- Image de partage en PNG ou JPG, jamais en WebP.

## Effet signature (étape 2) : aucun décalage de mise en page

Condition de Youri : le nom ne pousse jamais le contenu en dessous. Le Cumulative Layout Shift (CLS) compte aussi le déplacement des lettres elles-mêmes, et les mouvements de souris ou le défilement ne sont pas des « interactions récentes » qui l'excusent.

- **Découpage à la construction** (pas de SplitText) : chaque lettre est un `inline-block` de largeur fixe en `em`, égale à son avance crénée dans l'état final (graisse 800, largeur 100, taille optique 96). Le glyphe est aligné au début de sa case (`text-align: start`). Largeurs mesurées sur le fichier Google v9 : Youri `0.506 0.567 0.557 0.400 0.234`, Karamyan `0.611 0.543 0.383 0.543 0.860 0.539 0.543 0.562`. **À recalculer si le fichier de police change.**
- Chaque mot sur sa propre ligne (`display: block`, `white-space: nowrap`), `line-height` sans unité, texte aligné à gauche, taille calculée pour la ligne la plus large.
- **Police de secours aux métriques alignées** (ascent 93 %, descent 27 %, line-gap 0 %), sinon l'arrivée tardive de la police décale les glyphes d'environ 10 px (CLS 0,001). Vérifier ce que génère l'API Fonts, et tester avec une police retardée.
- `@property --wght` et `--wdth` (valeurs initiales 800 et 100), `font-variation-settings: "opsz" 96, "wght" var(--wght, 800), "wdth" var(--wdth, 100)`.
- **Ne jamais masquer le titre** (`opacity: 0`, `visibility: hidden`) : ça retarde le LCP. L'état fin de départ vient d'un script `is:inline` dans `<head>` qui ajoute `html.hero-intro` uniquement si les animations sont permises, avec une sécurité de 4 s.
- Attendre la police avant d'animer (`document.fonts.load`, délai maximal 2,5 s) : la police de secours n'a pas d'axe de largeur.
- **GSAP core seul** (28 Ko gzip). Pas de ScrollTrigger (+18 Ko) : défilement passif + `gsap.quickTo`, et `IntersectionObserver` pour les compteurs.
- Arrondir les valeurs (graisse par pas de 10, largeur par pas de 2,5). Jamais de transition CSS sur ces variables. Ne pas animer la chaîne `fontVariationSettings`.
- `gsap.matchMedia()` : nettoyages idempotents (ils s'exécutent à chaque changement de condition). Les écritures de `quickSetter` ne sont pas annulées : retirer `--wght`/`--wdth` à la main. Résoudre la promesse de fin d'intro dans le nettoyage.
- Pointeur fin : `(hover: hover) and (pointer: fine)`, ignorer `pointerType === "touch"`.
- Hauteur de l'accueil en `svh` ou `lvh`, pas en `dvh`.
- Nom accessible : texte réservé aux lecteurs d'écran + lettres en `aria-hidden`.
- **Sens de la loupe, à trancher visuellement** : les cases sont réservées à l'état maximal (800/100). Pour tenir la promesse faite à Youri (« les lettres proches du curseur gonflent, les éloignées s'affinent »), les lettres éloignées s'affinent sous l'état maximal et laissent un petit espace à droite de leur glyphe. Doser l'amincissement pour que l'espacement reste beau.
- Implémentation de référence : `docs/recherche/gsap-effet-signature.md`, F13 à F15.

## Compteurs (étape 3)

Modèle `Counter.astro` dans `docs/recherche/gsap-effet-signature.md`, F27 :
- un double invisible réserve la largeur finale ;
- remise à 0 au démarrage si les animations sont permises (sinon on voit « 1 700 », puis 0, puis le comptage) ;
- `IntersectionObserver` ;
- espaces U+00A0.

## Images de partage (étape 6)

- satori 0.63.0 épinglé + sharp. Lire les polices avec des chemins relatifs à la racine du projet (`import.meta.url` pointe dans `dist/` et échoue). `boxSizing: 'border-box'` sur la racine, `display: 'flex'` sur chaque div à plusieurs enfants. Échapper `&` (Col&McArthur).
- LinkedIn : 1200 × 630, URL absolue en https, `og:image:width`, `og:image:height`, `og:image:type`, `og:image:alt`. Rafraîchir avec le Post Inspector après chaque changement. Gmail n'affiche aucun aperçu : le texte de l'e-mail doit se suffire.

## Compteur de visites (étape 6)

- **GoatCounter** : gratuit pour un site personnel, sans cookies, hébergé en Finlande et en Allemagne, vues par page et par jour, sources des visites.
  - Code : `<script is:inline data-goatcounter="https://yourikaramyan.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`.
  - Exclure ses propres visites : ouvrir le site une fois avec `#toggle-goatcounter` dans chaque navigateur.
  - Les bloqueurs de publicité bloquent le script : les chiffres sont des minimums.
- L'autorité belge (APD) lit largement les règles sur le traçage. Ajouter une courte note de confidentialité qui nomme GoatCounter.
- Autres options moins adaptées : Vercel Web Analytics (1 mois d'historique, région non documentée), Cloudflare Web Analytics (données complètes 7 jours seulement), Umami Cloud (US/UE).

## Mise en ligne (étape 7) : Vercel

Netlify a été écarté (environ 20 mises en ligne par mois sur le plan gratuit). Notes complètes : `docs/recherche/vercel.md`. Les notes Netlify (`docs/recherche/netlify-analytics-og.md`) restent valables pour GoatCounter, les images de partage et LinkedIn.

- **Plan Hobby** (gratuit) : usage personnel et non commercial uniquement. Pas d'offre payante, de prix, de publicité ni de lien d'affiliation sur le site.
- **Limites Hobby** :
  - 100 mises en ligne par jour, 100 par heure, 60 par 5 minutes ; une construction à la fois.
  - Par mois : 100 Go de transfert, 1 million de requêtes.
  - Hobby n'achète jamais de dépassement : au-delà, les fonctions s'arrêtent et un projet en pause se relance à la main.
  - Regrouper plusieurs pages entreprises dans un même envoi.
- **Construction** : Astro est détecté tout seul (sortie `dist`, aucun adaptateur pour un site statique, ne pas ajouter @astrojs/vercel). Le préréglage Astro met déjà un cache d'un an sur `/_astro/*`.
- **Node** : Vercel ignore `.nvmrc`. Il lit `"engines": { "node": "24.x" }` dans `package.json` (réglé). `.nvmrc` sert seulement en local.
- **Dépôt privé sur Hobby** : Vercel ne publie que les commits dont l'auteur est le propriétaire du compte (compte GitHub `YouriK11`). Les premiers commits sont signés `youri.karamyan@student.hepl.be`.
  - Avant le premier envoi, soit faire vérifier cette adresse sur GitHub, soit configurer `git config user.email "266993000+YouriK11@users.noreply.github.com"`.
  - Effet des lignes `Co-Authored-By` inconnu : surveiller la première mise en ligne.
- **Compte Vercel** : s'inscrire avec « Continue with GitHub » (YouriK11), et donner à l'application GitHub de Vercel l'accès au dépôt privé.
- **vercel.json** : `"trailingSlash": true` (redirection 308 de `/x` vers `/x/`, cohérent avec Astro). Laisser `cleanUrls` à false. Pas de `rewrites` avec Astro. Un seul fichier entre `vercel.json` et `vercel.ts`.
- **noindex des pages entreprises** :
  - balise `meta robots` dans la mise en page entreprise ;
  - exclusion du sitemap ;
  - en option, en-tête `X-Robots-Tag` généré par `vercel.ts` à partir de la liste des entreprises, pour ne jamais éditer de fichier à la main.
  - Les motifs `source` sont stricts et sensibles à la casse : écrire `/col-macarthur/`. Pas de point dans un nom d'entreprise.
- **Protection des déploiements** : les adresses d'aperçu (`*-git-*.vercel.app`, `*-<hash>-*.vercel.app`) exigent une connexion Vercel. Ne partager que le domaine (ou `<projet>.vercel.app`). LinkedInBot fait partie des robots reconnus par Vercel.
- **CLI** : elle ignore `.gitignore`. `.vercelignore` (en place) exclut `sources/`. Préférer les envois par Git. Ne jamais lancer `vercel --public`.
- **Domaine acheté sur Vercel** :
  - .com à 11,25 $ par an hors TVA, facturé en dollars ;
  - renouvellement automatique 30 jours avant l'échéance, confidentialité WHOIS incluse ;
  - DNS et HTTPS configurés par Vercel, aucune boîte e-mail fournie ;
  - utiliser l'e-mail du compte pour le titulaire et confirmer l'e-mail de vérification ICANN.
  - **Domaine principal** : choisir `yourikaramyan.com` (sans www) comme Production et rediriger `www` vers lui, pour correspondre à `site` dans `astro.config.mjs`.
- **Avant la mise en ligne du domaine** : `site` pointe vers un domaine inexistant, donc les aperçus LinkedIn n'auront pas d'image. Ne partager aucun lien entreprise avant que le domaine fonctionne. Après correction, rafraîchir avec le LinkedIn Post Inspector.
- **Vercel Web Analytics** (Hobby) : 50 000 événements par mois, 1 mois d'historique garanti, région de stockage non documentée. GoatCounter reste le choix recommandé (UE, sans cookies, historique long).
