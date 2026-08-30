# `lib/crypto/ciphers.js`

## Proposito

Implementa transformaciones exactas y reutilizables para Cesar y Atbash sobre grafemas Unicode.

## `normalizeShift`

Valida que shift sea entero seguro y que size sea entero al menos dos. Devuelve modulo no negativo. Los `TypeError` protegen a consumidores que omitan validacion de UI.

## `transform`

Funcion privada de orden superior:

1. acepta conjunto como arreglo o string;
2. valida longitud minima;
3. crea `Map` de caracter a indice;
4. normaliza/segmenta texto;
5. conserva externos;
6. aplica callback al indice;
7. une resultado.

No vuelve a comprobar duplicados; esa es responsabilidad de `validateCharset` en la API segura. Si se llama directamente con duplicados, el mapa usa el ultimo indice.

## `caesarEncrypt`

Calcula tamaño, normaliza shift y entrega `i -> (i+k)%N`.

## `caesarDecrypt`

Entrega `i -> (i-k+N)%N`. Conjunto y shift iguales al cifrado recuperan NFC del original.

## `atbashTransform`

Entrega `i -> N-1-i`. Su doble aplicacion recupera NFC del original.

## Decisiones

- externos intactos;
- salida NFC;
- conjunto flexible;
- mapa reconstruido por llamada;
- error inmediato ante tamaño invalido.

## Riesgos

El API exportado permite llamada directa sin `validateCharset`; un consumidor debe respetar unicidad/blancos. Reconstruir mapa en cada uno de `N+1` candidatos es simple pero menos eficiente.

## Pruebas

Propiedades inversas con muchos conjuntos, shifts negativos/grandes/cero, externos, Unicode, forma cadena/arreglo y errores numericos.
