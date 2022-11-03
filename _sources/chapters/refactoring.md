# Refactoring

## Motivation

Writing software to solve a problem is only half of the challenge.
Beyond solving the immediate problem, there are two additional challenges.

```{figure} https://images-na.ssl-images-amazon.com/images/I/51ttgxwzArL._SY445_SX342_QL70_ML2_.jpg
---
figclass: margin
---
"Refactoring: Improving the design of existing code" {cite:p}`fowler1999`.
```

1. Maintainability.
2. Performance.

In this book we've emphasized the importance of writing [maintainable](maintainability) code.
But in other contexts, its important to write performant code.
Performance means taking the space time complexity into consideration.
Meaning, how fast does the code run (this is the time-part) and how much memory does it use (this is the space-part).

In this book we are not concerned about performance, but we are concerned about maintainability.
Regardless of whether you are rewriting your code to improve maintainability or to improve performance, this process is known as "refactoring".


## Definition

The word "refactoring" is used both as a noun and as a verb.
In the classic work "Refactoring: Improving the Design of Existing Code" {cite:p}`fowler1999`, Martin Fowler defines the two terms like this:

% TODO: Make sure that these quotes are from 1999 and not from a later edition!
```{epigraph}
Refactoring (noun): a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.

Refactoring (verb): to restructure software by applying a series of refactorings without changing its observable behavior.

-- {cite:t}`fowler1999`
```

Notice how Fowler defines the word only in terms of maintainability and not performance.
Nevertheless, the word "refactoring" is today often used to also refer to performance increasing changes that doesn't alter observable behavior.

Notice also how he uses the term "observable behavior".
We are changing the software without changing the observable behavior.
Why does this matter?
Well, because if we are changing the observable behavior then we are not refactoring.
If we are changing the observable behavior then we are changing the [requirements](requirements) (and thus the [validation](validation) and [verification](verification) criteria) and are essentially writing a new program.

Of course it happens that requirements change.
That is the whole reason for discussing [maintainability](maintainability).
But, the art of refactoring does not allow the changing of requirements.
To refactor is to rewrite the code so that the observable behavior does not change, while still improving it.
Either in terms of maintainability or in terms of performance.


## Examples

In the classic work "Refactoring: Improving the Design of Existing Code" {cite:p}`fowler1999`, Martin Fowler defines a catalog of 72 refactorings that we often do in object oriented programming.
They were not inventions of his own, but rather a categorization of refactorings that were already prevelent in the community.

We haven't yet learned enough about object oriented programming to talk about all of them.
Actually, we won't talk about all of them as refactorings in this book, since many of the refactorings are very mundane.

- Add Parameter
- Parameterize Method
- Extract Class
- Inline Temp
- Replace Error Code with Exception
- Rename Method

The first two refactorings I think gives an indication of just how much attention to detail Martin Fowler pays.
He seems to have strived to really tease out the different reasons for why one wants to perform a particular change.

In the refactoring known as "add parameter" we essentially find ourselves in a situation where when you want to change a method, you need additional data.
To get this additional data you simply add another parameter to the method.

But what is then the refactoring named "parameterize method"?
Sounds like that's exactly the same refactoring.
But no.
Here Fowler is saying that sometimes you find yourself in a situation where you have multiple methods doing similar things.
When studying these more closely you conclude that they can actually be merged into a single method if you parameterize what varies.
What does "parameterize what varies" mean?
It means taking part of the variation and representing it as data.
Perhaps you can recall that this is actually something that we've already discussed when discussing [methods](parameterizing-what-varies).

In later later chapters we *will* talk about a few key refactorings in more detial.
These ideas have shaped the way we think about what object oriented code ought to look like today.

- [Replace conditional with polymorphism](replace-conditional-with-polymorphism).
- [Replace inheritance with delegation](composition-over-inheritance) (a.k.a. composition over inheritance).


## Exercises

```{exercise}
What is refactoring?
```

```{exercise}
Give an example of a refactoring?
```

```{exercise}
In what sense can the word "refactoring" both be considered a *noun* and a *verb*?
```

```{exercise}
Why does refactoring matter?
```

```{exercise}
How can we use refactoring to improve the [maintainability](maintainability) of our code?
```

```{exercise}
In {cite:t}`fowler1999`, "refactoring" as a noun is defined as
"a change made to the internal structure of software [...] without changing its observable behavior".
What does the term "observable behavior" mean?
Why can't we just say "without changing the code"?
```

