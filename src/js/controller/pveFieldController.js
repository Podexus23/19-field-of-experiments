import { timers } from "../config/config.js";
import * as hitLogger from "../view/loggerView.js";

export default function (
  field,
  model = [],
  view = [],
  eventRemover = [],
  restart,
) {
  let form = field.querySelector("#fighters-form");
  let hugButton = field.querySelector(".fight-btn");
  let firstPlayerMoves, secondPlayerMoves;

  const checkPlayerMoves = () => {
    const allPartsP1 = Array.from(
      form.querySelectorAll(`.fighters-player1 input[type="radio"]`),
    );

    secondPlayerMoves = Array.from(
      form.querySelectorAll(`.fighters-player2 input[type="radio"]`),
    );

    const partOne = allPartsP1.filter((part) => part.checked);
    if (partOne.length === 2) {
      firstPlayerMoves = partOne;
      view.enableHugBtn();
    }
  };

  const createBotMoves = (botMoves) => {
    const attack = botMoves.filter((move) => move.value.includes("atk"));
    const defense = botMoves.filter((move) => move.value.includes("def"));
    const baseAtk = Math.floor(Math.random() * attack.length);
    const baseDef = Math.floor(Math.random() * defense.length);
    console.log(baseAtk, baseDef);
    setTimeout(() => {
      view.activateMove(attack[baseAtk]);
    }, timers.moveTimer);
    setTimeout(() => {
      view.activateMove(defense[baseDef]);
    }, timers.moveTimer * 2);
  };

  const makeMoveCycle = () => {
    createBotMoves(secondPlayerMoves);

    setTimeout(() => {
      secondPlayerMoves = secondPlayerMoves.filter((part) => part.checked);
      model.markPlayersMoves(firstPlayerMoves, secondPlayerMoves);
      model.addDamageToPlayers();
      view.updateHp(model.fightState.fighters);
    }, timers.moveTimer * 3);

    // hitLogger.logger(model.fightState);

    setTimeout(() => {
      if (model.endGameCheck()) {
        view.prepareEndOfTheGame(field, model.gameState);
      } else {
        view.prepareNextMove(field);
      }
    }, timers.endRoundTimer);
  };

  const handleHugButton = function (e) {
    if (e.target === hugButton && model.gameState.stage === "ingame") {
      e.preventDefault();
      makeMoveCycle();
    } else if (e.target === hugButton && model.gameState.stage === "ended") {
      e.preventDefault();
      // hitLogger.cleanLogger();
      model.cleanStats();
      model.preparePveModel();
      view.removeField(field);
      return restart();
    }
  };

  const runGame = () => {
    form.addEventListener("change", checkPlayerMoves);
    field.addEventListener("click", handleHugButton);
  };

  function cleanPveListeners() {
    form.removeEventListener("change", checkPlayerMoves);
    field.removeEventListener("click", handleHugButton);
  }

  const startNewGame = () => {
    runGame();
    eventRemover.push(cleanPveListeners);
  };
  startNewGame();

  return { runGame, cleanPveListeners };
}
