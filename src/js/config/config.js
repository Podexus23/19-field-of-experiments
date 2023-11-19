export const playerBaseStats = {
  healthPoints: 100,
  get minHit() {
    return this.healthPoints * 0.2;
  },
  get maxHit() {
    return this.healthPoints * 0.7;
  },
};
