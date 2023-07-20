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
The constructor above is called a 'parameterless constructor' because it takes no parameters.

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

If we don't define any constructors in our class, the C# compiler provides a parameterless constructor by default. This automatically-provided constructor doesn't do anything - it has an empty body. But it allows you to create an object of the class.

```{important}
As soon as you define a constructor, the C# compiler does **not** automatically add a parameterless constructor.
```

Since we've defined a constructor in the `Car` class above it consequently doesn't contain a parameterless constructor anymore.
This means that we cannot instantiate objects without providing the arguments required by the constructor.

```{code-cell}
:tags: [raises-exception]
new Car();
```

Notice that we get a compiler error in the code above. The error message is telling us that we're trying to call a constructor that expects two `string` parameters, but we're not giving it any arguments. Because we've defined this constructor, the compiler no longer provides a default parameterless constructor, so it expects us to provide the necessary arguments.

It should also be mentioned that a class can have multiple constructors, as long as their parameter lists are different. This is known as constructor overloading. But we'll explore that in a future chapter.

```{admonition} Key point
Constructors allow us to control the initial state of our objects, contributing to code that is more predictable and reliable.
If we don't specify a constructor, the compiler generates a parameterless constructor for us.
```

Demanding that all necessary information is passed upon the creation of an object is a very important design idea that we will discuss later in a chapter called [types over tests](types-over-tests). Let's keep going.

