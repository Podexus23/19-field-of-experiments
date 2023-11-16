const hugButton = document.querySelector(".fight-btn");
const form = document.forms.namedItem("fighters-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerOne = form.querySelector(".fighters-player1");
  const playerTwo = form.querySelector(".fighters-player2");
  const bodyPartOne = Array.from(
    playerOne.querySelectorAll(`input[type = "radio"]`)
  ).filter((part) => part.checked)[0].value;
  const bodyPartTwo = Array.from(
    playerTwo.querySelectorAll(`input[type = "radio"]`)
  ).filter((part) => part.checked)[0].value;

  console.log(bodyPartOne, bodyPartTwo);
});
