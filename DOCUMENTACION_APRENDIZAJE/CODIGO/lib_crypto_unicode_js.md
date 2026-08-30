# `lib/crypto/unicode.js`

## Proposito

Ofrece dos funciones base para que todo el motor use representacion y unidades coherentes.

## `normalizeUnicode`

```js
String(value ?? '').normalize('NFC')
```

La coalescencia solo sustituye `null`/`undefined`; otros valores se convierten a string. NFC compone formas canonicas cuando existe una forma compuesta.

## `toGraphemes`

Normaliza primero. Si `Intl` y `Intl.Segmenter` existen, crea un segmentador español de grafemas y convierte sus segmentos a strings. El callback desestructura `{ segment }`.

Fallback: `Array.from(normalized)`, que opera por puntos de codigo y no por unidades UTF-16, pero puede separar clusters complejos.

## Conexion

Validacion, cifrados, scoring y contadores de UI dependen de este modulo. Un cambio afecta casi todo el sistema.

## Riesgos

- crear Segmenter en cada llamada tiene costo;
- resultados pueden variar por version Unicode del entorno;
- fallback no es equivalente;
- NFC no resuelve confusables ni equivalencia visual.

## Pruebas

ASCII, `ñ`, vocal compuesta/descompuesta, emoji simple, modificador de piel, ZWJ, bandera, marcas combinantes y simulacion de entorno sin Segmenter.
