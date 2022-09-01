# Concrete dependency injection

In this chapter we're going to explore level 3 object composition based on the, previously outlined, [object composition abstraction levels](abstraction-levels).
Why are we talking about level 3 before level 2 you ask.
Isn't level 3 more indirect than level 2?
Yes it is, but going from constructed concrete (level 1) to constructed abstract (level 2) doesn't win us all that much.
But to understand level 2 we must understand [subtyping](subtype-polymorphism) so we'll deal with that later.

When we move from *constructed* to *injected* object composition we gain run-time modifiability.
We gain the ability to change implementation at run-time instead of merely at compile-time.
This is usually called "dependency injection".
What does this mean?
Think back to the ciphers that we built in the chapter on [constructed concrete object composition](constructed-concrete-object-composition).
Remember how `RobbersStringCipher` had to expose all constructor parameters of `RobbersCharCipher`, the object that it constructed.

In other words, remember how, when we construct an object that we want to compose with we are suddenly responsible for exposing all the constructor parameters of that object ourselves?
Remember how this adds up if we have an object that constructs another object that constructs another object that constructs another object and so forth?
Injection gives us the ability to change, for example, change how many steps to take in a Caesar Cipher based on user input, without having to duplicate the constructor parameters of the composed object.

```{important}
Injection gives us the ability to expose the constructor parameters of the composed object without having to duplicate the parameters in the compsing object.
```

How do we achieve this?
Simple, by passing the object itself instead of the parameters of the object.
Instead of directly creating the object that we need, we simply state what the data type is of the thing that we need.
Whoever is calling us is now responsible for getting hold of such an object before calling us.

We simply say: in order for me to do my job I need something of type `XYZ`, so if you need me to do my job you must first pass me something of type `XYZ`.
Whether our caller is the one who creates the object in the end is none of our concern.

```{important}
In dependency injection, we expect an object that our callers are responsible for constructing instead of parameters that we use to construct the object ourselves.
```

%Remember the term [indirection](indirection)?
%Instead of doing the thing directly, we let some other thing do the thing and then use that thing.
%In this case, we are talking about "dependency injection".

Let's start with the versions of `RobbersStringCipher` and `RobbersCharCipher` from the chapter on [constructed concrete object composition](constructed-concrete-object-composition) where we've hard-coded the vowel to stick in between consonants.
They looked something like this:

```csharp
class RobbersStringCipher
{
  public string Encode (string input)
  {
    RobbersCharCipher charCipher = new RobbersCharCipher();

    string output = "";

    foreach (char c in input)
      output += charCipher.Encode(c);

    return output;
  }
}

class RobbersCharCipher
{
  public string Encode (char input)
  {
    string consonants = "bcdfghjklmnpqrstvwxz";

    if (consonants.IndexOf(Char.ToLower(input)) != -1)
     return $"{input}o{input}";
    else
      return input.ToString();
  }
}
```

## Dependency injection

There are two types of dependency injection:

1. Constructor injection.
2. Setter injection (sometimes known as: parameter injection).

In constructor injection we inject the object (meaning the dependency) through the constructor.
In setter injection we inject the object through a [setter](properties) or an instance method behaving as a setter.

Let's first look at an abstract example where the type `Dependency` is being injected into the type `Owner`.
We could also describe this as `Owner` has-a `Dependency`.

Constructor injection would look like this:

```csharp
class Dependency { /* ... */ }

class Owner
{
  Dependency dependency;

  public Owner (Dependency dependency)
  {
    this.dependency = dependency;
  }
}
```

Setter injection would look like this:

```csharp
class Dependency { /* ... */ }

class Owner
{
  public Dependency dependency { private get; set; }
}
```

In the above example we're using [properties](properties).
Without properties, setter injection would look like this:

```csharp
class Dependency { /* ... */ }

class Owner
{
  Dependency dependency;

  public void SetDependency (Dependency dependency)
  {
    this.dependency = dependency;
  }
}
```

```{seealso}
In this book we will mostly discuss constructor injection since this is what helps alleviate the problem of having to duplicate constructor parameters.
If you're interested in parameter injection I would urge you to read [this blog post](http://misko.hevery.com/2009/02/19/constructor-injection-vs-setter-injection/) by Miško Hevery.
```

% TODO: Turn link into reference!



## Injecting the dependency

But let's get back to our Robber's language example.
Let's rewrite the code to first use parameter injection.
Have a look at the rewritten version of `RobbersStringCipher` below.
Can you spot the difference?

```csharp
class RobbersStringCipher
{
  RobbersCharCipher charCipher;

  public RobbersStringCipher (RobbersCharCipher charCipher)
  {
    this.charCipher = charCipher;
  }

  public string Encode (string input)
  {
    string output = "";

    foreach (char c in input)
      output += charCipher.Encode(c);

    return output;
  }
}
```

Notice that the line that used to read `RobbersCharCipher charCipher = new RobbersCharCipher();` is now gone.
So where does the variable `charCipher` come from?
We still need it of course since we're still calling the method `Encode` on it later.
Well, if you have a look at the constructor's signature you can see that we're now accepting a `RobbersCharCipher` as an argument.
Constructor injection anyone?
Instead of saying which particular `RobbersCharCipher` object we will use, we simply state that to run this method you must also provide a `RobbersCharCipher` object.

```{important}
Instead of instantiating the dependency ourselves, we simply parameterize a method or a constructor so that callers can pass the dependency.
```

The class `RobbersCharCipher` itself does *not* have to change.
Even though we've moved from dependency construction to dependency injection we can leave the code the same.
The main program however will have to change since the way we use our building blocks have changed.
We would now use our classes like this:

```csharp
var stringCipher = new RobbersStringCipher(new RobbersCharCipher());

Console.WriteLine(cipher.Encode("Hello world"));
Console.WriteLine(cipher.Encode("Chris"));
```

%Why haven't yet talked about why this is useful in the first place, but before we do that let's cover one additional thing first.

Whoever is instantiating a `RobbersStringCipher` is responsible for passing a `RobbersCharCipher` object to the constructor.
Since this is the only constructor of `RobbersStringCipher` we conclude that it is impossible to construct a `RobbersStringCipher` without also passing it a `RobbersCharCipher`[^null].

[^null]: With the exception of `null` of course, but hopefully you've configured your projects to treat null reference warnings as errors as we advised in the chapter on [Nothingness](nothingness)

The output, of course, remains the same since we've only [refactored](refactoring) our code.
Meaning that we've rewritten our program without changing its observable behavior.

Let's now talk about why this is useful.
Let's pause for a moment and think about what we are doing.
Look at these lines:

```csharp
var cipher = new RobbersStringCipher(new RobbersCharCipher());
```

When we are constructor injecting, we're giving ourself the ability to create multiple different variations of `RobbersStringCipher` by simply passing in a different instance of `RobbersCharCipher`.
This is immensely more flexible than in the case of concrete dependency construction where we create the object directly.

In the case of dependency *construction* there is only ever one kind of `RobbersStringCipher`.
Whenever we instantiate it, that's the one that we get.
In the case of dependency *injection* the number of different variations of `RobbersStringCipher` that we can instantiate simply depends on how many different variations of `RobbersCharCipher` we can instantiate and then combine with our `RobbersStringCipher`.


````{exercise}
:label: ex:concrete-dependency-injection-caesar-cipher
Start from the code you built in {numref}`ex:concrete-dependency-construction-caesar-cipher`.

Refactor the code so that `CaesarCharCipher` is *injected* through the constructor of `CaesarStringCipher` instead of *constructed* within `CaesarStringCipher`.

Make sure the program behaves according to the usage example below:

```csharp
var cipher = new CaesarStringCipher(new CaesarCharCipher());
Console.WriteLine(cipher.Encode("AbYz"));
```

```output
BcZa
```
````


## Parameterizing the dependency

Let's drive this home with an example.
We're not, yet, seeing the benefit of injecting `RobbersCharCipher` into `RobbersStringCipher` over simply constructing it.
Why?
Since the constructor of `RobbersCharCipher` is parameterless and since the object is stateless then *all instances will always behave exactly the same*.

When we're injecting `RobbersCharCipher` into `RobbersStringCipher` we're composing the two.
We're making a combination.
But if all objects of both types behave the same then there's no benefit.
We might have just as well written all the code in the same place.

But what if all instances did not behave the same?
What if in the future there will be an instance that doesn't behave the same?
Let's bring back the parameterized constructor of `RobbersCharCipher` so that we can choose what vowel to stick in between consonants.
This should make the injection meaningful.

```csharp
class RobbersCharCipher
{
  char vowel;

  public RobbersCharCipher (char vowel)
  {
    this.vowel = vowel;
  }

  public string Encode (char input)
  {
    string consonants = "bcdfghjklmnpqrstvwxz";
    if (consonants.IndexOf(Char.ToLower(input)) != -1)
      return $"{input}{vowel}{input}";
    else
      return input.ToString();
  }
}
```

Our new version of `RobbersCharCipher` is parameterized over the vowel that we stick in the middle upon encoding.
Let's try it out.

```csharp
var encoder1 = new RobbersCharCipher('o');
var encoder2 = new RobbersCharCipher('a');

Console.WriteLine( encoder1.Encode('B') );
Console.WriteLine( encoder2.Encode('B') );
Console.WriteLine( encoder1.Encode('L') );
Console.WriteLine( encoder2.Encode('L') );
```

```output
LoL
LaL
BoB
BaB
```

As expected, it is no longer true that all instances of `RobbersCharCipher` behave the same.
Only instances parameterized with the same vowel now behave the same.
Suddenly, the fact that we've composed `RobbersStringCipher` and `RobbersCharCipher` indirectly rather than directly, meaning by means of dependency injection rather than dependency construction, becomes extremely useful.

Without having to rewrite *any code* in `RobbersStringCipher` are we able to create new string ciphers on the fly by composing different instances of `RobbersCharCipher` with `RobbersStringCipher`.

```csharp
var cipher1 = new RobbersStringCipher(new RobbersCharCipher('o'));
var cipher2 = new RobbersStringCipher(new RobbersCharCipher('e'));

Console.WriteLine(cipher1.encode("Hello"));
Console.WriteLine(cipher2.encode("Hello"));
```

```output
HoHelollolo
HoHelollolo
```

What's important to realize is that the behavior of `RobbersStringCipher` is not determined at *compile-time* but at *run-time*.
We can really drive this point home by letting the vowel be read as input from the user.
Check the following program out.

```csharp
// Read letter from user.
Console.WriteLine("Press any letter.");
char letter = Console.ReadKey().KeyChar;

// Make cipher based on letter.
var cipher = new RobbersStringCipher(new RobbersCharCipher(letter));

// Encode using cipher.
Console.WriteLine( cipher.encode("Hello") );
```

Without changing any of the underlying classes we're able to let the user choose what letter to stick in-between consonants.
Of course we could have written the same program using concrete dependency *construction*.
Heck, we could even have written the same program using method composition.
But the point is not that the problem cannot be solved using a more direct technique.
The point is that the more direct technique is less maintainable.
It suffers from what we later will learn to call [tighter coupling](coupling).

Maintainability is reduced, because as we saw in the chapter on [concrete dependency construction](concrete-dependency-construction):

1. Whenever the constructor of the composed object changes the composer has to change.
2. The constructor parameters of the composed object has to be duplicated in the composing object's constructor.

When using dependency injection we are freed from both of these burdens.

Some of you might object to this and say that all this is way too complicated.
Would it not be simpler to just ask the user, using `Console.ReadKey`, directly in the `RobbersCharCipher` class.
Simpler? Yes, in a sense.
If we are 100% certain that this is the program that we need to write and that there will never be any other versions of the program that we will have to write then yes, doing it directly like that would be simpler.
More *modular* or *modifiable*?
Unequivocally and most certainly no.

We'll explore this vocabulary more in the chapter on [maintainability](maintainability).
In short however, the point is this:

```{important}
When we're using dependency injection we give ourselves the ability to solve many different problems by simply composing our simple parts at run-time.
```

In this case, dependency injection allows us to keep the old functionality (pre-determined vowels) while still enabling new functionality (such as vowels based on user input).
What if we want to deploy our application on the web and receive letter information based on mouse clicks on a visualized virtual keyboard?
The possibilities are endless.

The additional code we need to write to support something like vowels based on user input is trivial.
More importantly, it's mostly an exercise in *adding* code, not in *rewriting* code.
Whenever we rewrite something, we run the risk of breaking something.
You'll learn more about this when we get to the [open-closed principle](open-closed-principle).

If you think this is cool, man are you in for a treat.
Just wait until we get to [abstract dependency injection](abstract-dependency-injection) for something that will really blow your mind.
Then we will be able to say that any type that satisfies a particular [interface](interface) is allowed to be injected into `RobbersStringCipher`.
That kind of object composition seems to me to be the whole idea behind object oriented programming.

%
%If you didn't think this is cool and you're frustratingly asking yourself why we didn't just add the `vowel` as a parameter to the constructor of `RobbersStringCipher` you would be forgiven.
%I'd agree with you that that would be a simpler solution in this particular case.
%The key questions are:
%
%1. Is `RobbersCharCipher` is useful as a standalone class?
%2. Does encapsulating part of the logic into `RobbersCharCipher` lead to more [maintainable](maintainability) code?
%
%If the answer to any of these two questions make sense, the encapsulating the vowel wrapping logic into its own class (namely `RobbersCharCipher`) makes sense.
%If the answer to both of these questions is no, then it makes more sense to simply parameterize `RobbersStringCipher` over vowels and handle that logic there.

%However, this counter-argument is only true until we get to [indirect object composition of **abstract** dependencies](abstract-object-composition).
%When we're able to also make use of subtype polymorphism and let our dependencies be abstract the key question will no longer be whether we can re-use `RobbersCharCipher` or not.
%The key question will be whether there are other classes that have the same interface as `RobbersCharCipher` but different behavior.
%Meaning, whether `RobbersStringCipher` could be injected with various different **types** of char encoders that all share the same interface.


```{exercise}
What is concrete dependency injection?
Give your own example and explain it in your own words.
```

```{exercise}
What is the difference between concrete dependency *construction and *injection**?
Give your own examples and explain it in your own words.
```


````{exercise}
In this exercise we will practice concrete dependency injection.

Implement the two classes `Animal` and `Speech` such that they correspond to the UML class diagrams below and behave according to the usage example.

Consider the following two classes drawn in the style of UML class diagrams.
While not visible in the diagram, there should be an has-a arrow from `Animal` to `Speech` such that `Animal` has `Speech`.

```
        Animal
===================================
+ <<Create>> Animal (Speech speech)
+ Speak () : string
-----------------------------------


        Speech
===================================
+ <<Create>> Speech (string sound)
+ Speak () : string
-----------------------------------
```

Make sure that your program behaves according to the following usage example and corresponding output:

```csharp
Speech meow = new Speech("meow");
Speech woof = new Speech("woof");
Speech blub = new Speech("blub");

Animal cat = new Animal(meow);
Animal dog = new Animal(woof);
Animal fish = new Animal(blub);

Console.WriteLine(cat.Speak());
Console.WriteLine(dog.Speak());
Console.WriteLine(fish.Speak());
```

```output
Animal says: "meow"
Animal says: "woof"
Animal says: "blub"
```
````

````{exercise}
:label: ex:concrete-dependency-injection-parameterized-caesar-cipher

Start from the code you built in {numref}`ex:concrete-dependency-construction-parameterized-caesar-cipher`.

Refactor the code so that `CaesarCharCipher` is *injected* through the constructor of `CaesarStringCipher` instead of *constructed* within `CaesarStringCipher`.

Make sure that the program behaves according to the usage example below:

```csharp
var threeStepsForward = new CaesarStringCipher(new CaesarCharCipher(3));
var twoStepsBackwards = new CaesarStringCipher(new CaesarCharCipher(-2));

Console.WriteLine(threeStepsForward.Encode("aB"));
Console.WriteLine(twoStepsBackwards.Encode("aB"));

Console.WriteLine(threeStepsForward.Encode("Yz"));
Console.WriteLine(twoStepsBackwards.Encode("Yz"));
```

```output
dE
yZ
Bc
Wx
```
````

```{exercise}
Compare your solutions to {numref}`ex:concrete-dependency-construction-parameterized-caesar-cipher` and {numref}`ex:concrete-dependency-injection-parameterized-caesar-cipher`.
Use your own words to explain what we have gained, in terms of maintainability, by moving from dependency *construction* to dependency *injection*.
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
