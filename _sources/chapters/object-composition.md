# Object composition

## Motivation

[Composition](method-composition) is the act of combining simple things into more complex things in order to solve complex problems.
In procedural programming we compose procedures (which in C# is known as [static methods](static-methods)), in [functional programming](paradigms) we compose functions, and in object oriented programming we compose objects.
So if objects are the "building blocks" in object oriented programming then how do we actually build programs using these blocks?
How do we actually compose objects?

## Definition

In object oriented programming, composition is a binary, *directed relationship*.
We say that one object "has a" reference to another object.
Just because I consider myself your friend, doesn't necessarily mean that you consider yourself my friend.
Object composition is not necessarily a two way street.
So if all we know is that object `a` has a reference to object `b` then we don't know whether object `b` also has a reference to object `a`.

If object `a` has a field or property that contains an object of type `b` then we say that `a` "has-a" `b`.
We say that `a` is composed with `b`.
We refer to `a` as the composing object and `b` as the composed object.

% TODO: ADD FIGURE
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:object-composition-object-diagram
%
%Object composition is a binary directed relationship between two objects. In this figure `a` "has-a" `b`.
%``

The objects involved in a composition could be of the same type or of different types.
While we call it "object composition", in a class based object oriented language, we define compositions on the class level.
So the terms "composition" and "has-a" is also used on the type level.
This means that if we define a type `A` such that it has an instance field or property of type `B` then we would say that `A` has-a `B` and we would refer to this as object composition.


### UML association

In UML class diagrams we refer to object composition as "association" and we draw it using an arrow shaped as in {numref}`fig:uml-class-diagram-association-arrow`.
The arrow is pointing from the type that has a reference to the type that it has a reference to.
In the case of [Towers of Hanoi](towers-of-hanoi), `Rod` is pointing towards `Disk` since `Rod` may have references to `Disk`s.

% TODO: REPLACE IMAGE!!
```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
:name: fig:uml-class-diagram-association-arrow
:width: 300

In UML class diagram notation, object composition is called "association" and is depicted using a solid line with a line arrow head.
The arrow points from the composing object to the composed.
[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
```

```{warning}
Later, we will learn about another relationship, that we call "is-a".
Understanding the difference between "has-a" and "is-a" is crucial for understanding simpler topics such as [dependency injection](dependency-injection) and more complex topics such as [design patterns](design-patterns).
```

```
┌──────────────────────────┐      ┌─────────────────┐
│            Rod           │      │      Disk       │
├──────────────────────────┤      ├─────────────────┤
│ - disks : Disk[]         ├─────>│ + Color : Color │
├──────────────────────────┤      ├─────────────────┤
│ + Add (disk:Disk) : void │      │                 │
│ + Sub (disk:Disk) : void │      │                 │
└──────────────────────────┘      └─────────────────┘
```

Composing two classes means that they are in a directed has-a relationship with each other where objects of one type will have a reference to objects of the other type but not necessarily the other way around. Given the diagram above, `Rod` has `Disk` but the reverse is not true.

%% Rod -> Disk
% TODO: UML class diagram
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:object-composition-class-diagram
%
%Composing two classes means that they are in a directed has-a relationship with each other where objects of one type will have a reference to objects of the other type but not necessarily the other way around. Given this diagram, `Rod` has `Disk` but the reverse is not true.
%``

UML divides the concept of association into two types that they call "aggregation" and "composition".
Unfortunately the term "composition" in UML class diagrams doesn't mean the same thing as "object composition" that we're discussing here.
Fortunately, we will not discuss association aggregation and association composition in this book so hopefully we can leave this confusion behind.

```{important}
Object composition correspond to the UML class diagram term known as "association".
One form of association is composition.
Unfortunately, the term "composition" does not mean the same thing in the context of UML class diagrams as in the context of object oriented programming.
```

```{seealso}
If you want to learn more about the UML class diagram concepts aggregation and composition, check out the [Wikipedia](https://en.wikipedia.org/wiki/Class_diagram) page on UML class diagrams.
```


(object-composition:abstraction-levels)=
### Abstraction levels

We're going to talk about four kinds of, let's call them, "abstraction levels" of object composition.
I like to call these levels:
%They are numbered so that the level of [indirection](indirection) and [modularity](maintainability) increases.

%Direct composition of concrete object
%Direct composition of abstract object
%Indirect composition of concrete object
%Indirect composition of abstract object

% TODO: Why not call it the following:
% Concrete dependency construction
% Abstract dependency construction
% Concrete dependency injection
% Abstract dependency injection

- [**Concrete constructed** object composition](concrete-constructed-object-composition).
- [**Concrete injected** object composition](concrete-injected-object-composition).
- [**Abstract constructed** object composition](abstract-constructed-object-composition).
- [**Abstract injected** object composition](abstract-injected-object-composition)

%- LEVEL 1: [**Concrete** dependency **construction**](concrete-dependency-construction).
%- LEVEL 2: [**Abstract** dependency **construction**](abstract-dependency-construction).
%- LEVEL 3: [**Concrete** dependency **injection**](concrete-dependency-injection).
%- LEVEL 4: [**Abstract** dependency **injection**](abstract-dependency-injection)

These four levels are *not* well established terms to describe types of composition.
I'm suggesting this division as a way to make sense of the term "object composition" which ambigiously tend to refer to all four levels.
It will also help us understand how object composition relates to [dependency injection and inversion](dependency-inversion-principle) which is something that we'll talk about in a coming chapter.
In short, levels 3 and 4 are forms of dependency injection, meaning ways to invert dependencies.

We're only going to deal with concrete object composition in the following chapters, and only after we've covered some more ground will we talk about abstract composition.
%We're going to start by covering levels one and three, but we need to learn more before we can cover levels two and four.

%TODO: So how does the term dependency injection relate to our terminology?

So what do these levels actually mean?
Well, there are two basic questions we're asking when classifying a case of object composition.
The questions are also visualized as a quadrant diagram in {numref}`composition-quadrants`.

1. Is the compile-time type of the composed object *concrete* or *abstract*?
2. Is the composed object *constructed* or *injected*?

The word "concrete" in the first question basically refers to classes.
While the word "abstract" basically refers to interfaces, and abstract classes.
Meaning types that cannot be instantiated.

The word "constructed" means that the object in question (or some dependency that the object has constructed) *instantiates* the composed object.
The word "injected" on the other hand means that the object in question (or some dependency that was injected to the object) receives the composed object as an argument through the constructor, a property, or a method.

If the answer to the second question is that the object is injected then this is a form of "[dependency injection](dependency-inversion-principle)".
But again, we'll discuss this more in a future chapter.

%However, even though it is useful to inject concretions, it is even more useful to inject abstractions.
%However, to understand dependency injection we must also understand that the more powerful way of using dependency injection is to depend on abstractions which means that the answer to the second question would be "abstract".

% TODO: Replace this table with image.
```{table} Quadrant diagram of abstraction levels in object composition.
:name: composition-quadrants

|              | CONSTRUCTED | INJECTED |
| :--          | :--         | :--      |
| **CONCRETE** |             |          |
| **ABSTRACT** |             |          |
```

But wait a minute, you might ask.
Aren't all types concrete types?
What do we mean when we say that a type is "abstract"?
What's an example of a non-concrete type?
Well, hold your horses my friend.
We haven't talked about object oriented abstractions yet but we'll get there very soon.
To understand what an abstract type is we must first understand
[interfaces](interfaces),
[inheritance](inheritance),
and [subtype polymorphism](subtype-polymorphism).
This is why we, in the coming chapters, will stick to *concrete* object composition.
Then we we will deal with understanding what abstract types are.
Only after that will we finally deal with *abstract* object composition.
So let's take it one step at a time.

Also, don't worry if all this seems overwhelming.
We will deal with all forms of object composition one by one.
So by the end of it you'll be an object composition master.
Do not go gentle in to that good night.


## Examples

We could for example say that the type `Player` has a `Position`, or that `Animal` has a `Behavior`.


### Stars

We've talked a lot about geometric shapes.
Think about a six-pointed star.
A six-pointed star can be created by overlaying one triangle over another.
The second triangle must be rotated 180 degrees and vertically translated.

A six-point star can thus be seen as a composition of two triangles.
We could define a class called `Star` which *has* two instance fields of type `Triangle`.


### Towers of Hanoi

Remember the [Towers of Hanoi](towers-of-hanoi)?
We might build a system where `Rod` has a `Disk`.
So, on the type level, types have "has-a"-relationships with other types.
But as we instantiate objects, our has-a relationships on the type level are turned into has-a relationships on the object level.
If `Rod` has `Disk` then this means that it is possible, but not necessary, for instances of `Rod` to have access to an object or multiple objects of type `Disk`.

Of course we could model the Towers of Hanoi so that, for example, `Disk` is in a has-a relationship with `Rod`.
As always, a domain can always be modeled in a multitude of different ways.
Each model has different drawbacks and benefits.
Letting `Rod`s have `Disk`s rather than the other way around does however seem quite intuitive.
You stick the disk onto the rod, so the rod *has* the disk.

Let's exemplify the different abstract levels of object composition in the context of type types `Disk` and `Rod`.

```{list-table}
:header-rows: 1

* -
  - **CONCRETE**
  - **ABSTRACT**
* - **CONSTRUCTED**
  - `Rod` instantitates `Disk` and `Disk` is a class.
  - `Rod` instantiates `Disk` and `Disk` is an interface.
* - **INJECTED**
  - `Disk` is injected into `Rod` and `Disk` is a class.
  - `Disk` is injected into `Rod` and `Disk` is an interface.
```

## Exercises

```{exercise}
Draw the quadrant diagram of object composition abstraction levels.
Explain each quadrant in your own words and give an example in words.
```


