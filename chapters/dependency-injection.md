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

# Dependency injection

Designing software isn't just about writing code that works; it's about crafting architectures that can be maintained and adapted over time.
In the world of software, dependencies are inevitable. Your class often relies on other classes or services to perform its operations. This interlinking can quickly get messy. This is where 'Dependency Injection' (often abbreviated DI) comes into play.

Dependency injection promotes the 'injection' of dependencies as opposed to the 'construction' of dependencies.
At its heart, dependency injection is about inverting control.

%Instead of an object deciding its dependencies, they are "injected" into it, usually by an external system.

%One pillar of modern, maintainable software design is 'Dependency Injection' (often abbreviated DI).

```{admonition} Key point
Dependency injection separates object *construction* from object *use*. By 'injecting' our dependencies instead of 'constructing' them we increase [maintainability](maintainability) across all dimensions.
```

## Analogies

Think of dependency injection like using a universal remote control. A universal remote is designed to work with various televisions, sound systems, and more. The key is that each device follows the same communication interface, enabling the remote to send standard commands like 'volume up,' 'play,' or 'pause.'

```{figure} ../images/cover-dependency-injection.jpg

When using dependency injection, objects are designed to accept any dependency conforming to an expected interface. This is reminiscent of how a universal remote can be paired with any device that follows the expected protocol.
```

Just as you can connect a new device into your remote's repertoire, in software design, we can 'inject' dependencies into an object. The object, like the remote, doesn't need to know the intricate workings of what it's controlling, it just needs to know the interface. This allows for flexibility and modularity, as you can easily swap out one device (or dependency) for another without needing to buy a new remote (or rewrite your class).

% ALT EXAMPLE: Coloring book page with numbers. The colors you choose to represent the numbers are the injected objects.

Imagine a child assembling a LEGO model.
Should the child be responsible for *both* searching for each individual piece *and* assembling them?
In software we often argue that an object only should be responsible for one thing.
Dependency injection would suggest that we should hand the child each individual piece in the order that they need them which would let the child focus all its energy on the assembly process.

```{hint}
In dependency injection, classes don't create their dependencies. Instead they expect whoever is using the class to provide the necessary dependencies.
```

If you are building a calculator app,
would you prefer that the method that performs an actual calculation involving two numbers, like addition, also asks the user for two numbers or would you prefer that the numbers are simply passed to your method as arguments?
Another way of saying this is: would you prefer mixing the code that asks the user for input numbers and the code that performs the actual calculation or would you rather separate the two?
Dependency injection says that we should not generate the data we need but instead ask callers of our methods and constructors to provide it for us.


## Example

Let's get more concrete.
Imagine you're developing a side-scrolling adventure game where your main character, the `Player`, can run left, run right, and jump. As the player progresses through the game, they can pick up power-ups that modify their abilities. One such power-up lets the `Player` execute a double jump.

Without dependency injection, the code might look something like this:

```{code-cell}
class Player
{
    bool hasDoubleJumpPowerUp = false;

    public void MoveRight()
        => Console.WriteLine("Moving right.");

    public void MoveLeft()
        => Console.WriteLine("Moving left.");

    public void Jump()
    {
        if (hasDoubleJumpPowerUp)
            Console.WriteLine("Performing double jump!");
        else
            Console.WriteLine("Performing regular jump!");

    }

    public void EnableDoubleJump(bool enabled)
        => hasDoubleJumpPowerUp = enabled;
}
```

While this approach seems simple, it bakes the double jump logic directly into the `Player` class. This becomes problematic if we decide to introduce additional jump-related power-ups in the future. Such as triple jump or glide jump.

For each power-up, we must add an activation-method and a conditional in the jump-method.
It gets even worse when we start thinking about the fact that we could have power-ups that affect moving right and left as well.

Luckily, we've learned about [replacing conditionals with polymorphism](replace-conditional-with-polymorphism).
Couldn't we use polymorphism to control the jumping behavior instead of conditionals?
We certainly can.
Dependency injection then takes this a step further and says that the construction of the object that controls the jumping behavior should not be a responsibility of the `Player` class in the first place.

Let's start by defining an interface for jump behaviors and some concrete implementations of it:

```{code-cell}
interface IJumpBehavior
{
    void Execute();
}
```

```{code-cell}
class SingleJump : IJumpBehavior
{
    public void Execute()
        => Console.WriteLine("Performing regular jump.");
}
```

```{code-cell}
class DoubleJump : IJumpBehavior
{
    public void Execute()
        => Console.WriteLine("Performing double jump.");
}
```

With these jump behaviors in place we can now rewrite the `Player` class to delegate the actual jumping to whatever object is currently set as the jump behavior.

```{code-cell}
class Player
{
    private IJumpBehavior jumpBehavior;

    // Constructor injection:
    public Player(IJumpBehavior jumpBehavior)
        => this.jumpBehavior = jumpBehavior;

    public void MoveRight()
        => Console.WriteLine("Moving right.");

    public void MoveLeft()
        => Console.WriteLine("Moving left.");

    public void Jump()
        => jumpBehavior.Execute();

    // Method injection:
    public void SetJumpBehavior(IJumpBehavior jumpBehavior)
        => this.jumpBehavior = jumpBehavior;
}
```

When instantiating the `Player`, you now have to decide which jump behavior the player should have:

```{code-cell}
IJumpBehavior basicJump = new SingleJump();
Player player = new Player(basicJump);
player.Jump();
```

If the player later picks up a double jump power-up we simply inject the new jumping behavior into the `Player` object.

```{code-cell}
IJumpBehavior doubleJump = new DoubleJump();
player.SetJumpBehavior(doubleJump);
player.Jump();
```

With this setup, if we want to introduce new jump abilities we can do so easily without having to modify any code in the `Player` class. We simply write another class that implements `IJumpBehavior` and inject it into our `Player` instance when needed.

```{code-cell}
class GlideJump : IJumpBehavior
{
    public void Execute()
        => Console.WriteLine("Perorming jump and glide.");
}
```

```{hint}
The class `Player` now 'depends on' the interface `IJumpBehavior` which is why we use the word 'dependency'.
The act of sending an instance of type `IJumpBehavior` into an instance of type `Player` is what we call 'injection' which is why we use the word 'injection'.
Hence, we call it 'dependency injection'.
```

The same principle can of course be applied to other movement behaviors.
By adding an interface for movement behavior we could easily write a class for running behavior, and then switch to and from it by injecting it into our `Player` object.
Try it out on your own!

```{note}
In the example with the `Player` class, the injected dependency is an interface.
However, even if the dependency weren't an interface, it would still be termed 'dependency injection'.
The key idea is that an object is injected rather than created.
That we separate 'creation' from *use*.
```


## Types of dependency injection

There are mainly three types of dependency injection:

### Constructor Injection

The dependencies are injected through the constructor of the dependent class. It's the most common form of dependency injection and is used when the dependency is mandatory for the class's operation.

Example: The `Player` class is passed its initial jump behavior via its constructor.

```csharp
new Player(new JumpBehavior()));
```

### Method Injection

Here, dependencies are provided through methods. This is useful when the dependencies can change during the lifetime of an instance.

Example: The jump behavior of a `Player` object can be changed during its lifetime by using the `SetJumpBehavior` method.

```csharp
player.SetJumpBehavior(new DoubleJumpBehavior());
```

### Property Injection

Dependencies are set via properties of the class. This is often used for optional dependencies. The terms 'attribute injection', 'field injection', and 'setter injection' are essentially the same as this.

Example: If we converted the field `jumpBehavior` in the `Player` class into a property with a `public` setter then we could inject a jump behavior during the lifetime of a `Player` object by using the setter.

```csharp
player.JumpBehavior = new DoubleJumpBehavior();
```


## Conclusion

%There are mainly three types of dependency injection:
%
%- **Constructor Injection**: The dependencies are injected through the constructor of the dependent class. It's the most common form of dependency injection and is used when the dependency is mandatory for the class's operation.
%
%Example: The `Player` class is passed its initial jump behavior via its constructor.
%
%`new Player(new JumpBehavior()));`.
%
%- **Method Injection**: Here, dependencies are provided through methods. This is useful when the dependencies can change during the lifetime of an instance.
%    - Example: The jump behavior of a `Player` object can be changed during its lifetime by using the `SetJumpBehavior` method.
%    - `player.SetJumpBehavior(new DoubleJumpBehavior());`.
%- **Property Injection**: Dependencies are set via properties of the class. This is often used for optional dependencies. The terms 'attribute injection', 'field injection', and 'setter injection' are essentially the same as this.
%    - Example: If we converted the field `jumpBehavior` in the `Player` class into a property with a `public` setter then we could inject a jump behavior during the lifetime of a `Player` object by using the setter.
%    - `player.JumpBehavior = new DoubleJumpBehavior();`.

```{important}
By injecting the jump behavior into player objects we're changing the behavior of players at run-time.
```

```{attention}
While dependency injection aids in creating a flexible system, it's crucial to avoid overengineering. Use dependency injection where it genuinely adds value by enhancing [maintainability](maintainability).
```

%As we move forward in our journey, these concepts will become more profound. Remember that the essence of good software design is to make systems modular and extensible. By understanding and applying dependency injection, you're taking a significant step in that direction.

In upcoming chapters, we'll explore principles (like [composition over inheritance](composition-over-inheritance)) and patterns (like [strategy pattern](strategy-pattern), that take the concept of dependency injection even further.

%By embracing dependency injection, you align with a design principle that emphasizes clarity, testability, and maintainability. It's an approach that's not just about writing code, but about designing robust systems poised for growth and change.

