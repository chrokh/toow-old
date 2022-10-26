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

(polymorphism)=
# Subtype polymorphism

```{warning}
Work in progress.
```

% TODO: Move intro to its own chapter. So that we don't have to talk about other types of polymorphism in the chapter on subtype polymorphism.

## Motivation

The time has come to talk about subtype polymorphism.
If you haven't studied polymorphism before, let me just spill the beans and tell you that this is, arguably, *the most important idea in object oriented programming*.
Luckily it is also the most mind-bendingly interesting topic in object oriented programming.

```{important}
Polymorphism allows us to explicitly or implicitly define a contract that multiple different types can implement.
This allows us to use these different types interchangeably without needing to be concerned about which particular type we have.
```

% TODO: Source for translation?
The word "polymorphism" comes from Greek and means "many-shaped".
There are many types of polymorphism and in this chapter we're specifically talking about subtype polymorphism.
Which types of polymorphism exists depends on who you ask but I tend to follow the division of {cite:t}`cardelliAndWegner1985` where we have the following four types:

1. [Parametric polymorphism](generics).
2. Inclusion / subtype / overriding polymorphism.
3. [Overloading polymorphism](overloading).
4. [Coercion polymorphism](object-type-conversions).

% TODO: The chapter on generics also uses the terms static vs dynamic polymorphism. So perhaps that must be introduced here.

In this chapter we will talk about subtype polymorphism.
In previous chapters we have already talked about [overloading](overloading) without calling it overloading polymorphism.
In a coming chapter on [object type conversions](object-type-conversions) we will talk about "implicit type conversions" which is what coercion polymorphism tends to refer to.
Finally, we will also talk about parametric polymorphism in the chapter on [generics](generics) since this is what the C# implementation of the concept is called.

```{tip}
When someone just says "polymorphism" in the context of a discussion around object oriented programming they are most likely referring to subtype polymorphism.
```


## Definition

### Inclusion

To understand subtype/inclusion polymorphism we must understand the idea of subtyping or of inclusion.
Think back to the notion of subsets from the chapter on [sets](sets).

Let's say that we've got a set of cats that we call $\mathit{Cat}$ and a set of dogs that we call $\mathit{Dog}$.
If we claim that $\mathit{Cat}$ and $\mathit{Dog}$ are *subtypes* of $\mathit{Animal}$ then we are claiming that they are subsets of $\mathit{Animal}$.

$$
\mathit{Cat} \subset \mathit{Animal}\\
\mathit{Dog} \subset \mathit{Animal}
$$

In terms of *subsets* this means that all members of the set $\mathit{Cat}$ are also members of the set $\mathit{Animal}$.
Same for dogs.
Have a look back in the chapter on [sets](sets) if this isn't obvious.

In terms of *subtypes* however this means that a $\mathit{Cat}$ can be used at any point where an $\mathit{Animal}$ is expected.
Same for dogs.

The opposite of a subtype is called a "supertype".
Instead of the subtype-supertype terminology you will also often find the pairs child type-parent type, and base type-derived type.
The terminology is summarized in {numref}`tbl:subtype-supertype-terminology`.

```{table} Alternatives to the subtype-supertype terminology.
:name: tbl:subtype-supertype-terminology

| Supertype | Subtype |
| :--: | :--: |
| Parent type | Child type |
| Base type | Derived type |
```

### Substitutability

This idea of being able to use some type instead of another is known as "substitutability".
We'll talk more about what ought to be substitutable for what in the chapter on [Liskov's substitution principle](liskov-substitution-principle).
In general however, this means that the *state and behavior* of any subtype must be a legal state and behavior of its supertype.

Assume that the two types `Cat` and `Dog` are subtypes of `Animal`.
Inversely, `Animal` is a supertype of both `Cat` and `Dog`.
This means that any value of type `Cat` and any value of type `Dog` must at all times be legal states and behaviors given our definition of `Animal`.
In other words, all dogs and all cats must at all times, with no exceptions, behave like animals.
If this condition is satisfied then we are free to declare that `Dog` and `Cat` are subtypes of `Animal`.

Remember how we, way back in the chapter on [data types](run-time-and-compile-time-types), said that the type on the left doesn't necessarily have to be the same as the type on the right?
Or in other words, how the compile-time type doesn't necessarily have to be the same as the run-time type.
Well, let's unpack that statement now.
Have a look at this code:

```csharp
Animal a1 = new Cat();
Animal a2 = new Dog();
```

The left-hand type, the compile-time type, of both variables is `Animal`.
However, the right-hand type, the run-time type, is `Cat` for one of the variables and `Dog` for the other.
For this code to compile `Cat` and `Dog` must both be subtypes of `Animal`.

Let's generalize.
A run-time type can be used if the run-time type is the same as the expected compile-time type or if the run-time type is a subtype of the compile-time type.
In other words, whenever we state that a certain compile-time type is expected we can use values that at run-time have exactly that type or any subtype of that type.


### Nominal subtyping

Remember how we, in the chapter on [type systems](type-systems), discussed that a type system is either nominal, structural or some combination of the two.
If a type system is nominal, then subtyping is determined based on the fact that we declare that it is.
In a structural type system however, subtyping is determined on the basis of the structure of different types.

```{important}
C# is a nominally typed language, and hence implements nominal subtyping.
A subtype is a subtype if we nominally declare that it is.
```

Unfortunately, the existence of [exceptions](exceptions) means that it is quite simple to nominally declare that something is a subtype yet structurally violate the rules of, what is known as, "behavioral subtyping".
More on this in the chapter on the [Liskov substitution principle](liskov-substitution-principle) (LSP).

Type systems that implement structural subtyping often need to deal with whether or not to support both "width subtyping" and "depth subtyping".

```{seealso}
The static type checker [Flow](https://flow.org) for the language JavaScript is an example of a type system that supports both depth subtyping and width subtyping.
```

% TODO: "In a language with structural subtyping, a type U is a subtype of T if its methods and fields are a superset of T’s methods and fields. The interface of a class is simply its public fields and methods; there is no need to declare a separate interface type. In a language with nominal subtyping, on the other hand, U is a subtype of T if and only if it is declared to be. Accordingly, structural subtyping can be considered intrinsic, while nominal subtyping is declarative. Each kind of subtyping has its merits, but a formal model has not been developed for a language that integrates the two subtyping disciplines."
% https://www.cs.cmu.edu/~aldrich/papers/ecoop08.pdf

% TODO: "We say that T is a subtype of U (written T<:U) if all operations allowed on values of type U are allowed on values of type T."
% https://www.ifazk.com/blog/2018-11-26-Bounded-field-typing.html
% Discussed here: https://www.reddit.com/r/ProgrammingLanguages/comments/a1bfa7/depthsubtyping_and_mutation/

% TODO: "In 1990, Cook, et al., proved that inheritance is not subtyping in structurally-typed OO languages.[2]" https://en.wikipedia.org/wiki/Structural_type_system


### Notation

So how do we declare one type a subtype of another type?
Well, in C#, and many other object oriented langauges, there are usually two ways.
A subtype relationship can be established by either:

1. [Interface implementation](interfaces), or
2. [Inheritance](inheritance).

If type `A` implements the `interface` defined by type `B` then `A` is considered a subtype of `B`.
If type `A` inherits from the class or abstract class `B` then `A` is a subtype of `B`.

We'll explore how to create subtype relationships by means of inheritance in the chapter on [inheritance](inheritance).
In this chapter we will focus on how to create subtype relationships by means of interfaces.

Notationally you will often find the less-than-sign (`<`) being used to denote subtyping.
Where the subtype is on the left and the supertype is on the right.
In C# however we tend to use the same symbol as for [interface](interfaces) implementation and [inheritance](inheritance), namely colon (`:`).
The subtype is still on the left, and the supertype on the right.

```
Cat : Animal
Dog : Animal
```

```{warning}
If you happen to already be familiar with [inheritance](inheritance) it is important to realize that subtype does not *necessarily* mean subclass.
While a subtype can be created by means of inheritance it can also be created by means of interface implementation.
```

(dynamic-dispatch)=
### Dynamic dispatch

But what does all this matter you ask?
Why would I want to "treat" cats and dogs as animals instead of as cats and dogs?
Well, the answer lies in something known as "dynamic dispatch".

By declaring that `Cat` and `Dog` both implement the interface `IAnimal` we can use `IAnimal` as the compile-time type.
Importantly we can call whatever methods and access whatever properties the type `IAnimal` declares.
However, we can do this without having to care at all about which particular implementation of `IAnimal` we happen to get at runtime.
As long as whatever members we're accessing are defined in `IAnimal` then we are guaranteed that these members will be available in all subtypes of `IAnimal`.

Before leaving the section on dynamic dispatch I should also mention that most languages that implement dynamic dispatch by means of subtype polymorphism provide us with *single* dynamic dispatch.
This means that the implementation that is executed depends on the run-time type of one variable.
We will learn about *multiple* dynamic dispatch in the chapters on [visitor pattern](visitor-pattern) and [pattern matching](pattern-matching).


### Constructors

It is important to understand that subtype polymorphism doesn't require constructors to have any particular signature.
As we will see in the chapter on [inheritance](inheritance), inheriting from a class will force you to call one of the base classes constructor (albeit possibly implicitly) but you're nevertheless able to define your own constructors in the subclass.
In the case of interfaces we're only demanding that implementors define some public instance members.
The constructors can consequently vary wildly between different implementations of an interface.


### Beyond inclusion

In the chapter on [interfaces](interfaces) and here we've emphasized the importance of letting the supertype be the [intersection](intersection) of all the subtypes, not the [union](union) of them.
Otherwise we would force subtypes to provide implementations for members they have no sensible implementation for.
This is a path that leads to a sea of run-time errors.
So let us agree to stray away before it is too late.

Why would you get the idea that you should put members that are exclusive to some set of subtypes in the supertype?
Well, when we treat something as it's supertype then we can *only* access whatever members are defined in that supertype.
It doesn't matter what additional members might exist in the subtype.
We only know about what's in the compile-time type.

```{code-cell} csharp
interface Generalization
{
  void SharedMethod ();
}
class Specialization : Generalization
{
  public void SharedMethod() {}
  public void UniqueMethod() {}
}
```

% TODO: How to hide traceback?
```{code-cell} csharp
:tags: [raises-exception]
Specialization special = new Specialization();
special.SharedMethod(); // Ok.
special.UniqueMethod(); // Ok.

Generalization general = new Specialization();
general.SharedMethod(); // Ok.
general.UniqueMethod(); // Does not compile!
```

When you treat a subtype as a supertype you loose the ability to call methods that only exist in the subtype.
Said differently, it is possible for the subtype to define members that fall outside the inclusion relationship.
It is possible for the subtype to, outside of its inclusion relationship, be an extension of the supertype.
It is possible for the subtype to, outside of its inclusion relationship, do more than the supertype.
An even other way of saying this is it is possible that it is a *part* of the subtype that makes it a subtype of the supertype.

We'll talk about this a bit more when we get to the chapter on the design principle known as the [liskov substitution principle](liskov-substitution-principle).
As long as the subtype is behaviorally substitutable for the supertype, we're fione.
But, be sure to only put things in the supertype that actually are implementable for all conceivable subtypes.




## Examples

### Numbers

In actual languages like C#, different number types are usually not subtypes of each other.
However, let us dispense with that practicality for a moment so that we can deepen our understanding of subtypes.

If we're talking about sets, then the set of natural numbers is a subset of the set of integers, which is a subset of the set of rational numbers, which is a subset of the set of real numbers.

$$
\mathbb{N} \subset \mathbb{Z} \quad \quad \quad
\mathbb{Z} \subset \mathbb{Q} \quad \quad \quad
\mathbb{Q} \subset \mathbb{R}
$$

```{figure} https://upload.wikimedia.org/wikipedia/commons/1/17/Number-systems.svg
:height: 200

Illustration of how real numbers ($\mathbb{R}$) include rational numbers ($\mathbb{Q}$), which include integers ($\mathbb{Z}$), which include natural numbers ($\mathbb{N}$). [[Image source](https://en.wikipedia.org/wiki/Real_number#/media/File:Number-systems.svg)].
```

If we're talking about types then it would be quite reasonable to design a type system where the natural numbers (`Natural`) is a subtype of integers (`Integer`), which is a subtype of rational numbers (`Rational`), which is a subtype of real numbers (`Real`).
C# does not have types like these, but bear with me.

```
Natural : Integer
Integer : Rational
Rational : Real
```

Such a type system would imply that any value of type `Natural` can be used whenever you expect a value of type `Integer`, `Rational`, or `Real`.
Since subtyping is a transitive relationship, `Natural` is a subtype of `Real`.
Since all natural numbers behave like integers, rationals, and reals defining a subtype relation like this seems entirely fine.
Of course, the relationship is directed and so we can't go the other way.
Trying to use a value of type `Real` where a value of type `Natural` does not type-check since `Real` is not a subtype of `Natural`.



### Animals

Let's declare an interface `IAnimal` and two classes `Cat` and `Dog` that we declare as subtypes of `IAnimal`.
Let's ignore implementations for now and just make sure that our types make sense.

```{code-cell} csharp
interface IAnimal {}
class Cat : IAnimal {}
class Dog : IAnimal {}
```

With this code in place we can actually compile and run the code above where we declare the variables `a1` and `a2`.

```{code-cell} csharp
IAnimal a1 = new Cat();
IAnimal a2 = new Dog();
```

Remember: The run-time type of these two variables is the type on the right.

```csharp

Console.WriteLine(a1.GetType());
Console.WriteLine(a2.GetType());
```

```output
Cat
Dog
```

%So how do we declare that a type is a subtype of another type?
%Well, if we can create a subtype by means of interface implementation or inheritance then we must understand these two mechanisms.
%Luckily, we've already seen how to declare that a class implements a particular interface in the chapter on [interfaces](interfaces).
%And we'll look at how to create subtyping through inheritance in the next chapter.


### Ciphers

Let's get back to our ciphers and explore the power of dynamic dispatch and subtype polymorphism.
In the chapter on [interfaces](interfaces) we designed the three interfaces `ICharToCharCipher`, `IStringToStringCipher`, and `ICharToStringCipher`.

```{code-cell} csharp
interface ICharToCharCipher
{
  char Encode (char input);
}

interface IStringToStringCipher
{
  string Encode (string input);
}

interface ICharToStringCipher
{
  string Encode (char input);
}
```

We then showed that `RobbersCipher`, `CaesarCipher`, and `ReverseCipher` all (at least) implement the interface `IStringToStringCipher`.

```{code-cell} csharp
:tags: [hide-input]
class RobbersCipher : ICharToStringCipher, IStringToStringCipher
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

```{code-cell} csharp
:tags: [hide-input]
class CaesarCipher : ICharToCharCipher, IStringToStringCipher
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

```{code-cell} csharp
:tags: [hide-input]
class ReverseCipher : IStringToStringCipher
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

In this chapter we've emphaiszed that you can only access whatever members are defined in the supertype whenever you treat something as its supertype.
Let's look at what this means in the context of our ciphers.

Take the Robber's cipher for example.
Let's say we want to be able to change the vowel that any particular instance of `RobbersCipher` uses.
Let's say that we want to implement that idea using a public [property](properties).

```{code-cell} csharp
class RobbersCipher : ICharToStringCipher, IStringToStringCipher
{
  public char Vowel { get; set; } // This line is new!

  public RobbersCipher (char vowel)
    => Vowel = vowel;

  public string Encode (char input)
  {
    string consonants = "BCDFGHJKLMNPQRSTVXYZ";
    if (consonants.IndexOf(Char.ToUpper(input)) != -1)
      return $"{input}{Vowel}{input}";
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

Clearly we cannot add this property to neither the interface `ICharToStringCipher` nor `IStringToStringCipher` since not all ciphers are centered around the idea of a vowel.
However, as long as `RobbersCipher` still implement all members of the interfaces we declare it to be a member of, then we are free to add as many additional members as we want.
`RobbersCipher` can now do *more* than what is required for being an implementation of `ICipher`.

If we've got an instance of `RobbersCipher` where the compile-time type also is `RobbersCipher` then we can access the `Vowel` property to change the vowel.

```{code-cell} csharp
RobbersCipher cipher = new RobbersCipher('o');
cipher.Vowel = 'a';
```

However, if the compile-time type of our variable is, for example, `IStringToStringCipher` then we can *not* access the `Vowel` property.
The compiler error that we get is actually quite revealing.

```{code-cell} csharp
:tags: [raises-exception]
IStringToStringCipher cipher = new RobbersCipher('o');
cipher.Vowel = 'a';
```

The error tells us that if all the type-checker knows is that it has something of type `IStringToStringCipher` then it couldn't possibly guarantee that we can access a property called `Vowel`.
Why?
Well because `Vowel` is not actually defined in `IStringToStringCipher`.
The interface `IStringToStringCipher` knows absolutely nothing about vowels.
Only one of the bazillion different possible implementations of `IStringToStringCipher`, namely `RobbersCipher`, happens to know about vowels.


### Dynamic dispatch

But what do we even gain from this?
Well, this means that we can use all concrete types that implement the same interface interchangably.
It means that we can write code that depends on `IStringToStringCipher` instead of any particular class.

So what's this business of dynamic dispatch?
Well, say that we write code that depends on `IStringToStringCipher` and then call the method `Encode` on an object of that type.
We don't know whether that object is of type `ReverseCipher`, `CaesarCipher`, or any other potential cipher that we have yet to come up with.
The fact that the type implements `IStringToStringCipher` means that we can be certain that the object has a method with the signature `string Encode (string input)` which means that we can call it.
The actual implementation of `Encode` that will be run depends on what the run-time type we happen to have.
This is the dynamic dispatch.
The implementation is "late-bound".

Let's look at an example.
How about the idea of running the encoding method of a cipher twice?
Let's define two simple [local functions](local-functions).
One that runs an `IStringToStringCipher` twice, and one that runs an `ICharToCharCipher` twice.
We'll get back to using classes soon, but let's just start with something simple.

```{code-cell} csharp
string encodeStringTwice (IStringToStringCipher cipher, string input)
  => cipher.Encode(cipher.Encode(input));

char encodeCharTwice (ICharToCharCipher cipher, char input)
  => cipher.Encode(cipher.Encode(input));
```

What's excellent about these two methods is that they work on any current and future types that implement the corresponding interface.
Let's take these methods for a spin to see if they actually work.

```{code-cell} csharp
Console.WriteLine( encodeStringTwice(new RobbersCipher('o'), "Ape") );
```

Now let's try if we can pass the reversing cipher.
Of course, since reversing a string twice takes us back to the original string we should simply get the original string back.

```{code-cell} csharp
Console.WriteLine( encodeStringTwice(new ReverseCipher(), "backwards") );
```

Finally, let's see if pass the Caeasar cipher class to the method that encodes single characters twice.

```{code-cell} csharp
Console.WriteLine( encodeCharTwice(new CaesarCipher(1), 'A') );
```

Both methods seem to work.
Pretty neat right?

```{important}
Not only do these two methods work for all current implementations of our interfaces, but they will also work *for all future implementations*.
```

We can just keep on adding new classes and the methods `encodeStringTwice` and `encodeCharTwice` will work for all these classes so long as we make sure that they implement the appropriate interface.

This is subtype polymorphism and dynamic dispatch.
We're treating different types as if they are of the same type.
We're treating different types of ciphers as if they are all of the same type.


(subtype-polymorpism:identity-cipher)=
### Identity cipher

While we're at it, let's also write the simplest possible cipher that we can image.
Namely a cipher that doesn't actually perform any modifications of the input message but instead just returns it as it is.

```csharp
class NoCipher : ICipher
{
  public string Encode (string input) => input;
}
```

In general, something like a `NoCipher` is known as the "identity".
In the context of ciphers, we would call this "the identity cipher".
In the context of multiplication, the number $1$ is the identity.
In the context of addition, the number $0$ is the identity.

You can also think of `NoCipher` as a [null object](null-object-pattern) which we will talk more about when we get to design patterns.

Does the `encodeTwice` method work for instances of type `NoCipher` as well?
Yes, of course.

Welcome to the powerful world of subtype polymorphism.


## Discussion

Not impressed enough yet?
Not a problem.
We're only scratching the surface of the usefulness of subtype polymorphism.

As you will come to learn, subtype polymorphism is at the heart of almost all object oriented [design patterns](design-patterns) you will see how subtype polymorphism is the key mechanism of almost all object oriented design patterns.

%When we get to the chapters on [abstract injected object composition](abstract-injected-object-composition) and [dependency inversion](dependency-inversion-principle) you will, for example, see how we can write ciphers that compose other ciphers.
%And when we get to [design patterns](design-patterns) you will see how subtype polymorphism is the key mechanism of almost all object oriented design patterns.




## Exercises


```{exercise}
If type `A` is a subset of type `B` then we would say that the set that models type `B` *includes* the set that models type `A`.
If we call the sets $A$ and $B$ then we could write: $A \subset B$.
What does it mean that $A$ *includes* $B$?
```


````{exercise}
Assume that you have the following code:

```csharp
interface Animal {}
class Cat : Animal {}
class Dog : Animal {}
```

1. Which of the following lines will compile and which ones will not?
2. Explain *why* each line will or will not compile.

```csharp
var a1 = new Cat();
var a2 = new Dog();
var a3 = new Animal();
Cat a4 = new Cat();
Cat a5 = new Dog();
Cat a6 = new Animal();
Dog a7 = new Cat();
Dog a8 = new Dog();
Dog a9 = new Animal();
Animal a10 = new Cat();
Animal a11 = new Dog();
Animal a12 = new Animal();
```
````


```{exercise}
Which of the following types (if any) are supported by the method `encodeCharTwice`?

1. `RobbersCipher`
2. `ReverseCipher`
3. `LeetCipher`

Note that we are talking about `encodeCharTwice` *not* `encodeStringTwice`.
```



```{exercise-start}
:label: ex:subtype-polymorphism:encodeNTimes
```
%TODO: Remember the method we wrote in the chapter on [recursion](recursion) that applied the Robber's cipher multiple times? Rewrite the method so that it follows the signature below:

Write a method with the following signature:

```csharp
string encodeNTimes (string input, IStringToStringCipher cipher, int times);
```

The method should apply the same cipher multiple times to a single input.
The parameter `cipher` determines the cipher that should be used.
The parameter `times` determines how many times the cipher should be applied to the input string.
The parameter `input` determines the input to encode.

Since the method takes a cipher of type `IStringToStringCipher` you must be able to run the method with any of your ciphers that implement that interface.

When you're done you should be able to run the following code and get the corresponding output.

```{code-cell} csharp
:tags: [remove-input]
string encodeNTimes (string input, IStringToStringCipher cipher, int n)
{
  if (n > 0)
    return encodeNTimes(cipher.Encode(input), cipher, n-1);
  else
    return input;
}
```

```{code-cell} csharp
Console.WriteLine( encodeNTimes("ABC", new CaesarCipher(1), 3) );
```

```{code-cell} csharp
Console.WriteLine( encodeNTimes("L", new RobbersCipher('o'), 2) );
```
```{exercise-end}
```


```{exercise}
Is it possible to pass the class `LeetCipher` that you wrote in {numref}`ex:interfaces:leet` to the method `encodeNTimes` that you wrote in {numref}`ex:subtype-polymorphism:encodeNTimes`?
Why or why not?
If not, can we make it possible?
```


```{exercise}
:label: ex:subtype-polymorphism-own-types
Come up with your own example of inclusion/subtying that involves at least three sets/types.
Explain why all members of each subtype is also a member of it's supertype.
```

```{exercise}
:label: ex:subtype-polymorphism-implement-own-types
1. Write an interface that unifies the three types you designed in {numref}`ex:subtype-polymorphism-own-types`.
2. Declare at least one method/property to the interface.
3. All methods that the interface declares must make sense in all the implementations of the interface.
4. Write a class for each of the three types and make them implementations of the interface.
5. Show that they can be treated polymorphically by assigning instantiations of all three classes to variables with the interface as the compile-time type.
```

```{exercise}
Start with the code you wrote in {numref}`ex:subtype-polymorphism-implement-own-types`.
Write a static method that (1) takes at least one argument whose type is the interface you've defined and (2) calls a method or accesses a property that's defined in that interface.
```

```{exercise}
Give an example of *subtype polymorphism* and *single dynamic dispatch* in code.
Use code comments when necessary to get your point across.
```

```{exercise}
Why is it important that the signature of constructors can vary freely between subtypes?
```

```{exercise}
When we treat a subtype as a supertype, meaning when we let the compile-time type be the supertype, why can't we call methods that are only defined in the subtype?
```


% TODO:
%````{admonition} Another example
%:class: dropdown
%
%Need another example?
%Perhaps we can make it more clear by imagining that we have a method with the signature `ICipher GetCipher()`.
%Let's say that it returns a concrete cipher based on some `string` that we send it.
%
%csharp
%static ICipher GetCipher (string code)
%{
%  switch (code)
%  {
%    case "robbers":
%      return new RobbersCipher();
%    case "reverse":
%      return new ReverseCipher();
%    default:
%      return new NoCipher();
%  }
%}
%
%Since the method `GetCipher` returns something of type `ICipher` we can use whatever we get back from the method without having to care about which particular cipher we will get back.
%Have a look at the program below, where we ask the user for a cipher and a message and then run the encoding of that cipher on the message.
%
%csharp
%Console.WriteLine("What cipher do you want?");
%string? code = Console.ReadLine();
%if (code == null) return;  // Trivial error handling.
%
%Console.WriteLine("\nWhat message do you want to encode?");
%string? msg = Console.ReadLine();
%if (msg == null) return;  // Trivial error handling.
%
%Console.WriteLine("\nOutput:");
%Console.WriteLine(GetCipher(code).Encode(msg));
%
%Why couldn't we simply have mixed the code that asks the user for input, the code that selects a cipher, and possibly even the code that encodes the message you ask?
%Short answer: [maintainability](maintainability).
%Longer answer: With this architecture, each time we add a new cipher, we have to change the implementation of `GetCipher` but our main program can remain exactly the same.
%It's all about [decoupling](coupling), but we'll talk a lot more about this later.
%````





% TODO:
%Remember [concrete dependency injection](concrete-dependency-injection)? (ACTUALLY ITS A FORWARD REFERENCE).
%If you combine dependency injection with subtype polymorphism you end up with what I like to call [abstract dependency injection](abstract-depenency-injection) but what often (but ambiguously) is simply called "dependency injection".
%It can also be used to implement the so called [strategy pattern](strategy-pattern).
%We'll talk more about abstract dependency injection and strategy pattern in their respective chapters but abstract dependency injection is arguably where the key to really [maintainable](maintainability) code lies.


%```{seealso}
%In this book we're not covering the fact that you actually can define static methods with implementations in C# interfaces.
%You can read more about that in the [official documentation](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/types/interfaces).
%So, if you want a logical place to put the method `EncodeNTimes` the `ICipher` interface seems like a reasonable candidate.
%However, when we get to the chapter on [abstract injected object composition](abstract-injected-object-composition) you'll be given a much more maintainable alternative.
%```

%```{exercise}
%:label: ex:replace-conditional-with-polymorphism-in-words
%Explain the design principle known as "replace conditional polymorphism" in *words* using an example.
%```
%
%```{exercise}
%Implement the example you gave in {numref}`ex:replace-conditional-with-polymorphism-in-words` in code.
%```
%






% TODO: REPLACE CONDITIONAL WITH POLYMORPHISM
%```{exercise}
%Explain the refactoring commonly known as "replace conditional with polymorphism".
%```

%- Definition from Fowler.
%See chapter 1 of {cite:t}`fowler1999`.
%## Replacing conditionals with polymorphism
%
%How would we do this without dynamic dispatch?
%Without subtype polymorphism.
%We would either have to write a separate implementation of `encodeTwice` for each existing and new cipher, or we would have to resort to [type testing](type-testing).
%Ironically, all the implementations would in this case look the same if we still use classes to encapsulate all cipher implementations.
%
%If however we just put the encoding code in different methods like we did in the chapter on [static methods](static-methods) then we would have to use a [conditional](selection) whenever we want to be able to alter which encoding method is used at run-time.
%Have a look at the code below:
%
%```csharp
%string encodeUsingRobbersCipher (string msg)
%  => // implementation of Robber's langauge...
%
%string encodeUsingRobbersCipher (string msg)
%  => // implementation of reverse cipher...
%
%string Encode (Cipher cipher, string msg)
%{
%  switch (cipher)
%  {
%    case Cipher.Robbers:
%      return encodeUsingRobbersCipher(msg);
%    case Cipher.Reverse:
%      return encodeUsingReverseCipher(msg);
%    default:
%      return msg;
%  }
%}
%
%enum Cipher { Robbers, Reverse };
%```
%
%If we then wanted to have a method that encodes in two passes we would have to *duplicate* the selection logic.
%There is simply no other way without resorting to some form of polymorphism or higher-order functions (which in the case of C# would have to be implemented using subtype polymorphism or [delegates](delegates)).
%
%```csharp
%string encodeTwice (Cipher cipher, string msg)
%{
%  switch (cipher)
%  {
%    case Cipher.Robbers:
%      return encodeUsingRobbersCipher(encodeUsingRobbersCipher(msg));
%    case Cipher.Reverse:
%      return encodeUsingReverseCipher(encodeUsingReverseCipher(msg));
%    default:
%      return msg;
%  }
%}
%```
%
%Compare this to our very clean solution which uses subtype polymorphism.
%
%```csharp
%string Encode (ICipher cipher, string msg)
%  => cipher.Encode(msg);
%
%string encodeTwice (ICipher cipher, string msg)
%  => cipher.Encode(cipher.Encode(msg));
%```
%
%
%So, if we didn't have subtype polymorphism in object oriented languages then it is more likely than not that we would end up using [conditionals](selection).
%This idea of using subtype polymorphism instead of conditionals has become a design principle known as "replace conditional with polymorphism".
%
%```{admonition} Design principle
%:class: tip
%Replace conditional with polymorphism.
%```
%
%
%```{figure} https://images-na.ssl-images-amazon.com/images/I/51ttgxwzArL._SY445_SX342_QL70_ML2_.jpg
%---
%figclass: margin
%---
%"Refactoring: Improving the design of existing code" {cite:p}`fowler1999`.
%```
%
%```{figure} https://m.media-amazon.com/images/I/41odjJlPgHL._SX260_.jpg
%---
%figclass: margin
%---
%"Refactoring: Improving the design of existing code" {cite:p}`fowler2018`.
%```
%
%```{seealso}
%In this book we showcase a lot of cases where conditionals can be replaced by polymorphism.
%If you want to learn more about the mechanical steps of how to refactor a piece of code that is expressed in terms of conditionals so that it uses polymorphism, then I highly recommend the classic book "Refactoring" by Martin Fowler.
%First edition {cite:p}`fowler1999` is using Java which is similar to C# and second edition is using JavaScript {cite:p}`fowler2018`.
%Put this book on your shelf as a reference.
%It's a classic.
%```
