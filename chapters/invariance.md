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

# Invariance

Before learning about [variance](variance) you might think that it would be possible to use a list of apples if a list of fruits is expected.
Now you might be a bit more skeptical though.
If `Apple` is a subtype of `Fruit`, would it not make sense for `IList<Apple>` to also be a subtype of `IList<Fruit>`?

In most languages, including C#, this is not allowed.
Why?
As we will learn in the chapter on the [Liskov substitution principle](liskov-substitution-principle), the only solution that's guaranteed to be [type safe](type-checking) is covariance in output and contravariance in input.
Since the property `T Item[]` of `IList<T>` allows us to 'get' elements of type `T` from the list this implies that `T` must be covariant.
However, the method `Add(T element)` of `IList<T>` allows us to 'set' elements of type `T` which suggests that `T` must be contravariant.

In theory, it might be possible to let `T` in `IList<T>` be [bivariant](variance) but this would involve sophisticated compile-time checks, run-time checks, or constraints.
In practice, almost no languages usefully allow bivariance.
Instead, we end up with lists that are 'invariant'.

```{admonition} Key point
If `A` is a subtype of `B` and if `T` is *invariant* in `I<T>` then `I<A>` is neither a subtype or supertype of `I<B>`.
```

Let's break it down using an example.
Assume that we have the two classes `Apple` and `Fruit` and that the former is a subtype of the latter.

```{code-cell}
class Fruit {}
class Apple : Fruit {}
```

In .NET the generic interface `IList<T>` specifies that `T` is invariant.
This means that the type `IList<Apple>` is neither a subtype nor a supertype of the type `IList<Fruit>`, even though `Apple` is a subtype of `Fruit`.

This in turns mean that we cannot compile code that tries to treat a list of apples as a list of fruits.
Such code would require `T` to be covariant.

```{code-cell}
:tags: [raises-exception]
// Does not compile because T in IList<T> is NOT covariant.
IList<Fruit> fruits = new List<Apple>();
```

Nor can we compile code that tries to treat a list of fruits as a list of apples.
Such code would require `T` to be contravariant.

```{code-cell}
:tags: [raises-exception]
// Does not compile because T in IList<T> is NOT contravariant.
IList<Apple> apple = new List<Fruit>();
```

So, we end up with invariance where `IList<T>` can *only* be substituted by types that use **exactly** `T`.

```{code-cell}
IList<Fruit> fruits = new List<Fruit>();
```

```{danger}
Invariance in lists does **not** mean that we can't add objects of type `Apple` to a `List<Fruit>`. Since `Apple`s are `Fruit`s that works perfectly. But that's not the point. The discussion surrounding variance does not regard what items can be stored in a given list, but rather which type of list can be used when another type of list is expected.
```

## Why can't `T` in `IList<T>` be covariant?

Let's imagine for a moment that `T` in `IList<T>` was covariant. At first glance, it might seem handy: you could assign a list of apples to a list of fruits.
It might also sound sensible since a list of apples is a 'specialization' of a list of fruits.
But what would stop you from then adding an orange to that list of fruits?

```csharp
// Hypothetical example: If T in IList<T> was covariant.

IList<Fruit> fruits = new List<Apple>();  // Compiles
fruits.Add(new Orange());                 // Compiles, but throws exception.
```

When trying to add an `Orange` object to fruits, you'd be attempting to add it to an object that, in reality, is a list of `Apple`s. This would result in a run-time exception. Thus, allowing `IList<T>` to be covariant would break [static type-safety](type-checking).


## Why can't `T` in `IList<T>` be contravariant?

Now, let's consider the opposite, what if `T` in `IList<T>` was contravariant? This would allow you to assign a list of fruits to a list of apples, which again sounds useful on the surface.
It might also sound sensible since a list of fruit can do *more* than a list of apples and thus should be able to fulfill work in its stead, right?
But what happens when we want to extract the elements?

```csharp
// Hypothetical example: If T in IList<T> was contravariant

// Create list of fruits that contains an Orange.
IList<Fruit> fruits = new List<Fruit>() {
    new Orange()
};

IList<Apple> apples = fruits;            // Compiles.
Apple first = apples[0];                 // Compiles, but throws exception.
```

In this example, adding an `Orange` to the list of fruits is perfectly reasonable if `Orange` is a subtype of `Fruit`. The real issue surfaces when we try to assign the list of `Fruit` to the variable `apples` which expects a list of `Apple` objects. The assignment compiles, but when you attempt to retrieve the first item as an `Apple`, a run-time exception would be thrown. This is because the list actually contains an `Orange` and not **only** `Apple`s. Therefore, treating it as a list of `Apple`s is unsafe and ultimately breaks [static type-safety](type-checking).


## Conclusion

Invariance serves as a counterpoint to the flexible relationships allowed by [covariance](covariance) and [contravariance](contravariance). The stringent requirements of invariance make it a tough but necessary pill to swallow in the realm of [type-safe](type-checking) programming.
A type that is both written to and read from a data structure fundamentally cannot be covariant or contravariant without sacrificing type-safety.
Let's move on to the next chapter and start reaping some benefits from having learned about variance.

