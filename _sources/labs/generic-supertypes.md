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

# Lab: Generic Supertypes

## Objective

In this lab exercise, we will explore the intricacies of generic supertypes, including generic interfaces, open and closed constructed types, and the principles of inheritance and substitution. By the end of this lab, we should be proficient in determining which constructed types are open or closed and should have a clearer understanding of when a type is substitutable for another.

## Provided code

Carefully review the provided code. Notice how we have an interface `ISequence<T>` which promises a `Next` method and a provides a default implementation of the `Take` method.
`Next` should return the next element of whatever sequence we're modeling.
`Take` returns a specified number of elements from the sequence and makes use of the `Next` method.

```{code-cell}
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

## Instructions

### Step 1: StepSequence

Our first task is to implement a class called `StepSequence`.
This class should implement a construction of the generic interface `ISequence<T>`.
Think about whether the interface should be "open" or "closed?

The `StepSequence` class should take two `int`s in the constructor. One represents the starting number and the other the number of steps that should be taken each time `Next` is called.
The method `Next` returns the next number which is as many steps away as dictated by the argument in the constructor.

Here's an example of how you might use that class in `Main`.

```{code-cell}
:tags: [remove-input]
class StepSequence : ISequence<int>
{
    private int current = 0;
    private int steps;

    public StepSequence(int current, int steps)
    {
        this.current = current;
        this.steps = steps;
    }

    public int Next()
    {
        current += steps;
        return current;
    }
}
```

```{code-cell}
StepSequence seq = new StepSequence(100, 10);

Console.WriteLine(seq.Next());
Console.WriteLine(seq.Next());
Console.WriteLine(seq.Next());
```

```{admonition} 🤔 Reflection
Is the interface that `StepSequence` implements closed or open?
```

```{admonition} 🤔 Reflection
Is `StepSequence` a subtype of `ISequence<int>` or `ISequence<T>`? Why? Prove that your answer is correct by trying it.
```


### Step 2: Creating `IFiniteSequence<T>`

Now, let's introduce the concept of a finite sequence. Meaning a sequence with a start and an end. `IFiniteSequence<T>` that inherits from a construction of the generic class `ISequence<T>`. Beyond the members that it inherits from its supertype, the interface should also include two methods with the signatures `T First()` and `T Last()`. These methods should return the first or last element, respectively, and alter the state of the sequence so that the next returned element is the element that follows the returned element.

```{code-cell}
:tags: [remove-input]
interface IFiniteSequence<T> : ISequence<T>
{
    T First();
    T Last();
}
```

```{admonition} 🤔 Reflection
Is the constructed supertype open or closed?
```

### Step 3: Implementing Cycle<T>

Now, let's introduce the concept of "cycling" sequences.
Now, let's define a generic class `Cycle<T>`.
This class will cycle through an array of type `T`. The `Next` method should return the next item in the cycle.

Since a cycling sequence in a sense is finite, we should implement a construction of the generic interface `IFiniteSequence<T>`.
This means that we also have to implement the `First()` and `Last()` methods.

Here's an example of how you might use that class in `Main`.

```{code-cell}
:tags: [remove-input]
class Cycle<T> : IFiniteSequence<T>
{
    private T[] items;
    private int index = -1;

    public Cycle(T[] items)
        => this.items = items;

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

```{code-cell}
Cycle<string> letters = new Cycle<string>(
    new string[] { "One", "Two", "Three" });

Console.WriteLine($"{letters.Next()} {letters.Next()} {letters.Next()} {letters.Next()}");
Console.WriteLine($"{letters.Last()} {letters.Next()} {letters.First()} {letters.Next()}");
```

```{admonition} 🤔 Reflection
Is the constructed supertype open or closed?
```

```{admonition} 🤔 Reflection
Is `Cycle<T>` a subtype of `ICycle<T>` for any `T` or only for specific values of `T`? How does it compare with `ISequence<T>`?
```

```{admonition} 🤔 Reflection
Is `Cycle<T>` a subtype of `ISequence<T>` or of `IFiniteSequence<T>` or both? Why? Prove that your answer is correct by trying it.
```

Of course! Here's a new Step 4 for the lab exercise:

### Step 4: Using the Sequences

In this step, we're going to instantiate the classes we've implemented so far, put them in a list, and then iterate over them to invoke the `Take` method on each of them. Finally, we will print each element from the results to the console.

1. Create multiple instances of the `IStepSequence` and `Cycle<T>` classes. Make sure to use the same typ for `T` in all sequences!
2. Store these instances in a generic list of sequences.
3. Iterate over each sequence in the list, call the `Take` method to retrieve the next `5` elements, and print each of them to the console.

```{admonition} 🤔 Reflection
Reflect on the polymorphic behavior exhibited by the sequences in the list. How does the `ISequence<int>` interface allow us to treat different sequences in a unified manner? What implications does this have for maintainability?
```

```{admonition} 🤔 Reflection
Is this also possible if we use different types for `T`? Try it. Why does it work or not work?
```

## Challenge

Using the provided interfaces and the classes we've implemented, your challenge is to define two new classes that creatively utilizes `ISequence<T>`. You could think of sequences that move in different patterns, cycles that adjust based on specific logic, or even combinations of both. The sky's the limit!

Some suggestions:
- A Fibonacci sequence class.
- A sequence that alternates between two different sequences.
- A cycle that skips every nth element.

After you've created your classes, test them with some sample sequences or cycles to ensure it works as expected.

```{admonition} 🤔 Reflection
Reflect on the classes you created for the challenge. How does it relate to `ISequence<T>`? Is the constructed supertype open or closed?
```

