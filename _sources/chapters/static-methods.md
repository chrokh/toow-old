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

(blocks)=
# Static methods

```{warning}
Work in progress.
```

%TODO: SIMPLE SUBSTITUTION CIPHERS.

%- Example: LEET language. Convert L<=>7 to allow reversibility.

%- Subroutine on Wikipedia
%- Procedure, hence Procedural programming paradigm.
%- Static methods in C\#
%- Method signature (includes return type in the context of [delegates](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/), but not in the context of overloading).
%- Parameters/arguments
%- Return type and value
%  - In mathematics we say that a function "maps" a certain argument to a certain value, or in other words, a certain input to a certain output. In the imperative programming paradigm however we say that a method "returns" a value. When we define a method we must define what it's, so called, "return type" is. Meaning what the data type is of the values that it returns when we call it.
%In mathematics we say that a function "maps" a certain argument to a certain value, or in other words, a certain input to a certain output.
%In the imperative programming paradigm however we say that a method "returns" a value 
%- Early returns. For example when searching in arrays.
%- Verbs or implicit verbs where Name would usually get or set name.
%- Void (a return type)
%- Parameterization
%- Documentation comments.
%- Types of methods
%  - `WriteLine : String -> void`
%  - Refer back to [type-checking](type-checking) chapter.
%  - Show compiler errors when:
%    - calling non-existant method.
%    - calling with wrong number of arguments.
%    - calling with incorrect type of arguments.
%    - using returned value as wrong type.
%- Is string interpolation syntactic sugar for `String.Format`?
%- Exercises
%  - Write a method that greets a name that you pass.
%  - Write a method that computes the hypothenuse.
%  - Write a method that converts a `string?` to a `string`. Tie back to the nullable discussion in the chapter on [data types](data-types).
%
%---
%
%- Multiple input types to WriteLine due to overloads.
%- Console can also be thought of as defining a type with only a single member. Static means that there's only one member.
%- Sets and functions. Not elegant due to mutation. Still mention it though. It is still valid, but it might also mutate things beyond the in and out. Use bool negation operation (`!`) since it's unary.
%- Methods can have parameters and thus arity. More on this later.
%- Operators can be unary or nullary.

%- Fat-arrow syntax


%We have actually already seen a *static* method.
%The method `WriteLine` is a static method that's defined on the static class `Console`.
%It is therefore called directly upon references to the class, not on instances of the class.
%We'll talk more about [static classes](static-classes) and [static methods](static-methods) in separate chapters so don't worry too much if your head has started to spin.
%For now however, I just wanted us to quickly think about this method that we've already used a lot in terms of types.
%
%The method `WriteLine` is called by stating the class name `Console`, adding a dot, the static method name `WriteLine`, and then enclosing whatever argument we wish to print in parentheses.
%
%Console.WriteLine("Hello world");
%Console.WriteLine(1);
%Console.WriteLine(true);
%
%Remember how we in the chapter on [mathematical functions](functions) said that we can use set theory to reason about functions?
%Functions map input to output and both static and instance methods are like functions with the important exception that they are also allowed to "mutate" the world.
%We'll talk more about mutation in the chapter on [mutability](mutability) but what we mean is that methods are not only allowed to return some particular output given some particular input but they are also allowed to change things.
%
%The method `WriteLine` is a good example of mutation since it maps all input to a single output value called `void`.
%This output value is special as you are not allowed to pass around instances of the type.
%The type `void` is used when we want to say that a method does not evaluate to any value no matter how we call it.
%In the case of `WriteLine` this makes sense since we're not looking to get a value back but rather to have something printed to screen.
%We call this a "side effect".
%When we're calling `WriteLine` we're looking for the side effect of having whatever we pass it printed to the screen.
%
%
%
%%{exercise}
%% Fizz buzz.
%%





## Examples

%### Existing methods
%
%Char.ToUpper('x');
%Char.ToLower('X');
%Console.WriteLine("hello");
%String.Format() and string interpolation.


(static-methods:examples:reverse)=
### Reverse cipher

In the chapter on [methods](methods) we wrote a local function that implemented the reverse cipher.
Let's now wrap that code in a public static method defined in a static class.

```{code-cell} csharp
static class ReverseCipher
{
  public static string Encode (string input)
  {
    string output = "";
    for (int i=input.Length-1; i>=0; i--)
      output += input[i];
    return output;
  }
}
```

Now that we've enclosed the method in a static class with a descriptive name, there's no need anymore to include the name of the cipher ("reverse") in the method name.
So, let's just call the method `Encode`.
Does it work?
Yes, it does.

```{code-cell} csharp
Console.WriteLine(
  ReverseCipher.Encode("detneiro tcejbo ton"));
```


(static-methods:examples:robbers)=
(static-methods-example-robbers)=
### Robber's cipher

Let's now do the same thing to the Robber's cipher that we wrote in the chapter on [methods](methods).
However, remember that we refactored that method so that the method that encoded input strings called another method that knows how to convert any single character.
Let's do the same thing here.

We'll create a static class called `RobbersCipher` and we'll add two public static methods called `EncodeChar` and `EncodeString`.
If you're annoyed by these names, then don't worry, we'll simplify this when we get to [overloading](overloading).

% TODO: Should simplify first Encode by using Char.ToUpper().
```{code-cell} csharp
static class RobbersCipher
{
  public static string EncodeChar (char input, char vowel)
    => input switch {
      'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
      => $"{input}{vowel}{input}",
    _ => $"{input}"
  };

  public static string EncodeString (string input, char vowel)
  {
    string output = "";
    foreach (char letter in input)
      output += EncodeChar (letter, vowel);
    return output;
  }
}
```

Let's test the method that encodes single characters to ensure that it still works.

```{code-cell} csharp
Console.WriteLine(RobbersCipher.EncodeChar('d', 'a'));
```

And then let's test the method that encodes full strings to ensure that it also still works.

```{code-cell} csharp
Console.WriteLine(RobbersCipher.EncodeString("bird", 'o'));
```



## Exercises


```{exercise}
Why are static methods useful?
```


```{exercise}
What is the difference between a *static method* and a *local function*?
```


```{exercise-start}
:label: ex:static-methods-leet
```
Create a static class called `LeetCipher` and let it contain two static methods called `EncodeString` and `EncodeChar`.
These methods should essentially contain the code that wrote in {numref}`ex:methods-leet`.
In other words, the static methods should implement the leet language and be able to convert strings and individual characters.
Your static methods should behave according to the usage example below.

```{code-cell} csharp
:tags: [remove-input]
static class LeetCipher
{
  public static char EncodeChar (char input)
    => input switch {
      'A' => '4', '4' => 'A',
      'E' => '3', '3' => 'E',
      'L' => '1', '1' => 'L',
      'O' => '0', '0' => 'O',
      'S' => '5', '5' => 'S',
      'T' => '7', '7' => 'T',
      _ => input
    };

  public static string EncodeString (string input)
  {
    string output = "";
    foreach (char c in input)
      output += EncodeChar(c);
    return output;
  }
}
```

```{code-cell} csharp
Console.WriteLine( LeetCipher.EncodeString("LEET 101") );
```
```{code-cell} csharp
Console.WriteLine( LeetCipher.EncodeChar('E') );
```
```{exercise-end}
```




```{exercise-start}
:label: ex:static-methods-substitutions
```
In the chapter on [methods](methods) we either wrote or discussed the possibility to write four different methods for applying arrays of substitutions to a character or string.
Let's now throw them all in a static class that we'll call `SubstitutionCipher`.

While we're at it, we'll also give them new names that hopefully make it a tad easier to see what method does what.
If these names drive you crazy then rest assured that we will deal with this when we get to the chapter on [overloading](overloading).

```{code-cell} csharp
:tags: [remove-input]
static class SubstitutionCipher
{
  public static char EncodeCharWithCharReplacements (char input, (char, char)[] substitutions)
  {
    foreach ((char, char) substitution in substitutions)
      if (substitution.Item1 == input)
        return substitution.Item2;
    return input;
  }

  public static string EncodeCharWithStringReplacements (char input, (char, string)[] substitutions)
  {
    foreach ((char, string) substitution in substitutions)
      if (substitution.Item1 == input)
        return substitution.Item2.ToString();
    return input.ToString();
  }

  public static string EncodeStringWithCharReplacements (string input, (char, char)[] substitutions)
  {
    string output = "";
    foreach (char c in input)
      output += EncodeCharWithCharReplacements(c, substitutions);
    return output;
  }

  public static string EncodeStringWithStringReplacements (string input, (char, string)[] substitutions)
  {
    string output = "";
    foreach (char c in input)
      output += EncodeCharWithStringReplacements(c, substitutions);
    return output;
  }
}
```

Implement a static class that looks like this:

```csharp
static class SubstitutionCipher
{
  public static char EncodeCharWithCharReplacements (char input, (char, char)[] substitutions) => // ..
  public static string EncodeCharWithStringReplacements (char input, (char, string)[] substitutions) => // ..
  public static string EncodeStringWithCharReplacements (string input, (char, char)[] substitutions) => // ..
  public static string EncodeStringWithStringReplacements (string input, (char, string)[] substitutions) => // ..
}
```

The static methods of the static class should behave like this:

```{code-cell} csharp
var leetLike = new (char, char)[] {
  ('E', '3'), ('L', '1'), ('O', '0') };
var robbersLike = new (char, string)[] {
  ('H', "HOH"), ('L', "LOL") };

Console.WriteLine(SubstitutionCipher.EncodeCharWithCharReplacements('L', leetLike));
Console.WriteLine(SubstitutionCipher.EncodeCharWithStringReplacements('L', robbersLike));
Console.WriteLine(SubstitutionCipher.EncodeStringWithCharReplacements("HELLO", leetLike));
Console.WriteLine(SubstitutionCipher.EncodeStringWithStringReplacements("HELLO", robbersLike));
```

```{tip}
We also wrote a method called `charCharArrayToCharStringArray` in the chapter on [methods](methods) and you're free to choose whether to add this as another method to this static class, to inline that code in the appropriate method above, or simply to use more duplication.
```
```{exercise-end}
```
