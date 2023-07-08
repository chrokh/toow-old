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

# Instance method overloading

Imagine a calculator: you can use it to add two numbers, but you can also add three, four, or more numbers. The same basic operation, addition, but adapted to different scenarios. In programming, we have a similar concept that enables us to perform similar actions, but with different inputs. This is called 'overloading'.

Instance method overloading allows us to define multiple instance methods with the same name but with different parameters within a class. This enables us to perform similar operations, but with variations based on the input parameters. Method overloading enhances the readability of your code and provides flexibility in how a method can be used.

Consider a `Rectangle` class with instance methods that allow scaling it. Sometimes we may want to scale both width and height equally, other times we may want to scale them differently. Here's how we can overload methods to accommodate both scenarios:

```{code-cell}
public class Rectangle
{
    public double Width { get; private set; }
    public double Height { get; private set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public void Scale(double factor)
    {
        Width *= factor;
        Height *= factor;
    }

    public void Scale(double widthFactor, double heightFactor)
    {
        Width *= widthFactor;
        Height *= heightFactor;
    }
}
```

In the `Rectangle` class, we have overloaded the Scale method. The first method takes one parameter, `factor`, and scales both width and height equally. The second method takes two parameters, `widthFactor` and `heightFactor`, and scales the width and height differently.

```{note}
In the example above we could have simplified the implementation of the first `Scale` method by calling the second with the same `factor` for both width and height, like this: `Scale(factor, factor)`. Calling one overloaded method from another is a commonly occurring pattern.
```

We can use the overloaded methods like this:

```{code-cell}
Rectangle rect = new Rectangle(4.0, 5.0);

rect.Scale(2.0);
Console.WriteLine($"{rect.Width} x {rect.Height}");

rect.Scale(0.5, 1.5);
Console.WriteLine($"{rect.Width} x {rect.Height}");
```

In this example, the correct `Scale` method is selected based on the parameters we provide when calling the method. Overloading allows us to use the same method name to carry out different but related operations, improving code clarity and flexibility.

```{note}
Remember, method overloading is only possible when the number and/or type of parameters differ. Overloaded methods **can't only differ by their return type**.
```

In later chapters we will see more complex examples of overloading. For now, method overloading should be seen as a powerful tool for making your code more readable and hence maintainable.

