---
aliases: [Preguntas para exposición, Autoevaluación]
tags: [estudio, examen, preguntas]
---

# Preguntas de examen

## Arquitectura

1. ¿Por qué la lógica criptográfica está separada de React?
2. ¿Qué función cumple `lib/crypto/index.js`?
3. ¿Qué diferencia existe entre `npm run dev`, `npm run build` y `npm start`?
4. ¿Qué datos conserva `CryptoWorkbench` en estado?

## Cifrados

5. ¿Cómo se calcula César para un charset de tamaño `N`?
6. ¿Por qué se usa `((s % N) + N) % N`?
7. ¿Por qué Atbash sirve para cifrar y descifrar?
8. ¿Qué sucede con un espacio ausente del charset?
9. ¿Qué significa que el charset sea ordenado?

## Unicode

10. ¿Qué diferencia existe entre unidad UTF-16, punto de código y grafema?
11. ¿Por qué se aplica NFC?
12. ¿Qué ventaja aporta `Intl.Segmenter` frente a `text[i]`?
13. ¿Qué limitación tiene el fallback `Array.from`?

## Detector

14. ¿Cuántos candidatos se generan para tamaño `N`?
15. ¿Qué señales contiene `scoreSpanish`?
16. ¿Qué mide chi-cuadrada?
17. ¿Qué información adicional aportan n-gramas?
18. ¿Cómo se desempatan scores idénticos?
19. ¿Por qué el porcentaje de confianza no es probabilidad matemática?
20. ¿Por qué un mensaje corto es difícil?

## Seguridad

21. ¿Qué evita que `<script>` se ejecute?
22. ¿Por qué CSP es defensa adicional y no la única defensa?
23. ¿Qué evita `frame-ancestors 'none'`?
24. ¿Cómo se evita congelar el navegador?
25. ¿Se guardan o envían mensajes?
26. ¿Qué riesgo permanece por las dependencias npm?
27. ¿Por qué César y Atbash no protegen secretos?

## Respuestas breves

> [!abstract]- Ver respuestas
> 1. Permite probar y razonar el motor sin DOM y evita mezclar responsabilidades.
> 2. Reexporta la API interna desde un punto único.
> 3. Desarrollo con recarga, generación del artefacto y servicio del artefacto.
> 4. Charset, entradas, método, shift, resultados, errores y estado de copia.
> 5. `(i+s) mod N`; para descifrar `(i-s+N) mod N`.
> 6. Corrige shifts negativos y los lleva a `[0,N-1]`.
> 7. Porque `N-1-(N-1-i)=i`.
> 8. Se conserva intacto.
> 9. Sus posiciones definen las sustituciones.
> 10. Codificación interna, valor abstracto y carácter percibido.
> 11. Para unificar representaciones canónicamente equivalentes.
> 12. Mantiene unidos grafemas complejos.
> 13. Puede separar secuencias con varios puntos de código.
> 14. `N+1`.
> 15. Frecuencia, chi-cuadrada, log-verosimilitud, léxico, n-gramas, vocales, espacios y penalizaciones.
> 16. Distancia entre conteos observados y esperados.
> 17. El orden local de las letras.
> 18. Palabras reconocidas, preferencia determinista por Atbash y menor shift.
> 19. Es una escala heurística sin calibración probabilística.
> 20. Aporta poca evidencia y permite más hipótesis plausibles.
> 21. Renderizado JSX como texto y ausencia de sinks HTML.
> 22. No corrige una aplicación que inserte HTML peligroso.
> 23. Clickjacking mediante frames.
> 24. Límites de charset, mensaje y operaciones.
> 25. No por el flujo implementado; viven en memoria.
> 26. Una dependencia comprometida podría ejecutar código.
> 27. Tienen espacios de clave pequeños y conservan patrones estadísticos.

Consulta [[23 - Ruta de estudio]] si alguna respuesta no resulta natural.
