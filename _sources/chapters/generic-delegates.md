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

# Generic delegates

Just like generics have opened up the realm of type-agnostic classes and methods, generic delegates allow us to declare and use delegates that can use various types without needing to know these types in advance.

%Generics further enhance the versatility of delegates. With generics, a delegate can operate on methods of various types without knowing the types in advance:

```{admonition} Key point
Generic delegates are delegates that take one or more type parameters, enabling the creation of delegate types that can operate on different data types while retaining type safety.
```

Imagine you're writing an application where you need to pass around transformers that transform various types of data. Such transformers might convert an `int` to a `string`, invert a `bool`, or capitalize a `string`. While these operations are different, their underlying pattern of transforming one value into another remains the same.

Here's where generic delegates come into play. Let's start with a simple delegate definition without generics:

```{code-cell}
delegate string Transformer(int value);
```

This delegate can only transform integers to strings. Now, what if you wanted to have a delegate that can transform from any type `TIn` to another type `TOut`? This is where generics come to the rescue.

```{code-cell}
delegate TOut Transformer<TIn, TOut>(TIn value);
```

With this generic delegate, you have the flexibility to create delegate instances that can transform from and to any type.

```{tip}
Using generic delegates can reduce code duplication. Instead of defining separate delegate types for every method signature, one can define a more generic delegate type and utilize it for various methods.
```

What are some methods that satisfy this type?

```{code-cell}
// Local function that squares a number.
int Square(int x) => x * x;

// Local function that divides a number by 2.
double Half(int x) => x / 2.0;

// Local function that repeats a string.
string Repeat(string s) => s + s;
```

The `Square` method maps from `int` to `double`, the `Half` method maps from `double` to `double`, and the `Repeat` method from `string` to `string`.
Since they are all methods that take one argument (also known as 'unary methods') and returns something they all satisfy the type of our generic transformer delegate but with different type arguments.

```{code-cell}
Transformer<int, int> intTransformer = Square;
Transformer<int, double> doubleTransformer = Half;
Transformer<string, string> stringTransformer = Repeat;
```

We could of course have used [type inference](type-inference) with the `var` keyword to simplify the above declarations.

```{code-cell}
var intTransformer = Square;
var doubleTransformer = Half;
var stringTransformer = Repeat;
```

This generic transformer delegate allows us to pass around unary methods that map from any type to any type, which provides us with flexibility without losing [static type safety](type-checking) and without having to write lots of duplicated code.

```{tip}
Within a generic class, delegates can utilize the type parameters just like how other members would.
```

```{important}
With the power of generic delegates, it's crucial to ensure that the methods assigned to these delegates align with their intended use and abide by the constraints, if any, defined by the generic delegate.
```

To demonstrate the real strength of generic delegates, consider operations like filtering or sorting [lists](lists). While the actual comparison or filter logic can vary, the pattern of operation remains constant. By leveraging generic delegates, one can create powerful utilities that work across different types:

```{code-cell}
List<T> Filter<T>(List<T> items, Transformer<T, bool> condition)
{
    List<T> filtered = new List<T>();
    foreach(T item in items)
        if (condition(item))
            filtered.Add(item);
    return filtered;
}
```

```{seealso}
In the example above we should use the [built-in delegate](built-in-delegates) `Predicate<T>` instead of our own delegate since the built-in delegates are widely recognized and make the code more readable to other developers.
We should also use [LINQ](linq) to simplify the algorithm and the `yield return` statement for [lazy evaluation](lazy-evaluation).
All these things are covered in coming chapters.
```

This generic `Filter` method can work with a list of any type and any condition which can be expressed as a mapping from the type of elements in the list to `bool`.

```{note}
A function that maps from some type to a `bool` in order to determine if the element matches or not is known as a 'predicate'.
```

```{code-cell}
// Simple local function returning true if input number is even.
bool IsEven (int x) => x % 2 == 0;

// A simple list to be used as input.
List<int> unfiltered = new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Filtering the list using our `Filter` function and our `IsEven` condition.
List<int> filtered = Filter<int>(unfiltered, IsEven);

// Print the filtered and unfiltered list.
Console.WriteLine(String.Join(", ", unfiltered));
Console.WriteLine(String.Join(", ", filtered));
```

%``{seealso}
%Look out for upcoming chapters on generic constraints and advanced uses of generics, which will further enhance the power and flexibility offered by generic delegates.
%``

In conclusion, generic delegates are a powerful tool in the C# arsenal. They enable developers to write flexible, type-safe, and reusable code. By treating methods as first-class citizens and allowing them to operate over a range of types, generic delegates blend the best of both object-oriented and functional programming paradigms in C#.

