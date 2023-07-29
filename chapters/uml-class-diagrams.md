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

# UML class diagrams

When reasoning about object oriented design UML class diagrams serve as a particularly efficient tool.
Even if only informally.
Having a good understanding of UML class diagram notation is essential if we are to be able to eventually understand object oriented [design patterns](design-patterns).

```{important}
UML class diagrams help visualize the design and structure of a system, allowing us to reason about designs efficiently and without getting bogged down by unnecessary details.
```

```{seealso}
[UML Class Diagram Specification 2.5.1](https://www.omg.org/spec/UML/2.5.1/PDF).
```

In the UML class diagram below we see a class called `Player` which 'has' an `IWeapon` which is an interface. The abstract class `Sword` is an implementation of the interface `ISword` and the classes `InvisibleSword` and `WoodenSword` both inherit from `Sword`. In the diagram we can also see examples of fields (`weapon`), properties (`Name`), access modifiers (`+`, `-`, `#`), methods (`Attack`), constructors (`Player`), abstract members (`Use` in `Sword`), and overriding (`Use` in `WoodenSword`).

The code underlying this system might look something like what we have below.

```{code-cell}
:tags: [hide-input]
interface IWeapon
{
    void Use();
}

public abstract class Sword : IWeapon
{
    protected int sharpness = 1;

    public void Sharpen()
        => sharpness++;

    public abstract void Use();
}

public class WoodenSword : Sword
{
    public override void Use()
        => Console.WriteLine($"Used Wooden Sword with sharpness {sharpness}.");
}

public class InvisibleSword : Sword
{
    public override void Use()
        => Console.WriteLine($"Used Invisible Sword with sharpness {sharpness}.");
}

class Player
{
    public string Name { get; private set; }
    private IWeapon weapon;

    public Player(string name, IWeapon weapon)
    {
        this.Name = name;
        this.weapon = weapon;
    }

    public void Attack(Player other)
    {
        Console.WriteLine($"{Name}'s turn.");
        weapon.Use();
    }
}
```

%Let's look at how these classes might be used.
%
%Player player1 = new Player("PLAYER1", new WoodenSword());
%Player player2 = new Player("PLAYER2", new InvisibleSword());
%
%player1.Attack(player2);

```{figure} ../images/uml-class-diagram.png
```

Let us now briefly discuss how to model most important object oriented concepts in UML class diagrams one by one. Remember to refer back to the image for visual representations.

```{tip}
There's a lot of variation in UML class diagrams that you'll find in the wild.
If you're not following the standard, pick a syntax and stick to it.
Understandability is key.
```

## Classes

To depict a class in a UML class diagram we draw a rectangle (known in UML as an 'entity') with three sections.
In the top section we write the 'identifier' (meaning the name) of the class.
In the middle section we write the 'attributes' of the class.
In the bottom section we write the 'operations' of the class.

%```
%┌────────────────────┐
%│ <class identifier> │
%├────────────────────┤
%│    <attributes>    │
%├────────────────────┤
%│    <operations>    │
%└────────────────────┘
%```

Attributes are essentially instance variables (which in C# means that they are either instance [fields](fields) or instance [properties](properties)).
Operations on the other hand are [instance methods](instance-methods).
The attributes (instance variables) and operations (instance methods) of a class are collectively referred to as the 'members' of the class.

%Consider for example the two classes `Apple` and `Pear` as defined below.
%
%`{code-cell}
%class Apple { }
%class Pear { }
%`
%
%To depict these classes using UML class diagram notation we would draw like this:
%
%`
%┌─────────────────────┐   ┌────────────────────┐
%│        Apple        │   │        Pear        │
%├─────────────────────┤   ├────────────────────┤
%│                     │   │                    │
%├─────────────────────┤   ├────────────────────┤
%│                     │   │                    │
%└─────────────────────┘   └────────────────────┘
%`


```{tip}
To avoid cluttering the diagram, class members are often omitted, unless they are relevant for the discussion at hand.
```

%``{note}
%Depending on the level of formality, you will often find that a class is depicted without the line between attributes and operations.
%``


## Fields

Fields are modeled as attributes. In the second section of an entity we write the name of the field, followed by a colon (`:`) and then the data type of the attribute. See, for example, the `sharpness` field in the `Sword` class.


## Access modifers

We can mark attributes or operations as `public`, `private`, or `protected` by prepending a plus sign (`+`), minus sign (`-`), or hash symbol (`#`), respectively. See, for example, the `protected` field `sharpness` in `Sword` or the `private` field `weapon` in `Player`.


## Properties

Since UML class diagrams are language independent there is no specific support for the C# specific idea of [properties](auto-implemented-properties).
One common way of modeling properties is by means of the `«get»` and `«set»` 'stereotypes'. We define one UML attribute for the getter and one for the setter and then prepend the appropriate sterotype. See, for example, the `Name` property of the `Player` class.


## Instance methods

Instance methods are modeled as 'operations' which means that they are listed in the third section of a box. We can specify both the parameter list of an operation and the return type. See, for example, the `Attack` method in the `Player` class

%The line `+ Scale (width : int, height : int) : void` denotes a `public` method called `Scale` that returns nothing (`void`) but has two parameters called `width` and `height`, both of type `int`.


## Constructors

Constructors should, according to the UML specification, be modeled by prepending the `«Create»` 'stereotype' to the member. In practice however, we often find diagrams where the constructor is implicit and simply has the same name and return type as the class. See, for example, the `Player` constructor in the diagram.


## Composition

In UML class diagrams we refer to [object composition](object-composition) as 'association' and we draw it using an arrow.
The arrow points from the subclass to the superclass.
The arrow is pointing from the type that has a reference (i.e. the 'composing' object) to the type that it has a reference to (i.e. the 'composed' object).
We tend to refer to this as 'has-a' relationship.
See, for example, the arrow from the `Player` class to the `IWeapon` interface.
This refers to the `weapon` field in the `Player` class.

```{tip}
Classes that are in a 'has-a' relationship (meaning association) are conventionally drawn next to eachother horizontally, while classes that are in an 'is-a' relationship (meaning generalization or realization) are positioned vertically so that the subtype is below the supertype.
This is a convention and not a rule.
```

```{seealso}
UML divides the concept of association into two types that they call 'aggregation' and 'composition'.
The term 'composition', in UML, does not mean the same thing as [object composition](object-composition).
We won't discuss the two types of association in detail in this book.
For more reading, please see the [Wikipedia page](https://en.wikipedia.org/wiki/Class_diagram) on UML class diagrams or the [UML specification](https://www.omg.org/spec/UML/2.5.1/PDF).
```


## Interfaces

Interface implementation is, in UML, called 'realization' and is depicted using a dashed line with a hollow arrow head.
The arrow points from the implementation to the interface.
An interface is an entity but where the 'classifier' `«interface»` is added above the identifier.
See, for example, interface `IWeapon` and its relationship with the abstract class `Sword`.
Implementations are conventionally drawn 'below' interfaces.
Whether or not to include (meaning: repeat) the members of the interface in the implementation varies depending on who you ask.
Neither leads to a loss of information since if the implementor implements the interface then it must *by definition* implement all its members.


## Inheritance

Inheritance is, in UML, called 'generalization' (or sometimes simply 'inheritance') and is depicted using a solid line with a hollow arrow head.
Subclasses are conventionally drawn 'below' superclasses.
To differentiate [inherited](inheritance) or [overridden](overriding) members apart from [hidden](hiding) members, inherited or overridden members are either *not* repeated in the subclass or the caret symbol (`^`) is prepended to their name.
There is no standard syntax for telling overriding apart from inheriting.

```{important}
Association (meaning object composition), realization (meaning interface implementation), and generalization (meaning inheritance), are all **directed** relationships.
For example, just because I consider you my friend, doesn't mean that you consider yourself mine.
Similarly, all cats are animals, but not all animals are cats.
%where objects of one type will have a reference to an object or multiple objects of the other type but not necessarily the other way around.
```


## Abstract

Abstract classes and members are denoted by writing the classifier in *italics*.
If the font does not permit italics, the specification states that we add the textual annotation `{abstract}` after or below.
See, for example, the abstract class `Sword` and the abstract method `Use`.


%## Fields
%
%In UML class diagrams, instance [fields](fields) are modeled by what UML calls 'attributes'.
%Consequently, fields are listed in the second section of a UML box.
%
%A `Rectangle` class with two fields called `Width` and `Height` of type `int` is depicted in the figure below.
%
%```
%┌────────────────────┐   ┌────────────────────┐
%│ <class identifier> │   │     Rectangle      │
%├────────────────────┤   ├────────────────────┤
%│                    │   │ Width : int        │
%│    <attributes>    │   │ Height : int       │
%│                    │   │                    │
%├────────────────────┤   ├────────────────────┤
%│                    │   │                    │
%│    <operations>    │   │                    │
%│                    │   │                    │
%└────────────────────┘   └────────────────────┘
%```
%
%Notice how, when listing an attribute we also write out the [type](data-types) of the attribute.
%Depending on what we're trying to convey with our diagram, the data types might or might not be omitted.
%
%
%## Access modifiers
%
%We've discussed three different [access modifiers](access-modifiers): `public`, `private`, and `protected`.
%In UML class diagrams, these are modeled by prepending the plus sign (`+`), minus sign (`-`), or hash (`#`), to the member name.
%In UML class diagrams, this is known as the 'visibility' of the class member.
%
%Depending on the level of informality of the diagram, visibility is often omitted.
%
%In the example below we can see that the fields `Width` and `Height` are marked as being `public`.
%
%```
%┌────────────────┐
%│   Rectangle    │
%├────────────────┤
%│ + Width : int  │
%│ + Height : int │
%├────────────────┤
%│                │
%│                │
%└────────────────┘
%```
%
%## Instance methods
%
%So how do we capture instance methods in UML class diagram notation?
%Instance members are listed in the third section and are in UML class diagrams called 'operations'.
%
%We can specify both the parameter list of an operation and the return type.
%The parameter list is as a comma-delimited list within parenthases.
%
%```
%┌────────────────────────────────────────────┐
%│                Rectangle                   │
%├────────────────────────────────────────────┤
%│ - width : int                              │
%│ - height : int                             │
%├────────────────────────────────────────────┤
%│ + Scale (width : int, height : int) : void │
%│ + Scale (multiplier : int) : void          │
%│ + Print () : void                          │
%│ + Area () : int                            │
%└────────────────────────────────────────────┘
%```
%
%In the diagram above we're modeling a class called `Rectangle` with four instance methods.
%The two first are [overloaded](instance-method-overloading) and are both called `Scale`.
%Notice that they have different parameter lists.
%The method called `Print` takes no arguments and returns nothing, while the method `Area` takes no arguments but returns an `int`.
%All the methods are `public`.
%
%The underlying class might look something like this:
%
%```{code-cell}
%class Rectangle
%{
%    int width = 1;
%    int height = 1;
%
%    public void Scale(int width, int height)
%    {
%        this.width *= width;
%        this.height *= height;
%    }
%
%    public void Scale(int multiplier)
%        => Scale(multiplier, multiplier);
%
%    public void Print()
%        => Console.WriteLine($"{width} x {height}");
%
%    public int Area()
%        => width * height;
%}
%```
%
%
%## Constructors
%
%Constructors should, according to the UML specification, be modeled by prepending the so called `«Create»` 'stereotype' to the member.
%
%
%```
%┌────────────────────────────────────────────────┐
%│                    Square                      │
%├────────────────────────────────────────────────┤
%│ + Size : int                                   │
%├────────────────────────────────────────────────┤
%│ + «Create» Rectangle(size : int) : Rectangle │
%└────────────────────────────────────────────────┘
%```
%
%In practice however, we often find diagrams where the constructor is implicit and simply has the same name and return type as the class.
%
%```
%┌─────────────────────────────────────┐
%│               Square                │
%├─────────────────────────────────────┤
%│ + Size : int                        │
%├─────────────────────────────────────┤
%│ + Rectangle(size : int) : Rectangle │
%└─────────────────────────────────────┘
%```
%
%
%## Properties
%
%How do we represent properties in UML class diagram syntax?
%Since UML class diagrams are language independent there is no specific support for the C# specific idea of properties.
%
%Consequently, modelers choose to model them in slightly different ways.
%One such variation, makes use of the `«get»` and `«set»` 'stereotypes'.
%It would look something like the diagram below.
%
%```
%┌────────────────────────────────────────┐
%│                Rectangle               │
%├────────────────────────────────────────┤
%│ + «get» Width : int                  │
%│ - «set» Width : int                  │
%│ + «get» Height : int                 │
%│ - «set» Height : int                 │
%│ + «get» Area : int                   │
%├────────────────────────────────────────┤
%└────────────────────────────────────────┘
%```
%
%The UML class diagram above would correspond to the following code in C#.
%
%```{code-cell}
%class Rectangle
%{
%  public double Width { get; private set; }
%  public double Height { get; private set; }
%  public double Area { get; }
%}
%```
%
%
%
%## Association
%
%In UML class diagrams we refer to object composition as 'association' and we draw it using an arrow.
%The arrow is pointing from the type that has a reference to the type that it has a reference to.
%
%% TODO: REPLACE IMAGE!!
%```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
%:name: fig:uml-class-diagram-association-arrow
%:width: 300
%
%In UML class diagram notation, object composition is called 'association' and is depicted using a solid line with a line arrow head.
%The arrow points from the composing object to the composed.
%[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
%```
%
%In the diagram below, the `Player` class has an association with the `Weapon` class.
%Since we can see that `Player` has a field of type `Weapon`, we assume that the association relationship stems from that field.
%
%```
%┌──────────────────────────┐      ┌─────────────────┐
%│          Player          │      │      Weapon     │
%├──────────────────────────┤      ├─────────────────┤
%│ - Nickname  : string     │      │ + Name : string │
%│ - Weapon : Weapon        ├─────>│                 │
%├──────────────────────────┤      ├─────────────────┤
%│                          │      │                 │
%└──────────────────────────┘      └─────────────────┘
%```
%
%```{admonition} Remember
%This is known as a 'has-a' relationship.
%```
%
%Association (or object composition) is a directed relationship where objects of one type will have a reference to an object or multiple objects of the other type but not necessarily the other way around.
%In the diagram above, `Player` has a `Weapon` but `Weapon` does not have a `Player`.
%
%```{important}
%Object composition correspond to the UML class diagram term known as 'association'.
%UML divides the concept of association into two types that they call 'aggregation' and 'composition'.
%The term 'composition', in UML, does not mean the same thing as [object composition](object-composition).
%We won't discuss the two types of association in detail in this book.
%```
%
%```{seealso}
%If you want to learn more about the UML class diagram concepts aggregation and composition, check out the [Wikipedia](https://en.wikipedia.org/wiki/Class_diagram) page on UML class diagrams.
%```
%
%
%## Interfaces
%
%In UML class diagram notation, interface implementation is called 'realization' and is depicted using a dashed line with a hollow arrow head.
%The arrow points from the implementation to the interface.
%
%% TODO: REPLACE IMAGE!!
%```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
%:name: fig:uml-class-diagram-realization
%:width: 300
%
%In UML class diagram notation, interface implementation is called 'realization' and is depicted using a dashed line with a hollow arrow head.
%The arrow points from the implementation to the interface.
%[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
%```
%
%In the diagram below we are saying that the class `Circle` is implementing the interface `IShape`.
%We're saying that it implements all the members of `IShape` but we are also adding some additional members not present in `IShape`.
%
%```
%┌────────────────────────────────┐
%│         «interface»            │
%│            IShape              │
%├────────────────────────────────┤
%│ + <get> Width : double         │
%│ + <set> Width : double         │
%│ + <get> Height : double        │
%│ + <set> Height : double        │
%├────────────────────────────────┤
%│ + Scale (factor:double) : void │
%└────────────────────────────────┘
%               Δ
%               ╎
%               ╎
%               ╎
%┌────────────────────────────────┐
%│            Circle              │
%├────────────────────────────────┤
%│ + <get> Radius : double        │
%│ + <set> Radius : double        │
%│ + <get> Diameter : double      │
%│ + <set> Diameter : double      │
%├────────────────────────────────┤
%│                                │
%└────────────────────────────────┘
%```
%
%Implementations are conventionally drawn 'below' interfaces.
%
%Whether or not to include (meaning: repeat) the members of the interface in the implementation varies depending on who you ask.
%Here we have opted to follow the praxis of not repeating the members since the omission leads to no loss of information.
%If `Circle` truly implements the interface `IShape` then it must *by definition* implement all its members.
%
%```{tip}
%Pick a syntax and stick to it.
%Consistency is key.
%```
%
%
%
%## Inheritance
%
%In UML class diagram notation, inheritance is called 'generalization' (or sometimes simply 'inheritance') and is depicted using a solid line with a hollow arrow head.
%The arrow points from the subclass to the superclass.
%
%% TODO: REPLACE IMAGE!!
%```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Uml_classes_en.svg/800px-Uml_classes_en.svg.png
%:name: fig:uml-class-diagram-realization
%:width: 300
%
%In UML class diagram notation, inheritance is called 'generalization' and is depicted using a solid line with a hollow arrow head.
%The arrow points from the implementation to the interface.
%[[Image source](https://en.wikipedia.org/wiki/Class_diagram)].
%```
%
%In the diagram below we have four classes:
%`Sequence`, `PalindromicSequence`, `EvenSequence`, and `OddSequence`.
%The three latter classes all inherit from the class `Sequence`.
%
%We'll discuss the this example more in the [examples section](inheritance:sequences) where we'll also look at similar code.
%```
%     ┌───────────────────────────────────────┐
%     │                Sequence               │
%     ├───────────────────────────────────────┤
%     │                                       │
%     ├───────────────────────────────────────┤
%     │ + «get» Current : int                 │
%     │ - «set» Current : int                 │
%     │ + Next () : void                      │
%     │ + Take (int n) : int[]                │
%     └───────────────────────────────────────┘
%                   Δ   Δ   Δ
%           ┌───────┘   │   └─────┐
%           │           │         │
%┌───────────────────┐  │  ┌───────────────────┐
%│    EvenSequence   │  │  │     OddSequence   │
%├───────────────────┤  │  ├───────────────────┤
%├───────────────────┤  │  ├───────────────────┤
%│ + ^Next () : void │  │  │ + ^Next () : void │
%└───────────────────┘  │  └───────────────────┘
%                       │
%             ┌─────────────────────┐
%             │ PalindromicSequence │
%             ├─────────────────────┤
%             ├─────────────────────┤
%             │ + ^Next () : void   │
%             └─────────────────────┘
%
%
%```
%
%Subclasses are conventionally drawn 'below' superclasses.
%
%Whether or not to include (meaning: repeat) the inherited members in the subclass varies depending on who you ask.
%Remember that we had this same discussion in the chapter on interfaces?
%A common suggestion, and the choice we have made above, is however to, out of those members that also appear in the superclass, only mention those that override (or hide) members from the superclass.
%
%To be able to tell [overriding](overriding) apart from [hiding](hiding), some prepend the caret symbol (`^`) to the name of the member to indicate that it has been overridden as opposed to hidden.
%
%```{tip}
%Pick a syntax and stick to it.
%Consistency is key.
%```
%
%In the example above we have overriden the implementation of `Next` in all subclasses of `Sequence`.
%All other members are inherited.
%
%% Example: Get rid of the foreach? Or is this perhaps not a great solution?
%
%%- Including abstract classes.
%%- UML class diagram notation.
%%- White-box reuse (as opposed to black-box which is composition) (Gamma et al)
%%- Object type (lowercase is an alias for the same as the uppercase). All classes inherit from object.
%%- Forward ref to Subtype polymorphism
%%- Overriding 


