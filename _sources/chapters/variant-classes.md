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



%- Return type covariance IS supported in C# since 9.0!!! And is allowed by LSP. Parameter type contravariance is however NOT supported. However it is marked as under consideration in the [spec for C# 9.0](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-9.0/covariant-returns).
%Question is not whether you can return covariant values or not, a valid subtype is a valid subtype. The question is whether you can override a method and define that its return type is covariant and making that a valid subtype.
%
%```csharp
%class A {}
%class B : A {}
%class C : B {}
%
%abstract class Box
%{
%  public abstract B Get ();
%  public abstract void Set (B x);
%}
%
%abstract class SpecialBox : Box
%{
%  public abstract override C Get ();
%  public abstract override void Set (A x);
%}
%```
%
%Only `Set` gives a compiler error.
%
%```output
%error CS0115: 'SpecialBox.Set(A)': no suitable method found to override
%```
%
% Return type covariance is however only supported in inheritance, not in interface implementation.
%
%```csharp
%interface IBox
%{
%  B Get();
%}
%class MyBox : IBox
%{
%  public C Get() => new C();
%}
%```
%```output
%error CS0738: 'MyBox' does not implement interface member 'IBox.Get()'. 'MyBox.Get()' cannot implement 'IBox.Get()' because it does not have the matching return type of 'B'.
%```

%### Variance in C#
%
% PERHAPS CHOOSE AN EXAMPLE THAT IS NOT FUNCTOR (AND DOESN'T RELY ON DELEGATES) AND THEN GIVE THE FUNCTOR EXAMPLE FOR THOSE WHO ARE INTERESTED.
%
%C# only supports covariant return types in inheritance and not in interface implementation.
%This is unfortunate.
%Since, while it is cool that we can do the following:
%
%```{code-cell} csharp
%Box<int> box1 = new Box<int>(100);
%Box<int> box2 = box1.Map(x => x * 2);
%Console.WriteLine(box2.X);
%
%abstract class Functor<T1>
%{
%  abstract public Functor<T2> Map<T2> (Func<T1,T2> f);
%}
%
%class Box<T1> : Functor<T1>
%{
%  public T1 X { get; private set; }
%  public Box (T1 x) => X = x;
%  public override Box<T2> Map<T2> (Func<T1,T2> f)
%    => new Box<T2>(f(X));
%}
%```
%
%It would be more useful if we could use an interface rather than an abstract class since it would allow us to retain the possibility to inherit from something else.
%Remember that one of the drawbacks of [inheritance](inheritance) is that you only get to inherit from a single other class. Which means that we cannot also implement another interface this way, such as, say Applicative functor.
% This would be useful if it was possible to do covariant return types for interfaces. But alas we cannot.
%
%```{code-cell} csharp
%Box<int> box1 = new Box<int>(100);
%Box<int> box2 = box1.Map(x => x * 2);
%Console.WriteLine(box2.X);
%
%interface IFunctor<T1>
%{
%  IFunctor<T2> Map<T2> (Func<T1,T2> f);
%}
%
%class Box<T1> : IFunctor<T1>
%{
%  public T1 X { get; private set; }
%  public Box (T1 x) => X = x;
%  public Box<T2> Map<T2> (Func<T1,T2> f)
%    => new Box<T2>(f(X));
%}
%```


