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

# Static fields

In object-oriented languages, we usually manage state through instance fields. However, many of these languages also support a (non-object oriented) feature known as 'static'. In C#, we have 'static members' and 'static classes', which we will discuss in the upcoming chapters. In this chapter, we will focus on static fields. Unlike instance fields, where each instance of a class has its own copy, a static field is shared across all instances of the class.

A static field in C# belongs to the class itself, not to any specific instance of the class. That means all instances of the class share the same static field. A change in the value of a static field is reflected across all instances of the class.

This makes static fields useful for representing data that should be shared among all instances. Let's consider an example:

```{code-cell}
public class GameSettings
{
    public static int Rows = 800;
    public static int Cols = 600;
}
```

In the above example, `GameSettings` is used to hold configuration data for a game, such as the number of rows and cols in a grid-based game. By marking these fields as `static`, we can access these settings from anywhere in our game code without needing to create an instance of `GameSettings`.

To access a static field, you use the class name (`GameSettings`), followed by the dot operator (`.`), followed by the static field name (`Rows`, `Cols`). You don't need to create an instance of the class to access a static field, which makes them especially convenient for shared data like these game settings.

```{code-cell}
Console.WriteLine(GameSettings.Rows);
```

Since our fields are not `readonly` we could of course also set their values.

```{code-cell}
GameSettings.Rows = 4;
GameSettings.Cols = 4;
```

Let's say we're writing the part of our game that prints an empty game board.  Here's how we might use our static fields:

```{code-cell}
// Setting the game settings
GameSettings.Rows = 4;
GameSettings.Cols = 4;

// Initialize the game grid
string gameGrid = "";

for (int i = 0; i < GameSettings.Rows; i++)
{
    for (int j = 0; j < GameSettings.Cols; j++)
    {
        gameGrid += "* ";
    }
    gameGrid += "\n";
}

Console.WriteLine(gameGrid);
```

```{warning}
Static fields are essentially 'global state'.

While the static keyword might seem like a simple solution in the short-term, it often leads to code that is **harder to test and maintain** in the long run. By using static, you depart from the core ideas in object oriented programming, like subtype polymorphism. This leads to less flexible and maintainable code.

Additionally, because static members maintain state between calls, they can introduce **unexpected side effects** that can make your code **harder to reason about and test**.

Use static members carefully and remember that there always exists an actually object oriented design that meets your needs.
```

A static field can also be useful when you want to keep track of data relevant to all instances of a class. For example, if you wanted to keep track of the total number of players in a game, a static field could be used.

```{code-cell}
public class Player
{
    public static int PlayerCount = 0;

    public Player()
    {
        PlayerCount++;
    }
}
```

In this example, each time a new `Player` is created, the constructor increments the `PlayerCount` static field. Since `PlayerCount` is a static field, this count is maintained across all instances of the `Player` class, giving us a running total of how many `Player` objects have been created.

```{code-cell}
new Player();
new Player();
new Player();

Console.WriteLine(Player.PlayerCount);
```

Remember, static fields have their values shared across all instances of the class. This makes them incredibly powerful for certain use cases, but it also means you need to be careful when using them. Misusing static fields can lead to problems in your code due to unexpected sharing of state across instances.
We will discuss the benefits of not using static later.

