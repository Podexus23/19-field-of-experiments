export const playerBaseStats = {
  healthPoints: 100,
  get minHit() {
    return this.healthPoints * 0.5;
  },
  get maxHit() {
    return this.healthPoints * 0.5;
  },
};

export const bodyParts = ["head", "torso", "legs"];
//may be for later purpose, later we see

// export const playerBaseStats = {
//   healthPoints: 100,
//   get minHit() {
//     return this.healthPoints * 0.2;
//   },
//   get maxHit() {
//     return this.healthPoints * 0.7;
//   },
// };

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
