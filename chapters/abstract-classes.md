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

% TODO: Must mention that abstract classes still can have constructors!

# Abstract classes

## Motivation

Sometimes we want to use [inheritance](inheritance) for purposes of code reuse but we don't want it to be possible to instantiate the superclass.
Sometimes it just doesn't make sense to have instances of the super class on its own.

It's as if we would like to use an [interface](interfaces) but find that if we do then we have to duplicate some code that we could otherwise reuse through inheritance.
Granted, at this point, all your smoke sensors should be sounding.
In a later chapter we will talk about the design principle [composition over inheritance](composition-over-inheritance).
You probably should solve this problem with composition rather than inheritance.

However, since we have not yet discussed composition over inheritance which often relies on [abstract injected object composition](abstract-injected-object-composition) which we also haven't talked about, let's instead talk about how we can solve this using abstract classes.


## Definition

An abstract class is similar to an [interface](interfaces) in the sense that:

* it cannot be instantiated, and
* it can declare signatures of members that its inheritors must implement.

An abstract class is similar to a class in the sense that:

* it can contain members with implementations that it's inheritors will inherit (and not just signatures).

In an abstract class we can mark any combination of its (public) members as `abstract`.
It is legal to mark all of them as well as none of them as `abstract`.
If they are marked as `abstract` then that means that they cannot have any implementation.

% TODO: Any of its non-private, non-sealed members??

Any member marked as `abstract` must be [overridden](overriding) in all non-abstract classes that inherit from the abstract class.
We emphasize the word *non-abstract* since abstract classes of course may inherit from abstract classes.
Only when we reach a non-abstract class must we start implementing the abstract members.

In C# we can declare that a class is abstract by simply prepending the word `abstract` before the keyword `class` but after any [access modifiers](access-modifiers).
In C# we can declare that a method is abstract by prepending the word `abstract` before the return type but after any [access modifiers](access-modifiers).


### UML class diagrams

In UML class diagrams, the standard is to denote abstract members using italic text.



## Examples

### Sequences

Remember the hierarchy of sequences that we built in the chapter on [inheritance](inheritance)?
We never really discussed it, but it was quite awkward that the base class was called `Sequence` even though it was evidently modeling the sequence of incrementing integers.

However, since a non-abstract base class must have an implementation for all instance members we were left having to choose one sequence to act as the base class.

This means that we have to choose between calling the base class `Sequence` and `IntSequence`.
The former is not an excellent representation for the implementation that we have while the latter is not an excellent name for a base class.
We will discuss the rules of "behavioral subtyping" in the chapter on [Liskov substitution principle](liskov-substitution-principle).
However, the consequence of thinking of the base class as the sequence of incrementing integers is that all subtypes of `Sequence` now must be specializations of that sequence that don't violate the rules of that sequence.
What if, for example, we also want to model decrementing sequences?
The condition is too restrictive.

What's the alternative?
Well, remember how I in the chapter on [inheritance](inheritance) said that I personally have yet to come across a case of inheritance that isn't more elegantly solved using interfaces and composition?
If you've seen that then you know where my sympathies lie.
The base type should be an interface.

But, since we should never dismiss something without first fully understanding how sit works and what we can do with it, let's force ourselves to keep using inheritance.
Using an abstract base class is much better than using a concrete base class in the case of our sequnce hierarchy.

By making the base class abstract we are guaranteed that there will be no instances of that class.
This in turn means that we don't have to worry about specifying both the interface (in the abstract sense of the word) *and* the implementation for all memebrs of the superclass.
This means that we can choose to specify only the interface where we want to leave the implementation very open, and conversely actually provide an implementation where that implementation makes sense in the superclass.

Here's an example of how we might write that class in C#.

```{code-cell}
abstract class Sequence
{
  public virtual int Current { get; protected set; }

  public abstract void Next();

  public virtual int[] Take (int n)
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

```{note}
Notice how we changed the [access modifier](advanced-access-modifiers) of the current number to `protected` so that we can set its value not only from the superclass but also from any subclass of the superclass.
```

Can we now instantiate the superclass?
No, it's now abstract.

```{code-cell} csharp
:tags: [raises-exception]
Sequence sub = new Sequence();
```

Does the fact that we've now made the superclass abstract affect the classes that inherit from the superclass in any way?
Well, some of them, like `SkipSequence` had their implementation defined in terms of the superclasse's method `Next`.
But now that the method `Next` is abstract the class `SkipSequence` must provide its own implementation.

I'll explain why I've renamed the class from `SkipSequence` to `StepSequence` in a moment, but let's first look at the implementation.

```{code-cell}
class StepSequence : Sequence
{
  int step;

  public StepSequence (int initial, int step)
  {
    base.Current = initial;
    this.step = step;
  }

  public override void Next()
    => base.Current += this.step;
}
```

Remember how we said that letting the superclass model incrementing sequences was too restrictive?
Well, now that we've got a more general superclass, the implementation of `StepSequence`, which replaces `SkipSequence`, is both simpler and more general then what we had before.

The class `StepSequence` models the idea of incrementing, decrementing, and skipping all at once.
If we wanted specific types for those concepts so that we couldn't accidentally get passed a decrementing sequence when we expected an incrementing one we trivially introduce those types.

```{code-cell}
class IncrementingSequence : StepSequence
{
  public IncrementingSequence (int initial)
    : base(initial, 1) { }
}

class DecrementingSequence : StepSequence
{
  public DecrementingSequence (int initial)
    : base(initial, 1) { }
}

class SkipSequence : StepSequence
{
  public SkipSequence (int initial, int skips)
    : base(initial, skipsToSteps(skips)) { }

  private static int skipsToSteps (int skips)
    => skips > 0 ? skips + 1 : 0;
}
```

Let's try it out to make sure that they work.

```{code-cell}
IncrementingSequence seq = new IncrementingSequence(5); // Initialize sequence.
int[] output = seq.Take(10); // Take 10 elements.
Console.WriteLine(String.Join(", ", output)); // Print the elements.
```

```{code-cell}
DecrementingSequence seq = new DecrementingSequence(5); // Initialize sequence.
int[] output = seq.Take(10); // Take 10 elements.
Console.WriteLine(String.Join(", ", output)); // Print the elements.
```

```{code-cell}
SkipSequence seq = new SkipSequence(2, 1); // Initialize sequence.
int[] output = seq.Take(10); // Take 10 elements.
Console.WriteLine(String.Join(", ", output)); // Print the elements.
```

But wait a minute, what about a `SkipSequence` that skips in a negative sequences?
Don't worry, we'll get to that when we get to [abstract composition](abstract-constructed-object-composition).



### Characterwise ciphers

%TODO: MOTIVATION: FOR LISKOV CHAPTER. DOES IT MAKE SENSE FOR OTHER CIPHERS TO INHERIT FROM NULLCIPHER? PROBABLY NOT RIGHT?

In the chapter on [inheritance](inheritance:examples:characterwise) we discussed back and forth about the usefulness of the implementation in the superclass `CharWiseCipher` which we later renamed to `CharToCharSubstitutionCipher`.
Now that we know about abstract classes it is possible for us to avoid having to even think about this by making that base class abstract.

How come we don't have to think about it?
Well, if we mark the base class as abstract then we can be sure that there will never be any instances of that class floating around.
Also, since we then can mark any of its members as abstract, we don't actually have to implement the method `char Encode (char input)`, meaning the method that takes and produces a `char`.
That method was our main concern in the example on [inheritance](inheritance:examples:characterwise).

So let's try to simply mark it as abstract.
This time we'll call the class `CharToCharSubstitutionCipher`.

```{code-cell} csharp
abstract class CharToCharSubstitutionCipher
{
  public abstract char Encode (char input);

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }
}
```

Notice how we've marked the class as `abstract` and the method `Encode` which no longer has an implementation.
We've now actually only implemented the part we wanted to have from the start.
Namely the method that iterates over the input `string`, delegates to the character-encoding method, concatenates, and returns the result.
It was the duplication of this method that we were concerned about in the first place.

Can we now instantiate the superclass?
No, it's now abstract.

```{code-cell} csharp
:tags: [raises-exception]
CharToCharSubstitutionCipher sub = new CharToCharSubstitutionCipher();
```

Does the fact that we've now made the superclass abstract affect the classes that inherit from the superclass in any way?
No.
Since they already have implementations for `char Encode (char input)` we're good to go.

```{code-cell} csharp
:tags: [hide-input]
class CaesarCipher : CharToCharSubstitutionCipher
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
:tags: [hide-input]
class LeetCipher : CharToCharSubstitutionCipher
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

## Exercises

```{exercise}
What is an abstract class? Why are they useful?
```

```{exercise}
What is an abstract method? Why are they useful?
```

```{exercise}
Why is it useful to be allowed to define an abstract class without any abstract members?
```


```{exercise-start}
```
Write an abstract class called `Shape` which corresponds to the class depicted in the UML class diagram below.
```
┌────────────────────────────────┐
│           Shape                │
├────────────────────────────────┤
│ + <get> Width : double         │
│ + <set> Width : double         │
│ + <get> Height : double        │
│ + <set> Height : double        │
│ + <get> Area : double          │
├────────────────────────────────┤
│ + Scale (factor:double) : void │
└────────────────────────────────┘
```
Then write three classes called `Rectangle`, `Square`, `Circle` that all inherit from `Shape`.
Strive to override as few methods as possible.

When you are done, you should be able to run the following code and get the same result.
```{code-cell}
:tags: [remove-input]
abstract class Shape
{
  public virtual double Width { get; set; }
  public virtual double Height { get; set; }
  public abstract double Area { get; }
  public virtual void Scale (double factor)
  {
    Width *= factor;
    Height *= factor;
  }
}

class RightTriangle : Shape
{
  public override double Area
  {
    get => Width * Height / 2;
  }
}

class Rectangle : Shape
{
  public override double Area
  {
    get => Width * Height;
  }
}

class Oval : Shape
{
  public override double Area
  {
    get => Math.PI * Width * Height;
  }
}
```
```{code-cell}
Shape[] shapes = new Shape[] {
  new Rectangle() { Width=2, Height=1 },
  new RightTriangle() { Width=3, Height=1 },
  new Oval() { Width=0.5, Height=0.5 }
};

double before = 0;
double after = 0;
foreach (Shape shape in shapes)
{
  before += shape.Area;
  shape.Scale(2);
  after += shape.Area;
}
Console.WriteLine($"Area increased by: {after / before}");
```
```{exercise-end}
```


```{exercise}
Start with your solution to {numref}`ex:subtype-polymorphism:time`.
Can you use an abstract base class instead of an interface to eliminate further duplication?
```


```{exercise}
1. Come up with your own example of where using an abstract class with abstract methods would make sense.
2. Motivate why using an abstract class makes sense in words.
3. Implement your example in code.
```

```{exercise}
Start from the code you wrote in {numref}`inheritance:exercises:chartostringsubstitutioncipher`.
Mark both the superclass and the method with the signature `string Encode (char input)` as `abstract`.
```
