# `.github/workflows/pages.yml`

## Disparadores

El workflow se ejecuta con cada `push` a `main` y tambien admite ejecucion manual mediante `workflow_dispatch`.

## Permisos minimos

- `contents: read`: descarga el codigo.
- `pages: write`: publica el artefacto.
- `id-token: write`: autentica el despliegue mediante OIDC.

No recibe permisos para escribir codigo ni issues. La concurrencia evita despliegues paralelos de Pages sin cancelar una publicacion que ya comenzo.

## Trabajo `build`

Usa `actions/checkout@v6`, `actions/setup-node@v6`, `actions/configure-pages@v5` y Node 22. Luego ejecuta `npm ci`, `npm run build:pages`, verifica `dist/client/index.html` y sube solo `dist/client` con `actions/upload-pages-artifact@v4`.

## Trabajo `deploy`

Espera a `build`, usa el entorno protegido `github-pages` y publica con `actions/deploy-pages@v4`. La URL final se obtiene de la salida oficial del paso de despliegue.

## Seguridad operacional

Las acciones estan fijadas a versiones mayores, no a hashes de commit. Es la forma usada en los ejemplos oficiales actuales, aunque fijar SHAs y usar un actualizador automatizado reduciria el riesgo de cadena de suministro. Ningun secreto propio se entrega al build.

## Fallos esperables

- Pages no esta configurado para usar GitHub Actions;
- falla `npm ci` por lockfile inconsistente;
- Vinext no genera `index.html`;
- el script detecta un recurso faltante;
- las politicas del repositorio bloquean el entorno `github-pages`.
