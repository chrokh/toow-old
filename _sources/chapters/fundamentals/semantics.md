# Semantics

If syntax errors are errors of "form" then semantic errors are errors of "content".
If we don't say what we mean to say then we are making semantic errors.

The perhaps most famous example of semantic meaninglessness is found in the following passage from [Chomsky (1957)](#ref_chomsky_1957_syntactic).

* <a name="ref_chomsky_1957_syntactic"/>Chomsky, Noam (1957). Syntactic Structures. The Hague: Mouton. p. 15.

> Colorless green ideas sleep furiously.\
> Furiously sleep ideas green colorless.

With this, Chomsky attempts to show, as have we, that while both sentences are nonsensical, only the latter is grammatically incorrect.
While the first sentence is grammatically correct it is nonsensical without poetic interpretation.

Let us instead talk about programs.
Say that I'm writing a program and that I have a variable (again, we'll talk about what [variables](#variables) are later) containing the fraction `0.4`.
Now let's say that I forget that this represents a fraction and instead assume that it contains a percentage and print it with an appended percentage sign.

```csharp
double fraction = 0.4;
Console.WriteLine($"{fraction}%");
```

This program would print `0.4%` even though I was intending to print `40%`.
This is a semantic error.
It is an error of *meaning*.
It is the wrong program.

```{caution}
Computers do exactly what we tell them to do, not what we intend for them to do.
```

Some [compilers](#compilation) (we'll talk more about what these are later) can warn you when you're about to make what appears to be common semantic errors.  Semantic errors cannot be discovered automatically
Automatically detecting all semantic errors in an application is however impossible in theory since semantic errors are inherently subjective.
It all comes down to what you were intending to do.
Unless your intention is specified somehow then the computer cannot possibly know what your intentions are.

We'll talk a lot more about [requirements](#requirements) and about [maintainability](#maintainability) later but suffice to say for now that figuring out *what to do* is usually a lot harder than *actually doing it*.

```{hint}
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

