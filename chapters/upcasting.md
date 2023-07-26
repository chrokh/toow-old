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

# Upcasting

In the chapter on [subtype polymorphism](subtype-polymorphism) we learned about substitutability and that an object of a subtype can be used where an object of its supertype is expected.
This means that an apple can be treated as a fruit, if we choose to forget about the characteristics that are specific to apples.
When we use an object of a subtype where its supertype is expected, we perform an implicit [type conversion](type-conversions) called "upcasting".

%We then learned that we can call members objects and let their implementations be determined at run-time, through a process known as [dynamic dispatch](dynamic-dispatch).

```{admonition} Key point
Upcasting is the process of [type converting](type-conversions) a derived class or interface implementation reference into a base class or interface reference. This conversion is always safe and is implicitly done by the compiler.
%Upcasting is the process of treating an instance of a derived class or an interface implementer as an instance of its base class or interface. This is always safe and is done implicitly in C#.
```

```{note}
Upcasting is implicit in many object oriented languages, including C#.
```

Let's look at an example.
Apples and bananas are both fruit.
We might model this as an interface called `IFruit` and two classes, called `Apple` and `Banana`, that both implement this interface.

```{code-cell}
interface IFruit
{
    void Eat();
}
```

```{code-cell}
class Apple : IFruit
{
    public void Eat()
        => Console.WriteLine("Eating an apple.");
}
```

```{code-cell}
class Banana : IFruit
{
    public void Eat()
        => Console.WriteLine("Eating a banana.");
}
```

Both `Apple` and `Banana` implement the `IFruit` interface, thus, they are also `IFruit`'s. If we want to treat an `Apple` or `Banana` simply as an `IFruit`, we perform upcasting.

```{code-cell}
Apple apple = new Apple();
IFruit fruit1 = apple; // Upcasting

IFruit fruit2 = new Banana(); // Upcasting
```

In the above code, the `Apple` and `Banana` objects are both upcast to `IFruit`. The compiler knows that an `Apple` and `Banana` are `IFruit`'s, so it compiles these assignment statements without any explicit casting.
Since upcasting always is safe, we can also be sure that this code won't throw an exception at run-time.

%The beauty of upcasting lies in its ability to enable us to write code that works with the general, shared behaviors of different types.
%As you might recall from the chapter on [run-time types and compile-time types](run-time-type-vs-compile-time-type) we can only access members of the compile-time type.
%After upcasting our `Apple` and `Banana` objects we can thus only access the `Eat` method, which is defined in the `IFruit` interface, not any methods specific to `Apple` or `Banana`.

%In essence, upcasting provides a way to look at objects through a simplified lens, focusing on their shared behaviors rather than their specific characteristics.
%This concept lays the foundation for more sophisticated interactions, which we will explore further.

While upcasting is performed implicitly by the compiler, we can still make it explicit if we choose to. Although it's unnecessary, and doesn't provide any additional safety or performance benefits, it could be used for clarity in code, to make it clear that we're aware that we are using a subtype in place of its supertype. Here is an example:

```{code-cell}
Apple apple = new Apple();
IFruit fruit = (IFruit) apple; // Explicit upcasting
```

%In this code, we have an `Apple` object, apple, which we explicitly upcast to an `IFruit` object, fruit, using the casting syntax (`IFruit`) apple.
The second statement is equivalent to `IFruit fruit = apple;` as both of these statements result in `fruit` being a reference to an `Apple` object, seen through the 'lens' of the `IFruit` interface.
%But the explicit version can signal to readers of the code that we are consciously treating an `Apple` as an `IFruit` here.

Take some time to experiment with upcasting and try it out with your own classes.
In the next chapter, we'll explore [downcasting](downcasting), which, in contrast to upcasting, is *not* implicit and *not safe*. Downcasting can be thought of as trying to reveal the hidden specifics.

