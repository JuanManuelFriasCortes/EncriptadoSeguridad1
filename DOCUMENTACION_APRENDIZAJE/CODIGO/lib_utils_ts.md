# `lib/utils.ts`

## Proposito

Expone `cn`, utilidad central para clases CSS.

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Dos etapas

`clsx` acepta strings, objetos, arreglos y valores falsos para construir una cadena. `twMerge` entiende grupos de Tailwind y elimina conflictos relevantes, normalmente conservando la clase posterior.

## Tipo

`ClassValue[]` proviene de `clsx` y permite entradas flexibles con comprobacion TypeScript.

## Conexion

Todos los componentes UI lo usan para combinar base con `className` del consumidor.

## Riesgos

`twMerge` conoce reglas Tailwind, no toda semantica CSS personalizada. Dos clases arbitrarias pueden coexistir. El orden de entradas importa.

## Pruebas

Clases simples, condicionales falsas, objetos, arreglos y conflictos como `h-8 h-10`.
