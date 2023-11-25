import * as baseModel from "../model/baseModel.js";
import * as asideView from "../view/asideView.js";
import * as fieldView from "../view/fieldView.js";
import pvpController from "./pvpFieldController.js";
import pveController from "./pveFieldController.js";
import eveController from "./eveFieldController.js";

const asideBlock = document.querySelector(".aside");
const battleField = document.querySelector(".battlefield");

const eventsToRemove = [];

const startPvPFight = () => {
  //clean after previous games
  baseModel.cleanStats();
  baseModel.preparePvpModel();
  const battlefield = fieldView.prepareView(baseModel.fightState.fighters);
  pvpController(
    battlefield,
    baseModel,
    fieldView,
    eventsToRemove,
    startPvPFight,
  );
};

const startPvEFight = () => {
  baseModel.cleanStats();
  baseModel.preparePveModel();
  const battlefield = fieldView.prepareView(baseModel.fightState.fighters);
  pveController(
    battlefield,
    baseModel,
    fieldView,
    eventsToRemove,
    startPvEFight,
  );
};

const startEvEFight = () => {
  baseModel.cleanStats();
  baseModel.prepareEveModel();
  const battlefield = fieldView.prepareView(baseModel.fightState.fighters);
  eveController(
    battlefield,
    baseModel,
    fieldView,
    eventsToRemove,
    startEvEFight,
  );
};

asideBlock.addEventListener("click", (e) => {
  if (!e.target.closest(".game-type-btn")) return;
  if (e.target.classList.contains("active")) return;

  if (eventsToRemove.length) eventsToRemove.forEach((remover) => remover());

  if (e.target.classList.contains("player-vs-player-btn")) {
    console.log("hi");
    asideView.makeActiveBtn(e.target);
    startPvPFight();
  }
  if (e.target.classList.contains("player-vs-bot-btn")) {
    asideView.makeActiveBtn(e.target);
    startPvEFight();
  }
  if (e.target.classList.contains("bot-vs-bot-btn")) {
    asideView.makeActiveBtn(e.target);
    startEvEFight();
  }
});
