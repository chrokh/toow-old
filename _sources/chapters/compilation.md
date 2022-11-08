# Compilation

A compiler is a program that translates code written in a source language to code written in a target language.
It is essentially a one-way translator.
In other words, a compiler translates text written in some syntax to text written in some other syntax.

```{important}
A compiler translates text written in some syntax to text written in some other syntax.
```

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:compilation
A compiler translates code written in one language to code written in another language.
```

You will often hear people talk about "compiled" programming languages and "interpreted" programming languages.
However, in theory, a language isn't *either* compiled or interpreted.
Interpreters and compilers can be built for any language.
A language is simply a language.
In practice, however, most languages are associated with either a compiler or interpreted.
This is why we in everyday language tend to refer to a language as being either compiled or interpreted.

```{exercise}
What is a compiler?
```

```{exercise}
In what sense is a language not *either* a compiled or an interpreted language?
```


(machine-code)=
## Source code

The word "compiler" is usually used to describe programs that translate programs written in "high-level" languages, to programs written in "low-level" languages.
C#, the language used in this book, is, what's known as, a "high-level programming language".

Other examples of high-level languages are Haskell, Python, JavaScript, Java, Ruby, C, C++, R, and so forth.
The list goes on and include a vast array of modern programming languages.
Of course there are developers who work in low-level languages even today, but if you're interested in taking that path then you're reading the wrong book :)
<!-- TODO: Write more about real-world use cases for low-level languages. -->

If we had to write all our programs in binary there is simply no way that we would have gotten as far as we have today by this time.
As application level developers we don't have to worry about machine code.
Instead we write our programs in high-level languages and use compilers or interpreters to convert our programs to machine code in order to allow them to be executed on actual machines.

When we write code in these high-level languages we are writing what is known as "source code".
Files containing source code are known as "source files".
Compilers are then used to convert the source code to machine code.
Source code is human readable and machine code is machine readable.

You might hear that C# is a compiled language.
However that is not entirely true.
It's not as simple as pushing high-level C# code into a compiler and getting binary machine code out.
When you compile a C# program you don't actually get a binary machine code file, you get code expressed in what's known as an "intermediate language" which, given the existence of .NET's Common Language Runtime (CLR) can be turned into machine code upon execution.
In the case of the .NET compiler this intermediate language is known as the Common Intermediate Language (CIL).

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:net-compilation
Illustration of how .NET programs are converted to and executed as machine code.
```

So, it isn't fair to call C# a compiled language.
When we run the executable, portions of the CIL code is converted to machine code by a Just-in-time (JIT) compiler inside the Common Language Runtime (CLR) which essentially is an [interpreter](interpretation).
So while we often think of C# as a compiled language it is actually a mix of both.
%C#, the language used in this book, is usually compiled into bytecode which is then ran through an interpreter.

Generally, we would refer to CIL code as "bytecode".
Programs in many languages are converted to machine code in a way similar to this.
Have a look at {numref}`fig:source-code-byte-code-machine-code`.
You write human-readable source code, the compiler compiles it machine-readable bytecode, and an interpreter runs the byte-code and coverts it to machine-readable machine code bit by bit as needed.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:source-code-byte-code-machine-code
A common pattern is to let a compiler compile source code into byte code, and then let an interpreter interpret byte code as machine code.
```


```{exercise}
In what sense is C# usually both compiled *and* interpreted?
```


## Abstraction

While the original idea of the compiler was to convert high-level languages to low-level languages it should be noted that the word "compiler" is certainly also used to describe programs that convert between high-level languages.

Consider for the languages TypeScript, ReasonML, and Elm. 
All these three languages can be converted to the high-level language JavaScript by means of their respective compilers.

So the idea of compilers is deeper then simply not having to write machine code.
The idea is abstraction.
This is something we'll talk a lot more about in later chapters since abstraction is an immensely important topic in programming.
The idea is to write programs in a language that's sufficiently abstract so that we don't have to worry about irrelevantly minute details.

Think back to the chapter on [algorithms](algorithms).
To be able to easily express an algorithm, you need a language that helps you focus on the details that matter.
If, for example, I'm writing a pancake batter recipe then I don't want to have to concern myself with the fact that you have to move your hands in order to pick up the bowl.
Or the fact that you have to open up the milk carton if it's not open.
Or fetch another carton of milk if the one you have ran out before you've managed to pour the expected amount into the bowl.
And so forth.
This is the idea of a high-level language, and this is the idea of abstractions.


```{exercise}
Why are compilers useful? Why don't we just write programs in low-level languages?
```

## Compile-time

When something happens during or close to compilation and without running the program we refer to it as happening at "compile-time".
What can we do at compile time beyond translating the source code from the input language to the output language?
We can check for errors in [syntax](syntax) and errors in [semantics](semantics).

Much later we will talk about assessing program [correctness](correctness) but I want to mention here that if we are using, what is known as, formal methods to verify program correctness then this is a semantic error check that happens at compile-time.

Another semantic error check that we can do at compile-time is what's known as automated "linting".
Linting is the act of determining whether a program follows some agreed upon stylistic guidelines.

```{exercise}
What do we mean when we say that something happens at *compile-time* as opposed to at *run-time*?
```


## Compilation errors

There are plenty of mistakes that we can make that prevent our programs from compiling.
There are multiple ways of categorizing compilation errors but one way is to divide them into:

- [Syntax](syntax) errors,
- [Semantic](semantics) errors, and

Semantic errors checked for at compile-time is sometimes called "static semantic errors."

If an error occurs when we are attempting to compile then it's a compilation error, also known as compile-time error, since it occurred at compile-time.
If, on the contrary, an error occurs *when the program is running* then it's a run-time error since it occurred during [run-time](execution).

We will discuss types of syntax and semantic compilation errors and contrast them to run-time errors in more detail in the chapter on [errors](errors).

```{exercise}
What are compilation errors?
```



## `dotnet build`

Let's take a simple example.
In this book we will incrementally work on project that we call "Translator".
The program will be able to encode and decode strings of text using ciphers.
Let's start.

Find a folder where you want to store your program and enter it on the command line by using the command `cd`.
Let us then create our empty C# program by running:

```bash
dotnet new console --name Translator
```

By passing the value `Translator` as the argument `--name` we tell the `dotnet` program that we want our application to be called `Translator`.
The `dotnet` command line program will create a new folder with the name `Translator` and generate all the files we need to get started in it.

```{seealso}
Please refer to the [official documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new) for more information on the `dotnet new` command.
```

Let's enter the folder that `dotnet` generated for us:

```bash
cd Translator
```

and then issue the command `ls` to see what files were generated for us:

```bash
ls
```

```output
Program.cs
Translator.csproj
obj
```

`Program.cs` is the main (and currently only) source file.
It defines the entry point of the program.
In other words, when we run the program, the code that's in this file will be run.
The only line of code that it contains should be:

```csharp
Console.WriteLine("Hello, World!");
```

(top-level-statements)=
Note how we said that the file *defines* the entry point of the program, not that it *is* the entry point.
This is due to something introduced in C# 10 and .NET 6 known as "top-level statements".
The details of this are not relevant now and we'll pick this discussion up again in the chapter on [static classes](static-classes).
However, you can think of the main file (`Program.cs`) as actually containing more code than you can see.
It's as if the additional code is entered into the file automatically upon compilation.

% TODO: Must describe how the top-level statements file is divided into three "parts" somewhere.

`Translator.csproj` is a configuration file for your project.
It does not contain source code, it contains what is known as "markup".
The markup language in this case, happens to be called The Extensible Markup Language (XML).
The details of this file are not significant now but if you were to open it up I'm sure you'd be able to figure out how it, for example, specifies that the output of your project is an executable (`Exe`) file and what version of .NET you are using.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>
```


`obj` is a folder that holds intermediary content that's maintained and used by the compiler.
Don't put any of your files in this folder since they might be overwritten by the compiler.

When you compile the project for the first time, it will also create another folder called `bin`.
The word "bin" is short for "binaries" which is a term that's often used to describe files that are *not* source files or markup.
It refers to files that either contain bytecode or machine code.
Arguably, this is quite confusing since bytecode isn't necessarily expressed in ones and zeroes.
Binaries may or may not be executable but the word is often used to refer to executables.

If we had not specified a name for our program, `dotnet` would have used the name of the folder we were in.
So if we wanted to we could just as well have created the folder ourselves like this:

```bash
mkdir Translator     # Create new directory
cd Translator        # Open directory
dotnet new console
```

In this case, we would first create a new folder, then enter the new folder, and then finally create a new program in the new folder with the same name as the folder.

We don't need to specify explicitly that we want it to be a C# application since the `dotnet` program defaults to C#.
However, we could also use the `dotnet` program to create F# applications.

To compile this program we simply make sure that we are in the same folder as the C# project file (`.csproj`) and then issue the command:

```bash
dotnet build
```

This will compile our program and if we haven't introduced any errors when changing the program we should be met with a message that says:

```output
Build succeeded.
    0 Warning(s)
    0 Error(s)
```

In the folder `bin/Debug/net6.0/` the compiler should now have generated the following five files:

```output
Translator.runtimeconfig.json
Translator.dll
Translator
Translator.pdb
Translator.deps.json
```

% TODO: Is all the below correct?

The file `Translator.runtime.config.json` is a configuration file that specifies which runtime we are targeting, which in our case is .NET 6.
Think back to our discussion on the Common Language Runtime (CLR).
The existence of this file means that the program is assumed to not be "self-contained".
A self-contained program can be run on a machine that doesn't have access to the .NET runtime.
The file is a human-readable file expressed in the markup language JSON.

The file `Translator.dll` contains our actual application.
It is not executable in and of itself, and it is is expressed in CIL represented in hexadecimal format.
If you open up the file in a text editor you will see a bunch of hexadecimal codes, also known as hex.
We've discussed base 2 and base 10 number systems in the chapter on [computation](computation), hexadecimal is simply base 16.
It is possible to convert the DLL to more readable CIL code but that is beyond the scope of this book.

The file `Translator` is an executable file that we can run from the command line.
All this is an oversimplification, but in essence it invokes the runtime that's specified in the configuration file passes the DLL to be interpreted.
The runtime will then run the program as we've discussed earlier in this chapter.
The file is expressed in hexadecimal format and its syntax is specific to some set of CPU architectures.

The file `Translator.pbd` contains information which helps the debugger match sections of the executable with section of source code.
While all the three previous files are required for your program to be runnable, this file is not.
However, it is needed if you want to debug your program.
The file is expressed in hexadecimal format.

The file `Translator.deps.json` simply contains information on any packages that your program might depend on.
If the user of your application is to be able to automatically install these dependencies then they need this file.
The file is a human-readable file expressed in the markup language JSON.

In the chapter on [execution](execution) we'll return to this program and look at how to run it.
But I want to emphasize here that unless you compile, what is known as a, single-file application, you can not run your executable (`Translator`) without the runtime configuration file (`Translator.runtime.config.json`) and the actual application (`Translator.dll`).
So if you move your executable to a new folder you must also move these other two files along with it.

If delete the DLL and try to execute your application you are met with an error message that says that "the application to execute does not exist".
If you delete the runtime configuration file and try to execute the application you are instead met with an error message that says that the application cannot be run since it was assumed to be a self-contained application but that it's not actually self-contained.

It is certainly however possible to produce single-file executables in C#.
Note that there's a difference between single-file and self-contained.
Self-contained means that you can run the application on machines that doesn't have the .NET runtime (CLR) installed.
It essentially means that the CLR is included in the executable itself.

```{note}
Note that single-file is not the same as self-contained.
```

Single-file however means that we don't create a separate DLL, dependencies file, and executable.
All three are included in one.
Please refer to the official [documentation](https://docs.microsoft.com/en-us/dotnet/core/deploying/single-file/) for more information on how to do create single-file applications.
To try it out you can however run:

```bash
dotnet publish --use-current-runtime -p:PublishSingleFile=true --self-contained false`
```

```{danger}
Compiling and executing your application can also be done via the graphical user inteface (GUI) if you are using Visual Studio. Please refer to the [official documentation](https://docs.microsoft.com/en-us/visualstudio/ide/?view=vs-2022) for more information.
```

