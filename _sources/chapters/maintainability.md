# Maintainability

## Motivation

```{epigraph}
How do we provide value today without compromising our ability to provide value in the future?
```

Before the advent of agile software development methods it was commonly believed that the cost of change exponentially increases with time.
The more time you spend in a project, the more stuff you have built, the harder it is to maintain, and the harder it is to change.
See {numref}`fig:cost-of-change`.
More stuff equals more problems equals lower speed.
Seams reasonable right?
Don't worry, we'll talk about how to mitigate this in a moment.

```{figure} http://agilemodeling.com/images/costOfChangeTraditional.gif
:name: fig:cost-of-change
:height: 260px

Before the advent of agile software development methods it was commonly believed that the cost of change exponentially increases with time.
[Image to be replaced.] [[Source]](http://www.agilemodeling.com/essays/costOfChange.htm)
```

% TODO: Source for Facebook motto.
At the same time, software rules the world, and is developed faster than ever before.
To remain in business you have to adapt to the constant stream of ever changing requirements.
Only the fittest will survive.

%"Move fast and break things" was an internal motto used at Meta (then: Facebook) until 2014.
Mark Zuckerberg, CEO of Meta (then: Facebook), is reported to have said that "unless you are breaking stuff, you are not moving fast enough" {cite:p}`todo`.
Allegedly, the phrase, is no longer used as a motto at Meta.
However, it speaks volumes as to how fast you need to move if you want to eat the competition rather than be eaten.

% TODO: Reference!
```{epigraph}
Move fast and break things.

-- Interal motto at Facebook until 2014.
```

Think of it this way.
Software is more like a service, and less like a product.
We have to keep rewriting and rewriting to meet the ever-changing needs of our ever-changing customer-base in order to stay ahead of our ever-changing competition.
You don't write a piece of software and then ship it.
That model died when the internet became mainstream.

It's like the perfect storm.
We have to keep rewriting our software to stay in business, but everytime we rewrite it, it becomes harder and harder to change.

% TODO: Replace source with real source.
```{epigraph}
The software isn’t finished until the last user is dead.

-- Sidney Markowitz [[Source needed](https://maximilianocontieri.com/software-engineering-great-quotes)]
```

When Kent Beck proposed the agile software development method known as eXtreme Programming (XP) he argued that in XP the cost of change curve is flat.
See {numref}`fig:agile-cost-of-change`.
A key idea in agile methods is that of short iterations and feedback loops.
By shipping our software as soon as possible and as often as possible we get the benefit of feedback as soon as possible.
This idea of releasing early and often is made possibly, partly, by writing software in a way that doesn't require that we rewrite the whole system from scratch every time we're faced with a tiny change request.

```{figure} http://agilemodeling.com/images/costOfChangeBeck.gif
:name: fig:agile-cost-of-change
:height: 260px

Authors of some agile methods such as Kent Beck of eXtreme Programming aruged that the cost of change curve can be flattened out.
[Image to be replaced.] [[Source]](http://www.agilemodeling.com/essays/costOfChange.htm)
```

This is not a book on agile methods and there are many ingredients to moving fast in the face of uncertainty.
However, software quality is certainly one of the ingredients that determine whether we move fast or slow.
How we write our code determines how difficult it is to rewrite it.
So, if half the game is to be able to rewrite our code as quickly as possible then software quality ought to be immensely important.

```{important}
How we write our code determines how difficult it is to change.
```

The core problem that makes software difficult to change is known as [coupling](coupling).
This is a root of much evil that causes the cost of change to grow exponentially.
We'll talk about coupling in its own chapter but in short the problem is this:
If all modules are connected to eachother, then everytime we add another module, the number of connections exponentially increases.
If however, we diligently [refactor](refactoring) to reduce coupling, so that any given module is connected to as few other modules as possible, we improve maintainability and in theory we will be able to "flatten" out the cost of change curve.

% TODO: Coupling figure here.

What would software that supports the fast iterations of agile methods look like?
Well, I hold that such software is best described as being "maintainable".
We could have focused on the word "changeable" rather than "maintainable", but that word isn't broad enough.
Software architecture cannot just merely solve for changeability.
In order to, for example, [verify](verification) and [validate](validation) that the code actually meets the [requirements](requirements) it must also be testable.
%Also, in order for

%In summary, we are now talking about maintainability because there's a fundamental need for being able to change our programs.

```{important}
We need to be able to provide value today without compromising our ability to provide more value in the future.
```

% TODO: MUST TALK MORE ABOUT Premature abstraction!?



% TODO: What about the other characteristics from here: https://en.wikipedia.org/wiki/Software_design#Design_considerations

(maintainability:characteristics)=
(maintainability:definition)=
## Definition

And so we find ourselves staring at the word "maintainability" wondering what it actually means.
Lucky for us, the standards document ISO/IEC 25010:2011 {cite:p}`todo` has defined "maintainability" in the context of software as being comprised of the following five characteristics.

1. Modularity
2. Reusability
3. Analysability
4. Modifiability
5. Testability

We will now dissect the characteristics one by one.


(modularity)=
### Modularity

```{epigraph}
Degree to which a system or computer program is composed of discrete components such that a change to one component has minimal impact on other components.

-- {cite:t}`isoiec25010`
```

When we want to change something in a particular place in our code base, how many other places do we also have to change to make this change happen?
This is the question that modularity deals with.

When your code is [tightly coupled](coupling) and monolithic we have to change code in many different places as soon as we want to make a change.
When code is loosely coupled and modular then a change requires us to change code in very few places.

What are some ways to achieve modularity in software?
We will talk about all these principles in future chapters, but in short, the idea is to build simple things that can be composed in order to solve complex problems.

%but here are a few quick notes with forward references.
%By following the [single responsibility principle](single-responsibility-principle) and the [interface segregation principle](interface-segregation-principle) we avoid putting too many concerns in a single place and organize our code based on "reasons to change".
%By following the [open-closed principle](open-closed-principle) and the [dependency inversion principle](dependency-inversion-principle) we make it possibly to mostly having to *add* code rather than *change* code whenever we want to change the behavior of the system.



(reusability)=
### Reusability

```{epigraph}
Degree to which an asset can be used in more than one system, or in building other assets.

-- {cite:t}`isoiec25010`
```

%The choice of the word "system" in the quote above is, in my view, quite unfortunate.
%One might read "another system" as meaning "another product".

In software we have the saying "premature abstraction".
This saying captures the problem of generalizing code before we have sufficient information to determine what problems we actually will need to solve.

```{figure} https://m.media-amazon.com/images/I/51uaWR-TlbL._AC_SY780_.jpg
:figclass: margin
:width: 200px

[Built to sell, by John Warrillow](http://amazon.christopherokhravi.com/?id=1591845823).
```

In business, authors like John Warrillow (see for example "Built to sell" {cite:p}`warrillow2011`) have popularized the value of not expanding into too many verticals too soon.
The argument being that we should create a strong system that sells few products or services before we venture into new verticals which would require an even broader system.

For us as software developers, this means that we should refrain from thinking too much about how the code that we write now could be used to solve problems in the future, that we don't yet know if we will face.
What does it matter that we have software that can solve problems in the future if we our lack of solutions to the problems that we have now take us out of business?

In my reading, we should, in the context of maintainability, interpret "reusability" as possible reusability right now or in the immediate future.
However, the cost-benefit analysis of possible reuse in the future is not always straight-forward.
It ought to go something like this:

```{epigraph}
The cost of developing an abstraction now must be lower than the present value of the cost of developing that abstraction in the future, multiplied by the probability that we need that abstraction in the first place.
```

I'm by no means suggesting that we actually ever do this calculation.
I'm suggesting that when we reason about whether to get out and hunt for an abstraction, our reasoning should follow those general lines.
The formula is obviously too simplistic.
For one it doesn't take into account the possible immediate benefits of reusing the abstraction for other purposes now.

%However, when we reason about reuse in the immediate future, the value of being able to reuse a given asset minus the cost of having to write it in a more general way now, must be greater than the cost of simply writing that code later.

So we should *not* use this reusability characteristic to justify increasing the level of abstraction *only* because that abstraction will be useful *once we expand into a new vertical*.
Striving to make software assets usable across multiple products, that don't already exist is, arguably, a strategy that will put you out of business.

```{epigraph}
A sparrow in thy hand is better than a thousand sparrows flying.

-- Ancient proverb.
```

```{seealso}
If you're intrigued by this line of economic reasoning I would recommend that you look into the concept of the [time value of money](https://en.wikipedia.org/wiki/Time_value_of_money).
This will lead you to understand how to do [Present Value (PV)](https://en.wikipedia.org/wiki/Present_value) calculations which hopefully will forever change how you think about how we should spend our time writing code.
I also happen to have an informal (albeit old) [video](https://youtu.be/c3kUElWSu5Y) on this topic.
```

On the flipside, what does it matter if modularity is high if reusability is low?
In such a case I would guess that we're still duplicating code.
Possibly without realizing it.
Think about it.
Is modularity even useful if we don't have reusability?
Isn't the idea to strive for fundamental abstractions so that we can build our systems from as few abstractions as possible?

% TODO: Reintroduce this?
%Language Integrated Queries ([LINQ](linq)) is a great feature in the .NET framework which I think serves as a great example of high reusability.
%It's not just about the code being modular in the sense of being isolated from cascading change.
%It's also about being able to use the same code to solve a wide array of potential problems.

When I did my Ph.D., my supervisor used advise me to: "stick your head in as few guillotines as possible" when writing research papers.
With this he meant, say as little as you can, because the more you say, the more risk of error you introduce.
I think this is great advice.
Do few things, and do them with utter excellence.
But, make sure that the things you do are so useful that they can be used for lots of other different things.

% TODO: Reintroduce this?
%```{seealso}
%Another prime example of building a small set of small but enormously reusable combinators is the classic work of Simon Peyton Jones {cite:p}`peytonJonesEtAl2000` on the composition of financial contracts.
%Whenever you start dipping your toes in functional programming I highly recommend that you put this research paper on your todo list.
%There's also a [video recording](https://www.youtube.com/watch?v=b0zFmWsnoV0) available online of a presentation Simon Peyton Jones did back in 2008.
%```

But remember, reusability is a means, not an end.
Reusability, only for the sake of reusability is not economically justifiable.
We must strive for reusability only when it makes sense to actually reuse.

% TODO: My thesis? Showed that this can be applied to policy interventions.


(analysability)=
### Analysability

```{epigraph}
Degree of effectiveness and efficiency with which it is possible to assess the impact on a product or system of an intended change to one or more of its parts, or to diagnose a product for deficiencies or causes of failures, or to identify parts to be modified.

-- {cite:t}`isoiec25010`
```

Think of your code as a model of the real world.
The fewer abstractions your model consists of, and the simpler these abstractions are the simpler that model is to reason about.
Notice how we said "simple" rather than "small".
Small does not always mean analysable.
Simple things are simple to analyse.

Consequently, the goal cannot be for components to be modular, reusable, and small.
Instead, they must be modular, reusable, and analysable.

Code golf is a type of programming competition wherein players try solve a given problem with the smallest possible source code.
In other words, they try to write as short programs as possible.
Code golf solutions are, for all practical purposes, non-readable for humans.
Consequently, they are not analysable.

But why would I need to change my code you might ask?
If I just write it correctly the first time around, then there's no need for analysability.
Well, think back to the motivation section of this chapter and the chapters on [validation](validation) and [verification](verification).
These are non-trivial problems causing us to think of software as something that's built incrementally.

```{tip}
Write code under the assumption that we will get it wrong.
% the first time.
```

To change an unreadable program we must either rewrite the program from scratch or we must spend an enormous time dissecting the code line-by-line or perhaps even character-by-character.

Let's say it in a different way.
I like to think about analysability in terms of whether or not I'm willing to rewrite any particular piece of code from scratch.

```{important}
Software must be analysable at all levels of abstraction that we are unwilling to throw out and rewrite from scratch whenever the smallest possible change is required.
```

%TODO: What did I mean here?
%Sometimes we just want to give something a name, and stick some complex (but limited) logic behind that name, so that we don't have to think about it too much in the future.
%In design patterns lingo some might call this a [Facade](facade-pattern).

In other words, it isn't obvious to me that a system should be equally analysable at all levels.
It might be reasonable to give up analysability for a piece of code that is so "small" that we would be willing to throw it out and rewrite it from scratch any time we have to solve a minor bug or change it some other trivial way.
However, if we are not willing to throw it out, then the code ought to exhibit analysability.


(modifiability)=
### Modifiability

% TODO: THERE'S MORE TO THE DEFINITION THAN WHAT WE'RE DISCUSSING. THIS NEEDS TO BE EXPANDED.

```{epigraph}
Degree to which a product or system can be effectively and efficiently modified without introducing defects or degrading existing product quality.

-- {cite:t}`isoiec25010`
```

I never said that the standard is perfect did I?
Since modularity is defined in terms of allowing modifications of one component without having an impact on other components it could be argued that the modifiability characteristic is quite superflous in the context of software quality.

So let us instead reinforce how modularity enables modifiability.
When we want to change something, do we have to do a massive rewrite or whether we execute our change in small chunks?
Are you able to split your massive change into smaller changes that can be independently deployed to your live product?
If not, then we might call that less modifiable.

But why does the modifiability characteristic exist?
Let's think about this beyond software quality.
Let's think about process.

Perhaps you are familiar with the agile ideas of continuous delivery and continuous deployment.
The former meaning that we integrate all development code into the "mainline" as frequently as possible and as a consequence assemble deployable and tested versions.
In continuous delivery the last step of deployment is also automatically executed.

Naively, we could describe the process something like this.

1. I complete work on a feature on my machine.
2. I run local tests on my machine to make sure that my code works.
3. I commit and push my code to our central repository.
4. The code is automatically integrated with the rest of the system.
5. The code is automatically tested together with the rest of the system.
6. If there are no bugs then my code is automatically pushed/pulled and integrated into the publishable mainline.
7. The code is published.

```{note}
If we do all steps up and to 4, we would say that we do "continuous integration".
Up and to 5 we would call it "continuous testing".
Up and to 6 we would call it "continuous delivery".
Up and to 7 we would call it "continuous deployment".
```

This is an oversimplification, and this process might of course involve a number of other steps such as pull requests, code reviews, manual quality assurance, and so forth.
Of course, that example has almost nothing to do with coding, and almost everything to do with what we usually call [DevOps](https://en.wikipedia.org/wiki/DevOps) (which is short for software development and IT operations).

%Nevertheless, wouldn't you say that the modifiability of such a system needs to be quite high?

So how does this relate to software?
Well, if our code is not modular then it would be utterly difficult to support such a workflow with anything more than one developer on the team.
To integrate and test at such a high pace and with such a level of automation, we need modularity.


(testability)=
### Testability

```{epigraph}
Degree of effectiveness and efficiency with which test criteria can be established for a system, product or component and tests can be performed to determine whether those criteria have been met.

-- {cite:t}`isoiec25010`
```

```{note}
We're focusing on the second part of the "testability" definition since the first is mostly related to process, rather than code.
Process is outside the scope of this book.
```

A key ingredient that enables the practice of continuous integration and continuous delivery/deployment is automated software testing.
We've discussed this in some detail in the chapters on [validation](validation) and [verification](verification), but think of it this way:

Every piece of code we write should come with another piece of code that exercises the first to make sure that it behaves the way it should.
Every time we write code we must also write some other code that tests the code.
If we for some reason refactor our code then our tests should tell us whether our refactoring has introduced bugs or not.

```{warning}
Continuous deployment without automated testing is an accident waiting to happen.
```

```{note}
In the software development process called "test-driven development" (TDD), we flip the order and instead say that:
Everytime we want to write some code we must first write a test that fails because that code doesn't exist.
```

So how do we make code testable?
This is not a book on testing, but let's deal with it very briefly.
Usually it boils down to one thing: *isolation*.
The ability to isolate a particular piece of code from other pieces of code and from external state allows us to express simple tests.

The more concrete dependencies a component has, the more difficult it is to test since the state space of these dependencies may affect the state space of our first component.
This is why, advanced concepts that we'll talk about later, such as [dependency inversion](dependency-inversion-principle) and therefore [abstract injected object composition](abstract-injected-object-composition) are so important.

If a component that we want to test, itself creates other concrete components then we won't only have to test the constructing component but also the constructed components.
If on the other hand a component only depends on injected abstractions then we only have to test how this particular component interacts with any given injected dependency without having to worry about which particular concrete dependency might be injected at run-time and what its states are.

```{seealso}
If you are interested in testability, and already know a tiny bit about testing, then I would highly recommend that you continue your exploration with the following videos:

1. [How to Write Clean, Testable Code](https://youtu.be/XcT4yYu_TTs) by Miško Hevery.
2. [Integrated tests are a scam](https://youtu.be/fhFa4tkFUFw) by J.B. Rainsberger.
3. My own [brief summary](https://youtu.be/tbSml2iyDt4) of the original video on integrated tests being a scam.
```


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




## Exercises

```{exercise}
What are the five characteristics of maintainability listed by ISO/IEC 25010:2011 and that we have discussed in this chapter?
Explain each of them in your own words.
```

```{exercise}
How could it possible to have a high level of modularity while also having a low level of reusability?
Why could such a system problematic?
```
% TODO: If modularity promotes allowing changes that don't cascade wouldn't this promote repeating oneself? Is the antidote to that to improve reusability?

```{exercise}
How could it possible to have a high level of modularity while also having a low level of analysability?
Why could such a system problematic?
```

```{exercise}
How could it possible to have a high level of analysability while also having a low level of modularity?
Why could such a system problematic?
```

```{exercise}
Come up with your own example of something that's not related to code but that still can be discussed in terms of the maintainability characteristics like we did in this chapter with LEGO and DUPLO.
Here are some ideas: House building, plumbing, modular furniture, lamps, Macs and PCs, and toy lines (BRIO Builder, railway systems, Meccano, etc.).
```

