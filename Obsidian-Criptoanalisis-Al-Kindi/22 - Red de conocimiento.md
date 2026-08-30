---
aliases: [Grafo del proyecto, Red neuronal del conocimiento]
tags: [moc, grafo, conocimiento]
---

# Red de conocimiento

Esta es la “red neuronal” conceptual del proyecto: nodos de conocimiento y relaciones explícitas. No es una red neuronal de aprendizaje automático.

```mermaid
graph TD
  Proyecto[Criptoanálisis Al-Kindi]
  Proyecto --> UI[Estado e interfaz]
  Proyecto --> Motor[Motor criptográfico]
  Proyecto --> Seguridad[Seguridad]
  Proyecto --> Publicacion[Publicación]
  Proyecto --> Teoria[Teoría]

  Motor --> Charset[Charset]
  Charset --> Unicode[Unicode]
  Unicode --> Validacion[Validación]
  Motor --> Cesar[César]
  Motor --> Atbash[Atbash]
  Cesar --> Detector[Detector]
  Atbash --> Detector

  Teoria --> Kindi[Al-Kindi]
  Kindi --> Frecuencias[Frecuencias]
  Frecuencias --> Chi[Chi-cuadrada]
  Frecuencias --> Scoring[Scoring]
  Ngramas[N-gramas] --> Scoring
  Lexico[Léxico] --> Scoring
  Scoring --> Detector
  Detector --> Confianza[Confianza]

  UI --> Detector
  UI --> Cesar
  UI --> Atbash
  Seguridad --> XSS[XSS]
  Seguridad --> CSP[CSP]
  Seguridad --> Privacidad[Privacidad]
  Seguridad --> Limites[Límites]
  Limites --> Detector
  Publicacion --> Export[Exportación estática]
  Export --> Pages[GitHub Pages]
  Pages --> Actions[GitHub Actions]
```

## Navegación por relaciones

- [[10 - Charset personalizado]] depende de [[11 - Unicode NFC y grafemas]].
- [[12 - Validacion y limites]] protege [[03 - Descifrado automatico]].
- [[06 - Al-Kindi y analisis de frecuencias]] fundamenta [[07 - Scoring del español]].
- [[08 - Chi-cuadrada y log-verosimilitud]] y [[09 - N-gramas y señales lingüisticas]] alimentan el score.
- [[14 - Estado e interfaz]] expone [[02 - Flujo de cifrado]] y el detector.
- [[17 - XSS CSP y headers]] protege la salida web.
- [[18 - Ambiguedad y confianza]] limita las afirmaciones del detector.
- [[32 - Publicacion en GitHub Pages]] conecta configuración, artefacto y despliegue.

## Centro recomendado del Graph

Usa [[00 - Inicio]] como nodo inicial y [[01 - Mapa del sistema]] como hub técnico.
