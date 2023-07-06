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

# Manually implemented properties

As programmers, we strive for simplicity, but reality can often be complex. When we need to introduce custom logic to our data access, auto-implemented properties might not be enough. For such situations, C# offers us manually implemented properties, a tool to apply any logic we want when getting or setting our properties.

While auto-implemented properties (which we talked about in the last chapter) are a neat way to quickly encapsulate data, they don't allow for additional logic during the setting or getting of the property. When you need to control exactly what happens when a property is accessed or modified, manually implemented properties come into play.

Let's return to the `Car` class example from last chapter. Remember how we made sure that speed cannot be negative? Let's also introduce a new rule: the speed of the car cannot exceed 200. Here's how we could enforce those rules using a manually implemented property:

```{code-cell}
public class Car
{
    // Backing field.
    private int speed;

    // Manually implemented property.
    public int Speed
    {
        // Get accessor
        get => speed;

        // Set accessor
        private set
        {
            if (value < 0)
                speed = 0;
            else if (value > 200)
                speed = 200;
            else
                speed = value;
        }
    }

    public void Accelerate(int delta)
    {
        if (delta > 0)
            Speed += delta;
    }

    public void Brake(int delta)
    {
        if (delta > 0)
            Speed -= delta;
    }
}
```

In this class, `Speed` is a manually implemented property. We've provided our own get and set methods, giving us control over what happens when the Speed property is accessed or modified. This level of control is invaluable when your properties require more than just basic read and write operations.

Notice how the implementations of the instance methods can be simplified now that some of the logic has been moved to the property.

```{note}
We're using [fat-arrow syntax](fat-arrows) for the get accessor since it can be implemented as a single expression.
```

Remember that while manually implemented properties offer more control, they also come with increased complexity. It's essential to balance the use of auto-implemented and manually implemented properties based on your needs.

In the upcoming chapters, we'll dive deeper into other object-oriented programming concepts, continually expanding your C# toolkit.

