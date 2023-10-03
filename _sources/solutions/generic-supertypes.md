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

# Solution: Generic Supertypes

```{code-cell}
:tags: [hide-input]
interface ISequence<T>
{
    T Next();

    T[] Take(int n)
    {
        T[] output = new T[n];
        for(int i=0; i<n; i++)
            output[i] = Next();
        return output;
    }
}
```

## Step 1: StepSequence

```{code-cell}
class StepSequence : ISequence<int>
{
    private int current;
    private int steps;

    public StepSequence(int start, int steps)
    {
        this.current = start;
        this.steps = steps;
    }

    public int Next()
    {
        current += steps;
        return current;
    }
}
```

## Step 2: Creating `IFiniteSequence<T>`

```{code-cell}
interface IFiniteSequence<T> : ISequence<T>
{
    T First();
    T Last();
}
```

## Step 3: Implementing Cycle<T>

```{code-cell}
class Cycle<T> : IFiniteSequence<T>
{
    private T[] items;
    private int index = -1;

    public Cycle(T[] items)
    {
        this.items = items;
    }

    public T Next()
    {
        index = (index + 1) % items.Length;
        return items[index];
    }

    public T First()
    {
        index = 0;
        return items[index];
    }

    public T Last()
    {
        index = items.Length - 1;
        return items[index];
    }
}
```

## Step 4: Using the Sequences

```{code-cell}
var sequences = new List<ISequence<int>>
{
    new StepSequence(10, 2),
    new Cycle<int>(new int[] { 1, 2, 3, 4, 5 })
};

foreach (var sequence in sequences)
{
    var values = sequence.Take(5);
    foreach (var value in values)
    {
        Console.WriteLine(value);
    }
}
```

Regarding the reflection box:

```{code-cell}
:tags: [raises-exception]
var mixedSequences = new List<ISequence<object>>();

mixedSequences.Add(new StepSequence(10, 2));  // Error
```

## Challenge: Fibonacci sequence class

```{code-cell}
class FibonacciSequence : ISequence<int>
{
    private int prev = 0;
    private int current = 1;

    public int Next()
    {
        int result = current;
        current += prev;
        prev = result;
        return result;
    }
}
```

## Challenge: Alternating sequences

```{code-cell}
class AlternatingSequence<T> : ISequence<T>
{
    private ISequence<T> sequenceA;
    private ISequence<T> sequenceB;
    private bool flag = true;

    public AlternatingSequence(ISequence<T> sequenceA, ISequence<T> sequenceB)
    {
        this.sequenceA = sequenceA;
        this.sequenceB = sequenceB;
    }

    public T Next()
    {
        if (flag)
        {
            flag = false;
            return sequenceA.Next();
        }
        else
        {
            flag = true;
            return sequenceB.Next();
        }
    }
}
```

## Challenge: Skipping sequence

```{code-cell}
class SkippingSequence<T> : ISequence<T>
{
    private ISequence<T> innerSequence;
    private int skip;
    private int counter = 0;

    public SkippingSequence(ISequence<T> innerSequence, int skip)
    {
        this.innerSequence = innerSequence;
        this.skip = skip;
    }

    public T Next()
    {
        T result = default(T);
        for (int i = 0; i <= skip; i++)
        {
            result = innerSequence.Next();
            counter++;
        }
        return result;
    }
}

```

