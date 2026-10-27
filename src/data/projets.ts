// The four project pages (/projets/<slug>/), in display order, and their card on the home page.
// Youri, 26/10/2026: the site is a professional portfolio. It shows what he did, what he achieved and with which
// tools. Titles and dates come from the CV (sources/CV_Youri_Karamyan.pdf); figures only from the validated list in
// docs/suivi.md (Youri's answers of 27/10/2026 included). Nothing is made up: what is missing is listed in
// docs/suivi.md.
// The slug is also the "projet" field of src/data/profil.ts, so the timeline links to the page.
import type { ImageMetadata } from 'astro';
import ecranFil from '../assets/monarc/app-fil.jpg';
import grilleInstagram from '../assets/monarc/instagram-grille.jpg';
import statsTiktok from '../assets/monarc/tiktok-stats.jpg';
import logoBoutique from '../assets/projets/boutique-logo.jpg';
import gobeletsGobeat from '../assets/projets/gobeat-gobelets.jpg';
import enseigneGobeat from '../assets/projets/gobeat-enseigne.jpg';
import { PROFIL } from './profil';

export interface Chiffre {
  libelle: string;
  /** A number that counts up (src/components/Compteur.astro)... */
  valeur?: number;
  decimales?: number;
  prefixe?: string;
  suffixe?: string;
  /** ...or a fixed text ("2 M", "2e")... */
  texte?: string;
  /** ...read this way by screen readers, when the symbols would be read literally ("+500" is "Plus de 500"). */
  lecture?: string;
}

export interface Image {
  src: ImageMetadata;
  alt: string;
  legende: string;
  /** A logo sits on a white tile, never cropped (shown in the page header). */
  logo?: boolean;
  /** Screenshots shown in a phone frame (src/components/Telephone.astro); camera: the capture shows a status bar. */
  telephone?: { camera: boolean };
}

export interface Etape {
  titre: string;
  texte: string[];
}

export interface Projet {
  slug: string;
  titre: string;
  /** Dates as on the CV, with the place for the academic project ("HEPL, 2025"). */
  periode: string;
  role: string;
  /** The one result shown on the card. */
  resultat: string;
  /** Page description for search engines and link previews. */
  description: string;
  /** The card's visual, decorative (the link is in the title): an image, or the services in words. */
  carte: { image: ImageMetadata; logo?: boolean; cadrage?: string } | { mots: string[] };
  contexte: string[];
  fait: Etape[];
  /** releve: when the figures were read, shown right under them (Youri, 27/10/2026). */
  accompli: { chiffres?: Chiffre[]; releve?: string; textes?: string[] };
  outils: string[];
  /** The mobile app's fan of three screens (src/components/Eventail.astro). */
  eventail?: boolean;
  visuels?: Image[];
  boutons?: { texte: string; href: string }[];
}

const [application, boutique, freelance] = PROFIL.experiences;
const [, yep] = PROFIL.projetsAcademiques;

/** The mobile app's validated figures (docs/suivi.md), shared by its page, "Mes résultats" and the company pages. */
export const CHIFFRES_APPLICATION = {
  lancement: { valeur: 500, prefixe: '+', lecture: 'Plus de 500' },
  inscrits: { valeur: 1000, prefixe: '+', lecture: 'Plus de 1 000' },
  actifs: { valeur: 300, lecture: 'Environ 300' },
  attente: { valeur: 1700, prefixe: '+', lecture: 'Plus de 1 700' },
  vues: { texte: '2 M', lecture: '2 millions' },
  abonnes: { valeur: 6500, prefixe: '+', lecture: 'Plus de 6 500' },
} satisfies Record<string, Omit<Chiffre, 'libelle'>>;

/** "Une dizaine de clients" (Youri, 26/10/2026): shown as "10" with "environ" in the label. */
export const CLIENTS_FREELANCE = { valeur: 10 } satisfies Omit<Chiffre, 'libelle'>;

/** The shop's sales: "21 000 € générés en 6 mois" (Youri, 27/10/2026). The conversion rate stays private. */
export const VENTES_BOUTIQUE = { valeur: 21000, prefixe: '+', suffixe: ' €', lecture: 'Plus de 21 000 euros' } satisfies Omit<
  Chiffre,
  'libelle'
>;

export const PROJETS: Projet[] = [
  {
    slug: application.projet,
    titre: application.titre,
    periode: application.periode,
    role: "J'ai conçu le produit et piloté son développement.",
    resultat: 'Plus de 1 000 inscrits en 3 semaines.',
    description:
      "Projet d'application mobile de Youri Karamyan : MonArc, une application de suivi d'habitudes lancée le 1er octobre 2026, avec plus de 1 000 inscrits en 3 semaines.",
    carte: { image: ecranFil, cadrage: '50% 35%' },
    // Mechanics as described on the App Store listing (checked 19/10/2026); dates, users and tools: Youri, 27/10/2026.
    // No number of habits or grades: neither is validated.
    contexte: [
      "MonArc est une application de suivi d'habitudes. Elle est sortie le 1er octobre 2026 sur l'App Store et en version web, puis sur Google Play.",
      "Chaque participant choisit ses habitudes et leur rythme. Chaque jour, il valide ce qu'il a fait. Une preuve photo lui rapporte tous les points. Un classement le compare aux autres participants.",
    ],
    fait: [
      {
        titre: 'Concevoir le produit',
        texte: [
          "J'ai piloté la conception et le développement de l'application avec Claude Code.",
          "L'application combine la preuve photo, un classement hebdomadaire, des grades et des arcs privés.",
        ],
      },
      {
        titre: 'Construire la base technique',
        texte: [
          "Sur Supabase, j'ai mis en place la base de données, la connexion par code reçu par e-mail et le stockage des photos.",
          "J'ai défini les règles d'accès aux données et la modération : signalements, blocages et retrait de preuves.",
        ],
      },
      {
        titre: 'Préparer le lancement',
        texte: [
          "Avant le lancement, j'ai constitué sur Brevo une liste d'attente de plus de 1 700 inscrits.",
          "J'ai authentifié le domaine getmonarcapp.com pour l'envoi des e-mails.",
        ],
      },
      {
        titre: "Lancer l'application",
        texte: [
          "MonArc est sortie le 1er octobre 2026 sur l'App Store et en version web.",
          'Environ 540 personnes se sont inscrites le jour même.',
          'Sur Google Play, un test fermé a réuni environ 150 testeurs dès début octobre.',
          "L'application y est disponible pour tous depuis le 21 octobre 2026.",
        ],
      },
      {
        titre: 'Animer la communauté chaque jour',
        texte: [
          'Je publie une vidéo TikTok par jour, construite à partir des preuves photo des utilisateurs.',
          'Sur Instagram, je partage régulièrement les preuves du jour.',
        ],
      },
      {
        titre: 'Fidéliser par e-mail',
        texte: [
          "Sur Brevo, j'envoie l'annonce du lancement, les bilans de la semaine et des relances aux inscrits inactifs.",
          'Les listes de destinataires sont tirées de la base de données.',
        ],
      },
    ],
    accompli: {
      chiffres: [
        { ...CHIFFRES_APPLICATION.lancement, libelle: 'inscrits le jour du lancement' },
        { ...CHIFFRES_APPLICATION.inscrits, libelle: 'inscrits en 3 semaines' },
        { ...CHIFFRES_APPLICATION.actifs, libelle: 'personnes environ, actives chaque semaine' },
        { ...CHIFFRES_APPLICATION.attente, libelle: "inscrits sur la liste d'attente avant le lancement" },
        { ...CHIFFRES_APPLICATION.vues, libelle: 'de vues sur TikTok' },
        { ...CHIFFRES_APPLICATION.abonnes, libelle: 'abonnés sur TikTok' },
      ],
    },
    outils: ['Claude Code', 'Supabase', 'Brevo', 'TikTok', 'Instagram'],
    eventail: true,
    visuels: [
      {
        src: grilleInstagram,
        alt: 'Grille Instagram du compte @monarc_app : les publications des jours 11 à 18 du Winter Arc.',
        legende: 'Les preuves du jour sur Instagram',
        telephone: { camera: true },
      },
      {
        // Cropped under the "J'aime" and "Commentaires" tiles (Youri, 21/10/2026): no "Récompenses estimées $0.00".
        src: statsTiktok,
        alt: 'Statistiques TikTok du compte @monarc_app sur 60 jours, au 17 octobre 2026 : 1,9 million de vues de publications.',
        legende: 'Les statistiques TikTok sur 60 jours, au 17 octobre 2026',
        telephone: { camera: false },
      },
    ],
    boutons: [
      { texte: "Voir MonArc sur l'App Store", href: PROFIL.monarc.appStore },
      { texte: 'Voir MonArc sur Google Play', href: PROFIL.monarc.googlePlay },
    ],
  },
  {
    slug: boutique.projet,
    titre: boutique.titre,
    periode: boutique.periode,
    role: `${boutique.structure}, ${boutique.detail}.`,
    resultat: 'Plus de 21 000 € de ventes en 6 mois.',
    description:
      "Entrepreneuriat e-commerce de Youri Karamyan : une boutique en ligne d'équipements sportifs créée sur Shopify et gérée seul, avec plus de 21 000 € de ventes en 6 mois.",
    carte: { image: logoBoutique, logo: true },
    // What the shop sold and how it found its customers: Youri, 21/10/2026. Sales and "tout seul": Youri, 27/10/2026.
    // The site, the products and the social networks come from the CV of 19/10/2026. The shop's name stays private.
    contexte: [
      "En 2022, j'ai créé sur Shopify ma propre boutique en ligne d'équipements sportifs.",
      "Je l'ai gérée seul, de A à Z, jusqu'en 2023.",
    ],
    fait: [
      {
        titre: 'Créer la boutique',
        texte: ["J'ai créé le site et sélectionné les produits.", "J'ai animé les réseaux sociaux de la boutique."],
      },
      {
        titre: 'Trouver des clients',
        texte: [
          "J'ai développé des stratégies marketing.",
          "J'ai trouvé mes clients grâce à des influenceurs sur Twitter et YouTube.",
        ],
      },
      {
        titre: 'Gérer les ventes',
        texte: ["J'ai géré les commandes, les fournisseurs et le service client."],
      },
    ],
    accompli: {
      chiffres: [{ ...VENTES_BOUTIQUE, libelle: 'de ventes en 6 mois' }],
      textes: ["Une boutique en ligne que j'ai créée et gérée seul, de A à Z."],
    },
    outils: ['Shopify'],
    visuels: [
      {
        src: logoBoutique,
        alt: 'Logo de la boutique : une chaussure de football qui frappe un ballon, en bleu.',
        legende: 'Le logo de la boutique',
        logo: true,
      },
    ],
  },
  {
    slug: freelance.projet,
    titre: freelance.titre,
    periode: freelance.periode,
    role: `${freelance.structure}, ${freelance.detail}.`,
    resultat: 'Une dizaine de clients accompagnés.',
    description:
      'Freelance digital de Youri Karamyan, de 2020 à 2023 : photo, vidéo, sites web, supports de communication, traduction et sous-titrage.',
    carte: { mots: ['Photo', 'Vidéo', 'Sites web', 'Traduction'] },
    contexte: ["De 2020 à 2023, en parallèle de mes études, j'ai proposé mes services en indépendant."],
    fait: [
      {
        titre: 'Créer des contenus et des sites',
        texte: ["J'ai réalisé des photos, des vidéos, des sites web et des supports de communication."],
      },
      {
        titre: 'Traduire et sous-titrer',
        // One mission given by Youri on 21/10/2026.
        texte: [
          "J'ai traduit et sous-titré des contenus en français, en anglais et en arménien.",
          "Exemple de mission : le sous-titrage d'un cours en ligne.",
        ],
      },
    ],
    accompli: {
      chiffres: [{ ...CLIENTS_FREELANCE, libelle: 'clients environ, particuliers et entreprises' }],
    },
    outils: ['Adobe Premiere Pro', 'Adobe Photoshop', 'Canva'],
  },
  {
    slug: yep.projet,
    titre: yep.titre,
    periode: `${yep.lieu}, ${yep.periode}`,
    role: `${yep.role}.`,
    resultat: '2e place au prix professionnel des jurys.',
    description:
      "Young Enterprise Project de Youri Karamyan à la HEPL : directeur général de Gob'Eat, une entreprise étudiante de gobelets en biscuit, 2e place au prix professionnel des jurys.",
    carte: { image: gobeletsGobeat, cadrage: '50% 62%' },
    // The prize: Youri, 27/10/2026. Everything else comes from the Gob'Eat business plan (sources/business-plan-gobeat.pdf),
    // which Youri allowed to use in full on 27/10/2026: team, poles and role (p. 3 and 10), general meeting (p. 4),
    // product (p. 6), recipe and resistance (p. 8), SWOT and PESTEL (p. 14-15), four competitors (p. 16-19), three
    // suppliers and material cost (p. 21-24), cafés and their price range (p. 29-31), B2B2C model and targets
    // (p. 33-34), positioning (p. 36), networks (p. 41), survey (p. 54). The commercial launch comes from the CV.
    // No team member and no café is named, and no team photo (Youri, 21/10/2026).
    contexte: [
      "Dans le cadre du Young Enterprise Project, à la HEPL, nous avons créé à dix l'entreprise étudiante Gob'Eat.",
      'Notre produit : un gobelet en biscuit artisanal de 140 ml, nappé de chocolat belge. Il se mange une fois le café terminé et ne laisse aucun déchet.',
      'Notre cœur de cible : les cafés indépendants de Liège et de sa périphérie.',
    ],
    fait: [
      {
        titre: "Diriger l'équipe",
        texte: [
          "J'ai dirigé l'équipe de dix étudiants en tant que directeur général.",
          "L'équipe était organisée en pôles : produit, e-commerce, communication, artistique, opérations, finance et juridique.",
        ],
      },
      {
        titre: 'Porter la relation commerciale',
        texte: [
          "J'assurais les responsabilités commerciales de Gob'Eat, dont j'étais le point de contact.",
          'Notre modèle : vendre aux cafés un produit qui doit séduire leurs clients.',
        ],
      },
      {
        titre: 'Étudier le marché',
        texte: [
          'Nous avons mené une enquête auprès de 85 personnes.',
          "76,5 % d'entre elles n'avaient jamais entendu parler de gobelet comestible.",
          'Nous avons interrogé deux cafés du centre de Liège : ils seraient prêts à payer entre 0,50 € et 2 € le gobelet.',
          "L'étude comprenait aussi l'analyse de quatre concurrents, une analyse SWOT et une analyse PESTEL.",
        ],
      },
      {
        titre: 'Construire la stratégie marketing',
        texte: [
          'Notre positionnement : la gourmandise et le zéro déchet.',
          "Après les cafés indépendants, nous visions les traiteurs, les événements d'entreprise et les pâtisseries haut de gamme.",
          "Instagram et TikTok servaient à toucher le public. LinkedIn servait à démarcher les gérants d'établissements.",
        ],
      },
      {
        titre: 'Développer le produit',
        texte: [
          "Nous avons essayé la recette plus de 15 fois, avec l'aide de pâtissiers professionnels.",
          'Notre biscuit résiste 40 minutes aux liquides chauds.',
          'Nous avons sélectionné trois fournisseurs professionnels pour les ingrédients.',
          'Le coût matière est estimé à 0,18 € par gobelet.',
        ],
      },
      {
        titre: "Présenter et lancer Gob'Eat",
        texte: [
          "Nous avons présenté plus de 120 gobelets lors de l'assemblée générale de l'entreprise.",
          'Nous avons ensuite assuré le lancement commercial du produit.',
          "Gob'Eat a obtenu la 2e place au prix professionnel des jurys.",
        ],
      },
    ],
    accompli: {
      chiffres: [
        { texte: '2e', lecture: 'Deuxième', libelle: 'place au prix professionnel des jurys' },
        { valeur: 120, prefixe: '+', lecture: 'Plus de 120', libelle: "gobelets présentés lors de l'assemblée générale" },
        { valeur: 85, libelle: "personnes interrogées pour l'étude de marché" },
        { valeur: 75, suffixe: ' %', libelle: 'des personnes interrogées prêtes à essayer le produit' },
        { valeur: 40, suffixe: ' min', lecture: '40 minutes', libelle: 'de résistance du biscuit aux liquides chauds' },
        { valeur: 10, libelle: "étudiants dans l'équipe que j'ai dirigée" },
      ],
    },
    // Named in the business plan: the three networks (p. 41) and the website on Odoo (gobeat.odoo.com, p. 10).
    outils: ['Instagram', 'TikTok', 'LinkedIn', 'Odoo'],
    visuels: [
      {
        src: gobeletsGobeat,
        alt: "Gobelets Gob'Eat en biscuit, garnis et décorés de vermicelles colorés, sur deux plateaux blancs.",
        legende: "Les gobelets Gob'Eat sur notre stand",
      },
      {
        src: enseigneGobeat,
        alt: "Enseigne au néon jaune « Gobeat » au-dessus du stand, entre des ballons et une guirlande d'ampoules.",
        legende: "L'enseigne lumineuse du stand",
      },
    ],
  },
];

/** Address of a project page, from its slug. */
export const lienProjet = (slug: string) => `/projets/${slug}/`;

/** The projects that have a page, by slug (the timeline links to them). */
export const SLUGS_PROJETS = new Set(PROJETS.map((p) => p.slug));
