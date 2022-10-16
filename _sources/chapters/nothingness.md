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

# Nothingness

```{warning}
Work in progress.
```

In imperative programming languages we usually find two kinds of nothingness: `null` and `void`.
The former, `null`, is a value that represents the absence of a value in a variable.
The latter, `void`, is a type that represents the absence of a value returned from an operation.
`null` is an actual value that belongs to many types and that you can hold in a variable.
But `void` is a type of which there are no values.

In this chapter we're mostly going to talk about `null` and how its treated in C#.
We will briefly discuss `void` but it will be dealt with more appropriately when we get to [methods](static-methods).


## Nullable value types

In the chapter on [data types](data-types) we modeled the type `int` as a mathematical set.
The set did however not involve the value `null`.
Why?

The type `int` is what is known as a [value type](value-and-reference-semantics) and value types are, in C#, not "nullable".
Being "nullable" means that the set that models the type also contains `null`.
If a type is "non-nullable" then the set doesn't contain `null`.
%The type `int` is not "nullable" which means that its type does not contain the value `null`.

We can verify that `int` is not nullable by trying to compile a program that assigns the value `null` to an `int`.
If we do, then we get a compiler error.

```csharp
int x = null;
```

```output
error CS0037: Cannot convert null to 'int' because it is a nonnullable value type.
```
The error message above states that the value `null` cannot be converted into an `int` since the type `int` is non-nullable.
This means that `null` isn't a member of the set `int` and that there is no implicit conversion from `null` to `int`.
Of course there couldn't possibly exist a general-case conversion from `null` to `int` because which integer could we possibly choose to represent the absence of an integer.
Zero? One? Negative one?
It all depends on context, so it is sensible that C# does not give us a general conversion from `null` to `int`.

```{seealso}
As an aside you might be interested to know that some methods, such as `String.IndexOf`, do in fact return values that they assign special meaning to, such as negative one (`-1`), to denote the failure of an operation or the absence of a value to return.
See [the documentation](https://docs.microsoft.com/en-us/dotnet/api/system.string.indexof?view=net-6.0) for more information on the IndexOf method for example.
```

However, it is possible to create a nullable value type from a non-nullable value type by appending a question mark to the type name.
This means that we are changing the type, not the value.

So if we say `int?` instead of `int` then we are dealing with a nullable value type.
Appending a question mark works to create a nullable type works for all value types.

So the set $\mathit{int?}$ is the union of the set $\mathit{int}$ and the `null` type which is a singleton set whose only element is $\mathit{null}$.

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
Being non-nullable is not the only property of value types.
Unless implemented otherwise, value types also have, what's known as, "value semantics" rather than "reference semantics".
But more on this in the chapter on [value and reference semantics](value-and-reference-semantics).
```

Broadly speaking, there are two categories of types in C#: value types and reference types.
We'll talk more about what these base types are in the chapter on [value and reference type semantics](value-and-reference-semantics).
For now, we should however mention that prior to [C# 8.0](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references), all reference types were nullable.

We should also mention that when you do object oriented programming, our main building block is the object.
And since objects are reference types, this used to mean that most of our custom types were nullable.
If null is a billion dollar mistake, reference types are nullable, we use mostly reference types, and objects are reference types, then most of our code is subject to this billoion dollar mistake.
Not ideal.


%## Null-state static analysis

(nullable-reference-types)=
## Nullable reference types

Fortunately, C# now has a setting called "nullable reference types" which is enabled by default in new projects since [.NET 6 (C# 10)](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types).
You can find the setting in your `.csproj` file and it looks like this:

```xml
<Nullable>enable</Nullable>
```

The short story is that, with this setting turned on, reference types are no longer nullable.
However, if you try to assign the literal `null` to a variable that's of a reference type you don't actually get a type error but simply a compiler warning.
This warning is emitted from a static code analysis procedure known as null state analysis.

Take the reference type `string` for example.
Let's say we declare a variable of type `string` and initialize it to the value `null`.

```csharp
string s = null;
```

If we have the setting for nullable reference types turned on, then we get the following warning upon compilation:

```output
warning CS8600: Converting null literal or possible null value to non-nullable type.
```

Notice how the error message is referring to the variable of type `string` as being non-nullable.
The error message is structured exactly like a type error.
If, for example, we tried to assign a value of type `int` to a variable of type `string` we would get an error message with the same structure:

```output
error CS0029: Cannot implicitly convert type 'int' to 'string'.
```

Yet, in the case where we assign a null literal to a value of the non-nullable reference type string this is not a type error in the classic sense.
For one, it's a warning and not an error.
But also, this is a warning that's emitted upon null state analysis and not by type checking.
As we shall see soon, null state analysis is a much more complicated procedure than type-checking.
In [type-checking](type-checking) we simply check whether the type of a value is the same as, or is [implicitly convertible](type-conversions) to, a value of the expected type.
If `null` is a legal value of the expected type, or if it is possible to implicitly convertible to a value of the expected type then the program simply type-checks.
In null state analysis however, we look at the actual flow of the program in attempts to verify whether a value might ever contain the value `null`.
If the compiler cannot guarantee that `null` is not ever used where a certain reference type is expected it will emit a warning upon compilation.

So it isn't entirely honest to call `string` non-nullable since we are still able to compile and run programs that uses `null` where values of type `string` are expected.
It's not that `null` isn't a valid member of the set underlying each reference type or that there no longer exists an implicit conversion from `null` to the type in question.
It's that whenever you try to assign `null` to a non-nullable reference type you simply get a compiler warning.
You can still compile the program and it might run just fine.

%Before we move forward we should make one distinction clear.
%I use sets and types to reason about how we change the permitted values of reference types but null-state analysis is not the same as any old type-checking.

So, while both value types and reference types are non-nullable the way they are so differs in two important ways:

1. Value types are non-nullable regardless of whether we turn on the `Nullable` setting or not. The `Nullable` setting only affects the nullability of reference types.
2. A program that assigns `null` to a value type can *not* be compiled while a program that assigns `null` to a reference type *can* be. In the case of value types you get a compilation error but in the case of reference types you only get a warning.
3. Assigning `null` to a value type causes an error at type-checking while assigning `null` to a non-nullable reference type causes a warning during null-state analysis if that code can be reached.

The third point can be driven home by asking yourself why one of the examples below is a compileable program while the other is not.

```csharp
string s = "";
if (false)
  s = null;
```

```output
warning CS0162: Unreachable code detected

Build succeeded.
````

In the case above, we generate unreachable code (line 3).
Since the statement that assigns `null` to our non-nullable variable isn't ever executed this is compileable (but pointless).

Compare this to the case below where we try to assign `null` to a value type but wrap it in a conditional that's always false which means that it will never happen.

```csharp
string s = "";
if (false)
  s = 1;
```

```output
error CS0029: Cannot implicitly convert type 'int' to 'string'
```

In this case we get a type-error even if the code cannot ever be reached.
This is because the error is emitted by type-checking rather than null-state static analysis.

```{seealso}
In the [C# manual](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings) you can find a summary of all the warnings you can get as a consequence of enabling nullable reference types.
```


Remember how we said that you can use the question mark symbol (`?`) to turn a value type, which is non-nullable by default, into a nullable value type?
With the setting `Nullable` enabled reference types are, as we have seen, now also non-nullable.
We can however, just like with value types, turn any non-nullable reference type into a nullable reference type by appending a question mark to the type name.

```csharp
string? nullableString = null;
```

```output
Build succeeded.
```


(null-state-static-analysis)=
## Null-state static analysis

The null-state static analysis of the C# compiler is actually quite sophisticated.
According to [the documentation](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references), the compiler can tag a variable as `not-null` in two ways:

1. If a variable has been assigned a value that is known to not be `null`.
2. If a variable has already been checked against `null` and has not been modified since.

In all other cases, the variable is tagged as `maybe-null`.
Or in other words, in all other cases, the compiler cannot guarantee that the variable doesn't contain the value `null`.

%I know we haven't talked about [methods](static-methods) yet, but if for example you have a method that takes a nullable parameter then you cannot guarantee that callers of your method will not send you `null`.
%Therefore the compiler must tag the variable inside the method as `not-null`.

If we want to convert a value contained in a variable which has been tagged as `maybe-null` to a non-nullable type then we must first check whether the value actually is `null`.
Only if we can show that the value isn't in fact `null` are we allowed to convert the value into a type which is non-nullable.
If we don't check first then the compiler will complain and we'll get a warning.

Take, for example, the concept of reading input from the user using the method `Console.ReadLine`.
If we read the [documentation](https://docs.microsoft.com/en-us/dotnet/api/system.console.readline?view=net-6.0) for the method then we can see that it doesn't return a `string` but a `string?`.
Meaning it doesn't return a non-nullable string but a nullable string.

In the documentation we can see that we get `null` when there are no more lines available to read from standard input.
When we are running our program interactively and the user types in a response to our `Console.ReadLine` call then we never actually see `null`.
However, since it can occurr if we run the program non-interactively the compiler cannot guarantee that the result of `Console.ReadLine` is not `null` in our program and hence cannot tag the result as `not-null`.

```csharp
string? x = Console.ReadLine();
string y = x;
```

The variable `x` in the example above is therefore tagged as `maybe-null`.
Since we have a value that's possibly `null` we "cannot" store it in a non-nullable variable and consequently get a warning if we try to:

```output
warning CS8600: Converting null literal or possible null value to non-nullable type.
```

Note that I put "cannot" within air quotes above since it is, as we've already discussed, slightly dishonest to say that non-nullable reference types cannot store the value `null` since they actually can.
We merely get a compiler warning.
In the next section we will however see how we can turn these warnings into errors which means that we no longer need the air quotes.

Ok, but is it possible to convert a nullable reference type to a non-nullable reference type if the value is tagged as `not-null`?
Yes, it is.
In the example below, we assign the variable `x` a literal string and not `null`.
This causes `x` to be tagged as `not-null` which means that we can safely and implicitly convert our `string?` which is nullable to a `string` which is non-nullable.


```csharp
string? x = "Hello";
string y = x;
```

```output
Build succeeded.
```

So what do we do in the case of our `ReadLine` example?
Of course we would like the highest grade of safety in our programs.
To avoid run-time errors we would of course like to use the non-nullable type `string` rather than the nullable type `string?`.
Are we doomed to having to resort to nullable types as soon as we have the possibility of `null`?
No, not at all.

Remember how we said that the compiler's static null-state analysis can tag a variable as `not-null` if we've "checked it against `null`"?
What does this mean?
It simply means that we take our variable, stick it in a conditional, and check if the value of our variable is `null`.
In the branch where the variable is determined to not be `null` the variable is tagged as `not-null`.

```csharp
string? x = Console.ReadLine();
string y;

if (x != null)
  y = x; // Here x is tagged as not-null.
```

```output
Build succeeded.
```

Of course, we're left with the question of what to do in the else-branch of the if-statement in the example above.
But, then again, this is precisely the power of static type-checking and static null-state analysis.
This is precisly what we're looking for when trying to eliminate the billion dollar mistake called `null`.
We've not actually introduced more paths to our program.
We've merely made paths that we're previously implicit and possibly lead to run-time errors, explicit so that we can ensure that they don't lead to run-time errors.


%```csharp
%static int ensure (int? x)
%{
%  return (int)x;
%}
%```
%
%```output
%error CS8629: Nullable value type may be null.
%```
%
%If we however first check whether the value actually is `null`, so that we have a way of dealing with the `null` case, then the conversion is approved and the program compiles.
%
%```csharp
%static int ensure (int? x)
%{
%  if (x != null)
%    return (int)x;
%  else
%    return 1;
%}
%```
%
%```output
%Build succeeded.
%```
%
%I apologize for the fact that we're using [type conversions](type-conversions) and [static methods](static-methods) in the examples above even though we haven't talked these concepts yet.
Hopefully you can however see the bigger picture.
If you have something that *might be* `null` then you cannot convert it into something that's *certainly not* `null` without first checking whether you actually have `null`.
If not, then I strongly advise you to return this this section after having read those chapters.



## Warnings as errors

Due to the immense risk of suffering run-time errors at the hand of `null` references I *strongly recommend* that you configure your project so that the compiler emits *errors* instead of *warnings*.
This means that it is impossible to compile your program and subsequently impossible to run it.

Configuring your project to treat `Nullable` warnings as errors is simple.
Open your `.csproj` file, and locate the line that enables the `Nullable` setting and add another line that sets the property `WarningsAsErrors` to the property `Nullable`.
The two lines should look like this:

```xml
<WarningsAsErrors>Nullable</WarningsAsErrors>
<Nullable>enable</Nullable>
```

```{tip}
I **strongly recommend** that you configure your projects so that the compiler emits *errors* instead of *warnings* upon possible null references.
```

I can only assume that the C# language designers chose to emit warnings instead of errors since many developers would be faced with a sea of errors if they kept programming as usual.
In my mind however, this sea of errors is a very good thing.
It only goes to show how very *risky* our code is.

We should not be concerned about the large number of errors that we have to get rid of to make our code compile, we should be concerned about why we write such code in the first place.
Remember the quote by {cite:t}`martin2019` we discussed in the chapter on [comments](comments)?
"The only way to go fast, is to go well."
If you don't buy this argument, you might as well not bother with static typing at all.

%In my humble and subjective opinion, null-state static analysis is one of the most important updates to C#.

```{danger}
All following code examples in this book will assumed that you are treating null reference warnings as errors.
```

When we've turned on the setting for treating nullable warnings as errors it is suddenly slightly more truthful to claim that `null` is not a member of any non-nullable reference type.
It still holds however that errors are emitted in a slightly different fashion since they follow as a consequence of null state analysis rather than type-checking.
So even if we treat nullable warnings as errors we are still able to compile code that assigns `null` to a non-nullable reference type if the compiler can prove that said code is never executed.

% SOURCES:
% https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types
% https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references

% - Value types are implicitly convertible to objects which means that they can be treated as if they are objects.
% - But since they are not actually objects they are not nullable.
% - Here are [some errors we can get](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings).



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
The null-forgiving operator should be *used with extreme caution*.
There are very few scenarios that actually *require* it and in all other cases you can rewrite the code that you depend on to avoid introducing possible `null` states in the first place.
Treat the cause of the problem, not the symptoms.
The null-forgiving operator is a way to treat the symptoms.

All scenarios that require the null-forgiving operator involve code or states that you don't control, so think long and hard if it isn't possible to rewrite your code to avoid the problem in the first place.
Avoiding the introduction of `null` in the first place is a much better solution.

As soon as you introduce the null-forgiving operator you are back at the mercy of null-state run-time errors.
```


## Void

In terms of set theory, you can think of the type `void` as the empty set.
In theory, there are no elements of type `void`.
Compare this to the type `null` which is a singleton set, that only contains the value with the same name, namely `null`.
Consequently you couldn't possible store a reference to something of type `void` in a variable.

We have not yet talked about [methods](methods), so the type `void` will not make much sense before we get there.
For now I therefore simply want to mention that methods have, what's known as, return types and if a method doesn't return a value then we say that it's return type is `void`.
It's quite intutive really.
If a method doesn't return a value, but all methods must state what the type is of the things that it returns then it makes sense to say that the method returns things of type `void`.
Since there are no values of type `void` the method cannot ever return a value.

```{seealso}
%Whether there exists a single value of type `void` or no values (meaning whether `void` is a singleton set or an empty set) is a theoretical question.
This is way beyond the scope of this book, but due to the fact that you can declare pointers of type `void` the case could be made that `void` is a singleton set.
If you're keen to learn more about this, see the page on [Pointer types](https://docs.microsoft.com/en-ca/dotnet/csharp/language-reference/unsafe-code#pointer-types) in the documentation.
```


## Exercises

```{exercise}
What do the terms "nullable" and "non-nullable" mean in the context of types?
```

```{exercise}
With the nullable reference types setting turned on in C#, both reference types and value types are non-nullable. However, they are non-nullable in slightly different ways, how? Give an example.

Hint: Think about the difference between null-state analysis and type-checking.
```

```{exercise}
What is null-state static analysis in C#?
```

```{exercise}
What do we mean when we say that the C# compiler tags variables as `not-null` or `maybe-null`?
```

```{exercise}
Write some code that generates a null reference warning.
```

```{exercise}
How can we determine whether a particular variable has been tagged `maybe-null` or `not-null`?
Give an example in code.
```

```{exercise}
How can we convert a value tagged as `maybe-null` to a value tagged as `not-null` *without using* the null-forgiving operator?
Give an example in code.
```

```{exercise}
How can we convert a value tagged as `maybe-null` to a value tagged as `not-null` *by using* the null-forgiving operator?
Give an example in code.
```

```{exercise-start}
```
Does the following code compile? Why or why not?
Assume that we compile with the nullable reference types setting enabled and treat nullable warnings as errors.
```csharp
string? x = "Hello";
string y = x;
```
```{exercise-end}
```

```{exercise-start}
```
Does the following code compile? Why or why not?
Assume that we compile with the nullable reference types setting enabled and treat nullable warnings as errors.
```csharp
string? x = "A";
if (x == "B")
  x = null;
string y = x;
```
```{exercise-end}
```

```{exercise-start}
```
Does the following code compile? Why or why not?
Assume that we compile with the nullable reference types setting enabled and treat nullable warnings as errors.
```csharp
string? x = "A";
if (x == "B")
  x = null;
string y = x!; // <-- Note the exclamation mark!
```
```{exercise-end}
```



% TODO: Incorporate this response that I wrote in the text:
%Eftersom vi använder mängdlära för att resonera om typer så går det inte riktigt att säga vad som är “rätt” och vad som är “fel”. Så det handlar alltså snarare om huruvida vi resonerar på ett meningsfullt och rimligt sätt. Vilket jag tycker att du i stora drag gör. Jag tänker dock enligt nedan och det är den bild jag tafatt försökte förmedla under föreläsningen :)
%
%1) Vi kan tänka att `Null` är en mängd och `Int` en annan. I mängden `Null` finns endast ett element som är elementet `null`. I mängden `Int` finns endast alla heltal. Mängden `Int?` (alltså `Nullable<Int>`) är då unionen av `Int` och `Null`. Elementet `null` tillhör inte mängden `Int` men tillhör mängden `Int?`.
%
%2)  Ovan gäller eftersom `Int` är en värdetyp som faktiskt inte får tilldelas `null`. `String` däremot är en referenstyp som endast inte får tilldelas `null` om vi kör med null static analysis och då får vi en varning och inte ett fel (om vi inte väljer att behandla varningen som ett fel).
%
%3) Så i fallet `String` så innehåller mängden `String` faktiskt elementet `null` eftersom det inte är typen som sådan som säger att det inte är ett tillåtet värde utan den statiska analysen.
%
%4) Om vi vill hade vi dock kunnat resonera om värdet `null` i `String` som om det var av en annan typ eftersom det speciella värdet faktiskt inte stödjer några operationer som övriga värden i `String` tillåter. Men det har jag inte (med mening) gjort under föreläsningen. Det jag däremot har sagt är att när vi kör med statisk analysis så beter sig kompilatorn nästan som om det gällde att `String` inte innehåller `null` och `String?` är unionen av `Null` och `String`.
%
%Det är synd att implementationen av non-nullable referenstyper är så här bökig men det är helt enkelt vad vi har att jobba med.
