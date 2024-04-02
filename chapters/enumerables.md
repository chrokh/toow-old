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

# Enumerables

Enumerables in .NET are a native implementation of the [Iterator pattern](iterator-pattern), allowing you to iterate through collections in a decoupled fashion.

In .NET we have the interface `IEnumerable` which correspond to the idea of the 'iterable' (or 'aggregator') from the Iterator pattern and the interface `IEnumerator` which corresponds to the idea of the 'iterator'.

```{admonition} Key point
Enumerables offer a way to access elements in a collection sequentially, without exposing the underlying details, just like the [Iterator pattern](iterator-pattern).
```

% https://cdn.discordapp.com/attachments/1118630713084870736/1150644905669042206/chrokh_indiana_jones_in_cave_with_flashlight_illustrated_cartoo_91a1802b-5c71-4d01-9629-486eb110328e.png
```{figure} ../images/cover-enumerables.jpg
Imagine walking through a cave like maze with a flashlight, seeing only one step ahead, yet confident you can explore the entire maze. This is what enumerables are like in programming. They allow you to traverse through collections, one element at a time, without needing to understand its underlying structure.
```

## What is an Enumerable?

An enumerable is an object that implements the `IEnumerable` interface. This interface has a single method called `GetEnumerator`, which returns an object implementing the `IEnumerator` interface. This `IEnumerator` object then allows for the sequential traversal of elements in the collection.

Since the `foreach` loop has native support for `IEnumerable` we don't have to explicitly extract and traverse the enumerator when we pass an enumerable to a `foreach` loop.
Here's a simple example using a list:

```{code-cell}
// Create a List and upcast to IEnumerable.
IEnumerable<int> numbers = new List<int>() { 1, 2, 3 };

// Using foreach loop with IEnumerable.
foreach (int number in numbers)
    Console.WriteLine(number);
```

```{note}
Remember, `List<T>` can be upcast to `IEnumerable<T>` because it implements the interface `ICollection<T>` which implements the interface `IEnumerable<T>`.
```

## Relation to Iterator pattern

If we look at what's happening under the hood we can start to see how this is a native implementation of the [Iterator pattern](iterator-pattern).
Let's extract the enumerator and then traverse it manually.

```{code-cell}
// Create a List and upcast to IEnumerable.
IEnumerable<int> numbers = new List<int>() { 10, 20, 30 };

// Get IEnumerator from IEnumerable.
IEnumerator<int> enumerator = numbers.GetEnumerator();

// Iterate using the enumerator (not enumerable!).
while (enumerator.MoveNext())
{
    // Grab the current item.
    int current = enumerator.Current;

    Console.WriteLine(current);
}
```

The code above essentially looks the same as the code that we saw in the chapter on the [Iterator pattern](iterator-pattern).

## First value of an enumerator

What is the first value in the sequence of a new enumerator?
In the chapter on [Iterator pattern](iterator-pattern) we set the first value to the first value of the sequence.
This meant that we had to use a [`do while`](iteration) loop rather than a `while` loop since we would otherwise skip the first element.
Have a look back in the chapter on Iterator pattern if this assertion doesn't make any sense.

```{warning}
Before you've called `MoveNext` on the enumerator for the first time, the `Current` value is the [default value](default-values) of the data type of the enumerator.
```

The behavior of enumerators in .NET is however defined slightly differently.
To enable programmers to use `while` rather than having to use `do while` loops the .NET language designers have opted to let the initial value of an enumerator be a value that's **not** part of the sequence.
The initial value of an enumerator is instead the default value of the data type aggregated in the enumerator.

Let's take `List<int>` for example.

```{code-cell}
// Create a list of integers.
List<int> numbers = new List<int>() { 10, 20, 30 };

// Get an enumerator from the list.
IEnumerator<int> enumerator = numbers.GetEnumerator();

// Without first calling MoveNext, ask for the Current element.
Console.WriteLine(enumerator.Current);
```

In the code above we do not end up with the value `10`, which is the first value in the enumerable.
Instead we get the value `0`, which is the default value of the data type `int`.

You can think of this as that the first value that the enumerator is pointing to is a value not part of the sequence.
When we're using the enumerator in a `foreach` loop, we will never see this inital value because `MoveNext` is called immediately.

```{warning}
Under 'normal use', the initial value of an enumerator should not be exposed.
Nevertheless, you should be aware of this risk so that you do not diverge from 'normal use'.
```

```{admonition} Question
Compare this behavior to the behavior that we defined in the chapter on [Iterator pattern](iterator-pattern).
What are the benefits and drawbacks of this design?
```

## Conclusion

Enumerables are an embodiment of the [Iterator pattern](iterator-pattern).
They offer a decoupled, simple, and flexible way to traverse collections.

In the next chapter we will discuss the [`yield`](the-yield-statement) statement, which greatly simplifies the process of writing custom iterators.
In a later chapter, we will discuss [LINQ](linq). The way that enumerables intergrate with LINQ makes both a must-know concept for any C# developer worth their salt.
Do not sleep on enumerables.

