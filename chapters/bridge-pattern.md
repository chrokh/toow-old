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

# Bridge pattern

The Strategy pattern provides us with a mechanism to encapsulate different behaviors, making them interchangeable. But as our systems grow in complexity, we often find ourselves dealing with multiple dimensions of variation.
%For instance, not only do we want to vary an algorithm, but also the very platform on which it runs. Enter the Bridge pattern.

Imagine you're designing a music player (like Spotify) which displays different media content (like songs, artists, albums, playlists) in various ways (like thumbnails on an overview page, list items in search, mobile, or desktop).
With the Bridge pattern, we decouple the media types from the way they can be displayed which means that they can evolve independently.

%https://discord.com/channels/@me/1118630713084870736/1142010037603139604
%https://cdn.discordapp.com/attachments/1118630713084870736/1142009820904423424/chrokh_illustration_of_shelf_with_camera_lenses_187443ae-0738-4420-ad29-8b1d46fb4efe.png
%https://cdn.discordapp.com/attachments/1118630713084870736/1142009820904423424/chrokh_illustration_of_shelf_with_camera_lenses_187443ae-0738-4420-ad29-8b1d46fb4efe.png
```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1143101907401965691/chrokh_camera_lenses_on_shelf_simple_illustration_9ec28b6c-aa76-420d-82cb-7df3b909ec0e.png

Just like you can pair any camera with any lens as long as they both follow the same interface, the Bridge pattern enables you to combine elements from two type hierarchies.
```

```{admonition} Video lecture
<iframe width="100%" height="315" src="https://www.youtube.com/embed/F1YQ7YRjttI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

%TODO: Strategy pattern as it should be used.

## Intent

The intent of the Bridge pattern is to:

```{epigraph}
Decouple an abstraction from its implementation so that the two can vary independently.

-- [Design Patterns: Elements of Reusable Object-Oriented Software](https://geni.us/PsXmo).
```

Essentially, the Bridge pattern separates the platform-general logic from the detailed, platform-specific functionality.

Another way to think about the Bridge pattern is as 'an abstraction using an abstraction', or two 'layers' of abstraction.
In [strategy pattern](strategy-pattern) we've got a concretion composed with an abstraction.
In Bridge pattern we have an abstraction composed with another abstraction.
If you recursively apply the Strategy pattern you'll end up with the Bridge pattern.

```{tip}
Bridge pattern is like a strategy (from the [Strategy pattern](strategy-pattern)) that also acts like a client for another family of strategies.
```


## Structure

As can be seen in {numref}`fig:bridge-pattern-original` the Bridge pattern comprises two abstraction hierarchies.

% TODO: Replace image.
```{figure} https://upload.wikimedia.org/wikipedia/commons/c/cf/Bridge_UML_class_diagram.svg
:name: fig:bridge-pattern-original
:height: 300px

UML class diagram of bridge pattern.
*[Image will be replaced soon]* [[Image source](https://en.wikipedia.org/wiki/File:Bridge_UML_class_diagram.svg)]
```

1. The abstraction on the left is usually an [abstract class](abstract-classes) with a reference to an instance whose type is that of the abstraction on the right. It usually defines some default operations that make use of the instance. The hierarchy on the left is sometimes called 'the platform-independent'.
2. The abstraction on the right is either an [abstract class](abstract-classes) or an [interface](interfaces) which defines the methods that the operations in the abstraction on the left calls. The hierarchy on the right is sometimes called 'the platform-dependent'.

By delegating responsibility from the abstraction on the left to the abstraction on the right, the two can evolve independently. It's like having a remote (on the left) for a TV set (on the right). The remote can change its design, buttons, or features, and as long as it communicates with the TV correctly, the TV's internals or brand can change without affecting the remote.

```{note}
The word 'bridge' in the name refers to how we create a 'bridge' between the hierarchy on the left and the hierarchy on the right.
```

## Variations

In the original conception of the Bridge pattern, given in the book [Design Patterns: Elements of Reusable Object-Oriented Software](https://geni.us/PsXmo), the first abstraction is composed with the second abstraction.
This is visualized in {numref}`fig:bridge-pattern-original` where we can see that the 'has-a' arrow goes from the left abstraction to the right abstraction.

These days however, the reference to the second abstraction is sometimes placed in concretions of the first abstraction.
This can be seen in {numref}`fig:bridge-pattern-modern` where the 'has-a' arrow goes from a concretion on the left to the abstraction on the right.

% TODO: IS THIS ACTUALLY A MODERN CONCEPTION OR IS IT DISCUSSED IN THE ORIGINAL BOOK TOO?

% TODO: Replace image.
```{figure} https://upload.wikimedia.org/wikipedia/commons/f/fd/W3sDesign_Bridge_Design_Pattern_UML.jpg
:name: fig:bridge-pattern-modern
:height: 300px

UML class diagram (left) of modern variation of Bridge pattern. [[Source](https://en.wikipedia.org/wiki/File:W3sDesign_Bridge_Design_Pattern_UML.jpg)]
```

In the original version, the first abstraction holds the reference to the second abstraction, which means that the second abstraction must remain the same.
In the modern variation, the concretions hold their own reference to the second abstraction which means that each concretion can choose whatever abstraction they wish.

The upside of the modern variation is flexibility.
Different concretions of the abstraction on the left can couple to different abstractions on the right.

The downside of the modern variation is that the abstraction on the left cannot write concrete implementations that work with the abstraction on the right since we don't know which abstraction will be used.
%Naturally, this also means that we cannot use constructor injection in the left abstraction to set up the composition since we don't know what abstraction to inject until we're in the concretions.

```{warning}
The modern and the classic variants of Bridge both have their pros and cons. Choose whatever is best suited for your scenario.
```

## Example

Let's dive into a simple example to clarify this.
Imagine that we need to draw different shapes (like circles and rectangles) in different colors (like red or blue).

Had we not known about the Bridge pattern we might have created a bunch of classes like `RedCircle`, `BlueCircle`, `RedRectangle`, `BlueRectangle`, and so forth.
The number of classes would exponentially increases each time we add a new subclass to either type hierarchy.
Luckily, we know that we can use the Bridge pattern so let's do that instead.

Let's start by defining the abstraction 'on the right' and some implementations of it.

```{code-cell}
interface IColor
{
    string Name { get; }
}
```

```{code-cell}
class RedColor : IColor
{
    public string Name { get; } = "Red";
}
```

```{code-cell}
class BlueColor : IColor
{
    public string Name { get; } = "Blue";
}
```

Then let's define the abstraction 'on the left' and some implementations of it.

```{code-cell}
abstract class Shape
{
    protected IColor color;

    public Shape(IColor color)
        => this.color = color;

    public abstract void Draw();
}
```

```{code-cell}
class Circle : Shape
{
    public Circle(IColor color) : base(color) {}

    public override void Draw()
        => Console.WriteLine($"Drawing a round, {color.Name}, perfect Circle.");
}
```

```{code-cell}
class Rectangle : Shape
{
    public Rectangle(IColor color) : base(color) {}

    public override void Draw()
        => Console.WriteLine($"Finding four corners and drawing {color.Name} lines between each of them.");
}
```

With our bridge set up we are finally ready to instantiate some objects of `Shape` and compose them with objects of `IColor`.

```{code-cell}
Shape redCircle = new Circle(new RedColor());
redCircle.Draw();
```

```{code-cell}
Shape blueRectangle = new Rectangle(new BlueColor());
blueRectangle.Draw();
```

Notice how the `Shape` class does not need to know the specifics of how colors are applied. It merely delegates the responsibility to the `IColor` interface. The Bridge pattern ensures that shapes and colors can change and evolve independently.


## The modern variant

To follow the modern variant of Bridge we could convert the shape abstraction into an interface and only leave the `Draw` method like this:

```{code-cell}
interface IShape
{
    void Draw();
}
```

This would make our shape implementations more flexible but they would also have to contain some more code since they then would have to be responsible for accepting and managing an `IColor`.

```{code-cell}
class Circle : IShape
{
    // The subtype now needs the field.
    private IColor color;

    // The subtype now needs to handle the dependency injection.
    public Circle(IColor color)
        => this.color = color;

    // The draw method remains the same.
    public void Draw()
        => Console.WriteLine($"Drawing a round, {color.Name}, perfect Circle.");
}
```

The benefit of this approach is that the first abstraction (`IShape`) isn't at all coupled to the second abstraction (`IColor`).
That coupling happens in the concretions of the first abstraction.
Consequently, implementations of `IShape` don't actually need to compose something of type `IColor` or anything at all for that matter.
The implementations are free to compose whatever other combination of objects they wish.
So, the interface `IShape` is more general than the abstract class `Shape` from the earlier example.

In the updated code we can, of course, still combine any shape with any color and pass the result around without users needing to worry about what concrete shape or color has been used.

```{code-cell}
IShape shape = new Circle(new RedColor());
shape.Draw();
```


## When to use

%The Bridge pattern is particularly useful when:
%
%You want to avoid permanent binding between an abstraction and its implementation.
%Both the abstractions and their implementations should be extensible by subclassing.
%Changes in the implementation of an abstraction should have no impact on clients; that is, their code should not need to be recompiled.
%You want to hide the implementation of an abstraction completely from clients.
%You have multiple varying dimensions in your code (e.g., platform and functionality) and you want to keep them separate and independent.

At this point you might be wondering if there aren't simpler approaches. Let's explore two common queries:

1. Can't we solve the same problem using [method overloading](method-overloading)? Can't we just have a bunch of methods with signatures like `void Draw(RedColor red, Circle circle)`?
Of course, but then we cannot call the method if we have objects of type `IColor` and `IShape`, which defats the purpose of using [subtype polymorphism](subtype-polymorphism) in the first place.
Then we can't pass around shapes without having to always worry about which particular subtype we have.
As soon as we [upcast](upcasting) a specific shape to its supertype we've lost type information and can't get back the specific subtype without using [downcasting](downcasting), [pattern matching](pattern-matching), or [Visitor pattern](visitor-pattern).

2. Ok, can't we then just have a single method with the signature `void Draw(IColor color, IShape shape)` then?
Well yes, but then the implementation of that method can only access what's in the public interface of `IColor` and `IShape`. The implementation cannot be specific to any of the subtypes of `IColor` and `IShape`.
Have a look at the code example and notice how the implementation of the `Draw` method in the two shapes are different.
When writing that implementation, we know which subtype of `IShape` we are in, but we do *not* know which subtype of `IColor` we have.

```{important}
%Bridge pattern allows us to write implementations for combinations of subtypes from two type hierarchies where the implementation can be *specific to subtypes from one of the hierarchies*.
The Bridge pattern allows us to create implementations tailored to combinations of subtypes from two type hierarchies. These implementations can access the specifics of subtypes from one hierarchy, but must use the general interface of objects from the other.
```

```{seealso}
If your implementation needs to be specific to subtypes from *both* hierarchies then you either need the [Visitor pattern](visitor-pattern) or [pattern matching](pattern-matching). Both of which we'll talk about later.
```

```{tip}
By 'nesting' the Bridge pattern, we can have an arbitrary number of layers of abstraction where the implementation at each layer can be specific to the subtype of the 'left' abstraction but not to the 'right'. Think: `new A(new B(new C()))`;
```

## Conclusion

%As systems become more complex, design patterns like Bridge become essential tools in a developer's toolkit. By understanding and effectively leveraging this pattern, we can ensure our architectures are scalable, maintainable, and adaptable to change.
Like the [Strategy pattern](strategy-pattern) emphasized the power of encapsulation and interchangeability, the Bridge pattern underscores the importance of decoupling and flexibility. In essence, while Strategy gives us one layer of abstraction (or axis of variation), Bridge gives us two.

