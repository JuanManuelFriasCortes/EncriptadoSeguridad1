# Fundamentos de JavaScript usados

## Valores y tipos

El proyecto trabaja principalmente con:

- `string`: mensajes, conjunto, algoritmo, nivel de confianza.
- `number`: indices, desplazamientos, puntuaciones, longitudes.
- `boolean`: validez y condiciones de interfaz.
- `null`: ausencia intencional de desplazamiento Atbash o de resultado.
- `undefined`: busqueda sin resultado en un `Map` y propiedades opcionales.
- objetos: validaciones, candidatos, analisis y confianza.
- arreglos: grafemas, errores y candidatos.

JavaScript es dinamico en `lib/crypto/*.js`; TypeScript comprueba tipos en los `.tsx` y `.ts`. Los comentarios JSDoc documentan contratos de las funciones JavaScript.

## `const` y `let`

`const` impide reasignar la variable, no volver inmutable su contenido. Por ejemplo, `const errors = []` permite `errors.push(...)`. `let` se usa cuando la referencia o el numero cambia: `let chiSquare = 0`, `let start = 0`, `let level = 'baja'`.

Regla practica: usar `const` por defecto y `let` solo cuando existe reasignacion deliberada.

## Operadores

### Aritmeticos

`+`, `-`, `*`, `/`, `**` y `%` aparecen en formulas. `%` en JavaScript conserva el signo del dividendo, por eso un desplazamiento negativo necesita la doble normalizacion:

```js
((shift % size) + size) % size
```

### Comparacion

Se usa igualdad estricta `===` y desigualdad `!==`. Evita conversiones implicitas de `==`.

### Logicos

- `&&`: todas las condiciones deben cumplirse o se usa para renderizado condicional.
- `||`: basta una condicion verdadera.
- `!`: negacion.
- `??`: valor alternativo solo ante `null` o `undefined`.

## Condiciones

El proyecto usa `if`, `else if` y el operador ternario. Ejemplo conceptual:

```js
const result = method === 'caesar'
  ? caesarEncrypt(...)
  : atbashTransform(...);
```

El ternario es adecuado para elegir una de dos expresiones. Las validaciones con varias acciones usan `if` por claridad.

## Bucles

### `for...of`

Recorre valores: caracteres, letras, palabras o entradas de un objeto.

```js
for (const character of characters) { ... }
```

### `for` clasico

`rankCandidates` necesita un contador de desplazamiento:

```js
for (let shift = 0; shift < charset.length; shift += 1) { ... }
```

### `while`

Se usa para encontrar todas las apariciones de un n-grama, incluidas las superpuestas. Tras encontrar una, avanza una posicion.

## Funciones

Hay declaraciones:

```js
export function normalizeShift(shift, size) { ... }
```

y funciones flecha como callbacks:

```js
(index) => (index + normalizedShift) % size
```

Las declaraciones nombradas son faciles de exportar y aparecen claramente en trazas. Las flechas son concisas para reglas pequeñas pasadas a otra funcion.

## Arreglos

### `map`

Transforma cada elemento y produce otro arreglo. `transform` convierte cada grafema en su sustituto.

### `filter`

Conserva elementos que cumplen una condicion. `scoreSpanish` filtra letras reconocidas y palabras de longitud mayor que uno.

### `reduce`

Acumula un valor. Se usa para sumar penalizaciones de caracteres de control.

### `join`

Une grafemas sin separador y errores con espacios.

### desestructuracion

`const [best, second] = ranked` extrae los dos primeros candidatos. En objetos, `{ required = true }` obtiene una opcion y aporta valor predeterminado.

### propagacion

`[...charsetResult.errors, ...messageResult.errors]` construye un arreglo nuevo. `[...new Set(errors)]` convierte el conjunto deduplicado en arreglo.

## Objetos

`Object.freeze` evita cambios superficiales en constantes. `Object.entries` produce pares `[clave, valor]`. `Object.keys` obtiene letras. `Object.fromEntries` vuelve a construir un objeto de conteos. `Object.hasOwn` verifica que una letra pertenezca al objeto de frecuencias sin consultar la cadena de prototipos.

## `Set` y `Map`

Un `Set` guarda valores unicos. Sirve para detectar duplicados, almacenar palabras comunes y deduplicar errores.

Un `Map` asocia grafema con indice. Buscar con `lookup.get(character)` es mas claro y, en promedio, mas eficiente que recorrer todo el conjunto por cada caracter.

## Cadenas y expresiones regulares

- `.normalize('NFC')`: estabiliza Unicode.
- `.trim()`: elimina bordes al validar el desplazamiento.
- `.toLocaleLowerCase('es')`: minusculas segun español.
- `.match(regex) ?? []`: extrae palabras o usa arreglo vacio.
- `.includes`: busca pertenencia en cadena/arreglo.
- `.indexOf`: localiza n-gramas desde una posicion.

Las expresiones usan bandera `u` para Unicode y `g` cuando necesitan todas las coincidencias.

## Excepciones

Funciones de bajo nivel lanzan `TypeError` cuando se viola su contrato. El analizador lanza `InputValidationError` para entradas previstas. La interfaz usa `try/catch` y convierte la excepcion en un mensaje visible.

## Numeros seguros

`Number.isSafeInteger` evita desplazamientos que JavaScript no puede representar exactamente. `Number.isInteger` comprueba el tamaño. `Math.max` y `Math.min` limitan puntuaciones; `Math.sqrt`, `Math.log` y `Math.exp` participan en el modelo estadistico.

## Modulos

`export` hace publica una funcion o constante. `import` la consume. El sufijo `.js` explicito en el motor sigue ESM. `package.json` confirma `"type": "module"`.
