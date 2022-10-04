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

# Concrete injected object composition

```{warning}
Work in progress.
```

```{admonition} Prerequisites
:class: danger
In this chapter we’re exploring the object composition abstraction level that we refer to as "concrete injected object composition". Please have a look at the chapter [object composition](object-composition:abstraction-levels) if you have not already.
```



## Motivation

When we move from *constructed* to *injected* object composition we gain run-time modifiability of which object is being composed.
We gain the ability to change which object is composed into the composing object at run-time, instead of just at compile-time.
This is a form of "[dependency injection](dependency-inversion-principle)".

What does this mean?
Think back to the ciphers that we built in the chapter on [concrete constructed object composition](concrete-constructed-object-composition).
Remember how `FlipFlopCaesarCipher` had to expose all constructor parameters of `CaesarCipher`, the object that it constructed.
More generally, any constructor parameter of the composed object that we want to remain variable has to be exposed as a parameter (possibly through the constructor) of the composing object.

```{important}
The danger of concrete constructed object composition is that whenever the constructor of the composed object changes, the composer must also change.
```

%Whenever we want to change the constructor of the composed object, that change ripples and causes the composing object to also have to change.

Why is this a problem?
Well, the change "ripples" through the system.
This is really bad for [maintainability](maintainability) and is part of an [anti-pattern](anti-pattern) called "[shotgun surgery](shotgun-surgery)".

```{hint}
When thinking about whether something is a good or bad design decision we should ask ourselves what happens if we take our current practice to the extreme.
What happens if I design my whole system like this?
What happens if I compose ten objects like this?
We'll talk more about design in the chapter on [maintainability](maintainability) and its related chapters.
```

What happens if I have a class that instantiates a class, that instantiates a class, that instantiates a class, that instantiates a class, and so forth...
Well, if all the constructors have parameters and we want to expose all parameters then we will have to expose all parameters of all the constructors in the constructor of the outermost class.
This is bizarre and a nightmare to maintain.

```{important}
If you use constructed object compostion all the way "down", the you have to sum the number of constructor arguments all the way "up". Remember the [DRY](DRY) principle? Kind of sounds like a lot of duplication, don't you think?
```

So, hopefully that settles it.
Concrete constructed object composition should be used sparingly and with caution.
Let's talk about better forms of object composition: injected object composition.




## Definition

So how do we do *injected* concrete object composition instead of *constructed*?
Simple, by passing the composed object *itself* instead of the parameters of the object.
Instead of asking for parameters that I need to construct an object, I simply ask for the complete object.
Instead of directly creating the object that we need, we simply state what the data type is of the thing that we need.
Whoever is calling us is now responsible for getting hold of such an object before calling us.

Injection gives us the ability to expose the constructor parameters of the composed object without having to duplicate the parameters in the composing object.
Injection move the construction of the composition out of the composing object.
A third party is now resposible for instantiating the composer, the composed, and providing the composed to the composer.

We simply say: in order for me to do my job I need something of type `XYZ`, so if you need me to do my job you must first pass me something of type `XYZ`.
Whether our caller is the one who creates the object in the end is none of our concern.

```{important}
In dependency injection, we expect an object that our callers are responsible for constructing instead of parameters that we use to construct the object ourselves.
```

%Remember the term [indirection](indirection)?
%Instead of doing the thing directly, we let some other thing do the thing and then use that thing.
%In this case, we are talking about "dependency injection".




## Examples

Let's keep working on the `FlipFlopCaesarCipher` that we introduced in the chapter on [concrete constructed object composition](concrete-constructed-object-composition).
It composes our `CaesarCipher` so first we need to get a hold of that definition.

```{code-cell} csharp
:tags: [hide-input]
class CaesarCipher
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

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode(letter);
    return output;
  }
}
```

How do we move from dependency construction to dependency injection?
Well, instead of instantiating the object that we want to compose ourselves, we simply ask for it as a parameter, in, for example, the constructor.

```{code-cell} csharp
class FlipFlopCaesarCipher
{
  CaesarCipher flip;
  CaesarCipher flop;

  public FlipFlopCaesarCipher (CaesarCipher flip, CaesarCipher flop)
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

Notice that the lines that instantiated `CaesarCipher`s and assigned them to the instance variables are now gone.
They used to look like this:

```csharp
flip = new CaesarCipher(steps);
flop = new CaesarCipher(-steps);
```

So where do we assign values to the variables `flip` and `flop` now?
We still need the variables and we still need values for them since we're still calling the method `Encode` on them later.

Well, if you have a look at the constructor's signature you can see that we're now accepting two arguments of type `CaesarCipher`.
As we will learn in the chapter on [dependency inversion](dependency-inversion), passing arguments like this is known as "constructor injection".
In other words, the old two lines have been replaced with this:

```csharp
this.flip = flip;
this.flop = flop;
```

Instead of saying which particular `CaesarCipher` object we will use, and instead of requiring that users of this class pass whatever parameters we need to pass on to the `CaesarCipher` cwe simply state that to run this method you must also provide a `CaesarCipher` object.

So how do we use this updated class?
Let's try it out by passing two objects of type `CaesarCipher` upon instantiation.

```{code-cell} csharp
var cipher = new FlipFlopCaesarCipher(
    new CaesarCipher(1),
    new CaesarCipher(-1));

Console.WriteLine(cipher.Encode("AABBCC"));
```

```{important}
Instead of instantiating the dependency ourselves, we simply parameterize a method or a constructor so that callers can pass the dependency.
```

Importantly, the class `CaesarCipher` itself does *not* have to change at all.
Even though we've moved from *construction* to *injection* we can leave the code the same.
The main program however will have to change since the way we use our building blocks have changed.
We would now use our classes like this:

```{code-cell} csharp
FlipFlopCaesarCipher cipher = new FlipFlopCaesarCipher(
    new CaesarCipher(10),
    new CaesarCipher(3));

Console.WriteLine(cipher.Encode("AABBCC"));
```

### Generalizing

At this point you might already have realized that the `FlipFlopCaesarCipher` actually has very little to do with the encoding-decoding idea.
Our current abstraction accepts any two objects of type `CaesarCipher` which means that we can send any two instances of it.
They don't have to be arranged in a encode/decode fashion.

%Pretty cool stuff right?
%But hold your horses.
%[Abstract injected object composition](abstract-injected-object-compsition) is even better.


## Discussion

When we are constructor injecting, we're giving ourself the ability to create multiple different variations of the object receiving the injection (`FlipFlopCaesarCipher` by simply passing in a different instances of the injected object (`CaesarCipher`).
This is immensely more flexible than in the case of concrete constructed object composition where we create the object directly.

In the case of dependency *construction* there is only ever two kinds of `CaesarCipher`.
Whatever two instances we instantiate. Those are the ones we'll get.
In the case of dependency *injection* the number of different variations of `FlipFlopCaesarCipher` that we can instantiate simply depends on how many different variations of `RobbersCipher` we can instantiate and then inject.

Of course we could have written the same program using concrete *constructed* object composition.
Heck, we could even have written the same program using method composition.
But the point is not that the problem cannot be solved using a more direct technique.
The point is that the more direct technique is less [maintainable](maintainability).
It suffers from what we later will learn to call [tighter coupling](coupling).

What's important to realize is that the behavior of `FlipFlopCaesarCipher` is not determined at *compile-time* but at *run-time*.

%Some of you might object to this and say that all this is way too complicated.
%Would it not be simpler to just ask the user, using `Console.ReadKey`, directly in the `RobbersCharCipher` class.
%Simpler? Yes, in a sense.
%If we are 100% certain that this is the program that we need to write and that there will never be any other versions of the program that we will have to write then yes, doing it directly like that would be simpler.
%More *modular* or *modifiable*?
%Unequivocally and most certainly no.

%We'll explore this vocabulary more in the chapter on [maintainability](maintainability).
%In short however, the point is this:

```{important}
When we're using dependency injection we give ourselves the ability to solve many different problems by simply composing our simple parts at run-time.
```

%The additional code we need to write to support something like vowels based on user input is trivial.
Perhaps more importantly, when we change our programs in this way, it's mostly an exercise in *adding* code, not in *rewriting* code.
This is good, because whenever we rewrite something, we run the risk of breaking something.
You'll learn more about this when we get to the [open-closed principle](open-closed-principle).

If you think this is cool, man are you in for a treat.
Just wait until we get to [abstract injected object composition](abstract-injected-object-composition) for something that will really blow your mind.
And just wait until we get to [generics](generics) and combine them with abstract injected object composition.
%Then we will be able to say that any type that satisfies a particular [interface](interface) is allowed to be injected into `RobbersStringCipher`.
%That kind of object composition seems to me to be the whole idea behind object oriented programming.



## Exercises

% TODO: Usage examples!!!

````{exercise}
:label: ex:concrete-injected-object-composition:leet
Start from the code you wrote in {numref}`ex:concrete-constructed-object-composition:leet`.
Refactor the code so that the two `LeetCipher`s are *injected* through the constructor of the `FlipFlopLeetCipher` class instead of *instantiated* by it.
````

```{exercise}
Compare your solutions to {numref}`ex:concrete-constructed-object-composition:leet` and {numref}`ex:concrete-injected-object-composition:leet`.
Use your own words to explain what we have gained, in terms of maintainability, by moving from concrete object *construction* to concrete object *injection*.
```

```{exercise}
Write a class called `PositionWiseCaesarCipher` that takes an array of Caesar ciphers as input.
When encoding, you should apply the 1st cipher (at index 0) to the first letter, the 2nd cipher to the 2nd letter, and so forth.
If we run out of ciphers we simply "cycle" and start again from the first cipher.
```

```{exercise}
:label: ex:concrete-injected-object-composition:example
What is concrete injected object composition?
Give your own example and explain it in your own words.
```

```{exercise}
Implement the example you envisioned in {numref}`ex:concrete-injected-object-composition:example` in code.
```

```{exercise}
What is the difference between concrete *constructed* and *injected* object composition?
Give your own examples and explain it in your own words.
```

%````{exercise}
%:label: stop-and-go
%In this exercise we will practice indirect object composition of a concrete dependency.
%
%TODO: RENAME Mover TO Pattern!!!!!!!!!!!!!!!!!!!!!
%
%Write a program that contains the two classes `Player` and `Mover` and adheres to the specification below.
%
%`Player` is responsible for keeping track of a player's name and position.
%We can ask the player for its current status upon which it will report its name and current position.
%Finally, we can also ask a player to move forward `x` number of times and the player does this by delegating to its instance of `Mover` that we've dependency injected via the constructor.
%
%`Mover` is responsible for reporting what the next move is, based on a movement sequence.
%The variable `speed` determines how many whole steps the player moves each time.
%The variable `limit` determines how many times (not steps) the player can move before needing to rest.
%The variable `restTime` determines how long (in terms of times that the pattern is asked for its `NextMove`) we have to wait before the pattern will yield another move.
%
%Consider the following two classes drawn in the style of UML class diagrams.
%
%```
%Player
%===========================
%+ <<Create>> Player (string name, int position, Mover mover ) : Player
%+ Move (int moves) : void
%+ Status () : string
%---------------------------
%
%
%Mover
%==========================
%+ <<Create>> Mover (int speed, int limit, int restTime) : Mover
%+ NextMove() : int
%---------------------------
%```
%
%Consider the following usage example and its corresponding output:
%
%```csharp
%Player p1 = new Player("P1", 0, new Mover(1, 3, 2));
%Player p2 = new Player("P2", 0, new Mover(3, 1, 3));
%
%p1.Move(10);
%p2.Move(10);
%
%Console.WriteLine(p1.Status());
%Console.WriteLine(p2.Status());
%```
%
%```output
%P1: 6
%P2: 9
%```
%````

%
% TODO: Remove all these old exercises?
%
%````{solution} stop-and-go
%:hidden:
%
%```csharp
%class Player
%{
%  string name;
%  int position;
%  Mover mover;
%
%  public Player (string name, int position, Mover mover)
%  {
%    this.name = name;
%    this.position = position;
%    this.mover = mover;
%  }
%
%  public void Move (int moves)
%  {
%    for (int i=0; i<moves; i++)
%      position += mover.NextMove();
%  }
%
%  public string Status ()
%  {
%    return $"{name}: {position}";
%  }
%}
%
%class Mover
%{
%  int speed;
%  int limit;
%  int restTime;
%  int counter = 0;
%
%  public Mover (int speed, int limit, int restTime)
%  {
%    this.speed = speed;
%    this.limit = limit;
%    this.restTime = restTime;
%  }
%
%  public int NextMove ()
%  {
%    counter++;
%    if (counter >= limit + restTime)
%    {
%      counter = 0;
%      return 0;
%    }
%    else if (counter > limit)
%    {
%      return 0;
%    }
%    else
%    {
%      return speed;
%    }
%  }
%}
%```
%````
%
%````{exercise}
%:label: inject-encoder-array
%
%Start with the classes `RobbersStringCipher` and `RobbersCharCipher` that we've built in this chapter.
%
%Write a new class called `MultiEncoder`.
%The only argument in its constructor must be an array of `RobbersStringCipher`'s.
%`MultiEncoder` must have an instance method with the signature `string Encode (string input)` that applies all its string encoders on the input.
%
%The completed program should behave according to the usage example below.
%
%```csharp
%var encoders = new RobbersStringCipher[] {
%  new RobbersStringCipher(new RobbersCharCipher('o')),
%  new RobbersStringCipher(new RobbersCharCipher('a'))
%};
%var encoder = new MultiEncoder(encoders);
%
%Console.WriteLine(encoder.Encode("Hello"));
%```
%
%```output
%HaHoHaHelalolallalolalo
%```
%````
%
%
%````{solution} inject-encoder-array
%:hidden:
%
%```csharp
%var encoders = new RobbersStringCipher[] {
%  new RobbersStringCipher(new RobbersCharCipher('o')),
%  new RobbersStringCipher(new RobbersCharCipher('a'))
%};
%var encoder = new MultiEncoder(encoders);
%
%Console.WriteLine(encoder.Encode("Hello"));
%
%
%class MultiEncoder
%{
%  RobbersStringCipher[] encoders;
%
%  public MultiEncoder (RobbersStringCipher[] encoders)
%  {
%    this.encoders = encoders;
%  }
%
%  public string Encode (string input)
%  {
%    foreach (var encoder in encoders)
%      input = encoder.Encode(input);
%    return input;
%  }
%}
%
%class RobbersStringCipher
%{
%  RobbersCharCipher charEncoder;
%  public RobbersStringCipher (RobbersCharCipher charEncoder)
%  {
%    this.charEncoder = charEncoder;
%  }
%
%  public string Encode (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += charEncoder.Encode(c);
%    return output;
%  }
%}
%
%class RobbersCharCipher
%{
%  char vowel;
%
%  public RobbersCharCipher (char vowel)
%  {
%    this.vowel = vowel;
%  }
%
%  public string Encode (char input)
%  {
%    string consonants = "bcdfghjklmnpqrstvwxz";
%    if (consonants.IndexOf(Char.ToLower(input)) != -1)
%      return $"{input}{vowel}{input}";
%    else
%      return input.ToString();
%  }
%}
%```
%````

%# TODO:
%
%Show how setter injection would lead to a scenario where all the setters would have to be duplicated all the way up or how we have to expose properties. Sure, we're not duplicating the underlying arguments of each constructor but we're still duplicating all the objects.
%
%```csharp
%class A
%{
%  B b;
%
%  public void SetB (B b)
%  {
%    this.b = b;
%  }
%
%  public void SetC (C c)
%  {
%    b.SetC = c;
%  }
%}
%
%class B
%{
%  C c;
%
%  public void SetC (C c)
%  {
%    this.c = c;
%  }
%}
%
%class C { }
%
%static class Program
%{
%  public static void Main ()
%  {
%    A a = new A();
%    a.setB = new B();
%    a.setC = new C();
%  }
%}
%```
%
%The above code breaks the design principle DRY, don't repeat yourself.
%The below code breaks the design principle [Law of Demeter](design-principles).
%
%```csharp
%class A
%{
%  public B b;
%}
%
%class B
%{
%  public C c;
%}
%
%class C { }
%
%static class Program
%{
%  public static void Main ()
%  {
%    A a = new A();
%    a.b = new B();
%    a.b.c = new C();
%  }
%}
%```

```{exercise}
Why is concrete constructed object composition problematic?

*Hint: Constructor arguments.*
```


%Since this is the only constructor of `RobbersStringCipher` we conclude that it is impossible to construct a `RobbersStringCipher` without also passing it a `RobbersCharCipher`[^null].
%
%[^null]: With the exception of `null` of course, but hopefully you've configured your projects to treat null reference warnings as errors as we advised in the chapter on [Nothingness](nothingness).
%
%The output, of course, remains the same since we've only [refactored](refactoring) our code.
%Meaning that we've rewritten our program without changing its observable behavior.*
%


%````{exercise}
%In this exercise we will practice concrete dependency injection.
%
%Implement the two classes `Animal` and `Speech` such that they correspond to the UML class diagrams below and behave according to the usage example.
%
%Consider the following two classes drawn in the style of UML class diagrams.
%While not visible in the diagram, there should be an has-a arrow from `Animal` to `Speech` such that `Animal` has `Speech`.
%
%```
%        Animal
%===================================
%+ <<Create>> Animal (Speech speech)
%+ Speak () : string
%-----------------------------------
%
%
%        Speech
%===================================
%+ <<Create>> Speech (string sound)
%+ Speak () : string
%-----------------------------------
%```
%
%Make sure that your program behaves according to the following usage example and corresponding output:
%
%```csharp
%Speech meow = new Speech("meow");
%Speech woof = new Speech("woof");
%Speech blub = new Speech("blub");
%
%Animal cat = new Animal(meow);
%Animal dog = new Animal(woof);
%Animal fish = new Animal(blub);
%
%Console.WriteLine(cat.Speak());
%Console.WriteLine(dog.Speak());
%Console.WriteLine(fish.Speak());
%```
%
%```output
%Animal says: "meow"
%Animal says: "woof"
%Animal says: "blub"
%```
%````
