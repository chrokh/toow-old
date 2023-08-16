# Exercises

NOTE: All exercises are currently commented out.

%## Classes
%
%```{exercise}
%What is the difference between an object and a class?
%```
%
%```{exercise}
%What is the difference between an object and an instance?
%```
%
%```{exercise-start}
%```
%Given that we have defined a class called `House` with no members like this:
%```{code-cell}
%class House { }
%```
%Will the variable `b` below contain `true` or `false`?
%Why is this?
%```{code-cell}
%House h1 = new House();
%House h2 = new House();
%bool b = h1 == h2;
%```
%Does it matter if we instead write the code like this?
%```{code-cell}
%bool b = new House() == new House();
%```
%```{exercise-end}
%```
%
%
%```{exercise}
%Create a UML class diagram that depicts two classes.
%One class is called `Apple` and the other `Pear`.
%```
%
%
%```{exercise-start}
%```
%Write two classes called `Apple` and `Pear`.
%When you're done, you should be able to run the following code and get the same result.
%Why do we get `true` in some cases as output and `false` in other?
%```{code-cell}
%:tags: [remove-input]
%class Apple {}
%class Pear {}
%```
%```{code-cell}
%:tags: [remove-stderr]
%Apple apple1 = new Apple();
%Apple apple2 = new Apple();
%
%Pear pear1 = new Pear();
%Pear pear2 = new Pear();
%
%Console.WriteLine(apple1 == apple1);
%Console.WriteLine(apple1 == apple2);
%Console.WriteLine(pear1 == pear1);
%Console.WriteLine(pear1 == pear2);
%```
%```{exercise-end}
%```
%
%
%```{exercise-start}
%```
%Write two classes called `Apple` and `Pear`.
%Why does the following line generate a compiler error?
%```{code-cell}
%:tags: [remove-input]
%class Apple {}
%class Pear {}
%```
%```{code-cell}
%:tags: [raises-exception, remove-stderr, remove-output]
%Apple obj = new Pear();
%```
%```{exercise-end}
%```
%
%
%```{exercise-start}
%```
%Write two classes called `Apple` and `Pear`.
%Try to run the following code.
%
%1. What is the compiler error that it results in?
%2. Why does it result in a compiler error?
%
%```{code-cell}
%:tags: [raises-exception, remove-output]
%Apple apple = new Apple();
%Pear pear = new Pear();
%Console.WriteLine(apple == pear);
%```
%```{exercise-end}
%```
%
%
%```{exercise-start}
%```
%Write two classes called `Apple` and `Pear`.
%Try to run the following lines of code.
%
%1. Which of the lines cause compiler errors?
%2. Why do they give a compiler errors?
%
%```{code-cell}
%:tags: [raises-exception, remove-output]
%Apple f1 = new Apple();
%Apple f2 = new Pear();
%Pear f3 = new Pear();
%Pear f4 = new Apple();
%```
%```{exercise-end}
%```
%
%
%```{exercise}
%Instantiate an object from the class `Apple` and then first compare whether its *run-time type* is equal to the type defined by the class `Apple`.
%Then check whether its run-time type is equal to the type defined by the class `Pear`.
%First solve these two problems without using the `is` operator and then solve it using the `is` operator.
%```
%
%
%```{exercise}
%What is the difference between a static class and a class?
%```
%
%```{exercise}
%What are class members?
%```
%
%```{exercise}
%Write a program that instantiates and throws an exception of type `ArgumentException`.
%```
%
%
%## Access modifiers
%
%```{exercise}
%What is the difference between `public` and `private`?
%```
%
%```{exercise}
%What do we mean when we say that `public` fields "break encapsulation" or "violate the principle of information hiding"?
%```
%
%```{exercise}
%Redo all the coding exercises in the chapter on [instance methods](instance-methods) and make sure that your solutions work *even* after you've changed the accessibility of all fields to `private`.
%In some cases you will need to adapt your solutions.
%This is a very important exercise.
%```
%
%```{exercise-start}
%```
%Does the following code compile?
%Why or why not?
%```{code-cell}
%:tags: [raises-exception, remove-output, remove-stderr]
%class Person
%{
%  private string name;
%
%  public void SetName (string name)
%    => this.name = name;
%}
%
%class Greeter
%{
%  public void Greet (Person p1, Person p2)
%    => Console.WriteLine($"Hello {p1.name}, I am {p2.name}");
%}
%```
%```{exercise-end}
%```
%
%```{exercise-start}
%```
%Does the following code compile?
%Why or why not?
%```{code-cell}
%class Person
%{
%  private string name;
%
%  public void SetName (string name)
%    => this.name = name;
%
%  public static void Greet (Person p1, Person p2)
%    => Console.WriteLine($"Hello {p1.name}, I am {p2.name}");
%}
%```
%```{exercise-end}
%```
%
%
%```{exercise}
%We've said that `private` means that the member is accessible within the same class not merely within the same object.
%Write your own code example to show what this means.
%```
%
%
%
%## Fields
%
%```{exercise}
%What are *fields*?
%```
%
%```{exercise}
%What is the difference between an *instance field* and a *static field*?
%```
%
%```{exercise}
%What are "object initializers" in C#?
%Give an example of how to use them.
%```
%
%
%```{exercise}
%What do we mean when we say that instance fields in C# are initialized to the default value of their types unless we initialize them ourselves?
%Show an example of this behavior using both the data type `bool` and `string`.
%```
%
%
%```{exercise-start}
%```
%Examine the code below.
%```{code-cell}
%class Circle
%{
%  public int Diameter;
%}
%
%Circle c1 = new Circle();
%Circle c2 = c1;
%Circle c3 = c2;
%
%c3.Diameter = 100;
%```
%What will be the value of the `public` instance field `Diameter` of the variables `c1`, `c2`, and `c3`?
%Why do they have these values?
%Try reasoning about it in your head before you try it in code.
%```{exercise-end}
%```
%
%
%```{exercise}
%We tend to say that `public` instance fields "break encapsulation".
%What is meant by this?
%Another way to say this is that making instance fields `public` breaks the prinicple of "information hiding".
%```
%
%
%
%```{exercise-start}
%:label: ex:fields:point
%```
%Write a class called `Point` that models a point in three-dimensional space.
%It should expose three `public` instance fields called `X`, `Y`, and `Z` of type `int`.
%The fields should be initialized to the value `0`.
%
%Then define a local or static method that takes a point and prints it to screen.
%
%With the class and the method in place you should be able to run the following code and get the same output.
%
%```{code-cell} csharp
%:tags: [remove-input]
%class Point
%{
%  public int X = 0;
%  public int Y = 0;
%  public int Z = 0;
%}
%
%void printPoint (Point p)
%  => Console.WriteLine($"{{X={p.X}, Y={p.Y}, Z={p.Z}}}");
%```
%
%```{code-cell} csharp
%Point p1 = new Point();
%Point p2 = new Point();
%
%p1.X += 2;
%p1.X *= 2;
%p1.Y = 3;
%p1.Z = 2;
%
%p2.X = -4;
%p2.Y += 3;
%p1.Z /= 2;
%
%printPoint(p1);
%printPoint(p2);
%```
%```{exercise-end}
%```
%
%
%
%```{exercise}
%Draw a UML class diagram of the class `Point` from {numref}`ex:fields:point`.
%Remember to represent all instance fields.
%```
%
%
%
%```{exercise-start}
%:label: ex:fields:move-points
%```
%Start with the code that you wrote in {numref}`ex:fields:point`.
%Write three local or static methods with the following signatures:
%
%```csharp
%void movePointsInX (int delta, Point[] points);
%void movePointsInY (int delta, Point[] points);
%void movePointsInZ (int delta, Point[] points);
%```
%
%The methods should iterate over all points in the array `points` and apply the `delta` to the dimension that the method corresponds to.
%The method `movePointsInX` should apply the delta to the instance field `X`, the method `movePointsInY` to `Y`, and `movePointsInZ` to `Z`.
%
%When you've implemented the method, you should be able to run the following code and get the same result.
%
%```{code-cell}
%:tags: [remove-input]
%
%void movePointsInX (int delta, Point[] points)
%{
%  foreach (Point point in points)
%    point.X += delta;
%}
%
%void movePointsInY (int delta, Point[] points)
%{
%  foreach (Point point in points)
%    point.Y += delta;
%}
%
%void movePointsInZ (int delta, Point[] points)
%{
%  foreach (Point point in points)
%    point.Z += delta;
%}
%```
%
%```{code-cell}
%Point p1 = new Point() { X=10, Y=20, Z=50 };
%Point p2 = new Point() { X=1,  Y=2,  Z=5  };
%
%Point[] points = new Point[] { p1, p2 };
%
%movePointsInX(5, points);
%movePointsInY(-20, points);
%movePointsInZ(100, points);
%
%printPoint(p1);
%printPoint(p2);
%```
%
%```{exercise-end}
%```
%
%
%```{exercise-start}
%:label: ex:fields:delta
%```
%Start with the code that you wrote in {numref}`ex:fields:point`.
%In {numref}`ex:fields:move-points` we solved the problem of applying some delta to a number of potentially different points at the same time.
%Let's solve that in a slightly more general way now.
%
%Write a new static or local method with the signature below.
%
%```csharp
%void movePoints (Point delta, Point[] points);
%```
%
%When you've implemented both the class and the method you should be able to run the following code and get the same result.
%
%```{code-cell}
%:tags: [remove-input]
%void movePoints (Point delta, Point[] points)
%{
%  foreach (Point point in points)
%  {
%    point.X += delta.X;
%    point.Y += delta.Y;
%    point.Z += delta.Z;
%  }
%}
%```
%
%```{code-cell}
%Point p1 = new Point() { X=10, Y=20, Z=50 };
%Point p2 = new Point() { X=1,  Y=2,  Z=5  };
%
%Point[] points = new Point[] { p1, p2 };
%
%movePoints(new Point() { X = 5 }, points);
%movePoints(new Point() { Y = -20 }, points);
%movePoints(new Point() { Z = 100, X=2 }, points);
%
%printPoint(p1);
%printPoint(p2);
%```
%```{exercise-end}
%```
%
%
%```{exercise-start}
%```
%Start with the code that you wrote in {numref}`ex:fields:point`.
%Write a local or static method with the following signature:
%
%```csharp
%Point[] makeIncrementingPoints (int numPoints, int incrementor, Point first);
%```
%
%The method should generate an array of elements of type `Point`.
%The array should contain `numPoints` number of points and the `X` and `Y` coordinates of each point should be `incrementor` higher than the last point in the array.
%The point `first` must be the first point in the generated array.
%
%When you are done you should be able to run the following code and get the same output.
%
%```{code-cell}
%:tags: [remove-input]
%Point[] makeIncrementingPoints (int numPoints, int incrementor, Point first)
%{
%  Point[] points = new Point[numPoints];
%  points[0] = first;
%  for (int i=1; i<numPoints; i++)
%  {
%    points[i] = new Point();
%    points[i].X = points[i-1].X + incrementor;
%    points[i].Y = points[i-1].Y + incrementor;
%    points[i].Z = points[i-1].Z + incrementor;
%  }
%  return points;
%}
%```
%
%```{code-cell}
%void printPointArray (Point[] points)
%{
%  foreach (Point point in points)
%    printPoint(point);
%}
%
%Point initial = new Point() { X=10, Y=100, Z=1000 };
%printPointArray(makeIncrementingPoints(5, 10, initial));
%```
%```{exercise-end}
%```
%
%
%% TODO: Add exercise where you build a Point class with an arbitrary number of dimensions.
%%```{code-cell}
%%class Delta
%%{
%%  public int Dimension = 0;
%%  public int Value = 0;
%%}
%%
%%class Point
%%{
%%  int[] position;
%%}
%%```
%
%
%
%## Instance methods
%
%%```{exercise}
%%In your own words, explain how instance methods are different from static methods.
%%```
%%
%%```{exercise}
%%What do we mean when we say that public fields "break" encapsulation?
%%```
%%
%%
%%```{exercise}
%%Can you *overload* an instance method by just varying the *return type*?
%%Why or why not?
%%```
%%
%%```{exercise}
%%Can you *overload* an instance method by just varying a single *parameter name*?
%%Why or why not?
%%```
%%
%%```{exercise}
%%Can you *overload* an instance method by just varying a single *parameter type*?
%%Why or why not?
%%```
%%
%%
%%
%%
%%```{exercise-start}
%%```
%%Write a class called `ReverseCipher` which expose a public instance method with the following signature:
%%
%%```csharp
%%string Encode (string input);
%%```
%%
%%The method should implement the Reverse cipher that we worked with in the chapter on [static methods](static-methods:examples:reverse).
%%The method should implement the Reverse cipher that we defined in the chapter on [algorithms](reverse-cipher).
%%
%%When you are done, you should be able to run the following code and get the corrseponding output.
%%
%%```{code-cell} csharp
%%:tags: [remove-input]
%%class ReverseCipher
%%{
%%  public string Encode (string input)
%%  {
%%    string output = "";
%%    for (int i=input.Length-1; i>=0; i--)
%%      output += input[i];
%%    return output;
%%  }
%%}
%%```
%%
%%```{code-cell} csharp
%%ReverseCipher reverser = new ReverseCipher();
%%Console.WriteLine(reverser.Encode("Hello"));
%%```
%%```{exercise-end}
%%```
%%
%%
%%
%%```{exercise-start}
%%:label: ex:instance-methods:leet
%%```
%%Write a class called `LeetCipher` which expose two overloaded public instance methods with the following signatures:
%%
%%```csharp
%%string Encode (string input);
%%char Encode (char input);
%%```
%%
%%Both methods should encode the input into [Leetspeak](leet-language) and then return the result.
%%
%%```{code-cell} csharp
%%:tags: [remove-input]
%%class LeetCipher
%%{
%%  public char Encode (char input)
%%  {
%%    switch (input)
%%    {
%%      case 'L': return '1';
%%      case '1': return 'L';
%%      case 'A': return '4';
%%      case '4': return 'A';
%%      case 'O': return '0';
%%      case '0': return 'O';
%%      case 'T': return '7';
%%      case '7': return 'T';
%%      case 'E': return '3';
%%      case '3': return 'E';
%%      default: return input;
%%    }
%%  }
%%
%%  public string Encode (string input)
%%  {
%%    string output = "";
%%    foreach (char c in input)
%%      output += Encode(c);
%%    return output;
%%  }
%%}
%%```
%%
%%When you are done you should be able to run the following code and get the corresponding output.
%%The code first instantiates a cipher and then encodes both a `string` and a `char` and prints the results.
%%
%%```{code-cell} csharp
%%LeetCipher leet = new LeetCipher();
%%
%%string output1 = leet.Encode("LEET");
%%char output2 = leet.Encode('E');
%%
%%Console.WriteLine($"{output1} {output2}");
%%```
%%```{exercise-end}
%%```
%%
%%
%%
%%
%%```{exercise-start}
%%:label: ex:instance-methods:point-print
%%```
%%In {numref}`ex:fields:point` we wrote a class called `Point` and a local method called `printPoint` that could print the coordinates of objects of type `Point`.
%%
%%Rewrite the class `Point` so that `Print` is now an instance method on the `Point` class itself.
%%
%%Your solution should look something like the following.
%%```{code-cell}
%%class Point
%%{
%%  // Your code here...
%%
%%  public void Print ()
%%  {
%%    // Your code here...
%%  }
%%}
%%```
%%When you're done, you should be able to run the following code and get the same result.
%%```{code-cell} csharp
%%:tags: [remove-input]
%%class Point
%%{
%%  public int X = 0;
%%  public int Y = 0;
%%  public int Z = 0;
%%
%%  public void Print ()
%%    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
%%}
%%```
%%```{code-cell}
%%Point p1 = new Point() { X=10, Y=20, Z=30 };
%%Point p2 = new Point() { X=1,  Y=2,  Z=3 };
%%
%%p1.Print();
%%p2.Print();
%%```
%%```{exercise-end}
%%```
%%
%%
%%
%%
%%```{exercise-start}
%%:label: ex:instance-methods:delta
%%```
%%In {numref}`ex:fields:delta` we defined a local function that took an object of type `Point` and an array of points.
%%It then treated the coordinates of the first `Point` as a delta that should be applied to all points in the array.
%%
%%Let's now forget about the array but instead implement the idea of altering an object of type `Point` by passing it another object of type `Point` that will serve as the delta.
%%
%%Start from the code you wrote in {numref}`ex:instance-methods:point-print`.
%%
%%Your solution should look something like the following.
%%```{code-cell}
%%class Point
%%{
%%  // ...
%%
%%  public void Print ()
%%  {
%%    // Your code here...
%%  }
%%}
%%```
%%
%%When you're done, you should be able to run the following code and get the same result.
%%```{code-cell}
%%:tags: [remove-input]
%%class Point
%%{
%%  public int X = 0;
%%  public int Y = 0;
%%  public int Z = 0;
%%
%%  public void Print ()
%%    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
%%
%%  public void Add (Point other)
%%  {
%%    X += other.X;
%%    Y += other.Y;
%%    Z += other.Z;
%%  }
%%}
%%```
%%```{code-cell}
%%Point[] points = new Point[] {
%%  new Point() { X=10, Y=20, Z=30 },
%%  new Point() { X=100, Y=200, Z=300 },
%%  new Point() { X=1000, Y=2000, Z=3000 }
%%};
%%
%%Point delta = new Point() { X=1, Y=2, Z=3 };
%%
%%foreach (Point point in points)
%%{
%%  point.Add(delta);
%%  point.Print();
%%}
%%```
%%```{exercise-end}
%%```
%%
%%
%%
%%
%%```{exercise-start}
%%:label: ex:instance-methods:point-this
%%```
%%Start from the code you wrote in {numref}`ex:instance-methods:delta`.
%%
%%Add another instance method to the class `Point` that has the signature `Point AddTo (Point other)`.
%%The method should treat the object as the delta and then apply itself, via the `Add` method, to the `Point` given as an argument.
%%
%%In other words, while `Add` adds another point to `this`, the method `AddTo` adds `this` to another `Point`.
%%In other words, we're letting the object upon which we call the method `AddTo` serve as the delta while we let the object being passed in as an argument serve as the object that is to be changed.
%%
%%Your solution should look something like the following.
%%```{code-cell}
%%class Point
%%{
%%  // ...
%%
%%  public void AddTo (Point other)
%%  {
%%    // Your code here...
%%  }
%%}
%%```
%%When you're done, you should be able to run the following code and get the same result.
%%```{code-cell}
%%:tags: [remove-input]
%%class Point
%%{
%%  public int X = 0;
%%  public int Y = 0;
%%  public int Z = 0;
%%
%%  public void Print ()
%%    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
%%
%%  public void Add (Point other)
%%  {
%%    X += other.X;
%%    Y += other.Y;
%%    Z += other.Z;
%%  }
%%
%%  public void AddTo (Point other)
%%    => other.Add(this);
%%}
%%```
%%```{code-cell}
%%Point point = new Point() { X=10, Y=20, Z=30 };
%%Point delta = new Point() { X=1, Y=2, Z=3 };
%%
%%delta.AddTo(point);
%%point.Print();
%%```
%%```{hint}
%%:class: dropdown
%%In this solution you should pass `this` as an argument to the instance method `Add`.
%%```
%%```{exercise-end}
%%```
%%
%%
%%
%%
%%```{exercise-start}
%%:label: ex:instance-methods:point-this-array
%%```
%%Start from the code you wrote in {numref}`ex:instance-methods:point-this`.
%%
%%Add an overload of the instance method `AddTo` in the class `Point` with the signature `void AddTo (Point[] points)`.
%%
%%The method should treat the object as the delta and then apply itself, via the `Add` method, to all the points in the array.
%%In other words, the two versions of `AddTo` does the same thing but one adds itself to a single point while the other adds itself to multiple points.
%%
%%In even other words, we're solving the same problem we solved in {numref}`ex:fields:delta` but this time with instance methods.
%%
%%Your solution should look something like the following.
%%```{code-cell}
%%class Point
%%{
%%  // Your code here...
%%
%%  public void AddTo (Point[] points)
%%  {
%%    // Your code here...
%%  }
%%}
%%```
%%
%%When you're done, you should be able to run the following code and get the same result.
%%```{code-cell}
%%:tags: [remove-input]
%%class Point
%%{
%%  public int X = 0;
%%  public int Y = 0;
%%  public int Z = 0;
%%
%%  public void Print ()
%%    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
%%
%%  public void Add (Point other)
%%  {
%%    X += other.X;
%%    Y += other.Y;
%%    Z += other.Z;
%%  }
%%
%%  public void AddTo (Point[] points)
%%  {
%%    foreach (Point point in points)
%%      point.Add(this);
%%  }
%%}
%%```
%%```{code-cell}
%%Point[] points = new Point[] {
%%  new Point() { X=10, Y=20, Z=30 },
%%  new Point() { X=100, Y=200, Z=300 },
%%  new Point() { X=1000, Y=2000, Z=3000 }
%%};
%%
%%Point delta = new Point() { X=1, Y=2, Z=3 };
%%delta.AddTo(points);
%%
%%foreach (Point point in points)
%%  point.Print();
%%```
%%```{hint}
%%:class: dropdown
%%In this solution you should pass `this` as an argument to the instance method `Add`.
%%```
%%```{exercise-end}
%%```
%%
%%
%%
%%```{exercise}
%%Draw a UML class diagram of the class `Point` as defined in {numref}`ex:instance-methods:point-this-array`.
%%Remember to include all fields and operations.
%%```
%%
%%
%%
%%
%%
%%%```{exercise-start}
%%%```
%%%Start with the classes you wrote in {numref}`ex:first-classes`.
%%%What does the following code print?
%%%Why is this the output that we get?
%%%
%%%```{code-cell}
%%%Apple f1 = new Apple();
%%%Pear f2 = new Pear();
%%%Console.WriteLine(f1);
%%%Console.WriteLine(f2);
%%%```
%%%```{exercise-end}
%%%```
%%
%
%
%## Properties
%
%```{exercise}
%What are properties?
%```
%
%```{exercise}
%Sometimes we mark the setter of a property as `private` while the getter is `public`.
%Why is this useful?
%```
%
%```{exercise}
%What is a read-only property in C#?
%What are they useful for?
%```
%
%```{exercise}
%What is an `init` accessor in the context of C# properties?
%What is it useful for?
%```
%
%```{exercise}
%What is the `required` keyword in the context of C# properties?
%What is it useful for?
%```
%
%
%```{exercise-start}
%```
%Assume that we have the following class.
%```{code-cell}
%class Circle
%{
%  private int diameter = 2;
%  public int Diameter
%  {
%    get => Radius * 2;
%    set => diameter = value;
%  }
%  public int Radius
%  {
%    get => Diameter / 2;
%    set => Diameter = value * 2;
%  }
%}
%```
%Which of the following lines causes the program to crash at run-time?
%Why does it crash?
%```csharp
%Circle circ = new Circle() { Diameter = 2 };
%circ.Radius = 1;
%Console.WriteLine(circ.Radius);
%```
%```{exercise-end}
%```
%
%
%```{exercise}
%:label: ex:properties:square
%Write a class called `Square` and give it the properties `Width`, `Height`, `Area`, `Perimeter`, and `Side`.
%All the properties should have `get` and `set` accessors.
%
%Remember to make use of calculated properties to avoid allowing a `set` accessor put an object of type `Square` in a state which violates the rules of a square (namely that all sides are the same length).
%```
%
%```{exercise}
%:label: ex:properties:equilateral-triangle
%Write a class called `EquilateralTriangle` and give it the properties `Width`, `Height`, `Area`, `Perimeter`, and `Side`.
%
%When computing the width and height of a triangle, you can assume that one of the sides are perfectly parallel with the x-axis.
%
%Remember to make use of calculated properties to avoid allowing a `set` accessor put an object of type `Square` in a state which violates the rules of a square (namely that all sides are the same length).
%```
%
%```{exercise}
%Looking at the classes you wrote in {numref}`ex:properties:square` and {numref}`ex:properties:equilateral-triangle`.
%If you were to replace some `set` accessors with `init` accessors, which would you replace and why?
%```
%
%```{exercise}
%Looking at the classes you wrote in {numref}`ex:properties:square` and {numref}`ex:properties:equilateral-triangle`.
%If you were to mark some properties as `required`, which would you mark and why?
%```
%
%
%## Static methods
%
%```{exercise}
%Why are static methods useful?
%```
%
%```{exercise}
%In C#, what is the difference between a *static method* and a *local function*?
%```
%
%```{exercise-start}
%:label: ex:static-methods-leet
%```
%Create a static class called `LeetCipher` and let it contain two static methods called `EncodeString` and `EncodeChar`.
%These methods should essentially contain the code that we wrote in {numref}`ex:methods-leet`.
%In other words, the static methods should implement the leet language and be able to convert strings and individual characters.
%Your static methods should behave according to the usage example below.
%
%```{code-cell} csharp
%:tags: [remove-input]
%static class LeetCipher
%{
%  public static char EncodeChar (char input)
%    => input switch {
%      'A' => '4', '4' => 'A',
%      'E' => '3', '3' => 'E',
%      'L' => '1', '1' => 'L',
%      'O' => '0', '0' => 'O',
%      'S' => '5', '5' => 'S',
%      'T' => '7', '7' => 'T',
%      _ => input
%    };
%
%  public static string EncodeString (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += EncodeChar(c);
%    return output;
%  }
%}
%```
%
%```{code-cell} csharp
%Console.WriteLine( LeetCipher.EncodeString("LEET 101") );
%```
%```{code-cell} csharp
%Console.WriteLine( LeetCipher.EncodeChar('E') );
%```
%```{exercise-end}
%```
%
%```{exercise-start}
%:label: ex:static-methods-substitutions
%```
%In the chapter on [methods](methods) we either wrote or discussed the possibility to write four different methods for applying arrays of substitutions to a character or string.
%Let's now throw them all in a static class that we'll call `SubstitutionCipher`.
%
%While we're at it, we'll also give them new names that hopefully make it a tad easier to see what method does what.
%If these names drive you crazy then rest assured that we will deal with this when we get to the chapter on [overloading](overloading).
%
%```{code-cell} csharp
%:tags: [remove-input]
%static class SubstitutionCipher
%{
%  public static char EncodeCharWithCharReplacements (char input, (char, char)[] substitutions)
%  {
%    foreach ((char, char) substitution in substitutions)
%      if (substitution.Item1 == input)
%        return substitution.Item2;
%    return input;
%  }
%
%  public static string EncodeCharWithStringReplacements (char input, (char, string)[] substitutions)
%  {
%    foreach ((char, string) substitution in substitutions)
%      if (substitution.Item1 == input)
%        return substitution.Item2.ToString();
%    return input.ToString();
%  }
%
%  public static string EncodeStringWithCharReplacements (string input, (char, char)[] substitutions)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += EncodeCharWithCharReplacements(c, substitutions);
%    return output;
%  }
%
%  public static string EncodeStringWithStringReplacements (string input, (char, string)[] substitutions)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += EncodeCharWithStringReplacements(c, substitutions);
%    return output;
%  }
%}
%```
%
%Implement a static class that looks like this:
%
%```csharp
%static class SubstitutionCipher
%{
%  public static char EncodeCharWithCharReplacements (char input, (char, char)[] substitutions) => // ..
%  public static string EncodeCharWithStringReplacements (char input, (char, string)[] substitutions) => // ..
%  public static string EncodeStringWithCharReplacements (string input, (char, char)[] substitutions) => // ..
%  public static string EncodeStringWithStringReplacements (string input, (char, string)[] substitutions) => // ..
%}
%```
%
%The static methods of the static class should behave like this:
%
%```{code-cell} csharp
%var leetLike = new (char, char)[] {
%  ('E', '3'), ('L', '1'), ('O', '0') };
%var robbersLike = new (char, string)[] {
%  ('H', "HOH"), ('L', "LOL") };
%
%Console.WriteLine(SubstitutionCipher.EncodeCharWithCharReplacements('L', leetLike));
%Console.WriteLine(SubstitutionCipher.EncodeCharWithStringReplacements('L', robbersLike));
%Console.WriteLine(SubstitutionCipher.EncodeStringWithCharReplacements("HELLO", leetLike));
%Console.WriteLine(SubstitutionCipher.EncodeStringWithStringReplacements("HELLO", robbersLike));
%```
%
%```{tip}
%We also wrote a method called `charCharArrayToCharStringArray` in {numref}`ex:methods-charchar-to-charstring`.
%Feel free to choose whether to add this as another method to this static class, to inline that code in the appropriate method above, or simply to use more duplication.
%```
%```{exercise-end}
%```

%  - Write a method that greets a name that you pass.
%  - Write a method that computes the hypothenuse.
%  - Write a method that converts a `string?` to a `string`. Tie back to the nullable discussion in the chapter on [data types](data-types).



## Interfaces

%```{exercise}
%What is the abstract idea of an interface?
%Come up with your own example in natural language that's different from the example given in this chapter on screws, bolts, and screwdrivers.
%```
%
%```{exercise}
%Explain the keyword `interface`?
%```
%
%```{exercise}
%What is the difference between a `class` and an `interface`?
%```
%
%
%```{exercise-start}
%:label: ex:interfaces:leet
%```
%Rewrite the class `LeetCipher` that you wrote in {numref}`ex:instance-methods:leet` so that it implements the two interfaces `IStringToStringCipher` and `ICharToCharCipher` that we defined earlier in this chapter.
%
%```{code-cell} csharp
%:tags: [remove-input]
%class LeetCipher : IStringToStringCipher, ICharToCharCipher
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
%When you are done you should be able to run the following code and get the corresponding output.
%```{code-cell} csharp
%// Note how the compile-time and run-time types are different.
%IStringToStringCipher stringCipher = new LeetCipher();
%ICharToCharCipher charCipher = new LeetCipher();
%
%string output1 = stringCipher.Encode("LEET");
%char output2 = charCipher.Encode('E');
%
%Console.WriteLine($"{output1} {output2}");
%```
%```{exercise-end}
%```
%
%
%```{exercise}
%Can the class `LeetCipher` of {numref}`ex:interfaces:leet` also implement the interface `ICharToStringCipher`?
%Why or why not?
%```
%
%```{exercise}
%Can the class `RobbersCipher` also implement the interface `ICharToCharCipher`?
%Why or why not?
%```
%
%```{exercise}
%Rewrite the class `FlipFlopCaesarCipher` from the chapter on [concrete injected object composition](concrete-injected-object-composition) so that it implements all the interfaces from this chapter that you believe that it should implement.
%Which ones did you choose and which did you not choose?
%Why?
%```
%
%
%```{exercise}
%Does an interface define a "[compile-time type](run-time-and-compile-time-types)", a "[run-time type](run-time-and-compile-time-types)", or both?
%What does this mean?
%```
%
%```{exercise}
%:label: ex:interfaces
%1. Define your own interface.
%2. Write a class that implements that interface.
%3. Declare a variable whose compile-time type is your interface, and whose run-time type is your class.
%4. Draw a UML class diagram of your interface and your class or classes.
%```

%
%## Maintainability
%
%```{exercise}
%What are the five characteristics of maintainability listed by ISO/IEC 25010:2011 and that we have discussed in this chapter?
%Explain each of them in your own words.
%```
%
%```{exercise}
%How could it possible to have a high level of modularity while also having a low level of reusability?
%Why could such a system problematic?
%```
%% TODO: If modularity promotes allowing changes that don't cascade wouldn't this promote repeating oneself? Is the antidote to that to improve reusability?
%
%```{exercise}
%How could it possible to have a high level of modularity while also having a low level of analysability?
%Why could such a system problematic?
%```
%
%```{exercise}
%How could it possible to have a high level of analysability while also having a low level of modularity?
%Why could such a system problematic?
%```
%
%```{exercise}
%Come up with your own example of something that's not related to code but that still can be discussed in terms of the maintainability characteristics like we did in this chapter with LEGO and DUPLO.
%Here are some ideas: House building, plumbing, modular furniture, lamps, Macs and PCs, and toy lines (BRIO Builder, railway systems, Meccano, etc.).
%```
%
%


%## Refactoring
%
%```{exercise}
%What is refactoring?
%```
%
%```{exercise}
%Give an example of a refactoring?
%```
%
%```{exercise}
%In what sense can the word "refactoring" both be considered a *noun* and a *verb*?
%```
%
%```{exercise}
%Why does refactoring matter?
%```
%
%```{exercise}
%How can we use refactoring to improve the [maintainability](maintainability) of our code?
%```
%
%```{exercise}
%In {cite:t}`fowler1999`, "refactoring" as a noun is defined as
%"a change made to the internal structure of software [...] without changing its observable behavior".
%What does the term "observable behavior" mean?
%Why can't we just say "without changing the code"?
%```


%## Generics
%
%```{exercise}
%What are generics?
%```
%
%```{exercise}
%What is parametric polymorphism?
%```
%
%```{exercise}
%Can any method be converted into a parametrically polymorphic method while still maintaining the same functionality?
%Why or why not?
%```
%
%```{exercise}
%Give an example, in your own words, of a type that could be parametrically polymorphic.
%```
%
%```{exercise}
%What is the difference between a "generic type definition" and a "constructed generic type"?
%```
%
%```{exercise}
%Why can't we use subtyping to somehow "merge" the types `CompositeCharToCharCipher` and `CompositeStringToStringCipher`?
%```
%
%```{exercise}
%Explain the benefits of generics in terms of the five characteristics of [maintainability](maintainability:characteristics).
%```


%## Type parameters
%
%```{exercise}
%What is the difference between a generic type *parameter* and a generic type *argument*?
%```
%
%```{exercise}
%Why do we need type parameters?
%```
%
%```{exercise}
%Assume that we declare two type parameters, let's call them `T1` and `T2` within a generic type definition.
%
%1. When the generic type is constructed, is it *necessary* that `T1` is the same type as `T2`?
%2. When the generic type is constructed, is it *possible* for `T1` to be the same type as `T2`?
%```
%
%```{exercise}
%In your own words, give an example of a type parameter that could be used in a generic type or a generic method.
%In other words, where could you make use of the type parameter?
%```
%
%```{exercise-start}
%```
%Consider the code example below.
%```{code-cell}
%interface IPair<T1,T2>
%{
%  public T1 Item1 { get; set; }
%  public T2 Item2 { get; set; }
%}
%
%class Pair<T> : IPair<T, T>
%{
%  public T Item1 { get; set; }
%  public T Item2 { get; set; }
%}
%```
%Why are we allowed to use the type argument `T` twice on the right side of the colon in the definition of the class `Pair<T>`?
%Had we tried to use the type parameter `T` twice on the left side of the colon we would have gotten a compiler error.
%Why?
%```{exercise-end}
%```


%## Generic types
%
%```{exercise}
%What are genric types?
%```
%
%```{exercise}
%What is the difference between a generic type *definition* and a *constructed* generic type?
%```
%
%```{exercise}
%Why does the generic type `CompositeCipher<T1,T2,T3>` require three type parameters? Can we achieve the same functionality with just two?
%```
%
%```{exercise}
%Rewrite the class `SequenceCipher` from {numref}`ex:array-cipher` so that it implements a construction of the generic interface `ICipher<TIn,TOut>`.
%Bonus question: Can the class `SequenceCipher` be made generic?
%Why or why not?
%```
%
%```{exercise}
%:label: ex:generic-types:conditional-cipher
%Rewrite the conditional cipher that we implemented in {numref}`abstract-injected-object-composition:exercises:predicates` so that it is generic.
%
%Hint: This also requires that we rewrite the predicate interface from that same exercise.
%%ConditionalCipher<TIn,TOut>
%%IPredicate<T>
%```
%
%```{exercise}
%Come up with and implement your own *generic type* that fits into our ecosystem of ciphers.
%```
%
%```{exercise}
%Come up with and implement your own type that subtypes a constructed generic type.
%The constructed generic type should be constructed from one of the generic types that we've discussed in this chapter.
%```
%
%
%```{exercise-start}
%```
%Write a generic class called `Repeater<T>` that takes an element of type `T` in its constructor and exposes an instance method with the signature `T[] Repeat (int times)`.
%The instance method returns a new array of a length equal to `times` where every position contains the element passed through the constructor.
%
%When you are done, you should be able to run the following code and get the same result.
%
%```{code-cell}
%class Repeater<T>
%{
%  T elem;
%
%  public Repeater (T elem)
%    => this.elem = elem;
%
%  public T[] Repeat (int times)
%  {
%    T[] xs = new T[times];
%    for (int i=0; i<times; i++)
%      xs[i] = elem;
%    return xs;
%  }
%}
%```
%
%```{code-cell}
%Repeater<string> repeater = new Repeater<string>("Echo");
%string[] output = repeater.Repeat(5);
%Console.WriteLine(String.Join(", ", output));
%```
%```{exercise-end}
%```
%


% ## Dependency injection
%
%```{exercise}
We say that dependency injection separate 'construction' from 'use', what is meant by this?
%```

