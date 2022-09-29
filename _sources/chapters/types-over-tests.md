# Types over tests

```{warning}
Work in progress.
```

%> Make illegal states unrepresentable (https://maximilianocontieri.com/software-engineering-great-quotes)
%
%> Make impossible states impossible.

%```{epigraph}
%Testing is good. Impossible is better.
%
%-- Richard Feldman [source](https://youtu.be/IcgmSRJHu_8?t=484)
%```

%- The vowel that you stick between consonants in Robber's language is a great example. Wrap it in a class and define an automatic type conversion between that type and char.
%```csharp
%class Vowel
%{
%  char vowel;
%
%  public Vowel (char vowel)
%  {
%    string legal = "aeiou";
%    if (legal.IndexOf(vowel) == -1)
%      throw new ArgumentException();
%    this.vowel = vowel;
%  }
%
%  public char ToChar () => vowel;
%
%  public static implicit operator char(Vowel v) => v.ToChar();
%}
%```

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
