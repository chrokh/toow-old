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

%- TODO: Also: void
%- TODO: Use `AsString` instead of `Print` to avoid encouraging the habit of coupling to the console. Just mention that we want to call it `ToString` but we can't without warnings since we have to learn about inheritance first.
%- TODO: Must also discuss default parameters. In the context of instance methods and in constructors.


% TODO: Usually verbs. Or implied verbs as discussed in procedures.

%
%Let's look a slightly more complicated example.
%In some of the examples in this chapter we called the method `GetType` on values of type `string`, `int`, and `double`.
%This means that the these types support the operation `GetType` and that this method is called using dot notation.
%
%``{code-cell}
%Type t1 = "A".GetType();
%Type t2 = 420.GetType();
%Type t3 = 3.14.GetType();
%``
%
%The method `GetType` is an instance method.
%It is defined on the class `Object` and called upon instances of it, meaning on objects of that type.
%We'll talk more about the built in types in C# in the chapter on [type hierarchies](type-hierarchies) and about [classes](classes) and [objects](objects) later.
%What to understand now however is that `GetType` is an operation that we can call on objects of type `string` because all strings can be treated as if they are of type `Object` and since the method is defined as an instance method on that class.
%

# Instance methods

## Motivation

By using `public` instance fields we are violating the pricinple of "[information hiding](information-hiding)".
We are breaking encapsulation.
We discussed this problem in the chapter on [fields](fields) and said that we need to learn more in order to move from `public` to `private`.
Now it's time for more.
Enter "instance methods" and the ability to send [messages](message-passing) to objects.

We've said that objects "mix" data *and* methods.
We've started talking about what it means for an object to contain *data* but we have not yet talked about what it means for an object to contain *methods*.
That's what we're talking about in this chapter.




## Definition

Instance methods are at the end of the day [methods](methods).
Luckily, we've already talked about methods so this should be easy.
A method has a *name*, a return type, and a parameter list including types and names.
This is what we call the signature of the method.

Many chapters ago, we discussed the notion of [static methods](static-methods).
Static methods are also defined in classes but they are merely methods that are "namespaced" to the name of the class.
Instance methods are however methods that are executed in the context of the instance upon which we've called the method.

What does "in the context of" mean?
The difference between [static methods](static-methods) and instance methods is essentially the same difference as the difference between [static variables](static-variables) and instance variables.
Let's dive in to the details to unpack this.


### Declaration

In the snippet below we define an instance method where the return type is `void` (1), the method name is `Scale` (2), and the parameter list only contains a single parameter which is `(int factor)` (3).
The first (and only) parameter type is `int` (4) and the first (and only) parameter name is `factor` (5).
Finally the method body is empty (`{ }`) (6).

```
class Rectangle
{
                     _____3_______
          _1__ __2__  _4_  ___5__
   public void Scale (int  factor)
   {
     ... 6
   }
}
```

So what makes this an instance method rather than a static method or local function?
Well, in C# it's the fact that we've defined the method directly within a class and that we've not added the modifier `static` before the return type.

So what's different about an instance method when compared to say a [static method](static-methods) or a [local function](local-functions)?

```{important}
Instance methods are defined in classes, but they are executed in the context of an *instance* of the class rather than in the context of the class itself.
Static methods are, in contrast, executed in the context of the class.
```

What do we mean when we say that the method is executed within the context of an *instance* of the class and not the class itself?
Well, think about how instance [fields](fields) work.
It's the same deal here.
When we're setting a value to or getting a value from a field then we are setting or getting a value to or from a field on a particular object.
Not on all objects at once.
Not on the class, but on instances of the class.
It's the same thing with instance methods.
When we're calling a method then the body of the method will be executed within the context of the instance we called it upon.

Remember the class `Rectangle` from the chapter on [fields](fields)?
Let's use that as a first example.
We'll dive in to all the details one by one in a moment.
In the chapter on fields the class looked something like the code below.
It was a simple class with two `public` instance fields of type `int` called `Width` and `Height`.

```{code-cell}
class Rectangle
{
  public int Width = 0;
  public int Height = 0;
}
```

In the chapter on [fields](fields) we then defined a [local method](local-methods) with the signature `void printRectangle (Rectangle rect)`.
This method took objects of type `Rectangle` as input and produced nothing as output.
The "[side-effect](side-effects)" of running the method was however that the width and height of the rectangle was printed to screen.

```{code-cell}
void printRectangle (Rectangle rect)
  => Console.WriteLine($"{rect.Width} x {rect.Height}");
```

Why are we talking about that method now if it was a local method?
Because now it's time to redefine that method as an instance method.
When we redefine it as an instance method it will no longer be a method that takes a `Rectangle` as input and returns `void` as input.
Instead it will be a method that's callable *"on"* objects of type `Rectangle`.

Let's add the method but let's only call it `Print` this time.
Why not `PrintRectangle`?
Because, since it's now an instance method that will be called on objects of type `Rectangle` it is more obvious that what it prints is the object itself.

```{code-cell}
class Rectangle
{
  public int Width = 0;
  public int Height = 0;

  public void Print ()
    => Console.WriteLine($"{this.Width} x {this.Height}");
}
```

The print method is now an instance method that when executed, will be executed within the context of a given instance of type `Rectangle`.
Pay special attention to how we've replaced the variable `rect` with the keyword `this`.
We'll discuss that keyword more in moment, but in short it is an explicit reference to the object itself.

```{note}
If you're confused about the fat arrow `=>` then don't be.
This is just the [expression-bodied members](expression-bodied-members) syntax that we've discussed earlier.
```

```{note}
If you're wondering what the keyword `this` means, don't worry, we'll talk about it in just a moment.
```

### Invocation

So how do we call an instance method?
Well, first we need to get a hold of an instance, and then we simply invoke the method using [dot notation](dot-notation).
And when we invoke it we of course must pass whatever arguments the method demands.

Let's invoke the instance method `Print` that we defined in the class `Rectangle`.

```{code-cell}
Rectangle r1 = new Rectangle() { Width=10, Height=20 };
Rectangle r2 = new Rectangle() { Width=100, Height=200 };

r1.Print();
r2.Print();
```

Notice how we're no longer passing any arguments to the printing method.
We're simply invoking the instance method `Print` on the object and since that object knows its own width and height it knows what to print.
Any given object does not have any information about any other object's width or height.
It only knows its own and that's what it prints.


(keyword:this)=
### Keyword `this`

What about the keyword `this` that was used in the implementation of the instance method `Print` of the `Rectangle` class.
What is it and what does it do?

When the code in the body of an instance method is being executed, then that code is being executed in the context of the object on which it was invoked.
The keyword `this` refers to the object itself.

In that particular example we don't actually need the keyword `this`.
We could just as well, simply, have written `Width` instead of `this.Width`.
I only chose to use the keyword `this` in order to force us to have this discussion and to hopefully improve clarity.

What do we mean when we say that we don't necessarily "need" the `this` keyword?
We mean that we don't need it because there is *no ambiguity*.
What do we mean when we say that there is "no ambiguity"?
We mean that the variables `Width` and `Height`, for example, are both only defined in one place that's in scope in the body of the instance method.

If however we had named the constructor parameters `X` and `Y`, meaning in uppercase then there would be ambiguity.

What's an example where we have ambiguity?
We'll get to see some more commonly occurring examples of when such ambiguity arises in the chapter on [constructors](constructors).

But let's devise a slightly more contrived example now.
Let's define an instance method called `Scale` that takes two parameters called `Width` and `Height`.
The method multiplies the current width and height with the scalars that we've passed in.

(rectangle-scale)=
```{code-cell}
class Rectangle
{
  public int Width = 0;
  public int Height = 0;

  public void Print ()
    => Console.WriteLine($"{this.Width} x {this.Height}");

  public void Scale (int Width, int Height)
  {
    this.Width *= Width;
    this.Height *= Height;
  }
}
```

```{note}
Why do I say that this is a "contrived" example?
Because local and `private` variables in C# are customarily given names that start with lowercase letters.
So an implementation of this method would probably actually have the signature `void Scale (int width, int height)`.
```

How does the `Scale` method work?
Well, it's an instance method, so we call it on an instance using dot notation but this time we also need to pass arguments.

```{code-cell}
Rectangle r1 = new Rectangle() { Width=1, Height=2 };
Rectangle r2 = new Rectangle() { Width=3, Height=4 };

r1.Scale(2, 3);
r2.Scale(4, 5);

r1.Print();
r2.Print();
```

But let's get back to discussing the keyword `this`.
Why do we need to use that keyword in the definition of the instance method `Scale`?

Think about it.
What would happen if we say `Width *= Width`?
As we know from the chapter on [operators](operators) the expression is shorthand for `Width = Width * Width`.
So in other words, we are multiplying the input width with itself and storing it in the local variable `Width` that we passed in as an argument.
It would behave like this:

```{code-cell}
class BadRectangle
{
  public int Width = 0;
  public int Height = 0;

  public void Scale (int Width, int Height)
  {
    Width *= Width;
    Height *= Height;
  }

  public void Print ()
    => Console.WriteLine($"{this.Width} x {this.Height}");
}
```
```{code-cell}
BadRectangle rect = new BadRectangle() { Width=1, Height=1 };

rect.Scale(1000, 2000);

rect.Print();
```

Notice how even after we've called the `Scale` method on our object, its dimensions remains whatever we set it to at the start.
This is *not* the behavior that we intended to achieve.
If we're going to name the parameters of the `Print` method `Width` and `Height` then we must use the keyword `this` to disambiguate between those variables and the instance fields with the same names.

In the code below we've rewritten the code for `BadRectangle` so that it makes use of the `this` keyword.
With this change, the code behaves as expected again.

```{code-cell}
class GoodRectangle
{
  public int Width = 0;
  public int Height = 0;

  public void Scale (int Width, int Height)
  {
    this.Width *= Width;   // Notice the `this` keyword.
    this.Height *= Height; // Notice the `this` keyword.
  }

  public void Print ()
    => Console.WriteLine($"{this.Width} x {this.Height}");
}
```
```{code-cell}
GoodRectangle rect = new GoodRectangle() { Width=1, Height=1 };
rect.Scale(1000, 2000);
rect.Print();
```

Of course, as we mentioned before, even though the above code works as expected, it is unconventional to name parameters with an initial capital letter.

```{tip}
In C# it is convention to name local and instance or static `private` variables and methods with an initial lowercase letter, while `public` instance and static variables and methods are named with an initial uppercase letter.
A field is thus conventionally named `Width` if it's `public` but `width` if it's `private`.
```

One final point about `this` before we move on.
You might have already figured this out but since the keyword `this` points to the object itself, then it must have a type.
If it's an object then that object must be of a type.
What is that type?
The type is the same as the class in which it is used.
So, when we use the `this` keyword in the instance method `Scale` in the class `GoodRectangle` then the type of object that we get when saying `this` is of type `GoodRectangle`.



### Overloading

Instance methods support [overloading](overloading).
Overloading of instance methods is not substantially different from overloading of [static methods](static-methods).
As long as two instance methods have different type signatures they can share the same name.

Let's take the method `Scale` that we defined before as an example.
In our definition of `Scale` we expected a width and a height multiplier.
Let's now define an overload of the instance method `Scale` that only expects a single multiplier that we apply to both the width and height.

```{code-cell}
class Rectangle
{
  public int Width;
  public int Height;

  public void Scale (int width, int height)
  {
    Width *= width;
    Height *= height;
  }

  public void Scale (int factor)
  {
    Width *= factor;
    Height *= factor;
  }

  public void Print ()
    => Console.WriteLine($"{Width} x {Height}");
}
```

Notice how we now have two instance methods called `Scale`.
This is allowed since they have different type signatures.

Of course, we could have implemented our second `Scale` method in terms of our first.
Think about it.
Scaling both the width and height with the same multiplier is a special case of scaling width and height with possibly different multipliers.

```{code-cell}
class Rectangle
{
  public int Width;
  public int Height;

  public void Scale (int width, int height)
  {
    Width *= width;
    Height *= height;
  }

  public void Scale (int factor)
    => Scale(factor, factor); // Calls the other overload.

  public void Print ()
    => Console.WriteLine($"{Width} x {Height}");
}
```

```{note}
An instance method can call other instance methods in the same object it is running.
This can be done explicitly by using the `this` keyword.
%The fact that an instance method in an object may call other instance methods in the same object is known as "open recursion".
```

```{note}
The keyword `this` is in some languages known as `base`.
```


%### TODO: Late binding, Dynamic binding? Michaelis (2020)

%### TODO: Recursion.
%https://stackoverflow.com/questions/6089086/what-is-open-recursion


%### Type signatures
%
%Using the more mathematical syntax for [type signatures](type-signatures) we would say that the signature is:
%
%``
%printRectangle :: Rectangle -> void
%``
%
%Using our more mathematical type signature syntax we would say that it's type is:
%
%``
%Print :: Rectangle ~> void
%``
%
%Notice how we've replaced the regular arrow (`->`) with a "squiggly" arrow (`~>`).
%The regular arrow reads as "maps to".
%The squiggly arrow sort of reads as "is defined as an instance method on" but we have to shift the words around a bit when reading a whole type signature.
%When reading the type signature of `Print` for example we would say `Print` is an instance method defined on objects of type `Rectangle` that maps to `void`.
%
%---
%
%Why do we care about using the more mathematical syntax when we can talk about type signatures in perfectly valid C# syntax?
%Because the C# convention is to not distinguish between static and instance methods.
%
%Consider, for example, the difference between how we convert the case of a single `char` and the case of a full `string`.
%
%``{code-cell}
%Char.ToUpper('c');
%"hello".ToUpper();
%``
%
%The method `ToUpper` for characters is a static method that we call on the class `Char` and pass an object of type `Char`.
%The method `ToUpper` for strings is an instance method that is called on objects of type `string`.
%
%If we want to discuss the types of these methods using conventional C# syntax and want to include information about what class they are defined upon we would say:
%
%``
%Char.ToUpper (Char)
%String.ToUpper ()
%``
%
%Notice how the syntax is the same in both cases.
%In some languages, the convention is to use `.` for instance methods and `#` for static methods.
%But not in C#.
%As such, there is no way to certainly tell what methods are static methods and what methods are instance methods.
%If we wanted to maintain that information we would conventionally express ourselves using regular type signature syntax:
%
%``
%public static Char ToUpper (Char c);
%public string ToUpper ();
%``
%
%Now we can certainly determine what methods are static and what methods are not static.
%However, we've now lost information about the location of these methods.
%Meaning in what classes they actually are defined.
%
%So, this is why I tend to favor using the more mathematical non-C# syntax to discuss types.
%With that syntax we would say:
%
%``
%Char.ToUpper :: Char -> Char
%ToUpper :: String ~> String
%``
%
%With this syntax we keep information about "where" a method is defined.
%We can use this synta


### UML class diagrams

So how do we capture instance methods in UML class diagram notation.
Remember how a class in a UML class diagram is divided into three sections (see image below)?
Well instance methods are, in UML, called "operations".
Hence, we define them in the third section.

```
┌────────────────────┐
│ <class identifier> │
├────────────────────┤
│                    │
│    <attributes>    │
│                    │
├────────────────────┤
│                    │
│    <operations>    │
│                    │
└────────────────────┘
```

Let's capture the class `Rectangle` with all the instance method that we've defined in this chapter.
In the examples section in this chapter we will also add another instance method to the `Rectangle` class that is called `Area` and returns an `int`.
Let's throw that instance method into the diagram for good measure.

```
┌────────────────────────────────────────┐
│                Rectangle               │
├────────────────────────────────────────┤
│ + Width : int                          │
│ + Height : int                         │
├────────────────────────────────────────┤
│ + Scale (width:int, height:int) : void │
│ + Scale (multiplier:int) : void        │
│ + Print () : void                      │
│ + Area () : int                        │
└────────────────────────────────────────┘
```

By now you should start to see how UML class diagrams are quite useful when we need to quickly reason about what a class does.



## Examples

Let's look at some more examples.

### Rectangles

So far we've only looked at instance methods that return `void`.
But of course instance methods can return values of any type.
Let's define an instance method called `Area` for the class `Rectangle` that we've worked with in this chapter.
As you might expect the method computes the area and returns it.

Since both the width and the height of the rectangle are stored as integers then we know that the returned area will be an integer.

```{code-cell}
class Rectangle
{
  public int Width;
  public int Height;

  public int Area ()
    => Width * Height;

  public void Scale (int width, int height)
  {
    Width *= width;
    Height *= height;
  }

  public void Scale (int factor)
    => Scale(factor, factor);

  public void Print ()
    => Console.WriteLine($"{Width} x {Height}");
}
```

How does the instance method work?
Simple, when we call the instance method `Area` on an instance of type `Rectangle` then the method checks what the `Width` and `Height` is of that object, multiplies them, and return the result.

```{code-cell}
Rectangle r1 = new Rectangle () { Width=20, Height=10 };
Rectangle r2 = new Rectangle () { Width=30, Height=20 };
Console.WriteLine( r1.Area() );
Console.WriteLine( r2.Area() );
```


### String manipulation

We've talked about the type `string`.
The type `string` defines many instance methods.
In C# we can always find what instance methods a given type supports in the [documentation](https://learn.microsoft.com/en-us/dotnet/api/system.string?view=net-6.0).
Let's look at a few simple operations here though so that we can practice using instance methods.

#### Contains
One instance method that objects of type `string` implement is `Contains`.
The instance method `Contains` accepts an argument of type `string` and returns a boolean that represents whether the `string` instance contains the `string` passed as an argument anywhere.

```{code-cell}
string message = "Hello world";
string keyword = "hello";

bool result = message.Contains(keyword);

Console.WriteLine(result);
```

#### IndexOf

Another instance method available on strings is the method `IndexOf`.
This instance method too takes a parameter of type `string` and checks whether the second `string` can be found in the first.
If a match is found it doesn't however merely return `true`.
Instead it returns the index in the `string` where we will find the start of the `string` that it found.

```{code-cell}
Console.WriteLine( "Hello world".IndexOf("world") );
```

If the `string` that we were looking for could not be found in the `string` that we are searching in then the instance method returns `-1`.

```{code-cell}
Console.WriteLine( "Hello world".IndexOf("apples") );
```

#### Substring

Another useful instance method that objects of type `string` supports is the method known as `Substring`.
The method extracts a part of `string`.
We refer to a part of a string as a "substring" which is why the method is named as such.

```{tip}
In .NET there are often multiple overloads of any given method.
Just like when we're trying to figure out what methods are defined by some type, we should resort to [the documentation](https://learn.microsoft.com/en-us/dotnet/api/system.string.substring?view=net-6.0#overloads) to figure out what overloads are available of any given method.
```

One overload of the method `Substring` takes two parameters of type `int`.
The first `int` specifies from which index we should start extracting characters, and the second `int` specifies how many characters we should extract.

```{code-cell}
Console.WriteLine( "Hello world".Substring(1, 4) );
```


%### Mutable numbers
%
%Remember the `Nat` example from when we discussed [message passing](objects:examples:nat) in the chapter on objects?
%
%``{code-cell} csharp
%class Nat
%{
%  int n = 0;
%  public void Add (Nat other) => this.n += other.n;
%  public int ToInt () => n;
%}
%``
%
%We would be able to use the type to create objects of type `Nat` and then add them like this:
%
%``{code-cell} csharp
%Nat x = new Nat(); // Instantiates an object of type Nat.
%Nat y = new Nat();  // Instantiates an object of type Nat.
%
%Console.WriteLine($"x = {x.ToInt()}");
%
%// Sends the message (calls the instance method) Add
%// to the object x, passing object y as an argument.
%x.Add(y);
%
%Console.WriteLine($"x = {x.ToInt()}");
%``





### Robber's language

Let's get back to our good old language games and ciphers.
We are now ready to convert the static class `RobbersCipher` from the chapter on [overloading](overloading:examples:robbers) to a regular class where all methods are instance methods.

```{code-cell} csharp
class RobbersCipher
{
  public char Vowel = 'o';

  public string Encode (char input)
  {
    string consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    if (consonants.Contains(Char.ToUpper(input)))
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

Notice how we've massively simplified the code that checks whether the character that we've been passed is a vowel or not.
This is possible since we now know about instance methods and since we now know about the instance method `Contains` that objects of type `string` supports.

Primo!
But does it work?
How do we use it?
Well, first off we need to create an instance of the `RobbersCipher` class.
If we want to, we can use object initializers to change the `Vowel` that the instance will be using when encoding.

```{code-cell} csharp
RobbersCipher c1 = new RobbersCipher() { Vowel = 'o' };
RobbersCipher c2 = new RobbersCipher() { Vowel = 'a' };
```

Then we can simply call the `Encode` method any number of times that we want.

```{code-cell} csharp
Console.WriteLine( c1.Encode("Dog") );
```

```{code-cell} csharp
Console.WriteLine( c2.Encode("Dog") );
```




(caesar-encode)=
### Caesar cipher

Let's now do something a bit more complex.
We've learned enough skills to be able to do a [Caesar Cipher](caesar-cipher).

Similar to the other ciphers that we've built we'll solve it by writing two overloaded methods.
One that takes an input `string` and one that takes an input `char`.
The method that takes a `string` will call the other method for each of its constitutent characters and concatenate the resulting encoded `string`.

Beyond the input, we ought to accept an additional parameter that we could call `steps`.
This parameter is of type `int` and determines how many steps forward or backwards in the alphabet we should take when encoding data.

Here's what the class would look like:

```{code-cell} csharp
class CaesarCipher
{
  public int Steps = 1;

  public char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + Steps) % alphabet.Length;
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

Let's check if it works as expected.

```{code-cell} csharp
CaesarCipher cipher1 = new CaesarCipher() { Steps = 2 };
CaesarCipher cipher2 = new CaesarCipher() { Steps = -1 };
```

```{code-cell} csharp
Console.WriteLine( cipher1.Encode("AbYz") );
```

```{code-cell} csharp
Console.WriteLine( cipher2.Encode("AbYz") );
```

Ok, it seems to work.


%Now that we've got a method that deals with single characters, `CaesarEncodeChar` we can simplify the method using early `return` statements and the [ternary operator](ternary-operator).
%Whether the rewritten method is easier to read or not is a question of taste so you are free to disagree.
%Nevertheless, since the new version is shorter I'm going to make use of it in this book since it occupies less vertical space.
%
%class CaesarCharCipher
%{
%  int steps;
%
%  public CaesarCharCipher (int steps)
%    => this.steps = steps;
%
%  public char Encode (char input)
%  {
%    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
%    int i = alphabet.IndexOf(Char.ToUpper(input));
%    if (i == -1) return input;
%    int remainder = (i + steps) % alphabet.Length;
%    int newIndex = remainder >= 0 ? remainder : remainder + alphabet.Length;
%    char output = alphabet[newIndex];
%    return Char.IsLower(input) ? Char.ToLower(output) : output;
%  }
%}





### Random walk

%You might be thinking that all this sounds quite simple but not very useful.
Let's look at a slightly larger program that solves a more concrete problem.
Let's take the problem known as the Drunkard's Walk from statistics.
I happen to appreciate the rephrased version called the Drunk Student's Walk.

Here's the story.
A student has been ingesting way too many alcoholic beverages and is now rendered incapable of walking.
Seen from above the student is walking on a two-dimensional grid.
Any time the student attempts to take a step he or she is stumbling in any random direction.
There are 9 possible moves that the student can make any time he or she attempts to take a step.

Now we're asking the following question.
If we ask this student to stay within a 10x10 square, how many random steps does it *on average* take before the student exits the 10x10 square.

Let's capture the notion of a drunk student as a class and try to use this to solve our problem.
Try to solve this problem on your own before you study the solution below.
As always, there are many solutions to this problem.

You can generate a pseudo random number in C# by first instantiating a single object of type `Random`.
For the sake of better randomness it is important that you reuse the same `Random` object rather than instantiating new objects of that type.
To get a random number between `-1` and `1` (inclusive) we would call the method `Next` and pass the numbers `-1` and `2`.
Like in the example below:

```{code-cell}
Random rng = new Random();
int randomNumber = rng.Next(-1, 2);
```

```{code-cell}
:tags: [hide-input, hide-output]
// STUDENT CLASS:

class Student
{
  Random rng = new Random();
  int x = 0;
  int y = 0;
  int steps = 0;

  public int StepsTaken ()
    => steps;

  public void Move ()
  {
    int dx = rng.Next(-1, 2);
    int dy = rng.Next(-1, 2);
    x += dx;
    y += dy;
    steps++;
  }

  public bool IsWithin (int x, int y)
    => this.x <= x
    && this.x >= -x
    && this.y <= y
    && this.y >= -y;
}


// MAIN PROGRAM:

int numStudents = 100;
int totalSteps = 0;

for (int i=0; i<numStudents; i++)
{
  Student student = new Student();

  while (student.IsWithin(10, 10))
    student.Move();

  totalSteps += student.StepsTaken();
}

Console.WriteLine("Average steps: " + totalSteps / numStudents);
```




## Exercises

```{exercise}
In your own words, explain how instance methods are different from static methods.
```

```{exercise}
What do we mean when we say that public fields "break" encapsulation?
```


```{exercise}
Can you *overload* an instance method by just varying the *return type*?
Why or why not?
```

```{exercise}
Can you *overload* an instance method by just varying a single *parameter name*?
Why or why not?
```

```{exercise}
Can you *overload* an instance method by just varying a single *parameter type*?
Why or why not?
```




```{exercise-start}
```
Write a class called `ReverseCipher` which expose a public instance method with the following signature:

```csharp
string Encode (string input);
```

The method should implement the Reverse cipher that we worked with in the chapter on [static methods](static-methods:examples:reverse).
The method should implement the Reverse cipher that we defined in the chapter on [algorithms](reverse-cipher).

When you are done, you should be able to run the following code and get the corrseponding output.

```{code-cell} csharp
:tags: [remove-input]
class ReverseCipher
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

```{code-cell} csharp
ReverseCipher reverser = new ReverseCipher();
Console.WriteLine(reverser.Encode("Hello"));
```
```{exercise-end}
```



```{exercise-start}
:label: ex:instance-methods:leet
```
Write a class called `LeetCipher` which expose two overloaded public instance methods with the following signatures:

```csharp
string Encode (string input);
char Encode (char input);
```

Both methods should encode the input into [Leetspeak](leet-language) and then return the result.

```{code-cell} csharp
:tags: [remove-input]
class LeetCipher
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
The code first instantiates a cipher and then encodes both a `string` and a `char` and prints the results.

```{code-cell} csharp
LeetCipher leet = new LeetCipher();

string output1 = leet.Encode("LEET");
char output2 = leet.Encode('E');

Console.WriteLine($"{output1} {output2}");
```
```{exercise-end}
```




```{exercise-start}
:label: ex:instance-methods:point-print
```
In {numref}`ex:fields:point` we wrote a class called `Point` and a local method called `printPoint` that could print the coordinates of objects of type `Point`.

Rewrite the class `Point` so that `Print` is now an instance method on the `Point` class itself.

Your solution should look something like the following.
```{code-cell}
class Point
{
  // Your code here...

  public void Print ()
  {
    // Your code here...
  }
}
```
When you're done, you should be able to run the following code and get the same result.
```{code-cell} csharp
:tags: [remove-input]
class Point
{
  public int X = 0;
  public int Y = 0;
  public int Z = 0;

  public void Print ()
    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");
}
```
```{code-cell}
Point p1 = new Point() { X=10, Y=20, Z=30 };
Point p2 = new Point() { X=1,  Y=2,  Z=3 };

p1.Print();
p2.Print();
```
```{exercise-end}
```




```{exercise-start}
:label: ex:instance-methods:delta
```
In {numref}`ex:fields:delta` we defined a local function that took an object of type `Point` and an array of points.
It then treated the coordinates of the first `Point` as a delta that should be applied to all points in the array.

Let's now forget about the array but instead implement the idea of altering an object of type `Point` by passing it another object of type `Point` that will serve as the delta.

Start from the code you wrote in {numref}`ex:instance-methods:point-print`.

Your solution should look something like the following.
```{code-cell}
class Point
{
  // ...

  public void Print ()
  {
    // Your code here...
  }
}
```

When you're done, you should be able to run the following code and get the same result.
```{code-cell}
:tags: [remove-input]
class Point
{
  public int X = 0;
  public int Y = 0;
  public int Z = 0;

  public void Print ()
    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");

  public void Add (Point other)
  {
    X += other.X;
    Y += other.Y;
    Z += other.Z;
  }
}
```
```{code-cell}
Point[] points = new Point[] {
  new Point() { X=10, Y=20, Z=30 },
  new Point() { X=100, Y=200, Z=300 },
  new Point() { X=1000, Y=2000, Z=3000 }
};

Point delta = new Point() { X=1, Y=2, Z=3 };

foreach (Point point in points)
{
  point.Add(delta);
  point.Print();
}
```
```{exercise-end}
```




```{exercise-start}
:label: ex:instance-methods:point-this
```
Start from the code you wrote in {numref}`ex:instance-methods:delta`.

Add another instance method to the class `Point` that has the signature `Point AddTo (Point other)`.
The method should treat the object as the delta and then apply itself, via the `Add` method, to the `Point` given as an argument.

In other words, while `Add` adds another point to `this`, the method `AddTo` adds `this` to another `Point`.
In other words, we're letting the object upon which we call the method `AddTo` serve as the delta while we let the object being passed in as an argument serve as the object that is to be changed.

Your solution should look something like the following.
```{code-cell}
class Point
{
  // ...

  public void AddTo (Point other)
  {
    // Your code here...
  }
}
```
When you're done, you should be able to run the following code and get the same result.
```{code-cell}
:tags: [remove-input]
class Point
{
  public int X = 0;
  public int Y = 0;
  public int Z = 0;

  public void Print ()
    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");

  public void Add (Point other)
  {
    X += other.X;
    Y += other.Y;
    Z += other.Z;
  }

  public void AddTo (Point other)
    => other.Add(this);
}
```
```{code-cell}
Point point = new Point() { X=10, Y=20, Z=30 };
Point delta = new Point() { X=1, Y=2, Z=3 };

delta.AddTo(point);
point.Print();
```
```{hint}
:class: dropdown
In this solution you should pass `this` as an argument to the instance method `Add`.
```
```{exercise-end}
```




```{exercise-start}
:label: ex:instance-methods:point-this-array
```
Start from the code you wrote in {numref}`ex:instance-methods:point-this`.

Add an overload of the instance method `AddTo` in the class `Point` with the signature `void AddTo (Point[] points)`.

The method should treat the object as the delta and then apply itself, via the `Add` method, to all the points in the array.
In other words, the two versions of `AddTo` does the same thing but one adds itself to a single point while the other adds itself to multiple points.

In even other words, we're solving the same problem we solved in {numref}`ex:fields:delta` but this time with instance methods.

Your solution should look something like the following.
```{code-cell}
class Point
{
  // Your code here...

  public void AddTo (Point[] points)
  {
    // Your code here...
  }
}
```

When you're done, you should be able to run the following code and get the same result.
```{code-cell}
:tags: [remove-input]
class Point
{
  public int X = 0;
  public int Y = 0;
  public int Z = 0;

  public void Print ()
    => Console.WriteLine($"{{X={X}, Y={Y}, Z={Z}}}");

  public void Add (Point other)
  {
    X += other.X;
    Y += other.Y;
    Z += other.Z;
  }

  public void AddTo (Point[] points)
  {
    foreach (Point point in points)
      point.Add(this);
  }
}
```
```{code-cell}
Point[] points = new Point[] {
  new Point() { X=10, Y=20, Z=30 },
  new Point() { X=100, Y=200, Z=300 },
  new Point() { X=1000, Y=2000, Z=3000 }
};

Point delta = new Point() { X=1, Y=2, Z=3 };
delta.AddTo(points);

foreach (Point point in points)
  point.Print();
```
```{hint}
:class: dropdown
In this solution you should pass `this` as an argument to the instance method `Add`.
```
```{exercise-end}
```



```{exercise}
Draw a UML class diagram of the class `Point` as defined in {numref}`ex:instance-methods:point-this-array`.
Remember to include all fields and operations.
```





%```{exercise-start}
%```
%Start with the classes you wrote in {numref}`ex:first-classes`.
%What does the following code print?
%Why is this the output that we get?
%
%```{code-cell}
%Apple f1 = new Apple();
%Pear f2 = new Pear();
%Console.WriteLine(f1);
%Console.WriteLine(f2);
%```
%```{exercise-end}
%```



%---

%### Substitution ciphers
%Remember the idea of substitution ciphers?
%Let's start with the four overloaded static methods that we defined in {numref}`ex:overloading-substitutions` in the chapter on [overloading](overloading).
%
%UNFORTUNATELY WE HAVE LESS CODE REUSE NOW THAT WE HAVE MOVED TO INSTANCE METHODS. WE'LL GET IT BACK LATER. DONT WORRY.
%WHY DO WE LOOSE THIS ABILITY?
%Because when we want to store the substitutions via the constructor we need to have a single type for it.
%We're not going to be able to get back this code reuse before we get to [generics](generics).
%
%
%```{code-cell} csharp
%class CharSubstitution
%{
%  (char, char)[] substitutions;
%
%  public CharSubstitution ((char, char)[] substitutions)
%    => this.substitutions = substitutions;
%
%  public char Substitute (char input)
%  {
%    foreach ((char, char) sub in substitutions)
%      if (sub.Item1 == input)
%        return sub.Item2;
%    return input;
%  }
%
%  public string Substitute (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += Substitute(c);
%    return output;
%  }
%}
%```
%
%```{code-cell} csharp
%var subs = new (char,char)[] { ('A', '4') };
%CharSubstitution cipher = new CharSubstitution(subs);
%cipher.Substitute('A');
%cipher.Substitute("ABC");
%```
%
%```{code-cell} csharp
%cipher.Substitute("ABC");
%```
%
%```{code-cell} csharp
%class StringSubstitution
%{
%  (char,string)[] substitutions;
%
%  public StringSubstitution ((char,string)[] substitutions)
%    => this.substitutions = substitutions;
%
%  public string Substitute (char input)
%  {
%    foreach ((char,string) sub in substitutions)
%      if (sub.Item1 == input)
%        return sub.Item2;
%    return input.ToString();
%  }
%
%  public string Substitute (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += Substitute(c);
%    return output;
%  }
%}
%```
%
%
%
%
%
%### Caesar substitutions
%
%````{admonition} TODO
%How would we build a Caesar cipher with this method?
%Well, we need to build up a massive array of tuples that describe all the substitutions for a given number of steps.
%Hmm.. sounds like we could use a method for that right?
%Have a look at the code below.
%
%```csharp
%static (char, char)[] MakeCaesarSubstitutions (int steps)
%{
%  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
%  (char, char)[] output = new (char, char)[alphabet.Length * 2];
%  for (int i=0; i<alphabet.Length; i++)
%  {
%    int newIndex = (i + steps) % alphabet.Length;
%    if (newIndex < 0) newIndex += alphabet.Length;
%    output[i*2  ] = (alphabet[i], alphabet[newIndex]);
%    output[i*2+1] = (Char.ToLower(alphabet[i]), Char.ToLower(alphabet[newIndex]));
%  }
%  return output;
%}
%```
%
%With that helper method in place we are able to generate the list of substitution tuples needed to run a Caesar encoding with any number of steps, for both uppercase and lowercase letters.
%We would run it like this:
%
%```csharp
%// Compactly
%Console.WriteLine( SubstituteString("Run!", MakeCaesarSubstitutions(2)) );
%
%// Or more verbosely
%(char,char)[] substitutions = MakeCaesarSubstitutions(2);
%string input = "Run!";
%string output = SubstituteString(input, substitutions);
%Console.WriteLine(output);
%```
%
%```output
%Twp!
%Twp!
%```
%````
%
%

%```{exercise}
%In this chapter we stated that the two classes `CharSubstitution` and `StringSubstitution` cannot be sensibly merged into a single class.
%Why is this?
%Explain using your own words.
%```



