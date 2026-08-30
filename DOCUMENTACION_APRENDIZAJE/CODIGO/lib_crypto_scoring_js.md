# `lib/crypto/scoring.js`

## Proposito

Convierte un texto candidato en una puntuacion explicable de semejanza con español, una medida de evidencia y un desglose numerico.

## Dependencias

Importa frecuencias, lexico, n-gramas, patrones y palabras de una letra. Usa `normalizeUnicode`/`toGraphemes` para tratamiento estable.

## `foldSpanish`

Proceso:

```text
NFC -> minusculas es -> ñ a marcador NUL -> NFD
 -> eliminar marcas Unicode -> restaurar ñ
```

El marcador `\u0000` se usa temporalmente dentro de la funcion. Esto preserva `ñ` al quitar diacriticos. Un NUL presente originalmente podria colisionar conceptualmente con el marcador y merece prueba/documentacion; los controles originales son penalizados mas adelante, pero el plegado ocurre antes.

## `countMatches`

Reinicia `lastIndex` porque las regex globales son objetos con estado. Luego cuenta el arreglo de coincidencias. Sin el reinicio, llamadas sucesivas podrian variar.

## Extraccion

- `graphemes`: texto plegado segmentado;
- `letters`: solo claves del modelo;
- `words`: coincidencias `[a-zñ]+`;
- `substantialWords`: longitud mayor que uno.

`Object.hasOwn` evita herencia al decidir letras validas.

## Frecuencia

Inicializa todos los conteos en cero. Para cada letra calcula esperado y observado, acumula chi-cuadrada y log-verosimilitud. Con menos de cinco letras devuelve cero; de otro modo aplica formula acotada `-65..42`.

## Lexico

Filtra palabras presentes en Set. Combina proporcion y numero, con techo 72. Una frase llena de palabras desconocidas obtiene poco aunque sus letras parezcan plausibles.

## N-gramas

Para cada entrada busca apariciones desde `start`; avanza uno para permitir solapamiento. Normaliza por `max(8, sqrt(letterCount)*2.4)`, multiplica por 10 y limita a 52.

## Vocales y espacios

Vocales apuntan a 0.47, con maximo 18 y piso -30. Espacios apuntan a 0.15, con maximo 10 y piso -20. Se desactivan para entradas demasiado cortas.

## Penalizaciones

Palabras de una letra invalidas, palabras largas sin vocal y regex improbables forman `structurePenalty`, maximo 75. Controles seleccionados suman 12 sin techo propio.

## Retorno

`score` suma positivos/resta penas y se redondea a seis decimales. `evidence` combina letras/palabras y se limita a uno. `details` hace observable cada termino para pruebas y diagnostico.

## Lo mas dificil

La funcion mezcla escalas diseñadas manualmente. No existe una derivacion estadistica que obligue a esos pesos. El score solo es valido para comparar bajo esta implementacion y debe evaluarse empiricamente.

## Riesgos

- señales correlacionadas;
- sobreajuste al diccionario;
- textos no españoles;
- NUL temporal;
- regex y n-gramas consumen CPU;
- redondeo puede crear empates;
- `toLocaleLowerCase` y segmentacion dependen del entorno.

## Pruebas

Desglose exacto para casos fijos, propiedades de acentos/ñ, controles, limites cortos, patrones, apariciones superpuestas, ausencia de `NaN`, monotonicidad esperada en casos controlados y corpus independiente.
