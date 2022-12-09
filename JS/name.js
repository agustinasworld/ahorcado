const nicknameDisplay = document.getElementById("nicknameDisplay");
const btnNext = document.getElementById("btnNext");
btnNext.addEventListener("click", saveName);

// on page load, check if player is saved
const savedPlayerNickname = sessionStorage.getItem("current_player_nickname");
if (savedPlayerNickname != null && savedPlayerNickname != undefined) {
  nicknameDisplay.value = savedPlayerNickname;
}

function saveName() {
  console.log("nicknameDisplay.value", nicknameDisplay.value);
  sessionStorage.setItem("current_player_nickname", nicknameDisplay.value);
}
