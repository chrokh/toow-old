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


## Motivation

In programming, organization is key. Without a clear structure, code can easily become a tangled mess, difficult to read, modify, debug, or extend. This is where objects, the core components of object-oriented programming, come into play. They help us to manage complexity by breaking down the system into manageable chunks.

```{important}
In procedural programming, the building block is the [procedure](method-composition).
In object oriented programming, the building block is the object.
In procedural programming, we solve complex problems by composing simple procedures.
In object oriented programming, we solve complex problems by composing simple objects.
```

Imagine you're building a simulation of a city. There are buildings, cars, people, and so many more elements to consider. Each of these components has its own set of attributes and behaviors. A building, for instance, has a number of floors and can be either residential or commercial. A car has a model, color, and can move or park. If we were to model this system procedurally, i.e., with simple data structures and functions, we would soon find ourselves lost in a sea of code, where changing one part might unexpectedly affect others.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1120646839591510136/chrokh_A_colorful_and_imaginative_illustratoin_of_a_simulated_c_58663671-a8ed-468f-aa30-66af56d6d097.png?width=868&height=868

Imagine a computer simulation composed of objects. People, vehicles, buildings, etc. Anything can be modeled as an object.
```

Objects come to the rescue in such scenarios. In object-oriented programming, each of these components—buildings, cars, people—can be modeled as an 'object'. The building object can have properties like 'number of floors' and 'type', and methods like 'occupy' or 'vacate'. Similarly, a car object can have properties like 'model' and 'color', and methods like 'move' and 'park'. This way, each component becomes a self-contained unit with its own data and behavior, making the code easier to understand, maintain, and extend.

Moreover, objects promote code reuse. If you need another building in your city, you don't have to write a new set of variables and functions. Instead, you create a new instance of the 'building' class, which is much quicker and helps to keep the code [DRY](DRY).

In real-world software development, objects also facilitate collaboration. Different team members can work on different objects, reducing conflicts and enhancing productivity. They also make the code more robust and secure by encapsulating data and preventing unauthorized access.

In short, understanding and using objects efficiently is a powerful skill that every C# programmer needs to master. Not only does it make your code more organized and understandable, but it also enables you to tackle complex problems with elegance and efficiency.


## Definition

In the realm of object-oriented programming, an 'object' is a central concept. But what exactly is an object?

At its core, an object (in a class-based object oriented langauge) is an instance of, what's called, a [class](classes). You can think of a class as a blueprint or template that describes the common properties and methods that its objects will have. An object, being an instance of a class, possesses these properties and can perform these methods.

For example, if we have a 'Car' class with properties like 'color' and 'model' and methods like 'start' and 'stop', an object of this class would be a specific car, say a red Toyota, which can start and stop. In this scenario, 'color' and 'model' define the state of the object, while 'start' and 'stop' define its behavior.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1120651120440787065/chrokh_An_explision_diagram_of_a_red_SUV_8d14d91a-269f-4555-9900-f4249e5263c3.png?width=868&height=868
:figclass: margin

A class called 'Car' might have properties like 'color' and 'model' and methods like 'start' and 'stop'.
```

An important feature of objects is encapsulation, the bundling together of data (properties) and methods into a single unit, and data hiding, the idea that an object's internal state should not be directly exposed to the outside world. This is a powerful tool for maintaining integrity and consistency of data. For example, consider an object representing a bank account in a game. We don't want its balance to be directly accessible, to prevent unmonitored modifications. Instead, we provide methods like 'deposit' and 'withdraw' to interact with the balance, which enforce rules like not allowing the balance to go negative.

Finally, we need to discuss the lifecycle of an object, which consists of creation, use, and destruction. When an object is created—often using a special method called a constructor—memory is allocated to store its state. The object is then in use for some time, during which its methods can be called and its properties can be read or changed. Finally, when the object is no longer needed, it is destroyed and its memory is reclaimed. In C#, this is handled automatically by the garbage collector.

In summary, an object is an instance of a class, which encapsulates state (properties) and behavior (methods) into a single entity. Understanding objects and their role is essential for mastering object-oriented programming and becoming an effective C# programmer.



## Examples

Let's make the concept of objects more tangible by looking at some concrete examples in C#.

Remember that these examples just scratch the surface of working with objects in C#. As you gain experience, you'll encounter more complex scenarios and learn more advanced techniques. In the coming chapters we will look at more complex examples and explain the different parts in further detail.

### Creating an object from a class

First, we define a class. Let's use a 'Dog' class for this example.

```{code-cell}
public class Dog
{
    public string Name { get; set; }
    public string Breed { get; set; }

    public void Bark()
    {
        Console.WriteLine($"{Name}: Woof!");
    }
}
```

Next, we create an object (an instance of the 'Dog' class) like so:

```{code-cell}
Dog myDog = new Dog();
```

In this line, new Dog() calls the Dog class's constructor (which is provided by default since we didn't write one) to create a new Dog object. Dog myDog declares a variable myDog of type Dog to hold the reference to our new Dog object.


### Calling methods and manipulating properties of an object

We can set the properties of our `myDog` object and call its Bark method like this:

```{code-cell}
myDog.Name = "Rex";
myDog.Breed = "German Shepherd";

Console.WriteLine(myDog.Name);
```

```{code-cell}
Console.WriteLine(myDog.Breed);
```

```{code-cell}
myDog.Bark();
```

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1120662760854925333/chrokh_An_illustration_of_two_identical_German_Shepherd_dogs_si_7142beb0-be44-4129-9db7-1ee0e28056d7.png?width=868&height=868
:figclass: margin

Every instance of an object is unique.
```

Every instance of an object is unique so if we can create another instance of the same class and give its properties different values.

```{code-cell}
Dog yourDog = new Dog();

yourDog.Name = "Rocky";
yourDog.Breed = "German Shepherd";

yourDog.Bark();
myDog.Bark();
```

%### Encapsulation in objects
%
%Let's add a private field `_age` and a public property Age to the Dog class to illustrate encapsulation. This property prevents setting Age to a negative number, thus preserving the integrity of the object's state.
%
%public class Dog
%{
%    private int _age;
%
%    public string Name { get; set; }
%    public string Breed { get; set; }
%
%    public int Age
%    {
%        get { return _age; }
%        set
%        {
%            if (value >= 0)
%                _age = value;
%            else
%                Console.WriteLine("Age cannot be negative");
%        }
%    }
%
%    public void Bark()
%    {
%        Console.WriteLine("Woof!");
%    }
%}
%
%// Using the Age property
%myDog.Age = 5;
%Console.WriteLine(myDog.Age);  // Outputs: 5
%
%myDog.Age = -1;  // Outputs: Age cannot be negative

### Changing state

Let's consider another example that involves a robot vacuum. A robot vacuum can have properties like 'Position' and 'BatteryLevel', and methods like 'Move'.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1120665507721400361/chrokh_An_illustration_of_a_robot_vacuum_cleaner_white_backgrou_e0d8a816-ad6b-4bc7-b7e1-329b03f5904d.png?width=868&height=868
:figclass: margin

Imagine an instance of a RobotVacuum class, able to navigate a two-dimensional space and manage its own battery life.
```

First, we define the 'RobotVacuum' class:

```{code-cell}
public class RobotVacuum
{
    public int XPosition = 0;
    public int YPosition = 0;
    public int BatteryLevel = 10;

    public void Move(int deltaX, int deltaY)
    {
        int requiredBattery = Math.Abs(deltaX) + Math.Abs(deltaY);
        if (BatteryLevel >= requiredBattery)
        {
            XPosition += deltaX;
            YPosition += deltaY;
            BatteryLevel -= deltaX + deltaY;
            Console.WriteLine($"Moved to position ({XPosition}, {YPosition}). Battery level: {BatteryLevel}.");
        }
        else
        {
            Console.WriteLine("Not enough battery to move the requested distance.");
        }
    }

    public void Recharge(int amount)
    {
        BatteryLevel += amount;
        Console.WriteLine($"Recharged. Battery level: {BatteryLevel}.");
    }
}
```

Now, let's create an object (an instance of the 'RobotVacuum' class):

```{code-cell}
RobotVacuum myVacuum = new RobotVacuum();
```

We've created a new `RobotVacuum` object.

Let's try to move our robot vacuum:

```{code-cell}
myVacuum.Move(1, 2);
```

You can see how the state of our `myVacuum` object changes when we call its `Move` method. Its `XPosition` and `YPosition` increases by the distance moved and its `BatteryLevel` decreases by the same amount.

If we try to move the robot further than the battery allows it doesn't move.

```{code-cell}
myVacuum.Move(10, 0);
```

We can call the `Recharge` method to increase the `BatteryLevel`:

```{code-cell}
myVacuum.Recharge(100);
```

```{code-cell}
myVacuum.Move(5, 10);
myVacuum.Move(-3, -2);
```

This example shows how an object's state can change over time by interacting with its methods. It also demonstrates how encapsulation ensures the consistency of an object's state even as it changes, by imposing constraints on how the state can be modified.


## Discussion
%Remember how we, in the chapter on [methods](methods), discussed that with methods as the only abstraction and method composition as the only tool (and assuming that we don't have access to things such as parametric polymorphism and higher order functions) we will be forced to eventually turn methods into data to increase abstractions.
%
%What I mean is that to increase the modularity of our code, and hence eliminate duplication, we will have to take things that might otherwise be expressed as methods and somehow convert them into data that methods can operate upon.
%In other words, instead of just implementing whatever code we want to implement as a method, we have to figure out how to represent some key step or steps (where there are multiple possible algorithms) as a data type that we then can accept as a parameter.
%When passing different values as arguments we get different behavior.
%All this for the purpose of eliminating duplication by increasing abstraction.
%
%A good example of this is how we, in the chapter on [methods](methods-substitutions), found ourselves in a position where it was difficult to increase abstraction and eliminate duplication without expressing part of the algorithm as data.
%We figured out that some ciphers are substitution ciphers and that the substitutions that any particular cipher performs can be expressed as an array of pairs containing a pattern and a replacement.
%
%Instead of being able to write algorithms called `robbersEncodeString`, `leetEncodeString`, and so forth, we had to write a method called `substitute` that accepted a list of substitutions instead.
%The substitutions are now data instead of being part of the algorithm.
%
%This is not necessarily a bad thing.
%It all depends on what you want to achieve and what you prefer.
%
%However, sometimes it's really difficult to find a sensible way of representing an algorithm as data.
%Not all algorithms can trivially be represented as data.
%In the case of substitution ciphers it happened to be simple.
%But some algorithms are arguably easier to express as methods.
%
%Back in the days, this is where function pointers would come into play.
%But, pointers are not [type safe](type-safety) and by now I'm hoping that you're convinced that static type safety is really important.
%So, let's not dwell on the archeic concept of function pointers.
%But what then?
%
%Well, this is where objects enter the scene.
%Objects allow us to bundle up some data with some methods and then *send that bundle* around.
%As we will learn, objects allow [subtype polymorphism](subtype-polymorphism) and hence [dynamic dispatch](dynamic-dispatch) without loosing static type safety.
%This in turn allows us to keep increasing abstraction without having to resort to turning more and more algorithms into data.
%
%```{note}
%In the coming chapters we will mostly focus on the idea of writing the substitution algorithms ourselves rather than turning the substitutions into data.
%But rest assured that when we're done rewriting this in a more object oriented fashion we'll also be able to support both ideas at the same time.
%So if you really liked the idea of substitution ciphers, don't worry.
%%Pretty neat, right?
%```

### Everything is an object
When trying to learn more about object oriented programming you may have come across the following phrase:

```{epigraph}
Everything is an object.
```

This is what we referred to when we, earlier in this chapter, called some object oriented languages "pure".

When saying that a language such as Smalltalk is a "purely" object oriented language we don't mean pure in the sense of [referential transparency](purity).
We mean "pure" in the sense that, in the language, everything (or almost everything) is an object.

We tend to use the word "everything" when talking about how purely object oriented a language is.
However, it would be more accurate to say something like "all values that you can construct and reference using variables".

We haven't yet talked about [inheritance](inheritance) and [interfaces](interfaces) but another way of saying this is that "all types derive from `Object`".
However, this is also only almost true in C#.
C# is not a purely object object oriented language in the sense that all types derive from `Object`.

When discussing [paradigms](paradigms) we established that C#, like many other contemporary programming languages, is a multi-paradigm language.
C# contains ideas from procedural, object oriented, as well as functional programming.

In Java, one problem is, the types that in C# are called built-in value types, or [simple types](simple-types).
In Java these are known as primitive types and they are not objects, but in C# they actually are.
So if simple types are objects, then these are not the problem.

What are the non-object types in C#?
The non-object types in C# are:

1. Pointers
2. Interfaces
3. Open type parameters

You could argue that pointers are an archaic remnant of the procedural days.
As such, we won't talk about them here.

Interfaces however are key to object oriented programming since they (as well as inheritance) enable what is known as [subtype polymorphism](subtype-polymorphism).
We'll talk much more about this later.
Suffice to say however that while interfaces themselves are not objects, any object that implements an interface must (tautologically) be an object because only objects can implement interfaces.

The same line of reasoning follows with open type parameters.
Any open type parameter will eventually be replaced by a concrete type that is an object.
Open type parameters will be discussed in much more detail when we talk about [generic programming](generics).

% TODO: Use proper reference.
So, it would be more correct to follow the assertion of Eric Lippert who states that:
"Every non-pointer type is *convertible* to object."

```{epigraph}
"Every non-pointer type is *convertible* to object."

-- [Eric Lippert](https://docs.microsoft.com/en-gb/archive/blogs/ericlippert/not-everything-derives-from-object)
```

We should however also mention that while an object of a child type can be implicitly converted to its parent class, when value types, such as the simple types like `int`, are converted to objects this causes what is known as [boxing](boxing).
More on that later though.


