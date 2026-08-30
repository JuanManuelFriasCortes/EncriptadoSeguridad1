# Errores comunes al modificar el proyecto

## Romper la biyeccion del conjunto

**Error:** permitir duplicados o transformar el conjunto en un Set sin conservar orden.

**Consecuencia:** indices ambiguos y descifrado no inverso.

**Prevencion:** mantener `validateCharset` y probar propiedad de ida/vuelta.

## Usar longitud de string

**Error:** sustituir `toGraphemes(value).length` por `value.length`.

**Consecuencia:** emojis y secuencias Unicode se cuentan o dividen incorrectamente.

## Usar `split('')`

Puede romper pares sustitutos. Si se cambia la segmentacion, debe justificarse y probarse con grafemas complejos.

## Quitar NFC

Formas equivalentes dejan de coincidir y pueden eludir duplicados. La normalizacion debe ocurrir antes de validar y transformar.

## Implementar modulo negativo ingenuo

**Error:** `shift % size` como unico paso.

**Consecuencia:** shift negativo produce indice negativo.

## Excluir shift cero

El barrido deja de ser completo y no cubre multiplos de `N` ni texto sin desplazamiento.

## Aplicar Cesar a externos

Inventar indices para espacios/signos cambia el contrato y puede romper la recuperacion. Si se desea cifrarlos, deben incluirse explicitamente en un conjunto valido y revisarse reglas de espacios.

## Mostrar el arreglo de ranking

La funcion `rankCandidates` devuelve todos, pero la UI debe usar `analyzeCiphertext` para cumplir la salida unica. Exponerlos convierte al humano en decisor.

## Confundir `null` con shift cero

Atbash usa `null` porque no aplica. Convertirlo silenciosamente a cero puede etiquetar mal el algoritmo.

## Cambiar pesos sin corpus

Una frase de prueba puede mejorar mientras el rendimiento general empeora. Cualquier ajuste necesita corpus independiente y metricas.

## Añadir una palabra al diccionario para cada fallo

Esto sobreajusta el detector. El lexico debe tener criterios y evaluacion, no crecer solo para aprobar ejemplos conocidos.

## Eliminar penalizaciones por falsos positivos aislados

Una regla puede aportar valor global aunque falle en extranjerismos. Antes de quitarla se mide el efecto por categorias.

## Interpretar score como porcentaje

El score puede ser negativo o superar rangos intuitivos. Solo la formula de confianza produce porcentaje, y aun asi es heuristico.

## Confiar solo en `useMemo`

`useMemo` es optimizacion de UI, no validacion de seguridad. `analyzeCiphertext` debe validar sus argumentos por separado.

## Mutar estado directamente

**Error:** `encryptErrors.push(...)` sobre el arreglo de estado.

**Consecuencia:** React puede no renderizar correctamente y el historial conceptual se vuelve impredecible.

**Correcto:** construir un arreglo local y llamar al setter con una referencia nueva.

## Suponer setters sincronicos

Despues de `setCharset`, la variable `charset` de esa ejecucion no cambia instantaneamente. El nuevo valor aparece en la siguiente renderizacion.

## Construir clases Tailwind dinamicas por fragmentos

Ejemplo riesgoso: `` `text-${color}-500` ``. El compilador puede no descubrir la clase. Usar mapas de cadenas completas.

## Quitar `type="button"`

Si en el futuro se envuelve en formulario, el boton podria enviar/recargar la pagina accidentalmente.

## Quitar etiquetas y ARIA

La aplicacion puede seguir “viendose bien” y volverse dificil o imposible con lector de pantalla/teclado.

## Usar `dangerouslySetInnerHTML`

No es necesario para resultados de texto y abriria riesgo XSS. Mantener expresiones JSX textuales.

## Añadir red o almacenamiento sin actualizar privacidad

El aviso “sin envios ni almacenamiento” dejaria de ser verdad. Toda telemetria, API o persistencia cambia el modelo de privacidad.

## Copiar automaticamente sin clic

El portapapeles es un efecto sensible y los navegadores suelen exigir gesto del usuario. Mantenerlo ligado a la accion explicita.

## Debilitar CSP para resolver un error rapido

Agregar `*`, `data:` o `unsafe-eval` ampliamente puede ocultar problemas y ampliar ataques. Cambiar directivas de forma minima y verificar consola/cabeceras.

## Suponer que CSP sustituye escape

Las defensas son capas. La salida debe seguir tratandose en su contexto aunque exista CSP.

## Convertir Cesar en “seguro” con una clave larga

El numero se reduce modulo `N`. Un valor enorme no amplia el espacio efectivo mas alla de `N` desplazamientos.

## Confundir build con pruebas

Un build exitoso no valida resultados matematicos ni ranking. Añadir pruebas conductuales antes de refactorizar el motor.

## Editar `package-lock.json` a mano

El lockfile debe regenerarse mediante el gestor de paquetes. Cambios manuales pueden dejar integridad y dependencias incoherentes.

## Eliminar `overrides` sin revisar

Puede cambiar versiones transitivas de `esbuild` o `undici`. Antes se investiga la razon y se ejecuta build/auditoria.

## Importar modulos de UI dentro del motor

Crea acoplamiento inverso y dificulta pruebas. El dominio debe seguir independiente de React.

## Crear un ciclo de importacion

Por ejemplo, `scoring` importando `analyzer` mientras este importa `scoring`. Puede producir inicializacion parcial y responsabilidades mezcladas.

## No invalidar resultados dependientes

Cambiar conjunto debe limpiar salidas. Si se añaden nuevos parametros, hay que identificar que resultados quedan obsoletos.

## Lista antes de confirmar un cambio

1. ¿Conserva formulas e inversas?
2. ¿Opera por grafemas?
3. ¿Mantiene validaciones y limites?
4. ¿Cambia ranking o confianza?
5. ¿Necesita corpus/pruebas nuevas?
6. ¿Cambia red, almacenamiento o permisos?
7. ¿Mantiene salida unica?
8. ¿Mantiene accesibilidad?
9. ¿Actualiza documentacion?
10. ¿El build y pruebas pasan?
