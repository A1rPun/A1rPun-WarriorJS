# A1rPun - Tick, Tick... Boom!

### _Try not to blow this tower apart_

## Level 7

_Another ticking sound, but some sludge is blocking the way._

> **TIP:** Quickly kill the sludge and rescue the captive before the bomb goes off. You can't simply go around them.

### Floor Map

```
╔═════╗
║ sC >║
║@ C C║
║ s   ║
╚═════╝

s = Sludge (12 HP)
C = Captive (1 HP)
@ = A1rPun (20 HP)
> = stairs
```

## Abilities

### Actions (only one per turn)

- `warrior.attack()`: Attacks a unit in the given direction (`'forward'` by default), dealing 5 HP of damage.
- `warrior.bind()`: Binds a unit in the given direction (`'forward'` by default) to keep him from moving.
- `warrior.rescue()`: Releases a unit from his chains in the given direction (`'forward'` by default).
- `warrior.rest()`: Gains 10% of max health back, but does nothing more.
- `warrior.walk()`: Moves one space in the given direction (`'forward'` by default).

### Senses

- `warrior.maxHealth()`: Returns an integer representing your maximum health.
- `warrior.directionOfStairs()`: Returns the direction (forward, right, backward or left) the stairs are from your location.
- `warrior.directionOf()`: Returns the direction (forward, right, backward or left) to the given space.
- `warrior.feel()`: Returns the adjacent space in the given direction (`'forward'` by default).
- `warrior.health()`: Returns an integer representing your health.
- `warrior.listen()`: Returns an array of all spaces which have units in them (excluding yourself).
- `warrior.think()`: Thinks out loud (`console.log` replacement).

## Next Steps

When you're done editing `Player.js`, run the `warriorjs` command again.
