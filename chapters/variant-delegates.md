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

# Variant delegates

% Probably the simplest way to explain variance concretely.

Methods don't have to match the type of a delegate *exactly* in order to be considered members.
Like we learned in the chapter on [variance](variance), input types can be contravariant, and output types can be covariant.

This means that a delegate type that expects values of type `Cat` and produces values of type `Animal` also would consider a method that takes `Animal` (because of contravariance in input types) and produces values of type `Cat` (because of covariance in output types) a member of the type defined by the delegate.
Why does this work?
Well, because the method is a member of a subtype of the delegate.
Refer back to the chapter on the [Liskov substitution principle](liskov-substitution-principle) if this doesn't feel intuitive.

```{code-cell} csharp
class Animal {}                       // Supertype
class Cat : Animal {}                 // Subtype
delegate Animal MyDelegate (Cat cat); // Delegate type
Cat MyMethod (Animal a) => new Cat(); // Some method
MyDelegate op = MyMethod;             // Method is member of the delegate type
```

