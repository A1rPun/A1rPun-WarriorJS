class Player {
  constructor() {
    this.previousHealth = 100;
    this.minHealth = 80;
    this.criticalHealth = 30;
    this.fleeing = false;
    this.gotRested = false;
  }

  playTurn(warrior) {
    // Cool code goes here.
    var health = warrior.health() / warrior.maxHealth() * 100;
    var gotDamaged = health < this.previousHealth;
    var gotRested = this.gotRested;
    this.gotRested = false;
    var sense = warrior.feel();

    if (gotDamaged && (health <= this.criticalHealth || gotRested) && !this.fleeing) {
      this.fleeing = true;
      warrior.walk(warrior.directionOfStairs());
    } else if (sense.isEmpty()) {
      if (!gotDamaged && health <= this.minHealth) {
        warrior.rest();
        this.gotRested = true;
        this.fleeing = false;
      } else {
        warrior.walk(warrior.directionOfStairs());
      }
    } else {
      var unit = sense.getUnit();
      if (unit.isEnemy()) {
        warrior.attack();
      } else if (unit.isBound()) {
        warrior.rescue();
      }
    }
    this.previousHealth = health;
  }
}
