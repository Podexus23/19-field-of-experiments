import * as hitLogger from "../view/loggerView.js";

export default function (field, model, view) {
  const form = field.querySelector("#fighters-form");
  const hugButton = field.querySelector(".fight-btn");

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

  // const checkPlayerMoves = () => {
  //   const partOne = allPartsP1.filter((part) => part.checked)[0]?.value;
  //   if (partOne) view.enableHugBtn();
  // };

  const makeMoveCycle = () => {
    model.countDamage();
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
      view.prepareEveView(field, model.fightState);
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

  return { runGame, cleanEveListeners };
}
