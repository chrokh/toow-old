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

% TODO: Algorithms chapter claims that we talk about "parameterization" here.
% TODO: Parameter vs argument


(local-functions)=
# Methods

```{warning}
Work in progress.
```

## Motivation

Remember the design principle "[don't repeat yourself](DRY)"?
The more code we repeat, the more likely we are to introduce bugs.
Remember how we said that the way we avoid duplicating code is by increasing abstraction?
Well, one such abstraction is that of the procedure, method, or function.

The idea of the procedure, method, or function, is, in procedural programming, that we can take a sequence of statements, give that sequence a name, and then whenever we want to execute that sequence we just issue the name.

```{note}
I prefer using the word "method" rather than "function" in the context of object oriented programming since functions in imperative languages tend to be [impure](purity).
We'll talk about what that means in a separate chapter but in short, a pure function is a function that, given the same input, always returns the same output.
But, since functions/methods in C# can depend on and change state, they are not pure.
But I digress, we'll talk more about this in the chapter on [purity](purity).

The reason I bring this up is that while I would prefer using the term "method", we're now going to use a feature of C# called "local functions".
```


## Definition

Let's look at what C# calls local functions.
Local functions are private methods nested inside another member like a method or a constructor for example.

```{note}
Wait a minute!
What are these strange words?
Private, member, constructor.
Why are we starting here?

Well, perhaps you remember how we in the chapter on [compilation](top-level-statements) discussed how C# supports something called "top-level statements" which allow you to just start writing code without having to define a main class and a static main method.
It's not that the main method doesn't exist, it's just that it's generated for you.

So, what should you take away from all this nonsense?
When we're using top-level statements and start defining methods without making them members of a class then they will be either local functions or [lambda expressions](lambdas) which we'll talk about much later.
```

A local function consists of four parts that we must understand.

1. A name.
2. A return type.
3. A list of parameters with types.
4. An implementation.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:local-method

A local function consists of four parts: A name, a return type, a list of parameters, and an implementation.
```

In the code example below we're defining a local function called `add` which takes two parameters of type `int` and returns a value of type `int`.

```{code-cell} csharp
int add (int x, int y)
{
  return x + y;
}
```

(function-signature)=
(method-signature)=
### Signatures

Think back to the chapter on [functions over sets](functions).
The type of this function, can from a set perspective, be described as:

$$
\mathit{add} : (\mathbb{Z} \times \mathbb{Z}) \rightarrow \mathbb{Z}
$$

Writing out the type of the function in C# syntax we would say:

```csharp
int add (int x, int y)
```

In C# we refer to this as the "signature" of the function or method.
Depending on the context in which we use the word signature, the return type is either included or not included.

Learning to read function/method signatures is vital when learning C#.
First, they allow us to understand how we should call a particular function or method.
But beyond that, as we shall see in later chapters, signatures are a key component of [overloading polymorphism](overloading) and [subtype polymorphism](subtype-polymorphism).

### Invocation
So how do we apply this function to some arguments?
How do we, as we say, "call" it, or "invoke" it?
When we call the function we pass arguments to it.
In terms of terminology, an "argument" is used in place of a "parameter".

Let's say we want to add the numbers `1` and `2`.
Well, we simply apply the function, just like we would in mathematics.
We state the name of the function, an opening parenthasis, whatever values we want to pass as arguments for the parameters separated by comma, and close the parenthasis.
Voilà, we've called the function.

```{code-cell} csharp
add(1, 2);
```

Let's call it again but let's print out the result this time to make sure that it does what we expected it to do.

```{code-cell} csharp
int result = add(10, 20);
Console.WriteLine(result);
```

### Return values

How did we get that value out of the function?
Well, notice how we used the keyword `return` in the definition of the function.

The keyword `return` is in C# known as a "jump statement" since it transfers control to another section of the code.
More precisely, it returns control to wherever the method was called.
However, it also takes whatever value we put to the right of the `return` keyword and replaces our method call with that value.

```{caution}
As soon as we use the `return` keyword, the method stops executing.
Inserting a return statement before the end of the method is known as an "early return" and is sometimes a useful way of simplifying code.
```
% TODO: Example of early return.


% TODO: Make its own chapter?
### Expression-bodied members

In C# there's this feature known as expression-bodied members.
This feature allow us to express implementations using a much more compact syntax.

If you've got an implementation that only consists of a single expression then you can use the expression-bodied member syntax.
As we shall see in future chapters we can also use this syntax to define [static methods](static-methods), [instance methods](instance-methods), [properties](properties), [constructors](constructors), and [indexers](indexers).

We can redefine our `add` method using expression-bodied member syntax like this:

```{code-cell} csharp
int add (int x, int y) => x + y;
```

Notice how the `return` keyword is no longer needed since the function returns whatever the single expression returns.
Notice also how there are no curly brackets needed since there's no block that needs delimiting.

Of course we can still call it the same way:

```{code-cell} csharp
Console.WriteLine( add(100, 200) );
```

### Void

What if you want to write a procedure that simply does something but doesn't return something.
What would be an example of such a procedure?
Well, how about `Console.WriteLine` that we've been using so frequently.

The return type of `WriteLine` is the special type `void` of which there are no values.
In the case of `WriteLine` this makes sense since we're not looking to get a value back but rather to have something printed to screen.
We call this a "side effect".
When we're calling `WriteLine` we're looking for the side effect of having whatever we pass it printed to the screen.

We cannot declare a variable of type `void` and so we cannot ever store the result of invoking a function/method that returns `void`.



## Examples


```{warning}
Work in progress.
```


### Reverse cipher

It should be possible to wrap all ciphers that we've defined up to this point in methods.
Let's start with the Reverse cipher.
We'll simply take the code we wrote in the chapter on [iteration](iteration-reverse) and wrap it in a local function.
But of course, we'll expose the `input` variable of type `string` as a parameter.

```{code-cell} csharp
string reverse (string input)
{
  string output = "";
  for (int i=input.Length-1; i>=0; i--)
    output += input[i];
  return output;
}
```

Simple enough.
Let's try it out.

```{code-cell} csharp
Console.WriteLine( reverse("desserts") );
```

Seems to work.
Could we rewrite it as a single expression and hence an expression-bodied member?
No.
But eventually we will, we just have to learn more tricks first.


### Robber's language

Let's now go for the Robber's language.
Let's wrap the code we wrote in the chapter on [iteration](iteration-robbers) in a method and let's make the `input` variable of type `string` a parameter.

```{code-cell} csharp
string robbersEncode (string input)
{
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
  return output;
}
```

Does it work?
Sure does!

```{code-cell} csharp
Console.WriteLine( robbersEncode("DOG") );
```

But we can go further than this.
Let's think like programmers.
Let's look for opportunities to generalize and parameterize.
Why have we hard-coded the vowel that we stick in between consonants?
Who says that that must be fixed.
Let's just make that a parameter as well.


```{code-cell} csharp
string robbersEncode (string input, char vowel)
{
  string output = "";
  foreach (char letter in input)
  {
    output += letter switch
    {
      'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
        => $"{letter}{vowel}{letter}",
      _ => letter
    };
  }
  return output;
}
```

Does it still work?
Absolutely.
But now that we call it we have to also supply a `char` that will play the role of the `vowel`.

```{code-cell} csharp
Console.WriteLine( robbersEncode("dog", 'e') );
```

```{code-cell} csharp
Console.WriteLine( robbersEncode("bird", 'a') );
```

It seems to work!
But it's a really long method.
Let's see if we can decompose it into multiple methods to improve its [maintainability](maintainability).

How about splitting the problem into two parts?
One method could be responsible for iterating over the `string`, character by character, and the other method could be responsible for encoding any given character.
A character can be represented using the `char` data type.
Seems reasonable enough, let's try it.

Here's a method that encodes a single character:

```{code-cell} csharp
string robbersEncodeChar (char input, char vowel)
  => input switch {
    'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
      => $"{input}{vowel}{input}",
    _ => $"{input}"
  };
```

Since we were using a [switch expression](switch-expressions) rather than a [switch statement](switch-statements), the whole implementation of this local function turned out to be a single expression.
Which in turn means that we can use the shorter expression-bodied member syntax to compact the function even further by getting rid of the `return` keyword and curly brackets.

```{caution}
Notice how we, in the code above, in the default (wildcard) case, return `$"{input}"` instead of simply `input`.
This is because `input` is a `char` but we need to return a `string`.
In other words we need to somehow [convert](type-conversions) the value from type `char` to type `string`.
Usually we would do this by calling the [instance method](instance-methods) `ToString()` but since we haven't talked about instance methods yet I chose to do it through [string interpolation](string-interpolation) which we *have* talked about.

How come we didn't have this problem before?
Well, because previously we never actually assigned a value of type `char` to a variable of type `string` directly.
Instead we either concatenated the `char` to a `string` using the concatenation operator `+` or we printed the `char` directly to screen using `Console.WriteLine`.
In both cases, under the hood, this makes use of something known as [overloading](overloading).
We'll learn more about that later.
```

Ok, but does our `char` encoding method work?
Indeed.

```{code-cell} csharp
Console.WriteLine( robbersEncodeChar('m', 'u') );
```

```{code-cell} csharp
Console.WriteLine( robbersEncodeChar('a', 'u') );
```

Let's now write the method that takes a whole `string` and applies the `char`-wise cipher to each individual character in order and then concatenates the result.

```{code-cell} csharp
string robbersEncodeString (string input, char vowel)
{
  string output = "";
  foreach (char letter in input)
    output += robbersEncodeChar (letter, vowel);
  return output;
}
```

```{tip}
When [refactoring](refactoring) (rewriting) your code, always make sure that it still works at every possible opportunity.
Discovering bugs sooner rather than later makes them much easier to fix.
```

Let's try it in action.

```{code-cell} csharp
Console.WriteLine(
  robbersEncodeString("Attack at dawn!", 'a'));
```

Ok, so that's better.
In programming jargon we would say that we've "separated concerns".



### Caesar cipher

So far so good.
But we've talked about more ciphers than the Robber's language.
Remember the [Caesar cipher](caesar-cipher)?
If we were to write an implementation of it using only the skills we have learned up to this point, the implementation would be necessarily complicated.
For that reason we're going to postpone writing an implementation for now.

However, what I want to draw your attention to is that it would be quite possible to write an implementation of it that is based around two very similar methods.
We could decompose the problem in the same way.
One method is responsible for encoding a single character, while one method is responsible for iterating over the whole `string`, delegataing to the character-converting method, and then concatenating the result.

We've parameterized the Robber's language over the vowel we stick in between consonants.
A Caesar cipher however ought to be parameterized over the number of steps to move in the alphabet.
Let's represent that with an `int`.

```csharp
string caesarEncodeString (string input, int steps);
char caesarEncodeChar (char input, int steps);
```

Hmm... If we manage to implement `caesarEncodeChar`, the implementation of `caesarEncodeString` ought to be trivial.
Have a look at the code below:

```{code-cell} csharp
:tags: [remove-input]
char caesarEncodeChar (char letter, int steps)
  => throw new NotImplementedException();
```

```{code-cell} csharp
string caesarEncodeString (string input, int steps)
{
  string output = "";
  foreach (char letter in input)
    output += caesarEncodeChar (letter, steps);
  return output;
}
```

Does this code remind you of anything?
It is eerily similar to `robbersEncodeString` right?
What are the differences?
There are essentially three.

1. The parameters (beyond the input `string`) varies.
2. Which character-replacing method we call varies.
3. One of the character-replacing methods returns a `string` while the other returns a `char`.


### Leet language

But the eerie similarties doesn't stop here.
Remember the [Leet language](leet-langauge) that you wrote a program for in {numref}`ex:iteration-leet`?

Let's say we choose the same strategy as with the Caesar cipher and the Robber's language and decompose the problem into two subproblems.
One method is responsible for determining what character to replace any given single character with.
The other method is responsible for iterating over the characters of a `string` and calling the other method for each character one by one.

I won't show how to write the method that converts any given `char` since that's your job in {numref}`ex:methods-leet`.
However, the `string`-encoding method ought to look like this:

```csharp
string leetEncodeString (string input)
{
  string output = "";
  foreach (char letter in input)
    output += leetEncodeChar (letter);
  return output;
}
```

So much duplicated code!
Argh!
Now we've got three cases of, air quotes, pretty much the same code.
Looks like a prime candidate for using methods to eliminate duplication.

Think about this for a moment, and you'll realize that whenever we want to build a new cipher that encodes on a character-to-character basis, we'll have to repeat this code.
Some parameters vary, and some character-encoding methods return values of type `char` while other return values of type `string`.

Remember the principle [DRY (don't repeat yourself)](DRY)?
This repetition is not ideal.
So how do we get rid of this duplication?


(methods:substitution-ciphers)=
(methods-substitutions)=
### Substitution ciphers

Let's think about our use case a bit more.
It turns out that in the world of cryptography there's this concept known as a "substitution cipher".
The one thing such ciphers have in common is that they encode their input "chunk by chunk".
If that chunk happens to be a single character then it's known as a "simple substitution cipher".

All ciphers are *not* substitution ciphers of course.
Think of the simple reverse cipher that we discussed.
Reversing is not a substitution cipher but, what is known as, a "transposition cipher".
In transposition ciphers we *rearrange* letters while in substitution ciphers we *substitute* letters.

In order to avoid an explosion of methods that repeat the same task over and over again, we need to turn something into data so that we can parameterize our methods and thus pass the variation as an argument.
That is, *unless we are writing our code in an object oriented style and use subtype polymorphism*.

How come we don't have to turn something into pure data when doing it in an object oriented style?
Because objects mix data and methods and support subtyping.
If you mix data and methods then you have a way of passing around methods.
And if you can subtype then you can pass around vastly different methods.
But it's too soon to talk about those things.
Don't worry, we'll get there eventually.

```{seealso}
It should however be noted that in the functional programming paradigm functions are, what we call, first-class citizens.
This means that you can pass around functions as if they were data.
It should be noted that this is a non-issue in functional programming languages since functions are first-class citizens.
To pass around methods in C# we would have to use [delegates](delegates) but this is not as powerful as what we get in functional programming because we lack the ability to do partial application.
```

But let's get back on track.
What I want you to take away from this discussion is this:

```{important}
With simple static methods you often reach a point where you will have to figure out a way to turn your *algorithms* into *data* if you want to elimnate further duplication.
```

Turning methods into data, what would that look like?
Well, think about it.
We said that these ciphers are simple substitution ciphers that substitute a character for a character.
So what if we use an [array](arrays) of [tuples](tuples) where the first value of each tuple is that character that we want to replace, and the second is the replacement.
%Let's call the former the `Pattern` and the latter the `Replacement`.

With such an array of substitutions we can simply iterate over each `char` in the input `string`, and then iterate over each substitution in the array of substitution, and check if the character matches the pattern of the substitution.
If it does then replace the character with the substitution and otherwise we just continue.
Simple enough right?
Let's implement it, but let's again separate the two jobs of iterating over a whole `string` and determining replacement character for a given character.

```{code-cell} csharp
char substituteChar (char input, (char, char)[] substitutions)
{
    foreach ((char, char) substitution in substitutions)
        if (substitution.Item1 == input)
            return substitution.Item2;
    return input;
}

string substituteString (string input, (char, char)[] substitutions)
{
    string output = "";
    foreach (char c in input)
        output += substituteChar(c, substitutions);
    return output;
}
```

Does it work?
Yes, it does.
Have a look below.

```{code-cell} csharp
(char, char)[] substitutions = new (char, char)[] {
  ('L', '1'),
  ('E', '3'),
  ('T', '7'),
};
```

```{code-cell} csharp
Console.WriteLine( substituteString("LEET", substitutions) );
```

```{code-cell} csharp
Console.WriteLine( substituteString("LOL", substitutions) );
```


### Expanding substitutions

Before we leave this idea of treating substitutions as data there's one more thing we have to talk about and it's related to Caesar ciphers.

In any given substitution, the Caesar cipher returns a single `char` when given a single `char`.
The Robber's language sometimes return multiple characters, or rather a `string`.
The Caesar cipher has type `char -> char` while the Robber's language has type `char -> string`.
%Or in C# syntax: `char Encode (char input)` compared to `string Encode (char input)`.
It looks something like this:

Why does this matter?
Think about it.
How would we use the method `substituteChar` to run a Robber's language cipher?
It's not possible.
The signature of that method is:

```csharp
char substituteChar (char input, (char, char)[] substitutions)
```

But we know that a Robber's cipher, when taking a character as input must return a `char`.
This also means that each substitution must have the type `(char, string)` and not `(char, char)`.
Taking this together the method would look something like below.

```{code-cell} csharp
string substituteCharUsingString (char input, (char, string)[] substitutions)
{
  foreach ((char, string) substitution in substitutions)
    if (substitution.Item1 == input)
      return substitution.Item2;
  return $"{input}";
}
```

Oh no!
We're back in the land of duplication.
This looks way too much like the implementation `substituteChar` right?

One way of dealing with this duplication involves realizing that any `char` always can be converted into a `string`.
Which in turn means that any `(char, char)` tuple can be turned into a `(char, string)` tuple.
Which in turn means that any array of substitutions on the form `(char, char)[]` can be turned into an array of type `(char, string)[]`.
Finally, since the method `substituteString` returns a `string` anyway, we might as well convert its input substitutions from `(char,char)[]` to `(char,string)[]` and then simply call `substituteCharUsingString` for each character substitution instead.
This however only eliminates the duplication between the two methods that take strings as input.

%You'll get the exciting but slightly mind-bending task of eliminating this duplication using this strategy.
%However, since the names are getting too long and confusing at this point we'll postpone this exercise until we've learned about [overloading](overloading) so that we don't have to come up with so many unique method/function names.




## Exercises

```{exercise}
In the context of local functions or methods, define what the following terms mean using your own words.

1. The *name* of a function/method.
2. The *return type* of a function/method.
3. The *list of parameters* of a function/method.
4. The *implementation* of a function/method.
```

```{exercise}
What is the difference between a method/function that returns `null` and one that returns `void`?
In what cases would you use one and in one what cases would you use the other?
```


```{exercise-start}
:label: ex:methods-char-to-int
```

Write a local function with the signature:

```csharp
int charToInt (char input);
```

The method should return a number that represents the character it was given, based on the scheme below.

```{code-cell} csharp
:tags: [remove-input, hide-output]
string letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

string output="";
for (int i=0; i<letters.Length; i++)
  output += $"{letters[i]} => {i}\n";

Console.WriteLine(output);
```

All other characters return `-1`.
```{exercise-end}
```



```{exercise}
Think back to the definitions of [total and partial functions](functions).
Is the function you've defined in {numref}`ex:methods-char-to-int` total or partial?
```


````{exercise}
:label: ex:methods-leet
In {numref}`ex:iteration-leet` we wrote a program that can encode any given `string` in the Leet language.
Take inspiration from the Robber's language cipher that we built in this chapter and write two local functions with the following signatures:

```csharp
char leetEncodeChar (char input);
string leetEncodeString (string input);
```

The local function that maps from `string` to `string` should call the local function that maps from `char` to `char`.
Think of how we split the problem in two methods when implementing the Robber's cipher.
Same thing here.

Please see the usage example below:

```csharp
Console.WriteLine(leetEncodeChar('A'));
Console.WriteLine(leetEncodeChar('5'));
Console.WriteLine(leetEncodeString("LEET 1015"));
```

```output
4
S
1337 LOLS
```

Note: In this exercise you are expected to implement the substitution algorithm directly *without* using the local functions `substituteChar` and `substituteString` that we defined earlier in this chapter.
````

```{exercise-start}
```
In this exercise we are going to implement the Leet language using the local function `substituteString` that we defined earlier in this chapter.
Declare and initialize a variable with the following name and type:

```csharp
(char, char)[] leetSubstitutions;
```

The variable should contain all the substitutions necessary for the Leet language.

```{code-cell} csharp
(char,char)[] leetSubstitutions = new (char,char)[] {
  ('A', '4'),
  ('4', 'A'),
  ('E', '3'),
  ('3', 'E'),
  ('L', '1'),
  ('1', 'L'),
  ('O', '0'),
  ('0', 'O'),
  ('S', '5'),
  ('5', 'S'),
  ('T', '7'),
  ('7', 'T')
};
```

We should be able to use the variable as an argument to the local function `substituteString`:

```{code-cell} csharp
Console.WriteLine(
  substituteString("1337 LOLS", leetSubstitutions)
);
```

Since the variable contains all the substitutions necessary for the the Leet language you should also be able to iterate over it using a `foreach`:

```{code-cell} csharp
:tags: [hide-output]
foreach ((char,char) sub in leetSubstitutions)
  Console.WriteLine($"{sub.Item1} => {sub.Item2}");
```
```{exercise-end}
```




```{exercise-start}
:label: ex:methods-robbers-substitutions
```
Write a local function with the following signature:

```csharp
(char,string)[] makeRobbersSubstitutions (char vowel);
```

The method should return an array of `(char,string)` substitutions for the Robber's language when given a `vowel` as input.

Since the method returns returns an array of `(char,string)` pairs and not `(char,char)` pairs you should be able to use any result of calling the method as the second argument to `substituteCharUsingString`:

```{code-cell} csharp
:tags: [remove-input]
(char,string)[] makeRobbersSubstitutions (char vowel)
  => new (char,string)[] {
      ('B', $"B{vowel}B"),
      ('C', $"C{vowel}C"),
      ('D', $"D{vowel}D"),
      ('F', $"F{vowel}F"),
      ('G', $"G{vowel}G"),
      ('H', $"H{vowel}H"),
      ('J', $"J{vowel}J"),
      ('K', $"K{vowel}K"),
      ('L', $"L{vowel}L"),
      ('M', $"M{vowel}M"),
      ('N', $"N{vowel}N"),
      ('P', $"P{vowel}P"),
      ('Q', $"Q{vowel}Q"),
      ('R', $"R{vowel}R"),
      ('S', $"S{vowel}S"),
      ('T', $"T{vowel}T"),
      ('V', $"V{vowel}V"),
      ('X', $"X{vowel}X"),
      ('Y', $"Y{vowel}Y"),
      ('Z', $"Z{vowel}Z"),
      ('b', $"b{vowel}b"),
      ('c', $"c{vowel}c"),
      ('d', $"d{vowel}d"),
      ('f', $"f{vowel}f"),
      ('g', $"g{vowel}g"),
      ('h', $"h{vowel}h"),
      ('j', $"j{vowel}j"),
      ('k', $"k{vowel}k"),
      ('l', $"l{vowel}l"),
      ('m', $"m{vowel}m"),
      ('n', $"n{vowel}n"),
      ('p', $"p{vowel}p"),
      ('q', $"q{vowel}q"),
      ('r', $"r{vowel}r"),
      ('s', $"s{vowel}s"),
      ('t', $"t{vowel}t"),
      ('v', $"v{vowel}v"),
      ('x', $"x{vowel}x"),
      ('y', $"y{vowel}y"),
      ('z', $"z{vowel}z")
  };
```
```{code-cell} csharp
Console.WriteLine(
  substituteCharUsingString('l',
      makeRobbersSubstitutions('o')));
```

Since the method returns an array you should also be able to iterate over the substitutions using a `foreach`:

```{code-cell} csharp
:tags: [hide-output]
(char,string)[] substitutions = makeRobbersSubstitutions('a');
foreach ((char,string) sub in substitutions)
  Console.WriteLine($"{sub.Item1} => {sub.Item2}");
```

```{exercise-end}
```



````{exercise}
:label: ex:methods-charchar-to-charstring
Write a method that takes an array of `(char, char)` tuples and returns a new array of `(char, string)` tuples without loosing any information.
It should have the following signature:

```csharp
(char,string)[] charCharArrayToCharStringArray ((char, char)[] substitutions);
```
````


%```csharp
%Write a method with the following signature:
%
%```csharp
%bool isVowel (char letter);
%```
%
%If the letter is a vowel then the method should return `true` and if the letter is 
%
%Feel free to start with the code that you wrote in {numref}`ex:selection-is-vowel`.
%```

%### Modulo
%
%Unecssarily complicated because of negative numbers.
%% This will be useful when we get to Caesar ciphers.
%
%```{exercise}
%int dividend = -10
%int divisor = 3;
%
%int modulo = dividend % divisor;
%if (modulo < 0)
%  modulo += divisor;
%
%Console.WriteLine(modulo);
%```


