const createBattlefield = function () {
  const battlefield = document.createElement("section");
  battlefield.classList.add("battlefield", "flex", "flex-col");

  const form = document.createElement("form");
  form.classList.add("battlefield-fighters", "flex", "gap-10");
  form.setAttribute("id", "fighters-form");
  battlefield.insertAdjacentElement("afterbegin", form);

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
  button.disabled = true;
  button.textContent = "Hug!";

  battlefield.insertAdjacentElement("beforeend", button);

  return battlefield;
};

const createPlayer = (fighterData, fighterNum) => {
  const bodyParts = {
    head: {
      name: "head",
      value: "head",
    },
    torso: {
      name: "torso",
      value: "torso",
    },
    legs: {
      name: "legs",
      value: "legs",
    },
  };
  const controlElemsHTML = Object.keys(bodyParts)
    .map((part) => {
      return `
        <div class="w-full transition-colors hover:bg-teal-500">
          <input
            type="radio"
            class="peer ml-2 hidden"
            name="player-${fighterNum}"
            id="${part}-${fighterNum}"
            value="${part}"
          />
          <label
            class="inline-block w-full cursor-pointer transition-colors peer-checked:bg-red-500"
            for="${part}-${fighterNum}"
            >${part}</label
          >
        </div>`;
    })
    .join("");
  const player = `
    <div class="fighters-player${fighterNum} text-center">
      <h3>${fighterData.name}</h3>
      <img
        class="player-picture h-60"
        src="/assets/png/Player ${fighterNum}.png" 
        alt="face of insanity"
      />
      <div class="p${fighterNum}-controls flex flex-col">
        ${fighterData.type === "bot" ? "" : controlElemsHTML}
      </div>
      <p class="player-health">
        <span class="health-is">${
          fighterData.health
        }</span>/<span class="health-max"
          >${fighterData.maxHealth}</span>
      </p>
    </div>`;
  return player;
};

const addPlayersOnField = (field, playersData) => {
  playersData
    .map((player, i) => createPlayer(player, i + 1))
    .forEach((data) => {
      field.querySelector("form").insertAdjacentHTML("beforeend", data);
    });
};

export const preparePvpView = (playersData) => {
  const field = createBattlefield();
  document.querySelector("main").append(field);
  addPlayersOnField(field, playersData);
  return field;
};

export const preparePveView = (playersData) => {
  const field = createBattlefield();
  document.querySelector("main").append(field);
  addPlayersOnField(field, playersData);
  return field;
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

export const removeField = (field) => {
  document.querySelector("main").removeChild(field);
};
