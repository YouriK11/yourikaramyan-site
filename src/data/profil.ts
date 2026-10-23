// Every fact about Youri shown on the site, transcribed from sources/CV_Youri_Karamyan.pdf (23/10/2026).
// Change the CV here once and every page follows.
// French typography: " " is a non-breaking space (before ":" and similar signs).

const NBSP = ' ';

export const PROFIL = {
  identite: {
    prenom: 'Youri',
    nom: 'Karamyan',
    titre: 'Étudiant en 3e bachelier E-Business, HEPL',
    // The CV says "Stage en marketing digital, de janvier à mai 2027." The site says it in the first person.
    recherche: 'Je cherche un stage en marketing digital, de janvier à mai 2027.',
    accroche:
      "En dernière année d'E-Business, je me forme au marketing digital et à la relation client. Je veux aider une entreprise à se développer en ligne.",
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

  // debut / fin: years used to order the timeline (fin: null = still ongoing). periode: text shown, as on the CV.
  formation: [
    { titre: 'Bachelier en E-Business', lieu: 'HEPL, Liège', periode: "2024 à aujourd'hui", debut: 2024, fin: null },
    { titre: 'Bachelier en Sciences de gestion', lieu: 'HEC Liège', periode: '2022-2024', debut: 2022, fin: 2024 },
    { titre: 'CESS, finalité économique', lieu: 'Collège Saint-Servais, Liège', periode: '2016-2022', debut: 2016, fin: 2022 },
  ],

  // Youri is discreet about his personal projects (23/10/2026): one sentence each, exactly as on the CV, no figures,
  // no app name.
  experiences: [
    {
      titre: "Projet d'application mobile",
      periode: '2026',
      debut: 2026,
      fin: 2026,
      texte: "Conception d'une application de suivi d'habitudes et de sa communication.",
    },
    {
      titre: 'Freelance digital',
      periode: '2020-2023',
      debut: 2020,
      fin: 2023,
      texte: 'Photo, vidéo, sites web et traductions pour des particuliers et des entreprises.',
    },
  ],

  projetsAcademiques: [
    {
      titre: 'Young Enterprise Project',
      lieu: 'HEPL',
      periode: '2025',
      debut: 2025,
      fin: 2025,
      texte: "Création d'une entreprise étudiante, de l'étude de marché au lancement.",
    },
  ],

  jobs: [
    { employeur: 'Quick Herstal', texte: 'équipier polyvalent tous les week-ends, en fermeture.', periode: 'depuis 2023', debut: 2023, fin: null },
    { employeur: 'Atlas Agency', texte: 'vente directe pour des associations caritatives.', periode: '2023', debut: 2023, fin: 2023 },
    { employeur: 'Chemin Faisant / Métaphore', texte: "agent d'entretien.", periode: '2020-2022', debut: 2020, fin: 2022 },
  ],

  competences: [
    { groupe: 'Marketing et communication', detail: 'Réseaux sociaux (Instagram, TikTok), création de contenu, photo et vidéo' },
    { groupe: 'Relation client', detail: 'Service client, vente directe, argumentation' },
    { groupe: 'Outils', detail: 'Odoo (CRM et ERP), IA générative' },
    { groupe: 'Web', detail: 'Shopify, gestion de site' },
  ],

  langues: [
    { langue: 'Arménien', niveau: 'langue maternelle' },
    { langue: 'Français', niveau: 'bilingue' },
    { langue: 'Anglais', niveau: 'B2' },
    { langue: 'Allemand', niveau: 'notions' },
  ],

  interets: 'Entrepreneuriat, immobilier, nouvelles technologies, course à pied et vidéo',
} as const;
