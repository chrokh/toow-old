# Object composition

[Composition](method-composition) is the act of combining simple things into more complex things in order to solve complex problems.
In procedural programming we compose procedures (which in C# is known as [static methods](static-methods)), in [functional programming](paradigms) we compose functions, and in object oriented programming we compose objects.
So if objects are the "building blocks" in object oriented programming then how do we actually build programs using these blocks?
How do we actually compose objects?

In object oriented programming, composition is a binary, *directed relationship*.
We say that one object "has a" reference to another object.
Just because I consider myself your friend, doesn't necessarily mean that you consider yourself my friend.
Object composition is not necessarily a two way street.
So if all we know is that object `a` has a reference to object `b` then we don't know whether object `b` also has a reference to object `a`.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:object-composition-object-diagram

TODO Object diagram?
```

The objects involved in a composition could be of the same type or of different types.
While we call it "object composition", in a class based object oriented language, we define compositions on the class level.
So the terms "composition" and "has a" is also used on the type level.

We could for example say that the type `Player` has a `Position`, or that `Animal` has a `Behavior`.
Remember the [Towers of Hanoi](towers-of-hanoi)?
We might build a system where `Rod` has a `Disk`.
So, on the type level, types have "has-a"-relationships with other types.
But as we instantiate objects, our has-a relationships on the type level are turned into has-a relationships on the object level.
If `Rod` has `Disk` then this means that it is possible, but not necessary, for instances of `Rod` to have access to an object or multiple objects of type `Disk`.

Of course we could model the Towers of Hanoi so that, for example, `Disk` is in a has-a relationship with `Rod`.
As always, a domain can always be modeled in a multitude of different ways.
Each model has different drawbacks and benefits.
In this chapter however we have chosen examples where `Rod`s have `Disk`s since this seems quite intuitive.
You stick the disk onto the rod, so the rod has the disk.


## UML association

In UML class diagrams we refer to object composition as "association" and we draw it using an arrow as in {numref}`fig:object-composition-class-diagram`.
The arrow is pointing from the type that has a reference to the type that it has a reference to.
In the case of Towers of Hanoi, `Rod` is pointing towards `Disk` since `Rod` may have references to `Disk`s.
Understanding how to use has-a arrows is critical for understanding more complex topics such as [design patterns](design-patterns) and helps in understanding simpler topics such as dependency injection.

UML divides the concept of association into two types that they call "aggregation" and "composition".
Unfortunately the term "composition" in UML class diagrams doesn't mean the same thing as "object composition" that we're discussing here.
Fortunately, we will not discuss association aggregation and association composition in this book so hopefully we can leave this confusion behind.

```{important}
Object composition correspond to the UML class diagram term known as "association".
One form of association is composition.
Consequently, the term "composition" does not mean the same thing in the context of UML class diagrams as in the context of object oriented programming.
```

```{seealso}
If you want to learn more about the UML class diagram concepts aggregation and composition, check out the [Wikipedia](https://en.wikipedia.org/wiki/Class_diagram) page on UML class diagrams.
```


% Rod -> Disk
```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:object-composition-class-diagram

Composing two classes means that they are in a directed has-a relationship with each other where objects of one type will have a reference to objects of the other type but not necessarily the other way around.
```

(abstraction-levels)=
## Abstraction levels

We're going to talk about four types, let's call them, "abstraction levels" of object composition.
They are numbered so that the level of [indirection](indirection) and [modularity](maintainability) increases.
I like to call these levels:

%Direct composition of concrete object
%Direct composition of abstract object
%Indirect composition of concrete object
%Indirect composition of abstract object

% TODO: Why not call it the following:
% Concrete dependency construction
% Abstract dependency construction
% Concrete dependency injection
% Abstract dependency injection

%- LEVEL 1: [**Constructed concrete** object composition](constructed-concrete-object-composition).
%- LEVEL 2: [**Constructed abstract** object composition](constructed-abstract-object-composition).
%- LEVEL 3: [**Injected concrete** object composition](injected-concrete-object-composition).
%- LEVEL 4: [**Injected abstract** object composition](injected-abstract-object-composition)

- LEVEL 1: [**Concrete** dependency **construction**](concrete-dependency-construction).
- LEVEL 2: [**Abstract** dependency **construction**](abstract-dependency-construction).
- LEVEL 3: [**Concrete** dependency **injection**](concrete-dependency-injection).
- LEVEL 4: [**Abstract** dependency **injection**](abstract-dependency-injection)

These four levels are *not* well established terms to describe types of composition.
I'm suggesting this division as a way to make sense of the words "object composition" which usually encompasses all four levels, and "dependency injection" which usually encompasses levels three and four.

We're going to start by covering levels one and three, but we need to learn more before we can cover levels two and four.
In other words, we're going to start by only dealing with concrete dependencies and only start dealing with abstract dependencies later.

%So how does the term dependency injection relate to our terminology?

Before we can talk about what these levels mean we must first understand the word "dependency".
The word "dependency" refer to the object that's being "composed".
In other words, it refers to the object that the other object has a reference to.
In the UML diagram of {numref}`fig:object-composition-class-diagram` the dependency is `Rod`.
`Disk` depends on `Rod`.
From the perspective of compilers, `Disk` cannot be compiled without also compiling `Rod` since `Disk` must have information on what we can do to things of type `Rod`.

So what do these levels actually mean?
Well, there are two basic questions we're asking when classifying a case of object composition.
The questions are also visualized as a quadrant diagram in {numref}`composition-quadrants`.

1. Is the dependency *constructed* or *injected*?
2. Is the compile-time type of the dependency *concrete* or *abstract*?

If the answer to the first question is that the object is injected then we would call this "dependency injection".
However, to understand dependency injection we must also understand that the more powerful way of using dependency injection is to depend on abstractions which means that the answer to the second question would be "abstract".

```{table} Quadrant diagram of abstraction levels in object composition.
:name: composition-quadrants

|                 | CONCRETE | ABSTRACT |
| :--             | :--      | :--      |
| **CONSTRUCTED** | Level 1  | Level 2  |
| **INJECTED**    | Level 3  | Level 4
```

Don't worry if all this seems overwhelming.
In the following chapters we're, as mentioned, only going to be dealing with levels 1 and 3.
Namely, object composition where the dependency is concrete and either constructed or injected.
So, let's now get started with something a bit more concrete.



