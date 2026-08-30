import { normalizeUnicode, toGraphemes } from './unicode.js';

/**
 * Reduce cualquier entero al intervalo [0, N - 1].
 *
 * @param {number} shift Desplazamiento entero, también puede ser negativo.
 * @param {number} size Tamaño real del conjunto.
 * @returns {number} Desplazamiento normalizado.
 */
export function normalizeShift(shift, size) {
  if (!Number.isSafeInteger(shift)) throw new TypeError('El desplazamiento debe ser un entero seguro.');
  if (!Number.isInteger(size) || size < 2) throw new TypeError('El conjunto debe tener al menos dos caracteres.');
  return ((shift % size) + size) % size;
}

function transform(text, charset, indexMapper) {
  const characters = Array.isArray(charset) ? charset : toGraphemes(charset);
  if (characters.length < 2) throw new TypeError('El conjunto debe tener al menos dos caracteres.');
  const lookup = new Map(characters.map((character, index) => [character, index]));

  return toGraphemes(normalizeUnicode(text))
    .map((character) => {
      const index = lookup.get(character);
      return index === undefined ? character : characters[indexMapper(index, characters.length)];
    })
    .join('');
}

/**
 * Aplica César sobre el tamaño N real del conjunto; caracteres externos se conservan.
 *
 * @param {string} text Texto que se desea cifrar.
 * @param {string[]|string} charset Conjunto ordenado validado.
 * @param {number} shift Desplazamiento entero.
 * @returns {string} Texto cifrado normalizado a NFC.
 */
export function caesarEncrypt(text, charset, shift) {
  const size = Array.isArray(charset) ? charset.length : toGraphemes(charset).length;
  const normalizedShift = normalizeShift(shift, size);
  return transform(text, charset, (index) => (index + normalizedShift) % size);
}

/**
 * Revierte César con el desplazamiento indicado.
 *
 * @param {string} text Texto cifrado.
 * @param {string[]|string} charset Conjunto ordenado validado.
 * @param {number} shift Desplazamiento usado al cifrar.
 * @returns {string} Texto plano más la puntuación y caracteres externos intactos.
 */
export function caesarDecrypt(text, charset, shift) {
  const size = Array.isArray(charset) ? charset.length : toGraphemes(charset).length;
  const normalizedShift = normalizeShift(shift, size);
  return transform(text, charset, (index) => (index - normalizedShift + size) % size);
}

/**
 * Sustituye cada índice i por N - 1 - i. La misma función cifra y descifra.
 *
 * @param {string} text Texto de entrada.
 * @param {string[]|string} charset Conjunto ordenado validado.
 * @returns {string} Transformación Atbash.
 */
export function atbashTransform(text, charset) {
  return transform(text, charset, (index, size) => size - 1 - index);
}
