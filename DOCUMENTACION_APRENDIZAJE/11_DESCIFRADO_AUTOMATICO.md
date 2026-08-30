# Descifrado automatico

## Definicion operacional

En este proyecto, “automatico” significa que el usuario no elige entre candidatos. Proporciona texto cifrado y el conjunto; el sistema prueba Atbash y todos los desplazamientos Cesar, evalua las salidas y muestra una sola.

No significa que el resultado sea infalible. Es una clasificacion heuristica.

## Espacio de busqueda

Para conjunto de tamaño `N`:

```text
candidatos = 1 Atbash + N Cesar = N + 1
```

Con el preajuste español mayusculo hay 27 letras, por tanto 28 candidatos. Con el maximo permitido de 128 grafemas hay 129.

## `rankCandidates`

La funcion recibe texto ya normalizado y arreglo validado. Primero transforma con Atbash, crea un objeto y ejecuta `scoreSpanish`. Despues itera desplazamientos desde cero hasta `charset.length - 1`, descifra y puntua cada salida.

Forma de un candidato:

```js
{
  algorithm: 'caesar' | 'atbash',
  shift: number | null,
  plaintext: string,
  analysis: {
    score: number,
    evidence: number,
    details: { ... }
  }
}
```

Atbash usa `shift: null` porque el dato no aplica, no porque se desconozca.

## Seleccion

Los candidatos se ordenan con cuatro niveles:

1. mayor `analysis.score`;
2. mayor `recognizedWords`;
3. Atbash primero ante empate entre algoritmos;
4. menor desplazamiento ante empate Cesar.

La salida de `rankCandidates` si contiene todos los candidatos. Sin embargo, `analyzeCiphertext` extrae solo `[best, second]` y devuelve un objeto construido a partir de `best`. La interfaz nunca recibe el arreglo completo cuando usa la API normal.

## Por que se conserva el segundo

El segundo no se muestra, pero su score permite calcular el margen:

```text
margin = best.score - second.score
```

Un buen score aislado es menos convincente si otro candidato obtuvo casi lo mismo. El margen mide separacion relativa.

## Estimacion de confianza

### Evidencia

Proviene de longitud en letras y cantidad de palabras. Un texto largo ofrece mas observaciones.

### Calidad

```text
quality = clamp((best.score + 35) / 125, 0, 1)
```

Traduce aproximadamente el score absoluto a `0..1`.

### Separacion

```text
separation = 1 - exp(-max(0, margin) / 15)
```

Crece rapido al principio y se satura.

### Porcentaje

```text
100 * min(0.98,
  0.18
  + evidence * 0.34
  + quality * 0.22
  + separation * 0.24)
```

Se redondea. La base de 18 % evita cero absoluto y el limite de 98 % evita expresar certeza total.

### Nivel

- `alta`: evidencia al menos `0.62`, margen al menos `12` y porcentaje al menos `72`.
- `media`: evidencia al menos `0.30`, margen al menos `4` y porcentaje al menos `50`.
- `baja`: cualquier otro caso.

El nivel requiere condiciones conjuntas. Un porcentaje aparentemente alto no basta si no hay evidencia o margen.

## Validacion previa

`analyzeCiphertext` no asume que la UI hizo su trabajo. Valida conjunto y mensaje, concatena errores y lanza `InputValidationError`. Luego calcula:

```text
operations = messageLength * (charsetLength + 1)
```

Si supera 1,500,000, rechaza el analisis antes de generar candidatos.

## Por que puede equivocarse

La funcion objetivo premia español comun. Puede elegir mal cuando:

- el mensaje es demasiado corto;
- contiene nombres, tecnicismos o abreviaturas fuera del lexico;
- no esta en español;
- carece de espacios;
- el conjunto es incorrecto o esta reordenado;
- varias salidas son linguisticamente plausibles;
- el texto es aleatorio;
- el cifrado no es Cesar ni Atbash.

## Unica linea versus transparencia

El requisito de mostrar una sola linea evita intervencion humana, pero reduce auditabilidad. El sistema compensa parcialmente mostrando algoritmo, desplazamiento y confianza. Internamente conserva detalles de score que podrian usarse en un modo docente, pero la interfaz no los expone.

## Determinismo

Misma entrada, mismo conjunto y mismo codigo producen la misma salida. No hay aleatoriedad ni servicio remoto. El diccionario, frecuencias, pesos y desempates estan fijados en el repositorio.

## Distincion crucial

El programa identifica **el candidato mejor puntuado bajo su modelo**, no demuestra **el texto original historico**. Esa formulacion es la respuesta tecnicamente correcta ante una defensa academica.
