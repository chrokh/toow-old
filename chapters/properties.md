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

# Properties

%- TODO: Uniform access principle (use Robert Martin as source?)
%

## Motivation

In order to respect the principle of information hiding we sometimes we find ourselves writing instance methods to get and set private variables.

Some languages, like C#, offer what in C# is called "properties" that help us keep doing this but with way less boilerplate code.
%- Specific to some languages.



## Definition

Properties in C# essentially allow us to use the getting and setting syntax of instance fields while allowing us to execute code before the setting and getting occurs just as when we manually wrote getter and setter instance methods.

Properties can be *read-write*, *read-only*, or *write-only*[^write-only-properties].
The keywords `get`, `set`, and `init` are, in C#, known as "property accessors".
If a property has a `get` accessor then we can ask for its value.
If a property has a `set` or `init` accessor then we can set its value.
In the case of `set` we can set it anytime but in the case of `init` we can only set it upon instantiation through an object initializer, the constructor or via another property marked as `init`.

[^write-only-properties]: The usefulness of write-only properties have been debated and the .NET style guidelines prescribes that [write-only properties always should be replaced by instance methods](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca1044).

Property accessors support [access modifiers](access-modifiers).
It is therefore possible to, for example, have a field which is privately settable but publicly gettable.

Finally, properties can be marked as `required` which means that an object cannot be instantiated without having had the property initialized to a value.

```{note}
As with fields and methods, C# classes support both instance and static properties.
Since this is a book on object oriented programming we're almost exclusively focusing on instance properties.
```

Let's unpack what all this means.

%- Synonyms: Getters / Setters, Accessors, Mutators.


### Auto-implemented

In the chapter on [instance methods](instance-methods) we discussed how we can have `private` fields that we then expose `public` getters and setters for via instance methods.
We refer to the `private` field as "the backing field."
It would look something like the code below.

```{code-cell}
class Circle
{
  private int radius;

  public int GetRadius ()
    => radius;

  public void SetRadius (int radius)
    => this.radius = radius;
}
```

And we would use the code like this:

```{code-cell}
Circle circle = new Circle ();

circle.SetRadius(20);

Console.WriteLine( circle.GetRadius() );
```

However, when using C# properties we don't have to do all this manual work.
By using the feature known as "auto-implemented properties" we can instead write the following code.

```{code-cell}
class Circle
{
  public int Radius { get; set; }
}
```

That code essentially gives us the same benefits as the code we saw before.
We've got a `public` way of getting and setting the radius.
But, if we later down the line want to insert some code before we set or get the value we can do so.
More on that in a moment though.

A key difference is that the syntax for getting and setting the value of a property looks like that of [fields](fields) rather than [instance methods](instance-methods).
It would look like this:

```{code-cell}
Circle circle = new Circle ();

circle.Radius = 20;

Console.WriteLine( circle.Radius );
```

Notice how there are no parentheses, neither in the case of setting the value nor in the case of getting the value.

```{important}
When interacting with properties we use syntax that resembles that of fields rather than instance methods.
```


#### Must support get

Auto-implemented properties can be read-write or read-only but they cannot be write-only.
If you think about it, that makes sense, because why would we want to write a to a backing field that we cannot ever read from?

```{code-cell}
class Circle
{
  public int Radius { get; set; } // read-write
  public int Corners { get; } // read-only
}
```


#### Initialization

The initial value of an auto-implemented property can be set by, after defining our `get` and `set` accessors, using the equals sign and specifying a value.

```{code-cell}
class Circle
{
  public int Radius { get; set; } = 3;
  public int Corners { get; } = 0;
}
```

```{code-cell}
Circle circle = new Circle();
Console.WriteLine(circle.Radius);
Console.WriteLine(circle.Corners);
```


### Access modifiers

The protection level of the accessors of C# properties can be changed independently.
In the real world, you will often find that properties have `public` `get` accessors and `private` `set` accessors.

Under the banner of [information hiding](information-hiding) we should hide all implementation details.
We should hide anything that might change.
Consequently, we ought to default to making our properties `private`.

```{note}
Much later, we will touch on a design principle known as "[tell don't ask](tell-dont-ask)".
The conclusion of this principle, in relation to C# properties, is usually thought to be that we should not publically expose data through properties.
Even if our setters are private.
The reason for this is that we should not *ask* an object for data and then make decisions on its behalf.
Instead we should expose methods that we can call to *tell* the object what to do an let it choose on its own.
Remember, [objects](objects) should be thought of as autonomous agents.
```

Syntactically, we can change the access modifiers of C# property accessors in two places.
First, we can change the access modifier of the whole property by adding the access modifier before data type.
Notice how the property `radius` is marked as `private` below.
Also notice how we *can* set its value from the constructor without getting a compiler error.

```{code-cell}
class Circle
{
  private int radius { get; set; }

  public Circle (int radius)
    => this.radius = radius;
}
```

Now notice how we cannot access the property from outside the class without getting a compiler error like the one below.

```{code-cell}
:tags: [raises-exception]
Circle circle = new Circle();
int radius = circle.radius;
```

The second place where we can change the protection level of a property is on one (and only one) of the accessors themselves.
The key rules to remember is that the accessibility modifier of an accessor must be *more* restrictive than the accessibility modifier of the property.

If, for example, the property is marked as `public` then we can mark *one* of the accessors as `private` (or `protected` but more on that in a [later chapter](advanced-access-modifiers)).
This would mean that we can `get` the property from outside the class but only `set` it from within the class.

```{code-cell}
class Circle
{
  public int radius { get; private set; }

  public Circle (int radius)
    => this.radius = radius;
}
```

With the same technique, we could of course also express a `get` accessor that's more restrictive than the `set` accessor.
That could mean that we have a property that we can `set` from outside the class but only `get` from within the class.

If the property however is marked as `private` (which also happens if we don't specify an access modifier since the default modifier is `private` in C#) then we cannot add an accessibility to any of the accessors since there is nothing more restrictive than `private`.

```{code-cell}
class Circle
{
  private int radius { get; set; }

  public Circle (int radius)
    => this.radius = radius;
}
```


### Manually implemented

If further down the line we realize that we actually want a "backing field" that we manage ourselves then we can trivially introduce it.
Importantly, we can do so without forcing users of our class to have to change.
All changes occurs *within* the class that defines the property.

```{code-cell}
class Circle
{
  private int radius;
  public int Radius
  {
    get => radius;
    set => radius = value;
  }
}
```

```{code-cell}
Circle circle = new Circle ();

circle.Radius = 20;

Console.WriteLine( circle.Radius );
```

In the case above, our manual implementation is pointless since it behaves in exactly the same way as the auto-implemented properties we had before.
However, the important thing to realize here is that we are free to execute code right before the value is being returned or set.

Notice how we use the keyword `value` in the implementation of the class `Circle` above?
Why do we need the keyword `value`?
Since the `set` accessor doesn't follow regular method syntax there is no parameter that represents the value that the user of the object is trying to set.
If we set the value through an instance method we would say:

```
circle.Radius(20);
```

The number `20` would then be the value that we can access in some argument that's named by the definition of the `Radius` method.
But property accessors are *not* invoked like instance methods.
We get and set the value of properties using the same syntax that we use to set instance fields.
Like this:

```
circle.Radius = 20;
```

But if there's no instance method, how do we access the value that the invoker of our property is trying to set?
Well, that's why we have the keyword `value`.
The keyword `value` holds the value that we're trying to set the property to.
Consequently, it's type must always be the same as the type of the property in question.

```{tip}
The type of the value referenced by the `value` keyword must always be the same as the type of the property in question.
```

In the above example we we're making use of the [expression-body syntax](expression-bodied-property-accessors) (`=>`) but we can also use curly braces and write multiple statements.
In the code below, for example, we're inserting a check before setting the value to ensure that it is greater than `0`.
If it's not, then we throw an exception.

```{code-cell}
class Circle
{
  private int radius;
  public int Radius
  {
    get => radius;
    set
    {
      if (value <= 0)
        throw new ArgumentException("Radius must be greater than 0.");
      radius = value;
    }
  }
}
```

```{code-cell}
:tags: [raises-exception]
Circle circle = new Circle ();
circle.Radius = 0;
```


(expression-bodied-property-accessors)=
### Expression-bodied members

In a previous chapter we discussed how the implementation of some class members can be written as single expressions following a fat-arrow (`=>`).
This allows us to omit curly braces and the `return` keyword.
The two implementations below are thus equivalent.

```{code-cell}
:tags: [hide-input]
class Circle
{
  private int radius;
  public int Radius
  {
    get => radius;
    set => radius = value;
  }
}
```

```{code-cell}
:tags: [hide-input]
class Circle
{
  private int radius;
  public int Radius
  {
    get
    {
      return radius;
    }
    set
    {
      radius = value;
    }
  }
}
```




### Computed/calculated properties

We mentioned that we can use "[guards](guards)" to, for example, throw an exception if, for example, an invoker tries to set our property to an invalid value.
Are what we call "guards" the only use case for inserting code in our getters and setters?
No, not at all.
We can also create properties that don't actually have a backing field at all, but simply are alternative ways to interact with other fields.

(guards)=
```{admonition} Terminology
"Guards" are, in programming, [conditionals](selection) that we execute before embarking on the "happy path" (meaning the thing that we actually want to do).
If a guard finds that something is wrong then we abort the happy path to for example return early, get or set some default, or throw an exception.
```

Think about the relationship between the idea of the radius and the diameter.
The relationship between these two is well defined.
The diameter is twice the radius, and the radius is half the diameter.
This should always and always be true.

Having one settable field for the diameter and one for the radius is therefore an accident waiting to happen.
Instead we can think of one of them as being a "computed" or "calculated" property of the other.

```{code-cell}
class Circle
{
  public double Radius { get; set; }
  public double Diameter
  {
    get => Radius * 2;
    set => Radius = value / 2;
  }
}
```

```{code-cell}
Circle circle = new Circle ();

// Setting diameter, then getting radius.
circle.Diameter = 20;
Console.WriteLine( circle.Radius );

// Setting radius, then getting diameter.
circle.Radius = 20;
Console.WriteLine( circle.Diameter );
```

If we `set` the `Diameter` then the `Radius` is set to half of what we tried to set the `Diameter` to.
If we `get` the `Diameter` then we get twice the `Radius`.

There is no "backing field" for the `Diameter` property.
Seen from the inside, `Diameter` is merely another way to interact with the `Radius` field.
Seen from the outside, we have no idea whether the circle actually stores the `Diameter`, the `Radius` or both.
This is the power of encapsulation.
We've hidden the implementation.

Is it possible to create an infinite loop like this?
Well yes, it is.
So we must be careful.
Have a look at the class below.
If we try to get or set one of its properties then it will cause a stack overflow.
Meaning, we will end up in an infinite loop until we crash.

```{code-cell}
class Loop
{
  public int Two
  {
    get => One;
    set => One = value;
  }
  public int One
  {
    get => Two;
    set => Two = value;
  }
}
```

Try it for yourself!




### Object initializers

Remember how we lost the ability to use object initializers when we replaced [public](access-modifiers) [instance fields](instance-fields) with [private](access-modifiers) instance fields and [instance methods](instance-methods)?
Remember how we said that we'll get them back?
Well, the time has come to get them back.

If you've got a `public` `set` accessor for your property then you can use object initialization syntax to set the value of the property upon instantiation.
This works irrespectively of whether your property is auto-implemented or manually implemented.
What matters is that you have a `public` `set` (or `init`, but more on that in a moment) accessor.

```{code-cell}
class Rectangle
{
  public double Width { private get; set; } = 1;
  public double Height { private get; set; } = 1;
  public double Area
  {
    get => Width * Height;
    set
    {
      Width = value / 2;
      Height = value / 2;
    }
  }
}
```

```{code-cell}
Rectangle r1 = new Rectangle { Width=20, Height=10 };
Rectangle r2 = new Rectangle { Area=100 };
```



### Init

We mentioned that you can choose between the `set` and `init` accessors if you don't want to make your property read-only.
The `init` accessor works like the `set` accessor except that it only allows you to set values upon instantiation.

```{code-cell}
class Circle
{
  // This is the property with an `init` accessor.
  public double Diameter { get; init; } = 1;

  public double Radius {
    get => Diameter / 2;
    init => Diameter = value * 2;
  }

  public Circle () { }

  public Circle (double diameter)
    => Diameter = diameter;
}
```

Practically, this means that you can assign values in an objcet initializer, in a constructor, or in an `init` accessor.
Notice for example how it's OK to set the default value on the property itself above.
Notice also how it's OK to set the value through another property's `init` accessor.
Notice also how it's OK to set the value through a constructor.
Finally, notice how, in the code below, it's OK to set the value through an object initializer:

```{code-cell}
Circle c1 = new Circle() { Diameter = 10 };
Circle c2 = new Circle() { Radius = 2 };
```

However, notice how we get a compiler-error if we try set a value through an `init` accessor *after* the object has been created.

```{code-cell}
:tags: [raises-exception]
new Circle().Diameter = 1;
```

```{code-cell}
:tags: [raises-exception]
new Circle().Radius = 1;
```

Notice how we get a compiler-error if we try to set a value through an `init` accessor from a `set` accessor.

```{code-cell}
:tags: [raises-exception]
class Circle
{
  // This is the property with an `init` accessor.
  public double Diameter { get; init; } = 1;

  // Notice how we use `set`, not `init` here.
  public double Radius {
    get => Diameter / 2;
    set => Diameter = value * 2;
  }
}
```




### Required

There's one final piece that we must talk about that makes C# properties really useful.
That is the keyword `required`.

The keyword `required` can be added before the type of a property.
If added, the class is impossible to instantiate without the property being set either via a constructor or an object initializer.

The `required` keyword thus makes it possible for us to keep using object initializer syntax instead of constructors without loosing our ability to guarantee that some set of arguments have been set upon instantiation of a class.

```{tip}
The `required` keyword requires C# 11 which means that you must be targeting at least .NET 7.
Please refer to [the documentation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/configure-language-version) for more information on what version of C# is used when targeting any given .NET version.
```

```{note}
The reason that the code examples below look visually different is that I haven't figured out how to switch to C# 11 in jupyter-book which I use to build this book. If you happen to know how to do that I'd really appreciate it if you would send me a ping.
```

```csharp
class Rectangle
{
  public required int Width { get; init; }
  public required int Height { get; init; }
}
```

Notice how we get a compiler error if we fail to initialize both the `Width` and `Height` properties upon instantiation.

```csharp
Rectangle r1 = new Rectangle() { Width=10 };
```

```output
error CS9035: Required member 'Rectangle.Height' must be set in the object initializer or attribute constructor.
```

If we however set both properties then it compiles and runs just fine.

```csharp
Rectangle r2 = new Rectangle() { Width=10, Height=5 };
```



### UML class diagrams

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



%## TODO: Examples


## Exercises

```{exercise}
What are properties?
```

```{exercise}
Sometimes we mark the setter of a property as `private` while the getter is `public`.
Why is this useful?
```

```{exercise}
What is a read-only property in C#?
What are they useful for?
```

```{exercise}
What is an `init` accessor in the context of C# properties?
What is it useful for?
```

```{exercise}
What is the `required` keyword in the context of C# properties?
What is it useful for?
```


```{exercise-start}
```
Assume that we have the following class.
```{code-cell}
class Circle
{
  private int diameter = 2;
  public int Diameter
  {
    get => Radius * 2;
    set => diameter = value;
  }
  public int Radius
  {
    get => Diameter / 2;
    set => Diameter = value * 2;
  }
}
```
Which of the following lines causes the program to crash at run-time?
Why does it crash?
```csharp
Circle circ = new Circle() { Diameter = 2 };
circ.Radius = 1;
Console.WriteLine(circ.Radius);
```
```{exercise-end}
```


```{exercise}
:label: ex:properties:square
Write a class called `Square` and give it the properties `Width`, `Height`, `Area`, `Circumference`, and `Side`.
All the properties should have `get` and `set` accessors.

Remember to make use of calculated properties to avoid allowing a `set` accessor put an object of type `Square` in a state which violates the rules of a square (namely that all sides are the same length).
```

```{exercise}
:label: ex:properties:equilateral-triangle
Write a class called `EquilateralTriangle` and give it the properties `Width`, `Height`, `Area`, `Circumference`, and `Side`.

When computing the width and height of a triangle, you can assume that one of the sides are perfectly parallel with the x-axis.

Remember to make use of calculated properties to avoid allowing a `set` accessor put an object of type `Square` in a state which violates the rules of a square (namely that all sides are the same length).
```

```{exercise}
Looking at the classes you wrote in {numref}`ex:properties:square` and {numref}`ex:properties:equilateral-triangle`.
If you were to replace some `set` accessors with `init` accessors, which would you replace and why?
```

```{exercise}
Looking at the classes you wrote in {numref}`ex:properties:square` and {numref}`ex:properties:equilateral-triangle`.
If you were to mark some properties as `required`, which would you mark and why?
```

