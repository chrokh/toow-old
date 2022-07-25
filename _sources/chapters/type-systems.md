# Type systems

- Types of type systems
  - Static vs dynamic
  - Manifest vs inferred
  - Nominal vs structural
- Modeling
  - Later we will talk about making impossible states impossible. Types over tests.
  - Refer to Modeling (abstraction) chapter.
  - IMPORTANT: https://maximilianocontieri.com/the-one-and-only-software-design-principle
    - "The one and only software design principle"
    - "The bijection rule"

## Type-checking

As we briefly saw in the chapter on [Errors](errors), type checking is an activity performed by the compiler.
In the process of type checking the compiler ensures that the program is sound on the type level.
Concretely this means that the compiler checks what type that every [expression](expressions) will evaluate to and whether that type is acceptible at the place where it will be evaluated.

A "type error" means that we've expressed something where the *types* don't "line up".
If we try, for example, to use a value of a type that is not `bool`, and that cannot be implicitly converted to `bool`, where a `bool` is expected then we get a type error.
More on implicit conversions in the chapter on [type conversions](type-conversions).
Let's say we were attempting to assign, say a value of type integer, to a variable of type boolean.

```csharp
bool predicate = 1;
```

Then the compilation error would say:

```output
Cannot implicitly convert type 'int' to 'bool'.
```

The `int` that the error message refers to is the literal value `1` on the right-hand side of our erronous statement.
The `bool` that the error message refers to is the variable named `predicate` on the left-hand side of our erronous statement.
Conversion errors in C# conventionally follow this form.
Type $X$ cannot be converted to type $Y$ means that we have something of type $X$ and we are trying to convert it into something of type $Y$ but the conversion was unsuccessful.

Of course it is entirely possible to define your own conversion from `int` to `bool` but that's an entirely different matter and we'll see more of this in the chapter on [type conversions](type-conversions).

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

This does of course type check and the program hence compiles.

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
Let us instead consider a statement like:

```csharp
int amount = 10 + 3;
```

Now the type-checker would see something like:

```
int = (int + int)
```

This of course does type check and the program ocmpiles.
An integer added to an integer results in an integer which we then assign to an integer variable.

The right-hand side in the arithmetic examples above is called an [expression](expressions) and we'll learn more about these in a separate chapter.



## Static vs dynamic

- Static vs dynamic typing. Strong vs weak.
  - "Statically typed languages perform type checking at compile-time, while dynamically-typed languages perform type checking at run-time"
- Reflection.


## Manifest vs inferred

- Implicitly typed local variable
- https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/var


## Nominal vs structural
