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

# Lab: Variant Generic Interfaces

## Objective

In this lab, we will dive deep into the world of variant generic interfaces in C#. Our goal is to grasp the power of the `in` and `out` keywords by refactoring and extending an existing codebase, thereby making our code more reusable and adaptable.

## Provided Code

Carefully review the provided code. Notice how we have defined two classes, `Shape` and `Circle`, representing geometric shapes. We also have an interface `IPair<out T>` that allows us to define a covariant pair of items, and a `Pair<T>` class implementing this interface. Similarly, we have introduced the concept of contravariance with the `IComparer<in T>` interface and a `ShapeAreaComparer` class that implements it.

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

```{code-cell}
interface IPair<out T>
{
    T First { get; }
    T Second { get; }
}
```

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

We will be working with these classes and interfaces to understand and experiment with the concepts of covariance and contravariance.

## Instructions

### Step 1: Experience Covariance

Firstly, we will experience the power of covariance:

1. Create an instance of `Pair<Circle>`.
2. Compute the combined area of these circles using the local function `TotalArea`.
3. Output the result to the console.
4. Try removing the keyword `out` from `IPair<T>`. Does the code still work?

```{code-cell}
double TotalArea(IPair<Shape> shapePair)
    => shapePair.First.Area + shapePair.Second.Area;
```

### Step 2: Experience Contravariance

Next, we'll utilize contravariance:

1. Add an instance method with the signature `T Largest(IComparer<T> comparer)` to the class `Pair<T>`. The method should use the `comparer` to determine which item is the greatest and then return that.
2. Create an instance of `Pair<Circle>`.
3. Determine which `Circle` is the larger of the two by passing a `ShapeAreaComparer` to the method `Largest`.
4. Output the radius of the larger circle to the console.

```{code-cell}
interface IComparer<in T>
{
    bool IsGreaterThan(T left, T right);
}
```

```{code-cell}
class ShapeAreaComparer : IComparer<Shape>
{
    public bool IsGreaterThan(Shape x, Shape y)
        => x.Area > y.Area;
}
```

### Step 3: Create an Invariant Interface

1. Create an invariant interface called `IContainer<T>`.
2. Add methods: `void Add(T item)` and `T Get()`.
3. Implement this interface in a class called `Queue<T>` which contains a list of `T`.
4. Construct and instantiate this generic class with both `Shape` and `Circle` and test adding and getting items.
5. Is it possible to use a `Queue<Circle>` where a `Queue<Shape>` is expected? Why or why not?
5. Is it possible to use a `Queue<Shape>` where a `Queue<Circle>` is expected? Why or why not?

```{admonition} 🤔 Reflection
Why can't we use `in` or `out` with the `IContainer<T>` interface?
```

## Challenge

Now, with our understanding of covariance, contravariance, and invariance:

1. Create a covariant interface `IReadOnlyList<out T>` which exposes a method `T Get(int index)` and a property `int Count`.
2. Implement this interface in the `Queue<T>` class.
3. Instantiate a `Queue<Circle>` and try to assign it to an `IReadOnlyList<Shape>` variable.

```{admonition} 🤔 Reflection
What benefits does the `IReadOnlyList<out T>` interface offer in terms of flexibility and type safety? Reflect on how covariance can make our code more adaptable.
```

By the end of this lab, we should have a firmer grasp on the concepts of variance in generic interfaces and appreciate the flexibility it can introduce to our codebase.

Happy coding! 🤓

