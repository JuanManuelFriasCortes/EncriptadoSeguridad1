# `app/layout.tsx`

## Proposito

Define el contenedor raiz de todas las rutas, importa los estilos globales y declara metadatos. Es un componente de servidor por defecto: no usa hooks ni `'use client'`.

## Importaciones

- `Metadata` desde `next`: solo tipo TypeScript.
- `./globals.css`: efecto de modulo que incorpora el estilo global al build.

## `metadata`

El objeto tipado contiene titulo, descripcion, nombre de aplicacion y politica de robots. `robots.index=false` y `follow=false` expresan una preferencia para buscadores; no autentican ni ocultan el sitio.

La descripcion resume fielmente: laboratorio local, Cesar, Atbash y analisis estadistico automatico en español.

## `RootLayout`

```tsx
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>)
```

`children` representa la pagina activa. `Readonly` comunica que no debe reasignarse. Devuelve `html` en español y `body` con el contenido.

## Conexion

Vinext descubre este archivo por convencion. `app/page.tsx` se inserta como `children`. La importacion CSS hace que tokens y base existan para todos los componentes.

## Riesgos al cambiarlo

- quitar `lang="es"` perjudica accesibilidad;
- importar estilos varias veces puede duplicar o alterar orden;
- prometer privacidad incorrecta en metadata seria inconsistente;
- cambiar robots no proporciona control de acceso real.

## Pruebas sugeridas

Build, inspeccion de `<html lang>`, titulo/description y reglas CSS efectivas. Verificar que robots generados correspondan a la intencion.
