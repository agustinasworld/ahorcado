const words = [
  ["H", "A", "L", "L", "O", "W", "E", "E", "N"],
  ["B", "L", "O", "O", "D"],
  ["S", "K", "U", "L", "L"],
  ["S", "P", "I", "D", "E", "R"],
  ["W", "I", "T", "C", "H"],
  ["H", "A", "U", "N", "T", "E", "D"],
  ["O", "C", "T", "O", "B", "E", "R"],
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

// html
const wordDisplay = document.getElementById("wordDisplay");
const incorrectDisplay = document.getElementById("incorrectDisplay");
const hangmanImage = document.getElementById("hangmanImage");
const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", submitLetter);

// select random word (from the array of available words)
const wordIndex = Math.floor(Math.random() * words.length);
const randomWord = words[wordIndex];

// initialization
let currentPlayer = {
  nickname: "",
  correctGuesses: [],
  incorrectGuesses: [],
  randomWord: randomWord,
};
wordDisplay.innerText = printHidenWord(randomWord, []);

// on page load, check if player is saved
let savedPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
if (savedPlayer != null) {
  currentPlayer = savedPlayer;
  if (currentPlayer.randomWord == "") currentPlayer.randomWord = randomWord;

  wordDisplay.innerText = printHidenWord(
    currentPlayer.randomWord,
    currentPlayer.correctGuesses
  );
  incorrectDisplay.innerText = currentPlayer.incorrectGuesses.join(",");
  updateHangmanImage(currentPlayer.incorrectGuesses.length);
}

function submitLetter() {
  const letterInput = document.getElementById("enterALetter");

  const letter = letterInput.value.toUpperCase();
  letterInput.value = "";

  if (
    currentPlayer.correctGuesses.includes(letter) ||
    currentPlayer.incorrectGuesses.includes(letter)
  ) {
    return;
  }

  const hit = randomWord.includes(letter);
  if (hit) {
    currentPlayer.correctGuesses.push(letter);
    wordDisplay.innerText = printHidenWord(
      currentPlayer.randomWord,
      currentPlayer.correctGuesses
    );

    const won = currentPlayer.randomWord.every((letter) =>
      currentPlayer.correctGuesses.includes(letter)
    );
    if (won) {
      window.location.href = "../Pages/wordwin.html";
    }
  } else {
    currentPlayer.incorrectGuesses.push(letter);
    incorrectDisplay.innerText = currentPlayer.incorrectGuesses.join(",");

    updateHangmanImage(currentPlayer.incorrectGuesses.length);

    if (currentPlayer.incorrectGuesses.length == 6) {
      currentPlayer.randomWord = "";
      currentPlayer.correctGuesses = [];
      currentPlayer.incorrectGuesses = [];
      localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));

      setTimeout(() => {
        window.location.href = "../Pages/loseword.html";
      }, 3000);
    }
  }

  localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
}

function printHidenWord(word, correctGuesses) {
  let wordStatus = word.map((letter) => {
    if (correctGuesses.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  });

  return wordStatus.join(" ");
}

function updateHangmanImage(numErrors) {
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
