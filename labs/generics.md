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

# Lab: Generics

```{admonition} Objective
This lab aims to provide hands-on experience in utilizing existing generic types, specifically `List<T>`, to pave the way for more advanced usage of generics.
```


## Step 1: Understand the provided code

Study the starting code given to you.

```{code-cell}
// 1D String Array
string[] words = { "apple", "banana", "cherry" };

// 2D Jagged Integer Array
int[][] matrix = {
    new int[] {1, 2, 3},
    new int[] {4, 5, 6},
    new int[] {7, 8, 9}
};
```

Do **not** remove the provided code.
Instead, follow the steps by adding code to this program.

## Step 2: Create a `List<string>` and add an element

Declare a variable of type `List<string>` and initialize it.

## Step 3: Iterate and copy

Use a `foreach` loop to iterate over all items in the original `words` array and add them one by one to the `List<string>` object using the instance method `Add`.

## Step 4: Iterate and print

Use a `foreach` loop to iterate over your `List<string>` object and print all strings to the console.

## Step 5: Do the same for the matrix

1. Declare and initialize another `List`.

    ```{hint}
    Remember that the `T` in `List<T>` can be replaced by any arbitrarily complex type, even another list such as `List<int>`.
    ```

2. Iterate over all the items in the two-dimensional `matrix` array, and add them to your list one by one using the `Add` method.

    ```{tip}
    Depending on how much you know about the generic `List<T>` type it might be easier to use a `for` loop rather than a `foreach` loop when copying items.
    ```

3. Iterate over your list using a `foreach` loop and print each item to the console so that the result is:

    ```
    1 2 3
    4 5 6
    7 8 9
    ```

