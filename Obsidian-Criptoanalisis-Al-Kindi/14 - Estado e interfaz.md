---
aliases: [CryptoWorkbench, UI]
tags: [react, interfaz, estado, accesibilidad]
---

# Estado e interfaz

## Componente central

`components/crypto-workbench.tsx` conecta formularios con el motor. No implementa scoring ni fórmulas; coordina llamadas.

## Estados

| Estado | Función |
| --- | --- |
| `charset` | Secuencia activa |
| `plainText` | Entrada para cifrar |
| `ciphertext` | Entrada para analizar |
| `method` | Método elegido al cifrar |
| `shift` | Entrada numérica César |
| `encrypted` | Ciphertext producido |
| `automaticResult` | Ganador del detector |
| errores | Retroalimentación validada |
| `copyState` | Resultado del portapapeles |

## Eventos

- `selectPreset`: cambia charset y descarta resultados obsoletos.
- `encryptMessage`: ejecuta [[02 - Flujo de cifrado]].
- `decryptAutomatically`: ejecuta [[03 - Descifrado automatico]].
- `copyEncrypted`: copia solo por clic.

## Restricción clave

El bloque de descifrado no tiene selector de algoritmo ni campo de desplazamiento. Solo muestra el ganador que retorna `analyzeCiphertext`.

## Accesibilidad

- labels asociados con `htmlFor`;
- `fieldset` y radios para método;
- `aria-live` en errores y resultados;
- botones semánticos;
- foco visible;
- iconos decorativos con `aria-hidden`;
- diseño apilado en móvil y dividido en escritorio.

## Renderizado seguro

Los valores se insertan como hijos JSX. No se usa HTML crudo. Véase [[17 - XSS CSP y headers]].
