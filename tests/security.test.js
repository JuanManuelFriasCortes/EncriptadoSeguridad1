import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { atbashTransform, caesarDecrypt, caesarEncrypt } from '../lib/crypto/index.js';

const ATTACK_PAYLOADS = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  '<svg onload=alert(1)>',
  '\'"><script>alert(document.domain)</script>',
  'javascript:alert(1)',
  '${7*7}',
  '{{7*7}}',
  '../../../etc/passwd',
  '../../../../windows/system32',
  '<iframe src="javascript:alert(1)"></iframe>',
];

for (const payload of ATTACK_PAYLOADS) {
  test(`la carga se conserva como texto: ${payload.slice(0, 24)}`, () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    assert.equal(caesarEncrypt(payload, charset, 0), payload);
    const encrypted = caesarEncrypt(payload, charset, 7);
    assert.equal(caesarDecrypt(encrypted, charset, 7), payload);
    assert.equal(atbashTransform(atbashTransform(payload, charset), charset), payload);
  });
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(absolute));
    else if (/\.(?:js|jsx|ts|tsx)$/u.test(entry.name)) files.push(absolute);
  }
  return files;
}

test('el código de aplicación no usa APIs de ejecución, inyección, red o almacenamiento', async () => {
  const testDirectory = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.dirname(testDirectory);
  const roots = ['app', 'components', 'lib'].map((directory) => path.join(projectRoot, directory));
  const files = (await Promise.all(roots.map(sourceFiles))).flat();
  const forbidden = [
    'inner' + 'HTML',
    'outer' + 'HTML',
    'insertAdjacent' + 'HTML',
    'document.' + 'write',
    'e' + 'val(',
    'new ' + 'Function',
    'local' + 'Storage',
    'session' + 'Storage',
    'document.' + 'cookie',
    'f' + 'etch(',
    'XMLHttp' + 'Request',
    'Web' + 'Socket',
    'post' + 'Message(',
  ];

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    for (const term of forbidden) assert.equal(source.includes(term), false, `${term} apareció en ${file}`);
  }
});
