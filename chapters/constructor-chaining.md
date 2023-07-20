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

# Constructor chaining

We've already talked about [constructors](constructors) and [constructor overloading](constructor-overloading) but let's now talk about constructor chaining. This is a technique where a constructor in a class calls another constructor in the same class or a constructor in its superclass. It allows for code reusability and is a neat way to initialize an object with different sets of parameters.

Consider a `Rectangle` class where one constructor accepts two arguments, `width` and `height`, while another only takes a `side` length and treats the rectangle as a square.

```{code-cell}
public class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }

    // Constructor for rectangle
    public Rectangle(double width, double height)
    {
        Console.WriteLine("Running constructor with 2 parameters.");
        this.Width = width;
        this.Height = height;
    }

    // Constructor for square
    public Rectangle(double side)
        : this(side, side) // This calls the first constructor
    {
        Console.WriteLine("Running constructor with 1 parameter.");
    }
}
```

In the case above, the `Rectangle` constructor with one argument, `side`, invokes the two-argument constructor, assuming the rectangle to be a square, with equal `width` and `height`.

```{note}
When chaining constructors using `this` or `base` we have to supply the arguments for the parameters that the constructor in question is expecting. To do so we are allowed to write [expressions](expressions). In these expressions we also have access to the arguments that was passed to the constructor doing the chaining. In the example above, we are passing on the argument `side`.
```

When we call the constructor which takes two arguments, only that constructor is run.

```{code-cell}
new Rectangle(10, 10);
```

But when we run the constructor which takes one argument, that constructor also invokes the other constructor:

```{code-cell}
new Rectangle(10);
```

```{tip}
Note that the constructor we delegate to is run before the constructor doing the delegating.
```

Let's now look at constructor chaining with a superclass.
In a class hierarchy, when you instantiate an object of a derived class, the constructors are called in order from the top-most base class down to the most derived class. Each constructor does its part in initializing the object. If one constructor in the chain explicitly calls another using the `base` keyword, that called constructor runs before the calling constructor continues its execution. This guarantees that the object is fully initialized at each level of the inheritance hierarchy before it's further initialized at the next level.

Say that we have a `Vehicle` class and a derived `Car` class. The `Vehicle` constructor accepts a `maxSpeed` parameter, and the `Car` class adds a color property:

```{code-cell}
public class Vehicle
{
    public double MaxSpeed { get; private set; }

    public Vehicle(double maxSpeed)
    {
        Console.WriteLine("Running constructor in parent.");
        this.MaxSpeed = maxSpeed;
    }
}
```

```{code-cell}
public class Car : Vehicle
{
    public string Color { get; private set; }

    // Constructor
    public Car(double maxSpeed, string color) : base(maxSpeed)
    {
        Console.WriteLine("Running constructor in child.");
        this.Color = color;
    }
}
```

In this scenario, the `Car` class’s constructor uses the base keyword to call the `Vehicle` class’s constructor. The `Vehicle` constructor initializes the `MaxSpeed` property, and the `Car` constructor then initializes the `Color` property.

Just like when we chained constructors in the same class, when we run the constructor that delegates to another constructor through constructor chaining, then both constructors are invoked. Again, notice that the constructor we delegate to is run before the constructor doing the delegating.

```{code-cell}
new Car(120, "Red");
```

Since the constructor in `Car` is the one doing the chaining, only a single constructor is run if we instead instantiate a `Vehicle`.

```{code-cell}
new Vehicle(120);
```

Notice that the `Vehicle` superclass doesn't provide a [parameterless constructor](constructors).
If we were to define a `Car` subclass and try to provide a constructor without using the `base` keyword to call the superclass's constructor, we would run into a problem.

```{important}
When a superclass does not have a parameterless constructor, subclasses must explicitly call one of the available constructors using the `base` keyword.
%When a superclass does not provide a parameterless constructor, it's mandatory for subclasses to call one of the available superclass constructors using the base keyword in their constructor definitions. This ensures proper initialization and allows the code to compile successfully.
```

```{code-cell}
:tags: [raises-exception]
public class Car : Vehicle
{
    public string Color { get; set; }
    public Car(string color) => this.Color = color;
}
```

This leads to a compilation error. The compiler complains that we have not provided an argument for the parameter `maxSpeed` in the constructor of `Vehicle`.
By ensuring that the `Car` class's constructor calls the `Vehicle` class's constructor with a `maxSpeed` parameter using the `base` keyword, as we did when we did call `base`, we satisfy the compiler, and the code compiles successfully.

```{admonition} Key point
Constructor chaining allows a constructor to call another constructor, either within the same class or in its superclass, using the `this` or `base` keywords respectively. This technique leads to cleaner code by eliminating duplication and ensuring all necessary initialization always takes place, no matter which constructor is called. When a superclass does not have a parameterless constructor, subclasses must explicitly call one of the available constructors using the `base` keyword.
```


