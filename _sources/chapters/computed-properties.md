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

# Computed properties

Some values are best thought of as the result of somehow combining other more fundamental values.
The area of a rectangle, for example, is the product of its width and height.
Similarly, a full name, might be a concatenation of a first name and a last name.
In C# we can elegantly achieve this by means of computed properties.
How can we do this elegantly, without having to create a separate method to perform this calculation? C# provides a solution with computed properties.

In C#, computed properties (also known as calculated properties) are properties that perform a calculation and return a value, rather than simply getting or setting a stored value. Computed properties don't hold any memory; instead, they provide a value based on other instance variables or methods.

Let's consider a `Rectangle` class that has Length and Width properties. If we wanted to find the area of the rectangle, we could create a `GetArea()` method, but it might be more idiomatic in C# to use a computed property.

Here's how you might define the Area property:

```{code-cell}
public class Rectangle
{
    public double Length { get; set; }
    public double Width { get; set; }

    public double Area
    {
        get => Length * Width;
    }
}
```

In this example, `Area` is a computed property. It doesn't store a value itself. Instead, when it's accessed, it calculates the value by multiplying `Length` by `Width` and returns the result. Here's how you could use the `Area` property:

```{code-cell}
var rectangle = new Rectangle { Length = 5.0, Width = 4.0 };
Console.WriteLine(rectangle.Area);
```

Computed properties can be incredibly useful for providing calculated values based on an object's state without the need for separate methods. Just remember that since computed properties don't store values, each access triggers the calculation, which could potentially be expensive if the computation is complex.

It's worth noting that computed properties can also have setters, although it's less common. The setter of a computed property can modify one or more existing properties.

In our `Rectangle` class, let's say we wanted to allow the area to be set directly. If the area is set, we could decide to either keep the rectangle's aspect ratio the same as before and scale to the new area or just make it a square with the new area. Let's choose the latter approach because the calculation is simpler. Here's how we could do that:

```{code-cell}
public class Rectangle
{
    public double Length { get; set; }
    public double Width { get; set; }

    public double Area
    {
        get => Length * Width;
        set
        {
            Length = Math.Sqrt(value);
            Width = Math.Sqrt(value);
        }
    }
}
```

In this updated example, the `Area` property now has a setter that modifies both the `Length` and `Width` properties when the `Area` is set. When the area is retrieved, the getter still calculates the value as before. Here's how we could use the setter:

```{code-cell}
var rectangle = new Rectangle { Length = 5.0, Width = 4.0 };
Console.WriteLine($"{rectangle.Area} = {rectangle.Length} x {rectangle.Width}");
```

```{code-cell}
rectangle.Area = 25;
Console.WriteLine($"{rectangle.Area} = {rectangle.Length} x {rectangle.Width}");
```

In this case, after setting the `Area` to `25`, both the `Length` and `Width` have been adjusted to be the square root of the new area (which is `5`).

```{important}
When using setters in computed properties, it is important to **consider the logical consistency of your model**. For example: if you 'set' the area only to then immediately 'get' the area, then you should get back the same area as you set.
```

%In the upcoming chapters, we will delve deeper into the use of properties in C# and how they can make our code cleaner and more maintainable.


