# `lib/crypto/language-data.js`

## Proposito

Separa los datos del idioma de las formulas de puntuacion.

## Frecuencias

27 entradas con porcentajes aproximados. Se congelan para evitar mutacion directa. `ñ` es clave propia.

## Palabras comunes

Un template literal multilinea se recorta y divide por whitespace para construir un `Set`. Incluye español general y vocabulario de proyecto/criptografia. El Set permite `has` promedio constante.

## N-gramas

Objeto de bigramas, trigramas y secuencias mas largas con pesos. `cion`/`iento` pesan 4.0; secuencias cortas pesan menos.

## Patrones improbables

Cinco regex globales/Unicode/insensibles a mayusculas. Penalizan consonantes/vocales largas, q sin u y estructuras raras.

## Palabras de una letra

Set `a,e,o,u,y` evita penalizarlas.

## Riesgos

- sesgo por dominio;
- corpus de origen no versionado;
- pesos manuales;
- regex pueden castigar extranjerismos;
- regex globales mantienen `lastIndex`, por eso `countMatches` lo reinicia;
- editar datos sin corpus puede sobreajustar.

## Pruebas

Suma/rango de frecuencias, unicidad, palabras esperadas/no esperadas, coincidencias de patrones y evaluacion contra corpus separado.
