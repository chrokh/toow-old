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

# Auto-implemented properties

In programming, brevity is a virtue. Auto-implemented properties in C# offer a streamlined approach to encapsulating a class's data, cutting down on boilerplate code.

Properties in C# are a sort of combination between fields and methods. They represent a particular piece of a class's data, but they also have built-in ways to control the access and modification of that data. Auto-implemented properties, provide a shorthand way to declare properties when no additional logic is required in the property accessors.

Let's revisit our `Car` class and convert the speed field into an auto-implemented property.

```{code-cell}
public class Car
{
    public int Speed { get; private set; }

    public void Accelerate(int delta)
    {
        if (delta < 0)
            delta = 0; // min

        Speed += delta;
    }

    public void Brake(int delta)
    {
        if (delta < 0)
            delta = 0; // min
        else if (delta > Speed)
            delta = Speed; // max

        Speed -= delta;
    }
}
```

In this example, `Speed` is an auto-implemented property. The `{ get; private set; }` part is a syntax shortcut for a property that can be read by anyone (public get accessor) but can only be modified by methods within the `Car` class (private set accessor). Behind the scenes, C# is creating a hidden, private backing field for storing the property's value, much like the speed field in our previous examples.
This means that we no longer need to manually write a public method called `GetSpeed` for object holders to be able to get access to the current speed.

```{code-cell}
Car car = new Car();
car.Accelerate(10);
Console.WriteLine(car.Speed); // Possible because get is marked as public.
```

Since we've marked the set accessor (also known as setter) of the property as `private` we still cannot set the value of `Speed` from outside the `Car` class.
In many cases this means that `Speed` is still encapsulated.
In later chapters we will however discuss why properties don't always provide sufficient encapsulation.

```{code-cell}
:tags: [raises-exception]
Car car = new Car();
car.Speed = 10; // Not possible because set is marked as private.
```

Auto-implemented properties are a powerful feature in C#, enabling you to write less code while preserving the encapsulation principle. As we move forward, we will look at cases where a property needs additional logic, leading us to manually implemented properties.

