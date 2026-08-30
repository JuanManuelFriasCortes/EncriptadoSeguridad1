# `components/ui/input.tsx`

## Proposito

Envuelve `Input` de Base UI y aplica estilos coherentes a entradas de una linea.

## Contrato

Acepta `React.ComponentProps<'input'>`. Desestructura `className` y `type`; reenvia valor, eventos, ARIA, disabled, autocomplete y demas props.

## Estilos

Fija ancho completo, minimo cero, borde, foco visible, invalid, disabled y tipografia responsiva. Las reglas `file:*` permiten que el mismo componente soporte `type=file`, aunque la pantalla actual no lo usa.

## Uso actual

- conjunto ordenado como texto;
- desplazamiento como `type="number"`.

## Riesgos

La validacion HTML de `number` no sustituye `Number.isSafeInteger`. Propagar props despues de propiedades internas permite que el consumidor influya en algunas; es intencional pero debe revisarse al añadir restricciones.

## Pruebas

Texto, numero, invalid, disabled, foco, teclado movil y valores Unicode largos.
