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

# Solution: Type parameter constraints

## Provided code

```{code-cell}
:tags: [hide-input]
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


## Step 1: Crafting the Generic Inventory

```{code-cell}
public class Inventory<T> where T : IItem
{
    private readonly List<T> items = new List<T>();
    private int currentIndex = -1;

    public T Current
    {
        get
        {
            if (currentIndex > 0 && currentIndex < items.Count)
                return items[currentIndex];
            else
                return default(T);
        }
    }

    public string CurrentName
    {
        get
        {
            if (currentIndex > 0 && currentIndex < items.Count)
                return items[currentIndex].Name;
            else
                return "";
        }
    }

    public void Add(T item)
        => items.Add(item);

    public bool Remove(T item)
        => items.Remove(item);

    public List<string> ItemNames()
    {
        List<string> names = new List<string>();
        foreach (T item in items)
            names.Add(item.Name);
        return names;
    }

    public void Next()
    {
        if (items.Count > 0)
            currentIndex = (currentIndex + 1) % items.Count;
    }

    public void Prev()
    {
        if (items.Count > 0)
            currentIndex = (currentIndex - 1 + items.Count) % items.Count;
    }
}
```

**Reflection**: The constraint ensures that only types implementing `IItem` can be used with `Inventory<T>`, guaranteeing that the common property `Name` will be available.


## Step 2: A Mixed Inventory

```{code-cell}
Inventory<IItem> mixedInventory = new Inventory<IItem>();

mixedInventory.Add(new Weapon { Name = "Sword" });
mixedInventory.Add(new Weapon { Name = "Bow" });
mixedInventory.Add(new Map { Name = "World Map" });
mixedInventory.Add(new Map { Name = "Dungeon Map" });

foreach (var name in mixedInventory.ItemNames())
    Console.WriteLine(name);

IItem item = mixedInventory.Current;

// We can't directly call Use() or Open() here since
// the type is IItem which doesn't define these methods.
// We need to downcast it to the specific type first.

// item.Use();  // Compilation error!
// item.Open(); // Compilation error!
```

**Reflection**: When using a mixed inventory, one cannot immediately use type-specific methods because the stored type is the general `IItem` interface which doesn't have the `Use()` or `Open()` methods.

## Step 3: Specific Inventories

```{code-cell}
Inventory<Weapon> weaponInventory = new Inventory<Weapon>();
weaponInventory.Add(new Weapon { Name = "Axe" });
weaponInventory.Add(new Weapon { Name = "Dagger" });

Inventory<Map> mapInventory = new Inventory<Map>();
mapInventory.Add(new Map { Name = "City Map" });
mapInventory.Add(new Map { Name = "Cave Map" });

// Since we know it's a Weapon, we can directly call Use()
weaponInventory.Next();
weaponInventory.Current.Use();

// Since we know it's a Map, we can directly call Open()
mapInventory.Next();
mapInventory.Current.Open();
```

**Reflection**: Having separate inventories ensures that one can directly access type-specific methods without casting, but it requires managing multiple inventories.

## Challenge

```{code-cell}
public class Key : IItem
{
    public string Name { get; set; }

    public void Unlock()
        => Console.WriteLine($"Unlocking with {Name}.");
}

// Usage in Main method:
var keyInventory = new Inventory<Key>();
keyInventory.AddItem(new Key { Name = "Golden Key" });
keyInventory.AddItem(new Key { Name = "Silver Key" });

foreach (var key in keyInventory.ItemNames())
{
    key.Unlock();
}
```

**Reflection**: Introducing a new item type doesn't affect the existing inventory system because of the flexibility provided by generic type constraints. The inventory can handle any new type that implements `IItem`, which ensures that the system can be extended smoothly.


