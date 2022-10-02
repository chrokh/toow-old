# Abstract constructed object composition

% EXAMPLE: Like the incremeneting caesar cipher but use two ciphers and tik-tok between them. Lets' call it a FlipFlopCipher. Then we can do both the abstract version of this and the abstract version of IncrementingCipher when we get to injected abstract.

```{warning}
Work in progress.
```

%Remember the four types of [object composition](object-composition) summarized by the quadrant diagram of abstraction levels in object composition ({numref}`fig:object-composition-object-diagram`).
%We've already talked about *concrete* dependency [construction](abstract-constructed-object-composition) and [injection](concrete-dependency-injection).
%However, since we've now also learned about [subtyping](subtyping) we're ready to talk about *abstract* dependency [construction](abstract-injected-object-composition) and [injection](abstract-injected-object-composition).
%In this chapter we'll take a quick look at abstract dependency construction.
%
%In truth, there isn't much to say about abstract dependency construction.
%Let's start with the code we built in the end of the chapter on [concrete dependency construction](concrete-dependency-construction).
%We had a class called `RobbersStringCipher` that exposed a method called `Encode` that took a `string` as input and produced a `string` as output.
%This method in turn instantiated and delegated to an instance of `RobbersCharCipher`.
%The method it delegated to was also called `Encode` but this method took a `char` as input and produced a `string` as output.
%Together it all looked like the code below:
%
%```csharp
%class RobbersStringCipher
%{
%  RobbersCharCipher charCipher;
%
%  public RobbersStringCipher (char vowel)
%    => charCipher = new RobbersCharCipher(vowel);
%
%  public string Encode (string input)
%  {
%    string output = "";
%
%    foreach (char c in input)
%      output += charCipher.Encode(c);
%
%    return output;
%  }
%}
%
%class RobbersCharCipher
%{
%  char vowel;
%
%  public RobbersCharCipher (char vowel)
%    => this.vowel = vowel;
%
%  public string Encode (char input)
%  {
%    string consonants = "bcdfghjklmnpqrstvwxz";
%
%    if (consonants.IndexOf(Char.ToLower(input)) != -1)
%      return $"{input}{vowel}{input}";
%    else
%      return input.ToString();
%  }
%}
%```
%
%Now that we've learned about subtype polymorphism we should have our abstraction goggles on and constantly look for commonalities between types that would lend themselves to a new abstraction.
%Remember Leetspeak?
%Have a look at the following code:
%
%```csharp
%class LeetStringCipher
%{
%  LeetCharCipher charCipher = new LeetCharCipher();
%
%  public string Encode (string input)
%  {
%    string output = "";
%
%    foreach (char c in input)
%      output += charCipher.Encode(c);
%
%    return output;
%  }
%}
%
%class LeetCharCipher : ICharCipher
%{
%  public string Encode (char input)
%  {
%    switch (input)
%    {
%      case 'A': return "4";
%      case '4': return "A";
%      case 'L': return "7";
%      case '7': return "L";
%      case 'E': return "3";
%      case '3': return "E";
%      case 'O': return "0";
%      case '0': return "O";
%      default: return input.ToString();
%    }
%  }
%}
%```
%
%Starting to see where this is going?
%Have a close look at `RobbersStringCipher` and `LeetStringCipher`.
%They are eerily similar, are they not?
%How about `RobbersCharCipher` and `LeetCharCipher`?
%They too are similar.
%Of course, this whole example is orchestrated by me so that these similarities emerge.
%However, you will often find that if you think about your domain model long and hard enough then you will find a way to make similarities, and hence abstractions, emerge.
%
%Remember the code you wrote in {numref}`ex:concrete-dependency-construction-caesar-cipher` where we implemented a Caesar Cipher by again decomposing the problem into the idea of encoding a full string and decoding a single character.
%You ought to have ended up with two classes that also are eerily similar to the two string and `char` cipher classes here.
%
%We've already talked about how we can unify different ciphers that take a `string` as input and produce a `string` as output under the interface `ICipher` in the chapter on [subtype polymorphism](subtype-polymorphism).
%Let's ignore the `string` ciphers in this chapter and instead focus on the `char` ciphers.
%
%%Adapting the code above is trivial since we just have to state that the two classes implement the interface `ICipher`.
%%It would look something like this:
%%
%%```csharp
%%interface ICipher { string Encode (string input); }
%%class RobbersStringCipher : ICipher { /* ... */ }
%%class LeetStringCipher : ICipher { /* ... */ }
%%```
%
%All the `char` ciphers have a method called `Encode` which takes a `char` as input and produces a `string` as output.
%Let's put that in an interface.
%
%```csharp
%interface ICharCipher
%{
%  string Encode (char input);
%}
%```
%
%Ok, implementing that interface should be straightforward since we wrote the interface based on a method that already existed in both `RobbersCharCipher` and `LeetCharCipher`.
%So let's just declare that these two classes are implementing the interface `ICharCipher` and make sure that our code compiles.
%
%```csharp
%class RobbersCharCipher : ICharCipher { /* ... */ }
%class LeetCharCipher : ICharCipher { /* ... */ }
%```
%
%```output
%Build succeeded.
%```
%
%Ok, but what does the common interface `ICharCipher` enable us to do?
%Sure, we could redefine the lines that declare the variable `charCipher` in both `RobbersStringCipher` and `LeetStringCipher` so that the compile-time type is the abstraction `ICharCipher` rather than any concrete implementation of that interface.
%We would take this code:
%
%```csharp
%class RobbersStringCipher
%{
%  RobbersCharCipher charCipher;
%// ...
%```
%
%and change it to this:
%
%
%```csharp
%class RobbersStringCipher
%{
%  ICharCipher charCipher;
%// ...
%```
%
%But do we really gain anything substantial from this?
%Not really.
%If you've got code where you're somehow switching between different ciphers in the same object over time then it's possible to gain something from this but probably not.
%In our case, there's really no obvious benefit.
%
%
%## Finding an abstraction
%
%However, what if we could get rid of the duplicated code in the `Encode` methods of the `string` ciphers.
%That would be useful.
%We have already learned the design principle abbreviated DRY, which stands for "Don't Repeat Yourself".
%As we will learn later, duplicated code is also considered a [code smell](code-smell).
%
%Notice how *almost all the variation* between the ciphers in this chapter occurr in the `char` ciphers, not in the `string` ciphers.
%Ignoring parameterization of constructors for now, we conclude that the *only* difference between `RobbersStringCipher` and `LeetStringCipher` is what *type* of `char` cipher they happen to instantiate and thus delegate to.
%
%So let's think about this.
%If there's nothing that's different between `RobbersStringCipher` and `LeetStringCipher`, then what is the concept that makes them the same.
%Think about it, they both encode in the same way.
%One character at a time.
%
%To see similarities, we must sometimes look at differences.
%Remember the reverse cipher?
%Here's an implementation of the reverse cipher:
%
%```csharp
%class ReverseCipher
%{
%  public string Encode (string input)
%  {
%    string output = "";
%    for (int i=input.Length-1; i >= 0; i--)
%      output += input[i];
%    return output;
%  }
%}
%```
%
%Notice how we're picking characters from the input string "backwards" but we're building the encoded string "forwards".
%In other words we're taking characters last to first but we're building the resulting string first to last.
%
%The Reverse cipher algorithm is fundamentally different from the Robber's cipher and Leetspeak.
%In the sense that it cannot (easily) be implemented as a left-to-right character-by-character conversion.
%The first character of the input `string` *cannot* be used as input to create the first chunk of the output `string`.
%
%So, what's one thing that unifies the Robber's cipher and Leetspeak?
%The encoding algorithms can both be implemented as character-by-character conversions where every input character yields one or more output characters in the correct order.
%
%```{exercise}
%:label: ex:char-wise-cipher-description
%Describe another conversion algorithm that can be implemented as a character-wise conversion.
%Meaning that it could be a subclass of `CharWiseCipher`.
%```
%
%## Composing the abstraction
%
%So how do we implement this?
%In this chapter we'll use [inheritance](inheritance) but in the chapter on [abstract injected object composition](abstract-injected-object-composition) we'll use composition instead.
%Most, including myself, would argue that the composition based solution is superior.
%If you've ever heard about the design principle [composition over inheritance](composition-over-inheritance) you will soon start to see why this principle exists.
%At it's core, the problem with inheritance is that it assumes that you problem forms a hierarchy.
%Few problems are hierarchies, many are graphs.
%But, let's go with inheritance in this chapter since we're talking about abstract dependency *construction* and not *injection*.
%
%What we can do with inheritance is that we can say that the method `string Encode (string input)` should be implemented in a baseclass from which other subclasses can inherit.
%That method then delegates to a [protected](advanced-access-modifiers) instance variable which can be overwritten upon construction of subclasses.
%Let's look at some code to make sense of this.
%Here's the base class:
%
%```csharp
%class CharWiseCipher : ICipher
%{
%  protected ICharCipher charCipher = new IdentityCharCipher();
%
%  public string Encode (string input)
%  {
%    string output = "";
%
%    foreach (char c in input)
%      output += charCipher.Encode(c);
%
%    return output;
%  }
%}
%```
%
%What does this baseclass do?
%Two things:
%
%1. It declares and initializes the `protected` instance variable `charCipher` to a default value.
%2. It declares and implements the instance method `string Encode (string input)` as simply passing each character of the `string` to the `Encode` method of `charCipher` and concatenating the result.
%
%But what is the type `IdentityCharCipher` that acts as the default value?
%Well, we've talked about the idea of identity functions and values before.
%The identity `char` cipher is a cipher that simply returns whatever you pass it back.
%As you might have suspected, the class `IdentityCharCipher` is implemented something like this:
%
%```csharp
%class IdentityCharCipher : ICharCipher
%{
%  public string Encode (char input) => input.ToString();
%}
%```
%
%Let's now look at how the baseclass `CharWiseCipher` behaves before we move on.
%
%```csharp
%Console.WriteLine(new CharWiseCipher().Encode("Hello world"));
%```
%
%```output
%Hello world
%```
%
%Simple, and pretty pointless so far.
%But, we can now create subclasses for each of our character-wise ciphers.
%Each of the subclasses must, upon construction, replace the `protected` instance variable `charCipher` that's declared in the base class with whatever concrete `ICharCipher` that they need.
%
%```csharp
%class LeetCipher : CharWiseCipher
%{
%  public LeetCipher ()
%    => charCipher = new LeetCharCipher();
%}
%
%class RobbersCipher : CharWiseCipher
%{
%  public RobbersCipher (char vowel)
%    => charCipher = new RobbersCharCipher(vowel);
%}
%```
%
%Notice how utterly simple both of these ciphers now are.
%They almost don't contain any code at all.
%This is the power of abstraction and composition.
%By building abstract building blocks we can trivially compose them to solve complex problems.
%
%Notice how the constructor of `RobbersCipher` can remain parameterized and thus still pass the parameter on to the constructor of `RobbersCharCipher`.
%However, perhaps you remember that we, in the chapter on [concrete dependency construction](concrete-dependency-construction) cautioned that this need to pass constructor values down from type to type is a symptom of which dependency *construction* is the cause.
%When we move to dependency *injection* this need to enable passing of constructor parameters simply goes away.
%
%For an overview of the code that we've built in this chapter, have a look at {numref}`fig:abstract-dependency-construction-uml`.
%
%```{figure} https://via.placeholder.com/500x275?text=Image+coming+soon
%:name: fig:abstract-dependency-construction-uml
%
%UML class diagram of our example of abstract dependency construction.
%```
%
%Isn't all this a bit overkill you might ask?
%No, this is just the beginning.
%The point is that now other ciphers that take a full `string` as input and performs their transformation one character at a time from left to right can subclass `CharWiseCipher` and simply, upon construction, set the instance variable to an instance that's suitable for whatever we're trying to achieve with that particular cipher.
%
%This means that the `LeetStringCipher` which we've now renamed to `LeetCipher` and the `RobbersStringCipher` which we've now renamed to simply `RobbersCipher` can become utterly trivial.
%
%```{exercise}
%Implement the algorithm you described in {numref}`ex:char-wise-cipher-description` as a subclass of `CharWiseCipher`.
%```
%
%```{exercise}
%Is it sensible to make the Reverse cipher a subclass of `CharWiseCipher`?
%Why or why not?
%```
%
%```{exercise}
%What is the difference between *concrete* dependency construction and *abstract* dependency construction?
%```
%
