# Cifrado Cesar

## Teoria

Cesar mueve cada indice `i` dentro de un conjunto de tamaño `N`:

```text
cifrar:    (i + k) mod N
descifrar: (i - k + N) mod N
```

`k` es el desplazamiento. No se usa siempre 26: `N` es la cantidad real de grafemas del conjunto del usuario. El preset español mayusculo tiene 27 por `Ñ`; uno alfanumerico tiene mas; un conjunto de emojis tambien es valido.

## Normalizacion

`normalizeShift(shift,size)` verifica entero seguro y usa `((shift % size)+size)%size`. Para `N=5`, `-1` se vuelve 4, `7` se vuelve 2 y `5` se vuelve 0.

## Ejemplo manual

Conjunto `ABCDE`, texto `BAD`, shift 2:

| Caracter | indice original | shift | nuevo indice | resultado |
|---|---:|---:|---:|---|
| B | 1 | 2 | 3 | D |
| A | 0 | 2 | 2 | C |
| D | 3 | 2 | 0 | A |

Salida: `DCA`.

## Implementacion real

**Archivo:** `lib/crypto/ciphers.js`.

`caesarEncrypt` determina `size`, normaliza el shift y llama al helper privado `transform` con `(index) => (index + normalizedShift) % size`.

`transform` convierte el conjunto a grafemas, crea un `Map`, normaliza/segmenta el texto, busca cada indice, conserva externos y une salidas. Despues del callback no se llama otra funcion de dominio: se devuelve la cadena a `encryptMessage` o se entrega a scoring si fue un candidato.

`caesarDecrypt` usa `(index - normalizedShift + size) % size`. La suma de size evita negativo.

## Si se elimina

Sin `normalizeShift`, shifts grandes/negativos se manejan mal y se pierde validacion. Sin `transform`, habria que duplicar Unicode/mapa/conservacion en tres algoritmos. Sin Cesar, analyzer ya no puede generar su familia de candidatos.

## Errores evitados

Enteros inseguros, conjunto menor que dos, modulo negativo, separacion UTF-16 ingenua y perdida de puntuacion externa.

## Limitaciones

Solo hay `N` claves efectivas, revela externos y es vulnerable a fuerza bruta. El API directo presupone conjunto sin duplicados; la ruta segura valida antes.

## Complejidad

Una transformacion: `O(N+M)` tiempo y memoria para mapa/arreglos. El analizador la repite `N` veces.

Consulta tambien `09_CIFRADO_CESAR.md`, `26_TRAZAS_MANUALES.md` y `CODIGO/lib_crypto_ciphers_js.md`.
