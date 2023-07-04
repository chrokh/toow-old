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

