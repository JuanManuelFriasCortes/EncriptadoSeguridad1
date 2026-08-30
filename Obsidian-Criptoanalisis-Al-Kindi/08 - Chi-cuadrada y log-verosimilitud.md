---
aliases: [Chi cuadrada, Log-verosimilitud]
tags: [estadistica, scoring, frecuencias]
---

# Chi-cuadrada y log-verosimilitud

## Chi-cuadrada

Compara frecuencia observada y esperada:

```text
χ² = Σ ((Oᵢ - Eᵢ)² / Eᵢ)
```

- `Oᵢ`: conteo observado de la letra `i`.
- `Eᵢ`: conteo esperado según frecuencia española y longitud.

Un valor bajo indica mayor cercanía a la distribución esperada. La fórmula de bondad de ajuste está documentada por [NIST](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm).

## Uso concreto

En `scoreSpanish`, para cada letra:

```js
const expected = (expectedPercent / 100) * letterCount;
chiSquare += ((observed - expected) ** 2) / Math.max(expected, 0.01);
```

`Math.max` evita división por un valor excesivamente pequeño.

## Log-verosimilitud

```text
LL = Σ Oᵢ × log(pᵢ)
```

Las letras esperables aportan menos penalización que letras raras repetidas muchas veces. El código divide por la cantidad de letras para comparar longitudes.

## Por qué se usan ambas

Chi-cuadrada mide distancia entre distribuciones; log-verosimilitud valora la plausibilidad de las observaciones. Su combinación es una heurística robusta para ranking, pero no una prueba formal con valor p.

## Precaución con textos cortos

En muestras pequeñas, los conteos esperados son bajos y la aproximación chi-cuadrada pierde fiabilidad. Por eso el proyecto:

- neutraliza parte de la señal con menos de cinco letras;
- añade [[09 - N-gramas y señales lingüisticas]];
- reduce `evidence`;
- reporta menor confianza mediante [[18 - Ambiguedad y confianza]].
