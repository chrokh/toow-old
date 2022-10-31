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

# Constructors

```{warning}
Work in progress.
```

%- Constructor overloading.
%- Use it to set defaults.
%- this keyword.
%- Empty constructors. Implicit, explicit.
%- Field initialization happens BEFORE.


## Motivation

Constructors solve two main problems.

1. They allow us to initialize the [fields](fields) and [properties](properties) of an object upon creation.
2. They allow us to validate whether the state of an object, upon creation, is valid or not.

The second point is very important since it allows us to assume that any instance of a type actually is a valid instance of that type.


## Examples

### Robber's cipher vowel

In the chapter on [fields](fields) we gave an example where we assigned the consonant `B` to a field that was supposed to contain a vowel.
Let's add a constructor to that class so that we can ensure that every time we have an instance of the class `RobbersCipherVowel` we know that it contains an actual vowel.

```{code-cell} csharp
class RobbersCipherVowel
{
  public char Vowel;
  public RobbersCipherVowel (char vowel)
  {
    Vowel = vowel switch {
      'A' or 'a' or 'E' or 'e' or 'I' or 'i' or 'O' or 'o' or 'U' or 'u'
        => vowel,
      _ => 'o'
    };
  }
}
```

Pretty neat right?
What happens if we now try to create an instance of `RobbersCipherVowel` by passing a consonant (or any other non-vowel character for that matter) to the constructor?
Well, the constructor will simply ignore the character that we sent it and instead just use the character `'o'` that we chose as the default.

```{code-cell} csharp
RobbersCipherVowel certainlyVowel = new RobbersCipherVowel('K');
Console.WriteLine(certainlyVowel.Vowel);
```

Arguably, it would make sense to use an [enum](enums) for input instead.
We're not going to write that code since it's given to you as {numref}`ex:constructors:vowel-enums`.
However, we're going to talk a lot more about the idea of using types that prevent your data types from ever entering illegal states in the chapter on [types over tests](types-over-tests).

But wait a minute!
What if someone just changes the vowel *after* the object has been created?

```{danger}
Be weary of mutating fields and properties.
```

```{code-cell} csharp
certainlyVowel.Vowel = 'K';
Console.WriteLine(certainlyVowel.Vowel);
```

That's definitly not a vowel!
This is a problem caused by allowing mutation and not actually embracing encapsulation.
We're actually not encapsulating the vowel.
We're not actually hiding it from the outside world.
When we say that it is `public` we've exposed it.
And since it's a field, that means that anyone can change it.

To encapsulate the vowel we need to learn about [instance methods](instance-methods) or [properties](properties).




## Exercises

```{exercise}
:label: ex:constructors:vowel-enums

Use constructor overloading to add another constructor to the class `CaesarCipherVowel` from this chapter.
The new constructor should take an [enum](enums) that only can be set to vowels.
Make sure that the updated class still can be used in the encode methods of the static class `RobbersCipher` from the chapter on [fields](fields).
```

```{exercise}
What do we mean when we say that public fields "break" encapsulation?
```

