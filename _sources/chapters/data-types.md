(data-types)=
# Data types

A data type defines a set of possible values and a set of operations we can perform upon the values.
As we saw in the chapter on [Variables](variables), variables have types.
As we will see in the chapters on [Static methods](static-methods) and [Instance methods](instance-methods) all method parameters have types and all methods have a return type (including methods that return nothing).
Methods correspond to the operations that we can perform on types.
As we will see in the chapter on [Classes](classes) and [Structure types](structure-types), these are used to define custom data types that can be used in variables or methods.
In this chapter we dicsuss types in general, and give examples using variables.

```{important}
A data type defines a set of possible values and a set of operations we can perform upon the values.
```


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
We invoke the method using something known as "dot notation" which we also will discuss later.

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

When calling `GetType` on `"hello world"`, `42`, and `3.14` we can see that their types are `String`, `Int32`, and `Double`, respectively.


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

We said that a data type defines a set of values and a set of allowed operations that can be performed on these values.
Let's now talk about the second part of that statement, namely the operations.

In general, there are two kinds of operations that a type can support in C#.
An operation can either be invoked via, so called, "dot notation" or by using an "operator".
Which one we use, depends on how the operation is defined.
If it's been defined as a (static or instance) method then we use dot notation.
If it's been defined as an operator then we use operator notation.

We'll more about dot notation in the chapters on [static](static-methods) and [instance methods](instance-methods) while we'll talk more about operators in the chapter on [operators](operators).
Perhaps confusingly, both dot notation and operators is used in what's known as [expressions](expressions) but we'll talk more about that in it's own chapter.

It's premature to talk about all of this since we haven't yet established what methods are.
However let me just quickly show you how we can interpret operations on the type level.
Again, we'll talk much more about this later.


### Operators

Let's first talk about operators.
In this chapter we have used values in arithmetic and logical expressions.
More specifically we've seen that the type `int` supports the arithmetic addition (`+`) and multiplication (`*`) operators.
We've also seen that the type `bool` supports the logical or-operator known as logical disjunction (`||`).

By now you should understand that this means that the data type `int` supports arithmetic addition and multiplication, while `bool` supports logical disjunction.
Of course, these types support lots of other operations but we have to start somewhere.

The type signature of arithmetic addition could be written as:

```
(+) :: (int, int) -> int
```

We could also visualize the type of arithmetic addition as a mapping between the set of integer pairs to the set of integers.
See {numref}`fig:addition-type`.

```{figure} ../images/arithmetic-addition-type.png
:name: fig:addition-type

Visualization of the type of arithmetic addition.
```

We would read this as `+` is an operator that when given an `int` and an `int` returns an `int`.
Of course the arithmetic addition operator is not only defined for whole numbers (integers) but also for `float`, `decimal`, and so forth but let's keep it simple for now.
Interestingly the addition operator is also defined for strings to implement something known as "string concatenation" but more on this in the chapter on [operators](operators).

```{warning}
This is not C# syntax.
When we are defining type signatures like this, we are using a language-agnostic syntax which is also used by popular standards such as e.g. the [Fantasy Land Specification](https://github.com/fantasyland/fantasy-land).
We'll talk more about this syntax in the chapter on [type signatures](type-signatures).

In actual C# code we use what's known as [method signatures](static-methods).
Type signatures are however expressed at a higher level of abstraction, and thus ought to be easier to read and understand, which is why I prefer to use them in this book.
You'll find a comparison between type signatures and method signatures in the chapter on [type signatures](type-signatures).
```

The type signature of the logical disjunction operator (`||`) could be written as:

```
(||) :: (bool, bool) -> bool
```

We would read this as `||` is an operator that when given a `bool` and a `bool` returns a `bool`.

So what if we try using a logical operator on values of type `int` or an arithmetic operator on values of type `bool`.
Meaning what if we try to use an operation in a way that doesn't correspond to its type signature.
Let's try adding to values of type `bool` together.

```csharp
bool addedBools = true + true;
```

```output
error CS0019: Operator '+' cannot be applied to operands of type 'bool' and 'bool'.
```

As you might have suspected, this doesn't work.
The type `bool` does not support the arithmetic addition operation.
Not all types support all operations.
Checking for this kind of errors is known as type checking and we'll talk about it in the chapter on [type systems](type-systems).

````{warning}
When we only consider an operations type signature then we know nothing about the underlying implementation.
Note how for example how addition, multiplication, subtraction, and division all have the same type signature albeit different names.

```
(+) :: (int, int) -> int
(-) :: (int, int) -> int
(*) :: (int, int) -> int
(/) :: (int, int) -> int
```

````


### Dot notation

Let's now talk about dot notation.
If you use dot notation on an object then we are calling an [instance method](instance-methods) on that object.
If you use dot notation on a class then we are calling a [static method](static-methods) on that class.
We'll talk a lot more about both instance and static methods in their respective chapters so don't worry if it feels overwhelming at this point.

We've already discussed how we can use the instance method `GetType` to make an object report what it's run-time type is.
This method is an instance method that we call using dot-notation and that can be called on all things that can be treated as objects.
More on this in the chapter on [type hierarchies](type-hierarchies).

```csharp
"A".GetType();
420.GetType();
3.14.GetType();
```

What I want to show you now is that the data type of the method `GetType` can be defined like this:

```
GetType :: object ~> string
```

We can read this type signatures as that `GetType` is an instance method on the type `object` that when called without any arguments, returns a `string`.

Another method that we've seen a lot is the method `WriteLine`.
This is a static method that can be run in a number of different ways since it has been defined with a bunch of different, so called, [method overloads](overloading).
More on this in it's own chapter, but this means that the method `WriteLine` has a bunch of different type signatures.
Some of the signatures that we've used are listed below.

```
WriteLine : string -> void
WriteLine : bool -> void
WriteLine : int -> void
```

The first one says that `WriteLine` is a static method that, when called with a `string`, returns nothing.
The second one says that `WriteLine` is a static method that, when called with a `bool`, returns nothing.
Finally, the third one says that `WriteLine` is a static method that, when called with an `int`, returns nothing.

The astute reader might have noticed that we snuck the type `void` into the examples above and then referred to it as "nothing" when reading the types.
We'll return to this special data type in the chapter on [nothingness](nothingness).


```{exercise}
We tend to say that data types define two things.
What are these two things?
Explain, in your own words, what this means.
```


