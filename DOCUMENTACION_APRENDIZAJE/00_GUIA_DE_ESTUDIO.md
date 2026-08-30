# Guia de estudio

Esta es la ruta principal solicitada. No estudies de memoria el proyecto de arriba hacia abajo: avanza de experiencia visible a matematicas, despues a inferencia y finalmente a seguridad/pruebas.

## Nivel 1: entender que hace el sistema

**Lee:** `01_VISION_GENERAL_DEL_PROYECTO.md` y abre la aplicacion.

**Domina:** entrada, salida, conjunto, Cesar, Atbash, resultado unico y procesamiento local.

**Al terminar debes explicar:** el problema en un minuto sin hablar aun de detalles de React.

**Comprobacion:** ¿que conoce el usuario al descifrar y que debe inferir el sistema? ¿Que no puede descifrar?

## Nivel 2: interfaz, HTML generado y CSS

**Lee:** `04_HTML_EXPLICADO.md`, `05_CSS_EXPLICADO.md`, `CODIGO/app_layout_tsx.md`, `CODIGO/app_page_tsx.md`, `CODIGO/components_crypto_workbench_tsx.md` y `CODIGO/app_globals_css.md`.

**Domina:** JSX, semantica, campos controlados, IDs, ARIA, Tailwind, grid/flex y responsive.

**Al terminar:** sigue un clic desde el boton hasta el cambio del `<output>` y explica por que no existe `index.html` manual.

**Comprobacion:** ¿quien usa `id="cipher-text"`? ¿Por que hay radios reales aunque parezcan segmentos?

## Nivel 3: JavaScript y TypeScript usados

**Lee:** `06_JAVASCRIPT_FUNDAMENTOS.md`, el adicional `07_JAVASCRIPT_AVANZADO.md` y `18_DICCIONARIO_DE_FUNCIONES.md`.

**Domina:** const/let, objetos, arreglos, Set, Map, callbacks, `map/filter/reduce`, modulos, errores, hooks, optional chaining y async/await.

**Al terminar:** explica la expresion de modulo, el comparador de candidatos y un setter React.

**Comprobacion:** ¿por que `shift` es string? ¿Que captura el callback de Cesar?

## Nivel 4: charsets y Unicode

**Lee:** `14_UNICODE_Y_CHARSETS.md`, `12_VALIDACIONES.md`, `CODIGO/lib_crypto_unicode_js.md` y `CODIGO/lib_crypto_validation_js.md`.

**Domina:** ASCII, Unicode, UTF-16, punto de codigo, grafema, NFC, duplicados y orden.

**Al terminar:** explica por que `texto[i]`, `length` o `split('')` pueden ser incorrectos para emojis.

**Comprobacion:** ¿por que dos formas de `é` pueden convertirse en duplicado?

## Nivel 5: Cesar

**Lee:** `07_CIFRADO_CESAR.md`, `CODIGO/lib_crypto_ciphers_js.md` y trazas 1/2 de `26_TRAZAS_MANUALES.md`.

**Domina:** indices, `N`, modulo, shift negativo, cifrado/descifrado e inversa.

**Al terminar:** cifra `BAD` manualmente con `ABCDE`, shift 2, y demuestra la vuelta.

**Comprobacion:** ¿por que shift 29 equivale a 2 cuando N=27?

## Nivel 6: Atbash

**Lee:** `08_CIFRADO_ATBASH.md` y traza 3.

**Domina:** reflexion, conjunto par/impar e involucion.

**Al terminar:** demuestra algebraicamente `f(f(i))=i`.

**Comprobacion:** ¿por que el centro no cambia en un conjunto impar?

## Nivel 7: Al-Kindi y scoring

**Lee:** `10_ANALISIS_DE_FRECUENCIAS_AL_KINDI.md`, `11_SCORING_LINGUISTICO.md`, `CODIGO/lib_crypto_language_data_js.md` y `CODIGO/lib_crypto_scoring_js.md`.

**Domina:** esperado/observado, chi-cuadrada, log-verosimilitud, lexico, n-gramas, proporciones y penalizaciones.

**Al terminar:** reconstruye la formula total y distingue aportacion historica de extension moderna.

**Comprobacion:** ¿por que frecuencia sola no distingue anagramas?

## Nivel 8: deteccion automatica

**Lee:** `09_DESCIFRADO_AUTOMATICO.md`, `CODIGO/lib_crypto_analyzer_js.md` y trazas 5/6.

**Domina:** `N+1`, candidato, ranking, desempate, margen, evidencia, calidad, separacion y confianza.

**Al terminar:** explica exactamente como se obtiene algoritmo, shift y plaintext sin intervencion humana.

**Comprobacion:** ¿por que el segundo candidato importa aunque no se muestre?

## Nivel 9: seguridad

**Lee:** `13_SEGURIDAD.md`, `28_SEGURIDAD_VS_CRIPTOGRAFIA.md`, `31_PUBLICACION_GITHUB_PAGES.md` y `CODIGO/next_config_ts.md`.

**Domina:** XSS, salida textual, CSP, clickjacking, permisos, DoS, privacidad local, diferencia servidor/hosting estatico y debilidad criptografica.

**Al terminar:** defiende la frase “aplicacion endurecida, cifrados inseguros”.

**Comprobacion:** ¿que no protege CSP? ¿Por que el portapapeles es un limite?

## Nivel 10: pruebas, limites y defensa

**Lee:** `15_PRUEBAS.md`, `16_LIMITACIONES_DEL_SISTEMA.md`, `17_ERRORES_Y_CASOS_LIMITE.md`, `22_GUIA_DE_DEMOSTRACION.md`, `21_PREGUNTAS_DE_PROFESOR.md` y `25_EXAMEN_DE_AUTOEVALUACION.md`.

**Domina:** diferencia build/prueba, propiedades, corpus, limitacion/bug y explicacion honesta.

**Al terminar:** realiza una demostracion de cinco minutos y responde sin sobreprometer.

**Comprobacion:** ¿que evidencia falta actualmente para afirmar alta exactitud general?

## No necesito memorizar

- cada clase Tailwind o valor de color;
- cada palabra del lexico;
- todos los porcentajes de letras;
- cada linea del lockfile;
- orden exacto de imports;
- textos completos de errores;
- hashes/versiones transitivas;
- cada peso sin comprender su funcion.

## Si necesito entender

- conjunto ordenado y modulo `N`;
- Unicode, NFC y grafemas;
- formulas e inversas de Cesar/Atbash;
- por que hay `N+1` candidatos;
- todas las familias del score;
- diferencia score/evidencia/confianza;
- orden y desempates;
- inspiracion de Al-Kindi;
- validaciones e invariantes;
- XSS, salida textual, CSP y procesamiento local;
- seguridad web frente a seguridad criptografica;
- casos donde el detector falla;
- ausencia actual de pruebas automatizadas.

## Rutina recomendada

Para cada nivel: lee, ejecuta una traza a mano, localiza el codigo real, explica sin notas y responde las preguntas. No avances si no puedes predecir una salida pequeña.
