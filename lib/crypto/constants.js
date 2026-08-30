/** Límites defensivos para mantener el trabajo estadístico dentro del navegador. */
export const LIMITS = Object.freeze({
  minCharsetLength: 2,
  maxCharsetLength: 128,
  maxMessageLength: 12_000,
  maxAnalysisOperations: 1_500_000,
});

/** Conjuntos de ejemplo completamente editables por el usuario. */
export const CHARSET_PRESETS = Object.freeze({
  spanish: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
  alphanumeric: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789',
  lowercase: 'abcdefghijklmnñopqrstuvwxyzáéíóúü',
  emoji: '😀😁😂🤣😃😄😅😆😉😊😋😎😍😘🥰😇🤓🧐🤔',
});
