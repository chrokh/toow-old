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

# Solution: Variant delegates

## Step 1: Experiment with Covariance

```{code-cell}
class Fruit { }

class Banana : Fruit { }

Banana MakeBanana()
    => new Banana();

delegate Fruit FruitFactory();
```

```{code-cell}
FruitFactory bananaFactory = MakeBanana;
```

### 🤔 Reflection

- Covariance permits the return type of a delegate instance to be a derived type of the delegate's return type. In the above example, the method returns a `Banana` (a derived type) which can be assigned to a `FruitFactory` delegate variable that expects a method returning a `Fruit`.
- This flexibility is beneficial in systems where components can evolve separately, as one can introduce new subclasses without having to refactor the existing delegates.

## Step 2: Explore Contravariance

```{code-cell}
class Apple : Fruit { }

delegate void AppleProcessor(Apple apple);

void FruitProcessor(Fruit fruit)
    => Console.WriteLine("Processing the fruit.");
```

```{code-cell}
AppleProcessor appleProcessor = FruitProcessor;
```

### 🤔 Reflection

- Contravariance permits the input parameter type of a delegate instance to be a base type of the delegate's parameter type. Here, the method accepts an `object` which is a base type for all C# types and can be assigned to an `AppleProcessor` delegate that expects a method with an `Apple` parameter.
- Allowing a more general input type provides flexibility as methods can handle a variety of parameter types without changing the established delegate definitions, providing extensibility in systems.

## Step 3: Understanding Delegate Variance Limitations

```{code-cell}
delegate Banana BananaFactory();
```

```{code-cell}
:tags: [raises-exception]
BananaFactory bananaMaker = MakeBanana;
FruitFactory fruitMaker = bananaMaker; // Raises error.
```

### 🤔 Reflection

- The inability to assign instances of one delegate type to another ensures type safety. It prevents potential misuse or confusion while working with different delegate types.
- The language design ensures that while methods with different signatures can be referenced by a delegate due to variance, the delegate types themselves remain strictly typed.

## Challenge

```{code-cell}
class GoldenApple : Apple { }

GoldenApple MakeGoldenApple()
    => new GoldenApple();

void ProcessFruit(Fruit fruit)
    => Console.WriteLine("Processing the fruit.");

FruitFactory goldenAppleFactory = MakeGoldenApple;
AppleProcessor fruitProcessor = ProcessFruit;
```

### 🤔 Reflection

- Variance allows for adaptability in a system's design. When introducing new subclasses or functionalities, the need to refactor or modify existing delegate assignments is reduced, which enhances the maintainability and scalability of the system.
- In larger systems, using variance can help minimize changes in core components when expanding or updating functionalities, which can lead to more stable and modular architectures.

