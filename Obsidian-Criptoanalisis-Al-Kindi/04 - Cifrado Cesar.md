---
aliases: [César, Caesar cipher]
tags: [cifrado, sustitucion, matematica]
---

# Cifrado César

## Definición

César es una sustitución monoalfabética por desplazamiento. En este proyecto no está limitado a 26 letras: opera sobre [[10 - Charset personalizado]].

## Fórmulas

Para índice `i`, shift `s` y tamaño `N`:

```text
E(i) = (i + s) mod N
D(i) = (i - s + N) mod N
```

El shift se normaliza con:

```text
((s mod N) + N) mod N
```

El segundo módulo corrige el residuo negativo de JavaScript.

## Implementación

`lib/crypto/ciphers.js` contiene:

- `normalizeShift`;
- `caesarEncrypt`;
- `caesarDecrypt`;
- `transform`, reutilizada por todos los cifrados.

`transform` usa un `Map` para encontrar índices en tiempo promedio constante y conserva grafemas externos.

## Ejemplo

```text
Charset: ABCDE
Shift:   2
ABCDE -> CDEAB
```

## Seguridad

Solo existen `N` claves posibles. [[03 - Descifrado automatico]] puede probarlas todas. Además, la sustitución conserva patrones estadísticos, por lo que es vulnerable a [[06 - Al-Kindi y analisis de frecuencias]].

## Conexiones

- Inversa conceptual: `caesarDecrypt`.
- Texto robusto: [[11 - Unicode NFC y grafemas]].
- Riesgos: [[16 - Modelo de amenazas]].
