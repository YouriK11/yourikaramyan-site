// French number formatting without Intl.NumberFormat: creating the first Intl formatter loads
// locale data and blocked the main thread for about 110 ms on load (measured on a 4x slower CPU).
// "1 700" uses U+00A0 (the fonts have no U+202F narrow no-break space), decimals use a comma.

export function formaterNombre(valeur: number, decimales = 0): string {
  const [entier, fraction] = valeur.toFixed(decimales).split('.');
  return entier.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (fraction ? `,${fraction}` : '');
}
