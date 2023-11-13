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

# Lab: Overriding

## Objective

In this lab, we will delve into the concept of overriding methods in object oriented programming. We will explore how to effectively use inheritance to modify the behavior of methods in derived classes. The focus will be on understanding the mechanics and implications of overriding methods in a class hierarchy.

## Provided Code

Carefully review the provided code. Notice that we have a base class named `Sequence`. This class includes a parameterless constructor and two methods: `int Next()` and `int[] Take(int n)`. The `Next` method is virtual, allowing it to be overridden in derived classes, while `Take` is not.
                                                                                                                                                            This design allows `Next` to be customized in subclasses, while `Take` maintains consistent behavior across all sequences.

```{code-cell}
class Sequence
{
    int n = 0;

    public Sequence () { }

    public Sequence (int n)
        => this.n = n;

    public virtual int Next()
        => n++;

    public int[] Take(int n)
    {
        int[] result = new int[n];
        for (int i = 0; i < n; i++)
            result[i] = Next();
        return result;
    }
}
```

```{code-cell}
Sequence seq = new Sequence();

foreach(int num in seq.Take(3))
    Console.WriteLine(num);
```

```{code-cell}
Sequence seq = new Sequence(50);

foreach(int num in seq.Take(3))
    Console.WriteLine(num);
```

## Instructions

Our goal is to create subclasses that inherit from `Sequence` and override the `Next` method to exhibit different behaviors.

### Step 1: Even numbers

Let's begin by creating a subclass called `EvenNumbers`.
It should override the method `Next` and only return even numbers.
When you're done you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class EvenNumbers : Sequence
{
    int n = 0;

    public EvenNumbers () { }

    public EvenNumbers (int n)
        => this.n = n;

    public override int Next()
        => n += 2;
}
```

```{code-cell}
Sequence even1 = new EvenNumbers();

foreach(int num in even1.Take(3))
    Console.WriteLine(num);
```

```{code-cell}
Sequence even2 = new EvenNumbers(1000);

foreach(int num in even2.Take(3))
    Console.WriteLine(num);
```

```{admonition} 🤔 Reflection
How does overriding the `Next` method in the subclass alter the behavior of the `Take` method?
```

### Step 2: Triangular numbers

Let's now create a subclass called `TriangularNumbers` that inherits from `Sequence`.
Override the method `Next` and implement it so that it always return the next number in the sequence of triangular numbers.
When you're done you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class TriangularSequence : Sequence
{
    int x = 0;

    public override int Next()
    {
        x++;
        return x * (x + 1) / 2;
    }
}
```

```{code-cell}
Sequence triangular = new TriangularSequence();

Console.WriteLine(String.Join(", ", triangular.Take(12)));
```

### Step 3: Fibonacci numbers

Let's now create a subclass called `FibonacciSequence` that inherits from `Sequence`.
Override the method `Next` and implement it so that it always return the next number in the Fibonacci sequence.
When you're done you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class FibonacciSequence : Sequence
{
    int a = 0;
    int b = 1;

    public override int Next()
    {
        int c = a + b;
        a = b;
        b = c;
        return c;
    }
}

```

```{code-cell}
Sequence fibonacci = new FibonacciSequence();

Console.WriteLine(String.Join(", ", fibonacci.Take(12)));
```


## Challenge

Let's explore a more advanced application of our `Sequence` hierarchy that uses both inheritance, subtyping, and object composition at the same time.

Create a new class called `SequenceSum`. This class should have a constructor that takes a `Sequence` as an argument. The idea is that each time we ask the `SequenceSum` for the next number, it should ask the underlying sequence for the next number, add that to the currently running sum (starting from 0) and return the new sum.

When you're done you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class SequenceSum : Sequence
{
    int sum = 0;
    Sequence seq;

    public SequenceSum(Sequence seq)
        => this.seq = seq;

    public override int Next()
        => sum += seq.Next();
}
```

```{code-cell}
Sequence naturals = new Sequence();
Sequence summedNaturals = new SequenceSum(naturals);

Console.WriteLine(String.Join(", ", summedNaturals.Take(6)));
```

```{code-cell}
Sequence summedNaturals = new SequenceSum(new TriangularSequence());

for (int i=1; i<=5; i++)
{
    Sequence naturals = new TriangularSequence();
    string summands = String.Join(" + ", naturals.Take(i));
    int sum = summedNaturals.Next();
    Console.WriteLine($"{summands} = {sum}");
}
```

