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

# Arrays

In many situations, you might find yourself needing to work with a collection of values that all share the same data type. For instance, if you wanted to store a sequence of names of all your cats, it would be impractical to create a separate variable for each of these values. This is where arrays come in.

An array in C# is a data structure that allows you to store multiple values of the same data type. All elements in the array share a common name, and each individual element can be accessed by an index, which is an integer representing its position within the array.

You declare an array by specifying its type, followed by square brackets, and then the array name. For example, to declare an array of strings:

```{code-cell}
string[] names;
```

In this case, `names` is an array that will contain strings. However, this declaration doesn't actually create an array, it only declares a variable that can hold an array. To create an array, you use the `new` keyword followed by the data type, and then in square brackets, you specify the number of elements that the array should contain:

```{code-cell}
names = new string[10];
```

This creates an array that can hold `10` strings, and assigns this array to the `names` variable. Now you can assign values at different positions in the array:

```{code-cell}
names[0] = "Fluffy";
names[1] = "Whiskers";
// and so on...
```

In many cases, you'll know the values you want to put in an array at the time you create it. C# provides a shorthand, called [collection initializers](collection-initializers), which lets you create the array and assign elements in a single statement. We'll discuss the syntax in detail much later, but here's a code example:

```{code-cell}
string[] names = { "Fluffy", "Whiskers" };
```

This creates an array, initializes it with the given values, and assigns it to the variable.

Arrays are zero-indexed in C#, which means the first element is at index `0`, the second element is at index `1`, and so on.

To access the elements of an array, you use the name of the variable containing the array followed by the index of the element in square brackets:

```{code-cell}
string name1 = names[0]; // Access the element at index 0.
Console.WriteLine(name1);
```

It's essential to be mindful of the length of an array in C#. If you attempt to access an array element at an index that doesn't exist, C# will throw an `IndexOutOfRangeException`. This type of error occurs when your code tries to access an element at an index that is less than zero or greater than or equal to the length of the array. Always ensure that your index falls within the valid range for the array to avoid this exception. We'll talk more about [exceptions](exceptions) in a coming chapter.

```{code-cell}
:tags: [raises-exception]
string name = names[11];
```

Before you've added values to your array, all positions are assigned the default value for the data type of which the array stores elements of.
For example, if you create an array of integers (`int[]`), all positions in the array are initially filled with `0` because that is the default value for integers. Similarly, an array of booleans (`bool[]`) is initialized with `false`, and an array of arrays is filled with `null`. Here's a code example:

```{code-cell}
int[] numbers = new int[5];
Console.WriteLine(numbers[3]);
```

In this code, an array of integers named `numbers` is created with a length of `5`. Since no specific values are provided, all elements in the numbers array are initialized with the default value for integers, which is `0`.

Often, when working with arrays, you want to perform some operation based on each element.
For instance, you might want to print all the names to the console.
Luckily, we've already learned about [iteration](iteration).
We can use a `for` loop to solve this problem:

```{code-cell}
for (int index = 0; index < names.Length; index++)
{
    Console.WriteLine(names[index]);
}
```

In this example, `names.Length` invokes the `Length` property of the array which gives the number of elements in the array.
We'll talk more about properties in a later chapter.

A simpler way to solve the same problem is to use a `foreach` loop.
A `foreach` loop in C# iterates over a collection, like an array. For each element in the collection, it executes a block of code. The `foreach` statement defines a local variable for the current element. Here's how you could use a `foreach` loop to print all the names:

```{code-cell}
foreach (string name in names)
{
    Console.WriteLine(name);
}
```

In this code, `string name` declares a variable that will hold each element of the `names` array, one at a time. The `in names` part specifies the collection to iterate over. The `Console.WriteLine(name);` part is the block that's being executed for each element.

The `foreach` loop is simpler and more readable than the `for` loop when you want to work with each element in a collection and you don't need to know the index of the current element. However, if you need to know the position of the current element within the collection, or if you want to change the elements of the collection, you'll need to use a `for` loop or some other method.

That's a basic introduction to arrays in C#. As we move on, we'll see more complex uses of arrays and other types of collections.
It should be noted that there are very few legitimate reasons to use arrays these days. Instead we use modern data types like generic lists. More on that in a future chapter.

