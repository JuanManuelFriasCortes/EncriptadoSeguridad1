# HTML explicado

## Por que no hay `index.html`

El repositorio no contiene HTML estatico escrito a mano. El HTML nace de JSX/TSX. Vinext interpreta la convencion de la carpeta `app`, React convierte componentes en elementos y el navegador recibe un documento equivalente. En `npm run build:pages`, ese resultado se materializa como `dist/client/index.html`; sigue siendo salida generada y no debe editarse. Por tanto, explicar el HTML exige estudiar `app/layout.tsx`, `app/page.tsx` y `components/crypto-workbench.tsx`.

## Documento raiz

`RootLayout` produce:

```tsx
<html lang="es">
  <body>{children}</body>
</html>
```

`lang="es"` ayuda a lectores de pantalla, correctores y motores de interpretacion. `{children}` es el contenido de la ruta actual. Los metadatos declaran titulo, descripcion, nombre de aplicacion y `robots: { index: false, follow: false }`; esto expresa que el sitio educativo no desea indexacion, aunque no es una barrera de acceso.

## Pagina principal

`Home` devuelve un unico componente. No crea un contenedor adicional porque `CryptoWorkbench` ya comienza con `<main>`.

## Semantica principal

La pantalla usa:

- `<main>` para el contenido central.
- `<header>` para identidad y contexto.
- `<section>` para conjunto, cifrado y descifrado.
- `<h1>` para el nombre del laboratorio.
- `<h2>` para las dos herramientas.
- `<footer>` para privacidad y advertencia criptografica.
- `<fieldset>` y `<legend>` para agrupar Cesar/Atbash.
- `<output>` para resultados calculados.
- `<label>` asociado mediante `htmlFor` e `id`.

Esta jerarquia es mejor que una pagina formada solo por `<div>` porque comunica estructura a tecnologias de asistencia.

## Controles y sus identificadores

| `id` | Elemento | Proposito |
|---|---|---|
| `charset` | input | conjunto ordenado personalizado |
| `charset-title` | label/titulo | nombre accesible de la seccion |
| `charset-help` | parrafo | restricciones del conjunto |
| `charset-error` | parrafo | error asociado al conjunto |
| `plain-text` | textarea | mensaje original |
| `shift` | input number | desplazamiento Cesar |
| `cipher-text` | textarea | mensaje a analizar |
| `encrypt-title` | h2 | encabezado de cifrado |
| `decrypt-title` | h2 | encabezado de descifrado |

`aria-describedby="charset-help charset-error"` enlaza instrucciones y error con el campo. `aria-invalid` cambia segun la validacion.

## Selector de metodo

Visualmente parece un control segmentado, pero semanticamente son dos radios con el mismo `name="cipher-method"`. Solo uno puede estar marcado. Los radios reales tienen `sr-only`: no son visibles, pero permanecen disponibles para teclado y lectores de pantalla. Las etiquetas amplian el area clicable.

## Resultados accesibles

Los errores usan `role="alert"` y `aria-live="assertive"`, por lo que deben anunciarse con prioridad. Los resultados usan `aria-live="polite"`; el descifrado añade `aria-atomic="true"` para anunciar el bloque completo.

El texto se inserta con expresiones JSX como `{encrypted}` o `{automaticResult?.plaintext}`. React lo trata como texto, no como HTML ejecutable. El proyecto no usa `dangerouslySetInnerHTML`, `innerHTML`, `eval` ni construccion de scripts.

## Renderizado condicional

Ejemplos:

```tsx
{encryptedMeta && <span>{encryptedMeta}</span>}
{automaticResult?.plaintext ?? 'Texto alternativo'}
```

El operador `&&` renderiza solo si el valor existe. El encadenamiento opcional evita acceder a propiedades de `null`. La coalescencia nula muestra un texto inicial cuando no existe resultado.

## Listas

Los preajustes se generan con `PRESETS.map`. Cada boton recibe `key={preset.key}`. React usa la clave para reconciliar elementos entre renderizaciones; no se muestra en el DOM.

## Eventos

Los atributos JSX difieren de HTML literal:

- `className` en vez de `class`.
- `htmlFor` en vez de `for`.
- `onClick` y `onChange` reciben funciones, no cadenas de codigo.
- valores booleanos como `disabled={!encrypted}` son expresiones.

React administra los listeners. No hay llamadas directas a `document.querySelector` ni `addEventListener`.

## Atributos defensivos y de usabilidad

- `spellCheck={false}` evita interferencia del corrector en texto criptografico.
- `autoComplete="off"` evita sugerencias sobre el conjunto.
- `inputMode="numeric"` sugiere teclado numerico en moviles.
- `type="button"` evita comportamiento de envio si el componente entra en un formulario futuro.
- `aria-hidden="true"` oculta iconos puramente decorativos.
- `aria-label` nombra el boton de copiar aunque solo tenga icono.

## Estructura aproximada producida

```html
<html lang="es">
  <body>
    <main>
      <header>...</header>
      <div>
        <section>conjunto</section>
        <div>
          <section>cifrado</section>
          <section>descifrado automatico</section>
        </div>
        <footer>...</footer>
      </div>
    </main>
  </body>
</html>
```

El HTML real contiene clases generadas y componentes convertidos a elementos nativos. Para inspeccionarlo durante la ejecucion se usan las herramientas de desarrollo del navegador, pestaña Elements.
