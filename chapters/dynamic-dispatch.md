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


# Dynamic dispatch

In the last chapter we established that the compile-time type of a variable determines what operations you can perform on the variable in your code, whereas the run-time type determines what actual operations occur when your code is executed.
We said that you loose the ability to perform subtype specific operations when treating the subtype as a supertype, but that you gain the ability to write code that works for all subtypes at the same time. Let's talk about that benefit.

Why would it matter that we can treat cats and dogs as animals instead of as cats and dogs?
Or rectangles and triangles as shapes rather than their respective shapes?
What do we gain from treating these subtypes as the same supertype?
The answer is that we gain the ability to do dynamic dispatch.
%Well, the answer lies in something known as "dynamic dispatch".

```{admonition} Remember
The compile-time type of a variable determines what operations you can perform on the variable in your code, whereas the run-time type determines what actual operations occur when your code is executed.
```

%By declaring that `Cat` and `Dog` both implement the interface `IAnimal` we can use `IAnimal` as the compile-time type.
%Importantly we can call whatever methods and access whatever properties the type `IAnimal` declares.
%However, we can do this without having to care at all about which particular implementation of `IAnimal` we happen to get at run-time.
%As long as whatever members we're accessing are defined in `IAnimal` then we are guaranteed that these members will be available in all subtypes of `IAnimal`.
%

%Think about a bustling city traffic system, with a myriad of vehicles such as cars, bikes, and buses, all moving towards their own destinations. Despite their different types, they all share a common trait - they use the same roads. A road does not concern itself with the specifics of the vehicle that's using it, just as long as the vehicle follows the rules of the road. Similarly, dynamic dispatch in programming enables different types of objects to effectively utilize the same code pathways.

%``{tip}
%Which implementation of a method is executed is determined at run-time.
%``

%When we invoke a method or property on an object declared as an interface type, the actual method or property that gets executed is determined by the real type of the object (meaning the run-time type), not by the declared type of the variable (meaning the compile-time type).

Dynamic dispatch is a fundamental concept in subtype polymorphism.
The term 'dynamic dispatch' may sound daunting, but it simply refers to the technique of selecting which implementation of a polymorphic operation (method or property) to call at run-time. It's 'dynamic' because the decision is made at run-time, and it's a 'dispatch' because the run-time environment dispatches the method call to the correct method implementation.

%This is decided at run-time, hence the term 'dynamic'. 'Dispatch' refers to the process of selecting the appropriate method to execute.

```{admonition} Key point
Dynamic dispatch is the process by which a call to an interface method (or overridden method) is resolved at run-time, allowing different implementations of a method to be executed depending on the actual type of the object.
```

%In C#, when we call a method on a variable declared as an interface type, the actual method that gets executed is determined by the real type of the object, not by the declared type of the variable. This is decided at run-time, which is why we call it 'dynamic'. 'Dispatch' refers to the process of selecting the appropriate method to execute.

%There is a tremendous power within our grasp, a way to write flexible, robust, and maintainable code. It's called dynamic dispatch, and it's the secret ingredient that makes subtype polymorphism so practical and powerful.

%https://cdn.discordapp.com/attachments/1118630713084870736/1131076447415587006/chrokh_colorful_oil_painting_of_turntable_97a7b4e9-491b-4c95-8ede-81192586d71d.png
```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1131085303873019904/chrokh_oil_painting_of_turntable_and_bookshelf_of_vinyl_records_bae86b3b-9bab-46eb-8b12-b62a96036141.png

Like a turntable changing tunes with different records, dynamic dispatch shifts behavior based on the type of the object it's interacting with during run-time.
```

Think of a machine that is designed to throw balls. It doesn't matter what kind of ball you put into it: a baseball, a tennis ball, a golf ball. The machine doesn't need to know about the specific type of ball, it just needs to be a ball that it can throw. This is the core concept behind dynamic dispatch: methods can be called based on the run-time type of an object, not its compile-time type.

Let's imagine a vending machine that can dispense different kinds of healthy snacks. In programming terms, we have an `ISnack` interface and different classes like `Apple` and `Banana` that implement this interface. Here's what it might look like:


```{code-cell}
public interface ISnack
{
    string Name { get; }
    double Price { get; }
}
```

```{code-cell}
public class Apple : ISnack
{
    public string Name => "Apple";
    public double Price => 1.5;
}
```

```{code-cell}
public class Banana : ISnack
{
    public string Name => "Banana";
    public double Price => 1.0;
}
```

Let's say that the `VendingMachine` class uses the `ISnack` interface in a method called `Dispense`.
You pass an argument to the method stating how many items you want, and it tells you how much you must pay.

```{code-cell}
public class VendingMachine
{
    private ISnack snack;

    public VendingMachine(ISnack snack)
        => this.snack = snack;

    public void Dispense(int quantity)
    {
        double totalCost = snack.Price * quantity;
        Console.WriteLine($"You have to pay {totalCost} BTC for {quantity} {snack.Name}s.");
    }
}
```

Using the `VendingMachine` class might look like this:

```{code-cell}
VendingMachine appleMachine = new VendingMachine(new Apple());
VendingMachine bananaMachine = new VendingMachine(new Banana());

appleMachine.Dispense(2);
bananaMachine.Dispense(2);
```

In this example, the `Dispense` method takes an integer parameter representing the quantity of snacks the user wants. It then calculates the total cost for the requested quantity, based on the price of the specific snack stocked in the vending machine. This information is then displayed. The type of snack, which affects **the cost calculation, is established at run-time** when we create instances of the `VendingMachine` with different `ISnack` implementations (`Apple` or `Banana`). The cost calculation is not established at compile-time.

This is a demonstration of dynamic dispatch in action: the specific implementation of `ISnack` isn't known until run-time, but we can still interact with them polymorphically via the `ISnack` interface. Despite having a single `Dispense` method, different messages can be output depending on the specific type of snack, offering a clear picture of how subtype polymorphism and dynamic dispatch work together.
This is what we mean when we say that we are 'treating' a subtype as a supertype.

%While dynamic dispatch carries a certain amount of overhead due to the run-time type checking the benefits of code flexibility and maintainability greatly outweigh these costs in most scenarios.

%Dynamic dispatch is a key tool for writing flexible and maintainable code.

%In the upcoming chapters, you will learn about further subtleties and complexities of method dispatch, such as overriding methods in subclasses.

%The capability to decide at run-time which method or property to invoke, based on the actual object type, makes dynamic dispatch a powerful mechanism for promoting flexibility and adaptability in our code. It's akin to managing traffic in a bustling city, allowing the correct pathway to be selected no matter what type of vehicle is in motion. In a future chapter on "Overriding", we'll see how dynamic dispatch plays a vital role when different classes have methods with the same name but different implementations.

```{warning}
The example does not fully illustrate the power of dynamic dispatch and subtype polymorphism. The difference between the `Apple` and `Banana` classes is primarily in the **data** they store (their price), not in their **behavior**.

The true strength of dynamic dispatch and subtype polymorphism shines when different subtypes vary in their behavior — that is, when they have different **implementations** of the same method. This allows you to write code that operates on a superclass or interface, but which executes different behavior depending on the run-time type of the object.

In future chapters, we will explore examples where subtypes have significantly different behaviors.
Remember, the objective here is not just to structure data, but to structure behavior.
```


%By declaring that `Cat` and `Dog` both implement the interface `IAnimal` we can use `IAnimal` as the compile-time type.
%Importantly we can call whatever methods and access whatever properties the type `IAnimal` declares.
%However, we can do this without having to care at all about which particular implementation of `IAnimal` we happen to get at run-time.
%As long as whatever members we're accessing are defined in `IAnimal` then we are guaranteed that these members will be available in all subtypes of `IAnimal`.
%
%```{tip}
%Which implementation is executed is determined by the *run-time type* not the compile-time type.
%```

```{note}
Before leaving the section on dynamic dispatch it should be mentioned that languages that implement dynamic dispatch by means of subtype polymorphism usually provide us with *single* dynamic dispatch.
This means that the implementation that is executed depends on the run-time type of one variable.
We will learn about *multiple* dynamic dispatch in the chapters on [visitor pattern](visitor-pattern) and [pattern matching](pattern-matching).
```

