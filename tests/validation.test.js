import test from 'node:test';
import assert from 'node:assert/strict';

import {
  LIMITS,
  toGraphemes,
  validateAnalysisComplexity,
  validateCharset,
  validateMessage,
} from '../lib/crypto/index.js';

test('rechaza un conjunto vacío o de un solo carácter', () => {
  assert.equal(validateCharset('').valid, false);
  assert.equal(validateCharset('A').valid, false);
});

test('detecta duplicados sin eliminarlos', () => {
  const result = validateCharset('ABCA');
  assert.equal(result.valid, false);
  assert.deepEqual(result.duplicates, ['A']);
  assert.match(result.errors.join(' '), /repetidos/u);
});

test('detecta duplicados canónicamente equivalentes tras NFC', () => {
  const result = validateCharset(`Aé${'e\u0301'}B`);
  assert.equal(result.valid, false);
  assert.deepEqual(result.duplicates, ['é']);
});

test('rechaza espacios, tabulaciones y saltos de línea accidentales', () => {
  assert.match(validateCharset('AB C').errors.join(' '), /espacio/u);
  assert.match(validateCharset('AB\tC').errors.join(' '), /tabulación/u);
  assert.match(validateCharset('AB\nC').errors.join(' '), /salto de línea/u);
});

test('acepta Unicode, ñ, acentos, símbolos y emojis', () => {
  assert.equal(validateCharset('ñáéíóú¿¡∑∞😀😁').valid, true);
  assert.equal(validateCharset('👩‍💻👨‍💻🧑🏽‍🔬').valid, true);
});

test('cuenta grafemas compuestos como unidades de usuario', () => {
  assert.deepEqual(toGraphemes('👩‍💻🧑🏽‍🔬'), ['👩‍💻', '🧑🏽‍🔬']);
});

test('acepta exactamente el máximo de caracteres del conjunto', () => {
  const charset = Array.from({ length: LIMITS.maxCharsetLength }, (_, index) => String.fromCodePoint(0x400 + index)).join('');
  assert.equal(validateCharset(charset).valid, true);
});

test('rechaza un conjunto que supera el máximo', () => {
  const charset = Array.from({ length: LIMITS.maxCharsetLength + 1 }, (_, index) => String.fromCodePoint(0x500 + index)).join('');
  assert.equal(validateCharset(charset).valid, false);
});

test('valida mensajes vacíos, en el límite y excesivos', () => {
  assert.equal(validateMessage('').valid, false);
  assert.equal(validateMessage('A'.repeat(LIMITS.maxMessageLength)).valid, true);
  assert.equal(validateMessage('A'.repeat(LIMITS.maxMessageLength + 1)).valid, false);
});

test('limita el producto de candidatos por longitud', () => {
  assert.equal(validateAnalysisComplexity(100, 27).valid, true);
  assert.equal(validateAnalysisComplexity(LIMITS.maxMessageLength, LIMITS.maxCharsetLength).valid, false);
});
