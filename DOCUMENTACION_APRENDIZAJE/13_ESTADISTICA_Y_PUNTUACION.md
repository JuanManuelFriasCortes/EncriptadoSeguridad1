# Estadistica y sistema de puntuacion

## Objetivo

`scoreSpanish(candidate)` asigna un numero comparable a cada texto. Un numero mayor representa mayor compatibilidad con las heuristicas de español. No tiene unidad fisica ni interpretacion probabilistica directa.

## Preprocesamiento

```text
candidate
 -> foldSpanish
 -> graphemes
 -> letters conocidas
 -> words con /[a-zñ]+/
 -> substantialWords: longitud > 1
```

Las palabras de una letra se conservan para penalizaciones, pero no cuentan como palabras sustanciales.

## Conteos

Se crea un objeto con todas las letras inicializadas en cero. Luego se incrementa una por una. Esto garantiza que letras ausentes participen en chi-cuadrada con observado cero.

## Componente de frecuencia

Para `letterCount >= 5`:

```text
averageLogLikelihood = logLikelihood / letterCount
frequency = clamp(
  (averageLogLikelihood + 4.35) * 28 - sqrt(chiSquare) * 0.9,
  -65,
  42
)
```

La log-verosimilitud premia letras plausibles y `sqrt(chiSquare)` penaliza desviacion. La raiz reduce el crecimiento extremo. Los limites evitan que esta unica señal domine sin cota.

Con menos de cinco letras, `frequency = 0`.

## Componente lexico

```text
recognizedRatio = reconocidas / max(1, palabrasSustanciales)
lexical = min(72, recognizedRatio * 58 + reconocidas * 2.4)
```

La proporcion evita premiar igual una palabra reconocida entre una y entre veinte. El conteo absoluto añade evidencia adicional. El maximo es 72.

## Componente de n-gramas

Se suma el peso de cada aparicion. Despues:

```text
ngramScore = min(52,
  ngramWeight / max(8, sqrt(letterCount) * 2.4) * 10
)
```

El denominador escala con longitud para que mensajes largos no ganen solo por tener mas posiciones. El maximo es 52.

## Vocales

```text
vowelRatio = vocales / max(1, letras)
vowelScore = max(-30, 18 - abs(vowelRatio - 0.47) * 115)
```

Se aplica desde cinco letras. La mejor contribucion es 18 cuando la proporcion es exactamente 0.47. Una desviacion puede volverla negativa, con piso -30.

## Espacios

```text
spaceRatio = espacios / max(1, grafemas)
spaceScore = max(-20, 10 - abs(spaceRatio - 0.15) * 70)
```

Se aplica desde 12 grafemas. El maximo es 10 y el piso -20.

## Penalizacion estructural

Por cada palabra:

- longitud uno y no pertenecer a `{a,e,o,u,y}`: `+5` de penalizacion;
- longitud al menos cuatro y sin `a,e,i,o,u`: `+min(12, longitud*1.5)`.

Cada coincidencia con un patron improbable añade 7. La penalizacion estructural se limita a 75.

## Penalizacion de controles

Se penalizan codigos 0-8, 11, 12, 14-31 y 127 con 12 puntos cada uno. Se permiten tabulacion, salto de linea y retorno porque quedaron fuera de esos intervalos de penalizacion, aunque no pueden formar parte del conjunto.

## Formula total

```text
score = frequency
      + lexical
      + ngramScore
      + vowelScore
      + spaceScore
      - structurePenalty
      - controlPenalty
```

El resultado se redondea a seis decimales. El detalle devuelve cada componente para depuracion, aunque la interfaz normal no lo muestra.

## Evidencia

```text
evidence = min(1,
  (letterCount / 55) * 0.65
  + (substantialWords / 10) * 0.35
)
```

55 letras aportarian 0.65 y diez palabras 0.35. Puede llegar a uno antes o despues segun la combinacion. No mide calidad, solo volumen estructurado aproximado.

## Ejemplo conceptual comparativo

Candidato A: `ESTE ES UN MENSAJE DE PRUEBA`.

- varias palabras comunes;
- n-gramas `est`, `este`, `es`, `un`, `de`;
- vocales y espacios plausibles;
- pocas penalizaciones.

Candidato B: `QXZW QÑ WK XQKJFLX ZQ HVKXUX`.

- casi ninguna palabra reconocida;
- secuencias consonanticas;
- `q` sin `u`;
- proporcion de vocales baja.

Aunque algunas letras de B coincidan con frecuencias globales por azar, A acumula señales independientes.

## Independencia imperfecta

Las señales no son estadisticamente independientes. Palabras comunes tambien contienen n-gramas frecuentes y buenas proporciones de vocales. Sumarlas puede contar evidencia relacionada varias veces. El sistema es una funcion heuristica diseñada para clasificar, no un modelo probabilistico formal.

## Sensibilidad a pesos

Modificar 58, 2.4, 52, 0.47, 0.15 o las penalizaciones cambia el ranking. Un ajuste debe evaluarse contra un corpus separado; optimizar con los mismos ejemplos usados para diseñar pesos causa sobreajuste.

## Empates y precision

`score.toFixed(6)` estabiliza la representacion retornada, pero el ordenamiento usa el score ya redondeado porque `analysis.score` es ese valor. Textos con diferencia menor a una millonésima empatan y pasan a criterios secundarios.

## Interpretacion correcta

- Score alto: buen ajuste a las reglas implementadas.
- Margen alto: el ganador se separo del segundo.
- Evidencia alta: habia material suficiente segun longitud/palabras.
- Confianza alta: los tres aspectos superaron umbrales.

Ninguno demuestra verdad semantica.
