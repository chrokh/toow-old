# Values

Let's now talk about values and literals.
We've already seen statements that print to screen without discussing or explaining it in any further detail.
We'll talk about what {doc}`Statements<statements>` are in a future chapter, but for now, consider the following statement:

```csharp
Console.WriteLine("Hello world");
```

```output
Hello world
```

When executed, the program will run the statement and print the String `"Hello world"` to screen.
String is a data type, and we'll talk about {doc}`Data types<data-types>` in a separate chapter but for now you can think of it this way:
All values have types.
Meaning that everything is a *kind* of thing.
One *kind* of thing that values can be is Strings.
A String is a sequence of characters.

Let's look at another value.
How about the numbers `42` and `3.14`?

While we haven't talked about {doc}`Methods<static-methods>` yet, `WriteLine` is a method.
It is a method that is {doc}`Overloaded<overloading>` so that it can accept values of multiple different types.
This means that we can run the method with the String `"Hello world"` as well as with the Integer `42` and with the Double `3.14`.

```csharp
Console.WriteLine(42);
Console.WriteLine(3.14);
```

```output
42
3.14
```

When we call the method `WriteLine` and pass the arguments `"Hello world"`, `42`, and `3.14` we are using what's known as value "literals".
We are constructing these values out of thin air.
You can speak any integer, double, or string into existence.
This is true for all types that have a special literals syntax.
Types that don't have a syntax for literals must be constructed and we'll get to this in the chapter on {doc}`Constructors<constructors>`.

If I speak the value `42` into existence twice you might ask yourself whether these two values are the same or not.
If you write a program that asks whether `42` is equal to `42` and prints the result you will see that they indeed are the same, since we get the answer `True`.

```csharp
Console.WriteLine( 42 == 42 );
```

```output
True
```

By the way, the type of `True` is Boolean.
You might recall this type from the chapter on {doc}`sets`.
The double-equal sign symbol (`==`) is an {doc}`Operator<operators>` and `42 == 42` is an {doc}`Expression<expressions>`.
We'll get to all these things soon but I'm just giving you some terminology now for context but I'm just giving you the correct terminology in passing.

The reason I wanted to highlight that `42` is equal to `42` is that this is **not always** the case.
The reason that the values are the same in this case is that integers have {doc}`value type semantics<value-and-reference-semantics>`.
It's too soon to talk about that, but I just wanted you to beware that just because two values look like they are exactly the same doesn't mean that they actually are.

```{exercise}
Give an example of a value.
```

Before we move on to the next chapter I want to show you that there's one special value that's the source of much pain and suffering in programming.
This value denotes the absence of a value and is in C# known as `null`, but is in some other languages known as `nil`.

```{epigraph}
I call it my billion-dollar mistake.

-- Tony Hoare, on the invention of `null` [[TODO REF](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/)]
```

As we shall see in the next chapter which is on {doc}`Data types<data-types>`, `null` can be used in place of many data types.
Let's for example say that you've got a String, meaning a sequence of characters.
Given the C# type system, the compiler isn't actually guaranteeing that you have a String, it is guaranteeing that you either have a String, or you have the absence of one (meaning `null`).

However, on the type level there is no way of ensuring that you only take a particular path through the program if you actually have a string.
We'll talk about this a lot more later but the short story is that we unfortunately have to resort to tons and tons of run-time checks to make sure that our programs don't crash.

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

