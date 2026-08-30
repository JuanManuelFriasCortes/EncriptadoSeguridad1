import { LIMITS } from './constants.js';
import { normalizeUnicode, toGraphemes } from './unicode.js';

function describeWhitespace(character) {
  if (character === ' ') return 'espacio';
  if (character === '\n' || character === '\r') return 'salto de línea';
  if (character === '\t') return 'tabulación';
  return `U+${character.codePointAt(0).toString(16).toUpperCase()}`;
}

/**
 * Valida el conjunto ordenado después de NFC, sin corregir silenciosamente
 * duplicados ni espacios que cambiarían la semántica del cifrado.
 *
 * @param {string} rawCharset Conjunto proporcionado por el usuario.
 * @returns {{valid: boolean, normalized: string, characters: string[], errors: string[], duplicates: string[]}}
 */
export function validateCharset(rawCharset) {
  const normalized = normalizeUnicode(rawCharset);
  const characters = toGraphemes(normalized);
  const errors = [];
  const seen = new Set();
  const duplicates = [];
  const whitespace = [];

  for (const character of characters) {
    if (/\s/u.test(character)) whitespace.push(describeWhitespace(character));
    if (seen.has(character) && !duplicates.includes(character)) duplicates.push(character);
    seen.add(character);
  }

  if (characters.length === 0) {
    errors.push('El conjunto no puede estar vacío.');
  } else if (characters.length < LIMITS.minCharsetLength) {
    errors.push(`El conjunto debe contener al menos ${LIMITS.minCharsetLength} caracteres diferentes.`);
  }

  if (characters.length > LIMITS.maxCharsetLength) {
    errors.push(`El conjunto supera el máximo de ${LIMITS.maxCharsetLength} caracteres.`);
  }

  if (duplicates.length > 0) {
    errors.push(`Hay caracteres repetidos después de normalizar Unicode: ${duplicates.join(' ')}.`);
  }

  if (whitespace.length > 0) {
    errors.push(`El conjunto contiene espacios en blanco no permitidos: ${[...new Set(whitespace)].join(', ')}.`);
  }

  return { valid: errors.length === 0, normalized, characters, errors, duplicates };
}

/**
 * Valida y normaliza un mensaje sin interpretarlo como HTML ni código.
 *
 * @param {string} rawMessage Mensaje no confiable.
 * @param {{required?: boolean}} [options] Reglas del campo.
 * @returns {{valid: boolean, normalized: string, length: number, errors: string[]}}
 */
export function validateMessage(rawMessage, { required = true } = {}) {
  const normalized = normalizeUnicode(rawMessage);
  const length = toGraphemes(normalized).length;
  const errors = [];

  if (required && length === 0) errors.push('Escribe un mensaje antes de continuar.');
  if (length > LIMITS.maxMessageLength) {
    errors.push(`El mensaje supera el máximo de ${LIMITS.maxMessageLength.toLocaleString('es-MX')} caracteres.`);
  }

  return { valid: errors.length === 0, normalized, length, errors };
}

/**
 * Evita que el barrido de todos los desplazamientos congele el navegador.
 *
 * @param {number} messageLength Longitud en grafemas.
 * @param {number} charsetLength Cantidad de candidatos César.
 * @returns {{valid: boolean, operations: number, error: string}}
 */
export function validateAnalysisComplexity(messageLength, charsetLength) {
  const operations = messageLength * (charsetLength + 1);
  const valid = operations <= LIMITS.maxAnalysisOperations;
  return {
    valid,
    operations,
    error: valid
      ? ''
      : 'La combinación de mensaje y conjunto es demasiado grande para un análisis seguro. Reduce uno de los dos.',
  };
}

/** Error predecible que la interfaz puede mostrar sin exponer detalles internos. */
export class InputValidationError extends Error {
  constructor(messages) {
    super(messages.join(' '));
    this.name = 'InputValidationError';
    this.messages = messages;
  }
}
