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

### Incrementing sequences

Remember the hierarchy of sequences that we built in the chapter on [inheritance](inheritance:sequences) and refined in the chapter on [access modifiers](protected:sequences)?
We never really discussed it, but it was quite awkward that the base class was called `Sequence` even though it was evidently modeling the sequence of incrementing integers.
We should probably have called it `IncrementingSequence`.

But, what if we wanted to implement a series of decrementing integers?
In the chapter on [access modifiers](protected:sequences) we marked the `set` accessor of the property `Current` as `protected` which means that subclasses now has write-access.
This means that, in theory, we could actually write a subclass of `IncrementingSequence` that decrements.

There's something that just feels pretty off about that idea.
When we have discussed the rules of "behavioral subtyping" in the chapter on [Liskov substitution principle](liskov-substitution-principle) you will have a formal way of discsusing why this idea is wrong.
In short, the principle states that any subtype must be able to use at any point where its supertype is expected.
If we use a decrementing sequence, where an incrementing one is expected, then we are violating this principle.

%This means that we have to choose between calling the base class `Sequence` and `IntSequence`.
%The former is not an excellent representation for the implementation that we have while the latter is not an excellent name for a base class.
%We will discuss the rules of "behavioral subtyping" in the chapter on [Liskov substitution principle](liskov-substitution-principle).
%However, the consequence of thinking of the base class as the sequence of incrementing integers is that all subtypes of `Sequence` now must be specializations of that sequence that don't violate the rules of that sequence.
%What if, for example, we also want to model decrementing sequences?
%The condition is too restrictive.

%What's the alternative?
%Well, remember how I in the chapter on [inheritance](inheritance) said that I personally have yet to come across a case of inheritance that isn't more elegantly solved using interfaces and composition?
%If you've seen that then you know where my sympathies lie.
%The base type should be an interface.
%
%But, since we should never dismiss something without first fully understanding how sit works and what we can do with it, let's force ourselves to keep using inheritance.
%Using an abstract base class is much better than using a concrete base class in the case of our sequnce hierarchy.
%
%By making the base class abstract we are guaranteed that there will be no instances of that class.
%This in turn means that we don't have to worry about specifying both the interface (in the abstract sense of the word) *and* the implementation for all memebrs of the superclass.
%This means that we can choose to specify only the interface where we want to leave the implementation very open, and conversely actually provide an implementation where that implementation makes sense in the superclass.

What's the alterantive?
Well, what if we didn't provide a base implementation for the method `Next` at all?
What if we make the superclass abstract and simply mark the method `Next` as `abstract`.
Have a look at the code below.

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

Can we now instantiate the superclass?
No, it's now abstract.

```{code-cell} csharp
:tags: [raises-exception]
Sequence sub = new Sequence();
```

Does the fact that we've now made the superclass abstract affect the classes that inherit from the superclass in any way?
Well, any subclass that depended on the base method `Next` will no longer compile.
One possible solution to this problem is to simply reintroduce the idea of an incrementing sequence by creating another subclass of `Sequence`.
Have a look at the class below.

```{code-cell}
class IncrementingSequence : Sequence
{
  public override void Next ()
    => Current++;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new IncrementingSequence().Take(10)));
```

How do these classes help us?
Well, two classes that no longer compile, after we've marked the method `Next` as `abstract` in the superclass `Sequence`, are `PalindromicSequence` and `FilteredSequence`.
However the former only fails to work because the latter fails to work.
So how do we rewrite the `FilteredSequence`?
Well, now that we've introduced the class `IncrementingSequence` we've got a replacement that behaves like our old non-abstract implementation of the superclass `Sequence`.
So we can get both `FilteredSequence` and by extension `PalindromicSequence` to work again by simply saying that `FilteredSequence` inherits from `IncrementingSequence`.

In the code snippet below the implementation of `FilteredSequence` remains the same.
The only thing that has changed is that it inherits from `IncrementingSequence` instead of from `Sequence`.

```{code-cell}
class FilteredSequence : IncrementingSequence
{
  public override void Next()
  {
    Current++;
    if (!IsValid())
      Next();
  }

  protected virtual bool IsValid ()
    => true;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new FilteredSequence().Take(10)));
```

The implementation of `PalindromicSequence` can remain the same.

```{code-cell}
:tags: [hide-input]
class PalindromicSequence : FilteredSequence
{
  protected override bool IsValid ()
  {
    string number = Current.ToString();
    for (int i=0; i<number.Length; i++)
      if (number[i] != number[number.Length - i - 1])
        return false;
    return true;
  }
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new PalindromicSequence().Take(20)));
```



### Decrementing sequences

Remember how we said that letting the superclass model incrementing sequences was too restrictive?
Well, now that we've got a more general superclass, and a subclass that models the notion of an incrementing sequence it is trivial to see how we would implement a decrementing sequence.

%TODO: THIS IS THE MAJOR LEAP THAT'S GOING TO TAKE US INTO COMPOSITION SINCE WE HAVE TO DUPLICATE ALL SEQUENCE VARIATIONS. WHERE DO I START INTRODUCING THIS?

```{code-cell}
class DecrementingSequence : Sequence
{
  public override void Next ()
    => Current--;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new DecrementingSequence().Take(10)));
```

Ok, seems to work.
But wait a minute.
What if we want to implement a decrementing palindromic sequence?
Do we really have to write two classes everytime we want to have an algorithm that filters numbers in a number sequence?
No, we don't have to.

The more we model our numbers this way, the more obvious it becomes that the cause of our problems is our use of inheritance.
Later we will discuss the design principle known as [composition over inheritance](composition-over-inheritance).
But already now, are we starting to see why it exists.
There are cracks in the foundation of inheritance.
It just isn't as useful for code reuse as composition is.

We'll keep working with our sequences in the chapters on abstract [constructed](abstract-constructed:sequences) and [injected](abstract-injected:sequences) composition.





%#### Limitations of inheritance



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





%The class `StepSequence` models the idea of incrementing, decrementing, and skipping all at once.
%If we wanted specific types for those concepts so that we couldn't accidentally get passed a decrementing sequence when we expected an incrementing one we trivially introduce those types.
%
%```{code-cell}
%class IncrementingSequence : StepSequence
%{
%  public IncrementingSequence (int initial)
%    : base(initial, 1) { }
%}
%
%class DecrementingSequence : StepSequence
%{
%  public DecrementingSequence (int initial)
%    : base(initial, 1) { }
%}
%
%class SkipSequence : StepSequence
%{
%  public SkipSequence (int initial, int skips)
%    : base(initial, skipsToSteps(skips)) { }
%
%  private static int skipsToSteps (int skips)
%    => skips > 0 ? skips + 1 : 0;
%}
%```
%
%Let's try it out to make sure that they work.
%
%```{code-cell}
%IncrementingSequence seq = new IncrementingSequence(5); // Initialize sequence.
%int[] output = seq.Take(10); // Take 10 elements.
%Console.WriteLine(String.Join(", ", output)); // Print the elements.
%```
%
%```{code-cell}
%DecrementingSequence seq = new DecrementingSequence(5); // Initialize sequence.
%int[] output = seq.Take(10); // Take 10 elements.
%Console.WriteLine(String.Join(", ", output)); // Print the elements.
%```
%
%```{code-cell}
%SkipSequence seq = new SkipSequence(2, 1); // Initialize sequence.
%int[] output = seq.Take(10); // Take 10 elements.
%Console.WriteLine(String.Join(", ", output)); // Print the elements.
%```
%
%But wait a minute, what about a `SkipSequence` that skips in a negative sequences?
%Don't worry, we'll get to that when we get to [abstract composition](abstract-constructed-object-composition).

