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

# Solution: Lambdas

Sure, let's go through the steps:

## Step 1: Type Inference

```{code-cell}
Func<int, int, int> add = (x, y) => x + y;
Predicate<int> isEven = x => x % 2 == 0;
Action<string> printString = s => Console.WriteLine(s);
```

## Step 2: Inferring return type

```{code-cell}
var square = (double d) => d * d;
var concatenate = (string a, string b) => a + b;
var multiply = (int x, int y) => x * y;
var startsWithUppercase = (string s) => Char.IsUpper(s[0]);
```

## Step 4: Custom Delegate Inference

```{code-cell}
delegate string ToggleCaseDelegate(string s);

ToggleCaseDelegate toggleCase = s =>
{
    char[] chars = new char[s.Length];
    for (int i = 0; i < s.Length; i++)
    {
        if (char.IsUpper(s[i]))
            chars[i] = char.ToLower(s[i]);
        else
            chars[i] = char.ToUpper(s[i]);
    }
    return new string(chars);
};
```

### Reflection

Type inference in lambdas can significantly reduce the verbosity of the code, making it more concise and readable. Situations where it might be helpful include:

1. When writing short and straightforward lambdas where the intent is clear.
2. When working with LINQ or other libraries that involve a lot of delegate use, making the code more readable.

However, there can be instances where type inference might be less useful or potentially confusing:

1. In more complex lambdas where the inferred types aren't immediately clear, which can lead to confusion.
2. When working with multiple overloaded methods, and type inference doesn't clearly indicate which method is being used.
3. When working with a team where explicit typing might be preferred for clarity or coding standards.

In general, like many features, type inference is a tool that's valuable when used judiciously and in the right contexts.

## Challenge

```{code-cell}
var sum = (int x, int y) => x + y;
var isPositive = (int num) => num > 0;
var printLine = () => Console.WriteLine();
var greet = (string name) => Console.WriteLine($"Hello, {name}!");
var areSimilar = (string a, string b) => a.ToLower() == b.ToLower();
```


