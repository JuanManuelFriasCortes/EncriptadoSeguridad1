# `components/ui/textarea.tsx`

## Proposito

Envuelve el `<textarea>` nativo con estilos del sistema.

## Contrato

Acepta propiedades nativas, une `className` y reenvia valores/eventos. En `CryptoWorkbench` se usa como control administrado por React.

## Estilos

Incluye altura minima, ancho, borde, foco, invalid y disabled. `field-sizing-content` permite crecimiento segun contenido cuando el navegador lo admite; la pantalla añade `resize-y` y `min-h-32`.

## Seguridad

Un textarea captura texto; no lo interpreta. El riesgo surge en el destino de ese texto, que actualmente es JSX textual y funciones puras.

## Riesgos y pruebas

Probar textos de 12,000 grafemas, saltos de linea, cadenas sin espacios, resize, lectores de pantalla, foco e invalid. Quitar `min-h` puede causar saltos visuales.
