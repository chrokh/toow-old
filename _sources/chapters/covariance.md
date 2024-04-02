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

# Covariance

We've introduced the concept of [variance](variance) and it's now time to understand the specific type of variance known as covariance.

```{admonition} Key point
If you ask for a bag of fruits and I give you a bag of apples, you shouldn't be upset.
```

Imagine that you were expecting a bag of fruit but get a bag of apples.
A bag of apples is still a bag of fruit.
Anything you had intended to do with the fruits, you can do to the apples.
This illustrates the concept of covariance.

```{figure} ../images/cover-covariance.jpg
Just like a bag of apples is a bag of fruit, covariance follows the natural hierarchy of types.
```

If the contents of a bag is covariant, then a bag of apples is a subtype of a bag of fruit.
Let's dissect what this means and why it makes sense.

## Understanding covariance with generics

If a generic type `I` is parameterized over the type parameter `T`, denoted as `I<T>`, and if `T` is *covariant*, then the **usual ordering of types is maintained**.

This means that subtypes may use more *specific* types than what's used in the supertype.
For example `I<Apple>` would be a subtype of `I<Fruit>` if `Apple` is a subtype of `Fruit`.

```{admonition} Definition
If `A` is a subtype of `B` and if `T` is *covariant* in `I<T>` then `I<A>` is a subtype of `I<B>`.
```

Let's use [generics](generics) to understand covariance.
Assume that we have the two classes `Apple` and `Fruit` and that the former is a subtype of the latter.

```{code-cell}
class Fruit {}
class Apple : Fruit {}
```

In the example below, a variable of type `IEnumerable<Fruit>` is assigned a value of type `IEnumerable<Apple>`.
This is valid since `IEnumerable<Apple>` is a subtype of `IEnumerable<Fruit>` which means that the type can be [implicitly upcast](type-conversions).
It is a subtype since `T` is *covariant* in `IEnumerable<T>` and `Apple` is a subtype of `Fruit`.

```{code-cell}
IEnumerable<Apple> apples = new List<Apple>();
IEnumerable<Fruit> fruits = apples;
```

The example shows that if you need a series of fruits then a series of apples will do just fine.
Why is this compile-time [type-safe](type-checking)?
The `IEnumerable<T>` interface only exposes a single method which returns `IEnumerator<T>` which in turn allows you to loop through the items in the collection, but not modify them.

```{tip}
`IEnumerable<T>` is essentially a 'producer' of elements of type `T` but never a 'consumer' of them.
It only returns elements of type `T` as output, but never takes them as input.
```

In essence, when you specify that you need an `IEnumerable<Fruit>`, you're saying that you need a sequence that will produce elements that are, at minimum, of type `Fruit`. An object of type `IEnumerable<Apple>` fits this criterion because it produces elements that are always of type `Apple`, which is a subtype of `Fruit`.
Therefore, `IEnumerable<Apple>` can be safely treated as `IEnumerable<Fruit>` without causing any type errors.


## Understanding covariance with classes

Before we leave this chapter, let's also look at roughly the same problem but without [generics](generics).
In the code below we can see how a subtype called `AppleSequence` [inherits](inheritance) from `FruitSequence` and [overrides](overriding) the method that returns the next item in the sequence.

```{code-cell}
class Fruit { }
class Apple : Fruit { }

class FruitSequence
{
    public virtual Fruit GetNext()
        => new Fruit(); // Placeholder implementation.
}

class AppleSequence : FruitSequence
{
    public override Apple GetNext()
        => new Apple(); // Placeholder implementation.
}
```

This code is valid C# due to a feature known as [covariant return types](variant-classes) but more on that in its own chapter.
What we should emphasize is that the return type of the subtype's method marked as `override` is a subtype of the return type of the supertype's method marked as `virtual`.

```{note}
Why is it [type safe](type-checking)? The `GetNext()` method in both `FruitSequence` and `AppleSequence` acts as a 'producer' of elements, much like the `GetEnumerator` method of `IEnumerable<T>`. It produces elements of a specific type as output but doesn't consume any elements as input. This is why it is type safe to let the method's return type be covariant.
```

```{figure} ../images/uml-covariance.png
:name: fig:uml-covariance
This UML class diagram is annotated with a red arrow to highlight the concept of covariance. Consistent with the natural type hierarchy of the method return types, where `Apple` is a subtype of `Fruit`, the arrow between the containing types `AppleSequence` and `FruitSequence` also follows this hierarchy, signifying that `AppleSequence` is a subtype of `FruitSequence`.
```

Consider the [UML class diagram](uml-class-diagram) in {numref}`fig:uml-covariance` where the arrows indicate subtype relationships. The arrow from `AppleSequence` to `FruitSequence` signifies that `AppleSequence` is a subtype of `FruitSequence`. The arrow from `Apple` to `Fruit` is not standard UML but indicates that `Apple` is a subtype of `Fruit`.
The fact that both arrows point in the same direction tells us that we're dealing with covariance.

## Up next

In the next chapter we will learn about [contravariance](contravariance) where the type relationships are inverted. While covariance allows us to use a more specific type where a more general one is expected, contravariance allows us to use a more general type in place of a more specific one.

