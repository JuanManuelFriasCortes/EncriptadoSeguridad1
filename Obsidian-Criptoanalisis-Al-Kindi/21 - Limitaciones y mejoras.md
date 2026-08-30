---
aliases: [Mejoras futuras, Deuda técnica]
tags: [limitaciones, roadmap, seguridad]
---

# Limitaciones y mejoras

## Limitaciones actuales

1. [[18 - Ambiguedad y confianza]] en textos cortos.
2. Modelo centrado en español.
3. Scoring heurístico no entrenado ni calibrado.
4. Cálculo síncrono en el hilo principal.
5. Fallback Unicode menos completo sin `Intl.Segmenter`.
6. CSP con `'unsafe-inline'`.
7. Dependencias npm y riesgo de supply chain.
8. GitHub Pages no permite las cabeceras personalizadas configuradas para Vinext.
9. La publicación depende de GitHub Actions y de la configuración Pages del repositorio.
10. Las pruebas automatizadas históricas ya no están en la rama actual.

## Mejoras priorizadas

### Alta prioridad

- restaurar pruebas automatizadas y ejecutarlas en CI;
- verificar en cada despliegue la URL, los recursos y el estado de GitHub Actions;
- añadir corpus externo versionado;
- mover análisis pesado a Web Worker.

### Media prioridad

- calibrar confianza con un conjunto de validación separado;
- modelos de idioma configurables;
- ampliar n-gramas con datos documentados;
- usar CSP con nonces o hashes.

### Baja prioridad

- exportar resultados de forma local;
- modo didáctico que explique el score sin permitir selección manual;
- métricas de rendimiento visibles solo en desarrollo.

## Criterio para cambios

Una mejora del detector debe beneficiar patrones generales, no memorizar frases. Debe compararse con una regresión para evitar sobreajuste.

## Conexiones

[[07 - Scoring del español]], [[12 - Validacion y limites]], [[16 - Modelo de amenazas]], [[20 - Desarrollo y verificacion]].
