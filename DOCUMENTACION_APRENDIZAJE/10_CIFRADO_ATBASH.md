# Cifrado Atbash

## Concepto

Atbash refleja cada posicion del conjunto. El primer simbolo se cambia por el ultimo, el segundo por el penultimo y asi sucesivamente.

Para indice `i` y tamaño `N`:

```text
atbash(i) = N - 1 - i
```

No existe desplazamiento ni clave numerica. El conjunto ordenado sigue siendo indispensable.

## Ejemplo manual par

Conjunto `ABCDEF`, `N = 6`:

| Entrada | indice | `5-i` | Salida |
|---|---:|---:|---|
| A | 0 | 5 | F |
| B | 1 | 4 | E |
| C | 2 | 3 | D |
| D | 3 | 2 | C |
| E | 4 | 1 | B |
| F | 5 | 0 | A |

`FACE` se convierte en `AFDB`.

## Ejemplo impar

Conjunto `ABCDE`, `N = 5`. El indice central es 2:

```text
4 - 2 = 2
```

Por tanto `C` se transforma en `C`. Tener un punto fijo es normal en conjuntos impares.

## Por que cifra y descifra la misma funcion

Aplicar Atbash dos veces:

```text
f(f(i)) = N - 1 - (N - 1 - i) = i
```

Una funcion que es su propia inversa se llama involucion. Por eso `atbashTransform` sirve tanto para cifrar como para descifrar.

## Implementacion real

```js
export function atbashTransform(text, charset) {
  return transform(text, charset, (index, size) => size - 1 - index);
}
```

Toda la gestion de Unicode, el mapa, caracteres externos y reconstruccion pertenece a `transform`. Atbash aporta solo su regla de indices.

## Atbash en el analizador

`rankCandidates` genera exactamente un candidato Atbash. No necesita probar claves numericas. El candidato se puntua con el mismo `scoreSpanish` que los candidatos Cesar, lo que permite compararlos en una escala comun.

## Empate

Si puntuacion y palabras reconocidas empatan entre algoritmos, `compareCandidates` coloca Atbash antes. Es una regla determinista, no evidencia historica o estadistica de que Atbash sea mas probable. Este detalle debe mencionarse si un profesor pregunta por empates.

## Relacion con Cesar

En conjuntos muy pequeños o con cierta simetria, una salida Atbash puede coincidir con algun desplazamiento Cesar para todos o algunos simbolos. El texto por si solo puede no identificar un algoritmo unico. El programa resuelve empates por regla, pero esa etiqueta no constituye una prueba de autoria.

Por ejemplo, en `AB`, Atbash intercambia A/B y Cesar con desplazamiento 1 hace lo mismo. No hay observacion capaz de distinguirlos bajo ese conjunto.

## Caracteres externos

Al igual que Cesar, todo grafema que no aparezca en el conjunto queda intacto. Los espacios separan palabras y ayudan al analisis linguistico, pero tambien revelan estructura.

## Complejidad

Una transformacion cuesta `O(N + M)`: construir el mapa del conjunto y recorrer el texto. Solo se genera un candidato Atbash, frente a `N` candidatos Cesar.

## Seguridad criptografica

Atbash no tiene clave secreta aparte de conocer el conjunto y su orden. Una vez identificado, se revierte con la misma operacion. Es historico y educativo, no apropiado para confidencialidad.

## Casos que debes poder explicar

- conjunto par e impar;
- simbolo central fijo;
- propiedad de involucion;
- caracteres externos;
- coincidencia potencial con Cesar;
- por que solo se genera un candidato;
- por que el orden del conjunto cambia la salida.
