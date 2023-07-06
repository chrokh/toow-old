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

# Encapsulation

When crafting software, managing complexity is essential.
In the world of object-oriented programming, we often strive to design our classes to encapsulate complexity. Encapsulation is the practice of hiding the details of how objects work and exposing only what's necessary. This principle forms the bedrock of robust, flexible, and maintainable code.

%It allows us to hide the inner workings of our objects, exposing only what is necessary. Encapsulation is the cornerstone of maintainable object oriented programming.

Encapsulation in C# refers to the bundling of data, represented by fields, and methods that act on that data, into a single unit such as a class. More than just a packaging mechanism, encapsulation also involves hiding the internal states and implementation details of an object and providing a clean, accessible way to interact with the object.

Encapsulation is often used synonymously with "information hiding".
At times and to some people, the two have meant different things.
Today however, they are both often used to the idea of "hiding your private parts".

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1126471184511422516/chrokh_a_beautiful_illustration_of_a_fantasy_castle_d5bcc806-2ca5-40ce-a9fe-9b912e3405de.png

Like a castle with a bridge over a moat, encapsulation only allows access to an object's data via its public methods.
```

Consider the following `Car` class:

```{code-cell}
public class Car
{
    private int speed;

    public int GetSpeed()
        => speed;

    public void Accelerate(int delta)
    {
        if (delta < 0)
            delta = 0; // min

        speed += delta;
    }

    public void Brake(int delta)
    {
        if (delta < 0)
            delta = 0; // min
        else if (delta > speed)
            delta = speed; // max

        speed -= delta;
    }
}
```

In this class, the speed field is marked as `private`, which means it can only be accessed directly within the `Car` class. This is encapsulation in action: we're hiding the `speed` field and providing `public` methods (`Accelerate`, `Brake`, and `GetSpeed`) as the, so called, 'interface' to interact with it.
We say that we've 'encapsulated' or 'hidden' `speed`.

```{code-cell}
Car car = new Car();
car.Accelerate(10);
car.Accelerate(-10);
Console.WriteLine(car.GetSpeed());
```

```{code-cell}
Car car = new Car();
car.Accelerate(5);
car.Brake(12);
car.Accelerate(2);
Console.WriteLine(car.GetSpeed());
```

By hiding the `speed` field, we can ensure that the speed can never be set to an invalid state. We can ensure that acceleration and braking deltas must be positive, and that braking can't exceed the existing speed. These constraints are enforced by the `Accelerate` and `Brake` methods, protecting the `speed` field from inconsistent states.

Since the only way to update the `speed` of a `Car` object is through its public interface we ensure that the speed is always updated 'consistently'.
Remember, when a member is `private` it is not accessible from the outside.

```{code-cell}
:tags: [raises-exception]
Car car = new Car();
car.speed = 10;
```

Encapsulation, often used synonymously with "information hiding", is a foundational concept in object-oriented programming. It simplifies the usage of our classes and objects, reduces the likelihood of bugs, and improves code maintainability. As you continue your journey with C#, understanding and applying encapsulation will be vital for keeping your programs alive over time.

