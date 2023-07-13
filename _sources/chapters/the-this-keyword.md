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

# The `this` keyword

As we navigate the realm of object oriented programming in C#, we encounter scenarios where we need a way to refer to the current instance of a class. The `this` keyword serves this purpose, providing a clear and unambiguous way to access the current object's members, enhancing code readability and maintainability.

The `this` keyword in C#, refers to the current instance of the class. It is used inside the class's methods and properties to refer to the fields, methods, or properties of the class.

One common use of `this` is to resolve ambiguity between instance variables and parameters, especially in constructors or methods where parameter names might be the same as instance variable names.

Consider this example:

```{code-cell}
public class Car
{
    private string make;
    private string color;

    // Constructor with parameters
    public Car(string make, string color)
    {
        this.make = make;
        this.color = color;
    }
}
```

In this `Car` class, `make` and `color` are instance variables and they have the same names as constructor parameters. The `this` keyword is used to differentiate the instance variables from the parameters. So `this.make` refers to the instance variable `make`, not the parameter `make`.

Had we not used the `this` keyword then we would instead have said `make = make` which means that we would have assigned the argument `make` to itself.

The keyword `this` can also be used to call one constructor from another within the same class, a practice known as constructor chaining.
But we'll talk about this in another chapter.

%
%csharp
%Copy code
%public class Car
%{
%    private string name;
%    private string color;
%
%    // Default constructor
%    public Car() : this("John Doe", 30)
%    {
%    }
%
%    // Parameterized constructor
%    public Car(string name, string color)
%    {
%        this.name = name;
%        this.age = age;
%    }
%}

%In this revised `Car` class, we have added a default constructor that calls the parameterized constructor using `this`.

%The `this` keyword is a tool that, when used wisely, can improve the readability and maintainability of your code by providing a clear and unambiguous way to refer to instance members.

Remember, using the `this` keyword isn't always necessary, but it can improve code readability and reduce confusion, especially when instance members (such as fields) and local variables or functions share the same names.


%In C#, the `this` keyword refers to the current instance of the class and is often used inside constructors to refer to the class's instance variables. This can be particularly useful when parameter names in a constructor match the names of instance variables. Let's modify our previous Car class to illustrate this:
%
%```{code-cell}
%public class Employee
%{
%    private string name;
%    private int color;
%
%    // Constructor with parameters
%    public Employee(string name, int color)
%    {
%        this.name = name;
%        this.color = age;
%    }
%}
%```
%
%```{code-cell}
%// Creating an object with specific values
%Employee employee = new Employee("Jane Doe", 25);
%```
%
%In the code above, name and age are instance variables, and the constructor parameters have the same names. To differentiate between the instance variables and the parameters, we use the `this` keyword. When we say `this.name`, we mean the name field that belongs to this instance of the `Employee` class and not the local variable.
