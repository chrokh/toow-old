(value-and-reference-semantics)=
# Value and reference semantics

```{warning}
Work in progress.
```

%- Perhaps use type hierarchy fig from: https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/types/
%- Implications for equivalence, mutability, and copying (passing and changing).
%- Reference types that behave like value types
%- Example: Arrays are passed by reference and are mutable.
%- Value types and reference types are the two main categories of types in C# 
%- All this is a bit of a mess.
%- Relation to boxing.
%
%```{admonition} TODO Example
%int x = 10;
%ref int y = ref x;
%
%Console.WriteLine(x);
%Console.WriteLine(y);
%
%x++;
%
%Console.WriteLine(x);
%Console.WriteLine(y);
%```

% EXAMPLE: if numbers were following reference semantics. This example is referred to from the chapter on Classes.

%When we call the method `WriteLine` and pass the arguments `"Hello world"`, `42`, and `3.14` we are using what's known as value "literals".
%We are constructing these values out of thin air.
%You can speak any integer, double, or string into existence.
%This is true for all types that have a special literals syntax.
%Types that don't have a syntax for literals must be constructed and we'll get to this in the chapter on {doc}`Constructors<constructors>`.
%
%If I speak the value `42` into existence twice you might ask yourself whether these two values are the same or not.
%If you write a program that asks whether `42` is equal to `42` and prints the result you will see that they indeed are the same, since we get the answer `True`.
%
%```csharp
%Console.WriteLine( 42 == 42 );
%```
%
%```output
%True
%```
%
%By the way, the type of `True` is Boolean.
%You might recall this type from the chapter on {doc}`sets`.
%The double-equal sign symbol (`==`) is an {doc}`Operator<operators>` and `42 == 42` is an {doc}`Expression<expressions>`.
%We'll get to all these things soon but I'm just giving you some terminology now for context but I'm just giving you the correct terminology in passing.
%
%The reason I wanted to highlight that `42` is equal to `42` is that this is **not always** the case.
%The reason that the values are the same in this case is that integers have {doc}`value type semantics<value-and-reference-semantics>`.
%It's too soon to talk about that, but I just wanted you to beware that just because two values look like they are exactly the same doesn't mean that they actually are.
%
