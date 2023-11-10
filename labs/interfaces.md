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

# Lab: Interfaces

## Objective

In this lab, we will explore the concept of interfaces. We'll learn how to define and implement interfaces, ensuring our classes adhere to specified contracts.

## Provided Code

Carefully review the provided code. Notice how the interface `IShape` defines a contract without specifying implementation details. The interface declares properties and methods that implementing classes must provide.

```{code-cell}
interface IShape
{
    double Width { get; set; }
    double Height { get; set; }
    double Area { get; }
    void Scale (double factor);
}
```

## Instructions

### Step 1: Define classes that implement `IShape`

Write two classes called `Rectangle` and `Ellipse` that both implement the interface `IShape`.

When you're done, you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class Rectangle : IShape, IPositionable
{
    public int X { get; set; }
    public int Y { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area
    {
        get => Width * Height;
        set => Width = Height = Math.Sqrt(value);
    }

    public void Scale(double factor)
    {
        Width *= factor;
        Height *= factor;
    }
}

class Ellipse : IShape, IPositionable
{
    public int X { get; set; }
    public int Y { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area => Math.PI * Width * Height;

    public void Scale(double factor)
    {
        Width *= factor;
        Height *= factor;
    }
}

interface IPositionable
{
    public int X { get; }
    public int Y { get; }
}
```

```{code-cell}
IShape shape1 = new Rectangle() { Width=20, Height=10 };
IShape shape2 = new Ellipse() { Width=50, Height=20 };

Console.WriteLine(shape1.Area);
Console.WriteLine(shape2.Area);

shape1.Scale(0.5);
shape2.Scale(2);

Console.WriteLine(shape1.Area);
Console.WriteLine(shape2.Area);
```

```{important}
Note how the compile-time type (i.e. the type "on the left") of both types is `IShape`.
```

We will create a new interface and implement it in different classes to observe interface functionality.

## Step 2: Define an interface called `IPositionable`

Define an interface called `IPositionable` that demands that its implementors define two publically gettable properties, of type `int`, called `X` and `Y`

Add to the `Rectangle` and `Circle` classes so that they implement the interface `IPositionable`.

When you're done you should be able to run the following code:

```{code-cell}
IPositionable shape1 = new Rectangle
{
    Width = 20,
    Height = 10,
    X = 10,
    Y = 20
};

IPositionable shape2 = new Ellipse
{
    Width = 50,
    Height = 20,
    X = 5,
    Y = 2
};

Console.WriteLine($"({shape1.X}, {shape1.Y})");
Console.WriteLine($"({shape2.X}, {shape2.Y})");
```

