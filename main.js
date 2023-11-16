const hugButton = document.querySelector(".fight-btn");
const form = document.forms.namedItem("fighters-form");
const hitNumbers = [3, 0, 1]; // for now =)

const fightMoveHandler = (e) => {
  e.preventDefault();
  console.log(partOne, partTwo);
};

const hitForceCount = (max, min, modifier) => {
  return (min + Math.random() * (max - min + 1)) * modifier;
};

const handleFightMove = function () {
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
  let partOne, partTwo;

  const fightMoveHandler = (e) => {
    e.preventDefault();
    //remove HP on each of players
    const firstPlayerHitForce = hitForceCount(...hitNumbers).toFixed(2);
    const secondPlayerHitForce = hitForceCount(...hitNumbers).toFixed(2);
    playerOneHealth.textContent = (
      +playerOneHealth.textContent - +firstPlayerHitForce
    ).toFixed(2);
    playerTwoHealth.textContent = (
      +playerTwoHealth.textContent - +secondPlayerHitForce
    ).toFixed(2);
    //clean hit checkboxes
    fullBodyOne.forEach((checkbox) => (checkbox.checked = false));
    fullBodyTwo.forEach((checkbox) => (checkbox.checked = false));
    //disable button
    hugButton.disabled = true;
    console.log(partOne, partTwo);
  };

  form.addEventListener("submit", fightMoveHandler);

  form.addEventListener("change", (e) => {
    partOne = fullBodyOne.filter((part) => part.checked)[0]?.value;
    partTwo = fullBodyTwo.filter((part) => part.checked)[0]?.value;

    if (fullBodyOne && fullBodyTwo) hugButton.disabled = false;
    console.log(partOne, partTwo);
  });
};

let init = function () {
  handleFightMove();
};
init();
