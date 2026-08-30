# Examen de autoevaluacion

## Preguntas

### Opcion multiple

1. ¿Que valor define el modulo de Cesar? A) siempre 26 B) `charset.length` en grafemas C) longitud del mensaje D) score.
2. ¿Cuantos candidatos hay para N=10? A) 9 B) 10 C) 11 D) 20.
3. ¿Que representa `shift:null`? A) error B) Cesar cero C) Atbash, no aplica D) clave desconocida.
4. ¿Que funcion es la API principal automatica? A) `scoreSpanish` B) `analyzeCiphertext` C) `transform` D) `Home`.
5. ¿Que funcion devuelve todos los candidatos? A) `rankCandidates` B) `validateMessage` C) `headers` D) `cn`.
6. ¿Que normalizacion se aplica primero? A) NFD B) NFC C) ASCII D) Base64.
7. ¿Que estructura asocia grafema e indice? A) Set B) Array solo C) Map D) WeakSet.
8. ¿Que criterio va primero al ordenar? A) menor shift B) Atbash C) palabras D) score mayor.
9. ¿Cual no es señal de scoring? A) n-gramas B) palabras C) geolocalizacion D) vocales.
10. ¿Cual es el maximo del conjunto? A) 27 B) 128 C) 12,000 D) 1,500,000.
11. ¿Donde se definen frecuencias? A) `constants.js` B) `language-data.js` C) `next.config.ts` D) `page.tsx`.
12. ¿Que hook memoriza validacion? A) useEffect B) useRef C) useMemo D) useContext.
13. ¿Que evita `twMerge` principalmente? A) XSS B) conflictos Tailwind C) duplicados Unicode D) red.
14. ¿Que cabecera combate enmarcado moderno? A) CSP `frame-ancestors` B) Accept C) ETag D) Cache-Control.
15. ¿Que prueba falta actualmente? A) ninguna B) solo CSS C) toda suite automatizada D) solo Atbash.

### Verdadero o falso

16. Atbash necesita un desplazamiento secreto.
17. Un shift N equivale a shift cero.
18. Los caracteres externos se eliminan.
19. `Intl.Segmenter` intenta conservar grafemas.
20. NFC elimina todos los homoglifos.
21. El segundo candidato se muestra al usuario.
22. Evidencia alta significa automaticamente texto correcto.
23. El proyecto usa `dangerouslySetInnerHTML`.
24. `npm run build` sustituye pruebas de algoritmos.
25. Una aplicacion web endurecida puede implementar un cifrado debil.

### Explica o predice codigo

26. Para `normalizeShift(-1,5)`, ¿que devuelve?
27. Con `ABCDE`, Cesar shift 2, ¿que produce `BAD`?
28. Con `ABCDE`, Atbash, ¿que produce `BAD`?
29. ¿Que devuelve `atbashTransform(atbashTransform('BAD',C),C)`?
30. Explica `const [best, second] = ranked`.
31. Explica por que `right.score-left.score` ordenaria descendente en un comparador.
32. ¿Que produce `new Set(['x','x','y'])` en valores unicos?
33. ¿Que significa `automaticResult?.plaintext ?? 'Sin resultado'` cuando es null?
34. ¿Por que `index === undefined ? character : ...` no usa `!index`?
35. ¿Que calcula `messageLength*(charsetLength+1)`?

### Detecta el error o riesgo

36. Un programador reemplaza `toGraphemes` por `split('')`. ¿Que rompe?
37. Cambia modulo a `shift % size` solamente. ¿Que caso falla?
38. Permite duplicados en charset. ¿Que invariante rompe?
39. Muestra plaintext con `dangerouslySetInnerHTML`. ¿Que riesgo abre?
40. Elimina la validacion de complejidad. ¿Que riesgo aumenta?
41. Añade `fetch` de mensajes pero deja el aviso “sin envios”. ¿Que problema existe?
42. Ajusta pesos hasta aprobar cinco frases conocidas sin corpus separado. ¿Que riesgo metodologico?

### Preguntas abiertas

43. Demuestra algebraicamente que Atbash es involutivo.
44. Explica por que se generan N y no infinitos candidatos Cesar.
45. Enumera todos los componentes del score total.
46. Distingue score, evidencia, margen y confianza.
47. Relaciona Al-Kindi con la implementacion sin atribuirle tecnicas modernas.
48. Explica dos defensas web y algo que no protegen.
49. Propone las tres primeras pruebas automatizadas.
50. Formula una conclusion honesta sobre correccion y limites.

---

## Respuestas

1. B. N es el numero de grafemas del conjunto validado.
2. C. Diez Cesar mas un Atbash.
3. C. Atbash no tiene shift.
4. B. `analyzeCiphertext` valida y devuelve uno.
5. A. `rankCandidates`.
6. B. NFC.
7. C. Map.
8. D. Score descendente.
9. C. Geolocalizacion no se usa y esta deshabilitada por Permissions-Policy.
10. B. 128.
11. B. `lib/crypto/language-data.js`.
12. C. `useMemo`.
13. B. Conflictos entre utilidades Tailwind.
14. A. `frame-ancestors 'none'`; tambien existe X-Frame-Options DENY.
15. C. No hay archivos ni script de pruebas.
16. Falso. La reflexion queda determinada por el conjunto.
17. Verdadero, porque N mod N es cero.
18. Falso. Se conservan intactos.
19. Verdadero.
20. Falso. NFC resuelve equivalencias canonicas, no confusables visuales.
21. Falso. Solo se usa para el margen.
22. Falso. Mide cantidad, no verdad.
23. Falso.
24. Falso. Build no comprueba resultados conductuales.
25. Verdadero; son propiedades diferentes.
26. 4.
27. `DCA`.
28. `DEB`.
29. `BAD` normalizado a NFC.
30. Extrae elementos 0 y 1 del arreglo ordenado en variables separadas.
31. Si right tiene mas score, la resta es positiva y left va despues; el mayor termina primero.
32. `x` y `y`, una sola vez cada uno.
33. Devuelve el texto alternativo `Sin resultado` sin lanzar error.
34. El indice cero es valido pero falsy; solo `undefined` significa “no esta en Map”.
35. Una aproximacion al numero de grafemas procesados por los N+1 candidatos.
36. Puede partir pares UTF-16 y grafemas/emoji complejos.
37. Shifts negativos, porque `%` puede ser negativo en JavaScript.
38. Un simbolo deja de tener indice unico; la transformacion puede no ser biyectiva.
39. DOM XSS/HTML injection con entrada no confiable.
40. Bloqueo/agotamiento de CPU y memoria en el navegador.
41. La afirmacion de privacidad seria falsa; cambia el modelo de amenazas y documentacion.
42. Sobreajuste.
43. `f(f(i))=N-1-(N-1-i)=i`.
44. Todo entero k es equivalente a uno de `0..N-1` modulo N.
45. Frecuencia, lexico, n-gramas, vocales, espacios, menos estructura y controles.
46. Score es ajuste total; evidencia es cantidad; margen separa primero/segundo; confianza combina evidencia, calidad y separacion.
47. Inspira comparar regularidades/frecuencias; chi-cuadrada, logs, n-gramas y formula de confianza son extensiones modernas.
48. Ejemplo: JSX textual mitiga XSS de texto y CSP limita ejecucion; no protegen fuerza criptografica ni dispositivo comprometido.
49. Inversa Cesar, doble Atbash y fronteras/duplicados Unicode; despues ranking/corpus.
50. Ejemplo: “Las transformaciones y el barrido son exactos dentro de Cesar/Atbash; seleccionar español es heuristico, puede fallar y aun necesita una suite/corpus automatizados”.

## Resultado sugerido

- 45-50: dominio para defensa.
- 38-44: buen dominio, repasar matices.
- 30-37: comprende flujo, faltan conexiones.
- menos de 30: volver a guia, trazas y diccionarios.
