# Limitaciones del sistema

| Limitacion | Causa | Ejemplo/impacto | ¿Mejorable? |
|---|---|---|---|
| Cesar inseguro | solo N shifts | fuerza bruta inmediata | no sin cambiar algoritmo |
| Atbash inseguro | sin clave numerica | misma funcion revierte | no sin cambiar alcance |
| texto corto | poca estadistica | una letra produce empates/confianza baja | umbral no concluyente |
| palabras inventadas/nombres | lexico pequeño | reduce score del texto real | corpus/modelo mejores |
| texto aleatorio | siempre se elige uno | falso sentido de respuesta | deteccion fuera de modelo |
| otro idioma | datos españoles | candidato real puede perder | modelos multilingues |
| sin espacios | señal espacial/lexica debil | menor separacion | modelos de caracteres |
| charset inusual | frecuencias solo a-zñ | emojis no aportan idioma | modelo acorde al conjunto |
| scores similares | ambiguedad | etiqueta por desempate | reportar no identificable |
| Cesar=Atbash | equivalencia matematica | `AB`, shift 1 | imposible inferir nombre |
| frase atipica | frecuencias no representan corpus | falsos negativos | corpus diverso |
| conjunto exacto requerido | indices dependen de orden | orden cambiado produce basura | perfiles/metadatos |
| Unicode fallback | Array.from no grafema completo | ZWJ puede partirse | polyfill/requisito |
| homoglifos | NFC no es confusable mapping | simbolos parecen iguales | inspector/advertencias |
| CPU hilo principal | N+1 textos + scoring | pausa cerca del limite | Web Worker/cancelacion |
| memoria `N*M` | guarda candidatos | presion/GC | conservar top 2 |
| navegador | APIs/Unicode varian | Segmenter/clipboard | matriz soporte |
| CSP inline | framework/config actual | menor defensa XSS | nonce/hash |
| hosting | Pages es estatico | cabeceras personalizadas de servidor no se aplican | defensas portables/otro hosting |
| privacidad local limitada | datos en RAM/DOM/clipboard | equipo comprometido ve | alcance/limpieza |
| confianza no calibrada | pesos manuales | 90% no es probabilidad real | corpus/calibracion |
| pruebas ausentes | repo sin suite | regresiones no detectadas | añadir pruebas |

## Impacto general

El cifrado manual sigue funcionando exactamente si el conjunto es valido. La principal incertidumbre se concentra en elegir automaticamente el plaintext. Cuanto menos lenguaje natural español haya, menos defendible es la eleccion.

## Limitaciones del hosting actual

El proyecto contiene publicacion automatizada en GitHub Pages. Pages aporta hosting estatico y HTTPS, pero no ejecuta Vinext ni `headers()`: CSP, COOP, CORP y las demas cabeceras personalizadas solo se observan al servir con Vinext. Cache, dominio y logs siguen dependiendo de GitHub. Consulta `31_PUBLICACION_GITHUB_PAGES.md`.

## Mejoras

Prioridad: pruebas/corpus, umbral no concluyente, Worker, calibracion y CSP. Agregar criptografia moderna seria otro alcance, no “arreglar” Cesar.

Consulta el analisis ampliado `17_LIMITACIONES_Y_MEJORAS.md`.
