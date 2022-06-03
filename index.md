---
title: "The Object Oriented Way"
author: Christopher Okhravi, Ph.D.
date: DRAFT
numbersections: true
---


Preface
=======

This is a preface where I test some of the syntax.

This is a reference to the [Syntax](#syntax) chapter.

> **_REMEMBER:_** This is a callout based on a blockquote.

```csharp
class TestClass
{
    static void Main(string[] args)
    {
        // Display the number of command line arguments.
        Console.WriteLine(args.Length);
    }
}
```

The above is a code example with syntax highlighting for C#.

## Welcome
- Welcome to the magical world of programming. Down the rabbit hole we go.

## Preconditions

## Postconditions

## Structure
- Chapters
- Exercises / Tutorials
    - Separate workbook?
- Questions
    - Exam-like questions.

## Free book
- Why?
- Affiliate links.
- Accepting donations.
- Version number

## Technicalities
- Uses C# .NET6 
  - Project template has changed. Code will not work in .NET 5.

## Why OOP?
Why I hope that OO dies in favor of FP and how I hope that this book helps. / Isn’t OOP dead? 

Fundamentals
============

## Sets
- Sets and members.
- Subsets

## Functions
- Domain
- Co-domain
- Image

## Computation
- Paradigms (imperative => procedural / oo, declarative => functional / logic)
- Brief history of computing
  - Memory, disk, processor

## Source code


## Markup


## Syntax

Before we can learn how to express our thoughts in any programming language we must learn to distinguish between syntax and semantics.
We must learn to distinguish between how to express a sentence in a language (i.e., syntax) and what that sentence means (i.e., semantics).
By understanding syntactic and semantic validity, we will also learn to distinguish between syntactic and semantic errors.

> **DEFINITION:**
The syntax of a language defines how symbols can be combined to form valid statements or expressions in the language.

Syntax defines the *structure* of sentences but does not concern itself with meaning. 
As we shall see in the chapter on [Semantics](#semantics), all *syntactically* valid sentances are not necessarily also *semantically* valid sentences.
Just because some sentence is expressed on the correct form doesn't guarantee that it is meaningful.
Hence the separation between the words syntax and semantics.

<!--
Theoreticians have studied syntax in many ways.
In computing we tend to talk about generative grammar, an idea proposed by Noam Chomsky.
See e.g. [Chomsky (1957)](#ref_chomsky_1957_syntactic).

The syntax of a given language is defined by what we refer to as a grammar.
-->

Consider the following three sentences.
Which of these sentences are syntactically invalid given the rules of English?

* I am here.
* Here am I.
* I here am.

The last sentence is grammatically incorrect and hence syntactically incorrect.
The issue is not that the sentence in question does not have meaning (meaning that it is semantically incorrect or meaningless).
The issue is that it cannot possibly have meaning in the language since it is not a member of it.
In a sense you can think of the sentence as being "unreadable".

Think of a language as a (possibly infinite set) of members where each member corresponds to a valid sentence in the language.
The sentence "I here am" is not a member of this set and does thus not constitute a valid sentence in the language English.

![Syntactically incorrect combinations of symbols are not members of the language.](../assets/syntax/syntactic-error.png)

As we've already mentioned however, syntax doesn't just deal with words, but with symbols.
Again, let us use the English language as an example and look at a few sentences.

* Am I here?
* ¿Am I here?

In the example above, the second sentence is syntactically invalid.
However, if we consider the Spanish language, the prepended upside down question mark would be expected and the latter of the two examples would be syntactically correct.

* Estoy aquí?
* ¿Estoy aquí?

Let's talk about C# instead.
While we will discuss [operators, expressions](#operators-and-expressions), and [statements](#statements) in much more detail later let us look at a few trivial examples that ought to make sense to you irrespectively of your level of previous mathematical knowledge.

If we are looking to add the two numbers 1 and 2, then we must (as in the example below) state the first number followed by the operator and then the second number.
This is known as infix notation, and the addition operator (`+`) is thus an infix operator.

```csharp
1 + 2    // Syntactically valid expression in C#.
```

If we instead tried to use what is known as prefix notation and first stated the addition operator followed by the first number and then the second number we would have an example of a syntactically invalid expression in C#.

```csharp
+ 1 2    // Syntactically invalid in C#.
```

Syntactic errors are known as syntax errors.
When we find ourselves looking at a program that "doesn't work", we must ask ourselves whether we mean that the program exhibits syntactic errors (also known as syntax errors), semantic errors, or combinations of the two.

When dealing with [compiled languages](#compilation) syntax errors are brought to our attention, by the compiler, at, what is known as, compile-time.
When dealing with [interpreted languages](#interpretation) syntax errors are only brought to our attention, by the interpreter, at, what is known as, runtime.
Don't worry, we'll talk more about compilation and interpretation soon.

<!--
- *Grammars (beyond scope).*
- *Övningsuppgifter på detta längre fram när vi har mer kunskap.*
- *Syntax error*
-->

### Questions ✏
1. What is syntax?
2. Give three different examples of syntax errors in a natural language.
2. Give three different examples of syntax errors in C#.


## Semantics

If syntax errors are errors of "form" then semantic errors are errors of "content".
If we don't say what we mean to say then we are making semantic errors.

The perhaps most famous example of semantic meaninglessness is found in the following passage from [Chomsky (1957)](#ref_chomsky_1957_syntactic).

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

> Computers do exactly what we tell them to do, not what we intend for them to do.

Some [compilers](#compilation) (we'll talk more about what these are later) can warn you when you're about to make what appears to be common semantic errors.  Semantic errors cannot be discovered automatically
Automatically detecting all semantic errors in an application is however impossible in theory since semantic errors are inherently subjective.
It all comes down to what you were intending to do.
Unless your intention is specified somehow then the computer cannot possibly know what your intentions are.

We'll talk a lot more about [requirements](#requirements) and about [maintainability](#maintainability) later but suffice to say for now that figuring out *what to do* is usually a lot harder than *actually doing it*.

> Understanding what program we should write is usually a lot harder than actually writing that program.

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

### Questions ✏

1. TODO
2. TODO
3. TODO


## Compilation
- Compilation error.
- Övningsuppgifter på detta längre fram när vi har mer kunskap.
- Design principle: Prefer compile time errors over runtime errors.

## Interpretation
- Compile time error

## Evaluation
- Example: Printing “hello world”.
- Use .NET6 template so we don’t need to care about all the static nonsense.
- Runtime error.
- Övningsuppgifter på detta längre fram när vi har mer kunskap.

## Comments
- Also: executable comments. Generating e.g. comments.
- Brain teaser: Is the code right, and the code wrong, or the comment right and the code wrong.

## Values
- Discuss how “hello world” is a value.
- Exemplify how “3” is another value.
- Literals.
- Booleans, strings, numbers, characters.
- Suggest that there’s more complexity (value vs reference) but that we’ll return to this.
- Null
  - The absence of a value.
  - Billion dollar mistake.

## Data types
- Discuss how “hello world” is a string and how the method WriteLine is expecting a string.
- The GetType() method.
- Type safety and Type errors
- Later we will talk about making impossible states impossible.

## Type inference


Procedural programming
======================

## Variables
- Put “hello world” in a variable and read it from the user.
- Declaration, assignment, initialisation
- Assignment is right-associative.
- Declaration without assignment leads to null.

## Statements
- Declaration statements
- Assignment statements
  - What is this? Can only find single instance in documentation.
  - https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/statements
  - Expression statements $>$ Assignment statements
  - Expression statements
    - https://www.codeproject.com/Questions/5318889/Is-the-following-code-an-expression-statement
    - https://stackoverflow.com/questions/3807192/why-do-assignment-statements-return-a-value
    - Difference between expression and expression statement is the semicolon. I.e. a standalone expression is a statement expression.
- Selection statements
- Iteration statements
- Mention that there are more types such as
  - Jump statements
  - Await and yield

## Operators and Expressions
- Arithmetic
- Concatenation
- Equality
  - Value equality vs Reference equality
- Order

## Type conversions
- https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/types/casting-and-type-conversions
- Implicit conversions
- Explicit conversions (casts)
- User-defined conversions

## Arrays
- Highlight the problems that we will solve later.
- Accessing individual elements vs iterating. Lead into iteration chapter.
- Bracket notation.
- Will look at lists later.

## Syntactic sugar
- Expression-bodied members

## Indentation
- Significant in some languages.
- Prepare for coming chapters.

## Selection
- if / else / else-if
- switch case

## Iteration
- while
- for
- foreach
  - Also works with IEnumerable but we’ll talk about this later.
- Infinite loop. Will talk about stack overflow later.

## Constants
- Even if you cannot re-assign to a variable, the variable could be mutable.

## Mutability
- Example: Arrays are mutable.

## Value and reference semantics
- Implications for equivalence, mutability, and copying (passing and changing).
- Reference types that behave like value types
- Example: Arrays are passed by reference and are mutable.

## Static methods (procedures)
- Subroutine on Wikipedia
- Static methods in C\#
- Method signature, Parameters/arguments, Return type
- Verbs or implicit verbs where Name would usually get or set name.
- Void (a return type)

## Overloading

## Recursion
- A procedure may call itself (more advanced later?).
- Base case, recursive case.

## Namespaces, scope and dot notation
- What you can call \& What you can declare (available / occupied).
- The “using” keyword.
- Example: Console.WriteLine lives inside of System. Only possible if importing System or explicitly referring to it.
- Use terminology from docs. Show that you can access a named scope with dot-notation. (https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/basic-concepts)
- Explicit vs implicit access. Resolving ambiguity by explicitly stating (even your own) namespace.
- Note: Dot notation is also used for accessing members of a class but we’ll come back to this.

## Exceptions (part 1)
- Unrecoverable states.
- Try / catch.
- Examples: IndexOutOfRange, DivideByZero, StackOverflow.

## Stack traces
- Reading errors.



Object oriented programming
===========================

## Classes and objects
- Equivalence (i.e. two structurally equivalent objects are not necessarily the same).
- Public instance variables (objects can hold state).
- UML class diagrams (start early and introduce piece by piece
- Usually nouns. Methods are usually verbs.

## Constructors
- Constructor overloading.
- Use it to set defaults.
- this keyword.

## Instance methods
- Overloading
- Signatures.
- Void is a return type.
- Recursion.
- Late binding, Dynamic binding? Michaelis (2020)
- Usually verbs. Or implied verbs as discussed in procedures.

## Access modifiers (basic).
- Public / private (beware of the same-class caveat with private).
- Principle: Encapsulation / Information hiding (coupling, hide what changes)
    - <https://stackoverflow.com/questions/13913174/what-are-the-differences-between-information-hiding-and-encapsulation>
- Principle: The state space of a type should equal the state space of whatever domain concept it is modeling.
- Modifiers for variables, methods and classes

## Properties
- Specific to some languages.
- Synonyms: Getters / Setters, Accessors, Mutators.
- Uniform access principle (use Robert Martin as source?)

## Object composition (through instantiation).

## Object composition (through injection).
- Inject through constructor or through instance method.
- Principle: Inversion of control (dependency injection).
- Will talk about injection with abstraction later.

## Interfaces
- Subtype polymorphism
- UML class diagram notation.
- Använd exempel med skruvar och muttrar. Givet en mutterdimension finns det flera skruvar som passar. Ytterligare ett exempel är skruvhuvuden. Huvudet förblir detsamma vilket betyder att samma skruvmejsel kan användas. Kanske är det ett bättre exempel eftersom dessa skruvar kan användas på olika sätt och till olika effekt. Tänk t.ex. skruva in i en mutter (ej vass) vs skruva in i en vägg (vass).
- Design principle: Replace conditional with polymorphism

## Inheritance
- Including abstract classes.
- UML class diagram notation.
- White-box reuse (as opposed to black-box which is composition) (Gamma et al)
- Object type (lowercase is an alias for the same as the uppercase)

## Overriding

## Hiding
- Not overriding ("new" modifier)
- Called shadowing?

## Access modifiers (advanced)
- Protected

## Type conversions (of objects)
- https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/types/casting-and-type-conversions
- Implicit conversions
- Explicit conversions (casts)
- User-defined conversions

## Exceptions (part 2) / Custom exceptions
- All exceptions derive from System.Exception.
- Custom exceptions.

## Static
- Classes and methods

## Prototypes
- Prototype-based OO languages.
- Allude to the fact that there’s something called Prototype Design pattern.

## Object composition (injection part 2)
- Principle: Depend on abstractions not on concretions.
- In procedural programming abstract modules depend on concrete modules, but in object oriented programming abstract modules can depend on abstract modules.

## Base class library
- .NET Base class library.
- Other languages have other base libraries.

## Structure types (struct)

## Generics (parametric polymorphism)
- Type constructor
- Type parameter
- Type constraints

## Variance
- Invariance, Covariance, Contravariance


Object oriented design and beyond
=================================

## Requirements
- Are vague and in flux.

## Maintainability
- ISO definition. 
- User requirements is the hard part.
- Being able to change your program.

## Code smells and anti-patterns
- Spaghetti code
- Functional decomposition
- The blob / God class

## Coupling
- https://learning.oreilly.com/library/view/code-complete-second/0735619670/ch05s03.html#kinds_of_coupling

## Cohesion
- What do we want instead of coupling?

## Refactoring
- Definition from Fowler.

## Design principles

## Single responsibility principle (SRP)

## Interface segregation principle (ISP)

## Making impossible states impossible / Type safety
-  Domain modeling (there's no objective right or wrong, there's just your domain)
- Types over checks. (What's the term I discussed with rtfeldman on twitter?)

## Liskov substitution principle (LSP)

## Open-closed principle (OCP)

## Dependency inversion principle (DIP)
- Do we need to talk about this again since DI was already handled in Part 2?

## Composition over inheritance
- White-box/black-box reuse. Breaking encapsulation / information hiding (cuz protected, see Gamma et al, 1994, kap 1).
- Re-use implementation horizontally (strategy pattern video, sandi metz?).
- En student skrev om Kentaur (halv människa halvt djur) som exempel på horisontell delning av kod. Bra exempel. Använd själv Mermaid som exempel för att inte sno dennes exempel rakt av.
- Changing behaviour at runtime vs compile time.
- Exercises:
    - Draw two class diagram in UML that show how a solution that uses inheritance might be refactored into one that uses composition?

## Design patterns

## Strategy pattern

## Delegates

## Bridge pattern
Strategy pattern as it should be used.

## Lambdas
- Statement lambdas
- Expression lambdas

## Abstract factory pattern

## Iterator pattern

## Enumerators
- Yield keyword
- IEnumerable
- IEnumerator

## Indexers
Remove this chapter?

## LINQ
- Standard query operators (https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/standard-query-operators-overview)
- Relate to: Relational alegbra. Functional programming and strategy pattern.

## Observer pattern

## Events

## Visitor pattern

## Pattern matching


# References
* <a name="ref_chomsky_1957_syntactic"/>Chomsky, Noam (1957). Syntactic Structures. The Hague: Mouton. p. 15.



