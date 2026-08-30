# Criptoanálisis Al-Kindi

Aplicación web educativa que cifra mensajes con César o Atbash sobre un conjunto de caracteres editable y descifra automáticamente una única respuesta probable mediante análisis estadístico del español inspirado en Al-Kindi.

> César y Atbash no ofrecen seguridad criptográfica moderna. No deben usarse para contraseñas, credenciales ni información sensible.

## Objetivo técnico

El usuario proporciona únicamente el texto cifrado y el conjunto ordenado. El programa genera en memoria el candidato Atbash y todos los desplazamientos César, puntúa cada resultado, selecciona el mejor y devuelve algoritmo, desplazamiento normalizado cuando aplica, plaintext y confianza estimada. Nunca solicita que una persona elija entre candidatos.

## Características

- Conjunto editable de 2 a 128 grafemas, con presets opcionales.
- Unicode NFC y segmentación por grafemas mediante `Intl.Segmenter`, con fallback a `Array.from`.
- Detección explícita de vacío, duplicados canónicos, espacios y exceso de longitud.
- César modular sobre el tamaño N real, con desplazamientos cero, negativos y grandes.
- Atbash sobre el mismo conjunto; los caracteres externos se conservan.
- Descifrado automático optimizado para español con confianza baja, media o alta.
- Procesamiento en memoria: sin backend, base de datos, cookies, almacenamiento, analytics ni APIs de mensajes.
- Interfaz responsive, labels, controles semánticos, foco visible y regiones `aria-live`.

## Arquitectura

| Ruta | Responsabilidad |
| --- | --- |
| `app/` | Ruta, metadatos globales y tema visual |
| `components/crypto-workbench.tsx` | Estado e interacción; React escapa toda salida como texto |
| `lib/crypto/unicode.js` | NFC y grafemas |
| `lib/crypto/validation.js` | Límites y validaciones centralizadas |
| `lib/crypto/ciphers.js` | César y Atbash independientes del DOM |
| `lib/crypto/language-data.js` | Frecuencias, léxico y patrones generales del español |
| `lib/crypto/scoring.js` | Score lingüístico multiseñal |
| `lib/crypto/analyzer.js` | Generación, ranking, selección y confianza |
| `tests/` | Unitarias, detección, seguridad, corpus y métricas |
| `proxy.ts` | Headers HTTP defensivos verificados |

El proyecto usa el scaffold de publicación Sites con React/Vinext y controles shadcn. El motor criptográfico continúa siendo JavaScript puro, determinista, sin dependencias externas y ejecutado en el navegador.

## Conjunto personalizado y Unicode

El conjunto define una lista ordenada de grafemas. Antes de operar se normaliza a NFC; por eso `é` y `e` + acento combinado se consideran equivalentes y, si aparecen ambas, se informa el duplicado en vez de eliminarlo. Los espacios se rechazan para evitar transformar accidentalmente la señal de separación entre palabras. Todo carácter del mensaje ausente del conjunto se conserva sin cambios.

Límites defensivos:

- conjunto: 128 grafemas;
- mensaje: 12,000 grafemas;
- análisis: 1,500,000 operaciones candidatas aproximadas.

## César

Para N caracteres, el cifrado aplica `(índice + shift) mod N`; el descifrado aplica `(índice - shift + N) mod N`. El desplazamiento se normaliza con `((shift % N) + N) % N`. Un valor como N se reporta como desplazamiento normalizado 0.

## Atbash

Cada índice `i` se sustituye por `N - 1 - i`. La función es involutiva: aplicarla dos veces devuelve el texto original normalizado.

## Descifrado automático y Al-Kindi

`rankCandidates` produce internamente N candidatos César y uno Atbash. `scoreSpanish` combina:

- distribución esperada de letras y chi-cuadrada;
- log-verosimilitud de frecuencias;
- proporción de vocales y espacios;
- palabras frecuentes como señal auxiliar;
- bigramas, trigramas y secuencias frecuentes;
- estructura de palabras y penalizaciones por secuencias improbables;
- longitud y cantidad de evidencia.

La confianza depende del score ganador, su margen respecto al segundo y la evidencia disponible. No es probabilidad matemática ni garantía del plaintext original.

## Ejecución local

Requiere Node.js 22.13 o posterior.

```powershell
npm install
npm run dev
```

Abrir `http://localhost:3000/`. Los mensajes no se incluyen en URL ni se escriben a disco.

## Pruebas

```powershell
npm test
npm run test:metrics
npm run lint
npm run build
npm audit
```

La última regresión registrada en `tests/latest-metrics.json` contiene 294 detecciones: 246 César y 48 Atbash. El corpus incluye mayúsculas, minúsculas, alfabetos con acentos y conjuntos alfanuméricos. Las pruebas unitarias cubren Unicode, emojis, símbolos, roundtrips, límites y cargas XSS. Las métricas se recalculan; no están escritas dentro del detector.

## Seguridad y privacidad

La UI no utiliza `innerHTML`, `eval`, ejecución dinámica, red, cookies ni almacenamiento del navegador. El portapapeles se escribe solo tras pulsar Copiar. `proxy.ts` aplica CSP, `frame-ancestors 'none'`, `nosniff`, `no-referrer`, restricciones de permisos y protección contra framing. La CSP permite scripts y estilos inline exclusivamente por el bootstrap de React/Vinext; el código de usuario nunca se ejecuta.

Consulta `SECURITY.md` para el modelo de amenazas y la política de reporte.

## Limitaciones

- Un cifrado clásico no contiene información suficiente para garantizar el original en textos muy cortos o no lingüísticos.
- El score está optimizado para español; otros idiomas pueden obtener una selección incorrecta.
- Un conjunto compuesto solo por símbolos o emojis puede carecer de evidencia lingüística.
- La confianza es heurística y debe interpretarse como separación estadística entre candidatos.
- Este laboratorio protege la entrada frente a la aplicación, pero no convierte César o Atbash en criptografía segura.

## Despliegue

El build produce un Worker estático/SSR compatible con Sites y Cloudflare. Antes de publicar:

```powershell
npm test
npm run test:metrics
npm audit
npm run build
```

La plataforma debe servir por HTTPS y conservar los headers de `proxy.ts`. Para otro proveedor estático, reproduce esos headers en su configuración; GitHub Pages no permite definirlos directamente, por lo que ofrece menos control de seguridad.

El guion de exposición está en `DEMO.md`.
