---
aliases: [Formulario, Fórmulas]
tags: [formulas, referencia]
---

# Fórmulas rápidas

## Normalizar shift

```text
s' = ((s mod N) + N) mod N
```

## César

```text
E(i) = (i + s') mod N
D(i) = (i - s' + N) mod N
```

## Atbash

```text
A(i) = N - 1 - i
A(A(i)) = i
```

## Candidatos

```text
total = N César + 1 Atbash = N + 1
```

## Complejidad aproximada

```text
operaciones = L × (N + 1)
límite = 1,500,000
```

## Chi-cuadrada

```text
χ² = Σ ((Oᵢ - Eᵢ)² / Eᵢ)
```

## Log-verosimilitud

```text
LL = Σ Oᵢ × log(pᵢ)
```

## Score

```text
score = frequency + lexical + ngrams + vowel + spaces
      - structurePenalty - controlPenalty
```

## Separación

```text
separation = 1 - exp(-max(0, margin) / 15)
```

## Referencias

[[04 - Cifrado Cesar]], [[05 - Cifrado Atbash]], [[07 - Scoring del español]], [[08 - Chi-cuadrada y log-verosimilitud]], [[18 - Ambiguedad y confianza]].
