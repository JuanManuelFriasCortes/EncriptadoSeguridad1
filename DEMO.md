# Demostración técnica

Duración objetivo: 4 minutos 30 segundos. Charset para todos los ejemplos: `ABCDEFGHIJKLMNÑOPQRSTUVWXYZ`.

## Guion

1. Abre la página y señala el charset editable, su contador y los presets.
2. Explica que N es 27 en el preset español y que espacios/signos externos se conservan.
3. Escribe una frase, selecciona César, define el shift y pulsa **Cifrar**.
4. Pulsa **Copiar**, pega el ciphertext en **Descifrado automático** y ejecuta el análisis.
5. Muestra la única respuesta: algoritmo, shift normalizado, plaintext y confianza.
6. Cambia a Atbash; observa que el control de desplazamiento se deshabilita y oculta.
7. Repite el ciclo y confirma que la detección selecciona Atbash sin pedir datos extra.
8. Resume las señales: frecuencias, chi-cuadrada, vocales, palabras, n-gramas y penalizaciones.
9. Señala la nota de privacidad: todo se procesa en memoria dentro del navegador.
10. Cierra con la advertencia: César y Atbash no protegen información sensible.

## Ejemplos César

| Shift | Texto plano | Texto cifrado |
| ---: | --- | --- |
| 3 | `LA SEGURIDAD COMIENZA CON BUENAS DECISIONES.` | `ÑD VHJXULGDG FROLHPCD FRP EXHPDV GHFLVLRPHV.` |
| 11 | `EL ANALISIS DE FRECUENCIAS REVELA PATRONES DEL IDIOMA.` | `OV LXLVSDSD ÑO PCONFOXNSLD COGOVL ALECZXOD ÑOV SÑSZWL.` |
| 26 | `ESTE MENSAJE SE PROCESA SOLAMENTE EN EL NAVEGADOR.` | `DRSD LDMRZID RD OQÑBDRZ RÑKZLDMSD DM DK MZUDFZCÑQ.` |

## Ejemplos Atbash

| Texto plano | Texto cifrado |
| --- | --- |
| `LA PRIVACIDAD ES PARTE DEL DISEÑO SEGURO.` | `OZ KIREZXRWZW VH KZIGV WVO WRHVML HVTFIL.` |
| `CADA FRECUENCIA APORTA UNA PISTA ESTADISTICA.` | `XZWZ UIVXFVNXRZ ZKLIGZ FNZ KRHGZ VHGZWRHGRXZ.` |
| `LOS CIFRADOS CLASICOS TIENEN LIMITACIONES IMPORTANTES.` | `OLH XRUIZWLH XOZHRXLH GRVNVN ORÑRGZXRLNVH RÑKLIGZNGVH.` |

## Plan alterno rápido

Si el tiempo es menor a tres minutos, demuestra solo César shift 3 y el primer Atbash. Los otros cuatro ejemplos quedan como evidencia reproducible y respaldo ante preguntas.
