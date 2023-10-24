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

# Solution: Variant generic delegates

```{code-cell}
class Fruit
{
    public string Color { get; set; }
}

class Apple : Fruit
{
}

delegate T Factory<T>();
delegate void Consumer<T>(T item);
```

## Step 1: Implement Covariance

1\. Define a method that returns an `Apple` object.

```{code-cell}
Apple CreateApple()
    => new Apple() { Color = "Green" };
```

2\. Assign this method to a `Factory<Apple>` delegate variable.

```{code-cell}
Factory<Apple> appleFactory = CreateApple;
```

3\. Without covariance, this assignment will not work:

```{code-cell}
:tags: [raises-exception]
Factory<Fruit> fruitFactory = appleFactory; // Error :(
```

4\. Update the `Factory<T>` delegate to support covariance by adding the `out` keyword.

```{code-cell}
delegate T Factory<out T>();
```

5\. Assign the `Factory<Apple>` variable to a `Factory<Fruit>` variable.

```{code-cell}
:tags: [remove-input]
Factory<Apple> appleFactory = CreateApple;
```

```{code-cell}
Factory<Fruit> fruitFactory = appleFactory; // No error :)
```

6\. Print the color of the fruit produced by the `Factory<Fruit>` delegate.

```{code-cell}
Console.WriteLine(fruitFactory().Color);
```

## Step 2: Implement Contravariance

1\. Define a method that consumes a `Fruit` object.

```{code-cell}
void ConsumeFruit(Fruit fruit)
    => Console.WriteLine($"Eating {fruit.Color} fruit.");
```

2\. Assign this method to a `Consumer<Fruit>` delegate variable.

```{code-cell}
Consumer<Fruit> fruitConsumer = ConsumeFruit;
```

3\. Without contravariance, this assignment will not work:

```{code-cell}
:tags: [raises-exception]
Consumer<Apple> appleConsumer = fruitConsumer; // Error :(
```

4\. Update the `Consumer<T>` delegate to support contravariance using the `in` keyword.

```{code-cell}
delegate void Consumer<in T>(T item);
```

5\. Assign the `Consumer<Fruit>` delegate to a `Consumer<Apple>` variable.

```{code-cell}
:tags: [remove-input]
Consumer<Fruit> fruitConsumer = ConsumeFruit;
```

```{code-cell}
Consumer<Apple> appleConsumer = fruitConsumer; // No error :)
```

6\. Pass an `Apple` object to the `Consumer<Apple>` delegate.

```{code-cell}
appleConsumer(new Apple { Color = "Yellow" });
```

## 🤔 Reflection

- Generic variance in delegates allows for greater flexibility while maintaining type safety. This is useful when working with a type hierarchy, where we want to use a method that works with a base type but pass a derived type or vice versa.
- In the real world we often find ourselves making use of variance when we pass lambdas to LINQ methods.

### Challenge 1: Variant generic delegates and LINQ

1\. Create a list of `Apple` objects.

```{code-cell}
List<Apple> apples = new List<Apple>
{
    new Apple { Color = "Yellow" },
    new Apple { Color = "Green" },
};
```

2\. Define a `Func<Fruit, string>` delegate.

```{code-cell}
Func<Fruit, string> fruitColor = fruit => fruit.Color;
```

3\. Use the delegate with the `Select` LINQ method.

```{code-cell}
foreach(string name in apples.Select(fruitColor))
    Console.WriteLine(name);
```

Notice how we can pass a delegate that expects a `Fruit` to a method that works with `Apple`.

## 🤔 Reflection

Variance in built-in generic delegates like `Func`, `Action`, and `Predicate` is beneficial when using LINQ or when trying to achieve greater code reuse by defining methods that operate on base types and can still accept/return derived types.

### Challenge 2: Multiple Levels of Hierarchy

1\. Create a `GrannySmith` class:

```{code-cell}
class GrannySmith : Apple { }
```

2\. Using covariance:

```{code-cell}
GrannySmith CreateGrannySmith()
    => new GrannySmith { Color = "Green" };

Factory<GrannySmith> grannySmithFactory = CreateGrannySmith;

Factory<Apple> appleFactoryFromGrannySmith = grannySmithFactory;

Factory<Fruit> fruitFactoryFromGrannySmith = grannySmithFactory;
```

3\. Using contravariance:

```{code-cell}
Consumer<Fruit> fruitConsumer = ConsumeFruit;

Consumer<Apple> appleConsumerFromFruit = fruitConsumer;

Consumer<GrannySmith> grannySmithConsumerFromFruit = fruitConsumer;
```


