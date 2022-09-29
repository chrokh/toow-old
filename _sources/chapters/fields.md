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

# Fields

```{warning}
Work in progress.
```

Fields are in some languages known as "instance variables".

%- Public / private / protected.
%- Static / instance.
%- Also works on struct.
%- Only use private / protected fields.

%- [Initialized to default value](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/variables)

%## Definition

%We're using the keyword `public` but it will be defined in the chapter on [basic access modifiers](basic-access-modifiers).



## Examples


### Robber's cipher

Let's start by creating a class for the [Robber's cipher](robbers-cipher) whose instances will hold the vowel that we want to use in a [Caesar cipher](caesar-cipher).
Eventually, we'll also incorporate instance methods that operate on this encapsulated vowel but let's take it one step at a time, eh.

Let's call the class `RobbersCipherVowel` and let's call the field `Vowel`.
We'll make the field `public` so that anyone who has access to an object of type `RobbersCipherVowel`.

```{code-cell} csharp
class RobbersCipherVowel
{
  public char Vowel = 'o';
}
```

We can now instantiate ciphers.

```{code-cell} csharp
RobbersCipherVowel v1 = new RobbersCipherVowel();
RobbersCipherVowel v2 = new RobbersCipherVowel();
```

And assign them different vowels.

```{code-cell} csharp
v1.Vowel = 'a';
v2.Vowel = 'B';
```

```{danger}
Wait a minute!
`B` is not a vowel.
We'll have a look at this problem in the chapter on [constructors](constructors).
```

Of course we could then rewrite the encode methods that we wrote in the chapter on [overloading](overloading:examples:robbers) so that they take a parameter of type `RobbersCipherVowel` instead of simply a `char`.

```{code-cell} csharp
static class RobbersCipher
{
  public static string Encode (char input, RobbersCipherVowel vowel)
    => input switch {
      'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
      => $"{input}{vowel.Vowel}{input}",
    _ => $"{input}"
  };

  publc static string Encode (string input, RobbersCipherVowel vowel)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter, vowel);
    return output;
  }
}
```

The static encode methods still work but now we have to pass them instances of `RobbersCipherVowel` in order to run them.

```{code-cell} csharp
Console.WriteLine( RobbersCipher.Encode( "Hello", v1) );
```

```{code-cell} csharp
Console.WriteLine( RobbersCipher.Encode( "Hello", v2) );
```

Seems to work.
However, this is **not** the object oriented way.

```{important}
In object oriented programming we mix methods and data. We don't simply store data in object and then pass these objects to methods so that they can extract the data.
```

In our example above we're not solving problems in an object oriented fashion.
We're simply using objects as containers of data.
To really utilize the ideas of object oriented programming we need to move forward and learn about [instance methods](instance-methods).


## Exercises

```{exercise}
What is the difference between an instance field and a static field?
```


```{exercise-start}
```
Write a class called `Player` that exposes two `public` instance fields called `X` and `Y` of type `int`.
The two fields should be initialized to the value `0`.
With the class in place you should be able to run the following code and get the same output.

```{code-cell} csharp
:tags: [remove-input]
class Player
{
  public int X = 0;
  public int Y = 0;
}
```

```{code-cell} csharp
Player p1 = new Player();
Player p2 = new Player();

p1.X += 2;
p1.Y = 3;

p2.X = -4;
p2.Y += 3;

Console.WriteLine($"({p1.X},{p1.Y})  ({p2.X},{p2.Y})");
```
```{exercise-end}
```


