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

# Lab: Composition over Inheritance

**Objective**:
Refactor the provided inheritance-based code to leverage Composition over inheritance, aiming for a more flexible, maintainable, and logically coherent representation of entities.

## Step 1: Understand the provided code

Study the starting code given to you.

```{code-cell}
:tags: [hide-input]
public abstract class Animal
{
    public abstract void Eat();
    public abstract void Sleep();
    public abstract void Move();
}
```

```{code-cell}
:tags: [hide-input]
// Concrete Animal Classes
public class Human : Animal
{
    public override void Eat() => Console.WriteLine("Eating sea and land food.");
    public override void Sleep() => Console.WriteLine("Sleeping.");
    public override void Move() => Console.WriteLine("Walking.");
}
```

```{code-cell}
:tags: [hide-input]
public class Fish : Animal
{
    public override void Eat() => Console.WriteLine("Eating sea food.");
    public override void Sleep() => Console.WriteLine("Resting.");
    public override void Move() => Console.WriteLine("Swimming.");
}
```

```{code-cell}
:tags: [hide-input]
public class Mermaid : Animal
{
    public override void Eat() => Console.WriteLine("Eating sea and land food.");
    public override void Sleep() => Console.WriteLine("Sleeping.");
    public override void Move() => Console.WriteLine("Swimming.");
}
```

```{code-cell}
:tags: [hide-input, hide-output]
Animal human = new Human();
Animal fish = new Fish();
Animal mermaid = new Mermaid();

human.Eat();
fish.Eat();
mermaid.Eat();

human.Sleep();
fish.Sleep();
mermaid.Sleep();

human.Move();
fish.Move();
mermaid.Move();
```

## Step 2: Identify behaviors

Identify which behaviors are **shared** and which are **different** among the classes. These should include eating, sleeping, and moving.

```{admonition} 🤔 Reflection
Why can we not use simple inheritance to eliminate the duplication?
Or even if we can, why would that be a bad idea?
```

## Step 3: Define behavior interfaces

Create separate interfaces for each identified behavior. For instance, `IEatingBehavior` for eating.

```{admonition} 🤔 Reflection
How does defining behavior through interfaces contribute to code flexibility and maintainability?
```

## Step 4: Implement concrete behaviors

Implement specific classes for each behavior interface. For example, you could have `Sleeping` and `Resting` as implementations of `IEatingBehavior`.

## Step 5: Compose classes through dependency injection

Remove the old classes `Human`, `Fish`, and `Mermaid` and replace them with the class called `Animal`.
The class `Animal` should no longer be abstract.
The three types of behavior that a given animal uses should be dependency injected through the constructor of `Animal`.

```{admonition} 🤔 Reflection
How does composition of behaviors help in representing real-world entities more accurately compared to inheritance?
```

## Step 6: Instantiate and test

Instantiate objects for the refactored classes and test their behaviors.
The `Main` method should now look like the code below and the output should be the same as before.

```{code-cell}
:tags: [remove-input]

public interface IEatingBehavior
{
    void Eat();
}

public interface ISleepingBehavior
{
    void Sleep();
}

public interface IMovingBehavior
{
    void Move();
}

public class SeaAndLandFoodEating : IEatingBehavior
{
    public void Eat() => Console.WriteLine("Eating sea and land food.");
}

public class SeaFoodEating : IEatingBehavior
{
    public void Eat() => Console.WriteLine("Eating sea food.");
}

public class Sleeping : ISleepingBehavior
{
    public void Sleep() => Console.WriteLine("Sleeping.");
}

public class Resting : ISleepingBehavior
{
    public void Sleep() => Console.WriteLine("Resting.");
}

public class Swimming : IMovingBehavior
{
    public void Move() => Console.WriteLine("Swimming.");
}

public class Walking : IMovingBehavior
{
    public void Move() => Console.WriteLine("Walking.");
}

public class Animal
{
    private readonly IEatingBehavior eatingBehavior;
    private readonly ISleepingBehavior sleepingBehavior;
    private readonly IMovingBehavior movingBehavior;

    public Animal(
        IEatingBehavior eatingBehavior,
        ISleepingBehavior sleepingBehavior,
        IMovingBehavior movingBehavior)
    {
        this.eatingBehavior = eatingBehavior;
        this.sleepingBehavior = sleepingBehavior;
        this.movingBehavior = movingBehavior;
    }

    public void Eat() => eatingBehavior.Eat();
    public void Sleep() => sleepingBehavior.Sleep();
    public void Move() => movingBehavior.Move();
}
```

```{code-cell}
:tags: [hide-input]
Animal human = new Animal(new SeaAndLandFoodEating(), new Sleeping(), new Walking());
Animal fish = new Animal(new SeaFoodEating(), new Resting(), new Swimming());
Animal mermaid = new Animal(new SeaAndLandFoodEating(), new Sleeping(), new Swimming());
```

```{admonition} 🤔 Reflection
Notice how behaviors are now composed and can be mixed and matched as needed. What are the benefits of this?
```

## Step 7: Add your own behaviors and animals

Add a new behavior class, such as `Flying`, for each behavior type.
Then instantiate two new `Animal` objects that use these types along with some of your existing types.

```{admonition} 🤔 Reflection
How easy would it have been to add this additional behavior using the design that we had in the beginning?
```



