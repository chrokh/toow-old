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

# Lab: Subtype polymorphism

## Objective

In this lab, we will refactor a simple program to implement subtype polymorphism. Starting with a `Snake` class that interacts with apples and bombs in a non-polymorphic manner, we will introduce an interface to unify these interactions. Our goal is to deepen our understanding of polymorphism in object oriented programming and learn how to apply it to make our code more flexible and maintainable.

## Provided Code

We begin with a `Snake` class that has methods to simulate eating an apple and a bomb, affecting its length and life status. This setup lacks polymorphism, which we will introduce to improve the design.

```{code-cell}
class Snake
{
    public int Length { get; set; } = 1;
    public bool IsAlive { get; set; } = true;

    public void EatApple()
    {
        if (IsAlive)
            Length++;
    }

    public void EatBomb()
        => IsAlive = false;

    public void Print()
    {
        string status = IsAlive ? "Alive" : "Dead";
        Console.WriteLine($"Snake: {Length} ({status})");
    }
}
```

```{code-cell}
Snake snake = new Snake();

snake.EatApple();
snake.EatApple();
snake.EatApple();

snake.EatBomb();

snake.EatApple();

snake.Print();
```

## Instructions

Let's transform this code to implement subtype polymorphism by introducing an interface called `IEdible`.

### Step 1: Define the Interface

Analyze the `EatApple` and `EatBomb` methods in the `Snake` class. Notice how these methods have the same signature but different names. Also notice how both these methods require the same data.

Create an interface named `IEdible`. This interface should define a method that encapsulates the action of the `Snake` eating an object.

You might want to use the signature `void GetEatenBy (Snake snake)`.

```{code-cell}
:tags: [remove-input]
interface IEdible
{
    void GetEatenBy(Snake snake);
}
```

### Step 2: Implement the Interface

Create two classes called `Apple` and `Bomb` and let them that implement the `IEdible` interface. Ensure that each class defines the appropriate behavior when eaten by the `Snake`.

Your code should behave like this:

```{code-cell}
:tags: [remove-input]
interface IEdible
{
    void GetEatenBy(Snake snake);
}

class Apple : IEdible
{
    public void GetEatenBy(Snake snake)
        => snake.Length++;
}

class Bomb : IEdible
{
    public void GetEatenBy(Snake snake)
        => snake.IsAlive = false;
}
```

```{code-cell}
Snake snake = new Snake();

List<IEdible> edibles = new List<IEdible>() {
    new Apple(),
    new Apple(),
    new Bomb(),
    new Apple()
};

foreach (IEdible edible in edibles)
    edible.GetEatenBy(snake);

snake.Print();
```

Notice how we've removed the `if` statement that checked if the `Snake` was alive, before allowing it to eat the `Apple`. We'll reintroduce this check in the next step.

```{admonition} 🤔 Reflection
How does implementing the `IEdible` interface change the way we interact with the `Apple` and `Bomb` objects? Discuss the benefits of using an interface in this scenario.
```

### Step 3: Refactor the Snake Class

Modify the `Snake` class to remove the `EatApple` and `EatBomb` methods. Instead, introduce a method with the signature `void Eat(IEdible edible)` that allows the `Snake` to interact with any `IEdible` object.

In this step you should also reintroduce the `if` statement that checks if the `Snake` is allowed, so that only snakes that are alive can eat `IEdible`s.
This check should reside in the method `Eat`.

Your code should behave like this:

```{code-cell}
:tags: [remove-input]
class Snake
{
    public int Length { get; set; } = 1;
    public bool IsAlive { get; set; } = true;

    public void Eat(IEdible edible)
    {
        if (IsAlive)
            edible.GetEatenBy(this);
    }

    public void Print()
    {
        string status = IsAlive ? "Alive" : "Dead";
        Console.WriteLine($"Snake: {Length} ({status})");
    }
}

interface IEdible
{
    void GetEatenBy(Snake snake);
}

class Apple : IEdible
{
    public void GetEatenBy(Snake snake)
        => snake.Length++;
}

class Bomb : IEdible
{
    public void GetEatenBy(Snake snake)
        => snake.IsAlive = false;
}
```

```{code-cell}
Snake snake = new Snake();

List<IEdible> edibles = new List<IEdible>() {
    new Apple(),
    new Apple(),
    new Apple(),
    new Bomb(),
    new Apple()
};

foreach (IEdible edible in edibles)
    snake.Eat(edible);

snake.Print();
```

Notice how the `Snake`'s state changes after each interaction.

```{admonition} 🤔 Reflection
How does passing an `IEdible` to a `Snake`  change the way we interact with the `Apple` and `Bomb` objects? Why did we introduce this method?
```

### Step 4: Add `GoldenApple`

Add a new `GoldenApple` class that implements `IEdible`. This `GoldenApple` should take an `int` in its constructor which defines how much the `Snake` should grow by when it is eaten.

Include it in your list of `IEdible` objects and observe the outcome:

```{code-cell}
:tags: [remove-input]
class GoldenApple : IEdible
{
    int n;

    public GoldenApple (int n)
        => this.n = n;

    public void GetEatenBy (Snake snake)
        => snake.Length += n;
}
```

```{code-cell}
Snake snake = new Snake();

List<IEdible> edibles = new List<IEdible>() {
    new Apple(),
    new Apple(),
    new GoldenApple(10),
    new Bomb(),
    new Apple(),
    new GoldenApple(20)
};

foreach (IEdible edible in edibles)
    snake.Eat(edible);

snake.Print();
```

```{admonition} 🤔 Reflection
Reflect on the process of adding the `GoldenApple` to the system. How did the use of polymorphism make this addition easier and more seamless?
```

## Challenge

Add a class called `MetalApple` that implements `IEdible`. This apple should take two `int` arguments in its constructor. The first defines how many times the apple has to be eaten before its effect is applied to the `Snake`. The second defines how much the `Snake` should grow by when the effect is finally applied. The `Snake` that eats the `MetalApple` the last time is the one that the effect is applied to.

It should behave like this:

```{code-cell}
:tags: [remove-input]
class MetalApple : IEdible
{
    int countDown, growth;

    public MetalApple (int countDown, int growth)
    {
        this.countDown = countDown;
        this.growth = growth;
    }

    public void GetEatenBy (Snake snake)
    {
        countDown--;
        if (countDown <= 0)
            snake.Length += growth;
    }
}
```

```{code-cell}
Snake p1 = new Snake();
Snake p2 = new Snake();

MetalApple metalApple = new MetalApple(3, 100);

List<IEdible> edibles = new List<IEdible>() {
    new Apple(),
    new Apple(),
    metalApple,
    metalApple,
    new GoldenApple(10),
    new Bomb(),
    new Apple(),
    new GoldenApple(20)
};

foreach (IEdible edible in edibles)
    p1.Eat(edible);

p2.Eat(metalApple);

p1.Print();
p2.Print();
```


## Conclusion

Through this exercise, you have gained practical experience in applying subtype polymorphism to make your object oriented programs more dynamic.

High-five ✋. Good job.

