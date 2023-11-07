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

# Lab: Computed Properties

## Objective

In this lab, we will delve into the practical usage of computed properties. We aim to understand how computed properties can make our code more concise and maintainable by encapsulating calculations within property accessors.

## Provided Code

Carefully review the provided code. Notice how the `Rectangle` class has two `public` properties, called `Width` and `Height`, with both `get` and `set` accessors.

```{code-cell}
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }
}
```

## Instructions

### Step 1: Introduce a property called `Area` with a `get` accessor

First, let's add a computed property to the `Rectangle` class called `Area`. Define a read-only property `Area` that computes the area as the product of `Width` and `Height`.

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }

    public double Area
    {
        get => Width * Height;
    }
}
```

Instantiate a `Rectangle` object, assign values to `Width` and `Height`, and use `Console.WriteLine` to print the area.

```{code-cell}
Rectangle rect = new Rectangle { Width = 4, Height = 5 };
Console.WriteLine(rect.Area);
```

### Step 2: Add a `set` accessor to `Area`

Now, add a `set` accessor to the `Area` property. For simplicity, when the area is set, adjust the `Width` and `Height` such that the rectangle becomes a square with the given area. Implement the setter inside the `Area` property.

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }

    public double Area
    {
        get => Width * Height;
        set
        {
            Width = Math.Sqrt(value);
            Height = Math.Sqrt(value);
        }
    }
}
```

Test the setter by setting the `Area` property of the `Rectangle` object and then print the `Width`, `Height`, and `Area` to check that they all updated correctly.

```{code-cell}
Rectangle rect = new Rectangle { Width = 10, Height = 8 };

rect.Area = 25;

Console.WriteLine($"{rect.Width} x {rect.Height} = {rect.Area}");
```

```{admonition} 🤔 Reflection
When setting the `Area` we're assuming that the `Rectangle` is a square. Are there other sensible assumptions we could have made when implementing this `set` accessor?
```

### Step 3: Add a property called `Perimeter`

Now we will enhance our `Rectangle` class further by adding another computed property named `Perimeter`. The `get` accessor should calculate the perimeter of the rectangle based on its `Width` and `Height`, while the `set` accessor should set the `Width` and `Height` based on the given perimeter.

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }

    // Existing Area property
    public double Area
    {
        get => Width * Height;
        set
        {
            Width = Math.Sqrt(value);
            Height = Math.Sqrt(value);
        }
    }

    // Computed Perimeter property
    public double Perimeter
    {
        get => 2 * (Width + Height);
        set
        {
            Width = value / 4;
            Height = value / 4;
        }
    }
}
```

Instantiate a `Rectangle` object, set its `Width` and `Height`, and use `Console.WriteLine` to print out the `Perimeter`.

```{code-cell}
Rectangle rect = new Rectangle { Width = 4, Height = 5 };

rect.Perimeter = 100;

Console.WriteLine($"{rect.Width} + {rect.Width} + {rect.Height} + {rect.Height} = {rect.Perimeter}");
```

```{admonition} 🤔 Reflection
How does this property enhance the usability and functionality of the `Rectangle` class?
```


