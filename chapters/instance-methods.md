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

# Instance methods


%- TODO: Usually verbs. Or implied verbs as discussed in procedures.
%- TODO: Fat arrow syntax

Instance methods are at the heart of object-oriented programming, providing the behaviors that make our objects come alive. Through instance methods, our objects can perform actions, interact with their internal state, and even communicate with other objects. They transform our objects from mere static data containers to, what you might call, agents, in our programs.
%With the capability to encapsulate complex tasks into individual methods, we can build more understandable, maintainable, and reusable code.

Instance methods are to methods what fields are to variables - they provide a way for each instance of a class to have behaviors that operate on its *individual* state, just as fields allow each instance to have its own *individual* data.
Instance methods are methods that are called on an instance of a class, which means they can access the data stored in that instance.

```{figure} ../images/cover-instance-methods.jpg

If objects are like robots, then instance methods are like the buttons on our remote control.
```

Like other methods, instance methods can accept input parameters and return values. These parameters and return values can be of any type, allowing us to construct complex operations that act on the object's state.

Let's imagine a robot vacuum that can move forward, turn left, and turn right.
Let's also suppose that all these actions reduces the robot's battery.
Here's the class:

```{code-cell}
class Robot
{
    int battery = 100;
    string name;

    // Constructor
    public Robot (string name)
    {
        this.name = name;
    }

    public void MoveForward(int steps)
    {
        battery -= steps;
        Console.WriteLine($"{name}: Moving {steps} steps.");
    }

    public void TurnRight()
    {
        battery -= 1;
        Console.WriteLine($"{name}: Turning right.");
    }

    public void TurnLeft()
    {
        battery -= 1;
        Console.WriteLine($"{name}: Turning left.");
    }

    public void PrintStatus()
        => Console.WriteLine($"{name}: {battery} moves remaining.");
}
```

We can now instantiate a robot vacuum and then make it move by calling the corresponding instance methods. Each time it moves, the battery is reduced.

```{code-cell}
Robot robbie = new Robot("Robbie");

robbie.MoveForward(3);
robbie.TurnLeft();
```

The power of instance methods becomes more evident when we create multiple instances of our `Robot` class. Suppose we have two robot vacuums. When we call an instance method like `MoveForward()` on instance, it will not affect any other instance. This is because each robot vacuum instance maintains its own state, and instance methods operate on that individual state. Let's see this in action:

```{code-cell}
Robot robbie = new Robot("Robbie");
Robot rosie = new Robot("Rosie");

robbie.MoveForward(50);
rosie.MoveForward(2);

robbie.PrintStatus();
rosie.PrintStatus();
```

In this code, the two robots carry out their operations separately, and their battery levels are affected individually. The methods called on the first robot does not affect the other and vice versa.
%This is a key concept in object-oriented programming, which allows each object to behave independently while encapsulating its behavior and state.

