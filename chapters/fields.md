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

# Fields
%- Public / private / protected.
%- Static / instance.
%- Also works on struct.
%- Only use private / protected fields.

%- [Initialized to default value](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/variables)


## Motivation

We've said that objects mix data and methods.
We've referred to this idea as [encapsulation](encapsulation).
That objects "encapsulate" data.
In this chapter we're going to talk about what it means for objects to encapsulate data.

In many languages, we call a variable that is encapsulated in an object an "instance variable".
In C# we use the term "instance field".
The concept of "fields" is used both for "instance fields" and "static fields".

Since this is a book on object oriented programming, and not procedural programming, we will almost exclusively discuss instance fields.
In the chapter on [static methods](static-methods) we learned that static methods are methods that are namespaced to a class.
We also learned that this is an idea from procedural programming and that it has nothing to do with object oriented programming.

Another key idea in object oriented programming is that of [subtype polymorphism](subtype-polymorphism).
In an object oriented langauge, both instance methods and instance variables are usually implemented so that they support subtype polymorphism.
But this is something we'll get to later.


## Definition

The term "instance variable", I think, is really quite revealing.
Instance variables are variables that are connected to an instance.
In other words, they are variables whose values might vary on an object-to-object basis.

If we have two balloons, and we write the letter `'A'` on one of them, and the letter `'B'` on the other then these balloons have different states.
The two balloons are both still balloons, but their states are different.

### Declaration

We declare an instance field just like we define a regular [local variable](variables).
By specifying the type of the variable, and then the identifier name that we want to use for the variable.
However, we declare instance or static variables (meaning fields) "inside" the definition of the class.

If we add the keyword `static` before the type in the declaration, then we are making a static field.
If we don't add the keyword `static` then we are making an instance field.

```
<class-identifier>
{
  <access-modifier> [static] <field-type> <field-identifier>;
}
```

In the example below, we've got a class called `Balloon`, with two instance fields.
One is called `Text` and the other is called `Diameter`.

```{code-cell}
:tags: [remove-stderr]
class Balloon
{
  public string Text;
  public int Diameter;
}
```

What is this keyword `public` that we in the definition above called an "access modifier"?
We'll talk about this more, first in the chapter on [basic access modifiers](basic-access-modifiers), and then in the one on [advanced access modifiers](advanced-access-modifiers).
In short, when marking an instance field as `public` we're saying that whoever has access to an instance of this class will have read and write access to this instance field.

One of the core ideas in object oriented programming, is that of information hiding.
We talked about this in the chapter on [objects](objects).
However, when we are using the keyword `public` we are not actually "hiding" our data.
We are not "hiding our private parts".
Another way to say this, is that we are "breaking encapsulation".
So why do we do this here?
Well, we've got to start somewhere right?
Once we've learned about [instance methods](instance-methods) and about [constructors](constructors), we will never have to (nor should) use public instance fields again.

```{warning}
By using `public` instance fields we are violating the pricinple of information hiding.
Another way to say this, is that we are "breaking encapsulation".
We're only using `public` here as a step on our learning journey.
Once we've learned about [instance methods](instance-methods) and [constructors](constructors) we should always make our instance fields `private`.
```

### Access

When an object exposes an instance field (or an [instance method](instance-methods) for that matter) then we can access it using dot-notation.
We've already used dot-notation when interacting with [arrays](arrays), but we never really discussed why we interact with the object that way.

To access some instance field of some object we simply type the name of the object, a dot (`.`), and then the name of the instance field.

```
[variable].[instance-field];
```

We can also set values to the instance field, just like we would assign any old local variable.

```
[variable].[instance-field];
```

If we've got an instance of the class `Balloon` (which we declared earlier in this chapter) then we can set and get both the `Text` field as well as the `Diameter`.

```{code-cell}
Balloon b1 = new Balloon();
Balloon b2 = new Balloon();

b1.Text = "A";
b2.Text = "B";

Console.WriteLine(b1.Text);
Console.WriteLine(b2.Text);
```

Of course, when we are setting a value to an instance field of some instance then we are only setting the value to the instance field of *that particular instance*.
Other instances of the same type are not affected.
Notice how we can set the text of any of the two balloons in the example above, without affecting the other.


### Initialization

We can initialize an instance field, just like we initialize a regular variable.
Whenever we create an instance of the class, all instance field initializers are run.
We haven't talked about [constructors](constructors) yet, but since instance fields, in C#, are initialized *before* the constructor runs, we can use the constructor to override any values we've set in the initializers.
But more on this in the chapter on constructors.

If we don't specify an initializer for an instance field then that instance field will, in C#, be assigned the default value for its type.
You can read more about the different default values for different types in the [official documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/variables).


```{code-cell}
:tags: [remove-stderr]
class Balloon
{
  public string Text;  // Defaults to `null`.
  public int Diameter; // Defaults to 0.
}
```

```{code-cell}
Console.WriteLine( new Balloon().Text == null );
```

```{code-cell}
Console.WriteLine( new Balloon().Diameter == 0 );
```


(object-initializers)=
### Object initializers

When you've got a class whose instance fields you have access to, it is, in C#, possible to use the "object initializer" syntax.
This syntax allows us to instantiate an object and immediately assign values to its instance fields all in a single [statement](statements).
This feature is also available for instance [properties](properties), but we'll talk about that in a separate chapter.

This means that we can instantiate an object and assign values to its instance properties in a single statement like this:

```{code-cell}
Balloon inflated = new Balloon { Text="Inflated", Diameter=20 };
Balloon deflated = new Balloon { Text="Deflated" };
```

Notice how, in the second example above, we're not setting any value to the instance field `Diameter`.
In other words, we can use object initializers to set any number of instance fields that we want, and we don't have to set all.

If we didn't have object initializers we would have to write multiple statments in order to achieve the same results as the statements above.

```{code-cell}
Balloon inflated = new Balloon();
inflated.Text = "Inflated";
inflated.Diameter = 20;

Balloon deflated = new Balloon();
deflated.Text = "Deflated";
```


### UML class diagrams

In UML class diagrams, instance fields are modeled by what UML calls "attributes".
Remember how, in the chapter on [classes](classes), we discussed that the section that lists class members of a class in a UML class diagram is divided in two subsections.
The first lists attributes, and the second lists operations.
Instance fields in C# (as well as [properties](properties) which we'll talk about soon) are represented as attributes in UML class diagrams.

The balloon class would, in a UML class diagram, be represented as the right class in the figure below.

```
|--------------------|     |--------------------|
| <class identifier> |     |       Balloon      |
|--------------------|     |--------------------|
|                    |     | Text : string      |
|    <attributes>    |     | Diameter : int     |
|                    |     |                    |
|--------------------|     |--------------------|
|                    |     |                    |
|    <operations>    |     |                    |
|                    |     |                    |
|--------------------|     |--------------------|
```

Notice how, when listing an attribute we also write out the type of the attribute.
In the chapter on [classes](classes:uml) we mentioned that UML class diagrams are often draw with a varying level of informality.
As such, the data types of attributes are often omitted if the situtation doesn't require them in order to explain whatever it is we're trying to explain.




## Examples

### Coordinates

Let's use objects with instance fields to model players in some ficticious game that can move on a two dimensional grid.
We'll call the class `Player` and we'll give it three instance fields: a `Name`, an `X` coordinate, and a `Y` coordinate.
We might define the class like this:

```{code-cell}
class Player
{
  public int X = 0;
  public int Y = 0;
  public string Name = "Unnamed";
}
```

We can now instantiate players like this:

```{code-cell}
Player p1 = new Player();
Player p2 = new Player();
```

We can also set the values of their instance fields like this:

```{code-cell}
p1.Name = "Player 1";
p2.Name = "Player 2";
```

Let's now write a method that can print a player.

```{code-cell}
void printPlayer (Player player)
  => Console.WriteLine($"{player.Name}: ({player.X},{player.Y})");
```

We can now use that method to print players.

```{code-cell}
printPlayer(p1);
```

Let's now write a method that we can use to move a player multiple times.
It takes a `Player` and a `string`.
The `string` will be broken up into a list of characters and for every character that contains a letter corresponding to a direction (`N` for north, `E` east, `S` for south, and `W` for west) the player is moved one step in that direction.

```{code-cell}
void movePlayer (Player player, string moves)
{
  foreach (char move in moves)
  {
    player.X += move switch { 'E' => 1, 'W' => -1, _ => 0 };
    player.Y += move switch { 'N' => 1, 'S' => -1, _ => 0 };
  }
}
```

Let's now move the two players around and then use our printing method to print their updated positions.

```{code-cell}
movePlayer (p1, "SSSESE");
movePlayer (p2, "NNSWSEE");
printPlayer(p1);
printPlayer(p2);
```



%### Robber's cipher
%
%Let's start by creating a class for the [Robber's cipher](robbers-cipher) whose instances will hold the vowel that we want to use in a [Caesar cipher](caesar-cipher).
%Eventually, we'll also incorporate instance methods that operate on this encapsulated vowel but let's take it one step at a time, eh.
%
%Let's call the class `RobbersCipherVowel` and let's call the field `Vowel`.
%We'll make the field `public` so that anyone who has access to an object of type `RobbersCipherVowel`.
%
%```{code-cell} csharp
%class RobbersCipherVowel
%{
%  public char Vowel = 'o';
%}
%```
%
%We can now instantiate ciphers.
%
%```{code-cell} csharp
%RobbersCipherVowel v1 = new RobbersCipherVowel();
%RobbersCipherVowel v2 = new RobbersCipherVowel();
%```
%
%And assign them different vowels.
%
%```{code-cell} csharp
%v1.Vowel = 'a';
%v2.Vowel = 'B';
%```
%
%```{danger}
%Wait a minute!
%`B` is not a vowel.
%We'll have a look at this problem in the chapter on [constructors](constructors).
%```
%
%Of course we could then rewrite the encode methods that we wrote in the chapter on [overloading](overloading:examples:robbers) so that they take a parameter of type `RobbersCipherVowel` instead of simply a `char`.
%
%```{code-cell} csharp
%static class RobbersCipher
%{
%  public static string Encode (char input, RobbersCipherVowel vowel)
%    => input switch {
%      'B' or 'b' or 'C' or 'c' or 'D' or 'd' or 'F' or 'f' or 'G' or 'g' or 'H' or 'h' or 'J' or 'j' or 'K' or 'k' or 'L' or 'l' or 'M' or 'm' or 'N' or 'n' or 'P' or 'p' or 'Q' or 'q' or 'R' or 'r' or 'S' or 's' or 'T' or 't' or 'V' or 'v' or 'W' or 'w' or 'X' or 'x' or 'Y' or 'y' or 'Z' or 'z'
%      => $"{input}{vowel.Vowel}{input}",
%    _ => $"{input}"
%  };
%
%  public static string Encode (string input, RobbersCipherVowel vowel)
%  {
%    string output = "";
%    foreach (char letter in input)
%      output += Encode (letter, vowel);
%    return output;
%  }
%}
%```
%
%The static encode methods still work but now we have to pass them instances of `RobbersCipherVowel` in order to run them.
%
%```{code-cell} csharp
%Console.WriteLine( RobbersCipher.Encode( "Hello", v1) );
%```
%
%```{code-cell} csharp
%Console.WriteLine( RobbersCipher.Encode( "Hello", v2) );
%```
%
%Seems to work.




## Discussion

The way we've solved problems in the examples of this chapter is **not** following the object oriented way.
In these examples we use objects as [data structures](data-structures), not as [agents](objects) that you can send messages to.

```{important}
In object oriented programming we mix methods and data. We don't simply store data in object and then pass these objects to methods so that they can extract the data.
```

In our examples above we're not solving problems in an object oriented fashion.
We're simply using objects as containers of data.
To really utilize the ideas of object oriented programming we need to move forward and at least learn about [instance methods](instance-methods) and [constructors](constructors).



## Exercises

```{exercise}
What are *fields*?
```

```{exercise}
What is the difference between an *instance field* and a *static field*?
```

```{exercise}
We tend to say that `public` instance fields "break encapsulation".
What is meant by this?
Another way to say this is that making instance fields `public` breaks the prinicple of "information hiding".
```


```{exercise-start}
:label: ex:fields:point
```
Write a class called `Point` that models a point in three-dimensional space.
It should expose three `public` instance fields called `X`, `Y`, and `Z` of type `int`.
The fields should be initialized to the value `0`.

Then define a local or static method that takes a point and prints it to screen.

With the class and the method in place you should be able to run the following code and get the same output.

```{code-cell} csharp
:tags: [remove-input]
class Point
{
  public int X = 0;
  public int Y = 0;
  public int Z = 0;
}

void printPoint (Point p)
  => Console.WriteLine($"{{X={p.X}, Y={p.Y}, Z={p.Z}}}");
```

```{code-cell} csharp
Point p1 = new Point();
Point p2 = new Point();

p1.X += 2;
p1.X *= 2;
p1.Y = 3;
p1.Z = 2;

p2.X = -4;
p2.Y += 3;
p1.Z /= 2;

printPoint(p1);
printPoint(p2);
```
```{exercise-end}
```


```{exercise-start}
:label: ex:fields:move-points
```
Start with the code that you wrote in {numref}`ex:fields:point`.
Write three local or static methods with the following signatures:

```csharp
void movePointsInX (int delta, Point[] points);
void movePointsInY (int delta, Point[] points);
void movePointsInZ (int delta, Point[] points);
```

The methods should iterate over all points in the array `points` and apply the `delta` to the dimension that the method corresponds to.
The method `movePointsInX` should apply the delta to the instance field `X`, the method `movePointsInY` to `Y`, and `movePointsInZ` to `Z`.

When you've implemented the method, you should be able to run the following code and get the same result.

```{code-cell}
:tags: [remove-input]

void movePointsInX (int delta, Point[] points)
{
  foreach (Point point in points)
    point.X += delta;
}

void movePointsInY (int delta, Point[] points)
{
  foreach (Point point in points)
    point.Y += delta;
}

void movePointsInZ (int delta, Point[] points)
{
  foreach (Point point in points)
    point.Z += delta;
}
```

```{code-cell}
Point p1 = new Point() { X=10, Y=20, Z=50 };
Point p2 = new Point() { X=1,  Y=2,  Z=5  };

Point[] points = new Point[] { p1, p2 };

movePointsInX(5, points);
movePointsInY(-20, points);
movePointsInZ(100, points);

printPoint(p1);
printPoint(p2);
```

```{exercise-end}
```


```{exercise-start}
:label: ex:fields:delta
```
Start with the code that you wrote in {numref}`ex:fields:point`.
In {numref}`ex:fields:move-points` we solved the problem of applying some delta to a number of potentially different points at the same time.
Let's solve that in a slightly more general way now.

Write a new class called `Delta` which contains three `public` instance fields of type `int`, named `X`, `Y`, and `Z`.
Then write a new static or local method with the signature below.

```csharp
void movePoints (Delta delta, Point[] points);
```

When you've implemented both the class and the method you should be able to run the following code and get the same result.

```{code-cell}
:tags: [remove-input]
class Delta
{
  public int X = 0;
  public int Y = 0;
  public int Z = 0;
}

void movePoints (Delta delta, Point[] points)
{
  foreach (Point point in points)
  {
    point.X += delta.X;
    point.Y += delta.Y;
    point.Z += delta.Z;
  }
}
```

```{code-cell}
Point p1 = new Point() { X=10, Y=20, Z=50 };
Point p2 = new Point() { X=1,  Y=2,  Z=5  };

Point[] points = new Point[] { p1, p2 };

movePoints(new Delta() { X = 5 }, points);
movePoints(new Delta() { Y = -20 }, points);
movePoints(new Delta() { Z = 100 }, points);

printPoint(p1);
printPoint(p2);
```
```{exercise-end}
```


```{exercise-start}
```
Start with the code that you wrote in {numref}`ex:fields:point`.
Write a local or static method with the following signature:

```csharp
Point[] makeIncrementingPoints (int numPoints, int incrementor, Point first);
```

The method should generate an array of elements of type `Point`.
The array should contain `numPoints` number of points and the `X` and `Y` coordinates of each point should be `incrementor` higher than the last point in the array.
The point `first` must be the first point in the generated array.

When you are done you should be able to run the following code and get the same output.

```{code-cell}
:tags: [remove-input]
Point[] makeIncrementingPoints (int numPoints, int incrementor, Point first)
{
  Point[] points = new Point[numPoints];
  points[0] = first;
  for (int i=1; i<numPoints; i++)
  {
    points[i] = new Point();
    points[i].X = points[i-1].X + incrementor;
    points[i].Y = points[i-1].Y + incrementor;
    points[i].Z = points[i-1].Z + incrementor;
  }
  return points;
}
```

```{code-cell}
void printPointArray (Point[] points)
{
  foreach (Point point in points)
    printPoint(point);
}

Point initial = new Point();
initial.X = 10;
initial.Y = 10;
initial.Z = 10;
printPointArray(makeIncrementingPoints(5, 10, initial));
```
```{exercise-end}
```

```{exercise}
Draw a UML class diagram containing both the class `Point` from {numref}`ex:fields:point` and the class `Delta` from {numref}`ex:fields:delta`.
Remember to represent all instance fields.
```


% TODO: Add exercise where you build a Point class with an arbitrary number of dimensions.
%```{code-cell}
%class Delta
%{
%  public int Dimension = 0;
%  public int Value = 0;
%}
%
%class Point
%{
%  int[] position;
%}
%```

