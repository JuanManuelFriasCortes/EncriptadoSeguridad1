# Complejidad computacional

## Notacion

- `N`: numero de grafemas del conjunto.
- `M`: numero de grafemas del mensaje.
- `A`: numero de letras del modelo español (27).
- `P`: cantidad de patrones/n-gramas configurados.
- `W`: cantidad de palabras encontradas.

`A` y `P` son constantes en la version actual, pero se mantienen en las formulas para entender el origen del costo.

## Unicode

`normalizeUnicode` recorre la cadena: aproximadamente `O(M)`. `toGraphemes` segmenta y crea un arreglo: `O(M)` tiempo y memoria `O(M)`, sujeto a la implementacion de `Intl.Segmenter`.

## Validacion del conjunto

Recorre `N` grafemas, con operaciones promedio `O(1)` en Set. `duplicates.includes` puede recorrer la lista de duplicados; en peor caso añade comportamiento cuadratico, aunque `N <= 128`.

Tiempo practico `O(N)`; peor caso conservador `O(N^2)`. Memoria `O(N)`.

## Validacion del mensaje

Normaliza y segmenta: `O(M)` tiempo y `O(M)` memoria por el arreglo temporal.

## Una transformacion

`transform`:

1. obtiene arreglo del conjunto `O(N)`;
2. construye Map `O(N)`;
3. segmenta texto `O(M)`;
4. mapea y une `O(M)`.

Tiempo `O(N + M)`. Memoria auxiliar `O(N + M)` contando arreglo/resultado.

## Scoring de un candidato

- plegado y segmentacion: `O(M)`;
- filtros de letras/palabras/conteos: `O(M)`;
- bucle de frecuencias: `O(A)`;
- lexico: `O(W)` promedio gracias a Set;
- n-gramas: busquedas repetidas para `P` patrones;
- regex improbables: normalmente proporcional a `P*M`, dependiente del motor/patron;
- controles: `O(M)`.

En practica, con patrones cortos fijos, se aproxima a `O(P*M + A)`. Un limite teorico prudente para llamadas repetidas a `indexOf` es mayor y puede acercarse a `O(P*M^2)` en implementaciones/casos adversos. Los patrones actuales son simples y `P` fijo, pero no conviene llamar al costo “solo una operacion por caracter”.

Memoria: `O(M + A + W)` por arreglos, palabras y conteos.

## Ranking completo

Hay `N + 1` candidatos. Para cada uno se crea un texto y se puntua.

Tiempo aproximado:

```text
O((N+1) * (N + M + score(M)) + N log N)
```

El ultimo termino es el ordenamiento de candidatos. Si scoring se trata como lineal para patrones fijos:

```text
O(N * (N + M) + N log N)
```

Para mensajes largos domina aproximadamente `O(N*M)`.

## Memoria del ranking

Cada candidato conserva `plaintext` y analisis. En el peor caso:

```text
O((N+1) * M)
```

mas estructuras temporales. Con los maximos teoricos, esta retencion puede ser relevante aun cuando la cota de operaciones pase.

## Limite implementado

```text
M * (N + 1) <= 1,500,000
```

Es un proxy del numero de caracteres candidatos. Ventajas: barato, determinista y se evalua antes de trabajo pesado. Limitacion: no incluye costo de `scoreSpanish`, regex, asignaciones, garbage collection ni velocidad del dispositivo.

## Ejemplos

| `M` | `N` | candidatos | estimacion |
|---:|---:|---:|---:|
| 100 | 27 | 28 | 2,800 |
| 1,000 | 27 | 28 | 28,000 |
| 10,000 | 27 | 28 | 280,000 |
| 10,000 | 128 | 129 | 1,290,000 |
| 12,000 | 128 | 129 | 1,548,000, rechazado |

## Costos de React

Escribir en campos provoca renderizacion y validacion memorizada del conjunto solo cuando este cambia. `CharacterCount` segmenta cada valor en cada render en que se ejecuta. Para mensajes grandes, contar grafemas tambien tiene costo `O(M)`.

## Optimizaciones posibles

1. Reutilizar una instancia de `Intl.Segmenter`.
2. Reutilizar el Map del conjunto entre candidatos.
3. Puntuar en flujo y conservar solo los dos mejores, reduciendo memoria.
4. Evitar regenerar transformaciones iguales en alfabetos degenerados.
5. Ejecutar en Web Worker.
6. Permitir cancelacion cuando cambia entrada.
7. Benchmark para sustituir cota aproximada por presupuesto medido.

## Cuidado con optimizar

No debe sacrificarse correccion Unicode ni claridad sin medidas. La primera mejora de rendimiento deberia acompañarse de pruebas de equivalencia y perfiles que identifiquen el cuello real.
