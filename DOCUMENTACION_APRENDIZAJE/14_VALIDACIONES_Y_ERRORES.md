# Validaciones y manejo de errores

## Filosofia

La entrada del usuario nunca se usa directamente en el motor sin normalizacion y comprobaciones. Las validaciones tienen dos objetivos diferentes:

1. proteger la definicion matematica del cifrado;
2. impedir cargas excesivas o estados incomprensibles para la interfaz.

Validar no significa “limpiar todo silenciosamente”. Cuando un espacio o duplicado cambiaria la semantica, el sistema informa el problema.

## Validacion del conjunto

`validateCharset(rawCharset)` devuelve:

```js
{
  valid,
  normalized,
  characters,
  errors,
  duplicates
}
```

### Normalizacion

Convierte cualquier valor nulo a cadena vacia y aplica NFC. Luego segmenta grafemas.

### Longitud

- cero: “El conjunto no puede estar vacío”.
- uno: debe contener al menos dos caracteres diferentes.
- mas de 128: supera el maximo defensivo.

Un conjunto de un simbolo haria trivial y ambiguo el modulo; las funciones de cifrado tambien lo rechazan.

### Duplicados

Un `Set` registra lo observado. Si un grafema ya existe y aun no esta en `duplicates`, se agrega. Detectarlo despues de NFC es esencial: dos representaciones canonicas pueden convertirse en el mismo grafema.

Los duplicados romperian la relacion caracter-indice: el `Map` conservaria solo el ultimo indice y la transformacion dejaria de ser biyectiva.

### Espacios

La expresion `/\s/u` detecta espacios en blanco. `describeWhitespace` distingue espacio, salto, tabulacion y otros mediante `U+...`. No se permiten dentro del conjunto porque el proyecto desea que la separacion de palabras permanezca externa e intacta.

## Validacion del mensaje

`validateMessage` normaliza, cuenta grafemas y exige contenido por defecto. El maximo es 12,000 grafemas. La opcion `{ required: false }` existe en la API aunque la interfaz actual no la utiliza.

No se elimina puntuacion, espacios ni saltos. No se interpreta HTML. El cifrado conserva todo grafema ajeno al conjunto.

## Desplazamiento Cesar

La UI comprueba primero la sintaxis con:

```js
/^-?\d+$/u.test(shift.trim())
```

Acepta enteros negativos y positivos sin signo `+`; rechaza decimales, notacion exponencial y cadena vacia. Luego `Number(shift)` convierte y `Number.isSafeInteger` verifica representacion exacta.

`normalizeShift` repite la defensa en la biblioteca y lanza `TypeError` si `shift` no es entero seguro o si el tamaño no es entero al menos dos.

## Limite de complejidad

```text
operations = messageLength * (charsetLength + 1)
```

El `+1` representa Atbash ademas de todos los Cesar. El analisis se permite hasta 1,500,000 unidades aproximadas. Es una cota preliminar, no un conteo exacto de operaciones de CPU, porque cada candidato tambien ejecuta scoring y busquedas de n-gramas.

## Tipos de error

### Resultado estructurado

Los validadores devuelven listas de mensajes para que la UI pueda mostrar varios problemas a la vez.

### `InputValidationError`

El analizador agrupa errores, une mensajes para `Error.message`, conserva el arreglo en `messages` y asigna un nombre reconocible. Representa fallos previstos del usuario.

### `TypeError`

Las funciones matematicas lo usan ante violaciones de contrato por parte del programador o consumidor directo.

### Error de plataforma

El portapapeles puede rechazar la operacion por permisos o contexto. La UI lo convierte en estado `error` sin revelar detalles internos.

## Presentacion segura

`ErrorNotice` une mensajes como texto. React escapa el contenido. `aria-live="assertive"` anuncia la alerta. La interfaz deduplica errores de cifrado con `Set`.

En descifrado, el `catch` usa:

```ts
error instanceof Error
  ? error.message
  : 'No fue posible analizar el mensaje.'
```

Esto evita asumir que todo valor lanzado tiene propiedad `message`.

## Validacion y seguridad web

Las validaciones de longitud reducen riesgo de bloqueo del navegador. La validacion del conjunto mantiene invariantes. Pero no se intenta “sanitizar HTML” porque React renderiza cadenas como texto y no existe un sumidero HTML peligroso. OWASP recomienda validacion acorde al contexto y codificacion de salida: [Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) y [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).

## Casos de frontera

- `AÁ` puede ser valido porque son grafemas distintos despues de NFC.
- `é` y `e` + marca combinante se vuelven duplicados tras NFC.
- dos emojis visualmente parecidos pueden ser grafemas diferentes.
- una cadena de solo espacios es un mensaje valido en cuanto a longitud; se conservaria, aunque el scoring tendria poca evidencia.
- un conjunto correcto con mensaje muy grande puede pasar longitud y fallar complejidad.
- `-0` es sintacticamente valido y se normaliza a cero.

## Mejoras posibles

- devolver codigos de error ademas de mensajes localizados;
- documentar explicitamente la politica para mensajes de solo espacios;
- medir tiempo real o mover analisis a Web Worker;
- unificar tipos del motor migrando JavaScript a TypeScript;
- pruebas automatizadas para cada frontera Unicode y numerica.
