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


# Type checking

In the world of programming, correctness is crucial. One important way to ensure this is through a feature known as 'type checking'. You've already met the various data types and learned how each variable we declare is associated with a particular type. But what happens if we try to mix things up a bit and use one type where another is expected? That's where type checking comes into play.

Type checking is like the security checkpoint at an airport. Just as the security personnel make sure that only authorized and safe items pass through, the C# compiler ensures that the values assigned to variables and the expressions in the code are all of the correct type. If something doesn't match, the compiler raises an error and stops the execution of the program.
This is known as a 'type error'.

Think of it like trying to fit a round peg into a square hole—it just won't work. The peg is like a value in your program, and the hole is the variable or expression expecting a particular type.

Here's an example:

```{code-cell}
:tags: [raises-exception]
int numberOfApples = "five";
```

In the above code, we're trying to assign a `string` value "five" to an integer variable `numberOfApples`. The C# compiler performs a type check and flags an error because a `string` cannot be converted into an integer implicitly.

If we forget about variables names and values for a moment and only think about types, then we can very easily see why example must produce an error if we think of it like this:

```
int = string
```

Type checking plays a significant role in writing robust and error-free code. It allows us to catch and fix errors during the compilation stage, before the program is run.

However, there may be times when you need to convert one type of value into another. C# allows for this as well, using something called 'type conversion' or 'casting', but more on that in a later chapter. For now, remember that the C# compiler keeps a close eye on the types of your variables and expressions, and isn't shy about letting you know when something doesn't add up.

Type checking at compile-time is one of the features that makes C# a statically typed language.
The type of every variable and expression is known at compile-time, before the code is run, which is a key aspect of how C# ensures the consistency and reliability of your code.
Languages that do type checking at run time are known as 'dynamically typed languages'.

```{note}
Type-checking exists to enforce a property known as [type safety](type-safety).
Type safety refers to not allowing the execution of operations that violate the [type system](type-system).
Allowing such operations could lead to undefined behavior since their implementation is unspecified.
C# is believed to be a type-safe language.
%The definitions of "type safety" varies but under one definition, a type-safe language guarantees that no valid programs lead to undefined behavior.
```


