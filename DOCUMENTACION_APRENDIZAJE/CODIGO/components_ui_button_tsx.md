# `components/ui/button.tsx`

## Proposito

Envuelve la primitiva `Button` de Base UI con variantes y tamaños del diseño.

## Dependencias

- Base UI aporta comportamiento/accesibilidad de la primitiva.
- CVA genera clases tipadas.
- `cn` combina y resuelve conflictos.

## `buttonVariants`

Variantes: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`. Tamaños: normal, `xs`, `sm`, `lg` y tres tamaños de icono.

La base define alineacion, foco, transicion, estados disabled/invalid y reglas para SVG. `active:not-aria-[haspopup]:translate-y-px` da respuesta tactil sin mover ciertos botones de menu.

## `Button`

Acepta props de la primitiva y variantes. Aporta defaults, asigna `data-slot` y reenvia el resto. El consumidor sigue siendo responsable de `type`, `aria-label` y manejadores.

## Conexion

La pantalla usa default, outline, secondary, ghost y tamaños sm/lg/icon-sm.

## Riesgos

- olvidar `type="button"` en contexto de formulario;
- icono sin nombre accesible;
- agregar variantes con contraste insuficiente;
- clases del consumidor pueden reemplazar medidas mediante `twMerge`;
- cambios en Base UI pueden alterar tipos/comportamiento.

## Pruebas

Teclado, focus-visible, disabled, todas las variantes/tamaños, icono solo con etiqueta, texto largo y eventos.
