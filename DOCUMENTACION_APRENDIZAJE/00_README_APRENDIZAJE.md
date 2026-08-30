# Documentacion de aprendizaje: Criptoanalisis Al-Kindi

## Proposito

Esta carpeta explica el proyecto desde cero y con base exclusiva en el codigo que existe en el repositorio. Su objetivo no es sustituir el codigo, sino convertirlo en material de estudio: arquitectura, interfaz, JavaScript y TypeScript, cifrados clasicos, criptoanalisis, seguridad web, pruebas, limitaciones y preparacion para una exposicion.

Empieza por [00_GUIA_DE_ESTUDIO.md](./00_GUIA_DE_ESTUDIO.md). Los archivos con nombres adicionales son ampliaciones; los 26 documentos exigidos por la estructura original tambien estan presentes con sus nombres exactos.

El sistema es una aplicacion web local para:

1. definir un conjunto ordenado de caracteres;
2. cifrar con Cesar o Atbash;
3. recibir un texto cifrado;
4. generar internamente un candidato Atbash y todos los candidatos Cesar;
5. puntuar cada candidato con señales del idioma español;
6. mostrar solo el candidato que obtuvo la mejor puntuacion.

No es una herramienta de criptografia moderna. Cesar y Atbash son utiles para aprender sustitucion, aritmetica modular y analisis de frecuencias, pero no protegen secretos reales.

## Alcance real analizado

Se revisaron los 26 archivos funcionales y de configuracion que componen la aplicacion y su publicacion. Tambien se inspecciono el arbol de trabajo para distinguir codigo propio de directorios generados como `node_modules`, `dist`, `.next` y `.vinext`.

Datos importantes:

- No existe un `index.html` escrito manualmente. React y Vinext generan el documento a partir de `app/layout.tsx` y `app/page.tsx`; `npm run build:pages` materializa `dist/client/index.html` para GitHub Pages.
- No existen archivos de pruebas automatizadas en la version actual del repositorio.
- No existe un backend que reciba los mensajes. El cifrado, el descifrado y el analisis ocurren en el navegador.
- `next.config.ts` centraliza el modo de ejecucion. En local/servidor configura cabeceras defensivas; en GitHub Pages activa exportacion estatica, prefijo de recursos y barra final.
- `.github/workflows/pages.yml` compila y publica el artefacto estatico en cada push a `main`.
- Los caracteres se tratan como grafemas Unicode, no simplemente como bytes ASCII.

## Indice principal

| Archivo | Pregunta que responde |
|---|---|
| [01_VISION_GENERAL.md](./01_VISION_GENERAL.md) | ¿Que problema resuelve y que hace cada parte? |
| [02_ARQUITECTURA_DEL_SISTEMA.md](./02_ARQUITECTURA_DEL_SISTEMA.md) | ¿Como se organizan las capas y dependencias? |
| [03_FLUJO_COMPLETO_DEL_PROGRAMA.md](./03_FLUJO_COMPLETO_DEL_PROGRAMA.md) | ¿Que ocurre desde la entrada hasta el resultado? |
| [04_HTML_EXPLICADO.md](./04_HTML_EXPLICADO.md) | ¿Como se construye el HTML mediante JSX? |
| [05_CSS_EXPLICADO.md](./05_CSS_EXPLICADO.md) | ¿Como se compone la presentacion visual? |
| [06_JAVASCRIPT_FUNDAMENTOS.md](./06_JAVASCRIPT_FUNDAMENTOS.md) | ¿Que fundamentos del lenguaje usa el proyecto? |
| [07_JAVASCRIPT_AVANZADO.md](./07_JAVASCRIPT_AVANZADO.md) | ¿Que tecnicas avanzadas aparecen? |
| [08_MODULOS_Y_CONEXIONES.md](./08_MODULOS_Y_CONEXIONES.md) | ¿Que importa y exporta cada modulo? |
| [09_CIFRADO_CESAR.md](./09_CIFRADO_CESAR.md) | ¿Como funciona Cesar matematica y manualmente? |
| [10_CIFRADO_ATBASH.md](./10_CIFRADO_ATBASH.md) | ¿Por que Atbash es su propia inversa? |
| [11_DESCIFRADO_AUTOMATICO.md](./11_DESCIFRADO_AUTOMATICO.md) | ¿Como se decide automaticamente el algoritmo? |
| [12_ANALISIS_DE_FRECUENCIAS.md](./12_ANALISIS_DE_FRECUENCIAS.md) | ¿Como se aplica la idea de Al-Kindi? |
| [13_ESTADISTICA_Y_PUNTUACION.md](./13_ESTADISTICA_Y_PUNTUACION.md) | ¿Como se calcula y combina la puntuacion? |
| [14_VALIDACIONES_Y_ERRORES.md](./14_VALIDACIONES_Y_ERRORES.md) | ¿Que entradas se rechazan y por que? |
| [15_PRUEBAS.md](./15_PRUEBAS.md) | ¿Que se verifica actualmente y que falta? |
| [16_SEGURIDAD_WEB.md](./16_SEGURIDAD_WEB.md) | ¿Que defensas web existen? |
| [17_LIMITACIONES_Y_MEJORAS.md](./17_LIMITACIONES_Y_MEJORAS.md) | ¿Donde falla el enfoque y como mejorarlo? |
| [18_DICCIONARIO_DE_FUNCIONES.md](./18_DICCIONARIO_DE_FUNCIONES.md) | ¿Que hace cada funcion o componente? |
| [19_DICCIONARIO_DE_VARIABLES.md](./19_DICCIONARIO_DE_VARIABLES.md) | ¿Que significa cada estado, constante y objeto? |
| [20_GLOSARIO.md](./20_GLOSARIO.md) | ¿Que significan los terminos tecnicos? |
| [21_PREGUNTAS_DE_PROFESOR.md](./21_PREGUNTAS_DE_PROFESOR.md) | ¿Como responder preguntas de defensa? |
| [22_EXAMEN_50_PREGUNTAS.md](./22_EXAMEN_50_PREGUNTAS.md) | ¿Como autoevaluar el aprendizaje? |
| [23_GUIA_PARA_EXPLICAR_EL_PROYECTO.md](./23_GUIA_PARA_EXPLICAR_EL_PROYECTO.md) | ¿Como presentarlo oralmente? |
| [24_ERRORES_COMUNES_AL_MODIFICAR.md](./24_ERRORES_COMUNES_AL_MODIFICAR.md) | ¿Que cambios suelen romperlo? |
| [25_CONCLUSIONES.md](./25_CONCLUSIONES.md) | ¿Cuales son las ideas que hay que dominar? |

## Anexos tecnicos

- [26_TRAZAS_MANUALES.md](./26_TRAZAS_MANUALES.md): recorridos paso a paso con datos concretos.
- [27_COMPLEJIDAD_COMPUTACIONAL.md](./27_COMPLEJIDAD_COMPUTACIONAL.md): costos temporales y espaciales.
- [28_SEGURIDAD_VS_CRIPTOGRAFIA.md](./28_SEGURIDAD_VS_CRIPTOGRAFIA.md): diferencia entre una aplicacion web protegida y un cifrado fuerte.
- [29_LIMITACIONES_VS_ERRORES.md](./29_LIMITACIONES_VS_ERRORES.md): clasificacion de fallos reales, limitaciones teoricas y decisiones de diseño.
- [30_INVENTARIO_Y_ALCANCE.md](./30_INVENTARIO_Y_ALCANCE.md): inventario completo y exclusiones justificadas.
- [31_PUBLICACION_GITHUB_PAGES.md](./31_PUBLICACION_GITHUB_PAGES.md): causa del 404, exportacion estatica, workflow y diagnostico.
- [CODIGO/](./CODIGO/): una explicacion individual por cada archivo rastreado relevante.

## Orden de estudio recomendado

### Ruta corta para comprender la demostracion

Lee `01`, `03`, `09`, `10`, `11`, `12`, `13`, `14`, `23` y luego practica con `21`.

### Ruta completa para comprender el codigo

1. `01` a `05` para construir el mapa mental.
2. `06` a `08` para dominar el lenguaje y las conexiones.
3. `09` a `13` para entender matematicas, candidatos y puntuacion.
4. `14` a `17` para comprender robustez, seguridad y limites.
5. `18` a `20` como referencia mientras lees `CODIGO/`.
6. `26` y `27` para practicar trazas y complejidad.
7. `21`, `22` y `23` para preparar la defensa oral.

## Metodo de estudio sugerido

Para cada tema usa cuatro pasos: explica la idea sin ver las notas, ejecuta un ejemplo manual, localiza la funcion real que la implementa y finalmente identifica un caso donde podria fallar. Si solo memorizas nombres, no entenderas el sistema; si puedes predecir la salida antes de ejecutar el programa, ya estas razonando como su autor.

## Convenciones de esta documentacion

- **Hecho del codigo**: comportamiento que se observa directamente en el repositorio.
- **Inferencia**: conclusion razonable a partir de varias piezas del codigo.
- **Limitacion**: frontera conocida del metodo, incluso cuando el programa funciona como fue diseñado.
- **Error**: conducta contraria al contrato esperado.
- **Mejora propuesta**: idea educativa; no significa que haya sido implementada.

Todos los ejemplos de cifrado asumen que el orden del conjunto es parte de la clave operacional. Cambiar el orden cambia el resultado.
