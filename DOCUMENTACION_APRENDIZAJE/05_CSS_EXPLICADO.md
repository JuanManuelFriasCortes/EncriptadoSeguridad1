# CSS explicado

## Dos fuentes de estilos

La apariencia sale de dos lugares:

1. `app/globals.css` define tema y reglas base.
2. Las cadenas `className` de los componentes contienen utilidades Tailwind.

No hay hojas CSS por componente ni media queries escritas a mano. Tailwind compila prefijos responsivos como `sm:`, `md:` y `lg:` a media queries.

## Importacion de Tailwind

```css
@import 'tailwindcss';
```

Esto habilita el motor de utilidades. `@theme inline` conecta nombres semanticos de Tailwind con variables propias:

```css
--color-background: var(--background);
--color-primary: var(--primary);
--font-sans: var(--font-ui);
```

Gracias a ello, `bg-background` usa `--background` y `text-primary` usa `--primary`.

## Tokens de diseño

`:root` actua como fuente central de decisiones visuales. Hay colores generales (`background`, `foreground`, `primary`, `border`, `ring`) y colores especificos de dominio (`encrypt-bg`, `analysis-bg`, `privacy-border`). Tambien hay fuentes y radios.

Ventaja: si cambia la identidad visual, puede modificarse un token sin buscar cada uso. Riesgo: una variable sin nombre semantico o no usada puede confundir; por eso conviene mantener correspondencia clara entre token y funcion.

## Capa base

La regla universal aplica borde y contorno por tema y fija `box-sizing: border-box`. Esto hace que ancho y alto incluyan relleno y borde. `body` elimina el margen por defecto, define fuente y fuerza `letter-spacing: 0`. Los controles heredan la tipografia. `::selection` personaliza texto seleccionado.

## Composicion de utilidades

Ejemplo:

```tsx
className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8"
```

- `mx-auto`: centra horizontalmente.
- `max-w-[1440px]`: limita el ancho.
- `px-4 py-5`: relleno base.
- `sm:px-6`: mas relleno en pantallas pequeñas hacia arriba.
- `lg:px-8`: mas relleno en pantallas grandes.

Tailwind no cambia la semantica HTML; solo genera reglas CSS correspondientes.

## Diseño responsivo

En movil, las dos herramientas aparecen una debajo de la otra. En `lg`:

```tsx
className="grid min-h-[560px] lg:grid-cols-2"
```

se convierte en dos columnas. Los bordes tambien cambian: la seccion izquierda pasa de borde inferior a borde derecho. El aviso de privacidad esta oculto de base (`hidden`) y aparece desde `md` (`md:flex`).

## Estados de interaccion

- `hover:` modifica al apuntar.
- `focus-visible:` muestra contorno al navegar con teclado.
- `disabled:` reduce opacidad y bloquea puntero.
- `peer-checked:` cambia la etiqueta del radio seleccionado.
- `aria-invalid:` pinta controles invalidos.

El foco visible es una defensa de accesibilidad: quitar contornos sin reemplazo impediria saber donde esta el teclado.

## Variantes con CVA

`button.tsx` y `alert.tsx` usan `class-variance-authority`. La base define clases comunes y el objeto `variants` añade clases segun propiedades como `variant` y `size`. Esto evita duplicar cadenas completas.

`cn` ejecuta dos pasos:

1. `clsx` incluye clases segun condiciones.
2. `tailwind-merge` resuelve conflictos; por ejemplo, una clase posterior puede reemplazar un alto anterior.

## Tipografia y resultados

El texto normal usa la familia de interfaz. Resultados y contadores usan `font-mono`, apropiada para comparar caracteres. `whitespace-pre-wrap` conserva saltos y espacios visibles; `break-words` impide que cadenas largas rompan el ancho.

## Colores por responsabilidad

- Cifrado: superficie clara y acento marron apagado.
- Analisis: verdes para resultado y confianza.
- Error: `destructive` rojo.
- Texto secundario: `muted-foreground`.

La paleta no representa seguridad criptografica. El verde del analisis solo comunica estado visual.

## Accesibilidad y contraste

La interfaz combina color con texto e iconos. Un error no depende solo del rojo: contiene mensaje y rol de alerta. El metodo seleccionado cambia fondo, peso de fuente y estado real del radio. Estos detalles ayudan a usuarios con deficiencias de percepcion del color.

## Riesgos al modificar estilos

1. Eliminar `sr-only` de los radios cambia la composicion.
2. Sustituirlo por `display: none` puede empeorar accesibilidad.
3. Quitar `break-words` permite desbordamiento con texto sin espacios.
4. Quitar alturas minimas provoca saltos de diseño entre estados vacio/resultado.
5. Añadir una clase conflictiva puede ser resuelto por `tailwind-merge` de forma distinta a la esperada; hay que inspeccionar el resultado.
6. Colores con bajo contraste o foco invisible dificultan uso por teclado.

## Como depurarlo

En DevTools selecciona un elemento y revisa `Styles` y `Computed`. Busca la utilidad Tailwind, la variable resuelta y la media query activa. Si una clase no aparece, verifica que el archivo este incluido en el escaneo de Tailwind y que la clase no se construya dinamicamente con fragmentos imposibles de detectar.
