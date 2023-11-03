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

# Lab: Constructor overloading

## Objective

In this exercise, we will explore the concept of constructor overloading in C#. We aim to understand the flexibility and convenience that multiple constructors bring to a class's instantiation process. We will modify the provided `Rectangle` class to allow different ways of object creation.

## Provided Code

Consider the provided code. Notice how the `Rectangle` class has two `private` instance fields but no way to actually set their values.
We do have a `public` method which will help us print `Rectangle` objects however.

```{code-cell}
:tags: [remove-output]
class Rectangle
{
    private double width, height;

    public void Print()
    {
        Console.WriteLine($"({width} x {height})");
    }
}
```

```{code-cell}
Rectangle rect = new Rectangle();
rect.Print();
```

## Instructions

Let's enhance the `Rectangle` class by adding multiple constructors to provide different ways of instantiating rectangle objects.

### Step 1: Add a constructor that takes two parameters

Let's begin by adding a constructor that takes two parameters of type `double` corresponding to `width` and `height`.
When you're done you should be able to execute the following code:

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    private double width, height;

    // Existing constructor
    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    // New constructor for squares
    public Rectangle(double side)
    {
        width = height = side;
    }

    public Rectangle(Rectangle other)
    {
        this.width = other.width;
        this.height = other.height;
    }

    public Rectangle()
    {
        width = height = 1;
    }

    public Rectangle(string dimensions)
    {
        string[] parts = dimensions.Split(',');
        try
        {
            width = double.Parse(parts[0]);
            height = double.Parse(parts[1]);
        }
        catch (Exception)
        {
            throw new ArgumentException("Could not parse input.");
        }
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
```

```{admonition} 🤔 Reflection
Is it possible to add another constructor with two parameters of type `double` to the class `Rectangle`? Why or why not?
```


### Step 2: Add a square constructor

Let's now add another constructor that only has a single `double` parameter. This constructor will create a `Rectangle` object where the `width` and `height` are equal, effectively creating a square.

When you're done with this step you should be able to run the following code:

```{code-cell}
Rectangle r1 = new Rectangle(20, 10);
r1.Print();

Rectangle r2 = new Rectangle(100);
r2.Print();
```

### Step 3: Add a copy constructor

Let's now add a constructor to the `Rectangle` class that takes another `Rectangle` object and initializes a new instance with the same dimensions as that rectangle.

When you're done you should be able to run the following code:

```{code-cell}
Rectangle r1 = new Rectangle(20, 10);
r1.Print();

Rectangle r2 = new Rectangle(100);
r2.Print();

Rectangle r3 = new Rectangle(r1);
r3.Print();
```

### Step 4: Add a parameterless constructor

Remember how defining a constructor with parameters causes the default parameterless constructor to be removed?
Have a look at the error below:

```{code-cell}
:tags: [raises-exception]
new Rectangle();
```

Let's reintroduce a parameterless constructor and choose a sensible default like 1x1.
When you're done you should be able to run the following:

```{code-cell}
Rectangle r1 = new Rectangle(20, 10);
r1.Print();

Rectangle r2 = new Rectangle(100);
r2.Print();

Rectangle r3 = new Rectangle(r1);
r3.Print();

Rectangle r4 = new Rectangle();
r4.Print();
```

## Challenge

Implement a constructor in the `Rectangle` class that accepts a single `string` parameter in the format `width,height`. Your constructor must parse this `string` to extract the `width` and `height` as `double` values and then initialize the rectangle's dimensions accordingly.

If the parsing fails due to an invalid format or non-numeric values, your constructor should throw an appropriate exception, like this:

```csharp
throw new ArgumentException("Could not parse input.");
```

When you're done you should be able to run the following code:

```{code-cell}
:tags: [raises-exception]
Rectangle r1 = new Rectangle(20, 10);
r1.Print();

Rectangle r2 = new Rectangle(100);
r2.Print();

Rectangle r3 = new Rectangle(r1);
r3.Print();

Rectangle r4 = new Rectangle();
r4.Print();

Rectangle r5 = new Rectangle("16.5,9.7");
r5.Print();

Rectangle r6 = new Rectangle("12,hello");
```

## Conclusion

```{admonition} 🤔 Reflection
How do the constructors we've added enhance the object creation process for the `Rectangle` class? Reflect on scenarios where each constructor might be the most useful. In a later lab we'll practice on constructor chaining which makes this process even simpler.
```

Excellent work! You've expanded the `Rectangle` class functionality by overloading its constructor. In a later lab we'll practice on constructor chaining which makes this process even simpler.

