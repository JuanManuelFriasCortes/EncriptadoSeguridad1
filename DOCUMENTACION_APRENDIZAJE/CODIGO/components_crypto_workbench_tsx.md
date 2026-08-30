# `components/crypto-workbench.tsx`

## Proposito

Es el coordinador de la aplicacion. Declara estado, valida entradas, invoca el motor y renderiza la experiencia. La primera linea `'use client'` es necesaria porque usa hooks, eventos, navegador y portapapeles.

## Importaciones

- React: `useMemo`, `useState`.
- Lucide: iconos decorativos o de accion.
- UI local: `Alert`, `Button`, `Input`, `Label`, `Textarea`.
- Motor: analizador, cifrados, presets, limites, Unicode y validadores.

Esta lista muestra que el componente depende del dominio, nunca al reves.

## Tipos y presets

`CipherMethod` limita el metodo a dos literales. `AutomaticResult` se deriva del retorno real del analizador. `PRESETS` adapta constantes a `key`, etiqueta y valor visibles, y `as const` conserva tipos literales.

## Componentes auxiliares

`ErrorNotice` evita renderizar contenedores vacios y anuncia errores. `CharacterCount` cuenta grafemas, no `string.length`, y marca exceso respecto a 12,000.

## Estados

Hay estados separados para entradas, salidas y errores de cada panel. Esto evita que un error de descifrado borre errores de cifrado. `copyState` modela una pequeña maquina de tres estados.

`shift` es string porque representa el valor real del input antes de validarlo. `automaticResult` inicia `null` porque aun no existe analisis.

## Valor memorizado

```tsx
const charsetValidation = useMemo(() => validateCharset(charset), [charset]);
```

Se recalcula solo si cambia el conjunto. `charsetCount` toma la longitud del arreglo validado incluso si existen errores, lo que permite mostrar contador informativo.

## `selectPreset`

Cambia conjunto y limpia ambos tipos de error, cifrado y resultado automatico. No limpia los textos de entrada para que el usuario no pierda contenido, pero eso significa que debe volver a ejecutar las operaciones.

## `encryptMessage`

1. valida mensaje;
2. combina errores con los del conjunto;
3. si Cesar, exige sintaxis entera;
4. convierte con `Number`;
5. exige entero seguro;
6. deduplica y retorna si hay fallos;
7. selecciona Cesar/Atbash con ternario;
8. guarda salida y metadata;
9. limpia error y estado de copiado.

La validacion sintactica ocurre antes de confiar en la conversion numerica. Una cadena como `1e3` se puede convertir a numero, pero se rechaza porque no representa la forma de entero esperada por la UI.

## `decryptAutomatically`

Delega validacion y analisis a `analyzeCiphertext`. El `catch` no supone que el valor lanzado sea Error. Ante fallo, elimina resultado anterior para no confundirlo con la entrada actual.

## `copyEncrypted`

Termina si no hay salida. Usa `await navigator.clipboard.writeText`; el gesto proviene del boton. Solo muestra estado general y no expone detalles de permisos.

## Estructura visual

### Encabezado

Identifica el laboratorio y muestra aviso de procesamiento local desde pantalla mediana.

### Conjunto

Input controlado, contador, ayuda, error y botones de presets. Cambiar manualmente limpia resultados dependientes.

### Panel de cifrado

Textarea, radios, shift condicional, error, boton y output con copiar. `fieldset/legend` agrupa el metodo.

### Panel de descifrado

Textarea, boton, output unico con algoritmo/shift/confianza y resumen de señales.

### Footer

Declara privacidad local y debilidad criptografica.

## Accesibilidad

- labels asociados;
- `aria-describedby`/`aria-invalid`;
- alertas vivas;
- outputs vivos;
- iconos decorativos ocultos;
- boton de icono con nombre;
- radios reales aunque visualmente ocultos;
- orden semantico coherente.

## Seguridad

Las entradas se renderizan como texto. No hay HTML dinamico, red o almacenamiento. El unico efecto de plataforma es escribir el cifrado al portapapeles.

## Riesgos y puntos de mantenimiento

- es el archivo mas grande y puede crecer demasiado;
- cambiar texto original no marca explicitamente el cifrado previo como desactualizado;
- scoring en hilo principal puede bloquear;
- `spellCheck="false"` aparece como cadena en textareas y booleano en input; React lo maneja, pero conviene consistencia;
- copy state no vuelve automaticamente a idle tras tiempo;
- mensaje de privacidad debe actualizarse si aparece cualquier envio/persistencia.

## Pruebas prioritarias

- cada estado inicial;
- validaciones de shift y conjunto;
- seleccion de metodo;
- cifrado exacto;
- manejo de error automatico;
- resultado unico;
- copiado exitoso/rechazado;
- navegacion por teclado y anuncios ARIA;
- layout en movil y escritorio.
