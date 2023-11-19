import * as baseModel from "../model/baseModel.js";
import * as asideView from "../view/asideView.js";
import * as fieldView from "../view/fieldView.js";

import "../view/fieldView.js";
import pvpFieldController from "./pvpFieldController.js";

const asideBlock = document.querySelector(".aside");
const battleField = document.querySelector(".battlefield");

const startPvPFight = () => {
  console.log(`i'm doing my part as PvP controller`);
  baseModel.preparePVPFight();
  pvpFieldController(battleField, baseModel, fieldView);
  // pvpFightView();
  //as default on loading screen
  //say to model that we loading PvP
  //say to view that we loading PvP
};
const startPvEFight = () => {
  console.log(`i'm doing my part as PvE`);
  //as default on loading screen
  //say to model that we loading PvE
  //say to view that we loading PvE
};
const startEvEFight = () => {
  console.log(`i'm doing my part as EvE`);
  //as default on loading screen
  //say to model that we loading EvE
  //say to view that we loading EvE
};

asideBlock.addEventListener("click", (e) => {
  if (!e.target.closest(".game-type-btn")) return;
  if (e.target.classList.contains("active")) return;

  if (e.target.classList.contains("player-vs-player-btn")) {
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
