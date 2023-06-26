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

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1122877227554578487/chrokh_a_simple_flat_illustration_of_two_piles_of_stones_e7781358-73ae-4b03-8b0a-437972dd1ed1.png?width=1440&height=629

Just like we can sum the number of rocks in two piles we can sum the contents of two variables through an expression using the addition operator.
```

We can also involve variables in our expressions.

```{code-cell}
int leftPile = 5;
int rightPile = 4;
int totalStones = leftPile + rightPile;
```

Here, we have three expressions.
The first two are literals (`5` and `4`).
On the last last line however, we have an arithmetic expression: `leftPile + rightPile`. When this line of code is executed, the computer evaluates the expression, and the resulting value (the sum of the two variables) is stored in the variable `totalStones`.

```{code-cell}
Console.WriteLine(totalStones);
```

However, expressions in programming can be much more powerful and complex than just adding a few numbers together. They can involve various operations, functions, and more. We'll dive deeper into this in the following chapters.

What's important to understand is that every expression in C# (and most other programming languages) evaluates to a value and that value has a [type](data-types). This value can be of any data type.

Expressions are a fundamental building block of any program. They allow you to manipulate data, perform calculations, check conditions, and much more. In the next chapter, we'll introduce the concept of operators, which will enable us to create more complex and interesting expressions. So stay tuned!

