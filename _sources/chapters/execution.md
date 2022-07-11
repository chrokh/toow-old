(execution)=
# Execution

To execute, also known as run, a program is to let a machine carry out the instructions of the program.
The effect produced by the machine is in correspondence with the semantics of the instructions of the program.
All this is just a complicated way of saying that when you run a program, the machine does what the program says, as defined by the programming language's semantics.



## Run-time

When something happens as the program is running we refer to it as happening at "run-time".
What can happen at run-time beyond letting the program run?
Two obvious things that can happen are that syntax or semantic errors can occur, and that we can search for such errors by automatically running the application in a large number of different ways.
We will discuss program correctness in a later chapter [{numref}`Chapter %s<correctness>`].

When we talk about something happening at "run-time" we are using the word as an adverb of time.
The word "runtime" is however also sometimes used as a noun.
In this book we add a hyphen between the word "run" and "time" when we are using it as an adverb, and we use it without a hyphen if we are using it as a noun.

In the context of C# and .NET, you might come across the word "runtime" when discussing "Common Language Runtime" (CLR).
The CLR is essentially the interpreter that runs bytecode written in the Common Intermediate Language (CIL) which is what the .NET compilers output.
Please refer to the chapter on Compilation [{numref}`Chapter %s<compilation>`] for a more extensive explanation.

% https://www.ibm.com/docs/en/db2/10.1.0?topic=routines-net-common-language-runtime-clr

```{exercise}
What do we mean when we say that something happens at *run-time* as opposed to at *compile-time*?
```



## Run-time errors

At first glance it might seem weird that a program that actually successfully compiles *still* can crash when it's then executed.
Unfortunately this is however the case and there's a multitude of reasons as to why this might happen.

A commonly cited run-time error is division by zero.
In mathematics, division by zero is undefined which means that many programming languages (C# included) throws, what's known as, an exception [{numref}`Chapter %s<exceptions>`].
We'll talk more about exceptions later.
But how could this happen?
Can't the compiler figure out that we are dividing by zero and tell us by emitting an error?
Well, only in some very direct cases.

Consider a program that simply does nothing but simply divide the literal integer $42$ by the literal integer $0$ and then prints the result to screen.

```csharp
Console.WriteLine(42 / 0);
```

This program cannot be compiled.
If we try then we will get a compilation error and no program.
So far so good.
The compiler is smart enough to realize that we will always divide by zero if this code is reached and refuses to construct the program since it will crash at run-time whenever this piece of code is reached.
The error might say something like:

```output
Compilation error (line 7, col 19): Division by constant zero
```

However, by adding the tiniest bit of indirection (more on indirection in [{numref}`Chapter %s<indirection>`]) we can, let's call it, "trick" the compiler to compile the program.
Suddenly we have program that crashes at run-time instead of at compile-time.
I know we haven't talked about variables yet, but by storing our constant zero in a variable and then using that variable in the division we've introduced enough indirection for the compiler to not dare guaranteeing that our program always will crash and hence shouldn't be compiled.
When we run the program we get an exception which might look something like this:

```output
Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
```

Note how the compilation error occurs when we *compile* the program, while the exception occurs when we *run* the program.

Another way to get a division-by-zero error at run-time would be to ask the user of the program to input a number.
In this case there is literally no way for the compiler to know what the user is going to type.
Hence, the compiler does not complain that we run the risk of dividing by zero.

It should be noted that languages are very different and *what works in some languages might not work in others*.
It all comes down to the syntax and semantics of the language in question.
It is entirely conceivable that a language could exist that didn't allow you to divide numbers unless the dividend was of a data type that guaranteed that it is non-zero.

```{exercise}
Why can a program that doesn't have compilation errors still fail at run-time (meaning upon execution)?
```

Run-time errors that can be found by a machine are called "exceptions".
Exceptions can be "caught" and handled by us when we write our programs.
More on this in the chapter on Exceptions [{numref}`Chapter %s<exceptions>`].



## `dotnet run`

Let's pick up where we left off in the chapter on Compilation [{numref}`Chapter %s<compilation>`].
Assume that we've compiled our Translator program using the basic command `dotnet build`.

To execute a C# program we must first compile it.
If we use the command line program `dotnet`, which we have previously discussed, then it is as simple as issuing the command:

```bash
dotnet run
```

The `dotnet` program will simply look for a `.csproj` file in the folder where we currently are, first compile it (or in `dotnet` lingo, first "build" it), and then run the executable immediately if the compilation was successful.

We have already discussed the command `build` that is used to compile C# projects in the chapter on Compilation [{numref}`Chapter %s<compilation>`].
We can also actively avoid compiling our program before running it by supplying the flag `--no-build`.

If we want to run a project that is not located directly in our current directory then we can use the flag `--project` and supply the path to our project as an argument.

```
dotnet run --project ./Translator.csproj
```

```{seealso}
Please refer to the [official documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-run) for more information on and options to the `dotnet run` command.
```

Let's go back to our example in [{numref}`Chapter %s<compilation>`] and make sure that we can run it.
Navigate to the folder containing our `Translator.csproj` file and then issue the `dotnet run` command and you should see the message `Hello, World!`.

```bash
dotnet run
```

```output
Hello, World!
```

Success!
We're on our way to the millionaire's club and nothing can stop us now.
Let us now open up our main program file `Program.cs` which should contain:

```csharp
Console.WriteLine("Hello, World!");
```

and let's change it's contents to:

```csharp
Console.WriteLine("Hello, I am the Translator.");
```

```{warning}
Remember to save your files after you've made any changes to them before trying to compile or run again.
Countless developer hours have been sacrificed to the gods of forgetting to save.
```

When we now run the program by issuing `dotnet run` we should see:

```output
Hello, I am the Translator.
```

Excellent.
We now know how to compile and run our program and we know which file we should write the code we want to have executed.

In the chapter on Compilation [{numref}`Chapter %s<compilation>`] we discussed how an executable file is created when you compile the program using the `dotnet command`.
We also located this executable.
Of course, instead of running your program using the `dotnet run` command you can just as well run the executable yourself.
First we make sure that we have an executable by compiling our code using the `dotnet build` command, and then we locate the executable file that gets created in the `bin` folder and run it manually.

```bash
dotnet build
bin/Debug/net6.0/Translator
```

```output
Hello, I am the Translator.
```

Remember that if you compile your program using `dotnet build` or indirectly using `dotnet run` without any additional options then you are not creating a single-file executable.
This means that you cannot send your compiled executable to someone else without also sending them your DLL and runtime configuration file.
If you want to be able to send a single executable then you must compile as single-file.
Please go back to the chapter on Compilation [{numref}`Chapter %s<compilation>`] for more information on this.

```{seealso}
Compiling and executing your application can also be done via the graphical user inteface (GUI) if you are using Visual Studio. Please refer to the [official documentation](https://docs.microsoft.com/en-us/visualstudio/ide/?view=vs-2022) for more information.
```

