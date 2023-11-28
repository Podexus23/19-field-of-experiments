import * as config from "../config/config.js";

const createNewFighter = function (type, name = "fighter", stats) {
  return {
    name,
    type,
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

export const countDamage = () => {
  const p1Hit = +hitForceCount(...gameState.hitCoefficients);
  const p2Hit = +hitForceCount(...gameState.hitCoefficients);

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
