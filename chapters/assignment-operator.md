# Assignment operator

As we've already seen in previous chapters, the assignment operator `=` plays a crucial role in C#. It is the operator that allows us to assign values to our variables. However, the assignment operator has a few more facets worth discussing.

At its core, the assignment operator is used to assign the value of its right-hand operand to its left-hand operand. For instance:

```csharp
int numberOfMarbles = 5;
```

In this example, `5` is assigned to `numberOfMarbles`. This means that the variable `numberOfMarbles` now holds the value `5`.

Something to bear in mind is that the assignment operator is 'right-associative'. This means that when there are multiple assignment operators in a single statement, they are evaluated from right to left. Let's see an example:

```csharp
int a, b, c;
a = b = c = 10;
```

In this code snippet, all three variables `a`, `b`, and `c` will end up holding the value `10`. Here's how it works: first, `10` is assigned to `c`. Then, this assigned value is assigned to `b` whose assigned value is then assigned to `a`. The right-associativity of the assignment operator ensures this cascade of assignments works correctly. If we explicitly add parenthases it looks like this: `a = (b = (c = 10))`.

One more interesting aspect of the assignment operator is that it's not just about assigning values - it also returns a value. Specifically, the assignment operator `=` returns the value that was assigned. This is why it's possible to do multiple assignments in one line, like in the example above.

It's important to note that the assignment operator is distinct from the [equality operator](equality-operators) `==,` which we've discussed in a previous chapter. While they might look similar, they serve very different purposes. The assignment operator `=` assigns a value to a variable, while the equality operator `==` checks if two values are equal.

%The assignment operator is a fundamental tool in C# that you'll use constantly as you code. Understanding its behavior will help you write code that's cleaner, more efficient, and easier to understand.
