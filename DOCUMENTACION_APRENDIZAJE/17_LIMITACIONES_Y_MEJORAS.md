# Limitaciones y mejoras

## Limitaciones teoricas del descifrado

### Texto corto

Con pocas letras, las frecuencias no se estabilizan. Una palabra puede coincidir por azar con un candidato incorrecto. La evidencia intenta reflejarlo, pero la interfaz sigue obligada a elegir uno.

**Mejora:** permitir declarar “resultado no concluyente” manteniendo una sola linea, o exigir un umbral minimo para mostrar texto.

### Idioma fijo

El score modela español. Un texto ingles, codigo fuente o secuencia de identificadores sera evaluado con reglas equivocadas.

**Mejora:** modelos seleccionables por idioma o deteccion previa, claramente separada del algoritmo criptografico.

### Conjunto conocido

El usuario debe proporcionar exactamente el conjunto y su orden. El sistema no busca alfabetos posibles.

**Mejora:** almacenar metadatos junto al cifrado en una demostracion controlada o permitir perfiles de conjuntos candidatos, entendiendo que el espacio de busqueda crece.

### Modelo de cifrado cerrado

Solo compara Cesar y Atbash. Si recibe Vigenere, sustitucion monoalfabetica general o ruido, elige igualmente el mejor de su universo incorrecto.

**Mejora:** deteccion de fuera de distribucion y respuesta “ningun modelo suficientemente plausible”.

### Ambiguedad real

Con `AB`, Atbash y Cesar shift 1 son equivalentes. Ninguna mejora estadistica puede identificar el nombre del algoritmo a partir de la salida. El desempate actual favorece Atbash.

**Mejora:** documentar equivalencias y reportar algoritmo como no identificable, aunque esto entra en tension con el requisito de una etiqueta unica.

## Limitaciones del scoring

- frecuencias aproximadas de un corpus no documentado dentro del codigo;
- diccionario pequeño y sesgado al dominio;
- n-gramas y pesos manuales;
- señales correlacionadas sumadas;
- objetivos fijos de vocales y espacios;
- patrones que castigan extranjerismos y siglas;
- confianza no calibrada contra un corpus publicado.

**Mejoras:** corpus versionado, particion entrenamiento/evaluacion, métricas por longitud, calibracion y pruebas contra vocabulario no visto.

## Limitaciones Unicode

NFC no elimina homoglifos ni hace equivalentes letras de escrituras distintas. `Intl.Segmenter` puede variar por disponibilidad de datos del entorno. `Array.from` no conserva todas las secuencias de grafemas complejos.

**Mejoras:** requisito explicito de soporte, polyfill confiable o pruebas cruzadas; mostrar puntos de codigo en un inspector educativo para detectar confusables.

## Limitaciones de rendimiento

El analisis genera textos completos para `N + 1` candidatos y los puntua en el hilo principal. El limite de operaciones es una aproximacion que no incluye todos los bucles de n-gramas y regex.

**Mejoras:** Web Worker, cancelacion, progreso, scoring en flujo sin conservar todos los textos, y benchmark real por dispositivo.

## Limitaciones de pruebas

No existe suite automatizada actual. Esto aumenta riesgo al cambiar pesos, Unicode, validaciones o estilos.

**Mejora prioritaria:** pruebas de propiedades, fronteras, corpus independiente, accesibilidad y cabeceras.

## Limitaciones de seguridad web

- CSP permite scripts inline.
- Cabeceras dependen de la plataforma.
- Dependencias amplian cadena de suministro.
- Clipboard expone el resultado al sistema.
- Procesamiento local no protege contra un dispositivo comprometido.

**Mejoras:** nonces/hashes, auditoria continua, verificacion automatica de cabeceras y politica de dependencias.

## Limitaciones de privacidad

Actualmente no hay red ni almacenamiento para mensajes, pero el texto existe en memoria, el DOM y potencialmente el portapapeles. Herramientas del navegador, extensiones o capturas pueden observarlo.

**Mejora:** limpiar estados bajo demanda y documentar el alcance sin prometer secreto absoluto.

## Limitaciones de usabilidad

- el conjunto largo puede ser dificil de auditar visualmente;
- cambiar texto despues de cifrar no limpia el resultado anterior inmediatamente;
- no hay boton para transferir automaticamente cifrado al analizador;
- no se muestra desglose docente del score;
- confianza puede ser interpretada como probabilidad real.

**Mejoras:** inspector de conjunto, invalidacion visual de resultado desactualizado, accion de transferencia, modo docente opcional y etiqueta “confianza heuristica”.

## Mejoras ordenadas por prioridad

1. Añadir pruebas automatizadas del motor y un corpus independiente.
2. Calibrar detector y umbral de no concluyente.
3. Ejecutar analisis en Web Worker con cancelacion.
4. Tipar el motor completo con TypeScript o `checkJs` riguroso.
5. Fortalecer CSP sin `unsafe-inline`.
6. Verificar cabeceras y accesibilidad automaticamente.
7. Añadir explicabilidad opcional sin convertir al usuario en selector del candidato.
8. Soportar otros idiomas mediante datos separados.

## Mejoras que cambiarian el alcance

Agregar AES, autenticacion, base de datos o cuentas no es una mejora incremental: crea otro producto y otro modelo de amenazas. Tampoco conviene llamar “seguro” a Cesar por agregar HTTPS; HTTPS protege transporte, no vuelve fuerte el algoritmo local.

## Criterio para aceptar una mejora

Debe responder:

- ¿que problema medible resuelve?;
- ¿en que modulo pertenece?;
- ¿que contrato cambia?;
- ¿que pruebas nuevas necesita?;
- ¿afecta privacidad o cabeceras?;
- ¿sigue cumpliendo mostrar una sola respuesta?;
- ¿aumenta la honestidad sobre incertidumbre?
