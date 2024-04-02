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

# Interfaces

Why is it that one screwdriver can be used to fasten so many different types of screws? The reason is that while the screws may be vastly different in size, purpose, and design, they all conform to the same 'interface' that the screwdriver expects—a specific drive style and size. A Phillips screwdriver can drive any Phillips screw, irrespective of the screw's other properties (such as length or head style).

The same principle applies to interfaces in object oriented programming. They help us write code that can operate on a wide range of objects, as long as they adhere to the same 'interface'.
This separation between interface and implementation has immense benefits. In the real world it means that we don't have to buy a new screwdriver every time we buy a new type of screw. In programming, it means improved reusability and flexibility.

```{figure} ../images/cover-interfaces.jpg

The same screwdriver can be used for completely different types of screws, so long as the drive style and size is the same. In programming terms, we would say that any given screw type is an implementation of a screw interface.
```

An interface in C# is a type that defines a contract. This contract can contain signatures of [methods](instance-methods) and [properties](manually-implemented-properties), as well as [events](events) and [indexers](indexers) which we'll talk about in later chapters.
The interface itself, however, does often not contain any implementation.
It often only defines what members a class that implements it should have. Just like a drive style and size only defines how a screw must interface with a screwdriver and vice versa.

```{important}
An interface usually defines *what* methods and properties a class must have, not *how* these should be implemented.
It usually defines the *what*, not the *how*.
%Interfaces are contracts. They define *what* a class can do, not *how* to do it.
```

```{important}
In modern versions of C#, an interface can define, so called, [default interface methods](default-interface-methods). These methods can actually have implementations, but we'll talk about that in a separate chapter. In this chapter we'll only discuss interfaces where the members have no implementation.
```

Let's explain this concept with an example. Imagine you're building a drawing application and you have different shapes, such as rectangles and ellipses. Every shape has a width and a height, but the calculation of the area is different for each shape. How can you define a common blueprint for all shapes while still allowing for their individual differences?

This is where interfaces come in handy. We could create an `IShape` interface with `Width`, `Height`, and `Area` properties. The `Area` property is defined differently based on the type of the shape, but every shape, regardless of its specific type, will have an `Area` property. Here's how we might define this interface:

```{code-cell}
interface IShape
{
    double Width { get; set; }
    double Height { get; set; }
    double Area { get; }
}
```

In the code above, `IShape` is an interface that declares that anyone implementing the interface must provide an implementation of three properties: `Width`, `Height`, and `Area`.
Let's look at what the implementation of the interface might be for the class `Rectangle`.

```{code-cell}
class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area => Width * Height;
}
```

Notice how we say `: IShape` after we declare the class's name.
This is where we claim to the compiler that the class in question implements the interface `IShape`.

Here's what the implementation of the interface might look for `Ellipse`?

```{code-cell}
class Ellipse : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area
        => Math.PI * Width / 2 * Height / 2;
}
```

With this setup, Rectangle and Ellipse both follow the `IShape` interface. They promise to have a `Width`, a `Height`, and an `Area` property. However, the calculation of the `Area` differs depending on whether the shape is a rectangle or an ellipse. Each class provides its own implementation for how to calculate the `Area` based on its particular rules.

When we claim that a class implements an interface the compiler will raise an error if the type does not.
This can be seen below:

```{code-cell}
:tags: [raises-exception]
class Triangle : IShape
{
}
```

In the example above, we cannot compile the code until we make the class `Triangle` implement all members of the interface `IShape`.

The true power of interfaces lies in that they enable, so called, subtype polymorphism. This means that we can declare a variable of an interface type, and then assign it an object of any class that implements the interface. Given the types above, this means that we can assign objects of type `Rectangle` or `Ellipse` to a variable who's type is `IShape`.

```{code-cell}
IShape shape1 = new Rectangle();
IShape shape2 = new Ellipse();
```

This is a powerful aspect of using interfaces and an essential principle of object-oriented programming. However, we will delve into more detail on this in the chapter [subtype polymorphism](subtype-polymorphism).

```{note}
In C#, it's common practice to prefix the names of interfaces with a capital "I". This is a widely accepted naming convention that helps to instantly differentiate between interfaces and classes when reading the code. For instance, an interface for abilities might be named `IAbilities`, while a class implementing this interface might be named `FlyAbility`.
%This naming scheme isn't enforced by the C# language rules, but following such conventions promotes readability and clarity in your codebase.
```

Let's look at one more example. Imagine a game where our player characters and our enemy AI characters to be able to take damage, even though their implementations might differ. In object oriented programming, we can use interfaces to solve this problem. A contract of sorts that any class can sign and promise to fulfill.

Consider the following example:

```{code-cell}
public interface IDamageable
{
    void TakeDamage(int amount);
}
```

In the code above, `IDamageable` is an interface that declares a `TakeDamage` method. The interface states that any type that implements this interface must provide an implementation for this method.

Let's see an example:

```{code-cell}
public class Player : IDamageable
{
    private int health;

    public void TakeDamage(int amount)
    {
        health -= amount;
        Console.WriteLine("Player took damage. Current health: " + health);
    }
}
```

Here, the `Player` class implements the `IDamageable` interface and provides an implementation for the `TakeDamage` method. However, it's not only our player that can take damage. Let's create an enemy that can also take damage:

```{code-cell}
public class Enemy : IDamageable
{
    private int health;

    public void TakeDamage(int amount)
    {
        health -= amount / 2;
        Console.WriteLine("Enemy took limited damage. Current health: " + health);
    }
}
```

Both `Player` and `Enemy` classes implement the `IDamageable` interface but provide different implementations for the `TakeDamage` method. This exemplifies the core principle of interfaces: they allow us to guarantee that a class *will* have certain members without dictating *how* those members should be implemented.

```{note}
The term 'interface' is sometimes used in a broader sense. Then, it doesn't refer to the `interface` keyword in C#, but to the idea of a public 'interface' of an object or class. This 'interface' comprises the set of all public members (like methods, properties, and events) that a class provides. They form the 'contract' for interaction that other code can use to interact with objects of that class, without needing to know the details of how these members are implemented.

This usage of the term 'interface' emphasizes the principle of [encapsulation](encapsulation), a key concept in object-oriented programming where the internal state of an object is hidden, and only a specified set of public members are exposed for other objects to interact with.
In other words, we might talk about the 'interface' of a class, even though the class doesn't actually implement any `interface`.
```

In summary, interfaces are a potent tool for organizing our code and ensuring that our objects can guarantee certain behaviors, regardless of their specific class. They facilitate working with objects in a more flexible and generalized manner, making our code more robust and easier to manage. In the coming chapters you will see that we've only scratched the surface of the power of interfaces.

