// Every fact about Youri shown on the site, transcribed from sources/CV_Youri_Karamyan.pdf (19/10/2026).
// Change the CV here once and every page follows.
// French typography: " " is a non-breaking space (before ":" and similar signs).

const NBSP = ' ';

export const PROFIL = {
  identite: {
    prenom: 'Youri',
    nom: 'Karamyan',
    titre: 'Étudiant en 3e bachelier E-Business, HEPL',
    recherche: 'Je cherche un stage en marketing digital et e-commerce.',
    accroche: "En dernière année d'E-Business, je me forme au marketing digital, à l'e-commerce et aux outils de gestion.",
    age: '22 ans',
    mobilite: 'Permis B et véhicule',
    lieu: 'Vivegnis, Liège',
  },

  contact: {
    email: 'yourikaramyan@gmail.com',
    telephone: `+32${NBSP}472${NBSP}65${NBSP}04${NBSP}03`,
    telephoneLien: 'tel:+32472650403',
    linkedin: 'https://www.linkedin.com/in/youri-karamyan/',
    linkedinAffiche: 'linkedin.com/in/youri-karamyan',
  },

  cv: {
    fichier: '/Youri-Karamyan-CV.pdf',
    nomTelechargement: 'Youri-Karamyan-CV.pdf',
  },

  formation: [
    { titre: 'Bachelier en E-Business', lieu: 'HEPL, Liège', periode: "2024 à aujourd'hui" },
    { titre: 'Bachelier en Sciences de gestion', lieu: 'HEC Liège', periode: '2022-2024' },
    { titre: 'CESS, finalité économique', lieu: 'Collège Saint-Servais, Liège', periode: '2016-2022' },
  ],

  experiences: [
    {
      titre: "Projet d'application mobile",
      structure: 'MonArc',
      detail: 'getmonarcapp.com',
      periode: '2026',
      points: [
        // The CV also says "Google Play": the app is not there yet (Youri, 19/10/2026), so the site leaves it out.
        "Conception et lancement d'une application de suivi d'habitudes sur l'App Store et en version web.",
        'Promotion sur TikTok avec du contenu publié chaque jour, et sur Instagram avec des publications régulières.',
        `Gestion de la base clients par e-mail, avec plus de 1${NBSP}700 inscrits.`,
      ],
    },
    {
      titre: 'Freelance digital',
      structure: 'Indépendant',
      detail: 'clients particuliers et professionnels',
      periode: '2020-2023',
      points: [
        'Sites web, supports marketing, montage photo et vidéo, sous-titrage.',
        "Traduction de documents entre le français, l'anglais et l'arménien.",
      ],
    },
    {
      titre: 'Boutique e-commerce',
      structure: 'Projet personnel',
      detail: '',
      periode: '2022',
      points: [`Création et gestion de A à Z${NBSP}: site, sourcing produits, réseaux sociaux, commandes et service après-vente.`],
    },
  ],

  projetsAcademiques: [
    {
      titre: "Implémentation d'un CRM Odoo",
      lieu: 'HEPL',
      periode: '2026',
      texte: 'Automatisation des leads, du pipeline commercial et du SAV.',
    },
    {
      titre: 'Young Enterprise Project',
      lieu: 'HEPL',
      periode: '2025',
      texte: `Création d'une entreprise étudiante${NBSP}: étude de marché, modèle financier, stratégie marketing et go-to-market.`,
    },
  ],

  jobs: [
    { employeur: 'Quick Herstal', texte: 'équipier polyvalent sur cinq postes, service client.', periode: 'depuis 2023' },
    { employeur: 'Atlas Agency', texte: 'vente directe pour des associations caritatives.', periode: '2023' },
    { employeur: 'Chemin Faisant / Métaphore', texte: "agent d'entretien.", periode: '2020-2022' },
  ],

  competences: [
    { groupe: 'E-commerce et web', detail: 'Shopify, WordPress, gestion de boutique en ligne' },
    { groupe: 'Marketing', detail: 'Réseaux sociaux (TikTok, Instagram), création de contenu, montage vidéo' },
    { groupe: 'Outils', detail: 'Odoo (CRM et ERP), IA générative' },
    { groupe: 'Commercial', detail: 'Vente directe, argumentation, négociation' },
  ],

  langues: [
    { langue: 'Arménien', niveau: 'langue maternelle' },
    { langue: 'Français', niveau: 'bilingue' },
    { langue: 'Anglais', niveau: 'B2' },
    { langue: 'Allemand', niveau: 'notions' },
  ],

  interets: 'Entrepreneuriat, e-commerce, nouvelles technologies, course à pied et vidéo',

  monarc: {
    site: 'https://getmonarcapp.com',
    siteAffiche: 'getmonarcapp.com',
    appStore: 'https://apps.apple.com/be/app/monarc/id6816906304?l=fr-FR',
    // Not on Google Play yet: Android users install the web version from getmonarcapp.com.
    googlePlay: null,
  },
} as const;
