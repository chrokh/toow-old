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

# Inheritance

Inheritance, in object oriented languages, gives us two things:

1. **Code reuse**: It allows us to re-use code from the superclass in the subclass. We say that the subclass inherits the *members* of the superclass.
2. **Subtype polymorphism**: It makes the subclass substitutable for the superclass. We say that the subclass inherits the *type* of the superclass.

```{warning}
If you don't need **both** of these things, then **don't use inheritance**.
If you want code reuse, then use [composition](object-composition).
If you want [subtype polymorphism](subtype-polymorphism), then use [interfaces](interfaces).
```

```{note}
The terms 'parent class' and 'base class' are synonyms of the term 'superclass'.
The terms 'child class' and 'derived class' are synonyms of the term 'subclass'.
```

%In the realm of object-oriented programming, inheritance stands as a powerful tool to depict real-world relationships between entities and promote code reusability. However, it's not a one-size-fits-all solution. To understand its place, we first need to understand its dual nature: inheritance of both members and type.

%The primary motivation for inheritance is code reuse. Just like children inherit characteristics from their parents in real life, in OOP, a class (child) can inherit the members—properties, methods, and events—from another class (parent). This cuts down on code redundancy and makes the code easier to manage and update.

Inheritance is a binary relationship where one class inherits its members and type from another.
Consider the following example:

```{code-cell}
public class Animal
{
    public string Name { get; set; }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }
}
```

```{code-cell}
public class Dog : Animal
{
    public void Bark()
        => Console.WriteLine($"{Name} is barking.");
}
```

In the example above, `Dog` inherits from `Animal`.
`Dog` is the subclass and `Animal` is the superclass.
The property `Name` and the method `Eat` are both 'inherited' from `Animal`.
This means that we can access the members defined in `Animal` on objects of type `Dog`.

```{code-cell}
Dog dog = new Dog() { Name = "Fido" };
dog.Eat();
```

Notice how we can call the `Eat` method on a `Dog` even though it was defined in `Animal`. This is inheritance of members at display.

Of course, we can also access the members that are only defined in `Dog`.

```{code-cell}
dog.Bark();
```

However, inheritance also implies inheriting type. `Dog` doesn't just inherit `Animal`'s members, it also becomes a subtype of `Animal`. This enables subtype polymorphism. `Dog` can be treated as an `Animal` and used wherever an `Animal` is expected.

```{code-cell}
Animal animal = new Dog() { Name = "Rocky" };
animal.Eat();
```

However, since the method `Bark` is only defined in `Dog` and not `Animal` we can only call the `Bark` method when our compile-time type is `Dog`.

```{code-cell}
:tags: [raises-exception]
animal.Bark();
```

%The `Dog` then has has some own unique behavior with
%its and adding its unique behavior with the Bark method.
Since `Animal` is a class we can also of course also instantiate that.

```{code-cell}
Animal animal = new Animal() { Name = "Rocky" };
```

%But, this also ties `Dog` permanently to `Animal`, and changes in `Animal` might unintentionally affect `Dog`.

```{warning}
Inheritance is often touted as a mechanism to model real-world relationships. However, viewing real-world relationships as strictly hierarchical, as inheritance suggests, can lead to misunderstandings and overly complicated designs. The world around us is full of complex, cross-cutting relationships that cannot be easily encapsulated within a hierarchy.

Consider the statement "a dog is an animal". While this seems straightforward and easily modeled as a hierarchy (`Dog : Animal`), when we introduce additional facets of reality, like roles (e.g. a pet, a police dog, a stray dog), this hierarchical model quickly becomes convoluted. A dog can be a pet and a police dog at different times or even simultaneously, which doesn't neatly fit into an inheritance hierarchy.
%As we progress in our exploration of object-oriented design, remember to challenge the notion of inheritance as a mirror of real-world relationships. It's a tool in our toolbox, but like any tool, it has its place and is not a universal solution.
```

In later chapters we will discuss the [fragile base class problem](fragile-base-class-problem) and the maxim [prefer composition over inheritance](composition-over-inheritance). For now, just remember that if all you want is subtype polymorphism, it's better to use interfaces, which provide the contract for behavior without inheriting unwanted members or being tied to the parent's evolution.

```{note}
While a class can implement multiple interfaces, it can only inherit from a single class.
```

```{admonition} Key point
Inheritance allows a class to inherit the **members and type** of another class. Don't use inheritance unless you want both these things.


