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

# Lab: Default Interface Methods

## Objective

In this lab, we will delve into the concept of default interface methods. Our objective is to understand how to implement and utilize these methods effectively by working on a practical example: simple ciphers. By the end of this lab, we will have created a series of cipher classes that adhere to a common interface, `ICipher`.

## Provided Code

Carefully review the provided code. Notice that we have an interface named `ICipher` with a single method signature: `char Encode(char)`. This interface serves as a contract for any cipher class we create, ensuring they all have a basic encoding functionality.

However, we can enhance its utility by adding a default method `string Encode(string input)`. This method will iterate over each character in the input `string`, apply the `Encode(char)` method, and assemble the resulting characters into a new encoded `string`.

```{code-cell}
interface ICipher
{
    char Encode(char character);

    string Encode(string input)
    {
        string output = "";
        foreach (char c in input)
            output += Encode(c);
        return output;
    }
}
```

```{admonition} 🤔 Reflection
How does implementing the `Encode(string)` method in the interface benefit all classes that implement `ICipher`? Would there be any drawbacks if each class had to implement its own version of this method?
```

## Instructions

Your task is to implement three different cipher classes that conform to the `ICipher` interface.

### Step 1: Implement `CaesarCipher`

Create a class `CaesarCipher` that implements `ICipher`.
The constructor should accept an integer for the step length of the cipher.
Implement the `Encode(char)` method to shift the character by the specified step length.

When you're done, you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class CaesarCipher : ICipher
{
    int steps;
    char[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();

    public CaesarCipher(int steps)
        => this.steps = steps;

    public char Encode(char character)
    {
        bool isUpper = char.IsUpper(character);
        int index = Array.IndexOf(alphabet, char.ToUpper(character));
        if (index < 0) return character;
        int newIndex = (index + steps + alphabet.Length) % alphabet.Length;
        char output = alphabet[newIndex];
        return isUpper ? output : char.ToLower(output);
    }
}
```

```{code-cell}
ICipher cipher = new CaesarCipher(2);

Console.WriteLine(cipher.Encode("ABC xyz 123"));
```

```{code-cell}
ICipher cipher = new CaesarCipher(-1);

Console.WriteLine(cipher.Encode("ABC xyz 123"));
```

### Step 2: Implement `LeetCipher`

Create a class `LeetCipher` that also implements `ICipher`.
In `Encode(char)`, replace specific characters (like `E`, `A`, `T`) with numerals (like `3`, `4`, `7`).

When you're done, you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class LeetCipher : ICipher
{
    public char Encode(char character)
    {
        switch (Char.ToUpper(character))
        {
            case 'L': return '1';
            case 'E': return '3';
            case 'A': return '4';
            case 'T': return '7';
            default: return character;
        }
    }
}
```

```{code-cell}
ICipher cipher = new LeetCipher();

Console.WriteLine(cipher.Encode("Leet encode"));
```

### Step 3: Implement FlipFlopCipher

This cipher alternates between two different ciphers for each character encoded.
Create a class `FlipFlopCipher` with a constructor that takes two `ICipher` instances.
Implement `Encode(char)` to alternate between these two ciphers.

When you're done, you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class FlipFlopCipher : ICipher
{
    ICipher cipher1;
    ICipher cipher2;
    bool flag = false;

    public FlipFlopCipher(ICipher cipher1, ICipher cipher2)
    {
        this.cipher1 = cipher1;
        this.cipher2 = cipher2;
    }

    public char Encode(char character)
        => (flag = !flag)
            ? cipher1.Encode(character)
            : cipher2.Encode(character);
}
```

```{code-cell}
ICipher cipher = new FlipFlopCipher(
        new CaesarCipher(1),
        new CaesarCipher(-1));

Console.WriteLine(cipher.Encode("AABBCCDD"));
```

### Step 4: Reflect on the limitations of default interface methods

Why does the following code fail to compile?

How can this limitation of default interface methods affect our design decisions?

```{code-cell}
:tags: [raises-exception]
CaesarCipher cipher = new CaesarCipher(2);
cipher.Encode("Hello world");
```

## Challenge

Now that we've refactored our code, let's tackle one more problem: `CycleCipher`. This cipher should take a list of `ICipher` instances and use each one in turn to encode characters in a string.

Implement `CycleCipher` that takes a list of ciphers in the constructor.
The `Encode(char)` method should cycle through each cipher in the list for successive characters.

When you're done you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class CycleCipher : ICipher
{
    List<ICipher> ciphers;
    int index = 0;

    public CycleCipher(List<ICipher> ciphers)
        => this.ciphers = ciphers;

    public char Encode(char input)
    {
        if (ciphers.Count > 0)
        {
            ICipher cipher = ciphers[index];
            index = (index + 1) % ciphers.Count;
            return cipher.Encode(input);
        }
        else
        {
            return input;
        }
    }
}
```

```{code-cell}
List<ICipher> ciphers = new List<ICipher>() {
        new CaesarCipher(1),
        new FlipFlopCipher(
                new CaesarCipher(1),
                new CaesarCipher(-1)),
        new LeetCipher(),
};
ICipher cipher = new CycleCipher(ciphers);

Console.WriteLine(cipher.Encode("AAAAAA"));
Console.WriteLine(cipher.Encode("Leet"));
```

## Bonus Challenge

If you're feeling on a roll, here's a more difficult challenge for you 😎.
Add the signature `char Decode(char input)` to the interface `ICipher` and implement it in all classes that implement the interface.
Then add a default method to the interface `ICipher` with the signature `string Decode(string decode)`.

Trust yourself. You've got this! 👊🌟

