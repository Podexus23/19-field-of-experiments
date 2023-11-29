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

  //for da future
  const checkPlayerMoves = () => {
    const allPartsP1 = Array.from(
      form.querySelectorAll(`.fighters-player1 input[type="radio"]`),
    );
    const allPartsP2 = Array.from(
      form.querySelectorAll(`.fighters-player2 input[type="radio"]`),
    );
    const partOne = allPartsP1.filter((part) => part.checked)[0]?.value;
    const partTwo = allPartsP2.filter((part) => part.checked)[0]?.value;
    if (partOne && partTwo) view.enableHugBtn();
  };

  const makeMoveCycle = () => {
    model.addDamageToPlayers();
    view.updateHp(model.fightState.fighters);
    hitLogger.logger(model.fightState);

    if (model.endGameCheck()) {
      view.prepareEndOfTheGame(field, model.gameState);
    }
  };

  const handleHugButton = function (e) {
    let intervalId;
    if (e.target === hugButton && model.gameState.stage === "ingame") {
      e.preventDefault();
      intervalId = setInterval(() => {
        makeMoveCycle();
        if (model.endGameCheck()) clearInterval(intervalId);
      }, 2000);
    } else if (e.target === hugButton && model.gameState.stage === "ended") {
      e.preventDefault();

      hitLogger.cleanLogger();
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
