# `lib/crypto/index.js`

## Proposito

Define la API publica del motor mediante reexportaciones. No ejecuta cifrado ni mantiene estado.

## Exportaciones

- analisis: `analyzeCiphertext`, `rankCandidates`;
- cifrados: Atbash, Cesar y shift;
- constantes: presets y limites;
- scoring: `scoreSpanish`;
- Unicode: normalizacion y grafemas;
- validacion: error y tres validadores.

Funciones privadas no aparecen, por lo que consumidores no deben depender de ellas.

## Beneficio

La UI importa desde una ruta. La organizacion interna puede cambiar manteniendo esta API.

## Riesgo

Reexportar detalles innecesarios amplia el contrato. Eliminar o renombrar una exportacion rompe consumidores. Exportar `rankCandidates` es deliberado para pruebas, pero puede ser mal usado por una UI que muestre todas las opciones.

## Prueba

Una prueba de humo debe importar cada nombre desde este archivo y comprobar su tipo/forma basica.
