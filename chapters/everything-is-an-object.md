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

# Everything is an object

Delving into the realm of object oriented programming, one phrase you may encounter is:

```{epigraph}
Everything is an object.
```

The degree to which this statement holds true is often used by enthusiasts to gauge the 'purity' of an object oriented language. This 'purity' does *not* refer to [referential transparency](referential-transparency) but denotes the extent to which the language embodies the concept of an object. Is *everything* in the language an object?

For C#, a more accurate phrasing might be:

```{epigraph}
All values that can be constructed, and referenced using variables are or can be converted into objects.
```

This implies that in C#, almost every construct that holds a value, is, in essence, an object.

In C#, this idea stems from the fact that almost all types either, directly or indirectly, implicitly derive from the universal base class `Object` (whose alias is `object`) or can be converted to an object. Let's illustrate the first case with an example:

```{code-cell}
class Cat {}

Object myObject = new Cat(); // An instance of a class can be upcast to 'Object'.
```

Objects of an arbitrary class that we define ourselves, like the class `Cat` above can be [upcast](upcasting) into the type `Object`.
Generally, any instance of any class can be upcast to 'Object'.

This is because, in C#, the universal baseclass of all classes is the class `Object`. Practically, think of it like this: whenever you don't specify that a class inherits from some other class, then that class implicitly inherits from `Object`.

C# further extends this idea of "object-ness" to built-in value types like `int`, `bool`, and others, which can also be treated as objects. This is facilitated by a mechanism known as [boxing](boxing), where value types are wrapped inside an object, allowing them to participate in object oriented behaviors.

```{code-cell}
int x = 7;

Object o = x; // Value types can be implicitly converted to 'Object'.
```

So while you strictly wouldn't say that simple types *are* objects we could say that they can be implicitly converted into objects.
Which for all intents and purposes means that we can think of them as being objects.

```{note}
In some languages, like Smalltalk or Ruby, even classes themselves are objects. In C#, the instances of a class are objects, not the class itself. If we, in regards to C#, say that a class is an object then we mean it in the sense of a cat being an animal. Meaning that the class is a subtype of `Object`.
```

This makes C# an almost purely object oriented language, with the caveat being a few non-object types, namely: pointers, interfaces, and open type parameters.

Pointers is an archaic feature borrowed from procedural languages and are not relevant to our object oriented perspective.

Although [Interfaces](interfaces) are not objects themselves, any type that implements an interface by definition is an `Object`, since only classes can implement interfaces in C#. As a result, an instance of a class that implements an interface can be treated as an object of that interface type.

Open type parameters are central to [generic](generics) programming in C# which we will talk about later. These are placeholder types replaced by concrete types (which are objects) during code execution.

So while C# indeed is a multi-paradigm language, incorporating principles of procedural, object oriented, and functional programming, it nevertheless strongly leans towards the object oriented side, treating almost all its types as objects.

%In the words of Eric Lippert, we can summarize this idea as: "Every non-pointer type is convertible to object." This statement captures the essence of how C# interweaves the object oriented programming paradigm into its core design, ultimately leading to a language where almost everything is indeed an object.
%
%“Every non-pointer type is convertible to object.”
%—Eric Lippert

%So, it would be more correct to follow the assertion of Eric Lippert who states that:
%"Every non-pointer type is *convertible* to object."
%
%```{epigraph}
%"Every non-pointer type is *convertible* to object."
%
%-- [Eric Lippert](https://docs.microsoft.com/en-gb/archive/blogs/ericlippert/not-everything-derives-from-object)
%```

