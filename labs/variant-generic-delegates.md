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

# Lab: Variant Generic Delegates

## Objective

In this lab exercise, we will delve deep into the concept of variant generic delegates in C#. Our goal is to understand and implement both covariance and contravariance in generic delegates. By the end of this lab, we should have a firm grasp of how to use the `in` and `out` keywords effectively with generic delegates to achieve type safety while maintaining flexibility.

## Provided code

Carefully review the provided code. Notice the class hierarchy and the initial delegates definitions.

```{code-cell}
class Fruit
{
    public string Color { get; set; }
}
```

```{code-cell}
class Apple : Fruit { }
```

```{code-cell}
delegate T Factory<T>();
delegate void Consumer<T>(T item);
```

## Instructions

### Step 1: Implement Covariance

1. Begin by defining a method that returns an `Apple` object.
2. Assign this method to a `Factory<Apple>` delegate variable.
3. Try to assign the `Factory<Apple>` variable to a `Factory<Fruit>` variable. Does it work?
4. Update the `Factory<T>` delegate to support covariance by adding the `out` keyword.
5. Now, assign the `Factory<Apple>` variable to a `Factory<Fruit>` variable.
6. Print the color of the fruit produced by the `Factory<Fruit>` delegate.

### Step 2: Implement Contravariance

1. Define a method that consumes a `Fruit` object, perhaps by simply printing its color.
2. Assign this method to a `Consumer<Fruit>` delegate variable.
3. Try to assign the `Consumer<Fruit>` delegate to a `Consumer<Apple>` variable. Does it work?
4. Update the `Consumer<T>` delegate to support contravariance using the `in` keyword.
5. Now, assign the `Consumer<Fruit>` delegate to a `Consumer<Apple>` variable.
6. Pass an `Apple` object with a specific variety to the `Consumer<Apple>` delegate and see how it's consumed.

```{admonition} 🤔 Reflection
Think about the benefits of having this kind of flexibility with generic delegates. Why might we want to assign a delegate of one type to a delegate of another type? In what real-world scenarios might this be useful?
```

## Challenge

### Challenge 1: Variant generic delegates and LINQ

As mentioned in the study material, built-in generic delegates such as `Func`, `Action`, and `Predicate` have variant parameters. Let's explore this:

1. Create a list of `Apple` objects.
2. Define a `Func<Fruit, string>` delegate that takes a `Fruit` and returns its color.
3. Use this delegate with the `Select` LINQ method on the list of apples to retrieve a list of apple colors. Notice how we can pass a delegate that expects a `Fruit` to a method that works with `Apple`.

```{admonition} 🤔 Reflection
Having gone through the challenge, can you think of other places in the .NET framework where such variance can be beneficial? How does this improve code reuse and adaptability?
```

### Challenge 2: Multiple Levels of Hierarchy

Consider we have another class `GrannySmith` that inherits from `Apple`. Can you showcase variance (both covariance and contravariance) using three levels of hierarchy: `Fruit`, `Apple`, and `GrannySmith`? Think about how you might define and use delegates in this context.

## Conclusion

We hope this lab exercise deepens your understanding of variant generic delegates in C#.

Happy coding! 🤓

