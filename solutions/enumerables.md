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

# Solution: Enumerables

## Reflection 1

Using built-in .NET interfaces enhances the readability and usability of the code. It provides a standardized way to iterate over collections, making the code more familiar to developers acquainted with C#. Furthermore, it integrates seamlessly with other .NET features like LINQ, further enhancing code flexibility and maintainability.

## Challenge

1. Refactor the `Inventory` class to have a `List<Item>` property.

    ```csharp
    class Inventory : IEnumerable<Item>
    {
        private List<Item> items = new List<Item>();

        public void AddItem(Item item)
        {
            items.Add(item);
        }

        public IEnumerator<Item> GetEnumerator()
            => items.GetEnumerator();

        // Required for the non-generic interface
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
            => GetEnumerator();
    }
    ```

2. As the `Inventory` class now directly uses a `List<Item>`, we don't need a custom `InventoryEnumerator`. The built-in `List<T>` enumerator suffices.

3. The `AddItem` method lets you add items to the inventory.

4. Test the new code:

    ```csharp
    Inventory inventory = new Inventory();
    inventory.AddItem(new Item() { Name = "Key" });
    inventory.AddItem(new Item() { Name = "Sword" });
    inventory.AddItem(new Item() { Name = "Map" });
    inventory.AddItem(new Item() { Name = "Shield" });

    // Iterating using foreach:
    foreach (Item item in inventory)
        Console.WriteLine(item.Name);

    // Iterating by manually using the enumerator:
    IEnumerator<Item> enumerator = inventory.GetEnumerator();
    while (enumerator.MoveNext())
        Console.WriteLine(enumerator.Current.Name);
    ```

## Reflection 2

Moving to a list-based approach without the Iterator pattern or enumerables would have been cumbersome. It would require managing indices, handling out-of-bounds cases, and potentially rewriting a lot of the iteration logic if the underlying collection structure changed. With the current approach, the main program's iteration logic remains unchanged regardless of how the inventory storage or iteration is implemented. This separation of concerns is a primary advantage of the Iterator pattern.

```{tip}
By leveraging `IEnumerable<T>`, you can indeed experiment with LINQ methods like `.Where()`, `.Select()`, `.OrderBy()`, etc., providing powerful and concise ways to query and manipulate collections in C#.
```

