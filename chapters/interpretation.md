# Interpretation

Now that you know about how C# programs are compiled and executed, let's explore a different way that code can be turned into action. Have you ever heard of interpreted languages, like JavaScript or Python? These languages follow a different process from C#'s compile-and-run system, called interpretation.

In programming, there are two primary ways to convert the code you write into something your computer can understand: compilation, which we've already covered, and interpretation. Both serve the same purpose – translating human-friendly code into computer-understandable instructions – but they go about it in slightly different ways.

When we compile a program, like in C#, the code is translated ahead of time before it runs. The compiler takes our human-friendly C# code and transforms it into an intermediate language, and then the .NET runtime converts this intermediate code into machine code during the program execution. But an interpreter works differently.

Imagine you have a friend who doesn't speak your language, and a translator is facilitating your conversation. A compiler is like a translator who first listens to your entire story and then retells it to your friend in their language. But an interpreter? An interpreter is like a translator who translates each sentence immediately after you say it. This real-time translation is what happens with interpreted languages.

%https://media.discordapp.net/attachments/1118630713084870736/1121389767259590746/chrokh_an_oil_painting_of_a_pianist_with_sheet_music_in_the_bac_b08bab0e-e78c-4955-b184-66891197bf88.png
```{figure} ../images/cover-interpretation.jpg

An interpreter is like a pianist that reads sheet music and translates it into key presses on the fly.
```

When a program written in an interpreted language like JavaScript or Python runs, it is read and executed line by line in real-time, with no separate compilation step. The interpreter reads a line of code, translates it into machine language, and executes it right then and there.

There's a trade-off to this approach. One advantage is that it allows for more flexibility, since you can modify your program on the fly and see the effects immediately without needing to recompile. However, it also means that all errors, even those that could have been caught during the compilation stage in a language like C#, will only appear at runtime when the specific line of faulty code is interpreted.

While C# is not an interpreted language, it's beneficial to understand the concept of interpretation. It shows another facet of how programming languages can function, broadens your understanding of programming paradigms, and will help you if you ever work with or switch to an interpreted language.

