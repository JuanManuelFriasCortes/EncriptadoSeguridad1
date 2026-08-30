---
aliases: [Charset, Alfabeto personalizado]
tags: [charset, unicode, configuracion]
---

# Charset personalizado

## Qué es

Una secuencia ordenada de grafemas. El orden determina los índices de [[04 - Cifrado Cesar]] y los pares de [[05 - Cifrado Atbash]].

No debe confundirse con un `Set`: dos charsets con los mismos símbolos en distinto orden producen cifrados distintos.

## Presets

`lib/crypto/constants.js` ofrece:

- español en mayúsculas;
- letras españolas y números;
- minúsculas con acentos;
- emojis.

Son ejemplos editables, no restricciones.

## Reglas

- mínimo: 2 grafemas;
- máximo: 128;
- sin duplicados canónicos;
- sin whitespace;
- cualquier grafema externo al charset se conserva.

## Por qué no se eliminan duplicados

Eliminar uno de forma silenciosa cambiaría los índices y podría hacer imposible reproducir el cifrado esperado. [[12 - Validacion y limites]] devuelve un error explícito.

## Unicode

El conteo usa [[11 - Unicode NFC y grafemas]], no `text.length`.

## Riesgo

Dos símbolos visualmente parecidos pueden pertenecer a alfabetos diferentes. NFC no corrige homoglifos. Véase [[16 - Modelo de amenazas]].
