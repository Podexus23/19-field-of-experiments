const hugButton = document.querySelector(".fight-btn");
const announcementPlace = document.querySelector(".battlefield-announcement");
const form = document.forms.namedItem("fighters-form");
const playerOne = form.querySelector(".fighters-player1");
const playerTwo = form.querySelector(".fighters-player2");
const playerOneHealth = playerOne.querySelector(".player-health");
const playerTwoHealth = playerTwo.querySelector(".player-health");
const fullBodyOne = Array.from(
  playerOne.querySelectorAll(`input[type = "radio"]`),
);
const fullBodyTwo = Array.from(
  playerTwo.querySelectorAll(`input[type = "radio"]`),
);
const botFightBtn = document.querySelector(".fight-vs-bot-btn");

const playerVsPlayerGameFlow = (e) => {
  const partOne = fullBodyOne.filter((part) => part.checked)[0]?.value;
  const partTwo = fullBodyTwo.filter((part) => part.checked)[0]?.value;
  if (partOne && partTwo) hugButton.disabled = false;
};

form.addEventListener("change", playerVsPlayerGameFlow);

let fighters = [];

const fightStatus = {};

const createNewFighter = function (name = "fighter", stats) {
  return {
    name,
    maxHealth: 100,
    health: 100,
  };
};

const nextStart = () => {
  //add fighters
  fighters.push(createNewFighter("Player 1"));
  fighters.push(createNewFighter("Player 2"));
  //put initial health on screen
  playerOneHealth.querySelector(".health-is").textContent = fighters[0].health;
  playerOneHealth.querySelector(".health-max").textContent = fighters[0].health;
  playerTwoHealth.querySelector(".health-is").textContent = fighters[1].health;
  playerTwoHealth.querySelector(".health-max").textContent = fighters[1].health;
};

window.addEventListener("load", nextStart);

//max hit, min hit, modifier(use later)
const hitNumbers = [25, 50, 1]; // for now =)
// const hitNumbers2 = [2, 4, 2]; // for now =)

const hitForceCount = (min, max, modifier) => {
  const base = min + Math.random() * (max - min) * modifier;
  const modifiedBase = base;
  return Math.ceil(modifiedBase);
};

const activateEndGame = () => {
  //reset announcer and fighters container
  announcementPlace.textContent = "Let's begin";
  fighters = [];
  //reset checkboxes
  fullBodyOne.forEach((checkbox) => (checkbox.checked = false));
  fullBodyTwo.forEach((checkbox) => (checkbox.checked = false));
  //renew data for each fighter
  nextStart();
  //block hug button
  hugButton.textContent = "hug!";
  hugButton.disabled = true;
};

const hitLogger = () => {
  const logWindow = document.querySelector(".battle-log");
  if (logWindow.classList.contains("hidden"))
    logWindow.classList.remove("hidden");
  const {
    name: name1,
    maxHealth: maxHp1,
    health: hp1,
    lastTakenDamage: dmgTaken1,
  } = fighters[0];
  const {
    name: name2,
    maxHealth: maxHp2,
    health: hp2,
    lastTakenDamage: dmgTaken2,
  } = fighters[1];

  const firstFighterLog = `<div class="text-sm leading-3">
    <span class="font-bold text-green-700">${name1} (${hp1}/${maxHp1}):</span>
    <span>-${dmgTaken1}</span>
   </div>
  `;
  const secondFighterLog = `<div class="text-sm leading-3">
  <span class="font-bold text-red-700">${name2} (${hp2}/${maxHp2}):</span>
  <span>-${dmgTaken2}</span>
  </div>
  `;

  const oneRoundMsg = `<div class="p-1 pb-0">${secondFighterLog}${firstFighterLog}</div>`;
  logWindow.insertAdjacentHTML("beforeend", oneRoundMsg);
  logWindow.scrollTop = logWindow.scrollHeight - logWindow.clientHeight;
};

const handleFightMove = function () {
  const fightMoveHandler = (e) => {
    e.preventDefault();
    //count damage
    const firstPlayerHitForce = +hitForceCount(...hitNumbers);
    const secondPlayerHitForce = +hitForceCount(...hitNumbers);
    //show damage

    fighters[0].health -= secondPlayerHitForce;
    fighters[1].health -= firstPlayerHitForce;
    fighters[0].lastTakenDamage = secondPlayerHitForce;
    fighters[1].lastTakenDamage = firstPlayerHitForce;
    //show info about round

    playerOneHealth.querySelector(".health-is").textContent =
      fighters[0].health;
    playerTwoHealth.querySelector(".health-is").textContent =
      fighters[1].health;

    hitLogger();
    //endgame check
    if (fighters[0].health <= 0 && fighters[1].health <= 0) {
      announcementPlace.textContent = "Draw";
      hugButton.textContent = "restart";
      return;
    }
    if (fighters[0].health <= 0 || fighters[1].health <= 0) {
      announcementPlace.textContent = `Won player ${
        fighters[0].health > fighters[1].health ? "1" : "2"
      }`;
      hugButton.textContent = "restart";
      return;
    }
    //continue game
    fullBodyOne.forEach((checkbox) => (checkbox.checked = false));
    fullBodyTwo.forEach((checkbox) => (checkbox.checked = false));
    hugButton.disabled = true;
  };

  form.addEventListener("submit", fightMoveHandler);
};

hugButton.addEventListener("click", (e) => {
  if (e.target.textContent === "restart") activateEndGame();
});

let init = function () {
  handleFightMove();
};

init();

botFightBtn.addEventListener("click", () => {
  console.log("hi, bot btn");
  fightStatus.type = "pve";
  const p2Controls = document.querySelector(".p2-controls");
  p2Controls.classList.add("hidden");
  //turn off pvp gameflow
  form.removeEventListener("change", playerVsPlayerGameFlow);
  form.addEventListener("change", playerVsBotGameFlow);
});
