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

# Lab: The `base` keyword

## Objective

In this lab exercise, we will delve into the functionality of the `base` keyword. Our goal is to understand how `base` can be used **to access members of a base class from within a derived class**. This is a fundamental concept in object oriented programming, particularly when dealing with inheritance and method overriding.

## Provided Code

Carefully review the provided code. Notice that it defines a class called `Shape` with properties for position (`X`, `Y`) and size (`Width`, `Height`). The `Print` method displays these properties.
In this lab we will write classes that inherit from `Shape` and `override` the `Print` method.

```{code-cell}
class Shape
{
    public int X { get; set; } = 0;
    public int Y { get; set; } = 0;
    public int Width { get; set; } = 1;
    public int Height { get; set; } = 1;

    public virtual void Print()
    {
        Console.WriteLine($"Position:\t ({X}, {Y})");
        Console.WriteLine($"Size:\t\t {Width} x {Height}");
    }
}
```

## Instructions

### Step 1: Implement the `Star` Class

Start by implementing the `Star` class. This class should inherit from `Shape` and include an additional property called `NumberOfPoints`. When you’re done, you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class Star : Shape
{
    int numberOfPoints;
    public int NumberOfPoints
    {
        get => numberOfPoints;
        set
        {
            if (value < 2)
                throw new ArgumentException("Star must have at least 2 points.");
            numberOfPoints = value;
        }
    }

    public override void Print()
    {
        base.Print();
        Console.WriteLine($"Points:\t\t {NumberOfPoints}");
    }
}
```

```{code-cell}
new Star()
{
    X = 12,
    Y = 3,
    Width = 20,
    Height = 18,
    NumberOfPoints = 5
}.Print();
```

```{code-cell}
new Star() { NumberOfPoints = 8 }.Print();
```

```{important}
You should **not** have to duplicate `Shape`'s implementation of `Print` in its subclasses.
```

```{admonition} 🤔 Reflection
How does using the `base` keyword in the `Star` class's `Print` method simplify your code and maintain consistency with the `Shape` class?
```

### Step 2: Implement the `Ellipse` Class

Now, let's implement the `Ellipse` class. This class should also inherit from `Shape`. It should calculate and display the major and minor axes based on its width and height. Once completed, you should be able to run the following example:

```{code-cell}
:tags: [remove-input]
class Ellipse : Shape
{
    public int MajorAxis => Math.Max(Width, Height);
    public int MinorAxis => Math.Min(Width, Height);

    public override void Print()
    {
        base.Print();
        Console.WriteLine($"Major axis:\t {MajorAxis}");
        Console.WriteLine($"Minor axis:\t {MinorAxis}");
    }
}
```

```{code-cell}
new Ellipse()
{
    X = 12,
    Y = 3,
    Width = 20,
    Height = 18
}.Print();
```

```{code-cell}
new Ellipse() { Width = 50, Height = 100 }.Print();
```

## Conclusion

Simple enough. Good job. Let's keep exploring. 🔎

