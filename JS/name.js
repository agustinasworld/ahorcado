const nicknameDisplay = document.getElementById("nicknameDisplay");
const btnNext = document.getElementById("btnNext");

btnNext.addEventListener("click", saveName);

// on page load, check if player is saved
const savedPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
if (savedPlayer != null) {
  nicknameDisplay.value = savedPlayer.nickname;
}

function saveName() {
  const nickname = nicknameDisplay.value;

  if (savedPlayer == null || nickname != savedPlayer.nickname) {
    const currentPlayer = {
      nickname: nickname,
      correctGuesses: [],
      incorrectGuesses: [],
      randomWord: "",
    };
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
  }
}
