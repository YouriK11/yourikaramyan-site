# Mettre le site en ligne (étape 7)

Ce guide te mène, commande par commande, de ton ordinateur jusqu'à https://yourikaramyan.com.
Compte environ 45 minutes la première fois. Fais les étapes dans l'ordre.

Toutes les commandes se tapent dans le terminal de VS Code (menu **Terminal**, puis **Nouveau terminal**), dossier `C:\Users\youri\Projets\yourikaramyan-site` ouvert. Tape une commande, appuie sur Entrée, attends qu'elle se termine avant la suivante.

## Étape A : mettre en place ta nouvelle photo et ton nouveau CV

Ces deux fichiers ne sont pas encore sur ton ordinateur (je les ai cherchés partout le 21 octobre). Commence par les enregistrer dans le dossier `sources` du projet, avec exactement ces noms :

- `sources\photo_youri_portrait_transparent.png`
- `sources\CV_Youri_Karamyan.pdf` (remplace l'ancien)

Puis tape :

1. `Copy-Item sources\photo_youri_portrait_transparent.png src\assets\photos\youri-portrait-detoure.png`
   (copie la photo là où le site la cherche : elle remplace automatiquement l'ancienne, avec le fond bleu nuit et le halo clair)
2. `Copy-Item sources\CV_Youri_Karamyan.pdf public\Youri-Karamyan-CV.pdf`
   (remplace le CV téléchargeable)
3. `npm run dev`, puis ouvre http://localhost:4321/ et vérifie l'accueil, la page http://localhost:4321/col-macarthur/ et le bouton « Télécharger mon CV ». Arrête ensuite le serveur avec **Ctrl+C**.

Ton nouveau CV ne mentionne plus Google Play : la mise en ligne est donc autorisée. Ouvre `src/data/site.ts` et remplace `enConstruction: true` par `enConstruction: false`. Google pourra alors indexer ton accueil. Les pages entreprises restent toujours cachées.

Le plus simple : dis-moi « photo et CV en place » et je fais ces vérifications à ta place, y compris relire le CV pour mettre le site à jour s'il a changé.

Enregistre ensuite ces changements :

4. `git add -A`
5. `git commit -m "Ajoute la nouvelle photo et le nouveau CV"`

## Étape B : régler l'adresse e-mail de tes enregistrements

Sur le plan gratuit, Vercel ne publie un dépôt privé que si les enregistrements viennent de ton compte GitHub. L'adresse la plus sûre est l'adresse « noreply » de ton compte YouriK11. Je l'ai déjà réglée pour ce projet le 21 octobre. Pour le vérifier :

1. `git config user.email`
   (doit afficher `266993000+YouriK11@users.noreply.github.com`)

## Étape C : créer le dépôt privé sur GitHub et y envoyer le site

1. Va sur https://github.com/new, connecté avec le compte **YouriK11**.
2. Nom du dépôt : `yourikaramyan-site`. Choisis **Private**. Ne coche rien d'autre (pas de README, pas de .gitignore). Clique sur **Create repository**.
3. Dans le terminal :
   - `git switch main`
     (te place sur la version principale du site)
   - `git remote add origin https://github.com/YouriK11/yourikaramyan-site.git`
     (indique à git où se trouve ton dépôt GitHub)
   - `git push -u origin main`
     (envoie le site sur GitHub ; la première fois, une fenêtre de connexion GitHub s'ouvre dans ton navigateur : accepte)

Le dossier `sources` (tes originaux non floutés) et le dossier `captures` ne sont jamais envoyés : ils sont exclus.

## Étape D : relier Vercel

1. Va sur https://vercel.com/signup et choisis **Continue with GitHub** (compte YouriK11). Plan **Hobby** (gratuit).
2. Clique sur **Add New…**, puis **Project**. Donne à Vercel l'accès au dépôt `yourikaramyan-site` quand il le demande.
3. Choisis le dépôt, puis **Import**. Vercel reconnaît Astro tout seul : ne change aucun réglage. Clique sur **Deploy**.
4. Après environ une minute, Vercel affiche une adresse du type `yourikaramyan-site.vercel.app`. Ouvre-la et vérifie le site.

Si Vercel bloque la mise en ligne en parlant de l'auteur des enregistrements, dis-le-moi : l'étape B règle normalement ce cas.

## Étape E : acheter et brancher le domaine

1. Dans Vercel, ouvre ton projet, puis **Settings**, puis **Domains**.
2. Tape `yourikaramyan.com` et suis l'achat (environ 11,25 $ par an hors TVA, renouvellement automatique). Utilise l'e-mail de ton compte. Confirme ensuite l'e-mail de vérification que tu recevras (obligatoire pour garder le domaine).
3. Choisis `yourikaramyan.com` (sans www) comme domaine principal, et laisse `www.yourikaramyan.com` rediriger vers lui.
4. Attends quelques minutes, puis ouvre https://yourikaramyan.com.

## Étape F : vérifier après la mise en ligne

1. Ouvre le site sur ton téléphone et sur ton ordinateur.
2. Colle https://yourikaramyan.com/col-macarthur/ dans le LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/) pour vérifier l'aperçu avec ton image de partage.
3. Facultatif : crée ton compte gratuit sur https://www.goatcounter.com, puis écris ton code dans `src/data/site.ts` (ligne `goatcounter`) pour compter les visites.

## Ensuite : publier une modification

À chaque changement (nouvelle page entreprise, correction) :

1. `npm run build` (doit finir par `Complete!`)
2. `git add -A`
3. `git commit -m "Ce que tu as changé"`
4. `git push`

Vercel republie le site tout seul en une minute environ.
