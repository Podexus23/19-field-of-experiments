import * as config from "../config/config.js";

const createNewFighter = function (type, name = "fighter", stats) {
  return {
    name,
    type,
    maxHealth: config.playerBaseStats.healthPoints,
    health: config.playerBaseStats.healthPoints,
  };
};

const gameState = {
  type: "",
};

const fightState = {
  fighters: [],
};

export const preparePVPFight = () => {
  gameState.type = "pvp";
  fightState.fighters.push(createNewFighter("player"));
  fightState.fighters.push(createNewFighter("player"));
  console.log("PvP Model is On");
  console.log(fightState);
};
