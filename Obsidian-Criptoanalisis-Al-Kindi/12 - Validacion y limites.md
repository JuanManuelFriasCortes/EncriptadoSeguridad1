---
aliases: [Validación, Límites defensivos]
tags: [validacion, seguridad, dos]
---

# Validación y límites

## Principio

Toda entrada del usuario es no confiable. Validar no significa que se pueda convertir en HTML; significa comprobar precondiciones y mantener el costo acotado.

## Límites

| Dato | Límite |
| --- | ---: |
| Charset mínimo | 2 grafemas |
| Charset máximo | 128 grafemas |
| Mensaje máximo | 12,000 grafemas |
| Operaciones aproximadas | 1,500,000 |

## Funciones

### `validateCharset`

Normaliza con [[11 - Unicode NFC y grafemas]], busca duplicados, whitespace y tamaño inválido.

### `validateMessage`

Exige mensaje, normaliza y cuenta grafemas.

### `validateAnalysisComplexity`

```text
L × (N + 1) <= 1,500,000
```

Protege el hilo principal durante [[03 - Descifrado automatico]].

### `InputValidationError`

Representa un fallo esperado con mensajes aptos para la UI. No expone stack traces.

## Qué no hace

La validación no intenta “sanitizar HTML” porque el sistema no interpreta HTML. La defensa principal contra XSS es usar salidas de texto seguras; consulta [[17 - XSS CSP y headers]].

## Riesgo restante

Cerca del límite, un equipo lento puede notar una pausa porque el análisis es síncrono. Una mejora sería mover scoring a un Web Worker; véase [[21 - Limitaciones y mejoras]].
