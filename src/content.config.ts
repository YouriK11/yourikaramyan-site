// Company pages: one Markdown file per company in src/content/entreprises/.
// The file name becomes the address: col-macarthur.md -> yourikaramyan.com/col-macarthur/
// Files starting with "_" (the template) are never published.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Any text still containing the template's "[À COMPLÉTER" marker stops the build with a clear message,
// so a half-filled copy of _modele.md can never be published.
const texte = z
  .string()
  .trim()
  .min(1)
  .refine((s) => !s.includes('À COMPLÉTER'), {
    error: 'Un texte du modèle est encore à compléter : remplace tout ce qui est entre crochets [À COMPLÉTER].',
  });

// The file name is the address, so it must already be one: lowercase letters, digits and hyphens.
// Anything else (capitals, accents, spaces) stops the build instead of publishing a mangled address.
const adresse = ({ entry }: { entry: string }) => {
  const id = entry.replace(/\.md$/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    throw new Error(
      `Nom de fichier « ${entry} » invalide : minuscules sans accent, chiffres et tirets seulement (exemple : atelier-dubois.md).`,
    );
  }
  // Already taken by the 404 page and the home page's share image (/og/accueil.png)
  if (['404', 'accueil'].includes(id)) {
    throw new Error(`Nom de fichier « ${entry} » réservé par le site : choisis un autre nom.`);
  }
  return id;
};

const entreprises = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.md', '!**/_*/**'], base: './src/content/entreprises', generateId: adresse }),
  schema: z.object({
    // Company name exactly as the company writes it (e.g. "Col&McArthur").
    nom: texte,
    // Optional: the full greeting when "Bonjour à l'équipe de/d' + name" reads wrong (e.g. "Le Petit Atelier").
    salutation: texte.optional(),
    // One sentence for search results and link previews (the page itself is never indexed).
    description: texte,
    // Short letter addressed to the team: one paragraph per item.
    accroche: z.array(texte).min(1),
    // Exactly three ideas, validated by Youri before publication.
    idees: z
      .array(
        z.object({
          titre: texte,
          texte: z.array(texte).min(1),
          experience: texte,
        }),
      )
      .length(3, { error: 'Il faut exactement 3 idées.' }),
    // Subject of the e-mail opened by the contact button.
    objetEmail: texte,
  }),
});

export const collections = { entreprises };
