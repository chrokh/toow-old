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

# Constructors

When creating objects in C#, you might sometimes want to specify certain initial values or settings. For this, we use constructors - a special method in a class that is automatically invoked when an object of the class is created. They help in maintaining the consistency and integrity of the object being created, setting the stage for robust and reliable code.

Constructors in C# are special member functions of a class. They share the same name as the class and have no return type, not even void. They are primarily used to initialize the variables or fields of a class, ensuring that objects of the class start their life in a consistent state.

Here is an example:

```{code-cell}
public class Car
{
    public string Make;
    public string Color;

    // This is the constructor
    public Car()
    {
        Make = "Tesla";
        Color = "Red";
    }
}
```

In the above code, the `Car()` method is the constructor. When we create a new `Car` object, this constructor is called, initializing the `Make` and `Color` fields with the values specified by the constructor body.

```{code-cell}
// Creating an object of the Car class will call the constructor
Car car = new Car();

Console.WriteLine(car.Make);
Console.WriteLine(car.Color);
```

A constructor is a method whose name is the same as the name of the class.
It doesn't have a return type, but since it returns an object of the class when you call it you can think of the return type being the class.
Constructors can also take parameters. This allows us to create objects with different initial states.

```{code-cell}
public class Car
{
    public string Make;
    public string Color;

    // Constructor with parameters
    public Car(string make, string color)
    {
        Make = make;
        Color = color;
    }
}
```

Now, when we create a new `Car` object, we can specify the make and color during creation.

```{code-cell}
// Creating an object with specific values
Car car = new Car("Rivian", "Yellow");

Console.WriteLine(car.Make);
Console.WriteLine(car.Color);
```

A class can have multiple constructors, as long as their parameter lists are different. This is known as constructor overloading, a topic we'll explore in a future chapter.

Remember, constructors allow us to control the initial state of our objects, contributing to code that is more predictable and reliable.

