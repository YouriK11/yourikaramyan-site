// French typography for short texts rendered with set:html.
// Only for trusted strings written in src/ (the text is escaped first anyway).
// Lets anyone type plain spaces: the non-breaking ones are added here.

const NBSP = ' ';

const echapper = (texte: string) =>
  texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function typo(texte: string): string {
  return (
    echapper(texte)
      // Non-breaking space before : ; ! ? » and after «
      .replace(/ ([:;!?»])/g, `${NBSP}$1`)
      .replace(/« /g, `«${NBSP}`)
      // "1 700", "21 000": keep thousands together
      .replace(/(\d) (\d{3})(?!\d)/g, `$1${NBSP}$2`)
      // Hyphenated words never break at the hyphen ("e-mail", "go-to-market"): the fonts have no
      // non-breaking hyphen glyph (U+2011), so wrap them in a no-wrap span instead.
      .replace(/[\p{L}\d]+(?:-[\p{L}\d]+)+/gu, (mot) => `<span class="insecable">${mot}</span>`)
      // 1er, 1re, kept with the next word ("1er octobre")
      .replace(/\b1(er|re)\b( ?)/g, (_m, fin: string, espace: string) => `1<sup>${fin}</sup>${espace ? NBSP : ''}`)
      // A number stays with the word or unit that follows ("60 jours", "500 personnes", "21 000 €")
      .replace(/(\d) (?=[\p{Ll}€%])/gu, `$1${NBSP}`)
  );
}
