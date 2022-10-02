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

# Inheritance


```{warning}
Work in progress.
```

%% Example: Get rid of the foreach? Or is this perhaps not a great solution?
%
%%- Including abstract classes.
%%- UML class diagram notation.
%%- White-box reuse (as opposed to black-box which is composition) (Gamma et al)
%%- Object type (lowercase is an alias for the same as the uppercase). All classes inherit from object.
%%- Forward ref to Subtype polymorphism
%%- Overriding 
%
%% ## Interface inheritance
%%
%%Remember how we said that an interface can implement another interface?
%%Let me show you an example of that before we move on.
%%Let's say that we've got an interface called `IIncrementable` which requires that whoever implements declares an instance method with the signature `void Inc ()`.
%%
%%```csharp
%%interface IIncrementable
%%{
%%  void Inc ();
%%}
%%```
%%
%%Let's then say that we're creating another interface called `IAddable` which requires that whoever implements it declares an instance method with the signature `void Add (int y)`.
%%In addition to this however, the interface also requires that you implement the other interface `IIncrementable`.
%%
%%```csharp
%%interface IAddable : IIncrementable
%%{
%%  void Add (int y);
%%}
%%```
%%
%%If we now write a class called `Number` that claims to implement `IAddable` and try to only implement the method `Add` we will get a compilation error.
%%
%%```csharp
%%class Number : IAddable
%%{
%%  int x = 0;
%%
%%  public void Add (int y) => x += y;
%%}
%%```
%%
%%```output
%%error CS0535: 'Number' does not implement interface member 'Incrementable.Inc()'.
%%```
%%
%%Since `IAddable` inherits from the interface `IIncrementable` 
%%
%%```csharp
%%class Number : IAddable
%%{
%%  int x = 0;
%%
%%  public void Inc () => x++;
%%  public void Add (int y) => x += y;
%%}
%%```
%
%
%## Examples
%
%### Ciphers
%
%```{code-cell} csharp
%:tags: [hide-input]
%interface ICharToCharCipher
%{
%  char Encode (char input);
%}
%
%interface IStringToStringCipher
%{
%  string Encode (string input);
%}
%
%interface ICharToStringCipher
%{
%  string Encode (char input);
%}
%```
%
%```{code-cell} csharp
%abstract class CharWiseCipher : ICharToCharCipher, IStringToStringCipher
%{
%  public abstract char Encode (char input);
%
%  public string Encode (string input)
%  {
%    string output = "";
%    foreach (char letter in input)
%      output += Encode (letter);
%    return output;
%  }
%}
%```
%
%```{code-cell} csharp
%:tags: [hide-input]
%class CaesarCipher : CharWiseCipher
%{
%  int steps;
%
%  public CaesarCipher (int steps)
%    => this.steps = steps;
%
%  public override char Encode (char input)
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
%:tags: [hide-input]
%class LeetCipher : CharWiseCipher
%{
%  public override char Encode (char input)
%    => input switch {
%      'L' => '1',
%      '1' => 'L',
%      'A' => '4',
%      '4' => 'A',
%      'O' => '0',
%      '0' => 'O',
%      'T' => '7',
%      '7' => 'T',
%      'E' => '3',
%      '3' => 'E',
%      _ => input
%    };
%}
%```
%
%
%```{exercise}
%Can the class `RobbersCipher` inherit from `CharWiseCipher`?
%Why or why not?
%```
%
%
%
