# Seguridad web

## Modelo de datos

Los mensajes viven en estados de React dentro del navegador. El codigo del proyecto no usa `fetch`, XMLHttpRequest, WebSocket de aplicacion, cookies, `localStorage`, `sessionStorage`, IndexedDB ni telemetria. Tampoco contiene un backend de mensajes.

El servidor local entrega recursos y cabeceras. GitHub Pages entrega el export estatico y HTTPS, pero no ejecuta la configuracion dinamica de cabeceras. La afirmacion de “procesamiento local” se sustenta en el flujo actual del codigo, pero siempre debe reevaluarse si se añaden librerias, analitica o servicios.

## Salida y XSS

Los valores del usuario se renderizan como expresiones JSX. React escapa texto. No existe `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` ni inyeccion de scripts. La documentacion oficial advierte que `dangerouslySetInnerHTML` debe usarse con extremo cuidado: [React DOM common components](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html).

Esto reduce fuertemente XSS reflejado dentro del flujo actual. No convierte automaticamente en seguras futuras inserciones HTML, URLs o atributos dinamicos.

## Content Security Policy

`next.config.ts` construye esta politica para la rama de servidor:

```text
default-src 'self'
base-uri 'self'
object-src 'none'
frame-ancestors 'none'
form-action 'self'
script-src 'self' 'unsafe-inline'
style-src 'self' 'unsafe-inline'
img-src 'self' data:
font-src 'self'
connect-src 'self' [ws: solo en desarrollo]
manifest-src 'self'
worker-src 'self'
upgrade-insecure-requests
```

### Interpretacion

- `default-src 'self'`: origen propio por defecto.
- `base-uri 'self'`: limita cambios del URL base.
- `object-src 'none'`: bloquea plugins embebidos.
- `frame-ancestors 'none'`: evita enmarcado y clickjacking.
- `form-action 'self'`: formularios solo al mismo origen.
- `script-src`: scripts propios, pero permite inline.
- `style-src`: estilos propios e inline.
- `img-src`: propias y `data:`.
- `font-src`: propias.
- `connect-src`: conexiones propias; WebSocket en desarrollo para recarga.
- `upgrade-insecure-requests`: solicita actualizar recursos HTTP a HTTPS.

Referencias: [W3C Content Security Policy Level 3](https://www.w3.org/TR/CSP3/) y [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html).

## Debilidad residual de CSP

`'unsafe-inline'` en `script-src` reduce la fuerza contra scripts inyectados. Puede ser una necesidad de compatibilidad del framework actual, pero una mejora seria usar nonces o hashes compatibles con la plataforma y eliminarlo despues de pruebas. `style-src 'unsafe-inline'` es menos critico que scripts, aunque tambien amplia superficie.

Una CSP es defensa en profundidad, no sustituto de salida segura.

## Otras cabeceras

| Cabecera | Valor | Proposito |
|---|---|---|
| `Cross-Origin-Opener-Policy` | `same-origin` | aisla contexto de apertura |
| `Cross-Origin-Resource-Policy` | `same-origin` | restringe carga por otros origenes |
| `Permissions-Policy` | desactiva camara, microfono, ubicacion, pagos, USB | minimiza capacidades |
| `Referrer-Policy` | `no-referrer` | no envia URL como referencia |
| `X-Content-Type-Options` | `nosniff` | evita adivinar MIME |
| `X-Frame-Options` | `DENY` | defensa heredada contra frames |

`frame-ancestors 'none'` y `X-Frame-Options: DENY` se complementan para navegadores modernos y antiguos.

## Cabeceras y entorno

Las cabeceras solo protegen si la plataforma ejecuta `headers()` de `next.config.ts`. Se verificaron al servir localmente con Vinext. GitHub Pages no ejecuta esa funcion y este repositorio no puede configurarlas para ese hosting; alli quedan HTTPS y las defensas que viajan dentro del HTML/JavaScript. Un hosting con control de headers podria reproducir la politica. Siempre debe comprobarse el entorno real en Network.

## Validacion y disponibilidad

Los limites de 128 grafemas, 12,000 de mensaje y 1,500,000 unidades de analisis reducen congelamientos. No son una garantia formal de disponibilidad porque scoring hace mas trabajo que la estimacion simple. OWASP describe controles contra agotamiento de recursos en su [Denial of Service Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html).

## Portapapeles

La aplicacion solo escribe el cifrado tras un clic. No lee datos. Riesgos restantes:

- el contenido pasa al portapapeles del sistema y otras aplicaciones pueden verlo;
- el navegador puede rechazar por permisos o contexto no seguro;
- extensiones maliciosas quedan fuera del control del proyecto.

## Dependencias

La cadena de suministro incluye React, Vinext, Vite, Base UI, Tailwind y utilidades. `package-lock.json` fija resoluciones, y `overrides` fija `esbuild` y `undici`. Aun asi deben ejecutarse auditorias y revisarse avisos. Un resultado limpio de auditoria hoy no garantiza el futuro.

## Secretos y configuracion

No hay secretos en el codigo revisado. `.gitignore` excluye `.env*`, pero ignorar un archivo no elimina secretos que ya hayan sido confirmados en Git. Si se añaden servicios, deben usarse variables apropiadas y rotacion.

## Amenazas fuera de alcance

- dispositivo comprometido;
- extension de navegador maliciosa;
- captura de pantalla o teclado;
- portapapeles inspeccionado por otras apps;
- paquete de dependencia comprometido;
- hosting que altere recursos;
- ataques fisicos;
- confidencialidad criptografica de Cesar/Atbash.

## Lista de comprobacion

1. Verificar cabeceras tras cada cambio de plataforma y documentar cuando el hosting no las admita.
2. Mantener ausencia de sumideros HTML peligrosos.
3. Ejecutar `npm audit` y revisar dependencias directas.
4. Mantener limites y medir rendimiento.
5. No introducir almacenamiento o red sin actualizar el aviso de privacidad.
6. Probar teclado, anuncios ARIA y foco.
7. Intentar eliminar `unsafe-inline` con nonces/hashes.
8. No usar esta aplicacion para datos sensibles.

## Conclusion de seguridad

La aplicacion posee buenas decisiones defensivas: procesamiento cliente, salida textual y limites funcionan tanto localmente como en Pages; las cabeceras adicionales solo funcionan con el servidor Vinext. Su CSP de servidor admite inline y los cifrados son criptograficamente rotos. “Web razonablemente endurecida” y “cifrado seguro” son evaluaciones distintas.
