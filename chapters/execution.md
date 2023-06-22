# Execution

After you've written your code and it's been compiled, you might think the journey ends there. But actually, that's where the magic truly begins. When your code is executed, your ideas and instructions come to life on your computer screen. But how does this process of execution work, and what is the runtime? Let's dive in.

Think back to when you clicked "Start Debugging" in Visual Studio. Your code was compiled into an intermediate language. Now, this intermediate code needs to be converted into machine code, which is the language your computer speaks, so that it can be executed. This process happens during what we call the runtime.

The term "runtime" refers to the period when your program is running, or executing. It's the stage where your program starts performing the actions you've coded. It's like the play time for a theater production – all the rehearsals (coding and compilation) have been done, and now it's time for the performance.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1121374408406216764/chrokh_A_theatrical_play_on_a_beautiful_stage_with_a_large_audi_3f466beb-977d-47b9-986a-ba035a43ec2a.png

Runtime is like play time for a theater production.
```

The .NET runtime system is responsible for executing your compiled code. Remember that the C# compiler doesn't directly convert your code into machine code. Instead, it translates your code into an intermediate language, called Common Intermediate Language (CIL). The .NET runtime then takes this CIL code and converts it into machine code just-in-time as your program runs. This process is known as just-in-time compilation, or JIT compilation.

As the program executes, it follows the sequence of instructions you've written in your code. If your code says to print `Hello, World!`, that's what your computer will do when it executes the program. Execution is the stage where your code does what it's been instructed to do.

During the runtime, you can also encounter a different type of errors, called runtime errors. These errors occur when something goes wrong while the program is running. For instance, trying to divide a number by zero or accessing an out-of-bounds index in an [array](array) would cause a runtime error. Unlike compile-time errors, these aren't detected by the compiler but crop up when the program is running.

And that's the essence of execution and runtime. It's the stage where your program takes the spotlight and performs the instructions you've coded. This process is a pivotal part of the journey from writing code to seeing your program in action.
%In the next chapter, we'll delve into how to better understand the actions of your program by interpreting your code's output. Until then, keep coding!
