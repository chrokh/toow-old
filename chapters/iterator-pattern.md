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

# Iterator pattern

The Iterator pattern is one of the foundational design patterns that offers a sequential way to access elements of an iterable object without needing to expose the object's underlying data structure.
An iterable object is often also called an 'aggregate object' because it 'aggregates' values. Anything that can produce a sequence of values can be thought of as an iterable or aggregator.

The Iterator pattern decouples the client code from the iterable object's internal structure, allowing items to be navigated and accessed without providing direct access to the underlying representation.

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1143511292011876372/chrokh_simple_conveyor_belt_simple_illustration_12521e3d-8d7a-4bfe-bd26-e40b7ad07aca.png

Just like how items on a conveyor belt are presented one by one without need to know about the machine that feeds the belt, the Iterator pattern allows for sequential access without exposing the structure of the underlying collection.
```

```{admonition} Key points
- The Iterator pattern provides a unified way to access elements of an aggregate object without revealing its underlying representation.
- By decoupling the iteration logic from the underlying data structure, the iteration algorithm, the iterable object, and the client can change independently.
- With a standardized iterator interface, the same object can be traversed in multiple different ways and the same traversal algorithm can sometimes be used for multiple different objects.
```

## Intent

The primary goal of the Iterator pattern is to:

```{epigraph}
Provide a way to access the elements of an iterable object sequentially without exposing its underlying representation.

-- [Design Patterns: Elements of reusable object-oriented software](https://geni.us/PsXmo).
```

In simpler terms, the Iterator pattern allows us to traverse through a collection, an iterable, without needing to know the intricacies of how the collection is structured or stored.
This allows the iterable, and the iteration algorithm, to both change independently of the client that wants to iterate over it.

Without the iterator pattern, the intricacies of the underlying iterable would be scattered across the application everywhere where we want to iterate over the collection.
In other words, all clients would be [tightly coupled](coupling) to the iterable.

Consequently, every time we want to change the iterable or the way we iterate, that change would cascade and we might also have to make changes in every client that uses the iterable.
With the iterator pattern we encapsulate the iteration and can change the structure of the iterable and the iteration algorithm independently.

```{admonition} Video lecture
<iframe width="100%" height="315" src="https://www.youtube.com/embed/uNTNEfwYXhI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

## Structure

A typical implementation of the Iterator pattern comprises two primary components: the iterator and the iterable (which is sometimes called the 'aggregator').

```{figure} https://upload.wikimedia.org/wikipedia/commons/1/13/Iterator_UML_class_diagram.svg
:name: fig:iterator-pattern

UML class diagram of Iterator pattern. [[Source](https://en.wikipedia.org/wiki/Iterator_pattern#/media/File:Iterator_UML_class_diagram.svg)]
```
% TODO: When updating the figure we need to use the term Iterable not Aggregator. Double-check the text below.

In the UML class diagram {numref}`fig:iterator-pattern`, the structure can be broken down as follows:

- `Aggregator`: This is an interface that defines a method for creating an Iterator object. In some diagrams this interface called the `Iterable`.
- `ConcreteAggregator`: This class implements the `Iterable` interface and returns an instance of the `ConcreteIterator`. In some diagrams this class is called `ConcreteIterable`.
- `Iterator`: This interface defines the basic operations for moving to the next item, checking if the iteration is done, accessing the current item, resetting the iterator, and so forth. There are many flavors of iterators.
- `ConcreteIterator`: This class implements the `Iterator` interface, providing concrete implementations for the `Iterator` operations. The concrete iterator is usually coupled to a concrete aggregator that it iterates over.

## Example

Imagine a role-playing game where the main character possesses an `Inventory`. In the current version of the game, the character can carry three items at a time.
However, we're not sure if we would like to change that requirement in the future.
Items are things like weapons, tools, keys, maps, and potions.

We want to design our Inventory such that it's easy to switch or cycle between these items, making one item active at a time. Think of the 'active' item as the item that the character holds in her hands.

The Iterator pattern is a perfect match for this problem, but let's start without it first.
Here's a naive design that we might end up with if we didn't know about the Iterator pattern.

```{code-cell}
class Item
{
    public string Name { get; init; }
    // Other item properties and methods...
}
```

```{code-cell}
class Inventory
{
    public Item Item1 { get; set; }
    public Item Item2 { get; set; }
    public Item Item3 { get; set; }
    private int currentIndex = 0;

    public Item NextItem()
    {
        currentIndex = (currentIndex + 1) % 3;
        return currentIndex switch
        {
            0 => Item1,
            1 => Item2,
            _ => Item3,
        };
    }
}
```

In the current structure, we've hardcoded the inventory to hold three items and provided a mechanism to cycle through them. What's the downside?
As always, the culprit is coupling.

Imagine for example that we decide that we want to categorize different items into subtypes like weapons, tools, potions, maps, keys, etc.
Then imagine that we want to be able to cycle through all items in individual categories.
How can we solve that problem while also retaining the possibility to iterate through all items like we do now?
With the current design these new requirements are not trivial, but they should be.

The Iterator pattern provides a more general approach to cycling through items, without the character or whoever is using the `Inventory` having to know about the intricacies of the `Inventory`'s internal structure.

Let's refactor to use the Iterator pattern.
First, let's agree on an interface for what an iterator looks like.

```{code-cell}
interface IIterator<T>
{
    T Current { get; }
    bool MoveNext();
    void Reset();
}
```

Notice that the `MoveNext` method returns a `bool`. The returned value represents whether we have moved to another value when the method was called. Iterators in the Iterator pattern conventionally needs to be able to answer whether the iteration has been completed or not. This `bool` is one way of implementing that.

Then let's create an interface for things that can be iterated so that we know how to get iterators.

```{code-cell}
interface IIterable<T>
{
    public IIterator<T> CreateIterator();
}
```

We're using [generics](generics) so that our interfaces can be used irrespectively of what kind of items we've got aggregations of.

Let's now make our `Inventory` implement `IIterable<Item>` by returning an instance of a class that implements `IIterator<Item>` when we call the method `CreateIterator`.

```{code-cell}
// Concrete iterable
class Inventory : IIterable<Item>
{
    public Item Item1 { get; set; }
    public Item Item2 { get; set; }
    public Item Item3 { get; set; }

    public IIterator<Item> CreateIterator()
        => new InventoryIterator(this);
}

// Concrete iterator
class InventoryIterator : IIterator<Item>
{
    private Inventory inventory;
    private int currentIndex = 0;

    public InventoryIterator(Inventory inventory)
        => this.inventory = inventory;

    public Item Current
    {
        get => currentIndex switch
        {
            0 => inventory.Item1,
            1 => inventory.Item2,
            _ => inventory.Item3,
        };
    }

    public bool MoveNext()
    {
        if (currentIndex < 2)
        {
            currentIndex++;
            return true;
        } else
        {
            return false;
        }
    }

    public void Reset()
        => currentIndex = 0;
}
```

```{important}
Notice how the `Inventory` class is no longer responsible for *any* of the iteration.
```

That's the Iterator pattern in a nutshell. Let's now have a look at how to use these classes.

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
do
{
    Console.WriteLine(iterator.Current.Name);
} while (iterator.MoveNext());
```

```{seealso}
The Iterator pattern is arguably the precursor of the [`foreach` loop](iteration).
But more on that in the chapter on [the `IEnumerable` and `IEnumerator` interfaces](enumerables) which make up the native implementation of iterator pattern in C#.
```

## Infinite iterators

It would be entirely possible to have an iterator that always reports that there's another item available. Either because the number of elements is infinite or because it automatically starts over from the beginning when it reaches the end.

In our game example it's quite plausible to imagine that when the player presses the button bound to 'switching' the active item we would continuously cycle whatever items are in the inventory.
Meaning that when we reach the last item and then press the switch button again, we simply start over from the first.

```{seealso}
An iterator that never reaches its end is usually called an 'infinite list' or a 'stream'.
Infinite lists or streams are key components in lazily evaluated functional programming languages like Haskell and programming paradigms like functional reactive programming.
```

```{code-cell}
class CyclingInventoryIterator : IIterator<Item>
{
    private Inventory inventory;
    private int currentIndex = 0;

    public CyclingInventoryIterator(Inventory inventory)
        => this.inventory = inventory;

    public Item Current
    {
        get => currentIndex switch
        {
            0 => inventory.Item1,
            1 => inventory.Item2,
            _ => inventory.Item3,
        };
    }

    public bool MoveNext()
    {
        currentIndex = (currentIndex + 1) % 3;
        return true; // Always has next since we're 'cycling'.
    }

    public void Reset()
        => currentIndex = 0;
}
```

Since we've separated the iteration algorithm from the underlying iterable both of these ways of traversing the object can co-exist in the same code base.

```{code-cell}
void PrintNItems (int n, IIterator<Item> iterator)
{
    string result = "";
    for (int i=0; i<n; i++)
    {
        result += iterator.Current.Name + ". ";
        iterator.MoveNext();
    }
    Console.WriteLine(result);
}

PrintNItems(6, new InventoryIterator(inventory));
PrintNItems(6, new CyclingInventoryIterator(inventory));
```

Notice how we grab the first 6 items from the *same* iterable in both the examples above.
But since we're using *different iterators* we're getting *different* sequences.


## Alternative iterators

It's easy to imagine more complex iterators and iterator interfaces than the ones that we've defined.
When switching between active items in a game we might for example want the ability to move both left and right.
Let's redefine our generic iterator interface.

```{code-cell}
interface IIterator<T>
{
    bool MoveNext();
    bool MovePrev();
    T Current { get; }
}
```

An implementation of this interface for our `Inventory` might look something like this:

```{code-cell}
class InventoryIterator : IIterator<Item>
{
    private Inventory inventory;
    private int currentIndex = 0;

    public InventoryIterator(Inventory inventory)
        => this.inventory = inventory;

    public bool MoveNext ()
    {
        if (currentIndex < 2)
        {
            currentIndex++;
            return true;
        }
        else
        {
            return false;
        }
    }

    public bool MovePrev ()
    {
        if (currentIndex > 0)
        {
            currentIndex--;
            return true;
        }
        else
        {
            return false;
        }
    }

    public Item Current
    {
        get => currentIndex switch
        {
            0 => inventory.Item1,
            1 => inventory.Item2,
            _ => inventory.Item3,
        };
    }
}
```

With this iterator we can navigate back and forth between the different items one-by-one.

```{code-cell}
IIterator<Item> iterator = new InventoryIterator(inventory);

Console.WriteLine(iterator.Current.Name);

iterator.MoveNext();
Console.WriteLine(iterator.Current.Name);

iterator.MovePrev();
Console.WriteLine(iterator.Current.Name);
```

## Conclusion

The Iterator pattern brings about a systematic way of accessing the elements of an iterable object, promoting encapsulation and clean separation of responsibilities. It abstracts the details of accessing and traversing the collection elements from the clients.

While we touched upon a basic implementation here, the .NET framework provides a more comprehensive approach with its `IEnumerable` and `IEnumerator` interfaces. In an [upcoming chapter](enumerables) we'll dive deeper into these built-in interfaces and explore their capabilities in the context of the Iterator pattern.

