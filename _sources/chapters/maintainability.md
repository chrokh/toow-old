# Maintainability

```{warning}
Work in progress.
```

## Motivation

How do you provide value today without compromising the possibility to provide even more value in the future?

Before the advent of agile software development methods it was commonly believed that the cost of change exponentially increases with time.
The more time you spend in a project, the more stuff you have built, the harder it is to maintain, and the harder it is to change.
See {numref}`fig:cost-of-change`.

```{figure} http://agilemodeling.com/images/costOfChangeTraditional.gif
:name: fig:cost-of-change
:height: 300px

Before the advent of agile software development methods it was commonly believed that the cost of change exponentially increases with time.
[Image to be replaced.] [[Source]](http://www.agilemodeling.com/essays/costOfChange.htm)
```

% TODO: Source for Facebook motto.
At the same time, software rules the world, and is developed faster than ever before.
To remain in business you have to adapt to the constant stream of ever changing requirements.
Survival of the fittest.
"Move fast and break things" was an internal motto used at Facebook (now: Meta) until 2014.
Zuckerberg was reported to have said that "unless you are breaking stuff, you are not moving fast enough" {cite:p}`todo`.

% TODO: Reference!
```{epigraph}
Move fast and break things.

-- Interal motto at Facebook until 2014.
```

While this is not a book on agile methods, and while there are many ingredients to moving fast, software quality certainly is one of them.
If, whenever we have to change something in our code, we have to rewrite half of our code base then clearly the time it will take to implement a change will exponentially increase as our code base grows.
If however, we diligently [refactor](refactoring) to reduce coupling and improve maintainability then we ought to be able to flatten out the curve.

When Kent Beck proposed the agile method known as eXtreme Programming (XP) he argued that in XP the cost of change curve is flat.
See {numref}`fig:agile-cost-of-change`.
A key idea in agile methods is that of short iterations and feedback loops.
By shipping our software as soon as possible and as often as possible we get the benefit of feedback as soon as possible.
This idea of releasing early and often is made possibly, partly, by writing software in a way that doesn't require that we rewrite the whole system from scratch every time we're faced with a tiny change request.

```{figure} http://agilemodeling.com/images/costOfChangeBeck.gif
:name: fig:agile-cost-of-change
:height: 300px

Authors of some agile methods such as Kent Beck of eXtreme Programming aruged that the cost of change curve can be flattened out.
[Image to be replaced.] [[Source]](http://www.agilemodeling.com/essays/costOfChange.htm)
```

What would software that supports the fast iterations of agile methods look like?
Well, I hold that such software is best described as being "maintainable".
We could have focused on the word "changeable" rather than "maintainable", but that word isn't broad enough.
Software architecture cannot just merely solve for changeability.
In order to, for example, [verify and validate](correctness) that the code actually meets the [requirements](requirements) it must also be testable.
%Also, in order for

Most of the time, software is a service, not a product.
We have to keep rewriting and rewriting to meet the needs of our customers and in order to stay in business.

% TODO: Replace source with real source.
```{epigraph}
The software isn’t finished until the last user is dead.

-- Sidney Markowitz [[Source needed](https://maximilianocontieri.com/software-engineering-great-quotes)]
```

In summary, we are now talking about maintainability because there's a fundamental need for being able to change our programs.
Said differently, we need to be able to provide value today without compromising our ability to provide even more value in the future.



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

Remember the anti-pattern [shotgun surgery](concrete-injected-object-composition) that we mentioned in the chapter on concrete injected object composition?
When your code is [tightly coupled](coupling) and monolithic we have to change code in many different places as soon as we want to make a change.
Compare this to code that is loosely coupled and modular where a change requires us to change code in very few places.

What are some ways to achieve modularity in software?
We will talk about all these principles in future chapters, but here are a few quick notes with forward references.
By following the [single responsibility principle](single-responsibility-principle) and the [interface segregation principle](interface-segregation-principle) we avoid putting too many concerns in a single place and organize our code based on "reasons to change".
By following the [open-closed principle](open-closed-principle) and the [dependency inversion principle](dependency-inversion-principle) we make it possibly to mostly having to *add* code rather than *change* code whenever we want to change the behavior of the system.



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

In business, authors like John Warrillow (see for example "Built to sell" {cite:p}`warrillow2011`) have popularized the value of not expanding into too many verticals too soon.
The argument being that we should create a strong system that sells few products or services before we venture into new verticals which would require an even broader system.

In my reading, we should, in the context of maintainability, interpret "reusability" as possible reusability right now or in the immediate future.
However, the cost-benefit analysis of possible reuse in the future is not always straight-forward.
It ought to go something like this:

```{epigraph}
The cost of developing an abstraction now must be lower than the present value of the cost of developing that abstraction in the future, multiplied by the probability that we need that abstraction in the first place.
```

I'm by no means suggesting that we actually do this calculation on paper.
I'm suggesting that when we reason about whether to get out and hunt for an abstraction, our reasoning should follow those general lines.
Do note that the model is too simplistic, since it doesn't take the possible immediate benefits of using the abstraction for other purposes now.

%However, when we reason about reuse in the immediate future, the value of being able to reuse a given asset minus the cost of having to write it in a more general way now, must be greater than the cost of simply writing that code later.

Either way, we should *not* use this maintainability characteristic to justify increasing the level of abstraction only because that abstraction will be useful *once we expand into a new vertical*.
Striving to make software assets usable across multiple products, that don't already exist, I believe, is a strategy that will put you out of business.

> A bird in the hand is worth two in the bush.

```{seealso}
If you're intrigued by this line of economic reasoning I would recommend that you look into the concept of the [time value of money](https://en.wikipedia.org/wiki/Time_value_of_money).
This will lead you to understand how to do [Present Value (PV)](https://en.wikipedia.org/wiki/Present_value) calculations which hopefully will forever change how you think about how we should spend our time writing code.
I also happen to have an informal video on this topic.

<iframe width="267" height="150" src="https://www.youtube.com/embed/c3kUElWSu5Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

On the flipside, what does it matter if modularity is high if reusability is low?
In such a case I would guess that we're still duplicating code.
Possibly without realizing it.
Think about it.
Is modularity even useful if we don't have reusability?
Isn't the idea to strive for fundamental abstractions so that we can build our systems from as few abstractions as possible?

Language Integrated Queries ([LINQ](linq)) is a great feature in the .NET framework which I think serves as a great example of high reusability.
It's not just about the code being modular in the sense of being isolated from cascading change.
It's also about being able to use the same code to solve a wide array of potential problems.

When I did my Ph.D., my supervisor used advise me to: "stick your head in as few guillotines as possible" when writing research papers.
With this he meant, say as little as you can, because the more you say, the more risk of error you introduce.
I think this is great advice.
Do few things, and do them with utter excellence.
But, make sure that the things you do are so useful that they can be used for lots of other different things.

```{seealso}
Another prime example of building a small set of small but enormously reusable combinators is the classic work of Simon Peyton Jones {cite:p}`peytonJonesEtAl2000` on the composition of financial contracts.
Whenever you start dipping your toes in functional programming I highly recommend that you put this research paper on your todo list.
There's also a [video recording](https://www.youtube.com/watch?v=b0zFmWsnoV0) available online of a presentation Simon Peyton Jones did back in 2008.
```

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

Code golf is a type of programming competition wherein players try solve a given problem with the smallest possible source code.
In other words, they try to write as short programs as possible.
Code golf solutions are, for all practical purposes, non-readable for humans.
Consequently, they are unmaintainable.

To change an unreadable program we must either rewrite the program from scratch or we must spend an enormous time dissecting the code line-by-line or perhaps even character-by-character.

Consequently, the goal cannot be for components to be modular, reusable, and small.
Instead, they must be modular, reusable, and analysable.

Let's say it in a different way.
Here's how I think about it:

```{important}
Software must be analysable at all levels of abstraction that we are unwilling to throw out and rewrite whenever the smallest possible change is required.
```

In other words, it isn't obvious to me that a system should be equally analysable at all levels.
Sometimes we just want to give something a name, and stick some complex (but limited) logic behind that name, so that we don't have to think about it too much in the future.
In design patterns lingo some might call this a [Facade](facade-pattern).

Importantly though, I would argue that this is only a reasonable thing to do if the contained code is so "small" that we would be willing to throw it out and rewrite it from scratch if we had to solve a minor bug or change it some other trivial way.
If we are not willing to throw it out, then the code must exhibit analyse ability.

In other words, we must write code under the assumption that we always will get it wrong the first time.


(modifiability)=
### Modifiability

```{epigraph}
Degree to which a product or system can be effectively and efficiently modified without introducing defects or degrading existing product quality.

-- {cite:t}`isoiec25010`
```

I never said that the ISO/IEC 25010:2011(E) standard is perfect did I?
Since modularity is defined in terms of allowing modifications of one component without having an impact on other components it could be argued that the modifiability characteristic is quite overlapping.

So let us instead reinforce how modularity enables modifiability.
When we want to change something, we have to do a massive rewrite or whether we execute our change in small chunks?
Are you able to split your massive change into smaller changes that can be independently deployed to your live product?
If not, then I would call that less modifiable.

Perhaps you are familiar with the agile ideas of continuous delivery and continuous deployment.
The former meaning that we integrate all development code into the "mainline" as frequently as possible and as a consequence assemble deployable and tested versions.
In continuous delivery the last step of deployment is also automatically executed.

Naively, we could describe the process something like this.

1. I complete work on a feature on my machine.
2. I run local tests on my machine to make sure that my code works.
3. I commit and push my code to our central repository.
4. The code is automatically integrated with the rest of the system in a staging environment.
5. Our shared test suite is run to ensure that I did not introduce any bugs.
6. If there are no bugs then my code is automatically pushed/pulled into the mainline, integrated, and published.

This is an oversimplification, and this process might of course involve a number of other steps such as pull requests, code reviews, manual quality assurance, and so forth.
Nevertheless, wouldn't you say that the modifiability of such a system is quite high?

Of course, that example has almost nothing to do with coding, and almost everything to do with what we usually call [DevOps](https://en.wikipedia.org/wiki/DevOps) (which is short for software development and IT operations).

So how does this relate to software?
Well, if our code is not modular then it would be utterly difficult to support such a workflow with anything more than one developer on the team.


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
We'll discuss testing more in the chapter on [correctness](correctness) but think of it this way:

Every piece of code we write should come with another piece of code that exercises the first to make sure that it behaves the way it should.
If we for some reason refactor our code then our tests should tell us whether our refactoring has introduced bugs or not.

```{tip}
Continuous deployment without automated testing is a risky business and an accident waiting to happen.
```

So how do we make code testable?
Usually it boils down to one thing: isolation.
The ability to isolate a particular piece of code from other pieces of code and from external state allows us to express simple tests.

The more concrete dependencies a component has, the more difficult it is to test since the state space of these dependencies may affect the state space of our first component.
This is why [dependency inversion](dependency-inversion-principle) and therefore [abstract injected object composition](abstract-injected-object-composition) is so important.
If a component that we want to test, itself creates other concrete components then we won't only have to test the constructing component but also the constructed components.
If on the other hand a component only depends on injected abstractions then we only have to test how this particular component interacts with any given injected dependency on without having to worry about the states of any concrete dependency that might be injected at run-time.

```{seealso}
If you are interested in testability, and already know a tiny bit about testing, then I would highly recommend that you continue your exploration with the following videos:

1. [How to Write Clean, Testable Code](https://youtu.be/XcT4yYu_TTs) by Miško Hevery.
2. [Integrated tests are a scam](https://youtu.be/fhFa4tkFUFw) by J.B. Rainsberger.
%3. My own [brief summary](https://youtu.be/tbSml2iyDt4) of the original video on integrated tests being a scam.
```



## Exercises

```{exercise}
What are the five characteristics of maintainability listed by ISO/IEC 25010:2011?
Explain each of them in your own words.
```

```{exercise}
Explain the benefits of *generics* in terms of the five characteristics of maintainability listed by ISO/IEC 25010:2011?
```

```{exercise}
Explain the benefits of *abstract injected object composition* in terms of the five characteristics of maintainability listed by ISO/IEC 25010:2011?
```



% TODO: Use any of this old intro stuff?
%
%What will you learn in this book?
%In this book we are first and foremost concerned with **providing value by means of programming** in an object oriented language.
%If you are familiar with the philosophies of Lean manufacturing, Lean startup, or Agile methods then you will know where my sympathies lie.
%
%In this book we are not asking what a beautiful program looks like and we are not asking what a technically efficient program (in terms of space time complexity) looks like.
%In this book we are exploring how to write programs that not only make money today but also can keep making money in the future.
%In many domains, this is not the same challenge.
%So if you are interested in becoming a well-rounded, what we might call, architect, designer, or modeller of object oriented solutions, then you are in the right place.
%
%```{important}
%In this book we are exploring how to write programs that not only make money today but also can keep making money in the future.
%```
%
%I say "make money" because it points our attention to the challenge of balancing costs and benefits.
%It points us to the challenge of always thinking in terms of return on investment (ROI).
%Clearly, we write software for other reasons too.
%Sometimes we write open source software and sometimes we work for non-profit agencies.
%But no matter who you write the software for, if we are aiming to provide value (or *utility* if you prefer) for someone then we are always faced with the challenge of balancing input costs with output value.
%
%In this book we are neither concerned with writing the fastest program nor are we concerned with writing the most elegant program.
%This book does not thinking of code as "l'art pour l'art", art for art's sake.
%In this book we see code as a means to an end.
%
%```{important}
%Code is a means to an end.
%```
%
%Exploring how to solve problems using code and exploring a language out of pure curiosity is of course an excellent thing.
%I myself have written countless pieces of code and read countless pages of documentation just for the sake of scratching my own itch.
%However, with this book I want to encourage you to deliberately practice to become a programmer that knows how to weigh the pros and cons of a solution in the face of real world business constraints and requirements.
