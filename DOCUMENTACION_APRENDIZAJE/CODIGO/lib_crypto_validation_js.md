# `lib/crypto/validation.js`

## Proposito

Define las fronteras de entrada: conjunto, mensaje, costo del analisis y una excepcion agrupada.

## `describeWhitespace`

Funcion privada para mensajes comprensibles. Reconoce tres casos y, en los demas, muestra el punto de codigo hexadecimal. `codePointAt(0)` toma el primer punto; un grafema blanco complejo podria requerir descripcion mas completa.

## `validateCharset`

Normaliza, segmenta y prepara `errors`, `seen`, `duplicates`, `whitespace`. En un recorrido:

- regex `\s` detecta blancos;
- Set detecta repeticion;
- `duplicates.includes` evita repetir el mismo duplicado.

Despues aplica longitud, duplicados y blancos. Devuelve datos incluso cuando es invalido para que la UI muestre contador y detalles.

No corrige silenciosamente. Esto protege el significado del orden.

## `validateMessage`

Desestructura opcion con `required=true`. Normaliza, cuenta grafemas y devuelve longitud. Vacio y exceso son errores separados.

## `validateAnalysisComplexity`

Calcula `M*(N+1)`. La cadena de error evita revelar internals; solo solicita reducir entrada.

No valida por si mismo que longitudes sean enteros no negativos, porque recibe resultados internos. Un consumidor directo deberia respetar el contrato.

## `InputValidationError`

Extiende Error y conserva tanto mensaje unido como arreglo. Facilita mostrar una frase y, en pruebas/otros clientes, inspeccionar mensajes separados.

## Riesgos

- `\s` cubre una familia amplia que puede variar segun Unicode/ECMAScript;
- `duplicates.includes` da peor caso cuadratico, acotado a 128;
- mensajes estan en español y mezclan logica/localizacion;
- la cota de complejidad es aproximada;
- mensaje de solo blancos se considera no vacio.

## Pruebas

Cada frontera exacta, duplicados canonicos, varios blancos, opciones required, calculo maximo/uno mas, forma y nombre del error.
