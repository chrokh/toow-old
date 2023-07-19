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


# Hiding

In the last chapter, we discussed method overriding where a subclass provides a new implementation for a method that's already defined in its superclass. But what if we want to define a new method in the subclass that has the same name and signature as a method in the superclass, but isn't meant to override it? This is where 'hiding' comes into play.

%In the world of object-oriented programming, hiding is another concept that plays a significant role in managing complexity and promoting reuse. While the previous chapter, Overriding, allowed us to alter the behavior of a method from a superclass in a subclass, hiding allows us to define an entirely new method with the same name and signature in the subclass.

%In the previous chapter, we discussed method overriding, where a subclass provides a new implementation for a method that is already defined in its superclass. This allowed the subclass to tailor the behavior of the method to its needs, while maintaining the contract of the superclass. But what if we want to define a new method in the subclass that has the same name and signature as a method in the superclass, but is not meant to override it? This is where hiding comes into play.

Let's use animals and cats as an example.

```{code-cell}
public class Animal
{
    public void Speak()
        => Console.WriteLine("The animal makes a sound.");
}
```

```{code-cell}
public class Cat : Animal
{
    public new void Speak()
        => Console.WriteLine("The cat meows.");
}
```

In this example, the `Speak` method in `Cat` hides the `Speak` method in `Animal`. The keyword `new` signals that this method is intended to hide a method with the same signature in the superclass.

Now, if we create a `Cat` object and call its `Speak` method, we'll see that it, as you might expect, runs the implementation specified in `Cat` rather than `Animal`.

```{code-cell}
Cat dog = new Cat();
dog.Speak();
```

However, the story changes when we store a `Cat` object in a variable of type `Animal` and call the `Speak` method.

```{code-cell}
Animal animal = new Cat();
animal.Speak();
```

Unlike with overriding, **hiding does not replace the method in the superclass**. It merely provides a new method in the subclass that happens to have the same name and signature.

Which method gets called depends on the compile-time type, not the run-time type.
This is known as 'static dispatch'.
Hidden methods are in other words not [dynamically dispatched](dynamic-dispatch).

```{important}
In hiding, which implementation is executed is *determined by the compile-time type* and not the run-time type.
```

```{list-table} The selected implementation depends on the run-time type in the case of overriding and the compile-time type in the case of hiding.
:header-rows: 1
:name: tbl:inheritance:override

* - Compile-time type
  - Run-time type
  - Executed implementation (overriding)
  - Executed implementation (hiding)
* - Parent
  - Parent
  - Parent
  - Parent
* - Child
  - Child
  - Child
  - Child
* - Parent
  - Child
  - Child
  - Parent
```

```{admonition} Key point
Hiding allows a subclass to define a new method with the same name and signature as a method in the superclass. It provides a way to add a method that has the same name as a method from the superclass, but behaves differently and is unrelated to the superclass's method. The hidden method is selected based on the compile-time type of the object, not its run-time type.
```

In the next chapter, we will discuss the `base` keyword, which lets us call the superclass's version of a hidden or overridden method.
