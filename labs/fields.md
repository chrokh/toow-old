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

# Lab: Fields

## Objective

In this lab, we will transform procedural C# code into slightly more object oriented code by introducing classes with fields. We have a long way to go before we can call this code object oriented but we've got to start somewhere. By using fields we group related data in separate classes.

## Provided Code

Carefully review the provided code. Notice the use of separate variables to represent the attributes of a player and an enemy. This dispersed method of managing data illustrates a lack of encapsulation that we will address.

```{code-cell}
// Player attributes
int playerHealth = 100;
int playerArmor = 50;
int playerDamage = 30;
string playerName = "Hero";

// Enemy attributes
int enemyHealth = 150;
int enemyArmor = 20;
int enemyDamage = 20;
string enemyName = "Orc";
```

Here, we have loosely related variables that could represent a player's and an enemy's characteristics in a simple game scenario. Our task is to group these variables into classes, converting this procedural style into an object oriented approach.

## Instructions

We will begin the process of organizing this data by creating two classes: `Player` and `Enemy`. Each class will be equipped with public fields that are pertinent to the entity it represents.

### Step 1: Define the `Player` Class

Create a `Player` class containing public fields for health, armor, and name.

```{code-cell}
:tags: [remove-output]
class Player
{
    public string Name;
    public int Health;
    public int Armor;
    public int Damage;
}
```

### Step 2: Define the `Enemy` Class

In a similar fashion, define an `Enemy` class with public fields for health, damage, and name.

```{code-cell}
:tags: [remove-output]
class Enemy
{
    public string Name;
    public int Health;
    public int Armor;
    public int Damage;
}
```

### Step 3: Unify the Classes

Wait a minute, at this point we realize that both classes contain exactly the same data. We don't need separate *classes*, we need separate *instances* of the same class.

Remove the two classes and replace them with a new class called `Character`.

```{code-cell}
:tags: [remove-output]
class Character
{
    public string Name;
    public int Health;
    public int Armor;
    public int Damage;
}
```

### Step 4: Replace Global Variables with Instances

Replace the global variables in the `Main` method with instances of the `Player` and `Enemy` classes, assigning the values appropriately to the public fields.

```{code-cell}
Character player = new Character();
player.Name = "Hero";
player.Health = 100;
player.Armor = 50;
player.Damage = 30;

Character enemy = new Character();
enemy.Health = 150;
enemy.Armor = 20;
enemy.Damage = 20;
enemy.Name = "Orc";
```

```{admonition} 🤔 Reflection
Think about the impact of organizing variables into classes with fields. Does it make your code more analyzable?
```

### Step 5: Print Character Status

Add a local function or static method to the `Main` method or `Program` class with the signature `void Print(Character character)` that prints all the data related to a character.

```{code-cell}
static void print (Character character)
{
    Console.WriteLine($"{character.Name}: ❤️ {character.Health}  🛡️ {character.Armor}  ⚔️ {character.Damage}");
}
```

```{code-cell}
// If you want to use a local function:
void Print(Character character)
{
    Console.WriteLine($"{character.Name}: ❤️ {character.Health}  🛡️ {character.Armor}  ⚔️ {character.Damage}");
}
```

```{code-cell}
Print(player);
Print(enemy);
```

## Challenge

Write a local function or static method with the signature `void Attack (Character attacker, Character attacked)`.
The method should apply the `Damage` of the `attacker` object to the `Armor` of the `attacked` object. The `Armor` should never be negative, and if the `Damage` exceeds the `Armor` then the remaining `Damage` should be applied to `Health`.
The method should also print information about who's attacking who.
It should behave something like this:

```{code-cell}
:tags: [remove-input]
void Attack (Character attacker, Character attacked)
{
    Console.WriteLine($"{attacker.Name} attacks {attacked.Name}");
    if (attacked.Armor >= attacker.Damage)
    {
        attacked.Armor -= attacker.Damage;
    }
    else
    {
        attacked.Health -= (attacker.Damage - attacked.Armor);
        attacked.Armor = 0;
    }
}
```

```{code-cell}
Print(enemy);
Attack(player, enemy);
Print(enemy);
```

## Conclusion

As we learn more about object oriented programming we will realize that the `Print` and `Attack` methods should not be local functions or static methods but instance methods.
But let's take it one step at a time.

Good job! 🥳

