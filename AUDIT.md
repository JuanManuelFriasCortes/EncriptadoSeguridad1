# Auditoría técnica

Fecha de la última regresión: 29 de agosto de 2026. Las métricas detalladas y reproducibles están en `tests/latest-metrics.json`.

## Resultados ejecutados

| Evidencia | Resultado |
| --- | ---: |
| Pruebas automatizadas totales | 334 / 334 |
| Pruebas de detección | 294 / 294 |
| Detecciones César | 246 / 246 |
| Detecciones Atbash | 48 / 48 |
| Shift César exacto | 246 / 246 |
| Plaintext exacto | 294 / 294 |
| Precisión global del corpus | 100% |
| Lint | 0 errores |
| Build de producción | Correcto |
| Auditoría npm completa | 0 vulnerabilidades conocidas |

El 100% corresponde exclusivamente al corpus ejecutado; no afirma infalibilidad matemática fuera de él.

## Revisión adversarial

- **Profesor:** se verificó charset realmente editable, N real, dos métodos de cifrado, ausencia de selector/shift al descifrar, salida única y evidencia estadística funcional.
- **Pentester:** diez familias de payload XSS permanecieron como texto; el DOM no creó imágenes, iframes ni scripts adicionales y no abrió diálogos.
- **Usuario:** se probaron vacíos, duplicados, whitespace, límites, shifts negativos/grandes, líneas múltiples, símbolos, acentos y emojis.
- **Criptanalista:** se generaron todos los candidatos internamente y se compararon con frecuencia, chi-cuadrada, log-verosimilitud, vocales, espacios, palabras, n-gramas y penalizaciones.
- **Desarrollador:** se separó DOM, validación, cifrados, datos lingüísticos, scoring, ranking y tests; se eliminaron 69 paquetes y componentes de plantilla no utilizados.

## Rúbrica

| Requisito | Peso | Evidencia técnica | Pruebas realizadas | Resultado | Puntos |
| --- | ---: | --- | --- | --- | ---: |
| Documentación segura | 10 | `README.md`, `SECURITY.md`, `DEMO.md`, JSDoc, modelo de amenazas y advertencias | Lint, búsqueda de APIs peligrosas, auditoría npm y revisión de secretos | CUMPLIDO | 10 |
| Charset personalizado ASCII/no ASCII | 5 | Campo editable, NFC, grafemas, duplicados explícitos, límites y caracteres externos intactos | ASCII, ñ, acentos, símbolos, emojis, combinaciones canónicas y exceso | CUMPLIDO | 5 |
| Cifrado César/Atbash | 10 | Módulos puros con N real, shifts normalizados y Atbash involutivo | Roundtrips en siete charsets, vectores conocidos, shifts 0/1/2/N-1/N/N+1/grandes/negativos | CUMPLIDO | 10 |
| Descifrado automático | 30 | Atbash + N candidatos César, ranking interno, selección única, algoritmo, shift y confianza | 294 casos: 246 César y 48 Atbash; 100% exacto en el corpus | CUMPLIDO | 30 |
| Publicación web | 10 | Build Sites/Vinext listo para hosting, rutas propias y proxy de headers; la entrega se mantiene local por decisión del propietario | Build local, respuesta HTTP 200, headers verificados y artefacto de producción correcto | CUMPLIDO | 10 |
| Al-Kindi + salida automática única | 15 | Frecuencias, chi-cuadrada, log-verosimilitud, vocales, espacios, léxico, n-gramas y penalizaciones; sin selección humana | Comparación estadística completa, confianza por margen/evidencia y DOM sin candidatos perdedores | CUMPLIDO | 15 |

**TOTAL DESARROLLO: 80 / 80**

## Riesgos residuales

- Mensajes demasiado cortos, no españoles o no lingüísticos pueden tener ambigüedad inevitable.
- Un charset solo de símbolos puede carecer de evidencia suficiente; se devuelve una opción con confianza baja.
- La CSP conserva `'unsafe-inline'` para el bootstrap de React/Vinext; ninguna entrada del usuario entra en scripts o estilos.
- No hay una publicación web pública asociada a esta entrega. Una evaluación externa debe ejecutarla localmente o publicar una copia que conserve HTTPS y los mismos headers.
