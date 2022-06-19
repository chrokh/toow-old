(compilation)=
# Compilation

```{warning}
This chapter is a work in progress.
```

A compiler is a program that translates code written in a source language to code written in a target language.
It is essentially a one-way translator.

In theory a language isn't either compiled or interpreted [{numref}`Chapter %s<interpretation>`].
A language is simply a language.
Interpreters and compilers can be built for any language.
In practice, however, most languages are associated with either a compiler or interpreted.
This is why we in everyday language tend to refer to a language as being either compiled or interpreted.

```{figure} ../images/compiler.svg
:name: compilation
A compiler translates code written in one language to code written in another language.
```

```{exercise}
What is a compiler?
```

- Layers of code
  - Source code
  - Object code
  - Bytecode
  - Machine code
  - Microcode

```{exercise}
Why are compilers useful? Why don't we just write programs in lower level languages?
```

- Running an executable.
- In C#
  - `dotnet compile`
  - `dotnet run`
- Compilation errors.
    - Syntax errors.
    - Missing assembly.
    - Type errors.

```{exercise}
What are compilation errors?
```

- Even if there are no compilation errors, a program can fail at runtime [{numref}`Chapter %s<execution>`].

```{exercise}
Why can a program that doesn't have compilation errors still fail at runtime (meaning upon execution)?
```

```{admonition} Design principle
:class: tip
Prefer compile time errors over runtime errors.
```

```{exercise}
Why should we prefer compile time errors over runtime errors?
```
