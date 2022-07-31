# The Object Oriented Way

Welcome to _**The Object Oriented Way: Everything you need to know**_.
This book takes you all the way from elementary fundamentals to the most sophisticated ideas.
Our goal is for this book to be the number one resource for learning object oriented programming using C#.


```{admonition} Top tip
:class: tip
Every bite-sized chapter builds upon the previous ones so if something is too difficult, follow the references backwards and read earlier chapters.
Start with whatever peaks your interest.
Browse the table of contents, or use the search box.
```

## What you will learn

1. How to **solve problems** in an object oriented style.
2. How solutions from **other paradigms** are approached in object oriented programming.
3. The most important design **patterns**, design **principles**, and code **smells**.
4. How design patterns reveal **inherent limitations** of object oriented languages.
5. Why object orientation ought to eventually be replaced by functional programming.


```{warning}
This book is a *work in progress*.
If you find errors or have suggestions you are more than welcome to [submit an issue](https://github.com/chrokh/the-oo-way/issues/new) in the book's repository on GitHub.

In the table of contents, chapter titles marked with 🟢 are mostly completed but might be missing images and some content.
Titles marked with 🟠 contain some content but is very much a work in progress.
Titles marked with 🔴 only contain a rough todo list and are not ready for consumption.
```


## Why this book

In this book we unapologetically untangle everything that needs to be untangled to establish a *useful* understanding of object oriented programming.
No questions may be left unanswered if they help you understand why and thereby can become a better programmer.

I teach two undergraduate courses on object oriented programming using C#.
After having been involved in object oriented education for about 10 years I figured it was time to write a book that teaches object oriented programming **the way I wish I would have been taught it**.

In this book we're aiming for **breadth rather then depth**.
It is my belief that our understanding anything is significantly improved by exploring what is in the periphery of that thing.
We're not going to talk about memory management or vtables.
There's far too much ground to cover to get bogged down by such details.

It should be noted that many of the ideas in this book are not *only* related to object-oriented programming but apply to multiple paradigms.
Think of it this way: This book contains all the ideas that I argue are useful to know if you want to become a top level object oriented programmer.


## About the author

```{figure} images/author.png
:name: fig:author
:scale: 50%
:align: right
```

My name is Christopher Okhravi and I'm a [senior lecturer](https://katalog.uu.se/profile/?id=N12-1461) at the department of Informatics and Media at Uppsala University.
My [Ph.D. thesis](http://urn.kb.se/resolve?urn=urn:nbn:se:uu:diva-417037) concerns the use of compositional contracts for modeling policy interventions aimed at stimulating antibiotic development.
I also run a fairly successful [YouTube channel](https://youtube.com/c/christopherokhravi), with well over 100,000 subscribers, on the topic of programming.


## What you must know

If you read this book from the first page to the last then you will be given all the tools you need to understand the contents within.
We start with the fundamentals and then build from there.

```{note}
You don't need to know **anything** about programming to read this book.
We are here to learn.
```

You are however expected to have some understanding of elementary algebra.
You must be able to read a mathematical function such as $f(x) = x * 2$.
If you think of yourself as "not a math person", don't worry, there is (almost) no math in this book.
Nevertheless, math is an excellent tool when it comes to reason about things in a more precise manner.
It is not complicated and you, yes you, will understand.

% TODO: How about just introducing a chapter that explains what a mathematical function is?


## Join the community

I am looking into creating a private community where we can discuss the contents with me and other readers of this book.
Unless the donations for this book are increased this might have to be a paid community to be sustainable.
If you have thoughts around the creation of a community, please feel free to reach out to me at christopher.okhravi@gmail.com.

To enable the creation of a private community, please consider [supporting my work](https://patreon.com/christopherokhravi).


## Video lectures

Eventually I will release video lectures for each chapter in this book.
Feel free to subscribe to my [YouTube channel](https://youtube.com/c/christopherokhravi) and hit the bell to be notified when this happens.

To enable the production of video lectures, please consider [supporting my work](https://patreon.com/christopherokhravi).


%## Audiobook
%
%If there's an interest in it, and it looks like it would be useful, I aim to record the whole book, when it is finished, as an audio book.
%
%To enable the production of an audiobook, please consider [supporting my work](https://patreon.com/christopherokhravi).


## Free book

I am publishing this book online for free because object oriented programming has been around for so long that it's time to make sure everyone has free access to these ideas.
If you believe in my mission then I truly appreciate if you [support my work on Patreon](https://patreon.com/christopherokhravi).

To enable the continued development of this book, please consider [supporting my work](https://patreon.com/christopherokhravi).

I must also disclose that some links in this book are affiliate links which means that I make a small commission if you happen to purchase whatever is behind the link.
However, all links in this book are here for pedagogical reasons and pedagogical reasons only.

If you are reading this as a student of Uppsala University then most of the linked literature is available online *for free* via [Uppsala University Library](https://ub.uu.se).
If studying at a different university, do check whether your library has a similar arrangement.


## Contributions

If you appreciate what I do here, there are three ways to help.

1. Share the book with a friend or on social media.
2. Submit feedback via [GitHub](https://github.com/chrokh/the-oo-way/issues/new).
3. Send your donation via [Patreon](https://patreon.com/christopherokhravi).


## Technicalities

The code in this book is written in C# 10 which means that you need at least .NET 6.
Earlier versions of .NET did, for example, not support what is known as top-level statements so if you are following an earlier version of .NET and want to follow along with the examples in this book you might have to adapt them.
Please refer to the [documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/configure-language-version) for more information on versions.

```{important}
Use C# 9.0 and .NET5 or .NET6.
```

This book does not cover how to install .NET and a text editor or what is known as an Integrated Development Environment (IDE).
Instead we recommend that you follow the [installation instructions](https://docs.microsoft.com/en-us/dotnet/core/install/) for your platform given in the official documentation.

```{seealso}
If you are interested in the history of C#, what it looked like in the beginning, and what has changed with each version, there's a page in the documentation called [The history of C#](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history).
```

If you are new to programming I would recommend that you either use Visual Studio or Visual Studio Code.
If you have been programming before and already have a favourite text editor such as Sublime Text, Atom, Vim, or Emacs then I highly recommend that you stick to that editor and simply compile and run your files using the `dotnet` binary.
We will talk more about the compilation [{numref}`Chapter %s<compilation>`] and execution [{numref}`Chapter %s<execution>`] later.

All programs that we write in this book are, what is known as, console applications.
Meaning that they run inside a Command Line Interpretor (CLI) such as `bash` or `zsh` on OS X, or `cmd.exe` on Windows.
Don't worry if not all of this makes sense yet.


## Why object oriented

It is my belief that most programmers will eventually switch to functional programming [{numref}`Chapter %s<paradigms>`] unless artificial intelligence (AI) manages to replace us all before.
Why do I believe this?
Because I hold that the functional programming paradigm is superior to that of object oriented programming.

Why do I believe that functional programming is superior?
Because concepts such as higher order functions, currying, pattern matching, algebraic data types, and parametric polymorphism are at the heart of functional programming.
The object oriented concepts of classes and subtype polymorphism are simply not powerful enough in comparison.
%Mixing data and methods was simply not the best idea.

So why bother learning an object oriented language?
Well, we're not there yet.
Object oriented programming is by no means dead, and C# is very much alive and is a very popular language in industry.

Moreover, C# is a multi-paradigm language so many problems are easier to solve today because C# has borrowed ideas from the functional paradigm.
We'll talk about lambdas [{numref}`Chapter %s<lambdas>`], LINQ [{numref}`Chapter %s<linq>`], and pattern matching [{numref}`Chapter %s<pattern-matching>`] much later.

Nevertheless, part of the reason that I publish this work online for free is that I hope to contribute to the eventual death of object oriented programming.
Object orientation was a fun exercise, but it's time to move on.

However, the only way we can learn to not repeat the mistakes of history is by understanding our history.
So by learning all the ins and outs of object oriented programming I hope that you too will become a subscriber to the idea that objects and subtype polymorphism is not powerful enough.

But don't despair.
Subtype polymorphism is both powerful and very interesting.
It all depends on what you compare it to.
Welcome to the magical world of programming.
Down the rabbit hole we go.



## Overview

How is the book structured?
This book is meant to be read linearly.
Start from the first chapter and keep reading.
I have spent an enormous amount of time trying to figure out how one can learn object oriented programming, step by step, without having to jump back and forth.

Unlike many other technical books I have chosen to keep the table of contents flat.
This means that there is a huge number of chapters but it also means that finding what you are looking for should be much easier.
I have tried my best to make every important concept a top-level chapter.

Every chapter contains exam-like exercises that range from questions of theoretical definitions, to mini-essays, to practical programming exercises.
The exercises look like this:

```{exercise}
Can you find the next exercise in the book?
```

The book is divided into the following five major parts.

- {doc}`Part I: Fundamentals<sets>`\
In this part we lay the foundation necessary to talk about object oriented programming. We talk about sets, functions, computation, data types, paradigms, and so forth.
- {doc}`Part II: Procedural programming<statements>`\
To understand object oriented programming we must first understand procedural programming. Here we talk about statements, expressions, selection, iteration, arrays, procedures, recursion, and so forth.
- {doc}`Part III: Object oriented programming<pillars>`\
This part is the heart of the book. This is where we learn the core ideas of object oriented programming.
- {doc}`Part IV: Object oriented design<requirements>`\
In this part, we move from programming to design. We look at the forest instead of the trees and start thinking about how to provide value using our newfound programming skills.
- {doc}`Part V: Advanced object oriented programming<design-patterns>`\
In this last part of the book we explore more advanced object oriented ideas and also ideas from other paradigms that have been adopted in the object oriented paradigm.

I hope you are ready, let's get started.

% TODO: What about tutorials / labs?


<!--
## Testimonials

```{epigraph}
The way he teaches, the rawness, the sheer commitment to make a particular point clear is remarkable.

-- @rajatexplains on Twitter
```

```{epigraph}
I wish all my professors were like you.

-- Comment on YouTube channel
```

```{epigraph}
Why didn't I discover Christopher's videos earlier in my life??

-- @atpollmann on Twitter
```
-->


<!---
---

Want to truly understand object oriented programming?
This is a book on object oriented programming.
Learn how to write object oriented programs designed to provide as much value as possible as fast as possible without compromising future value.


We start from fundamentals and build knowledge step by step. In the end you will have a great understanding of not only object oriented programming but also many things on the way.

In this book we are not asking what a beautiful program looks like and we are not asking what a technically efficient program (in terms of space time complexity) looks like. In this book we are exploring how to write programs that provide value today while still allowing us to keep providing value in the future.

If you want to become a programmer, an architect, a designer, or a modeller of object oriented systems, then you are in the right place.

```{admonition} Video lectures
<i class="bi bi-youtube card-img-top"></i>
Every chapter is accompanied by a video lecture covering the same topic. **Coming soon**.
```

## Testimonials

```{epigraph}
The way he teaches, the rawness, the sheer commitment to make a particular point clear is remarkable.

-- @rajatexplains on Twitter
```

```{epigraph}
I wish all my professors were like you.

-- Comment on YouTube channel
```

```{epigraph}
Why didn't I discover Christopher's videos earlier in my life??

-- @atpollmann on Twitter
```

-->
