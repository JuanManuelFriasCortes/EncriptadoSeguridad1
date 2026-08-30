# Glosario

## A

**Accesibilidad:** diseño que permite usar la aplicacion con teclado, lector de pantalla y distintas capacidades perceptivas.

**Algoritmo:** secuencia definida de pasos para resolver una tarea.

**Al-Kindi:** erudito del siglo IX asociado con una exposicion temprana del analisis de frecuencias aplicado a criptografia.

**API publica:** funciones y valores que un modulo exporta para otros modulos.

**Aritmetica modular:** calculo circular donde valores equivalentes difieren por multiplos del modulo.

**ASCII:** codificacion historica de 128 caracteres. El proyecto no se limita a ella.

**Atbash:** sustitucion que refleja el indice `i` a `N-1-i`.

## B-C

**Barrido exhaustivo:** probar todas las claves posibles de un espacio finito.

**Biyectiva:** transformacion uno-a-uno y sobre; necesaria para recuperar sin ambiguedad cada simbolo del conjunto.

**Build:** proceso que valida y transforma fuentes en recursos ejecutables.

**Cabecera HTTP:** metadato de solicitud o respuesta; aqui aplica politicas del navegador.

**Candidato:** posible texto plano producido por una hipotesis de algoritmo/clave.

**Cesar:** cifrado que desplaza indices un valor fijo modulo `N`.

**Chi-cuadrada:** medida de discrepancia entre conteos observados y esperados.

**Cifrado clasico:** tecnica historica, generalmente manual y no segura ante ataques modernos.

**Cifrar:** transformar texto plano a texto cifrado segun algoritmo y parametros.

**Closure:** funcion que conserva acceso a variables del alcance donde fue creada.

**Cofre de dependencias (`lockfile`):** archivo que fija resoluciones exactas para instalaciones reproducibles.

**Componente:** funcion React que describe una parte de la interfaz.

**Confianza heuristica:** indicador construido con reglas; no es garantia ni probabilidad formal.

**Conjunto ordenado (`charset`):** secuencia unica de grafemas que define indices de sustitucion.

**CSP:** Content Security Policy, conjunto de restricciones de carga/ejecucion del navegador.

**Criptoanalisis:** estudio de metodos para recuperar informacion sin conocer inicialmente la clave.

**Criptografia:** disciplina que diseña y analiza mecanismos de proteccion de informacion.

## D-G

**Descifrar:** revertir un cifrado para recuperar texto plano.

**Desplazamiento (`shift`):** cantidad de posiciones de Cesar.

**Desestructuracion:** sintaxis para extraer valores de arreglos u objetos.

**DOM:** representacion de la estructura del documento en el navegador.

**ESM:** sistema de modulos ECMAScript basado en `import` y `export`.

**Evidencia:** en el proyecto, medida de cantidad de letras/palabras disponible para juzgar.

**Expresion regular:** patron para buscar o validar texto.

**Frecuencia esperada:** proporcion de una letra segun un modelo de idioma.

**Frecuencia observada:** conteo real en el candidato.

**Funcion pura:** funcion sin efectos observables que devuelve lo mismo ante los mismos argumentos.

**Grafema:** unidad de texto percibida como un caracter, que puede incluir varios puntos de codigo.

## H-M

**Heuristica:** regla practica que suele funcionar sin garantizar una solucion correcta.

**Homoglifo:** simbolo visualmente parecido a otro pero con identidad Unicode distinta.

**Hook:** funcion React como `useState` o `useMemo` que añade capacidades al componente.

**HTML semantico:** elementos elegidos por significado, como `main`, `section`, `fieldset` y `output`.

**Inmutabilidad superficial:** bloqueo de cambios directos de un objeto, sin congelar automaticamente objetos anidados.

**Involucion:** funcion cuya doble aplicacion devuelve el original.

**JSX/TSX:** sintaxis que permite describir elementos dentro de JavaScript/TypeScript.

**Log-verosimilitud:** suma de logaritmos de probabilidades usada para comparar ajuste estadistico.

**Mapa (`Map`):** coleccion clave-valor; aqui asocia grafema e indice.

**Margen:** score del primero menos score del segundo.

**Modulo:** archivo con responsabilidades y exportaciones definidas.

**Modulo aritmetico (`mod`):** tamaño del ciclo; en el proyecto es `N`, no una eleccion independiente del conjunto.

## N-R

**NFC:** forma de normalizacion Unicode que prefiere representaciones compuestas canonicas.

**NFD:** forma descompuesta usada temporalmente para retirar diacriticos.

**N-grama:** secuencia contigua de `n` unidades, como `que` o `cion`.

**Normalizacion Unicode:** conversion de representaciones equivalentes a una forma estable.

**Overfitting/sobreajuste:** ajuste excesivo a ejemplos conocidos que empeora datos nuevos.

**Pena/penalizacion:** valor restado por una estructura improbable.

**Punto de codigo:** numero asignado por Unicode a un elemento abstracto.

**React:** biblioteca de interfaz declarativa y basada en componentes.

**Renderizado:** conversion de componentes y estado en elementos visibles.

**Resultado controlado:** salida derivada de estados que React administra.

## S-Z

**Sanitizacion:** transformacion o eliminacion de contenido peligroso segun un contexto; distinta de validar forma.

**Score:** suma numerica de señales de semejanza con español.

**Segmentacion:** division de una cadena en unidades como grafemas.

**Set:** coleccion de valores unicos.

**Texto cifrado:** salida de un cifrado.

**Texto plano:** contenido legible antes de cifrar o despues de descifrar.

**Thread/hilo principal:** ejecucion donde navegador actualiza UI; trabajo largo puede bloquearla.

**TypeScript:** JavaScript con sistema de tipos estatico para desarrollo.

**Unicode:** estandar de codificacion y procesamiento de texto de multiples escrituras y simbolos.

**Validacion:** comprobacion de que una entrada satisface un contrato.

**Variable CSS:** valor reutilizable como `--primary`.

**Web Worker:** contexto separado que puede ejecutar calculos sin bloquear la interfaz.

**XSS:** inyeccion de contenido ejecutable en una pagina web.

## Diferencias que suelen confundirse

### Caracter, punto de codigo y grafema

No son sinonimos. Un grafema visual puede contener varios puntos de codigo; JavaScript puede usar varias unidades UTF-16 para un punto. El proyecto intenta operar a nivel grafema.

### Score, confianza y verdad

El score compara ajuste; confianza combina score, margen y evidencia; la verdad historica del mensaje no queda demostrada.

### Validacion, escape y CSP

Validacion acepta/rechaza entradas; React escapa texto segun contexto; CSP limita recursos y ejecucion. Son capas diferentes.

### Seguridad web y fuerza criptografica

Cabeceras, ausencia de red y React seguro pueden endurecer la aplicacion. Cesar y Atbash siguen siendo cifrados debiles.

### Error y limitacion

Un error contradice el comportamiento previsto. Una limitacion puede ser una frontera conocida del diseño funcionando correctamente.
