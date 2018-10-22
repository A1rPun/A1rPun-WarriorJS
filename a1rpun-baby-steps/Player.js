class Player {
  constructor() {
    this.direction = 'backward';
    this.foundWall = false;
  }

  playTurn(warrior) {
    // Cool code goes here.
    if (warrior.feel('forward').isWall() || warrior.feel('backward').isWall()) {
      this.foundWall = true;
    }

    if (warrior.feel(this.direction).isWall() || (!this.foundWall && warrior.feel(this.direction).isStairs())) {
      // Pivot without sacrificing a step
      this.direction = this.direction === 'forward' ? 'backward' : 'forward';
    }

    var sense = warrior.feel(this.direction);
    var space = warrior.look(this.direction).find(x => x.isUnit());
    if (sense.isUnit()) {
      var unit = sense.getUnit();
      if (unit.isEnemy()) {
        warrior.attack(this.direction);
      } else if (unit.isBound()) {
        warrior.rescue(this.direction);
      }
    } else if (space && space.getUnit().isEnemy()) {
      warrior.shoot(this.direction);
    } else if (sense.isEmpty()) {
      warrior.walk(this.direction);
    }
  }
}
