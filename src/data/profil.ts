// Every fact about Youri shown on the site, transcribed from sources/CV_Youri_Karamyan.pdf (26/10/2026).
// The CV stays short; the project pages (src/data/projets.ts) add explanations and the figures validated in
// docs/suivi.md.
// Change the CV here once and every page follows.
// French typography: " " is a non-breaking space (before ":" and similar signs).

const NBSP = ' ';

export const PROFIL = {
  identite: {
    prenom: 'Youri',
    nom: 'Karamyan',
    titre: 'Étudiant en 3e bachelier E-Business, HEPL',
    // The CV says "Stage en marketing digital, de janvier à mai 2027." The site says it in the first person.
    recherche: 'Je cherche un stage en marketing digital, de janvier à mai 2027.',
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

  // projet: the project's page (/projets/<projet>/, src/data/projets.ts), linked from the timeline when it exists
  // (the Ressourcerie has none: its timeline line keeps the CV's details).
  // debut / fin: years used to order the timeline (fin: null = still ongoing). periode: text shown, as on the CV.
  formation: [
    { titre: 'Bachelier en E-Business', lieu: 'HEPL, Liège', periode: `2024${NBSP}- en${NBSP}cours`, debut: 2024, fin: null },
    { titre: 'Bachelier en Sciences de gestion', lieu: 'HEC Liège', periode: '2022-2024', debut: 2022, fin: 2024 },
    { titre: 'CESS, finalité économique', lieu: 'Collège Saint-Servais, Liège', periode: '2016-2022', debut: 2016, fin: 2022 },
  ],

  experiences: [
    {
      titre: "Projet d'application mobile",
      projet: 'application-mobile',
      structure: '',
      detail: '',
      periode: `2026${NBSP}- en${NBSP}cours`,
      debut: 2026,
      fin: null,
      points: [
        "Conception d'une application de suivi d'habitudes (App Store et Google Play).",
        'Création de contenu et animation de la communauté sur TikTok et Instagram.',
        `Constitution d'une liste d'attente de plus de 1${NBSP}700 inscrits avant le lancement.`,
      ],
    },
    {
      titre: 'Entrepreneuriat e-commerce',
      projet: 'entrepreneuriat-e-commerce',
      structure: 'Boutique en ligne',
      detail: 'projet personnel',
      periode: '2022-2023',
      debut: 2022,
      fin: 2023,
      points: [
        "Création et gestion d'une boutique e-commerce.",
        'Développement de stratégies marketing et acquisition de clients.',
        'Gestion des ventes, des fournisseurs et du service client.',
      ],
    },
    {
      titre: 'Freelance digital',
      projet: 'freelance-digital',
      structure: 'Indépendant',
      detail: 'pour des particuliers et des entreprises',
      periode: '2020-2023',
      debut: 2020,
      fin: 2023,
      points: [
        'Photo, vidéo, sites web et supports de communication.',
        'Traduction et sous-titrage en français, en anglais et en arménien.',
      ],
    },
  ],

  projetsAcademiques: [
    {
      titre: 'Ressourcerie du Pays de Liège',
      projet: 'ressourcerie-du-pays-de-liege',
      lieu: 'HEPL',
      role: '',
      periode: '2026',
      debut: 2026,
      fin: 2026,
      points: ["Élaboration d'un plan de communication pour l'entreprise.", "Proposition d'un nouveau site internet."],
    },
    {
      titre: 'Young Enterprise Project',
      projet: 'young-enterprise-project',
      lieu: 'HEPL',
      role: "Directeur général de Gob'Eat, entreprise étudiante de gobelets en biscuit",
      periode: '2025',
      debut: 2025,
      fin: 2025,
      points: [
        "Gestion de l'équipe et responsabilités commerciales de l'entreprise.",
        "Étude de marché auprès de 85 personnes et élaboration de la stratégie marketing.",
        'Développement du produit et lancement commercial.',
      ],
    },
  ],

  jobs: [
    { employeur: 'Quick Herstal', texte: 'équipier polyvalent tous les week-ends, en fermeture.', periode: `2023${NBSP}- en${NBSP}cours`, debut: 2023, fin: null },
    { employeur: 'Atlas Agency', texte: 'vente directe pour des associations caritatives.', periode: '2023', debut: 2023, fin: 2023 },
    { employeur: 'Chemin Faisant / Métaphore', texte: "agent d'entretien.", periode: '2020-2022', debut: 2020, fin: 2022 },
  ],

  competences: [
    {
      groupe: 'Marketing et communication',
      detail: 'Réseaux sociaux (Instagram, TikTok), création de contenu, plan de communication, photo et vidéo',
    },
    { groupe: 'Relation client', detail: 'Service client, vente directe, argumentation' },
    // Youri lists these tools on his CV (26/10/2026), AI assistants included.
    { groupe: 'Outils', detail: 'Shopify, Canva, Microsoft Office, ChatGPT, Claude, Gemini' },
  ],

  qualites: [
    'Esprit entrepreneurial',
    'Créativité',
    'Sens commercial',
    "Capacité d'analyse",
    'Autonomie',
    'Discrétion',
    "Esprit d'équipe",
  ],

  langues: [
    { langue: 'Arménien', niveau: 'langue maternelle' },
    { langue: 'Français', niveau: 'bilingue' },
    { langue: 'Anglais', niveau: 'B2' },
    { langue: 'Allemand', niveau: 'notions' },
  ],

  interets: 'Entrepreneuriat, immobilier, nouvelles technologies, course à pied, salle de sport et vidéo',

  monarc: {
    appStore: 'https://apps.apple.com/be/app/monarc/id6816906304?l=fr-FR',
    // Public on Google Play since 21/10/2026 (link given by Youri, listing checked the same day).
    googlePlay: 'https://play.google.com/store/apps/details?id=com.getmonarcapp.app',
  },
} as const;
