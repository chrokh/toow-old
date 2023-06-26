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

# Logical operators

Logical operators are used to perform logical operations on boolean values. These operations are at the heart of decision-making in code, where they can combine multiple conditions into a single, complex condition. The primary logical operators in C# are:

- `&&` (AND)
- `||` (OR)
- `!` (NOT)

The AND operator (`&&`) checks if both operands (the conditions on either side of the operator) are `true`. If they are, the whole expression is `true`; otherwise, it is `false`.

Here's an example of how you might use the AND operator to check if a jar is **both** red and full:

```{code-cell}
bool isRed = true;
bool isFull = true;

bool isRedAndFull = isRed && isFull; // true, since both conditions are true.
```

The OR operator (`||)` checks if at least one of the operands is `true`. If either condition is `true`, the whole expression is `true`. If both are `false`, the whole expression is `false`.

Here's an example of how you might use the OR operator to check if a jar is either red or full:

```{code-cell}
bool isGreen = false;

bool isGreenOrFull = isGreen || isFull; // true, since at least one condition is true.
```

The NOT operator (`!`) is a unary operator, meaning it only has one operand. It negates the truth value of the operand. If the operand is `true`, the NOT operator makes it `false`, and vice versa.

Here's an example of how you might use the NOT operator to check if a jar is not full:

```{code-cell}
bool hasSpace = !isFull; // false, since the jar is full.
```

Logical operators allow us to combine conditions and create more complex logic in our code, further expanding the range of situations our programs can handle. As you can see, even with these simple examples, we can create fairly complex conditions using these logical operators.
As we move forward, you’ll see just how important and useful these operators can be.

