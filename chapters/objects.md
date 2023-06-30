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

# Objects

At the heart of object oriented programming are objects. In the real world an object can be anything like a book, a car, a person, a document, an agreement, anything. In an object oriented language an object is a bundle of *state* and *behavior*. This is called 'encapsulation'. It represents an entity in the code that holds some data and methods to manipulate that data.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1124005679406006402/chrokh_a_pixel_art_illustration_of_a_simulated_city_1fb4c929-801c-4726-b80f-d41586aeceef.png?width=1440&height=629

Imagine a computer simulation composed of objects (people, vehicles, households, buildings, etc) that all hold some data and can do different things.
```

Imagine you’re building a simulation of a city. There are buildings, cars, people, and so many more elements to consider. Each of these components has its own set of attributes and behaviors. A building, for instance, has a number of floors and can be either residential or commercial. A car has a model, color, and can move or park. If we were to model this system procedurally, i.e., with simple data structures and functions, we might soon find ourselves lost in a sea of code, where changing one part might unexpectedly affect others.

Objects come to the rescue. In object oriented programming, each of these components—buildings, cars, people—can be modeled as an ‘object’. The building object can have properties like ‘number of floors’ and ‘type’, and methods like ‘occupy’ or ‘vacate’. Similarly, a car object can have properties like ‘model’ and ‘color’, and methods like ‘move’ and ‘park’. This way, each component becomes a self-contained unit with its own data and behavior, making the code easier to understand, maintain, and extend.



%## Objects, Instances, and the new keyword

In C#, we use the term 'object' and 'instance' interchangeably. When we say we have an object of a class, it means we have an instance of a class. The process of creating an object is known as 'instantiation', which involves using the `new` keyword followed by the class name and parentheses.

At its core, an object (in a class-based object oriented langauge) is an instance of, what's called, a [class](classes). You can think of a class as a blueprint or template that describes the common properties and methods that its objects will have. An object, being an instance of a class, possesses these properties and can perform these methods.

For example, if we have a 'Car' class with properties like 'color' and 'model' and methods like 'start' and 'stop', an object of this class would be a specific car, say a red Toyota, which can start and stop. In this scenario, 'color' and 'model' define the state of the object, while 'start' and 'stop' define its behavior.

Let's take one more example.
A robot vacuum might have properties like 'BatteryLevel', and methods like 'MoveForward', 'RotateLeft', 'RotateRight', 'Start', and 'ReturnHome'.
It is important to understand that objects might be, what we call, 'mutable'.
When we, for example, call the instance method 'RotateLeft' on a robot object then the state of that object, the data inside the object, actually changes.

%https://media.discordapp.net/attachments/1118630713084870736/1124047885634392074/chrokh_a_simple_flat_illustration_of_a_robot_vacuum_7904121d-d4ae-43d2-9608-55e2a5351156.png?width=1440&height=629
```{figure} https://media.discordapp.net/attachments/1118630713084870736/1124021918706708550/chrokh_an_illustration_of_a_robot_vacuum_7678e374-6079-44d7-bf3a-c8e2543fa21a.png?width=1440&height=629
:figclass: margin

Imagine an instance of a RobotVacuum class, able to navigate a two-dimensional space and manage its own battery life.
```

Let's consider an example with the built-in `DateTime` class in C#. Here's how you create an instance of the `DateTime` class that represents the 1st of January 2030.

```{code-cell}
DateTime date = new DateTime(2030, 1, 1);
```

After having executed that line of code, the variable `date`, contains a reference to an object or instance of the `DateTime` class.
By using the `new` keyword and then providing a class, we are creating a new object of that class by invoking a constructor of that class.
What arguments we can pass to the constructor depends on how the constructor is defined.


%## Dot Notation

Once we have an object, we can use, so called, 'dot notation' to access the state (data) and behavior (methods) of our object. Collectively these are known as 'members'. What members are available depends on the type of the object.

```{code-cell}
DateTime date = new DateTime(1999, 12, 31);

int year = date.Year;

Console.WriteLine(year);
```

In this example, we use dot notation (`date.Year`) to access the `Year` property of the object of type `DateTime`. This property gives us the year that is stored in the object.


%## Combining Data and Methods

One of the key aspects of objects is that they combine data and methods. This is fundamental to the concept of object oriented programming. For instance, the `DateTime` object not only stores the data representing the date and time, but it also has methods that allow us to perform operations on this data.

```{code-cell}
DateTime date = new DateTime();
DateTime dayAfterDate = date.AddDays(1);
```

In this example, `AddDays` is an instance method of the `DateTime` class that returns a new object of `DateTime` with as many days added as we specified with the argument.

An important feature of objects is the bundling of state and behavior, which is called 'encapsulation' or 'information hiding'.
This is a powerful tool for maintaining integrity and consistency of data. For example, consider an object representing a bank account in a game. We don’t want its balance to ever go negative.
So to prevent accidentally changing the balance we hide the balance and provide 'deposit' and 'withdraw' methods that interact with the balance. This way we can enfore the rules (such as no negative balances) in these methods.

%An important feature of objects is 'encapsulation', the bundling together of state and behavior, and methods into a single unit, and information hiding, the idea that an object’s internal state should not be directly exposed to the outside world.

%## A Glimpse Into The Future

We've briefly introduced you to the terminology of classes, instantiation, instance methods, properties, and how these concepts work together using `DateTime` as an example.
In the coming chapters, we will delve into these topics in a lot more detail so don't worry if you feel like this was too much too fast.

%We've already used some of these concepts before when we've called `IndexOf` and accessed `Length` on strings.


