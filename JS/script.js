//ahorcado, 1 palabra, true false, letras, prompt, alert perdiste ganaste

let gano = false;

let guessH = false;
let guessA = false;
let guessL = false;
let guessO = false;
let guessW = false;
let guessE = false;
let guessN = false;

let vida = 5;

do {
  let prediction = prompt("Adiviná la letra");

  switch (prediction) {
    case "h":
      guessH = true;
      alert("Bien ahí, acertaste la letra\n" + mostrarLetras());
      break;
    case "a":
      guessA = true;
      alert("Bien ahí, acertaste la letra\n" + mostrarLetras());
      break;
    case "l":
      guessL = true;
      alert("Bien ahí, acertaste la letra\n" + mostrarLetras());
      break;
    case "o":
      guessO = true;
      alert("Bien ahí, acertaste la letra\n" + mostrarLetras());
      break;
    case "w":
      guessW = true;
      alert("Bien ahí, acertaste la letra\n" + mostrarLetras());
      break;
    case "e":
      guessE = true;
      alert("Bien ahí, acertaste la letra\n" + mostrarLetras());
      break;
    case "n":
      guessN = true;
      alert("Bien ahí, acertaste la letra\n" + mostrarLetras());
      break;

    default:
      vida = vida - 1;
      if (vida != 0) {
        alert(
          `Ups, esa letra no es correcta\nTe quedan ${vida} vidas\n` +
            mostrarLetras()
        );
      }

      break;
  }

  // el jugador ganó cuando adivino todas las letras
  gano = guessH && guessA && guessL && guessO && guessW && guessE && guessN;
} while (!gano && vida > 0);

if (gano) {
  alert("¡Felicitaciones ganaste el juego!");
} else {
  alert("Oh no, te quedaste sin vidas");
}

function mostrarLetras() {
  let texto = "";
  if (guessH) {
    texto += "H ";
  } else {
    texto += "_ ";
  }
  if (guessA) {
    texto += "A ";
  } else {
    texto += "_ ";
  }
  if (guessL) {
    texto += "L L ";
  } else {
    texto += "_ _ ";
  }
  if (guessO) {
    texto += "O ";
  } else {
    texto += "_ ";
  }
  if (guessW) {
    texto += "W ";
  } else {
    texto += "_ ";
  }
  if (guessE) {
    texto += "E E ";
  } else {
    texto += "_ _ ";
  }
  if (guessN) {
    texto += "N";
  } else {
    texto += "_";
  }

  return texto;
}
