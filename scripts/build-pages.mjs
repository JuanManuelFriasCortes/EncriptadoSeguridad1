import { spawnSync } from 'node:child_process';
import {
  existsSync,
  readFileSync,
  renameSync,
  rmdirSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'EncriptadoSeguridad1';
const projectRoot = process.cwd();
const clientDirectory = path.resolve(projectRoot, 'dist', 'client');
const nestedDirectory = path.resolve(clientDirectory, repositoryName);
const nestedAssets = path.resolve(nestedDirectory, '_next');
const publicAssets = path.resolve(clientDirectory, '_next');
const indexFile = path.resolve(clientDirectory, 'index.html');

for (const target of [nestedDirectory, nestedAssets, publicAssets, indexFile]) {
  if (!target.startsWith(`${clientDirectory}${path.sep}`)) {
    throw new Error(`La ruta generada queda fuera de dist/client: ${target}`);
  }
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const build = spawnSync(npmCommand, ['run', 'build'], {
  cwd: projectRoot,
  env: { ...process.env, GITHUB_PAGES: 'true' },
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);
if (!existsSync(indexFile)) throw new Error('Vinext no genero dist/client/index.html.');
if (!existsSync(nestedAssets)) throw new Error(`No existe el directorio generado ${repositoryName}/_next.`);
if (existsSync(publicAssets)) throw new Error('dist/client/_next ya existe antes de normalizar el artefacto.');

renameSync(nestedAssets, publicAssets);
rmdirSync(nestedDirectory);
writeFileSync(path.resolve(clientDirectory, '.nojekyll'), '');

const html = readFileSync(indexFile, 'utf8');
const resourcePattern = /(?:href|src)="(\/[^"#?]+)"/gu;
const missingResources = [];

for (const [, resourceUrl] of html.matchAll(resourcePattern)) {
  if (!resourceUrl.startsWith(`/${repositoryName}/`)) continue;
  const artifactPath = resourceUrl.slice(repositoryName.length + 2);
  if (!existsSync(path.resolve(clientDirectory, artifactPath))) missingResources.push(resourceUrl);
}

if (missingResources.length > 0) {
  throw new Error(`Faltan recursos en el artefacto:\n${missingResources.join('\n')}`);
}

console.log(`Artefacto de Pages listo en dist/client para /${repositoryName}/.`);
