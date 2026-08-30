# Limitaciones, errores, riesgos y decisiones

## Clasificacion

| Categoria | Definicion |
|---|---|
| Error/bug | comportamiento contrario al contrato previsto |
| Limitacion | frontera conocida mientras el sistema funciona como fue diseñado |
| Decision | eleccion consciente con ventajas y costos |
| Riesgo | posibilidad de daño o fallo futuro |
| Deuda/prueba faltante | afirmacion que carece de verificacion automatica suficiente |

## Clasificacion del proyecto actual

### Limitaciones, no bugs

- falla potencial en textos cortos;
- solo modela español;
- exige conjunto exacto y ordenado;
- solo considera Cesar/Atbash;
- equivalencia de algoritmos en ciertos conjuntos;
- fallback Unicode menos preciso;
- caracteres externos quedan visibles;
- confianza heuristica no calibrada.

El codigo hace lo que fue diseñado para hacer; el universo del problema es limitado.

### Decisiones de diseño

- prohibir blancos en el conjunto;
- conservar caracteres externos;
- mostrar una sola respuesta;
- favorecer Atbash en empate completo;
- permitir shift cero y negativos;
- incluir vocabulario del dominio;
- guardar el shift como string en UI;
- procesar en hilo principal;
- no persistir datos.

Estas decisiones pueden revisarse, pero no deben llamarse errores sin definir un contrato distinto.

### Riesgos

- CSP con `'unsafe-inline'`;
- dependencias vulnerables en el futuro;
- bloqueo cerca de limites;
- homoglifos Unicode;
- interpretacion excesiva del porcentaje;
- aviso de privacidad que quedaria obsoleto si se añade red;
- resultados antiguos visibles despues de editar texto original hasta recifrar.

### Deudas verificadas

- ausencia de pruebas automatizadas;
- ausencia de corpus de evaluacion versionado;
- ausencia de metricas publicadas de exactitud/calibracion;
- ausencia de prueba automatica de cabeceras;
- ausencia de benchmark formal.

## Posibles bugs que deben probarse, no afirmarse sin evidencia

- diferencias de grafemas entre navegadores;
- falsos empates por redondeo a seis decimales;
- expresiones regulares con rendimiento adverso;
- comportamiento de cabeceras bajo todas las salidas de Vinext;
- estado visual desactualizado tras secuencias rapidas de eventos.

Estos son riesgos de investigacion. Llamarlos bugs requiere reproducir una salida contraria al contrato.

## Casos de uso no soportados

- proteger contraseñas o secretos;
- descifrar algoritmos modernos;
- inferir alfabetos desconocidos;
- identificar con certeza el algoritmo historico;
- procesar textos arbitrariamente grandes;
- clasificar idiomas generales;
- garantizar privacidad frente al dispositivo local.

Una entrada no soportada puede producir resultado de baja calidad sin que exista un error de programacion.

## Como reportar un problema

Incluye:

1. conjunto exacto y representacion Unicode si importa;
2. texto de entrada;
3. metodo y shift usados;
4. resultado esperado;
5. resultado obtenido;
6. navegador/Node y soporte de Segmenter;
7. pasos reproducibles;
8. clasificacion propuesta y por que viola el contrato.

## Ejemplo de diagnostico

“Un texto ingles fue clasificado mal” es una limitacion de idioma. “Aplicar Atbash dos veces con un conjunto valido no devuelve NFC del original” seria un bug matematico. “No se muestra el foco al tabular” seria un bug de accesibilidad si los estilos lo ocultaran. “Cesar se rompe con duplicados” no es bug si el validador los rechaza antes.
