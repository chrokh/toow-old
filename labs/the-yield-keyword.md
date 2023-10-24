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

# Lab: The `yield` keyword

## Objective

In this lab, we will delve into the practical applications of the `yield` keyword in C#. Our primary goal is to simplify and streamline the process of iterating over collections without the necessity of creating a class that implements the `IEnumerator<T>` interface.

## Provided code

Carefully review the provided code. Notice the classes `Inventory` and `InventoryEnumerator`. The `Inventory` class holds three items, while the `InventoryEnumerator` allows for iteration through the items in the inventory. This is done manually, by using an enumerator class. Iteration can be accomplished either with a `foreach` loop or by manually invoking the enumerator.

```{code-cell}
class Item
{
    public string Name { get; init; }
}

class Inventory : IEnumerable<Item>
{
    public Item Item1 { get; set; }
    public Item Item2 { get; set; }
    public Item Item3 { get; set; }

    public IEnumerator<Item> GetEnumerator()
        => new InventoryEnumerator(this);

    // Required for the non-generic interface
    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        => GetEnumerator();
}

class InventoryEnumerator : IEnumerator<Item>
{
    private Inventory inventory;
    private int currentIndex = -1;

    public InventoryEnumerator(Inventory inventory)
        => this.inventory = inventory;

    public Item Current {
        get => currentIndex switch {
            0 => inventory.Item1,
            1 => inventory.Item2,
            _ => inventory.Item3,
        };
    }

    // Required for the non-generic interface
    object System.Collections.IEnumerator.Current => Current;

    public bool MoveNext()
    {
        if (currentIndex < 2)
        {
            currentIndex++;
            return true;
        }
        return false;
    }

    public void Reset()
        => currentIndex = -1;

    public void Dispose() { }
}
```

```{code-cell}
Inventory inventory = new Inventory()
{
    Item1 = new Item() { Name = "Key" },
    Item2 = new Item() { Name = "Sword" },
    Item3 = new Item() { Name = "Map" }
};

// Iterating using foreach:
foreach (Item item in inventory)
    Console.WriteLine(item.Name);

// Iterating by manually using the enumerator:
IEnumerator<Item> enumerator = inventory.GetEnumerator();
while (enumerator.MoveNext())
    Console.WriteLine(enumerator.Current.Name);

```

## Instructions

### Step 1: Removing the InventoryEnumerator

The first step in our refactoring process is to get rid of the `InventoryEnumerator` class. Instead of manually defining the enumerator logic, we will leverage the power of the `yield` keyword.

1. Delete the entire `InventoryEnumerator` class.
2. In the `Inventory` class, modify the `GetEnumerator()` method to use the `yield` keyword to yield each item in the inventory.

```csharp
public IEnumerator<Item> GetEnumerator()
{
    if (Item1 != null) yield return Item1;
    if (Item2 != null) yield return Item2;
    if (Item3 != null) yield return Item3;
}
```

### Step 2: Run the program

With this simple change, we've eliminated the need for a separate enumerator class, and the logic for iterating over the items in the inventory has become much clearer.

Run the main program and check that you still get the same results.

```{admonition} 🤔 Reflection
How has the usage of the `yield` keyword simplified our code? Consider the pros and cons of this approach in comparison to the previous enumerator-based method.
```

```{note}
Notice how we didn't have to change anything in the main code since we're still following the `IEnumerable<T>` interface.
```

## Challenge

1. **Reverse enumeration:** Add a method called `GetReverseEnumerable()` in the `Inventory` class that returns the items in reverse order, utilizing the `yield` keyword. Use the method in the main program to make sure that it works as expected.
2. **Random enumeration:** Add a method called `GetRandomEnumerable()` in the `Inventory` class that returns the items but in random order, utilizing the `yield` keyword. Use the method in the main program to make sure that it works as expected.
3. **Local function with `yield`:** In the main program, write a local function with the signature `IEnumerable<int> MakeRange (int first, int last)`. Use the `yield` keyword to return an `IEnumerable<int>` that produces all numbers between `first` and `last`. When you're done, remember to call the method and try it to make sure that it behaves as expected.

```{admonition} 🤔 Reflection
How can the `yield` keyword enhance maintainability?
```

Happy coding!

