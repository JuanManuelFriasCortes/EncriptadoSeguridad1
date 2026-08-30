# Analisis de frecuencias y Al-Kindi

## Observacion historica

Al-Kindi describio el principio de que las letras de un idioma no aparecen con igual frecuencia y que esas regularidades pueden compararse con simbolos de una sustitucion. Funciona mejor con suficiente texto y sustituciones que conservan distribuciones.

Referencias: [BnF, manuscrito/obra atribuida a Al-Kindi](https://catalogue.bnf.fr/ark:/12148/cb46585841t) y [articulo academico sobre Al-Kindi y codebreaking](https://doi.org/10.1198/tas.2011.10191).

## Por que funciona

En español, `e` y `a` suelen aparecer mucho mas que `k`. Una sustitucion monoalfabetica cambia etiquetas pero conserva conteos. Al comparar observado con esperado se pueden valorar hipotesis.

## Aplicacion exacta en el proyecto

**Datos:** `lib/crypto/language-data.js`, constante `SPANISH_LETTER_FREQUENCIES`.

**Calculo:** `lib/crypto/scoring.js`, funcion `scoreSpanish`.

Bloque esencial:

```js
for (const [letter, expectedPercent] of Object.entries(SPANISH_LETTER_FREQUENCIES)) {
  const expected = (expectedPercent / 100) * letterCount;
  const observed = counts[letter];
  chiSquare += ((observed - expected) ** 2) / Math.max(expected, 0.01);
  if (observed > 0) logLikelihood += observed * Math.log(expectedPercent / 100);
}
```

`counts` contiene observaciones; `expected` adapta porcentajes a longitud. Chi-cuadrada penaliza desviacion y log-verosimilitud premia letras plausibles.

**Consumidor:** `lib/crypto/analyzer.js`, `rankCandidates`, que ejecuta `scoreSpanish` para cada posible texto.

## Historico versus moderno

### Principio historico

Frecuencias desiguales del idioma para atacar sustituciones.

### Extensiones modernas del programa

- chi-cuadrada formal;
- log-verosimilitud;
- diccionario mediante Set;
- n-gramas ponderados;
- proporciones de vocales/espacios;
- regex de estructuras improbables;
- ranking programatico y confianza.

No debe atribuirse a Al-Kindi la formula exacta, estos pesos ni la confianza.

## Limites

Un texto corto no aproxima frecuencias generales. Temas especializados cambian distribucion. Anagramas conservan frecuencias. Otros idiomas usan modelos distintos. Por eso ninguna señal decide sola.

Consulta tambien `12_ANALISIS_DE_FRECUENCIAS.md` y `13_ESTADISTICA_Y_PUNTUACION.md`.
