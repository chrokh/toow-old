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

# Data types

## Motivation

As we saw in the chapter on [variables](variables), variables have types.
As we will see in the chapters on [methods](methods) all method parameters have types and all methods have a return type (including methods that return nothing).
Methods correspond to the operations that we can perform on types.
As we will see in the chapter on [classes](classes) and [structure types](structure-types), these are used to define custom data types that can be used in variables or methods.
In this chapter we dicsuss types in general, and give examples using variables.

## Definition

A data type defines a set of possible values and a set of operations we can perform upon the values.
Let's talk about what it means to define a set of values and a set of operations one by one.


### Values

As you may recall from the chapter on [sets](sets), data types correspond to mathematical sets.
What we mean with this is that whenever we have a data type we can just as well use set theory to reason about that data type and its relation to other data types.

Let's start with something simple like the type `bool`.

```{note}
`bool` is actually an alias for `Boolean` which is the actual name of the type.
The alias is commonly used since it means that we don't explicitly have to have access to the `System` namespace.
More on this in the chapter on [namespaces](namespaces).
```

Think back to our discussion around the set $\mathit{Boolean}$ in the chapter on [Sets](sets).
The set $\mathit{Boolean}$ has two elements: $\mathit{True}$ and $\mathit{False}$.
The set $\mathit{Boolean}$ corresponds to the data type `bool`.
The possible values of `bool` is `true` and `false`.

% TODO: Image
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:bool
%A `bool` is either `true` or `false`.
%``

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

```{note}
Remember that `int` is an alias for `Int32`.
```

To define a set that corresponds to the data type `int` we must first figure out what the minimum and maximum values are.
We do this by checking two [static](static) properties of the `int` [class](classes).

```{code-cell}
Console.WriteLine(int.MinValue);
```
```{code-cell}
Console.WriteLine(int.MaxValue);
```

Now that we have our limits we can define the set that corresponds to the type `int`.

$$
\mathit{Int} = \{ -2147483648, \enspace \dotsc \enspace -1 \enspace , \enspace 0 \enspace , \enspace 1 \enspace , \enspace \dotsc \enspace 2147483647 \}
$$


Sets can be used to describe both compile-time types and run-time types.

But, what about `null` you might ask.
Well, the short answer is that `int` is not "nullable" which means that its type does not contain the value `null`.
The long answer is that we'll deal with `null` in the chapter on [nothingness](nothingness).



#### Literal values

In the chapter on [Values](values) we saw how `"Hello world"`, `42`, and `3.14` are all examples of literal values.
But what types of values are these?
Let's invoke the `GetType` method to find what the run-time type such objects are.

```{code-cell}
Console.WriteLine( "Hello world".GetType() );
```

The value `"Hello world"` is a `String`.
Let's try with a number.

```{code-cell}
Console.WriteLine( 42.GetType() );
```

The value `42` is an integer, more specifically of the type `Int32`.
Remember that `int` is an alias for `Int32`.
Let's try with a decimal number.

```{code-cell}
Console.WriteLine( (3.14).GetType() );
```

Ok so a decimal number literal is of type `Double`.

The method `GetType()` is an [instance method](instance-methods) that we can [invoke](static-methods) on [objects](objects) to see what run-time type they have.
A lot of new words here.
Don't worry, we'll explain everything in due time.
For now, just note that it is possible to check what the run-time type is of any object by invoking the `GetType()` method.
More on both instance methods and objects in future chapters.
We invoke the method using something known as "dot notation" which we also will discuss later.

```{code-cell}
Console.WriteLine( "A".GetType()  );
```
```{code-cell}
Console.WriteLine( 420.GetType()  );
```
```{code-cell}
Console.WriteLine( 3.14.GetType() );
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


%We'll talk more about types and methods when we get to the chapters on [methods](methods) but here's a quick note.
%Notice how we've used the method `Console.WriteLine` a lot without ever really talking about it more.
%We're still not ready to talk about it fully because we first need to understand [static methods](static-methods), [namespaces](namespaces), and [overloading](overloading).
%What we can say at this point however is that `WriteLine` expects that you pass it a `String`.
%If you pass it a `String` then it will print that string to the screen.
%`WriteLine` can however also handle a bunch of other things since we can print booleans, integers, and so forth.
%But we will explain how this works in the chapter on [overloading](overloading).

In the chapter on [variables](variables) we showed how you can declare and initialize a variable by either explicitly stating the data type of the variable or by using the keyword `var` to let the compiler infer the type.
Compare the following two statements.

```{code-cell}
int explicitly = 1;
var implicitly = 2;
```

In the declaration of the first variable, which we called `explicitly`, we explicitly state that the data type of the variable is `int`.
In the declaration of the second variable, which we called `implicitly`, we use the `var` keyword to let the compiler *infer* the data type.
Both variables will be of type `int`.
Or actually, they will both be of the type `Int32` since, as you might remember, `int` is just an alias for the type `Int32`.

```{code-cell}
Console.WriteLine( explicitly.GetType() );
```
```{code-cell}
Console.WriteLine( implicitly.GetType() );
```

Notice how the word `System` and a dot (`.`) is prefixed before the data type when it's printed.
This is because the data type in question is defined in the "namespace" called `System`.
More on this in the chapter on [Namespaces](namespaces).

The `GetType()` method is really quite useful when we're learning C# since we can ask any object what it's run-time type is.
Since all expressions evaluate to objects we can also wrap any expression in parenthases and then ask it what it's type is.

```{code-cell}
Console.WriteLine( (10 + 10 * 200).GetType() );
```
```{code-cell}
Console.WriteLine( (true || false).GetType() );
```



(run-time-and-compile-time-types)=
#### Run-time and compile-time types

% TODO: Clarify this more based on: https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/#compile-time-type-and-run-time-type

Remember how we've previously distinguished between the left-hand side and the right-hand side?
We've learned that variables are on the left and values are on the right.
Well, the data type on the left-hand side is referred to as the compile-time type, while the data type on the right is referred to as the run-time type.
For now you can think of it as that the type on the right determines what type a value actually is of while the type on the left determines what what we're "treating" the type as.

To understand this business of the type on the left and the type on the right being different we first have to understand [subtype polymorphism](subtype-polymorphism) which is a topic for a much later chapter.
But for now you can think of it this way:
Types can form a subtype hierarchy or inheritance hierarchy where a type can be "treated" as any of the supertypes or parent types that it inherits from.
When we say "treat something of type $X$ as something of type $Y$" we mean that the run-time type is $X$ but the compile-time type is $Y$.

This is all premature, but if you're really wanting an example then here's one.
All objects in C# inherit from the type `object` which means that they can be "treated as" being of type `object` instead of being treated as the type they actually are.
One such object is the type `string`.
Consider the code below:

```{code-cell}
string message1 = "This is a string.";
object message2 = "This is a string.";
```

The run-time type of both variables is `string` but the compile-time type of the first line is `string` while the second is `object`.
We can visually verify that this statement is true in terms of the compile-time type being different since we can see that we've used `string` on the left-hand side in the first case and `object` in the second, but how do we verify the run-time type?
Well, for one, it's the same literal in both cases.
But if we're not satisfied with that answer, we can invoke the instance method `GetType` to check that the run-time type of both variables indeed is `string`.

```{code-cell}
Console.WriteLine(message1.GetType());
Console.WriteLine(message2.GetType());
```

But we'll get back to this much later so don't worry if it's confusing.

In this chapter we will only see explicit data types on the left and literals or other variables on the right.
So we don't explicitly specify the right-hand types, or the run-time types, in this chapter.
When we get to the chapter on [classes](classes) you will start to see explicit types on the right-hand side.
When we get to the chapter on [subtype polymorphism](subtype-polymorphism) you will start to see how the types on the right and left doesn't necessarily have to be the same.

Simplistically, the compile-time type is used for all actions at compile-time, while the run-time type is used for all actions at run-time.


(operations)=
### Operations

We said that a data type defines a set of values and a set of allowed operations that can be performed on these values.
Why operations?
Because a data type is not useful if there's nothing we can do with it.
Think about it.
What's the point of having a value that we can't do anything with?

There are a few different ways of defining operations in C#.
[Local functions](local-functions) are invoked by simply issuing the name of the function, [static](static-methods) and [instance](instance-methods) methods are invoked using dot notation, and finally we have operators like for example arithmetic addition.
Which syntax we use to invoke the method depends on how the operation is defined.

%If it's been defined as a (static or instance) method then we use dot notation.
%If it's been defined as an operator then we use operator notation.
%If it's a local function, then we simply issue the name of the method.

%We'll more about dot notation in the chapters on [static](static-methods) and [instance methods](instance-methods) while we'll talk more about operators in the chapter on [operators](operators).
%Perhaps confusingly, both dot notation and operators is used in what's known as [expressions](expressions) but we'll talk more about that in it's own chapter.

It's premature to talk about all of this since we yet to talk about methods in detail
So we'll talk more about all these different kinds in their own chapters.
However I want to make two points before we leave this chapter.
First I want to exemplify what it means when we say that types support operations.
Second, I want to emphasize that we can also always think about an operation itself as having a data type.
Again, we'll talk much more about this later so don't get bogged down by too many details.


%#### Operators

Let's take operators as an example.
In this chapter we have used values in arithmetic and logical expressions.
More specifically we've seen that the type `int` supports the arithmetic addition (`+`) and multiplication (` * `) operators.
We've also seen that the type `bool` supports the logical or-operator known as logical disjunction (`||`).

This means that the data type `int` supports arithmetic addition and multiplication, while `bool` supports logical disjunction.
Of course, these types support lots of other operations but let's talk about these.

This is what we mean when we say that a data type supports an operation.
We can call the operation and the operation somehow acts upon values of the type.

(type-signatures)=
What about this idea that an operation itself can have a type?
Well, the type of arithmetic addition could be written as:

```
(+) :: (int, int) -> int
```

```{warning}
This is not C# syntax.
It is however a fairly common language-agnostic syntax for reasoning about types.
% TODO: Reintroduce below?
%When we are defining type signatures like this, we are using a language-agnostic syntax which is also used by popular standards such as e.g. the [Fantasy Land Specification](https://github.com/fantasyland/fantasy-land).
%We'll talk more about this syntax in the chapter on [type signatures](type-signatures).
%
%In actual C# code we use what's known as [method signatures](static-methods).
%Type signatures are however expressed at a higher level of abstraction, and thus ought to be easier to read and understand, which is why I prefer to use them in this book.
%You'll find a comparison between type signatures and method signatures in the chapter on [type signatures](type-signatures).
```

Let's take an even simpler example.
Assume that we've defined an operation called `inc` that takes integers as input and gives us an integer as output.
If we pass it `1` we get `2`, if we pass it `2` we get `3`, and so forth.
We would say that the type of this operation is:

```
inc :: int -> int
```

Since this operation takes a single input argument, we can visualize it as a function that maps from the set of integers to the set of integers.
%See {numref}`fig:inc-type`.

%% TODO: Add figure.
%```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:inc-type
%
%Visualization of the type of integer incrementation.
%```

We could also visualize the type of arithmetic addition, but since it takes two integers as input we would have to draw it as a a mapping between the set of ordered integer pairs to the set of integers.
%See {numref}`fig:addition-type`.

%% TODO: Add figure.
%```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:addition-type
%
%Visualization of the type of arithmetic addition.
%```

We would read this as `+` is an operator that when given an `int` and an `int` returns an `int`.
Of course the arithmetic addition operator is not only defined for whole numbers (integers) but also for `float`, `decimal`, and so forth but let's keep it simple for now.
Interestingly the addition operator is also defined for strings to implement something known as "string concatenation" but more on this in the chapter on [operators](operators).

%The type signature of the logical disjunction operator (`||`) could be written as:
%
%```
%(||) :: (bool, bool) -> bool
%```
%
%We would read this as `||` is an operator that when given a `bool` and a `bool` returns a `bool`.
%
%So what if we try using a logical operator on values of type `int` or an arithmetic operator on values of type `bool`.
%Meaning what if we try to use an operation in a way that doesn't correspond to its type signature.
%Let's try adding to values of type `bool` together.
%
%```{code-cell}
%:tags: [raises-exception]
%bool addedBools = true + true;
%```
%
As you might have suspected not all types support all operations.
The type `bool`, for example, usually does not support the arithmetic addition operation.
Checking for this kind of errors is known as type checking and we'll talk about it in the chapter on [type-checking](type-checking).

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

But we'll talk a lot more about operations in future chapters after we have more skin in the game so let's move on for tnow.




## Exercises

```{exercise}
What are literal values, also known as simply literals?
```

```{exercise}
We tend to say that data types define two things.
What are these two things?
Explain, in your own words, what this means.
```

```{exercise}
What do the terms compile-time type and run-time type mean?
What's the difference between the two?
```

```{exercise-start}
```
Come up with examples of operations that could have the following types:
```
string -> string
int -> int
int -> string
string -> int
```
```{exercise-end}
```


