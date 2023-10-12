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

# Variant generic interfaces

[Generic interfaces](generic-supertypes) are a staple in C#. They enable us to write type-agnostic code while maintaining type safety.
Another hallmark in programming is the concept of [variance](variance) which allows us to be more flexible with type assignments.
Combining these two leads to enormously reusable code.

```{admonition} Key point
C# supports variance for generic interfaces with the `in` and `out` keywords.
The keyword `out` is for covariant "output", while the keyword `in` is for contravariant "input".
Not specifying any of them results in invariance.
```

- Prefixing a type parameter with the keyword `out` makes it [covariant](covariance).
- Prefixing a type parameter with the keyword `in` makes it [contravariant](contravariance).
- Not prefixing a type parameter with any of these kewywords makes it [invariant](invariance).

```{important}
Using `out` and `in` with generic interfaces is not about altering the behavior of the interface itself. Instead, it's about providing flexibility in type assignments, making your types more adaptable.
```


## Covariance using `out`

In a universe of geometric shapes, every shape has an area. Some shapes, like circles, have specific properties like a radius. Let's represent this in code:

```{code-cell}
class Shape
{
    public virtual double Area { get; set; }
}
```

```{code-cell}
class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area => Math.PI * Radius * Radius;
}
```

In this world, let's consider a scenario where we often work with pairs of shapes. We create a covariant, read-only pair:

```{code-cell}
interface IPair<out T>
{
    T First { get; }
    T Second { get; }
}
```

Now, let's also define a `Pair<T>` class:

```{code-cell}
class Pair<T> : IPair<T>
{
    public T First { get; }
    public T Second { get; }

    public Pair(T first, T second)
    {
        First = first;
        Second = second;
    }
}
```

Here's where the magic happens. Let's say we have a method that calculates the total area of a pair of shapes:

```{code-cell}
double TotalArea(IPair<Shape> shapePair)
    => shapePair.First.Area + shapePair.Second.Area;
```

Even though this method expects a pair of `Shape` objects, due to the covariance enabled by `out`, we can pass in a pair of `Circle` objects:

```{code-cell}
IPair<Circle> pair = new Pair<Circle>(
        new Circle { Radius = 5 },
        new Circle { Radius = 3 });

double combinedArea = TotalArea(pair);
```

This is the essence of covariance: the ability to use a more derived type (like `Circle`) where a less derived type (like `Shape`) is expected. In this case, a method designed for general shapes can seamlessly compute the area for specific circle pairs.

```{tip}
When you see the `out` keyword in a generic interface, think of it as "outputting" data, which aligns with returning values, hence its association with return types.
```

## Contravariance using `in`

Contravariance is the opposite of covariance. It allows a more general type to be used where a more specific type is expected. This might sound counterintuitive, but it’s incredibly powerful in certain scenarios.

Consider, forinstance, this general interface that we can use for comparing the "size" of any two objects.
Notice how the type parameter `T` is marked as being contravariant.

```{code-cell}
interface IComparer<in T>
{
    bool IsGreaterThan(T left, T right);
}
```

Let's then define a type that implements this interface for any `Shape`.
The implementation compares `Shape`s based on their `Area`.

```{code-cell}
class ShapeAreaComparer : IComparer<Shape>
{
    public bool IsGreaterThan(Shape x, Shape y)
        => x.Area > y.Area;
}
```

With contravariance, we can use this general `Shape` comparer even if we need a more specific comparer like `IComparer<Circle>`:

```{code-cell}
IComparer<Circle> circleComparer = new ShapeAreaComparer();
```

At first glance this might not seem like a big deal. But again, consider that these objects might be found inside other structures. Let's reintroduce the notion of a `Pair<T>`.

```{code-cell}
class Pair<T> : IPair<T>
{
    public T First { get; }
    public T Second { get; }

    public Pair(T first, T second)
    {
        First = first;
        Second = second;
    }

    public T Largest (IComparer<T> comparer)
    {
        if (comparer.IsGreaterThan(Second, First))
            return Second;
        else
            return First;
    }
}
```

```{code-cell}
Pair<Circle> pair = new Pair<Circle>(
        new Circle { Radius = 3 },
        new Circle { Radius = 5 });

Circle largest = pair.Largest(new ShapeAreaComparer());

Console.WriteLine(largest.Radius);
```

```{tip}
Remember, contravariance is about inputting data. When you see the `in` keyword, think about consuming or taking in values, aligning with input parameters.
```

```{seealso}
We don't actually have to build an interface like `IComparer<T>` since .NET already contains a better implementation with the same name 🤓.
```

## Conclusion

By understanding and leveraging covariance and contravariance in generic interfaces, we can write code that is both type-safe and flexible. It allows us to build systems that can evolve over time without extensive refactoring, saving both time and effort.

```{tip}
Remember, `out` is for covariant output, while `in` is for contravariant input.
```

