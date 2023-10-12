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

# Variant classes

When we delved into [covariance](covariance), [contravariance](contravariance), and [invariance](invariance), we learnt about the flexibility of type relations, especially when working with generic types. Now, we turn our attention to how these concepts apply to [classes](classes).

```{admonition} Key points
- C# supports covariant return types.
- C# does not support contravariant parameter types.
```

## Covariant Return Types

In many object-oriented languages, when you [override](overriding) a method, the return type of the overridden method should match the return type of the base method. However, C# has added more flexibility by allowing return types to be [covariant](covariance). This means that an overridden method in a derived class can have a **more derived return type** than the method in the base class.

Consider the following classes.

```{code-cell}
class Fruit { }
```

```{code-cell}
class Apple : Fruit { }
```

```{code-cell}
class FruitTree
{
    public virtual Fruit GetFruit()
        => new Fruit();
}
```

```{code-cell}
class AppleTree : FruitTree
{
    public override Apple GetFruit()
        => new Apple();
}
```

In the above example, the `Apple` class is derived from the `Fruit` class. Similarly, the `AppleTree` class is derived from the `FruitTree` class.

While the `GetFruit` method in the `FruitTree` class returns objects of type `Fruit`, the overridden `GetFruit` method in the `AppleTree` class returns objects of type `Apple` which is a more derived type.

```{important}
C# supports covariant return types.
```

### Benefits

What might the benefit of this be?
Covariant return types help us avoid loosing type-information.
When we have an `AppleTree` and ask it for a `Fruit`, the compiler will know that we won't get any old `Fruit` but rather precisely an `Apple`.
Consider the code below.

```{code-cell}
AppleTree tree = new AppleTree();
Apple apple = tree.GetFruit();
```

The code compiles and runs as expected. However, had we not used a covariant return type, we would not have been able to extract an `Apple` from the tree without downcasting. Compare the example above with the one below.

```{code-cell}
class InvariantAppleTree : FruitTree
{
    public override Fruit GetFruit()
        => new Apple();
}
```

```{code-cell}
:tags: [raises-exception]
InvariantAppleTree tree = new InvariantAppleTree();
Apple apple = tree.GetFruit();
```

```{tip}
Covariant return types enhance type safety. When working with derived classes, you can be more specific about what you return, preventing unexpected behaviors and potential issues down the line.
```

## Contravariant Parameter Types

Contravariance is when you can use a less derived (or "broader") type instead of a more derived (or "narrower") type. However, when it comes to method parameters in C#, contravariance isn't supported. This means that if you override a method in a derived class, the parameter types of the overridden method must match exactly the parameter types of the method in the base class.

Let's however entertain a hypothetical example of what this might have looked like if C# would have supported contravariant parameter types.

```{code-cell}
class AppleJuicer
{
    public virtual void Juice(Apple apple)
        => Console.WriteLine("Juicing the apple.");
}
```

```{code-cell}
:tags: [raises-exception]
class FruitJuicer : AppleJuicer
{
    // This won't compile!
    public override void Juice(Fruit fruit)
        => Console.WriteLine("Juicing the fruit.");
}
```

The `Juice` method in the `FruitJuicer` class overrides the `Juice` method in the `AppleJuicer` class and accepts a less derived parameter type. However, since C# does not support contravariant parameters in classes, this code does not compile.

```{tip}
When overriding methods in C#, the parameter types must match those of the overridden method.
```

## Covariant Parameter Types in Other Languages

Some programming languages permit *covariant parameter types*. This means that a derived class, can use a narrower parameter type compared to the same method in the base class.

For example, if a base class method accepts a parameter of type `Fruit`, the corresponding method in a derived class would be allowed to specify a narrower type like `Apple`.

```{code-cell}
class AppleJuicer
{
    public virtual void Juice(Fruit fruit)
        => Console.WriteLine("Juicing the fruit.");
}
```

```{code-cell}
:tags: [raises-exception]
class FruitJuicer : AppleJuicer
{
    // This won't compile and is not type-safe!
    public override void Juice(Apple apple)
        => Console.WriteLine("Juicing the apple.");
}
```

Here, the `PerformAction` method in `Dog` narrows down its parameter type to `Dog`, even though the corresponding method in `Animal` accepts any `Animal`.

```{attention}
This might seem flexible, but as we have learned in the chapter on the [Liskov Substitution Principle](liskov-substitution-principle), covariance in input will lead to a loss of static-type safety.
Languages with this feature are thus prone to run-time errors.
```

## Conclusion

Variance in programming is all about flexibility and type safety. While C# offers a certain level of flexibility with covariant return types, it does not support contravariant parameter types. Possibly as a consequence of not supporting multiple inheritance. As we continue to explore deeper concepts, always keep in mind the delicate balance between flexibility and safety that C# aims to achieve. It's all about writing robust and maintainable code.

