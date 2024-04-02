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

# Recursion

Recursion is a fundamental concept in computer programming that involves a method or function calling itself in order to solve a problem. In simpler terms, recursion is when a function performs a task that involves invoking itself.

%https://media.discordapp.net/attachments/1118630713084870736/1123948082602717294/chrokh_an_illustration_of_an_endless_mirror_in_a_mirror_ab3cae9f-232f-4ab9-a959-f130bb32ebe7.png?width=1076&height=470
```{figure} ../images/cover-recursion.jpg

A recursive function is a function that calls itself, like a mirror reflecting into a mirror.
```

To illustrate recursion, let's rewrite the function we wrote in an earlier chapter that we called `Repeat`. The purpose of the function was to repeat a given `string` a given number of times:

```{code-cell}
string Repeat(string input, int times)
{
    if (times <= 0) // Base case
        return "";
    else            // Recursive case
        return input + Repeat(input, times - 1);
}
```

In this example, the `Repeat` function is recursive because it calls itself within its own definition. It takes a `string` which is to be repeated, and an integer which defines how many times to repeat.
In the body of the method there's an `if` statement with two cases.
The first is what we call the 'base case' and the second the 'recursive case'.
If `times` is less than or equal to zero then we are done, and we can simply return an empty `string`.
If however `times` is greater than zero then we must return the `input` `string` concatenated with whatever result we get from calling `Repeat` again but where `times` is deceremented by `1`.
Each call to the function `Repeat` effectively adds another repetition of the `input` string to the output, until `times` is less than or equal to zero.

```{code-cell}
string result = Repeat("Hello", 3);
Console.WriteLine(result);
```

Keep in mind that although recursion can be a powerful tool, it also has its pitfalls. The most notable of these is the potential for a 'stack overflow' error if the recursion is too deep. That is, if the function ends up calling itself too many times. To avoid this, always ensure that a recursive function has a clear base case that will be met at some point, thereby ending the recursion. In our `Repeat` function, the base case is `times <= 0`.

Recursion can often provide elegant solutions to complex problems. However, it can also be more challenging to understand and debug than iterative (loop-based) solutions, so it should be used judiciously.
Recursion tends to be more common in functional programming rather than object oriented programming. However, some object oriented design patterns, which we will cover much later, does indeed make use of recursion.
So it's really useful to familiarize yourself with this idea.

