// require nickname
const playerNickname = sessionStorage.getItem("current_player_nickname");
if (playerNickname == null) {
  window.location.href = "../Pages/name.html";
}

let currentGame = loadGame(playerNickname);

// load HTML
const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", submitLetter);
const letterInput = document.getElementById("enterALetter");
letterInput.addEventListener("beforeinput", validatedCharacter);
letterInput.addEventListener("keyup", submitOnEnter);

updateScreen(currentGame);

function submitLetter() {
  const letter = letterInput.value.toUpperCase();
  letterInput.value = "";

  if (
    currentGame.correctGuesses.includes(letter) ||
    currentGame.incorrectGuesses.includes(letter)
  ) return;

  const hit = currentGame.randomWord.includes(letter);
  if (hit) {
    // acertó la letra
    currentGame.correctGuesses.push(letter);
    updateScreen(currentGame);
    saveGame(currentGame);

    const won = currentGame.randomWord.every((letter) =>
      currentGame.correctGuesses.includes(letter)
    );
    if (won) {
      showWinScreen(currentGame.nickname, currentGame.randomWord.join(""));
    } else {
      showLetterHit();
    }
  } else {
    // le erró a la letra
    currentGame.incorrectGuesses.push(letter);
    const numErrors = currentGame.incorrectGuesses.length;
    updateScreen(currentGame);
    saveGame(currentGame);

    if (numErrors == 6) {
      // 6 errors - player lost

      setTimeout(() => {
        window.location.href = "../Pages/lose.html"; //tambien agregar nombre del JSON
      }, 1500);

      resetGame(currentGame.nickname);
    } else {
      // le erró pero puede seguir jugando
      showLetterFail();
    }
  }

  localStorage.setItem("currentGame", JSON.stringify(currentGame));
}

function validatedCharacter(event) {
  // permitir borrado
  if (event.inputType == "deleteContentBackward") return;

  // ver si input está vacío
  if (letterInput.value != "") {
    event.preventDefault();
    return;
  }

  // ver si el caracter es válido
  const validChars = new RegExp("^[A-Za-z]$");
  if (!validChars.test(event.data)) {
    event.preventDefault();
    return;
  }
}

function submitOnEnter(event) {
  if (event.repeat) return;

  if (event.code === "Enter" && letterInput.value !== "") {
    submitLetter();
  }
}

function newGame(nickname) {
  return {
    nickname: nickname,
    randomWord: chooseRandomWord(),
    correctGuesses: [],
    incorrectGuesses: [],
  };
}

// select random word (from the array of available words)
function chooseRandomWord() {
  const words = [
    // ["H", "A", "L", "L", "O", "W", "E", "E", "N"],
    ["B", "L", "O", "O", "D"],
    ["S", "K", "U", "L", "L"],
    ["S", "P", "I", "D", "E", "R"],
    ["W", "I", "T", "C", "H"],
    ["H", "A", "U", "N", "T", "E", "D"],
    // ["O", "C", "T", "O", "B", "E", "R"],
    ["P", "U", "M", "P", "K", "I", "N"],
    ["S", "P", "O", "O", "K", "Y"],
    ["G", "H", "O", "S", "T"],
    ["N", "I", "G", "H", "T", "M", "A", "R", "E"],
    ["S", "C", "A", "R", "Y"],
    ["D", "A", "R", "K", "N", "E", "S", "S"],
    ["T", "E", "R", "R", "I", "F", "Y"],
    ["T", "O", "M", "B", "S", "T", "O", "N", "E"],
    ["C", "O", "B", "W", "E", "B"],
    ["C", "A", "N", "D", "Y"],
  ];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
}

function saveGame(currentGame) {
  localStorage.setItem(currentGame.nickname, JSON.stringify(currentGame));
}

function loadGame(nickname) {
  const stored = localStorage.getItem(nickname);
  if (stored == null) {
    // new player
    return newGame(nickname);
  }

  return JSON.parse(stored);
}

function resetGame(nickname) {
  currentGame = newGame(nickname);
  saveGame(currentGame);
  updateScreen(currentGame);
}

function updateScreen(currentGame) {
  updateCorrectLetters(currentGame.randomWord, currentGame.correctGuesses);
  updateIncorrectLetters(currentGame.incorrectGuesses);
  updateHangmanImage(currentGame.incorrectGuesses.length);
}

function updateCorrectLetters(word, correctGuesses) {
  // etiqueta HTML donde se muestra la palaba
  const wordDisplay = document.getElementById("wordDisplay");

  const wordStatus = word.map((letter) => {
    return correctGuesses.includes(letter) ? letter : "_";
  });

  wordDisplay.innerText = wordStatus.join(" ");
}

function updateIncorrectLetters(incorrectGuesses) {
  // etiqueta HTML donde se muestran las letras que fue errando
  const incorrectDisplay = document.getElementById("incorrectDisplay");

  incorrectDisplay.innerText = incorrectGuesses.join(",");
}

function updateHangmanImage(numErrors) {
  // etiqueta HTML donde se muestran las imagenes del ahorcado
  const hangmanImage = document.getElementById("hangmanImage");

  switch (numErrors) {
    case 1:
      hangmanImage.style.backgroundImage =
        "url(../images/stick_figure_1_errors.png)";
      break;
    case 2:
      hangmanImage.style.backgroundImage =
        "url(../images/stick_figure_2_errors.png)";
      break;
    case 3:
      hangmanImage.style.backgroundImage =
        "url(../images/stick_figure_3_errors.png)";
      break;
    case 4:
      hangmanImage.style.backgroundImage =
        "url(../images/stick_figure_4_errors.png)";
      break;
    case 5:
      hangmanImage.style.backgroundImage =
        "url(../images/stick_figure_5_errors.png)";
      break;
    case 6:
      hangmanImage.style.backgroundImage =
        "url(../images/stick_figure_6_errors.png)";
      break;
  }
}

function showWinScreen(playerName, word) {
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then((resp) => resp.json())
    .then((resp) => {
      Swal.fire({
        title: "Congrats " + playerName + "!" + "\n" + word + ":",
        text: resp[0].meanings[0].definitions[0].definition,
        icon: "question",
        confirmButtonText: "New Game",
      });
    })
    .finally(() => resetGame(playerName));
}

function showLetterHit() {
  Swal.fire({
    title: "You got it",
    text: "Right letter",
    icon: "success",
    confirmButtonText: "Continue playing",
  });
}

function showLetterFail() {
  Swal.fire({
    title: "Oops!",
    text: "Wrong letter",
    icon: "warning",
    confirmButtonText: "Continue playing",
  });
}
