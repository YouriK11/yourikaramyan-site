# Créer une page pour une nouvelle entreprise

Chaque entreprise a sa page à l'adresse `yourikaramyan.com/nom-de-l-entreprise/`.
Une page = un seul fichier texte, dans le dossier `src/content/entreprises/`.
La mise en page, le noindex, l'exclusion du plan du site et l'image de partage sont automatiques.

## Avant de commencer

- Prépare les 3 idées avec Claude et valide-les. Ne publie jamais une idée que tu n'as pas relue.
- Vérifie chaque fait sur l'entreprise (son site, la presse). N'invente rien.
- Note l'orthographe exacte du nom de l'entreprise, telle qu'elle l'écrit elle-même.

## Étape 1 : copier le modèle

1. Dans VS Code, ouvre le dossier `src/content/entreprises/` dans l'explorateur de fichiers (colonne de gauche).
2. Clic droit sur `_modele.md`, puis **Copier**.
3. Clic droit sur le dossier `entreprises`, puis **Coller**. VS Code crée `_modele copy.md`.
4. Clic droit sur la copie, puis **Renommer**. Donne-lui le nom de l'entreprise :
   - en minuscules ;
   - sans accent, sans espace, sans « & » ;
   - avec des tirets entre les mots ;
   - et **sans** le « _ » du début.

   Exemples : `brasserie-du-coin.md`, `col-macarthur.md`, `atelier-dubois.md`.
   Le nom du fichier devient l'adresse : `brasserie-du-coin.md` donne `yourikaramyan.com/brasserie-du-coin/`.

Un fichier dont le nom commence par « _ » n'est jamais publié. C'est pour ça que le modèle reste invisible.

## Étape 2 : remplir le fichier

Ouvre ta copie. Remplace chaque texte `[À COMPLÉTER ...]`, crochets compris.

- `nom` : le nom exact de l'entreprise. Le titre de la page devient « Bonjour à l'équipe de Nom ». Devant une voyelle, l'élision est automatique : « Bonjour à l'équipe d'Ice-Watch ».
- `salutation` (facultatif) : le titre complet, si le titre automatique sonne faux. Exemple : `salutation: 'Bonjour à l''équipe du Petit Atelier'`.
- `description` : une phrase. Elle s'affiche dans l'aperçu du lien sur LinkedIn.
- `apercu` (facultatif) : la ligne courte sous le nom de l'entreprise, sur l'image de partage. Sans elle, l'image dit « Trois idées pour votre e-commerce ». Pour une entreprise sans boutique en ligne, écris par exemple `apercu: 'Trois idées pour votre agence'` (40 signes au maximum).
- `accroche` : ta lettre à l'équipe, un paragraphe par bloc `- >-`. Garde le premier paragraphe tel quel.
- `idees` : exactement 3 idées. Chacune a un `titre`, un ou plusieurs paragraphes dans `texte`, et ton `experience` liée. L'expérience s'affiche après « Mon expérience : » : commence-la par une minuscule.
- `objetEmail` : l'objet de l'e-mail qui s'ouvre quand on clique sur « M'écrire ».

Règles de saisie :
- Garde les petits tirets `-` et les signes `>-` en début de bloc : ils indiquent un nouveau paragraphe.
- Garde le même décalage (les espaces en début de ligne) que dans le modèle.
- Tu peux écrire des espaces normales avant « : » ou « ? » : la typographie française est automatique.
- Si un texte tient sur une seule ligne et commence par `[`, ou contient `: ` ou ` #`, entoure-le d'apostrophes droites `'...'`, comme dans le modèle. Sinon, la fin du texte est coupée ou le fichier est refusé. Pour écrire une apostrophe à l'intérieur, double-la : `'l''entreprise'`.
- Les lignes qui commencent par `#` sont des commentaires : tu peux les supprimer.

Exemple complet : `src/content/entreprises/col-macarthur.md`.

## Étape 3 : vérifier sur ton ordinateur

1. Dans VS Code, ouvre le menu **Terminal**, puis **Nouveau terminal**.
2. Tape `npm run dev` puis Entrée. Attends la ligne `http://localhost:4321/`.
3. Ouvre dans ton navigateur l'adresse de ta page, par exemple `http://localhost:4321/brasserie-du-coin/`.
4. Relis tout, sur ordinateur et en réduisant la fenêtre à la taille d'un téléphone.

Si un texte `[À COMPLÉTER` a été oublié, s'il n'y a pas exactement 3 idées, ou si le nom du fichier n'est pas valable, Astro écrit une erreur rouge dans le terminal. Elle indique le fichier et le champ.
- Si l'erreur apparaît au lancement, le serveur s'arrête : corrige, enregistre, puis retape `npm run dev`.
- Si le serveur tourne déjà, l'erreur s'affiche seulement dans le terminal. Le navigateur garde l'ancienne version, ou affiche « Page introuvable » pour une nouvelle page. Regarde donc le terminal après chaque enregistrement.

Pour arrêter le serveur : clique dans le terminal et appuie sur **Ctrl+C**.

## Étape 4 : publier

(Disponible après la mise en ligne de l'étape 7, avec GitHub et Vercel.)

Dans le terminal de VS Code :

1. `npm run build`
   (fabrique le site complet comme en ligne ; la dernière ligne doit dire `Complete!`. Sinon, ne publie pas : lis l'erreur rouge et corrige)
2. `git add src/content/entreprises/brasserie-du-coin.md`
   (prépare ton nouveau fichier pour l'enregistrement)
3. `git commit -m "Ajoute la page pour Brasserie du Coin"`
   (enregistre la modification avec un message clair)
4. `git push`
   (envoie l'enregistrement sur GitHub ; Vercel publie le site tout seul en une minute environ)

Tu peux regrouper plusieurs pages entreprises dans un même envoi : le plan gratuit de Vercel accepte 100 mises en ligne par jour.

## Étape 5 : partager le lien

- Avant d'envoyer le lien, ouvre-le toi-même sur ton téléphone.
- Envoie l'adresse complète avec la barre finale : `https://yourikaramyan.com/brasserie-du-coin/`.
- Sur LinkedIn, colle le lien : l'aperçu montre une image à ton nom et à celui de l'entreprise. Si l'aperçu est ancien, rafraîchis-le avec le LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/).
- Gmail n'affiche pas d'aperçu : écris un vrai message autour du lien.

## À savoir

- La page n'est jamais indexée par Google (balise noindex) et n'apparaît ni dans le menu ni dans le plan du site. Toute personne qui a le lien peut quand même l'ouvrir.
- Pour retirer une page : supprime son fichier, puis enregistre et publie comme à l'étape 4.
- Si tu changes le nom du fichier, l'ancienne adresse ne marche plus.
