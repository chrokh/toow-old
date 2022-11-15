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

# Concrete constructed object composition

%- Learn Mermaid in order to generate UML diagrams?
%  * https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode
%  * https://mermaid-js.github.io/mermaid/#/

```{warning}
Work in progress.
```

```{admonition} Prerequisites
:class: info
In this chapter we're exploring the simplest level of object composition.
Please have a look at the chapter [object composition](object-composition:abstraction-levels) if you have not already.
```

%- TODO: Return to the drunk student example from instance methods. Use composition this time so that we can gather some stats like the max and min steps.

## Motivation

In procedural programming, as we've already seen, we solve problems by [composing procedures](method-composition).
If a method calls another method then we've composed the two methods
You might recall that we said that this form of composition is significantly less powerful than what in function programming is known as function composition.
Concrete constructed object composition, which we're talking about right now, is essentially the equivalent to procedure composition.
The only difference is that we [encapsulate](encapsulate) our procedures in objects.

## Definition

In concrete constructed object composition, we make one object create another concrete object.
The composing object does *not* receive an instance through its constructor or through any of its properties or instance methods.
Instead, the composing object simply creates the composed object on its own.


## Examples

% TODO: Vigenere cipher. Can be implemented as a cycling list of Caesar ciphers where letters have been mapped to numbers. This is a much more interesting example. The generalization goes beyond Caesar ciphers. Simply inject a list of ciphers to use in sequence. This is a great use case for Factory Method pattern later. Make the FlipFlop cipher I discuss here an exercise instead? Note that FlipFlop is used in the following object composition chapters. But Vigenere ought to be a more sensible example. https://sv.wikipedia.org/wiki/Vigenère-chiffret

Let's use our ciphers as an example and let's build something new.
How about a cipher that flip flops between encoding and decoding between some variation of itself.
Sounds weird but I think the results will be pretty fun.

Let's take the Caesar cipher for example.
What does decoding mean in the context of a Caesar cipher?
Well, if we encoded with `+1` then we must decode with `-1`.
So decoding is the inverse.

We don't really have to build anything fancy change our add new methods to our `CaesarCipher` class.
That we will worry about later.
For now we simply have to make sure to send the appropriate input to the constructor of the class.

Let's call this new invention of ours a flip flop Caesar cipher.
Let's say we're encoding the string `AAAA`.
With a regular Caesar Cipher where `steps = 1` we would get `BBBB`.
But with a flip flop Caesar cipher starting from `1` we would get `BZBZ`.
Why?
Because the first `A` is encoded with `steps = 1`, the second with `steps = -1`, the third with `steps = 1`, and the fourth with `steps = -1`.

Pretty cool right?
Let's try to build this using concrete constructed object composition by composing the class `CaesarCipher` that we've already built in previous chapters.

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

```{code-cell} csharp
class FlipFlopCaesarCipher
{
  CaesarCipher flip;
  CaesarCipher flop;

  public FlipFlopCaesarCipher (int steps)
  {
    flip = new CaesarCipher(steps);
    flop = new CaesarCipher(-steps);
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

```{code-cell} csharp
var cipher = new FlipFlopCaesarCipher(1);
Console.WriteLine(cipher.Encode("AABBCC"));
```

:::{note}
Note that I'm often using overly verbose syntax in attempts to avoid unnecessary confusion.
The if-else statement in the code above for example, I would probably prefer to write like this:

```csharp
output += (i % 2 == 0 ? flip : flop).Encode(input[i]);
```
:::
```{code-cell} csharp
:tags: [remove-input]
char[] input = new char[] { 'a' };
int i = 0;
CaesarCipher flip = new CaesarCipher(1);
CaesarCipher flop = new CaesarCipher(-1);
string output = "";
```

```{code-cell} csharp
:tags: [remove-input]
output += (i % 2 == 0 ? flip : flop).Encode(input[i]);
```

This is an example of concrete constructed object composition.
Let's break that statement apart.

1. It is *object composition* because objects of type `FlipFlopCaesarCipher` all have an encapsulated instance variable (a private field) that is of type `CaesarCipher`. It is object composition because we have an object that contains another object as an instance variable.
2. The object composition is *concrete* since the compile-time type of the composed object is a concrete type. In this case the type is `CaesarCipher` which is a class.
3. The object composition is *constructed* because the composing object (`FlipFlopCaesarCipher`) is itself **instantiating** the object it composes (`CaesarCipher`). Specifically we are talking about the lines that read: `flip = new CaesarCipher(steps)` and `flop = new CaesarCipher(steps)`.

```{warning}
The fact that we're, in the constructor immediately passing an argument on to someone else is a tell-tale sign that we've not thought this abstraction through properly. More about that in the coming chapters.
```


## Exercises


```{exercise}
:label: ex:concrete-dependency-construction-example
What is concrete constructed object composition?
Give your own example and explain it in your own words.
```

```{exercise}
:label: ex:concrete-constructed-object-composition:leet
Build a `FlipFlopLeetCipher` that encodes or decodes every other character.
Use the `FlipFlopCaesarCipher` that we wrote in this chapter as inspiration.

Note: Here we don't mean that the cipher should encode some characters and decode some other character. We mean that the cipher should encode all, say odd characters, and let all even characters be whatever they are.
```

```{exercise}
:label: ex:concrete-constructed-object-composition:own-example
Come up with your own example of concrete constructed object composition.
```

```{exercise}
Implement the example you envisaged in {numref}`ex:concrete-constructed-object-composition:own-example` in code.
```

