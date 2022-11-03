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

%## Motivation
%- NASA units example.

## Definition

%### Make impossible states impossible

```{epigraph}
Testing is good. Impossible is better.

-- Richard Feldman [[Source.](https://youtu.be/IcgmSRJHu_8?t=484)]
```

```{epigraph}
Make illegal states unrepresentable.

-- Yaron Minsky [[Source.](https://maximilianocontieri.com/software-engineering-great-quotes)]
```

```{epigraph}
Make impossible states impossible.

-- Richard Feldman [[Source.](https://youtu.be/IcgmSRJHu_8)]
```


(bijection-rule)=
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

% - Phone numbers over strings. Not just state, it's also about operations. Strings support concatenation, phone numbers do not.
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


