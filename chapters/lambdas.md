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

# Lambdas

Sometimes we need quick and compact ways to represent small chunks of behavior without having to write full-fledged methods or local functions. That's where lambdas come into play. Lambdas in C# offer us a convenient and inline way to define anonymous methods, simplifying our code and making it easier to reason about.

```{admonition} Key points
- A lambda is a concise way to represent an anonymous method that can be used to create delegates or expression tree types.
- Lambdas in C# allow for type inference, enabling you to omit explicit type declarations for parameters and return type.
```

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1149272044853264384/chrokh_mountain_and_paper_plane_by_Tove_Jansson_5b964551-24a0-4425-812a-6c66ae8db281.png
Lambdas are like a featherlight version of local functions.
```

## Syntax

There are two types of lambdas in C#, and the syntax of both is straightforward.

1. 'Expression lambdas' have expressions as their body.

    ```
    (parameters) => expression
    ```

2. 'Statement lambdas' have a statement block as their body.

    ```
    (parameters) => { statements; }
    ```

## Simple examples

Here are some simple examples of expression lambdas.

```{code-cell}
// Lambda for adding two numbers.
var add = int (int a, int b) => a + b;
Console.WriteLine(add(2, 3));
```

```{code-cell}
// Lambda for checking if a number is positive.
var isPositive = bool (int x) => x > 0;
Console.WriteLine(isPositive(5));
```

In the example below we can see how we need to use a pair of empty parentheses(`()`) if our lambda doesn't need any parameters at all.

```{code-cell}
var line = void () => { Console.WriteLine("----"); };

line();
```

Let's also look at some simple examples of statement lambdas.

```{code-cell}
var greet = void (string name) =>
{
    string msg = $"Hello, {name}!";
    Console.WriteLine(msg);
};

greet("Chris");
```

```{code-cell}
var lines = void (int n) =>
{
    for(int i=0; i<n; i++)
        Console.WriteLine("----");
};

lines(3);
```

## Lambdas and delegates

But wait a minute. What's the type of all these variables that we assigned lambdas to?
Remember [delegates](delegates)?

```{important}
Any lambda expression can be implicitly converted to a delegate.
```

Let's look at an example by first defining a delegate, and then assigning a lambda expression to a variable of that delegate type.

```{code-cell}
// Delegate
public delegate string StringTransformer(string s);
```

```{code-cell}
// Lambda
StringTransformer reverse = string (string s) => new string(s.Reverse().ToArray());
Console.WriteLine(reverse("Hello"));
```

Naturally, we can also use lambdas with the built-in delegates.
Let's use some of the same lambdas that we've already seen above.

```{code-cell}
Func<int, int, int> add = (a, b) => a + b;
Predicate<int> isPositive = x => x >= 0;
Action line = () => { Console.WriteLine("----"); };
Action<string> greet = name => { Console.WriteLine($"Hello, {name}!"); };
```

This makes it incredibly easy to pass around behavior in your programs, especially when working with higher-order functions that expect delegate instances.

```{tip}
Lambdas can lead to more expressive and maintainable code when used judiciously.
```

## Lambdas and type inference

One of the convenient features of lambdas in C# is their ability to utilize type inference. This means that you often don't have to explicitly specify the types of parameters when you define a lambda expression. The C# compiler is capable of inferring the types based on the context in which the lambda is used.

The following lambda declarations are all functionally identical:

```{code-cell}
Func<int, bool> isNegativeExplicit = bool (int x) => x < 0;

Func<int, bool> isNegativeInferred1 = (int x)=> x < 0;
Func<int, bool> isNegativeInferred2 = bool (x)=> x < 0;
Func<int, bool> isNegativeInferred3 = x => x < 0;
```

In the last three cases the compiler infers what the parameter and/or return type must be based on the delegate type `Func<int, int>`.

```{tip}
Notice how we can omit the parentheses around the parameters if the lambda only has a single parameter whose type is inferred.
```

You can of course also use the [`var` keyword](type-inference) if you give the compiler enough clues about the type of the lambda.

```{code-cell}
var isNegativeExplicit = int (int x) => x < 0;

var isNegativeInferred1 = (int x)=> x < 0;  // Compiles.
var isNegativeInferred2 = int (x)=> x < 0;  // Compiles.
var isNegativeInferred3 = x => x < 0;       // Does not compile!
```

```{tip}
While type inference can make your lambda expressions more concise, it can sometimes sacrifice readability, especially when the inferred type isn't immediately clear. Therefore, use type inference judiciously, prioritizing code clarity.
```


## Lambdas vs. local Functions

We've already discussed [local functions](local-functions).
Note that local functions are not lambdas even though they both make use of the, so-called, fat-arrow (`=>`) syntax.
Have a look at the syntactical difference in the example below:

```{code-cell}
// Local function
int LocalInc (int x) => x + 1;

// Lambda
var lambdaInc = (int x) => x + 1;
```

### Key similarities

- **Local scope**: Both are accessible only within the scope in which they are defined, making them unavailable for direct invocation from outside that scope.
- **Capturing outer variables**: Both can capture variables from their enclosing scope. This is called a 'closure'.

### Key differences

- **Anonymous**: Lambdas are anonymous, meaning they don't have a name.
- **Type inference**: Lambdas support type inference of parameters and return type.
- **Concise syntax**: Lambdas often end up being more compact.
- **Naming conventions**: Local functions are conventionally named using PascalCase (meaning with an initial letter in uppercase) while lambdas with camelCase (meaning with an initial letter in lowercase).

```{hint}
Although lambdas and local functions can look similar, they serve different purposes and have unique constraints and capabilities. Choose based on the needs of your code.
```


## Lambdas vs. expression-bodied members

We've already encountered the concept of [expression-bodied members](fat-arrows), which also use the fat arrow (`=>`) syntax. At a glance, these might look like lambdas, but they are not.

- **Named**: Expression-bodied members, whether they're methods or properties, have names. This means they can be called using their names elsewhere in the codebase. Lambdas, on the other hand, are anonymous; they don't have names and are usually used inline where they are defined.
- **Scope**: Expression-bodied members belong to a [class](classes) or [struct](structure-types). They are 'members' of the type. Lambdas on the other hand are scoped to the method or block in which they are declared.


## Conclusion

Lambdas provide a powerful and expressive syntax that allows for the creation of anonymous methods with ease.
In this chapter we've seen that lambdas can be used to succinctly define event listeners.
However, in a coming chapter we will learn about [LINQ](linq) where lambdas really shine by offering a compact way of performing operations on [collections](collections) and [enumerables](enumerables).

```{tip}
Next time you find yourself writing short methods or need a quick function for a one-off operation, consider whether a lambda could do the job more elegantly. Less code usually means improved [maintainability](maintainability).
```

