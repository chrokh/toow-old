# Hello world

Think of writing your first program as saying your first word. It's a profound moment, a starting point for countless conversations with your computer. In programming, that first word is usually "Hello, World!"

%https://media.discordapp.net/attachments/1118630713084870736/1121352394454872104/chrokh_an_illustration_of_a_baby_speaking_into_a_microphone_8b6183c9-6680-437d-ae58-b6cff4098a00.png?width=2422&height=1358
%https://media.discordapp.net/attachments/1118630713084870736/1121355527608356964/chrokh_an_illustration_of_a_happy_baby_speaking_into_a_micropho_59809871-589a-4aa4-a2a3-9c1e81457dc8.png?width=2700&height=1350
%https://media.discordapp.net/attachments/1118630713084870736/1121353002993856512/chrokh_an_illustration_of_a_baby_and_a_microphone_32bf9db1-b834-44e2-b3a5-1eb2083b7ea8.png?width=2422&height=1358
```{figure} https://media.discordapp.net/attachments/1118630713084870736/1121367396259745902/chrokh_an_illustration_of_a_baby_speaking_into_a_microphone_pin_12c6390e-e19d-46d8-b1d5-b6553f99233f.png?width=2700&height=1350
```

To start our conversation in C#, we'll use a tool called Visual Studio. Ensure you've installed it and follow these steps to create your first C# Console project:

1. Open Visual Studio and select "Create a new project".
1. In the project template screen, select "Console App (.NET)" and click "Next".
1. Name your Project and Solution "Hello World", choose a location to save your project, and click "Next".
1. Ensure that the target framework is **.NET 7.0** and "Do not use top-level statements" is **unchecked**. Then, click "Create".
1. After the project is created, you'll see a file named "Program.cs" opened in the editor with the following lines:

```csharp
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
```

This is your first C# program! It was generated automatically when you created your project.

The first line is a comment, which is a note for programmers and is ignored by the C# compiler. The link leads to more information about the new console project structure.

The second line is a statement that calls the WriteLine method of the Console class, which prints the phrase "Hello, World!" to the terminal.

To run your program, simply click the green "Play" button in the toolbar, or navigate to "Debug" in the top menu and select "Start Debugging". This action compiles your code into a language your computer understands and then executes it. Don't worry about the details for now; we'll dive into this process in the upcoming chapters.

If you find that the terminal window opens and immediately closes after running your program, it's because your terminal is set to close when the program finishes executing. A simple workaround is to add `Console.ReadKey();` after the `WriteLine` statement, like this:

```csharp
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
Console.ReadKey();
```

This extra line of code tells your program to wait for a keypress before closing the terminal window, which causes the window to remain open.

Before leaving this chapter, let's try to change the message that the program prints. Currently, your program prints `Hello, World!`. Can you change the program so that it prints a different message of your choice?

Congratulations on writing and running your first program! This might feel like a small step, but it's the start of a grand journey into the world of programming. In the next chapter, we'll begin to uncover the magic that transforms your code into an application your computer can run. Exciting times ahead!
