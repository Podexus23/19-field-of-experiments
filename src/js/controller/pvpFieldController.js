import * as hitLogger from "../view/loggerView.js";

export default function (field, model, view) {
  const form = field.querySelector("#fighters-form");
  const hugButton = field.querySelector(".fight-btn");

  const allPartsP1 = Array.from(
    form.querySelectorAll(`.fighters-player1 input[type="radio"]`),
  );
  const allPartsP2 = Array.from(
    form.querySelectorAll(`.fighters-player2 input[type="radio"]`),
  );

  const checkPlayerMoves = () => {
    const partOne = allPartsP1.filter((part) => part.checked)[0]?.value;
    const partTwo = allPartsP2.filter((part) => part.checked)[0]?.value;
    if (partOne && partTwo) view.enableHugBtn();
  };

  const makeMoveCycle = () => {
    model.countDamage();
    view.updateHp(model.fightState.fighters);
    hitLogger.logger(model.fightState);
    if (model.endGameCheck()) {
      view.prepareEndOfTheGame(field, model.gameState);
    } else view.prepareNextMove(field);
  };

  //! find a place to remove handlers
  form.addEventListener("change", checkPlayerMoves);
  field.addEventListener("click", (e) => {
    if (e.target === hugButton && model.gameState.stage === "ingame") {
      e.preventDefault();
      makeMoveCycle();
    } else if (e.target === hugButton && model.gameState.stage === "ended") {
      e.preventDefault();
      hitLogger.cleanLogger();
      model.cleanStats();
      model.preparePvpModel();
      view.preparePvpView(field, model.fightState);
      view.prepareNextMove(field);
    }
  });
}
