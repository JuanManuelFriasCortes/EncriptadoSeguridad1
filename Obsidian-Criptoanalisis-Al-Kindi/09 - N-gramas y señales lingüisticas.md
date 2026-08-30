---
aliases: [N-gramas, Modelo lingüístico]
tags: [linguistica, ngramas, scoring]
---

# N-gramas y señales lingüísticas

## N-grama

Secuencia contigua de `n` elementos. En este proyecto los elementos son letras plegadas:

- bigrama: 2 letras;
- trigrama: 3 letras;
- secuencia más larga: contexto adicional.

## Por qué complementa frecuencias

Dos cadenas pueden contener cantidades similares de `a`, `e`, `s` y `r`, pero solo una puede ordenar esas letras como español. [[08 - Chi-cuadrada y log-verosimilitud]] ve cantidades; los n-gramas ven orden local.

## Señales implementadas

### Palabras comunes

`COMMON_WORDS` es una señal auxiliar. Se bonifica proporción y cantidad reconocida, sin exigir que todas las palabras estén en la lista.

### N-gramas frecuentes

`SPANISH_NGRAMS` asigna pesos a combinaciones representativas. Cada aparición suma evidencia.

### Vocales

Se premia una proporción cercana a `0.47`.

### Espacios

Se premia una proporción cercana a `0.15` en textos con suficiente longitud.

### Patrones improbables

`IMPROBABLE_PATTERNS` y palabras largas sin vocales restan puntos.

### Palabras de una letra

Solo `a`, `e`, `o`, `u`, `y` se aceptan sin penalización.

## Evitar sobreajuste

No debe añadirse una condición como `if (ciphertext === X)`. Una mejora válida debe expresar una propiedad general del español o ampliar datos lingüísticos de manera independiente.

## Relacionado

[[07 - Scoring del español]], [[06 - Al-Kindi y analisis de frecuencias]], [[21 - Limitaciones y mejoras]].
