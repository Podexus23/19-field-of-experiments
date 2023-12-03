import * as config from "../config/config.js";
import { Fighter } from "../Classes/Fighter.js";

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

export const fightState = {
  fighters: [],
};

export const markPlayersMoves = (p1Moves, p2Moves) => {
  fightState.fighters[0].markMoves(
    p1Moves[0].value.split("-")[0],
    p1Moves[1].value.split("-")[0],
  );
  fightState.fighters[1].markMoves(
    p2Moves[0].value.split("-")[0],
    p2Moves[1].value.split("-")[0],
  );
};

export const endGameCheck = () => {
  if (fightState.fighters[0].hp <= 0 && fightState.fighters[1].hp <= 0) {
    gameState.result = "draw";
    gameState.stage = "ended";
    return true;
  }
  if (fightState.fighters[0].hp <= 0 || fightState.fighters[1].hp <= 0) {
    gameState.result = "won";
    gameState.stage = "ended";
    gameState.winner =
      fightState.fighters[0].hp > fightState.fighters[1].hp ? "1" : "2";
    return true;
  }
  return false;
};

// export const preparePvpModel = () => {
//   gameState.type = "pvp";
//   gameState.stage = "ingame";
//   fightState.fighters.push(new Fighter("fighter 1", "player"));
//   fightState.fighters.push(new Fighter("fighter 2", "player"));
// };

// export const preparePveModel = () => {
//   gameState.type = "pve";
//   gameState.stage = "ingame";
//   fightState.fighters.push(new Fighter("fighter 1", "player"));
//   fightState.fighters.push(new Fighter("Bot 1", "bot"));
//   console.log(fightState);
// };

// export const prepareEveModel = () => {
//   gameState.type = "eve";
//   gameState.stage = "ingame";
//   fightState.fighters.push(new Fighter("Bot 1", "bot"));
//   fightState.fighters.push(new Fighter("Bot 2", "bot"));
// };

export const prepareModel = (type) => {
  gameState.type = type;
  gameState.stage = "ingame";
  switch (type) {
    case "pvp":
      {
        fightState.fighters.push(new Fighter("fighter 1", "player"));
        fightState.fighters.push(new Fighter("fighter 2", "player"));
      }
      break;

    case "pve":
      {
        fightState.fighters.push(new Fighter("fighter 1", "player"));
        fightState.fighters.push(new Fighter("Bot 1", "bot"));
      }
      break;

    case "eve":
      {
        fightState.fighters.push(new Fighter("Bot 1", "bot"));
        fightState.fighters.push(new Fighter("Bot 2", "bot"));
      }
      break;

    //pvp
    default:
      {
        fightState.fighters.push(new Fighter("fighter 1", "player"));
        fightState.fighters.push(new Fighter("fighter 2", "player"));
      }
      break;
  }
};

export const addDamageToPlayers = () => {
  const [p1, p2] = fightState.fighters;
  p1.takeDamage(p2.moves.attack, p2.damage);
  p2.takeDamage(p1.moves.attack, p1.damage);
};

export const cleanStats = () => {
  fightState.fighters = [];
  gameState.stage = "";
  gameState.result = "";
  gameState.winner = "";
};
