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

# Arithmetic operators

In the previous chapter, you've seen how expressions can produce values. You've also seen that these expressions can include something more than just literal values or variables. They can include symbols like `+` which performs an operation on the values. These symbols are called "operators".

Operators in programming languages are similar to operators in mathematics. They perform operations on values and variables and these operations can be as simple as addition or subtraction, or more complex like comparison or logical operations.

Let's start with the most common operators that you're already familiar with - arithmetic operators.  Arithmetic operators, as the name suggests, are used to perform mathematical operations, similar to the operations you would perform in elementary arithmetic. In C#, the basic arithmetic operators are:

- `+` (Addition)
- `-` (Subtraction)
- `*` (Multiplication)
- `/` (Division)
- `%` (Modulo)

The addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`) operators behave just as you would expect them to. They add, subtract, multiply, and divide numbers, respectively.

```{figure} ../images/cover-arithmetic-operators.jpg

Arithmetic operators are used in arithmetic expressions.
```

Here are some examples:

```{code-cell}
int marbleCount1 = 5;
int marbleCount2 = 10;

int sum = marbleCount1 + marbleCount2;      // 15
int diff = marbleCount2 - marbleCount1;     // 5
int product = marbleCount1 * marbleCount2;  // 50
int quotient = marbleCount2 / marbleCount1; // 2
```

However, the modulo operator (`%`) might be less familiar to you. This operator calculates the remainder of a division operation. For instance, if you divide `10` by `3`, the quotient is `3` and the remainder is `1`. The modulo operation gives you this remainder.

Here's how you might use the modulo operator:

```{code-cell}
int leftoverMarbles = marbleCount2 % marbleCount1; // 0, because 10 divided by 5 has no remainder.
```

You might for example use the modulo operator to determine whether a number is even or odd (a number is even if it gives a remainder of `0` when divided by `2`).

These arithmetic operators allow you to perform basic mathematical operations on your data. By combining these with other concepts, like variables and expressions, you can start to perform complex operations and calculations in your code.

%These are just a few examples of the many operators available in C#. In the next chapter, we will discuss another important set of operators – relational and logical operators – which let us compare values and make decisions in our programs.

%Remember, understanding operators is crucial to understanding how to write expressions, which in turn is key to writing meaningful and functional code. As you progress and explore more about C#, you'll learn about more complex and powerful operators and how to use them effectively.

