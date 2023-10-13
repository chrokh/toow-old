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

# Lab: Variant delegates

## Objective

In this lab exercise, we will dive deeper into the concept of variance in delegates. We aim to solidify our understanding of covariance and contravariance within the realm of delegates, empowering us to leverage this feature for more flexible and adaptable code.

## Provided code

Carefully review the provided code. Notice that we have two class definitions, `Fruit` and its derived class, `Apple`. We also have two delegate definitions, `FruitFactory` and `AppleProcessor`, which serve as our tools for understanding variance.

```{code-cell}
public class Fruit { }
```

```{code-cell}
public class Apple : Fruit { }
```

```{code-cell}
public delegate Fruit FruitFactory();
```

```{code-cell}
public delegate void AppleProcessor(Apple apple);
```

Recall that in the context of delegates, covariance allows for the return of a subtype, while contravariance permits input of a supertype.

## Instructions

### Step 1: Experiment with Covariance

Start by creating another derived class of `Fruit`, for example, `Banana`.

```{code-cell}
public class Banana : Fruit { }
```

Create a method `MakeBanana` that returns an object of type `Banana`.

```{code-cell}
public Banana MakeBanana()
    => new Banana();
```

Test the covariance principle by assigning the `MakeBanana` method to the `FruitFactory` delegate.

```{code-cell}
FruitFactory bananaFactory = MakeBanana;
```

```{admonition} 🤔 Reflection
Reflect on how covariance permits this kind of assignment. Why is this useful in certain scenarios?
Think about how this level of flexibility in method assignment can be beneficial in larger systems where different components may evolve separately.
```

### Step 2: Explore Contravariance

Define another method named `GeneralProcessor` that accepts a parameter of type `Object`, the base class for all C# types.

```{code-cell}
public void GeneralProcessor(object obj)
    => Console.WriteLine("Processing the object.");
```

Try assigning this `GeneralProcessor` method to the `AppleProcessor` delegate.

```{code-cell}
AppleProcessor objProcessor = GeneralProcessor;
```

Ponder on the contravariance principle that allows this kind of assignment. In what scenarios can this be advantageous?

```{admonition} 🤔 Reflection
Reflect on how allowing a more general input type can provide room for broader functionality without changing established interfaces or delegate definitions.
```

## Step 3: Understanding Delegate Variance Limitations

First, let's create a delegate specifically for making Bananas.

```{code-cell}
public delegate Banana BananaFactory();
```

Now, let's try to assign an instance of `BananaFactory` to `FruitFactory`.

```{code-cell}
:tags: [raises-exception]
BananaFactory bananaMaker = MakeBanana;
FruitFactory fruitMaker = bananaMaker;
```

You'll notice this does not compile. Even though `MakeBanana` can be assigned to a `FruitFactory` delegate (due to covariance on the return type), we cannot directly assign a `BananaFactory` delegate to a `FruitFactory` delegate.

This is because the variance applies to the method signatures that the delegates point to, not the delegate types themselves. When we talk about delegate variance, it is always with respect to the methods they can reference, not about assigning instances of one delegate type to another.

```{admonition} 🤔 Reflection
Consider the implications of this limitation. Why do you think the C# language designers made this decision? How does this ensure type safety while still providing flexibility?
```

By understanding this limitation, we can better appreciate the balance C# strikes between flexibility and type safety. This ensures that we always know the type of delegate we're working with, while still allowing us to leverage the power of variance in the methods the delegates reference.

## Challenge

Now that we've refactored and expanded our understanding of variant delegates, let's tackle a challenge.

Create a new derived class from `Apple`, perhaps called `GoldenApple`.

```{code-cell}
public class GoldenApple : Apple { }
```

Using the variance principles you've learned, assign a method that returns a `GoldenApple` to the `FruitFactory` delegate and a method that accepts a `Fruit` to the `AppleProcessor` delegate.

Reflect on the flexibility this offers, especially when considering larger systems with many interconnected components.

```{admonition} 🤔 Reflection
How can the concept of variance, when used appropriately, reduce the need for frequent changes in a system's architecture as new subclasses or functionalities are introduced?
```

## Conclusion

By the end of this lab, we should be more comfortable and familiar with the concept of variance in delegates, understanding its applications and benefits in C# programming.

Happy coding! 🤓

