---
aliases: [Historia del desarrollo, Verificación]
tags: [desarrollo, pruebas, auditoria]
---

# Desarrollo y verificación

## Etapas

1. extracción de requisitos;
2. modelo de amenazas;
3. motor Unicode y validación;
4. [[04 - Cifrado Cesar]] y [[05 - Cifrado Atbash]];
5. datos estadísticos;
6. [[03 - Descifrado automatico]];
7. interfaz React;
8. seguridad y headers;
9. regresión y prueba de navegador;
10. simplificación para ejecución local;
11. documentación técnica y red Obsidian;
12. exportación estática y publicación automatizada en GitHub Pages.

## Regresión histórica

Antes de la limpieza solicitada del repositorio se ejecutaron:

- 334 pruebas automatizadas aprobadas;
- 294 detecciones de corpus aprobadas;
- 246 casos César con algoritmo, shift y plaintext correctos;
- 48 casos Atbash correctos;
- lint y build correctos;
- pruebas XSS en navegador;
- auditoría npm sin vulnerabilidades conocidas.

> [!important]
> Los archivos de esas pruebas fueron eliminados posteriormente. Los resultados describen el corpus ejecutado en ese momento y no demuestran infalibilidad universal.

## Verificación del estado mínimo

Después de eliminar archivos y dependencias auxiliares se comprobó:

- `npm install`;
- `npm run build`;
- `npm start`;
- respuesta HTTP 200;
- headers CSP;
- cifrado César;
- involución Atbash;
- detección automática de un César con shift 3;
- consola del navegador sin errores;
- `npm audit`: cero vulnerabilidades conocidas en esa fecha.

## Verificación del arreglo de Pages

Se comprobó:

- `npm run build:pages` termina correctamente;
- existe `dist/client/index.html`;
- existe `.nojekyll`;
- `_next` queda en la raíz del artefacto;
- las siete referencias del HTML apuntan a archivos existentes;
- un servidor que reproduce `/EncriptadoSeguridad1/` devuelve 200 para la página y los siete recursos;
- el navegador cifra una frase con César 3, la recupera automáticamente y no registra errores de consola;
- `npm run build` normal continúa funcionando;
- `http://localhost:3000/` responde 200 con CSP, `DENY` y `nosniff`.

El workflow repite la instalación limpia con `npm ci` antes de publicar. Consulta [[32 - Publicacion en GitHub Pages]].

## Pruebas recomendadas futuras

- restaurar tests unitarios en una rama de desarrollo;
- corpus separado de los datos lingüísticos;
- casos aleatorios de roundtrip;
- Unicode con ZWJ y modificadores;
- payloads XSS;
- pruebas de viewport;
- prueba de headers en el hosting real.

Relacionado: [[21 - Limitaciones y mejoras]].
