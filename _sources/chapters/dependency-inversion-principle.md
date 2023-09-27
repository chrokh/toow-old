# Dependency inversion principle

```{warning}
Work in progress.
```

%```{epigraph}
%1. High-level modules should not import anything from low-level modules. Both should depend on abstractions (e.g., interfaces).
%2. Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.
%
%-- {cite:p}`martin2019`
%```



% DEPENDENCY INCEJTION EXAMPLE. INCEJTION WITHOUT COMPOSITION:
% interface IEncodeable
%{
%  void Encode (ICipher cipher);
%}
% class Person : IEncodeable
% class PhoneNumber : IEncodeable



%----------

%## Dependency injection
%
%There are two types of dependency injection:
%
%1. Constructor injection.
%2. Setter injection (sometimes known as: parameter injection).
%
%In constructor injection we inject the object (meaning the dependency) through the constructor.
%In setter injection we inject the object through a [setter](properties) or an instance method behaving as a setter.
%
%Let's first look at an abstract example where the type `Dependency` is being injected into the type `Owner`.
%We could also describe this as `Owner` has-a `Dependency`.
%
%Constructor injection would look like this:
%
%```csharp
%class Dependency { /* ... */ }
%
%class Owner
%{
%  Dependency dependency;
%
%  public Owner (Dependency dependency)
%  {
%    this.dependency = dependency;
%  }
%}
%```
%
%Setter injection would look like this:
%
%```csharp
%class Dependency { /* ... */ }
%
%class Owner
%{
%  public Dependency dependency { private get; set; }
%}
%```
%
%In the above example we're using [properties](properties).
%Without properties, setter injection would look like this:
%
%```csharp
%class Dependency { /* ... */ }
%
%class Owner
%{
%  Dependency dependency;
%
%  public void SetDependency (Dependency dependency)
%  {
%    this.dependency = dependency;
%  }
%}
%```
%
%```{seealso}
%In this book we will mostly discuss constructor injection since this is what helps alleviate the problem of having to duplicate constructor parameters.
%If you're interested in parameter injection I would urge you to read [this blog post](http://misko.hevery.com/2009/02/19/constructor-injection-vs-setter-injection/) by Miško Hevery.
%% TODO: Turn link into reference!
%```






%----------


% THE FOLLOWING WILL BE A GREAT INTRODUCTION TO ITERATOR PATTERN.
% PUT HERE OR IN ITERATOR PATTERN?
%Let's use our ciphers as an example and let's build something new.
%How about a cipher that encodes its input using the Caesar cipher but for every character it encodes it increments the `steps` by one?
%Let's call it an incrementing Caesar cipher.
%
%Let's say we're encoding the string `AAA`.
%With a regular Caesar Cipher where `steps=1` we would get `BBB`.
%But with an incrementing CaesarCipher starting from `1` we would get `BCD`.
%Why?
%Because the first `A` is encoded with `step=1`, the second with `step=2`, and the third with `step=3`.
%
%Pretty cool right?
%Let's try to build this using concrete constructed object composition by composing the class `CaesarCipher` that we've already built in previous chapters.
%To save vertical space I'm going to use a more compact version of the Caesar cipher, but it behaves in the same way.
%
%```{code-cell} csharp
%:tags: [hide-input]
%class CaesarCharCipher
%{
%  int steps;
%
%  public CaesarCharCipher (int steps)
%    => this.steps = steps;
%
%  public char Encode (char input)
%  {
%    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
%    int i = alphabet.IndexOf(Char.ToUpper(input));
%    if (i == -1) return input;
%    int remainder = (i + steps) % alphabet.Length;
%    int newIndex = remainder >= 0 ? remainder : remainder + alphabet.Length;
%    char output = alphabet[newIndex];
%    return Char.IsLower(input) ? Char.ToLower(output) : output;
%  }
%}
%```
%
%```{code-cell} csharp
%class IncrementingCaesarCipher
%{
%  int startingSteps;
%
%  public IncrementingCaesarCipher (int startingSteps)
%    => this.startingSteps = startingSteps;
%
%  public string Encode (string input)
%  {
%    int steps = startingSteps;
%    string output = "";
%    foreach (char letter in input)
%    {
%      CaesarCharCipher cipher = new CaesarCharCipher(steps);
%      output += cipher.Encode(letter);
%      steps++;
%    }
%    return output;
%  }
%}
%```
%
%```{code-cell} csharp
%var cipher = new IncrementingCaesarCipher(1);
%Console.WriteLine(cipher.Encode("AAAAA"));
%```





%--------------





%DIP.
%
%- Do we need to talk about this again since DI was already handled in Part 2?
%

%Before we can talk about what these levels mean we must first understand the word "dependency".
%The word "dependency" refer to the object that's being "composed".
%In other words, it refers to the object that the other object has a reference to.
%In the UML diagram of {numref}`fig:object-composition-class-diagram` the dependency is `Rod`.
%`Disk` depends on `Rod`.
%From the perspective of compilers, `Disk` cannot be compiled without also compiling `Rod` since `Disk` must have information on what we can do to things of type `Rod`.

%## Definition
%- TODO: Good resource on differences: https://stackoverflow.com/questions/46709170/difference-between-dependency-injection-and-dependency-inversion
%- TODO: Should also discuss Inversion of control? Here or separate chapter?

## Exercises

```{exercise}
Explain the dependency inversion principle in your own words.
```

```{exercise}
It could be argued that the dependency inversion principle prescribes that we should stay in one quadrant of the [abstraction levels diagram of object composition](object-composition:abstraction-levels) that we discussed in the chapter on object composition.
Which quadrant, and why?
```

```{exercise}
What is the difference between the dependency inversion principle and dependency injection?
```

%```{exercise}
%What is the difference between the dependency inversion principle and inversion of control (IoC)?
%```

```{exercise}
How does the dependency inversion principle improve [maintainability](maintainability) in terms of the [five characteristics](maintainability:definition) that we discussed in the chapter on maintainability?
```


