# Type-checking

% TODO: Must use terminology static/compile-time type safety.

As we briefly saw in the chapter on [Errors](errors), type checking is an activity performed by the compiler.
In the process of type checking the compiler ensures that the program is sound on the type level.
Concretely this means that the compiler checks what type that every [expression](expressions) will evaluate to and whether that type is acceptible at the place where it will be evaluated.

Types are checked during a process known as [type-checking](type-checking), which exists to enforce a property known as [type safety](type-safety).
Type safety refers to not allowing the execution of operations that violate the [type system](type-system).
Allowing such operations could lead to undefined behavior since their implementation is unspecified.
%The definitions of "type safety" varies but under one definition, a type-safe language guarantees that no valid programs lead to undefined behavior.
C# is a type-safe language where type-checking occurs during compilation.

Simplistically put, type-checking concerns ensuring that all expressions yield [run-time types](run-time-and-compile-time-types) that are members of said expression's [compile-time type](run-time-and-compile-time-type).
This not only includes checking for example arithmetic and logical expressions but also method calls.
We have yet to talk about [methods](static-methods), but as we saw in the chapter on [data types](operations) methods too have types.
The type of a method declaration is its name; its number, order, and type of arguments; as well as its return type.


## Type errors

When type-checking discovers an error we call this a "type error".
A type error means that we've expressed something where the *types* don't "line up".
If we try, for example, to use a value of a type that is not `bool`, and that cannot be implicitly converted to `bool`, where a `bool` is expected then we get a type error.
More on implicit conversions in the chapter on [type conversions](type-conversions).

Let's say we were attempting to assign, say a value of type integer, to a variable of type boolean.

```csharp
bool predicate = 1;
```

Then the compilation error would say:

```output
error CS0029: Cannot implicitly convert type 'int' to 'bool'.
```

The `int` that the error message refers to is the literal value `1` on the right-hand side of our erronous statement.
The `bool` that the error message refers to is the variable named `predicate` on the left-hand side of our erronous statement.
Conversion errors in C# conventionally follow this form.
Type $X$ cannot be converted to type $Y$ means that we have something of type $X$ and we are trying to convert it into something of type $Y$ but the conversion was unsuccessful.

Of course it is entirely possible to define your own conversion from `int` to `bool` but that's an entirely different matter and we'll see more of this in the chapter on [type conversions](type-conversions).

```{note}
We use the term "type level" when looking at the program only in terms of its types.
In a language with types we always have two levels.
The type level and the value level.
When we're reasoning or coding at the type level we don't know anything about values, and when we're reasoning or coding at the value level we don't know anything about types.
```

On the type level, here's (informally) what the type-checker sees when we tried to assign an integer to a boolean.

```
bool = int
```

This doesn't type check since the type on the right-hand side of the assignment must be implicitly convertible to the type on the left-hand side.

Let's say we instead used a boolean literal on the right-hand side:

```csharp
bool predicate = true;
```

Now the type-checker would (informally) have seen something like:

```
bool = bool
```

This does instead of course type check and the program hence compiles.

But it's not just in variable assignment that we can mess up the types.
What happens if we attempt to use a string (meaning a sequence of characters) in arithmetic addition?
Consider the following statement:

```csharp
int amount = "hello" + 3;
```

In this example we are declaring a variable of type `int` and initializing it with a value that's the result of arithmetically adding a `string` and an `int`.
On the type level, here's what the type-checker sees:

```
int = (string + int)
```

This doesn't type check since the arithmetic addition operator (`+`) does not accept `string`.
Remember, one type of the addition operator is defined as a pair of integers mapping to a single integer.
We say "one type" not "the type" since there are multiple [overloads](overloading) of the addition operator.

```
(+) :: (int, int) -> int
```

Let us instead consider a statement like:

```csharp
int amount = 10 + 3;
```

Now the type-checker would see something like:

```
int = (int + int)
```

This of course does type check and the program compiles.
An integer added to an integer results in an integer which we then assign to an integer variable.
The program on the value level yields a program that's also valid on the type level.
The values used in the addition operation are members of the input type set given the type definition of the operation.

The right-hand side in the arithmetic examples above is called an [expression](expressions) and we'll learn more about these in a separate chapter.

Of course, it isn't enough that the arithmetic expression is correct on the type level.
Our assignment expression also has to be correct on the type level.
As we will see in the chapter on [expressions](expressions), using the assignment operator (`=`) too results in an expression.
This means that assigning the result of an addition to a variable of type `string` also causes an error:

```csharp
string text = 10 + 3;
```

```output
error CS0029: Cannot implicitly convert type 'int' to 'string'.
```

On the type level we can see that this is the case because while we start with:

```
string = int + int
```

our expression on the right will evaluate to an `int` and our full expression is thus simplified to:

```
string = int
```

which clearly is not legal.
This means that the error that we got before is, in a sense, not related to the fact that we used an arithmetic expression on the right-hand side.
It is merely related to the fact that that expression yields an integer.

```{warning}
It should be noted that what is and what isn't legal on the type-level is determined by the [type system](type-systems) of the given language.
There are no universal rules.
There are many examples of languages that are type safe yet still, for example, adding an integer and a string is valid.
It all depends on what operations and what type conversions for the types in the language that are defined.
```


%## TODO: Type safety

% https://courses.cs.washington.edu/courses/cse341/04wi/lectures/26-unsafe-languages.html

