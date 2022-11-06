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

% TODO: IMPORTANT!!!!!!!: I should make chapters much smaller. Classes should be a chapter of which e.g. type testing should be a subsection that has its own division into Motiviation/Definition/Examples. This will make it MUCH easier to write!

% TODO:!!! Must discuss default values, initially assigned, definitely assigned, etc somewhere. In some places variables are assigned defaults and in some they are not. This is a very important concept in C#. We can discuss the generalization beyond C#. Are variables assigned default values or not, and what is the default value.

# Classes

## Motivation

Where do objects come from?
We've said that in object oriented programming we compose simple objects to solve complex problems.
Fair enough.
But how do we create these objects?
Where do they come from?

In general, there are two types of object oriented languages:

1. Class based object oriented languages.
2. Prototype based object oriented languages.

In the former, objects are created by instantiating classes.
In the latter objects are created by cloning prototypes.

```{note}
Since C# is a class based object oriented language, we won't discuss the idea of prototypes at length.
However, you can think of it this way.
In a prototype based object oriented language you define an object that serves as the prototypical object of some type.
That object can then be cloned in order to create new instances of the same type.
```


## Definition

A class defines a type.
So, if we define a class then we're also defining a type with the same name as that class.

Values of the type that's defined by a class are either called "objects"  or "instances" of that class.
The words "object" and "instance" mean the same thing.

From a set theory perspective, a class, just like a type, defines a set.
The members of the set are the objects or instances of that class.


### Declaration

To declare a class in C# we simply use the keyword `class` and follow it with the identifier name that we want to use to refer to the class and hence to the type.

If we, for example, wanted to define a class that models cats, we could say like this:

```{code-cell}
class Cat
{
  // Class members are defined here...
}
```

Class identifier names in C# conventionally start with a capital letter.
In fact, type names in most programming languages, usually start with a capital letter.
This is why we have named the class above `Cat` with an uppercase "C" rather than `cat` with a lowercase "c".

Within the opening (`{`) and closing (`}`) curly brackets we would define the members of the class.
We'll talk more about what members are in a moment.

### Instantiation

To understand the difference between classes and objects think of the difference between the notion of a number and that of any particular number.
The idea of a number refers to the set of all numbers.
But when talking about any particular number we're talking about a particular member of the set.

The particular number `3` is not the same as the idea of numbers.
Similarly, the idea of numbers is not the same as any particular number.

We might for example define a class called `Nat` which we want to use to model natural numbers.
Meaning whole numbers larger than zero.
Any particular instance of the class `Nat` then corresponds to any particular natural number, such as `3`.

%Have a look at {numref}`fig:class-vs-objects`.
If we've got objects stored in variables named `"garfield"`, `"simba"`, `"bagheera"`,  and `"pelle svanslös"` then the class of which they are instances might be called `Cat`.
Neither one of the objects are classes.
Stated differently, neither one of these specific cats are a generic representation of the notion of cat:ness.
They are *not* the *idea* of cat.
They are however *instances* of the idea of a cat.
They are let's call it embodiments of the idea of a cat.
They are models of actual cats, not of the idea of a cat.
Conversely, the class `Cat` is not an object, it is the type that these two objects share.

% TODO: Draw image of how multiple objects can be derived from a single class.
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:class-vs-objects
%
%Objects are instances (values) of a class.
%``

```{hint}
If you don't understand the difference between classes and objects/instances then you don't understand the difference between types and values.
Let me humbly suggest that you go back and re-read the chapters on [values](values) and [data types](data-types).
The difference between classes and objects corresponds to the difference between types and values.
```

To instantiate a class in C# we use the `new` operator and follow it with the identifier, meaning the name of the class.
So if we have a class called `Cat` then we would create instances of the `Cat` class by saying:

```{code-cell}
new Cat();  // Creates an object (i.e. a value) of type Cat.
```

The opening (`(`) and closing (`)`) parentheses give us a hint that we're doing something that resembles calling a method.
Indeed, the method that we're calling is known as a [constructor](constructors) of the class, and the two parentheses delimit the argument list of that constructor.
A constructor return an instance of the class in which it is defined.
We'll talk more about constructors in its own chapter.

Since the class also defines a type, we can declare a variable to be of this type and assign it a value that's an instance of the class.

```{code-cell}
Cat cat1 = new Cat();
Cat cat2 = new Cat();
```

Since defining a class also means that we define a type, we can of course also declare a variable of that type without assigning it an instance.
We would say that such a variable is an object reference that doesn't yet reference an object.

```{code-cell}
Cat cat3;
```



### Class members

Remember how we in the chapter on [objects](objects) said that objects mix data and methods?
In a class based object oriented langauge, this is achieved by defining class members.
There are usually two kinds of class members:
*Instance* members and *static* members.

The most commonly used kinds of class members are [fields](fields), [methods](methods), and [constructors](constructors).
These kinds of members can either be defined as instance members or as static members.

Perhaps you remember, that we've actually already talked about [static methods](static-methods) in an earlier chapter.
A static member is in other words a static member of the class in which it is defined.
We talked about static methods in the context of [static classes](static-classes).
Static classes are classes that *only* can contain static members.
Non-static classes (which we usually simply call classes) however can contain both static and non-static members.
So a static method can be defined on non-static classes as well.

[Fields](fields) and [constructors](constructors) we will talk about in the chapters coming next.

```{caution}
The idea of `static` is, fundamentally, a procedural idea, *not* an object oriented idea.
A static class can be thought of as a namespace, and a static method as a namespaced method.
Nothing more fancy going on there.
```

```{seealso}
For a complete list of the kinds of members that we can define on a class, please see [the official documentation](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/members).
```

% "Fields, properties, methods, and events on a class are collectively referred to as class members."
% https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/members




(classes:uml)=
### UML class diagrams

In this book we make heavy use of UML class diagrams.
When reasoning about object oriented design nothing is really quite as efficient as using UML class diagrams.
Even if only informally.
Having a good understanding of UML class diagram notation is essential if we are to be able to eventually understand object oriented [design patterns](design-patterns).

We'll discuss the syntax of UML class diagrams in every chapter where we're covering a concept that's also possible to model using UML class diagram syntax.

For now, it's enough to know that to depict a class in a UML class diagram, we draw a rectangle with three sections.
See the figure below.

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


In the smaller top section we write the name of the class.
In the middle section we write the attributes of the class.
In the bottom section we write the operations of the class.
Attributes are essentially instance variables (which in C# means that they are either instance [fields](fields) or instance [properties](properties)).
Operations on the other hand are essentially [instance methods](instance-methods).
We'll talk about these more in their respective chapters.
The attributes and members of a class are together referred to as the "members" of the class.

Consider for example the two classes `Apple` and `Pear` as defined below.

```{code-cell}
class Apple { }
class Pear { }
```

To depict these classes using UML class diagram notation we would draw like this:

```
┌─────────────────────┐   ┌────────────────────┐
│        Apple        │   │        Pear        │
├─────────────────────┤   ├────────────────────┤
│                     │   │                    │
│                     │   │                    │
├─────────────────────┤   ├────────────────────┤
│                     │   │                    │
│                     │   │                    │
└─────────────────────┘   └────────────────────┘
```

UML class diagrams are often, just like with math, used with a tad of informality with the purpose of not bogging down the user with too many details.
Consequently you will often find that a class is depicted without the line between attributes and operations.
See the class `Apple` in the figure below for an example.

If the members are not relevant for the sake of the argument that's trying to be made, you'll sometimes even find that they're even omitted altogether.
See the class `Pear` in the figure below for an example.

```
┌─────────────────────┐   ┌────────────────────┐
│        Apple        │   │                    │
├─────────────────────┤   │                    │
│                     │   │        Pear        │
│                     │   │                    │
│                     │   │                    │
└─────────────────────┘   └────────────────────┘
```

Above: Two models of classes using a more informal UML class diagram syntax.




### Equality

It's possible to instantiate an infinite number of objects from a class.
Whether all these objects are structurally different is a different question.
But, any time we create an object from a class it's a new object.
We cannot instantiate two objects that will be equal.

Remember the [reference and value semantics](value-and-reference-semantics) that we talked about in a previous chapter?
Classes in C#, define *reference types*.
[Structure types](structure-types) (which we'll talk about later) define value types.

Since classes have reference semantics that means that two different instances of a class are considered different objects, and thus inequivalent, even if they are structurally equivalent.

```{code-cell}
Console.WriteLine(cat1 == cat2);
```

However, if we take one of the objects and assign it to the other variable, then suddenly both variables are equal.
Why?
Because they both contain the same object.
We don't mean "the same" in the sense that they are structurally equivalent, we mean that both variables point to, literally, the same object.

```{code-cell}
Cat cat4 = cat1;
Console.WriteLine(cat4 == cat1);
```

Think of it as if both variables are pointing to the same piece of memory in the machine.
Remember how we, in the chapter on [value and reference semantics](value-and-reference-semantics), discussed how weird it would be if numbers followed reference semantics.
Two instances of the number `3` would not be considered equal if they were not also pointing to the same object in memory.
Reference semantics are quite unintuitive when it comes to some types, which is why the simple types are value types.

For more complex types however, the reference semantics is slightly more intuitive.
Two cats are only the same cat if they actually are the same cat.
Once you've constructed a cat, there's only a single solitary instance of that cat.
Any other new cat that you construct could not possibly be the same cat.

Think about real life.
If two identical twin kittens are born then it doesn't matter how "identical" they are.
They are fundamentally not the same kitten.

% TODO: Insert image of kittens?

```{seealso}
Of course, it's possible to make define your own class that behaves almost like a reference type by [overriding](overriding) some key methods.
But that's a discussion for later.
```


### Assignment
% TODO: What's the title here?
Of course, when we assign an object to a variable, the run-time type of the object must be either equal to the compile-time type of the variable or a subtype of it.
We've talked about this general idea when we discussed [run-time and compile-time types](run-time-and-compile-time-types).
The object must either be of the same type as that of the variable or of, what we call, a "substitutable" type.

[Subtyping](subtype-polymorphism) is something we'll discuss in a later chapter.
So let's stick to equal types for the moment.
This means that we cannot assign an instance of type `Dog` to a variable of type `Cat` if these two types are not in a subtyping relationship.
This is essentially no different from how we cannot assign a value of type `string` to a variable of type `int`.

```{code-cell}
:tags: [raises-exception]
class Cat { }
class Dog { }

Cat cat = new Dog();
```



(type-testing-objects)=
### Type testing

We've talked about object equality, let's now talk about type equality.
Remember the methods `GetType` and `typeof` from the chapter on [type testing](type-testing)?
These methods work on classes and objects just as well as they work on other types and other values.

Let's define two new classes.
One that models apples and another one that models pears.

```{code-cell}
class Apple { }
class Pear { }
```

You can extract the [compile-time type](run-time-and-compile-time-types) from the class name by using the `typeof` method.

% TODO: For these manual examples 
```csharp
Type t1 = typeof(Apple);
Type t2 = typeof(Pear);

Console.WriteLine(t1);
Console.WriteLine(t2);
```

```
Apple
Pear
```

If you've defined the classes in a namespace, such as e.g. `System` then the program would instead print the name of your namespace followed by a dot and then the name of your class.

```
System.Apple
System.Pear
```

Of course, we can then perform type testing to, at run-time, check whether two types are the same or not.

```{code-cell}
Console.WriteLine(typeof(Apple) == typeof(Apple));
Console.WriteLine(typeof(Pear)  == typeof(Pear));
Console.WriteLine(typeof(Apple) == typeof(Pear));
```

Ok, so that's the compile-time type.
But what about the [run-time type](run-time-and-compile-time-types)?
Same thing as in the chapter on [type testing](type-testing).
You can extract the run-time type from an object constructed from a class by using the [instance method](instance-methods) `GetType()`.
We have still not talked about instance methods, but now we're getting very, very close.

```
Apple apple = new Apple();
Type t3 = apple.GetType();
Console.WriteLine(t3);
```

```
Apple
```

So then we can of course check if the run-time type of an object corresponds to some compile-time type.

```{code-cell}
Apple apple = new Apple();
Console.WriteLine(apple.GetType() == typeof(Apple));
Console.WriteLine(apple.GetType() == typeof(Pear));
```

As we saw in the chapter on [type testing](type-testing), we can also use the more compact pattern `is` to achieve the same thing.

```{code-cell}
:tags: [remove-stderr]
Console.WriteLine(apple is Apple);
Console.WriteLine(apple is Pear);
```






%TODO: What to keep from the below?
%## Examples

%- Equivalence (i.e. two structurally equivalent objects are not necessarily the same).
%- Public instance variables (objects can hold state).
%- UML class diagrams (start early and introduce piece by piece
  % - https://www.omg.org/spec/UML/2.5.1/PDF
  % Fig 11.22 (p. 198) for constructors.
%- Usually nouns. Methods are usually verbs.
%- Members
%  - https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/
%  - Make an informal distinction between which of these concepts are object oriented and which are not.
%
%- TODO: Documentation comments.





(throwing-exceptions)=
### Exceptions

Let's talk about one more thing before we move on.
Remember how our programs throw an [exception](exceptions) if, for example, we try to access an index that's outside the bounds of an [array](array)?

Well, we can also throw exceptions ourselves.
To throw an exception, in C#, we simply type `throw` and then instantiate an exception class.

What are some available exception classes in .NET?
To find that out we have to resort to the [documentation](https://learn.microsoft.com/en-us/dotnet/api/system.exception?view=net-7.0).

One exception that we use extensively in this book, is `ArgumentException`.
Try instantiating and throwing an exception and see what happens.

```{code-cell}
:tags: [raises-exception]
throw new ArgumentException();
```

We'll talk about how to define our own [custom exceptions](custom-exceptions) in a later chapter.



## Exercises

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

