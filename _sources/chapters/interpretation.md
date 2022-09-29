# Interpretation

An interpreter takes a program written in some input language and translates whatever chunks of the program it needs to some output language and executes that chunk.
A [compiler](compilation) translates programs written in some input language to programs written in some output language.
An interpreter differs in two important respects.
First, it doesn't just translate to the output language, it also executes the resulting code.
Second, it doesn't translate the whole program in one go.
Instead, it translates whatever portions it needs to keep executing the program.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:interpretation
An interpreter interprets code written in one language and translates it to another and executes it on the fly.
```

As you might have guessed, running a program through an interpreter is slower than running a program that's already been compiled.
It's like the difference between trying to communicate with someone through a translator versus communicating with someone who speaks your native tongue.

Note that interpreters still have to convert your code to machine code.
In the end it's all binary.
However, when you're running your program through an interpreter you never get so see that binary (or low level intermediate) file.
Because the full file never exists.
The interpreter translates your program in chunks.

It is important to realize that since we haven't checked for errors before we start running the program we have zero guarantees that the program is error free.
It might in fact contain any number of syntax and/or semantic errors and we will not know about them until we reach the code chunks containing those errors.
We have discussed run-time errors in the chapter on [execution](execution) and will discuss it a bit further in the chapter on [errors](errors).

Examples of languages that are usually interpreted as opposed to compiled include Python, JavaScript and Ruby.

```{exercise}
What is an interpreter and how does it contrast to compilers?
```

%TODO: Different ways of using interpreters:
%At an oversimplified level, there are three main ways to run programs:
%
%1. If you have a *compiler* for your language then you can run the compiler and pass it your source code. The compiler will produce an executable file which you then can run at your discretion.
%2. If you have an *interpreter* then you can run the interpreter and pass it your source code. The interpreter will compile a portion of your program and start running it while it makes sure to compile whatever portions of your program it needs on the fly.
%3. You might have a compiler that produces an executable file which embeds the interpreter or calls to the interpreter in the resulting program. In this case you would run the resulting program after the first compilation and the interpreter will take over from there.
