export class Fighter {
  constructor(name, type, stats) {
    this.name = name;
    this.type = type;
    this.stats = stats;
  }

  countHealthPoints() {
    this.hp = this.stats.stamina * 10;
  }

  countAttackPower() {
    this.attack = this.stats.strength;
  }

  markMoves(attack, defense) {
    this.moves = {
      attack,
      defense,
    };
  }

  takeDamage(bodyPart, damage) {
    //i don't like how it looks like but meh
    this.hp -= bodyPart === this.moves.defense ? damage * 0.5 : damage;
  }

  get hp() {
    return this.hp;
  }
}
