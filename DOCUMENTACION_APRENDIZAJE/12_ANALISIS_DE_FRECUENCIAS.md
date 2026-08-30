# Analisis de frecuencias y Al-Kindi

## Contexto historico

Ya'qub ibn Ishaq al-Kindi es asociado con una de las exposiciones tempranas y sistematicas del uso de frecuencias para criptoanalisis. La idea central es comparar la distribucion de simbolos de un texto cifrado con regularidades conocidas del idioma. Referencias utiles: [catalogo de la BnF sobre el manuscrito atribuido a Al-Kindi](https://catalogue.bnf.fr/ark:/12148/cb46585841t) y el articulo academico [Al-Kindi, Cryptography, Codebreaking and Ciphers](https://doi.org/10.1198/tas.2011.10191).

El proyecto incorpora ese conocimiento como inspiracion estadistica, no como reproduccion paleografica exacta del tratado.

## Frecuencias esperadas

`SPANISH_LETTER_FREQUENCIES` asigna un porcentaje aproximado a cada letra española. Por ejemplo, `e` tiene 13.68 %, `a` 12.53 % y `k` 0.02 %. Estas cifras describen corpus generales; un mensaje individual nunca esta obligado a coincidir exactamente.

## Frecuencias observadas

Para un candidato se cuentan letras validas despues de plegar mayusculas y acentos. Si hay `L` letras y `O_x` apariciones de la letra `x`, su porcentaje observado seria `100*O_x/L`.

El codigo no se limita a elegir la letra mas frecuente. Usa todas las letras mediante dos calculos.

## Chi-cuadrada

Para cada letra:

```text
E_x = frecuenciaEsperada_x / 100 * L
chi2 = sumatoria ((O_x - E_x)^2 / E_x)
```

Una chi-cuadrada menor indica que observado y esperado estan mas cerca. El codigo protege el denominador con `Math.max(expected, 0.01)`. La prueba chi-cuadrada es una tecnica general de bondad de ajuste; referencia: [NIST Engineering Statistics Handbook](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm).

En textos muy cortos, los conteos esperados son diminutos y la aproximacion es inestable. Por eso la señal de frecuencia se fuerza a cero con menos de cinco letras y se combina con otras señales.

## Log-verosimilitud

Para letras observadas:

```text
logLikelihood += O_x * log(p_x)
average = logLikelihood / L
```

Las letras comunes tienen probabilidades mayores y penalizan menos. Usar logaritmos convierte productos de probabilidades pequeñas en sumas manejables.

## Por que no basta la frecuencia

Dos textos pueden tener conteos parecidos y orden completamente diferente. Un anagrama conserva frecuencias. Un mensaje corto puede no representar el idioma. Por ello se añaden:

- palabras comunes;
- n-gramas;
- vocales y espacios;
- penalizaciones estructurales.

Esta combinacion aproxima el principio de explotar regularidades del idioma a varios niveles.

## Plegado del español

`foldSpanish`:

1. normaliza a NFC;
2. convierte a minusculas con locale español;
3. protege `ñ` con un marcador temporal;
4. normaliza a NFD;
5. elimina marcas diacriticas `\p{M}`;
6. restaura `ñ`.

Asi `ÁRBOL` se compara como `arbol`, pero `ñ` no se confunde con `n`. Esta decision favorece robustez frente a tildes sin borrar una letra distinta del alfabeto español.

## N-gramas

Un n-grama es una secuencia de `n` unidades. El proyecto premia secuencias como `que`, `cion`, `iento`, `de` y `la`. Se cuentan coincidencias superpuestas: despues de encontrar una en posicion `start`, el buscador avanza uno, no toda la longitud del patron.

La presencia de `cion` aporta mas peso que `co` porque es una estructura mas especifica. Sin embargo, los pesos son heuristicas manuales, no parametros entrenados formalmente.

## Palabras comunes

`COMMON_WORDS` contiene articulos, preposiciones, verbos frecuentes y vocabulario del dominio del proyecto. La puntuacion considera numero y proporcion de palabras reconocidas. La lista de dominio puede favorecer mensajes sobre cifrado y universidad; eso es util para la demostracion, pero introduce sesgo.

## Patrones improbables

Se penalizan secuencias largas sin vocales, cuatro o mas vocales juntas, `q` sin `u`, pares de `k/ñ/w` y grupos largos de consonantes. Son aproximaciones: palabras extranjeras o siglas legitimas pueden activarlas.

## Señales de estructura

La proporcion objetivo de vocales es 0.47 y la de espacios 0.15. No son leyes. Sirven como regularizadores para que una cadena con palabras y ritmo español supere a ruido con la misma frecuencia global.

## Evidencia versus puntuacion

La puntuacion responde “¿cuanto se parece este candidato al modelo?”. La evidencia responde “¿cuanto texto habia para juzgar?”. Un candidato corto puede parecer perfecto por casualidad, pero su evidencia permanece baja.

## Relacion correcta con Al-Kindi

Una explicacion academica prudente es:

> El proyecto aplica el principio historico asociado a Al-Kindi de explotar distribuciones del idioma. Lo amplía con medidas computacionales modernas, lexico, n-gramas y penalizaciones para ordenar automaticamente todos los candidatos de dos cifrados clasicos.

No conviene afirmar que Al-Kindi uso exactamente chi-cuadrada, estos porcentajes o esta formula de confianza.
