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

# Lab: Dependency injection

## Objective

In this lab, we will delve into the practical application of Dependency Injection. We'll refactor some simlpe code to implement dependency injection, enhancing its flexibility and maintainability.

This exercise demonstrates how dependency injection facilitates the addition of new features without modifying existing code, a core principle of maintainable software architecture.

## Provided Code

Carefully review the provided code. Notice how the `Player` class currently handles jump behaviors internally, leading to tight coupling between the `Player` and its abilities. This design limits flexibility and violates the Single Responsibility Principle, as the `Player` class is tasked with multiple responsibilities.

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

## Instructions
We will refactor the `Player` class to use dependency injection for handling jump behaviors, thus decoupling the abilities from the player itself.

### Step 1: Define Jump Behaviors
First, define an interface called `IJumpBehavior` with a single method with the signature `void Execute()`. Then define two concrete implementations of the interface: `SingleJump` and `DoubleJump`. This will encapsulate the jump behaviors.

```{code-cell}
:tags: [remove-input]
interface IJumpBehavior
{
    void Execute();
}

class SingleJump : IJumpBehavior
{
    public void Execute()
        => Console.WriteLine("Performing regular jump.");
}

class DoubleJump : IJumpBehavior
{
    public void Execute()
        => Console.WriteLine("Performing double jump.");
}
```

When you're done, you should be able to run the following code.

```{code-cell}
IJumpBehavior b1 = new SingleJump();
IJumpBehavior b2 = new DoubleJump();

b1.Execute();
b2.Execute();
```

### Step 2: Refactor the Player Class

Modify the `Player` class to accept an `IJumpBehavior` object through its constructor (constructor injection) and a method (method injection).

```{code-cell}
:tags: [remove-input]
class Player
{
    private IJumpBehavior jumpBehavior;

    public Player(IJumpBehavior jumpBehavior)
        => this.jumpBehavior = jumpBehavior;

    public void MoveRight()
        => Console.WriteLine("Moving right.");

    public void MoveLeft()
        => Console.WriteLine("Moving left.");

    public void Jump()
        => jumpBehavior.Execute();

    public void SetJumpBehavior(IJumpBehavior jumpBehavior)
        => this.jumpBehavior = jumpBehavior;
}
```

When you're done you should be able to run the following code that creates a `Player` instance with a `SingleJump` behavior, calls `Jump()`, and then switches to `DoubleJump` using method injection.

```{code-cell}
IJumpBehavior basicJump = new SingleJump();
Player player = new Player(basicJump);
player.Jump();

IJumpBehavior doubleJump = new DoubleJump();
player.SetJumpBehavior(doubleJump);
player.Jump();
```

```{admonition} 🤔 Reflection
How does refactoring the `Player` class to use dependency injection improve its design? Consider principles like Single Responsibility and Open/Closed.
```

## Challenge

Add a new jump behavior, `GlideJump`, that represents a jump followed by a glide. Implement this behavior and inject it into a `Player` instance. Reflect on how the current design made adding this new feature easier compared to the original design.

When you're done, you should be able to run the following code.

```{code-cell}
:tags: [remove-input]
class GlideJump : IJumpBehavior
{
    public void Execute()
        => Console.WriteLine("Performing jump and glide.");
}
```

```{code-cell}
Player player = new Player(new SingleJump());
player.Jump();

player.SetJumpBehavior(new DoubleJump());
player.Jump();

player.SetJumpBehavior(new GlideJump());
player.Jump();
```

```{admonition} 🤔 Reflection
Reflect on how dependency injection has enabled easier extension of the `Player` class's capabilities. Would adding this new behavior have been as straightforward without dependency injection?
```

