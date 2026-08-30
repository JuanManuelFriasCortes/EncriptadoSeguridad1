# `app/globals.css`

## Proposito

Inicializa Tailwind, define tokens del tema y establece reglas base. No contiene estilos de componentes completos; estos se componen con utilidades en TSX.

## Bloque `@theme inline`

Mapea nombres Tailwind semanticos a variables: colores de fondo/texto/tarjeta/primario/error/borde, fuentes y radios. Las utilidades `bg-background` y `text-foreground` dependen de este mapeo.

## Bloque `:root`

Contiene la paleta clara, fuentes y radios. Hay tokens generales y de dominio:

- `--encrypt-*`: panel de cifrado;
- `--analysis-*`: analizador;
- `--privacy-*`: aviso local;
- `--accent-strong`: acentos e indicador de resultado.

No se define tema oscuro real aunque ciertos componentes reutilizables contienen variantes `dark:`. `html` declara `color-scheme: light`.

## `@layer base`

- universal: borde/outline tematico y `border-box`;
- body: fondo, texto, margen cero, fuente, tracking cero;
- controles: heredan tipografia;
- seleccion: colores propios.

## Conexion

`app/layout.tsx` lo importa. `vite.config.ts` registra Tailwind PostCSS. Los `className` de componentes referencian tokens.

## Riesgos

- renombrar token sin actualizar clases produce valores faltantes;
- bajo contraste afecta accesibilidad;
- cambiar radios puede violar consistencia de controles;
- quitar `border-box` puede cambiar medidas;
- añadir fuentes remotas cambiaria CSP y privacidad.

## Pruebas

Inspeccion visual movil/escritorio, contraste, foco, seleccion, desbordamiento de textos largos y estilos computados en DevTools.
