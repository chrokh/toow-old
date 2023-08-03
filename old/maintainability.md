# Maintainability

## Example

% TODO: Add narrative in LEGO example where you can explain modularity as the ability to change any particular feature by replacing a particular brick on the spacecraft. How can you have high modularity with low reusability? Well, what if the studs of each individual brick in the model is placed in a different location so that all bricks in the model are unique. A brick type is a class and any given brick an object. Compare this to only using a few types of bricks. Reusability would in the latter case be high. It might seem odd to suggest that all bricks would be unique but then you introduce the DUPLO example. In that case, all bricks in the set are of unique types.

```{figure} https://www.lego.com/cdn/cs/set/assets/blt95f3ee09ff3a70a7/10944.png?fit=bounds&format=webply&quality=80&width=800&height=800&dpr=1.5
:figclass: margin
:name: fig:duplo-space-shuttle

LEGO DUPLO Space Shuttle Mission.
[[Image source]](https://www.lego.com/en-us/product/space-shuttle-mission-10944)
[[Click to buy]](http://amazon.christopherokhravi.com/?id=B08T21RZ2Q)
```

```{figure} https://www.lego.com/cdn/cs/set/assets/blt00ba54004c17e820/10283.jpg?fit=bounds&format=webply&quality=80&width=800&height=800&dpr=1
:figclass: margin
:name: fig:lego-space-shuttle

LEGO NASA Space Shuttle Discovery.
[[Image source]](https://www.lego.com/en-us/product/nasa-space-shuttle-discovery-10283)
[[Click to buy]](http://amazon.christopherokhravi.com/?id=B091GY3FLG)
```

Let's think about this in terms of LEGO.
Let's say we want to build a space shuttle.
LEGO offers at least two options.
One of the sets (see {numref}`fig:duplo-space-shuttle`) that LEGO offers is using the larger DUPLO pieces and the whole set consists of 23 pieces.
The ship itself is in this set however only comprised of two pieces but can interface with additional pieces on the top, bottom, wings, and the thrusters.
Another set (see {numref}`fig:lego-space-shuttle`) is using the smaller LEGO pieces and the whole set contains a stunning 2,354 pieces.
In this set the vast majority of pieces seems to be used for the ship itself.

The problem with [reasoning by analogy](https://en.wikipedia.org/wiki/Argument_from_analogy) (which we are doing since we are trying to make inferences about software while reasoning about LEGO) is a lack of precision.
What does maintainability even mean in terms of LEGO?

Let's think about what a piece looks like as the *features* of a piece, and the way it connects to other pieces as the *interface* of that piece.
We've discussed the idea of features in the chapter on [validation](validation), and we'll formalize the term [interface](interfaces) in a later chapter.
So when we talk about changing a model built with LEGO we mean that we want to change the features and have to do so while respecting that any connected pieces have to interface with eachother.

%**Two ways we could think about this is in terms of surface area of a piece and the number of problems that are solved by a particular piece.
%Let's choose the latter.**

At first glance, the simple DUPLO model with few pieces ({numref}`fig:duplo-space-shuttle`) might seem more maintainable than the more complex LEGO model with tons of pieces ({numref}`fig:lego-space-shuttle`).
Irrespectively what maintainability characteristic we want to hone in on.
However, we must remember to think about these models as examples of how we choose to structure our code.
So, we shouldn't merely think about these two models, but rather of whole systems that contain many variations of these two models.
When choosing the same strategy over and over again, which system ends up being more maintainable?

```{tip}
When thinking about whether something is a good or bad design decision we should ask ourselves what happens if we take our current practice to the extreme.
What happens if I design my whole system like this?
What happens if I compose ten objects like this?
```


### Modularity

Which of the two models is more modular?
Well, think about the definition of modularity.
We want the system to be composed of discrete components that we can change without also having to change every other individual piece of the system.

If we don't change how a piece interfaces with other pieces then we're free to change away.
However, if we consider changing how different types of pieces interface with each other we can discuss much more interesting changes.

Consider the first set, the one with very few DUPLO pieces.
Let's say that we change how one piece interfaces with other pieces.
In terms of the number of pieces that also have to change, it seems trivial.
If we change the top piece of the shuttle, we might have to change the bottom piece and the "fire" pieces, in order to accommodate this change of the interface.
However, if the landed shuttle itself consists of, say, seven pieces or so, then having to change three out of seven pieces means that we had to make changes in about 40% of the system.
That can't be good.

Let's consider the second set, the one with many small LEGO pieces.
Pick any piece, and come up with a change that changes the interface of that piece.
I bet that no matter how you decide to change the interface, we'll be able to come up with a set of changes for the pieces closest to the piece we've changed that allows us to accommodate the change without having to change anywhere near 40% of all pieces involved in the shuttle.
That is modularity.


### Reusability

How reusable are the space shuttle pieces in the DUPLO model built with only a few pieces ({numref}`fig:duplo-space-shuttle`)?
What other things could we build using these pieces?
Not a lot.

Now consider the reusability of the pieces that make up the space shuttle built from thousands of pieces ({numref}`fig:lego-space-shuttle`).
What other things could we build using these pieces?
A tremendous amount of things.
There are so many pieces and they are almost all compatible with eachother.
The only limitation is our imagination.


### Analysability

%What about analysability?
%Which of the two LEGO models are more analysable?

Let's say we're unable to fit DUPLO figures in the cockpit of the DUPLO ship ({numref}`fig:duplo-space-shuttle`).
When reasoning about what to change in order to accomodate this we'll likely conclude that we need to remould the top piece.
However, when doing that we have to take into consideration how it interfaces with the bottom piece, how it affects the cargo area, how it affects the wings, how it interfaces with the thrusters, and so forth.
Since the ship itself is essentially comprised of two pieces we quite literally have to take all pieces of the system into account.
If we're considering the landed ship we need to keep around four (top, bottom, and two fire pieces) out of seven pieces in mind when analysing the cockpit.
That's approximately 57% of the system.
Not ideal.

What about the LEGO model with lots of pieces ({numref}`fig:lego-space-shuttle`)?
In this model, the cockpit is now comprised of multiple pieces so to analyse the cockpit we must analyse all these pieces.
Without counting the number of pieces that are interrelated to the cockpit pieces we can clearly see that it's no more than a handfull.
Let's exaggerate and say that we need to analyse 20 pieces.
20 pieces out of 2000 is merely 1%.
What if it's 40 pieces?
Well, that's merely 2%.
A farcry from the 57% of the DUPLO model.

In the LEGO model with many pieces we can analyse any single piece or any set of pieces without having to simulteneously analyse a large number of other pieces.

The most interconnected (or [coupled](coupling) as we will soon learn to call it) piece of the LEGO model seems to be (what I assume is) the swinging doors to the cargo area.
Let's exaggerate again and say that any such piece is connected to 100 other pieces.
I certainly don't think that it is, but let's say that it is.
Even if it was then we're still only looking at about 5% of the whole system.
Still a whole lot better than 57%.


### Modifiability

As we discussed in the definition section of this chapter, modifiability follows modularity in software.
So, if the LEGO model is more modular than the DUPLO model then it should also be more modifiable.

Intuitively we can also see that this is the case.
If we want to change the features of some piece (meaning the look of the piece) in a way that also affects the interface of it, then we will only have to change a (in relative terms) very small number of other pieces that interface with that piece.

In the DUPLO model however, if we want to change the interface of some piece we're quite likely to have to change the interface of a large portion of the whole system (even though it in absolute terms means that a small number of pieces have to change).


### Testability

What does testability mean in terms of LEGO?
Since this is not a book on testing we're not going to dive to deeply into this question.
However, we might say that we want to test all features and the whole interface of a piece.

So how *effectively* and *efficiently* can we test any particular type of piece?
Well, in the case of the LEGO model it's really quite simple.
Each piece is trivially simple and writing tests for it will be straightforward and uncomplicated.

Each piece in the DUPO model however, is much more complicated.
The number of *features* per piece is much higher and the interface is much bigger.

Regarding more features.
Consider the fact that there are two cargo doors for example.
The features of both of these doors have to be tested since they are features of a piece rather then individual pieces.
We're duplicating code.
Remember, the whole top piece of the DUPLO ship is a monolithic piece, so we have to write tests for all its features.
Compare this to the doors in the Lego model where each individual door is its own piece that can be tested in isolation.

The same holds true for the interface.
The interfaces of the DUPLO pieces are much bigger.
When testing the top piece we have to test the thruster interface, the top interface in the back, the top interface in the front, and the bottom interface.
There are many places where you can connect other pieces to the piece.


Where we'll really run into problems in the DUPLO model is if we fear that there are dependencies between the features or interfaces.
Consider the fact that the two cargo doors can be opened for example.
This means that the cargo doors have at least two states: closed and open.
Any other test in the monolithic top piece that might be affected by whether the cargo doors are openened or closed will have to be tested in both states.
In theory, any other interface or feature of the top piece could be affected and so we should do this for all the tests.
Not ideal.

Remember how we said that most problems in testing boils down to isolation?
Testing the DUPLO piece is more difficult because it isn't possible for us to isolate individual or smaller sets of features and interfaces from other features and interfaces.
We can't test the cargo doors for example, without also talking about how they interact with, for example, the wings.


