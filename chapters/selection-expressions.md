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

# Selection expressions

Now that we have an understanding of how to control the flow of our programs using selection statements, let's look at how we can achieve similar functionality with a more compact syntax using selection expressions. Selection expressions are an elegant way to select between two or more expressions based on a condition.

As you may recall, the key difference between [statements](statements) and [expressions](expressions) in C# lies in how they're used and what they produce. A statement performs an action and doesn't return a value. It's like a command that you give to the computer. An expression, on the other hand, evaluates to a value and can be used as a part of larger expressions or statements. In other words, an expression is a piece of code that produces a value.

In the context of this chapter, the ternary conditional operator and switch expressions are selection expressions. This means they evaluate a condition and produce a value based on that condition. This contrasts with the selection statements we discussed in the previous chapter, which perform actions based on conditions but do not produce values.
%Understanding the difference between these concepts is fundamental to understanding how to write and structure your code in C#.

## Ternary Conditional Operator

One of the most common selection expressions in C# is the ternary conditional operator, which is written as `?`. The ternary operator takes three operands: a condition to check, a result for `true`, and a result for `false`.

Here's how you use it:

```{code-cell}
int a = 10;
int b = 20;

string result = (a > b) ? "A" : "B";

Console.WriteLine(result);
```

In this code, the condition expression `a > b` is checked. If it evaluates to `true`, `"A"` is assigned to the variable `result`, but if it evaluates to false then `"B"` is assigned.


## Switch Expressions

Switch expressions provide a more concise syntax than switch statements for some common scenarios.

Here's an example of a switch expression:

```{code-cell}
var day = DayOfWeek.Mon;

string dayType = day switch
{
    DayOfWeek.Sat => "Weekend",
    DayOfWeek.Sun => "Weekend",
    _ => "Weekday"
};

Console.WriteLine(dayType);

enum DayOfWeek { Mon, Tue, Wed, Thu, Fri, Sat, Sun };
```

In this code, the variable day is being switched upon. If `day` is `Sat` or `Sun`, the `string` `"Weekend"` is assigned to the variable `dayType`. For any other day, `"Weekday"` is assigned. The `_` is a discard pattern that matches anything, similar to the `default` case in a `switch` statement.
We'll learn more about [pattern matching](pattern-matching) in a later chapter.

Both ternary conditional operators and switch expressions allow us to express selection in a concise and elegant way, especially in scenarios where the code primarily assigns values based on conditions. They are powerful tools in any C# programmer's toolbox!

