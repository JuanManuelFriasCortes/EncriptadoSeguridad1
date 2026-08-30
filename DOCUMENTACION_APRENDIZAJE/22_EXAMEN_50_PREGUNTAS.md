# Examen de 50 preguntas

Responde sin consultar la clave. Las respuestas estan separadas al final.

## Preguntas

1. ¿Que dos algoritmos clasicos implementa el sistema?
2. ¿Que dato define los indices sobre los que operan ambos cifrados?
3. ¿Cual es el tamaño minimo permitido para el conjunto?
4. ¿Cual es el tamaño maximo permitido para el conjunto?
5. ¿Cual es el maximo de grafemas de un mensaje?
6. Escribe la formula de cifrado Cesar.
7. Escribe la formula de descifrado Cesar.
8. Normaliza `-1` para un conjunto de tamaño 5.
9. Normaliza `17` para un conjunto de tamaño 5.
10. Escribe la formula de Atbash.
11. ¿Por que Atbash se descifra con la misma funcion?
12. ¿Que pasa con el centro de un conjunto impar en Atbash?
13. ¿Que ocurre con un grafema fuera del conjunto?
14. ¿Por que un conjunto con duplicados es invalido?
15. ¿Que forma Unicode usa primero el sistema?
16. ¿Que API divide grafemas cuando esta disponible?
17. ¿Cual es el fallback de segmentacion?
18. ¿Cuantos candidatos produce un conjunto de 27 caracteres?
19. ¿Que desplazamientos Cesar prueba el analizador para tamaño `N`?
20. ¿Que valor de shift guarda un candidato Atbash?
21. Enumera los cuatro criterios de ordenamiento en orden.
22. ¿Que dos candidatos usa `estimateConfidence`?
23. Define el margen.
24. ¿Que mide `evidence`?
25. ¿Es la confianza una probabilidad calibrada? Explica.
26. ¿Que significa una chi-cuadrada menor?
27. ¿Para que se usa log-verosimilitud?
28. ¿Que es un n-grama? Da un ejemplo del proyecto.
29. ¿Que rango de letras reconoce la regex de palabras?
30. ¿Como evita el proyecto convertir `ñ` en `n`?
31. ¿Cual es la proporcion objetivo de vocales?
32. ¿Cual es la proporcion objetivo de espacios?
33. ¿Cuanto penaliza un caracter de control no permitido?
34. ¿Cual es el limite de penalizacion estructural?
35. Escribe la formula total del score por nombres de componentes.
36. ¿Que funcion publica devuelve la lista completa de candidatos?
37. ¿Que funcion publica devuelve solo una respuesta?
38. ¿Que error lanza el analizador ante entradas invalidas?
39. ¿Como se estima la carga antes del analisis?
40. ¿Que ocurre si se supera esa carga?
41. ¿Que hook memoriza la validacion del conjunto?
42. ¿Por que `shift` se guarda inicialmente como string en React?
43. ¿Que funcion une clases condicionales y conflictos Tailwind?
44. ¿Donde se cargan los estilos globales?
45. ¿Existe `index.html` escrito manualmente?
46. Menciona dos defensas HTTP configuradas.
47. ¿Cual es la principal debilidad de `script-src` actual?
48. ¿Hay pruebas automatizadas en el repositorio actual?
49. ¿Por que Cesar/Atbash siguen siendo inseguros aunque la web use CSP?
50. Formula una afirmacion tecnicamente honesta sobre el resultado automatico.

---

## Respuestas

1. Cesar y Atbash.
2. El conjunto Unicode ordenado (`charset`).
3. Dos grafemas.
4. 128 grafemas.
5. 12,000 grafemas.
6. `(i + k) mod N`.
7. `(i - k + N) mod N`.
8. `4`.
9. `2`.
10. `N - 1 - i`.
11. Porque es una involucion: aplicar la reflexion dos veces devuelve el indice original.
12. Se transforma en si mismo.
13. Se conserva sin cambios.
14. Porque rompe la relacion unica entre simbolo e indice y puede impedir la inversion correcta.
15. NFC.
16. `Intl.Segmenter` con granularidad `grapheme`.
17. `Array.from(normalized)`.
18. 28: 27 Cesar y uno Atbash.
19. Todos los enteros desde `0` hasta `N - 1`.
20. `null`, porque no aplica.
21. Score descendente, palabras reconocidas descendente, Atbash primero, shift menor primero.
22. El mejor y el segundo candidato.
23. `best.score - second.score`.
24. La cantidad aproximada de material linguistico disponible segun letras y palabras.
25. No; es una combinacion heuristica de evidencia, calidad y separacion con pesos manuales.
26. Que los conteos observados estan mas cerca de los esperados bajo el modelo.
27. Para valorar la plausibilidad de las letras observadas usando probabilidades y logaritmos.
28. Una secuencia contigua de unidades; ejemplos: `que`, `cion`, `de`.
29. Minusculas `a-z` y `ñ` despues del plegado.
30. Sustituye temporalmente `ñ`, descompone/elimina marcas y luego la restaura.
31. `0.47`.
32. `0.15`.
33. 12 puntos.
34. 75 puntos.
35. `frequency + lexical + ngramScore + vowelScore + spaceScore - structurePenalty - controlPenalty`.
36. `rankCandidates`.
37. `analyzeCiphertext`.
38. `InputValidationError`.
39. `messageLength * (charsetLength + 1)`.
40. Se lanza un error de validacion antes de generar candidatos.
41. `useMemo`.
42. Porque un input controlado entrega texto y puede atravesar estados que aun no son enteros validos.
43. `cn`, que combina `clsx` y `tailwind-merge`.
44. `app/layout.tsx` importa `app/globals.css`.
45. No; Vinext/React lo generan desde layout, page y JSX.
46. Cualquier dos: CSP, COOP, CORP, Permissions-Policy, Referrer-Policy, nosniff, X-Frame-Options.
47. Incluye `'unsafe-inline'`, que reduce la barrera frente a scripts inyectados.
48. No, tampoco hay script `test`.
49. Porque la seguridad de la aplicacion web y la fuerza matematica del cifrado son propiedades distintas; el espacio de claves clasico sigue siendo pequeño/predecible.
50. Ejemplo: “El sistema muestra el candidato con mayor puntuacion bajo su modelo de español; la confianza es heuristica y no demuestra que sea el original”.

## Escala sugerida

- 45-50: puedes defender detalles y limites.
- 38-44: comprension solida; repasa formulas y seguridad.
- 30-37: conoces el flujo, pero faltan conexiones.
- menos de 30: vuelve a las trazas manuales y al diccionario de funciones.
