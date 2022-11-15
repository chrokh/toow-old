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

% TODO: UML class diagrams.
% TODO: Benefits are very similar to partial application when we send in data through the constructor. Our data depends on the state of the object. Being able to store some data in an instance and then use objects of the same type interchangably at runtime. For example instantiating caesar ciphers with multiple different steps, passing them around, and then switching between them.

%- Principle: Encapsulation / Information hiding (coupling, hide what changes)
%    - <https://stackoverflow.com/questions/13913174/what-are-the-differences-between-information-hiding-and-encapsulation>
%- Principle: The state space of a type should equal the state space of whatever domain concept it is modeling.



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

```{hint}
Remember the `static` method `MakeCircle` from the chapter on [access modifiers](access-modifiers)?
The idea of that method is, metaphorically, not far away from the idea of a constructor.
```


### Default constructor

If we don't define a constructor for a class in C# then it's as if that class contains a constructor that takes no parameters and has no method body.
As soon as we define a constructor though, this empty and parameterless constructor is no longer implicitly created.

Remember how we, in the chapter on [fields](fields), mentioned that instance fields in C# are automatically intialized to their default values unless we initialize them ourselves in the class or upon construction using an [object initializer](object-initializers)?

Let's get back to our good old trusted `Rectangle` example.

```{code-cell}
class Rectangle
{
  public int Width = 0; // Default value.
  public int Height = 0; // Default value.
}
```

Whenever we create an instance of the class `Rectangle`, this empty ("bodiless") and parameterless "default" constructor is run.
```{code-cell}
Rectangle r1 = new Rectangle(); // This causes the constructor to be called.
```

Since the empty constructor isn't changing the value of any of the instance fields, the instantiated rectangle will contain whatever values we set as defaults.
As can be observed below.

```{code-cell}
Console.WriteLine(r1.Width);
```


### Parameterless constructor

We can replace the implicitly generated empty constructor by defining our own empty constructor.
In this constructor we can do anything we want to do immediately following the creating of an object of the class in which we are defining it.

Previously we've initialized the `Width` and `Height` fields in the same place as where we've declared them.
However, we could also initially assign their values through the constructor.
It would look like this:

```{code-cell}
class Rectangle
{
  public int Width;  // No default needed.
  public int Height; // No default needed.

  // This is the constructor.
  public Rectangle ()
  {
    this.Width  = 2;  // Set default
    this.Height = 1;  // Set default
  }
}
```

Notice how the compiler no longer warns us that `Width` and `Height` will be automatically initialized to the default values for their respective types as it did when discussing auto-initialization in the chapter on [fields](fields-default).
The compiler understands that **all** instances of type `Rectangle` will have values assigned to the fields `Width` and `Height` after construction.

How can it know that the fields will be assigned upon construction?
Because (1) a constructor is always run when an object is created, (2) we are assigning values in the only constructor that exists, and (3) there no longer exists an empty implicit constructor that doesn't assign values.

If we now instantiate a `Rectangle` the constructor will be run and our object will get values assigned to its fields.

```{code-cell}
Rectangle rect = new Rectangle();
Console.WriteLine(rect.Width + "x" + rect.Height);
```


### Constructor parameters

Sometimes it's easy to come up with a default value for an instance field and sometimes it's not.
What if we don't want to specify a default value for a field in our class?
Worse, what if there is *no default value that makes sense in our domain*?

Think about a type modeling employees for example.
If we want to model employees then we might say that it makes no sense to have an employee that doesn't have a name.
If that is so then we should make it impossible to construct objects of type `Employee` that have no name.

Remember the maxim of [making impossible states impossible](types-over-tests).
If it doesn't make sense in the domain, then we shouldn't allow it in our types.

```{important}
By declaring a constructor with some parameters we make it **impossible to instantiate** the class **without passing arguments for those parameters.**
```

Said differently, a class with no empty constructor **guarantees** that all objects of the type that the class defines were originally created with arguments passed for whatever parameters one of the other constructors required.

Remember what we said about the default constructor?
An empty, parameterless constructor isn't implicitly added to your class if you define a constructor.
However, to construct an instance of a class, we must run a constructor.
So, if there is only one constructor in a class, and that constructor takes some parameters, then it is impossible to create an instance of that class without also providing arguments for those parameters.

By using constructors we can force anyone who wants to create an instance of the class to have to specify the width and height of the rectangle.
It would look like this.

```{code-cell}
class Rectangle
{
  private int width;
  private int height;

  // This is the constructor.
  public Rectangle (int width, int height)
  {
    this.width  = width;  // Assigns input argument to field.
    this.height = height; // Assigns input argument to field.
  }

  public void Print ()
    => Console.WriteLine(this.width + "x" + this.height);
}
```

Remember, now that we've defined a constructor ourselves, the C# compiler no longer automatically creates an empty constructor for us.
The *only* way to construct a `Rectangle` is now via the constructor that has two parameters.

In the code above, we've declared a constructor with two parameters of type `int`.
The two parameters are named `x` and `y`.
In the body of the constructor, meaning the implementation of the constructor, we take these two arguments and assign them to our instance fields called `X` and `Y`.

```{note}
Remember the keyword `this` that we've talked about [earlier](keyword:this)?
In the case of an instance method, it is a reference to the object upon which the instance method was called.
In the case of a constructor, it is a reference to the object that was just created.
```


### Invocation

How do we run the constructor?
When do we pass these arguments?
Well, we pass the arguments when we instantiate the class.

```{code-cell}
Rectangle r2 = new Rectangle(10, 20);
Rectangle r3 = new Rectangle(4, 5);

r2.Print();
r3.Print();
```

Notice how it is no longer possible to instantiate a `Rectangle` without also passing arguments to the constructor.
If we try to do that, then we get a compiler error.

```{code-cell}
:tags: [raises-exception]
Rectangle r4 = new Rectangle(); // Will not compile.
```

We've removed the empty constructor and there's now only a single constructor that has two parameters.
A constructor is a method, and to call the method we must supply arguments for all its parameters.

This means that we can guarantee that anytime we have an instance of type `Rectangle` it was instantiated with some intial values that whoever instantiated the class chose.

However, had we made the [access modifiers](access-modifiers) of the instance fields `public` then we could *not* guarantee that any instance of type `Rectangle` will at all times have a size that "makes sense" in our domain since the fields would then be [mutable](mutability).

```{danger}
Be weary of mutating fields and properties.
Follow the principle of information hiding.
```

```{important}
To achieve information hiding we must also make our fields `private`.
By never exposing our encapsulated data we can guarantee that all objects of some type always have data that is "valid" in our domain.
This is *tremendously* valuable.
```

Notice that we, as discussed in the chapter on [access modifiers](access-modifiers), loose the ability to use the object initializer syntax when switching to `private` fields.
However, when switching to constructors we get way more in return.
We gain a higher level of correctness and expressivity for our types.
We can now express classes whose instances are always valid instances according to our specification of that type.



%### `this` keyword
%
%% TODO: REMOVE ALL THIS??
%
%MOST OF THIS IS ALREADY EXPLAINED IN THE CHAPTER ON INSTANCE METHODS.
%% MUST HOWEVER SHOW COMPILER WARNING THAT WE GET WHEN WE ASSIGN WIDTH TO WIDTH:
%%The C# compiler will assume that we are referring to the local variable which means that we will be assigning the value of a variable to itself.
%%Which of course is pointless and not what we meant to do.
%%Have a look at the compiler warnings that we get below:
%
%So what about the `this` keyword that's being used in the example above.
%What is it and what does it do?
%
%When the code in the body of the constructor is being executed, then that code is being executed in the context of the object that was just created.
%The keyword `this` refers to the object that is being constructed.
%
%In that particular example we don't actually need the keyword `this`.
%We could just as well, simply, have written `X = x` and `Y = y`.
%This is because there is no ambiguity.
%What do we mean when we say that there is no ambiguity?
%We mean that the variables `X` and `x`, for example, are both only defined in one place that's in scope in the constructor.
%
%If however we had named the constructor parameters `X` and `Y`, meaning in uppercase then there would be ambiguity.
%Think about it.
%What are we assigning to what if we would say `X = X`?
%The C# compiler will assume that we are referring to the local variable which means that we will be assigning the value of a variable to itself.
%Which of course is pointless and not what we meant to do.
%Have a look at the compiler warnings that we get below:
%
%``{code-cell}
%:tags: [raises-exception]
%class Point
%{
%  public int X = 0;
%  public int Y = 0;
%
%  public Point (int X, int Y)
%  {
%    X = X;
%    Y = Y;
%  }
%}
%``
%



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



### Overloading

Constructors are [overloadable](overloading).
This is known as "constructor overloading" and means that we can define multiple constructors that differ in their parameter lists and have different implementations.
This is very useful since it, for example, allows us to define types that can be instantiated in very different ways.

In the case of our `Rectangle` class for example we might want another constructor with a single parameter called `size` instead of two called `width` and `height`.
As you might expect, the constructor with a single parameter creates a square since it sets both `Width` and `Height` fields to the `size` parameter.
It would look like this:

```{code-cell}
class Rectangle
{
  private int width;
  private int height;

  // One of two constructors.
  public Rectangle (int size)
  {
    this.width = size;
    this.height = size;
  }

  // One of two constructors.
  public Rectangle (int width, int height)
  {
    this.width  = width;
    this.height = height;
  }

  public void Print ()
    => Console.WriteLine(this.width + "x" + this.height);
}
```

Whichever constructor is run depends on what arguments when pass when contructing the object.

```{code-cell}
Rectangle square = new Rectangle(3);
Rectangle rect = new Rectangle(10, 5);

square.Print();
rect.Print();
```

%Consider for example the idea of a weekday.
%If we have a type that models weekdays called `Weekday` then we can trivially think of a number of different ways to instantiate it.
%To instantiate an object that represents Tuesday we might for example want to support the following different syntaxes.
%
%``{code-cell}
%:tags: [remove-input]
%class Weekday
%{
%  public Weekday (string day) {}
%  public Weekday (int day) {}
%}
%``
%
%``{code-cell}
%new Weekday (2);            // int
%new Weekday ('T');          // char
%new Weekday ("Tuesday");    // string
%``
%
%Notice how we're instantiating the same type, namely `Weekday`, in all three cases above.
%However, notice also how the type of the argument that we pass to the constructor varies.
%There are essentially three constructors.
%
%``{code-cell}
%class Weekday
%{
%  public Weekday (string day) { /* ... */ }
%  public Weekday (int day) { /* ... */ }
%  public Weekday (char day) { /* ... */ }
%}
%``



### Constructor chaining

When we've got multiple constructors in a class we can also do something called "constructor chaining".
A constructor can call another constructor.
This is very helpful in [eliminating duplication](dont-repeat-yourself).

Remember how we've talked about how the `this` keyword, in the constructor body, refers to the object that we've just created.
There is however one more use for the keyword in the context of constructors.
Namely, constructor chaining.

Constructor chaining essentially means calling another constructor from a constructor before we run the body of our constructor.
We do this by using the `this` keyword, *not* in the body of the constructor, but directly after the method signature.
The `this` keyword in that context acts like a call to a constructor.
We say "a" and not "the" since what constructor is called depends on what argument list we provide.

In the example below, we're implementing the single parameter constructor in terms of the multi parameter constructor.
In other words, instead of assigning width and height in our single parameter constructor, we simply take the value that was passed to us and sends it on to the other constructor which will do the assigning.

This essentially the same idea as when we implemented one overload of the instance method `Scale` in the chapter on [instance methods](instance-methods) in terms of another overload.
While the elimination of duplication might seem trivial in both these examples you can hopefully see how exactly this technique can be used to eliminate much more elaborate duplication in the real world.

```{code-cell}
class Rectangle
{
  private int width;
  private int height;

  // One of two constructors.
  public Rectangle (int size)
    : this(size, size) { }

  // One of two constructors.
  public Rectangle (int width, int height)
  {
    this.width  = width;
    this.height = height;
  }

  public void Print ()
    => Console.WriteLine(this.width + "x" + this.height);
}
```


### Private constructors

Perhaps you might have noticed that we marked our constructors in the examples above as `public`.
If a constructor can be `public`, can it then also be `private`?
Yes, it can.

But that makes no sense you might say.
How could I possibly construct an object if its constructor is `private`.
Two ways:

First, since constructors support overloading we can make some constructors `private` and some `public`.
Code outside our class can only access our `public` constructors, but any of our constructors can access all the `private` constructors.

Second, you might recall from the chapter on [access modifiers](access-modifiers) that `private` doesn't mean private to that object but private to that *class*.
This means that we can have a `public static` method that calls our `private` constructor and returns the object created.

Why we would do this?
Remember the idea of [making impossible states impossible](types-over-tests) that we keep nagging about?
Remember the idea of [failing fast](fail-fast)?
That we should prefer compile-time over run-time errors?
Have a look at the class below.
It gives us a way of guaranteeing that all instances of the type `Vowel` at all times actually represent vowels.

% TODO: Is this thread ever picked up again in other chapters? We don't actually talk about Singleton pattern.

%TODO: Should static factory methods be its own subsection in the examples?

(constructors:private)=
```{code-cell}
class Vowel
{
  private char letter;

  // Private constructor
  private Vowel (char letter, bool upper)
    => this.letter = upper
      ? Char.ToUpper(letter)
      : Char.ToLower(letter);

  // Public static factory methods
  public static Vowel MakeA(bool upper) => new Vowel('A', upper);
  public static Vowel MakeE(bool upper) => new Vowel('E', upper);
  public static Vowel MakeI(bool upper) => new Vowel('I', upper);
  public static Vowel MakeO(bool upper) => new Vowel('O', upper);
  public static Vowel MakeU(bool upper) => new Vowel('U', upper);
  public static Vowel MakeY(bool upper) => new Vowel('Y', upper);

  public char ToChar() => letter;
}
```

We can now create perfectly valid vowels with our static factory methods.

```{code-cell}
Vowel vowel1 = Vowel.MakeA(true);
Vowel vowel2 = Vowel.MakeE(false);

Console.WriteLine(vowel1.ToChar());
Console.WriteLine(vowel2.ToChar());
```

We cannot however invoke the `private` constructor in order to create an instance of type `Vowel` that does not actually contain a vowel `char`.
If we try to do that then we get a compiler error.

```{code-cell}
:tags: [raises-exception]
Vowel nope = new Vowel('k');
```



### Order

Let's quickly recap the order in which things are run.
First, field initializers are run, then any chained constructor, and then finally the body of the constructor.




## Examples


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

We know that we should prefer compile-time errors over run-time errors, but sometimes a compile-time error simply isn't a reasonable option.
Under the maxim of [failing fast](fail-fast) it is in these cases better that we throw an exception right in the constructor rather than allowing an, in terms of our domain, "invalid" object to be created.
Letting the invalid object propagate in our system would allegedly only delay the error (in terms of time and space) and thus make it harder to recover from when it eventually occurrs.



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

```{exercise}
Write your own class and constructors that demonstrate in which order the following three are run:
field initializers, a chained constructor, and the constructor body.
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


```{exercise-start}
```
In {numref}`ex:instance-methods:delta` you wrote a class called `Point` that modeled a point in three-dimensional space.
Rewrite the class so that all instance fields are `private` and so that the fields are set via a constructor.

When you're done, you should be able to run the following code and get the same result.
```{code-cell}
:tags: [remove-input]
class Point
{
  private int X = 0;
  private int Y = 0;
  private int Z = 0;

  public Point (int x, int y, int z)
  {
    X = x;
    Y = y;
    Z = z;
  }

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
Point point = new Point(10, 20, 30);

Point delta1 = new Point(1, 2, 3);
Point delta2 = new Point(100, 100, 100);

point.Add(delta1);
point.Add(delta2);

point.Print();
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


```{exercise-start}
:label: ex:single-format-phone-numbers
```
Write a class that can be used to represent one format of phone numbers for your country.
Rember the maxim [types over tests](types-over-tests).
Illegal states should not be representable.
Also remember to [fail fast](fail-fast) and prefer compile-time over run-time errors.
```{code-cell}
:tags: [remove-input]
class PhoneNo
{
  string no;

  public PhoneNo (int d1, int d2, int d3, int d4, int d5, int d6, int d7, int d8, int d9, int d10)
  => no = $"{d1}{d2}{d3}-{d4}{d5}{d6} {d7}{d8} {d9}{d10}";

  public void Print()
    => Console.WriteLine(no);
}
```
Hint:
```{code-cell}
:tags: [hide-input, hide-output]
PhoneNo no = new PhoneNo(0,7,0,1,2,3,4,5,6,7);
no.Print();
```
```{exercise-end}
```


```{exercise-start}
```
In {numref}`ex:single-format-phone-numbers` you wrote a class that we can use to instantiate phone numbers without risking run-time errors.
Let's now do the same thing for email.
Email is a much trickier format so it is understandable if you allow yourself to throw some run-time errors from the constructors.
But try to capture as many errors as you can at compile-time, meaning on the type-level.

Hint:
```{code-cell}
:tags: [remove-input]
class Email
{
  string user, domain;
  string suffix = "com";
  private Email (string user, string domain, string suffix)
  {
    // Run-time error checking missing!
    this.user = user;
    this.domain = domain;
    this.suffix = suffix;
  }

  public static Email MakeDotCom (string user, string domain)
    => new Email(user, domain, "com");

  public void Print()
    => Console.WriteLine($"{user}@{domain}.{suffix}");
}
```
```{code-cell}
:tags: [hide-input, hide-output]
Email email = Email.MakeDotCom("user", "example");
email.Print();
```
```{exercise-end}
```


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


%### Robber's cipher vowel
%
%In the chapter on [fields](fields) we gave an example where we assigned the consonant `B` to a field that was supposed to contain a vowel.
%Let's add a constructor to that class so that we can ensure that every time we have an instance of the class `RobbersCipherVowel` we know that it contains an actual vowel.
%
%```{code-cell} csharp
%class RobbersCipherVowel
%{
%  public char Vowel;
%  public RobbersCipherVowel (char vowel)
%  {
%    Vowel = vowel switch {
%      'A' or 'a' or 'E' or 'e' or 'I' or 'i' or 'O' or 'o' or 'U' or 'u'
%        => vowel,
%      _ => 'o'
%    };
%  }
%}
%```
%
%Pretty neat right?
%What happens if we now try to create an instance of `RobbersCipherVowel` by passing a consonant (or any other non-vowel character for that matter) to the constructor?
%Well, the constructor will simply ignore the character that we sent it and instead just use the character `'o'` that we chose as the default.
%
%```{code-cell} csharp
%RobbersCipherVowel certainlyVowel = new RobbersCipherVowel('K');
%Console.WriteLine(certainlyVowel.Vowel);
%```
%
%%Arguably, it would make sense to use an [enum](enums) for input instead.
%%We're not going to write that code since it's given to you as {numref}`ex:constructors:vowel-enums`.
%%However, we're going to talk a lot more about the idea of using types that prevent your data types from ever entering illegal states in the chapter on [types over tests](types-over-tests).
%
%But wait a minute!
%What if someone just changes the vowel *after* the object has been created?
%
%```{code-cell} csharp
%certainlyVowel.Vowel = 'K';
%Console.WriteLine(certainlyVowel.Vowel);
%```
%
%That's definitly not a vowel!
%This is a problem caused by allowing mutation and not actually embracing encapsulation.
%We're actually not encapsulating the vowel.
%We're not actually hiding it from the outside world.
%When we say that it is `public` we've exposed it.
%And since it's a field, that means that anyone can change it.
%
%To encapsulate the vowel we need to learn about [instance methods](instance-methods) or [properties](properties).
