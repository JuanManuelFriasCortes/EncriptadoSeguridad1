import test from 'node:test';
import assert from 'node:assert/strict';

import { analyzeCiphertext } from '../lib/crypto/index.js';
import { DETECTION_CASES } from './detector-corpus.js';

for (const fixture of DETECTION_CASES) {
  test(`detección automática ${fixture.id}`, () => {
    const result = analyzeCiphertext(fixture.ciphertext, fixture.charset);
    assert.equal(result.algorithm, fixture.algorithm);
    assert.equal(result.shift, fixture.shift);
    assert.equal(result.plaintext, fixture.plaintext.normalize('NFC'));
    assert.match(result.confidence.level, /^(baja|media|alta)$/u);
    assert.ok(result.confidence.percentage >= 0 && result.confidence.percentage <= 100);
  });
}
