---
aliases: [Atbash]
tags: [cifrado, sustitucion, involucion]
---

# Cifrado Atbash

## Definición

Atbash reemplaza cada elemento del charset por el elemento simétrico desde el extremo opuesto.

```text
f(i) = N - 1 - i
```

## Involución

Aplicar la función dos veces devuelve el índice original:

```text
f(f(i)) = N - 1 - (N - 1 - i) = i
```

Por eso `atbashTransform` cifra y descifra.

## Ejemplo

```text
Charset: ABCDE
Mapa:    A↔E, B↔D, C↔C
```

## Código

En `lib/crypto/ciphers.js`:

```js
return transform(text, charset, (index, size) => size - 1 - index);
```

Reutiliza la misma segmentación y conservación de caracteres externos que [[04 - Cifrado Cesar]].

## Seguridad

No tiene clave secreta variable: conocido el charset, la transformación está completamente definida. [[03 - Descifrado automatico]] solo necesita generar un candidato Atbash.

## Conexiones

- Charset: [[10 - Charset personalizado]].
- Estadística: [[07 - Scoring del español]].
- Ambigüedad: [[18 - Ambiguedad y confianza]].
