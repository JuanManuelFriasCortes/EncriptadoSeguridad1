# `components/ui/alert.tsx`

## Proposito

Define una familia de componentes de alerta con variantes visuales y slots reconocibles.

## `alertVariants`

`cva` combina una base compleja de grid, iconos, espaciado y tipografia con variantes `default` y `destructive`. La variante predeterminada usa colores de tarjeta; la destructiva usa el token de error.

## Componentes

- `Alert`: `<div role="alert">`, variante y props.
- `AlertTitle`: titulo estilizado.
- `AlertDescription`: descripcion con enlaces/parrafos.
- `AlertAction`: accion absoluta en esquina.

`data-slot` permite selectores internos y composicion. `cn` resuelve clases adicionales.

## Conexion actual

`CryptoWorkbench` usa `Alert` y `AlertDescription` en `ErrorNotice`, añadiendo `aria-live="assertive"`.

## Riesgos

El rol alert ya es asertivo en muchas tecnologias; combinarlo con `aria-live` puede producir anuncios redundantes en algunos lectores. Debe probarse, no eliminarse a ciegas. El espaciado `pr-18` depende de la presencia del slot de accion.

## Pruebas

Variantes, icono presente/ausente, texto largo, accion, lector de pantalla y clases personalizadas.
