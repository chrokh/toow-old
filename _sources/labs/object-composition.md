---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: csharp
  language: .net-csharp
  name: .net-csharp
---

# Lab: Object composition

## Objective

In this lab, we will delve into the concept of object composition. We will explore how complex structures can be constructed from simpler components, implementing the "has-a" relationship in our code. The purpose is to gain a practical understanding of object composition, which is a fundamental principle in object oriented programming.

## Provided Code

Carefully review the provided code. Notice how classes are composed to form a relationship where objects of one class (`Player`) contains a reference to an object of another (`Weapon`), establishing a "has-a" relationship rather than an "is-a" relationship that is typical with inheritance.
Also notice how the same `Weapon` instance can be shared by multiple `Player` instances, which demonstrates the power and flexibility of object composition in sharing and managing state.

```{code-cell}
class Weapon
{
    public string Name { get; private set; }
    private int damage;

    public Weapon(string name, int damage)
    {
        Name = name;
        this.damage = damage;
    }
}
```

```{code-cell}
class Player
{
    public string Name { get; private set; }
    public int Health { get; set; }
    public Weapon Weapon { get; set; }

    public Player(string name, int health, Weapon weapon)
    {
        Name = name;
        Health = health;
        Weapon = weapon;
    }
}
```

## Instructions

We will now take the code we have been given and enhance it by incorporating proper encapsulation and use composition to add more complexity to the game.

### Step 1: Encapsulate `Weapon` Behavior

First, we need to encapsulate the attack logic within the `Weapon` class. This ensures that the details of how a weapon attacks are hidden from the `Player`.

Implement the Attack method in the Weapon class so that it reduces the `Health` of the `Player` passed as a target by the `Damage` of the weapon.
The method should also print some information to the console so that we know what happened.

It should behave like this:

```{code-cell}
:tags: [remove-input]
class Weapon
{
    public string Name { get; private set; }
    private int damage;

    public Weapon(string name, int damage)
    {
        Name = name;
        this.damage = damage;
    }

    public void Attack(Player target)
    {
        target.Health -= damage;
        Console.WriteLine($"{Name} caused {damage} damage to {target.Name} (❤️ {target.Health}).");
    }
}

class Player
{
    public string Name { get; private set; }
    public int Health { get; set; }
    public Weapon Weapon { get; set; }

    public Player(string name, int health, Weapon weapon)
    {
        Name = name;
        Health = health;
        Weapon = weapon;
    }
}
```

```{code-cell}
Player bowser = new Player("Bowser 🐲", 50, null);
Weapon hammer = new Weapon("Hammer 🔨", 15);

hammer.Attack(bowser);
hammer.Attack(bowser);
```

```{admonition} 🤔 Reflection
Why is encapsulating the attack logic within the `Weapon` class beneficial from an object oriented design perspective?
```

### Step 2: Implement Attack Logic in `Player`

Add an instance method to `Player` with the signature `void Attack (Player target)`.
Implement it so that it calls the `Attack` method of the player's weapon with the passed `target` as the target player.

It should behave like this:

```{code-cell}
:tags: [remove-input]
class Weapon
{
    public string Name { get; private set; }
    private int damage;

    public Weapon(string name, int damage)
    {
        Name = name;
        this.damage = damage;
    }

    public void Attack(Player target)
    {
        target.Health -= damage;
        Console.WriteLine($"{Name} caused {damage} damage to {target.Name} (❤️ {target.Health}).");
    }
}

class Player
{
    public string Name { get; private set; }
    public int Health { get; set; }
    public Weapon Weapon { get; set; }

    public Player(string name, int health, Weapon weapon)
    {
        Name = name;
        Health = health;
        Weapon = weapon;
    }

    public void Attack(Player target)
        => Weapon.Attack(target);
}
```

```{code-cell}
Weapon hammer = new Weapon("Hammer 🔨", 15);
Player mario = new Player("Mario 🥸", 100, hammer);
Player bowser = new Player("Bowser 🐲", 50, hammer);

mario.Attack(bowser);
bowser.Attack(mario);
mario.Attack(bowser);
bowser.Attack(mario);
```

```{admonition} 🤔 Reflection
What happens if we change the value of the `Damage` property of the object behind the variable `hammer` by saying `hammer.Damage = 80` and then let both players attack each other?
How does this behavior relate to the concept of reference types?
```

### Step 3: Add Special Attack Method with State

Now that we have refactored our code to have a better structure and encapsulation, let's add a new feature: a special move for our weapons. This move should do double damage *every other time* it is used. The other times it should do `0` damage.

Implement a `SpecialAttack` method within the `Weapon` class that applies double damage every other time and `0` every other.
Also implement the `SpecialAttack` method within the `Player` class such that it calls the `SpecialAttack` method in `Weapon`.

It should behave like this:

```{code-cell}
:tags: [remove-input]
class Weapon
{
    public string Name { get; private set; }
    private int damage;
    private int counter = 0;

    public Weapon(string name, int damage)
    {
        Name = name;
        this.damage = damage;
    }

    public void Attack(Player target)
    {
        target.Health -= damage;
        Console.WriteLine($"{Name} caused {damage} damage to {target.Name} (❤️ {target.Health}).");
    }

    public void SpecialAttack(Player target)
    {
        if (counter % 2 == 0)
        {
            int specialDamage = damage * 2;
            target.Health -= specialDamage;
            Console.WriteLine($"{Name} caused {specialDamage} damage to {target.Name} (❤️ {target.Health}).");
        }
        else
        {
            Console.WriteLine($"{Name} missed {target.Name} (❤️ {target.Health}).");
        }
        counter++;
    }
}

class Player
{
    public string Name { get; private set; }
    public int Health { get; set; }
    public Weapon Weapon { get; set; }

    public Player(string name, int health, Weapon weapon)
    {
        Name = name;
        Health = health;
        Weapon = weapon;
    }

    public void Attack(Player target)
        => Weapon.Attack(target);

    public void SpecialAttack(Player target)
        => Weapon.SpecialAttack(target);
}
```

```{code-cell}
Weapon hammer = new Weapon("Hammer 🔨", 15);
Player mario = new Player("Mario 🥸", 100, hammer);
Player bowser = new Player("Bowser 🐲", 50, hammer);

mario.SpecialAttack(bowser);
bowser.SpecialAttack(mario);
mario.SpecialAttack(bowser);
bowser.SpecialAttack(mario);
mario.SpecialAttack(bowser);
bowser.SpecialAttack(mario);
bowser.SpecialAttack(mario);
```

```{admonition} 🤔 Reflection
How would the implementation of a `SpecialAttack` method have been more complex without our initial refactoring? Grab a friend and discuss the importance of encapsulation and object composition in extending existing code with new features.
```

```{admonition} 🤔 Reflection
Why does it seem like both players are using the same hammer? How can we avoid that "problem"?
```


## Conclusion

By completing this lab, we have experienced the robustness of object composition in building and extending applications. This is just the beginning; as we delve deeper into object oriented design, we will uncover more benefits and strategies for writing clean, maintainable, and scalable code.

