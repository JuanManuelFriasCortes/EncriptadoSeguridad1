# Publicacion en GitHub Pages

## Causa del 404 original

GitHub Pages solo sirve archivos estaticos. El repositorio tenia una aplicacion Vinext capaz de ejecutarse con servidor, pero la fuente publicada no incluia un `index.html` en la raiz esperada. Por eso Pages respondia `404 File not found`: el dominio existia, pero no habia documento de entrada publicable.

Referencia oficial: [Solucionar errores 404 en GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites).

## Solucion aplicada

La solucion mantiene dos builds:

```text
npm run build
  -> Vinext normal para ejecucion local con servidor

npm run build:pages
  -> GITHUB_PAGES=true
  -> output: export
  -> dist/client/index.html
  -> recursos con URL /EncriptadoSeguridad1/_next/...
  -> .nojekyll
  -> validacion de todos los recursos
```

El workflow sube `dist/client` como artefacto. GitHub lo monta en:

```text
https://juanmanuelfriascortes.github.io/EncriptadoSeguridad1/
```

## Archivos conectados

| Archivo | Responsabilidad |
|---|---|
| `next.config.ts` | selecciona exportacion estatica, prefijo y barra final |
| `scripts/build-pages.mjs` | construye, normaliza `_next`, crea `.nojekyll` y valida |
| `package.json` | expone `build:pages` |
| `.github/workflows/pages.yml` | instala, compila, sube y despliega |

## Por que no se sube `dist/` a Git

`dist/` sigue ignorado porque es salida reproducible. El workflow lo genera con el lockfile y lo transmite como artefacto temporal. Esto evita mezclar fuente con archivos compilados y elimina la necesidad de una rama `gh-pages` mantenida a mano.

Referencia oficial: [Usar workflows personalizados con GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Ruta de proyecto y recursos

Una Pages de usuario vive en `/`, pero esta Pages de proyecto vive en `/EncriptadoSeguridad1/`. `assetPrefix` hace que scripts y CSS apunten a esa ruta. El script mueve fisicamente `_next` para que el mapeo sea:

```text
URL /EncriptadoSeguridad1/_next/archivo.js
      |
      v
artefacto/_next/archivo.js
```

## Cabeceras de seguridad

`headers()` solo funciona cuando Vinext controla la respuesta. GitHub Pages no ejecuta el servidor de la aplicacion ni permite aportar cabeceras personalizadas mediante este repositorio. Localmente se conservan CSP, COOP, CORP, Permissions Policy, Referrer Policy, `nosniff` y `DENY`; en Pages se depende de HTTPS administrado por GitHub y de las defensas dentro de la aplicacion.

Esto no afecta los algoritmos ni la privacidad del flujo: el cifrado y el analisis siguen ejecutandose en el navegador y no hay `fetch`, base de datos ni telemetria.

## Como verificar

```powershell
npm ci
npm run build
npm run build:pages
Test-Path dist/client/index.html
Test-Path dist/client/.nojekyll
```

Despues de un push:

1. abrir la pestaña `Actions` del repositorio;
2. comprobar que `Publicar en GitHub Pages` termino en verde;
3. abrir la URL con barra final;
4. en DevTools, confirmar que `index.html`, JavaScript y CSS responden 200;
5. cifrar y descifrar un ejemplo para comprobar funcionalidad, no solo carga visual.

## Diagnostico rapido

| Sintoma | Causa probable | Comprobacion |
|---|---|---|
| 404 en la pagina | Pages no usa Actions o falta `index.html` | Settings > Pages y log del workflow |
| HTML sin estilos | prefijo o `_next` incorrecto | Network y `npm run build:pages` |
| workflow falla en build | Node/lockfile/Vinext | paso exacto de Actions |
| funciona local, falla en Pages | diferencia servidor/estatico | probar el artefacto y la ruta del proyecto |
| cabeceras locales ausentes en Pages | limitacion del hosting estatico | no confundir con fallo del cifrado |

## Riesgo de mantenimiento

Vinext sigue en beta. Una actualizacion puede cambiar el directorio de salida y volver innecesario o incorrecto el movimiento de `_next`. El script esta diseñado para fallar si no encuentra la estructura esperada, en vez de publicar silenciosamente una pagina rota.
