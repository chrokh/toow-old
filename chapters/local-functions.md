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

# Methods

%You've already been using a function Main, the entry point of a C# application. Now, let's dive deeper and understand what methods are and particularly explore the concept of Local Functions.

% However, traditionally, a 'method' refers to a function that is associated with an object or class (a topic we will explore later). For now, let's simplify and understand methods as a named block of code that performs a specific task.


%In C#, a function is a block of code designed to perform a particular task. Functions are the building blocks of readable, maintainable, and reusable code. A function typically takes some inputs, performs some processing, and can return a result.

Programming is all about breaking down complex tasks into smaller, manageable parts. Divide and conquer. One way we accomplish this is through the use of methods.
Methods is a key building block in writing maintainable code. They allow us to write code once and reuse it in multiple places, making our programs less redundant.

In C#, the words 'method' and 'function' are used somewhat interchangeably.
To simplify, we can understand both as a named block of code that might take some parameters, performs some task, and possibly returns a value.

Think of a method as a small machine in a factory: you feed it some raw materials (the inputs, known as 'parameters' or 'arguments'), it performs a specific task (known as the 'body' of the method) using these materials, and it spits out a finished product (the output, or 'return value').

To introduce methods, we're going to use a feature of C# known as 'local functions'.
All programs we've written so far has been written directly in the file `Program.cs`.
Assuming that you haven't disabled top-level statements (as mentioned in the chapter called [Hello world](hello-world)) you should be able to write and use local functions directly in `Program.cs`.
A method in C# looks like this:

```{code-cell}
void SayHello()
{
    Console.WriteLine("Hello, World!");
}
```

In this example, SayHello is a method. When we call this method in our code, it performs its task: it writes `"Hello, World!"` to the console.

Having defined this method, we can now 'call' it. Calling a method is also known as 'invoking' or 'running' it.

```{code-cell}
SayHello();
```


## Parameters

Methods can take parameters, which are like variables that get passed into the method. Parameters allow us to feed different inputs into our methods.


```{code-cell}
void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}
```

To call this method we must now also supply an argument that will serve as the value for the parameter `name`.

```{code-cell}
Greet("Chris");
Greet("World");
```

Since we specified that the `name` parameter must be of type `string` we cannot call this method and pass an argument of a different type.

```{code-cell}
:tags: [raises-exception]
Greet(true);
```

The error states that the `bool` that we passed cannot be implicitly converted into a `string` which is the type that was expected.

A method can take any number of parameters, separated by commas (`,`). This part of the method declaration is known as the 'parameter list'.

In the following code example we are defining a method named `Repeat`.

```{code-cell}
void RepeatPrint(string input, int times)
{
    string output = "";
    for (int i = 1; i <= times; i++)
        output += input;
    Console.WriteLine(output);
}
```

If we call the method with the values `Hello` and `3` as arguments, the method will print `HelloHelloHello` to the console.

```{code-cell}
RepeatPrint("Hello", 3);
```


## Return values

A method can also return a value to the part of the code that called it. This is specified using the `return` keyword.

Each method also specifies a return type. This is the type of the value that the method will return to the part of the code that called it. If a method doesn't return a value, we use the keyword `void`.

In the code examples above the return type of the methods was `void`.
There was no need to return anything since the methods themselves printed to screen.

Let's now rewrite them so that they return values instead of printing on their own.

```{code-cell}
string MakeGreeting(string name)
{
    return $"Hello, {name}!";
}
```

Here, `MakeGreeting` is a method that takes one parameter: `name`, which is a `string`. It returns a `string` that is a greeting for the given name.
Let's also rewrite the `RepeatPrint` method to make it only repeat and not both repeat and print.

```{code-cell}
string Repeat(string input, int times)
{
    string output = "";
    for (int i = 1; i <= times; i++)
        output += input;
    return output;
}
```

Now that we're using the `return` keyword our methods are more reusable than before. We can now use method composition to solve more complex problems without writing additional code.

```{code-cell}
MakeGreeting(Repeat("Chris", 2));
```

```{note}
A 'local method' in C# is a method that's declared inside another method. In the examples in this chapter we've defined all methods in the `Main` method of the program.
We will explain this in further detail in future chapters.
```


