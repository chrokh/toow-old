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

# Lab: Enumerables

## Objective

In this lab, we aim to refactor the given codebase which currently uses a manual implementation of the Iterator pattern. We will transition to using the more standard `IEnumerable<T>` and `IEnumerator<T>`. By doing so, we hope to introduce the power of standard collection interfaces in C# and promote the understanding of enumeration.

## Provided code

Carefully review the provided code. Notice that the current setup uses custom `IIterable<T>` and `IIterator<T>` interfaces to mimic the behavior of the built-in `IEnumerable<T>` and `IEnumerator<T>`. The `Inventory` class acts as a simple container for three items, and the corresponding `InventoryIterator` class provides an iteration mechanism over those items.

```{code-cell}
class Item
{
    public string Name { get; init; }
}

interface IIterator<T>
{
    T Current { get; }
    bool MoveNext();
    void Reset();
}

interface IIterable<T>
{
    IIterator<T> CreateIterator();
}


class InventoryIterator : IIterator<Item>
{
    private Inventory inventory;
    private int currentIndex = -1;

    public InventoryIterator(Inventory inventory)
        => this.inventory = inventory;

    public Item Current
    {
        get
        {
            if (currentIndex < 0 || currentIndex > 2)
                throw new InvalidOperationException("Iterator is out of bounds.");

            return currentIndex switch
            {
                0 => inventory.Item1,
                1 => inventory.Item2,
                _ => inventory.Item3,
            };
        }
    }

    public bool MoveNext()
    {
        if (currentIndex < 2)
        {
            currentIndex++;
            return true;
        }
        return false; // Can't move next if at end.
    }

    public void Reset()
        => currentIndex = -1;
}


class Inventory : IIterable<Item>
{
    public Item Item1 { get; set; }
    public Item Item2 { get; set; }
    public Item Item3 { get; set; }

    public IIterator<Item> CreateIterator()
        => new InventoryIterator(this);
}
```

```{code-cell}
// An example inventory.
Inventory inventory = new Inventory()
{
    Item1 = new Item() { Name = "Key" },
    Item2 = new Item() { Name = "Sword" },
    Item3 = new Item() { Name = "Map" }
};

// Create an iterator from the iterable.
IIterator<Item> iterator = inventory.CreateIterator();

// Loop through all items using the iterator.
while (iterator.MoveNext())
    Console.WriteLine(iterator.Current.Name);
```

This structure demonstrates the basics of an iterator pattern but lacks the flexibility and advantages of the built-in .NET interfaces.

## Instructions

### Step 1: Refactor to `IEnumerable<T>` and `IEnumerator<T>`

Firstly, let's replace `IIterable<T>` with `IEnumerable<T>` and `IIterator<T>` with `IEnumerator<T>`. This will involve:
- Updating the method names and properties to match those in the .NET interfaces.
- Modifying the `Inventory` class to implement `IEnumerable<Item>`.

### Step 2: Update Main

With the refactored interfaces in place, rewrite the loop logic. Firstly, using the `foreach` loop which is a direct advantage of implementing `IEnumerable<T>`. Later, try manually extracting the `IEnumerator<T>` and use the `while` loop.

Your code should look something like this:

```{code-cell}
:tags: [remove-input]
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

    public Item Current
    {
        get
        {
            if (currentIndex < 0 || currentIndex > 2)
                throw new InvalidOperationException("Iterator is out of bounds.");

            return currentIndex switch
            {
                0 => inventory.Item1,
                1 => inventory.Item2,
                _ => inventory.Item3,
            };
        }
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

    public void Dispose() { }  // Typically used to free resources. In this case, it's not necessary but still needs to be defined.
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

```{admonition} 🤔 Reflection
How does the usage of built-in .NET interfaces affect the readability and usability of the code?
```

## Challenge

Now that we've refactored our code, let's move from having three fixed items in our `Inventory` to a more flexible list of items. Implement a `List<Item>` inside the `Inventory` class. Adjust your `IEnumerator<T>` implementation to enumerate over this list.

1. Refactor the `Inventory` class to have a `List<Item>` property.
2. Update the `IEnumerator<T>` implementation (i.e., `InventoryIterator` unless you've renamed it) to iterate over the items in this list.
3. Add functionality to add items to the inventory.
4. Test by adding more than three items and ensure that the enumeration still works as expected.

```{admonition} 🤔 Reflection
How difficult would it have been to move to a list-based approach without the use of Iterator pattern or enumerables? Did we have to make any changes in the main program related to the actual iteration?
```

```{tip}
After completing the challenge, consider experimenting further with other LINQ methods or additional list operations. Leveraging the power of `IEnumerable<T>` offers a myriad of functionalities to manipulate and interact with collections in C#.
```


