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

# Generic methods

%Dictionary<TKey, TValue> MakeDictionary<TKey, TValue>(TKey[] keys, TValue[] values)
%{
%    var dict = new Dictionary<TKey, TValue>();
%    for (int i = 0; i < keys.Length; i++)
%        dict[keys[i]] = values[i];
%    return dict;
%}
%
%var keys = new int[] { 1, 2, 3 };
%var values = new string[] { "Hello", "Generic", "Methods" };
%Dictionary<int, string> dict = MakeDictionary(keys, values);

Generics aren't confined to just classes and interfaces; methods can be generic as well.
Even if their containing type isn't generic.
Through the use of generic methods, we can ensure greater type safety without compromising on performance.

A generic method is defined similarly to a generic type, in the sense that we specify a list of type parameters in angle brackets `<...>`. However, the type parameters are defined on the method itself, not on the class.

%In our journey through programming, we often encounter scenarios that demand flexibility while ensuring type safety. Think of the numerous times you've had to rewrite or overload methods for different data types, resulting in repetitive, bloated, and hard-to-maintain code. This not only drains time but also introduces room for errors. Generics come to the rescue in such scenarios, especially generic methods. With them, you can craft adaptable methods that cater to a plethora of types without duplicating code. The power they bring to the table in promoting reusability while retaining performance is unmatched, and in this chapter, we'll delve deep into their mechanics and applications.

```{admonition} Key point
Generic methods can utilize their own type parameters, independent of their enclosing class's constraints.
This means a regular class, without any generic type parameters of its own, can still contain methods that operate generically.
It also means that within a generic class, a method can introduce its own distinct type parameters, separate from those of the class.
```

```{figure} ../images/cover-generic-methods.jpg

Just like how a wrapping station can encase any, regardless of the specifics of the gift, inside a standard box, generic methods wrap around any type, without needing to know its specifics.
```

Imagine that you want a method that duplicates every element in a list. Do we have to create separate methods for lists of `int`, `string`, `double`, and so on? No, because this is a prime example of when the of thing that the method deals with doesn't matter. As long as we get passed a list it doesn't matter what the list contains. We can utilize generics to write a single solution that works for all types.
For the sake of simplicity, let's write it as a [local function](local-functions).

```{code-cell}
List<T> duplicateEachItem<T>(List<T> list)
{
    List<T> duplicatedList = new List<T>();
    foreach (T item in list)
    {
        duplicatedList.Add(item);
        duplicatedList.Add(item);
    }
    return duplicatedList;
}
```

We can now use the generic local function to duplicate lists.

```{code-cell}
List<int> numbers = new List<int> { 1, 2, 3 };
List<int> duplicatedNumbers = duplicateEachItem(numbers);

Console.WriteLine(String.Join(", ", duplicatedNumbers));
```

When we call `DuplicateEachItem` in the code above, the compiler [infers](type-inference) the type argument for `T` based on the arguments we pass to the method. The inferred type argument in this case is `int`.
However, you can also specify the type argument explicitly, like in the code below.
This might be useful if the compiler misunderstands what we're trying to do.

```{code-cell}
duplicateEachItem<int>(numbers); // Explicit type argument.
```

```{note}
Generic methods make your code versatile without the need for overloading methods for different types.
```

Let's take another example.
Say that we've got two lists and that we want to combine them into one by taking one item from each list at a time.
This operation is, in programming, commonly called a 'zip' and can be defined in various ways.
Let's implement it as a generic method using local functions.

```{code-cell}
List<T> zip<T>(List<T> list1, List<T> list2)
{
    List<T> result = new List<T>();
    int count = Math.Max(list1.Count, list2.Count);

    for (int i = 0; i < count; i++)
    {
        if (i < list1.Count) result.Add(list1[i]);
        if (i < list2.Count) result.Add(list2[i]);
    }

    return result;
}
```

```{warning}
Always be cautious with generic methods and ensure that the operations within the method are universally applicable to all potential types.
```

Let's try out our generic zipping method.

```{code-cell}
List<int> listA = new List<int> { 1, 2, 3 };
List<int> listB = new List<int> { 10, 20, 30, 40, 50 };

List<int> zipped = zip(listA, listB);

Console.WriteLine(String.Join(", ", zipped));
```

```{seealso}
C# offers a [zip method](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.zip) in the `System.Linq` namespace, which pairs elements from two collections into a tuple or another type. Our implementation here provides a different behavior.
```

%``{danger}
%When using generics, especially with collections, be wary of potential null references or other type-related pitfalls.
%``

Overloading generic methods is entirely possible. It allows you to offer specialized behavior for certain types while retaining the flexibility of generics for others. However, when overloading generic methods, it's vital to tread carefully. The compiler chooses which method to invoke based on the method signature. When working with generic methods, type inference plays a crucial role in this decision-making process, which can lead to unexpected behavior if the method signatures are too similar or if type inference leads to ambiguity.

```{warning}
It's possible to overload generic methods, but be careful since it's easy to end up with surprising behavior.
```

```{code-cell}
public void Process<T>(T input)
    => Console.WriteLine($"Generic method called.");

public void Process(int number)
    => Console.WriteLine($"Overloaded method called.");
```

```{code-cell}
Process(10);      // Invokes the non-generic method.
Process<int>(10); // Invokes the generic method.
```

In the above example, when we explicitly use type inference by providing <int>, the generic method is invoked. Without it, the compiler sees the specialized overload for int as a better match and selects it. This demonstrates the necessity of being clear and explicit in both definition and invocation to avoid confusion.

Lastly, [extension methods](extension-methods), which we've covered in another chapter, can also be generic. This approach has been employed extensively in .NET, especially for defining useful methods on collections.
By using generic extension methods, you can add new functionalities to existing types without actually modifying them. For example, you might want to add the `duplicateEachItem` method directly to the `List<T>` type to allow for a more intuitive method call:

```csharp
using System.Collections.Generic;

public static class ListExtensions
{
    public static List<T> DuplicateEachItem<T>(this List<T> list)
    {
        List<T> duplicatedList = new List<T>();
        foreach (T item in list)
        {
            duplicatedList.Add(item);
            duplicatedList.Add(item);
        }
        return duplicatedList;
    }
}
```

This allows for a more fluent usage:

```csharp
List<int> numbers = new List<int> { 1, 2, 3 };

// Calling DuplicateEachItem on the instance.
List<int> duplicatedNumbers = numbers.DuplicateEachItem();

Console.WriteLine(String.Join(", ", duplicatedNumbers));
```

```output
1, 1, 2, 2, 3, 3
```

Notice how we're calling `DuplicateEachItem` on an instance of `List<int>` rather than passing the list to the method. It's now a generic instance method rather than a generic local function.

In conclusion, generic methods are a cornerstone of the C# language, that make it possible to eliminate duplicated code without sacrificing static type safety.
%This concept is particularly beneficial when designing versatile solutions that eschew the need for repetitive code.

%Generic methods, when used judiciously, can make your code more flexible, reusable, and type-safe. They bridge the gap between strong typing and versatility. As we progress, you'll see how type parameter constraints enhance the utility and safety of generic methods, paving the way for more advanced generic programming concepts. Stay tuned for the next chapter, where we'll dive deep into the intricacies of type parameter constraints. See you there!

