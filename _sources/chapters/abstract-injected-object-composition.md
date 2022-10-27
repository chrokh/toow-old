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

# Abstract injected object composition

```{warning}
Work in progress.
```

```{admonition} Prerequisites
:class: info
In this chapter we’re exploring the object composition abstraction level that we refer to as "abstract constructed object composition". Please have a look at the chapter [object composition](object-composition:abstraction-levels) if you have not already.
```


## Motivation

It is time.
We are finally ready to talk about abstraction depdendency injection.
This is the creme de la creme in object oriented programming.
%Where we use subtype polymoprhism to its fullest capacity.

With abstract injected object composition we are able to swap out both types and values at run-time.
Meaning that we don't couple to any particular concrete implementation or type at compile-time.
This makes our code [decoupled](coupling) and increases [maintainability](maintainability).

As we will see in one of the examples, abstract injected object composition enables us to follow the maxim [composition over inheritance](composition-over-inheritance).
As if that wasn't enough, almost all [design patterns](design-patterns) are, in one way or another, using abstract injected object composition.

Enough motivation, let's get in to it.



## Definition

An object composition is abstract if the compile-time type of the composed object is abstract.
It is injected if the composed object is constructed outside of the composing object and instead passed into it (via the constructor, a method, or property).

% TODO: Actually it could be injected through a public field as well no?

Remember, we've discussed the notion of [injection](injection) in the chapter on [concrete injected object composition](concrete-injected-object-composition).
But in short, the idea is that insted of instantiating the object ourselves, we let someone else be responsible for instantiating that object and then passing it to us.
Instead of, for example, having a constructor that accepts some parameters that I'm going to use to instantiate some object, I simply use the type of that object as the parameter type.
Instead of asking others to send me some data so that I can instantiate an object, I simply ask them for the object instead.

```{important}
Instead of instantiating the dependency ourselves, we simply parameterize a method or a constructor so that callers can pass the dependency.
```

Importantly though, now we're talking about *abstract* injected object composition.
Which means that the compile-time type of the composed object *must* be abstract.
Meaning, must be an [interface](interfaces) or an [abstract class](abstract-classes).


## Examples

### Substitution ciphers

Let's replace [inheritance](inheritance) with composition.
Remember how we've struggled, in the chapters on [methods](methods), [inheritance](inheritance), and [abstract classes](abstract-classes) to get rid of the duplicated `foreach` loop in substitution ciphers.
The loop that iterates over an input `string`, calls a method that takes a `char` and depending on the cipher returns a `char` or a `string`, and then concatenates the result.

The problem has been that some ciphers, like the Caesar cipher, returns a `char` when encoding a `char`, while others, like the Robber's language, returns a `string` when encoding a `char`.
Well, when we're using composition rather than inheritance, this is no longer a big deal.
Check this out:

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

(abstract-injected-object-composition:examples:adapter)=
```{code-cell} csharp
class SubstitutionCipher : IStringToStringCipher
{
  ICharToStringCipher cipher;

  public SubstitutionCipher (ICharToStringCipher cipher)
    => this.cipher = cipher;

  public SubstitutionCipher (ICharToCharCipher cipher)
    => this.cipher = new CharToStringAdapter(cipher);

  public string Encode (string input)
  {
    string output = "";
    foreach (char c in input)
      output += cipher.Encode(c);
    return output;
  }
}

class CharToStringAdapter : ICharToStringCipher
{
  ICharToCharCipher cipher;

  public CharToStringAdapter (ICharToCharCipher cipher)
    => this.cipher = cipher;

  public string Encode (char input)
    => cipher.Encode(input).ToString();
}
```

Instead of letting the substitution cipher be a superclass that other classes can subclass (meaning: is-a) we simply say that it's a class that composes (meaning: has-a) other classes.

Pay special attention to how our concrete ciphers (`RobbersCipher`, `CaesarsCipher`, and `LeetCipher`) no longer need to implement the interface `IStringToStringCipher` and no longer need to implement the method `string Encode (string input)`.
The string to string conversion is now instead achieved by means of abstract injected composition.

But what's this `CharToStringAdapter`?
Well, that's the [design pattern](design-patterns) known as "adapter pattern".
But it's also just a simple solution to the problem caused by some ciphers returning a `char` when encoding a `char` while others return a `string`.
With the adapter, which *also uses abstract injected object composition*, we can simply wrap any cipher that implements the interface `ICharToCharCipher` and make it behave as if it implemented the interface `ICharToStringCipher`.

Notice also how we make use of the `CharToStringAdapter` in one of the constructors of `SubstitutionCipher`.
You might remember from the chapter on [constructors](constructors) that constructors too can be [overloaded](overloading).
Let me show you why this is sensible, but first let's bring in some ciphers:

```{code-cell} csharp
:tags: [hide-input]
class RobbersCipher : ICharToStringCipher
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

class LeetCipher : ICharToCharCipher
{
  public char Encode (char input)
  {
    switch (input)
    {
      case 'L': return '1'; case '1': return 'L';
      case 'A': return '4'; case '4': return 'A';
      case 'O': return '0'; case '0': return 'O';
      case 'T': return '7'; case '7': return 'T';
      case 'E': return '3'; case '3': return 'E';
      default: return input;
    }
  }
}

class CaesarCipher : ICharToCharCipher
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public char Encode (char input)
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


The overloaded constructor that instantiates the `CharToStringAdapter` and wraps the cipher we've passed simplifies the use of this class by allowing us to write:

```{code-cell} csharp
new SubstitutionCipher(new CaesarCipher(1));
```

Without the overloaded constructor we would have to write:

```{code-cell} csharp
new SubstitutionCipher(new CharToStringAdapter(new CaesarCipher(1)));
```

```{note}
But, isn't this concrete constructed object composition you ask?
Yes, it is.
Didn't I say to always prefer abstract injected object composition?
Yes, I did.
Sometimes I too break the rules.
In this case, I do it because it makes using our class simpler, but we don't have to sacrifice any modularity.
```

So how do we use these classes?
Can we really treat all substitution ciphers uniformly now?

```{code-cell} csharp
SubstitutionCipher sub1 = new SubstitutionCipher(new RobbersCipher('o'));
SubstitutionCipher sub2 = new SubstitutionCipher(new CaesarCipher(1));
SubstitutionCipher sub3 = new SubstitutionCipher(new LeetCipher());
```

Indeed we can.
Moreover, whenever we call the `Encode` method on any of these objects of type `SubstitutionCipher`, it's the same, one and only, `foreach` loop that executes.
How about we call this mission accomplished?

```{code-cell} csharp
Console.WriteLine(sub1.Encode("Hello"));
Console.WriteLine(sub2.Encode("Hello"));
Console.WriteLine(sub3.Encode("Hello"));
```

In the end you might say that it was a bit silly that we tried to replace a simple `foreach` loop which in a later chapter we will replace with [LINQ](linq) anyway.
Nevertheless, the point is not that this particular loop was bad, but that this is an example of how you can find yourself in a position where you're repeating the same code over and over again for each implementation or subclass.


### Flip Flop ciphers

Let's explore our newfound power.
You must have known that we were going to return to the flipflops.
In the chapter on [concrete injected object composition](concrete-injected-object-composition:examples:general-flip-flop) we discussed how our flip flop cipher was coupled to the idea of a Caesar cipher even though it in a sense has nothing to do with that specific cipher.

Let's implement it more generally using abstract injected object composition.

```{code-cell} csharp
class FlipFlopCipher : IStringToStringCipher
{
  ICharToStringCipher flip;
  ICharToStringCipher flop;

  public FlipFlopCipher (ICharToStringCipher flip, ICharToStringCipher flop)
  {
    this.flip = flip;
    this.flop = flop;
  }

  public string Encode (string input)
  {
    string output = "";
    for (int i=0; i<input.Length; i++)
      if (i % 2 == 0)
        output += flip.Encode(input[i]);
      else
        output += flop.Encode(input[i]);
    return output;
  }
}
```

Notice how nothing in the implementation had to change except for the types.
It's exactly the same implementation as in the chapter on [abstract injected object composition](concrete-injected-object-composition:examples:general-flip-flop) except for the fact that we've generalized the types and also have made the `FlipFlopCipher` implement the interface `IStringToStringCipher`.
In other words, we've moved from concrete compile-time types to abstract compile-time types.

Why did we choose to, in the constructor, take objects of type `ICharToStringCipher` rather than `ICharToChar`?
Think back to the example we just gave where we eliminated the [duplicated foreach](abstract-injected-object-composition:examples:adapter).
By introducing an adapter we are able to convert any `ICharToCharCipher` to a `ICharToStringCipher`.
The inverse conversion however is not as trivial.
So if we want the `FlipFlopCipher` to support all substitution ciphers that we have seen then we must pick the type to which others can be converted.

Let's see this thing in action, shall we?

```{code-cell} csharp
FlipFlopCipher cipher = new FlipFlopCipher(
    new RobbersCipher('a'),
    new CharToStringAdapter(new CaesarCipher(1)));

Console.WriteLine( cipher.Encode("HELLO WORLD") );
```

%Pretty wild stuff right?
Let me be the first to say that our ciphers are finally getting pretty interesting.
After the exercises in this chapter I'm suspecting you'll have a pretty good idea of the power of [composition over inheritance](composition-over-inheritance) and abstract injected object composition.


(abstract-injected-object-composition:examples:composite-ciphers)=
### Composite ciphers

One final example.
Here's a classic.
How about a composite cipher that takes two ciphers in the constructor and applies both of them to whatever input we give it when encoding?

```{code-cell} csharp
class CompositeCipher : ICharToCharCipher
{
  ICharToCharCipher first, second;

  public CompositeCipher (
      ICharToCharCipher first,
      ICharToCharCipher second)
  {
    this.first = first;
    this.second = second;
  }

  public char Encode (char input)
    => second.Encode(first.Encode(input));
}
```

```{code-cell} csharp
CompositeCipher composite = new CompositeCipher(
  new CaesarCipher(1),
  new LeetCipher());

Console.WriteLine(composite.Encode('E'));
```

```{seealso}
We named this cipher `CompositeCipher` because this essentially is an implementation of the [Composite design pattern](composite-pattern).
More on that pattern later.
```

However, our composite cipher only works with ciphers of type `ICharToCharCipher`.
But if you think about it for a moment you will quickly realize that we could do the same thing for `IStringToStringCipher`.
But to also support ciphers of type `IStringToStringCipher` we must duplicate the whole `CompositeCipher` implementation.
We don't want that, so let's drop that idea for now and let's get back to it when we get to [generics](generics).





## Exercises

```{exercise}
What is the difference between *constructed* and *injected* abstract object composition?
```

```{exercise}
What is the difference between *concrete* and *abstract* injected object composition?
```

```{exercise}
Invent and implement another class that implements `IStringToStringCipher`, `ICharToCharCipher`, or `ICharToStringCipher` and that uses abstract injected object composition to work.
```

```{exercise}
Draw the [quadrant diagram of abstraction levels in object composition](composition-quadrants) and explain all four abstraction levels.
Remember to give examples of each.
```

```{exercise}
Explain the benefits of *abstract injected object composition* in terms of the five characteristics of [maintainability](maintainability:characteristics).
```



```{exercise-start}
:label: ex:array-cipher
```

Write a class called `SequenceCipher` that implements the interface `IStringToStringCipher`.
Its constructor must take a single argument of type `IStringToStringCipher[]`, called `ciphers`.
The `Encode` method runs the `Encode` method of each `IStringToStringCipher` in `ciphers`, in sequence, on the input.

```{code-cell} csharp
:tags: [remove-input]
class SequenceCipher
{
  IStringToStringCipher[] ciphers;
  public SequenceCipher (IStringToStringCipher[] ciphers)
    => this.ciphers = ciphers;

  public string Encode (string input)
  {
    string output = input;
    foreach (var cipher in ciphers)
      output = cipher.Encode(output);
    return output;
  }
}
```

It should behave as in the usage example below:

```{code-cell} csharp
Console.WriteLine(
  new SequenceCipher(new IStringToStringCipher[] {
    new SubstitutionCipher(new RobbersCipher('O')),
    new SubstitutionCipher(new RobbersCipher('E')),
    new SubstitutionCipher(new CharToStringAdapter(new LeetCipher())),
    }).Encode("HELLO ELITE")
);
```
```{exercise-end}
```



```{exercise-start}
:label: abstract-injected-object-composition:exercises:predicates
```
Write a class called `ConditionalCharToCharCipher` that implements the interface `ICharToCharCipher`.
Its constructor must take two arguments.
One is of type `ICharToCharCipher` and the other is of type `ICharPredicate`.
The interface `ICharPredicate` must look like this:

```{code-cell} csharp
interface ICharPredicate
{
  bool Check (char input);
}
```

The `Encode` method runs the `Encode` method of the `ICharToCharCipher` if and only if the method `Check` in `ICharPredicate` returns `true` when passed the `char` that we are trying to encode.
To test whether this class works you must also implement a concrete implementation for `ICharPredicate`.

```{code-cell} csharp
:tags: [remove-input]
class ConditionalCharToCharCipher : ICharToCharCipher
{
  ICharToCharCipher cipher;
  ICharPredicate pred;

  public ConditionalCharToCharCipher (ICharToCharCipher cipher, ICharPredicate pred)
  {
    this.cipher = cipher;
    this.pred = pred;
  }

  public char Encode (char input)
    => pred.Check(input) ? cipher.Encode(input) : input;
}
```

For the usage example, let's use a simple predicate that just checks whether its input is uppercase or not.

```{code-cell} csharp
class IsUpperCase : ICharPredicate
{
  public bool Check (char input) => Char.IsUpper(input);
}
```

With that in place we should be able to set up a conditional cipher.
We should then be able to run the encode method of that cipher and depending on what we pass it either get encoded characters or the same characters that we pass it back.

```{code-cell} csharp
ConditionalCharToCharCipher cipher = new ConditionalCharToCharCipher(
  new CaesarCipher(1),
  new IsUpperCase());
```

If we pass an uppercase letter it should encode it using the cipher.

```{code-cell} csharp
Console.WriteLine( cipher.Encode('A') );
```

If we pass a lowercase letter it should return the same letter.

```{code-cell} csharp
Console.WriteLine( cipher.Encode('a') );
```


*Extra questions:*

1. Why are we *injecting* rather than *constructing* the `ICharPredicate`? Explain in your own words.
2. One could argue that it wouldn't make sense to couple to `ICharToStringCipher` instead of `ICharToCharCipher`. How would you defend that position?

By the way, in the chapters on [generics](generic-types) we will learn how to generalize this implementation so that it also works for `ICharToString` ciphers without adding duplicated code.
```{exercise-end}
```



%```{exercise}
%Define a class called `CipherRepeater`.
%Let it take a cipher in the constructor.
%
%Let it implement each of the interfaces 
%Start with the code you wrote in {numref}`ex:subtype-polymorphism:encodeNTimes`
%```



% ==== TODOs: =====

%```{exercise}
%Write a class called `CharWiseCompositeCipher` that implements the interface `ICharCipher`.
%Note that we mean `ICharCipher` and not `ICipher`.
%Its constructor must take two objects of type `ICharCipher` as arguments.
%The `Encode` method runs the `Encode` method of both the injected ciphers on the input `char` before returning the result.
%TODO: THIS DOES NOT WORK BECAUSE Encode :: ICharCipher ~> char -> string
%```



%
%````{exercise}
%Write a program with three classes called `Speech`, `MultiSpeech`   has one class called `Animal` and one class called `Speech`.
%
%```
%        Animal
%==========================
%+ Animal (Speech speech);
%+ string Speak ();
%--------------------------
%
%
%        Speech
%==========================
%+ Speech (string sound);
%+ string Speak ();
%--------------------------
%```
%
%Using your classes, it should be possible to write the following program:
%
%```csharp
%Speech meow = new Speech("meow");
%Speech blub = new Speech("blub");
%Speech meowblub = new MultiSpeech(meow, blub);
%
%Animal cat = new Animal(meow);
%Animal fish = new Animal(blub);
%Animal catfish = new Animal(meowblub);
%
%Console.WriteLine( cat.Speak() );
%Console.WriteLine( fish.Speak() );
%Console.WriteLine( catfish.Speak() );
%```
%
%And if you run that program, you should get the following output:
%
%```output
%meow
%blub
%meow blub
%```
%````
% Hint: This is just good old [recursion](recursion) but using classes.





-------------


% TODO: Use any of this old stuff?
%Think way back to where we ended in the chapter on [concrete constructed object composition](concrete-constructed-object-composition).
%Instead of letting `RobbersStringCipher` instantiate a `RobbersCharCipher` we *injected* it.
%This meant that we got rid of the need to expose whatever constructor parameters the inner `char` cipher needed in the outer `string` cipher.
%
%In the end we were still left with one problem however.
%We were able to inject instances of `RobbersCharCipher` when creating instances of `RobbersStringCipher`.
%However, when we had created a `CaesarCharCipher` we couldn't inject that to `RobbersStringCipher` when we wanted to create a Caesar cipher.
%
%We started with:
%
%```csharp
%class RobbersStringCipher
%{
%  public string Encode (string input)
%  {
%    RobbersCharCipher charCipher = new RobbersCharCipher();
%    // ...
%  }
%}
%```
%
%But rewrote it to:
%
%```csharp
%class RobbersStringCipher
%{
%  RobbersCharCipher charCipher;
%
%  public RobbersStringCipher (RobbersCharCipher charCipher)
%    => this.charCipher = charCipher;
%
%  public string Encode (string input)
%  {
%    // ...
%  }
%}
%```
%
%Remember how we said that there's a design principle stating that we should favor composition over inheritance?
%Here's the thing.
%
%Let's now look at where we more recently left off in the chapter on [concrete dependency injection](concrete-dependency-injection).
%The idea of `CharWiseCipher` solves the problem of being able to reuse different `char` ciphers.
%But the idea of injecting the ciphers solves the problem of having to create a separate subclass for each and every variation.
%And the idea of injecting the ciphers solves the problem of having to create a separate subclass for each and every variation.
%Let's combine these two ideas.
%
%Instead of subclassing `CharWiseCipher` in order to change which particular cipher we want to use, we're simply going to inject whatever cipher we need through the constructor.
%The change is simple.
%Here's what the new `CharWiseCipher` implementation looks like:
%
%Instead of *instantiating* the `ICharCipher` we simply expose it as a constructor parameter.
%Since there is no [empty constructor](constructors), and since we have configured our compiler to treat [possible null references as errors](nothingness) we are guaranteed that whenever we have an instance of `CharWiseCipher` then we know that said instance will have access to an `ICharCipher`.
%
%%The four names I've used to describe the different abstraction levels of object composition is no coincidence.
%%Abstract dependency injection is like taking the abstract part from 
%
%There is no longer a need for any of the subclasses of `CharWiseCipher`.
%To create a Robber's language cipher whose encoding method takes a `string` as input and produces a `string` as output we simply have to inject an instance of `RobbersCharCipher` upon construction of a `CharWiseCipher`.
%The composition happens at run-time and arbitrarily complex types can thus be constructed at run-time.
%
%```csharp
%var leetCipher = new CharWiseCipher(new LeetCharCipher());
%var robbersCipher = new CharWiseCipher(new RobbersCharCipher('o'));
%
%Console.WriteLine(leetCipher.Encode("LOL"));
%Console.WriteLine(robbersCipher.Encode("LOL"));
%```
%


%---
%
%How about a composite cipher?
%A cipher that takes two ciphers as constructor arguments and upon encoding applies both of them in sequence.
%
%First, we must bring back the idea of the interface `ICipher` and let `CharWiseCipher` implement that interface.
%
%```csharp
%interface ICipher { string Encode (string input); }
%class CharWiseCipher : ICipher { /* ... */ }
%```
%
%Then let's write a class called `CompositeCipher` that implements the `ICipher` interface.
%It takes two objects of type `ICipher` as constructor arguments and when we call `Encode` it runs our input through the `Encode` method of both of its ciphers.
%
%```csharp
%class CompositeCipher : ICipher
%{
%  ICipher cipher1;
%  ICipher cipher2;
%
%  public CompositeCipher (ICipher cipher1, ICipher cipher2)
%  {
%    this.cipher1 = cipher1;
%    this.cipher2 = cipher2;
%  }
%
%  public string Encode (string input)
%    => cipher2.Encode(cipher1.Encode(input));
%}
%```
%
%Here's how we can use the `CompositeCipher`:
%
%```csharp
%var leetCipher = new CharWiseCipher(new LeetCharCipher());
%var robbersCipher = new CharWiseCipher(new RobbersCharCipher('O'));
%var robberThenLeet = new CompositeCipher(robbersCipher, leetCipher);
%
%Console.WriteLine(robberThenLeet.Encode("LOL"));
%```
%
%```output
%7o707o7
%```
%
%Since `CompositeCipher` itself is implements the interface `ICipher` we can at run-time, compose multiple instances of `CompositeCipher` to create an infinitely complex cipher.
%No matter how complex the cipher we construct is, you can still run its encoding through a single call to its `Encode` method.
%
%```csharp
%var robbersO = new CharWiseCipher(new RobbersCharCipher('o'));
%var robbersA = new CharWiseCipher(new RobbersCharCipher('a'));
%var robbersE = new CharWiseCipher(new RobbersCharCipher('e'));
%
%var robbersOEA =
%  new CompositeCipher(
%    robbersO,
%    new CompositeCipher(
%      robbersA,
%      robbersE));
%
%Console.WriteLine(robbersOEA.Encode("D"));
%```
%
%```output
%DeDaDeDoDeDaDeD
%```
%
%By the way, we use the term "composite" since this is very similar to the design pattern known as [Composite pattern](composite-pattern) which we will discuss in a later chapter.
%By the way again, while we're not discussing data structures in this book you might be interested to know that this data structure is known as a "binary tree".
%
%
%Impressed yet?
%Just imagine trying to write all these ciphers by hand.
%Imagine trying to achieve the same level of run-time flexibility.
%It would be a gigantic mess.
%
%This is the power of composition.
%And in object oriented languages, object composition is only really powerful if use abstract dependency injection.
%
%In a later chapter, we will discuss [depdendency inversion](dependency-inversion-principle) which is the design principle that underlies the idea of abstract dependency injection.
%The gist of it however is that you should:
%
%```{admonition} Design principle
%:class: hint
%Depend on abstractions not on concretions.
%```
%
%%- Principle: Depend on abstractions not on concretions.
%%- In procedural programming abstract modules depend on concrete modules, but in object oriented programming abstract modules can depend on abstract modules.
%%
%%```{seealso}
%%Dependency injection/inversion chapter.
%%```
