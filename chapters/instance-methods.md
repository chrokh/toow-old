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

# Instance methods

```{warning}
Work in progress.
```

%- Cannot use top-level statements
%%- Overloading
%%- Signatures.
%%- Void is a return type.
%%- Recursion.
%%- Late binding, Dynamic binding? Michaelis (2020)
%%- Usually verbs. Or implied verbs as discussed in procedures.
%%- String manipulation
%%  - Substring
%%  - IndexOf
%%- Expression bodied members (uses the => operator but are not lambda expressions).
%
%% IMPORTANT: Rewrite the old implementation of RobbersLanguage that used a long or-statement to determine if something is a vowel or not. Now we can use `IndexOf` to check if the vowel is in a string of vowels.
%
%
%We've talked about the type `string`.
%The type `string` defines many operations but one operation that we call using dot notation is `Contains`.
%The instance method `Contains` accepts an argument of type `string` and returns a boolean that represents whether the `string` instance contains the `string` passed as an argument anywhere.
%
%"Hello world".Contains("hello")
%
%False
%
%To call an instance method, we write the name of a reference to an object or use a literal, add a dot after it, and then write the name of the method we wish to invoke.
%We'll talk more about methods later, but we can pass arguments to methods similar to how [mathematical functions](functions) are defined in terms of their arguments.
%These arguments can also either be references to objects or literals.
%The program below would render the same result as the one above.
%
%string message = "Hello world";
%string keyword = "hello";
%string result  = message.Contains(keyword);
%
%Console.WriteLine(result);
%
%Let's look a slightly more complicated example.
%In some of the examples in this chapter we called the method `GetType` on values of type `string`, `int`, and `double`.
%This means that the these types support the operation `GetType` and that this method is called using dot notation.
%
%"A".GetType();
%420.GetType();
%3.14.GetType();
%
%The method `GetType` is an instance method.
%It is defined on the class `Object` and called upon instances of it, meaning on objects of that type.
%We'll talk more about the built in types in C# in the chapter on [type hierarchies](type-hierarchies) and about [classes](classes) and [objects](objects) later.
%What to understand now however is that `GetType` is an operation that we can call on objects of type `string` because all strings can be treated as if they are of type `Object` and since the method is defined as an instance method on that class.
%

%## Motivation

% Benefits are very similar to partial application when we send in data through the constructor. Our data depends on the state of the object. Being able to store some data in an instance and then use objects of the same type interchangably at runtime. For example instantiating caesar ciphers with multiple different steps, passing them around, and then switching between them.




%## Definition


## Examples


%### Mutable numbers
%
%Remember the `Nat` example from when we discussed [message passing](objects:examples:nat) in the chapter on objects?
%
%```{code-cell} csharp
%class Nat
%{
%  int n;
%
%  public Nat (int n)
%    => this.n = n;
%
%  public void Add (Nat other)
%    => this.n += other.n;
%
%  public int ToInt ()
%    => n;
%}
%```

We would be able to use the type to create objects of type `Nat` and then add them like this:

```{code-cell} csharp
Nat x = new Nat(10); // Instantiates an object of type Nat.
Nat y = new Nat(2);  // Instantiates an object of type Nat.

Console.WriteLine($"x = {x.ToInt()}");

// Sends the message (calls the instance method) Add
// to the object x, passing object y as an argument.
x.Add(y);

Console.WriteLine($"x = {x.ToInt()}");
```



### Robber's language

We are now ready to convert the static class `RobbersCipher` from the chapter on [overloading](overloading:examples:robbers) to a regular class where all methods are instance methods.

```{code-cell} csharp
class RobbersCipher
{
  private char vowel;

  public RobbersCipher (char vowel)
    => this.vowel = vowel;

  public string Encode (char input)
    => input switch {
      'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
      => $"{input}{vowel}{input}",
    _ => $"{input}"
  };

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }
}
```

Notice how we moved the input vowel to the constructor.
We're not going to bother with that now but as we saw in the chapter on [constructors](constructors), that would be a prime place for validation.

However, since we've also now learned that other types like for example `string` too expose instance methods we can finally simplify the implementation of one of our `Encode` methods.
Have a look at the updated code below.

```{code-cell} csharp
class RobbersCipher
{
  private char vowel;

  public RobbersCipher (char vowel)
    => this.vowel = vowel;

  public string Encode (char input)
  {
    string consonants = "BCDFGHJKLMNPQRSTVXYZ";
    if (consonants.IndexOf(Char.ToUpper(input)) != -1)
      return $"{input}{vowel}{input}";
    else
      return $"{input}";
  }

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }
}
```

Primo!
But does it work?
How do we use it?
Well, first off we need to create instances of the `RobbersCipher` class and to do that we must pass a `char` to play the role of the `vowel` to the constructor.

```{code-cell} csharp
RobbersCipher c1 = new RobbersCipher('o');
RobbersCipher c2 = new RobbersCipher('a');
```

Then we can simply call the `Encode` method any number of times that we want.

```{code-cell} csharp
Console.WriteLine(c1.Encode("Hello"));
```

```{code-cell} csharp
Console.WriteLine(c2.Encode("Hello"));
```




(caesar-encode)=
### Caesar cipher

Let's now do something a bit more complex.
We've learned enough skills to be able to do a [Caesar Cipher](caesar-cipher).

Similar to the other ciphers that we've built we'll solve it by writing two overloaded methods.
One that takes an input `string` and one that takes an input `char`.
The method that takes a `string` will call the other method for each of its constitutent characters and concatenate the resulting encoded `string`.

Beyond the input, we ought to accept an additional parameter that we could call `steps`.
This parameter is of type `int` and determines how many steps forward or backwards in the alphabet we should take when encoding data.

As we create a class to encapsulate this encoding logic we need to ask ourselves whether we want the two parameters `input` and `steps` to be given as arguments to the `Encode` method or to the constructor.
We will opt for setting the `steps` in the constructor, and the `input` in the method.
This very much determines what kind of objects we create with this class.
Let's first look at the code and then discuss the consequences of what we choose to put in the constructor.
Here's what the class would look like:

```{code-cell} csharp
class CaesarCipher
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public char Encode (char input)
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

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode(letter);
    return output;
  }
}
```

Let's check if it works as expected.

```{code-cell} csharp
CaesarCipher forwardTwo = new CaesarCipher(2);
CaesarCipher backOne = new CaesarCipher(-1);
```

```{code-cell} csharp
Console.WriteLine( forwardTwo.Encode("AbYz") );
```

```{code-cell} csharp
Console.WriteLine( backOne.Encode("AbYz") );
```

Ok, it seems to work.


%Now that we've got a method that deals with single characters, `CaesarEncodeChar` we can simplify the method using early `return` statements and the [ternary operator](ternary-operator).
%Whether the rewritten method is easier to read or not is a question of taste so you are free to disagree.
%Nevertheless, since the new version is shorter I'm going to make use of it in this book since it occupies less vertical space.
%
%class CaesarCharCipher
%{
%  int steps;
%
%  public CaesarCharCipher (int steps)
%    => this.steps = steps;
%
%  public char Encode (char input)
%  {
%    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
%    int i = alphabet.IndexOf(Char.ToUpper(input));
%    if (i == -1) return input;
%    int remainder = (i + steps) % alphabet.Length;
%    int newIndex = remainder >= 0 ? remainder : remainder + alphabet.Length;
%    char output = alphabet[newIndex];
%    return Char.IsLower(input) ? Char.ToLower(output) : output;
%  }
%}

Back to the question of constructor parameters.
Think about it.
If we take `steps` in the constructor and `input` in the instance method `Encode` then we're creating a step-specific cipher that can encode any character.
You instantiate the cipher, can pass it around, and can send it any character upon which you get back an encoded character.

What kind of objects would we have been creating if we instead exposed both `steps` and `input` in the constructor?
Well, in that case the `Encode` method would be nullary, meaning it would not take any arguments.
When we call `Encode` we would always get back the same value since `Encode` is a [pure](purity) method.
Choosing this strategy would imply that we are looking for the ability to evaluate translations at a later time.
Meaning that we have all the input data available beforehand and want to "preload" it.
But that we want to be able to wait before we execute the encoding.

```csharp
class CaesarCipher
{
  string input;
  int steps;
  public CaesarCipher (string input, int steps) // ...
  public char Encode () => // ...
}
```

What kind of objects would we have been creating if we instead exposed `input` in the constructor but took `steps` as an argument in `Encode`?
This would imply that we want to be able to pass around an object that contains the information to be encoded, but we don't know how many steps we want to encode it with.

```csharp
class CaesarCipher
{
  string input;
  public CaesarCipher (string input) // ...
  public string Encode (int steps) => // ...
}
```

What kind of objects would we have been creating if we instead didn't expose *any* arguments in the constructor and instead took both as arguments in `Encode`?
Well, since the constructor is parameterless and since the `Encode` method is [pure](purity), all instances of the cipher would essentially be equivalent.
There isn't too much of a point of wrapping this in a class in that case.
Sure, if we can identity other classes that have a different implementation of `Encode` but still share exactly the same signature, it would be meaningfull.
Because then we could still use [subtype polymorphism](subtype-polymorphism).
But given the case of ciphers, I feel it quite unlikely that we would find such ciphers.

```csharp
class CaesarCipher
{
  public char Encode (char input, int steps) => // ...
  public string Encode (string input, int steps) => // ...
}
```

```{seealso}
If you happen to be familiar with functional programming, then choosing what parameters to expose in the constructor resembles the problem of determining the order of function arguments to allow for useful partial application.
If you are not familiar with functional programming, please ignore what I just said.
```

When we get to the chapters on [subtype polymorphism](subtype-polymorphism) and [abstract injected object composition](abstract-injected-object-composition) you will start to see why it is so important to think about what you expose in your instance methods and what you "preload" in the constructor.
I know that this statement doesn't make sense yet, but when you want to use subtype polymorphism whatever instance method you want to override/implement has to have the same signature in all subtypes.

```{warning}
If we want to be able to easily switch between different kinds of ciphers (like for example Caesar, Reverse, and Robber's language) then it is important that we define our instance methods so that they *don't* require arguments that are specific to any particular subset of ciphers.
```

Don't worry if you still feel confused about why we chose to put `steps` in the constructor and `input` in the instance method.
After the chapters on [subtype polymorphism](subtype-polymorphism) and [abstract injected object composition](abstract-injected-object-composition) you should have a much better idea.



## Exercises

```{exercise}
In your own words, explain how instance methods are different from static methods.
```

```{exercise}
When and why would you choose to expose a parameter through the constructor as opposed to through an instance method?
Explain using your own words.
```

```{exercise-start}
```
Write a class called `ReverseCipher` which expose a public instance method with the following signature:

```csharp
string Encode (string input);
```

The method should implement the Reverse cipher that we worked with in the chapter on [static methods](static-methods:examples:reverse).

When you are done, you should be able to run the following code and get the corrseponding output.

```{code-cell} csharp
:tags: [remove-input]
class ReverseCipher
{
  public string Encode (string input)
  {
    string output = "";
    for (int i=input.Length-1; i>=0; i--)
      output += input[i];
    return output;
  }
}
```

```{code-cell} csharp
ReverseCipher reverser = new ReverseCipher();
Console.WriteLine(reverser.Encode("Hello"));
```
```{exercise-end}
```



```{exercise-start}
:label: ex:instance-methods:leet
```
Write a class called `LeetCipher` which expose two overloaded public instance methods with the following signatures:

```csharp
string Encode (string input);
char Encode (char input);
```

Both methods should encode the input into [Leetspeak](leet-language) and then return the result.

```{code-cell} csharp
:tags: [remove-input]
class LeetCipher
{
  public char Encode (char input)
  {
    switch (input)
    {
      case 'L': return '1';
      case '1': return 'L';
      case 'A': return '4';
      case '4': return 'A';
      case 'O': return '0';
      case '0': return 'O';
      case 'T': return '7';
      case '7': return 'T';
      case 'E': return '3';
      case '3': return 'E';
      default: return input;
    }
  }

  public string Encode (string input)
  {
    string output = "";
    foreach (char c in input)
      output += Encode(c);
    return output;
  }
}
```

When you are done you should be able to run the following code and get the corresponding output.
The code first instantiates a cipher and then encodes both a `string` and a `char` and prints the results.

```{code-cell} csharp
LeetCipher leet = new LeetCipher();

string output1 = leet.Encode("LEET");
char output2 = leet.Encode('E');

Console.WriteLine($"{output1} {output2}");
```
```{exercise-end}
```




%---

%### Substitution ciphers
%Remember the idea of substitution ciphers?
%Let's start with the four overloaded static methods that we defined in {numref}`ex:overloading-substitutions` in the chapter on [overloading](overloading).
%
%UNFORTUNATELY WE HAVE LESS CODE REUSE NOW THAT WE HAVE MOVED TO INSTANCE METHODS. WE'LL GET IT BACK LATER. DONT WORRY.
%WHY DO WE LOOSE THIS ABILITY?
%Because when we want to store the substitutions via the constructor we need to have a single type for it.
%We're not going to be able to get back this code reuse before we get to [generics](generics).
%
%
%```{code-cell} csharp
%class CharSubstitution
%{
%  (char, char)[] substitutions;
%
%  public CharSubstitution ((char, char)[] substitutions)
%    => this.substitutions = substitutions;
%
%  public char Substitute (char input)
%  {
%    foreach ((char, char) sub in substitutions)
%      if (sub.Item1 == input)
%        return sub.Item2;
%    return input;
%  }
%
%  public string Substitute (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += Substitute(c);
%    return output;
%  }
%}
%```
%
%```{code-cell} csharp
%var subs = new (char,char)[] { ('A', '4') };
%CharSubstitution cipher = new CharSubstitution(subs);
%cipher.Substitute('A');
%cipher.Substitute("ABC");
%```
%
%```{code-cell} csharp
%cipher.Substitute("ABC");
%```
%
%```{code-cell} csharp
%class StringSubstitution
%{
%  (char,string)[] substitutions;
%
%  public StringSubstitution ((char,string)[] substitutions)
%    => this.substitutions = substitutions;
%
%  public string Substitute (char input)
%  {
%    foreach ((char,string) sub in substitutions)
%      if (sub.Item1 == input)
%        return sub.Item2;
%    return input.ToString();
%  }
%
%  public string Substitute (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += Substitute(c);
%    return output;
%  }
%}
%```
%
%
%
%
%
%### Caesar substitutions
%
%````{admonition} TODO
%How would we build a Caesar cipher with this method?
%Well, we need to build up a massive array of tuples that describe all the substitutions for a given number of steps.
%Hmm.. sounds like we could use a method for that right?
%Have a look at the code below.
%
%```csharp
%static (char, char)[] MakeCaesarSubstitutions (int steps)
%{
%  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
%  (char, char)[] output = new (char, char)[alphabet.Length * 2];
%  for (int i=0; i<alphabet.Length; i++)
%  {
%    int newIndex = (i + steps) % alphabet.Length;
%    if (newIndex < 0) newIndex += alphabet.Length;
%    output[i*2  ] = (alphabet[i], alphabet[newIndex]);
%    output[i*2+1] = (Char.ToLower(alphabet[i]), Char.ToLower(alphabet[newIndex]));
%  }
%  return output;
%}
%```
%
%With that helper method in place we are able to generate the list of substitution tuples needed to run a Caesar encoding with any number of steps, for both uppercase and lowercase letters.
%We would run it like this:
%
%```csharp
%// Compactly
%Console.WriteLine( SubstituteString("Run!", MakeCaesarSubstitutions(2)) );
%
%// Or more verbosely
%(char,char)[] substitutions = MakeCaesarSubstitutions(2);
%string input = "Run!";
%string output = SubstituteString(input, substitutions);
%Console.WriteLine(output);
%```
%
%```output
%Twp!
%Twp!
%```
%````
%
%

%```{exercise}
%In this chapter we stated that the two classes `CharSubstitution` and `StringSubstitution` cannot be sensibly merged into a single class.
%Why is this?
%Explain using your own words.
%```

