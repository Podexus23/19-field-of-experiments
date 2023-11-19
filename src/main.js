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
