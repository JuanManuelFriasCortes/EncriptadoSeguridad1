# Arquitectura del sistema

## Diagrama de capas

```text
Usuario
  |
  v
app/page.tsx
  |
  v
components/crypto-workbench.tsx
  |            |                 |
  |            |                 +--> components/ui/* --> Base UI / HTML
  |            +--> app/globals.css --> Tailwind / variables CSS
  v
lib/crypto/index.js
  |
  +--> validation.js --> unicode.js + constants.js
  +--> ciphers.js ----> unicode.js
  +--> analyzer.js ---> ciphers.js + scoring.js + validation.js
  +--> scoring.js ----> language-data.js + unicode.js

Servidor local --> next.config.ts/headers() --> cabeceras defensivas
Construccion ----> vite.config.ts + tsconfig.json + package.json
GitHub Pages ----> build-pages.mjs --> dist/client --> workflow
```

## Capa de entrada de la aplicacion

`app/layout.tsx` define el documento raiz, el idioma `es`, metadatos y la carga de `globals.css`. `app/page.tsx` no contiene logica: importa `CryptoWorkbench` y lo devuelve. Esta delgadez hace evidente que la pantalla principal vive en un solo componente cliente.

## Capa de interfaz

`components/crypto-workbench.tsx` es el coordinador. Declara estados de React, calcula la validacion del conjunto, atiende eventos y decide que informacion renderizar. No implementa las formulas criptograficas; las importa desde el modulo barril `lib/crypto/index.js`.

Los componentes `components/ui/*` encapsulan elementos reutilizables:

- `Button`: variantes visuales y primitiva accesible.
- `Input`: entrada de una linea.
- `Textarea`: entrada multilinea.
- `Label`: etiqueta asociada a un control.
- `Alert`: mensaje accesible de error.

`lib/utils.ts` combina clases condicionales y resuelve conflictos de utilidades Tailwind.

## Capa de dominio

### Unicode

`unicode.js` establece una representacion comun. Normalizar antes de validar evita que dos formas canonicas de la misma letra se traten como simbolos diferentes. Segmentar por grafemas permite que una secuencia visual como un emoji con modificador sea una unidad cuando `Intl.Segmenter` esta disponible.

### Validacion

`validation.js` convierte entradas no confiables en resultados estructurados: `valid`, valor normalizado, longitud, errores y caracteres. Tambien limita el trabajo total del analizador.

### Cifrados

`ciphers.js` contiene transformaciones puras. La funcion privada `transform` concentra la iteracion, la tabla de posiciones y la conservacion de caracteres externos. Cesar y Atbash solo proporcionan una regla para convertir el indice original en otro indice.

### Datos linguisticos

`language-data.js` contiene constantes, no flujo: frecuencias, palabras, n-gramas y patrones improbables. Separar datos de formulas facilita revisar o sustituir el modelo del idioma.

### Puntuacion

`scoring.js` transforma un texto candidato en un numero y un desglose. Combina señales positivas y penalizaciones. El campo `evidence` mide cantidad de material observable, no certeza matematica.

### Analizador

`analyzer.js` coordina el ataque: valida, comprueba complejidad, genera candidatos, puntua, ordena, elige y calcula confianza. Su funcion publica `analyzeCiphertext` devuelve una sola respuesta deliberadamente.

## Capa de plataforma

`next.config.ts` define dos ramas. En servidor, `headers()` aplica CSP, aislamiento de origen, restricciones de permisos, politica de referencia y defensas de contenido a `/:path*`. En Pages, `output: 'export'`, `assetPrefix` y `trailingSlash` producen un sitio estatico. Es independiente del motor: no lee ni modifica mensajes.

`scripts/build-pages.mjs` ejecuta el build de Pages, normaliza la ubicacion de `_next`, crea `.nojekyll` y rechaza el artefacto si falta `index.html` o algun recurso. `.github/workflows/pages.yml` instala con `npm ci`, sube el artefacto y lo publica.

`vite.config.ts` activa Vinext y Tailwind. `tsconfig.json` define el analisis estatico y el alias `@/*`. `package.json` define versiones, scripts, requisitos de Node y el modo ESM.

## Fronteras y contratos

La frontera mas importante esta entre `CryptoWorkbench` y `lib/crypto`:

- La interfaz pasa texto y conjunto como cadenas.
- Los validadores producen cadenas normalizadas y arreglos de grafemas.
- Los cifrados aceptan cadena o arreglo de caracteres.
- El analizador vuelve a validar por si es invocado fuera de la interfaz.
- Los errores de entrada previstos se agrupan en `InputValidationError`.

La doble validacion no es redundancia accidental. La UI valida para dar retroalimentacion; la biblioteca valida para proteger su propio contrato ante cualquier consumidor.

## Decisiones arquitectonicas relevantes

1. **Motor puro**: reduce acoplamiento y facilita pruebas futuras.
2. **Estado local**: evita almacenamiento y sincronizacion innecesarios.
3. **Modulo barril**: la interfaz importa desde un punto estable.
4. **Una sola respuesta visible**: cumple el criterio de automatizacion sin decision humana.
5. **Conjunto ordenado editable**: generaliza los cifrados mas alla del alfabeto ASCII.
6. **Limites defensivos**: mantienen el analisis exhaustivo dentro de un presupuesto razonable.
7. **Dos destinos de build**: conserva servidor local y añade publicacion estatica sin duplicar la aplicacion.

## Dependencias que no deben invertirse

`lib/crypto` no debe importar componentes de React. `scoring.js` no debe depender de `analyzer.js`. `ciphers.js` no debe decidir que candidato es correcto. La configuracion y los scripts de despliegue no deben recibir textos para analizarlos. Mantener estas fronteras evita ciclos y conserva responsabilidades comprensibles.
