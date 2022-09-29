# Semantics

If syntax errors are errors of "form" then semantic errors are errors of "content".
If we don't say what we mean to say then we are making semantic errors.

The perhaps most famous example of semantic meaninglessness is found in the following passage by {cite:t}`chomsky1957`:

> Colorless green ideas sleep furiously.\
> Furiously sleep ideas green colorless.

With this, Chomsky attempts to show that even though both sentences are nonsensical only the latter is grammatically incorrect.
While the first sentence is grammatically correct it is nonsensical without poetic interpretation.

Let us instead talk about programs.
Say that I'm writing a program and that I have a variable containing the fraction `0.4`.
We'll describe what [variables](variables) are soon but bear with me for a moment.

Now let's say that I forget that this represents a fraction and instead assume that it contains a percentage and print it with an appended percentage sign.

```csharp
double fraction = 0.4;
Console.WriteLine($"{fraction}%");
```

This program would print `0.4%` even though I was intending to print `40%`.
This is a semantic error.
It is an error of *meaning*.
It is the wrong program.
There's nothing objectively wrong with the program, it's just the wrong program.

```{exercise}
Can a sentence/statement be both syntactically and semantically incorrect at the same time?
How or why not?
```

Let's think of it in terms of set theory.
Without considering any particular language, the set of possible sentences is infinite.
Let us now consider a particular language and call it $L$.
Some senteces are syntactically valid given the grammar rules of $L$ and are hence members of the set $L$.
However, not all members of $L$ are semantically meaningful.
We might call these objectively semantically incorrect members of $L$.
Further, if we assume that we have some intent of expressing some particular idea, call it $I$, then then not all members $L$ are semantically correct expressions of the idea $I$.

Some [compilers](compilation) can warn you when you're about to make what appears to be common semantic errors.
These are sometimes called "static semantic errors".
The word "static" is used since we're performing static checks, meaning checks at [compile-time](compilation), to find the semantic errors.
As opposed to letting them arise at [run-time](execution).

Automatically detecting all semantic errors in an application is however impossible in theory since semantic errors are inherently subjective.
It all comes down to what you were intending to do.
Unless your intention is specified somehow then the computer cannot possibly know what your intentions are.

```{caution}
Computers do exactly what we tell them to do. They cannot (yet) read our minds.
```

We'll talk a lot more about [requirements](requirements) and [maintainability](maintainability) later but suffice to say for now that figuring out *what to do* is usually a lot harder than *actually doing it*.
The former is mostly a business problem while the latter a technical one.

```{tip}
Understanding what program we should write is usually a lot harder than actually writing that program.
```

<!--
Assume that I am intending to write a program that first asks you for your name and then prints it along with a greeting.
While we have yet to talk about actual C# syntax and semantics in detail, the program might look something like this in C#:

```csharp
Console.WriteLine("Please type your name and then hit ENTER.");
string name = Console.ReadLine();
Console.WriteLine($"Hello, {0}.");
```

Running the program might look something like this:

```bash
> Please type your name and then hit ENTER.
Chris
> Hello, Chris.
```

Let's however assume that I accidentally write the following program

```csharp
Console.WriteLine("Please type your name and then hit ENTER.");
string name = Console.ReadLine();
Console.WriteLine($"Hello.");
```

Which instead behaves like this:

```bash
> Please type your name and then hit ENTER.
Chris
> Hello.
```

This was not the program I was intending to write, and I have thus managed to make a semantic error.
-->

