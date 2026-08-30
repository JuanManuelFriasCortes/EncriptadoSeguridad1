# Validaciones reales

| Entrada/regla | Archivo y funcion | Condicion | Mensaje/accion | Sin ella |
|---|---|---|---|---|
| conjunto vacio | `validation.js`, `validateCharset` | longitud 0 | “El conjunto no puede estar vacío.” | modulo indefinido |
| conjunto de uno | misma | `<2` | al menos 2 | cifrado trivial/no util |
| conjunto grande | misma | `>128` | supera maximo | demasiados candidatos |
| duplicados | misma | Set ya contiene grafema | lista tras NFC | mapa ambiguo/no biyectivo |
| blancos | misma | `/\s/u` | nombra espacio/salto/tab | cambia politica de externos/palabras |
| mensaje vacio | `validateMessage` | required y longitud 0 | escribe mensaje | analisis sin evidencia |
| mensaje grande | misma | `>12000` | supera maximo | memoria/CPU excesiva |
| sintaxis shift | `CryptoWorkbench.encryptMessage` | no coincide `^-?\d+$` | entero requerido | acepta decimal/exponente/vacio |
| rango shift | mismo handler | no `Number.isSafeInteger` | fuera de rango seguro | precision incorrecta |
| contrato shift | `ciphers.js`, `normalizeShift` | entero/tamaño invalidos | `TypeError` | indices invalidos |
| complejidad | `validateAnalysisComplexity` | `M*(N+1)>1500000` | reducir entrada | bloqueo potencial |

## Unicode

Todas las validaciones de texto relevantes comienzan con NFC y cuentan grafemas. Por eso el limite visible coincide mejor con caracteres percibidos y duplicados canonicos se detectan.

## Flujo de errores

Los validadores devuelven listas. En cifrado la UI combina, deduplica con Set, muestra y retorna. En analisis, `analyzeCiphertext` combina y lanza `InputValidationError`; el handler lo captura y muestra su `message`.

## Casos precisos

- shift `0`: valido;
- shift `N`: valido, se normaliza a cero;
- shift `-1`: valido, se normaliza a `N-1`;
- mensaje de espacios: no esta vacio por longitud y se permite, pero score ofrece poca evidencia;
- puntuacion externa: valida y se conserva;
- conjunto con salto: invalido aunque los mensajes si puedan contenerlo.

## Seguridad

La validacion protege forma/invariantes/disponibilidad. No intenta eliminar HTML porque el contexto de salida es texto React. Validar no reemplaza escape ni CSP.

## Si se elimina

Eliminar la validacion de UI empeora retroalimentacion; eliminar la de biblioteca rompe el contrato ante otros consumidores. El limite de carga es defensa imperfecta pero importante.

Consulta `14_VALIDACIONES_Y_ERRORES.md` y `CODIGO/lib_crypto_validation_js.md`.
