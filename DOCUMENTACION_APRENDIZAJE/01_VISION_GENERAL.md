# Vision general del proyecto

## El problema

El proyecto enseña dos cifrados clasicos de sustitucion y una forma automatica de atacarlos. El usuario puede definir el alfabeto o conjunto ordenado sobre el cual trabaja. Esa decision es fundamental: Cesar mueve posiciones dentro del conjunto y Atbash refleja posiciones respecto a sus extremos.

El reto interesante no es cifrar. Cifrar Cesar y Atbash es determinista y sencillo cuando se conocen el conjunto y el desplazamiento. El reto es recibir un texto cifrado sin saber si fue producido por Atbash o por Cesar y, en este ultimo caso, sin saber el desplazamiento. El sistema resuelve esa incertidumbre mediante busqueda exhaustiva en un espacio pequeño y puntuacion linguistica.

## Capacidades reales

### Definir caracteres

El campo `charset` acepta un conjunto personalizado y ofrece cuatro ejemplos: español en mayusculas, español alfanumerico, español en minusculas con vocales acentuadas y emojis. El conjunto se normaliza a Unicode NFC, se divide en grafemas y se valida para evitar vacio, longitud menor que dos, mas de 128 elementos, duplicados o espacios.

### Cifrar

El usuario elige Cesar o Atbash. Para Cesar tambien especifica un desplazamiento entero, que puede ser negativo o mayor que el tamaño del conjunto: `normalizeShift` lo reduce al intervalo valido. Los caracteres que no pertenecen al conjunto permanecen intactos; por eso se conservan espacios, signos y saltos de linea aunque no formen parte del alfabeto.

### Descifrar automaticamente

El sistema construye `N + 1` candidatos cuando el conjunto tiene `N` elementos:

- un candidato Atbash;
- un candidato Cesar para cada desplazamiento de `0` a `N - 1`.

Cada texto candidato recibe una puntuacion de español. Se consideran frecuencias de letras, log-verosimilitud, chi-cuadrada, palabras comunes, n-gramas, proporcion de vocales, proporcion de espacios y estructuras improbables. Se ordenan los candidatos y se devuelve solo el primero, acompañado por una estimacion de confianza.

## Lo que no hace

- No adivina un conjunto desconocido. El mismo conjunto ordenado debe proporcionarse al descifrar.
- No descifra AES, RSA, hashes ni cifrados arbitrarios.
- No garantiza que el texto ganador sea semanticamente correcto.
- No consulta inteligencia artificial, diccionarios remotos ni servidores.
- No almacena historial, cuentas, llaves ni mensajes.
- No presenta al usuario la lista completa de candidatos.

## Tecnologias

- **React 19**: componentes, estado, eventos y renderizado declarativo.
- **TypeScript**: interfaz y configuracion con comprobacion estatica estricta.
- **JavaScript ESM**: motor criptografico puro y reutilizable.
- **Vinext sobre Vite**: entorno de desarrollo, construccion y compatibilidad con la estructura tipo Next.
- **Tailwind CSS 4**: utilidades de diseño y tema CSS.
- **Base UI**: primitiva accesible para botones e inputs.
- **Lucide React**: iconos.

## Separacion conceptual

La aplicacion tiene cinco responsabilidades:

1. **Presentacion**: muestra campos, botones, errores y resultados.
2. **Orquestacion**: conecta eventos con validadores y algoritmos.
3. **Dominio criptografico**: transforma grafemas con Cesar o Atbash.
4. **Criptoanalisis**: genera, puntua, ordena y selecciona candidatos.
5. **Endurecimiento web**: limita capacidades del documento mediante cabeceras.

Esta separacion permite estudiar el motor sin el navegador. Las funciones de `lib/crypto` no dependen de React ni del DOM.

## Idea esencial

El descifrado automatico no descubre magicamente una clave. Enumera todas las posibilidades permitidas por el modelo y decide cual se parece mas a español. La exhaustividad reduce la incertidumbre criptografica; la estadistica intenta resolver la incertidumbre linguistica.

## Criterio de exito

El sistema funciona bien cuando:

- el conjunto ingresado coincide exactamente con el usado al cifrar;
- el texto contiene suficiente español natural;
- los caracteres relevantes pertenecen al conjunto;
- la diferencia de puntuacion entre el mejor candidato y los demas es clara.

La confianza tiende a bajar en textos cortos, listas de nombres, abreviaturas, codigo, contenido multilingue, mensajes sin espacios o conjuntos que no correspondan al idioma español.
