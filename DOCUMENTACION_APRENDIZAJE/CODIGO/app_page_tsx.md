# `app/page.tsx`

## Proposito

Es la ruta principal y deliberadamente contiene solo composicion.

```tsx
import { CryptoWorkbench } from '@/components/crypto-workbench';

export default function Home() {
  return <CryptoWorkbench />;
}
```

## Conexion

El alias `@/` apunta a la raiz segun `tsconfig.json`. `Home` se coloca dentro de `RootLayout`. Toda la interactividad vive en el componente cliente importado.

## Por que es valioso que sea pequeño

La ruta no duplica estado ni formulas. Si se añaden otras paginas, pueden reutilizar partes sin convertir el archivo de entrada en un bloque monolitico.

## Riesgos

Añadir logica criptografica aqui mezclaria enrutamiento y dominio. Añadir un segundo `<main>` alrededor produciria semantica principal duplicada porque `CryptoWorkbench` ya lo tiene.

## Prueba

La ruta `/` debe renderizar el encabezado “Criptoanálisis Al-Kindi” y ambas herramientas.
