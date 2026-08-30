import test from 'node:test';
import assert from 'node:assert/strict';

import {
  atbashTransform,
  caesarDecrypt,
  caesarEncrypt,
  normalizeShift,
  toGraphemes,
} from '../lib/crypto/index.js';

const ROUNDTRIP_CASES = [
  { name: 'ASCII', charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', text: 'HOLA MUNDO!\nSEGUNDA LINEA.' },
  { name: 'español', charset: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ', text: 'ESPAÑA, AÑO 2026: ¡SEÑAL!' },
  { name: 'números', charset: '0123456789', text: 'FOLIO 908-172' },
  { name: 'símbolos', charset: '[]{}<>!?+-=*/', text: '[A+B] != {C/D}' },
  { name: 'acentos', charset: 'abcdefghijklmnñopqrstuvwxyzáéíóúü', text: 'mañana habrá música y pingüinos' },
  { name: 'emoji', charset: '😀😁😂🤣😃😄😅😆😉😊😋😎😍😘🥰😇', text: 'Estado: 😀😊🥰 / texto externo' },
  { name: 'grafemas compuestos', charset: '👩‍💻👨‍💻🧑🏽‍🔬🧑🏻‍🎓', text: 'Equipo 👩‍💻 y 🧑🏽‍🔬' },
];

for (const fixture of ROUNDTRIP_CASES) {
  test(`César conserva el texto al descifrar: ${fixture.name}`, () => {
    const size = toGraphemes(fixture.charset).length;
    const shifts = [0, 1, 2, Math.floor(size / 2), size - 1, size, size + 1, 1_000_003, -1, -1_000_003];
    for (const shift of shifts) {
      const encrypted = caesarEncrypt(fixture.text, fixture.charset, shift);
      assert.equal(caesarDecrypt(encrypted, fixture.charset, shift), fixture.text.normalize('NFC'));
    }
  });

  test(`Atbash es involutivo: ${fixture.name}`, () => {
    assert.equal(atbashTransform(atbashTransform(fixture.text, fixture.charset), fixture.charset), fixture.text.normalize('NFC'));
  });
}

test('César usa N real y coincide con un vector conocido', () => {
  assert.equal(caesarEncrypt('ABC XYZ!', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 1), 'BCD YZA!');
  assert.equal(caesarDecrypt('BCD YZA!', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 1), 'ABC XYZ!');
  assert.equal(caesarEncrypt('MNÑOP', 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ', 2), 'ÑOPQR');
});

test('normaliza desplazamientos positivos, negativos y mayores que N', () => {
  assert.equal(normalizeShift(27, 27), 0);
  assert.equal(normalizeShift(28, 27), 1);
  assert.equal(normalizeShift(-1, 27), 26);
  assert.equal(normalizeShift(-55, 27), 26);
});

test('rechaza desplazamientos no enteros o inseguros', () => {
  assert.throws(() => normalizeShift(1.5, 27), /entero seguro/u);
  assert.throws(() => normalizeShift(Number.MAX_VALUE, 27), /entero seguro/u);
});
