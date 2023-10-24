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

# Solution: Variant generic interfaces

```{code-cell}
:tags: [hide-input]
class Shape
{
    public virtual double Area { get; set; }
}

class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area => Math.PI * Radius * Radius;
}

interface IPair<out T>
{
    T First { get; }
    T Second { get; }
}

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

## Step 1: Experience Covariance

```{code-cell}
double TotalArea(IPair<Shape> shapePair)
    => shapePair.First.Area + shapePair.Second.Area;
```

```{code-cell}
var circle1 = new Circle { Radius = 3 };
var circle2 = new Circle { Radius = 4 };

var pairOfCircles = new Pair<Circle>(circle1, circle2);

double combinedArea = TotalArea(pairOfCircles);

Console.WriteLine($"Combined Area of Circles: {combinedArea}");
```

If you remove the keyword `out` from `IPair<T>`, the code will NOT work.
It will give a compile-time error because we can't treat `Pair<Circle>` as `IPair<Shape>` without covariance.

## Step 2: Experience Contravariance

```{code-cell}
interface IComparer<in T>
{
    bool IsGreaterThan(T left, T right);
}
```

In `Pair<T>` class, add the `Largest` method:

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

    public T Largest(IComparer<T> comparer)
        => comparer.IsGreaterThan(First, Second) ? First : Second;
}
```

```{code-cell}
class ShapeAreaComparer : IComparer<Shape>
{
    public bool IsGreaterThan(Shape x, Shape y)
        => x.Area > y.Area;
}
```

Using the method:

```{code-cell}
IComparer<Shape> largerCircleComparer = new ShapeAreaComparer();
Pair<Circle> pairOfCircles = new Pair<Circle>(circle1, circle2);
Circle largerCircle = pairOfCircles.Largest(largerCircleComparer);
Console.WriteLine($"Radius of the larger circle: {largerCircle.Radius}");
```

## Step 3: Create an Invariant Interface

1\. Creating the Invariant Interface `IContainer<T>`:

```{code-cell}
public interface IContainer<T>
{
    void Add(T item);
    T Get();
}
```

2\. Implementing the Interface in `Queue<T>` Class:

For simplicity, we'll use the built-in `List<T>` to handle the storage of items. The `Add` method will simply append an item to the end of the list, and the `Get` method will return and remove the first item.

```{code-cell}
public class Queue<T> : IContainer<T>
{
    private readonly List<T> items = new List<T>();

    public void Add(T item)
        => items.Add(item);

    public T Get()
    {
        if (items.Count == 0)
            throw new InvalidOperationException("Queue is empty.");

        T item = items[0];
        items.RemoveAt(0);
        return item;
    }
}
```

3\. Constructing and Instantiating the Generic Class with `Shape` and `Circle`:

```{code-cell}
public class Shape { }

public class Circle : Shape { }
```

4\. You can now instantiate the `Queue<T>` class with both `Shape` and `Circle`:

```{code-cell}
Queue<Shape> shapeQueue = new Queue<Shape>();
Queue<Circle> circleQueue = new Queue<Circle>();
```

and test adding and getting items:

```{code-cell}
circleQueue.Add(new Circle());
Shape shape = shapeQueue.Get();
Circle circle = circleQueue.Get();
```

5\. **No**. Generic type parameters in C# are invariant by default. Even though `Circle` is a subtype of `Shape`, `Queue<Circle>` is not a subtype of `Queue<Shape>`. Therefore, you cannot use a `Queue<Circle>` where a `Queue<Shape>` is expected.

6\. **No**. For the same reasons explained above.

### 🤔 Reflection

`IContainer<T>` both consumes (`Add` method) and produces (`Get` method) values of type `T`, making it invariant. Thus, neither `in` (contravariant) nor `out` (covariant) can be applied.

## Challenge

```{code-cell}
interface IReadOnlyList<out T>
{
    T Get(int index);
    int Count { get; }
}
```

```{code-cell}
public class Queue<T> : IReadOnlyList<T>
{
    private readonly List<T> items = new List<T>();

    public void Add(T item)
        => items.Add(item);

    public T Get()
    {
        if (items.Count == 0)
            throw new InvalidOperationException("Queue is empty.");

        T item = items[0];
        items.RemoveAt(0);
        return item;
    }
}
```

```{code-cell}
Queue<Circle> queue = new Queue<Circle>();
queue.Add(new Circle() { Radius = 10 });
queue.Add(new Circle() { Radius = 3 });

IReadOnlyList<Shape> readOnly = queue; // No error :)
```

### Reflection

The `IReadOnlyList<out T>` interface is covariant, allowing more flexibility in assigning derived types to base type variables. This provides type safety as well, ensuring that you can't modify the list in a way that would be unsafe for the derived types. Covariance makes our code more adaptable, as we can treat a list of derived objects as a list of base objects.

