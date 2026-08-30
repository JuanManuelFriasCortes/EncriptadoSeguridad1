---
aliases: [Módulos, Dependencias]
tags: [codigo, dependencias, supply-chain]
---

# Módulos y dependencias

## Motor

| Archivo | Exportaciones o papel |
| --- | --- |
| `index.js` | Fachada pública del motor |
| `constants.js` | Límites y presets |
| `unicode.js` | NFC y grafemas |
| `validation.js` | Validadores y error predecible |
| `ciphers.js` | César y Atbash |
| `language-data.js` | Modelo estático del español |
| `scoring.js` | Score y evidencia |
| `analyzer.js` | Candidatos y ganador |

## Componentes

- `crypto-workbench.tsx`: orquestación.
- `ui/button.tsx`: variantes de botón.
- `ui/input.tsx`: campos cortos.
- `ui/textarea.tsx`: mensajes.
- `ui/label.tsx`: etiquetas.
- `ui/alert.tsx`: errores.
- `lib/utils.ts`: combinación de clases.

## Dependencias de ejecución

- React y React DOM.
- Vinext y RSC.
- Base UI.
- Lucide React.
- `class-variance-authority`, `clsx`, `tailwind-merge`.

## Dependencias de desarrollo

- Vite y plugins React/RSC.
- TypeScript y tipos.
- Tailwind y PostCSS.

## Toolchain de publicación

- `next.config.ts`: selección servidor/exportación.
- `scripts/build-pages.mjs`: adaptación y verificación del artefacto.
- `.github/workflows/pages.yml`: acciones oficiales de GitHub Pages.

Estas piezas no entran en el motor criptográfico; preparan y publican el bundle descrito en [[32 - Publicacion en GitHub Pages]].

## `package-lock.json`

Registra el árbol exacto para instalaciones reproducibles. Reduce variación, pero no elimina el riesgo de [[16 - Modelo de amenazas|supply chain]].

## Regla práctica

Una dependencia debe permanecer solo si el código o el toolchain la requieren. Revisar con `npm ls --depth=0` y `npm audit`.
