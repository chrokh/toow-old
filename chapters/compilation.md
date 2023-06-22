# Compilation

You've written your first program and witnessed it spring to life on your screen. But have you ever wondered how the computer understands the instructions you've written? After all, computers speak in binary, 1s and 0s, not in human-readable languages like C#. This is where the process of compilation comes in, a vital step in bringing your code to life.

When you write code in a high-level language like C#, you're writing in a way that's easy for humans to understand. But for a computer to execute your code, it needs to be in a form the computer can understand. This is where a compiler comes in.

The compiler is a program that transforms your human-readable code into machine code. When you clicked "Start Debugging" in Visual Studio, you initiated this process of compilation. Your code was translated into a language your computer can understand and then saved as an executable file. This file is what your computer runs when you execute your program.

The compiler is like a translator, but instead of translating between human languages, it translates between human and computer languages.
The compiler also plays the role of a proofreader. It checks your code for errors before translating it. These are called compile-time errors, or compilation errors.
It takes the code you write, checks it for errors, translates it into machine code, and finally, outputs an executable file.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1121356672770772992/chrokh_two_people_with_speech_bubbles_and_symbols_from_differen_e9d77d1c-2bcb-4f44-9634-3cda19786939.png?width=2700&height=1350

A compiler translates between languages and checks for errors.
```

A common type of compilation error is a [syntax](syntax) error, which occurs when you break the grammatical rules of C#. But there are also other types of errors that the compiler will catch, such as using a variable before it's declared, or trying to perform an operation that isn't valid. These are all examples of compile-time errors, as they occur during the process of compilation.

It's worth noting that the C# compiler doesn't directly compile your code into machine code, but into an intermediate language called Common Intermediate Language (CIL). The .NET runtime then translates this CIL code into machine code just-in-time as your program runs. This allows C# programs to run on different types of computers without needing to be recompiled for each one.

And there you have it - the secret behind how your C# code comes alive on your computer. The process of compilation is an essential step in turning the instructions you write in your code into actions performed by your computer.

In the next chapter, we'll delve into what happens after your program is compiled: execution. This will give you a more complete understanding of the journey from writing code to running a program. Until then, happy coding!
