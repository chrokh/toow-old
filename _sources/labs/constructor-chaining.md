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

# Lab: Constructor Chaining

## Objective

In this lab, we will explore the concept of constructor chaining. Constructor chaining is a technique where a constructor in a class calls another constructor in the same class or in its superclass. This approach promotes code reusability and efficient object initialization with different parameters. By mastering constructor chaining, we can write more maintainable and concise code.

## Provided Code
Carefully review the provided code. Notice how the `Rectangle` class has a single constructor that accepts `width` and `height`.

```{code-cell}
class Rectangle
{
    public double Width { get; private set; }
    public double Height { get; private set; }

    public Rectangle(double width, double height)
    {
        this.Width = width;
        this.Height = height;
    }
}
```

## Instructions

### Step 1: Overload the constructor

Add another constructor to the `Rectangle` class that takes a single parameter of type `double` called `side`.
This constructor should call the other constructor using the `this` keyword so that we get the following behavior:

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    public double Width { get; private set; }
    public double Height { get; private set; }

    public Rectangle(double side) : this(side, side) {}
    public Rectangle(double width, double height)
    {
        this.Width = width;
        this.Height = height;
    }
}
```

```{code-cell}
List<Rectangle> rectangles = new List<Rectangle>() {
    new Rectangle(12),
    new Rectangle(200, 100)
};

foreach (Rectangle rect in rectangles)
    Console.WriteLine($"{rect.Width} x {rect.Height}");
```

```{important}
You should be able to solve this step by adding a **single line of code** to the `Rectangle` class.
```

```{admonition} 🤔 Reflection
Think about how constructor chaining contributes to the principles of DRY (Don't Repeat Yourself) and code maintainability.
```

### Step 2: Add another overload

Add another constructor to the `Rectangle` class that takes a single parameter of type `Rectangle` called `other`.
This constructor should call another constructor using the `this` keyword so that we get the following behavior:

```{code-cell}
:tags: [remove-input]
class Rectangle
{
    public double Width { get; private set; }
    public double Height { get; private set; }

    public Rectangle(Rectangle other) : this(other.Width, other.Height) {}
    public Rectangle(double side) : this(side, side) {}
    public Rectangle(double width, double height)
    {
        this.Width = width;
        this.Height = height;
    }
}
```

```{code-cell}
List<Rectangle> rectangles = new List<Rectangle>() {
    new Rectangle(12),
    new Rectangle(new Rectangle(20, 10)),
    new Rectangle(200, 100)
};

foreach (Rectangle rect in rectangles)
    Console.WriteLine($"{rect.Width} x {rect.Height}");
```

```{important}
You should be able to solve this step by adding a **single line of code** to the `Rectangle` class.
```

### Step 3: Introduce a superclass

Carefully review the class `Shape` provided below.
Notice how the class has a single constructor that takes a single parameter of type `string`.
%Also notice how the class has an instance method called `Print` that prints info about the `Shape`.

```{code-cell}
class Shape
{
    public string Color { get; private set; }

    public Shape (string color)
        => Color = color;
}
```

```{code-cell}
:tags: [remove-input]
class Rectangle : Shape
{
    public double Width { get; private set; }
    public double Height { get; private set; }

    public Rectangle(Rectangle other) : this(other.Color, other.Width, other.Height) {}
    public Rectangle(string color, double side) : this(color, side, side) {}
    public Rectangle(string color, double width, double height) : base(color)
    {
        this.Width = width;
        this.Height = height;
    }
}
```

Make the class `Rectangle` a subclass of the class `Shape`.

```{important}
Remember that all constructors in `Rectangle` directly or indirectly must call the constructor in `Shape` using the `base` keyword.
This is required since `Shape` does not have a parameterless constructor.
```

When you're done you should be able to run the following code:

```{code-cell}
List<Rectangle> rectangles = new List<Rectangle>() {
    new Rectangle("Ruby Red", 12),
    new Rectangle(new Rectangle("Neon Purple", 20, 10)),
    new Rectangle("Royal Blue", 200, 100)
};

foreach (Rectangle rect in rectangles)
{
    Console.WriteLine($"{rect.Width} x {rect.Height}");
    Shape shape = rect; // Upcasting to "forget" that we have a Rectangle.
    Console.WriteLine(shape.Color);
}
```

## Conclusion

🫛 Easy peasy. Let's move on.
