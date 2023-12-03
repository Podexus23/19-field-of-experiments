export const playerBaseStats = {
  statPoints: 20,
  minStatPerSkill: 5,
  maxStatPerSkill: 15,

  healthPoints: 100,
  get minHit() {
    return this.healthPoints * 0.5;
  },
  get maxHit() {
    return this.healthPoints * 0.5;
  },
};

export const bodyParts = ["head", "torso", "legs"];

const bodyPartsObj = {
  head: {
    name: "head",
    value: "head",
  },
  torso: {
    name: "torso",
    value: "torso",
  },
  legs: {
    name: "legs",
    value: "legs",
  },
};

export const timers = {
  moveTimer: 400,
  endRoundTimer: 3000,
};
