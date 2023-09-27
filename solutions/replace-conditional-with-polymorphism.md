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

# Solution: Replace conditional with polymorphism

## Step 2 and 3

```{code-cell}
:tags: [hide-input, hide-output]
IShape shape1 = new HorizontalLine(12, "=");
Console.WriteLine(shape1.Draw());

IShape shape2 = new Square(4, "■ ");
Console.WriteLine(shape2.Draw());

IShape shape3 = new RightTriangle(6, "* ");
Console.WriteLine(shape3.Draw());


public interface IShape
{
    string Draw();
}


public class Square : IShape
{
    int size;
    string symbol;

    public Square(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    public string Draw()
    {
        string[][] symbols = new string[size][];
        for (int i = 0; i < size; i++)
        {
            symbols[i] = new string[size];
            for (int j = 0; j < size; j++)
                symbols[i][j] = symbol;
        }
        return draw(symbols);
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
}


public class HorizontalLine : IShape
{
    int size;
    string symbol;

    public HorizontalLine(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    public string Draw()
    {
        string[][] symbols = new string[1][];
        symbols[0] = new string[size];
        for (int i = 0; i < size; i++)
            symbols[0][i] = symbol;
        return draw(symbols);
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
}


public class RightTriangle : IShape
{
    int size;
    string symbol;

    public RightTriangle(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    public string Draw()
    {
        string[][] symbols = new string[size][];
        for (int i = 0; i < size; i++)
        {
            symbols[i] = new string[i + 1];
            for (int j = 0; j < i + 1; j++)
                symbols[i][j] = symbol;
        }
        return draw(symbols);
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
}
```

## Step 4 (solution 1)

```{code-cell}
:tags: [hide-input, hide-output]
IShape shape1 = new HorizontalLine(12, "=");
Console.WriteLine(shape1.Draw());

IShape shape2 = new Square(4, "■ ");
Console.WriteLine(shape2.Draw());

IShape shape3 = new RightTriangle(6, "* ");
Console.WriteLine(shape3.Draw());


public interface IShape
{
    string Draw();
}


public abstract class Shape : IShape
{
    protected abstract string[][] GetLines();

    public string Draw()
    {
        string[][] symbols = GetLines();
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
}


public class Square : Shape
{
    int size;
    string symbol;

    public Square(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    protected override string[][] GetLines()
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
}


public class HorizontalLine : Shape
{
    int size;
    string symbol;

    public HorizontalLine(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    protected override string[][] GetLines()
    {
        string[][] symbols = new string[1][];
        symbols[0] = new string[size];
        for (int i = 0; i < size; i++)
            symbols[0][i] = symbol;
        return symbols;
    }
}


public class RightTriangle : Shape
{
    int size;
    string symbol;

    public RightTriangle(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    protected override string[][] GetLines()
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


## Step 4 (solution 2)

```{code-cell}
:tags: [hide-input, hide-output]
IShape shape1 = new HorizontalLine(12, "=");
Console.WriteLine(shape1.Draw());

IShape shape2 = new Square(4, "■ ");
Console.WriteLine(shape2.Draw());

IShape shape3 = new RightTriangle(6, "* ");
Console.WriteLine(shape3.Draw());


public interface IShape
{
    string Draw();
}


public abstract class Shape : IShape
{
    public abstract string Draw();

    protected string Flatten(string[][] symbols)
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
}


public class Square : Shape
{
    int size;
    string symbol;

    public Square(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    public override string Draw()
    {
        string[][] symbols = new string[size][];
        for (int i = 0; i < size; i++)
        {
            symbols[i] = new string[size];
            for (int j = 0; j < size; j++)
                symbols[i][j] = symbol;
        }
        return Flatten(symbols);
    }
}


public class HorizontalLine : Shape
{
    int size;
    string symbol;

    public HorizontalLine(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    public override string Draw()
    {
        string[][] symbols = new string[1][];
        symbols[0] = new string[size];
        for (int i = 0; i < size; i++)
            symbols[0][i] = symbol;
        return Flatten(symbols);
    }
}


public class RightTriangle : Shape
{
    int size;
    string symbol;

    public RightTriangle(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    public override string Draw()
    {
        string[][] symbols = new string[size][];
        for (int i = 0; i < size; i++)
        {
            symbols[i] = new string[i + 1];
            for (int j = 0; j < i + 1; j++)
                symbols[i][j] = symbol;
        }
        return Flatten(symbols);
    }
}
```


## Step 5

```{code-cell}
:tags: [hide-input, hide-output]
IShape shape1 = new VerticalLine(4, "|");
Console.WriteLine(shape1.Draw());

IShape shape2 = new Cross(6, "*");
Console.WriteLine(shape2.Draw());


public interface IShape
{
    string Draw();
}


public abstract class Shape : IShape
{
    protected abstract string[][] GetLines();

    public string Draw()
    {
        string[][] symbols = GetLines();
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
}


public class VerticalLine : Shape
{
    int size;
    string symbol;

    public VerticalLine(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    protected override string[][] GetLines()
    {
        string[][] symbols = new string[size][];
        for (int i = 0; i < size; i++)
        {
            symbols[i] = new string[1];
            symbols[i][0] = symbol;
        }
        return symbols;
    }
}


public class Cross : Shape
{
    int size;
    string symbol;

    public Cross(int size, string symbol)
    {
        this.symbol = symbol;
        this.size = size;
    }

    protected override string[][] GetLines()
    {
        string[][] symbols = new string[size][];
        for (int i = 0; i < size; i++)
        {
            symbols[i] = new string[size];
            for (int j = 0; j < size; j++)
            {
                if (i == j || i + j == size - 1)
                {
                    symbols[i][j] = symbol;
                }
                else
                {
                    symbols[i][j] = new string(' ', symbol.Length);
                }
            }
        }
        return symbols;
    }
}
```
