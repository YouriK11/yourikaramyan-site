// Projects that open on a panel in the "Projets" section. Youri's rule (21/10/2026): a panel that opens on almost
// nothing does more harm than good. A project gets its panel only once he has given its context, what he did and
// its results; until then it is a simple line, and its CV details stay in the timeline.
// Add a project's id here (the "projet" field of src/data/profil.ts) together with its content in Projets.astro.
// 21/10/2026: Youri gave the information for the shop, the freelance work and the Young Enterprise Project.
export const PROJETS_AVEC_PANNEAU = new Set<string>([
  'monarc',
  'boutique-e-commerce',
  'freelance-digital',
  'young-enterprise-project',
]);
