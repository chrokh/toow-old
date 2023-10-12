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

# Variant Generic Delegates

Variation in programming offers the flexibility to adapt code efficiently. With generic delegates, variance takes on a new dimension. In C#, variance for generic delegates means that we can use a more derived type (or a less derived type) than originally specified.

[Generic delegates](generic-delegates) support variance, if we explicitly specify whether a given parameter is covariant or contravariant.

```{admonition} Key points
- C# supports variance in generic delegates.
- Covariance allows a method with a return type derived from the delegate's return type and is denoted using the `out` keyword.
- Contravariance allows a method with a parameter type that's a base of the delegate's parameter type and is denoted using the `in` keyword.
```

## Covariant Generic Delegates

Let's first explore [covariance](covariance) in generic delegates.
Consider the following simple class hierarchy:

```{code-cell}
class Fruit {}
```

```{code-cell}
class Apple : Fruit {}
```

Then suppose we have a generic delegate that is defined to return a `T`:

```{code-cell}
delegate T Factory<T>();
```

And that we have a delegate variable of type `Factory<Apple`:

```{code-cell}
// Creating a delegate-instance with a Lambda-expression
// and storing it in a delegate variable of type Factory<Apple>.
Factory<Apple> appleFactory = () => new Apple();
```

Now, without explicitly stating that `T` in `Factory<T>` is covariant using the `out` keyword, the following attempt to assign a `Factory<Apple>` to a `Factory<Fruit>` variable does *not* compile:

```{code-cell}
:tags: [raises-exception]
// Trying to use a Factory<Apple> where a Factory<Fruit> is expected.
Factory<Fruit> fruitFactory = appleFactory;
```

However, if we were to explicitly state that `T` is covariant by using the `out` keyword, then it will compile.

```{code-cell}
delegate T Factory<out T>();
```

```{code-cell}
Factory<Apple> appleFactory = () => new Apple();

// Trying to use a Factory<Apple> where a Factory<Fruit> is expected.
Factory<Fruit> fruitFactory = appleFactory;
```

Hooray. 🙌

## Contravariant Generic Delegates

Now, let's explore [contravariance](contravariance) in generic delegates using our `Fruit` and `Apple` classes.

First, let's define a generic delegate called `Consumer<T>` that takes a parameter of type `T`:

```{code-cell}
delegate void Consumer<in T>(T item);
```

Then let's define a delegate variable of type `Consumer<Fruit>`:

```{code-cell}
// Creating a delegate-instance with a Lambda-expression
// and storing it in a delegate variable of type Consumer<Fruit>.
Consumer<Fruit> fruitConsumer = (Fruit f) => Console.WriteLine("Nom nom...");
```

Without the explicit declaration that `T` in `Consumer<T>` is contravariant using the `in` keyword, the following attempt to assign a `Consumer<Fruit>` to a `Consumer<Apple>` variable won't compile:

```{code-cell}
:tags: [raises-exception]
// Trying to use a Consumer<Fruit> where a Consumer<Apple> is expected.
Consumer<Apple> appleConsumer = fruitConsumer;
```

However, once we explicitly declare `T` as contravariant using the `in` keyword it works like a charm.

```{code-cell}
delegate void Consumer<in T>(T item);
```

```{code-cell}
Consumer<Fruit> fruitConsumer = (Fruit f) => Console.WriteLine("Nom nom...");

// Using a Consumer<Fruit> where a Consumer<Apple> is expected.
Consumer<Apple> appleConsumer = fruitConsumer;
```

Hooray again. 🙌

#### Conclusion

Having the ability to assign methods with more derived (or less derived) types to generic delegates provides flexibility. It means our methods can be more general-purpose, yet still be used in specific scenarios. This results in code that's not only reusable and adaptable but also still statically [type-safe](maintainability).

