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

# Lab: Abstract Classes

## Objective

In this lab, we will explore the concept of abstract classes by working with a scenario inspired by the classic Pokemon game. Our primary goal is to understand how abstract classes and methods can be used to provide a common interface for derived classes, while leaving all implementation details to these subclasses.

## Provided Code
Carefully review the provided code. Notice that we have the classes `Player`, `Pokemon`, and `Item`. While `Item` currently has an implementation of a method called `TryUse` that checks if the `Item` is available or not actually using the item doesn't have any effect beyond marking it unable for further use. Our task will be to refactor this class into an abstract class and then subclass it to create specific items that actually have interesting effects.

```{code-cell}
class Player
{
    public string Name { get; private set; }

    public Player(string name)
        => Name = name;
}
```

```{code-cell}
class Pokemon
{
    public string Name { get; private set; }

    private int health = 50;
    public int Health
    {
        get => health;
        set => health = Math.Min(value, 100);

    }

    private int level;
    public int Level
    {
        get => level;
        set => level = Math.Min(value, 100);

    }

    public Pokemon(string name, int level)
    {
        Name = name;
        Level = level;
    }
}
```

```{code-cell}
class Item
{
    public string Name { get; protected set; }

    public bool IsAvailable { get; protected set; } = true;

    public Item (string name)
        => Name = name;

    public void TryUse(Player player, Pokemon target)
    {
        if (IsAvailable)
        {
            Console.WriteLine($"{player.Name} used {Name} on {target.Name}.");
            IsAvailable = false;
        }
        else
        {
            Console.WriteLine($"{Name} is not available.");
        }
    }
}
```

```{code-cell}
Player player = new Player("ASH");
Pokemon pikachu = new Pokemon("PIKACHU", 1);

Item potion = new Item("POTION");
potion.TryUse(player, pikachu);
potion.TryUse(player, pikachu);
```

## Instructions

### Step 1: Make `Item` class abstract

Converting the `Item` class into an `abstract` class and add an abstract method with the signature `void Use(Player player, Pokemon target)` to it.
Add a line to the method `TryUse` that calls `Use` if the `Item` is available.

Once this is done, you will notice that we can no longer instantiate `Item` directly and will receive a compilation error. This is because abstract classes cannot be instantiated.

```{admonition} 🤔 Reflection
How does making the Item class abstract change the way we think about and use this class in our code?
```

```{code-cell}
:tags: [remove-input]
abstract class Item
{
    public string Name { get; protected set; }

    public bool IsAvailable { get; protected set; } = true;

    public Item (string name)
        => Name = name;

    public void TryUse(Player player, Pokemon target)
    {
        if (IsAvailable)
        {
            Console.WriteLine($"{player.Name} used {Name} on {target.Name}.");
            Use(player, target);
            IsAvailable = false;
        }
        else
        {
            Console.WriteLine($"{Name} is not available.");
        }
    }

    protected abstract void Use(Player player, Pokemon target);
}
```

```{code-cell}
:tags: [raises-exception]
new Item("POTION");  // Should not compile!
```

To make sure we get this right, let me show you what a subclass of `Item` might look like:

```{code-cell}
class PokeBall : Item
{
    public PokeBall() : base("POKÉBALL") { }

    protected override void Use(Player player, Pokemon target)
    {
        Console.WriteLine($"{player.Name} caught {target.Name}!");
    }
}
```

```{code-cell}
Player player = new Player("ASH");
Pokemon pikachu = new Pokemon("PIKACHU", 1);

Item pokeball = new PokeBall();
pokeball.TryUse(player, pikachu); // First use should work.
pokeball.TryUse(player, pikachu); // Second should not.
```


### Step 2: Create `Potion` subclass

Now, introduce a `Potion` class and make it a subclass of `Item`. The `Potion` should have a constructor that takes an `int amount` and it should override the `abstract` `Use` method to increase the health of the target `Pokemon`.

When you're done, you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class Potion : Item
{
    private int amount;

    public Potion(int amount) : base(amount < 50 ? "POTION" : "SUPER POTION")
        => this.amount = amount;

    protected override void Use(Player player, Pokemon target)
    {
        target.Health += amount;
        Console.WriteLine($"{target.Name} has {target.Health} HP.");
    }
}
```

```{code-cell}
Player player = new Player("ASH");
Pokemon pikachu = new Pokemon("PIKACHU", 1);

Item potion1 = new Potion(20);
potion1.TryUse(player, pikachu);

Item potion2 = new Potion(75);
potion2.TryUse(player, pikachu);
potion2.TryUse(player, pikachu);
```

### Step 3: Create `RareCandy` subclass

Similarly, let's now build a class called `RareCandy` that levels up the Pokémon we give it to.
When you're done, you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class RareCandy : Item
{
    public RareCandy() : base("RARE CANDY") { }

    protected override void Use(Player player, Pokemon target)
    {
        int oldLevel = target.Level;
        target.Level++;
        if (target.Level - oldLevel > 0)
        {
            Console.WriteLine($"{target.Name} leveled up to {target.Level}.");
        }
        else
        {
            Console.WriteLine($"{Name} did not have any effect.");
        }
    }
}
```

```{code-cell}
Player player = new Player("ASH");
Pokemon pikachu = new Pokemon("PIKACHU", 99);

Item candy1 = new RareCandy();
Item candy2 = new RareCandy();
Item candy3 = new RareCandy();

candy1.TryUse(player, pikachu);
candy1.TryUse(player, pikachu);
candy2.TryUse(player, pikachu);
candy3.TryUse(player, pikachu);
```

## Conclusion

```{note}
We've made a bunch of properties in the `Pokemon` class publically writable in order for them to be changable by items. This is to keep the example simple. In reality we should probably encapsulate these and instead expose instance methods.
```
