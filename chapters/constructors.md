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

# Constructors

% TODO: Benefits are very similar to partial application when we send in data through the constructor. Our data depends on the state of the object. Being able to store some data in an instance and then use objects of the same type interchangably at runtime. For example instantiating caesar ciphers with multiple different steps, passing them around, and then switching between them.



## Motivation

Constructors solve two main problems.

1. They allow us to initialize the [fields](fields) (and [properties](properties) but we haven't talked about those yet) of an object upon creation.
2. They allow us to validate whether it, in the current state of the world and given the data that we have been passed, is possible to create an instance of the object or not. This problem can generally be thought of as "validation" or "sanitization".

The second point is very important since it allows us to assume that any instance of a type actually is a valid instance of that type.
Remember the maxim of making impossible states impossible in the chapter on [types over tests](types-over-tests)?
We can use constructors to make sure that our application never contains an instance (meaning value) that's nonsensical given the definition of that type.

Take the notion of vowels for example.
According to the [bijection rule](types-over-tests) or the notion of types over tests, it is not sensible to use a `char` to model vowels.
The two data types support different values and different operations.


## Definition

A constructor, in C#, is any method whose name is the same as the enclosing type (in this case: class) and that doesn't specify a return type.
There is no need to specify a return type because a constructor always returns instances of the type in which it is defined.

```
class [identifier]
{
  public [identifier] (<[parameters]>)
  {
  }
}
```

In the chapter on [classes](classes) we discussed the keyword `new` which is used to create instances of a class.
When we use the keyword `new` followed by a class name, a pair of parentheses, and possibly some arguments, then a constructor (that matches that list of arguments is called) is called and we get back an object of that type.
I say "a constructor" rather than "the constructor" since constructors support overloading and so a class might have any number of constructors.
More on that in a moment though.

%Let's write a constructor for the `Balloon` class that we discussed in the chapter on [classes](classes).

### Default constructor

If we don't define a constructor for a class in C# then it's as if that class contains a constructor that takes no parameters and has no method body.
As soon as we define a constructor though, this empty and parameterless constructor is no longer implicitly created.

Remember how we, in the chapter on [fields](fields), mentioned that instance fields in C# are automatically intialized to their default values unless we initialize them ourselves in the class or upon construction using an [object initializer](object-initializers)?

Let's say that we've got a class that models a point on a two-dimensional grid.

```{code-cell}
class Point
{
  public int X = 0; // Default value.
  public int Y = 0; // Default value.
}
```

Whenever we create an instance of the class `Point`, this empty and parameterless "default" constructor is run.
```{code-cell}
Point p1 = new Point(); // This causes the constructor to be called.
```

Since the empty constructor isn't changing the value of any of the instance fields, the instantiated point will contain whatever values we set as defaults.
As can be observed below.

```{code-cell}
Console.WriteLine(p1.X);
```


### Initializing fields

What's the problem?
Well, sometimes it's possible to identify a sensible "default" value that we can initialize our instance fields to, and sometimes it's not.
What if we don't want to specify a default value for a field in our class?
Worse, what if there really isn't any default value that remotely makes sense in our domain?
Remember the maxim of [making impossible states impossible](types-over-tests).
If it doesn't make sense in the domain, then we shouldn't allow it in our types.

By declaring a constructor with some parameters we make it impossible to instantiate the class without also passing arguments for those parameters.
Remember what we said about the default constructor.
An empty, parameterless constructor isn't implicitly added to your class if you define a constructor.
However, to construct an instance of a class, we must run a constructor.
So, if there is only one constructor in a class, and that constructor takes some parameters, then it is impossible to create an instance of that class without also providing arguments for those parameters.

By using constructors we can force anyone who wants to create an instance of the class to have to specify the two coordinates that the point should be at.
It would look like this.

```{code-cell}
class Point
{
  public int X; // No default needed.
  public int Y; // No default needed.

  // This is the constructor.
  public Point (int x, int y)
  {
    this.X = x; // Assigns input argument to field.
    this.Y = y; // Assigns input argument to field.
  }
}
```

```{note}
Wondering what the keyword `this` is?
Don't worry, we'll get there in a second.
```

In the code above, we've declared a constructor with two parameters of type `int`.
The two parameters are named `x` and `y`.
In the body of the constructor, meaning the implementation of the constructor, we take these two arguments and assign them to our instance fields called `X` and `Y`.

When do we pass these arguments?
We pass them when we instantiate the class.

```{code-cell}
Point p2 = new Point(10, 20);
Point p3 = new Point(4, 5);
```

Notice how it is no longer possible to instantiate a `Point` without also passing arguments to the constructor.
If we try to do that, then we get a compiler error.

```{code-cell}
:tags: [raises-exception]
Point p4 = new Point(); // Will not compile.
```

A constructor is a method, and to call the method we must supply arguments for all its parameters.

This means that we can guarantee that anytime we have an instance of type `Point` it was instantiated with some intial values that whoever instantiated the class chose.
However, we can *not* guarantee that any instance of type `Point` will at all times have coordinates that "make sense" in our domain since the [access modifiers](access-modifiers) of the instance fields are `public` and since the fields are [mutable](mutability).
To achieve true information hiding we must also learn about [instance methods](instance-methods) or [properties](properties).


### `this` keyword

% MOST OF THIS IS ALREADY EXPLAINED IN THE CHAPTER ON INSTANCE METHODS.
% MUST HOWEVER SHOW COMPILER WARNING THAT WE GET WHEN WE ASSIGN WIDTH TO WIDTH:
%The C# compiler will assume that we are referring to the local variable which means that we will be assigning the value of a variable to itself.
%Which of course is pointless and not what we meant to do.
%Have a look at the compiler warnings that we get below:

So what about the `this` keyword that's being used in the example above.
What is it and what does it do?

When the code in the body of the constructor is being executed, then that code is being executed in the context of the object that was just created.
The keyword `this` refers to the object that is being constructed.

In that particular example we don't actually need the keyword `this`.
We could just as well, simply, have written `X = x` and `Y = y`.
This is because there is no ambiguity.
What do we mean when we say that there is no ambiguity?
We mean that the variables `X` and `x`, for example, are both only defined in one place that's in scope in the constructor.

If however we had named the constructor parameters `X` and `Y`, meaning in uppercase then there would be ambiguity.
Think about it.
What are we assigning to what if we would say `X = X`?
The C# compiler will assume that we are referring to the local variable which means that we will be assigning the value of a variable to itself.
Which of course is pointless and not what we meant to do.
Have a look at the compiler warnings that we get below:

```{code-cell}
:tags: [raises-exception]
class Point
{
  public int X = 0;
  public int Y = 0;

  public Point (int X, int Y)
  {
    X = X;
    Y = Y;
  }
}
```

%TODO: WHAT DOES THE KEYWORD `THIS` MEAN


```{warning}
Work in progress.
```


### Overloading

Constructors are [overloadable](overloading).
This is known as "constructor overloading" and means that we can define multiple constructors that differ in their parameter lists and have different implementations.
This is very useful since it, for example, allows us to define types that can be instantiated in very different ways.

Consider for example the idea of a weekday.
If we have a type that models weekdays called `Weekday` then we can trivially think of a number of different ways to instantiate it.
To instantiate an object that represents Tuesday we might for example want to support the following different syntaxes.

```{code-cell}
:tags: [remove-input]
class Weekday
{
  public Weekday (string day) {}
  public Weekday (int day) {}
}
```

```{code-cell}
new Weekday (2);            // int
new Weekday ('T');          // char
new Weekday ("Tuesday");    // string
```

Notice how we're instantiating the same type, namely `Weekday`, in all three cases above.
However, notice also how the type of the argument that we pass to the constructor varies.
There are essentially three constructors.

```{code-cell}
class Weekday
{
  public Weekday (string day) { /* ... */ }
  public Weekday (int day) { /* ... */ }
  public Weekday (char day) { /* ... */ }
}
```

Whichever constructor is run depends on the data type we pass when we instantiate the class.


### Constructor chaining

```{warning}
Work in progress.
```


### Access modifiers


```{warning}
Work in progress.
```

%- TODO: Constructors can be private.
%- TODO: Example: Use static methods to allow us to only create "correct" vowel instances. Prefer compile-time errors over run-time errors.


### Expression-bodied members

As mentioned in an earlier chapter, constructors support the C# feature known as expression-bodied members.
This means that if we have a constructor whose implementation can be expressed as a single expression, then we can omit the curly braces (`{ }`) and instead use a fat-arrow (`=>`).
Like in the example below.

```{code-cell}
class Person
{
  public string Name;
  public Person (string name)
    => Name = name;
}
```


%### Order
%
%First field initializers, then chained constructor, then constructor?


## Examples

%### Vowels
%
%```{code-cell} csharp
%class Vowel
%{
%  char letter;
%
%  public Vowel (char vowel)
%  {
%    string legal = "AEIOU";
%    if (legal.IndexOf(Char.ToUpper(vowel)) == -1)
%      throw new ArgumentException("Must be a vowel (AEIOU).");
%    letter = vowel;
%  }
%
%  public char ToChar () => letter;
%
%  public static implicit operator char(Vowel v) => v.ToChar();
%}
%```
%Write a class that models the domain concept of English vowels.
%It should be possible to pass upper and lowercase vowels as characters when instantiating it, and it should be possible to extract these vowels again.
%See the usage examples below.
%
%```{code-cell} csharp
%char c1 = new Vowel('A').ToChar();
%Console.WriteLine(c1);
%```
%
%```{code-cell} csharp
%char c2 = new Vowel('u').ToChar();
%Console.WriteLine(c2);
%```
%
%Rember the maxim [types over tests](types-over-tests)?
%It suggests that illegal states shouldn't be representable.
%If you try to instantiate the class by passing a non-vowel character then the class should throw an `ArgumentException`.
%
%```{code-cell} csharp
%:tags: [raises-exception]
%new Vowel('z').ToChar();
%```
%
%
%We have learned that illegal states should not be representable.
%We have also learned that compile-time errors are preferable over run-time errors.
%Rewrite the class `Vowel` that you wrote in {numref}`ex:constructors:vowel` so that we get a compile-time error instead of a run-time error whenever we try to instantiate it with a non-vowel.
%
%Hint: Use [enums](enums).


%### Robber's cipher
%
%As we create a class to encapsulate this encoding logic we need to ask ourselves whether we want the two parameters `input` and `steps` to be given as arguments to the `Encode` method or to the constructor.
%We will opt for setting the `steps` in the constructor, and the `input` in the method.
%This very much determines what kind of objects we create with this class.
%Let's first look at the code and then discuss the consequences of what we choose to put in the constructor.

%Back to the question of constructor parameters.
%Think about it.
%If we take `steps` in the constructor and `input` in the instance method `Encode` then we're creating a step-specific cipher that can encode any character.
%You instantiate the cipher, can pass it around, and can send it any character upon which you get back an encoded character.
%
%What kind of objects would we have been creating if we instead exposed both `steps` and `input` in the constructor?
%Well, in that case the `Encode` method would be nullary, meaning it would not take any arguments.
%When we call `Encode` we would always get back the same value since `Encode` is a [pure](purity) method.
%Choosing this strategy would imply that we are looking for the ability to evaluate translations at a later time.
%Meaning that we have all the input data available beforehand and want to "preload" it.
%But that we want to be able to wait before we execute the encoding.
%
%```csharp
%class CaesarCipher
%{
%  string input;
%  int steps;
%  public CaesarCipher (string input, int steps) // ...
%  public char Encode () => // ...
%}
%```
%
%What kind of objects would we have been creating if we instead exposed `input` in the constructor but took `steps` as an argument in `Encode`?
%This would imply that we want to be able to pass around an object that contains the information to be encoded, but we don't know how many steps we want to encode it with.
%
%```csharp
%class CaesarCipher
%{
%  string input;
%  public CaesarCipher (string input) // ...
%  public string Encode (int steps) => // ...
%}
%```
%
%What kind of objects would we have been creating if we instead didn't expose *any* arguments in the constructor and instead took both as arguments in `Encode`?
%Well, since the constructor is parameterless and since the `Encode` method is [pure](purity), all instances of the cipher would essentially be equivalent.
%There isn't too much of a point of wrapping this in a class in that case.
%Sure, if we can identity other classes that have a different implementation of `Encode` but still share exactly the same signature, it would be meaningfull.
%Because then we could still use [subtype polymorphism](subtype-polymorphism).
%But given the case of ciphers, I feel it quite unlikely that we would find such ciphers.
%
%```csharp
%class CaesarCipher
%{
%  public char Encode (char input, int steps) => // ...
%  public string Encode (string input, int steps) => // ...
%}
%```
%
%```{seealso}
%If you happen to be familiar with functional programming, then choosing what parameters to expose in the constructor resembles the problem of determining the order of function arguments to allow for useful partial application.
%If you are not familiar with functional programming, please ignore what I just said.
%```
%
%When we get to the chapters on [subtype polymorphism](subtype-polymorphism) and [abstract injected object composition](abstract-injected-object-composition) you will start to see why it is so important to think about what you expose in your instance methods and what you "preload" in the constructor.
%I know that this statement doesn't make sense yet, but when you want to use subtype polymorphism whatever instance method you want to override/implement has to have the same signature in all subtypes.
%
%```{warning}
%If we want to be able to easily switch between different kinds of ciphers (like for example Caesar, Reverse, and Robber's language) then it is important that we define our instance methods so that they *don't* require arguments that are specific to any particular subset of ciphers.
%```
%
%Don't worry if you still feel confused about why we chose to put `steps` in the constructor and `input` in the instance method.
%After the chapters on [subtype polymorphism](subtype-polymorphism) and [abstract injected object composition](abstract-injected-object-composition) you should have a much better idea.


### Robber's cipher vowel

In the chapter on [fields](fields) we gave an example where we assigned the consonant `B` to a field that was supposed to contain a vowel.
Let's add a constructor to that class so that we can ensure that every time we have an instance of the class `RobbersCipherVowel` we know that it contains an actual vowel.

```{code-cell} csharp
class RobbersCipherVowel
{
  public char Vowel;
  public RobbersCipherVowel (char vowel)
  {
    Vowel = vowel switch {
      'A' or 'a' or 'E' or 'e' or 'I' or 'i' or 'O' or 'o' or 'U' or 'u'
        => vowel,
      _ => 'o'
    };
  }
}
```

Pretty neat right?
What happens if we now try to create an instance of `RobbersCipherVowel` by passing a consonant (or any other non-vowel character for that matter) to the constructor?
Well, the constructor will simply ignore the character that we sent it and instead just use the character `'o'` that we chose as the default.

```{code-cell} csharp
RobbersCipherVowel certainlyVowel = new RobbersCipherVowel('K');
Console.WriteLine(certainlyVowel.Vowel);
```

%Arguably, it would make sense to use an [enum](enums) for input instead.
%We're not going to write that code since it's given to you as {numref}`ex:constructors:vowel-enums`.
%However, we're going to talk a lot more about the idea of using types that prevent your data types from ever entering illegal states in the chapter on [types over tests](types-over-tests).

But wait a minute!
What if someone just changes the vowel *after* the object has been created?

```{danger}
Be weary of mutating fields and properties.
```

```{code-cell} csharp
certainlyVowel.Vowel = 'K';
Console.WriteLine(certainlyVowel.Vowel);
```

That's definitly not a vowel!
This is a problem caused by allowing mutation and not actually embracing encapsulation.
We're actually not encapsulating the vowel.
We're not actually hiding it from the outside world.
When we say that it is `public` we've exposed it.
And since it's a field, that means that anyone can change it.

To encapsulate the vowel we need to learn about [instance methods](instance-methods) or [properties](properties).


(exception-arguments)=
### Exceptions

Remember how we discussed that [expections](throwing-exceptions) are just regular classes and that we can instantiate and then throw them ourselves?
There are two things we must learn about exceptions when talking about constructors.

1. We can pass arguments to the constructor when instantiating an exception.
2. We can throw exceptions in our own constructors when users try to create instances of our type that doesn't make sense.

If an exception is just a class, then that means that when we are instantiating them we are running a constructor.
Which in turn means that the constructor might take arguments.

I've mentioned that we'll make heavy use of the type `ArgumentException`, and it just so happens that this class, as many other exception classes in .NET, defines a constructor that takes a single `string` as an argument.
This `string` is the message that we want to send with the exception when it is thrown.

We can use this feature in order to tell the user more about what went wrong when something went wrong.
Have a look at how we're using exceptions below to guarantee that a Balloon without a text cannot be created.

```{code-cell}
:tags: [raises-exception]
class Balloon
{
  public string Text = "";

  public Balloon (string text)
  {
    if (text == null || text == "")
      throw new ArgumentException($"Text must be non-null and non-empty.");
    this.Text = text;
  }
}
```

### Static factory methods

```{warning}
Work in progress.
```

%!!!!!!!!!!!!!!!!!!!!!
%!!!!!!!!!!!!!!!!!!!!!
%!!!!!!!!!!!!!!!!!!!!!
%!!!!!!!!!!!!!!!!!!!!!
%VOWEL EXAMPLE AND STATIC FACTORIES



## Exercises

```{exercise}
How can we make use of the keyword `this` in a constructor?
```

```{exercise}
What is constructor overloading and constructor chaining?
How do they relate to eachother?
```

```{exercise}
Write your own example that shows how constructor overloading works.
```

```{exercise}
Write your own example that shows how constructor chaining.
```

```{exercise-start}
```
The code below generates warnings and doesn't behave as intended.
How do we get rid of the warning and make it behave as the programmer most likely intended it to behave like?
```{code-cell}
class Cat
{
  string Name;

  public Cat (string Name)
    => Name = Name;
}
```
```{exercise-end}
```


%```{exercise}
%:label: ex:constructors:vowel-enums
%
%Use constructor overloading to add another constructor to the class `CaesarCipherVowel` from this chapter.
%The new constructor should take an [enum](enums) that only can be set to vowels.
%Make sure that the updated class still can be used in the encode methods of the static class `RobbersCipher` from the chapter on [fields](fields).
%```


```{exercise}
When and why would you choose to expose a parameter through the constructor as opposed to through an instance method?
Explain using your own words.
```


%```{exercise}
%TODO: First name and last name.
%```


%```{exercise-start}
%:label: ex:constructors:vowel
%```
%Below you'll find a draft of a class called `Weekday`.
%```{code-cell}
%class Weekday
%{
%  public int Day;
%  public Weekday (int day) { /* ... */ }
%  public Weekday (string day) { /* ... */ }
%  public Weekday (char day) { /* ... */ }
%}
%```
%Complete the definition of the class so that we can use it to run the following code and get the same result.
%```{code-cell} csharp
%class Weekday
%{
%  int day;
%
%  public Weekday (int day)
%  {
%    if (weekday < 1 || weekday > 7)
%      throw new ArgumentException("Number must be between 1 and 7.");
%  }
%
%  public Weekday (string day)
%  {
%    string[] legal = new string[] {
%      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" }
%    Array.IndexOf(legal, day)
%    if (legal.IndexOf(Char.ToUpper(vowel)) == -1)
%      throw new ArgumentException("Must be a vowel (AEIOU).");
%    letter = vowel;
%  }
%
%  public Weekday (int weekday)
%  {
%    if (weekday < 1 || weekday > 7)
%      throw new ArgumentException("Number must be between 1 and 7.");
%  }
%
%  public char ToChar () => letter;
%
%  public static implicit operator char(Vowel v) => v.ToChar();
%}
%```
%Write a class that models the domain concept of English vowels.
%It should be possible to pass upper and lowercase vowels as characters when instantiating it, and it should be possible to extract these vowels again.
%See the usage examples below.
%
%```{code-cell} csharp
%char c1 = new Vowel('A').ToChar();
%Console.WriteLine(c1);
%```
%```{code-cell} csharp
%char c2 = new Vowel('u').ToChar();
%Console.WriteLine(c2);
%```
%Rember the maxim [types over tests](types-over-tests)?
%It suggests that illegal states shouldn't be representable.
%If you try to instantiate the class by passing a non-vowel character then the class should throw an `ArgumentException`.
%
%```{code-cell} csharp
%:tags: [raises-exception]
%new Vowel('z').ToChar();
%```
%```{exercise-end}
%```


%```{exercise-start}
%```
%We have learned that illegal states should not be representable.
%We have also learned that compile-time errors are preferable over run-time errors.
%Rewrite the class `Weekday` that you wrote in {numref}`ex:constructors:vowel` so that we get a compile-time error instead of a run-time error whenever we try to instantiate it with a non-vowel.
%
%Hint: Use static factory methods.
%```{exercise-end}
%```

```{exercise}
Write a class that can be used to represent phone numbers for your country.
Rember the maxim [types over tests](types-over-tests).
Illegal states should not be representable.
```


%
%```{code-cell}
%class Vowel
%{
%  char vowel;
%
%  public Vowel (char vowel)
%  {
%    this.vowel = vowel;
%  }
%}
%```
