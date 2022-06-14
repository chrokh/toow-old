(objects)=
# Objects

Let us now explore the idea of objects.
In the next chapter we will talk about classes [{numref}`Chapter %s<classes>`] but let's now focus strictly on objects.

In procedural programming, the building block is the procedure.
In object oriented programming, the building block is the object.
Recall what we discussed in the chapter on composition [{numref}`Chapter %s<composition>`].
Here's the parallel.
In procedural programming, we solve complex problems by composing simple procedures.
In object oriented programming, we solve complex problems by composing simple objects.


```{important}
The fundamental building block in object oriented programming is the object.
```

So what is an object?
Think of it this way.
An object is a (possibly) stateful agent that you can interact with by sending messages and receiving responses.
Another way of saying this is that an object is a bunch of methods (known as instance methods [{numref}`Chapter %s<instance-methods>`]) that operate on some encapsulated state (known as instance fields [{numref}`Chapter %s<fields>`]).
Note how we use the word "encapsulated" [{numref}`Chapter %s<pillars>`].

A message is sent from a sender to a receiver.
We commonly think of the message as having a name (i.e., the name of the method) and possibly some payload (i.e., the arguments of the method).
The receiving object may choose to provide a response to the message.
An object's ability to respond to messages is implemented through what is known as instance methods [{numref}`Chapter %s<instance-methods>`] which we will talk a lot more about later.

```{figure} ../images/message-passing.png
---
name: message-passing
width: 66%
---
Objects can send messages to other objects as well as reply to messages sent to them.
```

Let's look at an example.
Assume that you are an object in an application and that you've declared that you're capable of sending responses the messages asking you for what your current mood is.
If I ask you what your mood is while you're hanging out with your friends you might reply that you're *happy*.
But if I ask you what your mood is while you're reading this book you might reply that you're *confused*.
It's contextual.
Your mood depends on the state that you are currently in.

More generally, since objects might be stateful we cannot guarantee that the same message always will result in the same response.
Instead, it depends on the state of the object.
The statefulness of objects mean that we cannot guarantee that messages are pure, or referentially transparent [{numref}`Chapter %s<purity>`].

```{exercise}
What does it mean that an object is *stateful*?
```

Note that the any or all of the arguments (meaning the input) as well as the response (meaning the output) might be objects.
In fact, in a *purely* object oriented language (such as Smalltalk) any arguments and any responses **must** be objects.
This gets slightly technical so let's postpone this discussion to the end of the chapter.

```{exercise}
What is *message passing*?
```

The notion of hiding state in an object is known as *encapsulation* or *information hiding*.
Both of these concepts we've looked at briefly when discussing attempts at defining "pillars" [{numref}`Chapter %s<pillars>`] of object oriented programming.
But what is encapsulation?
What do we mean when we say that objects encapsulate state?
Objects mix methods and data in order to hide the data that belongs to a particular object so that other objects cannot accidentally change it.

```{important}
The terms *encapsulation* and *information hiding* are often considered synonymous and then refer to the idea of hiding implementation details that are likely to change.
```

```{seealso}
If you are interested in learning more about the different definitions of *encapsulation* and *information hiding* I highly recomend reading this short answer on [Stack Overflow](https://stackoverflow.com/a/39499367).
```

Time for an example.
Let's say that we're building a game where two players are controlling their own characters on a two dimensional grid.
This means that each player probably has at least two values associated with it at any given point in time: An $x$ and a $y$ coordinate.

If we were to solve this in a naive procedural style then we might declare four variables that correspond to the $x$ and $y$ coordinates of both players.
We would then define eight move methods that allow us to move both players north, east, south, and west.

```csharp
// Player1
int player1X = 0;
int player1Y = 0;

// Player 2
int player2X = 0;
int player2Y = 0;

// Player 1 move commands
void MovePlayer1East () {
  player1X += 1;
}
void MovePlayer1West () {
  player1X -= 1;
}
void MovePlayer1North () {
  player1Y += 1;
}
void MovePlayer1South () {
  player1Y -= 1;
}

// Player 2 move commands
void MovePlayer2East () {
  player2X += 1;
}
void MovePlayer2West () {
  player2X -= 1;
}
void MovePlayer2North () {
  player2Y += 1;
}
void MovePlayer2South () {
  player2Y -= 1;
}
```

This solution is of course both cumbersome to maintain and very prone to error.
We've duplicated the business logic of what it means to move north, east, south, since we need to define it for both players. 
There are of course many ways of addressing these concerns while still solving the problem in a procedural style.
One way would be to stick all the player positions in arrays where the indices determine which player we are talking about.

```csharp
int[] xPositions = new int[2];
int[] yPositions = new int[2];

void MovePlayerEast (int player) {
  xPositions[player] += 1;
}
void MovePlayerWest (int player) {
  xPositions[player] -= 1;
}
void MovePlayerNorth (int player) {
  yPositions[player] += 1;
}
void MovePlayerSouth (int player) {
  yPositions[player] -= 1;
}
```

While this solves the problem we loose type safety and expose ourselves to potential runtime errors.
What happens if we mistakenly pass the number `1` to a move method, as in `MovePlayerEast(1)`?
That's right, instead of getting an error at compile time, we get an `IndexOutOfRangeException` when actually running the program.
Later [{numref}`Chapter %s<types-over-tests>`] we will talk more about the importance of using types to discover errors at runtime.

Hopefully you are starting to see that what we need here is something a bit more powerful than procedures.
We need more powerful data structures [{numref}`Chapter %s<data-structures>`].
We need a better abstraction of what we're trying to model.

C# does however not allow us to construct custom data structures that aren't also essentially objects.
So for the sake of not having to introduce an entirely new language into this book we're going to pretend that languages that existed before the advent of object oriented programming didn't grant us encapsulated custom data structures.
As we learned in the chapter on pillars [{numref}`Chapter %s<pillars>`], this is certainly *not true*.
Non-object oriented languages did indeed provide mechanisms for encapsulation and as such it would be possible to solve the issues outlined even in some languages that we might want to categorize as procedural.

So, let's get back to object oriented programming.
We'll talk about classes [{numref}`Chapter %s<classes>`] later but allow me to give you a quick taste of what an object oriented solution might look like.
If we were to model players in a class based object oriented language then that class might have a constructor that takes two arguments, and have two instance variables. These two arguments and instance variables are used to encapsulate the $x$ and $y$ coordinates.

```csharp
class Player
{
  int x;
  int y;

  public Player (int initialX, int initialY)
  {
    x = initialX;
    y = initialY;
  }

  public void MoveEast ()
  {
    x += 1;
  }
  public void MoveWest ()
  {
    x -= 1;
  }
  public void MoveNorth ()
  {
    y += 1;
  }
  public void MoveSouth ()
  {
    y -= 1;
  }
}
```

We would interact with the player class by sending move messages to the player.
Given the class we've designed, and assuming that we have an object of type `Player` in the variable `player1` then we could say `player1.MoveEast()` to invite the player to move east.

Instead of reaching into the players to directly manipulate their positions we would likely introduce instance methods so that we could say something like `player1.MoveEast()`.

What do we gain from this? Well, suddenly it's a lot harder to accidentally update the position of one player when we actually were intending to update the position of the other.

Authors like Robert C. Martin argues (see for example {cite:t}`martin2017`) that the mixing of methods and data isn't unique to object oriented programming.
Instead, he proposes that the defining feature of object oriented languages is that they make subtype polymorphism safe and readily available.
We will learn a lot more about subtype polymorphism [{numref}`Chapter %s<interfaces>`] later.

```{exercise}
What is *encapsulation*?
```

```{exercise}
What is *information hiding*?
```


In some languages, such as JavaScript, an arguably simpler structure than that of objects is what's known as closures.
We say that a closure closes over some state.

---


So what about this notion of "purely" object oriented languages that we left unanswered?
When saying that a language such as Smalltalk is a "purely" object oriented language we don't mean pure in the sense of referential transparency as we discussed in {numref}`Chapter %s<purity>`.
We mean "pure" in the sense that, in the language, everything (or almost everything) is an object.
While we tend to use the word "everything" when talking about how purely object oriented a language is it would be more accurate to say something like all values that you can construct and reference using variables.
We haven't talked about inheritance [{numref}`Chapter %s<inheritance>`] and interfaces [{numref}`Chapter %s<interfaces>`] yet but another way of saying this is that all types derive from Object.
These statements are however only almost entirely true.

C# is not a purely object object oriented language.
When discussing paradigms [{numref}`Chapter %s<paradigms>`] we established that C#, like many other contemporary programming languages, is a multi-paradigm language.
C# contains ideas from procedural, object oriented, as well as functional programming.

Remember the built-in value types [{numref}`Chapter %s<simple-types>`], also known as the simple types?
In Java these are known as primitive types and they are not objects, but in C# they actually are.
So if simple types are objects, then these are not the problem.

The non-object types are:

1. Pointers.
2. Interfaces.
3. Open type parameters.

You could argue that pointers are an archaic remnant of the procedural days.
As such, we won't talk about them here.

Interfaces [{numref}`Chapter %s<interfaces>`] however are key to object oriented programming since they (as well as inheritance [{numref}`Chapter %s<inheritance>`]) enable what is known as subtype polymorphism.
We'll talk much more about this later.
Suffice to say however that while interfaces themselves are not objects, any object that implements an interface must (tautologically) be an object because only objects can implement interfaces.

The same line of reasoning follows with open type parameters.
Any open type parameter will eventually be replaced by a concrete type that is an object.
Open type parameters will be discussed in much more detail when we talk about generic programming [{numref}`Chapter %s<generics>`].

So, it would be more correct to follow the assertion of Eric Lippert who states that:
"Every non-pointer type is *convertible* to object."

```{important}
"Every non-pointer type is *convertible* to object."

[TODO: https://docs.microsoft.com/en-gb/archive/blogs/ericlippert/not-everything-derives-from-object]
```

We should however also mention that while an object of a child type can be implicitly converted to its parent class, when value types, such as the simple types like `int`, are converted to objects this causes what is known as [{numref}`Chapter %s<value-and-reference-semantics>`].

```{seealso}
Using a value type where an object is expected causes boxing [{numref}`Chapter %s<boxing>`].
```

```{exercise}
What three types or kinds of types, in C#, are not objects?
```


## TODO
- Equivalence (i.e. two structurally equivalent objects are not necessarily the same).
  - Relate to value type and reference types semantics chapter.
- Talk about closures?

