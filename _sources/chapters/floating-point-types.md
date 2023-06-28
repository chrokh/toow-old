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

# Floating-point types

In previous chapters, we explored integral types like int which can only hold whole numbers. But what if you need to represent a number with a fraction, like `3.14` or `0.99`? That's where floating-point types come into play.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1123218846254370867/chrokh_a_simple_flat_illustration_of_a_ruler_78310718-214a-49af-8bb2-28a2513d0b8a.png?width=2700&height=1180

```

In C#, there are three kinds of floating-point types:

- `double`
- `float`
- `decimal`

These types can represent values that have a fractional part, that is, numbers that are to the right of the decimal point. However, they have different levels of precision and range.

A `float` is a single-precision floating point type that takes up 4 bytes of memory and can accurately represent approximately 7 digits after the decimal point.
A `double`, on the other hand, is a double-precision floating point type. It occupies 8 bytes of memory and can accurately represent approximately 15-16 digits after the decimal point. It has a much larger range.
Unless you know why, it is reasonable to default to using `double` instead of `float`.


```{code-cell}
float pi1 = 3.14f;
double pi2 = 3.14;
```

When dealing with floating-point numbers, it's important to note that they are not exact representations of real numbers. This is because there are an infinite number of real numbers, but only a finite number of bits available to represent them. As a result, floating-point arithmetic can sometimes produce results that are slightly off from what you might expect. This is known as "floating-point error" or "round-off error", and it's a fundamental aspect of working with floating-point numbers, not just in C#, but in all programming languages.

```{code-cell}
double result = 0.1 + 0.2;  // You might expect this to be 0.3
Console.WriteLine(result);  // But the output will be 0.30000000000000004
```

So, always be careful when comparing floating-point numbers for equality. A better approach is to check if the absolute difference between the two numbers is within a small tolerance.

```csharp
result == 0.3                    // false
result <= 0.31 && result >= 0.29 // true
```

The `decimal` type is a high-precision floating point type designed specifically for financial and monetary calculations where precision is paramount. The `decimal` type can accurately represent up to 28-29 significant digits. It has a smaller range than both `float` and `double`.

```{code-cell}
decimal cash = 3.14m;
```

The suffix `m` indicates a `decimal` literal. The `decimal` type, while slower in computation due to its high precision, accurately represents base 10 fractions, making it suitable for financial and monetary calculations.

```{code-cell}
decimal a = 0.1m + 0.2m;
Console.WriteLine(a);  // The output will be 0.3
```

In summary, use `double` for calculations involving real numbers, such as scientific calculation, where loss of precision is tolerable. Use `decimal` when dealing with financial data or when precision is more important than performance.

