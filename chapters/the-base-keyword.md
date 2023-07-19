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

# The `base` keyword

When working within the realm of inheritance, there are moments when you might want to call a method from the superclass that has been [hidden](hiding) or [overridden](overriding) in the subclass. This is where the `base` keyword comes into play.

The `base` keyword is similar to the `this` keyword in that they both provide a way to access members of a class. However, while `this` is used to refer to the current instance of a class, `base` is used to refer to members of the superclass that have been overridden or hidden by the current subclass.

Let's look at an example featuring an `Animal` and a `Dog` class.

```{code-cell}
public class Animal
{
    public virtual void Speak()
        => Console.WriteLine("The animal makes a sound.");
}
```

```{code-cell}
public class Dog : Animal
{
    public override void Speak()
    {
        base.Speak();
        Console.WriteLine("The dog barks.");
    }
}
```

In this example, we override the `Speak` method in the `Dog` class. However, before we print `"The dog barks."`, we first call `base.Speak()`. The `base` keyword allows us to call the `Speak` method defined in the superclass `Animal`. Let's see what happens when we call `Speak` on a `Dog` object.

```{code-cell}
Dog dog = new Dog();
dog.Speak();
```

As you can see, `base.Speak()` executes the original `Speak` method from the `Animal` class, before executing the overridden version in `Dog`.

`base` can be used in a similar way with hidden methods:

```{code-cell}
public class Cat : Animal
{
    public new void Speak()
    {
        base.Speak();
        Console.WriteLine("The cat meows.");
    }
}
```

In this scenario, calling Speak on a `Cat` object would yield:

```{code-cell}
Cat cat = new Cat();
cat.Speak();
```

This demonstrates that even when a method is hidden, it can still be accessed through the `base` keyword within the subclass.

```{admonition} Key point
The base keyword allows a subclass to call a method in the superclass that it has overridden or hidden. It gives us a way to access the original method from the superclass, preserving its behavior while allowing further augmentation in the subclass.
```

In the next chapter, we will delve into constructor chaining where you'll see how the keywords `base` and `this` also can be used to access overloaded constructors within class hierarchies.

