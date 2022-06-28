(compilation)=
# Compilation

```{warning}
This chapter is a work in progress.
```

A compiler is a program that translates code written in a source language to code written in a target language.
It is essentially a one-way translator.
In other words, a compiler translates text written in some syntax to text written in some other syntax.

```{important}
A compiler translates text written in some syntax to text written in some other syntax.
```

```{figure} ../images/compiler.svg
:name: fig:compilation
A compiler translates code written in one language to code written in another language.
```

You will often hear people talk about "compiled" programming languages and "interpreted" programming languages.
However, in theory, a language isn't either compiled or interpreted [{numref}`Chapter %s<interpretation>`].
Interpreters and compilers can be built for any language.
A language is simply a language.
In practice, however, most languages are associated with either a compiler or interpreted.
This is why we in everyday language tend to refer to a language as being either compiled or interpreted.
C#, the language used in this book, is usually compiled.

```{exercise}
What is a compiler?
```

```{exercise}
In what sense is a language not *either* a compiled or an interpreted language?
```


## Source code

The word "compiler" is usually used to describe programs that translate programs written in "high-level" languages, to programs written in "low-level" languages.
C#, the language used in this book, is, what's known as, a "high-level programming language".

Other examples of high-level languages are Haskell, Python, JavaScript, Java, Ruby, C, C++, R, and so forth.
The list goes on and include a vast array of modern programming languages.
Of course there are developers who work in low-level languages even today, but if you're interested in taking that path then you're reading the wrong book :)
<!-- TODO: Write more about real-world use cases for low-level languages. -->

If we had to write all our programs in binary there is simply no way that we would have gotten as far as we have today by this time.
As application level developers we don't have to worry about machine code.
Instead we write our programs in high-level languages and use compilers or interpreters to convert our programs to machine code in order to allow them to be executed on actual machines.

When we write code in these high-level languages we are writing what is known as "source code".
Compilers are then used to convert the source code to machine code.
Source code is human readable and machine code is machine readable.

```{figure} ../images/intermediate-language.svg
:name: fig:intermediate-language
Source code -> Intermediate language -> Machine code
```

There's a lot more to compilation than what we've covered here.
What's worst is that we're pretending that it's a simple as pushing high-level code such as C# into a compiler and getting binary machine code out.
In reality it isn't this simple.
As en example, when you compile a C# program you don't actually get a binary machine code file, you get code expressed in what's known as an "intermediate language" which, given the existence of the .NET runtime can be turned into machine code upon execution.

In fact, it isn't even fair to call C# a compiled language.
The .NET compiler converts the source code into an executable expressed in what in the case of .NET is called the Common Intermediate Language (CIL).
When we run the executable portions of the CIL code is converted to machine code by a Just-in-time (JIT) compiler.
This last step is akin to the process of interpretation [{numref}`Chapter %s<interpretation>`].

All this complication is however beyond the scope of this book.
At least in it's current state.

```{admonition} Donations
:class: attention
Please consider [donating](https://patreon.com/christopherokhravi) to allow this work to continue.
Thank you.
```


## Abstraction

While the original idea of the compiler was to convert high-level languages to low-level languages it should be noted that the word "compiler" is certainly also used to describe programs that convert between high-level languages.

Consider for the languages TypeScript, ReasonML, and Elm. 
All these three languages can be converted to the high-level language JavaScript by means of their respective compilers.

So the idea of compilers is deeper then simply not having to write machine code.
The idea is abstraction.
This is something we'll talk a lot more about in later chapters since abstraction is an immensely important topic in programming.
The idea is to write programs in a language that's sufficiently abstract so that we don't have to worry about irrelevantly minute details.

Think back to the chapter on algorithms [{numref}`Chapter %s<algorithms>`].
To be able to easily express an algorithm, you need a language that helps you focus on the details that matter.
If, for example, I'm writing a pancake batter recipe then I don't want to have to concern myself with the fact that you have to move your hands in order to pick up the bowl.
Or the fact that you have to open up the milk carton if it's not open.
Or fetch another carton of milk if the one you have ran out before you've managed to pour the expected amount into the bowl.
And so forth.
This is the idea of a high-level language, and this is the idea of abstractions.


```{exercise}
Why are compilers useful? Why don't we just write programs in low-level languages?
```


## Compilation errors

There are plenty of mistakes that we can make that prevent our programs from compiling.
There are multiple ways of categorizing compilation errors but one way is to divide them into:

- Syntax errors [{numref}`Chapter %s<syntax>`],
- Static semantic errors [{numref}`Chapter %s<semantics>`], and
- Type errors [{numref}`Chapter %s<data-types>`].

Note that we've already talked about syntax and semantic errors in previous chapters, and we'll talk about type errors in an upcoming chapter.
In the context of this chapter all these errors prevent the compiler from translating our program from the input to the output language.

A *syntax error* means that we've expressed something that is *grammatically* incorrect in the language.

A *semantic error* means that we've expressed something which doesn't make sense (such as dividing by zero or referring to some other module that doesn't exist).
We say that it's a "static" semantic error since it's discoverable at compile-time as opposed to at run-time.
More about the difference between compile-time and run-time errors in a moment.

A *type error* means that we've expressed something where the *types* don't line up, such as attempting to use a letter in arithmetic addition.
All type errors ought to be considered semantic errors, but I have chosen to list them separately here due to their importance.


```{exercise}
What are compilation errors?
```


## Compile-time vs run-time

If an error occurs when we are attempting to compile then it's a compilation error, also known as compile-time error, since it occurred at compile-time.
If, on the contrary, an error occurs *when the program is running* then it's a run-time error since it occurred during run-time.

```{exercise}
What do we mean when we say that something happens at *compile-time* as opposed to at *run-time*?
```

At first glance it might seem weird that a program that compiles still can crash when it's actually run.
Unfortunately this is however the case and there are a multitude of reasons as to why this might happen.

A commonly cited run-time error is division by zero.
In mathematics, division by zero is undefined which means that many programming languages (C# included) throws, what's known as, an exception [{numref}`Chapter %s<exceptions>`].
But how could this happen?
Can't the compiler figure out that we are dividing by zero and tell us by emitting an error?
Well, only in some very direct cases.

Consider a program that simply does nothing but dividing the literal integer $42$ by the literal integer $0$ and printing the result to screen.

```csharp
Console.WriteLine(42 / 0);
```

This program cannot be compiled.
If we try to then we will get a compilation error and no program.
The compiler is smart enough to realize that we will always divide by zero and refuses to construct the program since it will crash at run-time whenever this piece of code is reached.
The error might say something like:

```
Compilation error (line 7, col 19): Division by constant zero
```

However, by adding the tiniest bit of indirection [{numref}`Chapter %s<indirection>`] we can trick the compiler to compile the program and suddenly we have program that crashes at run-time instead of compile-time.
I know we haven't talked about variables yet, but by storing our constant zero in a variable and then using that variable in the division we've introduced enough indirection for the compiler to not dare guaranteeing that our program shouldn't be compiled.
When we run the program we get what is known as an Exception [{numref}`Chapter %s<exceptions>`] and we'll talk more about these later.
The exception might look something like:

```
Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
```

Note how the compilation error occurs when we *compile* the program, while the exception occurs when we *run* the program.

Another way to get a division-by-zero error at run-time would be to ask the user of the program to input a number.
In this case there is literally no way for the compiler to know what the user is going to type.

It should be noted that languages are very different and *what works in some languages might not work in others*.
It all comes down to how the syntax and semantics of the language are defined.
It is entirely conceivable that a language could exist that didn't allow you to divide numbers unless the dividend was of a data type that guaranteed that it is non-zero.

```{exercise}
Why can a program that doesn't have compilation errors still fail at run-time (meaning upon execution)?
```


## Prefer compile-time errors

The sooner we can discover a mistake, the easier it will be to fix it.
So tautologically we conclude that compile-time errors should be favored over run-time errors.
Indeed we might even call this a "design principle".
We'll talk about what design principles [{numref}`Chapter %s<design-principles>`] are later.
But for now, you can think of design principles as ideas that aim to improve the maintainability of code.

```{admonition} Design principle
:class: tip
Prefer compile-time errors over run-time errors.
```

Saying that compile-time errors are preferable over run-time errors solely for the fact that they appear earlier would however be to miss the mark completely.
The key thing to realize is that if you can move a run-time error to compile-time that means that you're guaranteeing that this error doesn't ever happen when your program is running.

I realize that we haven't talked about enough concepts for this argument to fully fly yet, so we'll return to it when discussing the design principle "types over tests" [{numref}`Chapter %s<types-over-tests>`].
The key point is simply that instead of designing programs that might crash at runtime, we should design programs that cannot even be compiled if they run the risk of throwing run-time exceptions.

Said differently, a program that contains potential run-time errors must be meticulously searched for all possible places in which it can crash so that a crash can be prevented and even then, there are no guarantees.
Contrast this to a program that contains compile-time errors.
This program cannot even be created let alone ran.

```{exercise}
Why should we prefer compile-time errors over run-time errors?
```

<!-- TODO: Add some kind of analog example here. -->


## `dotnet` binary

```{warning}
This section is under construction.
```

1. `dotnet new console`
2. `dotnet compile`
3. Look at CIL code.

