# Refactoring

```{warning}
Work in progress.
```

## Definition

% TODO: Make sure that these quotes are from 1999 and not from a later edition!
```{epigraph}
Refactoring (noun): a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.

Refactoring (verb): to restructure software by applying a series of refactorings without changing its observable behavior.

-- {cite:t}`fowler1999`
```

## Examples

### Replace conditional with polymorphism

See chapter 1 of {cite:t}`fowler1999`.


## Exercises

```{exercise}
What is refactoring?
```

```{exercise}
Explain why refactoring is useful in terms of the terminology from the chapter on [maintainability](maintainability).
```

```{exercise}
Explain the refactoring commonly known as "replace conditional with polymorphism".
```

%- Definition from Fowler.


%## Replacing conditionals with polymorphism (MOVED FROM SUBTYPE POLYMORPHISM CHAPTER)
%
%How would we do this without dynamic dispatch?
%Without subtype polymorphism.
%We would either have to write a separate implementation of `encodeTwice` for each existing and new cipher, or we would have to resort to [type testing](type-testing).
%Ironically, all the implementations would in this case look the same if we still use classes to encapsulate all cipher implementations.
%
%If however we just put the encoding code in different methods like we did in the chapter on [static methods](static-methods) then we would have to use a [conditional](selection) whenever we want to be able to alter which encoding method is used at run-time.
%Have a look at the code below:
%
%```csharp
%string encodeUsingRobbersCipher (string msg)
%  => // implementation of Robber's langauge...
%
%string encodeUsingRobbersCipher (string msg)
%  => // implementation of reverse cipher...
%
%string Encode (Cipher cipher, string msg)
%{
%  switch (cipher)
%  {
%    case Cipher.Robbers:
%      return encodeUsingRobbersCipher(msg);
%    case Cipher.Reverse:
%      return encodeUsingReverseCipher(msg);
%    default:
%      return msg;
%  }
%}
%
%enum Cipher { Robbers, Reverse };
%```
%
%If we then wanted to have a method that encodes in two passes we would have to *duplicate* the selection logic.
%There is simply no other way without resorting to some form of polymorphism or higher-order functions (which in the case of C# would have to be implemented using subtype polymorphism or [delegates](delegates)).
%
%```csharp
%string encodeTwice (Cipher cipher, string msg)
%{
%  switch (cipher)
%  {
%    case Cipher.Robbers:
%      return encodeUsingRobbersCipher(encodeUsingRobbersCipher(msg));
%    case Cipher.Reverse:
%      return encodeUsingReverseCipher(encodeUsingReverseCipher(msg));
%    default:
%      return msg;
%  }
%}
%```
%
%Compare this to our very clean solution which uses subtype polymorphism.
%
%```csharp
%string Encode (ICipher cipher, string msg)
%  => cipher.Encode(msg);
%
%string encodeTwice (ICipher cipher, string msg)
%  => cipher.Encode(cipher.Encode(msg));
%```
%
%
%So, if we didn't have subtype polymorphism in object oriented languages then it is more likely than not that we would end up using [conditionals](selection).
%This idea of using subtype polymorphism instead of conditionals has become a design principle known as "replace conditional with polymorphism".
%
%```{admonition} Design principle
%:class: tip
%Replace conditional with polymorphism.
%```
%
%
%```{figure} https://images-na.ssl-images-amazon.com/images/I/51ttgxwzArL._SY445_SX342_QL70_ML2_.jpg
%---
%figclass: margin
%---
%"Refactoring: Improving the design of existing code" {cite:p}`fowler1999`.
%```
%
%```{figure} https://m.media-amazon.com/images/I/41odjJlPgHL._SX260_.jpg
%---
%figclass: margin
%---
%"Refactoring: Improving the design of existing code" {cite:p}`fowler2018`.
%```
%
%```{seealso}
%In this book we showcase a lot of cases where conditionals can be replaced by polymorphism.
%If you want to learn more about the mechanical steps of how to refactor a piece of code that is expressed in terms of conditionals so that it uses polymorphism, then I highly recommend the classic book "Refactoring" by Martin Fowler.
%First edition {cite:p}`fowler1999` is using Java which is similar to C# and second edition is using JavaScript {cite:p}`fowler2018`.
%Put this book on your shelf as a reference.
%It's a classic.
%```
