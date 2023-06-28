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

# Selection statements

In programming, it's common to encounter situations where different actions need to be performed based on different conditions. This is where the concept of 'selection' comes into play.
Selection allows us to choose different paths of execution based on certain conditions. In C#, this is achieved using selection statements - namely `if` statements or `switch` statements.


## The `if` statement

The `if` statement is the simplest form of selection. It allows the program to choose whether to execute a certain block of code based on whether a condition is `true` or `false`.

Here's an example:

```{code-cell}
int numberOfMarbles = 10;

if (numberOfMarbles > 0)
{
    Console.WriteLine("There are marbles in the jar.");
}
```

In this example, the message `"There are some marbles in the jar."` will only be printed if the condition expression `numberOfMarbles > 0` evaluates to `true`.


%## `else`

You can add an `else` part to an `if` statement, which provides an alternative block of code that will be executed if the condition is `false`.

Here's an example:

```{code-cell}
int numberOfMarbles = 0;

if (numberOfMarbles > 0)
{
    Console.WriteLine("There are some marbles in the jar.");
}
else
{
    Console.WriteLine("The jar is empty.");
}
```

In this example, if the expression `numberOfMarbles > 0` evaluates to `true`, the message `"There are some marbles in the jar."` will be printed. If it evaluates to `false`, the message `"The jar is empty."` will be printed instead.


%## `else if`

If there are several conditions that need to be checked, you can nest `if` statements by using the `else if` syntax. This allows you to check multiple conditions and execute different code blocks depending on which condition is `true`.
%It extends the if...else structure by providing multiple conditional checks, each with its own code block.

Here's an example:

```{code-cell}
int numberOfMarbles = 10;

if (numberOfMarbles > 50)
    Console.WriteLine("Wow, that's a lot of marbles!");
else if (numberOfMarbles > 20)
    Console.WriteLine("That's a fair number of marbles.");
else if (numberOfMarbles > 0)
    Console.WriteLine("Not many marbles, but it's a start!");
else
    Console.WriteLine("No marbles in the jar.");
```

In this example, the program first checks if `numberOfMarbles > 50`. If this condition is not met, it checks the next condition (`numberOfMarbles > 20`), and so on. Once a condition is met, the corresponding code block is executed, and the rest of the conditions are ignored. If none of the conditions are met, the code block in the `else` is executed. This allows for a finer control flow, depending on the value of the variable.

Note that in the example above, we omitted the curly braces surrounding each associated block. This is possible when a block consists of a single statement.


## The `switch` statement

The `switch` statement provides a way to choose between several alternatives. It's especially useful when you have a variable that can have one of several definite values and you want to perform different actions for each of these values.

Here's an example using our `TrafficLightColor` from the chapter on [enums](enumeration-types).

```{code-cell}
TrafficLightColor currentColor = TrafficLightColor.Red;

switch (currentColor)
{
    case TrafficLightColor.Red:
        Console.WriteLine("Stop!");
        break;

    case TrafficLightColor.Yellow:
        Console.WriteLine("Get ready...");
        break;

    case TrafficLightColor.Green:
        Console.WriteLine("Go!");
        break;
}

enum TrafficLightColor { Red, Yellow, Green };
```

In this example, the switch statement checks the value of `currentColor`. If it's `Red`, it prints `"Stop!"`. If it's `Yellow`, it prints `"Get ready..."`. If it's `Green`, it prints `"Go!"`.

The `break` keyword is used after each case to indicate that the program should exit the `switch` statement once it has found a matching case and executed the associated block of code.
You must use either `break`, `throw`, or `return` in each associated block.
We'll talk about the latter two keywords in later chapters.

The term "Control flow" refers to the order in which the statements, instructions, or function calls of an imperative or a declarative program are executed or evaluated. The control flow of a program is determined by its control structures (like [loops](iteration), conditional statements, and [function calls](local-functions)), hence the name. It's about deciding what code to execute next. When we use structures like `if`, `else if`, and `else`, we are controlling the flow of the program, deciding which blocks of code to run based on specific conditions.

These selection statements form the basis for making decisions in your code. In the next chapter, we will explore a different aspect of selection in C#: selection expressions. Stay tuned!
