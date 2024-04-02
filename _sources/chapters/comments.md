(comments)=
# Comments

As you embark on your coding journey, you'll quickly realize that writing code isn't just about giving instructions to the computer. It's also about communicating with your future self and with other developers. And this is where comments come into play.

Comments are like notes to yourself and to others reading your code. They're written in plain English (or whatever human language you prefer) and are ignored by the compiler. That is, they don't affect how your program runs. In programming parlance, we say that the compiler "ignores" or "skips" comments. They're purely there for human benefit.

```{figure} ../images/cover-comments.jpg

Understanding code that you (let alone someone else) wrote a week ago is not trivial.
```

In C#, we can write comments in two ways: single-line comments and multi-line or block comments.

A single-line comment begins with two forward slashes `//,` and everything following those slashes on the same line is a comment.

```csharp
// This is a single-line comment
Console.WriteLine("Hello, World!"); // This is another single-line comment
```

A multi-line or block comment begins with a forward slash and an asterisk `/*`, and ends with an asterisk and a forward slash `*/`. Everything between `/*` and `*/,` even if it spans multiple lines, is a comment.

```csharp
/* This is a
multi-line comment. It can span
as many lines as you like */
Console.WriteLine("Hello, World!");
```

You might wonder, if comments don't affect the way the program runs, why should you bother writing them? Here's why: good comments can explain the "why" behind your code. They can clarify your thinking, highlight tricky parts, explain the purpose of a piece of code, and make your code more readable for other people, or for yourself when you return to it in the future.

Remember, "comment" can also be a verb. When we say that we're "commenting code," we're talking about the act of writing these notes or explanations in our code.


