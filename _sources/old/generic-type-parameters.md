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

# Generic type parameters


% TODO: FIGURE
%% TODO: KeyValuePair<K, V> with a text saying "type parameters" and two arrows pointing at K and V.
%{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:type-parameter
%
%Type parameters must be replaced by actual types when we're turning a generic type or method definition into a constructed type or method that we can instantiate or call.

In our previous chapter, we introduced the concept of generics in C#. We mentioned that you can create a single implementation that works for every member of every possible type. This powerful feature is achieved through the use of 'generic type parameters'.

%Irrespectively of how you're using generics, we discussed how retaining [static type safety](type-safety) is a key feature.
%Since types in the type system of C# are partly [manifested](manifested-vs-inferred) rather than inferred we must have a way of explicitly talking about the types that will eventually be used when generics are constructed.
%This is why we have type parameters.

Generic type parameters are used when writing generic type and method definitions. We'll talk more about those in separate chapters.
Type parameters in a type or method definition must be replaced by actual types in order to create an actual type or method.
The actual type or method is called a 'constructed generic type' or 'constructed generic method'.

Let's say that we have a generic type definition called `Pair<T>` which can be used to create pairs containing elements of type `T`.
A pair is essentially a value containing two values. Think of it like a list or an array that always have two elements.

In the generic type definition `Pair<T>`, the letter `T` is the type parameter.
To turn the generic type definition `Pair<T>` into a constructed generic type we must replace the type parameter with an actual type such as `string`, `int`, `Cat` or any other actual type so that it becomes for example `Pair<int>`.
In the constructed type `Pair<int>` the type `int` is a type argument.

```{admonition} Key point
Generic type parameters act as placeholders for the types you use in your generic code, allowing you to write a single implementation that works for any type.
```

The type that we replace the generic type parameter with is called a 'generic type argument'. Just like how an argument is used in place of a parameter when applying methods, a generic type argument is used in place of a generic type parameter.

```{hint}
Generic type parameters are like variables whose values are types.
```

The type that we use to replace the type parameter can be arbitrarily complex.
Importantly, it can also be another constructed generic type.
This means that `Pair<Pair<int>>` is an entirely valid constructed generic type.
That type corresponds to a pair of pairs of integers.

In the chapters on [generic types](generic-types) and [generic methods](generic-methods) we will see how type parameters are used in action.

In the chapter on [generic type parameter constraints](type-parameter-constraints) we will show how to put constraints on a type parameter so that only a subset of all types can be used in place of a type parameter.
For instance, you can restrict the type parameter to be a class, a value type, or even mandate that it implements a particular interface

%- In the generic type `List<T>` the letter `T` is the type parameter.
%- In the generic type `Tuple<T1, T2>` both `T1` and `T2` are type parameters.
%- In the constructed type `List<int>` the type `int` is the generic type argument.
%- In the constructed type `Tuple<int, string>` the types `int` and `string` are generic type arguments.

```{note}
Type parameters are, in C#, conventionally either called `T`, some other name prefixed with `T` such as `TKey` or `TValue`, or `T` followed by a number such as `T1` and so forth.
In theory you could use any valid identifier, but it's easier for everyone if we stick to the convention.
The letter `T` has probably been chosen since 'T' is the first letter in the word 'type'.
Just like with variable names, try to choose names that clearly convey your intent.
```

%In contrast, in the language Haskell the convention is to start with the letter `a` and then move forward in the alphabet if we need more parameters.[^haskell-type-parameter-names]
%The name used to reference a type parameter is arbitrary in the same sense that any variable name is arbitrary.

%[^haskell-type-parameter-names]: In Haskell, type parameters start with a lower case letter so we would name it `a` rather than `A`.

%However, arbitrary single-letter names tend to be used only if there is no other name that more clearly conveys what role the type parameter plays.
%For example, the generic type `Dictionary<TKey, TValue>` captures the idea of a collection of key-value pairs.
%In the collection you have values of type `TValue` that are identified by keys of type `TKey`.

%Using meaningful type parameter names can convey a lot of information to the reader of the type.
%Imagine if the type of the generic dictionary instead would have been declared as `Dictionary<A, B>` instead of `Dictionary<TKey, TValue>`.
%How would we know whether it stores values of type `A` or `B`?
%We would have to resort to reading the implementation or the documentation.
%Not ideal.
%As we discussed in the chapter on [naming](naming), names matter.

%In C# it is also conventional to prefix descriptive type parameter names with the letter `T`.
%So instead of saying for example `Left` and `Right` we would say `TLeft` and `TRight`.


%### Declaring vs using
%
%It is important that we keep track of whether we are declaring or using a type parameter.
%If you use a type parameter which has already been declared then the type that will be used when the generic type is constructed is the same as the type that replaced the type parameter.
%
%Just like with variables, we cannot *declare* the same name twice within the same scope.
%We are however free to *use* the same name any number of times.
%If we try to declare a generic type with two type parameters of the same name we will get a compiler error:
%
%```csharp
%class Pair<T, T> { }
%```
%
%```output
%error CS0692: Duplicate type parameter 'T'.
%```
%
%Instead, we must use different names for each type parameter.
%
%```csharp
%class Pair<T1, T2> { }
%```
%
%This will make a lot more sense in the chapter on [generic types](generic-types) and [generic methods](generic-methods) since we need a bit more syntax to explore this deeper.
%The `T` which is surrounded by angle-brackets (`<T>`) is the type parameter.
%So don't worry if you feel a bit confused at the moment.
%It will soon all come together.
%
%Just like with variables however, we are free to *use* our type variables any number of types in our generic type or method definition.
%In fact, what would be the point of type or value variables if we couldn't use them?
%
%Again, I know that this is way too much syntax too soon, but just give the code below a glance.
%Whenever the type is constructed, `T1` and `T2` will be replaced by actual types, and the type of the property `Fst` will always be the same as the type that replaced `T1`.
%
%```csharp
%class Pair<T1, T2>
%{
%  public T1 Fst { get; private set; }
%  public T2 Snd { get; private set; }
%  public Pair (T1 fst, T2 snd)
%  {
%    Fst = fst;
%    Snd = snd;
%  }
%}
%```
%
%Upon construction it is of course entirely possible to let `T1` and `T2` be the same type.
%Which in turn would mean that the properties `Fst` and `Snd` have the same type, but this is only a possibility.
%In other words it is possible that `typeof(T1) == typeof(T2)` but it's not necessary.
%%On the value level, it is possible that `Fst` (of type `T1`) and `Snd` (of type `T2`) have the same type, but again it is not necessary.

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

