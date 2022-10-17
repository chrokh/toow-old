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

% TODO: Must mention that abstract classes still can have constructors!

# Abstract classes

```{warning}
Work in progress.
```

## Motivation

Sometimes we want to use [inheritance](inheritance) for purposes of code reuse but we don't want it to be possible to instantiate the superclass.
Sometimes it just doesn't make sense to have instances of the super class on its own.

It's as if we would like to use an [interface](interfaces) but find that if we do then we have to duplicate some code that we could otherwise reuse through inheritance.
Granted, at this point, all your smoke sensors should be sounding.
In a later chapter we will talk about the design principle [composition over inheritance](composition-over-inheritance).
You probably should solve this problem with composition rather than inheritance.

However, since we have not yet discussed composition over inheritance which often relies on [abstract injected object composition](abstract-injected-object-composition) which we also haven't talked about, let's instead talk about how we can solve this using abstract classes.


## Definition

An abstract class is similar to an [interface](interfaces) in the sense that:

* it cannot be instantiated, and
* it can declare signatures of members that its inheritors must implement.

An abstract is similar to a class in the sense that:

* it can contain members with implementations that it's inheritors will inherit (and not just signatures).

In an abstract class we can mark any combination of its (public) members as `abstract`.
It is legal to mark all of them as well as none of them as `abstract`.
If they are marked as `abstract` then that means that they cannot have any implementation.

% TODO: Any of its non-private, non-sealed members??

Any member marked as `abstract` must be [overridden](overriding) in all non-abstract classes that inherit from the abstract class.
We emphasize the word *non-abstract* since abstract classes of course may inherit from abstract classes.
Only when we reach a non-abstract class must we start implementing the abstract members.

In C# we can declare that a class is abstract by simply prepending the word `abstract` before the keyword `class` but after any [access modifiers](access-modifiers).
In C# we can declare that a method is abstract by prepending the word `abstract` before the return type but after any [access modifiers](access-modifiers).


## Examples

### Characterwise ciphers

%TODO: MOTIVATION: FOR LISKOV CHAPTER. DOES IT MAKE SENSE FOR OTHER CIPHERS TO INHERIT FROM NULLCIPHER? PROBABLY NOT RIGHT?

In the chapter on [inheritance](inheritance:examples:characterwise) we discussed back and forth about the usefulness of the implementation in the superclass `CharWiseCipher` which we later renamed to `CharToCharSubstitutionCipher`.
Now that we know about abstract classes it is possible for us to avoid having to even think about this by making that base class abstract.

How come we don't have to think about it?
Well, if we mark the base class as abstract then we can be sure that there will never be any instances of that class floating around.
Also, since we then can mark any of its members as abstract, we don't actually have to implement the method `char Encode (char input)`, meaning the method that takes and produces a `char`.
That method was our main concern in the example on [inheritance](inheritance:examples:characterwise).

So let's try to simply mark it as abstract.
This time we'll call the class `CharToCharSubstitutionCipher`.

```{code-cell} csharp
abstract class CharToCharSubstitutionCipher
{
  public abstract char Encode (char input);

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }
}
```

Notice how we've marked the class as `abstract` and the method `Encode` which no longer has an implementation.
We've now actually only implemented the part we wanted to have from the start.
Namely the method that iterates over the input `string`, delegates to the character-encoding method, concatenates, and returns the result.
It was the duplication of this method that we were concerned about in the first place.

Can we now instantiate the superclass?
No, it's now abstract.

```{code-cell} csharp
:tags: [raises-exception]
CharToCharSubstitutionCipher sub = new CharToCharSubstitutionCipher();
```

Does the fact that we've now made the superclass abstract affect the classes that inherit from the superclass in any way?
No.
Since they already have implementations for `char Encode (char input)` we're good to go.

```{code-cell} csharp
:tags: [hide-input]
class CaesarCipher : CharToCharSubstitutionCipher
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public override char Encode (char input)
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

```{code-cell} csharp
:tags: [hide-input]
class LeetCipher : CharToCharSubstitutionCipher
{
  public override char Encode (char input)
    => input switch {
      'L' => '1', '1' => 'L',
      'A' => '4', '4' => 'A',
      'O' => '0', '0' => 'O',
      'T' => '7', '7' => 'T',
      'E' => '3', '3' => 'E',
      _ => input
    };
}
```

## Exercises

```{exercise}
What is an abstract class? Why are they useful?
```

```{exercise}
What is an abstract method? Why are they useful?
```

```{exercise}
Why is it useful to be allowed to define an abstract class without any abstract members?
```

```{exercise}
1. Come up with your own example of where using an abstract class with abstract methods would make sense.
2. Motivate why using an abstract class makes sense in words.
3. Implement your example in code.
```

```{exercise}
Start from the code you wrote in {numref}`inheritance:exercises:chartostringsubstitutioncipher`.
Mark both the superclass and the method with the signature `string Encode (char input)` as `abstract`.
```
