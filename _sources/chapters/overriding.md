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

# Overriding

%Object-oriented programming languages, such as C#, provide a powerful feature known as method overriding,
Method overriding allows a subclass to provide its unique implementation for a method already defined in its superclass. This is a form of subtype polymorphism that allows the subclass to inherit a behavior and then tailor it to its specific needs.

```{warning}
Don't confuse method overriding with [method overloading](instance-method-overloading).
```

To demonstrate, let's consider an `Animal` class with a `Speak` method:

```{code-cell}
public class Animal
{
    public virtual void Speak()
        => Console.WriteLine("The animal makes a sound.");
}
```

Notice how the `Speak` method is marked as `virtual`. This means that it can be overridden in any subclass.
Beyond that the method works just like any other method.

```{code-cell}
Animal animal = new Animal();
animal.Speak();
```

Now, let's define a `Dog` class that inherits from `Animal` and overrides the `Speak` method:

```{code-cell}
public class Dog : Animal
{
    public override void Speak()
        => Console.WriteLine("The dog barks.");
}
```

By marking the `Speak` method with the `override` keyword, we're signaling that this method is intended to replace the implementation of a method with the same signature in the superclass. Now, if we create a `Dog` object and call its `Speak` method, we'll see that it runs the implementation specified in `Dog` rather than `Animal`.

```{code-cell}
Dog dog = new Dog();
dog.Speak();
```

Even when the `Dog` object is stored in a variable of type `Animal`, the overridden `Speak` method of the `Dog` class is invoked:

```{code-cell}
Animal animal = new Dog();
animal.Speak();
```

This is because the run-time type of the object determines which implementation to call, not the compile-time type.
Since the run-time type of the object is `Dog` the run-time system dispatches to the `Dog`'s `Speak` method.

```{admonition} Remember
Which implementation is executed is *determined by the run-time type* and not the compile-time type. Return to the chapters on [dynamic dispatch](dynamic-dispatch) and [run-time types vs compile-time types](run-time-type-vs-compile-time-type) if this doesn't seem familiar.
```

However, not all methods are created equal, and not all of them can be overridden. Only methods marked with the `virtual` keyword in the superclass can be overridden in the subclass. If a method in the superclass is not declared as virtual, the subclass can't override it.

```{note}
In C# methods are not overridable by default.
This behavior varies from language to language. In Java we mark methods that cannot be overridden instead of those that can.
```

Furthermore, a method marked as `override` in a subclass is also `virtual` by default and can be further overridden in any subclasses of that subclass unless it is explicitly marked as `sealed`.

```{admonition} Key point
Method overriding allows a subclass to provide a specific implementation of a method that's already provided by its superclass. The overridden method is selected based on the run-time type of the object, not its compile-time type.
```

In the next chapter, we'll dive into 'Hiding', an approach that enables a subclass to obscure a superclass method without altering its original behavior when accessed through superclass references.

