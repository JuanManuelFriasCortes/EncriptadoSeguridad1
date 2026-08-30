# `components/ui/label.tsx`

## Proposito

Proporciona una etiqueta HTML estilizada. Declara `'use client'`, aunque su implementacion no usa hooks; esto asegura compatibilidad al consumirse en componentes cliente.

## Contrato

Acepta todas las propiedades de `<label>`, incluido `htmlFor`, reenvia props y combina clases. `data-slot="label"` permite composicion.

## Accesibilidad

La utilidad principal es la asociacion programatica entre texto y control. En la pantalla, `htmlFor` coincide con `id`. Las clases contemplan controles deshabilitados mediante selectores group/peer.

## Riesgos

Un `htmlFor` incorrecto o ausente reduce area clicable y comprension del lector de pantalla. No debe reemplazarse por un `<span>` solo por apariencia.

## Pruebas

Clic en etiqueta enfoca/activa el control; disabled y texto con icono conservan alineacion.
