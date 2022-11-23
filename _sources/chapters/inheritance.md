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

# Inheritance

% TODO: Mention drawback of only one spot for inheritance. Referenced from chapter on Liskov.
%- Base keyword!! Both in constructor context and beyond.
%- Fragile base class. Example: Abstract class Shape which defines a Scale method that multiplies width and height with factor. This breaks if a subclass of Shape like Circle changes both Width and Height in response to a change in one of them.


## Motivation

Inheritance, in object oriented languages, tend to serve two purposes.

1. Inheriting the Inheritance is a mechanism that allows a subtype to either inherit or [override](overriding) instance members from its supertype. This can be thought of as inheriting the implementation and is sometimes called "implementation inheritance".
2. Inheritance causes the subtype to be substitutable for the supertype in the sense of subtype polymorphism. This can be thought of as inheriting the type and is sometimes called "interface inheritance".

We have already discussed the benefits of subtype polymorphism in the chapters on [interfaces](interfaces) and [subtype polymorphism](subtype-polymorphism).
We have thus already dealt with the second point above, and will in this chapter therefore mostly focus on the first.
Namely, that of using inheritance to eliminate duplication by allowing subclasses to use code from its superclass.

Nevertheless, it is of *vital importance* to realize that these two purposes always go hand-in-hand.
Whenever we declare that a subclass inherits from a superclass, then we are always and without exception also declaring that the former is a subtype of the latter.

In other words, inheritance always leads to subtype polymorphism which means that we must take care not violate the [Liskov substitution principle](liskov-substitution-principle) or else we are in for a world of hurt.

```{danger}
Inheritance must *not* blindly be used for *code reuse* without respecting the rules of substitutability.
```


## Definition

Inheritance is a binary directed relationship between two (possibly [abstract](abstract-classes)) classes or [interfaces](interface-inheritance).
Similar to the terminology used in [subtype polymorphism](subtype-polymorphism) we refer to the two parties as sub/child/derived class/type and super/parent/base class/type.
The subclass inherits both type and members from its superclass.
We'll discuss [abstract classes](abstract-classes) in a separate chapter.

To declare that a class is a subclass of another class in C# we use the same syntax as we use when declaring that the class implements some [interface](interfaces).
In other words, we write a colon (`:`) after the class name and then the name of the superclass.

In the example below, we declare that the class `Child` inherits from the class `Parent`.

```{code-cell} csharp
class Parent { }
class Child : Parent { }
```

### Inheriting members

We've said that the subclass inherits all ([public or protected](access-modifiers)) members of the superclass.
What does this mean in practice?
In the code below the the subclass contains no instance members.
We do however declare that the subclass inherits from a superclass which does contain a public instance method.

```{code-cell} csharp
class Parent
{
  public void InheritedMethod ()
    => Console.WriteLine("Implemented in parent.");
}

class Child : Parent { }
```

Since the superclass defines an instance method we can of course call that instance method on instances of that type.

```{code-cell} csharp
Parent parent = new Parent();
parent.InheritedMethod();
```

However, since the subclass *inherits* from that superclass we can also call that instance method on all instances of the subclass.

```{code-cell} csharp
Child child = new Child(); // Note that this is the subtype!
child.InheritedMethod();
```


### Inheriting types

We've also said that the subclass inherits the type of the superclass in the sense of [subtype polymorphism](subtype-polymorphism).
What does this mean?
It means that we can treat instances of the subclass as if they were instances of the superclass.
It means that we can let the compile-time type be the superclass and the run-time type be any subclasses of that superclass.

Given the two types `Parent` and `Child` that we defined above we can therefore assign instances of type `Child` to variables of type `Parent`.
Note how the compile-time type is the general type, while the run-time type is the special type in the code below.

```{code-cell} csharp
Parent child = new Child();
```

Of course, the compiler still allows us to invoke the instance method `InheritedMethod` since it's defined in `Parent` and our compile-time type is `Parent`.

```{code-cell}
child.InheritedMethod();
```



(overriding)=
### Overriding

We've established that a subclass inherits all members from its superclass.
However, if an [instance method](instance-methods) or [instance property](properties) in the superclass is marked as `virtual` then it is possible for the subclass to `override` that implementation.
Meaning, it is possible for the subclass to define its own specialized implementation for that member to use instead of the one defined by the superclass.

Starting from the same code as above, let's rewrite it so that the instance method in the superclass is marked as `virtual` so that we can `override` it in the subclass.

```{code-cell} csharp
class Parent
{
  public virtual void OverriddenMethod ()
    => Console.WriteLine("Implemented in PARENT.");
}

class Child : Parent
{
  public override void OverriddenMethod ()
    => Console.WriteLine("Implemented in CHILD.");
}
```

If we instantiate a `Parent`, treat it as a `Parent`, and then call the instance method, we will execute the implementation defined in `Parent`.
Unsurprising.

```{code-cell} csharp
Parent parentAsParent = new Parent();
parentAsParent.OverriddenMethod();
```

What is also unsurprising, is that if we instantiate a `Child`, treat it as a `Child`, and then call the instance method, we will execute the implementation defined in `Child`.

```{code-cell} csharp
Child childAsChild = new Child();
childAsChild.OverriddenMethod();
```

However, what you might find surprising is that if we instantiate a `Child`, *but* treat it as a `Parent`, and then call the instance method, we will execute the implementation defined in `Child`.

```{code-cell} csharp
Parent childAsParent = new Child();
childAsParent.OverriddenMethod();
```

At first you might find this counter-intuitive.
But, this is the entire point of overriding.
Due to subtype polymorphism you can then treat all subclasses of the same superclass interchangibly, but whenever you call a method marked as `virtual` that has been overridden in the subclass then the specialized method in the subclass is the one that's being executed.
This behavior is also summarized in {numref}`tbl:inheritance:override`.

```{tip}
When overriding, which implementation is executed is determined by the *run-time type* and not the compile-time type.
This behavior was discussed in the chapter on [subtype polymorphism](subtype-polymorphism).
```

Remember, when overriding, what implementation to run is determined by the run-time type.

```{list-table} What implementation is executed depends on the run-time type in the case of overriding and the compile-time type in the case of hiding.
:header-rows: 1
:name: tbl:inheritance:override

* - Compile-time type
  - Run-time type
  - Executed implementation (overriding)
  - Executed implementation (hiding)
* - Parent
  - Parent
  - Parent
  - Parent
* - Child
  - Child
  - Child
  - Child
* - Parent
  - Child
  - Child
  - Parent
```

```{seealso}
It should be noted that in some languages, we don't mark what methods are virtual, we mark what methods are not virtual.
In C#, instance methods are non-virtual unless otherwise specified.
In Java, instance methods are virtual unless otherwise specified.
```



(hiding)=
### Hiding
%- Not overriding ("new" modifier)
%- Called shadowing?

Before moving on we need to talk about a feature that isn't actually only related to inheritance but often comes up when we fail to remember to use the keyword `override`.
That feautre is "method hiding".
Let's say we have a method in a subclass with the same signature as one in the superclass and we mark the method in the subclass as `new` rather than `override`.
In this case we are *not* using overriding.
Instead we are using what is known as "hiding".
We say that the method in the subclass "hides" the method in the superclass.

In {numref}`tbl:inheritance:override` you can see how hiding is different from overriding.

```{tip}
When hiding, which implementation is executed is determined by the *compile-time type* and not the run-time type.
```

Let's go through all the same examples as before.
This time however we will mark the method as `new` in the subclass.
Whether we mark the method in the superclass as `virtual` or not does not matter.

```{code-cell} csharp
class Parent
{
  public void HiddenMethod ()
    => Console.WriteLine("Implemented in PARENT.");
}

class Child : Parent
{
  public new void HiddenMethod ()
    => Console.WriteLine("Implemented in CHILD.");
}
```

If we instantiate a `Parent`, treat it as a `Parent`, and then call the instance method, we will execute the implementation defined in `Parent`.
Still, unsurprising.

```{code-cell} csharp
Parent parentAsParent = new Parent();
parentAsParent.HiddenMethod();
```

What is also still unsurprising, is that if we instantiate a `Child`, treat it as a `Child`, and then call the instance method, we will execute the implementation defined in `Child`.

```{code-cell} csharp
Child childAsChild = new Child();
childAsChild.HiddenMethod();
```

However, when we are hiding rather than overriding, instantiate a `Child` but treat it as a `Parent`, and then call the instance method, we will execute the implementation defined in `Parent`.
Remember, when hiding, what implementation to run is determined by the compile-time type.

```{code-cell} csharp
Parent childAsParent = new Child();
childAsParent.HiddenMethod();
```


### Constructor chaining

Remember the concept of [constructor chaining](constructor-chaining)?
We said that a constructor can call another constructor by using the keyword `this`.
In that chapter we also mentioned that when we get to inheritance we will also discuss the keyword `base`.

The keyword `base`, works just like the keyword `this` in that it can be used for two purposes.
It can be used for constructor chaining.
In other words it can be used to call a constructor in the base class (hence the name "base") from a constructor in a derived class.

% TODO: Give example of how subclass runs superclasses constructor using Console.WriteLine in the base.

```{important}
If the superclass does not define a parameterless constructor then any subclass of the superclass must define how to instantiate the superclass's constructor by using the keyword `base`.
```

Notice how the code below causes a compiler error.

```{code-cell} csharp
:tags: [raises-exception]
class Parent
{
  public Parent (int x)
    => Console.WriteLine("Instantiated with " + x);
}

class Child : Parent { }
```

Why do we get a compiler error?
Because in order to know how to construct the `Child` we must also know how to construct the `Parent`.

In the code below we've added two constructors that both call the `base` constructor and that both would, on their own, be enough to get rid of that compiler error.

```{code-cell}
class Parent
{
  public Parent (int x)
    => Console.WriteLine("Instantiated with " + x);
}

class Child : Parent
{
  public Child ()
    : base(10) { }

  public Child (int x)
    : base(x) { }
}
```

It now compiles.
Whenever we run any of the constructors of the subclass a constructor in the superclass is now also run.

```{code-cell}
Child child1 = new Child();
Child child2 = new Child(5);
```


### Accessing base members

Just like you can use the keyword `this` to access other members in the object itself, you can use the keyword `base` to access other members in the superclass.

This is of course particularly useful in the case of hiding.
Meaning when we have an instance member in the subclass with the same signature as a member in the superclass but want to explicitly call the one in the superclass.


```{code-cell}
class Parent
{
  public void Method ()
    => Console.WriteLine("Called method in parent.");
}

class Child : Parent
{
  public new void Method ()
    => base.Method();
}
```

```{code-cell}
Child child = new Child();
child.Method();
```

Just like in the case of `this`, the keyword `base` refers to an object which means that we can pass around that value like any other value.



(inheritance:uml)=
### UML class diagrams

In UML class diagram notation, inheritance is called "generalization" (or sometimes simply "inheritance") and is depicted using a solid line with a hollow arrow head.
The arrow points from the subclass to the superclass.

% TODO: REPLACE IMAGE!!
```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
:name: fig:uml-class-diagram-realization
:width: 300

In UML class diagram notation, inheritance is called "generalization" and is depicted using a solid line with a hollow arrow head.
The arrow points from the implementation to the interface.
[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
```

In the diagram below we have four classes:
`Sequence`, `SkipSequence`, `EvenSequence`, and `OddSequence`.
The two classes `EvenSequence` and `OddSequence` inherits from the class `SkipSequence` which in turn inherits from the class `Sequence`.

We'll discuss the this example more in the [examples section](inheritance:sequences) where we'll also look at the corresponding code.

```
     ┌───────────────────────────────────────┐
     │                Sequence               │
     ├───────────────────────────────────────┤
     │                                       │
     ├───────────────────────────────────────┤
     │ + Sequence (initial : int) : Sequence │
     │ + <<get>> int Current                 │
     │ - <<set>> int Current                 │
     │ + void Next ()                        │
     │ + int[] Take (int n)                  │
     └───────────────────────────────────────┘
                         Δ
                         │
                         │
     ┌─────────────────────────────────────────┐
     │               SkipSequence              │
     ├─────────────────────────────────────────┤
     ├─────────────────────────────────────────┤
     │ + SkipSequence (int initial, int skips) │
     │ + int ^GetNext ()                       │
     └─────────────────────────────────────────┘
                       Δ  Δ
                 ┌─────┘  └─────────────────────────┐
                 │                                  │
┌──────────────────────────────────┐  ┌────────────────────────────────┐
│           EvenSequence           │  │          OddSequence           │
├──────────────────────────────────┤  ├────────────────────────────────┤
├──────────────────────────────────┤  ├────────────────────────────────┤
│ + EvenSequence () : EvenSequence │  │ + OddSequence () : OddSequence │
└──────────────────────────────────┘  └────────────────────────────────┘
```

Subclasses are conventionally drawn "below" superclasses.

Whether or not to include (meaning: repeat) the inherited members in the subclass varies depending on who you ask.
Remember that we had this same discussion in the chapter on interfaces?
A common suggestion, and the choice we have made above, is however to, out of those members that also appear in the superclass, only mention those that override (or hide) members from the superclass.

To be able to tell [overriding](overriding) apart from [hiding](hiding), some prepend the caret symbol (`^`) to the name of the member to indicate that it has been overridden as opposed to hidden.

```{tip}
Pick a syntax and stick to it.
Consistency is key.
```

In the example above we have overriden the implementation of `GetNext` in the class `SkipSequence`.
The class also defines its own constructor but beyond that, the implementation of all other members are inherited.
The classes `EvenSequence` and `OddSequence` define their own constructors and then inherit the implementation of all other members without overriding any of them.

% Example: Get rid of the foreach? Or is this perhaps not a great solution?

%- Including abstract classes.
%- UML class diagram notation.
%- White-box reuse (as opposed to black-box which is composition) (Gamma et al)
%- Object type (lowercase is an alias for the same as the uppercase). All classes inherit from object.
%- Forward ref to Subtype polymorphism
%- Overriding 


## Examples

(inheritance:sequences)=
### Sequences

% TODO: We're discussing two ideas at once. Filtered sequences and sequences that can be implemented. Let's separate the two into two sections. I will probably have built these classes already in earlier chapters anyway. Just like with ciphers. HARMONIZE BOTH UNDER THE SAME SUPERCLASS?
% TODO: Adding constructors that take parameters makes the expressing the subclasses much harder. This is not a problem with interfaces.

Let's talk about number sequences.
What is a number sequence?
Well, the natural numbers starting from 1 is one and incrementing all the way to infinity (or the maximum value for `int` in practical terms) is a sequence.
Two other sequences are those of odd and even numbers.
A more complex sequence would be for example the Fibonacci sequence which says that the next number is the sum of the two preceding numbers.

```{note}
This might seem a bit esoteric at the moment, but once we've learned about [generics](generics) you will see how this generalizes to sequences of any type.
Then, when we get to [design patterns](design-patterns), you will see how this is the core idea of the [iterator pattern](iterator-pattern).
```

Let's start by defining a superclass, called `Sequence`, that simply models the sequence of incrementing integers starting from the number `0`.

Have a look at the implementation below.

```{code-cell}
class Sequence
{
  public virtual int Current { get; private set; } = 0;

  public virtual void Next()
    => Current++;

  public int[] Take (int n)
  {
    int[] nums = new int[n];
    for (int i=0; i<nums.Length; i++)
    {
      nums[i] = Current;
      Next();
    }
    return nums;
  }
}
```

The class `Sequence` defines one property and two instance methods.

The property `Current` is of type `int`, holds the current number of the sequence, and is initialized to `0`.
Its `get` accessor is `public` while its `set` accessor is `private`.
It

The first instance method is called `Next` and it simply increments the `Current` number by `1`.

Note that we've marked both the property `Current` and the instance method `Next` with the keyword `virtual`.
This is because we want it possible to override these members in subclasses so that the subclasses in question can implement their actual sequences.

Note that since the `set` accessor of the property `Current` is marked as `private` it is not overridable.
Subclasses will not have access to the `set` accessor and will thus interpret the property `Current` as a read-only property that is marked as `virtual`.

The second instance method is called `Take` and it takes an integer called `n` representing the number of numbers that we want from the sequence.
It calls `Next` on the sequence `n` times and puts the value of `Current` in, after each call to next, in an array that it then returns.
In other words, the method `Take` simply returns the next `n` numbers from the sequence in an array while also moving the sequence that many steps.

Ok, so we've got a basic sequence now.
Let's try it out to make sure that it works.

```{code-cell}
// Instantiate sequence.
Sequence seq = new Sequence();

// Take 10 elements.
int[] output = seq.Take(10);

// Print the elements.
Console.WriteLine(String.Join(", ", output));
```

Seems to work.
Let's now define some subclasses of this sequence that reuses code from the superclass.

#### Step sequence

Let's define a subclass called `StepSequence` that models the series of integers that moves in increments of `steps`.
In other words, it specializes the class `Sequence` by saying that every time it moves to the next number we may move multiple steps.

We're now going to look at two ways of writing this class as a subclass of `Sequence`.
Let's start by reusing as much code as possible.
Here's the class.

```{code-cell}
class StepSequence : Sequence
{
  private int steps;

  public StepSequence (int steps)
    => this.steps = steps;

  public override void Next()
  {
    for (int i=0; i<steps; i++)
      base.Next();
  }
}
```

Let's try it out to make sure that it works and then let's discuss it.

```{code-cell}
StepSequence seq = new StepSequence(2);
int[] output = seq.Take(10);
Console.WriteLine(String.Join(", ", output));
```

```{code-cell}
StepSequence seq = new StepSequence(10);
int[] output = seq.Take(10);
Console.WriteLine(String.Join(", ", output));
```

Seems to work, but let's now talk about why.

It works because we're [overriding](overriding) the instance method `Next` with an implementation that calls the instance method `Next` in the superclass as many times as defined by the instance field `steps`.
Notice how we're making use of the keyword `base` to differentiate between `Next` as defined in `StepSequence` and as defined in its parent `Sequence`.

What about code reuse?
Well, we've reused the property `Current` and the instance method `Take`.

Alright, so we said that there are at least two ways of doing this.
What's the other way?
Well, we could also decide to ignore the way that the superclass implements `Next` and `Current` altogether and simply write our own implementation.
Have a look at the code below.

```{code-cell}
class StepSequence : Sequence
{
  private int n = 0;
  private int steps;

  public StepSequence (int steps)
    => this.steps = steps;

  public override int Current
  {
    get => n;
  }

  public override void Next()
    => n += steps;
}
```

This implementation works just like the other.
However, in this implementation we've reused less code from the superclass.
Why?
Because we've also overridden the property `Current`.



% TODO: Need chapter on command query separation. That should also be linked here.




#### Evens and odds

Let's build something a bit more complex.
How about sequences that generate even and odd numbers?

Interestingly, both the sequence of even numbers and that of odd numbers move in increments of 2.
So to model, for example, the sequence of even numbers we must figure out how to start on an even number and then consistently increment by 2.

Again, we find multiple ways of implementing these classes.
Let's first talk about how we would implement them as subclasses of `StepSequence`.
If these inherit from the class `StepSequence` then we don't need to worry about changing the implementation of `Next`.
Instead, we just need to make sure that we start on an even or odd number (depending on which class we are talking about) and that we set the parameter `steps` to `2`.

Unfortunately that requires to add a constructor to the implementation of `StepSequence` so that we can control the starting number.
Have a look at the code below.

```{code-cell}
// Updated implementation.
class StepSequence : Sequence
{
  private int current;
  private int steps;

  public StepSequence (int steps)
    : this(steps, 0) { }

  public StepSequence (int steps, int initial)
  {
    this.steps = steps;
    this.current = initial;
  }

  public override int Current
  {
    get => current;
  }

  public override void Next()
    => current += steps;
}
```

```{warning}
We're going to talk about the design principle known as [composition over inheritance](composition-over-inheritance) at length.
Had we used composition instead of inheritance to solve this problem we would not have been forced to change the `StepSequence` class at all.
We'll discuss this further in the chapters on [abstract constructed](abstract-constructed-object-composition) and [abstract injected object composition](abstract-injected-object-composition).
```

With our redefined version of `StepSequence` that allows us to start a sequence at a number that we choose we are ready to subclass it in order to implement even and odd sequences.

```{code-cell}
class EvenSequence : StepSequence
{
  public EvenSequence () : base(2) { }
}

class OddSequence : StepSequence
{
  public OddSequence () : base(2, 1) { }
}
```

```{code-cell}
EvenSequence evenSeq = new EvenSequence();
OddSequence oddSeq  = new OddSequence();

int[] evens = evenSeq.Take(10);
int[] odds = oddSeq.Take(10);

Console.WriteLine(String.Join(", ", evens));
Console.WriteLine(String.Join(", ", odds));
```

Again, we said that we would talk about two ways to build these sequences.
One other way of building a sequence of even numbers and one of odds is to again simply override not only the method `Next` but also the property `Current`.

```{code-cell}
// Alterantive implementation.
class EvenSequence : Sequence
{
  private int current = 0;

  public override int Current
  {
    get => current;
  }

  public override void Next ()
    => current += 2;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new EvenSequence().Take(10)));
```

```{code-cell}
// Alterantive implementation.
class OddSequence : Sequence
{
  private int current = 1;

  public override int Current
  {
    get => current;
  }

  public override void Next ()
    => current += 2;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new OddSequence().Take(10)));
```

These too work just fine, but once again we're reusing less and overriding more.
At some point it will be pointless to keep using inheritance instead of composition.


#### Palindromic numbers

Let's now have a look at a sequence which isn't so trivial.
How about the sequence of palindromic numbers?
A palindrome is a string whose value remains the same when reversed.
A palindromic number is a number that behaves like a palindrome when treated like a string.
Some examples of palindromic numbers include `2`, `11`, `505`, and `110011`.

The class below is called `PalindromicSequence` and implements this idea.

```{code-cell}
class PalindromicSequence : Sequence
{
  public override void Next ()
  {
    base.Next();
    if (!isPalindromic())
      Next();
  }

  private bool isPalindromic ()
  {
    string number = Current.ToString();
    for (int i=0; i<number.Length; i++)
      if (number[i] != number[number.Length - i - 1])
        return false;
    return true;
  }
}
```

```{note}
There's probably more efficient ways of implementing this algorithm but I've opted for this way since it is fairly readable in the context.
```

Notice how the overridden implementation of the instance method is [recursive](recursion).
It calls `base.Next` and then calls itself again unless the number we have found is a palindrome.
The method could also have been written non-recursively, using [iteration](iteration), like this:

```csharp
do {
  base.Next();
} while (!isPalindromic());
```

Also note how we opted to inherit from `Sequence` and not from `StepSequence` since the palindrome finding algorithm that we've implemented must move in increments of `1` when looking for the next palindrome.

Let's try it out to make sure that it works.

```{code-cell}
PalindromicSequence sequence = new PalindromicSequence();
int[] output = sequence.Take(10);
Console.WriteLine(String.Join(", ", output));
```


#### Square numbers

Let's do one final sequence before we move on.
Here's something that's quite different from what we've seen so far.
How about the sequence of square numbers?

The `n`:th number in the sequence of squares is simply defined as `n * n`.
Ideally we'd like to use that formula rather than having to step through each number and check whether that number happens to be a `square` number.
Have a look at the implementation below.

```{code-cell}
class SquareSequence : Sequence
{
  int n = 0;

  public override int Current
  {
    get => (n * (n + 1)) / 2;
  }

  public override void Next()
    => n++;
}
```

```{code-cell}
SquareSequence sequence = new SquareSequence();
int[] output = sequence.Take(10);
Console.WriteLine(String.Join(", ", output));
```

In the implementation above, we're only reusing the method `Take`.
The rest has been overridden.
Had we not overridden `Current` we would have had to write a much more complicated algorithm.
Have a look at the alternative solution below.

(sequence-recursive-duplication)=
```{code-cell}
class SquareSequence : Sequence
{
  public override void Next()
  {
    base.Next();
    if (!isSquare())
      Next();
  }

  private bool isSquare ()
    => (int)Math.Sqrt(Current) * (int)Math.Sqrt(Current) == Current;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new SquareSequence().Take(10)));
```

```{admonition} Key takeaway
In the latter case we tried to reuse more code by allowing ourselves use a less efficient algorithm we *still* ended up having to duplicate code.
Notice how the implementation of the recursive method `Next` in `SquareSequence` essentially is the same as the implementation of `Next` in `PalindromicSequence`.
We'll return to this discussion in {numref}`filtered-sequences-and-inheritance`.
```






(inheritance:examples:characterwise)=
### Characterwise ciphers

Remember how we've been unable to get rid of the duplicated `foreach` loop present in all the [substitution ciphers](methods:substitution-ciphers).
The only solution for  this that we've seen so far was given in the chapter on [methods](methods:substitution-ciphers).
In that chapter I suggested that without some form of polymorphism we often have to resort to turning part of our algorithms into data in order to keep increasing abstraction and thus remove duplication.

But in this book we're exploring object oriented programming, so we don't want to be forced to turn our algorithms into data.
We want to let our algorithms be algorithms.

In this example, we'll be able to remove the duplicated `foreach` loop from all substitution cipher classes that implement the interface `ICharToCharCipher`.
Meaning all substitution ciphers that have an encode method which works charwise and replaces each character with a single character.
The Robber's language does *not* fit that description, but Caesar ciphers and the Leet language do so let's use those two.

As alluded to in the motivation section however, it would in this case, as is often the case, be preferable to use composition over inheritance since that would allow us to eliminate all duplication.
But we'll switch to that solution in the chapter on [abstract injected object composition](abstract-injected-object-composition).

We've still got our interfaces from the chapter on [interfaces](interfaces:ciphers) but these don't really help us here.

```{code-cell} csharp
:tags: [hide-input]
interface ICharToCharCipher
{
  char Encode (char input);
}

interface IStringToStringCipher
{
  string Encode (string input);
}

interface ICharToStringCipher
{
  string Encode (char input);
}
```

Let us just first take stock of what the duplication looks like.
Pay special attention to the two implemented methods with the signature `string Encode (string input)` below.
Notice how both implementations are entirely the same.

Let's first have a look at the class `LeetCipher`:

```{code-cell} csharp
:tags: [hide-input]
class LeetCipher : ICharToCharCipher, IStringToStringCipher
{
  public string Encode (string input) {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }

  public char Encode (char input)
    => input switch {
      'L' => '1', '1' => 'L',
      'A' => '4', '4' => 'A',
      'O' => '0', '0' => 'O',
      'T' => '7', '7' => 'T',
      'E' => '3', '3' => 'E',
      _ => input
    };
}
```

Let's then have a look at the class `CaesarCipher`:

```{code-cell} csharp
:tags: [hide-input]
class CaesarCipher : ICharToCharCipher, IStringToStringCipher
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public string Encode (string input) {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }

  public char Encode (char input) {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + steps) % alphabet.Length;
    if (i != -1)
    {
      if (newIndex < 0)
        newIndex += alphabet.Length;

      if (Char.IsLower(input))
        return Char.ToLower(alphabet[newIndex]);
      else
        return alphabet[newIndex];
    }
    return input;
  }
}
```

Notice how the implementation of the method with the signature `string Encode (string input)` is *exactly* the same in both classes.
The only thing that's different is in what context the method is executed, which in turn determines which `char Encode (char input)` method is being called.

Again, if we at this point knew about the design principle [composition over inheritance](composition-over-inheritance) we would solve this using [abstract injected object composition](abstract-injected-object-composition).
But, let's take it one step at a time, and let's see what we can do with regular old inheritance first.

Here's the key.
Notice how the implementations of `string Encode (string input)` fulfill the interface `IStringToStringCipher` and depend on `ICharToCharCipher`.
It fulfills the first because the encode method itself is the only method required by that interface.
It depends on the second because the implementation of the encode method delegates to the other overload of `Encode` which takes and returns a character.

So, let's introduce a superclass called `CharWiseCipher` that implements both `IStringToStringCipher` and `ICharToCharCipher`.
We'll let this superclass behave like the [identity cipher](identity-cipher) that we also implemented in the chapter on [subtype polymorphism](subtype-polymorphism:identity-cipher).

In the identity cipher, the encode method that takes and returns a character will simply return whatever character we give it.
Similarly, the encode method that takes and returns a string ought to return whatever we give it.

However, instead of simply returning what we get we will choose to iterate over the input `string`, call the method `char Encode (char input)` for each character one by one, and concatenate the results into a `string` again.
Even though the method that receives and returns a `char` will always return the same `char`
In other words, the implementation of `string Encode (string input)` will be the one that we are trying to unify for the other classes.

But why would we do such a silly thing?
Isn't this just a waste of resources?
Why iterate over the input `string` if we're just going to call a method for each character that always returns the same character that we give it.
Well, because we're going to mark that silly method as `virtual`.
Which means that subclasses of `CharWiseCipher` can `override` our implementation of `char Encode (char input)`.
If they do, then it is no longer pointless for us to iterate over the string and delegate to the overridden method.

Let's look at some code.
Here's our superclass that behaves like the identity cipher.
Pay attention to how we use the keyword `virtual`.

```{code-cell} csharp
class CharWiseCipher : ICharToCharCipher, IStringToStringCipher
{
  public virtual char Encode (char input)
    => input;

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }
}
```

Let's run it to make sure that it behaves like the identity cipher.

```{code-cell} csharp
CharWiseCipher identity = new CharWiseCipher();
identity.Encode('x');
```

Yup, when we pass it a `char`, we get the same `char` back.
How about a `string`?

```{code-cell} csharp
identity.Encode("Hello world");
```

Works too.
Ok, so we've got the superclass figured out.
Let's create some subclasses.

We'll start with `LeetCipher`.
Pay attention to how we use the keyword `override`.

```{code-cell} csharp
class LeetCipher : CharWiseCipher
{
  public override char Encode (char input)
    => input switch {
      'L' => '1', '1' => 'L',
      'A' => '4', '4' => 'A',
      'O' => '0', '0' => 'O',
      'T' => '7', '7' => 'T',
      'E' => '3', '3' => 'E',
      _ => input
    };
}
```

Hmmm.. does this really work?
Does this `LeetCipher` actually have a method that takes and returns a `string`?
Let's try it out.

```{code-cell} csharp
LeetCipher leet = new LeetCipher();
Console.WriteLine(leet.Encode("LEET 101"));
```

```{code-cell} csharp
Console.WriteLine(leet.Encode("E"));
```

As you can see, it actually works.
The `Encode` method that we've called is defined on the superclass but since our subclass inherits from the superclass we can also call the method on instances of the superclass.
Furthermore, since the `Encode` method calls the other `Encode` method which takes and receives a `char`, and since that method has been overridden in the subclass we get a cipher that no longer behaves as the identity cipher.

```{seealso}
This idea of having a base class with an instance method that uses another instance member that is often overridden in a subclass is known as the Template method pattern.
We'll talk more about [design patterns](design-patterns) in a separate chapter.
```

Pretty neat, no?
Now, let's try the `CaesarCipher`.
Same kind of drill here.

```{code-cell} csharp
class CaesarCipher : CharWiseCipher
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public override char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + steps) % alphabet.Length;
    if (i != -1)
    {
      if (newIndex < 0)
        newIndex += alphabet.Length;

      if (Char.IsLower(input))
        return Char.ToLower(alphabet[newIndex]);
      else
        return alphabet[newIndex];
    }
    return input;
  }
}
```


```{code-cell} csharp
CaesarCipher leet = new CaesarCipher(2);
Console.WriteLine(leet.Encode("ABC"));
```

```{code-cell} csharp
Console.WriteLine(leet.Encode('A'));
```

Lo and behold.
It works.


### Interface inheritance

Remember how we said that an interface can inherit from another interface?
Let me show you an example of that before we move on.
Let's say that we've got an interface called `IIncrementable` which requires that whoever implements declares an instance method with the signature `void Inc ()`.

```{code-cell} csharp
interface IIncrementable
{
  void Inc ();
}
```

Let's then say that we're creating another interface called `IAddable` which requires that whoever implements it declares an instance method with the signature `void Add (int y)`.
In addition to this however, the interface also inherits from the other interface `IIncrementable`.

```{code-cell} csharp
interface IAddable : IIncrementable
{
  void Add (int y);
}
```

If we now write a class called `Number` that claims to implement `IAddable` and try to only implement the method `Add` we will get a compilation error.

```{code-cell} csharp
:tags: [raises-exception]
class Number : IAddable
{
  int x = 0;

  public void Add (int y) => x += y;
}
```

Since `IAddable` inherits from the interface `IIncrementable`, `Number` must not only implement `Add` but also `Inc`.

```{code-cell} csharp
class Number : IAddable
{
  int x = 0;

  public void Inc () => x++;
  public void Add (int y) => x += y;
}
```


## Discussion

If you find the examples in this chapter awkward, you're not alone.
I do too.

I have searched far and wide and the more I look, the more I get convinced that there are no good examples of inheritance where the base class is not abstract or where the whole thing is not [better](maintainability) modeled with [composition over inheritance](composition-over-inheritance).

In the case of C#, you can even choose to combine interfaces and [extension methods](extension-methods) but we'll cover that much later.

However, just because all I've seen is white swans, doesn't prove that there are no black swans, so if you ever come across a good example, I would really, really, really appreciate it if you would let me know.
Because I for one have given up on inheritance, just like I have given up on [object oriented programming](why-oo).


## Exercises
% TODO: NEEDS CODING EXERCISES!

```{exercise}
What is *inheritance*?
Use your own words, give an example, and then implement that example.
```

```{exercise}
What is *overriding*?
Use your own words, give an example, and then implement that example.
```

```{exercise}
What is the difference between *overriding*, *overloading*, and *hiding*?
Explain in words and then show the difference by means of an example.
```


```{exercise}
Can the class `ReverseCipher` inherit from `CharWiseCipher`?
Why or why not?
```

```{exercise}
:label: ex:inheritance:robbers-cipher-charwisecipher
Can the class `RobbersCipher` inherit from `CharWiseCipher`?
Why or why not?

Hint: Perhaps the class should be called `CharToCharSubstitutionCipher` or `CharwiseCharToCharCipher`. Why is that?
```

```{exercise}
:label: inheritance:exercises:chartostringsubstitutioncipher
Think about your answer to {numref}`ex:inheritance:robbers-cipher-charwisecipher` and use our implementation of `CharWiseCipher` (which perhaps should be called `CharToCharSubstitutionCipher`) as inspiration for the following exercise.

Write a class called `CharToStringSubstitutionCipher` that implements the interfaces `ICharToStringCipher` and `IStringToStringCipher`.
`RobbersCipher` should inherit from this new class in a way that makes it possible to remove the method with the signature `string Encode (string input)` from `RobbersCipher`.
```

```{exercise}
Can an interface inherit from multiple interfaces?
Try it.
```

```{exercise}
Can we introduce an interface that inherits from all our three cipher interfaces?
What would such an interface mean?
How is it useful?
```

```{exercise}
:label: ex:inheritance:triangular
Start with the class `Sequence` that we wrote in this chapter.
Write your own subclass of the class `Sequence` that implements the [Triangular number sequence](https://en.wikipedia.org/wiki/Triangular_number).
```

```{code-cell}
:tags: [remove-input]
class Triangular : Sequence
{
  int n = 0;

  public Triangular ()
    : base(0) { }

  public override int Current
  {
    get => (n * (n + 1)) / 2;
  }

  public override void Next()
  {
    n++;
  }
}
```

```{exercise}
:label: ex:inheritance:fibonacci
Start with the class `Sequence` that we wrote in this chapter.
Write your own subclass of the class `Sequence` that implements the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).
```




%## TODO: RE-INTRODUCE ANY OF THIS OLD STUFF?
%
%Let's start with the code we built in the end of the chapter on [concrete dependency construction](concrete-dependency-construction).
%We had a class called `RobbersStringCipher` that exposed a method called `Encode` that took a `string` as input and produced a `string` as output.
%This method in turn instantiated and delegated to an instance of `RobbersCharCipher`.
%The method it delegated to was also called `Encode` but this method took a `char` as input and produced a `string` as output.
%Together it all looked like the code below:
%
%```csharp
%class RobbersStringCipher
%{
%  RobbersCharCipher charCipher;
%
%  public RobbersStringCipher (char vowel)
%    => charCipher = new RobbersCharCipher(vowel);
%
%  public string Encode (string input)
%  {
%    string output = "";
%
%    foreach (char c in input)
%      output += charCipher.Encode(c);
%
%    return output;
%  }
%}
%
%class RobbersCharCipher
%{
%  char vowel;
%
%  public RobbersCharCipher (char vowel)
%    => this.vowel = vowel;
%
%  public string Encode (char input)
%  {
%    string consonants = "bcdfghjklmnpqrstvwxz";
%
%    if (consonants.IndexOf(Char.ToLower(input)) != -1)
%      return $"{input}{vowel}{input}";
%    else
%      return input.ToString();
%  }
%}
%```
%
%Now that we've learned about subtype polymorphism we should have our abstraction goggles on and constantly look for commonalities between types that would lend themselves to a new abstraction.
%Remember Leetspeak?
%Have a look at the following code:
%
%```csharp
%class LeetStringCipher
%{
%  LeetCharCipher charCipher = new LeetCharCipher();
%
%  public string Encode (string input)
%  {
%    string output = "";
%
%    foreach (char c in input)
%      output += charCipher.Encode(c);
%
%    return output;
%  }
%}
%
%class LeetCharCipher : ICharCipher
%{
%  public string Encode (char input)
%  {
%    switch (input)
%    {
%      case 'A': return "4";
%      case '4': return "A";
%      case 'L': return "7";
%      case '7': return "L";
%      case 'E': return "3";
%      case '3': return "E";
%      case 'O': return "0";
%      case '0': return "O";
%      default: return input.ToString();
%    }
%  }
%}
%```
%
%Starting to see where this is going?
%Have a close look at `RobbersStringCipher` and `LeetStringCipher`.
%They are eerily similar, are they not?
%How about `RobbersCharCipher` and `LeetCharCipher`?
%They too are similar.
%Of course, this whole example is orchestrated by me so that these similarities emerge.
%However, you will often find that if you think about your domain model long and hard enough then you will find a way to make similarities, and hence abstractions, emerge.
%
%Remember the code you wrote in {numref}`ex:concrete-dependency-construction-caesar-cipher` where we implemented a Caesar Cipher by again decomposing the problem into the idea of encoding a full string and decoding a single character.
%You ought to have ended up with two classes that also are eerily similar to the two string and `char` cipher classes here.
%
%We've already talked about how we can unify different ciphers that take a `string` as input and produce a `string` as output under the interface `ICipher` in the chapter on [subtype polymorphism](subtype-polymorphism).
%Let's ignore the `string` ciphers in this chapter and instead focus on the `char` ciphers.
%
%%Adapting the code above is trivial since we just have to state that the two classes implement the interface `ICipher`.
%%It would look something like this:
%%
%%```csharp
%%interface ICipher { string Encode (string input); }
%%class RobbersStringCipher : ICipher { /* ... */ }
%%class LeetStringCipher : ICipher { /* ... */ }
%%```
%
%All the `char` ciphers have a method called `Encode` which takes a `char` as input and produces a `string` as output.
%Let's put that in an interface.
%
%```csharp
%interface ICharCipher
%{
%  string Encode (char input);
%}
%```
%
%Ok, implementing that interface should be straightforward since we wrote the interface based on a method that already existed in both `RobbersCharCipher` and `LeetCharCipher`.
%So let's just declare that these two classes are implementing the interface `ICharCipher` and make sure that our code compiles.
%
%```csharp
%class RobbersCharCipher : ICharCipher { /* ... */ }
%class LeetCharCipher : ICharCipher { /* ... */ }
%```
%
%```output
%Build succeeded.
%```
%
%Ok, but what does the common interface `ICharCipher` enable us to do?
%Sure, we could redefine the lines that declare the variable `charCipher` in both `RobbersStringCipher` and `LeetStringCipher` so that the compile-time type is the abstraction `ICharCipher` rather than any concrete implementation of that interface.
%We would take this code:
%
%```csharp
%class RobbersStringCipher
%{
%  RobbersCharCipher charCipher;
%// ...
%```
%
%and change it to this:
%
%
%```csharp
%class RobbersStringCipher
%{
%  ICharCipher charCipher;
%// ...
%```
%
%But do we really gain anything substantial from this?
%Not really.
%If you've got code where you're somehow switching between different ciphers in the same object over time then it's possible to gain something from this but probably not.
%In our case, there's really no obvious benefit.
%
%
%## Finding an abstraction
%
%However, what if we could get rid of the duplicated code in the `Encode` methods of the `string` ciphers.
%That would be useful.
%We have already learned the design principle abbreviated DRY, which stands for "Don't Repeat Yourself".
%As we will learn later, duplicated code is also considered a [code smell](code-smell).
%
%Notice how *almost all the variation* between the ciphers in this chapter occurr in the `char` ciphers, not in the `string` ciphers.
%Ignoring parameterization of constructors for now, we conclude that the *only* difference between `RobbersStringCipher` and `LeetStringCipher` is what *type* of `char` cipher they happen to instantiate and thus delegate to.
%
%So let's think about this.
%If there's nothing that's different between `RobbersStringCipher` and `LeetStringCipher`, then what is the concept that makes them the same.
%Think about it, they both encode in the same way.
%One character at a time.
%
%To see similarities, we must sometimes look at differences.
%Remember the reverse cipher?
%Here's an implementation of the reverse cipher:
%
%```csharp
%class ReverseCipher
%{
%  public string Encode (string input)
%  {
%    string output = "";
%    for (int i=input.Length-1; i >= 0; i--)
%      output += input[i];
%    return output;
%  }
%}
%```
%
%Notice how we're picking characters from the input string "backwards" but we're building the encoded string "forwards".
%In other words we're taking characters last to first but we're building the resulting string first to last.
%
%The Reverse cipher algorithm is fundamentally different from the Robber's cipher and Leetspeak.
%In the sense that it cannot (easily) be implemented as a left-to-right character-by-character conversion.
%The first character of the input `string` *cannot* be used as input to create the first chunk of the output `string`.
%
%So, what's one thing that unifies the Robber's cipher and Leetspeak?
%The encoding algorithms can both be implemented as character-by-character conversions where every input character yields one or more output characters in the correct order.
%
%## Composing the abstraction
%
%So how do we implement this?
%In this chapter we'll use [inheritance](inheritance) but in the chapter on [abstract injected object composition](abstract-injected-object-composition) we'll use composition instead.
%Most, including myself, would argue that the composition based solution is superior.
%If you've ever heard about the design principle [composition over inheritance](composition-over-inheritance) you will soon start to see why this principle exists.
%At it's core, the problem with inheritance is that it assumes that you problem forms a hierarchy.
%Few problems are hierarchies, many are graphs.
%But, let's go with inheritance in this chapter since we're talking about abstract dependency *construction* and not *injection*.
%
%What we can do with inheritance is that we can say that the method `string Encode (string input)` should be implemented in a baseclass from which other subclasses can inherit.
%That method then delegates to a [protected](advanced-access-modifiers) instance variable which can be overwritten upon construction of subclasses.
%Let's look at some code to make sense of this.
%Here's the base class:
%
%```csharp
%class CharWiseCipher : ICipher
%{
%  protected ICharCipher charCipher = new IdentityCharCipher();
%
%  public string Encode (string input)
%  {
%    string output = "";
%
%    foreach (char c in input)
%      output += charCipher.Encode(c);
%
%    return output;
%  }
%}
%```
%
%What does this baseclass do?
%Two things:
%
%1. It declares and initializes the `protected` instance variable `charCipher` to a default value.
%2. It declares and implements the instance method `string Encode (string input)` as simply passing each character of the `string` to the `Encode` method of `charCipher` and concatenating the result.
%
%But what is the type `IdentityCharCipher` that acts as the default value?
%Well, we've talked about the idea of identity functions and values before.
%The identity `char` cipher is a cipher that simply returns whatever you pass it back.
%As you might have suspected, the class `IdentityCharCipher` is implemented something like this:
%
%```csharp
%class IdentityCharCipher : ICharCipher
%{
%  public string Encode (char input) => input.ToString();
%}
%```
%
%Let's now look at how the baseclass `CharWiseCipher` behaves before we move on.
%
%```csharp
%Console.WriteLine(new CharWiseCipher().Encode("Hello world"));
%```
%
%```output
%Hello world
%```
%
%Simple, and pretty pointless so far.
%But, we can now create subclasses for each of our character-wise ciphers.
%Each of the subclasses must, upon construction, replace the `protected` instance variable `charCipher` that's declared in the base class with whatever concrete `ICharCipher` that they need.
%
%```csharp
%class LeetCipher : CharWiseCipher
%{
%  public LeetCipher ()
%    => charCipher = new LeetCharCipher();
%}
%
%class RobbersCipher : CharWiseCipher
%{
%  public RobbersCipher (char vowel)
%    => charCipher = new RobbersCharCipher(vowel);
%}
%```
%
%Notice how utterly simple both of these ciphers now are.
%They almost don't contain any code at all.
%This is the power of abstraction and composition.
%By building abstract building blocks we can trivially compose them to solve complex problems.
%
%Notice how the constructor of `RobbersCipher` can remain parameterized and thus still pass the parameter on to the constructor of `RobbersCharCipher`.
%However, perhaps you remember that we, in the chapter on [concrete dependency construction](concrete-dependency-construction) cautioned that this need to pass constructor values down from type to type is a symptom of which dependency *construction* is the cause.
%When we move to dependency *injection* this need to enable passing of constructor parameters simply goes away.
%
%For an overview of the code that we've built in this chapter, have a look at {numref}`fig:abstract-dependency-construction-uml`.
%
%```{figure} https://via.placeholder.com/500x275?text=Image+coming+soon
%:name: fig:abstract-dependency-construction-uml
%
%UML class diagram of our example of abstract dependency construction.
%```
%
%Isn't all this a bit overkill you might ask?
%No, this is just the beginning.
%The point is that now other ciphers that take a full `string` as input and performs their transformation one character at a time from left to right can subclass `CharWiseCipher` and simply, upon construction, set the instance variable to an instance that's suitable for whatever we're trying to achieve with that particular cipher.
%
%This means that the `LeetStringCipher` which we've now renamed to `LeetCipher` and the `RobbersStringCipher` which we've now renamed to simply `RobbersCipher` can become utterly trivial.
%




% TODO: MOVED HERE FROM DATA TYPES CHAPTER. USE HERE?
%#### Dot notation
%
%Let's now talk about dot notation.
%If you use dot notation on an object then we are calling an [instance method](instance-methods) on that object.
%If you use dot notation on a class then we are calling a [static method](static-methods) on that class.
%We'll talk a lot more about both instance and static methods in their respective chapters so don't worry if it feels overwhelming at this point.
%
%We've already discussed how we can use the instance method `GetType` to make an object report what it's run-time type is.
%This method is an instance method that we call using dot-notation and that can be called on all things that can be treated as objects.
%More on this in the chapter on [type hierarchies](type-hierarchies).
%
%```csharp
%"A".GetType();
%420.GetType();
%3.14.GetType();
%```
%
%What I want to show you now is that the data type of the method `GetType` can be defined like this:
%
%```
%GetType :: object ~> string
%```
%
%We can read this type signatures as that `GetType` is an instance method on the type `object` that when called without any arguments, returns a `string`.
%
%Another method that we've seen a lot is the method `WriteLine`.
%This is a static method that can be run in a number of different ways since it has been defined with a bunch of different, so called, [method overloads](overloading).
%More on this in it's own chapter, but this means that the method `WriteLine` has a bunch of different type signatures.
%Some of the signatures that we've used are listed below.
%
%```
%WriteLine :: string -> void
%WriteLine :: bool -> void
%WriteLine :: int -> void
%```
%
%The first one says that `WriteLine` is a static method that, when called with a `string`, returns nothing.
%The second one says that `WriteLine` is a static method that, when called with a `bool`, returns nothing.
%Finally, the third one says that `WriteLine` is a static method that, when called with an `int`, returns nothing.
%
%The astute reader might have noticed that we snuck the type `void` into the examples above and then referred to it as "nothing" when reading the types.
%We'll return to this special data type in the chapter on [nothingness](nothingness).
