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

# LINQ

Do you find it cumbersome to query and manipulate data in collections with repetitive loops and complex logic? What if you could do it in a concise, expressive, and readable way? Better yet, what if you could use the same querying logic across different data sources, like databases, XML documents, and in-memory collections? This is precisely what LINQ offers: a type-safe, flexible way to query and manipulate data.

```{admonition} Key point
LINQ provides a type-safe and consistent way to perform queries on different data sources, making data manipulation in C# easier and less error-prone.
```

```{figure} ../images/cover-linq.jpg
LINQ is like an organized tool wall for all your data manipulation needs.
```

## What is LINQ?

LINQ stands for Language Integrated Query. The name itself reflects its purpose—providing a querying language that is tightly integrated into C#. Unlike separate query languages like SQL, LINQ is not a standalone language but rather a part of C#. This deep integration makes it [type-safe](type-checking), meaning that you get compile-time checks, which reduces run-time errors and enhances productivity.

LINQ combines various features we've learned so far such as [generics](generics), [enumerables](enumerables), [lambdas](lambdas), and [delegates](delegates) to provide a cohesive and tremendously expressive way to work with data. This not only makes your code more readable but also allows you to write queries that can work across different types of data sources.

## Syntax

There are two syntax styles for LINQ:

- Query syntax
- Method syntax

We'll focus exclusively on method syntax in this chapter, as it's often more expressive in conveying the logical flow of data manipulations. Method syntax allows for easy chaining of operations since most of the operations return enumerables.
Query syntax on the other hand is very handy if you're looking to replace SQL queries with C# code.

Method syntax in LINQ heavily relies on [delegates](delegates) and [lambdas](lambdas) to perform queries on data. In essence, LINQ methods like `Where`, `Select`, and `OrderBy` take delegates as arguments, specifying the conditions or transformations to apply. More commonly, these delegates are provided in the form of lambda expressions for conciseness and readability.

For example, let's say that we have a list of integers.

```{code-cell}
// Make a list of numbers.
List<int> numbers = new List<int> { 2, 4, 8, 16, 32 };
```

If we want to filter out the numbers greater than `10`, you could use the `Where` method with a lambda expression like this:

```{code-cell}
// Make a new list of numbers that only contains the numbers above 10.
IEnumerable<int> filtered = numbers.Where(x => x > 10);

// Print the list.
Console.WriteLine(String.Join(", ", filtered));
```

Here, the lambda expression `x => x > 10` serves as a delegate that defines the condition for filtering. This makes LINQ method syntax highly flexible and extensible, as you can pass in custom logic in a [type-safe](type-checking) manner.

```{tip}
The Where method filters out elements that don't meet the condition specified by the lambda expression `num => num % 2 == 0`.
```


## Common methods

LINQ has tons of methods that you can find in the [official documentation](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable#methods).
Here is a list with brief explanations of the most commonly used LINQ methods.

### Filtering
- `Where`: Filters a sequence based on a predicate.

### Projection
- `Select`: Transforms each element of a sequence into a new form. This operation is known as 'map' in many other languages.
- `SelectMany`: Projects each element of a sequence to an `IEnumerable<T>` and flattens the resulting sequences into one sequence. This operation is known as 'flat map' in many other languages.

### Sorting
- `OrderBy`: Sorts the elements of a sequence in ascending order.
- `OrderByDescending`: Sorts the elements of a sequence in descending order.
- `ThenBy`: Performs a subsequent sorting of elements in ascending order.
- `ThenByDescending`: Performs a subsequent sorting of elements in descending order.

### Aggregation
- `Sum`: Calculates the sum of a sequence.
- `Average`: Calculates the average of a sequence.
- `Min`: Finds the minimum value in a sequence.
- `Max`: Finds the maximum value in a sequence.
- `Count`: Counts the elements in a sequence.
- `Any`: Determines if any elements of a sequence satisfy a condition.
- `All`: Determines if all elements of a sequence satisfy a condition.
- `Aggregate`: Applies an accumulator function over a sequence. This operation is known as 'reduce' or 'fold' in many other languages.

### Element Operations
- `First`: Returns the first element of a sequence.
- `FirstOrDefault`: Returns the first element of a sequence, or a default value if no such element exists.
- `Last`: Returns the last element of a sequence.
- `LastOrDefault`: Returns the last element of a sequence, or a default value if no such element exists.
- `Single`: Returns the only element of a sequence.
- `SingleOrDefault`: Returns the only element of a sequence, or a default value if no such element exists.
- `ElementAt`: Retrieves the element at a certain index.
- `ElementAtOrDefault`: Retrieves the element at a certain index or a default value if the index is out of range.

### Set Operations
- `Distinct`: Removes duplicate elements from a sequence.
- `Union`: Produces the set union of two sequences.
- `Intersect`: Produces the set intersection of two sequences.
- `Except`: Produces the set difference of two sequences.

### Partitioning
- `Take`: Returns a specified number of contiguous elements from the start of a sequence.
- `Skip`: Bypasses a specified number of elements in a sequence and then returns the remaining elements.

### Grouping
- `GroupBy`: Groups the elements of a sequence based on a key.

### Joining
- `Join`: Joins two sequences based on key selector functions.
- `GroupJoin`: Performs a grouped join between two sequences.

### Conversion
- `ToList`: Converts a sequence to a `List<T>`.
- `ToArray`: Converts a sequence to an array.
- `ToDictionary`: Converts a sequence to a `Dictionary<TKey, TValue>`.

While this is not an exhaustive list, these methods are some of the most commonly used LINQ methods.

```{seealso}
Once you've understood `Select` and `Aggregate` you've come a long way in understanding functional programming.
These are LINQ implementations of the concepts that otherwise usually are called 'map' and 'reduce' (or 'fold').
```


## Chaining methods

The real power of LINQ comes alive when you chain multiple methods together for more complex queries.
Suppose that we have a `Person` class that captures `Name` and `Age`.

```{code-cell}
public class Person
{
    public string Name { get; init; }
    public int Age { get; init; }
}
```

Suppose you have a collection of `Person` objects representing characters from 'Lord of the Rings'.

```{code-cell}
List<Person> people = new List<Person>
{
    new Person { Name = "Gandalf", Age = 55000 },
    new Person { Name = "Legolas", Age = 2931 },
    new Person { Name = "Gimli", Age = 139 },
    new Person { Name = "Aragorn", Age = 87 },
    new Person { Name = "Frodo", Age = 50 },
    new Person { Name = "Boromir", Age = 40 },
    new Person { Name = "Samwise", Age = 38 },
};
```

Let's now use LINQ to solve some problems that might seem non-trivial.
Say you want to find out who are the top 3 oldest people in the group but you want their names in alphabetical order.

```{code-cell}
IEnumerable<string> result = people
    .OrderByDescending(person => person.Age) // Sorting everyone by age.
    .Take(3)                                 // Taking the top 3 oldest people.
    .OrderBy(person => person.Name)          // Sorting the remaining people alphabetically.
    .Select(person => person.Name);          // Select names only.

// Print the result.
foreach(string line in result)
    Console.WriteLine(line);
```

Let's try something a bit harder. Suppose you're interested in finding the names and ages of all characters that are at least `100` years old but you want the age to be represented in centuries.
Can you figure out how to do that in LINQ?

```{code-cell}
IEnumerable<string> result = people

    // Filter by age being at least 100.
    .Where(person => person.Age >= 100)

    // Sort by age in descending order.
    .OrderByDescending(person => person.Age)

    // Convert to anonymous type where age is in centuries.
    .Select(person => new {
        person.Name,
        Centuries = Math.Round(person.Age / 100.0)
    })

    // Format output.
    .Select(obj => $"{obj.Name} ({obj.Centuries} hundred years)");

// Print the result.
foreach(string line in result)
    Console.WriteLine(line);
```

```{note}
The solution above make use of [anonymous types](anonymous-types).
It's entirely possible to solve the problem without anonymous types but anonymous types are often used in LINQ queries to make them cleaner and more [maintainable](maintainability).
```

Let's create an even more complex query. Suppose we want to categorize the characters based on their age as a power of 10. Our categories will be less than `100`, less than `1000`, and so on.
In the end we want to print each category as the upper age limit for the category, followed by the names of people falling into that category in ascending order.

Might seem like pretty complex stuff. But with LINQ and a bit of thinking it's actually a breeze. Here's how we might solve it:

```{code-cell}
var output = people

    // Order the list of people by age.
    .OrderBy(person => person.Age)

    // Group them based on the power of 10 less than their age.
    .GroupBy(person => Math.Floor(Math.Log10(person.Age)))

    // Sort the groups by this power of 10.
    .OrderBy(group => group.Key)

    // Create a string for each group that combines the upper
    // limit for that category and the names of people in it.
    .Select(group =>
        "< " + Math.Pow(10, group.Key + 1) + " years: " +
        string.Join(", ", group.Select(person => person.Name)));

// Print each group
foreach(string group in output)
    Console.WriteLine(group);
```


## LINQ is lazy

In earlier chapters, you've encountered the concept of lazy evaluation when we discussed the [`yield` statement](the-yield-statement). Lazy evaluation essentially means that the computation is deferred until you actually need the result. LINQ leverages this concept to optimize the performance of queries.

When you define a LINQ query using methods like `Where`, the query itself is not immediately executed. Instead, a query definition is created. The actual computation or data retrieval only takes place when you try to access the elements of the result, for example through a `foreach` loop or by converting it to a collection like a list or an array. This allows LINQ to efficiently handle large datasets and complex queries, as elements are only processed as and when they are needed.

Here's an example that highlights the lazy evaluation nature of LINQ:

```{code-cell}
// Define a sequence of numbers
IEnumerable<int> numbers = new List<int> { 10, 20, 30, 40, 50, 60 };

// Define a LINQ query using the Where method
IEnumerable<int> evenNumbersQuery = numbers.Where(n =>
{
    // Print a message to indicate processing.
    // This will help us understand when the computation happens.
    Console.WriteLine($"Processing {n}.");
    return n % 2 == 0;
});

// Obtain an enumerator from the LINQ query
IEnumerator<int> enumerator = evenNumbersQuery.GetEnumerator();

// Manually move the enumerator. This is when the query actually gets executed.
enumerator.MoveNext();
enumerator.MoveNext();
enumerator.MoveNext();
```

In this example, we define a list of integers and create a LINQ query using the `Where` method to filter even numbers. Notice the `Console.WriteLine($"Processing {n}.");` line within the `Where` method. This allows us to see exactly when each number is being processed.

When we call `evenNumbersQuery.GetEnumerator()`, we get an [enumerator](enumerables) for the query. However, still no numbers are processed at this point. It's only when we start moving the enumerator using `MoveNext()` that the numbers are processed and filtered according to the condition `n % 2 == 0`.

This example makes it evident that the query isn't executed until you actually start enumerating the results. Understanding this lazy nature of LINQ can help you design more efficient and performant applications, especially when working with large data sets or expensive computations.

## Conclusion

By learning LINQ, you've gained a tremendously powerful tool that greatly simplifies your data manipulation tasks which can make your code more [maintainable](maintainability).
Beyond that, LINQ also allows for a consistent query experience across various data sources, but that's a story for another chapter.

```{tip}
If you like LINQ, you will 😍 functional programming. Give it a go after finishing this book. Trust me.
```


%```{seealso}
%The key features of LINQ such as filtering, sorting, and chaining methods closely relate to previous chapters on the Iterator pattern, delegates, and lambda expressions.
%```

