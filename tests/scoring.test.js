import test from 'node:test';
import assert from 'node:assert/strict';

import { scoreSpanish } from '../lib/crypto/index.js';

test('el español natural supera una sustitución improbable', () => {
  const natural = scoreSpanish('EL ANALISIS DE FRECUENCIAS REVELA PATRONES IMPORTANTES DEL LENGUAJE ESPAÑOL.');
  const noise = scoreSpanish('PW LZLWQEQ EQ HCPÑYPZHQKC OPXPWL AZXCZWPQ QUAZXCQKLPR OPN WPJEÑZFP PQAZÑRW.');
  assert.ok(natural.score > noise.score + 20, `${natural.score} no superó claramente a ${noise.score}`);
});

test('combina evidencia y reduce certeza para textos muy cortos', () => {
  assert.ok(scoreSpanish('LA SEGURIDAD DE LA INFORMACION ES IMPORTANTE PARA TODAS LAS PERSONAS.').evidence > 0.6);
  assert.ok(scoreSpanish('HOLA').evidence < 0.2);
});
