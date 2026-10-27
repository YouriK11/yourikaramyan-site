// The four project pages (/projets/<slug>/), in display order, and their card on the home page.
// Youri, 26/10/2026: the site is a professional portfolio. It shows what he did, what he achieved and with which
// tools. Titles and dates come from the CV (sources/CV_Youri_Karamyan.pdf); figures only from the validated list in
// docs/suivi.md (or given by Youri on 26/10/2026: "une dizaine de clients" in freelance). Nothing is made up: what is
// missing is listed in docs/suivi.md.
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
  /** ...read this way by screen readers, when the symbols would be read literally ("+500" is "Plus de 500"). */
  lecture?: string;
  /** ...or a fixed text ("3 sur 4"). */
  texte?: string;
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
  accompli: { chiffres?: Chiffre[]; textes?: string[] };
  outils: string[];
  /** The mobile app's fan of three screens (src/components/Eventail.astro). */
  eventail?: boolean;
  visuels?: Image[];
  boutons?: { texte: string; href: string }[];
}

const [application, boutique, freelance] = PROFIL.experiences;
const [, yep] = PROFIL.projetsAcademiques;

/** The mobile app's validated figures (docs/suivi.md), shared by its page and by "Mes résultats" on the home page. */
export const CHIFFRES_APPLICATION = {
  lancement: { valeur: 500, prefixe: '+', lecture: 'Plus de 500' },
  attente: { valeur: 1700, prefixe: '+', lecture: 'Plus de 1 700' },
  vues: { valeur: 1.9, decimales: 1, suffixe: ' M', lecture: '1,9 million' },
  abonnes: { valeur: 6500, prefixe: '+', lecture: 'Plus de 6 500' },
} satisfies Record<string, Omit<Chiffre, 'libelle'>>;

/** "Une dizaine de clients" (Youri, 26/10/2026): shown as "10" with "environ" in the label. */
export const CLIENTS_FREELANCE = { valeur: 10 } satisfies Omit<Chiffre, 'libelle'>;

export const PROJETS: Projet[] = [
  {
    slug: application.projet,
    titre: application.titre,
    periode: application.periode,
    role: "J'ai conçu le produit et piloté son développement.",
    resultat: 'Plus de 500 inscrits le jour du lancement.',
    description:
      "Projet d'application mobile de Youri Karamyan : MonArc, une application de suivi d'habitudes disponible sur l'App Store et Google Play.",
    carte: { image: ecranFil, cadrage: '50% 35%' },
    // Mechanics as described on the App Store listing (checked 19/10/2026). No number of habits or grades: neither
    // is validated.
    contexte: [
      "MonArc est une application de suivi d'habitudes, disponible sur l'App Store et Google Play.",
      "Chaque participant choisit ses habitudes et leur rythme. Chaque jour, il valide ce qu'il a fait. Une preuve photo lui rapporte tous les points. Un classement le compare aux autres participants.",
    ],
    fait: [
      {
        titre: 'Concevoir le produit',
        texte: ["L'application combine la preuve photo, un classement hebdomadaire, des grades et des arcs privés."],
      },
      {
        titre: 'Préparer le lancement',
        texte: ["Avant le lancement, j'ai constitué une liste d'attente de plus de 1 700 inscrits.", "Je l'anime par e-mail."],
      },
      {
        titre: "Lancer l'application",
        texte: [
          "MonArc est sortie le 1er octobre 2026 sur l'App Store.",
          'Plus de 500 personnes se sont inscrites le jour même.',
          "L'application est aussi disponible sur Google Play.",
        ],
      },
      {
        titre: 'Animer la communauté chaque jour',
        texte: [
          'Je publie une vidéo TikTok par jour, construite à partir des preuves photo des utilisateurs.',
          'Sur Instagram, je partage régulièrement les preuves du jour.',
        ],
      },
    ],
    accompli: {
      chiffres: [
        { ...CHIFFRES_APPLICATION.lancement, libelle: 'inscrits le jour du lancement' },
        { ...CHIFFRES_APPLICATION.attente, libelle: "inscrits sur la liste d'attente avant le lancement" },
        { ...CHIFFRES_APPLICATION.vues, libelle: 'de vues sur TikTok en 60 jours' },
        { ...CHIFFRES_APPLICATION.abonnes, libelle: 'abonnés sur TikTok' },
      ],
    },
    outils: ['Claude', 'Supabase', 'Brevo', 'TikTok', 'Instagram'],
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
        alt: 'Statistiques TikTok du compte @monarc_app sur 60 jours : 1,9 million de vues de publications.',
        legende: 'Les statistiques TikTok sur 60 jours',
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
    // The turnover and the conversion rate are not shown (Youri, 26/10/2026, kept in docs/suivi.md), nor the dates of
    // the Shopify report they come from.
    resultat: 'Une boutique créée et gérée de A à Z.',
    description:
      "Entrepreneuriat e-commerce de Youri Karamyan, de 2022 à 2023 : une boutique en ligne d'équipements sportifs, créée sur Shopify.",
    carte: { image: logoBoutique, logo: true },
    // What the shop sold and how it found its customers: Youri, 21/10/2026. The site, the products and the social
    // networks come from the CV of 19/10/2026. The shop's name stays private.
    contexte: ["En 2022, j'ai créé sur Shopify ma propre boutique en ligne d'équipements sportifs.", "Je l'ai gérée jusqu'en 2023."],
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
      textes: ['Une boutique en ligne créée et gérée de A à Z, de 2022 à 2023.'],
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
    resultat: "Plus de 120 gobelets présentés lors de l'assemblée générale.",
    description:
      "Young Enterprise Project de Youri Karamyan à la HEPL : directeur général de Gob'Eat, une entreprise étudiante de gobelets en biscuit.",
    carte: { image: gobeletsGobeat, cadrage: '50% 62%' },
    // From the Gob'Eat business plan sent by Youri on 21/10/2026 (sources/business-plan-gobeat.pdf): team, poles and
    // role (p. 3 and 10), product (p. 6), pastry chefs (p. 8), SWOT and PESTEL (p. 14-15), competition (p. 16-19),
    // suppliers (p. 21-27), cafés (p. 29-31), target (p. 33-34), positioning (p. 36), networks (p. 41), survey
    // (p. 54), general meeting (p. 4). The commercial launch comes from the CV. No other team member is named, and no
    // team photo (Youri, 21/10/2026).
    contexte: [
      "Dans le cadre du Young Enterprise Project, à la HEPL, nous avons créé à dix l'entreprise étudiante Gob'Eat.",
      'Notre produit : un gobelet en biscuit nappé de chocolat belge. Il se mange une fois le café terminé et ne laisse aucun déchet.',
      'Notre cœur de cible : les cafés indépendants de Liège et de sa périphérie.',
    ],
    fait: [
      {
        titre: "Gérer l'équipe",
        texte: [
          "J'ai géré l'équipe en tant que directeur général.",
          "L'équipe était organisée en pôles : produit, e-commerce, communication, artistique, opérations, finance et juridique.",
        ],
      },
      {
        titre: 'Porter la relation commerciale',
        texte: ["J'assurais les responsabilités commerciales de Gob'Eat, dont j'étais le point de contact."],
      },
      {
        titre: 'Étudier le marché',
        texte: [
          'Nous avons mené une enquête auprès de 85 personnes.',
          'Nous avons aussi interrogé deux cafés du centre de Liège.',
          "L'étude comprenait aussi une analyse de la concurrence, une analyse SWOT et une analyse PESTEL.",
        ],
      },
      {
        titre: 'Construire la stratégie marketing',
        texte: [
          'Notre positionnement : la gourmandise et le zéro déchet.',
          "Instagram et TikTok servaient à toucher le public. LinkedIn servait à démarcher les gérants d'établissements.",
        ],
      },
      {
        titre: 'Développer et lancer le produit',
        texte: [
          "Nous avons mis au point la recette avec l'aide de pâtissiers professionnels.",
          'Nous avons choisi des fournisseurs professionnels pour les ingrédients.',
          "Nous avons présenté plus de 120 gobelets lors de l'assemblée générale de l'entreprise.",
          'Nous avons ensuite assuré le lancement commercial du produit.',
        ],
      },
    ],
    accompli: {
      chiffres: [
        { valeur: 120, prefixe: '+', lecture: 'Plus de 120', libelle: "gobelets présentés lors de l'assemblée générale" },
        { valeur: 85, libelle: "personnes interrogées pour l'étude de marché" },
        { texte: '3 sur 4', libelle: 'personnes interrogées prêtes à essayer le produit' },
        { valeur: 10, libelle: "étudiants dans l'équipe que j'ai dirigée" },
      ],
    },
    // The three networks of the marketing strategy (business plan, p. 41). Youri gave no tools for this project.
    outils: ['Instagram', 'TikTok', 'LinkedIn'],
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
