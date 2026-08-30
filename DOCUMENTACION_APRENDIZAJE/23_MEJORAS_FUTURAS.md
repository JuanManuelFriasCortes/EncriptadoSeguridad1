# Mejoras futuras sin modificar el sistema actual

## Mejoras sencillas

| Mejora | Beneficio | Complejidad | Riesgos | Archivos probables |
|---|---|---|---|---|
| pruebas de inversas | protege matematicas | baja | falsa cobertura si son pocas | nuevos tests, package.json |
| casos de validacion | protege fronteras | baja | olvidar Unicode | tests de validation/unicode |
| marcar resultado obsoleto | evita confusion UX | baja | mas estado | crypto-workbench.tsx |
| etiqueta “heuristica” | evita mala interpretacion | baja | texto visual | crypto-workbench.tsx |
| verificacion de cabeceras | detecta perdida CSP en servidor | baja-media | Pages no admite personalizarlas | tests/next.config |

## Mejoras intermedias

| Mejora | Beneficio | Complejidad | Riesgos | Archivos probables |
|---|---|---|---|---|
| corpus de evaluacion | mide exactitud | media | sesgo/fuga entrenamiento | datos/tests/scoring |
| umbral no concluyente | reduce falsos seguros | media | tension con salida obligatoria | analyzer/UI |
| Web Worker | UI responsiva | media | serializacion/cancelacion | analyzer, nuevo worker, UI |
| conservar solo top 2 | menos memoria | media | cambia acceso de pruebas | analyzer |
| explicacion de score | aprendizaje | media | no delegar decision humana | UI/scoring |
| tipar motor | contratos mejores | media | migracion/config | lib/crypto, tsconfig |
| CSP nonce/hash | defensa XSS | media-alta | compatibilidad y hosting estatico | next.config/layout/hosting |

## Mejoras avanzadas

| Mejora | Beneficio | Complejidad | Riesgos | Archivos probables |
|---|---|---|---|---|
| tetragramas entrenados | mejor estructura | alta | corpus/licencia/sobreajuste | language-data/scoring |
| varios idiomas | mayor alcance | alta | deteccion/modelos/tamaño | nuevos datos/analyzer/UI |
| calibracion probabilistica | porcentaje interpretable | alta | datos insuficientes | analyzer/evaluacion |
| deteccion fuera de modelo | rechaza otros cifrados/ruido | alta | falsos rechazos | scoring/analyzer |
| modelos estadisticos entrenados | mejor ranking | alta | opacidad/tamaño/privacidad | motor/datos/build |
| PWA local | uso offline instalable | media-alta | cache/actualizaciones/CSP | manifest/service worker/config |

## Visualizacion educativa de frecuencias

Podria mostrar observado versus esperado del candidato ganador. Beneficio docente alto; riesgo de revelar candidatos o hacer creer que el humano decide. Debe ser explicacion posterior, no selector.

## No confundir con mejora incremental

AES, usuarios, base de datos o nube cambian alcance/modelo de amenazas. No deben añadirse para “hacer seguro Cesar”.

## Orden recomendado

Pruebas y corpus, umbral/calibracion, Worker/memoria, CSP, luego nuevos idiomas/modelos. Cada cambio requiere actualizar documentacion y afirmaciones de privacidad.
