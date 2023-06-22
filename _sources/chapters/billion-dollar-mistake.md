# Billion dollar mistake

```{epigraph}
I call it my billion-dollar mistake.

-- Tony Hoare, on the invention of `null` [[TODO REF](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/)]
```

Prior to ([C# 8.0](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references)), data types all [reference types](value-and-reference-semantics) were, what is known as, "nullable".
This meant that `null` was considered a valid value of all reference types.
We will discuss this further in the chapter on {doc}`Data types<data-types>`, `null`.
Let's, for example, say that you've got a `string`, meaning a sequence of characters, but that your string is nullable.
The compiler isn't actually guaranteeing that you have a `string`, it is guaranteeing that you either have a `string`, or you have the absence of one (meaning `null`).

On the type level there is no way of ensuring that you only take a particular path through the program if you actually have a string.
We'll talk more about `null` and nullable reference types in the chapter on [nothingness](nothingness).
But the short story is that we used to have to resort to tons and tons of run-time checks to make sure that our programs don't crash as a consequence of `null` values.

It is understandable if the example below doesn't make sense since we haven't yet talked about neither [selection](selection) nor the [equality operator](operators).
However, just to give you an idea of what we're talking about.
The existance of `null` means that we have to scatter tons of checks like the one below throughout our whole code base.
Not ideal as you might suspect.

```csharp
if (myString == null)
  // Don't do the thing since we don't have a value.
else
  // Do the thing since we have a value.
```

As already mentioned, this is the source of much pain and suffering.
Tony Hoare is often credited with the invention of `null` but has apologized for it.

```{exercise}
How do we denote the absence of a value?
```

