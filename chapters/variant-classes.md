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

# Variant classes

```{warning}
Work in progress.
```

%## Covariant return types
%
%C# supports covariant subtypes, but not contravariant parameter types, in classes but not in interfaces.
%
%In the example below we're declaring an abstract class called `CharToCharCipherFactory` with an abstract method with the signature `abstract ICharToCharCipher Make`.
%Subclasses of the class must override the method and without covariance, meaning with invariance, they would have to declare that the method also returns something of type `ICharToCharCipher`.
%
%Since C# however does support covariant return types, we can opt to let the overriding method return any subtype of `ICharToCharCipher`.
%In the example below, we're declaring that the subclass `CaesarCipherFactory` returns values of type `CaesarCipher` rather than `ICharToCharCipher`.
%
%```{code-cell} csharp
%:tags: [hide-input]
%interface ICharToCharCipher
%{
%  char Encode (char input);
%}
%
%class CaesarCipher : ICharToCharCipher
%{
%  int steps;
%
%  public CaesarCipher (int steps)
%    => this.steps = steps;
%
%  public char Encode (char input)
%  {
%    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
%    int i = alphabet.IndexOf(Char.ToUpper(input));
%    int newIndex = (i + steps) % alphabet.Length;
%    if (i != -1)
%    {
%      if (newIndex < 0)
%        newIndex += alphabet.Length;
%
%      if (Char.IsLower(input))
%        return Char.ToLower(alphabet[newIndex]);
%      else
%        return alphabet[newIndex];
%    }
%    return input;
%  }
%}
%```
%
%```{code-cell} csharp
%abstract class CharToCharCipherFactory
%{
%  public abstract ICharToCharCipher Make ();
%}
%
%class CaesarCipherFactory : CharToCharCipherFactory
%{
%  public override CaesarCipher Make ()
%    => new CaesarCipher(1);
%}
%```
%
%
%## Contravariant method parameter types
%
%## Covariant method parameter types


