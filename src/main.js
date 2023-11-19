import "./js/controller/fightTypeController.js";

const hugButton = document.querySelector(".fight-btn");
const announcementPlace = document.querySelector(".battlefield-announcement");
const form = document.forms.namedItem("fighters-form");
const playerOne = form.querySelector(".fighters-player1");
const playerTwo = form.querySelector(".fighters-player2");

const fullBodyOne = Array.from(
  playerOne.querySelectorAll(`input[type = "radio"]`),
);
const fullBodyTwo = Array.from(
  playerTwo.querySelectorAll(`input[type = "radio"]`),
);

let fighters = [];

const activateEndGame = () => {
  //reset announcer and fighters container
  announcementPlace.textContent = "Let's begin";
  fighters = [];
  //reset checkboxes
  fullBodyOne.forEach((checkbox) => (checkbox.checked = false));
  fullBodyTwo.forEach((checkbox) => (checkbox.checked = false));
  //renew data for each fighter
  // nextStart();
  //block hug button
  hugButton.textContent = "hug!";
  hugButton.disabled = true;
};

hugButton.addEventListener("click", (e) => {
  if (e.target.textContent === "restart") activateEndGame();
});
