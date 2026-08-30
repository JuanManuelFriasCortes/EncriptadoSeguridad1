/**
 * Normaliza texto a NFC para que formas Unicode canónicamente equivalentes
 * tengan una representación estable antes de validar o transformar.
 *
 * @param {string} value Texto no confiable recibido de la interfaz.
 * @returns {string} Texto normalizado.
 */
export function normalizeUnicode(value) {
  return String(value ?? '').normalize('NFC');
}

/**
 * Divide por grafemas cuando el entorno lo permite. Esto mantiene unidos
 * emojis con modificadores y supera la seguridad básica de Array.from.
 *
 * @param {string} value Texto que se desea segmentar.
 * @returns {string[]} Grafemas en orden.
 */
export function toGraphemes(value) {
  const normalized = normalizeUnicode(value);

  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter('es', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(normalized), ({ segment }) => segment);
  }

  return Array.from(normalized);
}
