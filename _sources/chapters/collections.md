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

# Collections

So far, we've been storing multiple data items using [arrays](arrays).
However, arrays are usually *not* the best option.
Their size is fixed at creation, and they offer limited built-in functionality.
Fortunately, C# provides richer data structures for storing and managing collections of items, which take advantage of the [type-safe](type-checking) flexibility afforded by [generics](generics).
In this chapter, we'll explore the concept of generic collections and focus on one of the foundational interfaces for these collections, `ICollection<T>`.

```{admonition} Key point
Generic collections allow you to work with groups of objects in a type-safe manner, offering a wide range of operations not found in arrays. The `ICollection<T>` interface serves as the cornerstone for mutable collections like lists and dictionaries in C#.
```

A generic collection is a data structure that allows you to store and manage multiple items of a specified type. Unlike arrays, these collections come with a set of built-in methods for adding, removing, and querying elements, among other things. Since these collections are generic, you get the benefit of type safety, which ensures that you can't accidentally insert an element of the wrong type.

% https://cdn.discordapp.com/attachments/1118630713084870736/1149608766002700348/chrokh_wonderful_library_by_Tove_Jansson_e1303138-1afe-4758-939e-282a2c3fa460.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1149608803587862568/chrokh_huge_library_by_Tove_Jansson_1abcaa2f-cb6a-45e0-af55-8de27c471225.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1149610801548763136/chrokh_huge_library_by_Tove_Jansson_79b61826-5dd2-4226-819b-c2145046300a.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1149610801548763136/chrokh_huge_library_by_Tove_Jansson_79b61826-5dd2-4226-819b-c2145046300a.png
```{figure} ../images/cover-collections.jpg
In a library, all books get a place on the shelf. In programming, generic collections allow you to organize your objects while maintaining their types.
```


## The `ICollection<T>` Interface

The `ICollection<T>` interface is a part of the [`System.Collections.Generic`](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic) [namespace](namespaces) and serves as a foundational interface for all generic collections that are [mutable](mutability) (i.e., can be modified after creation). This interface provides a standard set of methods and properties that any implementing collection must define.

The [generic type parameter](generic-types) `T` defines the type of items that will be stored in a given collection. For example, `ICollection<Cat>` defines a collection where each item in the collection must be a `Cat`.

```{important}
The ICollection<T> interface provides the most basic methods for working with a collection of objects that can be added to, removed from, or searched.
```

Here are some of the main methods and properties that `ICollection<T>` provides:

- `Add(T item)`: Adds an item to the collection.
- `Clear()`: Removes all items from the collection.
- `Contains(T item)`: Determines whether the collection contains a specific item.
- `Remove(T item)`: Removes the first occurrence of a specific item from the collection.
- `Count`: Gets the number of elements contained in the collection.

```{seealso}
To learn more about what you can do with `ICollection<T>`, you should consult the official [Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.icollection-1): `ICollection<T>` Interface. Learning to read documentation is a key skill in programming!
```

```{note}
You can of course define your own specializations of `ICollection<T>` as long as you make sure to implement all the methods of the interface.
```

## Examples

In the example below we're using the generic class `List<T>` to add some numbers and then perform a few operations on the list.

```{code-cell}
var numbers = new List<int>();

// Add elements.
numbers.Add(10);
numbers.Add(20);
numbers.Add(30);

// Print the number of items in the list.
Console.WriteLine(numbers.Count);

// Print whether or not the number 2 is in the list.
Console.WriteLine(numbers.Contains(20));

// Remove the number 20 from the list.
numbers.Remove(20);

// Print the number of items in the list again.
Console.WriteLine(numbers.Count);
```

Next, let's look at an example where we're using the generic class `Dictionary<TKey, TValue>` to associate user ids with nicknames.

The type parameter `TKey` is the data type that will be used for identifiers and the parameter `TValue` is the data type of the values that the identifiers identify.

```{code-cell}
var nicknames = new Dictionary<int, string>();

// Add some key-value pairs.
nicknames.Add(142, "Rafael");
nicknames.Add(104, "Michelangeo");

// Check if the dictionary has a nickname associated with the key 142.
Console.WriteLine(nicknames.ContainsKey(142));

// Remove the key-value pair with the key 142.
nicknames.Remove(142);

// Check if the dictionary has a nickname associated with the key 142 again.
Console.WriteLine(nicknames.ContainsKey(142));
```

Let's look at another use-case for dictionaries: structured data with arbitrary keys.
Imagine for example that we're building a password manager where the user can add arbitrary information about a particular account that they have.

```{code-cell}
var entry = new Dictionary<string, string>();

entry.Add("Username", "user123");
entry.Add("Password", "XmTHRzVCMgqaEUyq");
entry.Add("Recovery code", "wUcFJjQnRAUNWRmBtEBJ");
entry.Add("API public key", "tXNhSZc5GZEETn7M7QbqfP8w82YNUYaFJ6c7pBe8");
entry.Add("API private key", "zZTMDW46njDeWT5PqXNBnjNNpMy759QMVfn64UDC");
```

As demonstrated, generic collections offer significant advantages over [arrays](arrays) in flexibility and functionality.

```{seealso}
As we'll learn when we get to the [dependency inversion principle](dependency-inversion-principle) we also improve [maintainability](maintainability) by coupling to generalizations like `ICollection<T>` instead than [arrays](arrays). But more on that later.
```

```{tip}
Both `List<T>` and `Dictionary<TKey, TValue>` are classes that implement `ICollection<T>`, so they provide all the methods and properties we discussed earlier.
```

## Summary

Generic collections offer a more flexible and feature-rich way to work with groups of items compared to [arrays](arrays). The `ICollection<T>` interface forms the foundation of many useful collection types like `List<T>` and `Dictionary<TKey, TValue>`, providing basic methods for adding, removing, and querying elements.

```{tip}
Opt to use generic collections over [arrays](arrays) unless you have a very compelling reason to do otherwise.
```

Understanding how to work with collections, particularly lists and dictionaries, is crucial due to their wide usage in .NET programming.

```{admonition} Documentation
- [`List<T>` class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1).
- [`Dictionary<TKey, TValue>` Class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2).
- [`System.Collections.Generic` Namespace](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic).
```

In a later chapter we'll explore the even more abstract concept of [enumerables](enumerables) but we've got some ground to cover before we can get to that point.
In the next chapter we'll look at how to make collection initialization even simpler.

