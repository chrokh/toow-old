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

# Expressions

Expressions are an important concept in programming. They are like little mathematical expressions that the computer evaluates to produce a value.

In programming, an expression is a combination of one or more constants, variables, operators, and functions (and more) that the programming language interprets and computes to produce another value. This value can be a number, a string, a boolean - in fact, it can be of any [data type](data-types).


You've already encountered a simple form of expressions: literals, such as the number `5` or the string `"Hello, World!"`.
Remember when we declared a variable and assigned it a value?

```{code-cell}
int numberOfMarbles = 5;
```

In this line of code, `5` is an expression. It’s a very simple expression, called a literal, that represents a fixed value.

Expressions can also be made up of literal values combined with operations. For example:

```{code-cell}
int totalMarbles = 5 + 3;
```

Here, `5 + 3` is an expression. The computer evaluates the expression, adds up the two numbers, and stores the resulting value (`8`) in the variable `totalMarbles`.

```{code-cell}
Console.WriteLine(totalMarbles);
```

We can also involve variables in our expressions.

```{code-cell}
int redMarbles = 2;
int blueMarbles = 4;
int greenMarbles = 10;

int marbleSum = redMarbles + blueMarbles + greenMarbles;
```

Here, we have four expressions.
The first three are literals (`2`, `4`, and `10`).
On the last last however, we have an arithmetic expression: `redMarbles + blueMarbles + greenMarbles`. When this line of code is executed, the computer evaluates the expression, and the resulting value (the sum of the three variables) is stored in `marbleSum`.

```{code-cell}
Console.WriteLine(marbleSum);
```

However, expressions in programming can be much more powerful and complex than just adding a few numbers together. They can involve various operations, functions, and more. We'll dive deeper into this in the following chapters.

What's important to understand is that every expression in C# (and most other programming languages) evaluates to a value and that value has a [type](data-types). This type can be any data types: `int`, `bool`, `char`, `string`, and so on.

Expressions are a fundamental building block of any program. They allow you to manipulate data, perform calculations, check conditions, and much more. In the next chapter, we'll introduce the concept of operators, which will enable us to create more complex and interesting expressions. So stay tuned!

