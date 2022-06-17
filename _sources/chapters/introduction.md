# Introduction

Welcome to The Object Oriented Way.
If you want to learn how to write object oriented programs designed to provide as much value as possible as fast as possible, without compromising future value, then you are in the right place.

```{figure} ../images/author.png
:name: fig:author
:scale: 50%
:align: right
```

My name is Christopher Okhravi and I'm a senior lecturer at the department of [Informatics and Media](https://katalog.uu.se/profile/?id=N12-1461) at Uppsala University.
In 2020 I received my Ph.D. in Information Systems with a [thesis](http://urn.kb.se/resolve?urn=urn:nbn:se:uu:diva-417037) on using compositional contracts for modeling policy interventions aimed at stimulating antibiotic development.
I also run a fairly successful [YouTube channel](https://youtube.com/c/christopherokhravi), with well over 100,000 subscribers, on the topic of programming.

I am writing this book because I teach two undergraduate courses on object oriented programming using C# and haven't been able to find any literature that suits the way I think these courses should be taught.

This book is very much a *work in progress*.
If you find errors or have suggestions you are more than welcome to [submit an issue](https://github.com/chrokh/the-oo-way/issues/new) in the book's repository on GitHub.


## What you will learn

What will you learn in this book?
In this book we are first and foremost concerned with **providing value by means of programming** in an object oriented language.
If you are familiar with the philosophies of Lean manufacturing, Lean startup, or Agile methods then you will know where my sympathies lie.

In this book we are not asking what a beautiful program looks like and we are not asking what a technically efficient program (in terms of space time complexity) looks like.
In this book we are exploring how to write programs that not only make money today but also can keep making money in the future.
In many domains, this is not the same challenge.
So if you are interested in becoming a well-rounded, what we might call, architect, designer, or modeller of object oriented solutions, then you are in the right place.

```{important}
In this book we are exploring how to write programs that not only make money today but also can keep making money in the future.
```

I say "make money" because it points our attention to the challenge of balancing costs and benefits.
It points us to the challenge of always thinking in terms of return on investment (ROI).
Clearly, we write software for other reasons too.
Sometimes we write open source software and sometimes we work for non-profit agencies.
But no matter who you write the software for, if we are aiming to provide value (or *utility* if you prefer) for someone then we are always faced with the challenge of balancing input costs with output value.

In this book we are neither concerned with writing the fastest program nor are we concerned with writing the most elegant program.
This book does not thinking of code as "l'art pour l'art", art for art's sake.
In this book we see code as a means to an end.

```{important}
Code is a means to an end.
```

Exploring how to solve problems using code and exploring a language out of pure curiosity is of course an excellent thing.
I myself have written countless pieces of code and read countless pages of documentation just for the sake of scratching my own itch.
However, with this book I want to encourage you to deliberately practice to become a programmer that knows how to weigh the pros and cons of a solution in the face of real world business constraints and requirements.


 
## What you must know

What must you know to make the most of this book?
This book is written so that if you read it from the first page to the last, then you should be given all the tools you need to understand the contents within.
We start with the fundamentals and then build from there.

```{note}
You don't need to know anything about programming to read this book.
That's what we are here to learn.
```

You are however expected to have some understanding of basic algebra so that you can read a mathematical function such as $f(x) = x * 2$.
We will hardly do any math in this book, but math is truly an excellent tool when it comes to reason about things in a more precise manner.
So, yes there will be a tiny bit of math.
But if you think of yourself as someone who's "not a math person", stick with me and have no fear.
It is not complicated and you will understand.

% TODO: How about just introducing a chapter that explains what a mathematical function is?

I promise you that the things we will do are not complicated.
If you do find that something is too complicated then please do [submit an issue](https://github.com/chrokh/the-oo-way/issues/new) in the GitHub repository so that I can rewrite to make whatever is complicated more simple.

```{note}
Nothing in this book is too complicated for you to understand.
I am sure that if you are reading this text, then you are fully capable of understanding every topic in this book.
Just start from the top, and take it one chapter at a time.
```


(donations)=
## Free book

I am publishing this book online for free because I value that fact that everyone has access to this material.
If you believe in my mission then I truly appreciate if you [support my work on Patreon](https://patreon.com/christopherokhravi).

```{note}
Thank you for supporting my work on [Patreon](https://patreon.com/christopherokhravi).
```

I must also disclose that some links in this book are affiliate links which means that I make a small commission if you happen to purchase whatever is behind the link.
It is important that you understand that all links in this book are here for a pedagogical reason.
I would never put a link in this book if I didn't believe that the material behind serves us on our learning journeys.

I should also note that if you are reading this as a student of Uppsala University then most of the linked literature is available online for free via the [Uppsala University Library](https://ub.uu.se).
If you are studying at a different university I encourage you to check whether your library has a similar arrangement.


## Video lectures and audiobook

Eventually I will release video lectures for each chapter in this book.
Feel free to subscribe to my [YouTube channel](https://youtube.com/c/christopherokhravi) and hit the bell to be notified when this happens.

If there's an interest in it, and it looks like it would be useful, I will also record the whole book as an audio book. 

To allow all this to happen, please consider [supporting my work on Patreon](https://patreon.com/christopherokhravi).
This is also the best way to communicate your interests directly to me.


## Technicalities

The code in this book is written in C# 9.0 which means that you need at least .NET 5[^net-versions].
Earlier versions of .NET did, for example, not support what is known as top-level statements so if you are following an earlier version of .NET and want to follow along with the examples in this book you might have to adapt them.

[^net-versions]: See [the documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/configure-language-version) for more information on versions.

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
We will talk more about the compilation [{numref}`Chapter %s<compilation>`] and evaluation [{numref}`Chapter %s<evaluation>`] later.

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




% Add this image: https://unsplash.com/photos/bJhT_8nbUA0
% to emphasize that if you take it one step at a time, you will be able to scale the mountain.
