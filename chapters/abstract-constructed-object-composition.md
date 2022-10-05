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

```{warning}
Work in progress.
```

```{admonition} Prerequisites
:class: info
In this chapter we’re exploring the object composition abstraction level that we refer to as "abstract constructed object composition". Please have a look at the chapter [object composition](object-composition:abstraction-levels) if you have not already.
```

## Motivation

%In truth, there isn't much to say about abstract constructed object composition.
%I would be so bold as to suggest that it is quite uncommon that we find ourselves in a position where abstract constructed object composition is a useful solution.

%Let's think about it.
If an object composition is constructed then that means that the composing object is the one who instantiates the composed.
If the object composition is abstract then that means that the compile-time type of the constructed object is abstract.

We mean "abstract" in the sense of "abstraction", which means an [interface](interfaces) or an [abstract class](abstract-classes).

So, abstract constructed object composition only makes sense if we want to use the power of subtype polymorphism within a class but don't want to let others outside choose what object or objects from that subtyping hierarchy we use.


## Examples

Let's be honest.
I have a really hard time coming up with examples of this that don't also somehow include abstract injected object composition in one form or another.
%I would be so bold as to suggest that it is quite uncommon that we find ourselves in a position where abstract constructed object composition is a very useful solution.

### Cipher identification

Nevertheless, how about a cipher that determines what cipher to use based on what cipher it thinks has been used to encode some other string.

Let's assume that we have the following code that we've written in previous chapters.

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

```{seealso}
Determining what kind of object to create based on some information is a common problem and is usually solved by means of [factory method pattern](factory-method-pattern).
We will talk about that pattern in its own chapter.
In short though, and in line with the [single responsibility principle](single-responsibility-principle), the basic idea is that an object that determines what other object to *create*, should not *also* be responsible for *using* that object after it has been created.

In other words, the `AutoCipher` should not *both* determine what object to create *and* expose an `Encode`-method that will delegate to the created object.
Instead, it should just return the object.
```

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


---

```{exercise}
What is the difference between *concrete* dependency construction and *abstract* dependency construction?
```

