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

# Variance

Having learned about [subtype polymorphism](subtype-polymorphism) we are now accustomed to the idea that a more specific type (such as a `Cat`) can be used in place of a more general type (such as an `Animal`).
We think of this as `Cat` being a subtype of `Animal` and of `Animal` being substitutable with `Cat`.
Simple. But, what about [generic types](generic-types) and what about [delegates](delegates)?

%However, as soon as we create our own types  that use other types or delegates that use other types we are faced with the question of *how subtyping composes*.

%What do we mean when we say 'complex type'? We mean any type that in its definition mentions another type. A class called `FruitJuicer` might for example reference one class called `Fruit` and another called `Juice`.

```{admonition} Key point
Variance is fundamentally about substitution.
When can we use a type that uses a type in place of another type that uses a type?
```

```{figure} ../images/subset.png

A subtype can be thought of as a subset. This means that it must be possible to use the subtype anywhere where the supertype is expected. Variance deals with the question of what this means in the context of types that use instances of other types.
```

Say, for example, that we have a variable of type `IList<Fruit>`.
Can we then assign an instance of the type `IList<Apple>` to that variable?
If apples are fruits then a list of apples should be a list of fruit, right?
Actually, in most languages, the answer to this question is: no.

```{code-cell}
:tags: [remove-input]
class Fruit {}
class Apple : Fruit {}
```

```{code-cell}
:tags: [raises-exception]
// T in IList<T> is invariant, so this DOES NOT compile:
IList<Apple> apples = null;
IList<Fruit> fruits = apples;
```

However, if we have a variable of type `IEnumerable<Fruit>` we can assign it an object of type `IEnumerable<Apple>`.

```{code-cell}
// T in IEnumerable<T> is covariant, so this does compile:
IEnumerable<Apple> apples = null;
IEnumerable<Fruit> fruits = apples;
```

Conversely, if we have a variable of type `Action<Apple>` we can assign it an object of type `Action<Fruit>`.

```{code-cell}
// T in Action<T> is contravariant, so this does compile:
Action<Fruit> fruitAction = null;
Action<Apple> appleAction = fruitAction;
```

To understand why this is, we must understand the topic of variance.
Let's use [generics](generics) to enumerate the options.
If a generic type `I` is parameterized over the type `T`, we say `I<T>`.
The question of variance deals with whether `T` in `I<T>` is:
- [covariant](covariance),
- [contravariant](contravariance),
- [invariant](invariance), or
- bivariant.

Invariant means that it's neither covariant or contravariant, and bivariant means that it's both covariant and contravariant at the same time.
When we know which of the above apply to `T` in `I` we can determine whether a type `I<A>` is a subtype of another type `I<B>` if `A` is a subtype of `B`.

We will explore [covariance](covariance), [contravariance](contravariance), and [invariance](invariance) in the coming chapters.
Later we will use this understanding to explore the [Liskov substitution principle](liskov-substitution-principle) which tells us how to use inheritance safely.
Then we will discuss how variance in .NET applies to [classes](covariant-return-types), [delegates](variant-delegates), [generic delegates](variant-generic-delegates), and [interfaces](variant-generic-interfaces).




%### Covariance
%
%Covariance follows the usual ordering of types.
%Meaning that a subtype may use a more *specific* type than what's used in the supertype.
%
%In terms of generics: If `A` is a subtype of `B` and if `T` is *covariant* in `I<T>` then `I<A>` is a subtype of `I<B>`.
%
%```
%if  A : B  then  I<A> : I<B>
%```
%
%
%In the example below, a variable of type `IEnumerable<Fruit>` is assigned a value of type `IEnumerable<Apple>`.
%This is valid since `IEnumerable<Apple>` is a subtype of `IEnumerable<Fruit>` which means that the type can be [implicitly upcast](type-conversions).
%The reason it is a valid subtype is that `T` in `IEnumerable<T>` is *covariant* and `Apple` is a subtype of `Fruit`.
%
%```{code-cell}
%IEnumerable<Apple> apples = new List<Apple>();
%IEnumerable<Fruit> fruits = apples;
%```
%
%The example shows that if you need a series of fruits then a series of apples will do just fine.
%
%%Covariance permits a method to return a type that is derived from the original return type.
%
%
%### Contravariance
%
%Contravariance is the opposite of covariance.
%Contravariance means that the usual ordering of types is *reversed*.
%Meaning that a subtype may use a more *general* type than that what's used in the supertype.
%
%In terms of generics: If `A` is a subtype of `B` and if `T` is *contravariant* in `I<T>` then `I<B>` is a subtype of `I<A>`.
%
%```
%if A : B then I<B> : I<A>
%```
%
%In the example below, a variable of type `Action<Apple>` is assigned a value of type `Action<Fruit>`.
%This is valid since `Action<Fruit>` is a subtype of `Action<Apple>` which means that the type can be [implicitly upcast](type-conversions).
%The reason it is a valid subtype is that `T` in `Action<T>` is *contravariant* and `Apple` is a subtype of `Fruit`.
%
%```{code-cell}
%class Juice { }
%```
%
%```{code-cell}
%Func<Fruit, Juice> fruitJuicer = (Fruit x) => new Juice();
%Func<Apple, Juice> appleJuicer = fruitJuicer;
%```
%
%The intuitive explanation of this is that if you need an apple juicer, a fruit juicer will do just fine.
%In other words, a fruit juicer is a good substitute for an apple juicer.
%Why? Because if you need to juice apples and you have a fruit juicer, then you can still juice apples.
%
%
%### Bivariance
%
%Bivariance follows both ordering of types at the same time.
%A type rule that is bivariant is *both* covariant and contravariant.
%Meaning that a subtype may use a more general *or* a more specific type than what's used in the supertype.
%
%In terms of generics: If `A` is a subtype of `B` and if `T` is *bivariant* in `I<T>` then `I<A>` is *both* a subtype and a supertype of `I<B>`.
%
%Bivariance is usually not seen in languages and is not supported by C#.
%
%
%### Invariance
%
%A type rule that is neither covariant nor contravariant is invariant.
%
%Invariance follows no ordering of types.
%Meaning that a subtype must use the *same* type as what's used in the supertype.
%
%In terms of generics: If `A` is a subtype of `B` and if `T` is *invariant* in `I<T>` then there is no subtype relationship between `I<A>` and `I<B>`.

