# Everything is an object

When trying to learn more about object oriented programming you may have come across the following phrase:

```{epigraph}
Everything is an object.
```

This is what we referred to when we, earlier in this chapter, called some object oriented languages "pure".

When saying that a language such as Smalltalk is a "purely" object oriented language we don't mean pure in the sense of [referential transparency](purity).
We mean "pure" in the sense that, in the language, everything (or almost everything) is an object.

We tend to use the word "everything" when talking about how purely object oriented a language is.
However, it would be more accurate to say something like "all values that you can construct and reference using variables".

We haven't yet talked about [inheritance](inheritance) and [interfaces](interfaces) but another way of saying this is that "all types derive from `Object`".
However, this is also only almost true in C#.
C# is not a purely object object oriented language in the sense that all types derive from `Object`.

When discussing [paradigms](paradigms) we established that C#, like many other contemporary programming languages, is a multi-paradigm language.
C# contains ideas from procedural, object oriented, as well as functional programming.

In Java, one problem is, the types that in C# are called built-in value types, or [simple types](simple-types).
In Java these are known as primitive types and they are not objects, but in C# they actually are.
So if simple types are objects, then these are not the problem.

What are the non-object types in C#?
The non-object types in C# are:

1. Pointers
2. Interfaces
3. Open type parameters

You could argue that pointers are an archaic remnant of the procedural days.
As such, we won't talk about them here.

Interfaces however are key to object oriented programming since they (as well as inheritance) enable what is known as [subtype polymorphism](subtype-polymorphism).
We'll talk much more about this later.
Suffice to say however that while interfaces themselves are not objects, any object that implements an interface must (tautologically) be an object because only objects can implement interfaces.

The same line of reasoning follows with open type parameters.
Any open type parameter will eventually be replaced by a concrete type that is an object.
Open type parameters will be discussed in much more detail when we talk about [generic programming](generics).

% TODO: Use proper reference.
So, it would be more correct to follow the assertion of Eric Lippert who states that:
"Every non-pointer type is *convertible* to object."

```{epigraph}
"Every non-pointer type is *convertible* to object."

-- [Eric Lippert](https://docs.microsoft.com/en-gb/archive/blogs/ericlippert/not-everything-derives-from-object)
```

We should however also mention that while an object of a child type can be implicitly converted to its parent class, when value types, such as the simple types like `int`, are converted to objects this causes what is known as [boxing](boxing).
More on that later though.

