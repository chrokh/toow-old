# Syntax

Understanding syntax is the first step towards writing correct and meaningful programs.
Programming languages are designed with specific syntaxes that dictate how programs should be written. Just as different spoken languages have distinct grammar rules, different programming languages have different syntax rules.
%Without following the rules of a programming language we cannot write a program.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1121411003985440878/chrokh_An_oil_painting_of_a_music_sheet_with_large_notes_expres_3d1a3b00-bd30-47f6-8812-9f7e53c8d902.png?width=2700&height=1350

Musical notation has a specific syntax that musicians understand, with each note, rest, and symbol having a particular place and meaning. The same goes for programming syntax.
```

%```{figure} https://media.discordapp.net/attachments/1118630713084870736/1121383593621585930/chrokh_a_simple_LEGO_model_of_a_single_propeller_airplane_white_29fac128-7005-4f46-97de-179c667a5026.png
%
%Just like LEGO pieces fit together in certain ways, the tokens of a programming language have to be assembled in accordance with the rules of that language.
%```

Consider a simple sentence like "The cat sat on the mat." We can rearrange the words randomly: "Cat sat mat the on the."
This rearranged version is nonsensical to us as humans, but what would make it syntactically incorrect to a computer?
Just as we need proper grammar and word order in a sentence for it to be meaningful, programming languages have syntax rules that determine how code should be structured.

Syntax relies on language tokens, which are the fundamental building blocks of programming languages.
Tokens include keywords, identifiers, literals, operators, and punctuation marks.
These tokens have specific meanings within the language and must be used correctly to form valid code.

Consider the statement `x = 5 + 3`.
The tokens are `x`, `=`, `5`, `+`, and `3`.
The syntax rules dictate that the equals sign (=) must be used for assignment, the plus sign (+) is used for addition, and the numbers (5 and 3) are operands. If we were to write `x = + 5 3`, violating the syntax rules, the code would be nonsensical to the computer, just like the rearranged sentence "Cat sat mat the on the" is to us.

The syntax rules of a programming language define how tokens can be combined to form valid expressions, statements, and blocks of code. For instance, in many programming languages (including C#), statements must end with a semicolon to be considered valid. Violating these rules results in syntax errors, preventing successful execution of the program.

Syntax errors occur when code violates these syntax rules. For example, forgetting a semicolon at the end of a statement or mismatching parentheses would result in syntax errors.
Just like forgetting a period in the end of a sentence would equate to a grammatical error in natural language.

Understanding how to interpret and solve syntax errors is an essential skill for programmers.

%In [compiled](compilation) languages, syntax errors are detected, at, what is known as, compile-time.
%In [interpreted](interpretation) languages, syntax errors are detected at, what is known as, run-time.
%This essentially means that in compiled languages we get to know about syntax errors without having to run the program.
%More on this later.

In the next chapter we will write our first program. You're off to a great start, let's keep going.

```{tip}
Use arrow keys to navigate between chapters.
```
