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

# Equality operators

Equality operators are an essential part of decision-making in programming. They are used to compare two values for equality or inequality, providing a fundamental way of assessing whether certain conditions in your code are met.

```{figure} ../images/cover-equality-operators.jpg

Equality operators are used to determine whether two values are equal or not.
```

There are two main equality operators in C#:

- `==` (equal to)
- `!=` (not equal to)

The double equals operator `==` returns true if the two values being compared are equal in value. For instance, if we have two integer variables, a and b, the expression `a == b` will return true if both a and b hold the same integer value.

The not equal to operator `!=`, on the other hand, returns true if the two values being compared are not equal. Using the same variables a and b, the expression `a != b` will return true if a and b do not hold the same integer value.

An essential aspect to remember is that the result of an equality comparison is always a boolean value - that is, true or false. This binary outcome is crucial in controlling the flow of your programs, as you'll see in future chapters on control flow structures.

Here's an example of how you could use these operators in a program that compares the quantities of marbles in two jars:

```{code-cell}
int redMarbles = 5;
int blueMarbles = 10;

bool isEqual = redMarbles == blueMarbles;    // false
bool isNotEqual = redMarbles != blueMarbles; // true
```

In these examples, the expressions `redMarbles == blueMarbles` and `redMarbles != blueMarbles` are evaluated first, resulting in a boolean value. That value is then assigned to the respective boolean variables `isEqual` and `isNotEqual`.

Understanding and using equality operators is foundational to writing useful and complex programs. As you continue to learn C#, you'll see these operators frequently, often in conjunction with the relational and logical operators that we'll discuss next.
