# Flujo completo del programa

## Arranque

1. `vinext dev` o `vinext start` inicia el servidor.
2. Vinext interpreta la estructura `app/`.
3. `RootLayout` genera `<html lang="es"><body>...</body></html>`.
4. `Home` inserta `<CryptoWorkbench />`.
5. Como el componente declara `'use client'`, React habilita estado y eventos en el navegador.
6. En modo servidor, `next.config.ts` añade cabeceras a la respuesta HTTP. En GitHub Pages, Vinext ya genero HTML/JS/CSS y GitHub sirve esos archivos estaticos.

## Inicializacion de la pantalla

`CryptoWorkbench` crea diez grupos de estado. El conjunto comienza con el alfabeto español en mayusculas; Cesar esta seleccionado; el desplazamiento es `3`; textos, resultados y errores comienzan vacios. `useMemo` ejecuta `validateCharset` y conserva el resultado mientras `charset` no cambie.

## Flujo de edicion del conjunto

Cuando el usuario escribe:

1. React recibe el evento `onChange`.
2. `setCharset(event.target.value)` agenda una nueva renderizacion.
3. Se limpian el cifrado y el resultado automatico para no mostrar datos calculados con un conjunto anterior.
4. En la nueva renderizacion, `useMemo` recalcula `validateCharset`.
5. El contador, `aria-invalid` y el texto de error reflejan el nuevo estado.

Cuando se selecciona un preajuste, `selectPreset` cambia el conjunto y limpia errores y resultados de ambas herramientas.

## Flujo de cifrado Cesar

```text
clic Cifrar
  -> validateMessage(plainText)
  -> reutilizar charsetValidation
  -> comprobar desplazamiento con expresion regular
  -> Number(shift)
  -> Number.isSafeInteger
  -> caesarEncrypt(texto normalizado, grafemas, desplazamiento)
  -> normalizeShift
  -> transform
  -> setEncrypted + setEncryptedMeta
  -> React muestra output
```

Si cualquier validacion falla, los mensajes se deduplican con `new Set`, se limpia el resultado y la funcion termina con `return`.

## Flujo de cifrado Atbash

Es casi igual, pero el control de desplazamiento queda deshabilitado y el metodo llama a `atbashTransform`. La regla de indice es `N - 1 - i`. La metadata indica sustitucion inversa.

## Flujo dentro de `transform`

1. Obtiene el arreglo de grafemas del conjunto.
2. Crea un `Map` de caracter a indice.
3. Normaliza el texto y lo divide en grafemas.
4. Para cada grafema busca su indice.
5. Si no existe, devuelve el mismo grafema.
6. Si existe, ejecuta la regla de mapeo proporcionada por Cesar o Atbash.
7. Une el arreglo transformado.

## Flujo de descifrado automatico

```text
clic Analizar y descifrar
  -> analyzeCiphertext(ciphertext, charset)
      -> validateCharset
      -> validateMessage
      -> validateAnalysisComplexity
      -> rankCandidates
          -> 1 candidato Atbash
          -> N candidatos Cesar
          -> scoreSpanish para cada uno
          -> sort(compareCandidates)
      -> best y second
      -> estimateConfidence(best, second)
      -> devolver solo best
  -> setAutomaticResult
  -> React muestra algoritmo, desplazamiento, confianza y texto
```

La interfaz atrapa cualquier error. Si es una instancia de `Error`, muestra su `message`; en otro caso usa un mensaje generico. Nunca muestra una traza interna.

## Flujo de puntuacion

Para cada candidato:

1. se pliega el español a minusculas y se eliminan diacriticos, preservando `ñ`;
2. se separan grafemas, letras validas y palabras;
3. se cuentan letras observadas;
4. se calculan chi-cuadrada y log-verosimilitud;
5. se buscan palabras frecuentes;
6. se cuentan apariciones superpuestas de n-gramas;
7. se evalua proporcion de vocales y espacios;
8. se penalizan palabras y patrones improbables, asi como controles ASCII no permitidos;
9. se suman las señales y se calcula evidencia.

## Ordenamiento y desempate

`compareCandidates` compara, en este orden:

1. puntuacion total, de mayor a menor;
2. cantidad de palabras reconocidas, de mayor a menor;
3. Atbash antes que Cesar si aun hay empate;
4. desplazamiento Cesar menor primero.

El desempate hace determinista la salida. No prueba que Atbash sea mas probable; solo evita resultados variables cuando las señales son identicas.

## Confianza

La estimacion combina:

- margen entre primer y segundo lugar;
- evidencia disponible;
- calidad absoluta de la puntuacion;
- separacion suavizada exponencialmente.

La probabilidad se limita a 98 %. Despues se clasifica como `alta`, `media` o `baja` con umbrales adicionales. Es una heuristica calibrada manualmente, no una probabilidad bayesiana demostrada.

## Copiado

El boton invoca `navigator.clipboard.writeText(encrypted)` solo por accion del usuario. Si funciona, el icono cambia a confirmacion; si falla, aparece un texto de error. No se lee el portapapeles.

## Estado que invalida resultados

Cambiar el conjunto invalida resultados previos porque cambia la funcion matematica. Escribir nuevo texto limpia errores relacionados con ese texto, pero un resultado cifrado ya generado permanece hasta volver a cifrar; esta es una decision de interfaz que conviene conocer al demostrar el sistema.
