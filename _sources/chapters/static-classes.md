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

# Static classes

You've learned about static fields, static constructors, static methods, and static properties. We've shown that each of these can exist in regular (non-static) classes. But, what happens when we declare a class as `static`?

A static class is a class that cannot be instantiated or inherited from (a concept we will get to later). This means you cannot create an instance of it using the `new` keyword, nor can you use it as a base class (again, more on this later). A static class can only contain static members. It cannot contain instance fields, instance methods, instance properties, or instance constructors.

Static classes are most commonly used to create utility classes where you group related methods together. These methods do not need to operate on an instance of a class and can work independently. An example of a static class in the .NET framework is the `Math` class, which provides mathematical functions like `Abs`, `Pow`, and `Sqrt`. All of these methods are static because they do not operate on an instance of the `Math` class.

Here's an example of how you might define a static class in your own code:

```{code-cell}
public static class GameUtils
{
    public static int CalculateScore(int level, int enemiesDefeated)
    {
        return level * enemiesDefeated;
    }

    public static void DisplayScore(int score)
    {
        Console.WriteLine($"Your score is: {score}");
    }
}
```

In this example, the `GameUtils` class contains two static methods for calculating and displaying a game score. You could use this class in your game code like so:

```{code-cell}
int level = 5;
int enemiesDefeated = 30;

int score = GameUtils.CalculateScore(level, enemiesDefeated);
GameUtils.DisplayScore(score);
```

```{warning}
The `static` keyword runs counter to the core ideas in object oriented programming, like subtype polymorphism, and can make your code less flexible, maintainable, and difficult to test.
Although the static `GameUtils` class example seems convenient, you should consider creating a regular (non-static) `Game` class that keeps track of its own score and displays it. This would likely lead to more flexible and maintainable code in the long run.
Use static classes carefully and remember that there's always an object oriented design that could meet your needs.
```

%WARNING: Remember, the principles of object-oriented programming encourage us to tie data and behavior together in instances of classes.

In conclusion, static classes and their members play an essential role in C#, providing a way to group related utility functions together and to represent concepts that are singular in nature (like the `Math` class). However, they should be used judiciously and with an understanding of their limitations compared to regular, non-static classes.

