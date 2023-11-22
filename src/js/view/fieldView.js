const generateBattlefield = function () {
  const battlefield = document.createElement("section");
  battlefield.classList.add("battlefield", "flex", "flex-col");

  const p = document.createElement("p");
  p.classList.add("battlefield-announcement", "text-center");
  p.textContent = "Let's begin";
  battlefield.insertAdjacentElement("afterbegin", p);

  const button = document.createElement("button");
  button.classList.add(
    "fight-btn",
    "cursor-pointer",
    "bg-blue-300",
    "p-2",
    "transition-colors",
    "hover:bg-slate-600",
    "disabled:bg-zinc-500",
  );
  button.setAttribute("type", "submit");
  button.setAttribute("form", "fighters-form");
  button.textContent = "Hug!";

  battlefield.insertAdjacentElement("beforeend", button);

  document.querySelector("main").append(battlefield);
  return battlefield;
};

console.log(generateBattlefield());

export const preparePvpView = (field, state) => {
  const announcePlace = document.querySelector(".battlefield-announcement");
  const hugButton = field.querySelector(".fight-btn");
  const playerOneHealth = field.querySelector(
    ".fighters-player1 .player-health",
  );
  const playerTwoHealth = field.querySelector(
    ".fighters-player2 .player-health",
  );

  playerOneHealth.querySelector(".health-is").textContent =
    state.fighters[0].health;
  playerOneHealth.querySelector(".health-max").textContent =
    state.fighters[0].maxHealth;
  playerTwoHealth.querySelector(".health-is").textContent =
    state.fighters[1].health;
  playerTwoHealth.querySelector(".health-max").textContent =
    state.fighters[1].maxHealth;

  field.querySelector(".p1-controls").classList.remove("hidden");
  field.querySelector(".p2-controls").classList.remove("hidden");

  announcePlace.textContent = `Let's Begin`;
  hugButton.textContent = "Hug!";
  hugButton.disabled = true;
};

export const preparePveView = (field, state) => {
  const announcePlace = document.querySelector(".battlefield-announcement");
  const hugButton = field.querySelector(".fight-btn");
  const playerOneHealth = field.querySelector(
    ".fighters-player1 .player-health",
  );
  const playerTwoHealth = field.querySelector(
    ".fighters-player2 .player-health",
  );

  playerOneHealth.querySelector(".health-is").textContent =
    state.fighters[0].health;
  playerOneHealth.querySelector(".health-max").textContent =
    state.fighters[0].maxHealth;
  playerTwoHealth.querySelector(".health-is").textContent =
    state.fighters[1].health;
  playerTwoHealth.querySelector(".health-max").textContent =
    state.fighters[1].maxHealth;

  field.querySelector(".p1-controls").classList.remove("hidden");
  field.querySelector(".p2-controls").classList.add("hidden");

  announcePlace.textContent = `Let's Begin`;
  hugButton.textContent = "Hug!";
  hugButton.disabled = true;
};

export const prepareEveView = (field, state) => {
  const announcePlace = document.querySelector(".battlefield-announcement");
  const hugButton = field.querySelector(".fight-btn");
  const playerOneHealth = field.querySelector(
    ".fighters-player1 .player-health",
  );
  const playerTwoHealth = field.querySelector(
    ".fighters-player2 .player-health",
  );

  playerOneHealth.querySelector(".health-is").textContent =
    state.fighters[0].health;
  playerOneHealth.querySelector(".health-max").textContent =
    state.fighters[0].maxHealth;
  playerTwoHealth.querySelector(".health-is").textContent =
    state.fighters[1].health;
  playerTwoHealth.querySelector(".health-max").textContent =
    state.fighters[1].maxHealth;

  field.querySelector(".p1-controls").classList.add("hidden");
  field.querySelector(".p2-controls").classList.add("hidden");

  announcePlace.textContent = `Let's Begin`;
  hugButton.textContent = "Hug!";
  hugButton.disabled = false;
};

export const enableHugBtn = () => {
  const button = document.querySelector(".fight-btn");
  button.disabled = false;
};

export const disableHugBtn = () => {
  const button = document.querySelector(".fight-btn");
  button.disabled = true;
};

export const updateHp = (fighters) => {
  document.querySelector(".fighters-player1 .health-is").textContent =
    fighters[0].health;
  document.querySelector(".fighters-player2 .health-is").textContent =
    fighters[1].health;
};

export const prepareNextMove = (field) => {
  const allParts = Array.from(
    field.querySelectorAll(`#fighters-form input[type="radio"]`),
  );

  allParts.forEach((checkbox) => (checkbox.checked = false));
  disableHugBtn();
};

export const prepareEndOfTheGame = (field, state) => {
  const announcePlace = document.querySelector(".battlefield-announcement");
  const hugButton = field.querySelector(".fight-btn");

  if (state.result === "draw") {
    announcePlace.textContent = "Draw";
    hugButton.textContent = "restart";
  }

  if (state.result === "won") {
    announcePlace.textContent = `Winner is player №${state.winner}`;
    hugButton.textContent = "restart";
  }
};
