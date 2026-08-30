# `lib/crypto/constants.js`

## Proposito

Centraliza limites defensivos y conjuntos sugeridos.

## `LIMITS`

`Object.freeze` comunica que los cuatro valores no deben cambiar en ejecucion. El congelamiento es superficial, suficiente porque solo contiene numeros.

- minimo 2;
- maximo 128;
- mensaje 12,000;
- analisis 1,500,000.

Los limites conectan UI y validacion: contadores y reglas usan la misma fuente.

## `CHARSET_PRESETS`

Cuatro cadenas ordenadas. No se convierten aqui a arreglos; esa tarea pertenece a Unicode/validacion. El preajuste español incluye `Ñ` entre `N` y `O`, alterando el modulo respecto al alfabeto ingles.

## Riesgos

- reordenar un preset cambia todos los cifrados existentes;
- añadir duplicados/blancos haria que el propio preset fuera invalido;
- ampliar maximos afecta rendimiento;
- `Object.freeze` no es control de seguridad contra modificar fuente.

## Pruebas

Validar automaticamente cada preset, unicidad Unicode, tamaño y ejemplos de ida/vuelta. Medir cualquier cambio de limites.
