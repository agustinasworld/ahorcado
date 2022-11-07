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

    console.log(`Jugando con palabra: ${roundWord}`); // remove

    // round starts
    let wonRound = false;
    let correctGuesses = [];
    let failedGuesses = [];

    do {
      let inputLetter = (inputLetter = prompt("Introduce una letra")); // agregar validacion 1 sola letra - ya la dijiste

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

    keepPlaying = false;
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

game();
