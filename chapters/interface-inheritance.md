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

# Interface inheritance

Interfaces not only enable classes to support multiple roles or behaviors, but they also can inherit from one or more other interfaces. This feature provides a way to create hierarchies of related capabilities.
With interface inheritance we can refine a parent interface's behavior and even combine multiple parent interfaces.

We'll use the interfaces `IPositionable` and `ISizable`, which you might remember from the chapter on [Multiple interfaces](multiple-interfaces). In that chapter, we discussed the `Rectangle` class that implemented both interfaces to represent an object with position and size.

```{code-cell}
interface IPositionable
{
    int X { get; set; }
    int Y { get; set; }
}
```

```{code-cell}
interface ISizable
{
    int Width { get; set; }
    int Height { get; set; }
}
```

Now, consider a new interface `IDrawable`, which will require an object to be both positionable and sizable and in addition, to be able to draw itself.

Here's how we would define such an interface:

```{code-cell}
interface IDrawable : IPositionable, ISizable
{
    void Draw();
}
```

Note the syntax: we use the colon (`:`), as we do with [class inheritance](inheritance) and implementing interfaces, to indicate that `IDrawable` inherits from `IPositionable` and `ISizable`. This means any class that implements `IDrawable` must also implement the members of `IPositionable` and `ISizable`, as well as the `Draw` method defined by `IDrawable` itself.

```{code-cell}
class Rectangle : IDrawable
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }

    public void Draw()
    {
        // Insert drawing logic here.
        Console.WriteLine($"Drawing a rectangle at position ({X}, {Y}) with size {Width} x {Height}.");
    }
}
```

```{important}
When a class implements an interface that inherits from other interfaces, it must provide implementations for all members defined in the entire interface hierarchy.
```

When we instantiate the `Rectangle` class, we can treat it as an `IDrawable` and use all the properties and methods that this interface defines:

```{code-cell}
IDrawable drawableRect = new Rectangle { X = 10, Y = 10, Width = 20, Height = 15 };
drawableRect.Draw();
```

So, interface inheritance provides a way to define more specialized contracts, making your code more expressive and easier to understand. Like class inheritance, it supports the notion of "is-a" relationships, but between interfaces.

```{admonition} Key point
An interface can inherit from one or more other interfaces, leading to a hierarchy of related capabilities that classes can choose to implement.
```

While an object of the `Rectangle` class can be treated as an `IDrawable`, it can also be treated as an `IPositionable` or `ISizable`, because these interfaces are part of the inheritance hierarchy of `IDrawable`.

```{code-cell}
Rectangle rectangle = new Rectangle { X = 10, Y = 20, Width = 30, Height = 40 };

IPositionable pos = rectangle;
Console.WriteLine("Position: ({0}, {1})", pos.X, pos.Y); // Can access X and Y properties

ISizable size = rectangle;
Console.WriteLine("Size: {0}x{1}", size.Width, size.Height); // Can access Width and Height properties
```

However, as we've already learned we can only access whatever members have been defined in the [compile-time type](run-time-type-vs-compile-time-type).
So if we treat our objects as one of the interfaces, then we can't access the members in the other.

```{code-cell}
:tags: [raises-exception]
Console.WriteLine(pos.Width);
Console.WriteLine(size.X);
```

```{note}
Using many smaller interfaces instead of few large ones is an important design principle known as the [interface segregation principle](interface-segregation-principle). But we'll talk more about that later.
```

%Take a moment to experiment with the `IPositionable`, `ISizable`, and `IDrawable` interfaces, and the `Rectangle` class!

