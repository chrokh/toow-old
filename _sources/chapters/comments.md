(comments)=
# Comments

Comments are annotations that document code.
Most source languages and some markup languages support comments.
They exist so that we, as humans, can explain to ourself and our fellow humans what, we are doing, and why we are doing it.
Comments are ignored by the compiler and the compiled program, generally, doesn't contain any comments.

```csharp
// This program prints "Hello world",
// and these two lines are comments.
Console.WriteLine("Hello world");
```

In the chapter on {doc}`documentation` we discussed four types of documents:
requirements, design, technical, and end-user documents.
Code comments can be used for any of these four purposes.
Whether they *should* be used for all four is a different question.


## Noun and verb

The word "comment" is used both as a noun and as a verb.

When we use the word comment as a noun we are refer to a single commented piece of code.
You might say something like: "I've added this comment to make this piece of code a bit more clear".

When we use the word as a verb we are referring to the act of commenting or "uncommenting" something.

To "comment" or "comment out" is to turn something into a comment which in turns means that it will be ignored by the compiler or interpreter.
You might say something like:
"I've *commented* this piece of code to make it a bit more clear", or
"Let me just *comment* this line out to see if this is the reason we get compilation errors".

To "uncomment" is to turn a comment into a regular statement or expression so that it *will* be included by the compiler or interpreter.
You might say something like:
"Let me *uncomment* this now that we know that the error isn't here".

```{warning}
Uncommenting is not the same as removing a comment.
```


## Line and block

There are two types of comments: line comments (`//`) and block comments (`/* ... */`).
Line comments are sometimes also known as end-of-line comments.
Block comments can be used to build multi-line comments.

Languages that support comments, often support both line and block comments, but some does support only one or the other.
Examples of languages that only support line comments are Erlang, R, Bash, and Python.
An example of a language that only supports block comments is CSS.

Line comments comment all the content that follows the comment marker until the end of line.
In C# we use two consequtive forward-slashes (`//`), also known as a double slash, to start a line comment.
All the content between the double slash and the end of line constitutes the comment.

```csharp
Console.WriteLine("Hello");   // This is a comment.
```

Block comments comment all the content between some start and end marker.
In C# we use a forward-slash and an asterisk (`/*`) to start a comment and an asterisk and a forward-slash (`*/`) to end a comment.
Everything between these two markers belongs to the comment and will be ignored by the compiler or interpreter.

```csharp
/* This is a single-line block comment. */


/*
   This is a multi-
   line block comment.
*/


/*
 * This is also a multi-
 * line block comment.
 */
```


## Executable comments

While compilers and interpreters ignore comments there is a phenomena known as "executable comments", "functional comments", or "annotations".
These types of comments follow a specific syntax, just like regular source code, and can be processesed either by the regular compiler or by some separate program (that is sometimes also referred to as a compiler).

The purpose of executable comments vary but common reasons include the generation of documentation and the adding of types.
Executable comments that document the code are often called "documentation comments" and this is indeed the terminology that we use in C#.
Executable comments that add types are often known as "type annotations" and these exist to add data types to, what is known as, dynamic languages, meaning languages whose compiler or interpreter doesn't enforce types.
We'll talk more about both data types and dynamic languages later [{numref}`Chapter %s<data-types>`].

Documentation comments can be used to generate technical or end-user documentation from your source code.
If you write your comments in accordance with some specific syntax, you can run your source code through some document generating program that processes all your documentation comments and spits out documentation.

```{figure} ../images/documentation-comments.svg
:name: fig:documentation-comments
When using documentation comments and running our program through the compiler we not only get a program but also a set of documentation files.
```

Documentation comments is an excellent way of solving the problem that we discussed in the chapter on documentation [{numref}`Chapter %s<documentation>`] where the documentation and code say different things.
By keeping the documentation close to the code we minimize the risk of the documentation and code drifting apart.

- More on documentation comments later in METHOD chapter and CLASS chapter.

To give some examples, in C# we've got [documentation comments](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments), in Java we've got [JavaDoc](https://en.wikipedia.org/wiki/Javadoc), and for web API's we've got [Open API](https://www.openapis.org/) and [Swagger](https://swagger.io).
It is too soon to talk more specifically about the syntax of documentation comments.
We must first talk about static methods [{numref}`Chapter %s<static-methods>`], classes [{numref}`Chapter %s<classes>`], instance methods [{numref}`Chapter %s<instance-methods>`], and properties [{numref}`Chapter %s<properties>`].
We will take a brief look at the syntax of documentation comments in these respective chapters.
However, if you want to see some of the syntax now, please see the example below.

````{admonition} Example
:class: info dropdown
This example is greatly inspired by some of the snippets given in the official [documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments).
```csharp
/// <summary>
/// Class <c>Point</c> models a point in a two-dimensional plane.
/// </summary>
public class Point
{
  /// <value>
  /// Property <c>X</c> is the x-coordinate.
  /// </value>
  public int X { get; private set; }

  /// <value>
  /// Property <c>X</c> is the y-coordinate.
  /// </value>
  public int Y { get; private set; }

  /// <summary>
  /// This constructor creates a new Point at (0,0).
  /// </summary>
  public Point() : this(0, 0) {}

  /// <summary>
  /// This constructor creates a new Point at 
  /// (<paramref name="xPos"/>,<paramref name="yPos"/>).
  /// </summary>
  /// <param><c>xPos</c> is the new Point's x-coordinate.
  /// <param><c>yPos</c> is the new Point's y-coordinate.
  public Point(int xPos, int yPos)
  {
    X = xPos;
    Y = yPos;
  }
}
```
````

## Benefits of comments

But why do we even need comments in the first place?
Isn't code self-explanatory?
If we wrote it once, surely that must mean that we understood it, so why can't we just read the code if we need to understand it again?

According to {cite:t}`ousterhout2018`, the purpose of comments is to hide complexity.
{cite:t}`ousterhout2018` explains that comments achieve this in two ways.
Comments reduce *cognitive load* by removing the need to read the code, and they reduce *unknown unknowns* by clarifying the structure of the system.

```{figure} https://openlibrary.telkomuniversity.ac.id/uploads/book/cover/21.01.649.jpg
---
figclass: margin
---
"A Philosophy of Software Design" {cite:p}`ousterhout2018`.
```

```{seealso}
I *highly recommend* that you buy the book "A Philosophy of Software Design" {cite:p}`ousterhout2018`.
Even if only to keep it on your bookshelf as a reference.
It is, arguably, next to none when it comes to object oriented design.
Ousterhout has created a unified view (or in his words, philosophy) of the most important design ideas in the world of object oriented programming.
If you're not yet convinced you might want to have a look at his great [Google Tech Talk](https://youtu.be/bmSAYlu0NcY) from 2018.
```


## Objections to comments

{cite:t}`ousterhout2018` argues that there are four common objections to writing comments.
These are:

- Objection 1: "Good code is self-documenting."
- Objection 2: "I don't have time to write comments."
- Objection 3: "Comments get out of date and become misleading."
- Objection 4: "The comments I have seen are all worthless; why bother?"

Regarding good code being self-documenting, {cite:t}`ousterhout2018` argues that while good code certainly can communicate a lot of information it cannot possibly communicate all that is necessary.

At it's core, the issue is that method and class names cannot communicate all the semantics needed to understand.
And if they can, then {cite:t}`ousterhout2018` argues that you are writing what he calls "shallow" methods that contain way too little code.
To do anything non-trivial you will need to {doc}`compose<composition>` so many methods that users of the method will likely end up needing to read all the composed methods as well.

```{epigraph}
If users must read the code of a method in order to use it, then there is no abstraction: all of the complexity of the method is exposed.

-- {cite:t}`ousterhout2018`
```

```{seealso}
Much later we will discuss {doc}`liskov-substitution-principle` and you will see how the same problem appears again.
The data types (including signatures) cannot capture all the behavioral details.
Similarly, when we get to the chapter on, {doc}`types-over-tests`, we'll discuss how much information, but not necessarily all, can be captured in the types.
```

Regarding not having time to write comments, {cite:t}`ousterhout2018` admits that in the face of scarce time it seems logical to choose to write new features over documenting an existing one.
However, he argues that since there will always be something that appear more critical than writing comments, we cannot use this as a guiding principle.
Since comments hide complexity they improve {doc}`Maintainability<maintainability>` which is a very concept that we, in later chapters, will discuss at length.

This is similar to how {cite:t}`martin2019` argues that while we might think lowering quality (by in this case not writing comments) enables us to go faster, it actually makes us slower.
The argument, at its core, is that dirty solutions are slow because they are difficult to change.

```{epigraph}
The only way to go fast, is to go well.

-- {cite:p}`martin2019`
```

The third objection is that comments tend to get out of date to the point where they are outright misleading.
As we've already alluded to this can be somewhat addressed by using documentation comments.
{cite:t}`ousterhout2018` however also suggests that comments should be kept as close as possible to the code that it documents rather than say in a separate documentation file.
He also suggests that to avoid drift, duplication should be avoided as much as possible.

The fourth and last objection is the empirical observation that many comments are utterly worthless.
It is easy to write comments, but are they any good?
So what constitutes good comments?


## Good comments

According to {cite:t}`ousterhout2018`, the overall idea of comments is to "describe things that aren't obvious from the code".
As we mentioned in the introduction to this chapter, {cite:t}`ousterhout2018` argues that comments should reduce cognitive load and unknown unknowns.

```{epigraph}
Comments should describe things that aren't obvious from the code.

-- {cite:t}`ousterhout2018`
```

From this perspective, comments should increase abstraction [{numref}`Chapter %s<abstraction>`].
They provide us with a more abstract view of the system.
A view where we don't actually have to read the code and where we don't need to care about all the nitty gritty details.

In my interpretation, {cite:t}`ousterhout2018` suggests eight guidelines for good comments.

1. **Pick and stick to a convention.** Conventions make your comments easier to read and understand. However, they also help you see where you are missing comments. In the case of C#, [Documentation Comments](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments) serve as an excellent convention.
2. **Don't repeat the code.** Comments that merely explain what the comment does provides zero additional value. The reader of your comments could just as well read your code instead. Comments must always justify their existence by providing additional value beyond the code.
3. **Keep near the code.**
{cite:t}`ousterhout2018` suggests that one of two things we can do to keep comments up to date and avoid drift is to keep them "near" the code that they document.
This means that we should not put our documentation and comments in a separate document but rather in our actual code.
We are not discussing source control in this book, but another mistake, according to {cite:t}`ousterhout2018` is to put important comments in source control commit logs rather than in the code.
4. **Avoid duplication.** {cite:t}`ousterhout2018` suggests that the second thing we can do to keep comments up to date and avoid drift is to avoid duplication.
If you've studied databases then you're familiar with this concept as "anomalies".
Whenever we duplicate something we run the risk of getting "out of sync" by making a change in one of the places and forgetting to also change the other.
{cite:t}`ousterhout2018` also suggests that if "information is already documented someplace outside your program, don't repeat the documentation inside the program; just reference the external documentation".
5. **Add precision with low-level comments.** Comments that are expressed at a lower level of abstraction than the code should provide additional value. For example, what does it mean when the value of a variable is null, are there exclusive or inclusive boundaries for some variable, and so forth. This is stuff that isn't obviously expressed in the code but that's important.
6. **Enhance intuition with high-level comments.** Comments that are expressed at a higher level of abstraction give readers a high-level understanding of what the code in question does. {cite:t}`ousterhout2018` also argues that high-level comments are much easier to maintain (since they are more likely to remain true in the face of code changes) and hence should be preferred.
7. **Document interfaces.** We have not yet talked about {doc}`interfaces<abstraction>`, {doc}`methods<static-methods>`, nor {doc}`objects<objects>`, but think of it this way: As soon as you have some "thing" that you can interact with in certain ways then that thing has got an interface. The interface is how we communicate with the thing. Comments should be used to describe how we can interact with the thing. Or in other words, comments should describe the interface.
8. __Express *what* and *why*, not *how*.__ {cite:t}`ousterhout2018` uses the term "implementation comments" to refer to comments that describe concrete implementations. He argues that such comments should focus on *what* some piece of code does and *why* it needs to be done. However, he's suggesting that these comments should not be concerned with *how* it is done. If we focus on *how* then we are back to repeating the code.

Some people even go so far as to suggest that we should write our comments *before* we write our code.
We'll discuss this further in the chapter on {doc}`Documentation-driven development<documentation-driven-development>`.

