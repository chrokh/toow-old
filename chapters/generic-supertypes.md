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

# Generic supertypes

In addition to generic classes, we can also define and implement generic [interfaces](interfaces) as well as inherit from generic [classes](classes). The same principles apply.
In this chapter we'll focus on generic interfaces.

```{admonition} Key point
- If the subtype is *generic* then the constructed generic supertype can remain "open" (e.g. `Cycle<T> : ISequence<T>`).
- If the subtype is *non-generic* then the constructed generic supertype must be "closed" (e.g. `Alphabet : ISequence<char>`.


When implementing a generic interface or inheriting from a generic type then we must construct the generic supertype if we want to create a non-generic type.
```

Let's imagine that we want to model the idea of different sequences.
Some classic sequences include the sequence of natural numbers, the alphabet, and the Fibonacci sequence.
But we can easily imagine more esoteric sequences like the sequence of customers entering a cafe in a simulation game.
What unifies these different types is the idea of being able to ask for the next element in the sequence.

## Implementing generic interfaces

We'll start by creating a generic interface called `ISequence<T>`.
Any class implementing the interface must define a method `T Next()` which simply provides the next element of type `T` in the sequence.
Let's also add a [default method](interface-default-implementations) `T[] Take(int n)` that calls `Next` `n` number of times and returns the result as an array of elements of type `T`.

```{code-cell}
interface ISequence<T>
{
    // Should return the next element in the sequence.
    T Next();

    // Returns an array of the next n elements from the sequence.
    T[] Take(int n)
    {
        T[] output = new T[n];
        for(int i=0; i<n; i++)
            output[i] = Next();
        return output;
    }
}
```

%When we implement an interface we have to construct the generic type if the implementing type is a non-generic type.
%In other words, if our subtype is not generic then we cannot say that we're implementing the interface `ISequence<T>` because then there is no way for the user of our subtype to specify what `T` should be.

In the code below we indicate that the non-generic classes `NaturalSequence` and `Alphabet` implement the constructed generic interfaces `ISequence<int>` and `ISequence<char>` respectively.

```{code-cell}
class NaturalSequence : ISequence<int>
{
    int current = 0;

    // Returns the next natural number.
    public int Next()
        => current++;
}
```

```{code-cell}
class Alphabet : ISequence<char>
{
    int i = -1;
    char[] letters = new char[] { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

    // Returns the next letter in the alphabet, cycling back to 'A' after 'Z'.
    public char Next()
        => letters[i = (i + 1) % letters.Length];
}
```

Since our subtypes of the generic interface are non-generic we have to "close" the constructed generic supertype.
In other words, we cannot say that `NaturalSequence` or `Alphabet` implements the interface `ISequence<T>`.
If we could, then there would be no way for the user of our subtype to specify what `T` should be.

```{warning}
While `Alphabet` is a [subtype](subtype-polymorphism) of `ISequence<char>` it is *not* a subtype of `ISequence<T>`.
This means you can't use an instance of type `Alphabet` when an `ISequence<T>` is expected but you *can* use it when an `ISequence<char>` is expected.
```

Since the classes `NaturalSequence` and `Alphabet` are both non-generic there's no need to construct them when we want to use them. They are both already actual types.

```{code-cell}
ISequence<int> naturals = new NaturalSequence();
Console.WriteLine(String.Join(", ", naturals.Take(10)));
```

```{code-cell}
ISequence<char> alphabet = new Alphabet();
Console.WriteLine(String.Join(", ", alphabet.Take(40)));
```

If however we want a *generic* subtype which is parameterized over the same type as the supertype, then we don't have to "close" the constructed generic supertype.
In the code below we're defining a generic class called `Cycle<T>` that implements the interface `ISequence<T>`.

```{code-cell}
class Cycle<T> : ISequence<T>
{
    int i = -1;
    T[] elems;

    public Cycle(T[] items)
        => elems = items;

    public T Next()
        => elems[i = (i + 1) % elems.Length];
}
```

Since the class `Cycle<T>` is a generic class we must construct it in order to create an actual type. In the examples below we're using it to create a cycle of characters and a cycle of strings.

```{code-cell}
ISequence<char> rgb = new Cycle<char>(new char[] { 'R', 'G', 'B' });
Console.WriteLine(String.Join(", ", rgb.Take(10)));
```

```{code-cell}
ISequence<string> light = new Cycle<string>(new string[] { "Red", "Orange", "Green", "Orange" });
Console.WriteLine(String.Join(", ", light.Take(10)));
```

```{important}
%`Cycle<T>` is *not* a [subtype](subtype-polymorphism) of `ISequence<T>` because neither of these are actual types. They are generic type definitions.
Any constructed generic type from `Cycle<T>` (such as `Cycle<int>`) will be a subtype of any constructed generic type from `ISequence<T>` if the type argument used in place of `T` is the same (such as `ISequence<int>`).
```

```{seealso}
There's more nuance to substitutability in generic interfaces but we'll explore that in the chapter on [variant generic interfaces](variant-generic-interfaces).
```

## Inheriting from generic classes

Now that we've grasped the principles behind implementing generic interfaces, let's pivot our attention to inheritance in generics.
Inheriting from a generic class works just like inheriting from a non-generic class except that if the subclass is non-generic then the constructed generic superclass must be "closed".

It's the same logic as when implementing generic interfaces.
If the subclass is generic and we pass the type parameter as a type argument to the construction of the generic superclass then we can keep the generic superclass "open".

Meaning we don't have to use an actual type (like `string`) as a type argument for the superclass if the type is also a type parameter in the subclass.
However, if we don't use our type parameters as type arguments in the super class then we must of course close those parameters of the constructed generic super class.

The generic class `MonoPair<T>` inherits from the generic class `Pair<T1, T2>`.
It does not change or add any behavior but merely restricts users of the class to a single type parameter which means that all pairs must have the same type in both positions.

```{code-cell}
class Pair<T1, T2> {
    public T1 Item1 { get; init; }
    public T2 Item2 { get; init; }

    public Pair(T1 item1, T2 item2) {
        Item1 = item1;
        Item2 = item2;
    }
}
```

```{code-cell}
class MonoPair<T> : Pair<T, T> {
    public MonoPair(T item1, T item2)
        : base(item1, item2) { }
}
```

```{important}
In the definition of `MonoPair<T>` above, the `T` on the left-hand side is a type parameter, while the two `T`'s on the right are type arguments.
```

On the left-hand side we declare that the generic class `MonoPair<T>` is a *generic* type parameterized over one type that we call `T`.
On the right-hand side however we use `T` as the type argument for both generic type parameters in the generic type `Pair<T1, T2>` so that whatever `T` is it is used as the type for both `T1` and `T2`.

## Inheriting from generic interfaces

It's worth noting that it's also possible to use generic types in [interface inheritance](interface-inheritance).
The same rules apply.

Any type parameter of the constructed supertype that isn't matched with a type parameter of the generic subtype must be "closed".

We must supply type arguments for all type parameters of the inherited interfaces and if our inheriting interface is generic then those type arguments can be type parameters of the inheriting interface.

In the example below we keep the constructed generic supertype open.

```{code-cell}
interface ISequence<T>
{
    T Next();
}

interface ICycle<T> : ISequence<T>
{
    void Reset();
}
```

In the example below however we close the constructed generic supertype.

```{code-cell}
interface ICharSequence : ISequence<char>
{
    void SetUpperCase(); // Changes to uppercase.
    void SetLowerCase(); // Changes to lowercase.
}

```

## Conclusion

In this chapter, we've delved generic interfaces and inheritance, highlighting the nuances between non-generic and generic subtypes. As we look ahead, we'll delve deeper into the world of variance and explore variant generic interfaces, which offers even greater flexibility when subtyping constructed generic types. But before that, our journey will take us to generic methods and type constraints. See you in the next chapter.

