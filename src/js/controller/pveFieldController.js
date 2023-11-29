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

  const checkPlayerMoves = () => {
    const allPartsP1 = Array.from(
      form.querySelectorAll(`.fighters-player1 input[type="radio"]`),
    );

    /*for now damage counter is completely fake,
     * so it does'n matter whitch part of body we hitting,
     */
    //! remake damage counter for bot
    const allPartsP2 = Array.from(
      form.querySelectorAll(`.fighters-player2 input[type="radio"]`),
    );

    const partOne = allPartsP1.filter((part) => part.checked);
    if (partOne.length === 2) view.enableHugBtn();
  };

  const makeMoveCycle = () => {
    model.addDamageToPlayers();
    view.updateHp(model.fightState.fighters);
    hitLogger.logger(model.fightState);

    if (model.endGameCheck()) {
      view.prepareEndOfTheGame(field, model.gameState);
    } else view.prepareNextMove(field);
  };

  const handleHugButton = function (e) {
    if (e.target === hugButton && model.gameState.stage === "ingame") {
      e.preventDefault();
      setTimeout(makeMoveCycle, 1000);
    } else if (e.target === hugButton && model.gameState.stage === "ended") {
      e.preventDefault();
      hitLogger.cleanLogger();
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
