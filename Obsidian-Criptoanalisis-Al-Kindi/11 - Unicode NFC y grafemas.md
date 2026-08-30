---
aliases: [Unicode, NFC, Grafemas]
tags: [unicode, texto, normalizacion]
---

# Unicode NFC y grafemas

## Tres niveles distintos

1. **Unidad UTF-16:** elemento interno usado por strings de JavaScript.
2. **Punto de código:** valor Unicode abstracto.
3. **Grafema:** unidad percibida como un carácter por una persona.

Un emoji o una letra con marca combinada puede ocupar múltiples unidades y puntos de código.

## NFC

`normalizeUnicode` ejecuta `.normalize('NFC')`. NFC aplica descomposición canónica y recomposición para dar una representación estable a secuencias equivalentes.

```text
é ≈ e + ◌́
```

Esto es crítico antes de detectar duplicados en [[10 - Charset personalizado]].

## Segmentación

`toGraphemes` usa:

```js
new Intl.Segmenter('es', { granularity: 'grapheme' })
```

El fallback `Array.from` preserva puntos de código, pero no todas las secuencias gráficas complejas.

## Fuentes normativas

- [Unicode UAX #15: Normalization Forms](https://unicode.org/reports/tr15/)
- [Unicode UAX #29: Text Segmentation](https://unicode.org/reports/tr29/)
- [ECMA-402: Intl.Segmenter](https://402.ecma-international.org/)

## Riesgos restantes

- homoglifos entre alfabetos;
- secuencias ZWJ complejas en entornos sin `Intl.Segmenter`;
- diferencias de presentación por fuente o plataforma.

Relacionado: [[12 - Validacion y limites]] y [[16 - Modelo de amenazas]].
