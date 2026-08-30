# Scoring linguistico completo

## Contrato

**Archivo:** `lib/crypto/scoring.js`. **Funcion:** `scoreSpanish(candidate)`. Recibe string y devuelve `{score,evidence,details}`. La llaman los dos bloques de `rankCandidates` en `analyzer.js`.

## Metricas reales

| Metrica | Calculo/peso | Efecto | Limite |
|---|---|---|---|
| Frecuencia | `(avgLog+4.35)*28 - sqrt(chi2)*0.9` | suma o resta | `[-65,42]`; cero con <5 letras |
| Lexico | `ratio*58 + reconocidas*2.4` | suma | maximo 72 |
| N-gramas | `peso/max(8,sqrt(L)*2.4)*10` | suma | maximo 52 |
| Vocales | `18-abs(ratio-.47)*115` | suma/resta | piso -30; cero con <5 |
| Espacios | `10-abs(ratio-.15)*70` | suma/resta | piso -20; cero con <12 grafemas |
| Palabra 1 letra invalida | 5 por palabra | resta | dentro de estructura |
| Palabra >=4 sin vocal | `min(12,longitud*1.5)` | resta | dentro de estructura |
| Patron improbable | 7 por coincidencia | resta | estructura total max 75 |
| Control no permitido | 12 por grafema | resta | sin techo separado |

## Paso a paso

1. `foldSpanish` pasa a forma comparable, conserva `ñ` y retira otras tildes.
2. Se obtienen grafemas, letras modeladas y palabras.
3. `counts` se inicializa con las 27 letras.
4. Se acumulan chi-cuadrada y log-verosimilitud.
5. Se filtran palabras en `COMMON_WORDS`.
6. Se cuentan n-gramas superpuestos y pesos de `language-data.js`.
7. Se calculan ratios de vocales y espacios.
8. Se acumulan penalizaciones.
9. Se suman componentes y se redondea a seis decimales.
10. Evidencia se calcula aparte con letras y palabras.

## Por que ayuda cada señal

- Frecuencia detecta distribucion global, pero ignora orden.
- Lexico aporta secuencias con significado conocido, pero sesga al diccionario.
- N-gramas detectan estructura local, incluso en palabras no incluidas.
- Vocales/espacios regularizan forma general.
- Penalizaciones rechazan ruido, con riesgo de castigar extranjerismos.

## Ejemplo A/B/C ejecutado con el codigo actual

### A: `ESTE ES UN MENSAJE DE PRUEBA`

Frecuencia `40.723156`, lexico `72`, n-gramas `7.73241`, vocales `17.05`, espacios `8`, penas `0`. **Score `145.505565`**.

### B: `QXZW QÑ WK XQKJFLX ZQ HVKXUX`

Frecuencia `-65`, lexico `0`, n-gramas `0`, vocales `-30`, espacios `8`, penas `75`. **Score `-162`**.

### C: `HOLA MUNDO TECNOLOGIA`

Frecuencia `36.25149`, lexico `43.466667`, n-gramas `2.389747`, vocales `17.576316`, espacios `6.166667`, penas `0`. **Score `105.850886`**.

A gana porque suma seis palabras reconocidas, buenas frecuencias/estructura y cero penas. C es plausible pero ofrece menos palabras y n-gramas. B tiene distribucion y estructura improbables.

## Evidencia

`min(1,(letters/55)*.65+(words/10)*.35)`. No se suma al score. A y B tienen evidencia `0.481818` por igual aunque calidad opuesta: esto demuestra que evidencia mide cantidad, no correccion.

## Sintaxis dificil

`Object.fromEntries(Object.keys(F).map(letter => [letter,0]))` obtiene nombres de letras, convierte cada uno en par letra/cero y reconstruye el objeto de conteos.

El `while ((start = folded.indexOf(ngram,start)) !== -1)` asigna el siguiente indice y al mismo tiempo decide si seguir; `start += 1` permite solapamientos.

## Si se elimina

El analizador puede generar textos pero no ordenarlos por idioma. Si se elimina una sola señal, cambia la superficie de clasificacion y debe medirse contra corpus.

## Limitaciones

Pesos manuales, señales correlacionadas, idioma fijo, diccionario de dominio, patrones con falsos positivos y sin calibracion/corpus automatizado actual.
