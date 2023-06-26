(statements)=
# Statements


%In this chapter, we'll tie together everything we've learned about expressions and operators to look at statements, the building blocks of our programs.

If we think of code as language, then statements in C# are like complete sentences.
In C#, a statement is the smallest standalone element of the language that expresses some action to be carried out. It is an instruction written in the source code for execution.

Just like our previous jar metaphor, think of a statement as a step-by-step instruction in a recipe. For example, "Put the marble in the jar," or "Remove a marble from the jar." It represents an action or a sequence of actions.

For instance, when you write `Console.WriteLine("Hello, World!");` you are creating a statement – one that instructs the program to output the string `"Hello, World!"` to the console.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1122846176950100099/chrokh_a_simple_flat_illustration_of_a_factory_assembly_line_811ce040-7c43-4de6-a39c-d259bb1c6104.png?width=2700&height=1180

A sequence of statements is executed like the steps on a factory assembly line, or crossed off one by one like the items on a todo list.
```

There are many different types of statements in C#. Basic ones include:

- Declaration statements
- Assignment statements
- Expression statements
- Block statements

A declaration statement introduces a new variable or constant. Here is an example:

```csharp
int numberOfMarbles;
```

In this statement, we are declaring a new variable named `numberOfMarbles` of type `int`.

An assignment statement assigns a value to a variable. For instance:

```csharp
numberOfMarbles = 5;
```

This statement assigns the value `5` to the variable `numberOfMarbles`.

An expression statement is made up of an expression. For instance:

```csharp
Console.WriteLine(numberOfMarbles);
```

This statement prints out the value of `numberOfMarbles` to the console.
It is expression statement not because `numberOfMarbles` is an expression (which it is) but because we're invoking the method `WriteLine` and then terminating the line with semicolon (`;`).
We'll talk more about methods later.

An expression statement is a type of statement that contains an expression. But not all expressions can be used as expression statements. In C#, the types of expressions that can also be used as statements include method calls, object creation expressions using the `new` keyword (both of which we'll talk about later), and assignments. For instance, the assignment expression `a = 5` can be used as an expression statement by adding a semicolon to the end `a = 5;`.
Remember, while all expression statements contain expressions, not all expressions can serve as statements on their own. Expressions used in this way perform an action and often change the state of the program, like modifying a variable or outputting a value.
%Similarly, if you have a method Display() and you call it as Display();, this is a method call expression that serves as an expression statement.

Finally, a block statement, or a block, is a group of statements that are executed sequentially. It is written between opening and closing curly braces `{` `}`.

```csharp
{
    int numberOfMarbles;
    numberOfMarbles = 5;
    Console.WriteLine(numberOfMarbles);
}
```

In this block, three statements are executed sequentially - a declaration, an assignment, and an expression statement.
Block statements are used in [selection](selection) and [iteration](iteration) statements which we will delve into in upcoming chapters.

%It's important to remember that these categories are not exclusive. For example, a block can contain declarations, assignments, and expressions.

Statements structure and control the flow of our code. They allow us to execute actions and are fundamental to creating meaningful programs.

%Understanding the basics of how statements work gives us a foundation for more advanced topics, such as control flow mechanisms like selection and iteration, which we'll delve into in upcoming chapters.

%Now that we have discussed the building blocks of code, namely values, variables, data types, expressions, operators, and now statements, we're ready to look at how we can make our code react to conditions and repeat tasks, making our programs more dynamic and interactive.

