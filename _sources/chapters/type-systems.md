# Type systems

C# is a statically and nominally typed language with manifested types.
In this chapter we'll talk about what that means.
A type system lets us assign a type to each, so called, term, in a program.
In C#, all [variables](variables), [constants](constants), and [expressions that return values](expressions) have a type.

Types are checked during a process known as [type-checking](type-checking), which exists to enforce a property known as [type safety](type-safety).
A type-safe language guarantees that no programs lead to undefined behavior.
C# is a type-safe language where type-checking occurs during compilation.


```{admonition} TODO
- https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/types/
- Types of type systems
  - Static vs dynamic
  - Manifest vs inferred
  - Nominal vs structural
```


## Static vs dynamic

- Static vs dynamic typing. Strong vs weak.
  - "Statically typed languages perform type checking at compile-time, while dynamically-typed languages perform type checking at run-time"
- Reflection.


## Manifest vs inferred

- Implicitly typed local variable
- https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/var


## Nominal vs structural

