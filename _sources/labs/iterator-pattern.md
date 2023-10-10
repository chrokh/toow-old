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

# Lab: Iterator pattern

## Objective

In this lab exercise, we will delve deeper into the Iterator pattern, examining its usefulness in object-oriented programming and exploring its practical application. Our goal is to refactor a simple game inventory system to make use of this design pattern, ensuring decoupling and flexibility in the inventory traversal mechanism.

## Provided Code

Carefully review the provided code. Notice the design of the `Inventory` class and how it manages its items. Recognize how the current approach directly exposes the internal structure of the inventory and presents limitations in terms of traversal flexibility.
Also notice how we have to explicitly access the internals of `Inventory` in order to iterate over it.

```{code-cell}
class Item
{
    public string Name { get; init; }
}
```

```{code-cell}
class Inventory
{
    public Item Item1 { get; set; }
    public Item Item2 { get; set; }
    public Item Item3 { get; set; }
}
```

```{code-cell}
// An example inventory.
Inventory inventory = new Inventory() {
    Item1 = new Item() { Name = "Key" },
    Item2 = new Item() { Name = "Sword" },
    Item3 = new Item() { Name = "Map" }
};

// Prepare for manual iteration.
// Couples to current structure of Inventory. 😰
List<Item> items = new() {
    inventory.Item1,
    inventory.Item2,
    inventory.Item3
};

// Iterate over the items.
foreach (Item item in items)
    Console.WriteLine(item.Name);
```


## Instructions

### Step 1: Define the Iterator and Iterable Interfaces

Before rewriting the `Inventory` class, we'll define our iterator and iterable interfaces. This will set the foundation for our rewriting efforts.

```{code-cell}
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
```

### Step 2: Implement the Iterator Pattern in Inventory

Rewrite the `Inventory` class so that it implements the `IIterable<Item>` interface. Create a new `InventoryIterator` class that implements the `IIterator<Item>` interface.

```csharp
:tags: [raises-exception, remove-output]
class InventoryIterator : IIterator<Item>
{
    // ...
}
```

```csharp
class Inventory : IIterable<Item>
{
    public Item Item1 { get; set; }
    public Item Item2 { get; set; }
    public Item Item3 { get; set; }

    public IIterator<Item> CreateIterator()
        => new InventoryIterator(this);
}
```


### Step 3: Test the New Design

Once the rewrite is complete, use the new design to traverse through the items in the inventory.

```{code-cell}
:tags: [remove-input]
class InventoryIterator : IIterator<Item>
{
    private Inventory inventory;
    private int currentIndex = -1;  // We start at -1 because the first call to MoveNext() should make the 0th item current.

    public InventoryIterator(Inventory inventory)
    {
        this.inventory = inventory;
    }

    public Item Current
    {
        get
        {
            if (currentIndex < 0 || currentIndex > 2)
            {
                throw new InvalidOperationException("Iterator is out of bounds.");
            }

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

        // If we're already at the end of the inventory, we can't move next.
        return false;
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
Inventory inventory = new Inventory() {
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

```{admonition} 🤔 Reflection
How does the refactored design provide better flexibility and maintainability than the original design? Think about how changes to the traversal mechanism or the inventory's internal structure might impact the rest of the code.
```


## Challenge

1. **Extended Iteration**: Create a `CyclingInventoryIterator` class that continuously cycles through the items in the inventory. Implement it in such a way that, after reaching the last item, the iteration starts over from the first. Test this new iterator by cycling through the items multiple times.

2. **Bidirectional Iteration**: Expand the `IIterator<T>` interface to support bidirectional iteration with a `MovePrev()` method. Refactor the `InventoryIterator` class to support this new method, allowing traversal in both forward and backward directions. Test the bidirectional iteration to ensure it works as expected.

```{admonition} 🤔 Reflection
How do these additional challenges further highlight the advantages of the Iterator pattern? How does the Iterator pattern promote the principle of single responsibility and decoupling in these scenarios?
```


Happy Coding!
