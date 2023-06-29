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

# Value types

Now that you know about [reference types](reference-types), let's talk about value types.
The other of the two kinds of types in C#.

When you work with a variable of a value type, you're working with the actual data. This characteristic is known as 'value semantics'. When you assign a value type variable to another, the value is copied. Therefore, any changes you make using the new variable don't affect the value in the original variable.

In C#, value types are the types that hold the data within their own memory allocation. They include all numeric data types (such as `int`, `double`, `float`, `decimal`, etc), `char`, `bool`.

%These types have a key characteristic - when a value type is assigned to a new variable, a copy of the value is made. Any changes to the new variable do not affect the original variable.

Consider the following example:

```{code-cell}
int original = 10;
int copy = original;

copy = 20;

Console.WriteLine(original); // Outputs: 10
Console.WriteLine(copy); // Outputs: 20
```

In the above code, `copy` is a copy of `original`. When we change the copy, the original remains unaffected. This illustrates how value semantics is different from reference semantics.

%Value types are stored in the stack, a region of memory with Last In First Out (LIFO) memory management. This means when a value type variable is no longer in use, its memory can be immediately reclaimed, which makes the memory management of value types more efficient than reference types.

