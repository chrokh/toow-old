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

# Lab: Replace conditional with polymorphism

## Objective

To refactor the provided `Shape` class to remove conditionals and implement polymorphism, thereby enhancing code maintainability.

## Provided code

Study the starting code given to you. It consists of a single `Shape` class which draws different shapes based on the `ShapeType` using conditionals.

```{code-cell}
public enum ShapeType { HorizontalLine, Square, RightTriangle }
```

```{code-cell}
public class Shape
{
    ShapeType type;
    int size;
    string symbol;

    public Shape(ShapeType type, int size, string symbol)
    {
        this.symbol = symbol;
        this.type = type;
        this.size = size;
    }

    public string Draw()
    {
        if (type == ShapeType.HorizontalLine)
            return draw(MakeHorizontalLine());
        else if (type == ShapeType.Square)
            return draw(MakeSquare());
        else if (type == ShapeType.RightTriangle)
            return draw(MakeRightTriangle());
        else
            return "";
    }


    private string draw(string[][] symbols)
    {
        string lines = "";
        for (int i = 0; i < symbols.Length; i++)
        {
            string line = "";
            for (int j = 0; j < symbols[i].Length; j++)
            {
                line += symbols[i][j];
            }
            lines += line + "\n";
        }
        return lines;
    }

    private string[][] MakeHorizontalLine()
    {
        string[][] symbols = new string[1][];
        symbols[0] = new string[size];
        for (int i = 0; i < size; i++)
            symbols[0][i] = symbol;
        return symbols;
    }


    private string[][] MakeSquare()
    {
        string[][] symbols = new string[size][];
        for (int i = 0; i < size; i++)
        {
            symbols[i] = new string[size];
            for (int j = 0; j < size; j++)
                symbols[i][j] = symbol;
        }
        return symbols;
    }

    private string[][] MakeRightTriangle()
    {
        string[][] symbols = new string[size][];
        for (int i = 0; i < size; i++)
        {
            symbols[i] = new string[i + 1];
            for (int j = 0; j < i + 1; j++)
                symbols[i][j] = symbol;
        }
        return symbols;
    }
}
```

```{code-cell}
Shape shape1 = new Shape(ShapeType.HorizontalLine, 12, "=");
Console.WriteLine(shape1.Draw());

Shape shape2 = new Shape(ShapeType.Square, 4, "■ ");
Console.WriteLine(shape2.Draw());

Shape shape3 = new Shape(ShapeType.RightTriangle, 6, "* ");
Console.WriteLine(shape3.Draw());
```

## Instructions

### Step 1: Replace conditionals in `Shape` with polymorphism

Define an interface, `IShape`, with a method signature for `string Draw()`.

Create individual classes for each shape type, namely `HorizontalLine`, `Square`, and `RightTriangle`, implementing the `IShape` interface.

```{note}
It's ok if you end up duplicating the `private` method `string draw(string[][] symbols)`. We'll get rid of that duplication later.
```

### Step 2: Rewrite the main class

Rewrite the `Main` method so that it uses subtypes of `IShape` instead of the `Shape` class.
It should look like this and should both compile and still print the same output as before.

You should now be able to delete the old `Shape` class.

```{code-cell}
:tags: [remove-input]
public interface IShape
{
    string Draw();
}


public class HorizontalLine : IShape
{
    int size;
    string symbol;

    public HorizontalLine(int size, string symbol)
    {
        this.size = size;
        this.symbol = symbol;
    }

    public string Draw()
    {
        string[][] symbols = make(size, symbol);
        string lines = "";
        for (int i = 0; i < symbols.Length; i++)
        {
            string line = "";
            for (int j = 0; j < symbols[i].Length; j++)
            {
                line += symbols[i][j];
            }
            lines += line + "\n";
        }
        return lines;
    }

    private string[][] make(int size, string symbol)
    {
        string[][] symbols = new string[1][];
        symbols[0] = new string[size];
        for (int i = 0; i < size; i++)
            symbols[0][i] = symbol;
        return symbols;
    }
}
```

```{code-cell}
IShape shape1 = new HorizontalLine(12, "=");
Console.WriteLine(shape1.Draw());

// Do the same for Square.

// Do the same for RightTriangle
```

### Step 3: Eliminate duplication using inheritance

When we split the shapes into their own classes that implement the interface `IShape` we ended up duplicating the logic of the `private` method `string draw(string[][] symbols)`.
Let's eliminate that duplication using inheritance.

Make the classes `HorizontalLine`, `Square`, and `RightTriangle` inherit from an abstract class called `Shape` which in turn implements the interface `IShape`.

The abstract class `Shape` should allow you to eliminate the duplicated method  `private` method `string draw(string[][] symbols)`.

One way is to add an `abstract` method to `Shape` with the signature `string[][] MakeLines()`:

```{code-cell}
public abstract class Shape : IShape
{
    protected abstract string[][] GetLines();

    public string Draw()
        => ""; // Replace with your implementation.
}
```

Another way is to make `Draw` `abstract` in `Shape` and instead offer its subclasses a `protected` method with the signature `string Flatten(string[][] symbols)`.

```{code-cell}
public abstract class Shape : IShape
{
    public abstract string Draw();

    protected string Flatten(string[][] lines)
        => ""; // Replace with your implementation.
}
```

should provide a [protected](protected) method with the signature `string Draw(string[][] symbols`. This allows us to remove the duplicated code in the three shape classes.

```{admonition} 🤔 Reflection
How does creating specific classes for each shape, adhering to the same interface, make the code more organized and maintainable?
```

### Step 4: Add more shapes

Challenge: Create some new classes, such as `VerticalLine` or `Cross`, that implement `IShape` and integrate it with your existing code without modifying the existing shape classes.

```{admonition} 🤔 Reflection
How does your design enable the addition of new shapes with minimal changes to existing code?
```

