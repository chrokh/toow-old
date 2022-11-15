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

# Interfaces

The word "interface" is, in object oriented programming commonly used to mean two different but related things.

1. A contract or an abstraction.
2. A data type declared using the keyword `interface` present in many object oriented languages.

In this chapter we'll make a distinction between these two by either saying "interface" or `interface`.
Let's start with the abstract idea of an interface.
What is an interface?

%## The idea

```{important}
An interface defines *what* something can do without defining *how* it does it.[^defaults]
```

% TODO: Interface default implementations:
[^defaults]: Since C# 8.0, it is possible to define "default implementations" in interfaces which means that it now actually is possible to define the "how" in an interface. This chapter will soon be updated with more on this topic.

Remember how we've learned that a [class](classes) consists of a bunch of instance and static members?
Members are either methods or variables.
Then we have [properties](properties) which can be thought of somewhere in between methods and variables.

The set of all [public](access-modifiers) [instance members](classes) of a class are part of what we call the "interface" of a class.
An interface is a "contract" that tells us what we can do with something.
In other words, the set of all public members define *what* we can do with objects of the class.

Think of it like a standard.
If you've got a thing that adheres to some standard then you know how you can use that thing even if you don't know how the thing works "inside".
A power plug can be plugged into an outlet if they share the same standard.
We don't have to understand voltage, wattage, and amperage in order to use it.

If we've got an object and all we know is its interface then we know what methods we can call and what types to expect in return.
We know what variables we can access and what types they have.


## Motivation

Why is this a good idea?
What's the point?
Let's use an analogy.
Think about screws, bolts, and screwdrivers.
The drive type of the screw or bolt determines what screwdriver you need to screw or unscrew it.
The same screwdriver can however be used to drive a wide number of different types of screws and bolts.
Some fit into nuts, some are intended to penetrate material.
Some are left-handed and some are right-handed.
The same screwdriver can be used since different types of screws and bolts share the same drive type.

The drive type is what we would refer to as the "interface".
Think of it as a "standard".
It is the contract between the screw and the screwdriver.
Screw manufacturers make sure that their screw heads adhere to a standardized drive type.
Similarly, screwdriver manufacturers make sure that their screwdrivers adhere to a standardized drive type.

%TODO: Replace image
```{figure} https://images.unsplash.com/photo-1597424216809-3ba9864aeb18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80
:name: fig:screws-nuts-and-screwdrivers
:height: 300px

The same type of screw driver can be used with many types of screws. [Image will be replaced soon.] [[Image source](https://unsplash.com/photos/uOIvZYZ3PwA).]
```

This separation between interface and implementation has immense benefits.
For one we don't have to buy a new screwdriver every time we buy a new screw.
In programming we refer to this as [reusability](reusability).

But also, it means that we don't have to coordinate between screw manufacturers, bolt manufacturers, and screwdrive manufacturers.
In programming we refer to this as [modifiability](modifiability).
We'll talk more about both reusability and modifiability in the chapter on [maintainability](maintainability).

%This is what we, in the chapter on maintainability, will refer to as "[reusability](reusability)".
%This is what we, in the chapter on maintainability, will refer to as "[modifiability](modifiability)".


## Definition

An interface is often referred to as an "abstraction" while classes, in contrast, are referred to as "concretions".
Classes are concrete in the sense that they can be instantiated into objects.
Interfaces can however *not* be instantiated.

```{important}
A class defines a compile-time and a run-time type.
Interfaces *only define compile-time types* and cannot be instantiated.
```

In other words, an interface is only a compile-time type.
At run-time, any interface must be replaced by a run-time type.


### The idea

Consider for example the following definition of a class called `Coordinate`:

```{code-cell} csharp
class Coordinate
{
  public int X { get; set; }
  public int Y { get; set; }

  public Coordinate (int x, int y)
  {
    X = x;
    Y = y;
  }

  public void Translate (int x, int y)
  {
    X += x;
    Y += y;
  }
}
```

What is the interface of the class `Coordinate`?
Well there are three public instance members:

1. The property `int X`.
2. The property `int Y`.
3. The instance method `void Translate (int x, int y)`.

These public instance members are what we would call the "interface", or sometimes the "public interface", of the class `Coordinate`.


### The keyword

Even though we can talk about the abstract idea of the interface of the class `Coordinate`, we cannot talk about any concrete `interface` since it doesn't implement one.
What would a concrete `interface` that captures the same idea look like?
How about this:

```{code-cell} csharp
interface ICoordinate
{
  int X { get; set; }
  int Y { get; set; }
  void Translate (int x, int y);
}
```

```{note}
In C# the letter `I` is conventionally prepended to the name of an interface.
So instead of naming an interface `Collection` we would name it `ICollection`.
This is purely a convention and serves no technical purpose.
It is however uncommon to find code that doesn't respect this convention.
```

Remember how we said that interfaces only define compile-time types and hence cannot be instantiated?
If we try to instantiate an interface we get an error.

```{code-cell} csharp
:tags: [raises-exception]
ICoordinate coord = new ICoordinate();
```

However, since interfaces do define compile-time types it is only the right-hand side of the assignment statement above that's problematic.
The left-hand side is entirely fine.
We can declare a variable of type `ICoordinate` and our code will compile just fine.

```{code-cell} csharp
ICoordinate coord;
```

### Implementing an interface

But wait a minute you might say.
If I can declare a variable to be of type `ICoordinate` but there are no instances of `ICoordinate` how could this possibly be useful?
What can I put inside the variable?
Glad you asked.
We have now arrived at the magical destination know as [subtype polymorphism](subtype-polymorphism).
But let's finish up our discussion on interfaces before we dig too deep in that idea.

We cannot instantiate an `interface`, but we can declare that some concrete class or [abstract class](inheritance) (more on this later) *implements the interface*.
The key word here is "implements".
We say that some type implements some interface.

```{important}
A single type can implement multiple interfaces and the same interface can be implemented by multiple types.
```

To declare that a class implements an interface we use the colon (`:`) symbol after the name of the class in the class declaration and then specify the name of the interface.
When we compile our program the compiler will check whether our types actually implement all the members of the interfaces that they claim to implement.

In the example below we're defining an empty class called `Point` and claim that it implements the interface `ICoordinate`.
When compiling the program we get an error that states that we haven't implemented any of the members that `ICoordinate` demands.

```{code-cell} csharp
:tags: [raises-exception]
class Point : ICoordinate { }
```

But what about our previous class `Coordinate`.
Since we modeled the interface after that class, surely that class should be a valid implementation of `ICoordinate`.
Let's try it out.

```{code-cell} csharp
class Coordinate : ICoordinate
{
  public int X { get; set; }
  public int Y { get; set; }

  public Coordinate (int x, int y)
  {
    X = x;
    Y = y;
  }

  public void Add (Coordinate coord)
  {
    X += coord.X;
  }

  public void Translate (int x, int y)
  {
    X += x;
    Y += y;
  }
}
```

Yup, since the class `Coordinate` implements all the required members of the interface `ICoordinate` it is a valid implementation of it.
This means that we can now declare a variable with the compile-time type `ICoordinate` and run-time type `Coordinate` since the latter implements the interface of the former.

```{code-cell} csharp
ICoordinate coord = new Coordinate(0, 0);
```

Remember how we [way back](run-time-and-compile-time-types) said that the compile-time type and the run-time type don't necessarily have to be the same?
Remember how we said that we would see cases of that later?

Have a look at the assignment statement above.
The compile-time type on the left is an interface (or generally: an abstraction) while the run-time type on the right is a concrete class.
Why this is useful and what we can do with this is something that we'll deal with in the chapter on [subtype polymorphism](subtype-polymorphism).


### Implementing multiple interfaces

Before we move on we should mention that a class can implement multiple interfaces by simply separating them with commas.
Let's say that we want to split our previous interface into the two interfaces `IPositionable` and `ITranslatable`.

```{code-cell} csharp
interface IPositionable
{
  int X { get; set; }
  int Y { get; set; }
}

interface ITranslatable
{
  void Translate (int x, int y);
}
```

Have a look at the two classes below that both implement the two interfaces above.

```{code-cell} csharp
class Line : IPositionable, ITranslatable
{
  public int X { get; set; }
  public int Y { get; set; }
  public void Translate (int x, int y) { X += x; Y += y; }
}

class Square : IPositionable, ITranslatable
{
  public int X { get; set; }
  public int Y { get; set; }
  public void Translate (int x, int y) { X += x; Y += y; }
  public int Size { get; set; }
}
```

```{tip}
Interfaces with fewer members have, in theory, more potential possible implementations.
```


### Overlapping interfaces

If a class implements multiple interfaces that all require a member with the same signature then implementation of the member in the class is used for all the interfaces.
We can think of this as that the interfaces are "overlapping":
This is why the following code works.

```{code-cell}
interface IShape
{
  double Width { get; set; }
  double Height { get; set; }
  int Edges { get; }
}

interface IQuadrilateral
{
  double Width { get; set; }
  double Height { get; set; }
}

public class Rectangle : IShape, IQuadrilateral
{
  public double Width { get; set; }
  public double Height { get; set; }
  public int Edges { get; } = 4;
}
```

If you, in C#, want to distinguish the implementation of a member for one interface from an implementation of a member with the same name for another interface then you must use "explicit interface implementations".
This is not something we're going to discuss in this book so I advise you to have a look at the [official documentation](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/interfaces/explicit-interface-implementation) if you want to know more about this.
However, it would look something like the code below.

```{code-cell}
public class Rectangle : IShape, IQuadrilateral
{
  double IQuadrilateral.Width { get; set; }
  double IQuadrilateral.Height { get; set; }

  double IShape.Width { get; set; }
  double IShape.Height { get; set; }

  public int Edges { get; } = 4;
}
```

One downside of using explicit interface implementations in the case above is that these members are no longer publically accessible on objects whose compile-time type is `Rectangle`.
Consequently the following code generates a compile-time error.

```{code-cell}
:tags: [raises-exception]
Rectangle rect = new Rectangle();
rect.Width = 10;
```

The methods are however accessible when we choose to treat objects of type `Rectangle` as either `IQuadrilateral` or `IShape`.
So the following code does not generate a compile-time error.

```{code-cell}
IShape shape = new Rectangle();
shape.Width = 10;

IShape quadrilateral = new Rectangle();
quadrilateral.Width = 10;
```

Since we have yet to talk about subtype polymorphism it is understandable if you find this section a tad confusing.
If that is the case, then I highly recommend that you move on and come back to this section after you have groked subtype polymorphism.




### UML class diagram notation

In UML class diagram notation, interface implementation is called "realization" and is depicted using a dashed line with a hollow arrow head.
The arrow points from the implementation to the interface.

% TODO: REPLACE IMAGE!!
```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
:name: fig:uml-class-diagram-realization
:width: 300

In UML class diagram notation, interface implementation is called "realization" and is depicted using a dashed line with a hollow arrow head.
The arrow points from the implementation to the interface.
[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
```

```
┌─────────────────────────┐
│      <<interface>>      │
│         IShape          │
├─────────────────────────┤
│ + <get> Width : double  │
│ + <set> Width : double  │
│ + <get> Height : double │
│ + <set> Height : double │
├─────────────────────────┤
│                         │
│                         │
└─────────────────────────┘
            Δ
            ╎
            ╎
            ╎
┌─────────────────────────┐
│        Rectangle        │
├─────────────────────────┤
│ + <get> Width : double  │
│ + <set> Width : double  │
│ + <get> Height : double │
│ + <set> Height : double │
├─────────────────────────┤
│                         │
│                         │
└─────────────────────────┘
```

## Examples

### Shapes

Let's start off with something simple.
Let's define an interface called `IShape` with some properties.

```{code-cell}
interface IShape
{
  double Width { get; set; }
  double Height { get; set; }
  double Area { get; set; }
}
```

What are some possible implementations of the interface `IShape`?
Well how about a perfect circle and a rectangle?
Notice how the classes that implement the interface can define additional members, beyond what the interface demands.

```{code-cell}
:tags: [hide-input]
class Square : IShape
{
  public double Side { get; set; }

  public double Width
  {
    get => Side;
    set => Side = value;
  }

  public double Height
  {
    get => Side;
    set => Side = value;
  }

  public double Area
  {
    get => Side*Side;
    set => Side = Math.Sqrt(value);
  }

  public Square (double side)
    => Side = side;
}
```

```{code-cell}
:tags: [hide-input]
class PerfectCircle : IShape
{
  public double Radius { get; set; }

  public double Diameter
  {
    get => Radius * 2;
    set => Radius = value / 2;
  }

  public double Width
  {
    get => Diameter;
    set => Diameter = value;
   }

  public double Height {
    get => Diameter;
    set => Diameter = value;
  }

  public double Area
  {
    get => Math.PI * Math.Pow(Radius, 2);
    set => Radius = Math.Sqrt(Area / Math.PI);
  }

  public PerfectCircle (double radius)
    => Radius = radius;
}
```

Can we now assign objects of type `Square` or `Circle` where values of type `IShape` is expected?
Yes we can.
Why we would do this is something that we'll discuss in the chapter on subtype polymorphism.

```{code-cell}
IShape shape1 = new Square(1);
IShape shape2 = new PerfectCircle(0.5);
```



(interfaces:ciphers)=
### Cipher interfaces

Let's now rally up all the ciphers that we've implemented so far and let's try to write interfaces for them.
The class names of the ciphers we've seen so far are:

1. `ReverseCipher`
2. `RobbersCiphers`
3. `LeetCipher`
4. `CaesarCipher`
5. `FlipFlopCaesarCipher`

Since we have multiple overloads for the `Encode` method in these interfaces a naive (and incorrect!) first thought might be to implement the following interface:

```{code-cell}
:tags: [raises-exception]
interface ICipher
{
  char Encode (char input);
  string Encode (string input);
  string Encode (char input);
}
```

That covers all the overloads of these classes.
Importantly however, this is the [union](union), not the [intersection](intersection).
It is the "sum" of all overloads, not the overloads that all of them happen to implement.
Interfaces however should express members that all its implementers *share*.
Interfaces should express the intersection of members.

Note that it also gives us a compiler error, since we're trying to define two overloads of `Encode` that both take `char` as input but returns different output.
As we learned in the chapter on [overloading](overloading), this is not allowed.

But why do we want both an `Encode` method that returns a `char` and an `Encode` method that returns a `string`?
Well, we've talked about this before.
Remember how the `RobbersCipher` cannot implement an encoding method that takes a `char` and returns a `char`.
Why?
Because that's fundamentally not part of the specification of the Robber's cipher.
The smallest unit that a Robber's cipher encoding can return is a `string`.
Because if you are asked to encode a consonant then you must return three characters.
If you are passed `L` and `o` is used as the vowel, then you must return `LoL`.
There's just no way around it.

However, some other ciphers, such as the `CaesarCipher`, *can* convert single characters to single characters.
And since it would be useful to know that we've been returned only a single character we'd prefer to return values of type `char` rather than `string`.

%This is also in line with a design principle known as the [interface segration principle](interface-segregation-principle) which we will discuss in a later chapter.

So to avoid forcing classes that cannot implement certain methods to still implement these methods, we will write a separate interface for each overload.
We end up with the following interfaces:

% TODO: You could argue that we should create CharToChar+StringToString and CharToString+StringToString as two kinds of substitution ciphers. Cuz if you e.g. have CharToChar then you always also have StringToString. In fact you also always have CharToString. This would be interesting but I'm not sure how this affects everything when we get to generics. It would however simplify the inheritance stuff.

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

```{note}
Feeling upset about the fact that this is so verbose and that we need to have three different interfaces?
You have every right to be upset and your hunch is right.
Good on you!
When we get to the chapters on [generics](generics) we'll be able merge all three interfaces into one.
```


### Cipher implementations

Let's now make the ciphers actually implement all interfaces that they can.

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

As it turns out, all the above ciphers implement the interface `IStringToStringCipher`.
This means that we can use objects of these types interchangibly under that interface.
In other words, we can assign any object of these types to a variable of the compile-time type `IStringToStringCipher`.

```{code-cell} csharp
IStringToStringCipher cipher1 = new RobbersCipher('o');
IStringToStringCipher cipher2 = new CaesarCipher(1);
IStringToStringCipher cipher3 = new ReverseCipher();
```

Why this is extremely powerful will become apparent when we get to the chapter on [subtype polymorphism](subtype-polymorphism).
But in short, the point is that we can now call the method `Encode` without needing to have any idea of what the run-time type is of the thing that we are calling `Encode` on.


## Exercises

```{exercise}
What is the abstract idea of an interface?
Come up with your own example in natural language that's different from the example given in this chapter on screws, bolts, and screwdrivers.
```

```{exercise}
Explain the keyword `interface`?
```

```{exercise}
What is the difference between a `class` and an `interface`?
```


```{exercise-start}
:label: ex:interfaces:leet
```
Rewrite the class `LeetCipher` that you wrote in {numref}`ex:instance-methods:leet` so that it implements the two interfaces `IStringToStringCipher` and `ICharToCharCipher` that we defined earlier in this chapter.

```{code-cell} csharp
:tags: [remove-input]
class LeetCipher : IStringToStringCipher, ICharToCharCipher
{
  public char Encode (char input)
  {
    switch (input)
    {
      case 'L': return '1';
      case '1': return 'L';
      case 'A': return '4';
      case '4': return 'A';
      case 'O': return '0';
      case '0': return 'O';
      case 'T': return '7';
      case '7': return 'T';
      case 'E': return '3';
      case '3': return 'E';
      default: return input;
    }
  }

  public string Encode (string input)
  {
    string output = "";
    foreach (char c in input)
      output += Encode(c);
    return output;
  }
}
```
When you are done you should be able to run the following code and get the corresponding output.
```{code-cell} csharp
// Note how the compile-time and run-time types are different.
IStringToStringCipher stringCipher = new LeetCipher();
ICharToCharCipher charCipher = new LeetCipher();

string output1 = stringCipher.Encode("LEET");
char output2 = charCipher.Encode('E');

Console.WriteLine($"{output1} {output2}");
```
```{exercise-end}
```


```{exercise}
Can the class `LeetCipher` of {numref}`ex:interfaces:leet` also implement the interface `ICharToStringCipher`?
Why or why not?
```

```{exercise}
Can the class `RobbersCipher` also implement the interface `ICharToCharCipher`?
Why or why not?
```

```{exercise}
Rewrite the class `FlipFlopCaesarCipher` from the chapter on [concrete injected object composition](concrete-injected-object-composition) so that it implements all the interfaces from this chapter that you believe that it should implement.
Which ones did you choose and which did you not choose?
Why?
```


```{exercise}
Does an interface define a "[compile-time type](run-time-and-compile-time-types)", a "[run-time type](run-time-and-compile-time-types)", or both?
What does this mean?
```

```{exercise}
:label: ex:interfaces
1. Define your own interface.
2. Write a class that implements that interface.
3. Declare a variable whose compile-time type is your interface, and whose run-time type is your class.
4. Draw a UML class diagram of your interface and your class or classes.
```



