# Unicode y charsets

## ASCII y Unicode

ASCII representa 128 codigos historicos. Unicode asigna puntos de codigo a caracteres de muchas escrituras/simbolos. El proyecto acepta ambos; no trabaja “en ASCII” de forma exclusiva.

## UTF-16 en JavaScript

Las strings usan unidades de codigo UTF-16. `texto.length` cuenta unidades, y `texto[i]` devuelve una unidad, no necesariamente un simbolo completo. Un emoji puede ocupar dos unidades; una familia/emoji modificado puede ocupar varias secuencias.

## Punto de codigo y grafema

Un punto de codigo es un valor Unicode. Un grafema es una unidad percibida, que puede agrupar varios puntos. El algoritmo intenta usar grafemas porque el conjunto representa simbolos visibles.

## `Array.from` y spread

`Array.from(texto)` y `[...texto]` iteran puntos de codigo, mejor que `split('')`, pero no siempre mantienen una secuencia ZWJ o marca combinante como un grafema. El proyecto usa Array.from solo como fallback.

## `Intl.Segmenter`

`toGraphemes` crea `new Intl.Segmenter('es',{granularity:'grapheme'})` y extrae `segment`. Referencias: [UAX #29](https://unicode.org/reports/tr29/) y [MDN Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter).

## NFC

`normalize('NFC')` compone representaciones canonicamente equivalentes cuando es posible. `é` precompuesta y `e`+acento se vuelven la misma forma, importante para duplicados y busqueda en Map. [UAX #15](https://unicode.org/reports/tr15/).

## Charset personalizado

El usuario escribe una cadena. `validateCharset` la normaliza, segmenta, exige 2..128, unicidad y ausencia de whitespace. El arreglo resultante conserva orden y se convierte en `Map<grafema,indice>` durante transformacion.

Ejemplo `😀😁😂`: indices 0,1,2. Cesar shift 1 produce `😁😂😀`; Atbash produce `😂😁😀`.

## Caracteres externos

Si el Map no contiene el grafema, `lookup.get` devuelve `undefined` y `transform` devuelve el mismo. Espacios y puntuacion suelen quedar fuera a proposito.

## Plegado para español

Scoring usa NFD temporal para eliminar diacriticos, pero protege `ñ`. Esto no cambia el texto cifrado devuelto; solo crea una forma interna para comparar idioma.

## Limitaciones

- fallback no equivale a grafemas completos;
- versiones Unicode del navegador pueden diferir;
- NFC no identifica homoglifos;
- simbolos visualmente iguales pueden ser distintos;
- prohibir whitespace es politica del proyecto;
- orden diferente hace incompatibles los cifrados.

## Pruebas clave

Formas compuesta/descompuesta, `ñ`, emoji simple/modificado/ZWJ/bandera, duplicados tras NFC, conjunto emoji y entorno sin Segmenter.
