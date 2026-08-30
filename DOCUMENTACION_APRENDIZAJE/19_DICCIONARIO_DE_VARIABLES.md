# Diccionario de variables, constantes y estados

## Constantes globales del dominio

### `LIMITS`

Objeto congelado:

| Propiedad | Valor | Significado |
|---|---:|---|
| `minCharsetLength` | 2 | minimo matematico del conjunto |
| `maxCharsetLength` | 128 | limite defensivo de candidatos |
| `maxMessageLength` | 12,000 | maximo de grafemas del mensaje |
| `maxAnalysisOperations` | 1,500,000 | presupuesto aproximado del barrido |

### `CHARSET_PRESETS`

- `spanish`: 27 mayusculas con `Ñ`.
- `alphanumeric`: letras españolas mas digitos.
- `lowercase`: minusculas, `ñ` y vocales acentuadas/`ü`.
- `emoji`: conjunto de emojis de ejemplo.

Son sugerencias editables, no listas privilegiadas por el motor.

### `SPANISH_LETTER_FREQUENCIES`

Objeto de letra a porcentaje esperado. La suma puede depender de redondeos. Es entrada para chi-cuadrada y log-verosimilitud.

### `COMMON_WORDS`

`Set` de palabras frecuentes y vocabulario del dominio. Un Set ofrece pertenencia directa y elimina duplicados.

### `SPANISH_NGRAMS`

Objeto de secuencia a peso. Secuencias mas caracteristicas reciben mas peso.

### `IMPROBABLE_PATTERNS`

Arreglo congelado de cinco expresiones regulares globales para penalizar estructuras raras.

### `VALID_SINGLE_LETTER_WORDS`

Set `{a,e,o,u,y}`. Otras palabras de una letra reciben penalizacion.

## Constantes de interfaz

### `PRESETS`

Arreglo de objetos `{ key, label, value }` que adapta `CHARSET_PRESETS` a botones visibles. `as const` preserva literales.

### `CipherMethod`

Tipo union `'caesar' | 'atbash'`.

### `AutomaticResult`

Tipo derivado con `ReturnType<typeof analyzeCiphertext>`.

## Estados de `CryptoWorkbench`

| Estado | Inicial | Significado |
|---|---|---|
| `charset` | alfabeto español | cadena ordenada activa |
| `plainText` | `''` | texto a cifrar |
| `ciphertext` | `''` | texto a analizar |
| `method` | `'caesar'` | metodo de cifrado seleccionado |
| `shift` | `'3'` | valor textual del input numerico |
| `encrypted` | `''` | ultimo resultado cifrado |
| `encryptedMeta` | `''` | descripcion del metodo aplicado |
| `automaticResult` | `null` | mejor resultado del analizador |
| `encryptErrors` | `[]` | errores del panel izquierdo |
| `decryptErrors` | `[]` | errores del panel derecho |
| `copyState` | `'idle'` | resultado del intento de copiado |

El desplazamiento se guarda como string porque los inputs controlados producen texto y pueden atravesar estados temporalmente invalidos.

Cada estado tiene un setter `setX`. Los setters solicitan renderizado y no deben interpretarse como mutacion sincrona ordinaria.

## Valores derivados de interfaz

### `charsetValidation`

Resultado memorizado de `validateCharset(charset)`.

### `charsetCount`

`charsetValidation.characters.length`; cantidad real de grafemas, no unidades UTF-16.

### `count`

En `CharacterCount`, longitud en grafemas del valor mostrado.

### `messageValidation`

Resultado de validar `plainText` durante cifrado.

### `errors`

Arreglo mutable local con errores de conjunto, mensaje y shift. No es estado hasta llamar `setEncryptErrors`.

### `numericShift`

Conversion numerica del string `shift`.

### `result`

Texto devuelto por Cesar o Atbash en cifrado, o resultado automatico dentro del handler de descifrado. Son variables de bloques distintos.

### `confidenceLabel`

Cadena visible `nivel · porcentaje%` o `Sin analizar`.

### `message` en `catch`

Mensaje seguro extraido de una instancia `Error` o alternativa generica.

## Variables Unicode y validacion

- `normalized`: cadena NFC.
- `segmenter`: instancia `Intl.Segmenter` para español/grafemas.
- `characters`: arreglo de grafemas del conjunto.
- `errors`: lista de mensajes.
- `seen`: Set de grafemas encontrados.
- `duplicates`: duplicados unicos.
- `whitespace`: descripciones de blancos.
- `length`: longitud del mensaje en grafemas.
- `required`: opcion booleana con valor predeterminado verdadero.
- `operations`: producto aproximado de carga.
- `valid`: comparacion con el limite.

## Variables de cifrado

- `size`: tamaño `N` del conjunto.
- `normalizedShift`: `k` reducido a `0..N-1`.
- `indexMapper`: callback con la regla matematica.
- `lookup`: `Map<grafema, indice>`.
- `index`: posicion encontrada; `undefined` si es externo.

## Variables de scoring

- `folded`: texto en forma comparable para español.
- `graphemes`: unidades del texto plegado.
- `letters`: grafemas que aparecen en frecuencias.
- `words`: secuencias `[a-zñ]+`.
- `substantialWords`: palabras de longitud mayor que uno.
- `letterCount`: numero de letras modeladas.
- `counts`: objeto de conteo observado.
- `chiSquare`: discrepancia acumulada.
- `logLikelihood`: suma de logs ponderada por observaciones.
- `expectedPercent`: frecuencia porcentual de una letra.
- `expected`: conteo esperado para la longitud actual.
- `observed`: conteo real.
- `averageLogLikelihood`: promedio por letra.
- `frequency`: contribucion combinada y acotada.
- `recognizedWords`: subconjunto presente en el lexico.
- `recognizedRatio`: proporcion reconocida.
- `lexical`: puntos por palabras.
- `ngrams`: peso bruto acumulado.
- `ngramScore`: contribucion normalizada/acotada.
- `start`: indice de busqueda de coincidencias.
- `vowelCount`, `vowelRatio`, `vowelScore`: señal vocalica.
- `spaceCount`, `spaceRatio`, `spaceScore`: señal de separacion.
- `structurePenalty`: penalizacion por palabras/patrones, maximo 75.
- `controlPenalty`: suma por controles.
- `codePoint`: entero Unicode inicial del grafema.
- `disallowed`: indica control penalizado.
- `score`: suma final.
- `evidence`: volumen de evidencia `0..1`.

## Variables del analizador

- `candidates`: arreglo mutable de candidatos nuevos.
- `atbashPlaintext`: salida de Atbash.
- `shift`: clave Cesar iterada.
- `plaintext`: salida de un candidato Cesar.
- `analysis`: objeto producido por scoring.
- `left`, `right`: candidatos comparados al ordenar.
- `best`, `second`: dos primeros.
- `margin`: diferencia de score.
- `quality`: score absoluto escalado.
- `separation`: margen transformado exponencialmente.
- `probability`: porcentaje heuristico redondeado.
- `level`: `baja`, `media` o `alta`.
- `charsetResult`, `messageResult`: validaciones internas.
- `complexity`: resultado del presupuesto.
- `ranked`: arreglo ordenado completo.

## Variables de estilos

- `alertVariants`: funcion CVA para alertas.
- `buttonVariants`: funcion CVA para botones.
- `className`: clases adicionales del consumidor.
- `variant`: aspecto semantico/visual.
- `size`: tamaño de boton.
- `props`: resto de atributos reenviados.
- `inputs`: valores aceptados por `cn`.

## Plataforma y configuracion

### `isGitHubPages`

Booleano derivado de `GITHUB_PAGES`. Selecciona de forma explicita la rama de exportacion estatica.

### `repositoryName`

Nombre extraido de `GITHUB_REPOSITORY`; determina el prefijo URL del sitio de proyecto. El valor de respaldo es `EncriptadoSeguridad1`.

### `contentSecurityPolicy`

Cadena privada creada al unir directivas. `connect-src` añade `ws:` solo si `NODE_ENV` es `development`.

### `securityHeaders`

Arreglo de pares nombre/valor consumido por `headers()` en modo servidor.

### `nextConfig`

Union de dos objetos: exportacion estatica con `assetPrefix` o configuracion de cabeceras para servidor.

### Rutas del artefacto

`clientDirectory`, `nestedDirectory`, `nestedAssets`, `publicAssets` e `indexFile` son rutas absolutas del script. Antes de usarlas se comprueba que queden dentro de `dist/client`.

### Configuracion Vite

- `css.postcss.plugins`: incluye `tailwindcss()`.
- `plugins`: incluye `vinext()`.

### Configuracion TypeScript

Variables conceptuales clave: `strict`, `allowJs`, `noEmit`, `moduleResolution: bundler`, `jsx: react-jsx`, alias `@/*`, inclusiones y exclusion de `node_modules`.

## Valores que parecen claves pero no son secretos

El desplazamiento Cesar es un parametro de demostracion. Los presets, pesos, frecuencias y CSP son publicos. El repositorio no contiene una clave criptografica moderna ni credenciales.

## Matriz de referencia prioritaria

| Variable | Archivo/tipo | Inicial | Donde cambia | Dependencias principales |
|---|---|---|---|---|
| `LIMITS` | constants/object frozen | 2,128,12000,1500000 | nunca en runtime | validacion, UI |
| `CHARSET_PRESETS` | constants/object frozen | cuatro cadenas | nunca | Workbench |
| `SPANISH_LETTER_FREQUENCIES` | language/object | 27 porcentajes | nunca | scoring |
| `COMMON_WORDS` | language/Set | lexico incluido | nunca actualmente | scoring |
| `SPANISH_NGRAMS` | language/object | pesos reales | nunca | scoring |
| `IMPROBABLE_PATTERNS` | language/regex[] | cinco regex | `lastIndex` puede variar y se reinicia | scoring |
| `VALID_SINGLE_LETTER_WORDS` | language/Set | a,e,o,u,y | nunca | scoring |
| `PRESETS` | workbench/readonly array | adaptacion de presets | nunca | render de botones |
| `charset` | workbench/string state | español mayusculo | input/preset | validacion y ambas herramientas |
| `plainText` | workbench/string state | vacio | textarea | cifrado/contador |
| `ciphertext` | workbench/string state | vacio | textarea | analyzer/contador |
| `method` | workbench/union state | caesar | radios | handler/shift UI |
| `shift` | workbench/string state | `3` | input | validacion/Cesar |
| `encrypted` | workbench/string state | vacio | cifrar/preset/charset | output/clipboard |
| `automaticResult` | workbench/object/null | null | analizar/preset/charset/error | output/confianza |
| `encryptErrors` | workbench/string[] | vacio | validacion/edicion | ErrorNotice |
| `decryptErrors` | workbench/string[] | vacio | analisis/edicion | ErrorNotice |
| `copyState` | workbench/union | idle | cifrar/copiar | icono/mensaje |
| `candidates` | analyzer/array local | vacio | `push` durante ranking | sort/best |
| `analysis` | candidato/object | scoreSpanish | no se muta despues | comparador/confianza |
| `isGitHubPages` | next.config/boolean | segun entorno | nunca en ejecucion | seleccion de config |
| `repositoryName` | config/script/string | repo o respaldo | nunca | assetPrefix y rutas |
| `contentSecurityPolicy` | next.config/string | directivas unidas | depende de NODE_ENV al cargar | header CSP de servidor |
| `securityHeaders` | next.config/array | siete entradas | nunca | `headers()` |

No hay referencias DOM guardadas: React administra nodos y eventos de forma declarativa.
