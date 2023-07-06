# Exercises

## Classes

```{exercise}
What is the difference between an object and a class?
```

```{exercise}
What is the difference between an object and an instance?
```

```{exercise-start}
```
Given that we have defined a class called `House` with no members like this:
```{code-cell}
class House { }
```
Will the variable `b` below contain `true` or `false`?
Why is this?
```{code-cell}
House h1 = new House();
House h2 = new House();
bool b = h1 == h2;
```
Does it matter if we instead write the code like this?
```{code-cell}
bool b = new House() == new House();
```
```{exercise-end}
```


```{exercise}
Create a UML class diagram that depicts two classes.
One class is called `Apple` and the other `Pear`.
```


```{exercise-start}
```
Write two classes called `Apple` and `Pear`.
When you're done, you should be able to run the following code and get the same result.
Why do we get `true` in some cases as output and `false` in other?
```{code-cell}
:tags: [remove-input]
class Apple {}
class Pear {}
```
```{code-cell}
:tags: [remove-stderr]
Apple apple1 = new Apple();
Apple apple2 = new Apple();

Pear pear1 = new Pear();
Pear pear2 = new Pear();

Console.WriteLine(apple1 == apple1);
Console.WriteLine(apple1 == apple2);
Console.WriteLine(pear1 == pear1);
Console.WriteLine(pear1 == pear2);
```
```{exercise-end}
```


```{exercise-start}
```
Write two classes called `Apple` and `Pear`.
Why does the following line generate a compiler error?
```{code-cell}
:tags: [remove-input]
class Apple {}
class Pear {}
```
```{code-cell}
:tags: [raises-exception, remove-stderr, remove-output]
Apple obj = new Pear();
```
```{exercise-end}
```


```{exercise-start}
```
Write two classes called `Apple` and `Pear`.
Try to run the following code.

1. What is the compiler error that it results in?
2. Why does it result in a compiler error?

```{code-cell}
:tags: [raises-exception, remove-output]
Apple apple = new Apple();
Pear pear = new Pear();
Console.WriteLine(apple == pear);
```
```{exercise-end}
```


```{exercise-start}
```
Write two classes called `Apple` and `Pear`.
Try to run the following lines of code.

1. Which of the lines cause compiler errors?
2. Why do they give a compiler errors?

```{code-cell}
:tags: [raises-exception, remove-output]
Apple f1 = new Apple();
Apple f2 = new Pear();
Pear f3 = new Pear();
Pear f4 = new Apple();
```
```{exercise-end}
```


```{exercise}
Instantiate an object from the class `Apple` and then first compare whether its *run-time type* is equal to the type defined by the class `Apple`.
Then check whether its run-time type is equal to the type defined by the class `Pear`.
First solve these two problems without using the `is` operator and then solve it using the `is` operator.
```


```{exercise}
What is the difference between a static class and a class?
```

```{exercise}
What are class members?
```

```{exercise}
Write a program that instantiates and throws an exception of type `ArgumentException`.
```


## Access modifiers

```{exercise}
What is the difference between `public` and `private`?
```

```{exercise}
What do we mean when we say that `public` fields "break encapsulation" or "violate the principle of information hiding"?
```

```{exercise}
Redo all the coding exercises in the chapter on [instance methods](instance-methods) and make sure that your solutions work *even* after you've changed the accessibility of all fields to `private`.
In some cases you will need to adapt your solutions.
This is a very important exercise.
```

```{exercise-start}
```
Does the following code compile?
Why or why not?
```{code-cell}
:tags: [raises-exception, remove-output, remove-stderr]
class Person
{
  private string name;

  public void SetName (string name)
    => this.name = name;
}

class Greeter
{
  public void Greet (Person p1, Person p2)
    => Console.WriteLine($"Hello {p1.name}, I am {p2.name}");
}
```
```{exercise-end}
```

```{exercise-start}
```
Does the following code compile?
Why or why not?
```{code-cell}
class Person
{
  private string name;

  public void SetName (string name)
    => this.name = name;

  public static void Greet (Person p1, Person p2)
    => Console.WriteLine($"Hello {p1.name}, I am {p2.name}");
}
```
```{exercise-end}
```


```{exercise}
We've said that `private` means that the member is accessible within the same class not merely within the same object.
Write your own code example to show what this means.
```



## Fields

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



## Instance methods

%```{exercise}
%In your own words, explain how instance methods are different from static methods.
%```
%
%```{exercise}
%What do we mean when we say that public fields "break" encapsulation?
%```
%
%
%```{exercise}
%Can you *overload* an instance method by just varying the *return type*?
%Why or why not?
%```
%
%```{exercise}
%Can you *overload* an instance method by just varying a single *parameter name*?
%Why or why not?
%```
%
%```{exercise}
%Can you *overload* an instance method by just varying a single *parameter type*?
%Why or why not?
%```
%
%
%
%
%```{exercise-start}
%```
%Write a class called `ReverseCipher` which expose a public instance method with the following signature:
%
%```csharp
%string Encode (string input);
%```
%
%The method should implement the Reverse cipher that we worked with in the chapter on [static methods](static-methods:examples:reverse).
%The method should implement the Reverse cipher that we defined in the chapter on [algorithms](reverse-cipher).
%
%When you are done, you should be able to run the following code and get the corrseponding output.
%
%```{code-cell} csharp
%:tags: [remove-input]
%class ReverseCipher
%{
%  public string Encode (string input)
%  {
%    string output = "";
%    for (int i=input.Length-1; i>=0; i--)
%      output += input[i];
%    return output;
%  }
%}
%```
%
%```{code-cell} csharp
%ReverseCipher reverser = new ReverseCipher();
%Console.WriteLine(reverser.Encode("Hello"));
%```
%```{exercise-end}
%```
%
%
%
%```{exercise-start}
%:label: ex:instance-methods:leet
%```
%Write a class called `LeetCipher` which expose two overloaded public instance methods with the following signatures:
%
%```csharp
%string Encode (string input);
%char Encode (char input);
%```
%
%Both methods should encode the input into [Leetspeak](leet-language) and then return the result.
%
%```{code-cell} csharp
%:tags: [remove-input]
%class LeetCipher
%{
%  public char Encode (char input)
%  {
%    switch (input)
%    {
%      case 'L': return '1';
%      case '1': return 'L';
%      case 'A': return '4';
%      case '4': return 'A';
%      case 'O': return '0';
%      case '0': return 'O';
%      case 'T': return '7';
%      case '7': return 'T';
%      case 'E': return '3';
%      case '3': return 'E';
%      default: return input;
%    }
%  }
%
%  public string Encode (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += Encode(c);
%    return output;
%  }
%}
%```
%
%When you are done you should be able to run the following code and get the corresponding output.
%The code first instantiates a cipher and then encodes both a `string` and a `char` and prints the results.
%
%```{code-cell} csharp
%LeetCipher leet = new LeetCipher();
%
%string output1 = leet.Encode("LEET");
%char output2 = leet.Encode('E');
%
%Console.WriteLine($"{output1} {output2}");
%```
%```{exercise-end}
%```
%
%
%
%
%```{exercise-start}
%:label: ex:instance-methods:point-print
%```
%In {numref}`ex:fields:point` we wrote a class called `Point` and a local method called `printPoint` that could print the coordinates of objects of type `Point`.
%
%Rewrite the class `Point` so that `Print` is now an instance method on the `Point` class itself.
%
%Your solution should look something like the following.
%```{code-cell}
%class Point
%{
%  // Your code here...
%
%  public void Print ()
%  {
%    // Your code here...
%  }
%}
%```
%When you're done, you should be able to run the following code and get the same result.
%```{code-cell} csharp
%:tags: [remove-input]
%class Point
%{
%  public int X = 0;
%  public int Y = 0;
%  public int Z = 0;
%
%  public void Print ()
%    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
%}
%```
%```{code-cell}
%Point p1 = new Point() { X=10, Y=20, Z=30 };
%Point p2 = new Point() { X=1,  Y=2,  Z=3 };
%
%p1.Print();
%p2.Print();
%```
%```{exercise-end}
%```
%
%
%
%
%```{exercise-start}
%:label: ex:instance-methods:delta
%```
%In {numref}`ex:fields:delta` we defined a local function that took an object of type `Point` and an array of points.
%It then treated the coordinates of the first `Point` as a delta that should be applied to all points in the array.
%
%Let's now forget about the array but instead implement the idea of altering an object of type `Point` by passing it another object of type `Point` that will serve as the delta.
%
%Start from the code you wrote in {numref}`ex:instance-methods:point-print`.
%
%Your solution should look something like the following.
%```{code-cell}
%class Point
%{
%  // ...
%
%  public void Print ()
%  {
%    // Your code here...
%  }
%}
%```
%
%When you're done, you should be able to run the following code and get the same result.
%```{code-cell}
%:tags: [remove-input]
%class Point
%{
%  public int X = 0;
%  public int Y = 0;
%  public int Z = 0;
%
%  public void Print ()
%    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
%
%  public void Add (Point other)
%  {
%    X += other.X;
%    Y += other.Y;
%    Z += other.Z;
%  }
%}
%```
%```{code-cell}
%Point[] points = new Point[] {
%  new Point() { X=10, Y=20, Z=30 },
%  new Point() { X=100, Y=200, Z=300 },
%  new Point() { X=1000, Y=2000, Z=3000 }
%};
%
%Point delta = new Point() { X=1, Y=2, Z=3 };
%
%foreach (Point point in points)
%{
%  point.Add(delta);
%  point.Print();
%}
%```
%```{exercise-end}
%```
%
%
%
%
%```{exercise-start}
%:label: ex:instance-methods:point-this
%```
%Start from the code you wrote in {numref}`ex:instance-methods:delta`.
%
%Add another instance method to the class `Point` that has the signature `Point AddTo (Point other)`.
%The method should treat the object as the delta and then apply itself, via the `Add` method, to the `Point` given as an argument.
%
%In other words, while `Add` adds another point to `this`, the method `AddTo` adds `this` to another `Point`.
%In other words, we're letting the object upon which we call the method `AddTo` serve as the delta while we let the object being passed in as an argument serve as the object that is to be changed.
%
%Your solution should look something like the following.
%```{code-cell}
%class Point
%{
%  // ...
%
%  public void AddTo (Point other)
%  {
%    // Your code here...
%  }
%}
%```
%When you're done, you should be able to run the following code and get the same result.
%```{code-cell}
%:tags: [remove-input]
%class Point
%{
%  public int X = 0;
%  public int Y = 0;
%  public int Z = 0;
%
%  public void Print ()
%    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
%
%  public void Add (Point other)
%  {
%    X += other.X;
%    Y += other.Y;
%    Z += other.Z;
%  }
%
%  public void AddTo (Point other)
%    => other.Add(this);
%}
%```
%```{code-cell}
%Point point = new Point() { X=10, Y=20, Z=30 };
%Point delta = new Point() { X=1, Y=2, Z=3 };
%
%delta.AddTo(point);
%point.Print();
%```
%```{hint}
%:class: dropdown
%In this solution you should pass `this` as an argument to the instance method `Add`.
%```
%```{exercise-end}
%```
%
%
%
%
%```{exercise-start}
%:label: ex:instance-methods:point-this-array
%```
%Start from the code you wrote in {numref}`ex:instance-methods:point-this`.
%
%Add an overload of the instance method `AddTo` in the class `Point` with the signature `void AddTo (Point[] points)`.
%
%The method should treat the object as the delta and then apply itself, via the `Add` method, to all the points in the array.
%In other words, the two versions of `AddTo` does the same thing but one adds itself to a single point while the other adds itself to multiple points.
%
%In even other words, we're solving the same problem we solved in {numref}`ex:fields:delta` but this time with instance methods.
%
%Your solution should look something like the following.
%```{code-cell}
%class Point
%{
%  // Your code here...
%
%  public void AddTo (Point[] points)
%  {
%    // Your code here...
%  }
%}
%```
%
%When you're done, you should be able to run the following code and get the same result.
%```{code-cell}
%:tags: [remove-input]
%class Point
%{
%  public int X = 0;
%  public int Y = 0;
%  public int Z = 0;
%
%  public void Print ()
%    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
%
%  public void Add (Point other)
%  {
%    X += other.X;
%    Y += other.Y;
%    Z += other.Z;
%  }
%
%  public void AddTo (Point[] points)
%  {
%    foreach (Point point in points)
%      point.Add(this);
%  }
%}
%```
%```{code-cell}
%Point[] points = new Point[] {
%  new Point() { X=10, Y=20, Z=30 },
%  new Point() { X=100, Y=200, Z=300 },
%  new Point() { X=1000, Y=2000, Z=3000 }
%};
%
%Point delta = new Point() { X=1, Y=2, Z=3 };
%delta.AddTo(points);
%
%foreach (Point point in points)
%  point.Print();
%```
%```{hint}
%:class: dropdown
%In this solution you should pass `this` as an argument to the instance method `Add`.
%```
%```{exercise-end}
%```
%
%
%
%```{exercise}
%Draw a UML class diagram of the class `Point` as defined in {numref}`ex:instance-methods:point-this-array`.
%Remember to include all fields and operations.
%```
%
%
%
%
%
%%```{exercise-start}
%%```
%%Start with the classes you wrote in {numref}`ex:first-classes`.
%%What does the following code print?
%%Why is this the output that we get?
%%
%%```{code-cell}
%%Apple f1 = new Apple();
%%Pear f2 = new Pear();
%%Console.WriteLine(f1);
%%Console.WriteLine(f2);
%%```
%%```{exercise-end}
%%```
%


## Properties

```{exercise}
What are properties?
```

```{exercise}
Sometimes we mark the setter of a property as `private` while the getter is `public`.
Why is this useful?
```

```{exercise}
What is a read-only property in C#?
What are they useful for?
```

```{exercise}
What is an `init` accessor in the context of C# properties?
What is it useful for?
```

```{exercise}
What is the `required` keyword in the context of C# properties?
What is it useful for?
```


```{exercise-start}
```
Assume that we have the following class.
```{code-cell}
class Circle
{
  private int diameter = 2;
  public int Diameter
  {
    get => Radius * 2;
    set => diameter = value;
  }
  public int Radius
  {
    get => Diameter / 2;
    set => Diameter = value * 2;
  }
}
```
Which of the following lines causes the program to crash at run-time?
Why does it crash?
```csharp
Circle circ = new Circle() { Diameter = 2 };
circ.Radius = 1;
Console.WriteLine(circ.Radius);
```
```{exercise-end}
```


```{exercise}
:label: ex:properties:square
Write a class called `Square` and give it the properties `Width`, `Height`, `Area`, `Perimeter`, and `Side`.
All the properties should have `get` and `set` accessors.

Remember to make use of calculated properties to avoid allowing a `set` accessor put an object of type `Square` in a state which violates the rules of a square (namely that all sides are the same length).
```

```{exercise}
:label: ex:properties:equilateral-triangle
Write a class called `EquilateralTriangle` and give it the properties `Width`, `Height`, `Area`, `Perimeter`, and `Side`.

When computing the width and height of a triangle, you can assume that one of the sides are perfectly parallel with the x-axis.

Remember to make use of calculated properties to avoid allowing a `set` accessor put an object of type `Square` in a state which violates the rules of a square (namely that all sides are the same length).
```

```{exercise}
Looking at the classes you wrote in {numref}`ex:properties:square` and {numref}`ex:properties:equilateral-triangle`.
If you were to replace some `set` accessors with `init` accessors, which would you replace and why?
```

```{exercise}
Looking at the classes you wrote in {numref}`ex:properties:square` and {numref}`ex:properties:equilateral-triangle`.
If you were to mark some properties as `required`, which would you mark and why?
```