# `scripts/build-pages.mjs`

## Proposito

Convierte la salida de Vinext en un artefacto que GitHub Pages pueda servir desde la raiz del artefacto y falla temprano si el resultado esta incompleto.

## Secuencia exacta

1. Obtiene el nombre del repositorio de `GITHUB_REPOSITORY`.
2. Resuelve rutas absolutas dentro de `dist/client` y comprueba que no salgan de ese directorio.
3. Ejecuta `npm run build` con `GITHUB_PAGES=true`.
4. Comprueba que exista `dist/client/index.html`.
5. Mueve `dist/client/<repositorio>/_next` a `dist/client/_next`.
6. Crea `.nojekyll` para que GitHub no descarte el directorio `_next` por comenzar con guion bajo.
7. Extrae referencias `href` y `src` con el prefijo del repositorio y comprueba que cada recurso exista en el artefacto.

## Por que se mueve `_next`

El HTML debe solicitar `/EncriptadoSeguridad1/_next/...`. GitHub Pages ya monta la raiz del artefacto en `/EncriptadoSeguridad1/`, por lo que el archivo correspondiente debe estar en `_next/...` dentro del artefacto, no repetido bajo `EncriptadoSeguridad1/_next/...`.

## Compatibilidad Windows/Linux

En Windows invoca `npm.cmd` mediante shell porque es un script de comandos; en Linux usa `npm` directamente. Los argumentos son constantes, no provienen del usuario. Cualquier error de proceso o codigo de salida distinto de cero detiene el workflow.

## Riesgos y pruebas

El script depende de la forma de salida de una version beta de Vinext. Tras actualizar Vinext deben repetirse `npm run build:pages`, la comprobacion de recursos y una carga real bajo el prefijo del repositorio.
