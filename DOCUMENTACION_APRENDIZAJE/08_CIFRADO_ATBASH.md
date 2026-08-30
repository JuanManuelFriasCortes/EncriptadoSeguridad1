# Cifrado Atbash

## Teoria

Atbash refleja la posicion:

```text
nuevoIndice = N - 1 - indiceOriginal
```

Con `ABCDE`: A↔E, B↔D y C↔C.

## Ejemplo manual

Texto `BAD`, conjunto `ABCDE`:

| Caracter | indice | `4-i` | salida |
|---|---:|---:|---|
| B | 1 | 3 | D |
| A | 0 | 4 | E |
| D | 3 | 1 | B |

Salida `DEB`.

## Involucion

```text
f(f(i)) = N-1-(N-1-i) = i
```

Por eso `atbashTransform(atbashTransform(text,C),C)` devuelve NFC del original. Una funcion con esta propiedad es involutiva.

## Implementacion real

**Archivo:** `lib/crypto/ciphers.js`.

```js
return transform(text, charset, (index, size) => size - 1 - index);
```

La funcion recibe texto/conjunto y devuelve string. Llama a `transform`; es llamada por `encryptMessage` y `rankCandidates`. No tiene efectos secundarios ni shift.

## Conjunto par/impar

En uno par todos los simbolos forman pares. En uno impar, el central queda fijo. Externos quedan intactos por el helper comun.

## Si se elimina

Desaparece una opcion de cifrado y el analizador deja de cumplir su comparacion entre los dos modelos.

## Limitaciones

No tiene clave numerica, es trivial de revertir y puede ser indistinguible de Cesar en conjuntos como `AB`. El desempate actual etiqueta Atbash, pero no demuestra identidad historica.

## Complejidad

`O(N+M)` tiempo; mapa y resultado `O(N+M)`.

Consulta `10_CIFRADO_ATBASH.md` y la traza 3.
