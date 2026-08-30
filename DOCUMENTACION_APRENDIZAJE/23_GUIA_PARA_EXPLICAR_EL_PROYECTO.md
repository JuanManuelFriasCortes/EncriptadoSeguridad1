# Guia para explicar el proyecto

## Mensaje central

El proyecto no solo cifra: muestra como un espacio pequeño de claves puede recorrerse por completo y como las regularidades del idioma permiten elegir automaticamente una salida probable. La mejor exposicion conecta matematicas, codigo, estadistica y limites.

## Guion de 5 minutos

### 1. Problema, 30 segundos

“La aplicacion permite definir un conjunto ordenado Unicode, cifrar con Cesar o Atbash y descifrar sin que el usuario elija el algoritmo o la clave. El sistema compara internamente todas las posibilidades y muestra una sola respuesta.”

### 2. Cifrados, 60 segundos

Escribe:

```text
Cesar:  (i+k) mod N
Atbash: N-1-i
```

Explica que `N` sale del conjunto y que externos se conservan.

### 3. Descifrado, 90 segundos

“Para tamaño `N` se generan `N+1` candidatos: todos los Cesar y un Atbash. Cada uno se puntua por frecuencias, chi-cuadrada, palabras, n-gramas, vocales, espacios y penalizaciones. Se ordenan y solo se devuelve el mejor.”

### 4. Al-Kindi, 45 segundos

Explica la inspiracion historica en regularidades de frecuencias, sin atribuirle formulas modernas.

### 5. Seguridad y limites, 45 segundos

“Los mensajes se procesan en el navegador y React los muestra como texto; existen cabeceras defensivas. Pero Cesar y Atbash no son criptografia segura y la clasificacion puede fallar en texto corto o no español.”

### 6. Cierre, 30 segundos

“La parte exacta es la enumeracion de candidatos y las transformaciones; la parte probabilistica es decidir cual texto parece español.”

## Guion de 12 minutos

1. Requisito y alcance: 1 minuto.
2. Arquitectura por capas: 1 minuto.
3. Conjunto, NFC y grafemas: 1.5 minutos.
4. Cesar con ejemplo manual: 1.5 minutos.
5. Atbash e involucion: 1 minuto.
6. Generacion `N+1`: 1 minuto.
7. Score con componentes: 2 minutos.
8. Confianza y una sola salida: 1 minuto.
9. Seguridad web frente a fuerza criptografica: 1 minuto.
10. Limitaciones, pruebas faltantes y mejora prioritaria: 1 minuto.

## Demostracion recomendada

### Preparacion

- Ejecuta localmente la aplicacion.
- Mantiene el preajuste español.
- Ten una frase natural de varias oraciones.
- Ten una segunda frase para Atbash.
- Verifica antes que el build y el servidor funcionan.

### Demostracion Cesar

1. Señala el contador del conjunto y explica los 27 grafemas.
2. Escribe una frase natural en mayusculas.
3. Selecciona Cesar y un shift, por ejemplo 7.
4. Cifra y explica el desplazamiento normalizado mostrado.
5. Copia el resultado al panel derecho.
6. Analiza.
7. Señala algoritmo, shift, texto unico y confianza.

### Demostracion Atbash

Repite y destaca que no existe shift. Aplica mentalmente primer/ultimo simbolo para que la audiencia vea la reflexion.

### Demostracion de validacion

Duplica una letra en el conjunto o añade un espacio. Explica por que el programa no lo corrige silenciosamente.

## Diapositiva o pizarron esencial

```text
Entrada no confiable
 -> NFC + grafemas + validacion
 -> 1 Atbash + N Cesar
 -> score de español para cada candidato
 -> ordenar + margen/confianza
 -> una sola salida
```

## Frases tecnicamente correctas

- “El sistema identifica el candidato mejor puntuado bajo su modelo.”
- “La confianza es heuristica, no una probabilidad formal.”
- “El conjunto es ordenado y determina los indices.”
- “La aplicacion admite Unicode; no se limita a ASCII.”
- “Al-Kindi inspira el uso de regularidades de frecuencia; chi-cuadrada y n-gramas son extensiones modernas.”
- “La seguridad web no convierte Cesar en cifrado fuerte.”

## Frases que debes evitar

- “Siempre encuentra el texto correcto.”
- “La confianza del 90 % significa 90 % de probabilidad real.”
- “Al-Kindi invento la chi-cuadrada usada aqui.”
- “Los emojis son un caracter JavaScript simple.”
- “CSP hace imposible XSS.”
- “Como es local, nadie puede ver el mensaje.”
- “El proyecto tiene pruebas completas.”

## Preguntas dificiles y transiciones

### “¿Por que no muestra todos los candidatos?”

“El requisito exige evitar seleccion humana. La funcion interna puede ordenarlos, pero la API de la interfaz devuelve solo el mejor y usa el segundo unicamente para medir margen.”

### “¿Que pasa si se equivoca?”

“Es una limitacion esperada de inferencia linguistica. La salida siempre debe leerse con su confianza; una mejora seria un umbral de no concluyente validado contra corpus.”

### “¿Donde esta la inteligencia?”

“No hay IA remota. La decision proviene de busqueda exhaustiva y una funcion de puntuacion explicable.”

### “¿Por que no AES?”

“El objetivo es estudiar cifrados clasicos y criptoanalisis de frecuencias. AES pertenece a otro alcance y no puede romperse enumerando unos pocos desplazamientos.”

## Lista previa a exponer

- Puedo derivar ambas formulas.
- Puedo explicar `N+1`.
- Puedo distinguir grafema/punto de codigo.
- Puedo enumerar componentes del score.
- Puedo explicar margen, evidencia y confianza.
- Puedo admitir que no hay pruebas automatizadas actuales.
- Puedo nombrar dos defensas y una debilidad web.
- Puedo nombrar tres casos de fallo del detector.
- Puedo explicar por que el sistema no es criptografia moderna.
