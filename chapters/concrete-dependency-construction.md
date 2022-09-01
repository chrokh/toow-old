# Concrete dependency construction

In this chapter we're going to explore level 1 object composition based on the, previously outlined, [object composition abstraction levels](abstraction-levels).

In procedural programming, as we've already seen, we solve problems by [composing procedures](composition).
If a method calls another method then we've composed the two methods
You might recall that we said that this form of composition is significantly less powerful than what in function programming is known as function composition.
Concrete dependency construction, which we're talking about right now, is essentially the equivalent to procedure composition.
The only difference is that we [encapsulate](encapsulate) our procedures in objects.

## Constructing the dependency

Remember how we composed two static methods to enable us to encode strings into the Robber's language in the chapter on [procedure composition](composition)?
Let's do that again, but using objects.
Let's decompose the main problem into the two same sub-problems as before.

1. Encoding a whole `string` by delegating the encoding of each individual character one-by-one to someone else who knows how to encode individual characters.
2. Encoding an individual character (`char`).

Let's build two classes to solve these problems and let's call them `RobbersStringCipher` and `RobbersCharCipher`.

`RobbersStringCipher` is responsible for encoding a whole `string` of characters into the robber's language by delegating to the `RobbersCharCipher` who knows how to encode any single character.

```csharp
class RobbersStringCipher
{
  public string Encode (string input)
  {
    RobbersCharCipher charCipher = new RobbersCharCipher();

    string output = "";

    foreach (char c in input)
      output += charCipher.Encode(c);

    return output;
  }
}
```

```csharp
class RobbersCharCipher
{
  public string Encode (char input)
  {
    string consonants = "bcdfghjklmnpqrstvwxz";

    if (consonants.IndexOf(Char.ToLower(input)) != -1)
     return $"{input}o{input}";
    else
      return input.ToString();
  }
}
```

Let's try these classes out by using them in a small program.
We simply instantiate `RobbersStringCipher` and call the method `Encode` on the instance and send it a `string` upon each call.

```csharp
var cipher = new RobbersStringCipher();
Console.WriteLine(cipher.Encode("Hello world"));
Console.WriteLine(cipher.Encode("Chris"));
```

```output
HoHelollolo wowororloldod
CoChohrorisos
```

This is an example of concrete dependency construction.
Let's break that statement apart.

1. The object composition is **constructed** because the `RobbersStringCipher` is itself **instantiating** its dependency, namely the `RobbersCharCipher`.  Specifically we are talking about the line that reads: `RobbersCharCipher charCipher = new RobbersCharCipher();`.
2. The object composition is **concrete** since the compile-time type of the composed object is a concrete type. In this case the type is `RobbersCharCipher`.

But wait a minute, you might ask.
Aren't all types concrete?
What's an example of a non-concrete type?
Well, hold your horses my friend.
We haven't talked about object oriented abstractions yet but we'll get there very soon.
To understand what an abstract dependency is we must first understand
[interfaces](interfaces),
[inheritance](inheritance),
and [subtype polymorphism](subtype-polymorphism).
So let's take it one step at a time, and stick to concrete dependency construction for now.


````{exercise}
:label: ex:concrete-dependency-construction-caesar-cipher

Remember the Caesar cipher in {numref}`ex:method-composition-caesar-cipher-1` from the chapter on method composition?
Rewrite the code so that it uses concrete dependency construction instead of method composition.
We'll worry about parameterizing the Caesar cipher to an arbitrary number of steps later, so hard-code your solution to one step for now.

*Hint: Have a look at the Robbers cipher code above and see if you can rewrite the code and instead of use two classes called `CaesarStringCipher` and `CaesarCharCipher`.*

The program should behave like this:

```csharp
var cipher = new CaesarStringCipher();
Console.WriteLine(cipher.Encode("AbCz"));
```

```output
BcDa
```
````


## Parameterizing the dependency

The astute reader might however have noticed that in the chapter on [method composition](composition), we actually parameterized the character cipher of our Robber's language implementation so that we could choose which character to stick between consonants.
Let's parameterize `RobbersCharCipher` in the same way to make sure that we haven't lost any of the flexibility of our code:

```csharp
class RobbersCharCipher
{
  char vowel;

  public RobbersCharCipher (char vowel)
  {
    this.vowel = vowel;
  }

  public string Encode (char input)
  {
    string consonants = "bcdfghjklmnpqrstvwxz";

    if (consonants.IndexOf(Char.ToLower(input)) != -1)
      return $"{input}{vowel}{input}";
    else
      return input.ToString();
  }
}
```

If we however try to compile our code now without first changing `RobbersStringCipher` we will of course get the following error:

```output
error CS7036: There is no argument given that corresponds to the required formal parameter 'vowel' of 'RobbersCharCipher.RobbersCharCipher(char)'
```

Why did I show you this error?
Because, herein lies the problem of concrete dependency construction.
Whenever we change the constructor of `RobbersCharCipher` we will also have to change `RobberStringCipher` since it calls the constructor.

```{warning}
The danger of concrete dependency construction is that whenever the constructor of the composed object changes, the composer must also change.
```

Ok, so the change ripples into `RobbersStringCipher` but what do we need to change?
Well, we just need to change the line that instantiates the `RobbersCharCipher`.
We need to change `new RobbersCharCipher()` to... well... what do we need to change it to?
If we say `new RobbersCharCipher('o')` then we're hard-coded our cipher to the vowel `'o'`.
We're back in the same situation as before where the user of our class is unable to change the vowel without changing the class itself.
You cannot change the vowel at run-time, only at compile-time.
Surely, object oriented programming cannot force us to be *less* flexible, right?

Well, remember how we said that concrete dependency construction is like the object oriented equivalent of method composition?
It is no more powerful and no more flexible.
We've merely wrapped our logic in objects and instance methods instead of static methods.
With that said, remember how we solved this problem in the method on [method composition](composition)?
We solved it by duplicating the parameterization.
If our dependency is parameterized and we want to propagate that parameterization then we must parameterize ourselves.

```{admonition} Design principle
:class: tip
Don't repeat yourself. (DRY)
```

The string cipher would have to look something like this:

```csharp
class RobbersStringCipher
{
  RobbersCharCipher charCipher;

  public RobbersStringCipher (char vowel)
  {
    charCipher = new RobbersCharCipher(vowel);
  }

  public string Encode (string input)
  {
    string output = "";

    foreach (char c in input)
      output += charCipher.Encode(c);

    return output;
  }
}
```

Notice how the vowel is now an argument in the constructor and how we're immediately passing the vowel on to the construction of the `RobbersCharCipher`.
This works, but the fact that we're immediately passing some piece of data further is a tell-tale sign that we're doing something fishy.
We would use it like this:

```csharp
var cipher1 = new RobbersStringCipher('o');
var cipher2 = new RobbersStringCipher('a');

Console.WriteLine(cipher1.Encode("Bob"));
Console.WriteLine(cipher2.Encode("Bob"));
Console.WriteLine(cipher1.Encode("Lol"));
Console.WriteLine(cipher2.Encode("Lol"));
```

```output
BoBobob
BaBobab
LoLolol
LaLolal
```

But what's the problem with this code?
Why do we say that it's a warning sign that we're immediately passing the vowel on to someone else?
Well we're merely treating the symptom, not the cause.
The problem is still the same as before.

If we want to change the constructor of `RobbersCharCipher` we will almost certainly also have to change `RobbersStringCipher`.
We say that the change "ripples" through the system.
This is really bad for [maintainability](maintainability).

```{hint}
When thinking about whether something is a good or bad design decision we should ask ourselves if we take our current practice to the extreme.
What happens if I design my whole system like this?
What happens if I compose ten objects like this?
We'll talk more about design in the chapter on [maintainability](maintainability) and its related chapters.
```

What happens if I have a class that instantiates a class, that instantiates a class, that instantiates a class, that instantiates a class, and so forth...
Well, if all the constructors have parameters and we want to expose all parameters then we will have expose all parameters of all the constructors in the constructor of the outermost class.
This is bizarre and a nightmare to maintain.

```{danger}
If you use concrete dependency construction all the way down, the you have to sum the number of constructor arguments all the way up.
```

So, hopefully that settles it.
Concrete dependency construction should be used with caution.
Let's talk about better forms of object composition.


%A question that we actually *can* answer now regards the first point above.
%What would concrete but **injected** object composition look like?
%That's the question we're going to deal with in the next chapter.

```{exercise}
What is direct object composition of a concrete dependency?
Give your own example and explain it in your own words.
```

```{exercise}
Why is concrete dependency construction problematic?

*Hint: Constructor arguments.*
```

````{exercise}
:label: ex:concrete-dependency-construction-parameterized-caesar-cipher

Start from the code you built in {numref}`ex:concrete-dependency-construction-caesar-cipher`.

1. Add a constructor parameter to `CaesarCharCipher` so that you can choose the number of steps to "move" when encoding.
2. Add a constructor parameter to `CaesarStringCipher` so that we can choose what number to send to the constructor of `CaesarCharCipher`.
3. Make sure the program behaves according to the usage example below:

```csharp
var threeStepsForward = new CaesarStringCipher(3);
var twoStepsBackwards = new CaesarStringCipher(-2);

Console.WriteLine(threeStepsForward.Encode("aB"));
Console.WriteLine(twoStepsBackwards.Encode("aB"));

Console.WriteLine(threeStepsForward.Encode("Yz"));
Console.WriteLine(twoStepsBackwards.Encode("Yz"));
```

```output
dE
yZ
Bc
Wx
```
````

