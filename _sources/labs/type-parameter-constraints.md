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

## Lab: Type parameter constraints

### Objective

In this lab, we will harness the power of type parameter constraints to create a type-safe inventory management system that can handle distinct item types with their unique behaviors. We'll focus on implementing and extending a generic inventory, and then populating this inventory with various items and interacting with them.

### Provided code

Carefully review the provided code. We have a basic interface `IItem` and two implementations: `Weapon` and `Map`.

```{code-cell}
public interface IItem
{
    string Name { get; }
}

public class Weapon : IItem
{
    public string Name { get; set; }

    public void Use()
        => Console.WriteLine($"Using {Name}.");
}

public class Map : IItem
{
    public string Name { get; set; }

    public void Open()
        => Console.WriteLine($"Opening {Name}.");
}
```

We aim to further enrich this system by enhancing the functionalities of these items and ensuring our inventory can exploit these capabilities without losing type-specific details.


### Instructions

#### Step 1: Crafting the Generic Inventory

Your task is to design a generic inventory class `Inventory<T>`, where `T` is constrained to the interface `IItem`. This class should be able to:

- Add items to the inventory.
- Remove items from the inventory.
- Retrieve the currently selected item's name.
- Get a list of strings of the names of all items in the inventory.
- Navigate through items (with methods like `Next()` and `Prev()`).

```{important}
Remember to employ the `where` keyword to add the constraint.
```

```{admonition} 🤔 Reflection
Why do we need the constraint?
```


### Step 2: A Mixed Inventory

In the `Main` method, create an instance of `Inventory<IItem>`.
This inventory should be able to hold any item that implements the `IItem` interface.

1. Create a new inventory instance of type `Inventory<IItem>`.
2. Add a few objects of type `Weapon` and a few of type `Map` to this inventory.
3. Print the names of all items in the inventory by interacting with the inventory.

Now, here's where things get a little more challenging:

- Try to extract a specific item from the inventory. Once you have this item, attempt to call the `Use()` or `Open()` methods.

Did you encounter any issues? Why do you think this is the case?

```{admonition} 🤔 Reflection
Why are we not able directly call `Use()` or `Open()` on an extracted item from an `Inventory<IItem>`? What does this tell us about the advantages and limitations of subtype polymorphism?
```

#### Step 3: Specific Inventories

In the `Main` program.
Create inventories of type `Inventory<Weapon>` and `Inventory<Map>`.
Create multiple instances of `Weapon` and `Map` and add them to their respective inventories.

Move through these inventories using the `Next()` and `Prev()` methods, and for each item call `Use()` or `Open()` depending on from which inventory you got the item.

```{important}
Objects of type `Weapon` and objects of type `Map` should be stored in **different** inventory objects. So when we step through what's in our inventories, we have to step through two inventories.
```

```{admonition} 🤔 Reflection
What are the benefits of using separate inventories for the two types `Weapon` and `Map`? What are the downsides?
```


### Challenge

1. Introduce a new item type, `Key`. This should implement `IItem` and have a method `Unlock()` that prints "Unlocking with {Name}".
2. Create an inventory for keys, add a few keys to it, and iterate through it to unlock using the keys.

```{admonition} 🤔 Reflection
How did introducing a new item type impact our existing inventory system? How do type parameter constraints provide a framework to smoothly integrate new types into our application?
```

