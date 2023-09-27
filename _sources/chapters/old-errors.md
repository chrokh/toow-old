# Errors

```{warning}
Work in progress.
```

As we have seen, there are plenty of mistakes that we can make that cause our programs to fail to compile or even crash at run-time.
There are also plenty of ways (and as always, some disagreements on how) to categorize errors.
However, I am quite fond of using a quadrant diagram (meaning a two-by-two) based on concepts we've already covered.
Let's call it "the error quadrant diagram".
See {numref}`fig:errors`.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:errors
The error quadrants classifies errors in the two dimensions "when" and "what".
```

## The error quadrant diagram

In one dimension we've got the notion of *time*.
When did the error occur?
Did the error occur at *[compile-time](compilation)* or at *[run-time](execution)*?
In other words, did it occur when we compiled the program or when we tried to run it?

In the other dimension we're asking what *type* of error it is.
Is it a *[syntax](syntax) error* or a *[semantic](semantics) error*?
In other words, is it a grammatical error or an error of meaning?
Is it an error in form or in content?

```{note}
Checking for errors at compile-time without running the program, is sometimes called "static code analysis" or "static testing".
Checking for errors at run-time, meaning while running the program, is sometimes called "dynamic code analysis" or "dynamic testing".
We'll talk more about assessing [correctness](correctness) in its own chapter.
```

A *syntax error* means that we've expressed something that is *grammatically* incorrect in the language.
Syntax errors can be discovered at compile-time if we're dealing with a *compiled* language.
If however, we are dealing with an *interpreted* language then the syntax error would not be discovered until run-time, or more specifically when the interpreter attempts to interpret the faulty line.

A *semantic error* means that we've expressed something which doesn't make sense (such as dividing by zero or referring to some other module that doesn't exist).
If we're dealing with a *complied* language then we say that it's a "static semantic error" or a compile-time semantic error.
We say that it's a "static" semantic error since it's discoverable at compile-time as opposed to at run-time.


```{exercise}
In this book we classfied errors using a quadrant diagram.

1. Draw the error quadrant diagram.
2. Explain each quadrant.
3. Give an example of an error in each quadrant.
```

## Type errors

In a later chapter we will discuss the notion of [data types](data-types) but I want you to make a mental note of the fact that type errors can be considered a specific type of semantic errors.
Specifically, the set of type errors is a subset of the set of semantic errors.

Whether they are discovered at compile-time or run-time depends on whether we're dealing with a statically typed or a dynamically typed language.
Or in other words, whether "type checking" is performed during compile-time or run-time.
We will discuss type errors in more detail later but I still wanted to mention it here since it is a *very* important topic.

A "type error" means that we've expressed something where the *types* don't line up, such as attempting to use a letter in arithmetic addition.
All type errors ought to be considered semantic errors but I have chosen to highlight them separately here due to their importance.


## Null-state errors

In the chapter on [data types](data-types) we will discuss null-state static checking.
Nowadays, the C# compiler can help us guarantee that our code is free from run-time errors caused by `null`.
If we choose not to use these features then we may instead be hit with null-state errors at run-time.

Null-state errors ought to be considered semantic errors but I have chosen to highlight them separately here due to their importance.




%## TODO: Unavoidable run-time errors
%
%```{warning}
%This section is a work in progress.
%```
%
%- StackOverflow.
%- OutOfMemoryException.
%- No internet connection.
%- Web request timeout.
%
%```{exercise}
%Is it possible to write programs so that run-time errors cannot happen? Why or why not?
%```

