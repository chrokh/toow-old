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

# Delegates

%In the realm of software development, an ever-present challenge is how to make our code more modular, maintainable, and versatile. One solution is to delegate specific responsibilities or tasks to certain parts of our code, allowing them to work independently yet collaboratively. This is where C# introduces the concept of 'delegates'.

% TODO: This first part should perhaps be moved to strategy pattern intro?
Just like verbs are as important as nouns, methods are as important as objects.
It could be argued that the whole reason that [Strategy pattern](strategy-pattern) exists is to allow developers to store and pass around methods as if they were [values](values).

Delegates, in C#, can be viewed as a more compact implementation of Strategy pattern with a built-in syntax.
Inversely, strategy pattern can be seen as a way to implement delegates in object oriented languages.

```{admonition} Key point
Delegates in C# let developers treat methods as objects, enabling methods to be passed, stored, and dynamically invoked. All while retaining [static type-safety](type-checking).
```

Just like objects have types, functions and methods have types too.
While the value `2` might have the type `int`, a function called `Increment` (which, say, increments a number by one) might have the type `int` to `int`.

```{code-cell}
// A simple local function to increment a number by 1.
int Increment (int x) => x + 1;
```

In mathematics we say that the method `Add` maps from `int` to `int`.
In programming we call this a 'type signature' and in C# we call it a [method signature](local-functions).
When reasoning about programming we often use arrow-syntax which would denote this method signature as `int -> int`.
All we've done is remove put the input before the output and remove all identifiers.

Delegates allow us to create types whose values are methods.
Delegate instances are references to methods which gives us a way to treat methods as first-class entities that we can pass around, much like we pass around objects.

```{important}
A delegate is a *type* whose values are methods.
```

%When we learned about the [Strategy pattern](strategy-pattern), we saw how we could define multiple algorithms and make them interchangeable at run-time.
%Delegates essentially solves the same problem but through a C# specific syntax that's built into the language.
%Think of delegates as a special syntax that offers the capabilities of the Strategy pattern, combined with the power of generics, without requiring an interface or class.
%The Strategy pattern is, in essence, about encapsulating a family of algorithms that can be swapped at runtime. C# takes this concept a notch higher with delegates – a feature built into the language. 

While Strategy requires us to define interfaces or abstract classes and their implementations, delegates define a type that encapsulate a single method signature which can be instantiated and associated with any method that matches this signature.

Since a delegate is a *type* and not a value, a delegate has to be defined directly in a [namespace](namespace), or as a member of a [class](classes).
We cannot define a delegate inside a method, just like how we cannot define a new class inside another method.

To define a delegate we use the keyword `delegate` then state the return type of the delegate type, followed by the name of the delegate type, which is finally followed by a parameter list.

```{code-cell}
delegate string IntToString(int value);
```

The delegate that we've defined maps from `int` to `string`.
Any method possible method whose type signature claims that it takes an `int` and returns a `string` can be considered a value of the type defined by this delegate.
Since this is a type, we can declare variables of this type like we would any other type.

```{code-cell} csharp
IntToString converter1;
IntToString converter2;
```

When assigning a value to a variable of our delegate type, the value must be a method that satisfies the signature of the delegate type.
Let's, for example, say that we have two [local functions](local-functions) called `PositiveOrNegative` and `ToHex` that both take `int`s and return `string`s.

```{code-cell}
string PositiveOrNegative(int number)
    => number > 0 ? "Positive" : "Negative";

string ToHex(int number)
    => number.ToString("X");
```

```{important}
Functions or methods have types, just like values have types.
Just like the value `2` might have the type `int` the function `Increment` (which, say, increments a number by one) might have the type `int` to `int`.
In mathematics we say that the method `Add` maps from `int` to `int`.
In programming we call this a 'type signature' and, when reasoning about it sometimes denote it as `int -> int`.
The local functions in the example above both map from `int` to `string` which could be denoted as `int -> string`.
```

So far, these methods are completely unrelated to our previously defined delegate `IntToString`.
These are regular old local functions that cannot be passed around like variables.
Let's create instances of our delegate (`IntToString`) by declaring variables to be of that type and then associate them with our local functions.

```{code-cell}
IntToString convert1 = PositiveOrNegative;
IntToString convert2 = ToHex;
```

```{warning}
When assigning a method to a variable of a delegate type, we don't invoke the method.
So, avoid using parentheses after the method name.
```

```{important}
Delegates maintain [static type safety](type-checking). If we attempt to assign a method to a variable declared as a delegate, and the method doesn't match the delegate's signature, we will get a compile-time type error.
```

Our delegate instances can now be invoked just like regular methods can be invoked.

```{code-cell}
Console.WriteLine(convert1(15));
Console.WriteLine(convert2(15));
```

Unlike regular methods however, we can now also pass them around like any old variable.

%For example, we can declare a method that accepts values of our delegate type and then pass these delegate instances into that method.
%
%``{code-cell}
%void convertAndPrint (IntToString convert, int number)
%    => Console.WriteLine(convert(number));
%``
%
%``{code-cell}
%convertAndPrint(convert1, 10);
%convertAndPrint(convert2, 10);
%convertAndPrint(PositiveOrNegative, 10);
%convertAndPrint(ToHex, 10);
%``

Just like with [Strategy pattern](strategy-pattern) we can pass algorithms around and choose which one to execute at run-time.

```{seealso}
The real power of delegates shines when combined with [events](events) and [lambda expressions](lambdas), both of which we'll talk about later.
%The latter provides a concise way to represent anonymous methods or functions without explicitly defining a named method.
```

%Tip: Anonymous methods or lambda expressions are especially useful when a method is used in one place and doesn't require a separate, formal declaration.
%
%Consider a scenario where we want to filter a list of numbers based on some criteria:
%
%``{code-cell}
%List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
%
%// Use delegate with lambda expression
%List<int> evenNumbers = numbers.FindAll(x => x % 2 == 0);
%``
%
%Here, the lambda expression x => x % 2 == 0 is an anonymous method indicating our filtering criteria for even numbers.
%
%Warning: Delegates, although powerful, can also introduce complexity and can be overused. It's essential to utilize them judiciously to ensure code clarity.

```{note}
Delegates make methods first-class citizens in C#. However, this concept isn't new.
Functional programming languages like Haskell or Lisp have been doing this for decades.
Delegates in C# are **not** as powerful as functions in functional programming since we lack composition, currying, and partial application.
However, delegates do bring some of the benefits of first-class functions to object oriented programming in C#.
%However, in the object-oriented world of C#, delegates allows us to borrow part of the strengths of the functional paradigm.
```

In conclusion, delegates in C# serve as a bridge between the world of object-oriented and functional programming. They empower developers to craft more flexible, modular, and maintainable code, encapsulating method references just as they would variables or objects.
In essence, delegates solve the same problem as [Strategy pattern](strategy-pattern).

As we journey further, we'll encounter more sophisticated features (like [events](events) and [LINQ](linq)) built atop this foundation, revealing the profound impact of delegates on modern C# programming.
In the next chapters however we'll look at some built-in delegates and what happens when we assign instance methods to delegate instances.

