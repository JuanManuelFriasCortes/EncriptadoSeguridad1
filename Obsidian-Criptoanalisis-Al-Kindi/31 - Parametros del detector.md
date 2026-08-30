---
aliases: [Pesos del scoring, Parámetros heurísticos]
tags: [scoring, parametros, auditoria]
---

# Parámetros del detector

Esta nota registra los números de la implementación actual. Son decisiones heurísticas ajustadas para separar candidatos en español; no son constantes universales.

## Frecuencias esperadas (%)

| Letra | % | Letra | % | Letra | % |
| --- | ---: | --- | ---: | --- | ---: |
| a | 12.53 | j | 0.44 | r | 6.87 |
| b | 1.42 | k | 0.02 | s | 7.98 |
| c | 4.68 | l | 4.97 | t | 4.63 |
| d | 5.86 | m | 3.15 | u | 3.93 |
| e | 13.68 | n | 6.71 | v | 0.90 |
| f | 0.69 | ñ | 0.31 | w | 0.02 |
| g | 1.01 | o | 8.68 | x | 0.22 |
| h | 0.70 | p | 2.51 | y | 0.90 |
| i | 6.25 | q | 0.88 | z | 0.52 |

## Score de frecuencia

```text
averageLL = logLikelihood / letterCount
frequency = clamp((averageLL + 4.35) × 28 - sqrt(χ²) × 0.9, -65, 42)
```

Con menos de cinco letras, `frequency = 0`.

## Léxico

```text
recognizedRatio = recognizedWords / max(1, substantialWords)
lexical = min(72, recognizedRatio × 58 + recognizedWords × 2.4)
```

El léxico contiene palabras funcionales frecuentes y vocabulario general/técnico del dominio. No es un diccionario completo.

## N-gramas y pesos

| N-gramas principales | Peso |
| --- | ---: |
| `cion`, `iento` | 4.0 |
| `que` | 3.6 |
| `para` | 3.2 |
| `esta` | 3.0 |
| `como` | 2.8 |
| `mien`, `ando` | 2.7 |
| `ent`, `ion`, `ente` | 2.5 |
| `est` | 2.4 |
| `del`, `cio` | 2.3 |
| `los`, `las` | 2.2 |
| `con` | 2.1 |
| `por`, `una` | 2.0 |
| `ado` | 1.8 |
| bigramas comunes restantes | 0.7 a 1.5 |

```text
ngramScore = min(52,
  ngramWeight / max(8, sqrt(letterCount) × 2.4) × 10)
```

Las apariciones superpuestas cuentan porque el cursor avanza una posición.

## Vocales

```text
vowelScore = max(-30, 18 - abs(vowelRatio - 0.47) × 115)
```

Con menos de cinco letras se neutraliza a cero.

## Espacios

```text
spaceScore = max(-20, 10 - abs(spaceRatio - 0.15) × 70)
```

Con menos de 12 grafemas se neutraliza a cero.

## Penalizaciones

- palabra de una letra no permitida: `+5` de penalización;
- palabra de cuatro o más letras sin vocal: hasta `12`;
- cada patrón improbable: `+7`;
- penalización estructural total: máximo `75`;
- cada carácter de control prohibido: `+12`.

## Evidencia

```text
evidence = min(1,
  (letterCount / 55) × 0.65
  + (substantialWords / 10) × 0.35)
```

## Confianza

```text
margin = best.score - second.score
quality = clamp((best.score + 35) / 125, 0, 1)
separation = 1 - exp(-max(0, margin) / 15)
percentage = round(100 × min(0.98,
  0.18 + evidence×0.34 + quality×0.22 + separation×0.24))
```

Umbrales:

| Nivel | Condiciones mínimas |
| --- | --- |
| Alta | evidencia 0.62, margen 12, porcentaje 72 |
| Media | evidencia 0.30, margen 4, porcentaje 50 |
| Baja | cualquier otro caso |

## Interpretación

Los caps impiden que una señal domine sin límite. Los pesos combinan señales generales, pero deben evaluarse con corpus separado si se modifican. Relaciona esta nota con [[07 - Scoring del español]], [[18 - Ambiguedad y confianza]] y [[20 - Desarrollo y verificacion]].
