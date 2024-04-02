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

# Composition over inheritance

A student of mine once gave me an excellent example of why favoring [composition](object-composition) over [inheritance](inheritance) is so useful. The student used centaurs but we'll use mermaids.

Imagine that you've got three types: Human, Fish, and Mermaid. What does the inheritance hierarchy look like?
Since a mermaid is part human and part fish, some code should be shared between mermaid and human while some code should be shared between mermaid and fish.
The three types do not form a hierarchy. They don't follow a clear parent-child relationship, yet their definitions clearly overlap.

% https://cdn.discordapp.com/attachments/1118630713084870736/1141667307735756830/chrokh_art_nouveau_illustration_of_full_body_mermaid_3606a26f-ce03-4c6d-8e61-173883c1cad9.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1141667168740720651/chrokh_art_nouveau_illustration_of_full_body_mermaid_55dca520-20e4-43d7-860a-9dced6878e9f.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1141675785967632454/chrokh_an_illustrated_disney_mermaid_f0ff6abc-9a0c-4907-b9f4-dca6182176d7.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1142001080054579283/chrokh_art_nouveau_mermaid_jumping_88812b6f-5189-4bea-a61a-66db4e00de75.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1142001075675729940/chrokh_art_nouveau_mermaid_jumping_57ac086a-29a8-4b19-8f6b-327f39f1d58b.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1142001067442327593/chrokh_art_nouveau_mermaid_jumping_01c1da7a-839b-4e11-8000-f4b755f7998c.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1142000077947293746/chrokh_art_nouveau_mermaid_jumping_363bbc19-8772-4356-94fd-6657a571d113.png
% https://cdn.discordapp.com/attachments/1118630713084870736/1142000505703387166/chrokh_art_nouveau_mermaid_with_fin_9d0bc483-bbb7-4c66-be55-6c21ab6c7e8f.png
```{figure} ../images/cover-composition-over-inheritance-1.jpg

Just like mermaids are part human and part fish, we can't always form a type hierarchy betewen complex types.
%This is the key to understanding why we should favor composition over inheritance.
```

There are two key problems with [inheritance](inheritance) that have led to the formulation of the design principle known as '[composition](object-composition) over [inheritance](inheritance)':

1. Inheritance hierarchies exclusively allow the **sharing of behavior from parent to child, but not between sibling classes**. This intrinsic design presupposes that no child class is, or ever will be, similar to any other child class in any respect. Inheritance enforces a vertical sharing of behavior, leaving no room for horizontal sharing across different child classes.
2. Inheritance rigidly binds an object's behavior to a lineage of predetermined parent classes, making it a **compile-time construct with no flexibility for run-time adaptation**. In contrast, composition brings dynamism, allowing objects to have their behaviors modified or extended at run-time by composing different components. Think back to the earlier chapter on [dependency injection](dependency-injection), where objects are assembled by injecting various behaviors or modules, resulting in a design that's ready to adapt to evolving demands.

```{admonition} Key point
Code reuse should be achieved using composition and replacing conditionals with polymorphism rather than through inheritance.
%When we're seeing duplicated code we eliminate it by means of 'has-a' rather than 'is-a'.
```

%## Understanding the principle

Let's refresh our memories of the terminology before diving in.
[Inheritance](inheritance) refers to a mechanism where a new class, known as the subclass, inherits attributes and methods from an existing class, known as the superclass.
[Composition](object-composition), on the other hand, is a mechanism where one class contains an instance of another class. Instead of inheriting properties and behaviors, a class achieves the desired functionality by having other classes as its members.


```{admonition} Video lecture
This video lecture is on [Strategy pattern](strategy-pattern) which is an embodiment of the principle of favoring composition over inheritance.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/v9ejT8FO-7I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

## The duck dilemma

To exemplify these key issues with inheritance, let's dive into a problem inspired by the well-known 'Duck problem' popularized by the iconic book [Head First: Design Patterns](https://geni.us/nlbA6).
That book, by the way, is an excellent book to keep on your shelf as a reference.

```{figure} ../images/cover-composition-over-inheritance-2.jpg

While we might label it a 'Mallard', it's the distinct set of behaviors and characteristics it exhibits that truly defines it. Composition over inheritance urges us to focus on capabilities over classifications.
```

Suppose we are creating a system to simulate a duck pond. We start by defining a base `Duck` class that define base behaviors for quacking and swimming. Now, we want to extend our system by introducing different types of ducks like mallard ducks, redheads, and rubber ducks. We decide to use inheritance. After all, all ducks can quack and swim, but some quack and swim in their special ways, right?

```{code-cell}
abstract class Duck
{
    public virtual void Quack()
        => Console.WriteLine("Quack!");

    public virtual void Swim()
        => Console.WriteLine("Swim!");
}
```

At first glance this might seem like a sensible solution. As we inherit from our `Duck` class, all we have to do is to [override](overriding) these methods and implement whatever behavior is specific to that duck. Simple, right? Unfortunately, it's almost never that simple.
Let's start writing subclasses.

```{code-cell}
class MallardDuck : Duck
{
    // Other Mallard related methods...
}

class RedheadDuck : Duck
{
    // Other Redhead related methods...
}
```

So far so good.
It might seem like we're doing something right when we observe that the swimming and quacking behavior is reused across both `MallardDuck` and `RedheadDuck`.
But what's the price we pay for this reuse?
As we expand our pond, we find that not all ducks fall neatly into our taxonomy. For instance, rubber ducks don't actually quack -- they squeak. And what if we introduce decoy ducks? They can neither quack nor squeak.

Having learned about [replacing conditionals with polymorphism](replace-conditional-with-polymorphism) we know that we should resist the urge to introduce convoluted conditional checks.
But is it even possible to incorporate these new changes into our current inheritance hierarchy?
Have a look at the code below:

```{code-cell}
class RubberDuck : Duck
{
    public override void Quack()
        => Console.WriteLine("Squeak!");

    public override void Swim()
        => Console.WriteLine("Floats.");
}

class DecoyDuck : Duck
{
    public override void Quack()
    {
        // Does nothing. Decoys cannot quack.
    }

    public override void Swim()
        => Console.WriteLine("Floats.");
}
```

Both `RubberDuck` and `DecoyDuck` have swimming behavior which is distinct from the generic swimming behavior of the base class so we override. However, since the swimming behavior is the same between the two classes we end up with duplicated code. Oh no!

```{note}
At this point you might argue that duplicating the 'floating' implementation isn't a problem if we would encapsulate it in its own method in some external helper class and then simply call that method from both places. However, that method call would still be duplicated which means that we'd still increase the [maintenance](maintainability) cost of the application making it harder to change.
```

Inheritance alone does not provide an efficient way to encapsulate behavior that's shared across subclasses. Each time we introduce a new subclass of `Duck` that want the same 'floating' behavior as `DecoyDuck` and `RubberDuck` we'd end up duplicating code. Over and over again.

Why don't we just move the 'floating' behavior to the superclass `Duck` you might ask. Sure, but then we'd instead end up duplicating the regular 'swimming' behavior used by `MallardDuck` and `RedheadDuck`.

Why don't we just add on another level of inheritance then you might ask.
Like in the abbreviated code below.

```{code-cell}
abstract class Duck { }


abstract class SwimmingDuck : Duck { }

class MallardDuck : SwimmingDuck { }

class RedheadDuck : SwimmingDuck { }


abstract class FloatingDuck : Duck { }

class RubberDuck : FloatingDuck { }

class DecoyDuck : FloatingDuck { }
```

Again, this might seem like a good idea for a while, and it does indeed solve the immediate problem.
However, we're just digging a deeper and deeper hole, making our application more and more difficult to maintain.

What if we want to introduce a `RobotDuck` that can swim like a swimming duck but squeaks like a `FloatingDuck`? Then we're back at square one. We've got a complex hierarchical architecture and still have duplicated code.

```{tip}
Problems caused by inheritance should not be solved with more inheritance.
```

%In terms of eliminating duplicated code, inheritance is not really helping us.

Inheritance is simply not a very effective tool when it comes to eliminating duplicated code.
At a fundamental level, this is because the problem we are trying to solve simply isn't necessarily hierarchical.

```{danger}
Problems that aren't hierarchical can't be solved using inheritance without duplicating code.
```

The challenge of horizontal behavior sharing becomes clear. Inheritance allows for behavior sharing from a base to a derived class but fails when certain classes need to share specific behaviors horizontally - meaning, across siblings. This scenario underlines the importance of seeking an approach that facilitates more efficient behavior sharing, steering us towards composition over inheritance.


## A compositional solution

Instead of tying behavior directly to our `Duck` classes, let's use composition. We can define each behavior (like quacking) as an interface, and then provide multiple implementations for various duck types.
We focus on encapsulating different 'types of behavior' rather than different 'types of ducks'.

To tackle the problem, we start by identifying the behaviors that are subject to change or vary across duck types. Quacking and swimming are the evident ones. By encapsulating these behaviors into separate interfaces, we create a clear separation between what a duck does (its behaviors) and the duck itself.

```{code-cell}
interface IQuackBehavior
{
    void Quack();
}
```

```{code-cell}
interface ISwimBehavior
{
    void Swim();
}
```

With our interfaces in place, we can create multiple concrete implementations representing the different behaviors:

```{code-cell}
class RegularQuack : IQuackBehavior
{
    public void Quack() => Console.WriteLine("Quack!");
}
```

```{code-cell}
class Squeak : IQuackBehavior
{
    public void Quack() => Console.WriteLine("Squeak!");
}
```

```{code-cell}
class SilentQuack : IQuackBehavior
{
    public void Quack() { /* Intentionally silent! */ }
}
```

```{code-cell}
class RegularSwim : ISwimBehavior
{
    public void Swim() => Console.WriteLine("Swim!");
}
```

```{code-cell}
class Float : ISwimBehavior
{
    public void Swim() => Console.WriteLine("Floats.");
}
```

Now, instead of 'hard-coding' behaviors into our subclasses of `Duck`, we define them as properties, allowing them to be easily changed during run-time.
Now that we're composing behaviors instead of inheriting and overriding them, we don't need inheritance so a single, concrete `Duck` class will do just fine.

```{code-cell}
class Duck  // Not abstract!
{
    // Composition:
    private IQuackBehavior quackBehavior { get; set; }
    private ISwimBehavior swimBehavior { get; set; }

    // Constructor injection:
    public Duck (IQuackBehavior quackBehavior, ISwimBehavior swimBehavior)
    {
        this.quackBehavior = quackBehavior;
        this.swimBehavior = swimBehavior;
    }

    // Delegating to the composed objects:
    public void Quack() => quackBehavior.Quack();
    public void Swim() => swimBehavior.Swim();
}
```

Using this approach, we can dynamically assign behaviors to our `Duck` instances. Like this:

```{code-cell}
Duck mallard = new Duck(
    new RegularQuack(),
    new RegularSwim()
);

mallard.Quack();
mallard.Swim();
```

```{code-cell}
Duck rubberDuck = new Duck(
    new Squeak(),
    new Float()
);

rubberDuck.Quack();
rubberDuck.Swim();
```

```{important}
Notice how there's no longer a class corresponding to each duck type like mallard. A duck is now completely defined by its capabilities rather than its data type.
```

%The concept of a type of duck is constructed at run-time by *composing* instances of the `Duck` class with specific quack and swim behavior.
The creation of different 'types' of ducks, now happens at run-time rather than compile-time.
A 'type' of duck is created by *composing* an instance of `Duck` with specific quack and swim behaviors.
We say that `Duck` **has-a** `IQuackBehavior` and `ISwimBehavior`.
This solves the second problem that we outlined in the beginning of this chapter.

Using composition, our code is much more flexible.
We can mix and match quack and swim behaviors, creating a plethora of unique ducks without needing a new subclass for each variation.

Remember the robot duck that we envisaged before? We can now trivially construct such a duck by combining an instance of `RegularSwim` with `Squeak`?
We can now trivially compose such a `Duck` at run-time without having to add or change any existing classes.

```{code-cell}
Duck robot = new Duck(
    new Squeak(),
    new RegularSwim()
);
```

But what about the mallard specific or redhead specific methods that we mentioned earlier in this chapter?
Well, nothing prevents you from reintroducing the classes `MallardDuck` and `RedheadDuck`. Well, favoring composition over inheritance means that you don't **need** the classes `MallardDuck` and `RedheadDuck`, but nothing prevents you from introducing them if you want them.

```{code-cell}
class MallardDuck : Duck
{
    // The parameterless constructor sets the appropriate
    // quack and swim behavior for a mallard duck:
    public MallardDuck () : base(
        new RegularQuack(),
        new RegularSwim()) { }

    // Other Mallard specific methods...
}
```

In a sense, we've transformed our ducks into modular entities where behaviors are mere plug-ins, interchangeable and easily maintainable.
This approach allows our ducks to adapt and evolve without having to restructure the entire class hierarchy.
This pivot to composition significantly reduces duplication and significantly improves [maintainability](maintainability) across all dimensions.

```{tip}
Focus on what your objects can *do* rather than what they *are*. Strive to encapsulate *behavior* that varies.
```


## Benefits

Let's summarize the benefits of favoring composition over inheritance.

- **Flexibility**: By breaking down behaviors into composable units, we can mix and match behaviors as needed, making it easier to meet changing requirements.
- **Duplication**: Composition reduces the chances of duplicate code, thus minimizing the ripple effect of changes.
- **Extensibility**: Introducing new behaviors or types of ducks doesn't require modifying existing classes or creating intricate inheritance hierarchies. This is in line with the [open/closed principle](open-closed-principle).
- **Single Responsibility**: Each behavior class or module does one thing, leading to a cleaner, more understandable codebase. This is in line with the [singe responsibility principle](single-responsibility-principle).
- **Run-time changes**: While inheritance dictates behavior at compile-time, composition allows for behavior changes at run-time, resulting in a more adaptable system.
%- **Loose Coupling**: Inheritance tightly couples the subclass to its superclass, meaning changes in the parent often ripple down to the child. Composition allows for a more decoupled architecture.


## Conclusion

The way we structure our code profoundly influences its maintainability. Through our journey with the ducks, we've discerned that while inheritance might seem like an intuitive path for capturing shared behavior, it often falls short in scenarios where behavior sharing is more lateral than vertical.

%``{warning}
%The principle of 'composition over inheritance' isn't a denunciation of inheritance but rather an acknowledgment of its limitations.
%``

%By favoring composition, we invest in a design that's modular, adaptable, and more aligned with the ever-evolving nature of software requirements.

As developers, our goal is to craft solutions that stand the test of time by being possible to change. We've referred to this as [maintainability](maintainability). By favoring composition over inheritance we create code that is maintainable and hence ready for the challenges of tomorrow.

