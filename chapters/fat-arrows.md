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

# Fat arrows

As you continue to write more complex code, you may find that conciseness can help keep your code readable and maintainable. One way to achieve this in C# is with "fat arrow" syntax which is more formally known as "expression-bodied members".
This feature provides a succinct syntax to express the implementation of local functions when their implementation consists of a single expression. It's commonly referred to as "fat arrow" syntax due to the use of the `=>` operator.

While we in this chapter will focus on using the fat arrow syntax with local functions, fat arrows can be used with class members such as methods, constructors, and properties. You will see examples of this later chapters.

%This feature allows us to write cleaner, more readable code, particularly when defining local functions.

%This feature provides a succinct syntax to express local funtions or other members methods, properties, or other members of a class. It's commonly referred to as "fat arrow" syntax due to the use of the => operator. In this chapter, we will focus on using the fat arrow syntax with local functions.

Let's consider a simple local function defined using the traditional method body:

```{code-cell}
int Add(int x, int y)
{
    return x + y;
}
```

We can simplify this function using the fat arrow syntax:

```{code-cell}
int Add(int x, int y) => x + y;
```

Here, the `Add` function is defined as an expression-bodied member. The `=>` symbol points to the expression that becomes the function's return value. Notice how we don't need to explicitly use the keyword `return`. This version of `Add` is functionally identical to the previous one but is shorter and cleaner. Fat arrows are essentially syntactic sugar.

Remember, expression-bodied members aren't limited to local functions - they can be used with instance methods, constructors, and properties. We will see usage of fat arrows in these contexts in the future but won't explain it in any more detail than we've done here. So do come back to this chapter if you need a refresher.

This chapter should give you a good understanding of how the fat arrow syntax can help you write more concise and readable code. Embrace the power of expression-bodied members and make your code fast to write and easier to read.

%---------

%If the body of a method consists of a single expression, it can be written in a more compact form using the "expression-bodied members" syntax of C#. This syntax uses the `=>` symbol (often called 'fat arrow') to define the method. Let's take a look at an example:
%
%```{code-cell}
%string MakeGreeting(string name) => $"Hello, {name}!";
%```
%
%```{code-cell}
%Console.WriteLine(MakeGreeting("World"));
%```
%
%Since the body of the method `MakeGreeting` that we wrote earlier only consists of a single expression, we can rewrite it using "fat arrow" syntax.
%Note that, there's no need to use the `return` keyword.
%The result of the expression after the `=>` symbol is automatically returned.
%
%This syntax provides a concise way to define methods, especially those that perform simple, single-line tasks. It's particularly useful when defining a large number of simple methods, as it can significantly reduce the amount of code needed.
%
