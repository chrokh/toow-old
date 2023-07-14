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

# Static properties

%Having learned about static fields, constructors, and methods, it's now time to discuss static properties.
Just as with instance properties, static properties provide a way to control the access and visibility of a static field. However, there are some key differences: static properties can be [read-only](read-only-properties) or [computed properties](computed-properties), but they don't support the `init` accessor or the `required` keyword.

A static property is a property that belongs to the class itself rather than any individual instance of that class. It's defined by using the `static` keyword before the property name.

To understand static properties, let's consider an example from the world of gaming. Suppose you're developing a game and you have some settings that apply to the entire game, not just one instance or player. These could include settings like the screen width and height, difficulty level, or maximum number of players. Here's how you might define a `GameSettings` class with a static property:

```{code-cell}
public class GameSettings
{
    public static string Name { get; private set; } = "Ultimate Adventure Game";

    public static void ChangeGameName (string name)
        => Name = name;
}
```

The `Name` property is static, meaning it belongs to the class `GameSettings` itself rather than any specific instance. Its value can be read anywhere in your code using `GameSettings.Name`, but it can only be modified within the `GameSettings` class, thanks to the `private` setter.

Even though the `init` accessor and `required` keyword are not supported by static properties, you can still create read-only and computed static properties. Here's an example of a read-only static property:

```{code-cell}
public class GameSettings
{
    public static string Name { get; } = "Ultimate Adventure Game";
}
```

And here's an example of a computed static property:

```{code-cell}
public class GameSettings
{
    private static int baseDifficulty = 3;
    private static int playerModifier = 2;

    public static int Difficulty => baseDifficulty * playerModifier;
}
```

In the above example, the `Difficulty` property computes its value based on two other static fields. As the game progresses, you could change the value of `playerModifier` to adjust the difficulty.

Static properties can be powerful tools for managing global state in your application, but as with all static members, they should be used judiciously to maintain the flexibility and testability of your code.

```{warning}
Remember that using static is counter to the core ideas in object oriented programming, like subtype polymorphism, and can make your code less flexible, maintainable, and difficult to test.
For example, the functionality of the `GameSettings` class could be achieved using a regular class, with non-static members, that we instantiate and pass to objects that need to access the settings.
This would allow you to use different settings for different parts of your application, which might be useful for testing or to provide user-customization options.
Use static properties carefully and remember that there's always an object oriented design that could meet your needs.
```
