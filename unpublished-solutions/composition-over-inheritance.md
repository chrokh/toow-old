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

void TestAnimal(Animal animal)
    => Console.WriteLine($"{animal.Move()} | {animal.Eat()} | {animal.Sleep()}");

TestAnimal(human);
TestAnimal(fish);
TestAnimal(mermaid);
TestAnimal(student);
TestAnimal(bird);


public interface IEatingBehavior
{
    string Eat();
}

public interface ISleepingBehavior
{
    string Sleep();
}

public interface IMovingBehavior
{
    string Move();
}


public class SeaAndLandFoodEating : IEatingBehavior
{
    public string Eat() => "Eating sea and land food.";
}

public class SeaFoodEating : IEatingBehavior
{
    public string Eat() => "Eating sea food.";
}

public class BeerDiet : IEatingBehavior
{
    public string Eat() => "Consuming beer.";
}


public class Sleeping : ISleepingBehavior
{
    public string Sleep() => "Sleeping.";
}

public class Resting : ISleepingBehavior
{
    public string Sleep() => "Resting.";
}

public class NoSleep : ISleepingBehavior
{
    public string Sleep() => "No time for sleep.";
}


public class Swimming : IMovingBehavior
{
    public string Move() => "Swimming.";
}

public class Walking : IMovingBehavior
{
    public string Move() => "Walking.";
}

public class Flying : IMovingBehavior
{
    public string Move() => "Flying.";
}


public class Animal
{
    private IEatingBehavior eatingBehavior;
    private ISleepingBehavior sleepingBehavior;
    private IMovingBehavior movingBehavior;

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
```

