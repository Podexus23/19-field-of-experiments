export class Fighter {
  constructor(name, type, stats = { stamina: 10, strength: 10 }) {
    this.name = name;
    this.type = type;
    this.stats = stats;

    this.baseHp;
    this.hp;
    this.lastTakenDamage;

    this.damage;

    this.moves = { attack: "", defense: "" };
    this.countHealthPoints();
    this.countAttackPower();
  }

  countHealthPoints() {
    this.baseHp = this.stats.stamina * 10;
    this.hp = this.stats.stamina * 10;
  }

  countAttackPower() {
    this.damage = this.stats.strength;
  }

  markMoves(attack, defense) {
    this.moves = {
      attack,
      defense,
    };
  }

  takeDamage(bodyPart, damage) {
    //i don't like how it looks like but meh
    this.lastTakenDamage =
      bodyPart === this.moves.defense ? damage * 0.5 : damage;
    this.hp -= this.lastTakenDamage;
  }
}
