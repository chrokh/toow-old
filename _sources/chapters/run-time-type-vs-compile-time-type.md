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

# Run-time type vs compile-time type

To understand why subtype polymorphism is important we must understand dynamic dispatch, but to understand dynamic dispatch we must first understand the difference between 'compile-time types' and 'run-time types'.
Let's take a closer look at these terms and why they are important.

%Understanding the difference between compile-time type and run-time type forms the foundation of grasping more complex object-oriented programming concepts like dynamic dispatch, upcasting, and downcasting.

In the simplest terms, the compile-time type of a variable is the type that the compiler recognizes when compiling your code. It restricts you to call only those methods and properties on the variable that belong to its compile-time type.
In contrast, the run-time type of a variable is the actual type of the object that the variable holds during the execution of the program.
%While you might declare a variable who's compile-time type is `Animal`, you might assign it an object of type `Cat`.

```{tip}
Run-time type is what it *actually* is, and compile-time type is what we *say* that it is.
```

%The compile-time type of a variable is the type the compiler sees.
%The run-time type is the type that the underlying object actually has.

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1132998420001468488/chrokh_tip_of_the_iceberg_c6300c74-9d94-4a05-952f-2b9968cb096f.png

The tip of the iceberg, above the water's surface, is like the compile-time type of an object -- what the compiler can 'see' and verify based on the declared type of a variable. However, beneath the surface lies the vast majority of the iceberg, unseen until run-time. This is like the run-time type of the object behind the variable - the actual type of the object in memory when the program is executed. While the compile-time type provides a limited view of the object, the run-time type reveals its full identity, much like the hidden depth of the iceberg beneath the water's surface.
```

%{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1131058647380787341/chrokh_vintage_science_poster_of_orange_8e2e6bdc-1aec-496c-bf00-fc0a3d95cba8.png
%
%An orange, like an object in programming, has multiple layers. The outer peel can be seen as the compile-time type: it defines what we can directly interact with. The inner flesh, hidden beneath the surface, represents the run-time type: what the object actually is and does.
%%the true nature of the object.
%%that can be revealed under certain circumstances.

%https://cdn.discordapp.com/attachments/1118630713084870736/1131072251815538738/chrokh_expressive_oil_painting_of_bowl_of_different_fruits_aae3e770-b1b0-463c-a386-e6631a225d30.png
%``{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1131063698887282788/chrokh_oil_painting_of_bowl_of_different_fruits_d402de4e-b020-49df-89eb-f80b0769460b.png

%Imagine a bowl of various fruits. There are certain actions we can apply to all of them, such as eating. Think of this as the capabilities of the compile-time type. However, each specific fruit type allows for unique interactions, like peeling an apple or squeezing a lemon, which can be thought of as the hidden capabilities of the run-time type.
%``

For instance, if you have a variable of type `IShape` holding a `Rectangle` object, you can only call the methods and properties declared in the `IShape` interface, even though the actual object (i.e., `Rectangle`) may have additional methods and properties.
We say that we 'treat' a `Rectangle` as an `IShape`.

%In contrast, the run-time type of a variable is the actual type of the object that the variable holds during the execution of the program. While the compile-time type is `IShape`, the run-time type is `Rectangle`, as it holds a `Rectangle` object.

Let's assume that `IShape` only demands that its implementors define a property with a getter called `Area` and that `Rectangle` defines `Area` but also `Width` and `Height`.

```{code-cell}
interface IShape
{
    double Area { get; }
}
```

```{code-cell}
class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public double Area => Width * Height;
}
```

Let's then declare a variable of type `IShape` but assign it an object of type `Rectangle`.

```{code-cell}
IShape shape = new Rectangle();
```

We can now compile code that calls the getter of `shape.Area`.

```{code-cell}
var x = shape.Area;
```

But we cannot compile code that calls `shape.Width`.
Because the compiler only knows that `IShape` contains a get-only property called `Area`.

```{code-cell}
:tags: [raises-exception]
shape.Width = 10;
```

%By declaring that `Cat` and `Dog` both implement the interface `IAnimal` we can use `IAnimal` as the compile-time type.
%Importantly we can call whatever methods and access whatever properties the type `IAnimal` declares.
%However, we can do this without having to care at all about which particular implementation of `IAnimal` we happen to get at run-time.
%As long as whatever members we're accessing are defined in `IAnimal` then we are guaranteed that these members will be available in all subtypes of `IAnimal`.

```{important}
What methods we *can* call is determined by the *compile-time type*.
```

%## Compile-time type

The compile-time type of a variable, as the name suggests, is the type that the compiler sees when it's compiling your program. It determines what methods and properties the compiler will allow you to call on that variable. If you attempt to use a method or property that isn't part of the compile-time type, you'll get a compilation error, even if the actual object at run-time would support that method or property.

The compile-time type of the variable `shape` is `IShape`. This means that you can only call the methods and properties declared in the `IShape` interface on `shape`, even though it might actually be holding a `Rectangle` object that has additional methods.

%## Run-Time Type

In contrast, the run-time type of a variable is the actual type of the object that the variable references at run-time. It can be the same as the compile-time type, but it can also be any [subtype](subtype-polymorphism) of the compile-time type.

Even though the compile-time type of shape is `IShape`, the run-time type is `Rectangle`. The shape variable is actually holding a `Rectangle` object at run-time.
This means that the actual implementation of the methods and properties that we invoke come from `Rectangle`. We'll talk more about this in the chapter on [dynamic dispatch](dynamic-dispatch).

```{important}
Which implementation of the method that is executed is determined by the *run-time type*.
```

There's a trade-off when treating a subtype as its supertype. On one hand, we lose access to the specialized behaviors and properties that the subtype offers, as our reference to the object is now limited to the more general features defined by the supertype. This is akin to focusing on the broader category of 'fruit' instead of the specific 'banana' or 'apple'.

On the other hand, we gain a form of flexibility: our code becomes capable of dealing with any subtype that shares this supertype. This generalization empowers us to write code that's more versatile and reusable, capable of working with a whole range of objects within the general 'fruit' category, rather than being tied to a single specific subtype. So, while we might not be able to access certain specific features, the ability to handle a broader variety of objects can often be a valuable advantage.

%The distinction between these two types is vital in object-oriented programming. To illustrate, you might sometimes want to use a `Rectangle` specific method on a `Rectangle` object that is being held by an `IShape` type variable. However, since the compile-time type of the variable is `IShape`, which doesn't declare the `Rectangle` specific method, the compiler wouldn't allow it. Here, you 'lose' access to some methods that are not part of the compile-time type, even though the actual object at run-time may support them.

```{admonition} Key point
The compile-time type of a variable determines what operations you can perform on the variable in your code, whereas the run-time type determines what actual operations occur when your code is executed.
```

In the future chapters on upcasting and downcasting, we will discuss how we can temporarily regain 'lost' information by using techniques like [downcasting](downcasting) or the [Visitor design pattern](visitor-pattern). But for now, it's essential to remember that the compile-time type restricts what methods and properties you can call in your code, and it's the run-time type that determines what actual methods get called when your code runs.

