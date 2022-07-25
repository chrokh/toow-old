# Nothingness

```{admonition} TODO
- Null
  - The absence of a value.
  - Billion dollar mistake.
  - Read more: https://maximilianocontieri.com/null-the-billion-dollar-mistake
  - Move this discussion to chapter on NullObjectPattern where you will also show why null objects are much less maintainable than pattern matching on Maybe's.
- Void

```

But wait a minute you might ask.
What about `null`?
Well, `int` is not "nullable" which means that its type does not contain the value `null`.
The type `int` is what is known as a [value type](value-and-reference-semantics) and value types are not "nullable".

We can verify that `int` is not nullable by trying to compile a program that assigns the value `null` to an `int`.
If we do, then we get a compiler error.

```csharp
int x = null;
```

```output
error CS0037: Cannot convert null to 'int' because it is a non-nullable value type.
```

## Nullable

However, it is possible to convert a value type into a nullable value type by appending a question mark to the type name.
So if we say `int?` instead of `int` then we are dealing with a nullable value type.
Appending a question mark works to create a nullable type works for all value types.

So the set $\mathit{int?}$ is the union of the set $\mathit{int}$ and the singleton set that only contains the element $\mathit{null}$.

$$
\mathit{int?} = \mathit{int} \cup \{ \mathit{null} \}
$$

The set $\mathit{int?}$ corresponds to the data type `int?` and we can now actually compile a program that assigns `null` to a variable of this type.

```csharp
int? y = null;
```

```output
Build succeeded.
```

Whether this is a sensible idea or not is a different question.
In the chapter on [Values](values) we already alluded to some of the difficulties arising from the usage of `null`.
For now though, it is useful to keep exploring the concept of `null` as we are learning about how data types work.

```{note}
Note that being non-nullable is not the only property of value types.
Unless implemented otherwise, value types also have value semantics rather than reference semantics.
But more on this in the chapter on [value and reference semantics](value-and-reference-semantics).
```

Broadly speaking, there are two categories of types in C#: value types and reference types.
We'll talk more about what these base types are in the chapter on [value and reference type semantics](value-and-reference-semantics).
For now, we should however mention that prior to [C# 8.0](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references), all reference types were nullable.
We should also mention that when you do object oriented programming, our main building block is the object.
And since objects are reference types, this used to mean that all our custom types were nullable.
Not ideal.


## Null-state static analysis

Fortunately, we now have the concept of "nullable reference types" which is enabled by default in new projects since [.NET 6 (C# 10)](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types).
The short story is that reference types are no longer nullable which means that `null` is not a valid value.
You can find the setting in your `.csproj` file and it looks like this:

```xml
<Nullable>enable</Nullable>
```

If the compiler cannot guarantee that `null` is not ever used where a certain reference type is expected it will emit a warning upon compilation.
Let's for example say that you would declare a `string` (which is a reference type) and then initialize it to `null`.

```csharp
string s = null;
```

Then you would get the following warning:

```
warning CS0219: The variable 'message' is assigned but its value is never used.
```

Note that while both value types and reference types are non-nullable they way they are so differs in two important ways:

1. Value types are non-nullable regardless of whether we turn on the `Nullable` setting or not.
2. A program that assigns `null` to a value type can *not* be compiled while a program that assigns `null` to a reference type *can* be. In the case of value types you get a compilation error but in the case of reference types you only get a warning.

Due to the immense risk of suffering run-time errors at the hand of `null` references I *strongly recommend* that you configure your project so that the compiler emits *errors* instead of *warnings*.
This means that it is impossible to compile your program and subsequently impossible to run it.

I can only assume that the C# language designers chose to emit warnings instead of errors since many developers would be faced with a sea of errors if they kept programming as usual.
In my mind however, this sea of errors is a very good thing.
It only goes to show how very *risky* our code is.
We should be concerned about the large number of errors that we have to get rid of to make our code compile, we should be concerned about why we write such code in the first place.
Remember the quote by {cite:t}`martin2019` we discussed in the chapter on [comments](comments)?
"The only way to go fast, is to go well."
If you don't buy this argument, you might as well not bother with static typing at all.

%In my humble and subjective opinion, null-state static analysis is one of the most important updates to C#.

```{tip}
I strongly recommend that you configure your projects so that the compiler emits *errors* instead of *warnings* upon possible null references.
```

```{danger}
All following code examples in this book will assumed that you are treating null reference warnings as errors.
```

The configuration is simple to do.
Open your `.csproj` file, and locate the line that enables the `Nullable` setting and add another line that sets the property `WarningsAsErrors` to the property `Nullable`.
The two lines should look like this:

```xml
<WarningsAsErrors>Nullable</WarningsAsErrors>
<Nullable>enable</Nullable>
```

% SOURCES:
% https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types
% https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references

% - Value types are implicitly convertible to objects which means that they can be treated as if they are objects.
% - But since they are not actually objects they are not nullable.
% - Here are [some errors we can get](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings).

```{seealso}
In the [C# manual](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings) you can find a summary of all the warnings you can get as a consequence of enabling nullable reference types.
```

Remember how we said that you can use the question mark symbol (`?`) to turn a value type, which is non-nullable by default, into a nullable value type?
With the setting `Nullable` enabled, reference types are now also non-nullable.
Using the question mark symbol however, we can turn non-nullable reference types into nullable reference types.

```csharp
string? nullableString = null;
```

```output
Build succeeded.
```

The null-state static analysis of the C# compiler is actually quite sophisticated.
As soon as the compiler cannot guarantee that a nullable variable doesn't actually contain the value `null` then it tags the variable as `maybe-null`.
Otherwise it is tagged as `not-null`.
I know we haven't talked about [methods](static-methods) yet, but if for example you have a method that takes a nullable parameter then you cannot guarantee that callers of your method will not send you `null`.
Therefore the variable inside the method must be tagged as `not-null`.

Let's say we want to convert a value contained in a variable which has been tagged as `maybe-null` to a non-nullable type.
Then we must first check whether the value actually is null, and only if it is not are we allowed to convert the value into a type which is non-nullable.
If we don't check first then the compiler will complain and we'll get an error, if we've configured the compiler to treat null reference warnings as errors, otherwise we'll get a warning.

```csharp
static int ensure (int? x)
{
  return (int)x;
}
```

```output
error CS8629: Nullable value type may be null.
```

If we however first check whether the value actually is `null`, so that we have a way of dealing with the `null` case, then the conversion is approved and the program compiles.

```csharp
static int ensure (int? x)
{
  if (x != null)
    return (int)x;
  else
    return 1;
}
```

```output
Build succeeded.
```

I apologize for the fact that we're using [type conversions](type-conversions), [static methods](static-methods), and [selection](selection) in the examples above even though we haven't talked these concepts yet.
Hopefully you can however see the bigger picture.
If you have something that *might be* `null` then you cannot convert it into something that's *certainly not* `null` without first checking whether you actually have `null`.
If not, then I strongly advise you to return this this section after having read those chapters.

```{exercise}
What do we mean when we say that the C# compiler tags variables as `not-null` or `maybe-null`?
```

```{exercise}
Can we convert a value tagged as `maybe-null` to a value tagged as `not-null`?
```


## Null-forgiving operator

Finally we must talk about the null-forgiving operator.
The null-state static analyzer isn't perfect which means sometimes it tags a value as `maybe-null` even though it actually never is `null`.

In the silly example below we are declaring a nullable integer (`int?`) and initialize it to the non-null value `1`.
We then use a condition to say that if the value is `2`, which of course it is not, then and only then will we change the value to `null`.
The value will of course never be changed to `null` since the variable is always initialized to `1`.
If we try to compile the code however we still get an error (assuming that we are treating null reference warnings as errors).

```csharp
int? x = 1;

if (x == 2)  // This condition is false.
  x = null;  // So this line will never run.

int y = (int)x;
```

```output
error CS8629: Nullable value type may be null.
```

Apologies again for using conditionals before we've talked about [selection](selection).
Hopefully you see the general idea.
We're using enough [indirection](indirection) for the compiler to be unable to determine that the value won't ever be `null`.

The conflicting part in our example is the last one where we try to convert a nullable integer to a regular integer.
To solve this issue we could use the null-forgiving operator which is a bang (`!`).
By appending the null-forgiving operator to our variable name we tell the compiler that even if it is has tagged the value as `maybe-null` we know for a fact that it cannot be `null` and that the value hence should be retagged as `not-null`.
Notice the bang in the rewriting of the last line below.
This makes the program compile and run just fine.

```csharp
int y = (int)x!;
```

It should be noted that the program in our example is pointless in multiple ways and that it of course never should be encountered in any real world setting.
A more realistic example would be if you want to depend on some code that you cannot rewrite and that this code returns something nullable but you know that you use the code in a way such that you *never* encounter `null`.
This makes sense, but is risky.
If you're going to do this I highly recommend creating a wrapper to centralize and encapsulate this logic.
See for example the chapter on [adapter pattern](adapter-pattern).

```{caution}
The null-forgiving operator should be *used with caution*.
There are very few scenarios that actually *require* it and in all other cases you can rewrite the code that you depend on to avoid introducing possible `null` states in the first place.
Treat the cause of the problem, not the symptoms.
The null-forgiving operator is a way to treat the symptoms.

All scenarios that require the null-forgiving operator involve code or states that you don't control, so think long and hard if it isn't possible to rewrite your code to avoid the problem in the first place.
Avoiding the introduction of `null` in the first place is a much better solution.

As soon as you introduce the null-forgiving operator you are back at the mercy of null-state run-time errors.
```

