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

# Lab: Manually implemented properties

## Objective

In this exercise, we will transform a traditional method-based approach to managing class state into a more modern, property-based one using manually implemented properties. This will involve refactoring the code to replace public methods that directly manipulate fields with properties that encapsulate the logic for setting and getting field values.

## Provided Code

Carefully review the provided code. Notice that the `Car` class manages its `speed` state using a private field and two public methods, `IncreaseSpeed` and `DecreaseSpeed`. This is a common pattern, but it doesn't take advantage of C#'s property feature.

```{code-cell}
class Car
{
    private int speed;

    public void IncreaseSpeed(int delta)
    {
        if (speed + delta < 0)
            speed = 0;
        else if (speed + delta > 200)
            speed = 200;
        else
            speed += delta;
    }

    public void DecreaseSpeed(int delta)
    {
        if (speed - delta < 0)
            speed = 0;
        else if (speed - delta > 200)
            speed = 200;
        else
            speed -= delta;
    }

    public int GetSpeed()
        => speed;
}
```

## Instructions

### Step 1: Introduce the `Speed` property

Refactor the `Car` class by removing all instance methods and introduce a manually implemented property named `Speed`.
The logic that we removed should now be part of the property's `set` or `get` accessors.

### Step 2: Test your refactored code

Ensure that the logic within the `set` accessor of your new `Speed` property maintains the same rules: speed cannot go below 0 and cannot exceed 200.

```{code-cell}
:tags: [remove-input]
class Car
{
    private int speed;
    public int Speed
    {
        get => speed;
        set
        {
            if (value < 0)
                speed = 0;
            else if (value > 200)
                speed = 200;
            else
                speed = value;
        }
    }
}
```

```{code-cell}
Car saab = new Car();

saab.Speed += 999;
Console.WriteLine(saab.Speed == 200);

saab.Speed -= 999;
Console.WriteLine(saab.Speed == 0);
```

### Step 3: Introduce a `MaxSpeed` property

Add a new (automatically implemented) property called `MaxSpeed` to the `Car` class. Its type should be `int`. This property should have a public `get` accessor and a private `set` accessor.
Add a constructor that takes a single parameter of type `int`. This value should be used to set the `MaxSpeed` of the `Car` object.

```{code-cell}
:tags: [remove-input]
class Car
{
    public int MaxSpeed { get; private set; }
    private int speed;
    public int Speed
    {
        get => speed;
        set
        {
            if (value < 0)
                speed = 0;
            else if (value > MaxSpeed)
                speed = MaxSpeed;
            else
                speed = value;
        }
    }

    public Car (int maxSpeed)
        => MaxSpeed = maxSpeed;
}
```

```{code-cell}
Car tractor = new Car(20);

tractor.Speed += 999;
Console.WriteLine(tractor.Speed == tractor.MaxSpeed);

tractor.Speed -= 999;
Console.WriteLine(tractor.Speed == 0);
```

```{code-cell}
:tags: [raises-exception]
tractor.MaxSpeed = 200; // Should raise exception!
```

## Challenge

Add a `bool` property called `EcoMode` that, when `true`, changes the `get`:er of the `Speed` property to return a value that is 80% below the actual speed to simulate fuel-saving measures.
