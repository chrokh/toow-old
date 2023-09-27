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

# Solution: Generics


```{code-cell}
// This is the code that was provided.
string[] words = { "apple", "banana", "cherry" };

int[][] matrix = {
    new int[] {1, 2, 3},
    new int[] {4, 5, 6},
    new int[] {7, 8, 9}
};
```

```{code-cell}
// Step 2: Declare and instantiate list.
List<string> wordsList = new List<string>();
```

```{code-cell}
// Step 3: Copy all items
foreach (string word in words)
    wordsList.Add(word);
```

```{code-cell}
// Step 4: Print all items.
foreach (string word in wordsList)
    Console.WriteLine(word);
```

```{code-cell}
:tags: [remove-output]
// Step 5:

// Declare and instantiate list.
List<List<int>> matrixList = new List<List<int>>();

// Copy all items.
for (int row = 0; row < matrix.Length; row++)
{
    matrixList.Add(new List<int>());
    for (int col = 0; col < matrix[row].Length; col++)
        matrixList[row].Add(matrix[row][col]);
}

// Print all items.
foreach(List<int> row in matrixList)
{
    foreach(int item in row)
        Console.Write(item + " ");
    Console.WriteLine();
}
```

```output
1 2 3
4 5 6
7 8 9
```


