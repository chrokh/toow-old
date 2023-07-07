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

# Constants

When we introduced variables we emphasized how flexible they are. They can be assigned a value, then reassigned a different value at any time. This ability to change, or mutability, is part of what makes variables so powerful. But sometimes, this flexibility isn't what we want. In some situations, we want to set a value once and ensure that it never changes. This is where constants come in.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1121469118856577024/chrokh_a_simple_and_flat_illustration_of_a_glass_jar_with_a_pad_a71fd77f-c504-4d4a-8c1b-03aaf88bcfd0.png?width=1268&height=634
A constant is a variable whose value cannot be reassigned, like a jar whose content cannot be replaced.
```

In C#, the keyword `const` is used to declare a constant. A constant is similar to a variable in that it represents a value. However, once a constant is assigned a value, that value cannot be changed. This is why it's called a 'constant'.

Consider this example:

```{code-cell}
const int HoursInDay = 24;
```

Here, we declare a constant named `HoursInDay` and assign it the value `24`. This value represents the number of hours in a day - a fact that isn't going to change. If we try to assign a new value to `HoursInDay` later in our code, we'll get a compile-time error.

```{code-cell}
:tags: [raises-exception]
HoursInDay = 23;
```

In essence, declaring a value as a constant is like making a promise to the compiler that this value will not change. If you try to break this promise, the compiler won't let you get away with it.

Constants in C# are not as flexible as variables when it comes to the **types of data** they can hold and the **kind of expressions** they can be assigned. The types of constants can only be of the following: numeric types (like `int`, `double`, and `decimal`), `bool`, `char`, `enum`, and `string`. All the types that can be stored in a `const` are [immutable](immutability).

What further separates constants from variables is that the expressions assigned to constants need to be **fully evaluated at compile-time**. In other words, the value of a constant must be known and determinable when the code is being compiled. This is why constants are commonly assigned literals, like `const int x = 5;`. However, constants can also be assigned any expressions using simple operators (like arithmetic operators) and constant operands, as long as the expression can be fully evaluated at compile-time. For instance, `const int x = 5 * 5;` is valid because the expression `5 * 5` can be determined at compile-time.

The fact that constants must be compile-time constants means that they cannot be assigned a value that is determined dynamically at runtime. This makes constants an excellent choice when you need a value that is unchanging and known at the time you're writing your code.

And with this understanding of constants, you've taken another step into the realm of C#. The journey continues, so let's move on to the next chapter.

%Understanding when to use variables and when to use constants is a fundamental part of programming. By declaring a value as a constant, you're making your code safer and more expressive. It tells anyone reading your code that this value is a fundamental truth within your program that won't change.

