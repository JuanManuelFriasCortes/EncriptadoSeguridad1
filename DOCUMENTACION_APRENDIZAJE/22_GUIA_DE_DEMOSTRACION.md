# Guia de demostracion en menos de 5 minutos

## Paso 1: presentar la pantalla (30 s)

**Accion:** abre la app local y señala conjunto, cifrado y descifrado.

**Que ocurre internamente:** `RootLayout` carga CSS; `Home` renderiza `CryptoWorkbench`; `useState` crea valores iniciales.

**Que digo:** “Todo se procesa en el navegador. El conjunto ordenado determina indices y modulo; no estamos limitados a ASCII.”

**Posible pregunta:** ¿Donde esta el HTML?

**Respuesta:** React/Vinext lo generan desde TSX; no hay `index.html` manual. El build de Pages crea uno automaticamente.

## Paso 2: explicar y validar charset (35 s)

**Accion:** muestra preset español y añade temporalmente una letra duplicada; observa error y restaura preset.

**Internamente:** `useMemo -> validateCharset -> NFC -> grafemas -> Set`.

**Que digo:** “Duplicados romperian el indice unico. La validacion ocurre despues de normalizar Unicode.”

**Pregunta:** ¿Por que N es 27?

**Respuesta:** el preset incluye `Ñ`; N siempre es el tamaño real.

## Paso 3: cifrar Cesar (50 s)

**Accion:** escribe una frase española larga, Cesar shift 7, pulsa cifrar.

**Internamente:** valida mensaje/shift; `normalizeShift`; `caesarEncrypt`; `transform` usa Map y conserva externos.

**Que digo:** “Cada indice pasa a `(i+7) mod 27`. Un shift mayor o negativo se normaliza.”

**Pregunta:** ¿Es seguro?

**Respuesta:** no; solo hay N shifts efectivos y se prueban todos.

## Paso 4: descifrar automaticamente (75 s)

**Accion:** copia el cifrado al panel derecho y analiza.

**Internamente:** `analyzeCiphertext` valida carga; `rankCandidates` crea 28 candidatos; `scoreSpanish` puntua; sort selecciona; confianza usa mejor/segundo.

**Que digo:** “No le pido al usuario elegir. Comparo un Atbash y todos los Cesar; muestro solo el mejor, algoritmo, shift y confianza heuristica.”

**Pregunta:** ¿Como sabe que es español?

**Respuesta:** frecuencias/chi-cuadrada, log-verosimilitud, palabras, n-gramas, vocales, espacios y penalizaciones.

## Paso 5: demostrar Atbash (45 s)

**Accion:** cifra una segunda frase con Atbash y analizala.

**Internamente:** `i -> N-1-i`; la misma funcion revierte; el candidato compite con Cesar.

**Que digo:** “Atbash es involutivo: `N-1-(N-1-i)=i`. No necesita shift.”

**Pregunta:** ¿Puede confundirse?

**Respuesta:** si; en conjuntos pequeños puede equivaler a Cesar. El desempate no prueba el algoritmo historico.

## Paso 6: cerrar con limites/seguridad (35 s)

**Accion:** señala confianza y footer.

**Internamente:** React muestra texto escapado; Vinext añade cabeceras al servir localmente; Pages sirve el export estatico; no hay fetch/storage de la aplicacion.

**Que digo:** “La transformacion es exacta y la seleccion es heuristica. Local/React/CSP reducen riesgos web, pero Cesar/Atbash no protegen secretos. Falta una suite automatizada actual.”

**Pregunta:** ¿Cual seria tu primera mejora?

**Respuesta:** pruebas de propiedades y corpus independiente; despues umbral no concluyente y Web Worker.

## Cronometro

30 + 35 + 50 + 75 + 45 + 35 = 270 segundos, 4:30. Deja 30 segundos para transicion o una pregunta.
