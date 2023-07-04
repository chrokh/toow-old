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

# Fields

%In a program, data often needs to persist beyond the lifetime of a single method call, and needs to be accessible across different methods within a class. This is where fields come into play, as they allow us to store and manipulate data within the context of an object.

Fields provide a mechanism for storing the state or data of an object. Without them, our objects would lack any kind of internal storage to hold their individual characteristics or properties. For instance, imagine trying to represent a `Car` without being able to store details such as its `Model`, `Color` or `Speed`. It would be like trying to describe a car without referring to any of its unique features! With fields, we can store these pieces of information directly within our objects, giving them the ability to represent complex entities with multiple characteristics. This makes our code more representative of the real world, and thereby more intuitive and easier to work with.

We've said that objects bundle of state and behavior. Fields are used to hold state. They are variables that hold the data of the object and can be accessed and manipulated by the methods within and outside the class.
In some languages, fields are called 'instance variables', which helps us understand that that they are variables that belong to an instance.

Each instance of a class has its own separate set of fields, allowing each object to maintain its unique state. For example, in a `Robot` class, a field `BatteryLevel` might hold the current battery charge of a robot instance. This state can then be used or modified by methods like `Charge` or `Move`, defining the robot's behavior.

%Fields are used to store data that must be accessible to multiple methods of a class or available throughout the lifetime of an object of that class.

A field is a variable that is declared directly in a class in C#.
A field declaration consists of the type followed by the name and ends with a semicolon (`;`). Just like how we declare a variable. Here is an example:

```{code-cell}
:tags: [remove-output]
public class Car
{
    public string Model;
}
```

In this example, we declare a field called `Model` in the `Car` class. We can now create any number of objects of the `Car` class and 'set' whatever value we want to their `Model` fields.

```{code-cell}
Car car1 = new Car();
car1.Model = "Tesla Roadster";

Car car2 = new Car();
car2.Model = "Rivian R1S"
```

Now our car objects have different models. We can 'get' the values like this:

```{code-cell}
Console.WriteLine(car1.Model);
Console.WriteLine(car2.Model);
```

Fields can be of any type including built-in types (like `int`, `string`, etc.), custom types (like a class you've defined), or complex types (like arrays or delegates).

```{code-cell}
:tags: [remove-output]
public class CarWash
{
    public Car Current;
}
```

```{code-cell}
CarWash wash = new CarWash();
wash.Current = car1;
```

Fields, by default, take a default value based on their type. Numeric types default to `0`, booleans to `false`, and reference types (which includes strings and custom classes) default to `null`.

```{code-cell}
Car unknown = new Car();
Console.WriteLine(unknown.Model == null);
```

Fields can be initialized at the time of declaration or in a constructor. We'll talk about constructors in its own chapter, but here's an example of initializing fields at the time of declaration:

```{code-cell}
public class Car
{
    public string Model = "Unknown";
}
```

In the above code, all instances of Car will have the model field initialized to `"Unknown"`, unless explicitly assigned a different value.

```{code-cell}
Car unknown = new Car();
Console.WriteLine(unknown.Model);
```

As we saw in the chapter on access modifiers, members can also be `private`. If a field is marked as `private`, it can only be accessed within the same class. This is part of the important idea of [encapsulation](encapsulation) but we'll get back to that later.

To access a private field outside of the class, you need to use methods or properties, which we'll talk about next.

