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

# Constructor overloading

Having learned how we can provide multiple versions of instance methods through overloading, you might be wondering whether we can apply the same principle to constructors. The answer is yes! Constructor overloading is a common solution when objects need to be initialized in different ways depending on the situation.

Consider a `Rectangle` class as an example. We could create a rectangle by specifying both its width and height, or we might want to create a square rectangle where the height is the same as the width. To handle these cases, we could provide two overloaded constructors:

```{code-cell}
public class Rectangle
{
    public int Width { get; private set; }
    public int Height { get; private set; }

    // Constructor with one parameter.
    public Rectangle(int side)
    {
        Width = Height = side;
    }

    // Constructor with two parameters.
    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }
}
```

With these overloaded constructors, we can create a Rectangle object in two different ways:

```{code-cell}
Rectangle square = new Rectangle(5);
Console.WriteLine($"{square.Width} x {square.Height}");
```

```{code-cell}
Rectangle rectangle = new Rectangle(4, 6);
Console.WriteLine($"{rectangle.Width} x {rectangle.Height}");
```

In the code above, the `square` is created with the same width and height, while the `rectangle` is created with a width of `4.0` and a height of `6.0`.

```{note}
Remember how we, in the chapter on [instance method overloading](instance-method-overloading) said that we could implement one of the overloads as a call to the other? The same goes for constructor overloading, but this requires, so called, [constructor chaining](constructor-chaining), which we'll talk about later.
```

By using constructor overloading, we provide flexibility for objects to be initialized in various ways, improving the reusability of our code. In a later chapter, we'll explore another form of method overloading, this time with, so called, static methods.

