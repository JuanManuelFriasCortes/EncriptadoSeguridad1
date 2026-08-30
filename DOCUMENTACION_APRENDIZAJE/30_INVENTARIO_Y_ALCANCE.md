# Inventario y alcance del analisis

## Archivos funcionales y de configuracion analizados: 26

| Archivo | Tipo | Papel |
|---|---|---|
| `.gitignore` | configuracion | excluye dependencias, builds, entorno y archivos locales |
| `app/globals.css` | estilo | tema, tokens y base |
| `app/layout.tsx` | React/TS | documento raiz y metadatos |
| `app/page.tsx` | React/TS | ruta principal |
| `components/crypto-workbench.tsx` | React/TS | interfaz y orquestacion |
| `components/ui/alert.tsx` | React/TS | alertas reutilizables |
| `components/ui/button.tsx` | React/TS | botones y variantes |
| `components/ui/input.tsx` | React/TS | entrada de una linea |
| `components/ui/label.tsx` | React/TS | etiquetas |
| `components/ui/textarea.tsx` | React/TS | entrada multilinea |
| `lib/crypto/analyzer.js` | dominio JS | ranking, seleccion y confianza |
| `lib/crypto/ciphers.js` | dominio JS | Cesar y Atbash |
| `lib/crypto/constants.js` | datos JS | limites y presets |
| `lib/crypto/index.js` | API JS | reexportaciones |
| `lib/crypto/language-data.js` | datos JS | modelo de español |
| `lib/crypto/scoring.js` | dominio JS | puntuacion linguistica |
| `lib/crypto/unicode.js` | utilidad JS | NFC y grafemas |
| `lib/crypto/validation.js` | dominio JS | contratos y limites |
| `lib/utils.ts` | utilidad TS | clases CSS |
| `next.config.ts` | plataforma TS | exportacion estatica y cabeceras de servidor |
| `package-lock.json` | lockfile | resolucion exacta de dependencias |
| `package.json` | manifiesto | scripts, motores y paquetes |
| `scripts/build-pages.mjs` | automatizacion JS | construye y valida el artefacto de Pages |
| `tsconfig.json` | configuracion | tipos, modulos y alias |
| `vite.config.ts` | configuracion | plugins Vinext/Tailwind |
| `.github/workflows/pages.yml` | CI/CD YAML | construye y publica GitHub Pages |

## Archivos de aplicacion: 19

Se cuentan los archivos de UI, dominio, estilos y utilidad que se ejecutan como parte de la aplicacion. La automatizacion y configuracion se documentan por separado. Cada archivo tiene una nota individual en `CODIGO/`.

## Plataforma, configuracion, automatizacion y bloqueo: 7

Incluye `.gitignore`, manifiesto y lockfile, configuraciones Vinext/Vite/TypeScript, script de Pages y workflow. La clasificacion puede solaparse porque `next.config.ts` y el script son codigo ejecutado por herramientas.

## Elementos no existentes

- no hay `index.html` manual; el build de Pages lo genera en `dist/client/`;
- no hay directorio de pruebas ni archivos `*.test.*`/`*.spec.*`;
- no hay backend de mensajes;
- no hay base de datos;
- no hay archivos de variables de entorno rastreados;
- no hay assets propios requeridos por la pantalla;
- no hay llamadas de red en codigo de aplicacion.

## Directorios excluidos del analisis linea por linea

### `node_modules/`

Codigo de terceros instalado. Se analiza a nivel de dependencias y contratos, no archivo por archivo. Documentarlo linea por linea mezclaria autoria externa con el proyecto y produciria miles de notas inestables.

### `dist/`, `.next/`, `.vinext/`

Salidas generadas. Pueden borrarse y reconstruirse; no son fuente de verdad ni deben editarse manualmente.

### `.git/`

Metadatos de control de versiones, no implementacion de la aplicacion.

### Documentacion

`DOCUMENTACION_APRENDIZAJE/` y `Obsidian-Criptoanalisis-Al-Kindi/` explican el sistema, pero no forman parte del bundle que ejecuta el navegador.

## Criterio de “todo el codigo relevante”

Se explican individualmente:

- todos los archivos de codigo propio;
- todos los componentes UI;
- todos los modulos del motor;
- estilos globales;
- configuracion de build, TypeScript, paquetes, Pages y Git;
- lockfile a nivel estructural y de seguridad, sin repetir miles de entradas mecanicas.

## Evidencia del cambio funcional de publicacion

El arreglo sustituye `proxy.ts` por `next.config.ts`, añade `scripts/build-pages.mjs`, incorpora el workflow y agrega `build:pages`. Se verificaron dos contratos separados: `npm run build` conserva la ejecucion local y `npm run build:pages` produce `dist/client/index.html`, `.nojekyll` y recursos existentes bajo el prefijo `/EncriptadoSeguridad1/`.
