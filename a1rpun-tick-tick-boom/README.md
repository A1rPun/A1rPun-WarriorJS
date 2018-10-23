# A1rPun - Tick, Tick... Boom!

### _Try not to blow this tower apart_

## Level 9

_Never before have you seen a room so full of sludge. Start the fireworks!_

> **TIP:** Be careful not to let the ticking captive get caught in the flames. Use `warrior.distanceOf()` to avoid the captives.

### Floor Map

```
╔════╗
║ssC>║
║@sss║
║ssC ║
╚════╝

s = Sludge (12 HP)
C = Captive (1 HP)
@ = A1rPun (20 HP)
> = stairs
```

## Abilities


### Actions (only one per turn)

- `warrior.rest()`: Gains 10% of max health back, but does nothing more.
- `warrior.detonate()`: Detonates a bomb in a given direction (`'forward'` by default), dealing 8 HP of damage to that space and 4 HP of damage to surrounding 4 spaces (including yourself).
- `warrior.attack()`: Attacks a unit in the given direction (`'forward'` by default), dealing 5 HP of damage.
- `warrior.bind()`: Binds a unit in the given direction (`'forward'` by default) to keep him from moving.
- `warrior.rescue()`: Releases a unit from his chains in the given direction (`'forward'` by default).
- `warrior.walk()`: Moves one space in the given direction (`'forward'` by default).

### Senses

- `warrior.directionOfStairs()`: Returns the direction (forward, right, backward or left) the stairs are from your location.
- `warrior.directionOf()`: Returns the direction (forward, right, backward or left) to the given space.
- `warrior.distanceOf()`: Returns an integer representing the distance to the given space.
- `warrior.feel()`: Returns the adjacent space in the given direction (`'forward'` by default).
- `warrior.health()`: Returns an integer representing your health.
- `warrior.listen()`: Returns an array of all spaces which have units in them (excluding yourself).
- `warrior.look()`: Returns an array of up to 3 spaces in the given direction (`'forward'` by default).
- `warrior.maxHealth()`: Returns an integer representing your maximum health.
- `warrior.think()`: Thinks out loud (`console.log` replacement).

## Next Steps

When you're done editing `Player.js`, run the `warriorjs` command again.
