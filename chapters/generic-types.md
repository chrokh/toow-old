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

# Generic types

%In our previous chapter, we introduced the concept of generics, which allow us to write flexible, reusable code without sacrificing type safety. One implementation can handle a range of types. In this chapter, we'll dive deeper into the idea of generic types. [Classes](classes), [interfaces](interfaces), and [structs](structs) can all be generic.

%In the previous chapter we discussed generic type parameters. Let's now talk about how they are used to create generic types.

A generic type definition is a blueprint for creating types that are parameterized over other types. Generic types are defined in the same way we define non-generic types but after the type name we append a comma-separated list enclosed in angle-brackets (`<T1, T2, ..., Tn>`) of, so called, 'generic type parameters' (or just 'type parameters' for short).
In C#, a generic type can be a [class](classes), [interface](interfaces), or [struct](structs).

Imagine that we want to be able to store pairs of objects of arbitrary data types.
When would such a type be useful?
Imagine that we're building a bunch of board games.
In some games (like Backgammon, Monopoly, or Yatzi) we might for example want to represent pairs of dice rolls.
In others (such as Memory) we might want to represent pairs of cards.

Let's build a generic class for this and let's call it `Pair<T>`.
The `T` enclosed in angle-brackets (`<T>`) is a type parameter, meaning a placeholder for a type.
By parameterizing the class over a type we make it possible to use the same class definition to instantiate pairs of dice as well as cards.

```{seealso}
The concept of a pair is in many programming languages called a 'tuple'.
In .NET we don't actually need to define our own tuple type since the library [already contains one](value-tuples).
In this chapter we redefine it since it's one of the simplest yet useful examples of a generic data type.
See [documentation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-tuples).
```

`Pair<T>` is *not* a type, but a 'generic type definition'.
To construct an actual type we must replace the type parameter `T` with an actual type.
The type that we replace the type parameter with is called a 'type argument'.
In other words we replace `T` with an actual type.

If we say `Pair<int>` then we have created a constructed generic type by replacing the type parameter `T` in the generic type definition `Pair<T>` with the type argument `int`.
If we say `Pair<string>` then we have created a constructed generic type by replacing the type parameter `T` in the generic type definition `Pair<T>` with the type argument `string`.

```{note}
Type parameters are, in C#, conventionally either called `T`, some other name prefixed with `T` such as `TKey` or `TValue`, or `T` followed by a number such as `T1` and so forth.
In theory you could use any valid identifier, but it's easier for everyone if we stick to the convention.
The letter `T` has probably been chosen since 'T' is the first letter in the word 'type'.
Just like with variable names, try to choose names that clearly convey your intent.
```

`Pair<T>` is referred to as a 'generic type definition', while `Pair<int>` or `Pair<string>` are called 'constructed generic types'.
A constructed generic type is an actual type that we can use just like any other type in our programs.

```{admonition} Key point
Generic types are types that are parameterized over types, using so called 'type parameters'.
This allows us to write a single implementation that works for any type, without sacrificing type safety.
Type parameters in a generic type definition must be replaced by actual types in order to create a constructed generic type, which can then be used like any other type.
%Generic type parameters act as placeholders for the types you use in your generic code, allowing you to write a single implementation that works for any type.
```

Since a type parameter can be replaced by any type we can of course also make pairs of cards or dice rolls.
Let's assume that we have classes called `Card` and `DiceRoll`.
We can construct a type whose instances contain pairs of `Cards` by simply saying `Pair<Card>`.
Similarly, we can say `Pair<DiceRoll>` for a type whose instances contain pairs of `DiceRoll`.

%The type argument that we use in place of the type parameter can be arbitrarily complex.
%Importantly, it can also be another constructed generic type.
%This means that `Pair<Pair<int>>` is an entirely valid constructed generic type.
%That type corresponds to a pair of pairs of integers.

```{admonition} Terminology
- **Generic type definition**: The raw, parameterized form of a generic type that hasn't been constructed with specific type arguments (e.g., `Pair<T>`).
- **Type parameter**: A placeholder used in generic type definitions, represented within angle brackets (e.g., `<T>` in `Pair<T>`).
- **Constructed generic type**: A generic type that has had its type parameters replaced with actual type arguments, making it an actual, usable type (e.g., `Pair<int>`).
- **Type Argument**: The actual type you provide in place of a type parameter when creating a type from a generic type definition (e.g., `int` in `Pair<int>`).
- **Generic type**: This term can be used to refer to either a 'generic type definition' or a 'constructed generic type'.
```

%## Generic classes

How do we actually create the generic class `Pair<T>`?
Here's what the implementation might look like:

```{code-cell}
class Pair<T>
{
    // The properties of type T that make up the pair.
    public T Item1 { get; set; }
    public T Item2 { get; set; }

    // Constructor to initialize the pair.
    public Pair (T item1, T item2)
    {
        Item1 = item1;
        Item2 = item2;
    }

    // Overriding ToString() method to represent the pair as a string.
    public override string ToString ()
        => $"({Item1.ToString()}, {Item2.ToString()})";
}
```

```{hint}
Notice how we can use the generic type parameter `T` anywhere in the definition of the generic type `Pair<T>` after we've declared it in the name.
```

```{warning}
Remember that we cannot declare a variable whose type is `Pair<T>` because that's not a type but a generic type definition.
To construct an actual type we have to replace the type parameter `T` with a type argument.
```

We can now use the generic type definition `Pair<T>` to, for example, create a pair of strings.

```{code-cell}
Pair<string> pair = new Pair<string>("Hello", "world");

Console.WriteLine(pair);
```

But we can of course also create a pair of any other data type, such as `int`.

```{code-cell}
Pair<int> pair = new Pair<int>(10, 20);

Console.WriteLine(pair);
```


Since a type parameter can be replaced by an arbitrarily complex type we can of course also create a pair of pairs of integers.


```{code-cell}
Pair<Pair<int>> pair =
    new Pair<Pair<int>>(
            new Pair<int>(1, 2),
            new Pair<int>(3, 4));

Console.WriteLine(pair);
```

The power of generic types is that you can use them to create highly reusable code. As long as the generic type definition `Pair<T>` compiles, we can be sure that it works when used with any type.

```{admonition} Remember
You cannot make any assumptions about what the interface of a type parameter is.
The only assumption we can make about a type parameter in C# is that it will be possible to treat it as an [object](everything-is-an-object).
```

```{note}
With generics we often end up with complex type names. [Type inference](type-inference) with `var` is often used to improve the readability of the code.
Instead of saying `Pair<int> pair = new Pair<int>(10, 20);` we often say `var pair = new Pair<int>(10, 20);`.
```


%## Multiple type parameters

At this point, you might wonder: is it possible to have multiple type parameters? Absolutely! Imagine you're creating a chess game. Wouldn't it be beneficial to represent a move as both a position on the board and the specific piece making that move, as in `Pair<Position, Piece>`? This demonstrates the utility of having generic types that are parameterized over more than one type. In C#, this is achieved by separating each type parameter with a comma in the generic type definition.

Let's enhance our generic type `Pair<T>` to allow the two items in the pair to be of potentially different types.

```{code-cell}
class Pair<T1, T2>
{
    // The property of type T1 that make up the first element of the pair.
    public T1 Item1 { get; set; }

    // The property of type T2 that make up the second element of the pair.
    public T2 Item2 { get; set; }

    // Constructor to initialize the pair.
    public Pair (T1 item1, T2 item2)
    {
        Item1 = item1;
        Item2 = item2;
    }

    // Overriding ToString() method to represent the pair as a string.
    public override string ToString ()
        => $"({Item1.ToString()}, {Item2.ToString()})";
}
```

In this example, both `T1` and `T2` are type parameters. Consequently, when we construct a type from the generic type definition we can let `T1` and `T2` be different types. Should we want to, they can of course be the same type.

```{code-cell}
var pair = new Pair<int, string>(10, "Apples");

Console.WriteLine(pair);
```

In conclusion, generic types — classes, interfaces, and structs — are a powerful tool in C#. They offer reusability without sacrificing type safety. This makes your code easier to maintain and understand. Remember, the magic behind generics lies in the use of type parameters, which act as placeholders for actual types.

In the next chapters, we will delve deeper into generics, including generic methods, type parameter constraints, and variance. We'll also explain what we mean when we say that we're not giving up static type safety. See you there!

