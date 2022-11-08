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
We've said that objects "encapsulate" data.
In this chapter we're going to talk about what it means for objects to encapsulate data.

In many languages, we call a variable that is encapsulated in an object an "instance variable".
In C# we use the term "instance field".
The concept of "fields" is used both for "instance fields" and "static fields".

Since this is a book on object oriented programming, and not procedural programming, we will almost exclusively discuss instance fields.
In the chapter on [static methods](static-methods) we learned that static methods are methods that are namespaced to a class.
In the chapter on [static variables](static-variables) we learned that static variables are variables that are namespaced to a class.
We also learned that these are ideas from procedural programming and that it has nothing to do with object oriented programming.

Another key idea in object oriented programming is that of [subtype polymorphism](subtype-polymorphism).
In an object oriented langauge, both instance methods and instance variables are usually implemented so that they support subtype polymorphism.
But this is something we'll get to later.


## Definition

The term "instance variable", I think, is really quite revealing.
Instance variables are variables that are somehow "connected" to an instance.
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

In the example below, we've got a class called `Rectangle`, with two instance fields.
One is called `Width` and the other is called `Height`.

```{code-cell}
:tags: [remove-stderr]
class Rectangle
{
  public int Width;
  public int Height;
}
```

What is this keyword `public` that we in the definition above called an "access modifier"?
We'll talk about this more, first in the chapter on [basic access modifiers](basic-access-modifiers), and then in the one on [advanced access modifiers](advanced-access-modifiers).
In short, when marking an instance field as `public` we're saying that whoever has access to an instance of this class will have read and write access to this instance field.

```{warning}
By using `public` instance fields we are violating the pricinple of "[information hiding](information-hiding)" that we talked about in the chapter on [objects](objects).
Another way to say this, is that we are "breaking encapsulation".
Yet another way is to say that we are failing to hide our "private parts", or our "implementation details".

So why do we use `public` here?
We've got to start somewhere and we're only using it as a stepping stone on our learning journey.
Once we've learned about [instance methods](instance-methods) and [constructors](constructors) we should always make our instance fields `private`.
```

### Access

% TODO: Must mention that you cannot access instance field that is not defined in class.

When an object exposes an instance field (or an [instance method](instance-methods) for that matter) then we can access it using dot-notation.

We've already used dot-notation when interacting with [arrays](arrays), but we never really discussed why we interact with the object that way.
Remember how you could ask an array for its length?

```{code-cell}
int[] numbers = new int[] { 10, 20, 30 };
Console.WriteLine(numbers.Length);
```

This works because `Length` is a [property](properties) of the array class.
Properties are like a mix between fields and instance methods but we'll get to that in the chapter on [properties](properties).
Nevertheless, this is an example of dot notation.
In fact, instance and static methods, instance and static properties, as well as instance and static fields are all accessed using dot notation.
% TODO: Has this not been discussed earlier in static stuff?

To access some instance field of some object we simply write an expression that yields an object (such as the name of a variable containing an object) followed by a dot (`.`) and then the name of the instance field.

```
[object].[instance-field];
```

We can also set values to the instance field, just like we would assign any old local variable.

```
[object].[instance-field];
```

If we've got an instance of the class `Rectangle` (which we declared earlier in this chapter) then we can *set* both the `Width` field as well as the `Height`.

```{code-cell}
Rectangle r1 = new Rectangle();
Rectangle r2 = new Rectangle();

r1.Width  = 100;
r1.Height = 50;

r2.Width = 20;
r2.Height = 10;
```

Of course, we cannot only *set* values, but we can also *get* them.

```{code-cell}
Console.WriteLine($"{r1.Width} x {r1.Height}");
Console.WriteLine($"{r2.Width} x {r2.Height}");
```

Let's write a method that we can use to print our rectangles.

```{code-cell}
void printRectangle (Rectangle rect)
  => Console.WriteLine($"{rect.Width} x {rect.Height}");
```

It is important to realize that when we are setting a value to an instance field of some instance then we are only setting the value to the instance field of *that particular instance*.
We are not mutating the class we are mutating *instances*.
Other instances of the same type are *not* affected.


### Mutation

It is also important to understand that since we're dealing with [reference types](value-and-reference-semantics), any two variables that are pointing to the same object has access to the same value.
So if we [mutate](mutation) the value using one variable, we will also mutate the other.

```{code-cell}
// Creating a new object and initializing a reference to it.
Rectangle fst = new Rectangle();

// Declaring a new variable and assigning it a reference to the same object.
Rectangle snd = fst;

// Mutating the object using the first reference.
fst.Width = 100;

// Check if the object behind the second reference has changed.
Console.WriteLine(snd.Width);
```

Notice how we're changing the `Width` using the reference `fst` but we're printing the `Width` using the reference `snd`.
Since they are however pointing to *the same object* we've changed the `Width` of both references.
Saying that we've changed the value of "both" is also slightly misguided.
It's better if we can internalize the fact that these are pointing to the *same* object.
We have two reference but only a single object.
And it is that single object that we've mutated.

Hopefully you remember this behavior of reference types from back when we discussed [arrays](arrays)?


### Initialization

We can initialize an instance field, just like we initialize a regular variable.
Whenever we create an instance of the class, all instance field initializers are run.
We haven't talked about [constructors](constructors) yet, but since instance fields, in C#, are initialized *before* the constructor runs, we can use the constructor to override any values we've set in the initializers.
But more on this in the chapter on constructors.

If we don't specify an initializer for an instance field then that instance field will, in C#, be assigned the default value for its type.
You can read more about the different default values for different types in the [official documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/variables).

You might remember, from the chapter on [variables](variables), that local variables in C# can be "uninitialized".
We are for example allowed to declare an `int` without assigning it a value.
However, before we are allowed to use that variable it must have been assigned a value, or the compiler will complain by issuing a compiler error saying that we are trying to use an "unassigned local variable".

```{code-cell}
:tags: [raises-exception]
{
  int x;
  int y = x;
}
```

```{note}
I'm defining an arbitrary [block](blocks) in the code example above because otherwise the compiler that I'm using to write this book doesn't treat the variables `x` and `y` as local variables.
```

Why are we talking about local variables in this chapter about fields?
Because fields, in contrast to local variables, can *not* be left uninitialized.

So, as we mentioned above, if you don't specify your own initializers for your instance fields, then they will be initialized right before the [constructor](constructor) runs.


```{code-cell}
:tags: [remove-stderr]
class Rectangle
{
  public int Width;   // Defaults to 0.
  public int Height;  // Defaults to 0.
}
```

```{code-cell}
Console.WriteLine(new Rectangle().Width);
Console.WriteLine(new Rectangle().Height);
```


(object-initializers)=
### Object initializers

When you've got a class whose instance fields you have access to, it is, in C#, possible to use the "object initializer" syntax.
This syntax allows us to instantiate an object and immediately assign values to its instance fields all in a single [statement](statements).
This feature is also available for instance [properties](properties), but we'll talk about that in a separate chapter.

```{caution}
Note that when we were talking about initializing an instance field we were talking about setting the initial value from within the class itself.
Now that we are talking about "object initializers" we are talking about setting the initial value of an instance field from the "outside".
Meaning, from whoever is instantiating the object.
Not from within the object itself.
```

This means that we can instantiate an object and assign values to its instance properties in a single statement like this:

```{code-cell}
Rectangle r1 = new Rectangle { Width=10, Height=11 };
Rectangle r2 = new Rectangle { Width=20 };
```

Notice how, in the second example above, we're not setting any value to the instance field `Height`.
In general, we can use object initializers to set any number of instance fields that we want, and we don't have to set all.

If we didn't have object initializers we would have to write multiple statments in order to achieve the same results as the statements above.

```{code-cell}
Rectangle r1 = new Rectangle();
r1.Width = 10;
r1.Height = 11;

Rectangle r2 = new Rectangle();
r2.Width = 20;
```


### UML class diagrams

In UML class diagrams, instance fields are modeled by what UML calls "attributes".
Remember how, in the chapter on [classes](classes), we discussed how a type in a UML class diagram is drawn as a rectangle that's divided into three sections.
See the left class in the figure below for a reminder of what the UML class diagram syntax looks like.

The second section lists attributes, and the third lists operations.
Instance fields in C# (as well as [properties](properties) which we'll talk about soon) are represented as attributes in UML class diagrams.

The `Rectangle` class would, in a UML class diagram, be represented as the right class in the figure below.

```
┌────────────────────┐   ┌────────────────────┐
│ <class identifier> │   │       Circle       │
├────────────────────┤   ├────────────────────┤
│                    │   │ Width : int        │
│    <attributes>    │   │ Height : int       │
│                    │   │                    │
├────────────────────┤   ├────────────────────┤
│                    │   │                    │
│    <operations>    │   │                    │
│                    │   │                    │
└────────────────────┘   └────────────────────┘
```

Notice how, when listing an attribute we also write out the type of the attribute.
In the chapter on [classes](classes:uml) we mentioned that UML class diagrams are often draw with a varying level of informality.
As such, the data types of attributes are often omitted if the situtation doesn't require them in order to explain whatever it is we're trying to explain.

Since the instance fields of the class `Circle` are marked as `public` we should actually also add a plus sign (`+`) before the name of the field.
In UML class diagrams, this is known as the "visibility" of the class member.
But more on this in the chapter on [access modifiers](access-modifiers).
And again, depending on the level of informality, visibility is often omitted.

```
┌────────────────┐
│     Circle     │
├────────────────┤
│ + Width : int  │
│ + Height : int │
├────────────────┤
│                │
│                │
└────────────────┘
```



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
    player.X += (move switch { 'E' => 1, 'W' => -1, _ => 0 });
    player.Y += (move switch { 'N' => 1, 'S' => -1, _ => 0 });
  }
}
```

```{note}
The parenthases on lines 5 and 6 in the example above are not necessary.
They're only added here to more clearly distinguish the left-hand side from the right-hand side.
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
What are "object initializers" in C#?
Give an example of how to use them.
```


```{exercise}
What do we mean when we say that instance fields in C# are initialized to the default value of their types unless we initialize them ourselves?
Show an example of this behavior using both the data type `bool` and `string`.
```


```{exercise-start}
```
Examine the code below.
```{code-cell}
class Circle
{
  public int Diameter;
}

Circle c1 = new Circle();
Circle c2 = c1;
Circle c3 = c2;

c3.Diameter = 100;
```
What will be the value of the `public` instance field `Diameter` of the variables `c1`, `c2`, and `c3`?
Why do they have these values?
Try reasoning about it in your head before you try it in code.
```{exercise-end}
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



```{exercise}
Draw a UML class diagram of the class `Point` from {numref}`ex:fields:point`.
Remember to represent all instance fields.
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

Write a new static or local method with the signature below.

```csharp
void movePoints (Point delta, Point[] points);
```

When you've implemented both the class and the method you should be able to run the following code and get the same result.

```{code-cell}
:tags: [remove-input]
void movePoints (Point delta, Point[] points)
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

movePoints(new Point() { X = 5 }, points);
movePoints(new Point() { Y = -20 }, points);
movePoints(new Point() { Z = 100, X=2 }, points);

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

Point initial = new Point() { X=10, Y=100, Z=1000 };
printPointArray(makeIncrementingPoints(5, 10, initial));
```
```{exercise-end}
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

