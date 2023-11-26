import * as baseModel from "../model/baseModel.js";
import * as asideView from "../view/asideView.js";
import * as fieldView from "../view/fieldView.js";
import pvpController from "./pvpFieldController.js";
import pveController from "./pveFieldController.js";
import eveController from "./eveFieldController.js";

const asideBlock = document.querySelector(".aside");
let battleField;

const eventsToRemove = [];

const startPvPFight = () => {
  //clean after previous games
  baseModel.cleanStats();
  baseModel.preparePvpModel();
  battleField = fieldView.prepareView(baseModel.fightState.fighters);
  pvpController(
    battleField,
    baseModel,
    fieldView,
    eventsToRemove,
    startPvPFight,
  );
};

const startPvEFight = () => {
  baseModel.cleanStats();
  baseModel.preparePveModel();
  battleField = fieldView.prepareView(baseModel.fightState.fighters);
  pveController(
    battleField,
    baseModel,
    fieldView,
    eventsToRemove,
    startPvEFight,
  );
};

const startEvEFight = () => {
  baseModel.cleanStats();
  baseModel.prepareEveModel();
  battleField = fieldView.prepareView(baseModel.fightState.fighters);
  eveController(
    battleField,
    baseModel,
    fieldView,
    eventsToRemove,
    startEvEFight,
  );
};

asideBlock.addEventListener("click", (e) => {
  if (!e.target.closest(".game-type-btn")) return;
  if (e.target.classList.contains("active")) return;

  if (eventsToRemove.length) {
    eventsToRemove.forEach((remover) => remover());
    fieldView.removeField(battleField);
  }

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
