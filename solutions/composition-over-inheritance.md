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

# Solution: Composition over inheritance

```{code-cell}

Animal human = new Animal(new SeaAndLandFoodEating(), new Sleeping(), new Walking());
Animal fish = new Animal(new SeaFoodEating(), new Resting(), new Swimming());
Animal mermaid = new Animal(new SeaAndLandFoodEating(), new Sleeping(), new Swimming());
Animal student = new Animal(new BeerDiet(), new NoSleep(), new Walking());
Animal bird = new Animal(new SeaFoodEating(), new Sleeping(), new Flying());

human.Eat();
fish.Eat();
mermaid.Eat();
student.Eat();
bird.Eat();

human.Sleep();
fish.Sleep();
mermaid.Sleep();
student.Sleep();
bird.Sleep();

human.Move();
fish.Move();
mermaid.Move();
student.Move();
bird.Move();


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

public class BeerDiet : IEatingBehavior
{
    public void Eat() => Console.WriteLine("Consuming beer.");
}


public class Sleeping : ISleepingBehavior
{
    public void Sleep() => Console.WriteLine("Sleeping.");
}

public class Resting : ISleepingBehavior
{
    public void Sleep() => Console.WriteLine("Resting.");
}

public class NoSleep : ISleepingBehavior
{
    public void Sleep() => Console.WriteLine("No time for sleep.");
}


public class Swimming : IMovingBehavior
{
    public void Move() => Console.WriteLine("Swimming.");
}

public class Walking : IMovingBehavior
{
    public void Move() => Console.WriteLine("Walking.");
}

public class Flying : IMovingBehavior
{
    public void Move() => Console.WriteLine("Flying.");
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

