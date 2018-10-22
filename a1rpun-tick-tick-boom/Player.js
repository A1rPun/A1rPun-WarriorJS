class Player {
  constructor() {
    this.previousHealth = 100;
  }

  playTurn(warrior) {
    // Cool code goes here.
    var health = warrior.health() / warrior.maxHealth() * 100;
    var gotDamaged = health < this.previousHealth;
    var senses = [
      'backward',
      'left',
      'forward',
      'right',
    ];

    var units = warrior.listen();
var state = 'walk';
var direction = warrior.directionOfStairs();
for(let i = units.length;i--;){
  var space = units[i];
  var unit = space.getUnit();
  var loc = space.getLocation();
  var dir = warrior.directionOf(space);
  var canInteract = (loc[0] === 0 && (loc[1] === -1 || loc[1] === 1))
                    || (loc[1] === 0 && (loc[0] === -1 || loc[0] === 1));

  if(unit.isUnderEffect('ticking')){
    direction = dir;
    if(canInteract){
      state = 'rescue'
      break;
    }
  }
}
if(state === 'walk' && !warrior.feel(direction).isEmpty()){
  direction = 'left';
  if(!warrior.feel(direction).isEmpty()){
    direction = 'forward';
  }
}
warrior[state](direction);

    this.previousHealth = health;
  }
}
