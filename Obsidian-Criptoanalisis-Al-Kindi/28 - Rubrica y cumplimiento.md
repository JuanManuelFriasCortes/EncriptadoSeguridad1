---
aliases: [Rúbrica, Evaluación]
tags: [rubrica, auditoria, proyecto]
---

# Rúbrica y cumplimiento

## Estado técnico

| Requisito | Evidencia | Estado |
| --- | --- | --- |
| Documentación segura | Guía completa, red Obsidian, JSDoc, advertencias | Cumplido técnicamente |
| Charset ASCII/no ASCII | Campo editable, presets Unicode, NFC y grafemas | Cumplido |
| Cifrado César/Atbash | Selector, shift y transformaciones por `N` real | Cumplido |
| Descifrado automático | `rankCandidates` y `analyzeCiphertext` | Cumplido |
| Publicación web | Export estático, workflow oficial y URL de GitHub Pages | Cumplido técnicamente |
| Al-Kindi + salida única | Score multiseñal y un ganador | Cumplido |

## Puntuación actual estimada

Con la documentación y la publicación automatizada, la estimación técnica es:

```text
80 / 80
```

La evidencia de publicación es [[32 - Publicacion en GitHub Pages]]. El cumplimiento operativo debe reconfirmarse viendo el workflow verde y cargando la URL; un repositorio con código por sí solo no equivale a una aplicación accesible.

## Evidencia conectada

- Documentación: [[00 - Inicio]], `GUIA_TECNICA_COMPLETA.md`.
- Funcionalidad: [[02 - Flujo de cifrado]], [[03 - Descifrado automatico]].
- Al-Kindi: [[06 - Al-Kindi y analisis de frecuencias]].
- Seguridad: [[16 - Modelo de amenazas]], [[17 - XSS CSP y headers]].
- Historial de pruebas: [[20 - Desarrollo y verificacion]].
- Publicación: [[32 - Publicacion en GitHub Pages]].
