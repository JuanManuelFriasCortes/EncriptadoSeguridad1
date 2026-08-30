# Pruebas y verificacion

## Estado actual verificado

La version actual del repositorio **no contiene archivos de pruebas automatizadas** y `package.json` **no define un script `test`**. Los scripts disponibles son:

```json
"dev": "vinext dev",
"build": "vinext build",
"build:pages": "node scripts/build-pages.mjs",
"start": "vinext start"
```

Por tanto, no seria correcto afirmar que existe una cobertura automatizada actual. `npm run build` verifica compilacion, resolucion de modulos y parte de los tipos, pero no demuestra que los algoritmos produzcan todas las salidas esperadas.

## Que comprueba un build

- sintaxis valida;
- importaciones resolubles;
- configuracion aceptada por Vinext/Vite;
- transformacion de TSX, TypeScript y CSS;
- errores estaticos detectables durante la construccion.

No comprueba por si solo:

- inversas matematicas para muchos mensajes;
- exactitud del ranking;
- accesibilidad interactiva;
- cabeceras observadas en todas las rutas;
- comportamiento en navegadores sin `Intl.Segmenter`;
- ausencia de regresiones visuales.

## Verificacion automatica del artefacto de Pages

`npm run build:pages` no es una suite del motor, pero añade contratos de publicacion:

- la exportacion debe prerenderizar `/`;
- debe existir `dist/client/index.html`;
- debe existir el directorio generado de recursos;
- el script debe normalizarlo a `dist/client/_next`;
- debe crear `.nojekyll`;
- cada `href`/`src` con `/EncriptadoSeguridad1/` debe corresponder a un archivo real.

El workflow vuelve a comprobar `index.html` antes de subir el artefacto. Esto detecta la causa del 404 original, aunque no prueba Cesar, Atbash ni el ranking.

En la verificacion del arreglo, la ruta simulada `/EncriptadoSeguridad1/` y sus siete recursos respondieron 200. En navegador, una frase cifrada con Cesar 3 fue recuperada con algoritmo/shift correctos y no aparecieron errores de consola.

## Prueba manual minima de cifrado

Conjunto `ABCDE`, texto `ABCDE`, Cesar `2`:

```text
esperado: CDEAB
```

Descifrar `CDEAB` con shift 2 debe devolver `ABCDE` si se invoca el motor directamente. En la interfaz automatica, un texto tan corto puede tener confianza baja y no es adecuado para evaluar el detector linguistico.

## Prueba manual de Atbash

Conjunto `ABCDE`, texto `ABCDE`:

```text
primera aplicacion: EDCBA
segunda aplicacion: ABCDE
```

Debe conservar espacios y signos: `AB-CD` se convierte en `ED-BC`.

## Prueba manual de resultado automatico

Usa el preajuste español y un mensaje natural suficientemente largo, por ejemplo una frase de varias oraciones. Cifralo con Cesar, mueve el resultado al campo de descifrado y analiza. Comprueba:

1. algoritmo reportado;
2. desplazamiento reportado;
3. igualdad exacta del texto recuperado;
4. nivel y porcentaje de confianza;
5. que solo aparece un resultado.

Repite con Atbash.

## Matriz recomendada para futuras pruebas unitarias

### Unicode

- NFC produce el mismo valor para formas canonicas equivalentes.
- `toGraphemes` conserva un emoji simple.
- conserva emoji con modificador cuando hay Segmenter.
- fallback documentado cuando no hay Segmenter.
- `ñ` permanece distinta de `n` en scoring.
- vocal acentuada se pliega a vocal base en scoring.

### Conjunto

- vacio;
- un grafema;
- exactamente dos;
- exactamente 128;
- 129;
- duplicado directo;
- duplicado despues de NFC;
- espacio;
- tabulacion;
- salto de linea;
- emojis unicos.

### Mensaje

- vacio requerido;
- vacio no requerido;
- un grafema;
- exactamente 12,000;
- 12,001;
- caracteres externos;
- saltos de linea;
- controles penalizados.

### Cesar

- shift 0;
- positivo;
- negativo;
- mayor que N;
- multiplo de N;
- minimo entero seguro razonable;
- no entero;
- infinito;
- cifrar y descifrar recupera el original;
- conjunto como cadena y como arreglo.

### Atbash

- conjunto par;
- conjunto impar;
- centro fijo;
- doble aplicacion recupera original;
- externos intactos.

### Ranking

- produce `N + 1` candidatos;
- contiene todos los shifts `0..N-1`;
- Atbash tiene shift nulo;
- score descendente;
- desempate por palabras;
- desempate Atbash;
- desempate por menor shift;
- `analyzeCiphertext` no devuelve lista.

### Seguridad y UI

- texto tipo `<script>` aparece literal;
- botones de accion son `type="button"`;
- errores se anuncian;
- foco visible;
- portapapeles solo se escribe tras clic;
- resultados se invalidan al cambiar conjunto;
- CSP y cabeceras presentes al servir con Vinext;
- en GitHub Pages, carga 200 del HTML/JS/CSS y funcionalidad, sin esperar cabeceras personalizadas.

## Pruebas de propiedades

Las propiedades matematicas admiten muchos casos generados:

```text
caesarDecrypt(caesarEncrypt(text, C, k), C, k) = NFC(text)
atbashTransform(atbashTransform(text, C), C) = NFC(text)
normalizeShift(k, N) pertenece a [0, N-1]
rankCandidates(text, C).length = N + 1
```

Estas pruebas detectan mas combinaciones que unos pocos ejemplos fijos.

## Pruebas del detector

Necesitan un corpus con textos separados de los usados para ajustar pesos. Cada caso debe registrar:

- texto original;
- conjunto;
- algoritmo y shift real;
- salida esperada;
- algoritmo elegido;
- texto recuperado;
- nivel de confianza.

Metricas utiles: exactitud total, exactitud por longitud, matriz de confusion Cesar/Atbash y calibracion de confianza. No basta probar solo frases del vocabulario incluido.

## Pruebas de rendimiento

Medir tiempo con tamaños pequeños, medios y cercanos al limite. Incluir conjunto de 128 y mensajes que acerquen `1,500,000` operaciones aproximadas. Verificar que la UI no quede inutilizable y que el rechazo ocurra antes de trabajo pesado.

## Pruebas de seguridad

- entradas con etiquetas HTML, atributos y URLs peligrosas;
- controles y Unicode confusables;
- mensajes maximos repetidos;
- comprobacion de cabeceras del servidor Vinext con DevTools Network o `curl -I`;
- comprobacion separada del workflow y los recursos estaticos de Pages;
- `npm audit` y revision manual de dependencias;
- ejecucion sin acceso de red para confirmar procesamiento local.

## Prioridad para añadir pruebas

1. propiedades de Cesar y Atbash;
2. fronteras de validacion y Unicode;
3. contrato `N + 1` y desempates;
4. corpus independiente del detector;
5. UI, accesibilidad, cabeceras y rendimiento.

Hasta que exista esa suite, cualquier afirmacion de correccion debe acompañarse por la evidencia concreta ejecutada y por los limites descritos aqui.
