# Syntax

Before we can learn how to express our thoughts in any programming language we must learn to distinguish between syntax and semantics.
We must learn to distinguish between how to express a sentence in a language (i.e., syntax) and what that sentence means (i.e., semantics).
By understanding syntactic and semantic validity, we will also learn to distinguish between syntactic and semantic errors.

```{important}
The syntax of a language defines how symbols can be combined to form valid statements or expressions in the language.
```

Syntax defines the *structure* of sentences but does not concern itself with meaning. 
As we shall see in the chapter on [Semantics](#semantics), all *syntactically* valid sentances are not necessarily also *semantically* valid sentences.
Just because some sentence is expressed on the correct form doesn't guarantee that it is meaningful.
Hence the separation between the words syntax and semantics.

```{exercise}
Define the term "syntax" in your own words.
```

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

```{figure} ../../images/syntax-error.png
---
name: syntax-error
---
Syntactically incorrect combinations of symbols are not members of the language.
```

As we've already mentioned however, syntax doesn't just deal with words, but with symbols.
Again, let us use the English language as an example and look at a few sentences.

* Am I here?
* ¿Am I here?

In the example above, the second sentence is syntactically invalid.
However, if we consider the Spanish language, the prepended upside down question mark would be expected and the latter of the two examples would be syntactically correct.

* Estoy aquí?
* ¿Estoy aquí?

```{exercise}
Give an example of a syntax error in a natural language.
```

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
When we find ourselves looking at a program that "doesn't work", we must ask ourselves whether we mean that the program exhibits syntax errors (also known as syntax errors), semantic errors, or combinations of the two.

When dealing with [compiled languages](#compilation) syntax errors are brought to our attention, by the compiler, at, what is known as, compile-time.
When dealing with [interpreted languages](#interpretation) syntax errors are only brought to our attention, by the interpreter, at, what is known as, runtime.
Don't worry, we'll talk more about compilation and interpretation soon.

<!--
- *Grammars (beyond scope).*
- *Övningsuppgifter på detta längre fram när vi har mer kunskap.*
- *Syntax error*
-->

```{exercise}
1. Give an example of a syntax error in a programming language (e.g. C#).
2. Explain why this is a syntax error rather than a semantic error.
```

