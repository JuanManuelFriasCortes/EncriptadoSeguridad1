---
aliases: [Confianza, Ambigüedad criptográfica]
tags: [criptoanalisis, confianza, limitaciones]
---

# Ambigüedad y confianza

## Hecho fundamental

El ciphertext y el charset no siempre contienen información suficiente para identificar un único original. Esto es especialmente cierto con mensajes cortos.

El requisito obliga a mostrar una sola respuesta, así que [[03 - Descifrado automatico]] selecciona el candidato más probable según [[07 - Scoring del español]].

## Variables

- **margen:** score del primero menos score del segundo;
- **evidencia:** función de letras y palabras disponibles;
- **calidad:** posición absoluta del score ganador;
- **separación:** transformación exponencial del margen.

```text
separation = 1 - exp(-max(0, margin) / 15)
```

## Niveles

- **baja:** poca evidencia o scores cercanos;
- **media:** evidencia razonable y separación moderada;
- **alta:** suficiente texto y ganador claramente separado.

## Qué no significa 96 %

No significa que exista 96 % de probabilidad matemática de que el texto sea correcto. El porcentaje es una escala heurística acotada al 98 %.

## Casos difíciles

- `A`, `NO`, `SI`;
- secuencias de números;
- emojis sin lenguaje;
- nombres propios;
- otro idioma;
- charset de muy pocos símbolos;
- empate entre Atbash y una rotación.

## Comunicación responsable

La UI siempre responde, pero muestra confianza para no presentar la inferencia como certeza. Esto conecta con [[21 - Limitaciones y mejoras]].
