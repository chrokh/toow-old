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

# Classes

We've discussed the concept of objects - instances of classes that bundle state and behavior. But where do objects come from? In a class-based language such as C#, they come from classes.

A class defines a new [data type](data-types) by specifying a blueprint for creating objects.
The objects are the values of that type, or members of the set if you will.

This new data type defines the shape of its objects, in terms of the data they can hold (their state), and the actions they can perform (their behaviors).
This two things are known as the 'members' of the class.

%https://media.discordapp.net/attachments/1118630713084870736/1120651120440787065/chrokh_An_explision_diagram_of_a_red_SUV_8d14d91a-269f-4555-9900-f4249e5263c3.png?width=868&height=868
```{figure} https://media.discordapp.net/attachments/1118630713084870736/1124016439276347514/chrokh_a_blueprint_of_a_Land_Rover_Defender_0baad270-43ca-49d7-b3fc-8d92bd6e89ab.png?width=1440&height=629
:figclass: margin

A class is like a 'blueprint' for the shape of its objects, in terms of the data they can hold (their state), and the actions they can perform (their behaviors).
```

The most common types of members are:

- [Fields](fields)
- [Methods](instance-methods)
- [Constructors](constructors)
- [Properties](properties)

Members can either be, so called 'instance members' or they can be 'static members'. The idea of object oriented programming is tie prefer instance members. We will discuss all the above as instance members in the coming chapters and in a later chapter we will also discuss static members.

%If we, for example, wanted to define a class that models cats, we could say:
%
%```{code-cell}
%class Cat
%{
%  // Class members are defined here...
%}
%```
%
%We can then instantiate a bunch of objects from this class:
%
%```{code-cell}
%Cat garfield = new Cat();
%Cat simba = new Cat();
%Cat bagheera = new Cat();
%```
%
%These three variables are all pointing to objects of type `Cat`.
%They are *instances* of the idea of a cat.
%The class is the idea, the blueprint, and objects are embodiments of that idea.

To understand the difference between classes and objects think of the difference between the notion of a number and that of any particular number.
The idea of a number refers to the set of all numbers.
But when talking about any particular number we're talking about a particular member of the set.

Remember the `DateTime` class we used in the previous chapter? That's a class, and when we do `new DateTime(2030, 1, 1)`, we are creating a new instance of the `DateTime` class.
The class `DateTime` is the idea of a date and a time, while an instance of the `DateTime` class is an *actual* and specific date and time.


%```{hint}
%If you don't understand the difference between classes and objects/instances then you don't understand the difference between types and values.
%Let me humbly suggest that you go back and re-read the chapters on [values](values) and [data types](data-types).
%The difference between classes and objects corresponds to the difference between types and values.
%```


Let's write a simple `Car` class.
The `Car` class may define fields such as `Color` and `Model`, and instance methods such as `Start` and `Stop`. These properties and methods represent the state and behavior of the `Car` objects.

In Visual Studio, you can create a new class by following these steps:

1. Right-click on your project in the `Solution Explorer`.
2. Select `Add > Class...`.
3. In the `Add New Item` dialog box, enter the name of your class (e.g., `Car`) in the `Name` field.
4. Click `Add`.

```{note}
Class names are usually nouns, while method names are usually verbs.
```

In C#, classes are defined using the class keyword, followed by the name of the class (which should follow PascalCase naming conventions).
Here's a basic `Car` class that you can use:

```{code-cell}
public class Car
{
    public string Color = "Unknown";
    public string Model = "Unknown";

    public void Start()
    {
        Console.WriteLine($"Starting {Color} {Model}.");
    }

    public void Stop()
    {
        Console.WriteLine($"Stopping {Color} {Model}.");
    }
}
```

The name, or identifier, of the class, and hence the data type, is `Car`.
Everything between the first and last curly bracket (`{ ... }`) is the 'body' of the class.
This is where we define its members.
The keyword `public`, appearing before the class name and its members is an 'access modifier' and we'll explain what that is very soon.

Once you've defined the class, you can use it to instantiate any number of objects in (for example) your Main method (`Program.cs`) like this:

```{code-cell}
Car car1 = new Car(); // Creates an object (i.e. a value) of type Car.
Car car2 = new Car(); // Creates an object (i.e. a value) of type Car.
```

These two variables are pointing to objects of type `Car`.
They are *instances* of the idea of a car.
The class is the idea, the blueprint, and objects are embodiments of that idea.

```{note}
The code that is generated for you by Visual Studio might contain a [namespace](namespaces). For the sake of simplicity we've removed the namespaces in our class examples. If you keep the namespace, remember that if you want to use the type somewhere else then that place has to either be within the same namespace, or you have to qualify the type (like `MyNamespace.Car`), or import the namespace through the `using` directive (like `using MyNamespace;`). Refer to the chapter on [namespaces](namespaces) if you need a reminder.
```

Since classes define [reference types](reference-types), these two objects are not the same, even though they currently seem identical.
So `car1 == car2` will evaluate to `false`.
It is possible to 'override' the behavior of the equals operator (`==`) so that the above would return `true`, but we'll get to that much later.

You can also set and get the values of the public fields of these objects.
Let's set some values so that we can tell the objects apart:

```{code-cell}
car1.Color = "Red";
car2.Color = "Yellow";

car1.Model = "Tesla";
car2.Model = "Land Rover Defender";
```

You can of course also invoke any of the public methods that these objects expose.

```{code-cell}
car1.Start();
car2.Start();
```

You should now have some understanding of the difference between classes and objects.
Don't worry if it feels like we're moving to fast. We will talk about classes a lot more in the coming chapters.


%```{caution}
%The idea of `static` is, fundamentally, a procedural idea, *not* an object oriented idea.
%A static class can be thought of as a namespace, and a static method as a namespaced method.
%Nothing more fancy going on there.
%```
