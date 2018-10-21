class Player {
  constructor() {
    this.direction = 'backward';
    this.previousHealth = 100;
    this.minHealth = 80;
    this.criticalHealth = 30;
    this.fleeing = false;
    this.gotRested = false;
  }

  switchDirection() {
    this.direction = this.direction === 'forward' ? 'backward' : 'forward';
  }

  playTurn(warrior) {
    // Cool code goes here.
    var health = warrior.health() / warrior.maxHealth() * 100;
    var gotDamaged = health < this.previousHealth;
    var gotRested = this.gotRested;
    this.gotRested = false;
    var sense = warrior.feel(this.direction);

    if (sense.isWall()) {
      this.switchDirection();
      sense = warrior.feel(this.direction);
    }

    var space = warrior.look(this.direction).find(x => x.isUnit());

    if (space && space.getUnit().isEnemy()){
      warrior.shoot(this.direction);
    } else if (gotDamaged && (health <= this.criticalHealth || gotRested) && !this.fleeing){
      this.fleeing = true;
      this.switchDirection();
      warrior.walk(this.direction);
    } else if (sense.isEmpty()) {
      if (!gotDamaged && health <= this.minHealth) {
        warrior.rest();
        this.gotRested = true;
        this.fleeing = false;
      } else{
        warrior.walk(this.direction);
      }
    } else {
      var unit = sense.getUnit();
      if (unit.isEnemy()) {
        warrior.attack(this.direction);
      } else if (unit.isBound()) {
        warrior.rescue(this.direction);
      }
    }
    this.previousHealth = health;
  }
}
