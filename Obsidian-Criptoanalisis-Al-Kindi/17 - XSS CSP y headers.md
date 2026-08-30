---
aliases: [XSS, CSP, Headers de seguridad]
tags: [seguridad-web, xss, csp, headers]
---

# XSS, CSP y headers

## Defensa primaria contra XSS

La aplicación renderiza entradas como nodos de texto JSX:

```tsx
{encrypted}
{automaticResult?.plaintext}
```

No usa `innerHTML`, `document.write` ni `dangerouslySetInnerHTML`. React señala que HTML crudo no confiable permite XSS; consulta [React: dangerously setting inner HTML](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

## CSP en `next.config.ts`

```text
default-src 'self'
base-uri 'self'
object-src 'none'
frame-ancestors 'none'
form-action 'self'
connect-src 'self'
```

La [especificación CSP de W3C](https://www.w3.org/TR/CSP3/) define estas restricciones. [[16 - Modelo de amenazas]] las trata como defensa en profundidad. Esta configuración se aplica cuando Vinext controla la respuesta local.

## Otros headers

- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: no-referrer`.
- `Permissions-Policy` deshabilita sensores y pagos.
- `X-Frame-Options: DENY` aporta compatibilidad.
- COOP y CORP refuerzan aislamiento.

## Riesgo residual

`script-src` y `style-src` permiten `'unsafe-inline'` por necesidades del bootstrap actual. Es menos fuerte que nonces o hashes. No convierte la entrada en código, pero amplía lo permitido por CSP si apareciera otro sink.

GitHub Pages es hosting estático y no ejecuta `headers()` de Vinext. Allí no están estas cabeceras personalizadas; siguen vigentes HTTPS de GitHub, el escape de React, la ausencia de sinks HTML y la validación. Véase [[32 - Publicacion en GitHub Pages]].

## Regla de oro

CSP no sustituye el renderizado seguro. [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) recomienda usarla como capa adicional.

## Prueba mental

Entrada:

```html
<img src=x onerror=alert(1)>
```

Resultado esperado: esos caracteres se ven como texto; no aparece una imagen ni se ejecuta `alert`.
