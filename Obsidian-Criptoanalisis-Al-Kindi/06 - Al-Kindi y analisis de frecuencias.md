---
aliases: [Al-Kindi, Análisis de frecuencias]
tags: [historia, criptoanalisis, estadistica]
---

# Al-Kindi y análisis de frecuencias

## Contexto histórico

Abū Yūsuf Yaʻqūb ibn Isḥāq al-Kindī fue un erudito del siglo IX. Su tratado sobre descifrado es considerado la obra conservada más antigua dedicada a la criptología. Su contribución central fue tratar el lenguaje como una fuente de regularidades estadísticas.

La idea esencial:

1. tomar una muestra suficientemente amplia del idioma;
2. contar cuántas veces aparece cada letra;
3. ordenar o comparar las frecuencias;
4. contar los símbolos del criptograma;
5. usar similitudes estadísticas para inferir sustituciones.

## Aplicación en este proyecto

El sistema moderniza el principio:

- [[03 - Descifrado automatico]] enumera hipótesis;
- [[07 - Scoring del español]] mide compatibilidad lingüística;
- [[08 - Chi-cuadrada y log-verosimilitud]] compara distribuciones;
- [[09 - N-gramas y señales lingüisticas]] añade orden y estructura;
- se selecciona automáticamente una sola hipótesis.

## Por qué funciona

Los idiomas naturales no usan todas las letras ni secuencias con la misma probabilidad. Los cifrados por sustitución monoalfabética cambian símbolos, pero conservan buena parte de los patrones de repetición.

## Por qué puede fallar

- texto demasiado corto;
- idioma distinto al español;
- texto aleatorio o nombres propios;
- charset que no cubre las letras relevantes;
- múltiples candidatos lingüísticamente plausibles.

Esto conecta directamente con [[18 - Ambiguedad y confianza]].

## Lecturas

- [Registro BnF de Al-Kindi's Treatise on Cryptanalysis](https://catalogue.bnf.fr/ark:/12148/cb46585841t)
- [An Account of Early Statistical Inference in Arab Cryptology](https://doi.org/10.1198/tas.2011.10191)
- [[27 - Fuentes y lecturas]]
