# `package-lock.json`

## Proposito

Fija el arbol concreto de dependencias para instalaciones reproducibles. Tiene `lockfileVersion: 3` y miles de lineas generadas por npm.

## Estructura

- nombre/version raiz;
- `requires:true`;
- objeto `packages`;
- entrada `""` con dependencias directas y requisito Node;
- una entrada por paquete instalado con version, URL, integridad, licencia, dependencias, motores y metadatos cuando aplican.

## `integrity`

Hashes SRI permiten a npm comprobar que el contenido descargado coincide con lo bloqueado. No garantizan que el paquete sea benigno; garantizan identidad/integridad respecto al registro y lock.

## Relacion con `package.json`

El manifiesto declara intencion/rangos. El lockfile registra resoluciones. Ambos deben confirmarse juntos. `npm ci` espera coherencia y recrea `node_modules` segun el lock.

## Por que no se explica entrada por entrada

Es salida mecanica de terceros y cambia al actualizar. La unidad educativa relevante es el arbol, no memorizar cada paquete transitivo. Las dependencias directas se explican en `package_json.md` y la salud se revisa con herramientas.

## Riesgos

- editar manualmente rompe integridad/coherencia;
- conflictos de merge pueden alterar arbol;
- regenerar con npm distinto puede producir cambios amplios;
- lock fijo no elimina vulnerabilidades;
- URL/integrity solo verifican artefacto, no confianza del mantenedor.

## Pruebas

`npm ci` en entorno limpio, build, `npm audit`, `npm ls`, revision de diff ante actualizaciones y comprobacion de Node soportado.
