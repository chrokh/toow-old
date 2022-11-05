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

# Selection


## Motivation

If all programs were linear, programming would not be very useful.
What's the point of having an image editor if all it can do is give me the same image all the time?
What's the point of having a word processor if all it can do is give me the same document all the time?
To write any useful program, we need branches.

Programs are not like lines, they are more like trees, or rather graphs.
Most programs sprawl into a wild number of directions as soon as you start them up.

% TODO: Insert image
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:programs-are-like-graphs
%
%Programs are not like lines, they are more like trees or graphs.
%``

Just think of any old app or website where you have an account.
When you login you enter your credentials.
Possibly a username and password.
If the username and password match a record in the database, then voilà, you're inside.
If they don't match, then you're not allowed to enter.



(ternary-operator)=
## Definition

Think about the way we're using words here.
We're saying that *if* some condition is true *then* something happens.
If however the condition is false, then something else happens.
The word "if" is followed by the word "then".

In imperative languages we usually find at least two kinds of selection statements:

- The `if` statement.
- The `switch` statement.

In imperative languages we also often find conditional operators and/or selection expressions.
In C# we have one selection expression:

- The ternary operator.

% TODO: Check for even odd with remainder operator.

In C# we also have one selection expression:

- The `switch` expression.

In this section we will define all these and in the next we will give examples of them.



### The `if` statement

An `if` statement has the following form:

```
if (condition)
{
  consquent
}
```

The curly brackets define the "block" of statments that is to be executed if the condition happens to be true.
If your consequent only consists of a single line then you can omit the curly brackets that delimit the block and instead use [indentation](indentation).

```
if (condition)
  consequent
```

The condition must be an [expression](expressions) that evaluates to a [boolean](simple-types).

What happens if the condition isn't true?
Well, then the statements in the block aren't executed.
Can we define a different block to execute if the condition happens to be false?
Yes, we certainly can.
In most imperative languages this is defined by using the keyword `else`.

```
if (condition)
{
  consequent
}
else
{
  alternative
}
```

Again, we can omit the curly brackets if we only want to execute single statements.

```
if (condition)
  consequent
else
  alternative
```

But what if we have more things to check?
Can you nest conditions?
Sure.

```
if (condition1)
  consequent1
else
  if (condition2)
    consequent2
  else
    if (condition3)
      consequent3
    else
      consequent4
```

But, since this is such a common thing to do, there's also the `else if` keyword.
The example above is equivalent to the example below.

```
if (condition1)
  consequent1
else if (condition2)
  consequent2
else if (condition3)
  consequent3
else
  consequent4
```

Notice how the usage of `if else` allows us to avoid ever increasing levels of indentation.
As you might have suspected we can stack any number of `else if` statements after each other.

```{caution}
If statements are executed from the top down.
This means that as soon as a matching condition is found, all other `else if` and `else` branches are ignored.
```

(switch-statements)=
### The `switch` statement

A switch statement matches an expression of your choice against a pattern of your choice in order to select which path to take.
This is a process known as [pattern matching](pattern-matching) and we'll discuss it in more detail later.
You can find a list of supported patterns in the [documentation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns).

The different cases of the switch statement are checked one-by-one from the top down.
As soon as our expression matches a pattern we enter into that branch and start executing the list of statements that defined there.

In the example below you can see how we use the keyword `break`.
This keyword is required in C# does not support what is known as "fall-through".
Languages that support fall-through would, in the absence of a `break` keyword, keep checking cases even after it had found a match and executed some code.
An example of a language that support fall-through is JavaScript.

```{note}
We have not talked about [methods](methods) yet, but if we use a `switch` statement in the body of a method and we `return` whenever we've found a match then we don't need to use the `break` keyword.
```

```{code-cell}
char input = 'A';

switch (input)
{
  case 'A':
    Console.WriteLine("The letter is A.");
    break;
  case 'B':
    Console.WriteLine("The letter is B.");
    break;
  case 'C':
  case 'D':
  case 'E':
    Console.WriteLine("The letter is C, D, or E.");
    break;
  default:
    Console.WriteLine("The letter is something else.");
    break;
}
```


(switch-expressions)=
### The `switch` expression

The `switch` expression essentially works like a `switch` statement with one key difference.
All cases must yield a single [expression](expression).

Think about it, when we use a `switch` statement then we can do any number of things whenever we find a match.
A `switch` *statement* selects a list of statements to execute.
We can print to screen, write to file, ask the user for input, and so forth.
A `switch` *expression* however selects an expression to evaluate.
This means that we can take the result of a `switch` *expression* and, for example, assign it to a variable.

To create a `switch` expression rather than a `switch` statement we say `expression switch { ... }` rather than `switch (expression) { ... }`.
In a `switch` expression we don't have to explicitly use the keyword `case`.
We use the commas (`,`) to delimit cases, which are known as "expression arms".
We use the symbol known as "fat arrow" (`=>`) instead of colon (`:`).

If we want to let multiple patterns result in the same expression then we can use a [logical pattern](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns#logical-patterns), like `or`.
But more on this in the chapter on [pattern matching](pattern-matching).


```{code-cell} csharp
char input = 'A';

string output = input switch
{
  'A' => "The letter is A.",
  'B' => "The letter is B.",
  ('C' or 'D' or 'E') => "The letter is C, D, or E.",
  _ => "The letter is something else.",
};

Console.WriteLine(output);
```



### The ternary operator

The difference between an `if` statement and the ternary operator is like the difference between a `switch` statement and a `switch` expression.
The former results in statements and the latter in an expression.

The ternary operator checks whether some expression evaluates to `true` and if it does evaluates the first expression, otherwise it evaluates the second.
The syntax is as follows:

```
condition ? consequent : alternative
```

Let's take an example.

```{code-cell}
char input = 'A';
string msg = (input == 'A') ? "Letter is A." : "Letter is something else";
Console.WriteLine(msg);
```

The parenthases in the above example are not necessary.
They are merely used here for added readability.

When you have a long ternary expression, some choose to format it over multiple lines like in the example below.

```{code-cell}
char input = 'A';

string msg = input == 'A'
  ? "Letter is A."
  : "Letter is something else";

Console.WriteLine(msg);
```




## Examples

Let's look at a few examples of what we can do with selection statements and conditional operators.


(selection-robbers)=
### Robber's language

Let's talk about the [Robber's language](robbers-language) that we described in the chapter on [algorithms](algorithms).
Let's say that we've got a character stored in a variable called `input` of type `char`.
Our goal is to encode this input character into the Robber's language and then print the result to screen.
For the sake of the example, let's let it contain the value `L` but let's write our code so that we can change it to something else later.

```{code-cell} csharp
char input = 'L';
```

Recall, that when encoding a letter into the Robber's language, we must first determine whether that letter is a consonant or a vowel.
If it is a vowel then we will simply return the input character, but if it's a consonant then we must repeat the consonant with the vowel `'o'` in between.

Ok, so in pseudo code, this is sort of what we want to do:

```
if (input is consonant)
  print concatenation of input, vowel, input
else
  print input
```

At this point you might think to yourself, hey I know what's smarter.
What if we just check if the letter is a vowel instead of checking whether its a consonant?
Since there are way fewer vowels than consonants it will be much easier to write that conditional.
Unfortunately that will not work, since the data type `char` support a ton of characters beyond vowels and consonants, such as symbols like `!`, `%`, `_`, and so forth.
If we had a data type called something like `Letter` where all elements were either consonants or vowels that would be a fine strategy, but unfortunately we don't have such a data type.
We'll talk more about the nature of this kind of problem in the chapter on [types over tests](types-over-tests).

Ok, so let's check for consonants.
Let's use a switch to avoid having to repeat the name of the variable that we want to check against.

```{code-cell} csharp
switch (input)
{
  case 'B': case 'b': case 'C': case 'c': case 'D': case 'd': case 'F': case 'f': case 'G': case 'g': case 'H': case 'h': case 'J': case 'j': case 'K': case 'k': case 'L': case 'l': case 'M': case 'm': case 'N': case 'n': case 'P': case 'p': case 'Q': case 'q': case 'R': case 'r': case 'S': case 's': case 'T': case 't': case 'V': case 'v': case 'W': case 'w': case 'X': case 'x': case 'Y': case 'y': case 'Z': case 'z':
    Console.WriteLine($"{input}o{input}");
    break;
  default:
    Console.WriteLine(input);
    break;
}
```

If you're thinking to yourself that this is a mess of a switch statement and that you weren't expecting programming to be this messy then hold your horses.
We'll refactor this code plenty of times before we're done.
This is only the beginning and we simply don't have enough tools in our toolbox yet.

````{note}
The expression `$"{input}o{input}"` is using a feature known as "[string interpolation](string-interpolation)" which we're going to talk about in the chapter on [syntactic sugar](syntactic-sugar).
By prepending a dollar-sign (`$`) to a string we can intermingle variable names wrapped in curly brackets (`{variableNameHere}`) and they will be replaced by their respective values.

If we didn't use string interpolation and wanted to use normal [string concatenation](string-concatenation) we would have to explicitly convert our `input` that's of type `char` to a value of type `string` since the concatenation operator otherwise would be interepreted as addition of character codes.

Compare the following examples.

```csharp
'a' + 'b'  // Evaluates to 195
"a" + "b"  // Evaluates to "ab"
Char.ToString('a') + Char.ToString('b') // Evaluates to "ab"
```
````

The variable `input` contained the value `'L'`, which is a consonant, and hence matches the first leg of our switch statement.
The program therefore executes the block associated with that first leg which involves printing the result of concatenating the input value, the letter `o`, and then the input value again.
All this, causes the value `"LoL"` to be printed to screen.

Had the variable instead contained the value `'A'` the program would simply have printed that same letter.
Had the variable instead contained the value `'w'` the program would have printed `wow` and so forth.

If we felt so inclined we could of course also use a switch expression instead of a switch statement.
In that case the whole program would look something like this:

```{code-cell} csharp
char input = 'L';
Console.WriteLine(input switch
  {
    'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
      => $"{input}o{input}",
    _ => input
  });
```




## Exercises

```{exercise}
What is selection?
Explain using your own words.
```

```{exercise}
Give a code example of each of the following four ways of doing selection in C#:

1. The `if` statement.
2. The `switch` statement.
3. The `ternary` operator.
4. The `switch` expression.
```

````{exercise}
:label: ex:selection-is-vowel
Assume that you have a variable called `letter` of type `char` but you don't know what value it contains.
Write a program that prints `VOWEL` if the letter is a vowel and `CONSONANT` if the letter is a consonant.

If your program starts like this:
```csharp
char letter = 'A';
```
then when you run it, it should print:
```output
VOWEL
```
````

```{exercise-start}
:label: ex:selection-leet
```
Remember the Leet language that we talked about in the chapter on [algorithms](leet-language)?
Much like the Robber's language the Leet language encodes the string by replacing character by character.
In other words, it too is a substitution cipher.

Write an implementation that can translate any given `char` into a new `char` using the above scheme.

Remember the characters that aren't present in the scheme should just be passed through.
So if we give the program the character `A` it should print `4`.
If we give the program the character '4' then it should print 'A'.
If we give the program the character `3` it should print `E`.
And so forth.
For a complete list of translations, go back to the [definition](leet-language).

Have a look at our implementation of the Robber's language for inspiration.

If your program starts like this:
```{code-cell}
char input = 'L';
char vowel = 'o';
// ....
```
then when you run it, it should print:
```output
LoL
```
```{exercise-end}
```

````{solution} ex:selection-leet
:hidden:
```csharp
char input = 'L';
char vowel = 'o';

switch (input)
{
  case 'A': Console.WriteLine('4'); break;
  case '4': Console.WriteLine('A'); break;
  case 'I': Console.WriteLine('1'); break;
  case '1': Console.WriteLine('I'); break;
  case 'L': Console.WriteLine('7'); break;
  case '7': Console.WriteLine('L'); break;
  case 'E': Console.WriteLine('3'); break;
  case '3': Console.WriteLine('E'); break;
  case 'O': Console.WriteLine('0'); break;
  case '0': Console.WriteLine('O'); break;
  default: Console.WriteLine(input); break;
}
```
````
