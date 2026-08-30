# Modulos y conexiones

## Grafo de importaciones propio

```text
app/layout.tsx ------> app/globals.css
app/page.tsx --------> components/crypto-workbench.tsx

crypto-workbench.tsx -> components/ui/alert.tsx
                     -> components/ui/button.tsx
                     -> components/ui/input.tsx
                     -> components/ui/label.tsx
                     -> components/ui/textarea.tsx
                     -> lib/crypto/index.js

components/ui/* -----> lib/utils.ts
lib/utils.ts --------> clsx + tailwind-merge

lib/crypto/index.js --> analyzer.js
                    -> ciphers.js
                    -> constants.js
                    -> scoring.js
                    -> unicode.js
                    -> validation.js

analyzer.js ---------> ciphers.js + scoring.js + validation.js
ciphers.js ----------> unicode.js
scoring.js ----------> language-data.js + unicode.js
validation.js -------> constants.js + unicode.js

next.config.ts ------> Vinext (exportacion/cabeceras)
build-pages.mjs -----> npm build + filesystem de dist/client
pages.yml -----------> GitHub Actions + GitHub Pages
vite.config.ts ------> Vite + Vinext + Tailwind PostCSS
```

## Tabla de responsabilidades

| Modulo | Exporta | Consumidor principal |
|---|---|---|
| `constants.js` | `LIMITS`, `CHARSET_PRESETS` | validacion, UI |
| `unicode.js` | `normalizeUnicode`, `toGraphemes` | cifrados, scoring, validacion, UI |
| `validation.js` | validadores y error | analizador, UI |
| `ciphers.js` | Cesar, Atbash, normalizacion | analizador, UI |
| `language-data.js` | modelo estatico de español | scoring |
| `scoring.js` | `scoreSpanish` | analizador |
| `analyzer.js` | ranking y resultado unico | UI |
| `index.js` | reexportaciones | UI |

## El modulo barril

`lib/crypto/index.js` no implementa algoritmos. Reexporta la API publica. La interfaz puede escribir una sola importacion desde `@/lib/crypto/index.js`. Esto reduce conocimiento de rutas internas.

No todo lo privado se reexporta: `compareCandidates`, `estimateConfidence`, `transform`, `foldSpanish`, `countMatches` y `describeWhitespace` permanecen encerrados en sus archivos. Esa frontera indica que son detalles de implementacion.

## Alias de rutas

`tsconfig.json` define:

```json
"paths": { "@/*": ["./*"] }
```

Por eso `@/components/ui/button` significa una ruta desde la raiz del proyecto. Los modulos JavaScript internos usan rutas relativas con extension `.js`, coherentes con ESM.

## Dependencias externas por funcion

- `react`: componentes, estado y memoizacion.
- `react-dom` y `react-server-dom-webpack`: infraestructura de renderizado.
- `@base-ui/react`: primitivas de Button e Input.
- `class-variance-authority`: variantes tipadas de estilos.
- `clsx`: clases condicionales.
- `tailwind-merge`: resolucion de conflictos Tailwind.
- `lucide-react`: iconos.
- `vinext`, `vite`: servidor y compilacion.
- `tailwindcss`, `@tailwindcss/postcss`: generacion CSS.
- `typescript` y `@types/*`: analisis estatico.

## Conexion entre interfaz y motor

La UI pasa valores controlados por el usuario. No confia en que sean correctos. En cifrado llama primero a validadores y despues a transformaciones. En descifrado delega todo a `analyzeCiphertext`, que vuelve a validar.

El motor devuelve objetos simples, no componentes. Esta eleccion evita mezclar presentacion con dominio y permite que otro cliente, por ejemplo una CLI, reutilice el mismo motor.

## Conexion de estilos

`layout.tsx` importa `globals.css` una vez. Los componentes solo referencian tokens y utilidades. `vite.config.ts` registra Tailwind como plugin PostCSS para que esas utilidades se materialicen durante desarrollo y build.

## Conexion de plataforma

Vinext descubre `next.config.ts`. En servidor, `headers()` aplica cabeceras a `/:path*`; en exportacion, el objeto alternativo activa `output: 'export'` y las rutas para Pages. No existe una llamada desde `CryptoWorkbench`. El script y el workflow solo operan durante build/despliegue.

## Ciclos

El grafo no presenta ciclos internos. Una dependencia circular como `scoring -> analyzer -> scoring` seria peligrosa porque acoplaria evaluacion y seleccion. La direccion actual va de datos/utilidades hacia orquestadores.

## Como seguir una llamada

Para cifrar Cesar:

```text
CryptoWorkbench.encryptMessage
 -> validateMessage / validateCharset
 -> caesarEncrypt
 -> normalizeShift
 -> transform
 -> normalizeUnicode / toGraphemes
```

Para descifrar:

```text
CryptoWorkbench.decryptAutomatically
 -> analyzeCiphertext
 -> rankCandidates
 -> atbashTransform + caesarDecrypt
 -> scoreSpanish
 -> datos linguisticos
 -> compareCandidates
 -> estimateConfidence
```

## Regla para futuras modificaciones

Una nueva señal del español pertenece a `language-data.js` si es dato y a `scoring.js` si es formula. Un nuevo cifrado pertenece al dominio y requiere que `analyzer.js` decida si debe generar candidatos. La UI solo debe controlar seleccion y visualizacion; no conviene copiar formulas alli.
