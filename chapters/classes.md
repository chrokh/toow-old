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

Have a look at {numref}`fig:class-vs-objects`.
The two "blobs" whose names are `"garfield"` and `"pelle svanslös"` are objects.
The class of which they are instances is called `Cat`.

Neither the object with the name `"garfield"` nor the object with the name `"pelle svanslös"` are classes.
They are *instances*.
Conversely, the class `Cat` is not an object, it is the type that these two objects share.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:class-vs-objects

Objects are instances (values) of a class.
```

```{hint}
If you don't understand the difference between classes and objects/instances then you don't understand the difference between types and values.
Let me humbly suggest that you go back and re-read the chapters on [values](values) and [data types](data-types).
The difference between classes and objects corresponds to the difference between types and values.
```

To instantiate a class in C# we use the keyword `new` and follow it with the identifier, meaning the name of the class.
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

% TODO:!!! Must discuss default values, initially assigned, definitely assigned, etc somewhere. In some places variables are assigned defaults and in some they are not. This is a very important concept in C#. We can discuss the generalization beyond C#. Are variables assigned default values or not, and what is the default value.


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


### Class members

Remember how we in the chapter on [objects](objects) said that objects mix data and methods?
In a class based object oriented langauge, this is achieved by defining class members.
There are usually two types of class members:
Instance members and static members.

The most commonly used types of class members are [fields](fields), [methods](methods), and [constructors](constructors).
These kinds of members can either be defined as instance members or as static members.

Perhaps you remember, that we've actually already talked about [static methods](static-methods) in an earlier chapter.
A static member is in other words a static member of the class in which it is defined.
We talked about static methods in the context of [static classes](static-classes).
Although, a static method can be defined on non-static classes as well.

[Fields](fields) and [constructors](constructors) we will however talk about in the chapters coming next.

```{caution}
The idea of `static` is, fundamentally, a procedural idea, *not* an object oriented idea.
```

```{seealso}
For a complete list of the kinds of members that we can define on a class, please see [the official documentation](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/members).
```


% "Fields, properties, methods, and events on a class are collectively referred to as class members."
% https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/members




### UML class diagrams

In this book we make heavy use of UML class diagrams.
When reasoning about object oriented design nothing is really quite as efficient as using UML class diagrams.
Even if only informally.

We'll discuss the syntax of UML class diagrams in every chapter where we're covering a concept that's also modelable in UML.

For now, it's enough to know that to depict a class in a UML class diagram, we draw a rectangle with two sections.
See the figure below.
In the top section we write the name of the class.
In the bottom section of the rectangle write the members of the class.

The class `Cat` in the figure below corresponds to a class `Cat` without any members like this:

```{code-cell}
class Cat { }
```

```
|--------------------|     |--------------------|
| <class identifier> |     |         Cat        |
|--------------------|     |--------------------|
|                    |     |                    |
|  <class members>   |     |                    |
|                    |     |                    |
|--------------------|     |--------------------|
```

The syntax is depicted on the left and an example of a class called `Cat` without any members is on the right.


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
What is the difference between a static class and a class?
```

```{exercise}
What are class members?
```

```{exercise}
Create a UML class diagram that depicts two classes.
One class is called `Fruit` and the other `Bowl`.
```

