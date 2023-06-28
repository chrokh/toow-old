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

# Iteration

In writing programs, there will be times when you'll need to repeat a block of code multiple times. This repetitive execution is called "iteration", and it is a fundamental aspect of programming. C# provides several iteration statements, including `while`, `do-while`, `for`, and `foreach`. These are known as loops.

- The `while` statement executes a block *zero* or more times as long as some condition remains true.
- The `do` statement executes a block *one* or more times as long as some condition remains true.
- The `for` statement which executes a block for as long as some condition remains true, given some initializer, and some iterator.
- The `foreach` statement executes a block for each element in a collection such as a `string`.

The simplest loop is perhaps the `while` loop.  A while loop will execute a block of code as long as its condition expression evaluates to `true`. Here's an example:

```{code-cell}
int i = 1;
while (i <= 3)
{
    Console.WriteLine(i);
    i++;
}
```

Here's an explanation of what's going on: We first declare an integer variable `i` and assign it the value of `1`. The `while` loop then begins, checking if `i` is less than or equal to `3`. If the condition is `true`, the code inside the braces ({}), meaning the block, gets executed. In this case it means printing the value of `i` to the console and then incrementing `i` by one. After the code block has been executed, the loop returns to the start, checks the condition again, and if it's still `true`, then the block of code is executed again. This looping continues until `i` is no longer less than or equal to `3`, at which point the loop stops and the program moves on.

The `do-while` loop is a variant of the `while` loop. Unlike the `while` loop, it checks its condition *after* each loop rather than *before*. This means the block of code will be executed at least once, even if the condition is `false`, because the code block is executed before the condition is even tested. Here's an example:

```{code-cell}
int i = 1;
do
{
    Console.WriteLine(i);
    i++;
} while (i <= 3);
```

The perhaps most commonly used loop is the `for` loop. A `for` loop includes an initializer, a condition, and an iterator, separated by semicolons (`;`)

Here is a simple example of a for loop that prints numbers from `1` to `3`:

```{code-cell}
for (int i = 1; i <= 3; i++)
{
    Console.WriteLine(i);
}
```

In the for loop above, `int i = 1` is the initializer, `i <= 3` is the condition, and `i++` is the iterator. The loop executes the block of code if the condition evaluates to `true`, then runs the iterator which increments `i` by one, and then checks the condition again. The loop stops once the condition is no longer `true`.

What initializer, condition, and iterator to use is of course entirely up to you.

You can of course also nest loops in order to create loops in loops.

Here's a more complex example where we are printing all numbers in the geometric sequence less than or equal to `8` starting from `2`, as asterisks.

```{code-cell}
for (int n = 2; n <= 8; n *= 2)
{
    string line = n + ": ";
    for (int m = 1; m <= n; m++)
    {
        line += "*";
    }
    Console.WriteLine(line);
}
```

Lastly, C# provides the `foreach` loop, which is used to iterate over collections. Since we have yet to talk about collections, we'll discuss more use-cases for the `foreach` loop in a later chapter.
However, we can illustrate its usage with a `string`, which can be viewed as a sequence of characters (`char`):

```{code-cell}
string message = "ABC";

foreach (char c in message)
{
    Console.WriteLine(c);
}
```

In this `foreach` loop, the variable `c` takes on the value of each character in the string `hello` one by one, from beginning to end. For each character, it writes that character to the console. This loop continues until all characters in the string have been processed. It's a convenient way to process each item in a collection without needing to manually control the loop variable or check for the end of the collection.

Each type of loop serves its unique purpose and enables you to control the flow of your program. However, always be cautious to avoid creating an "infinite loop", where your loop continues indefinitely because it has no termination condition. Always ensure your loops have a clear exit condition to prevent your program from hanging or crashing.



