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

# Iteration

%- TODO: Remember to use the term "iteration statement" since we didn't use that term in the Statements chapter.

%- while
%- for
%- foreach
%  - Also works with IEnumerable but we’ll talk about this later.
%- Infinite loop. Will talk about stack overflow later.

## Motivation

(DRY)=
A key idea in programming is the maxim: "don't repeat yourself".
The idea is that code should not be duplicated.
We should never write the same thing twice.

```{epigraph}
Don't repeat yourself. (DRY)
```

If we write the same code multiple times, then there's a higher risk that we'll introduce bugs.
Even if we manage to not introduce bugs the first time we're duplicating code we'll have to exercise the same level of extreme caution as seoon as we want to change the duplicated code.
If we duplicate an idea in multiple places, then we have to change that idea in all places everytime we want to change it.

Think about it.
Let's say that you and I have a meeting at 8.00 tomorrow and I make a note of this appointment in both my calendar and my reminder app.
If you then call me and say that you have to reschedule to 10.00 then I better remember to change both of my notes or hope that whenever I want to remind myself of which time we're going to meet I happen to check whatever note has the correct time.
Not ideal.
Try to think in terms of single sources of truth.
Things should only be said once.

However, sometimes we do want to do things multiple times.
The solution to duplication can be summed up in one word: abstraction.
One such abstraction is that of iteration.
The realization is that it is to define, what is called, a "block" of statements and then state that this block must be executed as long as some condition remains true.

```{seealso}
We'll talk a lot more about questions like this in the chapter on [maintainability](maintainability) and those that follow it.
So don't worry, there's a lot more to discuss here.
```


## Definition

In imperative languages we often find at least four basic iteration statements.
In C# we have:

- The `for` statement which executes a block for as long as some condition remains true, given some initializer, and some iterator.
- The `foreach` statement executes a block for each element in a collection such as an [array](arrays).
- The `do` statement executes a block *one* or more times as long as some condition remains true.
- The `while` statement executes a block *zero* or more times as long as some condition remains true.


```{warning}
Work in progress.
```

%### The `for` statement

%### The `foreach` statement

%### The `do` statement

%### The `while` statement


## Examples

(iteration-reverse)=
### Reverse cipher

Let's use another cipher as an example.
In the chapter on algorithms we discussed the simple idea of a [reverse cipher](reverse-cipher).
Not the most effective cipher in terms of "hiding" the contents of a message, but a cipher nonetheless.

Looking at the pseudo code in the [algorithms](reverse-cipher) chapter we conclude that one way to implement this cipher is to iterate over the `string`, one character at a time, backwards and append each character to the `string` one by one.

(string-indexers)=
To access individual elements of a string we must make a quick detour into something called [indexers](indexers).
That is a concept which we'll talk about in a much later chapter.
However, the short story is that, since the type `string` has an indexer defined, it is possible to access the individual `char` elements that make up a `string` using bracket notation.

Let's for example say that we have a `string` called `msg` that contains the the value `"hello"`.

```{code-cell} csharp
string msg = "hello";
```

We can then use bracket notation to extract individual `char` elements from the `string`.

```{code-cell} csharp
Console.WriteLine( msg[1] );
```

Using this knowledge we can turn our pseudo code algorithm into an actual algorithm.
First, let's define our input variable.
Let's use the word "DOG" as input.

```{code-cell} csharp
string input = "DOG";
```

Then we declare a new `string` called `output` to which we will append our characters one by one.
Notice also that we initialize the string to an empty string so that it is not `null`.

```{code-cell} csharp
string output = "";
```

Then let's iterate using a `for` statement.
Allow me to dissect the three parts of the loop for you.

1. First we declare the variable `i` and initialize it to the number equal to the length of the `input` string minus `1` since that's the index of the last character in the string.
2. Then we specify that the condition for running the loop another lap is that `i` must be equal to or greater than `0` which is the index of the first letter in the `string`.
3. Last, we state that at the end of each lap in the loop, the variable `i` must be decremented by `1`.

```{code-cell} csharp
for (int i=input.Length-1; i>=0; i--)
  output += input[i];
```

In the block that is to be executed upon each lap of the loop, the "body" of the loop, we simply take whatever character is at index `i` in the `input` string and append it to the `output` string.
In the end, all that's left, is printing the `output`.

```{code-cell} csharp
Console.WriteLine(output);
```

The whole program looks like this:

```{code-cell} csharp
string input = "DOG";
string output = "";

for (int i=input.Length-1; i>=0; i--)
  output += input[i];

Console.WriteLine(output);
```



(iteration-robbers)=
### Robber's language

Let's pick a different cipher now.
Remember how we wrote a program that translated individual characters into the [Robber's language](robbers-language) in the chapter on [selection](selection-robbers)?
Let's take that code and wrap it in a `foreach` loop so that we get a program that can translate a full `string` rather than just individual characters.

```{code-cell} csharp
string input = "DOG";
string output = "";

foreach (char letter in input)
{
  output += letter switch
  {
    'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
      => $"{letter}O{letter}",
    _ => letter
  };
}

Console.WriteLine(output);
```



## Exercises

```{exercise}
What is iteration?
Explain using your own words.
```

```{exercise}
Give a code example of each of the following four ways of iterating in C#:

1. The `for` statement.
2. The `foreach` statement.
3. The `do` statement.
4. The `while` statement.
```

```{exercise}
There are at least four ways of iterating in C#.
When should we prefer what way of the ones listed below.
Explain using examples but without writing code.

1. The `for` statement.
2. The `foreach` statement.
3. The `do` statement.
4. The `while` statement.
```

```{exercise-start}
:label: ex:iteration-leet
```
In {numref}`ex:selection-leet` we wrote a program that can encode any given `char` in the Leet language.
Take inspiration from the other ciphers we built in this chapter and write a new program that can take a full string as input.

If your program starts with:

```csharp
string input = "HELLO LEET WORLD";
char vowel = 'o';
string output = "";
```

then it should print:

```output
H3110 1337 W0R1D
```
```{exercise-end}
```


```{exercise-start}
```
Rewrite all cipher programs from this chapter (Reverse, Robber's, and Leet) so that they read their `string` input from the user using `Console.ReadLine` instead.

````{admonition} Get a compiler warning?
:class: dropdown tip
As we will learn when we get to [null state static analysis](null-state-static-analysis), when compiling this program, you might get a compiler warning saying:

```
warning CS8600: Converting null literal or possible null value to non-nullable type.
```

The reason for this is that `Console.ReadLine` returns a nullable `string?` rather than a non-nullable `string` and that you are compiling your code with the setting `<nullable>enable</nullable>`.
To get rid of this warning we have to first check whether the result of calling `ReadLine` is `null` before using it.
Like this:

```csharp
string input = Console.ReadLine();
if (input != null)
{
  // Do something with input here...
}
```

But, don't worry if this doesn't make sense to you yet.
We'll talk about [nullable reference types](nullable-reference-types) and [null state static analysis](null-state-static-analysis) in due time.
I just wanted to let you know what this warning means if you happen to get it.
````
```{exercise-end}
```

