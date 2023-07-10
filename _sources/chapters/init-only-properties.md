# Init-only properties

We often find ourselves needing to create properties that can be set during the initialization of an object but remain immutable afterwards.
For instance, consider a `Point` in a two-dimensional space. Once you've placed a point at some coordinate, you might not want it to move around.
%This is a common pattern when creating objects that represent some kind of value that shouldn't change after it's been created.

Traditionally in C#, to make properties immutable after an object is created, you would have to make them [read-only](read-only-properties) and then set them in a constructor. However, with the advent of the `init` keyword in C#, we can now create properties that can only be set at the time of object initialization and stay read-only thereafter.

```csharp
public class Point
{
    public int X { get; init; }
    public int Y { get; init; }
}
```

With this declaration, you can now set the `X` and `Y` properties when you create a new `Point`, but you *can't change them afterwards*.

```csharp
Point point = new Point { X = 5, Y = 10 };

point.X = 20;
```

```output
(3,1): error CS8852: Init-only property or indexer 'Point.X' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.
```

You might be wondering how `init` differs from `readonly`. While both keywords restrict you from modifying the value after initialization, the key difference is that readonly restricts the modification to the constructor only. In contrast, `init` allows the property to be set not only in the constructor but also in the object initializer.

Remember the `required` keyword from the previous chapter? It works hand-in-hand with `init`. When a property is marked as `required`, it ensures that the property must be given a value when the object is initialized.

```csharp
public class Point
{
    public required int X { get; init; }
    public required int Y { get; init; }
}
```

With this declaration, the compiler ensures that `X` and `Y` are given a value when a `Point` is created.
If we fail to initialize all `required` attributes, the code does not compile:

```csharp
Point point = new Point { X = 5 };
```

```output
(1,19): error CS9035: Required member 'Point.Y' must be set in the object initializer or attribute constructor. (CS9035)
```

But if we do set all `required` attributes then it does compile.

```csharp
Point point = new Point { X = 5, Y = 10 };
```

%The `init` keyword is a powerful addition to C#'s toolbox. It allows us to create immutable objects with very terse syntax without sacrificing the integrity of our objects.
The init keyword is a powerful addition to C#'s toolbox, allowing us to create immutable objects with minimal and simple syntax. By ensuring the integrity of our objects, it greatly enhances code safety while also contributing to the readability and maintainability of our codebase.

