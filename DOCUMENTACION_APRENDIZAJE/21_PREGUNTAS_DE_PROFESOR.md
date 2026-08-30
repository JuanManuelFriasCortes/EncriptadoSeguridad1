# 60 preguntas de profesor con respuestas

## Basicas (1-10)

### 1. ¿Que hace el proyecto en una frase?

Permite cifrar con Cesar o Atbash sobre un conjunto Unicode ordenado y descifra automaticamente comparando todos los candidatos mediante heuristicas del español.

### 2. ¿Por que se eligio una aplicacion web local?

Facilita la demostracion interactiva y permite ejecutar el motor en memoria del navegador sin enviar mensajes a un servicio.

### 3. ¿Donde comienza la aplicacion?

`app/layout.tsx` crea el documento raiz y `app/page.tsx` renderiza `CryptoWorkbench`, que contiene la pantalla y coordinacion.

### 4. ¿Por que el motor esta separado de React?

Para conservar funciones puras y reutilizables, reducir acoplamiento y permitir pruebas del dominio sin montar la interfaz.

### 5. ¿Que papel cumple `lib/crypto/index.js`?

Es un modulo barril: reexporta la API publica del motor para que la UI no conozca todas las rutas internas.

### 6. ¿Que hace Vinext?

Integra convenciones tipo Next con Vite; proporciona servidor, build y manejo de la estructura `app` usada por el proyecto.

### 7. ¿Por que hay JavaScript y TypeScript mezclados?

La interfaz aprovecha tipos de React y el motor usa JavaScript ESM con JSDoc. `allowJs` permite integrarlos, aunque migrar el motor a TypeScript mejoraria comprobaciones.

### 8. ¿Existe un `index.html`?

No hay uno escrito manualmente. React/Vinext generan el documento a partir de `RootLayout`, `Home` y JSX.

Para GitHub Pages, `npm run build:pages` si genera `dist/client/index.html` como salida reproducible.

### 9. ¿Para que sirve `next.config.ts`?

Selecciona el destino: en servidor declara cabeceras defensivas y en GitHub Pages activa exportacion estatica, prefijo de recursos y barra final. No analiza, registra ni modifica mensajes.

### 10. ¿Que diferencia hay entre estado y variable local?

El estado persiste entre renderizaciones y cambia mediante setter. Una variable local se recalcula en cada ejecucion del componente o handler.

## Intermedias (11-30)

### 11. ¿Por que el conjunto es ordenado?

Porque los cifrados transforman indices. Cambiar el orden cambia la correspondencia y, por tanto, la salida.

### 12. ¿Por que no se permiten duplicados?

Un simbolo tendria mas de un indice conceptual, pero el `Map` conservaria uno; la transformacion perderia la biyeccion necesaria para descifrar.

### 13. ¿Por que se normaliza a NFC?

Para que formas Unicode canonicamente equivalentes tengan una representacion estable antes de detectar duplicados o transformar.

### 14. ¿Que es un grafema?

Una unidad percibida como caracter. Puede estar formada por varios puntos de codigo, como un emoji con modificador.

### 15. ¿Por que `split('')` seria insuficiente?

Divide unidades UTF-16 y puede partir pares sustitutos o secuencias visuales. `Intl.Segmenter` aproxima mejor clusters de grafemas.

### 16. ¿Que pasa si no existe `Intl.Segmenter`?

Se usa `Array.from`, que separa por puntos de codigo. Es un fallback razonable pero menos preciso para grafemas complejos.

### 17. ¿El sistema usa solo ASCII?

No. Admite Unicode, incluidos acentos y emojis. ASCII es un subconjunto posible del conjunto del usuario.

### 18. ¿Por que no se permiten espacios en el conjunto?

Para que la separacion permanezca externa y conserve estructura de palabras usada por scoring; es una regla de este diseño, no una necesidad universal de Cesar.

### 19. ¿Que pasa con caracteres fuera del conjunto?

Permanecen intactos. Esto conserva puntuacion y espacios, pero revela estructura.

### 20. ¿El conjunto forma parte de la clave?

Operacionalmente si: contenido y orden son necesarios para reproducir la transformacion. Sin embargo, el sistema pide que el usuario lo proporcione al descifrar.

### Subtema: Cesar y Atbash

### 21. ¿Cual es la formula de Cesar para cifrar?

`(i + k) mod N`, donde `i` es el indice, `k` el desplazamiento normalizado y `N` el tamaño del conjunto.

### 22. ¿Y para descifrar Cesar?

`(i - k + N) mod N`.

### 23. ¿Por que se normaliza dos veces con modulo?

En JavaScript `%` puede devolver negativo. `((k % N) + N) % N` garantiza `0..N-1`.

### 24. ¿Que ocurre si el desplazamiento es mayor que el conjunto?

Se reduce modulo `N`; por ejemplo, 29 equivale a 2 con un conjunto de 27.

### 25. ¿Por que se acepta desplazamiento cero?

Es una clave valida y cubre desplazamientos multiplos de `N`; ademas hace completo el espacio de candidatos.

### 26. ¿Cual es la formula de Atbash?

`N - 1 - i`.

### 27. ¿Por que Atbash usa la misma funcion para cifrar y descifrar?

Es una involucion: aplicar la reflexion dos veces devuelve el indice original.

### 28. ¿Que ocurre en el centro de un conjunto impar?

El simbolo central se mapea a si mismo.

### 29. ¿Puede Atbash coincidir con Cesar?

Si, especialmente en conjuntos pequeños. Con `AB`, Atbash y Cesar shift 1 son la misma permutacion.

### 30. ¿Son seguros Cesar y Atbash?

No. Tienen estructura y espacio de claves pequeños. Son educativos, no aptos para proteger informacion sensible.

## Dificiles (31-48)

### 31. ¿Cuantos candidatos se generan?

`N + 1`: un Atbash y `N` Cesar para shifts `0..N-1`.

### 32. ¿Por que no prueba infinitos desplazamientos?

Todos los enteros se reducen modulo `N`, asi que solo existen `N` transformaciones Cesar distintas.

### 33. ¿Como elige el ganador?

Ordena por score, luego palabras reconocidas, luego favorece Atbash en empate y finalmente menor shift.

### 34. ¿El usuario elige entre candidatos?

No. `analyzeCiphertext` devuelve solo el mejor; esto cumple la automatizacion requerida.

### 35. ¿Para que se usa el segundo candidato?

Para calcular el margen respecto al mejor y estimar separacion/confianza; no se muestra.

### 36. ¿Que es chi-cuadrada aqui?

Una medida de diferencia entre conteos de letras observados y esperados del español. Menor discrepancia favorece al candidato.

### 37. ¿Que aporta log-verosimilitud?

Premia secuencias de letras cuyos simbolos individuales tienen probabilidades plausibles y permite combinar probabilidades mediante sumas de logaritmos.

### 38. ¿Por que se usan palabras ademas de frecuencias?

Las frecuencias ignoran orden. Palabras reconocidas aportan evidencia de estructura y significado aproximado.

### 39. ¿Que es un n-grama?

Una secuencia contigua como `que`, `de` o `cion`. Su presencia aporta puntos por patrones frecuentes del idioma.

### 40. ¿Por que se penaliza `q` sin `u`?

Es poco comun en español y ayuda a distinguir ruido, aunque puede castigar palabras extranjeras legitimas.

### 41. ¿Como se trata la `ñ` en scoring?

Se protege antes de eliminar diacriticos para conservarla como letra distinta de `n`.

### 42. ¿Que es la evidencia?

Una medida acotada basada en numero de letras y palabras; expresa cuanto material hubo para evaluar, no calidad.

### 43. ¿Que es el margen?

La diferencia de score entre primer y segundo candidato. Un margen grande indica separacion bajo el modelo.

### 44. ¿La confianza es una probabilidad matematica real?

No. Es una heuristica ponderada y limitada, sin calibracion probabilistica demostrada.

### 45. ¿Por que puede fallar en textos cortos?

Hay pocas observaciones, muchas coincidencias accidentales y distribuciones de letras inestables.

### 46. ¿Que pasa con un texto en ingles?

Se elige el candidato que mas se parezca al modelo español, que puede ser incorrecto aunque el barrido criptografico incluya la salida real.

### 47. ¿Como se relaciona con Al-Kindi?

Aplica el principio de explotar frecuencias del idioma para romper sustituciones y lo extiende con medidas y señales computacionales modernas.

### 48. ¿Al-Kindi uso chi-cuadrada y estos pesos?

No debe afirmarse. Esos son mecanismos modernos del proyecto inspirados por el principio historico.

## Preguntas capciosas (49-60)

### 49. ¿Que limites de entrada existen?

Conjunto de 2 a 128 grafemas, mensaje maximo de 12,000 y presupuesto de analisis de 1,500,000 unidades aproximadas.

### 50. ¿Por que el limite de complejidad no es exacto?

Cuenta longitud por candidatos, pero scoring incluye regex, n-gramas, conteos y asignaciones adicionales.

### 51. ¿Que es `InputValidationError`?

Una clase de error predecible que agrupa mensajes de entrada y permite a la UI mostrarlos sin exponer detalles internos.

### 52. ¿Como se previene XSS?

Los datos se insertan como texto JSX, no como HTML; no hay sumideros peligrosos y una CSP aporta defensa adicional.

### 53. ¿Que debilidad tiene la CSP?

Permite `'unsafe-inline'` para scripts y estilos. Especialmente en scripts, esto reduce proteccion frente a ciertas inyecciones.

### 54. ¿Los mensajes salen del navegador?

No segun el codigo actual: no hay llamadas de red ni almacenamiento de mensajes. Dependencias, extensiones o futuras modificaciones deben reevaluarse.

### 55. ¿Se almacenan mensajes?

No de forma persistente. Permanecen en memoria/DOM mientras la pagina esta abierta y pueden pasar al portapapeles si el usuario pulsa copiar.

### 56. ¿Hay pruebas automatizadas ahora?

No. El repositorio actual no incluye archivos de pruebas ni script `test`; el build no sustituye una suite conductual.

### 57. ¿Que primera prueba añadirias?

Propiedades inversas: descifrar el Cesar cifrado recupera NFC del original y aplicar Atbash dos veces tambien.

### 58. ¿Cual es la mayor limitacion metodologica?

El detector siempre elige entre dos modelos aun cuando el texto no pertenezca a ninguno; falta un umbral de “no concluyente”.

### 59. ¿Cual es la mejora de rendimiento mas clara?

Mover ranking/scoring a un Web Worker y permitir cancelacion, manteniendo la UI responsiva.

### 60. ¿Como defenderias la correccion sin exagerar?

Diria que los cifrados implementan formulas inversas verificables y el analizador recorre todo su espacio definido; la seleccion linguistica es heuristica y debe validarse con corpus y pruebas que actualmente faltan.
