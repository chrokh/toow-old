---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: csharp
  language: .net-csharp
  name: .net-csharp
---

# Static constructors

We have learned how to use static fields to share data across instances of a class. However, there might come a time when you need to initialize a static field or perform any sort of static initialization, and you can't do it directly at the point of declaration. This is where static constructors come in. A static constructor is used to initialize a class itself, rather than an instance of the class. It is called automatically to initialize the class before the first instance is created or any static members are referenced.

```{warning}
While the static keyword might seem like a simple solution in the short-term, it often leads to code that is **harder to test and maintain** in the long run. By using static, you depart from the core ideas in object oriented programming, like subtype polymorphism. This leads to less flexible and maintainable code.
Additionally, because static members maintain state between calls, they can introduce **unexpected side effects** that can make your code **harder to reason about and test**.
Use static members carefully and remember that there always exists an actually object oriented design that meets your needs. You don't need `static`.
```

Unlike normal (non-static) constructors, a static constructor doesn’t take any parameters and is defined using the keyword `static` before the constructor name.

Let's say we have a board game class that needs to load some configuration from a file at the beginning of the program. We could use a static constructor to load these settings:

```{code-cell}
public class GameSettings
{
    public static int Rows;
    public static int Cols;

    static GameSettings()
    {
        // Load settings from a file
        Rows = 10; // Replace with value from file.
        Cols = 10; // Replace with value from file.
        Console.WriteLine("Game settings loaded.");
    }
}
```

In this code, the static constructor `GameSettings()` is automatically called once before we access any static members from outside the class or create an instance of the class. Notice that we don’t need to call it directly. Its sole purpose is to initialize the static fields of the class or perform other static initializations for the class.

When we run our program and access the GameSettings for the first time, we would see "Game settings loaded" printed to the console.

```{code-cell}
Console.WriteLine(GameSettings.Rows);
```

The key thing to remember about static constructors is that they are called once and only once, no matter how many instances of the class you create. They provide a way to control the initialization of static fields and carry out other one-time operations that are needed for a class.

