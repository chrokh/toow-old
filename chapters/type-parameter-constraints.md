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

# Type parameter constraints

In the realm of generic programming, one often encounters a challenge: the inability to make precise assumptions about the types passed as arguments. This lack of specificity often stands as a roadblock, limiting the range of problems that we can address using generics. Imagine trying to write a piece of code that should work with a broad set of types but simultaneously requires knowledge about certain properties or behaviors of these types. Sounds contradictory, right?

Enter 'type parameter constraints'. These constraints allow us to set boundaries on the kinds of types that can be used as type arguments, offering us a perfect blend of generality and specificity.

%more confident about the capabilities of the types we're dealing with, making our generic code both powerful and predictable.

%Through this chapter, you'll delve deeper into these constraints, understanding how to harness their capabilities to write robust and reusable generic code.

```{admonition} Key point
Type parameter constraints ensure that a type parameter in a generic class or method satisfies certain characteristics or inherits from a specific base type or interface.
```

Constraints are expressed using the `where` keyword. To add a constraint to a [generic *method*](generic-methods) we use the `where` keyword after the list of parameters.

```csharp
T MyGenericMethod<T>(T value) where T : constraint
{
    // ...
}
```

To add a constraint to a [generic *type*](generic-types) we use the `where` keyword after the type name:

```csharp
class MyGenericClass<T> where T : constraint
{
    // ...
}
```

You might ask yourself why we would want to use a generic type parameter constrained to an interface instead of just simply using that interface without generics. Let's illustrate this with an example. Games often involve a diverse range of items that characters can acquire, from weapons and potions to maps and keys. Let's say that all these items share some properties like a name and let's bundle that in the interface `IItem`.

```{code-cell}
public interface IItem
{
    string Name { get; }
}
```

Let's assume that we have some classes for types of items.

```{code-cell}
public class Weapon : IItem
{
    public string Name { get; set; }
    // ... other weapon-specific properties
}
```

```{code-cell}
public class Map : IItem
{
    public string Name { get; set; }
    // ... other map-specific properties
}
```

The idea is to have a separate inventory for each type of item (weapons, maps, potions, keys, etc.).
You can visually think of the inventory as a tabulated list where the player can switch between categories (e.g., weapons, potions) and then cycle through the items in the selected category.
However, since the code for each inventory (each tab) will essentially be the same we want to avoid duplicating code.

Let's first look at a solution that only uses [subtype polymorphism](subtype-polymorphism) and no generics.

```{code-cell}
public class Inventory
{
    private List<IItem> items = new List<IItem>();
    private int currentIndex = 0;

    public string CurrentName => CurrentItem.Name;
    public IItem CurrentItem => items[currentIndex];

    public void Add(IItem item)
        => items.Add(item);

    public void Next()
        => currentIndex = (currentIndex + 1) % items.Count;
}
```

When using the inventory, the problem without generics is the loss of type specificity. Retrieving items leads to ambiguity.

```{code-cell}
var inventory = new Inventory();
inventory.Add(new Weapon { Name = "Wooden Sword" });

IItem retrievedItem = inventory.CurrentItem;  // Type-information lost!
Weapon retrievedWeapon = (Weapon)retrievedItem;  // Downcasting needed!
```

To regain the lost type-information we have to use more advanced techniques like the [Visitor pattern](visitor-pattern) or resort to [downcasting](downcasting).

Let's now instead look at how we can solve this problem using generics with constraints.
Here's how we might write the inventory code as a [generic type](generic-types) using constraints.

```{code-cell}
public class Inventory<T> where T : IItem
{
    private List<T> items = new List<T>();
    private int currentIndex = 0;

    public string CurrentName => CurrentItem.Name;
    public T CurrentItem => items[currentIndex];

    public void Add(T item)
        => items.Add(item);

    public void Next()
        => currentIndex = (currentIndex + 1) % items.Count;
}
```

In the above code, we've now defined a generic type with a type parameter named `T` which is constrained to the interface `IITem`.
The constraint is the part that says `where T : IItem`.
This generic type allows us to retain type information as we add and extract objects from an inventory.

```{code-cell}
var weaponInventory = new Inventory<Weapon>();
weaponInventory.Add(new Weapon { Name = "Wooden Sword" });

Weapon retrievedWeapon = weaponInventory.CurrentItem;  // No type-information lost!
```

C# provides a versatile toolkit for adding constraints to your generics. Here are some of the different types of constraints that you can apply in C#:

- **Base class constraint**: The type argument must inherit from a particular class.
    - `where T : MyBaseClass`
- **Interface constraint**: The type argument must implement a specific interface.
    - `where T : ISomeInterface`
- **Reference type constraint**: The type argument must be a reference type.
    - `where T : class`
- **Reference type constraint**: The type argument must be a value type.
    - `where T : struct`
- **Constructor constraint**: The type argument must have a parameterless constructor, enabling you to create new instances within your generic class or method.
    - `where T : new()`

```{tip}
Type constraints grant a generic method or class more capabilities with the type parameter. For example, without the new() constraint, we wouldn't be able to create an instance of a type parameter `T` since there's no guarantee that `T` has a parameterless constructor.
```

You can apply multiple constraints to a single type parameter, but they must be specified in this order: class/struct, base class, interfaces, `new()`. To add multiple constraints, simply separate them with commas (`constraint1, constraint2, ...`).

In cases where you need to apply constraints on multiple type parameters, you can use multiple `where` clauses.

```csharp
public void SomeMethod<T1, T2>(T1 item1, T2 item2)
    where T1 : constraint1
    where T2 : constraint2
{
    // ...
}
```

By strategically using constraints, you bring more power to your generics. But it's crucial to apply these constraints only when necessary, as over-restricting can reduce the flexibility and reusability of your generic tools.

%``{tip}
%Avoid overcomplicating generic constraints. Combining multiple constraints might make your generic class or method too specific, defeating the purpose of using generics.
%``

In conclusion, type parameter constraints act as a bridge, melding the generality of generics with the specificity required in certain scenarios.
By using constraints we can write highly reusable methods and classes that do know some things about the types that they operate on but without over-generalizing and end up having to perform downcasting.

