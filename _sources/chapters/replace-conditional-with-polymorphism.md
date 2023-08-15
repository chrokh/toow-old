---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: csharp
  language: .net-csharp
  name: .net-csharp
---

# Replace conditional with polymorphism

Instead of relying on long chains of conditionals, we can use this principle to elegantly dispatch behavior based on the object's type.
The term 'replace conditional with polymorphism' refers to a [refactoring](refactoring) popularized by the book [Refactoring by Martin Fowler](https://geni.us/DABBqp). It's aptly named because we're taking code that uses conditionals and rewrite it so that it instead uses polymorphism.

```{admonition} Key point
Using polymorphism can eliminate the need for explicit conditionals in your code, leading to more readable and maintainable solutions.
```

To metaphorically visualize this chapter's concept, think of polymorphism as a symphony orchestra. Instead of one musician trying to play every instrument based on a list of conditions, each musician specializes in one instrument. When a sequence of notes is given to a violinist the piece is played on a violin. But if the same sequence of notes is given to the pianist it is played on a piano. In the same vein, polymorphism ensures the right code executes without the explicit need for conditions.

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1140917738378891264/chrokh_illustration_of_an_orchestra_db3193b5-f403-40e4-85dc-86d45c6e8ba8.png

Replacing conditionals with polymorphism is like moving from a single person playing every instrument to an orchestra where each person specializes in one instrument.
```

Imagine you're building a chess game. In chess, different pieces move in different patterns. For instance, a 'Knight' might move in an 'L' shape while a 'Bishop' might move diagonally. The naive way to code this might involve a lot of conditionals:

```{code-cell}
enum PieceType { Knight, Bishop, Pawn } // Etc...
```

```{code-cell}
class Piece
{
    public PieceType Type { get; set; }

    public void Move()
    {
        if (Type == PieceType.Knight)
            Console.WriteLine("Can move in L shape.");
        else if (Type == PieceType.Bishop)
            Console.WriteLine("Can move diagonally.");

        // ... etc
    }
}
```

%You might look at this code and say that we should use [enums](enumeration-types) instead of strings to model the different piece types. While that certainly makes the code more maintainable by ensuring that we're not accidentally using an 

The above approach may seem straightforward at first sight, but it becomes cumbersome and less [maintainable](maintainability) as the number of piece types increases. Moreover, every time a new type is introduced, the `Move` method must be modified. This last point might not be relevant in the chess example but it certainly is valid in scenarios where the requirements aren't completely known.

An elegant solution is to instead use polymorphism to delegate the responsibility of moving to the specific piece types.

Let's refactor this to instead use polymorphism.
The idea is to make each piece its own class with its own implementation of the instance method `Move`.
We then make it possible to use instances of these classes polymorphically by letting them implement the same interface or inherit from the same base class. In this example we're going to use an interface.
Have a look at the refactored code that instead uses polymorphism:

```{code-cell}
interface IPiece
{
    void Move();
}
```

```{code-cell}
class Knight : IPiece
{
    public void Move()
        => Console.WriteLine("Can move in L shape.");
}
```

```{code-cell}
class Bishop : IPiece
{
    public void Move()
        => Console.WriteLine("Can move diagonally.");
}
```

With this setup, there's no need for any conditionals. When you call the `Move` method on a character (`IPiece`), the correct implementation for that character type is automatically chosen.
Revisit the chapters on [subtype polymorphism](subtype-polymorphism) and [dynamic dispatch](dynamic-dispatch) if this doesn't make sense.

```{code-cell}
IPiece piece = new Knight();
piece.Move(); // No conditionals needed!
```

```{tip}
When you find yourself using conditionals based on object types or properties, consider if polymorphism might be a better approach.
```

%``{attention}
%While polymorphism helps simplify and make the codebase more maintainable, it's essential to ensure that the logic within the polymorphic methods remains concise. Avoid the temptation to add conditionals inside these methods.
%``

%In the grander scheme of things, replacing conditionals with polymorphism is an instance of the larger principle: delegating responsibilities. Instead of one massive class or method trying to handle all cases (and hence all responsibilities), you distribute the responsibilities across more focused, specialized classes.

```{seealso}
In later chapters we'll explore designs (such as [strategy pattern](strategy-pattern)) and principles (such as [composition over inheritance](composition-over-inheritance)) that take this basic idea even further.
```

Remember, the goal of object-oriented programming, and indeed, programming in general, is clarity and maintainability. By making smart choices and leveraging principles like polymorphism, you're well on your way to creating better software.

