# Trazas manuales completas

Estas trazas permiten predecir la ejecucion antes de abrir el navegador. Los resultados largos fueron obtenidos con el motor actual.

## Traza 1: Cesar con caracteres externos

Entrada:

```text
conjunto = ABCDE
texto = BAD CAFE
shift = 2
```

### Validacion

- NFC no cambia el conjunto.
- grafemas: `[A,B,C,D,E]`.
- tamaño: 5, valido.
- no hay duplicados ni blancos en el conjunto.
- texto tiene 8 grafemas y es valido.
- shift `2` pasa regex y es entero seguro.

### Mapa

```text
A->0, B->1, C->2, D->3, E->4
```

### Transformacion

| Entrada | indice | nuevo indice | salida |
|---|---:|---:|---|
| B | 1 | 3 | D |
| A | 0 | 2 | C |
| D | 3 | 0 | A |
| espacio | no existe | no aplica | espacio |
| C | 2 | 4 | E |
| A | 0 | 2 | C |
| F | no existe | no aplica | F |
| E | 4 | 1 | B |

Resultado exacto: `DCA ECFB`.

Al descifrar con 2, se obtiene `BAD CAFE`. Observa que `F` nunca cambio porque era externo.

## Traza 2: desplazamiento negativo

Conjunto `ABCDE`, shift `-1`:

```text
(-1 % 5) = -1
(-1 + 5) = 4
4 % 5 = 4
```

Cifrar con `-1` equivale a avanzar 4 o retroceder 1. `ABC` produce `EAB`.

## Traza 3: Atbash e involucion

Conjunto `ABCDEF`, texto `FACE`.

```text
N = 6, ultimo indice = 5
F: 5 -> 0 -> A
A: 0 -> 5 -> F
C: 2 -> 3 -> D
E: 4 -> 1 -> B
```

Primera salida: `AFDB`. Segunda aplicacion: `FACE`.

## Traza 4: conjunto Unicode duplicado tras NFC

Supongamos un conjunto con `é` seguido de `e` + acento combinante. Visualmente pueden parecer dos elementos escritos de modo distinto.

1. `normalizeUnicode(..., NFC)` compone la segunda forma.
2. `toGraphemes` produce dos veces `é`.
3. `seen` recibe el primero.
4. En el segundo, `seen.has('é')` es verdadero.
5. `duplicates` recibe `é`.
6. El resultado es invalido y no se cifra.

Esta validacion protege la biyeccion.

## Traza 5: descifrado Cesar real

Conjunto: preajuste español `ABCDEFGHIJKLMNÑOPQRSTUVWXYZ`.

Texto original:

```text
ESTE PROYECTO ANALIZA FRECUENCIAS DEL IDIOMA Y SELECCIONA AUTOMATICAMENTE EL MENSAJE MAS PROBABLE
```

Cifrado con shift 7:

```text
LZAL WYVFLJAV HTHROGH MYLJBLTJOHZ KLR OKOVSH F ZLRLJJOVTH HBAVSHAOJHSLTAL LR SLTZHPL SHZ WYVIHIRL
```

### Ranking

- se valida conjunto y mensaje;
- carga aproximada: longitud por 28 candidatos;
- se genera 1 Atbash;
- se generan shifts Cesar 0..26;
- se puntuan 28 textos;
- ganador: Cesar shift 7;
- score ganador: `124.411539`;
- segundo: Atbash, score `-40.320494`;
- margen: `164.732`.

Detalle del ganador:

| Señal | Valor |
|---|---:|
| letras | 85 |
| palabras | 12 |
| reconocidas | 6 |
| proporcion reconocida | 0.5 |
| chi-cuadrada | 16.74988 |
| frecuencia | 39.915035 |
| lexico | 43.4 |
| n-gramas | 15.004357 |
| vocales | 17.932353 |
| espacios | 8.159794 |
| penalizaciones | 0 |
| evidencia | 1 |

Confianza: alta, 98 %. El limite de 98 impide expresar certeza total.

## Traza 6: descifrado Atbash real

Texto original:

```text
LA SEGURIDAD DEL SISTEMA DEPENDE DE VALIDAR ENTRADAS Y EXPLICAR SUS LIMITACIONES CON CLARIDAD
```

Atbash:

```text
OZ HVTFIRWZW WVO HRHGVÑZ WVKVNWV WV EZORWZI VNGIZWZH B VCKORXZI HFH ORÑRGZXRLNVH XLN XOZIRWZW
```

Ganador: Atbash, `shift: null`, score `126.522712`. Segundo: Cesar shift 18, score `-28.931489`. Margen `155.4542`, confianza alta 98 %.

## Traza 7: candidato y score

Para cualquier candidato:

```text
texto
 -> minusculas/diacriticos
 -> letras y palabras
 -> conteos por letra
 -> chi2 + log-likelihood
 -> lexico + n-gramas
 -> vocales + espacios
 -> penalizaciones
 -> score + evidence
```

Si el candidato es `QXZW QÑ WK`, la `q` sin `u`, secuencias consonanticas y palabras no reconocidas reducen la puntuacion.

## Traza 8: confianza baja

Para un cifrado de dos o tres letras:

1. `frequency` vale cero si hay menos de cinco letras.
2. Hay pocas o ninguna palabra sustancial.
3. `evidence` queda baja.
4. Varios candidatos pueden empatar.
5. El desempate hace la salida determinista.
6. Los umbrales impiden nivel alto aunque el ganador sea correcto por casualidad.

## Traza 9: error de complejidad

Con 12,000 grafemas y conjunto de 128:

```text
operations = 12000 * 129 = 1,548,000
```

Supera 1,500,000. El mensaje pasa el limite individual de longitud y el conjunto pasa su limite individual, pero su combinacion se rechaza antes del ranking.

## Traza 10: interfaz y error

1. Usuario pulsa analizar con texto vacio.
2. `analyzeCiphertext` llama `validateMessage`.
3. Se agrega “Escribe un mensaje antes de continuar.”
4. Se lanza `InputValidationError`.
5. `decryptAutomatically` captura la instancia de `Error`.
6. Limpia `automaticResult` y establece `decryptErrors`.
7. React renderiza `ErrorNotice` con anuncio asertivo.
