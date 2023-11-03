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

# Lab Exercise: Instance Method Overloading

## Objective

In this lab, we will delve into the concept of instance method overloading by applying it to a practical example. We'll refine and expand a given class by adding overloadeds of an existing instance method. The purpose is to understand how to implement method overloading to enhance code readability and maintainability.

## Provided Code

Carefully review the provided code. Notice the structure of the `Rectangle` class, which includes private fields for dimensions, a constructor to initialize these fields, and a `Scale` method designed to adjust the rectangle's size. The `Scale` method double to scale both dimensions equally, while the second takes two doubles to scale each dimension independently.

```{code-cell}
class Rectangle
{
    private double width, height;

    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public void Scale(double widthFactor, double heightFactor)
    {
        width *= widthFactor;
        height *= heightFactor;
    }

    public void Print()
    {
        Console.WriteLine($"({width} x {height})");
    }
}
```

```{code-cell}
Rectangle rect = new Rectangle(20, 10);
rect.Print();

rect.Scale(3, 2);
rect.Print();
```

## Instructions

We will now enhance our `Rectangle` class by adding more overloaded methods and utilizing them.

### Step 1: Add Overloaded `Scale` method

Create a new overloaded `Scale` method that accepts a single `double` parameter. This method should call the other `Scale` method and thereby scale the rectangle with the same factor in both dimensions.

Instantiate a `Rectangle` and use both `Scale` methods to demonstrate their functionality. Print the dimensions after each scaling operation to verify the methods work as expected.

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    private double width, height;

    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public void Scale(double widthFactor, double heightFactor)
    {
        width *= widthFactor;
        height *= heightFactor;
    }

    public void Scale(double factor)
        => Scale(factor, factor);

    public void Print()
    {
        Console.WriteLine($"({width} x {height})");
    }
}
```

```{code-cell}
Rectangle rect = new Rectangle(200, 100);
rect.Print();

rect.Scale(0.5);
rect.Print();

rect.Scale(2, 1);
rect.Print();
```

### Step 2: Add an Overload That Takes a `Point`

Consider the following class that can be used to represents points:

```{code-cell}
class Point
{
    public int X;
    public int Y;

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
}
```

Add the class to your code base and add another overload of the method `Scale` with the signature `void Scale(Point point)`.

Go back to the main method and use all three overloads of `Scale` to make sure that they all work.

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    private double width, height;

    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public void Scale(double widthFactor, double heightFactor)
    {
        width *= widthFactor;
        height *= heightFactor;
    }

    public void Scale(double factor)
        => Scale(factor, factor);

    public void Scale(Point point)
        => Scale(point.X, point.Y);

    public void Print()
    {
        Console.WriteLine($"({width} x {height})");
    }
}
```

```{code-cell}
Rectangle rect = new Rectangle(2, 1);
rect.Print();

Point point = new Point(10, 5);
rect.Scale(point);
rect.Print();

rect.Scale(new Point(2, 1));
rect.Print();

rect.Scale(0.5);
rect.Print();

rect.Scale(10, 100);
rect.Print();
```

## Challenge

Add three instance methods with the following signatures:

```csharp
public void SetAspectRatio (double ratio);
public void SetAspectRatio (Rectangle other);
public void SetAspectRatio (Point point);
```

These methods should change the dimensions of a `Rectangle` object  in order to achieve the desired aspect ratio (in terms of width/height).

There's many ways to choose whether to change the width or the height but let's here choose a strategy where we always *increase* a dimension.
To determine which dimension needs to be increased we can check whether the new ratio is larger than the old ratio.
If the new ratio is larger then we should increase width, and if not then we should increase height.

When you're done you should be able to do the following:

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    private double width, height;

    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public void Scale(double widthFactor, double heightFactor)
    {
        width *= widthFactor;
        height *= heightFactor;
    }

    public void Scale(double factor)
        => Scale(factor, factor);

    public void Scale(Point point)
        => Scale(point.X, point.Y);

    public void SetAspectRatio(Point point)
        => SetAspectRatio((double)point.X / (double)point.Y);

    public void SetAspectRatio(Rectangle other)
        => SetAspectRatio(other.width / other.height);

    public void SetAspectRatio(double ratio)
    {
        double currentRatio = width / height;
        if (ratio > currentRatio)
        {
            // Increase width
            width = height * ratio;
        }
        else
        {
            // Increase height
            height = width / ratio;
        }
    }

    public void Print()
    {
        Console.WriteLine($"({width} x {height})");
    }
}
```

```{code-cell}
Rectangle rect = new Rectangle(5, 20);
rect.Print();

rect.SetAspectRatio(0.5);
rect.Print();

rect.SetAspectRatio(new Rectangle(16, 9));
rect.Print();

rect.SetAspectRatio(new Point(9, 16));
rect.Print();
```

## Conclusion

Good job. You're on fire. 🔥

