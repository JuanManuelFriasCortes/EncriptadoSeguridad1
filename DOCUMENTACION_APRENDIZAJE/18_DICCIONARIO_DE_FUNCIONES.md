# Diccionario de funciones y componentes

Este inventario cubre todas las funciones nombradas del codigo propio, incluidas privadas, componentes React y el constructor de error. Los callbacks anonimos se explican al final por familia.

## Entrada y componentes principales

### `RootLayout({ children })`

- **Archivo:** `app/layout.tsx`.
- **Recibe:** contenido React de la ruta.
- **Devuelve:** documento `<html lang="es"><body>...</body></html>`.
- **Efecto:** ninguno directo; importa estilos globales a nivel de modulo.
- **Importancia:** raiz semantica y metadatos.

### `Home()`

- **Archivo:** `app/page.tsx`.
- **Devuelve:** `<CryptoWorkbench />`.
- **Importancia:** entrada de la ruta principal.

### `ErrorNotice({ messages })`

- **Archivo:** `components/crypto-workbench.tsx`.
- **Recibe:** arreglo de errores.
- **Devuelve:** `null` si no hay mensajes; una alerta accesible si existen.
- **Detalle:** une mensajes con espacio y los renderiza como texto.

### `CharacterCount({ value })`

- **Recibe:** cadena.
- **Proceso:** `toGraphemes(value).length`.
- **Devuelve:** contador localizado y limite maximo; rojo si excede.

### `CryptoWorkbench()`

- **Responsabilidad:** pantalla, estado y orquestacion.
- **Hooks:** diez estados y un `useMemo`.
- **Devuelve:** toda la interfaz semantica.
- **No hace:** implementar formulas de cifrado o scoring.

### `selectPreset(value)`

- **Ambito:** interna de `CryptoWorkbench`.
- **Efectos:** cambia conjunto, limpia ambos errores, cifrado y resultado automatico.
- **Razon:** los resultados dependen del orden del conjunto.

### `encryptMessage()`

- **Proceso:** valida mensaje y conjunto, valida shift si aplica, cifra, crea metadata y actualiza estado.
- **Salida visible:** resultado Cesar o Atbash.
- **Error:** deduplica mensajes, limpia resultado y retorna.

### `decryptAutomatically()`

- **Proceso:** llama a `analyzeCiphertext` dentro de `try/catch`.
- **Efectos:** establece resultado unico o error visible.

### `copyEncrypted()`

- **Tipo:** asincrona.
- **Precondicion:** debe existir cifrado.
- **Efecto externo:** escribe en `navigator.clipboard`.
- **Estados:** `copied` o `error`.

## Componentes UI

### `Alert(props)`

Combina variante y clases, renderiza `<div role="alert">`, asigna `data-slot` y reenvia propiedades.

### `AlertTitle(props)`

Renderiza el titulo de alerta con estilos dependientes de icono.

### `AlertDescription(props)`

Renderiza descripcion y reglas tipograficas para enlaces y parrafos.

### `AlertAction(props)`

Renderiza un contenedor absoluto para acciones de una alerta. No se usa actualmente en la pantalla principal, pero forma parte del componente reutilizable.

### `alertVariants(...)`

No es una declaracion de funcion propia, sino el resultado invocable de `cva`. Recibe `{ variant }` y devuelve clases para `default` o `destructive`.

### `Button(props)`

Desestructura `className`, `variant`, `size`; llama `buttonVariants`; renderiza la primitiva de Base UI y reenvia propiedades.

### `buttonVariants(...)`

Funcion generada por CVA. Resuelve cinco variantes visuales y siete tamaños con valores predeterminados.

### `Input(props)`

Renderiza `InputPrimitive`, conserva tipo, une clases y reenvia atributos HTML.

### `Label(props)`

Renderiza `<label>` con estilos de estados deshabilitados.

### `Textarea(props)`

Renderiza `<textarea>` nativo con clases de foco, error, tamaño y deshabilitado.

### `cn(...inputs)`

- **Archivo:** `lib/utils.ts`.
- **Proceso:** `clsx(inputs)` y despues `twMerge`.
- **Devuelve:** cadena final de clases sin conflictos Tailwind importantes.

## Unicode

### `normalizeUnicode(value)`

- Convierte `null`/`undefined` a vacio mediante `value ?? ''`.
- Convierte a string.
- Normaliza a NFC.
- Devuelve cadena estable.

### `toGraphemes(value)`

- Normaliza primero.
- Si existe `Intl.Segmenter`, segmenta con locale `es` y granularidad `grapheme`.
- Si no, usa `Array.from`.
- Devuelve arreglo ordenado.

## Validacion

### `describeWhitespace(character)`

- **Privada.**
- Nombra espacio, salto de linea o tabulacion.
- Para otros blancos devuelve punto de codigo `U+...` hexadecimal.

### `validateCharset(rawCharset)`

- Normaliza y segmenta.
- Detecta duplicados y blancos.
- Aplica limites 2..128.
- Devuelve resultado estructurado; no lanza por entrada normal.

### `validateMessage(rawMessage, options)`

- Normaliza y cuenta grafemas.
- `required` vale `true` por defecto.
- Limita a 12,000.
- Devuelve resultado estructurado.

### `validateAnalysisComplexity(messageLength, charsetLength)`

- Calcula `messageLength * (charsetLength + 1)`.
- Compara con 1,500,000.
- Devuelve validez, operaciones y mensaje.

### `InputValidationError.constructor(messages)`

- Extiende `Error`.
- Une mensajes para `message`.
- Asigna `name` y conserva arreglo `messages`.

## Cifrados

### `normalizeShift(shift, size)`

- Valida entero seguro y tamaño al menos dos.
- Devuelve `((shift % size) + size) % size`.
- Puede lanzar `TypeError`.

### `transform(text, charset, indexMapper)`

- **Privada y de orden superior.**
- Convierte conjunto a arreglo si es necesario.
- Crea mapa grafema-indice.
- Recorre texto normalizado.
- Conserva externos.
- Delega el nuevo indice a `indexMapper`.

### `caesarEncrypt(text, charset, shift)`

- Normaliza desplazamiento.
- Mapea `i -> (i+k) mod N`.
- Devuelve texto cifrado NFC.

### `caesarDecrypt(text, charset, shift)`

- Mapea `i -> (i-k+N) mod N`.
- Devuelve texto recuperado.

### `atbashTransform(text, charset)`

- Mapea `i -> N-1-i`.
- Sirve para cifrar y descifrar.

## Puntuacion

### `foldSpanish(value)`

- **Privada.**
- Normaliza, pasa a minusculas españolas, preserva `ñ`, elimina otras marcas diacriticas y restaura `ñ`.

### `countMatches(value, pattern)`

- **Privada.**
- Reinicia `pattern.lastIndex` para no heredar estado de regex global.
- Ejecuta `match` y devuelve longitud o cero.

### `scoreSpanish(candidate)`

- Extrae letras y palabras.
- Calcula conteos, chi-cuadrada y log-verosimilitud.
- Evalua lexico, n-gramas, vocales y espacios.
- Resta patrones y controles.
- Devuelve score, evidencia y detalle.

## Analizador

### `compareCandidates(left, right)`

- **Privada.**
- Comparador para `sort`.
- Orden: score, palabras, Atbash, shift.

### `estimateConfidence(best, second)`

- **Privada.**
- Calcula margen, evidencia, calidad, separacion, porcentaje y nivel.
- Devuelve `{ level, percentage, margin }`.

### `rankCandidates(ciphertext, charset)`

- Genera un Atbash y `N` Cesar.
- Puntua todos.
- Ordena en el lugar.
- Devuelve arreglo completo, pensado tambien para pruebas o inspeccion interna.

### `analyzeCiphertext(rawCiphertext, rawCharset)`

- API principal de descifrado.
- Valida, limita complejidad, clasifica y devuelve solo el mejor con confianza.
- Lanza `InputValidationError` ante entradas invalidas.

## Plataforma

### `headers()` de `next.config.ts`

- Devuelve una regla para `/:path*` con siete cabeceras defensivas.
- Solo existe en la rama de configuracion local/servidor.
- No recibe ni registra mensajes.

### Proceso de `scripts/build-pages.mjs`

No declara una funcion publica: ejecuta una secuencia de build. Usa `spawnSync` para invocar `npm run build`, comprueba rutas y archivos con `path`/`existsSync`, mueve `_next`, crea `.nojekyll` y recorre las referencias encontradas por `html.matchAll`.

## Callbacks anonimos relevantes

- `PRESETS.map(preset => ...)`: crea botones.
- `['caesar','atbash'].map(value => ...)`: crea radios.
- `onChange(event => ...)`: sincroniza campos controlados.
- `characters.map((character,index) => [character,index])`: crea pares para `Map`.
- `.map(character => ...)`: transforma texto.
- `.filter(...)`: selecciona letras/palabras/vocales.
- `.reduce(...)`: suma controles.
- `Object.keys(...).map(letter => [letter,0])`: inicializa conteos.
- callbacks de indice de Cesar/Atbash: reglas matematicas entregadas a `transform`.
- callback de `useMemo`: ejecuta validacion solo cuando cambia `charset`.

## Funciones configuradoras externas invocadas

- `defineConfig`: tipa/normaliza configuracion Vite.
- `tailwindcss()`: crea plugin PostCSS.
- `vinext()`: crea plugin de integracion.
- `cva(...)`: fabrica funciones de variantes.
- `clsx(...)` y `twMerge(...)`: construyen clases.

No son implementaciones propias, pero comprender su papel explica por que ciertos valores como `buttonVariants` son invocables.

## Matriz completa de llamadas, efectos y complejidad

| Funcion | Archivo | Parametros -> retorno | Llama / es llamada por | Efecto y seguridad | Complejidad / ejemplo |
|---|---|---|---|---|---|
| `RootLayout` | `app/layout.tsx` | children -> JSX raiz | renderiza `Home`; plataforma la llama | sin datos del usuario; fija `lang` | O(tamaño JSX) |
| `Home` | `app/page.tsx` | ninguno -> Workbench | llama `CryptoWorkbench`; ruta la llama | sin efecto | O(1) |
| `ErrorNotice` | workbench | `messages` -> alerta/null | UI la llama; usa Alert | texto escapado, anuncio ARIA | O(numero/longitud mensajes) |
| `CharacterCount` | workbench | value -> JSX contador | UI la llama; usa `toGraphemes` | marca limite, no modifica | O(M); `😀` cuenta uno con Segmenter |
| `CryptoWorkbench` | workbench | ninguno -> pantalla | `Home`; llama motor/UI | administra estado/DOM declarativo | O(render + conteos) |
| `selectPreset` | workbench | string -> void | botones la llaman; setters | cambia estado y limpia resultados | O(1) mas render |
| `encryptMessage` | workbench | ninguno -> void | boton; llama validadores/cifrados | cambia estados; valida shift | O(N+M) |
| `decryptAutomatically` | workbench | ninguno -> void | boton; llama analyzer | captura error y cambia estado | costo de ranking |
| `copyEncrypted` | workbench | ninguno -> Promise<void> | boton; Clipboard API | escribe fuera de pagina tras clic | O(M) aproximado |
| `Alert` | ui/alert | props -> div | ErrorNotice | rol alert; reenvia props | O(clases) |
| `AlertTitle` | ui/alert | props -> div | consumidores futuros | sin efecto | O(clases) |
| `AlertDescription` | ui/alert | props -> div | ErrorNotice | contenido JSX textual | O(clases/contenido) |
| `AlertAction` | ui/alert | props -> div | no usada actualmente | contenedor de accion | O(clases) |
| `Button` | ui/button | props -> primitiva | Workbench | eventos vienen del consumidor | O(clases) |
| `Input` | ui/input | props -> input | Workbench | captura entrada, no valida dominio | O(clases) |
| `Label` | ui/label | props -> label | Workbench | asociacion accesible | O(clases) |
| `Textarea` | ui/textarea | props -> textarea | Workbench | captura texto sin interpretarlo | O(clases) |
| `cn` | `lib/utils.ts` | clases -> string | todos los UI | sin efecto; no es sanitizador HTML | O(numero/longitud clases) |
| `normalizeUnicode` | unicode | value -> string NFC | casi todo el motor | estabiliza canonico, no confusables | O(M); `e+acento -> é` |
| `toGraphemes` | unicode | value -> string[] | UI/motor | fallback menos preciso | O(M); emoji modificado idealmente uno |
| `describeWhitespace` | validation | grafema -> descripcion | `validateCharset` | mensaje, no escape especial necesario en JSX | O(1) |
| `validateCharset` | validation | string -> resultado | UI/analyzer | protege unicidad, blancos y limites | O(N), peor O(N²) acotado |
| `validateMessage` | validation | string/options -> resultado | UI/analyzer | protege vacio/12,000 | O(M) |
| `validateAnalysisComplexity` | validation | M,N -> resultado | analyzer | defensa DoS aproximada | O(1); `12000*129` falla |
| `InputValidationError` constructor | validation | mensajes -> error | analyzer | expone mensaje previsto, no stack en UI | O(longitud mensajes) |
| `normalizeShift` | ciphers | k,N -> entero | Cesar/UI | valida entero seguro/tamaño | O(1); `-1,5 -> 4` |
| `transform` | ciphers | texto,C,mapper -> string | tres cifrados | conserva externos; exige C>=2 | O(N+M) |
| `caesarEncrypt` | ciphers | texto,C,k -> string | UI | llama normalize/transform | O(N+M); BAD -> DCA con k2 |
| `caesarDecrypt` | ciphers | texto,C,k -> string | analyzer/consumidores | inversa con mismo C/k | O(N+M) |
| `atbashTransform` | ciphers | texto,C -> string | UI/analyzer | involutiva | O(N+M); BAD -> DEB |
| `foldSpanish` | scoring | texto -> string plegado | `scoreSpanish` | preserva ñ; marcador NUL interno | O(M) |
| `countMatches` | scoring | texto,regex -> numero | `scoreSpanish` | reinicia `lastIndex` | aprox O(M), motor regex |
| `scoreSpanish` | scoring | candidato -> analisis | `rankCandidates` | no ejecuta entrada; penaliza controles | practico O(P*M+A) |
| `compareCandidates` | analyzer | dos candidatos -> numero | `sort` | desempate determinista Atbash | O(1) |
| `estimateConfidence` | analyzer | mejor,segundo -> objeto | `analyzeCiphertext` | heuristica, no probabilidad formal | O(1) |
| `rankCandidates` | analyzer | ciphertext,C -> arreglo | `analyzeCiphertext`/pruebas | presupone entrada validada; guarda todos | ~O(N*M+scoring), memoria O(N*M) |
| `analyzeCiphertext` | analyzer | dos strings -> resultado | UI | valida, limita y devuelve uno | costo de ranking |
| `headers` | `next.config.ts` | ninguno -> reglas | Vinext servidor | declara cabeceras; no toca mensajes | O(1) |

Las funciones generadas `alertVariants` y `buttonVariants` reciben variantes y devuelven clases; `cva` las crea, los componentes correspondientes las llaman y su costo crece con la pequeña configuracion de clases.
