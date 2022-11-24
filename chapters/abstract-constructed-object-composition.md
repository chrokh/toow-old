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

# Abstract constructed object composition

%**TODO: Skip sequence (first discussed in the chapter on Inheritance, but then also Abstract classes) can usefully be implemented by holding a reference to a Sequence that you progress twice. This way you can skip in any sequence. Carry this example over to injection chapter.**

```{admonition} Prerequisites
:class: info
In this chapter we’re exploring the object composition abstraction level that we refer to as "abstract constructed object composition". Please have a look at the chapter [object composition](object-composition:abstraction-levels) if you have not already.
```

## Motivation

%In truth, there isn't much to say about abstract constructed object composition.
%I would be so bold as to suggest that it is quite uncommon that we find ourselves in a position where abstract constructed object composition is a useful solution.

%Let's think about it.
If an object composition is *constructed* then that means that the composing object is the one who *instantiates* (think: calls the constructor of) the composed.
If the object composition is *abstract* then that means that the *compile-time type* of the constructed object is *abstract*.

We use the term "abstract" in the sense of an "abstraction", which means an [interface](interfaces) or an [abstract class](abstract-classes).

So, abstract constructed object composition only makes sense if we want to use the power of subtype polymorphism within a class but don't want to let others outside choose what object or objects from that subtyping hierarchy we use.


## Examples

%### Sequences
%
%Remember the example of number sequences from the chapters on [inheritance](inheritance), and [abstract classes](abstract-classes)?
%We ended up with an abstract superclass called `Sequence`:
%
%```{code-cell}
%:tags: [hide-input]
%abstract class Sequence
%{
%  public virtual int Current { get; protected set; }
%
%  public abstract void Next();
%
%  public virtual int[] Take (int n)
%  {
%    int[] nums = new int[n];
%    for (int i=0; i<nums.Length; i++)
%    {
%      nums[i] = Current;
%      Next();
%    }
%    return nums;
%  }
%}
%```
%
%We then wrote a subclass of `Sequence` called `StepSequence` which moves in steps as defined by some variable that we might call the step size.
%
%```{code-cell}
%:tags: [hide-input]
%class StepSequence : Sequence
%{
%  int step;
%
%  public StepSequence (int initial, int step)
%  {
%    base.Current = initial;
%    this.step = step;
%  }
%
%  public override void Next()
%    => base.Current += this.step;
%}
%```
%
%Since the step size can be either positive or negative the type models both incrementing and decrementing sequences.
%
%```{code-cell}
%StepSequence inc = new StepSequence(1, 1);
%int[] output = inc.Take(10);
%Console.WriteLine(String.Join(", ", output));
%```
%
%```{code-cell}
%StepSequence dec = new StepSequence(10, -1);
%int[] output = inc.Take(10);
%Console.WriteLine(String.Join(", ", output));
%```
%
%In the chapter on [abstract classes](abstract-classes) we then tried to reimplement a sequence that we had implemented before called `SkipSequence` that skipped every `n` elements.



(abstract-constructed:sequences)=
### Sequences

```{note}
Work in progress.
```

% TODO: Perhaps a RandomSequenceFactory is a good example? Can give forward reference to factory method pattern chapter and this isn't better solved using injection since we cannot inject and reuse the same sequence over and over again. Because they have state! This is great EXCEPT FOR THAT IT ISN'T ACTUALLY AN EXAMPLE OF COMPOSITION SINCE WE IMMEDIATELY RETURN THE OBJECTS! SOLUTION: I should simply rename all these four concepts so that we talk about ABSTRACT INJECTED ASSOCIATION instead of object composition. That is more flexible and UML association seems to mean exactly what we mean. All forms of type A has a relationship with type B. This is probably wrong. See mail discussion on the subject.

%``{code-cell}
%:tags: [hide-input]
%abstract class Sequence
%{
%  public virtual int Current { get; protected set; }
%
%  public abstract void Next();
%
%  public virtual int[] Take (int n)
%  {
%    int[] nums = new int[n];
%    for (int i=0; i<nums.Length; i++)
%    {
%      nums[i] = Current;
%      Next();
%    }
%    return nums;
%  }
%}
%``
%
%``{code-cell}
%:tags: [hide-input]
%class IncrementingSequence : Sequence
%{
%  public override void Next ()
%    => Current++;
%}
%
%class DecrementingSequence : Sequence
%{
%  public override void Next ()
%    => Current--;
%}
%``
%
%``{code-cell}
%class RandomSequenceFactory
%{
%  public Sequence Next ()
%}
%``


### Random cipher

Let's be honest.
I have a really hard time coming up with examples of this that don't also somehow include abstract injected object composition in one form or another.
%I would be so bold as to suggest that it is quite uncommon that we find ourselves in a position where abstract constructed object composition is a very useful solution.

Nevertheless, let's build a cipher that, upon instantiation, randomly chooses between two different ciphers.
Let's call it `RandomCipher`.

Writing this cipher without using [subtype polymorphism](subtype-polymorphism) would be awkward, since we would have to meaninglessly duplicate code.
However, since we can treat concrete ciphers as if they were of the same abstract type, we can write our implementation once, and it will work for both ciphers.

```{warning}
A better solution to this problem would of course be to use [abstract injected](abstract-injected:random-cipher) instead of abstract constructed object composition but let's take it one step at a time.
```

Let's first bring in some of our cipher interfaces, and our two concrete ciphers `CaesarCipher` and `LeetCipher`.

```{code-cell}
:tags: [hide-input]
interface ICharToCharCipher
{
  char Encode (char input);
}

interface IStringToStringCipher
{
  string Encode (string input);
}
```

```{code-cell} csharp
:tags: [hide-input]
class CaesarCipher : ICharToCharCipher, IStringToStringCipher
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

```{code-cell} csharp
:tags: [hide-input]
class LeetCipher : IStringToStringCipher, ICharToCharCipher
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

  public string Encode (string input)
  {
    string output = "";
    foreach (char c in input)
      output += Encode(c);
    return output;
  }
}
```

Now let's build a `RandomCipher` that randomly chooses between using a `CaesarCipher` with `steps` set to `1` and a `LeetCipher`.
Since we want to use the same cipher during the lifetime of a `RandomCipher` object, we will pick the cipher in the constructor.

```{code-cell}
class RandomCipher : IStringToStringCipher, ICharToCharCipher
{
  ICharToCharCipher cipher;

  public RandomCipher ()
  {
    Random rng = new Random();
    if (rng.NextDouble() > 0.5)
      cipher = new CaesarCipher(1);
    else
      cipher = new LeetCipher();
  }

  public char Encode (char input)
    => cipher.Encode(input);

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode(letter);
    return output;
  }
}
```

Let's now create a bunch of instances of type `RandomCipher` and call `Encode` on them to see if it seems like its behaving randomly.

```{code-cell}
// Set the number of iterations we want to run.
int iterations = 20;

// Prepare output array.
string[] outputs = new string[20];

// Instantiate ciphers, call encode, and store result in output array.
for (int i=0; i<iterations; i++)
  outputs[i] = new RandomCipher().Encode("LEET");

// Print all outputs, separated by commas.
Console.WriteLine(String.Join(", ", outputs));
```

Looks pretty random to me.

Let's break down the example.
Why is this an example of object composition?
Because `RandomCipher` has an instance field of type `ICharToCharCipher` so we would say `RandomCipher` has-a `ICharToCharCipher`.

Why do we say that it's an *abstract* object composition?
Because the *composed* type is an abstraction.
Concretely, we can see that the compile-time type of the instance field called `cipher` is `ICharToCharCipher`.
Interfaces and abstract classes are abstractions.

Why do we say that it's a *constructed* object composition?
Because the object of the *composing* type is the one who *constructs* (meaning instantiates) the object of the *composed* type.
Concretely, because we can see that we are actually instantiating both `CaesarCipher` and `LeetCipher` using the `new` operator in the constructor of `RandomCipher`.


```{seealso}
Determining what kind of object to create based on some information is a common problem and is usually solved by means of the [design pattern](design-patterns) called the [factory method pattern](factory-method-pattern).
We will talk about that pattern in its own chapter.
In short though, and in line with the [single responsibility principle](single-responsibility-principle), the basic idea is that an object that determines what other object to *create*, should not also be responsible for *using* that object after it has been created.

In other words, the `RandomCipher` (as well as the `AutoCipher` that we'll look at in the next example) should not *both* determine what object to create *and* expose an `Encode`-method that will delegate to the created object.
Instead, it should just return the object.
```


### Cipher identification

Let's write another cipher in the same vein as the cipher that randomly chose a cipher.
How about a cipher that determines what cipher to use based on what cipher it thinks has been used to encode some other string.

```{note}
It is less obvious how this example could be solved better using [abstract injected](abstract-injected-object-composition) object composition as oppsoed to abstract constructed.
So in a sense, this is an example that, when compared to the example of `RandomCipher`, better illustrates why we in the odd case might want to use abstract constructed object composition.
```

Let's first bring in our cipher interfaces and the three concrete classes `RobbersCipher`, `LeetCipher`, and `ReverseCipher`.
All that is code that we've worked with in previous chapters.

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

```{code-cell} csharp
:tags: [hide-input]
class RobbersCipher : ICharToStringCipher, IStringToStringCipher
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

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }
}
```

```{code-cell} csharp
:tags: [hide-input]
class LeetCipher : IStringToStringCipher, ICharToCharCipher
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

  public string Encode (string input)
  {
    string output = "";
    foreach (char c in input)
      output += Encode(c);
    return output;
  }
}
```

```{code-cell} csharp
:tags: [hide-input]
class ReverseCipher : IStringToStringCipher
{
  public string Encode (string input)
  {
    string output = "";
    for (int i=input.Length-1; i>=0; i--)
      output += input[i];
    return output;
  }
}
```

Let's then add a new cipher that takes a `string` in the constructor which we will call `seed`.
We will then analyze this seed to try to determine what cipher it has been encoded with.

In the code example below we will only de utterly trivial checks and in any real scenario we would of course have to do *much* more sophisticated analysis of the string.
However, hopefully you can still see the bigger picture.

```{code-cell} csharp
class AutoCipher : IStringToStringCipher
{
  IStringToStringCipher cipher;

  public AutoCipher (string seed)
  {
    if (looksLikeRobbers(seed))
      cipher = new RobbersCipher('o');
    else if (looksLikeLeet(seed))
      cipher = new LeetCipher();
    else
      cipher = new ReverseCipher();
  }

  public string Encode (string input)
    => cipher.Encode(input);


  private bool looksLikeRobbers (string input)
    => input.ToUpper().Contains("LOL");

  private bool looksLikeLeet (string input)
    => input.Contains("33");
}
```

Let's try it out and see if it works.

```{code-cell} csharp
AutoCipher auto1 = new AutoCipher("1337");
Console.WriteLine(auto1.Encode("LEET CIPHER"));
```

```{code-cell} csharp
AutoCipher auto2 = new AutoCipher("Bobalollol");
Console.WriteLine(auto2.Encode("BALL"));
```

Again, let me emphasize that of course you would have to do much more serious analysis in order to confidently guess what cipher a given string has been encoded with.
Nevertheless, the code above provides an example of abstract constructed object composition.

It is *abstract* because the compile-time type of the private instance field `cipher` is `IStringToStringCipher`, namely an abstraction.
It is *constructed* because the variable is instantiated from within the composing object, namely `AutoCipher`.
Specifically we are referring to the three lines in the constructor that instantiate different ciphers and assign them to the instance field `cipher`.

% TODO: EXAMPLE: Like the incremeneting caesar cipher but use two ciphers and tik-tok between them. Lets' call it a FlipFlopCipher. Then we can do both the abstract version of this and the abstract version of IncrementingCipher when we get to injected abstract.

% TODO: EXAMPLE: Use abstract private field. THen use constructor overloading and pass parameters that belong to one or the other type and then choose what type to instantiate based on that. This explains the concept but is not something you would ever want to do. But are there even any useful examples of ACOC. I would assume that it's always a bad idea.

% TODO: EXAMPLE: PositionWise cipher som använder en position för att avvgöra vilket cipher som ska användas. Overloading i konstruktorn. Skickar bokstäver eller siffror. Avgör om vi kör Leet eller Caesars.



## Exercises

```{exercise}
:label: abstract-constructed-object-composition:exercises:example
What is abstract constructed object composition?
Give your own example and explain it in your own words.
```

```{exercise}
Implement the example you envisioned in {numref}`abstract-constructed-object-composition:exercises:example` in code.
```

```{exercise}
What is the difference between *concrete* and *abstract* constructed object composition?
Give your own examples and explain it in your own words.
```

```{exercise}
What is the difference between *concrete* dependency construction and *abstract* dependency construction?
```

