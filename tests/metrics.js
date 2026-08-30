import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { analyzeCiphertext } from '../lib/crypto/index.js';
import { DETECTION_CASES } from './detector-corpus.js';

const failures = [];
const totals = {
  total: DETECTION_CASES.length,
  correct: 0,
  incorrect: 0,
  caesarTotal: 0,
  caesarCorrect: 0,
  atbashTotal: 0,
  atbashCorrect: 0,
  shiftCorrect: 0,
  plaintextCorrect: 0,
};

for (const fixture of DETECTION_CASES) {
  const result = analyzeCiphertext(fixture.ciphertext, fixture.charset);
  const algorithmCorrect = result.algorithm === fixture.algorithm;
  const shiftCorrect = fixture.algorithm === 'atbash' || result.shift === fixture.shift;
  const plaintextCorrect = result.plaintext === fixture.plaintext.normalize('NFC');
  const exact = algorithmCorrect && shiftCorrect && plaintextCorrect;

  if (fixture.algorithm === 'caesar') {
    totals.caesarTotal += 1;
    if (exact) totals.caesarCorrect += 1;
    if (result.shift === fixture.shift) totals.shiftCorrect += 1;
  } else {
    totals.atbashTotal += 1;
    if (exact) totals.atbashCorrect += 1;
  }

  if (plaintextCorrect) totals.plaintextCorrect += 1;
  if (exact) totals.correct += 1;
  else {
    totals.incorrect += 1;
    failures.push({
      id: fixture.id,
      expected: { algorithm: fixture.algorithm, shift: fixture.shift, plaintext: fixture.plaintext },
      received: result,
    });
  }
}

const percent = (correct, total) => Number(((correct / Math.max(1, total)) * 100).toFixed(2));
const report = {
  generatedAt: new Date().toISOString(),
  dataset: 'Frases españolas variadas generadas y evaluadas localmente; no existe tratamiento especial por frase.',
  ...totals,
  accuracy: percent(totals.correct, totals.total),
  caesarAccuracy: percent(totals.caesarCorrect, totals.caesarTotal),
  atbashAccuracy: percent(totals.atbashCorrect, totals.atbashTotal),
  shiftAccuracy: percent(totals.shiftCorrect, totals.caesarTotal),
  plaintextAccuracy: percent(totals.plaintextCorrect, totals.total),
  failures,
};

const directory = path.dirname(fileURLToPath(import.meta.url));
await writeFile(path.join(directory, 'latest-metrics.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({ ...report, failures: failures.slice(0, 12) }, null, 2));
if (failures.length > 0) process.exitCode = 1;
