import { atbashTransform, caesarDecrypt } from './ciphers.js';
import { scoreSpanish } from './scoring.js';
import {
  InputValidationError,
  validateAnalysisComplexity,
  validateCharset,
  validateMessage,
} from './validation.js';

function compareCandidates(left, right) {
  if (right.analysis.score !== left.analysis.score) return right.analysis.score - left.analysis.score;
  if (right.analysis.details.recognizedWords !== left.analysis.details.recognizedWords) {
    return right.analysis.details.recognizedWords - left.analysis.details.recognizedWords;
  }
  if (left.algorithm !== right.algorithm) return left.algorithm === 'atbash' ? -1 : 1;
  return (left.shift ?? 0) - (right.shift ?? 0);
}

function estimateConfidence(best, second) {
  const margin = best.analysis.score - second.analysis.score;
  const evidence = best.analysis.evidence;
  const quality = Math.max(0, Math.min(1, (best.analysis.score + 35) / 125));
  const separation = 1 - Math.exp(-Math.max(0, margin) / 15);
  const probability = Math.round(100 * Math.min(0.98, 0.18 + evidence * 0.34 + quality * 0.22 + separation * 0.24));

  let level = 'baja';
  if (evidence >= 0.62 && margin >= 12 && probability >= 72) level = 'alta';
  else if (evidence >= 0.30 && margin >= 4 && probability >= 50) level = 'media';

  return { level, percentage: probability, margin: Number(margin.toFixed(4)) };
}

/**
 * Genera internamente el candidato Atbash y todos los César. Esta función se
 * exporta para pruebas; la interfaz nunca recibe ni muestra la lista.
 *
 * @param {string} ciphertext Texto cifrado ya normalizado.
 * @param {string[]} charset Conjunto validado.
 * @returns {Array<{algorithm: 'caesar'|'atbash', shift: number|null, plaintext: string, analysis: ReturnType<typeof scoreSpanish>}>>}
 */
export function rankCandidates(ciphertext, charset) {
  const candidates = [];

  const atbashPlaintext = atbashTransform(ciphertext, charset);
  candidates.push({
    algorithm: 'atbash',
    shift: null,
    plaintext: atbashPlaintext,
    analysis: scoreSpanish(atbashPlaintext),
  });

  for (let shift = 0; shift < charset.length; shift += 1) {
    const plaintext = caesarDecrypt(ciphertext, charset, shift);
    candidates.push({
      algorithm: 'caesar',
      shift,
      plaintext,
      analysis: scoreSpanish(plaintext),
    });
  }

  return candidates.sort(compareCandidates);
}

/**
 * Selecciona automáticamente una única respuesta probable. La incertidumbre
 * criptográfica se expresa como confianza, nunca delegando la decisión al usuario.
 *
 * @param {string} rawCiphertext Texto cifrado no confiable.
 * @param {string} rawCharset Conjunto ordenado no confiable.
 * @returns {{algorithm: 'caesar'|'atbash', shift: number|null, plaintext: string, confidence: {level: string, percentage: number, margin: number}}}
 */
export function analyzeCiphertext(rawCiphertext, rawCharset) {
  const charsetResult = validateCharset(rawCharset);
  const messageResult = validateMessage(rawCiphertext);
  const errors = [...charsetResult.errors, ...messageResult.errors];

  if (errors.length > 0) throw new InputValidationError(errors);

  const complexity = validateAnalysisComplexity(messageResult.length, charsetResult.characters.length);
  if (!complexity.valid) throw new InputValidationError([complexity.error]);

  const ranked = rankCandidates(messageResult.normalized, charsetResult.characters);
  const [best, second] = ranked;

  return {
    algorithm: best.algorithm,
    shift: best.shift,
    plaintext: best.plaintext,
    confidence: estimateConfidence(best, second),
  };
}
