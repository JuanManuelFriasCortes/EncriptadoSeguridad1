---
aliases: [Glosario del proyecto]
tags: [glosario, conceptos]
---

# Glosario

**ASCII:** codificación histórica de 128 valores básicos. El proyecto admite ASCII, pero no se limita a él.

**Atbash:** sustitución que invierte el orden del alfabeto. Véase [[05 - Cifrado Atbash]].

**Bigramas / trigramas:** secuencias de dos o tres elementos. Véase [[09 - N-gramas y señales lingüisticas]].

**Candidato:** plaintext hipotético generado al intentar una transformación.

**Charset:** secuencia ordenada usada como alfabeto real. Véase [[10 - Charset personalizado]].

**Chi-cuadrada:** medida de discrepancia entre conteos observados y esperados. Véase [[08 - Chi-cuadrada y log-verosimilitud]].

**Ciphertext:** mensaje cifrado.

**Cifrado:** transformación parametrizada de plaintext a ciphertext.

**Cifrado monoalfabético:** cada símbolo del alfabeto se sustituye consistentemente por otro.

**CSP:** Content Security Policy; política del navegador que restringe recursos y comportamientos. Véase [[17 - XSS CSP y headers]].

**Criptoanálisis:** estudio de métodos para recuperar información sin conocer directamente la clave.

**César:** sustitución por desplazamiento modular. Véase [[04 - Cifrado Cesar]].

**DOM:** representación de la página manipulada por el navegador.

**Evidencia:** cantidad de texto lingüísticamente útil para estimar confianza.

**Fachada:** módulo que reexporta una API simplificada; `lib/crypto/index.js`.

**Grafema:** unidad percibida por el usuario como carácter. Véase [[11 - Unicode NFC y grafemas]].

**Heurística:** método práctico que produce buenas estimaciones sin garantía matemática universal.

**Homoglifo:** carácter visualmente similar a otro, aunque sea diferente en Unicode.

**Involución:** función que al aplicarse dos veces devuelve la entrada; propiedad de Atbash.

**JSDoc:** comentarios estructurados que documentan funciones, parámetros y retorno.

**Log-verosimilitud:** suma logarítmica de plausibilidades de observaciones.

**Margen:** diferencia entre score del primer y segundo candidato.

**Módulo:** operación que devuelve un residuo; en César mantiene índices dentro del charset.

**NFC:** forma de normalización Unicode con composición canónica.

**N-grama:** secuencia contigua de `n` elementos.

**Plaintext:** texto sin cifrar o resultado candidato.

**Ranking:** orden de candidatos por score y reglas de desempate.

**React state:** memoria temporal del componente mientras la página está abierta.

**Roundtrip:** verificar que descifrar lo cifrado devuelve el original.

**Score:** valor agregado de compatibilidad con español. Véase [[07 - Scoring del español]].

**Shift:** desplazamiento usado por César.

**Supply chain:** riesgo introducido por dependencias y herramientas externas.

**Unicode:** estándar de representación de texto mundial.

**UTF-16:** codificación interna de strings JavaScript basada en unidades de 16 bits.

**Vinext:** toolchain que ejecuta el modelo de aplicación empleado sobre Vite.

**XSS:** inyección de contenido que logra ejecutar JavaScript en una página.
