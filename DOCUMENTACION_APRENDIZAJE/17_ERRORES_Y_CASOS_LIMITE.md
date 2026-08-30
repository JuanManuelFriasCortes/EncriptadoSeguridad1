# Errores y casos limite

## ¿Que ocurre si...?

| Caso | Comportamiento real |
|---|---|
| charset vacio | error “no puede estar vacío”; no hay resultado |
| charset duplicado | error tras NFC con simbolos repetidos |
| charset de un caracter | exige al menos dos |
| charset contiene espacio/tab/salto | se rechaza y se describe el whitespace |
| charset tiene 129 grafemas | supera maximo 128 |
| texto vacio | error “Escribe un mensaje...” |
| texto de 12,001 | supera 12,000 |
| shift 0 | valido; texto incluido queda igual |
| shift N | valido; normaliza a 0 |
| shift -1 | valido; normaliza a N-1 |
| shift decimal/exponente | UI lo rechaza por regex |
| shift fuera de entero seguro | UI/biblioteca lo rechazan |
| mensaje tiene externos | permanecen intactos |
| mensaje contiene emoji externo | permanece intacto como grafema |
| emoji pertenece al charset | se transforma por su indice |
| ciphertext una letra | se elige deterministamente, confianza normalmente baja |
| texto muy corto | frecuencias/vocales se desactivan parcialmente; posible empate |
| no parece español | se elige el menos malo bajo el modelo; no hay garantia |
| scores iguales | palabras; luego Atbash; luego menor shift |
| usuario pega HTML | React lo muestra como texto, no crea nodos HTML |
| usuario pega JavaScript | no se evalua; es texto |
| combinacion entrada enorme | si `M*(N+1)>1.5M`, se rechaza antes del ranking |
| portapapeles deniega | estado error y mensaje visible |
| cambia charset | se limpian resultados dependientes |
| cambia texto original tras cifrar | el resultado previo puede seguir visible hasta recifrar |
| no hay `Intl.Segmenter` | fallback Array.from, menos preciso |
| Atbash y Cesar equivalen | desempate puede etiquetar Atbash; identidad real no inferible |

## Bug versus limitacion

Un fallo de doble Atbash para conjunto valido seria bug. No poder decidir una sola letra es limitacion estadistica. Un mensaje de error correcto no es fallo. Un resultado visible antiguo tras editar texto es una decision/riesgo de UX, salvo que el contrato exija invalidacion inmediata.

## Casos que merecen pruebas futuras

NUL en scoring, ZWJ en fallback, regex con entradas adversas, empate por redondeo, secuencias rapidas de estado y cabeceras en build servido.

Consulta `29_LIMITACIONES_VS_ERRORES.md` y `24_ERRORES_COMUNES_AL_MODIFICAR.md`.
