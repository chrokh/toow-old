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

# Multiple interfaces

In real-world scenarios, things often possess attributes and behaviors that span across multiple domains. A television, for instance, has spatial attributes like position and size, but can also be turned on and off like an electronic device.

Analogously, in software design, a class may implement multiple interfaces, promising to fulfill several contracts at once. This capability to portray different roles becomes incredibly handy when a class interacts with varied systems or operates in different contexts, each demanding a unique set of behaviors.

Let's consider a `Rectangle` class that implements both `IPositionable` and `ISizable` interfaces.
The former is an interface for things that have a position, and the latter for things that have a size.
We can easily image a system where rectangles have both position and size.

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

```{code-cell}
class Rectangle : IPositionable, ISizable
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}
```

Here, a single `Rectangle` object represents both the position and size attributes. It guarantees to satisfy the contracts laid down by both `IPositionable` and `ISizable` interfaces, thus assuming dual roles depending on the needs of the situation.

```{code-cell}
ISizable sizable = new Rectangle();
IPositionable positionable = new Rectangle();
```

```{admonition} Remember
As we learned in the chapter on [compile-time types and run-time types](run-time-type-vs-compile-time-type) we can only access members available on the compile-time type. So we cannot, for example, call `Width` on a variable of type `IPositionable` even if its run-time type happens to be `Rectangle`.
```

But what happens if multiple interfaces demand a member with the same signature?

```{code-cell}
interface IPositionable
{
    void Display(); // Defined in both interfaces.
}
```

```{code-cell}
interface ISizable
{
    void Display(); // Defined in both interfaces.
}
```

```{code-cell}
class Rectangle : IPositionable, ISizable
{
    public void Display()
        => Console.WriteLine("Displaying Rectangle.");
}
```

Not a problem. Since both members have the same signatures we simply ensure that the member exists in the class that claims to implement the interfaces and it compiles just fine.

```{code-cell}
ISizable asSizable = new Rectangle();
asSizable.Display();

IPositionable asPositionable = new Rectangle();
asPositionable.Display();

Rectangle asRectangle = new Rectangle();
asRectangle.Display();
```

If you end up with a naming conflict, where multiple interfaces want to use the same method signature but the behavior of these two members should be different we can use, what's in C# called, 'explicit interface implementation'. This allows different behaviors based on the interface being invoked.

```{code-cell}
class Ellipse : IPositionable, ISizable
{
    void IPositionable.Display()
        => Console.WriteLine("Displaying Ellipse as IPositionable.");

    void ISizable.Display()
        => Console.WriteLine("Displaying Ellipse as ISizable.");
}
```

```{code-cell}
ISizable asSizable = new Ellipse();
asSizable.Display();

IPositionable asPositionable = new Ellipse();
asPositionable.Display();
```

Notice however how we cannot

% Compilation does not display properly when using code-cell
```csharp
Ellipse asEllipse = new Ellipse();
asEllipse.Display();
```

```output
(2,11): Error CS1061: 'Ellipse' does not contain a definition for 'Display' and no accessible extension method 'Display' accepting a first argument of type 'Ellipse' could be found (are you missing a using directive or an assembly reference?)
```

This `Ellipse` class uses explicit interface implementation to distinguish between the `Display` methods of `IPositionable` and `ISizable`. Thus, a single `Ellipse` object can execute different `Display` methods depending on whether it is treated as `IPositionable` or `ISizable`.

```{admonition} Key point
A class can implement multiple (possibly overlapping) interfaces, thereby assuming different roles.
%Overlapping methods in these interfaces can be handled using explicit interface implementations, enabling the same method name to exhibit different behaviors based on the interface through which it is invoked.
```

Multiple interfaces is the enabler of an important design principle called the [interface segregation principle](interface-segregation-principle). We will discuss that in a later chapter, but for now, it is essential to recognize that just like the real-world things, a single class can also play multiple roles.

%powerful tools in your software development toolkit. These concepts will continue to appear in our discussion of more complex topics, enhancing our comprehension of Object-Oriented Programming.

