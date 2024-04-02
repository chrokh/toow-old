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

# Contravariance

After diving into the topic of [variance](variance) and having introduced [covariance](covariance), it's time to explore another form of variance: contravariance.

```{admonition} Key point
If you ask for a machine that produces juice from apples and I give you a machine that produces juice from any fruit then you shouldn't be upset.
```

Imagine that you were expecting a machine that produces juice from apples but get a machine that produces juice from any fruit.
If you were to feed only apples into this machine, it would function as well as an apple-specific juicer.
This illustrates the concept of contravariance.

```{figure} ../images/cover-contravariance.jpg
Just like a fruit juicer can substitute an orange juicer, contravariance inverts the natural hierarchy of types.
```

%The type of input items that a machine processes is contravariant.

If the type of input that the machine can process is *contravariant*, then a more general fruit juicer is a subtype of a more specific apple juicer.
In other words, the more general machine can *substitute* the more specific machine.
Let's dissect what this means.

```{tip}
Try to focus on whether something can *substitute* something else, rather than whether something *is* something else.
```


## Understanding contravariance with generic delegates

In [covariance](covariance), we saw that a more specific type can substitute a more general type. Contravariance flips this idea on its head.
If a generic type `I` is parameterized over the type parameter `T`, denoted as `I<T>`, and if `T` is *contravariant*, then the **usual ordering of types is inverted**.

This means that subtypes may use more *general* types than what's used in the supertype.
For example `I<Fruit>` would actually be a subtype of `I<Apple>` if `Apple` is a subtype of `Fruit`.

```{admonition} Definition
If `A` is a subtype of `B` and if `T` is *contravariant* in `I<T>` then `I<B>` is a subtype of `I<A>`.
```

Let's utilize [generic delegates](generic-delegates) to delve deeper into contravariance.
Suppose that we have the two classes `Apple` and `Fruit` and that the former is a subtype of the latter.

```{code-cell}
class Fruit {}
class Apple : Fruit {}
```

In the following example, a variable of type `Action<Apple>` is assigned a delegate instance of type `Action<Fruit>`.
This code compiles because `Action<Fruit>` is a subtype of `Action<Apple>` which means that the type can be [implicitly upcast](type-conversions).
It is a subtype since `T` is *contravariant* in `Action<T>` and `Apple` is a subtype of `Fruit`.

```{code-cell}
Action<Fruit> fruitJuicer = (Fruit x)
    => Console.WriteLine("Turning fruit into juice");

Action<Apple> appleJuicer = fruitJuicer;
```

Why is this compile-time [type-safe](type-checking)?
An `Action<T>` is a delegate whose values must all be functions or methods that take a `T` as input.
To determine whether a substitution is type-safe we consequently only need to care about whether any input that can be given to the supertype (`Action<Apple>`) also can be handled by the subtype (`Action<Fruit>`).

```{tip}
The generic delegate `Action<T>` is essentially a 'consumer' of elements of type `T`. It takes them as *input* but never produces them as *output*.
```

When you define an `Action<Apple>`, you are saying you need a function that can take objects of type `Apple` as input. An `Action<Fruit>` meets that requirement because it can take any `Fruit` as input, which of course includes `Apple` since that's a subtype of `Fruit`. Therefore, it is type-safe to assign `Action<Fruit>` to `Action<Apple>`.

## Understanding contravariance with classes

Let's now also explore how contravariance would work in the context of classes. Unlike with generics and unlike with covariance, C# does **not** support contravariance in classes. More on this in the chapter on [variant classes](variant-classes). However, we can still use classes to understand the concept of contravariance theoretically.

In the hypothetical code below, the class `FruitJuicer` [inherits](inheritance) from the class `AppleJuicer` and [overrides](overriding) the method that juices its input.

```csharp
class AppleJuicer
{
    public virtual void Juice(Apple apple)
        => Console.WriteLine("Turning apple into juice");
}

class FruitJuicer : AppleJuicer
{
    // The following override is theoretical and won't compile in C#.
    public override void Juice(Fruit fruit)
        => Console.WriteLine("Turning fruit into juice");
}
```

The method signature in the super class is `Juice(Apple apple)` while the method signature in the subclass is `Juice(Fruit fruit)`.
If C# would support contravariant method parameters then this would compile.
The subtype's method could accept a more general type than what's used in the supertype.

```{note}
Why is it [type safe](type-checking)? The `Juice` method in both `AppleJuicer` and `FruitJuicer` acts as a 'consumer' of elements, similar to certain methods in contravariant interfaces like `IComparer<T>`. These methods consume elements of a specific type as input but don't produce any elements of that type as output. This is why it's type-safe to have contravariant method input parameters.
```

```{figure} ../images/uml-contravariance.png
:name: fig:uml-contravariance
This UML class diagram is annotated with a red arrow to highlight the concept of contravariance. In contrast to the usual type hierarchy of the method parameters, where `Apple` is a subtype of `Fruit`, the arrow between the containing types follows an inverted hierarchy which causes the more general `FruitJuicer` to be a subtype of `AppleJuicer`.
```

Consider the UML class diagram in {numref}`fig:uml-contravariance` where the arrows indicate subtype relationships. The arrow from `FruitJuicer` to `AppleJuicer` indicates that `FruitJuicer` is a subtype of `AppleJuicer`. The other arrow from `Apple` to `Fruit` is not standard UML but indicates that `Apple` is a subtype of `Fruit`.
The fact that the arrows point in opposite directions tells us that we're dealing with contravariance.

## Up next

In the next chapter, we will delve into [invariance](invariance), where the type relationships are neither [covariant](covariance) nor contravariant. While covariance lets us use a more specific type where a general one is expected, and contravariance lets us use a more general type in place of a more specific one, invariance restricts us to using exactly the type that is specified.

