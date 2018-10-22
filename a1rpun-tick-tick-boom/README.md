# A1rPun - Tick, Tick... Boom!

### _Try not to blow this tower apart_

## Level 2

_Another large room, but with several enemies blocking your way to the stairs._

> **TIP:** Just like walking, you can attack and feel in multiple directions (forward, left, right, backward).

> **CLUE:** Call `warrior.feel().isUnit()` and `warrior.feel().getUnit().isEnemy()` in each direction to make sure there isn't an enemy beside you (attack if there is). Call `warrior.rest()` if you're low in health when there are no enemies around.

### Floor Map

```
╔════╗
║@s  ║
║ sS>║
╚════╝

@ = A1rPun (20 HP)
s = Sludge (12 HP)
S = Thick Sludge (24 HP)
> = stairs
```

## Abilities

### Actions (only one per turn)

- `warrior.attack()`: Attacks a unit in the given direction (`'forward'` by default), dealing 5 HP of damage.
- `warrior.rest()`: Gains 10% of max health back, but does nothing more.
- `warrior.walk()`: Moves one space in the given direction (`'forward'` by default).

### Senses

- `warrior.directionOfStairs()`: Returns the direction (forward, right, backward or left) the stairs are from your location.
- `warrior.feel()`: Returns the adjacent space in the given direction (`'forward'` by default).
- `warrior.health()`: Returns an integer representing your health.
- `warrior.maxHealth()`: Returns an integer representing your maximum health.
- `warrior.think()`: Thinks out loud (`console.log` replacement).

## Next Steps

When you're done editing `Player.js`, run the `warriorjs` command again.
