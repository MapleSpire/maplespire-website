/**
 * Serialize a JSON-LD graph for inline injection into a `<script>` element.
 *
 * `JSON.stringify` leaves `<` and `>` untouched, so any value that ever held
 * `</script>` would close the element early and turn structured data into an
 * injection point. Every value is authored in this repository today; escaping
 * keeps that safe if one later comes from content, a CMS, or a translation.
 *
 * `<`, `>` and `&` never appear as JSON structural characters, so replacing
 * them everywhere only ever rewrites string contents. The escapes parse back to
 * the original characters, leaving the published structured data unchanged.
 */
export function serializeJsonLd(graph: unknown): string {
  return JSON.stringify(graph)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}
