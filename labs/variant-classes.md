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

# Lab: Variant classes

## Objective

In this lab, we will deepen our understanding of variance in C# by exploring covariant return types in classes. We will practice implementing and using them, while also reflecting on the benefits of type-safety and the importance of maintaining a balance between flexibility and safety.

## Provided code

Carefully review the provided code. Notice the structure of the classes `Fruit` and `Apple` and their relationship. Similarly, observe how `FruitTree` and `AppleTree` are constructed and how the `GetFruit` method is overridden in `AppleTree` to return an instance of `Apple`.

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

The key takeaway here is the usage of covariant return types. The method `GetFruit` in the derived `AppleTree` class has a more derived return type (`Apple`) than the same method in its base class `FruitTree`.

## Instructions

### Step 1: Implement and Test Covariant Return Types

1. Create a new class called `Pear` which is derived from the `Fruit` class.
2. Create a new class called `PearTree` which is derived from the `FruitTree` class.
3. Override the `GetFruit` method in the `PearTree` class such that it returns an instance of the `Pear` class, showcasing the use of covariant return types.

After implementing the above, test your new classes:

```csharp
PearTree pearTree = new PearTree();

Pear pear = pearTree.GetFruit();
```

### Step 2: Reflect on the Benefits of Covariant Return Types

Given the previous steps, consider the benefits of using covariant return types. How does it improve type safety and the clarity of your code?

```{admonition} 🤔 Reflection
Think about the difference between using covariant return types and needing to downcast every time we want a specific derived type. What might be some potential issues if we had to constantly use explicit casting?
```

### Step 3: Understand the Limitations of Contravariant Parameter Types

Create a new class called `Banana` derived from `Fruit`. Also, create a class called `BananaMixer` that contains a method to juice a `Banana`.

Try to create another class, `FruitMixer`, derived from `BananaMixer`, and attempt to override the juicing method with a broader parameter (e.g., `Fruit`). Notice that C# will not allow this, as it does not support contravariant parameter types.

Reflect on the potential pitfalls of contravariant parameter types and how they might violate type safety.

## Conclusion

Variance is an essential concept in C#, offering flexibility without compromising type safety. By completing this lab exercise, we've gained a deeper understanding of how covariant return types are implemented and the benefits they offer in writing clear and robust code.

Happy coding! 🤓
