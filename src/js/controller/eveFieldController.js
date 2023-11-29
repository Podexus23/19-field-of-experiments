import { timers } from "../config/config.js";
import * as hitLogger from "../view/loggerView.js";

export default function (
  field,
  model = [],
  view = [],
  eventRemover = [],
  restart,
) {
  const form = field.querySelector("#fighters-form");
  const hugButton = field.querySelector(".fight-btn");
  let firstPlayerMoves, secondPlayerMoves;

  //for da future
  const checkPlayerMoves = () => {
    firstPlayerMoves = Array.from(
      form.querySelectorAll(`.fighters-player1 input[type="radio"]`),
    );
    secondPlayerMoves = Array.from(
      form.querySelectorAll(`.fighters-player2 input[type="radio"]`),
    );
    return [firstPlayerMoves, secondPlayerMoves];
  };

  const createBotMoves = (botMoves) => {
    const attack = botMoves.filter((move) => move.value.includes("atk"));
    const defense = botMoves.filter((move) => move.value.includes("def"));
    const baseAtk = Math.floor(Math.random() * attack.length);
    const baseDef = Math.floor(Math.random() * defense.length);
    console.log(baseAtk, baseDef);
    setTimeout(() => {
      view.activateMove(attack[baseAtk]);
    }, 0);
    setTimeout(() => {
      view.activateMove(defense[baseDef]);
    }, timers.moveTimer * 3);
  };

  const makeMoveCycle = () => {
    const [p1Moves, p2Moves] = checkPlayerMoves();
    createBotMoves(p1Moves);
    createBotMoves(p2Moves);

    setTimeout(() => {
      firstPlayerMoves = firstPlayerMoves.filter((part) => part.checked);
      secondPlayerMoves = secondPlayerMoves.filter((part) => part.checked);
      model.markPlayersMoves(firstPlayerMoves, secondPlayerMoves);
      model.addDamageToPlayers();
      view.updateHp(model.fightState.fighters);
      if (model.endGameCheck()) {
        view.prepareEndOfTheGame(field, model.gameState);
      }
    }, timers.moveTimer * 5);
  };

  const handleHugButton = function (e) {
    let intervalId;
    if (e.target === hugButton && model.gameState.stage === "ingame") {
      e.preventDefault();
      //fck mess
      intervalId = setInterval(() => {
        if (model.endGameCheck()) {
          clearInterval(intervalId);
          return;
        }
        makeMoveCycle();
      }, timers.endRoundTimer);
    } else if (e.target === hugButton && model.gameState.stage === "ended") {
      e.preventDefault();
      // hitLogger.cleanLogger();
      model.cleanStats();
      model.prepareEveModel();
      view.removeField(field);
      return restart();
    }
  };

  const runGame = () => {
    // form.addEventListener("change", checkPlayerMoves);
    field.addEventListener("click", handleHugButton);
  };

  function cleanEveListeners() {
    // form.removeEventListener("change", checkPlayerMoves);
    field.removeEventListener("click", handleHugButton);
  }

  const startNewGame = () => {
    runGame();
    view.enableHugBtn();
    eventRemover.push(cleanEveListeners);
  };
  startNewGame();

  return { runGame, cleanEveListeners };
}
