(errors)=
# Errors

```{warning}
This chapter is a work in progress.
```

As we have seen, there are plenty of mistakes that we can make that cause our programs to fail to compile or even crash at run-time.
There are also plenty of ways (and as always, some disagreements on how) to categorize errors but I am quite fond of using a four-by-four based on concepts we've already covered.
Let's call it "the error quadrant diagram".
See {numref}`fig:errors`.

```{figure} ../images/errors.svg
:name: fig:errors
The error quadrants classifies errors in the two dimensions "when" and "what".
```

Let's quickly recap the types of errors that we've talked about and put it into context of the error quadrant diagram.

In one dimension we've got the notion of time.
When did the error occur?
Did the error occur at *compile-time* [{numref}`Chapter %s<compilation>`] or at *run-time* [{numref}`Chapter %s<execution>`]?
In other words, did it occur when we compiled the program or when we tried to run it?

In the other dimension we're asking what type of error it is.
Is it a *syntax error* [{numref}`Chapter %s<syntax>`] or a *semantic error* [{numref}`Chapter %s<semantics>`]?
In other words, is it a grammatical error or an error of meaning?
Is it an error in form or in content?

In a later chapter we will discuss the notion of data types [{numref}`Chapter %s<data-types>`] but I want you to make a mental note of the fact that type errors can be considered a specific type of semantic errors.
Whether they are discovered at compile-time or run-time depends on whether we're dealing with a statically typed or a dynamically typed language.
Or in other words, whether *type checking* is performed during compile-time or run-time.
We will discuss type errors in more detail later but I still wanted to mention it here since it is a *very* important topic.

Checking for errors at compile-time without running the program is known as "static code analysis" or "static testing".
Checking for errors at run-time, meaning while running the program, is sometimes known as "dynamic code analysis" or "dynamic testing".

```{exercise}
In this book we classfied errors using a quadrant diagram.

1. Draw the error quadrant diagram.
2. Explain each quadrant.
3. Give an example of an error in each quadrant.
```

A *syntax error* means that we've expressed something that is *grammatically* incorrect in the language.
Syntax errors can be discovered at compile-time if we're dealing with a *compiled* language.
If however, we are dealing with an *interpreted* language then the syntax error would not be discovered until the interpreter attempts to execute the faulty line.

A *semantic error* means that we've expressed something which doesn't make sense (such as dividing by zero or referring to some other module that doesn't exist).
If we're dealing with a *complied* language then we say that it's a "static semantic error" or a compile-time semantic error.
We say that it's a "static" semantic error since it's discoverable at compile-time as opposed to at run-time.
More about the difference between compile-time and run-time errors in a moment.

A *type error* means that we've expressed something where the *types* don't line up, such as attempting to use a letter in arithmetic addition.
All type errors ought to be considered semantic errors, but I have chosen to list them separately here due to their importance.




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
The key point is simply that instead of designing programs that might crash at run-time, we should design programs that cannot even be compiled if they run the risk of crashing at run-time.

Said differently, a program that contains potential run-time errors must be meticulously searched for all possible places in which it can crash so that a crash can be prevented and even then, there are no guarantees.
Contrast this to a program that contains compile-time errors.
This program cannot even be created let alone ran.

```{exercise}
Why should we prefer compile-time errors over run-time errors?
```

<!-- TODO: Add some kind of analog example here. -->


## Unavoidable run-time errors

```{warning}
This section is a work in progress.
```

- StackOverflow.
- OutOfMemoryException.
- No internet connection.
- Web request timeout.

```{exercise}
Is it possible to write programs so that run-time errors cannot happen? Why or why not?
```

