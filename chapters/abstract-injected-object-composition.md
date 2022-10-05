# Abstract injected object composition

```{warning}
Work in progress.
```

% EXAMPLE: SOLVE THE ISSUE DISCUSSED IN INHERITANCE CHAPTER WHERE WE COULDN'T IMPLEMENT THE FOREACH FOR BOTH CHAR-TO-STRING CIPHERS and CHAR-TO-CHAR CIPHERS. USE COMPOSITION!

%It is time.
%We are now ready to talk about abstraction depdendency injection.
%Where we use subtype polymoprhism to its fullest capacity.
%
%## Motivation
%
%Think way back to where we ended in the chapter on [concrete constructed object composition](concrete-constructed-object-composition).
%Instead of letting `RobbersStringCipher` instantiate a `RobbersCharCipher` we *injected* it.
%This meant that we got rid of the need to expose whatever constructor parameters the inner `char` cipher needed in the outer `string` cipher.
%
%In the end we were still left with one problem however.
%We were able to inject instances of `RobbersCharCipher` when creating instances of `RobbersStringCipher`.
%However, when we had created a `CaesarCharCipher` we couldn't inject that to `RobbersStringCipher` when we wanted to create a Caesar cipher.
%
%%We started with:
%%
%%```csharp
%%class RobbersStringCipher
%%{
%%  public string Encode (string input)
%%  {
%%    RobbersCharCipher charCipher = new RobbersCharCipher();
%%    // ...
%%  }
%%}
%%```
%%
%%But rewrote it to:
%%
%%```csharp
%%class RobbersStringCipher
%%{
%%  RobbersCharCipher charCipher;
%%
%%  public RobbersStringCipher (RobbersCharCipher charCipher)
%%    => this.charCipher = charCipher;
%%
%%  public string Encode (string input)
%%  {
%%    // ...
%%  }
%%}
%%```
%
%%Remember how we said that there's a design principle stating that we should favor composition over inheritance?
%%Here's the thing.
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
%```csharp
%class CharWiseCipher
%{
%  ICharCipher charCipher;
%
%  public CharWiseCipher (ICharCipher charCipher)
%    => this.charCipher = charCipher;
%
%  public string Encode (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += charCipher.Encode(c);
%    return output;
%  }
%}
%```
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
%
%```{exercise}
%What is the difference between abstract *dependency* construction and abstract dependency *injection*?
%```
%
%```{exercise}
%What is the difference between *concrete* dependency injection and *abstract* dependency injection?
%```
%
%Let's explore our newfound power.
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
%```{exercise}
%Write a class called `DoubleCipher` that implements the interface `ICipher`.
%Its constructor must take an `ICipher` as an argument.
%The `Encode` method runs the `Encode` method of the injected cipher twice on the input data before returning the result.
%```
%
%```{exercise}
%Invent and implement another class that implements `ICipher` or `ICharCipher` that requires abstract dependency injection to work.
%```
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
%
%```{exercise}
%Write a class called `EvenOddCipher` that implements the interface `ICipher`.
%Its constructor must take two arguments of type `ICipher`.
%These arguments should be called `even` and `odd`.
%The `Encode` method runs the `Encode` method of `even` on every even character of the input `string` and `odd` on every odd character of the input `string`.
%```
%
%```{exercise}
%Draw the [quadrant diagram of abstraction levels in object composition](composition-quadrants) and explain all four abstraction levels.
%Remember to give examples of each.
%```
%
%````{exercise}
%:label: ex:array-cipher
%Write a class called `ArrayCipher` that implements the interface `ICipher`.
%Its constructor must take a single argument of type `ICipher[]`, called `ciphers`.
%The `Encode` method runs the `Encode` method of each `ICipher` in `ciphers` on the input, from left to right.
%
%Hint: When implementing `Encode`, you can choose whether to run the ciphers directly or whether to first build a `CompositeCipher` and then calling the `Encode` method on that.
%
%Usage example:
%
%```csharp
%Console.WriteLine(
%  new ArrayCipher(new ICipher[] {
%    new CharWiseCipher(new RobbersCharCipher('o')),
%    new CharWiseCipher(new RobbersCharCipher('a')),
%    new CharWiseCipher(new RobbersCharCipher('e')),
%    }).Encode("D")
%);
%```
%
%```output
%DeDaDeDoDeDaDeD
%```
%````
%
%````{exercise}
%:label: ex:conditional-char-cipher
%Write a class called `ConditionalCharCipher` that implements the interface `ICharCipher`.
%Note that we're talking about `ICharCipher`, not about `ICipher`.
%Its constructor must take two arguments.
%One is of type `ICharCipher` and the other is of type `ICharPredicate`.
%The interface `ICharPredicate` must look like this:
%
%```csharp
%interface ICharPredicate
%{
%  bool Check (char input);
%}
%```
%
%The `Encode` method runs the `Encode` method of the `ICharCipher` if and only if the method `Check` in `ICharPredicate` returns `true` when passed the `char` that's been passed to `Encode`.
%To test whether this class works you must also implement a concrete implementation for `ICharPredicate`.
%````
%
%```{exercise}
%Why are we *injecting* rather than *constructing* the `ICharPredicate` in {numref}`ex:conditional-char-cipher`?
%Explain in your own words.
%```
%
%
%## Definition
%
%```{hint}
%In abstract dependency injection we *inject* (as opposed to *construct*) a composed *abstract* (as opposed to *concrete*) dependency.
%```
%
%## Examples
%
%## Exercises
%
%
%% ==== TODOs: =====
%
%%```{exercise}
%%Write a class called `CharWiseCompositeCipher` that implements the interface `ICharCipher`.
%%Note that we mean `ICharCipher` and not `ICipher`.
%%Its constructor must take two objects of type `ICharCipher` as arguments.
%%The `Encode` method runs the `Encode` method of both the injected ciphers on the input `char` before returning the result.
%%TODO: THIS DOES NOT WORK BECAUSE Encode :: ICharCipher ~> char -> string
%%```
%
%
%
%%
%%````{exercise}
%%Write a program with three classes called `Speech`, `MultiSpeech`   has one class called `Animal` and one class called `Speech`.
%%
%%```
%%        Animal
%%==========================
%%+ Animal (Speech speech);
%%+ string Speak ();
%%--------------------------
%%
%%
%%        Speech
%%==========================
%%+ Speech (string sound);
%%+ string Speak ();
%%--------------------------
%%```
%%
%%Using your classes, it should be possible to write the following program:
%%
%%```csharp
%%Speech meow = new Speech("meow");
%%Speech blub = new Speech("blub");
%%Speech meowblub = new MultiSpeech(meow, blub);
%%
%%Animal cat = new Animal(meow);
%%Animal fish = new Animal(blub);
%%Animal catfish = new Animal(meowblub);
%%
%%Console.WriteLine( cat.Speak() );
%%Console.WriteLine( fish.Speak() );
%%Console.WriteLine( catfish.Speak() );
%%```
%%
%%And if you run that program, you should get the following output:
%%
%%```output
%%meow
%%blub
%%meow blub
%%```
%%````
%% Hint: This is just good old [recursion](recursion) but using classes.


%```{exercise}
%Define a class called `CipherRepeater`.
%Let it take a cipher in the constructor.
%
%Let it implement each of the interfaces 
%Start with the code you wrote in {numref}`ex:subtype-polymorphism:encodeNTimes`
%```

%Pretty wild stuff right?
