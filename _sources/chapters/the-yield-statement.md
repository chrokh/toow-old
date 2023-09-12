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

# The `yield` statement

When we discussed [enumerables](enumerables) in a previous chapter, we talked about how they embody the [Iterator pattern](iterator-pattern) and enable sequential traversal of collections without revealing their underlying structure. The `yield` statement offers a simpler way to implement custom enumerators, making your code easier to [maintain](maintainability).

% https://cdn.discordapp.com/attachments/1118630713084870736/1151016940920377374/chrokh_funny_illustration_of_a_lazy_cat_1c999a83-438c-4994-af72-ab9c2e11c9ea.png
```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1151017010239635517/chrokh_funny_illustration_of_a_lazy_cat_f8167ce6-0a30-4b18-ace9-8856ea022b22.png
The `yield` keyword offers a simple way to create enumerators that lazily provide one element at a time.
```

## The Basics of `yield`

In its most basic form, the `yield` statement can be used within a method or property that returns an `IEnumerable` or `IEnumerator`. The `yield return` statement elements one at a time.

- `yield return` is used to return the next value in the iteration.
- `yield break` is used to signal the end of the iteration.

Let's look at a simple example using `yield return`.
Here's a simple [local function](local-functions) that yields three numbers one by one.

```{code-cell}
IEnumerable<int> GetNumbers()
{
    yield return 10;
    yield return 20;
    yield return 30;
}
```

If we invoke this function then we will get back an object whose compile-time type is `IEnumerable<int>`.
We can then use this enumerable in, for example, a `foreach` loop to iterate over all the numbers one by one.

```{code-cell}
foreach(int number in GetNumbers())
    Console.WriteLine(number);
```

Since it's an enumerable we can of course also manually extract the enumerator and traverse the values.

```{code-cell}
IEnumerable<int> numbers = GetNumbers();
IEnumerator<int> enumerator = numbers.GetEnumerator();

enumerator.MoveNext();
Console.WriteLine(enumerator.Current);

enumerator.MoveNext();
Console.WriteLine(enumerator.Current);
```

## Lazy evaluation

When we're using `yield` statements we're writing code that will be 'lazily evaluated'.
Up to this point we've only dealt with 'eager evaluation' where the code will be executed in its entirety.
In 'lazy evaluation,' code executes only as needed.

When you call a method that uses `yield` statements, no complete list of elements is actually created.
Until you request the first element, none of the code that you've written is executed at all.
The only thing that happens is that we get back an enumerable or enumerator depending on what we've set the return type of the yielding function to.

When you call `MoveNext` to advance the enumerator, the method executes until it reaches the next `yield return` statement and then 'pauses'.

Have a look at the example below, and pay special attention to the order in which the various messages are printed to the console.

```{code-cell}
IEnumerable<int> GetNumbers()
{
    Console.WriteLine("Enumerator: About to yield 1");
    yield return 1;

    Console.WriteLine("Enumerator: About to yield 2");
    yield return 2;

    Console.WriteLine("Enumerator: About to yield 3");
    yield return 3;
}
```

In the above example we request all the numbers, one by one, when we run the `foreach` loop.

```{code-cell}
Console.WriteLine("Caller: Getting numbers.");
IEnumerable<int> numbers = GetNumbers();

Console.WriteLine("Caller: About to iterate.");
foreach(int number in GetNumbers())
    Console.WriteLine($"Caller: {number}");

```

Had we not used lazy evaluation, all messages from the enumerator would have been printed the moment we created it since the whole list of numbers would have been created.


## Why Use `yield`?

You might be asking, why not just return a list? While that's an option, `yield` offers several advantages:

- **Lazy Execution**: The method doesn't execute until you actually iterate over the enumerable, which can be more efficient.
- **Infinite Enumerators**: The lazy nature of `yield` allows the creation of infinite sequences.
- **State Preservation**: The method's state is preserved between calls, allowing complex iteration logic without managing state externally and without the need to create a whole new class.
- **Maintainability**: The logic for the iteration stays within the method, making the code simpler.

To better showcase the usefulness of the `yield` statement, consider the following more complex example.
In the code below, we're defining a simple local function that generates numbers from the Fibonacci sequence.
This algorithm needs to maintain state between iterations. Without `yield`, we would need to write a separate [class](classes) or [struct](structure-types) if we wanted a lazy enumerator for this sequence.
With the `yield` statement however, the implementation is trivial.

```{code-cell}
IEnumerable<int> GenerateFibonacci(int count)
{
    int a = 0, b = 1, next;

    // The first number in the sequence
    yield return a;

    // The second number in the sequence
    yield return b;

    // Generate the remaining numbers in the sequence
    for (int i = 2; i < count; i++)
    {
        next = a + b;
        a = b;
        b = next;
        yield return next;
    }
}
```


## `yield break`

In addition to `yield return`, there's also `yield break`. This statement is used to terminate the iteration, indicating that no more elements will be returned.

```{code-cell}
IEnumerable<int> GetNumbersUpToFive()
{
    for (int i = 1; i <= 10; i++)
    {
        if (i > 5)
            yield break;

        yield return i;
    }
}
```

In this example, the `yield break` statement stops the loop once the values exceed `5`.


## Conclusion

The `yield` statement is a versatile feature in C# that simplifies the implementation of custom enumerators. It aligns well with the [Iterator pattern](iterator-pattern), offering an elegant way to traverse collections lazily and maintain state across iterations. Whether you're working with simple or complex types, understanding `yield` is likely simplify your enumerator implementations.

