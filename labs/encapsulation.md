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

# Lab: Encapsulation

## Objective

In this lab, we delve into the principle of encapsulation by refactoring a `Car` class. We will control access to the `Speed` and `TopSpeed` attributes through instance methods, ensuring that the state of our car objects remains valid and realistic.

## Provided Code

Carefully review the provided code. Notice the public fields `Speed` and `TopSpeed` that allow any part of the code to modify these values, potentially leading to inconsistent object states.

```{code-cell}
:tags: [remove-output]
class Car
{
    public string Name;
    public int Speed;
    public int TopSpeed;

    public void Accelerate()
    {
        if (Speed < TopSpeed)
            Speed++;
    }

    public void Brake()
    {
        if (Speed > 0)
            Speed--;
    }

    public void Print()
    {
        Console.WriteLine($"{Name}: {Speed} ({TopSpeed})");
    }
}
```

While the instance methods `Accelerate` and `Brake` indeed respects the top speed and the requirement that speed cannot be negative we can bypass this by changing the `Speed` field directly.

```{code-cell}
Car beetle = new Car();
beetle.Name = "Beetle";
beetle.TopSpeed = 120;
beetle.Speed = 30000; // 🤔 Wait a minute...
beetle.Speed = -400; // Eh, is reversing allowed?
```

## Instructions

### Step 1: Make the Fields Private

Convert all the fields into private fields in order to encapsulate them.

```{code-cell}
:tags: [remove-output]
class Car
{
    private string name;
    private int speed;
    private int topSpeed;

    // ...
}
```

```{note}
Remember that members are `private` by default so we can actually emit the keyword `private` alltogether should we so wish.
```

```{note}
Since `private` fields are conventionally named using camelCase rather than pascalCase, remember to change the name of the fields.
```

### Step 2: Implement Instance Methods for Access and Modification

Let's now write methods to accellerate and brake in a controlled manner.

```{code-cell}
:tags: [remove-output]
class Car
{
    private string name;
    private int speed;
    private int topSpeed;

    public void Accelerate() {
        if (speed < topSpeed)
            speed++;
    }

    public void Brake() {
        if (speed > 0)
            speed--;
    }

    public void Print()
    {
        Console.WriteLine($"{name}: {speed} ({topSpeed})");
    }
}
```

But, how are we now supposed to set the `topSpeed` and `name`? 🤷

### Step 3: Set initial state using a Constructor

Let's add a constructor that takes a parameter of type `string` called `name` and an `int` called `topSpeed`.

```{code-cell}
:tags: [remove-output]
class Car
{
    private string name;
    private int speed;
    private int topSpeed;

    public Car (string name, int topSpeed)
    {
        this.name = name;
        this.topSpeed = topSpeed;
    }

    public void Accelerate() {
        if (speed < topSpeed)
            speed++;
    }

    public void Brake() {
        if (speed > 0)
            speed--;
    }

    public void Print()
    {
        Console.WriteLine($"{name}: {speed} ({topSpeed})");
    }
}
```

```{admonition} 🤔 Reflection
How is this code more encapsulated than the code that we started with?
Can an object of type `Car` now end up in an inconsistent state where `Speed` exceeds `topSpeed` or is below 0?
```

### Step 4: Test the Code

Instantiate two `Car` objects with different top speed and check whether their `Accelerate` and `Brake` methods seem to work.

```{code-cell}
Car roadster = new Car("Roadster", 3);
Car cybertruck = new Car("Cybertruck", 1);

Car[] cars = new Car[] { roadster, cybertruck };

// Accellerate
foreach (Car car in cars)
{
    for (int i=0; i<5; i++)
        car.Accelerate();

    car.Print();

    for (int i=0; i<5; i++)
        car.Brake();

    car.Print();
}
```


## Challenge

Add a new instance method to the `Car` class with the signature `void Match(Car other)`. The method should set the speed of this car to the speed of the other.

```{code-cell}
:tags: [remove-input]
class Car
{
    private string name;
    private int speed;
    private int topSpeed;

    public Car (string name, int topSpeed)
    {
        this.name = name;
        this.topSpeed = topSpeed;
    }

    public void Accelerate() {
        if (speed < topSpeed)
            speed++;
    }

    public void Brake() {
        if (speed > 0)
            speed--;
    }

    public void MatchSpeed(Car other)
    {
        this.speed = other.speed;
    }

    public void Print()
    {
        Console.WriteLine($"{name}: {speed} ({topSpeed})");
    }
}
```

```{code-cell}
Car roadster = new Car("Roadster", 3);
Car cybertruck = new Car("Cybertruck", 1);

roadster.Accelerate();
roadster.Accelerate();
roadster.Accelerate();

cybertruck.MatchSpeed(roadster);
cybertruck.Print(); // Oh no 😬
```



```{admonition} 🤔 Reflection
By creating the `Match` method, we are allowing one instance of `Car` to interact with the private state of another instance. What does this teach us about how `private` works? How might this be useful in practice?
```

Through this lab, we have put the concept of encapsulation into practice by limiting access to the internal state of our `Car` objects, thereby enhancing the robustness and reliability of our code.
In effect, we have encapsulated the implementation details, or "hidden our private parts" 😳.
But we've also reflected over how the nuances caused by how `private` members are private to the type in which they are defined, not to objects of the class.

Good job! 👊


