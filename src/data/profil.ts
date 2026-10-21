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

  // projet: address of the project's panel in the "Projets" section (#monarc...), shared with the timeline.
  // debut / fin: years used to order the timeline (fin: null = still ongoing). periode: text shown, as on the CV.
  formation: [
    { titre: 'Bachelier en E-Business', lieu: 'HEPL, Liège', periode: "2024 à aujourd'hui", debut: 2024, fin: null },
    { titre: 'Bachelier en Sciences de gestion', lieu: 'HEC Liège', periode: '2022-2024', debut: 2022, fin: 2024 },
    { titre: 'CESS, finalité économique', lieu: 'Collège Saint-Servais, Liège', periode: '2016-2022', debut: 2016, fin: 2022 },
  ],

  experiences: [
    {
      titre: "Projet d'application mobile",
      projet: 'monarc',
      structure: 'MonArc',
      detail: 'getmonarcapp.com',
      periode: '2026',
      debut: 2026,
      fin: 2026,
      points: [
        "Conception et lancement d'une application de suivi d'habitudes sur l'App Store, Google Play et en version web.",
        'Promotion sur TikTok avec du contenu publié chaque jour, et sur Instagram avec des publications régulières.',
        `Gestion de la base clients par e-mail, avec plus de 1${NBSP}700 inscrits.`,
      ],
    },
    {
      titre: 'Freelance digital',
      projet: 'freelance-digital',
      structure: 'Indépendant',
      detail: 'clients particuliers et professionnels',
      periode: '2020-2023',
      debut: 2020,
      fin: 2023,
      points: [
        'Sites web, supports marketing, montage photo et vidéo, sous-titrage.',
        "Traduction de documents entre le français, l'anglais et l'arménien.",
      ],
    },
    {
      titre: 'Boutique e-commerce',
      projet: 'boutique-e-commerce',
      structure: 'Projet personnel',
      detail: '',
      periode: '2022',
      debut: 2022,
      fin: 2022,
      points: [`Création et gestion de A à Z${NBSP}: site, sourcing produits, réseaux sociaux, commandes et service après-vente.`],
      // Validated by Youri (Shopify capture, docs/suivi.md). Not on the CV; the shop's name stays private.
      resultats: [
        `Plus de 21${NBSP}000${NBSP}€ de ventes de mars 2022 à janvier 2023.`,
        `Taux de conversion${NBSP}: 1,55${NBSP}%.`,
      ],
    },
  ],

  projetsAcademiques: [
    {
      titre: "Implémentation d'un CRM Odoo",
      projet: 'crm-odoo',
      lieu: 'HEPL',
      periode: '2026',
      debut: 2026,
      fin: 2026,
      texte: 'Automatisation des leads, du pipeline commercial et du SAV.',
    },
    {
      titre: 'Young Enterprise Project',
      projet: 'young-enterprise-project',
      lieu: 'HEPL',
      periode: '2025',
      debut: 2025,
      fin: 2025,
      texte: `Création d'une entreprise étudiante${NBSP}: étude de marché, modèle financier, stratégie marketing et go-to-market.`,
    },
  ],

  jobs: [
    { employeur: 'Quick Herstal', texte: 'équipier polyvalent sur cinq postes, service client.', periode: 'depuis 2023', debut: 2023, fin: null },
    { employeur: 'Atlas Agency', texte: 'vente directe pour des associations caritatives.', periode: '2023', debut: 2023, fin: 2023 },
    { employeur: 'Chemin Faisant / Métaphore', texte: "agent d'entretien.", periode: '2020-2022', debut: 2020, fin: 2022 },
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
    // Public on Google Play since 21/10/2026 (link given by Youri, listing checked the same day).
    googlePlay: 'https://play.google.com/store/apps/details?id=com.getmonarcapp.app',
  },
} as const;
