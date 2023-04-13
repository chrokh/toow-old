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

# Overloading

```{warning}
Work in progress.
```

%- The many overloads of `Console.WriteLine`.
%  - We've touched upon this a small bit. In Data Types if nowhere else.
%- Overload methods from chapter on static methods. `Substitute` and `CaesarEncode`
% As we will see in later chapters static methods, instance methods, and constructors can all be overloaded.


## Examples

% TODO: PrintArray for arrays of different types.
% TODO: Example showing that return types can vary.

(overloading:examples:robbers)=
### Robber's cipher

Remember how, in the chapter on [static methods](static-methods-example-robbers), we said that we were going to use overloading to simplify the names of the static methods of the static class `RobbersCipher`?
Well, the time has come to do just that.

As we've seen in this chapter as long as the method signatures (excluding the return type) are different we're free to overload away.
Meaning that we can simply just rename the two methods `EncodeChar` and `EncodeString` to the same thing.
Let's just rename them to, `Encode`.

```{code-cell} csharp
static class RobbersCipher
{
  public static string Encode (char input, char vowel)
    => input switch {
      'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
      => $"{input}{vowel}{input}",
    _ => $"{input}"
  };

  public static string Encode (string input, char vowel)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter, vowel);
    return output;
  }
}
```

Do notice however how the implementation of the second `Encode` method, namely the one that takes input of type `string`, has to change.
It used to call the method `EncodeChar` but since that method is now merely called `Encode` we have to change the call to that.


## Exercises

```{exercise}
Can you overload a method by just varying the *return type*?
Why or why not?
```

```{exercise}
Can you overload a method by just varying a single *parameter name*?
Why or why not?
```

```{exercise}
Can you overload a method by just varying a single *parameter type*?
Why or why not?
```


```{exercise-start}
:label: ex:overloading-leet
```
Take your code from {numref}`ex:static-methods-leet` and rename the two static methods so that they are overloads of each other.

```{code-cell} csharp
:tags: [remove-input]
static class LeetCipher
{
  public static char Encode (char input)
    => input switch {
      'A' => '4', '4' => 'A',
      'E' => '3', '3' => 'E',
      'L' => '1', '1' => 'L',
      'O' => '0', '0' => 'O',
      'S' => '5', '5' => 'S',
      'T' => '7', '7' => 'T',
      _ => input
    };

  public static string Encode (string input)
  {
    string output = "";
    foreach (char c in input)
      output += Encode(c);
    return output;
  }
}
```

When passing a `char` we se should get back a `char`:

```{code-cell} csharp
char input = 'E';
char output = LeetCipher.Encode(input);
Console.WriteLine(output);
```

When passing a `string` we should get back a `string`:

```{code-cell} csharp
string input = "LEET";
string output = LeetCipher.Encode(input);
Console.WriteLine(output);
```
```{exercise-end}
```


````{exercise}
:label: ex:overloading-substitutions
Replace all four static methods in the {numref}`ex:static-methods-substitutions` with four overloaded methods with the same name.

```csharp
static class SubstitutionCipher
{
  public static char Encode (char input, (char, char)[] substitutions) => // ...
  public static string Encode (char input, (char, string)[] substitutions) => // ...
  public static string Encode (string input, (char, char)[] substitutions) => // ...
  public static string Encode (string input, (char, string)[] substitutions) => // ...
}
```

Does this improve or impair the readability of that class?
What's your opinion?
There's no right answer.
````

