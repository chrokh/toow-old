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

# Object initializers

Initializing objects with many properties or fields can become cumbersome. Object initializers in C# provide a neat, efficient, and readable way to create and initialize objects on the fly.

This is syntactic sugar that lets you create and initialize an object in a single statement. They can be used with any type that has accessible properties or fields, not just classes you define.

Let's consider a simple `Car` class:

```{code-cell}
public class Car
{
    public string Make { get; set; }
    public string Model { get; set; }
    public string Color { get; set; }
}
```

Without object initializers, you might create instances of the `Car` class and then set the properties like this:

```{code-cell}
Car car1 = new Car();
car1.Make = "Tesla";
car1.Model = "Roadster";
car1.Color = "Red";

Car car2 = new Car();
car2.Make = "Rivian";
car2.Model = "R1S";
car2.Color = "Yellow";
```

But with an object initializer, we can do this more succinctly:

```{code-cell}
Car car1 = new Car { Make = "Tesla", Model = "Roadster", Color = "Red" };
Car car2 = new Car { Make = "Rivian", Model = "R1S", Color = "Yellow" };
```

In this statement, we create new `Car` objects and initialize their `Make`, `Model`, and `Color` properties, all in a single line. The object initializer is the part inside the curly braces (`{ ... }`). Each property is assigned a value using an equals sign, and multiple assignments are separated by commas.

It's important to note that you can use object initializers with any class or struct (we'll talk about these later) that has accessible properties or fields. They're a powerful tool that can make your code cleaner and more efficient, and they can drastically simplify the process of creating and initializing complex objects.

When you instantiate C# types with `public` attributes, consider using object initializers to make your code more readable and maintainable.


%With C#, there's a more concise way to create instances and set the values of their fields in a single line using the syntactic sugar known as 'object initializers'. Creating and assigning models to our `Car` objects can be done as follows:
%
%Car car1 = new Car { Model = "Tesla Roadster" };
%Car car2 = new Car { Model = "Rivian R1S" };
%
%This syntax allows us to initialize the Model field during the instantiation of our `Car` objects, making the code more compact and readable. We can then get the values the same way as before.
