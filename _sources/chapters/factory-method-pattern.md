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

# Factory method pattern

```{warning}
Work in progress.
```

% TODO: Add example: RandomCipherFactory.
% TODO: Add example: RandomSequenceFactory.
% TODO: Is it possible to meaningfully express: RandomFactory<T> that uses other factories to for example generate random ciphers and random sequences while still allowing injection. This means you would have to create a constant factory for each type that you want to be able to create. But this doesn't really seem like a net-net win does it?

## Motivation

The purpose of the factory method pattern is to allow objects to create new objects without being concerned about what subtypes to create nor how to actually create them.
Said differently, it allows us to defer object construction.

We've touted the idea of [abstract injected object composition](abstract-injected-object-composition) as the way to compose objects.
However, we haven't addressed two obvious problems of injection.

1. What if the object that we want isn't available at the time of construction of the object that wants to use it?
2. What if we want to be able to inject an arbitrary number of objects?

Think about the classic game of Tetris for example.
It's not like we can *inject* a `Piece` to `Board`.
A Tetris board is ever-changing.
As soon as we have landed one piece, the next is generated.
Where should this piece come from?
Do we need to instantiate a whole new board every time we want to inject a new piece?
Or should we inject via an instance method and let someone else be responsible for sending us a piece at the right time?
But how would they know that the time to send a new piece is now?
Perhaps we could use the [observer pattern](observer-pattern) or [events](events) for that?

All these solutions are unnecessarily complicated.
This is where the factory method pattern comes into play.
Instead of injecting the thing we want to use, which in the case of Tetris is the piece, we inject a factory that can produce objects of the type that we need.
In the terminology of the [Bridge pattern](bridge-pattern), we add another layer of abstraction.
Whenever we need a new object, we simply ask the factory for another object.



## Definition

The definition of the factory method pattern from the classic design patterns book {cite:t}`gammaEtAl1995` is as follows:

```{epigraph}
Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

-- {cite:t}`gammaEtAl1995`
```

% TODO: Replace image.
```{figure} https://upload.wikimedia.org/wikipedia/commons/4/43/W3sDesign_Factory_Method_Design_Pattern_UML.jpg?20170805180321

UML class diagram of factory method pattern.
*[Image will be replaced soon]* [[Image source](https://commons.wikimedia.org/wiki/File:W3sDesign_Factory_Method_Design_Pattern_UML.jpg)]
```


## Examples

### Cipher factories

Remember the cipher sequences that we built in the chapter on [variant generic interfaces](variant-generic-interfaces:cipher-factories)?
We mentioned that that essentially was an example of the factory method pattern so let's run through that example again.

Let's first make sure that we've got our cipher interface and some ciphers.

```{code-cell} csharp
:tags: [hide-input]
interface ICipher<in TIn, out TOut>
{
  TOut Encode (TIn input);
}

class CaesarCipher : ICipher<char,char>
{
  public int Steps { get; private set; }

  public CaesarCipher (int Steps)
    => this.Steps = Steps;

  public char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + Steps) % alphabet.Length;
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

class RobbersCipher : ICipher<char,string>
{
  private char vowel;

  public RobbersCipher (char vowel)
    => this.vowel = vowel;

  public string Encode (char input)
  {
    string consonants = "BCDFGHJKLMNPQRSTVXYZ";
    if (consonants.IndexOf(Char.ToUpper(input)) != -1)
      return $"{input}{vowel}{input}";
    else
      return $"{input}";
  }
}
```

Ok, so here's what the factory interface looked like in the chapter on [variant generic interfaces](variant-generic-interfaces:cipher-factories).

```{code-cell} csharp
interface IFactory<out T>
{
  T Next ();
}
```

In that chapter we discussed how the type parameter `T` in the generic type `IFactory<out T>` can be covariant since this type is only ever used as a return type.
This is not relevant to factory method pattern, but we'll keep it here since it allows us to use more specific return types in the implementations' factory methods.

In that chapter we also discussed two potential implementations of the factory interface.
A factory that generates Caesar ciphers with increasing number of steps and one that generates ciphers of decreasing number of steps.


```{code-cell} csharp
class IncrementingCaesarCipherFactory : IFactory<CaesarCipher>
{
  int i = 0;
  public CaesarCipher Next () => new CaesarCipher(i++);
}

class DecrementingCaesarCipherFactory : IFactory<CaesarCipher>
{
  int i = 0;
  public CaesarCipher Next () => new CaesarCipher(i--);
}
```

You might of course already have figured out that by using [delegates](delegates) or the [strategy pattern](strategy-pattern) to write a more general Caesar cipher factory that makes the above two redundant.
However, this is given as an exercise for you in {numref}`ex:factory-method-pattern:transforming-caesar-cipher-factory`, so let's leave that topic for now.

There are of course plenty of other factories that we can produce.
Here's a factory that produces Robber's ciphers based around various vowels.

```{code-cell} csharp
class VowelCyclingRobbersCipherFactory : IFactory<RobbersCipher>
{
  int i = 0;
  string vowels = "aouei";
  public RobbersCipher Next () => new RobbersCipher(vowels[i++ % vowels.Length]);
}
```

Here's a variation of the factory above that take the letters that it can vary between as input.

```{code-cell} csharp
class CyclingRobbersCipherFactory : IFactory<RobbersCipher>
{
  int i = 0;
  string letters;

  public CyclingRobbersCipherFactory (string letters)
    => this.letters = letters;

  public RobbersCipher Next ()
    => new RobbersCipher(letters[i++ % letters.Length]);
}
```

Let's try this latest factory out.

```{code-cell} csharp
CyclingRobbersCipherFactory factory = new CyclingRobbersCipherFactory("@€!");
Console.WriteLine(factory.Next().Encode('L'));
Console.WriteLine(factory.Next().Encode('L'));
Console.WriteLine(factory.Next().Encode('L'));
```






## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/EcFVTgRHJLM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

% - Also abstract factory pattern (but this is trivial).
% - Example: Where do we get ciphers from?
% - Highlight the similarities with bridge pattern!
% - Tie back to example in abstract constructed object composition.


## Exercises

```{exercise}
What is the factory method pattern?
```

```{exercise}
Which method would we call the "factory method" when we've got a case of the factory method pattern?
```

```{exercise}
Come up with your own example of the factory method pattern and implement it in code.
```

```{exercise}
How are the [maintainability characteristics](maintainability:characteristics) affected when using the factory method pattern?
```

```{exercise}
Let's say that we've got a factory that always produces structurally equivalent objects and that this factory is an implementation of some interface.
Let's then say that we in some other class want objects of the type that the factory creates.
Consider the following two alternatives.

1. Either we let the other class create the objects that it wants itself.
2. Or we couple the other class to our interface and inject the factory (e.g. through the constructor) and let our factory create the objects.

It could be argued that the second option is more [maintainable](maintainable), even if we only have a single concrete factory at the moment. Why is this?
```

```{exercise-start}
:label: ex:factory-method-pattern:transforming-caesar-cipher-factory
```
Perhaps you have already realized that by using our newfound skills in either [delegates](delegates) or [strategy pattern](strategy-pattern) we can create a more general Caesar cipher factory which we can use to create the incrementing and decrementing factories.
What's common between the incrementing and the decrementing Caesar cipher factories?
The idea of applying a transformation to the steps variable upon each request to get the next cipher.

Write a class called `TransformingCaesarCipherFactory` that implements the interface `IFactory<CaesarCipher>` and takes an argument in the constructor of type `Func<int,int>`.
This argument can be thought of as the transformer that we should apply after each time we generate a new cipher.

```{code-cell} csharp
:tags: [remove-input]
class TransformingCaesarCipherFactory : IFactory<CaesarCipher>
{
  int i;
  Func<int,int> transformation;
  public TransformingCaesarCipherFactory (int start, Func<int,int> transformation)
  {
    this.i = start;
    this.transformation = transformation;
  }
  public CaesarCipher Next ()
  {
    CaesarCipher current = new CaesarCipher(i);
    i = transformation(i);
    return current;
  }
}
```
When we've written the factory, we should be able to create both incrementing and decrementing Caesar cipher generating factories at run-time.
Like in the example below:
```{code-cell} csharp
int inc (int x) => x + 1;

var incrementingCaesarCipherFactory
  = new TransformingCaesarCipherFactory(0, inc);

Console.WriteLine(incrementingCaesarCipherFactory.Next().Encode('A'));
Console.WriteLine(incrementingCaesarCipherFactory.Next().Encode('A'));
Console.WriteLine(incrementingCaesarCipherFactory.Next().Encode('A'));
```
```{exercise-end}
```

