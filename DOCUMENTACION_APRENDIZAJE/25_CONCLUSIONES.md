# Conclusiones

## Lo que el proyecto demuestra

El sistema convierte dos definiciones matematicas pequeñas en una experiencia completa: entrada Unicode, validacion, transformacion, enumeracion de claves, modelo linguistico, seleccion automatica, UI accesible y defensas HTTP.

La arquitectura separa correctamente el dominio de la presentacion. `lib/crypto` puede entenderse sin React; `CryptoWorkbench` coordina sin copiar formulas; `next.config.ts` y el flujo de Pages resuelven plataforma/publicacion sin tocar mensajes.

## Las cinco ideas que debes dominar

1. **El conjunto es ordenado.** Sus grafemas definen los indices y el modulo real.
2. **Cesar y Atbash son exactos.** Sus formulas y propiedades inversas pueden demostrarse.
3. **El barrido es completo dentro del modelo.** Para `N` se prueban todos los `N` Cesar y un Atbash.
4. **La eleccion es heuristica.** Score y confianza indican compatibilidad, no verdad garantizada.
5. **Seguridad web y criptografica son distintas.** Una UI prudente no fortalece un cifrado clasico.

## Fortalezas

- soporte Unicode mejor que una implementacion basada en unidades UTF-16;
- validacion explicita de invariantes;
- conservacion clara de caracteres externos;
- motor modular y funciones mayormente puras;
- salida automatica unica;
- scoring explicable por componentes;
- limites de entrada y complejidad;
- salida React textual y cabeceras defensivas;
- interfaz semantica y razonablemente accesible.

## Riesgos y deudas

- no hay suite automatizada actual;
- detector sesgado a español y vocabulario incluido;
- confianza sin calibracion publicada;
- trabajo en hilo principal;
- CSP permite scripts inline;
- fallback Unicode menos preciso;
- el sistema siempre elige incluso fuera de sus modelos.

## Evaluacion honesta

Las transformaciones clasicas pueden justificarse algebraicamente. El espacio de busqueda puede justificarse por aritmetica modular. Las validaciones pueden justificarse por invariantes y disponibilidad. La seleccion final solo puede justificarse empiricamente con ejemplos y, para una afirmacion fuerte, con un corpus de evaluacion que aun debe añadirse.

## Siguiente paso de aprendizaje

Antes de añadir mas funciones, implementa pruebas de propiedades y construye un corpus que no haya participado en el diseño de pesos. Mide exactitud por longitud y algoritmo. Despues calibra un estado no concluyente y mueve el analisis a un Worker si el rendimiento lo exige.

## Frase final para la defensa

> El proyecto recorre exhaustivamente todas las soluciones de Cesar y Atbash definidas por el conjunto, y usa regularidades del español inspiradas en el principio criptoanalitico de Al-Kindi para seleccionar una unica respuesta probable; la transformacion es exacta, la seleccion es heuristica y sus limites se declaran explicitamente.
