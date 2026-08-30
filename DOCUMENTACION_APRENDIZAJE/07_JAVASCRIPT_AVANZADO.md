# JavaScript y TypeScript avanzado

## Funciones de orden superior

`transform(text, charset, indexMapper)` recibe una funcion como tercer argumento. Esto separa el mecanismo comun de la regla variable:

```js
// Cesar cifra
(index) => (index + normalizedShift) % size

// Cesar descifra
(index) => (index - normalizedShift + size) % size

// Atbash
(index, size) => size - 1 - index
```

El patron evita tres bucles casi identicos. La abstraccion es apropiada porque las tres operaciones comparten normalizacion, segmentacion, tabla, conservacion de externos y union.

## Cierres

Las flechas de Cesar capturan `normalizedShift` y `size` del alcance externo. Ese acceso a variables del entorno es un closure. No se copian manualmente; la funcion conserva la referencia necesaria al ejecutarse dentro de `transform`.

## Pureza y efectos

Las funciones de `lib/crypto` son esencialmente puras: para los mismos argumentos devuelven el mismo resultado y no alteran estado global. `Object.freeze` refuerza la intencion de datos estables.

Los efectos se concentran en la interfaz:

- actualizar estado de React;
- escribir al portapapeles;
- responder a eventos.

Esta separacion hace el motor mas sencillo de razonar y probar.

## Normalizacion y grafemas

JavaScript indexa internamente unidades UTF-16. Un simbolo visible puede ocupar varias unidades o varios puntos de codigo. `Intl.Segmenter` aproxima el concepto de caracter percibido por el usuario mediante clusters de grafemas. El fallback `Array.from` separa por puntos de codigo, mejor que `split('')`, aunque no conserva todas las secuencias complejas.

Referencias: [Unicode Normalization Forms](https://unicode.org/reports/tr15/), [Unicode Text Segmentation](https://unicode.org/reports/tr29/) y [MDN Intl.Segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter).

## Ordenamiento con comparador

`Array.prototype.sort` recibe `compareCandidates`. Un valor negativo coloca `left` antes; positivo, despues. La funcion implementa un orden total mediante criterios sucesivos. Esto es mas robusto que ordenar solo por score, porque los empates producen una salida determinista.

## Estabilidad numerica defensiva

Varias expresiones evitan divisiones problematicas:

```js
Math.max(expected, 0.01)
recognizedWords.length / Math.max(1, substantialWords.length)
```

Los limites no demuestran correccion estadistica, pero evitan `Infinity` y `NaN` en entradas pequeñas.

## Calculo suavizado

La separacion usa:

```js
1 - Math.exp(-Math.max(0, margin) / 15)
```

Cuando el margen es cero, la separacion es cero. Al crecer, se aproxima a uno sin excederlo. Esta saturacion evita que un margen enorme domine indefinidamente.

## Tipos derivados

En la UI:

```ts
type AutomaticResult = ReturnType<typeof analyzeCiphertext>;
```

`ReturnType` evita repetir manualmente la forma del resultado. Si la funcion cambia y TypeScript puede inferirla, el estado se adapta. Como `analyzeCiphertext` viene de JavaScript con JSDoc, la calidad de la inferencia depende de esos comentarios y de `allowJs`.

## Uniones literales

```ts
type CipherMethod = 'caesar' | 'atbash';
```

Esto impide estados como `'aes'` o una cadena arbitraria. Otros estados usan `'idle' | 'copied' | 'error'`.

## `as const`

`PRESETS` termina con `as const`, por lo que TypeScript conserva literales y propiedades de solo lectura en lugar de ampliar todo a `string`. En el arreglo `(['caesar', 'atbash'] as const)`, cada `value` conserva la union valida.

## Genericos de componentes

`React.ComponentProps<'input'>` obtiene las propiedades validas de un input HTML. `VariantProps<typeof buttonVariants>` obtiene las variantes generadas por CVA. La interseccion `&` combina contratos.

La propagacion `{...props}` reenvia atributos como `aria-label`, `disabled` y eventos. Debe colocarse con cuidado: una propiedad propagada despues puede sobrescribir una anterior.

## Renderizado declarativo

React no ordena imperativamente “busca el parrafo y cambia su texto”. El estado cambia y el componente describe de nuevo la UI correspondiente. Expresiones como `automaticResult ? ... : ...` son una funcion del estado actual.

## `useState`

Cada llamada conserva un valor entre renderizaciones. Los setters no modifican inmediatamente la variable local; solicitan una renderizacion. Por eso no debe leerse un setter como una asignacion comun.

## `useMemo`

```ts
useMemo(() => validateCharset(charset), [charset])
```

memoriza el resultado hasta que cambie `charset`. No aporta correccion, solo evita recalcular en renderizaciones causadas por otros estados. La funcion sigue validando de nuevo dentro del analizador para sostener el contrato de biblioteca.

## Funciones asincronas

`copyEncrypted` es `async` porque `navigator.clipboard.writeText` devuelve una promesa. `await` pausa esa funcion, no toda la pagina. El `try/catch` distingue permiso concedido o rechazo.

## Encadenamiento opcional

`automaticResult?.plaintext` devuelve `undefined` si no hay resultado. Combinado con `??`, permite un estado inicial sin excepcion. El desplazamiento de candidatos usa `left.shift ?? 0` porque Atbash guarda `null`.

## Riesgos avanzados

- Ordenar muta el arreglo original; aqui es seguro porque `candidates` acaba de crearse.
- `Object.freeze` es superficial; un objeto anidado seguiria siendo mutable.
- JSDoc no ofrece todas las garantias de un archivo TypeScript.
- `Intl.Segmenter` depende del soporte del entorno; el fallback es menos preciso.
- El trabajo estadistico ocurre en el hilo principal y puede bloquear brevemente la interfaz cerca de los limites.
