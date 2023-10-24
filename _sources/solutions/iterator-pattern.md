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

# Solution: Iterator pattern

## Reflection 1

The refactored design offers several advantages:

1. **Encapsulation**: The details of the inventory traversal are encapsulated within the `InventoryIterator`. If the internal structure of the `Inventory` changes, we only need to adjust the iterator without affecting other parts of the code.

2. **Flexibility**: Multiple traversal mechanisms can be easily implemented by introducing new iterators without modifying the existing `Inventory` class.

3. **Decoupling**: The Iterator pattern ensures that the iteration logic is decoupled from the collection (i.e., `Inventory`). This adheres to the Single Responsibility Principle; each class has a clear, distinct responsibility.

## Challenge

1. **Extended Iteration**:

```csharp
class CyclingInventoryIterator : IIterator<Item>
{
    private Inventory inventory;
    private int currentIndex = -1;

    public CyclingInventoryIterator(Inventory inventory)
    {
        this.inventory = inventory;
    }

    public Item Current
    {
        get
        {
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
        currentIndex = (currentIndex + 1) % 3;
        return true;
    }

    public void Reset()
        => currentIndex = -1;
}
```

```csharp
// Create a cycling iterator from the iterable.
IIterator<Item> cyclingIterator = new CyclingInventoryIterator(inventory);

// Cycle through the items 10 times.
for (int i = 0; i < 10; i++)
{
    cyclingIterator.MoveNext();
    Console.WriteLine(cyclingIterator.Current.Name);
}
```

2. **Bidirectional Iteration**:

```csharp
interface IBidirectionalIterator<T> : IIterator<T>
{
    bool MovePrev();
}

class BidirectionalInventoryIterator : IBidirectionalIterator<Item>
{
    private Inventory inventory;
    private int currentIndex = -1;

    public BidirectionalInventoryIterator(Inventory inventory)
    {
        this.inventory = inventory;
    }

    public Item Current
    {
        get
        {
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
        return false;
    }

    public bool MovePrev()
    {
        if (currentIndex > 0)
        {
            currentIndex--;
            return true;
        }
        return false;
    }

    public void Reset()
        => currentIndex = -1;
}
```

```csharp
IIterator<Item> bidirectionalIterator = new BidirectionalInventoryIterator(inventory);

// Move forward.
while (bidirectionalIterator.MoveNext())
    Console.WriteLine(bidirectionalIterator.Current.Name);

// Move backward.
while (bidirectionalIterator.MovePrev())
    Console.WriteLine(bidirectionalIterator.Current.Name);
```

## Reflection 2

The extended challenges further highlight the Iterator pattern's advantages:

1. **Single Responsibility**: Each iterator (`InventoryIterator`, `CyclingInventoryIterator`, and `BidirectionalInventoryIterator`) handles its own iteration logic, ensuring that it adheres to the Single Responsibility Principle.

2. **Decoupling**: Even with new iteration functionalities, the `Inventory` class remains unchanged, showcasing the decoupling advantage of the Iterator pattern.

3. **Extensibility**: The Iterator pattern allows new iteration functionalities to be added without modifying existing code, thus promoting open/closed principle.

