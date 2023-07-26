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

# Downcasting

%We've learned that we can use an object of a subtype when an object of its supertype is expected.
%Why can we use a subtype when a supertype is expected, but not the other way around?
%Meaning, why can I give you an apple if you expect a fruit, but I cannot give you a fruit if you expect an apple?

%We've learned that a cat is an animal but that an animal isn't necessarily a cat. This is a straightforward concept when we think about it in the real world. Any cat can be seen as an animal, but not all animals can be seen as cats. This relationship is reflected in our code through the process of upcasting, where we can treat any Cat object as an Animal. But why does it work in this direction and not the other way around? The exploration of this question leads us to the concept of upcasting.

In the previous chapter we treated specific types as more general types. Specifically, we treated apples as fruit. We now turn our attention to the opposite operation, treating fruit as apples, known as downcasting.

While upcasting involves treating an instance of a subtype as an instance of a supertype, downcasting involves treating an instance of a supertype as an instance of a subtype. Unlike upcasting, downcasting is *not always safe* and is *not implicitly* done by the compiler. Why is that?

```{important}
Why can I give you an apple if you want a fruit, but I cannot give you a fruit if you want an apple?
```

Imagine a basket full of different kinds of fruits - apples, bananas, oranges, and more. If we pick up an apple, we can safely say it's a fruit. That's upcasting. We're generalizing the 'apple' to 'fruit', losing some specific information about the apple, but retaining what's common to all fruits.

Now, if we blindly reach into the basket and pick up a fruit, can we always be sure it's an apple? Definitely not - it could be a banana or an orange! This is the risk we run into with downcasting. We're trying to treat a general 'fruit' as a specific 'apple', but there's no guarantee that the fruit we have is an apple. Sometimes it might be, sometimes it might not. If we happened to pick up an apple, the downcast will succeed. If we happened to pick up something else, like a banana, the downcast will fail.

```{admonition} Key point
Downcasting can lead to run-time errors if the actual type of the object doesn't match the type you're trying to cast to. It's not always safe, unlike upcasting, and needs to be done explicitly.
```

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1131063698887282788/chrokh_oil_painting_of_bowl_of_different_fruits_d402de4e-b020-49df-89eb-f80b0769460b.png

Imagine a bowl of fruits. If I give you an apple from the bowl, then we can be sure that's it's a fruit. But if I blindly reach in and give you a fruit, then we can't be sure that it's an apple. Sometimes it will, and sometimes it won't.
%There are certain actions we can apply to all of them, such as eating. Think of this as the capabilities of the compile-time type. However, each specific fruit type allows for unique interactions, like peeling an apple or squeezing a lemon, which can be thought of as the hidden capabilities of the run-time type.
```

```{warning}
%, even though it might seem like a powerful tool to recover 'lost' type information.
Use downcasting sparingly and with great caution.
Most problems can be effectively solved without resorting to downcasting. The use of downcasting often signifies a design flaw in the application's architecture. In fact, nearly every piece of code that uses downcasting can be refactored or reimagined in a way that eliminates the need for downcasting altogether. This results in safer and more maintainable code. As we dive deeper into principles of good object-oriented design, you will discover patterns and practices that help us avoid unnecessary downcasting. Remember, just because a tool is available doesn't mean it's always the right tool for the job!
```

Consider the `IFruit`, `Apple`, and `Banana` example from the previous chapter:

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

We can upcast an `Apple` or a `Banana` to an `IFruit` without issue:

```{code-cell}
Apple apple = new Apple();
IFruit fruit = apple; // Upcasting
```

But what if we want to treat the `fruit` not just as any `IFruit`, but specifically as an `Apple`? This is where downcasting comes into play:

```{code-cell}
Apple appleAgain = (Apple)fruit; // Downcasting
```

With this downcast, we're telling the compiler to treat the `fruit` as an `Apple`. If the `fruit` actually turns out to be an instance of `Apple`, as it is in this case, then this operation succeeds at run-time and we can use `appleAgain` as an `Apple`.

However, if the `fruit` turns out to not be an instance of `Apple`, but of some other class implementing `IFruit`, this operation fails and causes a run-time error known as an `InvalidCastException`.

```csharp
IFruit fruit = new Banana();
Apple apple = (Apple)fruit;
```

```output
System.InvalidCastException: Unable to cast object of type 'Banana' to type 'Apple'.
```

The code above throws an `InvalidCastException` because the `fruit` in this case is actually a `Banana`, not an `Apple`, and can thus not be downcast to an `Apple`.

In both cases however, the code compiles successfully. It compiles because the compiler allows the downcast operation based on the compile-time types involved: `Apple` is a subtype of `IFruit`. However, at run-time, when the actual type of the object referenced by `fruit` turns out to be `Banana` rather than `Apple`, the downcast operation fails.

```{note}
There's a way to check an object's type before attempting to downcast it, known as [type testing](type-testing), which we'll discuss in a future chapter. For now, it's crucial to understand the risks involved in downcasting.
```

```{note}
Downcasting, as we've seen, can be risky. We are basically trying to regain type information that was intentionally lost through upcasting. This operation may fail at run-time, potentially causing an exception. However, there are safer ways to recover this lost type information without resorting to potentially hazardous downcasting. One of these is using design patterns specifically intended for dealing with such situations, like the [Visitor pattern](visitor-pattern).
The Visitor pattern is one such safer way. It allows us to perform operations on objects based on their actual type. This avoids the risk of run-time errors due to failed downcasting. We’ll discuss the Visitor pattern in more depth in a later chapter.
```

