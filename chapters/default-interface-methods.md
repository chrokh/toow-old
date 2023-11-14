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

# Default interface methods

%In the chapter on [interfaces](interfaces) we portrayed them as contracts that can contain member signatures but no implementations.
%This used to be true, but many languages have evolved to something where this is no longer true. C# is one of those languages.
%With a feature known as "default interface methods", interfaces in C# can now contain implementations.

In traditional object oriented programming, interfaces have been contracts that classes can implement, dictating a set of methods that the implementing classes must provide. This is also the picture we painted in the chapter on [interfaces](interfaces).

However, a newer feature known as "default interface methods" change this narrative by allowing you to define a method within an interface and provide a default implementation for it.
This interesting feature brings a new dimension to interface design that in some sense can be thought of as multiple inheritance.


```{admonition} Key points
- Default interface methods allow us to add methods with implementation to an interface.
- Default methods are only available on objects whose [compile-time type](run-time-type-vs-compile-time-type) is the same as the one in which the method is defined.
```

%This feature can be especially useful when you need to add new functionality to an interface without disrupting existing implementers.

Let's start with a basic example. Consider an interface `ISequence` which captures the idea of sequences of integers.

```{code-cell}
interface ISequence
{
    int Next();

    int[] Take(int n)
    {
        int[] result = new int[n];
        for (int i = 0; i < n; i++)
            result[i] = Next();
        return result;
    }
}
```

Notice how the interface above not only demands that implementors of the interface supplies an implementation for the method called `Next` but also itself defines a method called `Take`.

Let's now write a class that implements this interface.

```{code-cell}
class NaturalNumbers : ISequence
{
    int n = -1;
    public int Next() => n++;
}
```

The class `NaturalNumbers` implements `ISequence` but is not required to provide an implementation for `Take`.
Should we want a specialized implementation of `Take` in the class we could however of course define it.

A key aspect of default interface methods is their relationship with compile-time and run-time types. The default method is available on an instance of a class only if the compile-time type of the reference is the interface with the default method. This distinction is crucial and can affect how your code behaves at runtime.

```{code-cell}
:tags: [raises-exception]
NaturalNumbers seq = new NaturalNumbers();
seq.Take(10); // ❌ Does not compile!
```

```{code-cell}
ISequence seq = new NaturalNumbers();
seq.Take(10); // ✅ Compiles!
```

Why did the language designers decide that we cannot call the method `Take` unless the compile-time type is the same type as the one where the method is defined?
Classes can implement [multiple interfaces](multiple-interfaces) and since these interfaces could contain methods with the same signature, we need some way of determine which implementation should be executed.
Consider the following code:

```{code-cell}
interface IPositionable
{
    int X { get; set; }
    int Y { get; set; }

    void Print() => Console.WriteLine($"({X}, {Y})");
}
```

```{code-cell}
interface ISizable
{
    int Width { get; set; }
    int Height { get; set; }

    void Print() => Console.WriteLine($"{Width} x {Height}");
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

If we now instantiate a `Rectangle` and store it in a variable whose compile-time type is `Rectangle`, which implementation should be executed if we call `Print()`?

```{code-cell}
:tags: [raises-exception]
Rectangle rect = new Rectangle();
rect.Print();
```

Since there is no obvious answer, the language designers chose to simply make this code not compile.
If however we store the object in a variable whose type is one of the interfaces then the call is no longer ambiguous and the compiler can determine which implementation should be executed.

```{code-cell}
ISizable rect = new Rectangle();
rect.Print();
```

```{code-cell}
IPositionable rect = new Rectangle();
rect.Print();
```

In conclusion, the introduction of default interface methods in C# has significantly altered the traditional understanding of interfaces. By allowing interfaces to provide default implementations, C# extends their utility and flexibility, enabling a form of multiple inheritance.

This change is a notable shift in the language, opening up new possibilities in object oriented design.
However, it also introduces complexities, especially regarding compile-time and run-time types. Understanding these nuances is crucial to effectively leverage this feature and avoid potential pitfalls.

