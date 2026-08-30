# `tsconfig.json`

## Proposito

Define como TypeScript analiza fuentes y como herramientas resuelven modulos.

## Opciones clave

- `target: ES2017`: nivel base de JavaScript emitible, aunque `noEmit` evita emision directa.
- `lib`: DOM, iterables y APIs modernas.
- `allowJs: true`: integra motor `.js`.
- `skipLibCheck: true`: omite comprobacion profunda de declaraciones externas.
- `strict: true`: activa familia de controles estrictos.
- `noEmit: true`: el bundler genera salida.
- `module: esnext`, `moduleResolution: bundler`: ESM y reglas del empaquetador.
- `types`: Node y Vinext.
- `resolveJsonModule`: permite importar JSON si se necesita.
- `isolatedModules`: cada archivo debe ser transformable aislado.
- `jsx: react-jsx`: transformacion moderna.
- `incremental`: cache de analisis.
- `paths`: `@/*` desde raiz.

## Inclusiones

Incluye TS/TSX/MTS y tipos generados Next/Vinext; excluye `node_modules`. Algunas rutas `.next` son heredadas por compatibilidad.

## Riesgos

`allowJs` sin `checkJs` no da el mismo rigor al motor. `skipLibCheck` puede ocultar errores de declaraciones externas. Cambiar resolucion rompe imports ESM/alias.

## Mejoras

Migrar motor a TypeScript o habilitar `checkJs` gradualmente. Mantener el build limpio antes de endurecer.

## Pruebas

Ejecutar build/`tsc --noEmit`, comprobar alias, tipos de retornos JS y errores intencionales en una rama de prueba.
