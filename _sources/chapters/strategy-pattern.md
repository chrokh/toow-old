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

# Strategy pattern

%Having traversed the realm of the "Composition over Inheritance" principle, we venture next into the world of design patterns, specifically looking at the Strategy pattern.
Strategy pattern is essentially an embodiment of the principle [Composition over inheritance](composition-over-inheritance).
At its core, the Strategy pattern is about flexibility and encapsulation.
It allows us to select the behavior of an object at run-time, without bloating the object's class with multiple responsibilities or behaviors. Instead, behaviors are extracted into separate classes, each representing a specific strategy.
These strategies, or behaviors, can be modified, added, or removed without affecting the clients that use them.

% https://cdn.discordapp.com/attachments/1118630713084870736/1142023757117005864/chrokh_wall_socket_in_brick_wall_fab5e7ec-59b0-492d-b7e9-355c94beef1d.png
```{figure} ../images/cover-strategy-pattern.jpg

Just like you can plug any electrical device into a wall socket as long as they follow the same standard, you can plug any strategy into a client as long as the strategy implements the appropriate interface.
```

```{admonition} Video lecture
<iframe width="100%" height="315" src="https://www.youtube.com/embed/v9ejT8FO-7I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

## Intent

The intent of the Strategy pattern is to:

```{epigraph}
Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from the clients that use it.

-- [Design Patterns: Elements of reusable object-oriented software](https://geni.us/PsXmo).
```

```{note}
In the chapter [Composition over inheritance](composition-over-inheritance) we used the term 'behaviors' but in strategy pattern we often call them 'strategies'.
```

## Structure

As we can see in the [UML class diagram](uml-class-diagrams) below, the `Context` class does not implement behavior directly. Instead, it delegates the responsibility of its behavior to an instance of a class that implements the `IStrategy` interface. This strategy interface provides a contract or signature for a method named `execute()`, ensuring that all concrete strategies will have this method implemented.

```{figure} https://upload.wikimedia.org/wikipedia/commons/3/39/Strategy_Pattern_in_UML.png
:width: 400px

UML Class diagram of strategy pattern. [[Source]](http://www.mcdonaldland.info/2007/11/28/40/)
```

The concrete strategy classes, like `ConcreteStrategyA` and `ConcreteStrategyB`, then provide their own implementation of the `execute()` method as defined by the `IStrategy` interface.
The `Context` class does not depend on any concrete strategy since concrete strategies are [dependency injected](dependency-injection) into it.

This design allows the `Context` class to switch between different strategies dynamically (meaning at run-time), encapsulating algorithm-specific structures and behaviors inside individual strategy classes.

As a result of encapsulating the strategies, adding new strategies or modifying existing ones becomes an isolated operation that can be done without affecting the `Context` or other strategies.


## Example

Imagine a game where characters can wield different weapons.
We could focus on what things *are*, organize our code *by type*, and create a subclasses for every combination of character and weapon.
That would be an inheritance-based approach and we would end up with classes like `Swordsman`, `Archer`, and so on.
However, as we learned in the chapter on [Composition over inheritance](composition-over-inheritance), this approach is an inflexible slippery slope.
Even Legolas sometimes uses a sword.
Instead, we can favor composition and use, what we here call, the Strategy pattern.

%- Define an interface WeaponBehavior with a method useWeapon().
%- Implement different weapons like Sword, Bow, Axe as classes that implement WeaponBehavior.
%- The main Character class has a WeaponBehavior attribute, and can switch weapons dynamically based on the situation.

%This design makes it easy to add a new weapon without changing the Character class. It's a prime example of applying Composition over inheritance through the Strategy Pattern.

```{note}
The example is essentially the same as the one in the chapter on [Composition over inheritance](composition-over-inheritance), albeit in a different domain.
```

Let's start by defining an interface that will unify all weapon behaviors.

```{code-cell}
public interface IWeaponBehavior
{
    void UseWeapon();
}
```

Then we'll now define different weapons that implement the interface.

```{code-cell}
public class Sword : IWeaponBehavior
{
    public void UseWeapon()
        => Console.WriteLine("Swinging the sword!");
}
```

```{code-cell}
public class Bow : IWeaponBehavior
{
    public void UseWeapon()
        => Console.WriteLine("Shooting an arrow!");
}
```

```{code-cell}
public class Axe : IWeaponBehavior
{
    public void UseWeapon()
        => Console.WriteLine("Striking with the axe!");
}
```

Finally, let's add a `Character` class that will have an instance of `IWeaponBehavior` so that we can compose characters and weapons.

```{code-cell}
public class Character
{
    private IWeaponBehavior weapon;

    public Character(IWeaponBehavior weapon)
        => this.weapon = weapon;

    public void Attack()
        => weapon.UseWeapon();
}
```

In the code above the `IWeaponBehavior` acts as an interface for all weapon types. Each weapon, be it `Sword`, `Bow`, or `Axe`, implements this behavior. The `Character` class is composed with a weapon behavior which can be chosen at run-time.

How would we use these classes?
Have a look at the code below.

```{code-cell}
Character knight = new Character(new Sword());
knight.Attack();
```

```{code-cell}
Character archer = new Character(new Bow());
archer.Attack();
```

In terms of the terminology of the Strategy pattern, the interface `IWeaponBehavior` is the interface that defines the family of algorithms/strategies. The implementations of that interface are, in turn, the different algorithms/strategies.
Finally, the `Character` class is what we call the 'context' or the 'client'.

%## Benefits
%- Maintainability: Changes to one strategy won't affect others, ensuring a clean separation.
%- Expandability: New strategies can be added without altering the existing system.
%- Dynamic Behavior: At runtime, strategies can be swapped as needed, giving flexibility in behavior.

```{note}
The benefits of the Strategy pattern are the same as those of [Composition over inheritance](composition-over-inheritance). Revisit that chapter if you need a refresher.
```


## Conclusion

The Strategy pattern is a testament to the power of the [Composition over inheritance](composition-over-inheritance) principle. By extracting behaviors and encapsulating them into interchangeable strategies, we increase [maintainability](maintainability) across all dimensions and write software that isn't only useful today but also ready for the inevitable but unpredictable demands of tomorrow.

