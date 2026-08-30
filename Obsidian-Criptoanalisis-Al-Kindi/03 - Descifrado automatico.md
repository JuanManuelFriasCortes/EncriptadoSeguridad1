---
aliases: [Detector automático, Criptoanálisis automático]
tags: [criptoanalisis, algoritmo, ranking]
---

# Descifrado automático

## Contrato

Entrada:

- ciphertext;
- charset ordenado.

Salida:

- algoritmo detectado;
- shift si es César;
- plaintext ganador;
- confianza estimada.

Nunca pide al usuario que elija un candidato.

## Algoritmo

Para `N` grafemas se generan `N + 1` candidatos:

```text
Atbash: 1 candidato
César:  N candidatos, shift 0..N-1
```

Cada plaintext se envía a [[07 - Scoring del español]]. Después se ordenan todos con estas reglas:

1. score descendente;
2. más palabras reconocidas;
3. Atbash en empate exacto entre algoritmos;
4. menor shift como último desempate.

El desempate hace al sistema determinista; no demuestra cuál cifrado se usó realmente.

## Funciones

- `rankCandidates(ciphertext, charset)`: produce y ordena la lista interna.
- `analyzeCiphertext(rawCiphertext, rawCharset)`: valida, toma los dos mejores y devuelve solo el primero.
- `estimateConfidence(best, second)`: usa margen, evidencia, calidad y separación.

## Complejidad

Si `L` es la longitud y `N` el charset, el trabajo principal crece aproximadamente como:

```text
O(L × (N + 1))
```

Por eso existe [[12 - Validacion y limites]].

## Fundamento

La decisión implementa las ideas de [[06 - Al-Kindi y analisis de frecuencias]] y las amplía con [[09 - N-gramas y señales lingüisticas]].

## Límite epistemológico

Consulta [[18 - Ambiguedad y confianza]]: una salida única cumple el requisito de interfaz, pero no elimina la ambigüedad matemática.
