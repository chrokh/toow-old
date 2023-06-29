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

# Reference types

Now that you know understand arrays, it's critical to understand that they are reference types.
In C# there's two kinds of types:

- Reference types
- Value types.

%Let's now talk about reference types.

A reference type in C# is a type that holds a reference (or an address) to the instance in memory rather than the actual value itself. When you declare a variable of a reference type, the variable contains the address of an object where the value is stored, not the actual value.

When you work with a variable of a reference type, you're working with a reference to the data rather than the data itself. This is known as 'reference semantics'.
When you assign a reference type variable to another, the reference is copied, not the actual data. So if the data is changed, then it is changed for all references to that data.

This becomes very apparent when you start dealing with complex types, like arrays (which we've talked about) or objects (which we'll talk about later). When we assign an array or an object to another array or object, we are essentially copying the reference to the memory location, not the actual value.

Let's illustrate this with an example:

```{code-cell}
// Declare an array of integers.
int[] original = {1, 2, 3, 4, 5};

// Declare another array and assign it `original`.
int[] copy = original;

// Modify the first element of `copy`.
copy[0] = 99;

// Is the first element of `original` 1 or 99?
Console.WriteLine(original[0]);
```

In the above example, when we modify `copy`, we're also modifying `original` because they're both pointing to the same location in memory. This concept is crucial to understand when we're passing around reference types.

Another important point about reference semantics is that the equality operator (`==`) checks for reference equality and not value equality. This means that `==` checks whether the two references point to the same object in memory, not whether the values of the objects are equivalent. Let's look at an example:

```{code-cell}
int[] arr1 = { 10, 20, 30 };
int[] arr2 = { 10, 20, 30 };
Console.WriteLine(arr1 == arr2);
```

In this example, the two arrays are identical. However, since they are two distinct arrays, meaning two different points in memory, the equality operator returns `false` if we ask whether they are equal. Compare this to the case above where two variables are references to the same value.

```{code-cell}
int[] original = {1, 2, 3, 4, 5};
int[] copy = original;
Console.WriteLine(copy == original);
```

%When you pass a reference type to a method, it is the reference to the object that gets passed, not a new object. Any changes made to the object within the method will affect the original object.
%
%void ModifyArray(int[] arr)
%{
%    arr[0] = 100;
%}
%
%int[] numbers = {1, 2, 3, 4, 5};
%ModifyArray(numbers);
%Console.WriteLine(numbers[0]); // outputs: 100
%
%In the above example, the ModifyArray function modifies the original numbers array because arr holds a reference to the same array.

```{note}
Strings in C# are an exception to the rule. String is a reference type that has value type semantics.
%Strings in C# are also reference types, but they behave a bit differently due to their immutability, meaning once a `string` is created, it cannot be changed. Any operation that appears to modify a `string` actually creates a new `string`. Strings are an exception because they are a reference type with value type semantics.
```

All reference types in C# also include the special default value: `null`. This value represents the absence of any object or value. You can assign `null` to any variable of a reference type. This is an important aspect of reference types and it allows you to explicitly express the absence of a value.

For instance, consider a situation where you have a variable that should hold a string representing a user's middle name. However, for a user without a middle name the variable might be set to `null`.
This is possible since `string` is a reference type.
We say that reference types are implicitly nullable.

```{code-cell}
string middleName = null;
```

%In this code snippet, `middleName` is declared as a `string`, which is a reference type, and it's initially assigned `null`.

It's crucial to check for `null` before trying to access members (like methods or properties) of a reference type variable. If you try to access a member of a variable that is `null`, your program will throw a `NullReferenceException` at run time. This is one of the most common exceptions in C#, and understanding when and why it occurs is a key part of mastering the language.

```{code-cell}
:tags: [raises-exception]
string middleName = null;
int length = middleName.Length;
```

In a later chapter, we'll discuss `null` safety and techniques for handling potential `null` values in your code, including the use of 'null static analysis', a feature introduced in C# 8.0. This feature helps you avoid `null` related bugs by providing compile-time warnings about potential `NullReferenceException` risks.

In the next chapter, we will contrast the behavior of reference types that of value types. Understanding the difference between reference types and value types is critical for programming in C#.
