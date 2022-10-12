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

# Types over tests

```{warning}
Work in progress.
```

## Definition

%### Make impossible states impossible

```{epigraph}
Testing is good. Impossible is better.

-- Richard Feldman [[Source needed.](https://youtu.be/IcgmSRJHu_8?t=484)]
```

```{epigraph}
Make illegal states unrepresentable.

-- Yaron Minsky [[Source needed.](https://maximilianocontieri.com/software-engineering-great-quotes)]
```

```{epigraph}
Make impossible states impossible.

-- Richard Feldman [[Source needed.](https://youtu.be/IcgmSRJHu_8)]
```


%### Bijection rule

```{epigraph}
Each domain object must be represented by a single object in our computable model and vice versa.

-- Maximiliano Contieri calls this "The one and only software design principle".
```

```{figure} https://www.mathsisfun.com/sets/images/function-mapping.svg

A bijective function is a function where every element in the input domain corresponds to an element in the codomain. [Image will be replaced] [[Image source](https://maximilianocontieri.com/the-one-and-only-software-design-principle)].
```

```{figure} https://cdn.hashnode.com/res/hashnode/image/upload/v1598843113002/Vr87N_Nbn.png?auto=compress,format&format=webp

Every object in our model should map to a single concept in our domain. [Image will be replaced] [[Image source](https://maximilianocontieri.com/the-one-and-only-software-design-principle)].
```

```{figure} https://cdn.hashnode.com/res/hashnode/image/upload/v1598843176464/--Dy6h_VM.png?auto=compress,format&format=webp

Each domain concept should map to a single object in our model. [Image will be replaced] [[Image source](https://maximilianocontieri.com/the-one-and-only-software-design-principle)].
```


%## Examples

% - Phone numbers over strings.
% - Nullable reference types and warnings as errors.

%- The vowel that you stick between consonants in Robber's language is a great example. Wrap it in a class and define an automatic type conversion between that type and char.



## Exercises

```{exercise}
What is meant with the maxim "types over tests"?
```

```{exercise}
What is the "bijection rule"?
```

```{exercise}
What is meant with the maxim "make illegal states unrepresentable"?
```

```{exercise}
Why should we prefer compile-time type errors over run-time errors?
```

```{exercise}
Why is `string` not a suitable type to store phone numbers?
Use set theory in your explanation.
```

```{exercise}
Why is `double` not a suitable type to represent the area of a triangle in centimeters?
```



```{exercise-start}
```
```{code-cell} csharp
:tags: [remove-input]
class Vowel
{
  char letter;

  public Vowel (char vowel)
  {
    string legal = "AEIOU";
    if (legal.IndexOf(Char.ToUpper(vowel)) == -1)
      throw new ArgumentException("Must be a vowel (AEIOU).");
    letter = vowel;
  }

  public char ToChar () => letter;

  public static implicit operator char(Vowel v) => v.ToChar();
}
```
Write a class that models the domain concept of English vowels.
It should be possible to pass upper and lowercase vowels as characters when instantiating it, and it should be possible to extract these vowels again.
See the usage examples below.

```{code-cell} csharp
char c1 = new Vowel('A').ToChar();
Console.WriteLine(c1);
```

```{code-cell} csharp
char c2 = new Vowel('u').ToChar();
Console.WriteLine(c2);
```

If however you try to instantiate the class by passing a non-vowel character then the class should throw an `ArgumentException`.

```{code-cell} csharp
:tags: [raises-exception]
new Vowel('z').ToChar();
```
```{exercise-end}
```





```{exercise-start}
```
Write a bunch of classes that can be used to model time in seconds, minutes, and hours.
Make sure that your code behaves according to the usage example below.

Hint: Consider converting to the base unit (seconds) before performing other conversions to avoid duplication.
```{code-cell} csharp
:tags: [remove-input]
abstract class Time
{
  public double Number { get; set; }
  public abstract Seconds ToBaseUnit ();
  public Seconds ToSeconds () => ToBaseUnit();
  public Minutes ToMinutes () => new Minutes(ToBaseUnit().Number / 60);
  public Hours ToHours () => new Hours(ToBaseUnit().Number / 3600);
}

class Seconds : Time {
  public Seconds (double x) => Number = x;
  public override Seconds ToBaseUnit ()
    => this;
}
class Minutes : Time {
  public Minutes (double x) => Number = x;
  public override Seconds ToBaseUnit () => new Seconds (Number * 60);
}
class Hours : Time {
  public Hours (double x) => Number = x;
  public override Seconds ToBaseUnit() => new Seconds (Number * 3600);
}
```
```{code-cell} csharp
void printTime (Time t)
{
  Seconds s = t.ToSeconds();
  Minutes m = t.ToMinutes();
  Hours h = t.ToHours();
  Console.WriteLine($"{s.Number}s = {m.Number}mins = {h.Number}hrs.");
}

printTime(new Seconds(4500));
printTime(new Hours(0.75));
printTime(new Minutes(15));
```
```{exercise-end}
```



```{exercise}
Write a class that can be used to represent phone numbers for your country.
Illegal states should not be representable.
```



%
%- https://maximilianocontieri.com/the-one-and-only-software-design-principle
%  - "The one and only software design principle"
%  - "The bijection rule"
%-  Domain modeling (there's no objective right or wrong, there's just your domain)
%- Types over checks. (What's the term I discussed with rtfeldman on twitter?)
%- Relevant to objects and to functions.
%- Similar to how Comment chapter argues that you cannot describe all semantic details with names only.
%- Problem with null:
%  - https://maximilianocontieri.com/null-the-billion-dollar-mistake
%

%- https://maximilianocontieri.com/code-smell-120-sequential-ids


