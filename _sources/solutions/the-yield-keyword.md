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

# Solution: The `yield` keyword

## Step 2: Reflection

The `yield` keyword has simplified our code by abstracting the logic behind the iteration. Instead of manually managing indices and implementing multiple members of an enumerator class, we simply specify the order in which items are yielded.
The benefits include:

1. More concise and readable code.
2. Removes the need for a separate enumerator class.
3. Simplifies logic of returning items one-by-one.

## Challenge

1. **Reverse enumeration:**
```csharp
public IEnumerable<Item> GetReverseEnumerable()
{
    if (Item3 != null) yield return Item3;
    if (Item2 != null) yield return Item2;
    if (Item1 != null) yield return Item1;
}
```

2. **Random enumeration:**
```csharp
public IEnumerable<Item> GetRandomEnumerable()
{
    var items = new List<Item> { Item1, Item2, Item3 };
    var random = new Random();
    while (items.Count > 0)
    {
        int index = random.Next(items.Count);
        if (items[index] != null) yield return items[index];
        items.RemoveAt(index);
    }
}
```

3. **Local function with `yield`:**
```{code-cell}
IEnumerable<int> MakeRange(int first, int last)
{
    for (int i = first; i <= last; i++)
        yield return i;
}
```

```{code-cell}
foreach (var number in MakeRange(8, 10))
    Console.WriteLine(number);
```

## Reflection

The `yield` keyword can enhance maintainability by:
1. Reducing the amount of boilerplate code required for creating enumerators.
2. Making the logic for generating sequences more readable and direct.
3. Abstracting the complexities of manual iteration.

By providing a cleaner, more declarative way of expressing sequences, it's easier for developers to understand, modify, and extend the code.

