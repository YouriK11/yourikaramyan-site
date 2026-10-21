# Rapport de la refonte « la personne d'abord » (21 octobre 2026)

Le site te présente d'abord, toi. MonArc devient un projet parmi les autres.
Tout est fusionné dans la branche principale `main`. Rien n'est en ligne et rien n'a été envoyé sur GitHub. Le dossier `sources/` n'a pas été modifié.

## Avant tout : ta nouvelle photo et ton nouveau CV sont introuvables

Ni `sources/photo_youri_portrait_transparent.png` ni le nouveau `sources/CV_Youri_Karamyan.pdf` ne sont sur ton ordinateur. Je les ai cherchés dans tout ton dossier utilisateur : le CV le plus récent date du 19 octobre et mentionne encore Google Play.

J'ai donc préparé le site pour qu'ils prennent leur place tout seuls :

- **Photo** : dès que tu la copies dans `src/assets/photos/youri-portrait-detoure.png`, elle remplace l'ancienne partout : accueil, cadre de la page Col&McArthur, image de partage. Elle apparaît sur fond bleu nuit, avec un léger halo clair derrière toi. Sur ordinateur, les lettres de ton nom qui passent sur la photo deviennent blanches, pour rester lisibles. J'ai tout testé avec ta photo détourée en chemise blanche, puis je l'ai retirée.
- **CV** : la commande pour le remplacer est dans le guide de mise en ligne. Tant que l'ancien CV (avec Google Play) est en place, le site reste caché à Google, comme prévu.

Les commandes exactes sont dans [docs/guide-mise-en-ligne.md](guide-mise-en-ligne.md), étape A. Tu peux aussi me dire « photo et CV en place » : je vérifierai tout et relirai le CV pour mettre le site à jour s'il a changé.

## Ce qui a changé, point par point

1. **Photo** : prête, voir ci-dessus.
2. **CV** : prêt à être remplacé, voir ci-dessus.
3. **Accueil** : il ne parle plus que de toi. La ligne sur MonArc est retirée.
4. **À propos**, juste après l'accueil. Cinq phrases, uniquement tirées de ton CV :
   « Je m'appelle Youri Karamyan, j'ai 22 ans et j'étudie à Liège. Après des études de sciences de gestion à HEC Liège, je suis en 3e bachelier E-Business à la HEPL. Je m'y forme au marketing digital, à l'e-commerce et aux outils de gestion. L'entrepreneuriat me motive : j'ai créé ma boutique en ligne en 2022, puis conçu l'application MonArc en 2026. Je cherche un stage en marketing digital et e-commerce. »
5. **Projets** : un panneau par projet, tous fermés par défaut, dans cet ordre : MonArc, boutique e-commerce, freelance digital, CRM Odoo, Young Enterprise Project.
   - Fermé, chaque panneau montre le titre, l'année, ton rôle et une ligne de résultat. Ouvert, il montre le contexte, ce que tu as fait et les résultats.
   - Le panneau MonArc contient toute l'étude de cas : les chiffres qui défilent, l'éventail de téléphones et les réseaux sociaux. L'éventail s'ouvre chaque fois qu'on ouvre le panneau.
   - Les panneaux s'ouvrent au clavier (Tab, puis Entrée ou Espace), les lecteurs d'écran les annoncent « réduit » ou « développé », et ils fonctionnent sans JavaScript. À l'impression, tous les panneaux s'ouvrent.
6. **Menu** : À propos, Projets, Parcours, Compétences, Contact. Avec cinq liens, le menu complet n'apparaît qu'à partir de 1024 px de large. Sur tablette et téléphone, c'est le bouton « Menu ».
7. **Parcours** : les lignes qui ont un panneau n'ont plus de détails, seulement un lien « Voir le projet » qui ouvre le bon panneau. La page Col&McArthur et la page 404 mènent aussi aux bons endroits.

## Les informations qui manquent dans ton CV

Pour ces projets, ton CV donne très peu d'informations. Les panneaux restent donc courts : je n'ai rien inventé. Pour les compléter, envoie-moi :

- **Boutique e-commerce (2022)** : ce que tu vendais, à qui, comment tu trouvais tes clients, le nombre de commandes ou de clients. Dis-moi aussi si je peux écrire que la boutique était sur Shopify : c'est visible sur ta capture, mais tu ne l'as pas validé.
- **Freelance digital (2020-2023)** : un ou deux exemples de clients ou de missions, le nombre de projets, un résultat concret (par exemple un site livré et ce qu'il a apporté).
- **Implémentation d'un CRM Odoo (HEPL, 2026)** :
  - ton rôle, seul ou en équipe, et avec combien de personnes ;
  - pour quelle entreprise ou quel cas ;
  - ce que tu as mis en place concrètement ;
  - un résultat, par exemple une note, un gain de temps ou une démonstration.

  Aujourd'hui, la seule phrase du CV sert à la fois de résumé et de contenu.
- **Young Enterprise Project (HEPL, 2025)** :
  - le nom et le produit de l'entreprise étudiante ;
  - ton rôle dans l'équipe ;
  - la taille de l'équipe ;
  - les résultats : ventes, concours, prix ou classement.
- **MonArc** : complet. Le jour où l'app est publique sur Google Play, envoie-moi le lien pour ajouter le bouton.

## Décisions prises sans toi

1. **Photo et CV absents** : je n'ai pas utilisé à leur place l'image que tu as collée dans le message. C'est une capture sur fond bleu déjà incrusté, en basse définition, et le halo serait impossible. Le site bascule tout seul dès que tu ajoutes le vrai fichier.
2. **« Cadran » de la page /col-macarthur** : cette page n'a pas de cadran. J'ai compris « le cadre de ta photo », et j'y ai mis la même photo sur fond bleu nuit avec le halo. Si tu pensais au cadran de la variante C (horlogerie), dis-le-moi.
3. **Fond bleu nuit et halo dans le cadre de la photo** : la page reste blanche, mais le cadre de ta photo devient bleu nuit avec un halo clair derrière toi. C'est l'endroit où ta photo est posée sur le bleu nuit, comme tu l'as décrit.
4. **Base de la refonte** : je suis parti de la branche `passe-whaou`, car elle contient l'éventail de téléphones et l'étude de cas que le panneau MonArc devait reprendre. La fusion dans `main` apporte donc aussi :
   - le travail des passes précédentes : grande échelle sur ordinateur, lettres du nom toujours serrées ;
   - les améliorations sur grand écran ;
   - la section en cours marquée dans le menu.
5. **Les trois variantes de l'accueil** (Nuit, Affiche, Élégance) sont abandonnées : cette nouvelle direction les remplace. Leurs pages d'essai et leurs polices sont retirées du site. Elles restent récupérables sur la branche `passe-whaou`.
6. **Ligne de résumé des projets sans résultat chiffré** (freelance, CRM, Young Enterprise) : faute de résultat dans ton CV, elle montre ce que tu as fait.
7. **Rôle pour le CRM et le Young Enterprise Project** : « Projet académique. » Ton CV ne précise pas ton rôle.
8. **À propos, phrase 4** : « L'entrepreneuriat me motive » vient de tes intérêts sur le CV (entrepreneuriat, e-commerce, nouvelles technologies). La boutique et MonArc en sont les preuves.
9. **Panneaux** : à l'ouverture, la ligne de résumé s'efface, car le contenu en dessous la reprend. Le panneau CRM n'affiche plus que « Ce que j'ai fait ».
10. **Parcours replié** : le freelance digital reste dans la partie dépliée (« Voir tout le parcours »), comme avant. Il reste visible dans les Projets.
11. **Adresse e-mail des enregistrements git** : pour ce projet seulement, j'utilise maintenant ton adresse GitHub « noreply » (`266993000+YouriK11@users.noreply.github.com`). Vercel l'exige pour publier un dépôt privé sur le plan gratuit. Ton adresse HEPL reste réglée pour tes autres projets.

## Vérifications

- **Captures** en 390, 1440 et 1920 px dans `captures/refonte/` :
  - [accueil 390](../captures/refonte/accueil-390.png), [1440](../captures/refonte/accueil-1440.png), [1920](../captures/refonte/accueil-1920.png) ;
  - [À propos 390](../captures/refonte/a-propos-390.png), [1440](../captures/refonte/a-propos-1440.png), [1920](../captures/refonte/a-propos-1920.png) ;
  - [Projets 390](../captures/refonte/projets-390.png), [1440](../captures/refonte/projets-1440.png), [1920](../captures/refonte/projets-1920.png) ;
  - [panneau MonArc ouvert 390](../captures/refonte/projet-monarc-ouvert-390.png), [1440](../captures/refonte/projet-monarc-ouvert-1440.png), [1920](../captures/refonte/projet-monarc-ouvert-1920.png) ;
  - [panneau boutique ouvert 390](../captures/refonte/projet-boutique-e-commerce-ouvert-390.png), [1440](../captures/refonte/projet-boutique-e-commerce-ouvert-1440.png), [1920](../captures/refonte/projet-boutique-e-commerce-ouvert-1920.png) ;
  - [Parcours 390](../captures/refonte/parcours-390.png), [1440](../captures/refonte/parcours-1440.png), [1920](../captures/refonte/parcours-1920.png) ;
  - [Col&McArthur 390](../captures/refonte/col-macarthur-390.png), [1440](../captures/refonte/col-macarthur-1440.png), [1920](../captures/refonte/col-macarthur-1920.png) ;
  - [404 390](../captures/refonte/404-390.png), [1440](../captures/refonte/404-1440.png), [1920](../captures/refonte/404-1920.png).
- **Relecture indépendante** par quatre relecteurs (faits, accessibilité, code, design) : 13 défauts confirmés, tous corrigés. Les principaux :
  - l'impression des résultats ;
  - les répétitions dans les panneaux courts ;
  - « A à Z » coupé en fin de ligne ;
  - le défilement derrière le menu sur tablette ;
  - le nom en blanc, ajusté exactement à la photo.
- **Accessibilité** : 0 erreur au test automatique axe sur l'accueil (panneaux fermés et ouverts), la page Col&McArthur et la page 404, en 390 et en 1440 px. Les panneaux s'ouvrent au clavier et sans JavaScript.
- **Lighthouse mobile** : accueil 98 (médiane de 6 mesures, de 90 à 99), Col&McArthur 100, 404 100. Accessibilité 100, aucun décalage de mise en page.
  - Certaines mesures du matin tombaient à 70-80, sur l'ancienne version comme sur la nouvelle. Lighthouse a montré que l'ordinateur tournait alors 3 à 4 fois moins vite (forte charge ou économie d'énergie). Je n'ai gardé que les mesures prises à puissance normale.

## Étape 7 : mise en ligne

J'ai repris l'étape 7 là où je m'étais arrêté. Tout ce qui pouvait se faire sur ton ordinateur est prêt :

- le site complet est dans `main` et se construit sans erreur ;
- les fichiers Vercel sont en place ;
- l'adresse e-mail des enregistrements est réglée pour Vercel.

La suite demande tes comptes et un achat, donc je ne peux pas la faire à ta place :

- créer le dépôt privé sur GitHub ;
- t'inscrire sur Vercel ;
- acheter le domaine yourikaramyan.com.

Tout est expliqué commande par commande dans [docs/guide-mise-en-ligne.md](guide-mise-en-ligne.md). L'outil GitHub n'est pas installé et aucun compte Vercel n'est connecté sur cet ordinateur. Je n'ai donc rien envoyé.

Ordre conseillé :

1. Copie ta nouvelle photo et ton nouveau CV (étape A du guide), ou dis-moi « photo et CV en place ».
2. Suis les étapes B à F du guide. Si un message d'erreur apparaît, copie-le-moi.
