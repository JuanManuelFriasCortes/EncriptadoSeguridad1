# `lib/crypto/analyzer.js`

## Proposito

Orquesta el descifrado automatico. Une validacion, generacion de candidatos, puntuacion, ordenamiento y confianza.

## Dependencias

- `atbashTransform`, `caesarDecrypt`: producen textos.
- `scoreSpanish`: evalua español.
- validadores y `InputValidationError`: protegen contrato/carga.

## `compareCandidates`

Comparador privado para orden descendente. Criterios:

1. score;
2. palabras reconocidas;
3. Atbash antes que Cesar;
4. shift ascendente.

El tercer criterio es convencional y debe distinguirse de evidencia. `shift ?? 0` maneja `null` de Atbash, aunque solo se llega a ese criterio cuando el algoritmo ya coincide.

## `estimateConfidence`

Calcula margen y toma evidencia del ganador. Escala score a calidad, transforma margen con una exponencial y combina:

```text
0.18 + 0.34*evidence + 0.22*quality + 0.24*separation
```

Limita a 0.98, redondea a porcentaje y clasifica por umbrales conjuntos. Es heuristica privada; la interfaz recibe el resultado, no los componentes.

## `rankCandidates`

Crea un arreglo nuevo. Añade Atbash con `shift:null`, itera Cesar `0..N-1`, puntua cada texto y ordena. Se exporta para pruebas/inspeccion, aunque la interfaz normal no debe mostrarlo.

Precondicion documentada: texto normalizado y conjunto validado. Invocarla directamente sin respetar esto puede producir errores de bajo nivel.

## `analyzeCiphertext`

Es la frontera publica robusta:

1. valida ambas entradas;
2. concatena errores;
3. lanza `InputValidationError` si existen;
4. valida presupuesto;
5. clasifica;
6. extrae primero y segundo;
7. devuelve algoritmo, shift, plaintext y confianza del mejor.

No devuelve `analysis`, scores ni lista, cumpliendo resultado unico.

## Invariantes

Con conjunto valido siempre hay al menos tres candidatos: un Atbash y dos shifts Cesar. Por eso `second` existe. Si se permitiera tamaño uno, esa suposicion aun daria dos, pero otras propiedades se romperian.

## Riesgos

- siempre fuerza una eleccion aun fuera del modelo;
- confianza no calibrada;
- mantiene todos los plaintexts en memoria;
- `sort` muta el arreglo, aunque aqui es nuevo;
- desempate puede etiquetar Atbash en equivalencias no identificables;
- scoring sin pruebas actuales hace sensibles los cambios.

## Pruebas esenciales

Conteo `N+1`, cobertura de shifts, forma de candidatos, cuatro desempates, validacion, limite de carga, unica salida, confianza por umbrales y corpus independiente Cesar/Atbash.
