# `package.json`

## Identidad

Nombre `criptoanalisis-al-kindi`, version `0.1.0`, privado. `private:true` evita publicacion accidental al registro npm.

## Motor

Exige Node `>=22.13.0`. Usar una version anterior puede fallar por runtime o herramientas.

## Scripts

- `dev`: desarrollo local con Vinext.
- `build`: construccion de produccion.
- `build:pages`: ejecuta el adaptador que genera y comprueba el artefacto estatico para GitHub Pages.
- `start`: sirve build.

No existe script `test`, `lint` o `typecheck` separado.

## Dependencias de ejecucion

Base UI, CVA, clsx, Lucide, React, React DOM/RSC, tailwind-merge y Vinext. Algunas versiones son exactas y otras usan `^`, por lo que el lockfile decide la instalada.

## Dependencias de desarrollo

Tailwind/PostCSS, tipos, plugins React/RSC, TypeScript y Vite.

## Overrides

Fija `esbuild` 0.28.2 y `undici` 7.29.0 dentro del arbol transitivo. Antes de retirarlos hay que revisar el motivo, compatibilidad y avisos.

## ESM

`"type":"module"` hace que `.js` use `import/export` por defecto.

## Riesgos

- Vinext esta en beta;
- rangos con caret pueden resolver nuevas versiones al regenerar lock;
- no hay pruebas/lint en scripts;
- dependencias RSC deben mantenerse compatibles con React;
- cambiar Node puede alterar Intl/Unicode.

## Comandos de verificacion

`npm install`/`npm ci`, `npm run build`, `npm run build:pages`, `npm audit`, `npm ls --depth=0`. Una auditoria no sustituye revision de comportamiento.
