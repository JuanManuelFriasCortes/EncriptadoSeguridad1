---
aliases: [React, Vinext, Vite]
tags: [arquitectura, frontend, build]
---

# Arquitectura React y Vinext

## Stack

- React: componentes y estado.
- Vinext: compatibilidad con el modelo de aplicación Next sobre Vite.
- Vite: desarrollo y build.
- Tailwind CSS: utilidades visuales.
- TypeScript en UI; JavaScript modular en el motor.

## Entradas

`app/layout.tsx`:

- idioma `es`;
- metadatos;
- estilos globales;
- política `robots` sin indexación.

`app/page.tsx` monta `CryptoWorkbench`.

## Cliente y servidor

`CryptoWorkbench` declara `'use client'` porque necesita eventos, estado y portapapeles. El motor importado se ejecuta en el bundle del navegador.

El servidor local entrega HTML, JavaScript y CSS, pero no recibe los mensajes introducidos. Consulta [[19 - Privacidad y procesamiento local]].

## Configuración

`vite.config.ts` registra:

```js
plugins: [vinext()]
```

y procesa Tailwind mediante PostCSS.

`tsconfig.json` activa `strict`, resolución por bundler y alias `@/*`.

`next.config.ts` decide el destino: cabeceras HTTP al servir con Vinext o `output: 'export'` con prefijo para GitHub Pages. `scripts/build-pages.mjs` normaliza y valida el artefacto; `.github/workflows/pages.yml` lo publica. Consulta [[32 - Publicacion en GitHub Pages]].

## Comandos

```powershell
npm install
npm run dev
npm run build
npm run build:pages
npm start
```

## Conexiones

- UI: [[14 - Estado e interfaz]].
- Paquetes: [[15 - Modulos y dependencias]].
- Seguridad HTTP: [[17 - XSS CSP y headers]].
- Flujo completo: [[01 - Mapa del sistema]].
