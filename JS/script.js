let words = [
  ["H", "A", "L", "L", "O", "W", "E", "E", "N"],
  ["B", "L", "O", "O", "D"],
  ["S", "K", "U", "L", "L"],
  ["S", "P", "I", "D", "E", "R"],
  ["W", "I", "T", "C", "H"],
];

function game() {
  alert("¡Bienvenido al juego del ahorcado!");
  let playerName = prompt("Ingresa tu nombre:");
  alert(`Bienvenido ${playerName}!!!\n¿Comenzamos?`);

  let player = {
    name: playerName,
    lives: 13,
    roundsWon: 0,
  };

  let keepPlaying = true;
  do {
    // select random word (from the array of available words) for round
    let wordIndex = Math.floor(Math.random() * words.length);
    let roundWord = words[wordIndex];
    words.splice(wordIndex, 1); // remove from list to avoid word repetition

    // round starts
    let wonRound = false;
    let correctGuesses = [];
    let failedGuesses = [];

    do {
      let inputLetter = readPlayerInput(correctGuesses, failedGuesses);

      let hit = roundWord.includes(inputLetter);

      if (hit) {
        alert(
          `¡Bien ahí, ${player.name}! La letra ${inputLetter} está en la palabra`
        );
        correctGuesses.push(inputLetter);
        wonRound = roundWord.every((letter) => correctGuesses.includes(letter));
      } else {
        alert(`Ups! La letra ${inputLetter} NO está en la palabra`);
        failedGuesses.push(inputLetter);
        player.lives--;
      }
    } while (player.lives > 0 && !wonRound);

    if (wonRound) {
      alert(`Vamos! Adivinaste la palabra ${roundWord.join("")}`);
      player.roundsWon++;
    }

    if (words.length == 0 || player.lives == 0) {
      keepPlaying = false;
    } else {
      keepPlaying = confirm("¿Queres jugar otra ronda?");
    }
  } while (keepPlaying);

  showFinalResult(player);
}

function showFinalResult(player) {
  if (player.lives == 0) {
    alert(
      `Felicitaciones ${player.name}.\nCompletaste ${player.roundsWon} rondas.`
    );
  } else {
    alert(
      `Felicitaciones ${player.name}.\nGanaste todas las rondas (${player.roundsWon}). Y te sobraron ${player.lives} vidas`
    );
  }
}

function readPlayerInput(correctGuesses, failedGuesses) {
  let inputLetter = "";
  while (true) {
    inputLetter = prompt("Introduce una letra");
    if (inputLetter.length == 0) {
      alert("Introduce al menos una letra");
      continue;
    }
    if (inputLetter.length >= 2) {
      alert("Introduce solo 1 (una) letra");
      continue;
    }

    inputLetter = inputLetter.toUpperCase();

    const charCode = inputLetter.charCodeAt(0);
    // "A".charCodeAt(0) = 65
    // "B".charCodeAt(0) = 66
    // "Z".charCodeAt(0) = 90
    // Valores válidos entre 65 y 90
    if (charCode < 65 || charCode > 90) {
      alert("Introduce un caracter válido (letra)");
      continue;
    }

    if (
      correctGuesses.includes(inputLetter) ||
      failedGuesses.includes(inputLetter)
    ) {
      alert("Esta letra ya la introduciste anteriormente. Intenta otra");
      continue;
    }

    break;
  }
  return inputLetter;
}

game();
