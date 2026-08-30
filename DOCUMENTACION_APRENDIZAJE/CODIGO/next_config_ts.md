# `next.config.ts`

## Proposito

Concentra las diferencias entre dos destinos: un servidor Vinext local y el hosting estatico de GitHub Pages. La decision se toma con `GITHUB_PAGES === 'true'`; no depende de texto introducido por el usuario.

## Variables

- `isGitHubPages`: activa exclusivamente el modo de exportacion.
- `repositoryName`: toma el nombre de `GITHUB_REPOSITORY` o usa `EncriptadoSeguridad1` como valor local de respaldo.
- `contentSecurityPolicy`: une directivas CSP para el servidor.
- `securityHeaders`: arreglo con CSP, COOP, CORP, Permissions Policy, Referrer Policy, `nosniff` y `DENY`.
- `nextConfig`: objeto final exportado a Vinext.

## Rama de GitHub Pages

Activa `output: 'export'`, configura `assetPrefix: '/EncriptadoSeguridad1'` y `trailingSlash: true`. El prefijo es necesario porque un sitio de proyecto vive bajo `/<repositorio>/`, no en la raiz del dominio. No se usa `basePath`: en la version beta actual de Vinext la prueba local con `basePath` omitio la ruta principal del prerender, mientras que `assetPrefix` produjo `index.html` y referencias correctas.

## Rama local

Exporta `headers()`, aplicado a `/:path*`. Esto conserva las cabeceras defensivas cuando Vinext controla la respuesta HTTP. El modo desarrollo permite `ws:` en `connect-src` para la recarga del servidor.

## Limite importante

GitHub Pages sirve archivos y no ejecuta `headers()`. Por eso el modo estatico no promete CSP HTTP ni las demas cabeceras personalizadas. La aplicacion conserva sus defensas portables: React renderiza texto, no existen sinks HTML, el procesamiento permanece cliente y las entradas tienen limites.

## Riesgos al modificar

- cambiar el nombre del repositorio sin mantener el valor de respaldo rompe rutas locales de prueba;
- eliminar `assetPrefix` hace que el navegador busque `/_next` en el dominio, fuera del sitio del proyecto;
- activar exportacion siempre elimina el modo de servidor local;
- endurecer CSP sin probar el bootstrap puede dejar la pantalla sin JavaScript o CSS.
