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

## Objective

Refactor the provided inheritance-based code to leverage Composition over inheritance, aiming for a more flexible, maintainable, and logically coherent representation of entities.


## Provided code

Study the starting code given to you.
Notice how the three classes `Human`, `Fish`, and `Mermaid` all inherit from the class `Animal`.
Then notice how the `Main` method defines a local function that takes an object of type `Animal` which, through subtype polymorphism, allows us to call the instance methods of said animal without knowing whether it's a `Human`, `Fish`, or `Mermaid`.

```{code-cell}
abstract class Animal
{
    public abstract string Eat();
    public abstract string Sleep();
    public abstract string Move();
}
```

```{code-cell}
class Human : Animal
{
    public override string Eat() => "Eating sea and land food.";
    public override string Sleep() => "Sleeping.";
    public override string Move() => "Walking.";
}
```

```{code-cell}
class Fish : Animal
{
    public override string Eat() => "Eating sea food.";
    public override string Sleep() => "Resting.";
    public override string Move() => "Swimming.";
}
```

```{code-cell}
class Mermaid : Animal
{
    public override string Eat() => "Eating sea and land food.";
    public override string Sleep() => "Sleeping.";
    public override string Move() => "Swimming.";
}
```

```{code-cell}
void TestAnimal(Animal animal)
    => Console.WriteLine($"{animal.Move()} | {animal.Eat()} | {animal.Sleep()}");

TestAnimal(new Human());
TestAnimal(new Fish());
TestAnimal(new Mermaid());
```


## Instructions

### Step 1: Identify behaviors

Identify which behaviors are **shared** and which are **different** among the classes. These should include eating, sleeping, and moving.

```{admonition} 🤔 Reflection
Why can we not use simple inheritance to eliminate the duplication?
Or even if we can, why would that be a bad idea?
```

### Step 2: Define behavior interfaces

Create separate interfaces for each identified behavior. For instance, `IEatingBehavior` for eating.

```{admonition} 🤔 Reflection
How does defining behavior through interfaces contribute to code flexibility and maintainability?
```

### Step 3: Implement concrete behaviors

Implement specific classes for each behavior interface. For example, you could have `Sleeping` and `Resting` as implementations of `IEatingBehavior`.

### Step 3: Compose classes through dependency injection

Remove the old classes `Human`, `Fish`, and `Mermaid` and replace them with the class called `Animal`.
The class `Animal` should no longer be abstract.
The three types of behavior that a given animal uses should be dependency injected through the constructor of `Animal`.

```{admonition} 🤔 Reflection
How does composition of behaviors help in representing real-world entities more accurately compared to inheritance?
```

### Step 4: Instantiate and test

Instantiate objects for the refactored classes and test their behaviors.
The `Main` method should now look like the code below and the output should be the same as before.

```{code-cell}
:tags: [remove-input]

interface IEatingBehavior
{
    string Eat();
}

interface ISleepingBehavior
{
    string Sleep();
}

interface IMovingBehavior
{
    string Move();
}

class SeaAndLandFoodEating : IEatingBehavior
{
    public string Eat() => "Eating sea and land food.";
}

class SeaFoodEating : IEatingBehavior
{
    public string Eat() => "Eating sea food.";
}

class Sleeping : ISleepingBehavior
{
    public string Sleep() => "Sleeping.";
}

class Resting : ISleepingBehavior
{
    public string Sleep() => "Resting.";
}

class Swimming : IMovingBehavior
{
    public string Move() => "Swimming.";
}

class Walking : IMovingBehavior
{
    public string Move() => "Walking.";
}

class Animal
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

    public string Eat() => eatingBehavior.Eat();
    public string Sleep() => sleepingBehavior.Sleep();
    public string Move() => movingBehavior.Move();
}

void TestAnimal(Animal animal)
    => Console.WriteLine($"{animal.Move()} | {animal.Eat()} | {animal.Sleep()}");
```

```{code-cell}
Animal human = new Animal(new SeaAndLandFoodEating(), new Sleeping(), new Walking());
Animal fish = new Animal(new SeaFoodEating(), new Resting(), new Swimming());
Animal mermaid = new Animal(new SeaAndLandFoodEating(), new Sleeping(), new Swimming());

TestAnimal(human);
TestAnimal(fish);
TestAnimal(mermaid);
```

```{admonition} 🤔 Reflection
Notice how behaviors are now composed and can be mixed and matched as needed. What are the benefits of this?
```

### Step 5: Add your own behaviors and animals

Add a new behavior class, such as `Flying`, for each behavior type.
Then instantiate two new `Animal` objects that use these types along with some of your existing types.

```{admonition} 🤔 Reflection
How easy would it have been to add this additional behavior using the design that we had in the beginning?
```



