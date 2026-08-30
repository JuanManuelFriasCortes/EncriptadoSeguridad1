# Seguridad

## Alcance

La aplicación es un laboratorio educativo local. No recibe, transmite ni persiste mensajes. Los algoritmos César y Atbash son históricamente relevantes, pero criptográficamente inseguros.

No uses esta aplicación para proteger contraseñas, información bancaria, datos personales sensibles, datos médicos, credenciales, secretos empresariales ni llaves de acceso.

## Modelo de amenazas

| Amenaza | Riesgo | Impacto | Mitigación |
| --- | --- | --- | --- |
| DOM XSS | Entrada con etiquetas o eventos | Ejecución de script | React renderiza texto escapado; no hay `innerHTML` ni APIs equivalentes |
| Inyección HTML | Payload mostrado como resultado | Manipulación visual del DOM | Salidas en nodos de texto; pruebas con `script`, `img`, `svg` e `iframe` |
| Supply chain | Dependencia comprometida | Código de build o runtime malicioso | Lockfile, versiones fijadas/compatibles, cero CDN y `npm audit` |
| Secretos expuestos | Credencial incluida en Git | Acceso no autorizado | No hay secretos; `.env*`, llaves y logs están ignorados |
| Almacenamiento accidental | Mensajes en storage o cookies | Persistencia no esperada | No se usa `localStorage`, `sessionStorage`, IndexedDB ni cookies |
| Exposición por URL | Texto en query o fragment | Historial y enlaces compartidos | La aplicación no modifica ni lee la URL para transportar mensajes |
| Exposición por logs | Texto escrito en consola o servidor | Filtración local/remota | No se registran mensajes ni candidatos |
| Entradas gigantes | Cómputo candidato excesivo | Congelamiento del navegador | Límites de mensaje, charset y producto de operaciones |
| Unicode inesperado | Formas equivalentes o grafemas compuestos | Duplicados, corrupción o transformación parcial | NFC, `Intl.Segmenter`, fallback y pruebas con acentos/emojis |
| Charset malicioso | Duplicados o whitespace | Transformación ambigua | Validación centralizada sin corrección silenciosa |
| Manipulación del DOM | Extensiones o consola alteran la página | Resultados falsos | Modelo local no confía en DOM externo; CSP reduce fuentes ejecutables |
| Clickjacking | Sitio embebido por tercero | Interacciones engañosas | CSP `frame-ancestors 'none'` y `X-Frame-Options: DENY` |
| Hosting mal configurado | HTTP o headers ausentes | Intercepción o menor aislamiento | Sites/Cloudflare con HTTPS; headers aplicados por `proxy.ts` |
| Ingeniería social | Presentar César como protección real | Exposición de información | Advertencia visible y documentación explícita |
| Falso positivo criptoanalítico | Texto corto o no español | Plaintext seleccionado incorrecto | Salida única exigida, confianza basada en evidencia y límites documentados |
| DoS del analizador | Charset por mensaje grande | Uso elevado de CPU | Máximo de 1.5 millones de operaciones candidatas estimadas |

## Controles implementados

- CSP con origen propio, sin objetos, sin framing y sin conexiones externas.
- `Referrer-Policy: no-referrer` y `X-Content-Type-Options: nosniff`.
- `Permissions-Policy` niega cámara, micrófono, geolocalización, pagos y USB.
- `Cross-Origin-Opener-Policy` y `Cross-Origin-Resource-Policy` en mismo origen.
- Cero APIs externas, analytics, trackers, backend o lectura del portapapeles.
- Escritura al portapapeles únicamente por acción explícita.
- Tests estáticos que fallan si aparecen APIs peligrosas o de persistencia/red.

## CSP y limitación del framework

React/Vinext necesita bootstrap inline para hidratar la interfaz, por lo que `script-src` y `style-src` incluyen `'unsafe-inline'`. La aplicación no evalúa entrada del usuario y los mensajes nunca se interpolan en scripts o estilos. Una evolución futura podría aplicar nonces por respuesta para retirar esa excepción.

## Dependencias

El motor en `lib/crypto/` no depende de paquetes externos. Las dependencias restantes pertenecen a la UI y al pipeline Sites. Ejecuta `npm audit` antes de publicar y actualiza solo versiones compatibles tras repetir pruebas y build.

## Reporte responsable

No incluyas mensajes sensibles, tokens ni credenciales en un reporte. Describe el archivo, el comportamiento reproducible, el impacto y una entrada sintética mínima.
