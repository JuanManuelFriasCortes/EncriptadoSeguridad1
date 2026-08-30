# Cifrado Cesar

## Concepto

Cesar sustituye cada simbolo por otro situado un numero fijo de posiciones adelante dentro de un conjunto circular. Si se llega al final, se vuelve al principio.

Sea un conjunto ordenado `C` de tamaño `N`, un indice `i` y desplazamiento `k`:

```text
cifrar(i)   = (i + k) mod N
descifrar(i)= (i - k + N) mod N
```

La suma de `N` al descifrar evita indices negativos antes del modulo.

## Importancia del conjunto

Con `ABCDEF`, `A` tiene indice 0. Con `FEDCBA`, `A` tiene indice 5. El mismo texto y el mismo desplazamiento producen salidas distintas. El conjunto no es una bolsa: su orden define la sustitucion.

## Normalizacion del desplazamiento

El codigo usa:

```js
((shift % size) + size) % size
```

Ejemplos para `N = 6`:

| Entrada | Resultado normalizado |
|---:|---:|
| `2` | `2` |
| `8` | `2` |
| `-1` | `5` |
| `-8` | `4` |
| `0` | `0` |

El primer `%` puede devolver negativo en JavaScript. Sumar `size` y aplicar `%` otra vez produce siempre un valor entre 0 y `N - 1`.

## Ejemplo manual

Conjunto: `ABCDE`, `N = 5`, desplazamiento `2`.

| Plano | indice | `(i+2)%5` | Cifrado |
|---|---:|---:|---|
| A | 0 | 2 | C |
| B | 1 | 3 | D |
| C | 2 | 4 | E |
| D | 3 | 0 | A |
| E | 4 | 1 | B |

`BAD CAFE` se procesa grafema por grafema. Los espacios no estan en el conjunto, por lo que se conservan. La letra `F` tambien se conserva. El resultado es `DCA ECFB`.

## Implementacion real

`caesarEncrypt`:

1. calcula el tamaño real del conjunto;
2. valida y normaliza `shift`;
3. llama a `transform` con una funcion que suma el desplazamiento.

`caesarDecrypt` hace lo mismo y resta. `transform` crea un `Map` de caracter a indice para evitar una busqueda lineal repetida.

## Propiedad inversa

Para un simbolo incluido:

```text
decrypt(encrypt(i))
= (((i + k) mod N) - k + N) mod N
= i
```

La igualdad se entiende modulo `N`. Los caracteres externos tambien se recuperan porque nunca cambian.

## Desplazamiento cero

El analizador incluye `shift = 0`. Ese candidato es identico al texto recibido. Es necesario: un mensaje podria no haber sido desplazado o el desplazamiento original podria ser multiplo de `N`. Excluirlo haria incompleto el barrido.

## Busqueda exhaustiva

Hay solo `N` claves distintas. Un desplazamiento `k + N` equivale a `k`. Por eso probar `0..N-1` cubre todo el espacio Cesar para ese conjunto.

## Unicode

El algoritmo opera sobre el arreglo devuelto por `toGraphemes`. Puede usar letras acentuadas y emojis si forman parte del conjunto. No trabaja estrictamente sobre ASCII, lo que satisface el requisito de permitir simbolos contenidos o no en ASCII.

## Caracteres fuera del conjunto

Se conservan deliberadamente. Esto permite dejar puntuacion y espacios sin introducirlos en el conjunto, pero filtra estructura: un atacante ve posiciones de espacios y signos. En criptografia moderna esa filtracion seria una debilidad; aqui es una decision didactica.

## Complejidad

Para texto de `M` grafemas y conjunto de `N`, construir el `Map` cuesta `O(N)` y recorrer el texto `O(M)`; memoria auxiliar `O(N + M)` por mapa y resultado. En el analizador se ejecuta Cesar `N` veces, elevando el costo total.

## Seguridad criptografica

Cesar no es seguro. Su espacio de claves es pequeño y puede recorrerse completamente. Incluso con un conjunto de 128 simbolos solo hay 128 desplazamientos. El analisis de idioma ayuda a seleccionar, pero ni siquiera es necesario para generar todos los textos.

## Casos que debes poder explicar

- desplazamiento negativo;
- desplazamiento mayor que `N`;
- conjunto con dos simbolos;
- texto con puntuacion externa;
- desplazamiento cero;
- conjunto en orden diferente;
- emoji tratado como grafema;
- entero fuera del rango seguro rechazado.
