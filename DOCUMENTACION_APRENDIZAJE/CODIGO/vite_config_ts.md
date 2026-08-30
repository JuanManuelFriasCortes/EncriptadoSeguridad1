# `vite.config.ts`

## Proposito

Configura la cadena de construccion Vite con Tailwind y Vinext.

## Importaciones

- `@tailwindcss/postcss`: plugin que procesa directivas/utilidades CSS.
- `vinext`: integracion de estructura y runtime.
- `defineConfig`: ayuda de Vite para tipos y autocompletado.

## Configuracion

```ts
css: { postcss: { plugins: [tailwindcss()] } }
plugins: [vinext()]
```

Tailwind actua dentro de PostCSS; Vinext actua como plugin de Vite. El orden de plugins puede importar si se añaden otros transformadores.

## Conexion

Los scripts `vinext dev/build/start` consumen esta configuracion. `globals.css` depende del plugin Tailwind.

## Riesgos

Actualizar versiones beta puede cambiar API. Quitar Tailwind deja clases sin CSS. Duplicar plugin React/RSC manualmente puede interferir con lo que Vinext ya configura.

## Pruebas

`npm run build`, servidor local, HMR, estilos generados, imports con alias y ruta principal.
