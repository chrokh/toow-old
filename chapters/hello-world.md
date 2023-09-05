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

# Hello world

Think of writing your first program as saying your first word. It's a profound moment, a starting point for countless conversations with your computer. In programming, that first word is usually 'Hello, World!'.
Here's the gist of that program:

```{code-cell}
:tags: ["remove-output"]
Console.WriteLine("Hello, World!");
```

If we run that program, here's what we get:

```{code-cell}
:tags: ["remove-input"]
Console.WriteLine("Hello, World!");
```

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1148542428651991051/chrokh_illustration_of_a_rocket_launching_efce4cd4-15b5-48f7-a529-f41d0af4b2ab.png
Like a rocket ready to launch, 'Hello World' is the program that propels you into the wonderfully powerful world of coding.
Life will never be the same again.
```

To be able to write this monumental program we must first decide where we're going to write and execute our code.
We usually refer to this as what 'development environment' we're using.

If you're completely new to coding I recommend that you use the online environment Replit but we'll also outline the basics steps for if you want to use 'Visual Studio Code' (also known as VS Code), or 'Visual Studio' as well.



## Getting started with Replit

Here's a quick overview of how to get started using [Replit](https://replit.com).

1. Navigate to [replit.com](https://replit.com) and create an account.
2. Press the button 'Create Repl'.
3. Choose the Template 'C#'. Do *not* choose the template 'Mono C#'.
4. Give your Repl a Title and click 'Create Repl'.
5. Open the main code which is called `main.cs` and verify that Replit has generated the following code for you:

    ```csharp
    using System;

    class Program {
        public static void Main (string[] args) {
          Console.WriteLine ("Hello World");
        }
    }
    ```
6. Open the project file which is called `main.csproj` and remove the line that says:

    `<StartupObject>Program</StartupObject>`

    If you keep the line you will disable the feature known as [top-level statements](top-level-statements) which will make our coming steps unnecessarily complicated.

7. Go back to the main code file (`main.cs`) and replace its contents with the following simpler program that makes use of what we later will learn is called [top-level statements](top-level-statements):

    ```csharp
    using System;

    Console.WriteLine("Hello, World!");
    ```

8. Run your program by clicking the green 'Play' button in the top or using the shortcut `Cmd+Enter` on Mac or `Ctrl+Enter` on Windows.
9. Verify that the output you get is:

    ```output
    Hello, World!
    ```


## Getting started with Visual Studio Code

```{note}
Coming soon.
```


## Getting started with Visual studio

Let's look at how to get started if you're using the program Microsoft Visual Studio.

```{warning}
Microsoft will drop support for Visual Studio on Mac so it is not advisable to learn Visual Studio if you're on a Mac.
```

```{note}
More detailed instructions can be found in a [tutorial published by Microsoft](https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-console?view=vs-2022).
```

1. Download and install [Visual Studio](https://visualstudio.microsoft.com).
2. Open Visual Studio and select 'Create a new project'.
3. In the project template screen, select 'Console App (.NET)' and click 'Next'.
4. Give your 'Project' and 'Solution' a name (such as 'Hello World'), choose a location to save your project, and click 'Next'.
5. Ensure that the target framework is **.NET 7.0** and 'Do not use top-level statements' is **unchecked**. Then, click 'Create'.

6. After the project is created, you'll see a file named `Program.cs` opened in the editor with the following lines:

    ```csharp
    // See https://aka.ms/new-console-template for more information
    Console.WriteLine("Hello, World!");
    ```

7. Run your program by clicking the green 'Play' button in the top or using the shortcut `Cmd+Enter` on Mac or `F5` on Windows.
Alternatively, you can navigate to `Debug > Start Debugging` in the top menu.

8. Verify that the output you get is:

    ```output
    Hello, World!
    ```

```{note}
If you find that the terminal window opens and immediately closes after running your program, it's because your terminal is set to close when the program finishes executing. The simplest workaround is to add `Console.ReadKey();` on a new last line of the file.

This extra line of code tells your program to wait for a keypress before closing the terminal window, which causes the window to remain open.
```


## Running your first program

When you're pressing the 'Play' button in your development environment your code is [compiled](compilation) into a language that your computer understands and then [executes](execution) it. Don't worry about the details for now, we'll explain what all this means in the coming chapters.

If you've got lines starting with two forward slashes (`//`) then these are [comments](comments).
Comments are like notes for programmers and these are ignored by the compiler.
We'll talk more about this later.

If you've got lines starting with the word `using` then this is an [import](imports) which makes additional types available to your program. In this case it makes it possible for us to use the `Console` class. We'll explain this later on so don't worry about this line now but keep it in.

The line that reads `Console.WriteLine("Hello world");` is however a [statement](statements).
It calls the static `WriteLine` [method](static-methods) of the `Console` class, passing the [`string`](data-types) [value](values) `"Hello, World!"`, which causes that message to be printed to the terminal.

This is your first program! Hooray.
Let's run it by pressing the 'Play' button.

```{code-cell}
Console.WriteLine("Hello, World!");
```


## Conclusion

Congratulations on writing and running your first program! This might feel like a small step, but it's the start of a grand journey into the wonderfully powerful world of programming. Your life is never going to be the same again. In the next chapter, we'll begin to uncover the magic that transforms your code into an application your computer can run. Exciting times ahead!

```{admonition} Exercise
Currently, your program prints `Hello, World!`. Can you change the program so that it prints a different message of your choice? Maybe `Hello, my name is <your name>.`.
```
