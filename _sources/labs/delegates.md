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

# Lab: Delegates

## Objective

The purpose of this lab is to introduce delegates as a powerful construct in C# to make methods first-class entities, and in doing so, replace the `IWeaponBehavior` type in the provided code. Through this exercise, we will realize the parallels between the Strategy pattern and the use of delegates. We will see how delegates offer a concise and intuitive way to achieve the same objectives.

## Provided Code

Carefully review the provided code. Notice the `IWeaponBehavior` interface and its implementations (`Sword`, `Bow`, `Axe`). Each weapon defines its own attack behavior. Additionally, there's a `Character` class that accepts any weapon behavior and delegates the attack to the chosen weapon.

```{code-cell}
Character knight = new Character(new Sword());
knight.Attack();

Character archer = new Character(new Bow());
archer.Attack();

public interface IWeaponBehavior
{
    void UseWeapon();
}

public class Sword : IWeaponBehavior
{
    public void UseWeapon()
        => Console.WriteLine("Swinging the sword!");
}

public class Bow : IWeaponBehavior
{
    public void UseWeapon()
        => Console.WriteLine("Shooting an arrow!");
}

public class Axe : IWeaponBehavior
{
    public void UseWeapon()
        => Console.WriteLine("Striking with the axe!");
}

public class Character
{
    private IWeaponBehavior weapon;

    public Character(IWeaponBehavior weapon)
        => this.weapon = weapon;

    public void Attack()
        => weapon.UseWeapon();
}
```

## Instructions

### Step 1: Defining the Delegate

We'll begin by defining a delegate that will serve as a type for our weapon behaviors. The delegate should encapsulate a method with no parameters and no return type, to match the `UseWeapon()` method's signature.

```{code-cell}
delegate void WeaponAction();
```

### Step 2: Refactor the Weapon Classes

Next, we need to replace the concrete weapon classes with methods whose signatures match the defined delegate.
Let's use local functions and let's define them directly in the `Main` method.
These local functions represent each weapon's action.

### Step 3: Refactor the Character Class

Replace the `IWeaponBehavior` type in the `Character` class with our newly defined `WeaponAction` delegate.

1. The constructor in `Character` should now accept a `WeaponAction` delegate.
2. The `Attack` method in `Character` should invoke this delegate.

```{admonition} 🤔 Reflection
Reflect on the refactoring process. How do the delegates make the codebase more concise and intuitive compared to the Strategy pattern?
```

## Challenge

Now that we've refactored the code, let's add a new behavior: `MagicWand`, which should print out `"Casting a spell!"`. Add this behavior using our new delegate structure, and create a new `Character`, a mage, that uses this behavior to attack.

```{admonition} 🤔 Reflection
Consider the scalability and maintainability of this delegate-based approach compared to the Strategy pattern. What are the pros and cons of each?
```

