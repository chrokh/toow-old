(data-types)=
# Data types

- Discuss how “hello world” is a string and how the method WriteLine is expecting a string.
- Null
  - The absence of a value.
  - Billion dollar mistake.
  - Read more: https://maximilianocontieri.com/null-the-billion-dollar-mistake
  - Booleans, strings, ints, floats, characters, and **null**.
    - Nullable types. Exemplify with `bool` and `bool?`.
    - Use sets to show how the int type isn't just the set of all integers but the union between subset of ints between min and max and the null set.
      - `Int32.MaxValue`
      - `Int32.MinValue`.
    - Better to use strings in the set example? But then we have the complication of max and min value.
- Move some of the modeling stuff to Abstraction chapter, but perhaps rename it to Modeling?
- The `GetType()` method.
- Type safety and Type errors
- Later we will talk about making impossible states impossible. Types over tests.
- IMPORTANT: https://maximilianocontieri.com/the-one-and-only-software-design-principle
  - "The one and only software design principle"
  - "The bijection rule"
- Built-in types, Custom types, .NET class library.
  - https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/types/
- Common Type System (CTS)
  - Five categories of types
    - Classes
    - Structures
    - Enumerations
    - Interfaces
    - Delegates
  - https://docs.microsoft.com/en-us/dotnet/standard/base-types/common-type-system
- Static vs dynamic typing. Strong vs weak.
  - "Statically typed languages perform type checking at compile-time, while dynamically-typed languages perform type checking at run-time"
- Reflection.
- Typing and compilers.

