# Static methods

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

