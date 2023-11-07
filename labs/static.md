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

# Lab: Static

## Objective

In this lab, we will be working with static members in C#. Specifically, we will modify a `Rectangle` class to track the number of instances created and to calculate the average area of all created rectangles.
Understanding static members and classes will help us better appreciate why they should be avoided.

## Provided Code

Carefully review the provided code. Notice how, currently, there is no mechanism to track the total number of `Rectangle` instances or perform operations across all instances.

```{code-cell}
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area => Width * Height;

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }
}
```

The `Rectangle` class provided includes properties for `Width` and `Height`, a constructor to set those properties, and a computed, read-only property called `Area` that computes the area of the rectangle.

## Instructions

### Step 1: Introduce a Static Property

First, introduce add a static property to the `Rectangle` class to keep track of how many rectangles have been instantiated. You can call it `Count` and it should have a `public` `get` accessor but a `private` `set` accessor.

For each `Rectangle` instance created, increment the static counter field. This will allow us to keep track of how many rectangles have been created.

Here's what the code should behave like:

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area => Width * Height;

    public static int Count { get; private set; } = 0;

    public Rectangle(double width, double height)
    {
        Count++;
        Width = width;
        Height = height;
    }
}
```

```{code-cell}
new Rectangle(20, 10);
new Rectangle(2, 5);
new Rectangle(10, 12);

Console.WriteLine(Rectangle.Count);
```

### Step 2: Static Constructor Message

Next, add a static constructor in the `Rectangle` class that writes a message to the console indicating that the rectangle counter is active.

Here's what the code should behave like:

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area => Width * Height;

    public static int Count { get; private set; }

    static Rectangle()
    {
        Console.WriteLine("Rectangle counter is now active.");
    }

    public Rectangle(double width, double height)
    {
        Count++;
        Width = width;
        Height = height;
    }
}
```

```{code-cell}
new Rectangle(20, 10);
new Rectangle(2, 5);
new Rectangle(110, 12);

Console.WriteLine(Rectangle.Count);
```

### Step 3: Array of Rectangles

Introduce another static field of type `Rectangle[]`. This static field should be an array that always contains all `Rectangle`s that have been created. You should achieve this by updating the constructor so that it adds the new `Rectangle` instance to this array.

This should also allow you to refactor the static property called `Count`, into a computed, read-only property who's value is computed from the array.

The code should behave like this:

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area => Width * Height;

    public static int Count { get => Instances.Length; }
    public static Rectangle[] Instances { get; private set; } = new Rectangle[0];
    public static double AverageArea
    {
        get
        {
            double sum = 0;
            foreach (Rectangle rect in Instances)
                sum += rect.Area;
            return sum / Count;
        }
    }

    static Rectangle()
    {
        Console.WriteLine("Rectangle counter is now active.");
    }

    public Rectangle(double width, double height)
    {
        Rectangle[] updated = new Rectangle[Instances.Length + 1];
        for (int i = 0; i < Instances.Length; i++)
            updated[i] = Instances[i];
        updated[updated.Length - 1] = this;
        Instances = updated;

        Width = width;
        Height = height;
    }
}
```

```{code-cell}
new Rectangle(20, 10);
new Rectangle(2, 5);
new Rectangle(10, 12);

foreach (Rectangle rect in Rectangle.Instances)
    Console.WriteLine($"{rect.Width}x{rect.Height} = {rect.Area}");
```

### Step 4: Computed Read-Only Static Property

Implement a static property called `AverageArea` that computes the average area of all rectangles stored in the static array.

The code should behave like this:

```{code-cell}
new Rectangle(20, 10);
new Rectangle(2, 5);
new Rectangle(10, 12);

Console.WriteLine(Rectangle.AverageArea);
```

## Challenge

Consider how you would write a program to achieve similar functionality without using static members. Before tackling this problem, make sure you understand Object Composition and how it can be used to manage state and behavior among objects.

```{admonition} 🤔 Reflection
Reflect on how the use of static members changes the design and functionality of our `Rectangle` class. What are the limitations and benefits of using static members in this scenario? Can you think of any potential issues with using a static array to store instances?
```

```{hint}
To redesigning the solution without static members, consider how an instance of another class might manage multiple `Rectangle` instances and perform the necessary calculations.
```

