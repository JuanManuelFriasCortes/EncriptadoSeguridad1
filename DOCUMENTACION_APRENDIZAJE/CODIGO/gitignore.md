# `.gitignore`

## Proposito

Evita confirmar archivos recreables, locales o potencialmente sensibles.

## Reglas

- `/node_modules`: paquetes instalados.
- `/.next/`, `/.vinext/`, `/dist/`: salida/cache de build.
- `next-env.d.ts`: tipo generado.
- `.env*`: configuracion local potencialmente secreta.
- `*.log`: logs.
- `.DS_Store`, `Thumbs.db`: metadatos de sistema.
- `.idea/`, `.vscode/`: configuracion de editores.

Las barras iniciales limitan varias reglas a raiz. Otras coinciden por patron.

## Seguridad

Ignorar `.env` reduce confirmaciones accidentales, pero no borra secretos ya presentes en historial ni protege archivos del sistema local.

## Riesgos

Ignorar toda configuracion de VS Code impide compartir ajustes utiles; es una decision actual. Ignorar un archivo de fuente por error puede hacer que el proyecto funcione solo en una maquina.

## Pruebas

`git status --ignored` para revisar; `git check-ignore -v <ruta>` para saber que regla aplica. Confirmar que fuentes y documentacion deseada no queden ignoradas.
