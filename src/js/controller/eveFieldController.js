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
    const attackParts = botMoves.filter((move) => move.value.includes("atk"));
    const defenseParts = botMoves.filter((move) => move.value.includes("def"));
    const chosenAtkPart = Math.floor(Math.random() * attackParts.length);
    const chosenDefPart = Math.floor(Math.random() * defenseParts.length);
    setTimeout(() => {
      view.activateMove(attackParts[chosenAtkPart]);
    }, 0);
    setTimeout(() => {
      view.activateMove(defenseParts[chosenDefPart]);
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
      model.prepareModel("eve");
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
