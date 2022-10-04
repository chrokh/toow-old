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

# Objects

```{warning}
Work in progress.
```

%- Equivalence (i.e. two structurally equivalent objects are not necessarily the same).
%  - Relate to value type and reference types semantics chapter.
%- Talk about closures?
% TODO: In some languages, such as JavaScript, an arguably simpler structure than that of objects is what's known as closures.  We say that a closure closes over some state.

Let us now explore the idea of objects.
In the next chapter we will talk about [classes](classes) but let's now focus strictly on objects.


## Motivation

In procedural programming, the building block is the [procedure](method-composition).
In object oriented programming, the building block is the object.
In procedural programming, we solve complex problems by composing simple procedures.
In object oriented programming, we solve complex problems by composing simple objects.
[Object composition](object-composition) is something that we'll discuss at length in future chapters.

```{important}
The fundamental building block in object oriented programming is the object.
```

Remember how we, in the chapter on [methods](methods), discussed that with methods as the only abstraction and method composition as the only tool (and assuming that we don't have access to things such as parametric polymorphism and higher order functions) we will be forced to eventually turn methods into data to increase abstractions.

What I mean is that to increase the modularity of our code, and hence eliminate duplication, we will have to take things that might otherwise be expressed as methods and somehow convert them into data that methods can operate upon.
In other words, instead of just implementing whatever code we want to implement as a method, we have to figure out how to represent some key step or steps (where there are multiple possible algorithms) as a data type that we then can accept as a parameter.
When passing different values as arguments we get different behavior.
All this for the purpose of eliminating duplication by increasing abstraction.

A good example of this is how we, in the chapter on [methods](methods-substitutions), found ourselves in a position where it was difficult to increase abstraction and eliminate duplication without expressing part of the algorithm as data.
We figured out that some ciphers are substitution ciphers and that the substitutions that any particular cipher performs can be expressed as an array of pairs containing a pattern and a replacement.

Instead of being able to write algorithms called `robbersEncodeString`, `leetEncodeString`, and so forth, we had to write a method called `substitute` that accepted a list of substitutions instead.
The substitutions are now data instead of being part of the algorithm.

This is not necessarily a bad thing.
It all depends on what you want to achieve and what you prefer.

However, sometimes it's really difficult to find a sensible way of representing an algorithm as data.
Not all algorithms can trivially be represented as data.
In the case of substitution ciphers it happened to be simple.
But some algorithms are arguably easier to express as methods.

Back in the days, this is where function pointers would come into play.
But, pointers are not (type safe)[type-safety] and by now I'm hoping that you're convinced that static type safety is really important.
So, let's not dwell on the archeic concept of function pointers.
What then?

This is where objects come in to play.
Objects allow us to bundle up some data with some methods and then *send that bundle* around.
As we will learn, objects allow [subtype polymorphism](subtype-polymorphism) and hence [dynamic dispatch](dynamic-dispatch) without loosing static type safety.
This in turn allows us to keep increasing abstraction without having to resort to turning more and more algorithms into data.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:local-method

Objects give us subtype polymorphism without loosing static type safety.
```

In the coming chapters we will mostly focus on the idea of writing the substitution algorithms ourselves rather than turning the substitutions into data.
But rest assured that when we're done rewriting this in a more object oriented fashion we'll also be able to support both ideas at the same time.
So if you really liked the idea of substitution ciphers, don't worry.
%Pretty neat, right?



## Definition

So what is an object?
Think of it this way.
An object is a (possibly) stateful agent that you can interact with by sending messages and receiving responses.
Another way of saying this is that an object is a bunch of methods (known as [instance methods](instance-methods)) that operate on some [encapsulated](pillars) state (known as [instance fields](fields)).


### Message passing

Pessimistically, a message is nothing more than a call to an [instance method](instance-methods).
We'll talk about instance methods in a separate chapter but in short, they are just regular methods that are executed within the context of the state of an object.
Meaning that instance methods have access to and can mutate the state of the object it is invoked upon.

Optimistically, message passing is a philosophy.
Object oriented advocates tend to favor this view and argue that if we truly understood message passing, we would write our programs differently.

Alan Kay, a pioneer and vocal advocate of object oriented program has given for example argued that message passing is a more important idea than objects.

```{epigraph}
I'm sorry that I long ago coined the term "objects" for this topic because it gets many people to focus on the lesser idea. The big idea is "messaging".

-- Alan Kay [[source]](http://lists.squeakfoundation.org/pipermail/squeak-dev/1998-October/017019.html)
```

In one of the more heated debates of modern object oriented times Alan Kay and Rich Hickey (inventor of the programming language Closure) argued about the usefulness of sending data without an interpreter.

```{epigraph}
For important negotiations we don't send telegrams, we send ambassadors.

-- Alan Kay, in public discussion with Rich Hickey on [reddit](https://news.ycombinator.com/item?id=11945722)
```

These quotes and the heat of that debate I believe conveys how some people truly argue that object oriented programming is a way of thinking.
And that if you get this thinking right, then you will write superior programs.

But what is a message in the philosophical sense then?
A message is sent from a sender to a receiver.
We commonly think of the message as having a name (i.e., the name of the method) and possibly some payload (i.e., the arguments of the method).
The receiving object may choose what to do in response to the message and may choose to provide a response to the message.

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
The statefulness of objects mean that messages are possibly [impure](purity) (in the sense of not referentially transparent).

Any or all of the arguments (meaning the input) as well as the response (meaning the output) might be objects.
So objects can contain objects.
This is object composition.
In fact, in a *purely* (here we don't mean pure as in referentially transparent) object oriented language (such as Smalltalk) any arguments and any responses *must* be objects, but we'll return to that technical detail in the [Discussion](#discussion) section.

Herein lies the idea of the "interpreter" that follows with the "data".
In the non-object oriented world we pass around, let's call it, "raw" data.
This means that everytime we want to do something with the data we have to interpret it.
In the object-oriented world however, we pass around data together with an interpreter.
The interpreter is the object and the data is contained within the object.
Now whenever we want to interact with the "raw" data somehow, we have to do so via the interpreter.



### Encapsulation

The notion of hiding state in an object is known as *encapsulation* or *information hiding*.
Both of these concepts we've looked at briefly when discussing attempts at defining "[pillars](pillars)" of object oriented programming.
But what is encapsulation?
What do we mean when we say that objects encapsulate state?
Objects mix methods and data in order to hide the data that belongs to a particular object so that other objects cannot accidentally change it.

```{important}
The terms *encapsulation* and *information hiding* are often considered synonymous and then refer to the idea of hiding implementation details that are likely to change.
```

```{seealso}
If you are interested in learning more about the different definitions of *encapsulation* and *information hiding* I highly recomend reading this short answer on [Stack Overflow](https://stackoverflow.com/a/39499367).
```

Some authors, like Robert C. Martin (see for example {cite:t}`martin2017`), argues that the mixing of methods and data isn't unique to object oriented programming.
Instead, he proposes that the defining feature of object oriented languages is that they make subtype polymorphism safe and readily available.
This is the same argument that we made in the Motivation section of this chapter.



## Examples

```{warning}
Work in progress.
```

### Encapsulating state

Let's say that we're building a game where two players are controlling their own characters on a two dimensional grid.
This means that each player probably has at least two values associated with it at any given point in time: An $x$ and a $y$ coordinate.

If we were to solve this in a naive procedural style then we might declare four variables that correspond to the $x$ and $y$ coordinates of both players.
We would then define eight move methods that allow us to move both players north, east, south, and west.

```{code-cell} csharp
:tags: [hide-input]
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

```{code-cell} csharp
:tags: [hide-input]
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

While this solves the problem we loose static type safety and expose ourselves to potential run-time errors.
What happens if we mistakenly pass the number `1` to a move method, as in `MovePlayerEast(1)`?
That's right, instead of getting an error at compile time, we get an `IndexOutOfRangeException` when actually running the program.
In the chapter on [errors](errors) we discussed the value of discovering errors at compile-time rather than run-time.

Hopefully you are starting to see that what we need here is something a bit more powerful than procedures.
We need more powerful [data structures](data-structures).
We need a better abstraction of what we're trying to model.

C# does however not allow us to construct custom data structures that aren't also essentially objects.
So for the sake of not having to introduce an entirely new language into this book we're going to pretend that languages that existed before the advent of object oriented programming didn't grant us encapsulated custom data structures.
As we learned in the chapter on [pillars](pillars), this is certainly *not true*.
Non-object oriented languages did indeed provide mechanisms for encapsulation and as such it would be possible to solve the issues outlined even in some languages that we might want to categorize as procedural.

So, let's get back to object oriented programming.
We'll talk about [classes](classes) later but allow me to give you a quick taste of what an object oriented solution might look like.
If we were to model players in a class based object oriented language then that class might have a constructor that takes two arguments, and have two instance variables. These two arguments and instance variables are used to encapsulate the $x$ and $y$ coordinates.

```{code-cell} csharp
:tags: [hide-input]
class Player
{
  int x, y;

  public Player (int initialX, int initialY)
  {
    x = initialX;
    y = initialY;
  }

  public void MoveEast ()  => x += 1;
  public void MoveWest ()  => x -= 1;
  public void MoveNorth () => y += 1;
  public void MoveSouth () => y -= 1;
  public void Print ()
    => Console.WriteLine($"({x} , {y})");
}
```

We would interact with the player class by sending move messages to the player.
Given this class, we could then instantiate a bunch of player objects:

```{code-cell} csharp
Player p1 = new Player(0, 0);
Player p2 = new Player(0, 0);
```

We are then ready to send messages to these player objects to invite them to move in different directions.
Meaning, we are ready to call instance methods on them.
Which means that we can invite the objects to change their internal states.

```{code-cell} csharp
p1.MoveEast();
p1.MoveEast();
p1.MoveSouth();
p1.Print();
```

```{code-cell} csharp
p2.MoveWest();
p2.MoveSouth();
p2.MoveSouth();
p2.Print();
```

What do we gain from this?
Well, without getting into subtype polymorphism we gain encapsulation.
It's arguably harder to accidentally update the position of one player when we actually were intending to update the position of the other.
We're also able to trivially support an arbitrary number of players without having to write any more code and without risking run-time caused by for example trying to access indexes in arrays that don't exist.





## Discussion

### Message-passing

Whether the idea of sending the interpreter together with the data is a good idea or not is up for debate.
This is merely my opinion, but I myself have lost all hope in it.
I am a functional programming convert, with no regrets.

More objectively, functional programming is gaining ground by the day and in that paradigm we don't worry about sending interpreters along with data.
I urge you to ask yourself: is multiple interpretations of the same piece of raw data perhaps not a bug, but a useful feature?


### Everything is an object

So what about this notion of "purely" object oriented languages that we left unanswered?
When saying that a language such as Smalltalk is a "purely" object oriented language we don't mean pure in the sense of [referential transparency](purity).
We mean "pure" in the sense that, in the language, everything (or almost everything) is an object.
While we tend to use the word "everything" when talking about how purely object oriented a language is it would be more accurate to say something like all values that you can construct and reference using variables.
We haven't yet talked about [inheritance](inheritance) and [interfaces](interfaces) but another way of saying this is that all types derive from `Object`.
These statements are however only almost entirely true.

C# is not a purely object object oriented language.
When discussing [paradigms](paradigms) we established that C#, like many other contemporary programming languages, is a multi-paradigm language.
C# contains ideas from procedural, object oriented, as well as functional programming.

Remember the built-in value types, also known as the [simple types](simple-types)?
In Java these are known as primitive types and they are not objects, but in C# they actually are.
So if simple types are objects, then these are not the problem.

The non-object types are:

1. Pointers.
2. Interfaces.
3. Open type parameters.

You could argue that pointers are an archaic remnant of the procedural days.
As such, we won't talk about them here.

Interfaces however are key to object oriented programming since they (as well as inheritance) enable what is known as [subtype polymorphism](subtype-polymorphism).
We'll talk much more about this later.
Suffice to say however that while interfaces themselves are not objects, any object that implements an interface must (tautologically) be an object because only objects can implement interfaces.

The same line of reasoning follows with open type parameters.
Any open type parameter will eventually be replaced by a concrete type that is an object.
Open type parameters will be discussed in much more detail when we talk about [generic programming](generics).

% TODO: Use proper reference.
So, it would be more correct to follow the assertion of Eric Lippert who states that:
"Every non-pointer type is *convertible* to object."

```{epigraph}
"Every non-pointer type is *convertible* to object."

-- [Eric Lippert](https://docs.microsoft.com/en-gb/archive/blogs/ericlippert/not-everything-derives-from-object)
```

We should however also mention that while an object of a child type can be implicitly converted to its parent class, when value types, such as the simple types like `int`, are converted to objects this causes what is known as [boxing](boxing).
More on that later though.





## Exercises

```{exercise}
What does it mean that an object is *stateful*?
```

```{exercise}
What is *message passing*?
```

```{exercise}
What is *encapsulation*?
```

```{exercise}
What is *information hiding*?
```

```{exercise}
What kinds of types, in C#, are not *convertible* to the type `object`?
```
