import * as config from "../config/config.js";

const createNewFighter = function (type, name = "fighter", stats) {
  return {
    name,
    type,
    moves: { attack: "", defense: "" },
    maxHealth: config.playerBaseStats.healthPoints,
    health: config.playerBaseStats.healthPoints,
  };
};

export const gameState = {
  type: "",
  result: "",
  winner: "",
  stage: "",
  hitCoefficients: [
    config.playerBaseStats.minHit,
    config.playerBaseStats.maxHit,
  ],
};

const hitForceCount = (min, max, modifier = 1) => {
  const base = min + Math.random() * (max - min) * modifier;
  return Math.ceil(base);
};

//simulate bot's chose for move by giving index of input
export const moveSimulation = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};

export const fightState = {
  fighters: [],
};

export const markPlayersMoves = (p1Moves, p2Moves) => {
  fightState.fighters[0].moves.attack = p1Moves[0].value.split("-")[0];
  fightState.fighters[0].moves.defense = p1Moves[1].value.split("-")[0];
  fightState.fighters[1].moves.attack = p2Moves[0].value.split("-")[0];
  fightState.fighters[1].moves.defense = p2Moves[1].value.split("-")[0];
};

export const endGameCheck = () => {
  if (
    fightState.fighters[0].health <= 0 &&
    fightState.fighters[1].health <= 0
  ) {
    gameState.result = "draw";
    gameState.stage = "ended";
    return true;
  }
  if (
    fightState.fighters[0].health <= 0 ||
    fightState.fighters[1].health <= 0
  ) {
    gameState.result = "won";
    gameState.stage = "ended";
    gameState.winner =
      fightState.fighters[0].health > fightState.fighters[1].health ? "1" : "2";
    return true;
  }
  return false;
};

export const preparePvpModel = () => {
  gameState.type = "pvp";
  gameState.stage = "ingame";
  fightState.fighters.push(createNewFighter("player", "fighter 1"));
  fightState.fighters.push(createNewFighter("player", "fighter 2"));
};

export const preparePveModel = () => {
  gameState.type = "pve";
  gameState.stage = "ingame";
  fightState.fighters.push(createNewFighter("player", "fighter 1"));
  fightState.fighters.push(createNewFighter("bot", "Bot 1"));
};

export const prepareEveModel = () => {
  gameState.type = "eve";
  gameState.stage = "ingame";
  fightState.fighters.push(createNewFighter("bot", "Bot 1"));
  fightState.fighters.push(createNewFighter("bot", "Bot 2"));
};

const checkBlocked = (move1, move2) => {
  if (move1 === move2) return true;
  return false;
};

export const addDamageToPlayers = () => {
  let p1Hit = +hitForceCount(...gameState.hitCoefficients);
  p1Hit = checkBlocked(
    fightState.fighters[0].moves.attack,
    fightState.fighters[1].moves.defense,
  )
    ? p1Hit * 0.5
    : p1Hit;
  let p2Hit = +hitForceCount(...gameState.hitCoefficients);
  p2Hit = checkBlocked(
    fightState.fighters[1].moves.attack,
    fightState.fighters[0].moves.defense,
  )
    ? p2Hit * 0.5
    : p2Hit;

  fightState.fighters[0].health -= p2Hit;
  fightState.fighters[1].health -= p1Hit;
  fightState.fighters[0].lastTakenDamage = p2Hit;
  fightState.fighters[1].lastTakenDamage = p1Hit;
};

export const cleanStats = () => {
  fightState.fighters = [];
  gameState.stage = "";
  gameState.result = "";
  gameState.winner = "";
};
