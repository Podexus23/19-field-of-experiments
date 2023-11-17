const hugButton = document.querySelector(".fight-btn");
const announcementPlace = document.querySelector(".battlefield-announcement");
const form = document.forms.namedItem("fighters-form");
const playerOne = form.querySelector(".fighters-player1");
const playerTwo = form.querySelector(".fighters-player2");
const playerOneHealth = playerOne.querySelector(".player-1__health");
const playerTwoHealth = playerTwo.querySelector(".player-2__health");
const fullBodyOne = Array.from(
  playerOne.querySelectorAll(`input[type = "radio"]`)
);
const fullBodyTwo = Array.from(
  playerTwo.querySelectorAll(`input[type = "radio"]`)
);

const hitNumbers = [3, 0, 1]; // for now =)

const fightMoveHandler = (e) => {
  e.preventDefault();
  console.log(partOne, partTwo);
};

const hitForceCount = (max, min, modifier) => {
  return (min + Math.random() * (max - min + 1)) * modifier;
};

const activateEndGame = () => {
  //reset announcer
  announcementPlace.textContent = "";
  //reset checkboxes
  fullBodyOne.forEach((checkbox) => (checkbox.checked = false));
  fullBodyTwo.forEach((checkbox) => (checkbox.checked = false));
  //renew HP for each player
  playerOneHealth.textContent = 10;
  playerTwoHealth.textContent = 10;
  //block hug button
  hugButton.textContent = "hug!";
  hugButton.disabled = true;
};

const handleFightMove = function () {
  let partOne, partTwo;

  const fightMoveHandler = (e) => {
    e.preventDefault();
    //remove HP on each of players
    const firstPlayerHitForce = hitForceCount(...hitNumbers).toFixed(2);
    const secondPlayerHitForce = hitForceCount(...hitNumbers).toFixed(2);
    let playerOneHP = +playerOneHealth.textContent;
    let playerTwoHP = +playerTwoHealth.textContent;
    playerOneHP -= +firstPlayerHitForce;
    playerTwoHP -= +secondPlayerHitForce;
    playerOneHealth.textContent = playerOneHP.toFixed(2);
    playerTwoHealth.textContent = playerTwoHP.toFixed(2);
    //endgame check
    if (playerOneHP <= 0 && playerTwoHP <= 0) {
      announcementPlace.textContent = "Draw";
      hugButton.textContent = "restart";
      return;
    }
    if (playerOneHP <= 0 || playerTwoHP <= 0) {
      announcementPlace.textContent = `Won player ${
        playerOneHP > playerTwoHP ? "1" : "2"
      }`;
      hugButton.textContent = "restart";
      return;
    }
    //continue game

    //clean hit checkboxes
    fullBodyOne.forEach((checkbox) => (checkbox.checked = false));
    fullBodyTwo.forEach((checkbox) => (checkbox.checked = false));
    //disable hug button
    hugButton.disabled = true;
  };

  form.addEventListener("submit", fightMoveHandler);

  form.addEventListener("change", (e) => {
    partOne = fullBodyOne.filter((part) => part.checked)[0]?.value;
    partTwo = fullBodyTwo.filter((part) => part.checked)[0]?.value;
    if (partOne && partTwo) hugButton.disabled = false;
  });
};

hugButton.addEventListener("click", (e) => {
  if (e.target.textContent === "restart") activateEndGame();
});

let init = function () {
  handleFightMove();
};
init();
