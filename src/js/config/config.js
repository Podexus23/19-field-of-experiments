export const playerBaseStats = {
  healthPoints: 100,
  get minHit() {
    return this.healthPoints * 0.1;
  },
  get maxHit() {
    return this.healthPoints * 0.5;
  },
};
