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

# Lab: Lambdas

## Objective

In this lab, we will practice writing lambdas in C# with a focus on utilizing the power of type inference. We aim to understand the difference in specifying types explicitly versus letting the C# compiler infer the types for us. By the end of this lab, we should be proficient in crafting concise lambdas and understand the scenarios where type inference can be a boon.

## Instructions

### Step 1: Type Inference

Use the built-in delegate types (`Func`, `Predicate`, and `Action`) explicitly and allow the rest of your lambda to be inferred. Write the following lambdas:

1. A lambda that takes two integers and returns their sum. Use the `Func<int, int, int>` delegate and assign it to a variable called `add`.
2. A lambda that checks if an integer is even. Use the `Predicate<int>` delegate and name the lambda `isEven`.
3. A lambda that takes a string and prints it. Use the `Action<string>` delegate and name it `printString`.

### Step 2: Inferring return type

In this exercise, you will define only the input parameter types, letting the compiler infer the return type. Remember to use `var`. Write the following lambdas:

1. A lambda that takes a `double` and returns its square. Name it `square`.
2. A lambda that takes two `strings` and concatenates them. Name it `concatenate`.
3. A lambda that returns an `int` and calculates the product of two numbers. Name it `multiply`.
4. A lambda returning a `bool` that checks if a given string starts with an uppercase letter. Name it `startsWithUppercase`.

### Step 4: Custom Delegate Inference

Define your own delegate, declare a variable of that delegate type, and assign a lambda to that variable. Let both parameters and return type of the lambda be inferred.
The variable should be called `toggleCase` and should toggle the case of a string so that all uppercase characters are turned lowercase and vice versa.

```{admonition} 🤔 Reflection
How do you feel about type inference? Can you think of situations where it might be helpful? When might it be less useful or potentially confusing?
```

## Challenge

Write the following lambdas:

1. A lambda that adds two numbers and assign it to a variable called `sum`.
2. A lambda that checks if a given number is positive. Name it `isPositive`.
3. A lambda that prints a line. Name this lambda `printLine`.
4. A lambda that greets a given name. For instance, for the name `"Chris"`, it should print `"Hello, Chris!"`. Name this lambda `greet`.
2. A lambda that checks the equality of two strings without considering their case. Name it `areSimilar`.



