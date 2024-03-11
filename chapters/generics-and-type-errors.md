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

# Generics and type errors

One of the significant advantages of using generics is that they give us compile-time errors instead of run-time errors.
Generics allow developers to catch [type errors](type-checking) during the [compilation](compilation) process rather than at [run-time](execution).
Writing a class like `Pair` without generics would mean that type mismatches or invalid type operations could go unnoticed until the code is executed, leading to potential runtime exceptions.

Remember the generic class `Pair<T1, T2>` from the chapter on [generic types](generic-types)?
Here's a simplified version of it:

```{code-cell}
class Pair<T1, T2>
{
    public T1 Item1 { get; set; }
    public T2 Item2 { get; set; }
}
```

Is it possible to achieve the same level of reusability before we had generics or do we have to write different versions of the same code for each type?
If we want to keep [static type safety](type-safety) we have to write duplicated code.
If we're willing to sacrifice static type safety then we can either write code that works on the [top-type `object`](everything-is-an-object) and then [downcast](downcasting) back to whatever type we had before or use [the `dynamic` keyword](the-dynamic-keyword) and then [cast](type-conversions) back to whatever type we had before.
Since we've given up [static type safety](type-safety) however we run the risk of writing code that crashes with run-time errors.

```{admonition} Key point
With generics, we can write reusable code without giving up static type safety.
This means that type errors are identified at compile-time rather than at run-time. Which prevents type-related errors from reaching end users and streamlines debugging.
```

Let's look at what both of these non-generic solutions would look like.
First out is the solution that uses the [top-type `object`](everything-is-an-object) that all types implicitly either inherit from or can be boxed into.

```{code-cell}
class ObjectPair
{
    public object Item1 { get; set; }
    public object Item2 { get; set; }
}
```

We can now instantiate the class and store elements of any type.

```{code-cell}
ObjectPair objectPair = new ObjectPair { Item1 = 10, Item2 = "Apples" };
Console.WriteLine(objectPair.Item1);
```

However, since the [compile-time type](run-time-type-vs-compile-time-type) of both items in every instance of `ObjectPair` is `object` we have to use [downcasting](downcasting) if we want to get back to the run-time type of the item.
This is fine as long as we manage to downcast to the correct type.

```{code-cell}
int item1 = (int)objectPair.Item1; // Compiles and runs.
```

However, if we downcast to the wrong type the code still compiles but we will now get a run-time exception. Boom!

```csharp
int item2 = (int)objectPair.Item2; // Compiles but throws exception.
```

```output
System.InvalidCastException: Unable to cast object of type 'System.String' to type 'System.Int32'.
```

What if we instead make use of the [`dynamic` keyword](the-dynamic-keyword)?
It's the same story. By using the `dynamic` keyword we tell the compiler that the type of the underlying object could be absolutely anything.
Using `dynamic` we leave the realm of static typing.
Consequently we can compile code that tries to convert our values to types that they actually are not. Only to blown up with an exception at run-time.

```{code-cell}
class DynamicPair
{
    public dynamic Item1 { get; set; }
    public dynamic Item2 { get; set; }
}
```

```{code-cell}
DynamicPair dynamicPair = new DynamicPair { Item1 = 10, Item2 = "Apples" };
```

```csharp
int item1 = dynamicPair.Item1; // Compiles and runs.
int item2 = dynamicPair.Item2; // Compiles but throws exception.
```

```output
Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: Cannot implicitly convert type 'string' to 'int'
```

With generics, such errors are caught during compilation, ensuring that if you have a method expecting a certain type, it cannot inadvertently receive an unexpected type. This compile-time type checking enhances code safety, predictability, and robustness, minimizing surprises during execution and simplifying debugging.

What happens if we try to write the same incorrect code when using our generic `Pair<T1, T2>` type? Are we allowed to run the code?
No, with generics, type-related issues are caught at compile-time, ensuring that we maintain type integrity from the outset
If it doesn't compile, we can't run it.

```{code-cell}
:tags: [raises-exception]
Pair<int, string> genericPair = new Pair<int, string>()
{
    Item1 = 10,
    Item2 = "Apples"
};

int item1 = genericPair.Item1;
int item2 = genericPair.Item2; // Does not compile due to type error.
```

By getting a compile-time error instead of a run-time error we ensure that this error never lands in the hands of the end user.

