# Glosario tecnico

| Termino | Definicion en este proyecto |
|---|---|
| ASCII | conjunto historico de 128 codigos; no limita la app |
| Unicode | estandar global de caracteres |
| UTF-16 | representacion interna de strings JavaScript |
| code unit | unidad de 16 bits; `length` la cuenta |
| code point | valor Unicode abstracto |
| grafema | unidad visual que puede agrupar puntos |
| charset | conjunto ordenado de grafemas |
| NFC | normalizacion canonica compuesta |
| NFD | forma descompuesta usada al plegar acentos |
| modulo | aritmetica circular respecto a N |
| N | tamaño real del charset |
| shift | desplazamiento Cesar |
| plaintext | texto legible/original |
| ciphertext | texto cifrado |
| Cesar | sustitucion por desplazamiento modulo N |
| Atbash | reflejo `N-1-i` |
| involucion | funcion que aplicada dos veces vuelve |
| biyeccion | mapeo uno-a-uno reversible |
| criptoanalisis | recuperacion/analisis sin conocer clave inicialmente |
| Al-Kindi | referente historico del analisis de frecuencia |
| frecuencia | proporcion de aparicion |
| observado | conteo real del candidato |
| esperado | conteo segun modelo español |
| chi-cuadrada | discrepancia observado/esperado |
| log-verosimilitud | suma logaritmica de plausibilidad |
| n-grama | secuencia contigua de n unidades |
| bigrama | n-grama de dos |
| trigrama | n-grama de tres |
| lexico | conjunto de palabras reconocidas |
| score | suma de señales y penas |
| evidence | cantidad de material para evaluar |
| margen | score primero menos segundo |
| confianza | indicador heuristico final |
| candidato | posible plaintext/algoritmo/shift |
| ranking | candidatos ordenados por comparador |
| fuerza bruta | probar todo el espacio de claves |
| heuristica | regla util sin garantia |
| corpus | coleccion de textos para evaluar/ajustar |
| sobreajuste | buen resultado en ejemplos conocidos, malo fuera |
| DOM | arbol del documento del navegador |
| JSX | sintaxis React para describir elementos |
| componente | funcion React que devuelve interfaz |
| hook | funcion React como useState/useMemo |
| estado | dato persistente entre renderizaciones |
| evento | accion como click/change |
| listener/handler | funcion que responde al evento |
| callback | funcion pasada a otra |
| array | coleccion ordenada |
| objeto | pares propiedad/valor |
| Set | coleccion unica |
| Map | asociacion clave/valor |
| spread | `...` expande elementos/props |
| destructuring | extrae partes de arreglo/objeto |
| optional chaining | `?.` evita acceso sobre null/undefined |
| ESM | modulos import/export |
| API publica | exportaciones destinadas a consumidores |
| XSS | ejecucion de contenido inyectado |
| HTML injection | entrada interpretada como marcado |
| sink | operacion donde datos pueden volverse peligrosos |
| CSP | politica de fuentes/ejecucion del navegador |
| clickjacking | engaño mediante pagina enmarcada |
| COOP/CORP | aislamiento/restriccion entre origenes |
| HTTPS | transporte HTTP protegido por TLS |
| DoS | agotamiento que impide servicio |
| clipboard | portapapeles global del sistema |
| validacion | comprobacion de contrato |
| sanitizacion | transformacion segura segun contexto |
| escape | codificacion para que texto no se interprete |
| prueba unitaria | verifica una unidad aislada |
| prueba funcional | verifica flujo visible/completo |
| regresion | fallo reaparecido tras cambio |
| edge case | caso de frontera o poco comun |
| complejidad O(n) | costo proporcional a tamaño |
| Web Worker | calculo fuera del hilo UI |
| lockfile | resolucion exacta de dependencias |
| build | transformacion/verificacion para ejecutar |
| bug | conducta contraria al contrato |
| limitacion | frontera conocida del diseño |

Hay explicaciones ampliadas en `20_GLOSARIO.md`.
