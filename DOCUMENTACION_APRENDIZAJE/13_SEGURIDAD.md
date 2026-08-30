# Seguridad real del proyecto

## Modelo de amenazas

Se consideran entrada hostil en campos, inyeccion en la pagina, clickjacking, permisos innecesarios, referencias, MIME, cargas grandes, portapapeles y dependencias. No se protege un equipo/extensiones comprometidos ni se ofrece criptografia fuerte.

## Matriz implementacion/riesgo

| Mecanismo | ¿Implementado? | Donde/como | Mitiga | No protege |
|---|---|---|---|---|
| salida textual | si | JSX `{value}` | HTML injection/XSS de texto | futuros sinks peligrosos |
| `textContent` | no directo | React realiza insercion segura equivalente | mismo contexto textual | URLs/HTML futuros |
| `innerHTML` | no usado | busqueda de fuente sin coincidencia | evita sink XSS | dependencias/extensiones |
| `eval` | no usado | sin evaluacion dinamica | inyeccion de codigo | scripts permitidos de origen |
| procesamiento local | si en flujo actual | estado + funciones cliente, sin fetch | fuga a backend/registro | memoria, DOM, dispositivo |
| no almacenamiento | si | sin cookies/storage/DB | persistencia accidental | clipboard/captura |
| limites | si | constants/validation | DoS accidental | costo exacto/scoring adverso |
| CSP | si en servidor Vinext | `next.config.ts` mediante `headers()` | carga/ejecucion/frame | GitHub Pages no admite estas cabeceras dinamicas |
| clickjacking | si | frame-ancestors none + XFO DENY | enmarcado | engaño fuera del frame |
| permisos | si | Permissions-Policy | camara/mic/etc. | capacidades no listadas |
| HTTPS | no configurado en codigo | actualmente local HTTP | depende de servidor | algoritmos debiles |
| secretos Git | preventivo | `.env*` ignorado | accidente nuevo | historial previo/secretos hardcodeados |

## XSS, HTML y DOM

`<p>{automaticResult?.plaintext}</p>` hace que React escape `<`, `>` y otros caracteres. Pegar `<script>alert(1)</script>` lo muestra como texto; no crea un script. `textContent` seria la propiedad DOM segura equivalente para texto, pero el proyecto no manipula DOM directamente.

`innerHTML` interpreta marcado y seria peligroso con entrada no confiable. `eval` interpretaria strings como codigo. Ambos estan ausentes y no son necesarios.

## CSP real

Restringe recursos al propio origen, objetos/frames, acciones de formulario, imagenes/data, fuentes, conexiones y workers. En desarrollo admite `ws:`. La debilidad principal es `'unsafe-inline'` para scripts/estilos. Consultar `CODIGO/next_config_ts.md`.

## Dependencias

No significa usar cero dependencias: el proyecto usa varias para framework/UI/build. El principio es minimizar, fijar lockfile, auditar y revisar actualizaciones. Cada paquete amplia cadena de suministro.

## Portapapeles

Solo se escribe tras clic; nunca se lee. El dato sale de la pagina hacia un recurso global del sistema, donde otras apps pueden observarlo. El rechazo se maneja sin detalle interno.

## Unicode

NFC/Segmenter evitan errores, pero no homoglifos. Un atacante puede usar simbolos visualmente parecidos de otras escrituras. No existe normalizacion “de seguridad” general que deba aplicarse ciegamente a mensajes.

## DoS de navegador

El calculo ocurre en hilo principal. Limites reducen riesgo, pero `M*(N+1)` no cuenta toda la puntuacion. Web Worker/cancelacion serian mejoras.

## Seguridad de implementacion vs criptografia

La aplicacion evita varias clases de fallo web; Cesar tiene maximo `N` shifts y Atbash ninguna clave numerica. Por eso ambos siguen siendo inseguros para secretos. Ver `28_SEGURIDAD_VS_CRIPTOGRAFIA.md`.

## Hosting

Las cabeceras deben verificarse donde se sirva. En el servidor local se comprobaron CSP, `DENY` y `nosniff`; GitHub Pages sirve HTTPS, pero no permite definir estas cabeceras HTTP desde el repositorio. La proteccion portable en ambos entornos sigue siendo el renderizado textual seguro, la ausencia de sinks HTML y la validacion.
