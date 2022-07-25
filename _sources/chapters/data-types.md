(data-types)=
# Data types

A data type defines a set of possible values and a set of operations we can perform upon it.
As we saw in the chapter on [Variables](variables), variables have types.
As we will see in the chapters on [Static methods](static-methods) and [Instance methods](instance-methods) all method parameters have types and all methods have a return type (including methods that return nothing).
Methods correspond to the operations that we can perform on types.
As we will see in the chapter on [Classes](classes) and [Structure types](structure-types), these are used to define custom data types that can be used in variables or methods.
In this chapter we dicsuss types in general, and give examples using variables.



## Values

As you may recall from the chapter on [Sets](sets), data types correspond to mathematical sets.
What we mean with this is that whenever we have a data type we can just as well use set theory to reason about that data type and its relation to other data types.

Let's start with something simple like the type `bool`.
The alias `bool` is commonly used instead of `Boolean` since it means that we don't explicitly have to have access to the `System` namespace.
More on this in the chapter on [namespaces](namespaces).

Think back to our discussion around the set $\mathit{Boolean}$ in the chapter on [Sets](sets).
The set $\mathit{Boolean}$ has two elements: $\mathit{True}$ and $\mathit{False}$.
The set $\mathit{Boolean}$ corresponds to the data type `bool`.
The possible values of `bool` is `true` and `false`.

```{figure} ../images/bool.svg
:name: fig:bool
A `bool` is either `true` or `false`.
```

Ok, so `bool` is a type with a finite set of values.
Can you think of a set that's infinite but that still corresponds to a data type?
How about the set of all positive and negative integers?
In mathematics we usually denote this set with the symbol $\mathbb{Z}$ and we could define it like this.

$$
\mathbb{Z} = \{ \dotsc \enspace , \enspace -2 \enspace , \enspace -1 \enspace , \enspace 0 \enspace , \enspace 1 \enspace , \enspace 2 \enspace , \enspace \dotsc \}
$$

This set does not however correspond to the data type `int`, or more specifically `Int32`.
Why?
Because computer integers are not actually infinite.
There's a maximum number and a minimum number.
If we need to represent a larger or smaller number then we need a different data type.

```{tip}
Remember that `int` is an alias for `Int32`.
```

To define a set that corresponds to the data type `int` we must first figure out what the minimum and maximum values are.
We do this by checking two [static](static) properties of the `int` [class](classes).

```csharp
Console.WriteLine(int.MinValue);
Console.WriteLine(int.MaxValue);
```

```output
-2147483648
2147483647
```

Now that we have our limits we can define the set that corresponds to the type `int`.

$$
\mathit{int} = \{ -2147483648, \enspace \dotsc \enspace -1 \enspace , \enspace 0 \enspace , \enspace 1 \enspace , \enspace \dotsc \enspace 2147483647 \}
$$


Sets can be used to describe both compile-time types and run-time types.


### Run-time types

Remember how we've previously distinguished between the left-hand side and the right-hand side?
We've learned that variables are on the left and values are on the right.
Well, data types that go on the left-hand side are sometimes referred to as compile-time types, while data types that go on the right are sometimes referred to as run-time types.
For now you can think of it as that the type on the right determines what type a value actually is of while the type on the left determines what what we're treating the type as.
This will make more sense when we get to the chapter on [subtype polymorphism](subtype-polymorphism).

In this chapter we will only see explicit data types on the left and literals or other variables on the right.
So we don't explicitly specify the right-hand types, or the run-time types, in this chapter.
When we get to the chapter on [classes](classes) you will start to see explicit types on the right-hand side.
When we get to the chapter on [subtype polymorphism](subtype-polymorphism) you will start to see how the types on the right and left doesn't necessarily have to be the same.


In the chapter on [Values](values) we saw how `"Hello world"`, `42`, and `3.14` are all examples of literal values.
But what types of values are these?
Let's invoke the `GetType` method to find what the run-time type such objects are.

```csharp
Console.WriteLine( "Hello world".GetType() );
```

```output
System.String
```

The value `"Hello world"` is a `String`.
Let's try with a number.

```csharp
Console.WriteLine( 42.GetType() );
```

```output
System.Int32
```

The value `42` is an integer, more specifically of the type `Int32`.
Remember that `int` is an alias for `Int32`.
Let's try with a decimal number.

```csharp
Console.WriteLine( (3.14).GetType() );
```

```output
System.Double
```

Ok so a decimal number is, if nothing else is specified, a `Double`.

The method `GetType()` is an [instance method](instance-methods) that we can [invoke](static-methods) on [objects](objects) to see what run-time type they have.
A lot of new words here.
Don't worry, we'll explain everything in due time.
For now, just note that it is possible to check what the run-time type is of any object by invoking the `GetType()` method.
More on both instance methods and objects in future chapters.
We invoke the method using something known as "dot-notation" which we also will discuss later.

```csharp
Console.WriteLine( "A".GetType()  );
Console.WriteLine( 420.GetType()  );
Console.WriteLine( 3.14.GetType() );
```

```output
System.String
System.Int32
System.Double
```

When calling `GetType` on `"hello world"`, `42`, and `3.14` we can see that their types are `String`, `Int32`, and `Double`.

```{note}
Note that there are aliases for a bunch of the basic types of C#.
This mean that the type `string` is the same type as `String`.

| Alias    | Type      |
| :--      | :--       |
| `string` | `String`  |
| `int`    | `Int32`   |
| `bool`   | `Boolean` |
| `double` | `Double`  |

More on aliases in the chapters on [data types](data-types) and [namespaces](namespaces).

You can find a table of more aliases [in the documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types).
The aliases are, [according to the documentation](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/), preferred since we don't have to explicitly include the namespace `System` to have access to them.
```


We'll talk more about types and methods when we get to the chapters on [static methods](static-methods) and [instance methods](instance-methods) but here's a quick one for you.
Notice how we've used the method `Console.WriteLine` a lot without ever really talking about it more.
We're still not ready to talk about it fully because we first need to understand [static methods](static-methods), [namespaces](namespaces), and [overloading](overloading).
What we can say at this point however is that `WriteLine` expects that you pass it a `String`.
If you pass it a `String` then it will print that string to the screen.
`WriteLine` can however also handle a bunch of other things since we can print booleans, integers, and so forth.
But we will explain how this works in the chapter on [overloading](overloading).

In the chapter on {doc}`variables` we showed how you can declare and initialize a variable by either explicitly stating the data type of the variable or by using the keyword `var` to let the compiler infer the type.
Compare the following two statements.

```csharp
int explicitly = 1;
var implicitly = 2;
```

In the declaration of the first variable, which we called `explicitly`, we explicitly state that the data type of the variable is `int`.
In the declaration of the second variable, which we called `implicitly`, we use the `var` keyword to let the compiler *infer* the data type.
Both variables will be of type `int`.
Or actually, they will both be of the type `Int32` since, as you might remember, `int` is just an alias for the type `Int32`.

```csharp
Console.WriteLine( explicitly.GetType() );
Console.WriteLine( implicitly.GetType() );
```

```output
System.Int32
System.Int32
```

Notice how the word `System` and a dot (`.`) is prefixed before the data type when it's printed.
This is because the data type in question is defined in the "namespace" called `System`.
More on this in the chapter on [Namespaces](namespaces).

The `GetType()` method is really quite useful when we're learning C# since we can ask any object what it's run-time type is.
Since all expressions evaluate to objects we can also wrap any expression in parenthases and then ask it what it's type is.

```csharp
Console.WriteLine( (10 + 10 * 200).GetType() );
Console.WriteLine( (true || false).GetType() );
```

```output
System.Int32
System.Boolean
```




## Operations

A type defines a set of allowed operations.

- Dot notation or operator-based expressions. Both are [expressions](expressions).
- Exemplify with how we've used `.GetType()` above and `int + int` but possibly also string concatenation.


