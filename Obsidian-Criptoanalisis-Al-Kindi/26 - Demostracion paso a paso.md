---
aliases: [Demo, Guion de exposición]
tags: [demostracion, exposicion]
---

# Demostración paso a paso

## Preparación

```powershell
npm install
npm run dev
```

Abrir `http://localhost:3000/`.

## Demo César

1. Mantener charset español.
2. Escribir: `ESTE MENSAJE DE PRUEBA CONTIENE PALABRAS COMUNES DEL ESPAÑOL`.
3. Elegir César y shift `3`.
4. Pulsar Cifrar.
5. Copiar el ciphertext.
6. Pegar en Descifrado automático.
7. Pulsar Analizar y descifrar.
8. Mostrar algoritmo César, shift 3, plaintext y confianza.

## Demo Atbash

1. Escribir: `LA SEGURIDAD DEL SISTEMA DEPENDE DE VALIDAR CADA ENTRADA`.
2. Elegir Atbash.
3. Cifrar y copiar.
4. Pegar sin informar el algoritmo.
5. Analizar y mostrar la única respuesta.

## Demo Unicode

1. Elegir preset de emojis o minúsculas acentuadas.
2. Mostrar el conteo por grafemas.
3. Explicar [[11 - Unicode NFC y grafemas]].

## Explicación de 30 segundos

“El detector crea Atbash y todos los desplazamientos César internamente. Cada resultado recibe un score de español que combina frecuencias, chi-cuadrada, palabras, n-gramas, vocales, espacios y penalizaciones. Se muestra únicamente el mejor y una confianza calculada por separación y evidencia.”

## Cierre de seguridad

Mencionar [[19 - Privacidad y procesamiento local]], [[17 - XSS CSP y headers]] y que ambos cifrados son educativos.
