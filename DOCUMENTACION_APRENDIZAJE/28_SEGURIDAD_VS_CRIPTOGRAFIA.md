# Seguridad de la aplicacion versus seguridad criptografica

## Dos preguntas distintas

1. ¿La aplicacion web reduce riesgos como XSS, fuga de datos y abuso de permisos?
2. ¿El algoritmo impide que un adversario recupere el mensaje?

Una respuesta positiva a la primera no implica una respuesta positiva a la segunda.

## Evaluacion de la aplicacion

Fortalezas actuales:

- procesamiento de mensajes en el navegador;
- sin almacenamiento persistente ni red de aplicacion;
- JSX textual, sin HTML peligroso;
- validaciones y limites;
- cabeceras CSP, aislamiento, permisos, referencia, MIME y frames;
- portapapeles solo bajo gesto.

Limitaciones:

- CSP permite inline;
- dependencias y plataforma son parte de la confianza;
- mensajes aparecen en memoria/DOM;
- dispositivo/extensiones estan fuera de alcance.

## Evaluacion de Cesar

Con conjunto de tamaño `N`, hay exactamente `N` desplazamientos distintos. El maximo permitido es 128, un espacio trivial para fuerza bruta. El numero introducido puede ser enorme, pero se reduce modulo `N`.

## Evaluacion de Atbash

No tiene clave numerica: la sustitucion queda determinada al conocer el conjunto. La misma operacion revierte el texto.

## Que protege HTTPS

Si el sitio se sirviera por HTTPS, protegeria el transporte entre navegador y servidor de ciertos observadores/alteraciones. Como el mensaje no se envia por el flujo actual, su papel principal seria entregar integridad/origen de recursos y habilitar APIs seguras. HTTPS no cambia las formulas de Cesar/Atbash.

## Que protege CSP

Limita fuentes y capacidades de contenido. Puede dificultar la ejecucion de una inyeccion. No cifra el texto ni aumenta el espacio de claves.

## Que protege React

Escapa valores textuales al renderizarlos. No protege frente a malas decisiones criptograficas, un `dangerouslySetInnerHTML` futuro o un dispositivo comprometido.

## Confidencialidad, integridad y autenticidad

- **Confidencialidad:** que no lean el mensaje. Cesar/Atbash no la ofrecen ante un atacante competente.
- **Integridad:** detectar modificaciones. El proyecto no usa MAC ni firma.
- **Autenticidad:** demostrar origen. El proyecto no autentica autores.

Por tanto, el resultado es una transformacion educativa, no un esquema de seguridad completo.

## Amenaza correcta para la demostracion

El “atacante” didactico conoce conjunto y universo de algoritmos, ignora shift/tipo y explota español. Bajo ese modelo el programa puede clasificar. Cambiar el modelo, por ejemplo ocultar conjunto o usar sustitucion arbitraria, invalida el metodo actual.

## Formulacion para informe

> Se aplican controles de seguridad web para reducir riesgos de ejecucion y exposicion durante la demostracion local. Estos controles no convierten los cifrados clasicos en mecanismos aptos para informacion sensible; el propio sistema demuestra su vulnerabilidad al recuperar mensajes por enumeracion y analisis estadistico.

## Cuando usar criptografia moderna

Para datos reales se emplean construcciones revisadas, bibliotecas confiables, gestion de claves y cifrado autenticado como AES-GCM o ChaCha20-Poly1305 segun el contexto. No deben implementarse desde cero como sustitucion apresurada dentro de este laboratorio.
