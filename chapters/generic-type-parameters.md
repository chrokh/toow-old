# Generic type parameters

We've already given an overview of [generics](generics).
It's now time to start talking about the specifics.
In this chapter we're going to discuss the concept of generic type parameters.

% TODO: KeyValuePair<K, V> with a text saying "type parameters" and two arrows pointing at K and V.
```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:type-parameter

Type parameters must be replaced by actual types when we're turning a generic type or method definition into a constructed type or method that we can instantiate or call.
```

## Motivation

In the chapter on [generics](generics) we listed a bunch things that can be defined generically.
Generic classes, interfaces, structs, and delegates are together referred to as generic types.
Then we also have generic methods.

Irrespectively of how you're using generics, we discussed how retaining [static type safety](type-safety) is a key feature.
Since types in the type system of C# is partly [manifested](manifested-vs-inferred) rather than inferred we must have a way of explicitly talking about the types that will eventually be used when generics are constructed.
This is why we have type parameters.


## Definition

Generic type definitions and generic method definitions contain type parameters that must be replaced by actual types in order to create an instance of the generic type or run the generic method.

A "generic type argument" is whatever type is used to replace a type parameter with an actual type. Just like how an argument is used in place of a parameter when applying methods, a generic type argument is used in place of a generic type parameter.

In the generic type `List<T>` the letter `T` is the type parameter.
To turn the generic type definition `List<T>` into a constructed generic type we must replace the type parameter with an actual type such as `string`, `int`, `Cat` so that it becomes for example `List<int>`.
In the constructed type `Tuple<int, string>` the types `int` and `string` are generic type arguments.

The type that we use to replace the type parameter can be arbitrarily complex.
Importantly, it can also be another constructed generic type.
This means that `List<List<List<int>>>` is an entirely valid constructed generic type.
What could such a type possible model?
Well, how about a three-dimensional coordinate system.

In the chapters on [generic types](generic-types) and [generic methods](generic-methods) we will explore the syntax of type parameters in detail.
In the chapter on [generic type parameter constraints](type-parameter-constraints) we will show how to put constraints on a type parameter so that only a subset of all types can be used in place of a type parameter.


## Examples

In the generic type `List<T>` the letter `T` is the type parameter.

In the generic type `Tuple<T1, T2>` both `T1` and `T2` are type parameters.

In the constructed type `List<int>` the type `int` is the generic type argument.

In the constructed type `Tuple<int, string>` the types `int` and `string` are generic type arguments.


## Discussion

% TODO: What to write here?


### Naming conventions

The letter `T` is conventionally used when only a single type parameter is needed.
Using the letter `T` is merely convention and was probably initiated since "T" is the first letter in the word "type".
In contrast, in the language Haskell the convention is to start with the letter `a` and then move forward in the alphabet if we need more parameters.[^haskell-type-parameter-names]
The name used to reference a type parameter is arbitrary in the same sense that any variable name is arbitrary.

[^haskell-type-parameter-names]: In Haskell, type parameters start with a lower case letter so we would name it `a` rather than `A`.

However, arbitrary single-letter names tend to be used if there is no other name that more clearly conveys what role the type parameter plays.
For example, the generic type `Dictionary<TKey, TValue>` captures the idea of a collection of key-value pairs.
In the collection you have values of type `TValue` that are identified by keys of type `TKey`.

Using meaningful type parameter names can convey a lot of information to the reader of the type.
Imagine if the type of the generic dictionary instead would have been declared as `Dictionary<A, B>` instead of `Dictionary<TKey, TValue>`.
How would we know whether it stores values of type `A` or `B`?
We would have to resort to reading the implementation or the documentation.
Remember the chapter on [naming](naming)?
Not ideal.

In C# it is also conventional to prefix descriptive type parameter names with the letter `T`.
So instead of saying for example `Left` and `Right` we would say `TLeft` and `TRight`.


### Declaring vs using

It is important that we keep track of whether we are declaring or using a type parameter.
If you use a type parameter which has already been declared then the type that will be used when the generic type is constructed is the same as the type that replaced the type parameter.

Just like variables, but unlike method arguments, we cannot *declare* the same name twice within the same scope.
We are however free to *use* the same name any number of times.
If we try to declare a generic type with two type parameters of the same name we will get a compiler error:

```csharp
class Pair<T, T> { }
```

```output
error CS0692: Duplicate type parameter 'T'.
```

Instead, we must use different names for each type parameter.

```csharp
class Pair<T1, T2> { }
```

This will make a lot more sense in the chapter on [generic types](generic-types) and [generic methods](generic-methods) since we need a bit more syntax to explore this deeper.
The `T` which is surrounded by angle-brackets (`<T>`) is the type parameter.
So don't worry if you feel a bit confused at the moment.
It will soon all come together.

Just like with variables however, we are free to *use* our type variables any number of types in our generic type or method definition.
In fact, what would be the point of type or value variables if we couldn't use them?

Again, I know that this is way too much syntax too soon, but just give the code below a glance.
Whenever the type is constructed, `T1` and `T2` will be replaced by actual types, and the type of the property `Fst` will always be the same as the type that replaced `T1`.

```csharp
class Pair<T1, T2>
{
  public T1 Fst { get; private set; }
  public T2 Snd { get; private set; }
  public Pair (T1 fst, T2 snd)
  {
    Fst = fst;
    Snd = snd;
  }
}
```

Upon construction it is of course entirely possible to let `T1` and `T2` be the same type.
Which in turn would mean that the properties `Fst` and `Snd` have the same type, but this is only a possibility.
In other words it is possible that `typeof(T1) == typeof(T2)` but it's not necessary.
On the value level, it is possible that `Fst` (of type `T1`) and `Snd` (of type `T2`) have the same type, but again it is not necessary.

%---
%
%%Consider for example a generic method definition with the signature `T id<T> (T val)`.
%%The method is called `id`, takes an argument of type `T` which we store in a variable called `val` and then it returns something of type `T`.
%
%The `T` which is surrounded by angle-brackets (`<T>`) is the type parameter.
%We will discuss this syntax in detail in the chapters on [generic types](generic-types) and [generic methods](generic-methods).
%However, this means that the method `id` takes one type as an argument and one value of said type.
%
%So if we call the method with an `int` like this:
%
%```csharp
%id<int>(10); // Explicitly replacing the type parameter.
%id(10);      // Implicitly replacing the type parameter.
%```
%
%then we will get back something of type `int` since the type parameter `T` was replaced by the type `int` and since the return type was said to be of type `int`.
%Had we replaced the type parameter with `Cat` we would have had to pass a `Cat` as input and we would be sure to get a `Cat` back as output.
%
%By the way, in the case of generic methods it is possible to infer the type of the type parameter and hence implicitly replace it.
%This is what we're doing on the second line in the example above.
%Again, more on this in the chapter on [generic methods](generic-methods).
%
%If however the signature of the method was:
%
%```csharp
%T2 two<T1, T2> (T1 one, T2 two);
%```
%
%then we would get something back of the type that replaced `T2`.
%The type that replaces `T1` only determines the type of the first argument that we have to send to the method.



## Exercises

```{exercise}
What is a generic type parameter?
```

```{exercise}
What is a generic type argument?
```

```{exercise}
Why do we need type parameters?
```

```{exercise}
Assume that we declare two type parameters, let's call them `T1` and `T2` within a generic type definition.

1. When the generic type is constructed, is it *necessary* that `T1` is the same type as `T2`?
2. When the generic type is constructed, is it *possible* for `T1` to be the same type as `T2`?
```

```{exercise}
In your own words, give an example of a type parameter that could be used in a generic type or a generic method.
```
