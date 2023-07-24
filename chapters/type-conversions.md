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

# Type conversions

%In programming, there are times when we need to work with data in a type different from its original form. This could be for performing certain operations, for compatibility with function parameters, or to meet a wide range of possible requirements. In C#, this process of changing an entity from one type to another is called type conversion.

%C# is a language that strictly checks types at compile time.
Once a variable is declared to be of a specific type, it is permanently bound to that type. For instance, if a variable is initially declared as an `int`, a `double` value can't be subsequently assigned to it because there's no implicit conversion from `double` to `int`.

```{code-cell}
:tags: [raises-exception]
double d = 3.14;
int i = d;
```

However, situations may arise where it's necessary to pass a value of one type where another is expected. For example, you might have a method that takes a `double` argument, but you only have an `int` value available. Or, you might need to interact with an interface type using an instance of a specific class.
The solution to this kind of problem is called 'type conversion'.

Type conversions in C# can be categorised into four kinds, that we'll explore briefly.

1. Implicit type conversions
2. Explicit type conversions (also known as 'type casts')
3. User-defined conversions
4. Conversions with helper classes


## Implicit conversions

Implicit conversions don't require any special syntax and can be performed when there's no risk of data loss. C# allows implicit conversion from a 'smaller' type to a 'larger' type. Think: from a subset to a superset.
For instance, you can convert an `int` to a `double` implicitly.
Intuitively this makes sense, because the set of whole numbers can be thought of as a subset of the set of decimal numbers.

```{code-cell}
int number = 123;
double largeNumber = number;
```

However, you can *not* implicitly convert from a `double` to an `int`.

```{code-cell}
double largeNumber = 3.14;
double number = largeNumber;
```


## Explicit conversions (type casts)

Sometimes, converting from a larger type to a smaller type can lead to data loss. In such cases, you must explicitly tell the compiler that you're aware of this fact and still want to go ahead. This is done through explicit type conversions, also known as 'type casting'. For example, converting a `double` to an `int`.

```{code-cell}
double largeNumber = 123.45;
int number = (int) largeNumber; // The decimal part will be lost
```

Explicit type conversions, while useful, can lead to run-time errors if the actual data cannot be accommodated in the target type.
This can result in [exceptions](exceptions). For instance, trying to convert a `string` representing a non-numeric value into an `int` would fail and cause a `System.FormatException`. It is therefore crucial to employ explicit type conversions judiciously. Rest assured, we will dive into examples and discuss how to handle such scenarios in the upcoming chapter on [downcasting](downcasting).

Explicit type conversions, can be done in two ways: using the traditional cast syntax `(Type)x`, or using the `as` keyword with the syntax `x as Type`. Both of these accomplish the same goal, that is, explicitly converting the type of an object, but they differ in their behavior when the conversion isn't possible.

Here's a simple example:

```{code-cell}
object obj = "Hello, world!";
string str1 = (string)obj;   // Traditional cast syntax
string str2 = obj as string; // 'as' keyword syntax
```

```{note}
In the chapter [Everything is an object](everything-is-an-object) we discuss why an object of type `string` can be converted to object of type `object`. For now just know that it can.
```

In this code, `obj` is an instance of object that is holding a `string`. When we use the traditional cast syntax `(string)obj`, we're telling the compiler to treat `obj` as a `string`. The `as` keyword does the same, but in a safer manner.

If a cast is not possible, the traditional cast syntax will throw an exception:

```{code-cell}
:tags: [hide-input]
interface IAnimal {}
class Cat : IAnimal {}
class Dog : IAnimal {}
```

```csharp
IAnimal animal = new Cat();
Dog dog = (Dog)animal;
```

```output
System.InvalidCastException: Unable to cast object of type 'Cat' to type 'Dog'.
```

However, if a cast using the `as` keyword fails it will simply return `null`.

```{code-cell}
:tags: [raises-exception]
IAnimal animal = new Cat();
Dog dog = animal as Dog;

Console.WriteLine(dog == null);
```

The cast in the two examples above is known as a [downcast](downcasting) which we'll discuss further in its own chapter.
The reason it compiles, is that *some* animals are dogs. The reason it fails with an exception at run-time is that the run-time type of the object happened to be `Cat` and not `Dog`, and cats are definitely not dogs.


## User-defined conversions

C# also allows you to define custom conversions for types, even if they are not in a [subtype-supertype relationship](subtype-polymorphism). This is done using the `explicit` and `implicit` keywords in the context of [operator overloading](operator-overloading). It's a powerful feature but can also lead to complex code if not used carefully. We'll discuss [user-defined conversions](user-defined-conversions) in detail in a later chapter.


## Conversions with helper classes

C# provides helper classes that contain methods for converting types, especially for converting between simple types and their `string` representations. For example, the `Convert` class can be used to convert a `string` to an `int`.

```{code-cell}
string numberStr = "123";
int number = Convert.ToInt32(numberStr);
```

```{admonition} Key point
Type conversion in C# can be performed implicitly, explicitly (where its also known as type casting), through user-defined methods, or with the help of conversion methods in helper classes.
While these conversions provide flexibility when dealing with various data types, it's crucial to consider the possibility of data loss during some conversions.
```

In the next chapters, we'll explore a specific form of type conversion used in object-oriented programming called [upcasting](upcasting) and [downcasting](downcasting), which deal with converting between subtypes and supertypes.

