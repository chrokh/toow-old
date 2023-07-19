# UML class diagrams

## Classes


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

```{note}
If you want more formal information on UML class diagrams I recommend the [specification](https://www.omg.org/spec/UML/2.5.1/PDF).
```


### Fields

In UML class diagrams, instance fields are modeled by what UML calls "attributes".
Remember how, in the chapter on [classes](classes), we discussed how a type in a UML class diagram is drawn as a rectangle that's divided into three sections.
See the left class in the figure below for a reminder of what the UML class diagram syntax looks like.

The second section lists attributes, and the third lists operations.
Instance fields in C# (as well as [properties](properties) which we'll talk about soon) are represented as attributes in UML class diagrams.

The `Rectangle` class would, in a UML class diagram, be represented as the right class in the figure below.

```
┌────────────────────┐   ┌────────────────────┐
│ <class identifier> │   │     Rectangle      │
├────────────────────┤   ├────────────────────┤
│                    │   │ Width : int        │
│    <attributes>    │   │ Height : int       │
│                    │   │                    │
├────────────────────┤   ├────────────────────┤
│                    │   │                    │
│    <operations>    │   │                    │
│                    │   │                    │
└────────────────────┘   └────────────────────┘
```

Notice how, when listing an attribute we also write out the type of the attribute.
In the chapter on [classes](classes:uml) we mentioned that UML class diagrams are often draw with a varying level of informality.
As such, the data types of attributes are often omitted if the situtation doesn't require them in order to explain whatever it is we're trying to explain.

Since the instance fields of the class `Rectangle` are marked as `public` we should actually also add a plus sign (`+`) before the name of the field.
In UML class diagrams, this is known as the "visibility" of the class member.
But more on this in the chapter on [access modifiers](access-modifiers).
And again, depending on the level of informality, visibility is often omitted.

```
┌────────────────┐
│   Rectangle    │
├────────────────┤
│ + Width : int  │
│ + Height : int │
├────────────────┤
│                │
│                │
└────────────────┘
```



## Constructors

- TODO: UML class diagrams. Specification says use <<Create>> but it's also common to just use the same name and return type as the class.


## Instance methods

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


## Properties

How do we represent properties in UML class diagram syntax?
Since UML class diagrams are language independent there is no specific support for the C# specific idea of properties.

Consequently, modelers choose to model them in slightly different ways.
One such variation, makes use of what UML calls "stereotypes".
It would look something like the diagram below.

```
┌────────────────────────────────────────┐
│                Rectangle               │
├────────────────────────────────────────┤
│ + <<get>> Width : int                  │
│ - <<set>> Width : int                  │
│ + <<get>> Height : int                 │
│ - <<set>> Height : int                 │
│ + <<get>> Area : int                   │
├────────────────────────────────────────┤
└────────────────────────────────────────┘
```

The UML class diagram above would correspond to the following code in C#.

```{code-cell}
class Rectangle
{
  public double Width { get; private set; }
  public double Height { get; private set; }
  public double Area { get; }
}
```



## Association

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


## Interfaces

In UML class diagram notation, interface implementation is called "realization" and is depicted using a dashed line with a hollow arrow head.
The arrow points from the implementation to the interface.

% TODO: REPLACE IMAGE!!
```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
:name: fig:uml-class-diagram-realization
:width: 300

In UML class diagram notation, interface implementation is called "realization" and is depicted using a dashed line with a hollow arrow head.
The arrow points from the implementation to the interface.
[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
```

In the diagram below we are saying that the class `Circle` is implementing the interface `IShape`.
We're saying that it implements all the members of `IShape` but we are also adding some additional members not present in `IShape`.

```
┌────────────────────────────────┐
│         <<interface>>          │
│            IShape              │
├────────────────────────────────┤
│ + <get> Width : double         │
│ + <set> Width : double         │
│ + <get> Height : double        │
│ + <set> Height : double        │
├────────────────────────────────┤
│ + Scale (factor:double) : void │
└────────────────────────────────┘
               Δ
               ╎
               ╎
               ╎
┌────────────────────────────────┐
│            Circle              │
├────────────────────────────────┤
│ + <get> Radius : double        │
│ + <set> Radius : double        │
│ + <get> Diameter : double      │
│ + <set> Diameter : double      │
├────────────────────────────────┤
│                                │
└────────────────────────────────┘
```

Implementations are conventionally drawn "below" interfaces.

Whether or not to include (meaning: repeat) the members of the interface in the implementation varies depending on who you ask.
Here we have opted to follow the praxis of not repeating the members since the omission leads to no loss of information.
If `Circle` truly implements the interface `IShape` then it must *by definition* implement all its members.

```{tip}
Pick a syntax and stick to it.
Consistency is key.
```


## Interfaces

In UML class diagram notation, interface implementation is called "realization" and is depicted using a dashed line with a hollow arrow head.
The arrow points from the implementation to the interface.

% TODO: REPLACE IMAGE!!
```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
:name: fig:uml-class-diagram-realization
:width: 300

In UML class diagram notation, interface implementation is called "realization" and is depicted using a dashed line with a hollow arrow head.
The arrow points from the implementation to the interface.
[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
```

In the diagram below we are saying that the class `Circle` is implementing the interface `IShape`.
We're saying that it implements all the members of `IShape` but we are also adding some additional members not present in `IShape`.

```
┌────────────────────────────────┐
│         <<interface>>          │
│            IShape              │
├────────────────────────────────┤
│ + <get> Width : double         │
│ + <set> Width : double         │
│ + <get> Height : double        │
│ + <set> Height : double        │
├────────────────────────────────┤
│ + Scale (factor:double) : void │
└────────────────────────────────┘
               Δ
               ╎
               ╎
               ╎
┌────────────────────────────────┐
│            Circle              │
├────────────────────────────────┤
│ + <get> Radius : double        │
│ + <set> Radius : double        │
│ + <get> Diameter : double      │
│ + <set> Diameter : double      │
├────────────────────────────────┤
│                                │
└────────────────────────────────┘
```

Implementations are conventionally drawn "below" interfaces.

Whether or not to include (meaning: repeat) the members of the interface in the implementation varies depending on who you ask.
Here we have opted to follow the praxis of not repeating the members since the omission leads to no loss of information.
If `Circle` truly implements the interface `IShape` then it must *by definition* implement all its members.

```{tip}
Pick a syntax and stick to it.
Consistency is key.
```


## Inheritance

In UML class diagram notation, inheritance is called "generalization" (or sometimes simply "inheritance") and is depicted using a solid line with a hollow arrow head.
The arrow points from the subclass to the superclass.

% TODO: REPLACE IMAGE!!
```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
:name: fig:uml-class-diagram-realization
:width: 300

In UML class diagram notation, inheritance is called "generalization" and is depicted using a solid line with a hollow arrow head.
The arrow points from the implementation to the interface.
[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
```

In the diagram below we have four classes:
`Sequence`, `PalindromicSequence`, `EvenSequence`, and `OddSequence`.
The three latter classes all inherit from the class `Sequence`.

We'll discuss the this example more in the [examples section](inheritance:sequences) where we'll also look at similar code.
```
     ┌───────────────────────────────────────┐
     │                Sequence               │
     ├───────────────────────────────────────┤
     │                                       │
     ├───────────────────────────────────────┤
     │ + <<get>> Current : int               │
     │ - <<set>> Current : int               │
     │ + Next () : void                      │
     │ + Take (int n) : int[]                │
     └───────────────────────────────────────┘
                   Δ   Δ   Δ
           ┌───────┘   │   └─────┐
           │           │         │
┌───────────────────┐  │  ┌───────────────────┐
│    EvenSequence   │  │  │     OddSequence   │
├───────────────────┤  │  ├───────────────────┤
├───────────────────┤  │  ├───────────────────┤
│ + ^Next () : void │  │  │ + ^Next () : void │
└───────────────────┘  │  └───────────────────┘
                       │
             ┌─────────────────────┐
             │ PalindromicSequence │
             ├─────────────────────┤
             ├─────────────────────┤
             │ + ^Next () : void   │
             └─────────────────────┘


```

Subclasses are conventionally drawn "below" superclasses.

Whether or not to include (meaning: repeat) the inherited members in the subclass varies depending on who you ask.
Remember that we had this same discussion in the chapter on interfaces?
A common suggestion, and the choice we have made above, is however to, out of those members that also appear in the superclass, only mention those that override (or hide) members from the superclass.

To be able to tell [overriding](overriding) apart from [hiding](hiding), some prepend the caret symbol (`^`) to the name of the member to indicate that it has been overridden as opposed to hidden.

```{tip}
Pick a syntax and stick to it.
Consistency is key.
```

In the example above we have overriden the implementation of `Next` in all subclasses of `Sequence`.
All other members are inherited.

% Example: Get rid of the foreach? Or is this perhaps not a great solution?

%- Including abstract classes.
%- UML class diagram notation.
%- White-box reuse (as opposed to black-box which is composition) (Gamma et al)
%- Object type (lowercase is an alias for the same as the uppercase). All classes inherit from object.
%- Forward ref to Subtype polymorphism
%- Overriding 
