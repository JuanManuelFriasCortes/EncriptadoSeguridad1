---
aliases: [Privacidad, Procesamiento local]
tags: [privacidad, navegador, datos]
---

# Privacidad y procesamiento local

## Flujo de datos

Los mensajes viven en estados React del navegador. El motor se importa en el bundle del cliente y procesa strings en memoria.

No se usan:

- base de datos;
- API de mensajes;
- `fetch` o XHR;
- WebSocket para datos del usuario;
- `localStorage` o `sessionStorage`;
- cookies de aplicación;
- query strings o fragments;
- analytics.

## Qué sí viaja

El navegador solicita al servidor local HTML, JavaScript y CSS. La afirmación de privacidad se refiere al **contenido introducido**, que no se envía por el flujo implementado.

## Portapapeles

`navigator.clipboard.writeText` se ejecuta solo después de pulsar Copiar. La aplicación no lee el portapapeles.

## Duración

El estado desaparece al cerrar o recargar la pestaña. No existe persistencia intencional.

## Límites del modelo

Una extensión, malware, captura de pantalla o equipo comprometido puede observar datos. Eso queda fuera de [[16 - Modelo de amenazas]].

## Conexiones

- Renderizado: [[17 - XSS CSP y headers]].
- UI: [[14 - Estado e interfaz]].
- Uso educativo: [[04 - Cifrado Cesar]] y [[05 - Cifrado Atbash]].
