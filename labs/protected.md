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

# Lab: `protected` access modifier

## Objective
In this lab, we will delve into the principles of object oriented programming, focusing on access modifiers and inheritance. Specifically, we'll explore how to use the `protected` access modifier and how it affects the way classes interact with each other.

## Provided Code

Carefully review the provided code. Notice how the `Current` field and the `MoveNext()` methods are marked as `protected`. This means they are accessible within the class `Sequence` and any of its derived classes, but not from outside these classes. Also notice how `MoveNext` is the only method marked as `virtual`.

```{code-cell}
class Sequence {
    protected int Current;

    public Sequence(int start)
        => Current = start;

    protected virtual void MoveNext()
        => Current++;

    public int[] Take(int n) {
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            MoveNext();
            result[i] = Current;
        }
        return result;
    }
}
```

Attempting to invoke `Current` or `MoveNext()` from outside will result in a compilation error, demonstrating the encapsulation aspect of object oriented programming.

```{code-cell}
:tags: [raises-exception]
Sequence seq = new Sequence(1);

Console.WriteLine(seq.Current); // Error! ❌

Console.WriteLine(seq.MoveNext()); // Error! ❌
```

## Instructions

### Step 1: Implement `StepSequence`

Write a class called `StepSequence` that inherits from `Sequence`. This class's constructor must take two integers. One is called `start` and represents the starting number while the other is called `steps` and dictates the increment for each `MoveNext` call. You must ensure that every invocation of `MoveNext()` increments `Current` by `steps`.

When you're done, you should be able to run the following code:

```{code-cell}
:tags: [remove-input]
class StepSequence : Sequence
{
    int steps;
    public StepSequence(int start, int steps) : base(start)
    {
        this.steps = steps;
    }

    protected override void MoveNext()
        => Current += steps;
}
```

```{code-cell}
Sequence seq = new StepSequence(10, 3);

Console.WriteLine(String.Join(", ", seq.Take(10)));
```

```{admonition} 🤔 Reflection
How does overriding the `MoveNext()` method in derived classes alter the behavior of the `Take(int n)` method? Reflect on the principles of polymorphism and inheritance in this context.
```

### Step 2: Implement `EvenSequence`

Write a class called `EvenSequence` that inherits from `Sequence`. The purpose of this class is to generate a sequence of even numbers. You must implement the constructor so that we start at an even number and override the method `MoveNext()` so that we always moves to an even number.

```{code-cell}
:tags: [remove-input]
class EvenSequence : Sequence
{
    public EvenSequence(int start)
        : base(start % 2 == 0 ? start : start + 1) { }

    protected override void MoveNext()
        => Current += 2;
}
```

```{code-cell}
Sequence seq = new EvenSequence(9);

Console.WriteLine(String.Join(", ", seq.Take(10)));
```


## Challenge

As a challenge, modify the `StepSequence` class to allow dynamic changes to the step value after object instantiation. This should be done without compromising the encapsulation of the `Current` field.

Ensure that the `Current` field remains protected and cannot be directly modified from outside the class.

Here's an example of how it might work:

```{code-cell}
:tags: [remove-input]
class StepSequence : Sequence
{
    public int Steps { get; set; }

    public StepSequence(int start, int steps) : base(start)
    {
        Steps = steps;
    }

    protected override void MoveNext()
        => Current += Steps;
}
```

```{code-cell}
StepSequence seq = new StepSequence(10, 5);

Console.WriteLine(String.Join(", ", seq.Take(18)));

seq.Steps += 95;

Console.WriteLine(String.Join(", ", seq.Take(10)));
```

## Conclusion

No time for a conclusion. You're too fast. ⚡️

