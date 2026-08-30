/** Frecuencias porcentuales aproximadas de letras en español escrito. */
export const SPANISH_LETTER_FREQUENCIES = Object.freeze({
  a: 12.53, b: 1.42, c: 4.68, d: 5.86, e: 13.68, f: 0.69, g: 1.01,
  h: 0.70, i: 6.25, j: 0.44, k: 0.02, l: 4.97, m: 3.15, n: 6.71,
  'ñ': 0.31, o: 8.68, p: 2.51, q: 0.88, r: 6.87, s: 7.98, t: 4.63,
  u: 3.93, v: 0.90, w: 0.02, x: 0.22, y: 0.90, z: 0.52,
});

/** Léxico frecuente usado solo como una señal entre varias. */
export const COMMON_WORDS = new Set(`
  a ahora al algo algun alguna algunas alguno algunos ante antes aqui asi aun aunque
  bajo bien cada casi como con contra cual cuando de debe deben decir del desde donde
  dos durante e el ella ellas ello ellos en entre era eran es esa esas ese eso esos
  esta estaba estaban estado estan estar estas este esto estos fue fueron ha habia
  hacia hasta hay la las le les lo los mas me mejor mientras mismo mucha muchas mucho
  muchos muy nada ni no nos nuestra nuestras nuestro nuestros nunca o otra otras otro
  otros para pero poco por porque puede pueden pues que quien se sea ser si siempre
  sin sobre son su sus tambien te tiene tienen todo toda todas todos tras tu un una
  unas uno unos ya y yo
  agua aire amigo amigos aprender archivo ayuda camino cambio casa ciencia ciudad clave
  codigo conocimiento datos dia dias ejemplo energia equipo escuela espacio estudio
  familia forma futuro gobierno grande historia hora horas importante informacion
  internet juego lenguaje libro lugar manera mensaje metodo mundo musica nombre nueva
  nuevo numero palabra palabras parte persona personas problema proceso programa
  proyecto prueba resultado seguridad semana sistema tecnologia tiempo trabajo valor
  verdad vida web
  analizar analisis automatico cesar cifrado cifrar conjunto criptografia descifrado
  descifrar desplazamiento frecuencia local navegador privado texto atbash estadistico
  mensaje algoritmo caracteres español universidad materia clasica clasico
`.trim().split(/\s+/u));

/** N-gramas representativos; las ponderaciones premian estructura, no frases enteras. */
export const SPANISH_NGRAMS = Object.freeze({
  que: 3.6, ent: 2.5, est: 2.4, del: 2.3, los: 2.2, las: 2.2, con: 2.1,
  por: 2.0, una: 2.0, ion: 2.5, cio: 2.3, ado: 1.8, para: 3.2, esta: 3.0,
  como: 2.8, ente: 2.5, cion: 4.0, iento: 4.0, mien: 2.7, ando: 2.7,
  de: 1.5, la: 1.4, el: 1.4, en: 1.3, es: 1.3, er: 1.0, ar: 1.0,
  al: 1.1, se: 1.1, un: 1.1, ra: 0.8, re: 0.8, nt: 0.8, co: 0.7,
});

/** Patrones con baja probabilidad en español, usados como penalización general. */
export const IMPROBABLE_PATTERNS = Object.freeze([
  /[^aeiouáéíóúü\W\d_]{5,}/giu,
  /[aeiouáéíóúü]{4,}/giu,
  /q(?!u)/giu,
  /[kñw]{2}/giu,
  /[bcdfghjklmnñpqrstvwxyz]{3}[bcdfghjklmnñpqrstvwxyz]+/giu,
]);

export const VALID_SINGLE_LETTER_WORDS = new Set(['a', 'e', 'o', 'u', 'y']);
