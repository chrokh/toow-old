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

In C#, [variance](variance) can be thought of as the ability of one type to be implicitly converted to another type. For [delegates](delegates), this means that a delegate can represent methods that have a more specific (derived) input type or a more general (base) return type than specified by the delegate.

Remember that in object-oriented programming, [covariance](covariance) is about returning more derived types, while [contravariance](contravariance) is about accepting more general types.

```{admonition} Key point
Delegates in C# support variance, enabling them to reference methods with more derived parameter types or less derived return types than specified by the delegate type.
```

## Covariance

Covariance allows a method with a return type that is more derived than the delegate's return type to be assigned to the delegate. This means that it's possible for one to use delegates in a way that they can point to methods returning types that derive from the specified delegate's return type.

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
// A local function that return Apples.
public Apple MakeApple()
    => new Apple();

// Since delegates are covariant in output we can use the function that returns
// Apples even though we're expecting a function that returns Fruits.
FruitFactory factory = MakeApple;
```

In this example, `MakeApple` returns objects of type `Apple`, which is a subtype of `Fruit`. Since delegates are covariant in output, we can assign this function to the delegate variabel `factory` even though its type is `FruitFactory` which means that it must return objects of type `Fruit`.

## Contravariance

Contravariance permits a method with parameter types that are more general (base) than those of the delegate type to be assigned to the delegate. This means that it's possible for delegates to point to methods accepting parameters of types that are base types of the specified delegate parameter type.

```{code-cell}
public class Fruit { }
```

```{code-cell}
public class Apple : Fruit { }
```

```{code-cell}
public delegate void AppleProcessor(Apple apple);
```

```{code-cell}
// A local function that processes only Apples.
public void ProcessFruit(Fruit fruit)
    => Console.WriteLine("Processing the fruit.");

// Since delegates are contravariant in input, we can use the function that
// accepts Fruits even though we're expecting a function that accepts Apples.
AppleProcessor processor = ProcessFruit;
```

In this example, `ProcessFruit` accepts objects of type `Fruit` which is a supertype of `Apple`. Even though the delegate variable `processor` of type `AppleProcessor` expects a method that accepts objects of type `Apple`, we can still assign `ProcessFruit` to it. This is because delegates are contravariant in input, allowing us to use a less derived type than originally specified by the delegate.

## Conclusion

Variance in delegates empowers developers to write more adaptable code. By grasping the concepts of covariance and contravariance within the context of delegates, we're better equipped to craft robust systems that can gracefully handle ever-evolving requirements.

