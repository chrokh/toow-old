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

# Built-in delegates

When exploring delegates you might have noticed that it's actually possible to assign any method to a variable if we use [type inference](type-inference).

```{code-cell}
// Local function that inverts a bool.
bool Negate (bool x) => !x;

// The function can be assigned to a variable *without* explicitly declaring a delegate.
var neg = Negate;
```

How come this works?
What is the type of variable `neg`?
This works, because there's a whole bunch of built-in delegate types in C# that the compiler can treat our methods as.
The type of `neg` in the example above is `Func<bool, bool>`.

While we have the freedom to define custom delegates tailored to specific needs, the language also provides built-in generic delegate types for common scenarios. These types are intended to simplify method declarations, reduce code redundancy, and improve readability. The most prevalent built-in delegates are the `Func` types, the `Action` types, and `Predicate<T>`.

```{admonition} Key points
- C# offers built-in delegate types like `Action`, `Func`, and `Predicate<T>` for representing common delegates.
- The `Action` and `Func` families define generic delegates that return `void` or a value, respectively.
- The generic delegate `Predicate<T>` can be used for methods that take a single generic input and return a `bool`.
```

## Action

The `Action` family of delegates contains delegates whose return type is `void` and can have up to 16 input parameters.
When we have methods that perform an operation but do not return a value, `Action` is the go-to delegate family.

```{code-cell}
// Some example functions.
void Greet(string name) => Console.WriteLine("Hello, " + name);
void PrintCoordinates(int x, int y) => Console.WriteLine($"({x}, {y})");

// Using `Action` delegates.
Action<string> greet = Greet;
Action<int, int> printCoordinates = PrintCoordinates;
Action<string> printString = Console.WriteLine;
Action<int> printInt = Console.WriteLine;

// Invoking the delegates.
greet("Chris");
printCoordinates(2, 3);
printString("Hello");
printInt(10);
```

## Func

The `Func` family of delegates define generic delegates that can take up to 16 input parameters and always returns a value.
Whenever we need a delegate for methods that compute and return a value, we can use a `Func` delegate.

```{code-cell}
// Some example functions.
int Add(int x, int y) => x + y;
int Invert(int x) => -x;

// Using `Func` delegates.
Func<int, int, int> add = Add;
Func<int, int> invert = Invert;
Func<string, int> convertToInt = Int32.Parse;

// Invoking the delegates.
Console.WriteLine(add(3, 2));
Console.WriteLine(invert(1));
```

## Predicate

The `Predicate<T>` delegate represents a method that takes a single input parameter and returns a `bool` value, making it ideal for conditions or filters.

```{code-cell}
// Some example functions.
bool IsEven(int x) => x % 2 == 0;
bool IsUpper(string str) => str.ToUpper() == str;

// Using `Predicate` delegates.
Predicate<int> isEven = IsEven;
Predicate<string> stringIsUpper = IsUpper;
Predicate<string> isNullOrEmpty = String.IsNullOrEmpty;

// Invoking the delegates.
Console.WriteLine(isEven(4));
Console.WriteLine(stringIsUpper("HELLO"));
Console.WriteLine(isNullOrEmpty("HELLO"));
```

```{tip}
For scenarios like filtering collections, `Predicate<T>` provides a type-safe and expressive way to pass conditions around.
The `Predicate<T>` delegate is heavily used in .NET and you will e.g. find it in many operations that deal with [collections](collections) such as the method `FindAll` available on `List<T>`.
```

```{warning}
While `Predicate<T>` and `Func<T, bool>` both are delegates that takes a parameter of type `T` and returns a `bool`, delegate instances of these types are not implicitly convertible to each other. This distinction exists because they represent different semantic meanings in the framework. `Predicate<T>` is specifically designed to represent a method that determines if an element of type `T` meets a condition. On the other hand, `Func<T, bool>` is a more general-purpose delegate for any method that takes a `T` and returns a bool. Always ensure you're using the correct delegate type for the task at hand.
```

## Why

Why should you use the built-in delegate types instead of your own custom types?

- **Analyzability**: By using well-recognized delegate types, you improve code clarity. Developers familiar with C# will immediately understand the purpose of a `Func`, `Action`, or `Predicate` delegate in your code.
- **Reduced duplication**: Instead of creating custom delegate types for each unique method signature, leveraging built-in delegates can often satisfy the same requirements.
- **Interoperability**: Many built-in C# libraries and frameworks make use of these delegates, making it essential to be familiar with them.

Why would you choose to write your own delegate instead of using a built-in type?

- **Expressiveness**: Custom delegate types can provide more meaningful names and clearer intentions. For instance, instead of a `Func<Product, double>`, a delegate called `ProductPriceCalculation` lets a developer know that the delegate's purpose is to compute the price of a product. Similarly, instead of `Func<List<Data>, List<Data>>` a delegate called `DataFilter` clearly communicates that the purpose of the delegate is to filter data. By using your own types you can also specify more meaningful parameter names which greatly aids in using your code correctly. All this makes the code more self-documenting.
- **Encapsulation**: By creating your own delegate type, you encapsulate and centralize the definition. Instead of scattering a definition like `Func<List<Data>, List<Data>>` all over your codebase you've got it defined in one place which will likely improve [maintainability](maintainability).
- **Fine-grained control**: Custom delegates give you more control by allowing you to: define specific [constraints](type-parameter-constraints), specify [optional parameters](optional-parameters), and use the [`ref`](the-ref-keyword), [`out`](the-out-keyword), and the [`params`](the-params-keyword) keywords.

## Conclusion

Built-in delegates in C# serve as versatile tools, providing type-safe and standardized ways to encapsulate method references. Whether you're designing a custom API or just writing everyday code, understanding and utilizing `Func`, `Action`, and `Predicate` will significantly enhance the efficiency and clarity of your C# programming endeavors.

In upcoming chapters, we will delve deeper into how these built-in delegates come to life in advanced features like [LINQ](linq). Stay tuned!

%``{seealso}
%See the documentation for more information on the various versions of [Func](https://learn.microsoft.com/en-us/dotnet/api/system.func-2?view=net-7.0) and [Action](https://learn.microsoft.com/en-us/dotnet/api/system.action?view=net-6.0) respectively.
%``

