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

# Subtype polymorphism

Have you ever considered how we naturally categorize things in our everyday lives? We see a dog and a cat and, while acknowledging their differences, we recognize that they both belong to a larger category, namely animals. We look at a collection of numbers and intuitively understand that each of them is an instance of a number, whether they are whole or decimal numbers.

```{important}
Subtype polymorphism is one of the most important ideas in object oriented programming.
```

This concept of generalization - grouping different things based on shared characteristics - is also prevalent in programming. In the world of object-oriented programming, this concept is known as 'subtype polymorphism.'

```{figure} ../images/cover-subtype-polymorphism-1.jpg

Just like different breeds of dogs all share the common type 'Dog', objects of different subtypes can  share a common supertype in subtype polymorphism.
```

%This principle is not just natural; it is also immensely practical. For example, a pet-sitter doesn't need to know whether your pet is a cat, dog, or parrot to perform their duties. The pet-sitter doesn't feed or care for your dog in a fundamentally different way than they would a cat. That's because a dog and a cat are both pets - they share certain behaviors and characteristics.

%This principle is not just theoretical; it has real-world applications. For instance, take the role of a delivery driver. Regardless of whether they're delivering a pizza, a package, or a bouquet of flowers, their core duties remain the same. The driver doesn't have to change their route or driving style depending on the object they're delivering. This is because each item - pizza, package, or flowers - shares the common characteristic of being deliverable. This demonstrates the practicality of subtype polymorphism.

This principle is not just natural; it's also extremely practical. Consider, for example, balls that bounce. Whether it's a basketball, a soccer ball, or a tennis ball, they all can be dropped and will all bounce. Each type of ball bounces differently due to its size and construction, but the essential characteristic remains the same: they can all be dropped and bounced.

In fact, the action of dropping the ball can be defined without any knowledge about which particular ball we are dropping. That's because they are all balls – they share certain behaviors and characteristics. Whether we call this shared characteristic being a ball, bounciness, or droppable doesn't matter. Unifying types with different behavior but a identical interface is what enables subtype polymorphism.

```{figure} ../images/cover-subtype-polymorphism-2.jpg

Just like different types of balls share the common characteristic of 'bounciness', objects of different subtypes can share a common behavior in subtype polymorphism.
```

In terms of terminology we call the more general type (like `Animal`) a 'supertype' and the more specific type a 'subtype'.

```{note}
The terms 'parent type' and 'base type' are synonyms of the term 'supertype'.
The terms 'child type' and 'derived type' are synonyms of the term 'subtype'.
```

Subtype polymorphism is a powerful concept because it allows us to write code that works with objects of the supertype, but it can also handle any subtype thereof. That's because objects of a subtype can be treated as objects of the supertype. This property is known as 'substitutability' - an object of a subtype can be substituted wherever an object of the supertype is expected. Substitutability, and its dangers, will be discussed in more detail in the chapter on [Liskov's Substitution Principle](liskov-substitution-principle).

So, how do we declare one type a subtype of another type? In object oriented languages, there are usually two ways of establishing a subtype relationship.

1. [Interface implementation](interfaces).
2. [Inheritance](inheritance).

If type `A` implements the interface defined by type `B` then `A` is considered a subtype of `B`. If type `A` inherits from the class or abstract class `B` then `A` is a subtype of `B`.
[Inheritance](inheritance) will be explored in future chapters, so let's use [interfaces](interfaces) for our examples.

Let's consider an example where we have an interface called `IShape` and two classes `Rectangle` and `Ellipse` that implement it.

```{code-cell}
:tags: [hide-input]
interface IShape
{
    double Width { get; set; }
    double Height { get; set; }
    double Area { get; }
}
```

```{code-cell}
:tags: [hide-input]
class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area => Width * Height;
}
```

```{code-cell}
:tags: [hide-input]
class Ellipse : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area
        => Math.PI * Width / 2 * Height / 2;
}
```

```{code-cell}
IShape shape1 = new Rectangle { Width = 10, Height = 5 };
IShape shape2 = new Ellipse { Width = 6, Height = 4 };
```

Here, `shape1` and `shape2` are variables of type `IShape`, but they hold instances of `Rectangle` and `Ellipse`, respectively. This is possible because `Rectangle` and `Ellipse` are subtypes of `IShape`. Even though the variables are of the supertype `IShape`, they can hold instances of any subtype.

%One of the strengths of subtype polymorphism is that it allows us to write more generic and reusable code.
The power of subtype polymorphism is truly realized when we perform operations on these objects.
Consider a simple local function called `Scale` that scales the width and height of any `IShape` by a given factor:

```{code-cell}
void Scale(IShape shape, double factor)
{
    shape.Width *= factor;
    shape.Height *= factor;
}
```

Note how `Scale` does not need to know anything about the specific type of `IShape` it is working with. It's not concerned with whether the shape is a `Rectangle` or an `Ellipse` or any other shape - all it cares about is that it has a Width and Height that it can scale.

We can now create a `Rectangle` and an `Ellipse`, and use `Scale` to adjust their sizes:

```{code-cell}
IShape shape1 = new Rectangle { Width = 10, Height = 5 };
IShape shape2 = new Ellipse { Width = 6, Height = 4 };

Scale(shape1, 2);
Scale(shape2, 2);
```

Regardless of the shape type, `Scale` works perfectly because of the subtype polymorphism offered by the `IShape` interface. Even though `shape1` is actually a `Rectangle` and `shape2` is an `Ellipse`, `Scale` can still operate on them because they are both `IShape`.

After scaling, we can then calculate and output their areas:

```{code-cell}
Console.WriteLine(shape1.Area);
Console.WriteLine(shape2.Area);
```

```{important}
Not only does the method `Scale` work for all current implementations of our interface `IShape`, but it will also work **for all future implementations** of the interface. We can keep adding new classes that implement the interface and the method will be able to operate on objects of these types without us having to write any additional code.
```

This illustrates the power and flexibility of subtype polymorphism. By treating different types as their common supertype, we can write more generic and reusable code.

```{note}
Subtype polymorphism is sometimes also called 'inclusion polymorphism'. This refers to the idea that from the perspective of set theory, subtype (like `Rectangle`) and a supertype (like `IShape`) can be thought of as a subset and a superset. This means that the superset 'includes' all members of the subset.
Practically, a variable of type `IShape` can contain objects of type `Rectangle` as well as objects of type `Ellipse`.
```

```{note}
The term 'polymorphism' comes from Greek, where 'poly' means many and 'morph' means form. So, polymorphism refers to the ability of something to take many forms.
When someone says 'polymorphism' in the context of object oriented programming then they are most likely referring to subtype polymorphism. There are however other forms of polymorphism such as [parametric polymorphism](generics).
```

By adopting subtype polymorphism, we can start developing more abstract and higher-level thinking in our programs, dealing with broad categories like 'shapes' or 'pets,' rather than getting caught in the specifics of rectangles, ovals, dogs, or cats. In later chapters, we'll explore how this principle can be applied even more extensively to design flexible and powerful object-oriented systems.

