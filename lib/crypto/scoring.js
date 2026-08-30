import {
  COMMON_WORDS,
  IMPROBABLE_PATTERNS,
  SPANISH_LETTER_FREQUENCIES,
  SPANISH_NGRAMS,
  VALID_SINGLE_LETTER_WORDS,
} from './language-data.js';
import { normalizeUnicode, toGraphemes } from './unicode.js';

function foldSpanish(text) {
  return normalizeUnicode(text)
    .toLocaleLowerCase('es')
    .replaceAll('ñ', '\u0000')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replaceAll('\u0000', 'ñ');
}

function countMatches(text, pattern) {
  return Array.from(text.matchAll(new RegExp(pattern.source, pattern.flags))).length;
}

/**
 * Puntúa qué tan compatible es un candidato con español. Combina frecuencia
 * de letras, palabras, n-gramas, vocales, espacios y patrones improbables.
 * Ninguna señal individual decide el resultado.
 *
 * @param {string} candidate Texto plano candidato.
 * @returns {{score: number, evidence: number, details: Record<string, number>}}
 */
export function scoreSpanish(candidate) {
  const folded = foldSpanish(candidate);
  const graphemes = toGraphemes(folded);
  const letters = graphemes.filter((character) => Object.hasOwn(SPANISH_LETTER_FREQUENCIES, character));
  const words = folded.match(/[a-zñ]+/gu) ?? [];
  const substantialWords = words.filter((word) => word.length > 1);
  const letterCount = letters.length;

  const counts = Object.fromEntries(Object.keys(SPANISH_LETTER_FREQUENCIES).map((letter) => [letter, 0]));
  for (const letter of letters) counts[letter] += 1;

  let chiSquare = 0;
  let logLikelihood = 0;
  if (letterCount > 0) {
    for (const [letter, expectedPercent] of Object.entries(SPANISH_LETTER_FREQUENCIES)) {
      const expected = (expectedPercent / 100) * letterCount;
      const observed = counts[letter];
      chiSquare += ((observed - expected) ** 2) / Math.max(expected, 0.01);
      if (observed > 0) logLikelihood += observed * Math.log(expectedPercent / 100);
    }
  }

  const averageLogLikelihood = letterCount > 0 ? logLikelihood / letterCount : -8;
  const frequency = letterCount < 5
    ? 0
    : Math.max(-65, Math.min(42, (averageLogLikelihood + 4.35) * 28 - Math.sqrt(chiSquare) * 0.9));

  const recognizedWords = substantialWords.filter((word) => COMMON_WORDS.has(word));
  const recognizedRatio = recognizedWords.length / Math.max(1, substantialWords.length);
  const lexical = Math.min(72, recognizedRatio * 58 + recognizedWords.length * 2.4);

  let ngrams = 0;
  for (const [ngram, weight] of Object.entries(SPANISH_NGRAMS)) {
    let start = 0;
    while ((start = folded.indexOf(ngram, start)) !== -1) {
      ngrams += weight;
      start += 1;
    }
  }
  const ngramScore = Math.min(52, (ngrams / Math.max(8, Math.sqrt(letterCount) * 2.4)) * 10);

  const vowelCount = letters.filter((letter) => 'aeiou'.includes(letter)).length;
  const vowelRatio = vowelCount / Math.max(1, letterCount);
  const vowelScore = letterCount < 5 ? 0 : Math.max(-30, 18 - Math.abs(vowelRatio - 0.47) * 115);

  const spaceCount = graphemes.filter((character) => character === ' ').length;
  const spaceRatio = spaceCount / Math.max(1, graphemes.length);
  const spaceScore = graphemes.length < 12
    ? 0
    : Math.max(-20, 10 - Math.abs(spaceRatio - 0.15) * 70);

  let structurePenalty = 0;
  for (const word of words) {
    if (word.length === 1 && !VALID_SINGLE_LETTER_WORDS.has(word)) structurePenalty += 5;
    if (word.length >= 4 && !/[aeiou]/u.test(word)) structurePenalty += Math.min(12, word.length * 1.5);
  }
  for (const pattern of IMPROBABLE_PATTERNS) structurePenalty += countMatches(folded, pattern) * 7;
  structurePenalty = Math.min(75, structurePenalty);

  const controlPenalty = graphemes.reduce((penalty, character) => {
    const codePoint = character.codePointAt(0);
    const disallowed = (codePoint <= 8) || codePoint === 11 || codePoint === 12
      || (codePoint >= 14 && codePoint <= 31) || codePoint === 127;
    return penalty + (disallowed ? 12 : 0);
  }, 0);
  const score = frequency + lexical + ngramScore + vowelScore + spaceScore - structurePenalty - controlPenalty;
  const evidence = Math.min(1, (letterCount / 55) * 0.65 + (substantialWords.length / 10) * 0.35);

  return {
    score: Number(score.toFixed(6)),
    evidence: Number(evidence.toFixed(6)),
    details: {
      letters: letterCount,
      words: substantialWords.length,
      recognizedWords: recognizedWords.length,
      recognizedRatio: Number(recognizedRatio.toFixed(6)),
      chiSquare: Number(chiSquare.toFixed(6)),
      frequency: Number(frequency.toFixed(6)),
      lexical: Number(lexical.toFixed(6)),
      ngrams: Number(ngramScore.toFixed(6)),
      vowel: Number(vowelScore.toFixed(6)),
      spaces: Number(spaceScore.toFixed(6)),
      penalties: Number((structurePenalty + controlPenalty).toFixed(6)),
    },
  };
}
