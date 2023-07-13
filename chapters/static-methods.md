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

(blocks)=
# Static methods

Sometimes, we need to perform operations that don't rely on the state of an individual object but that are universally applicable. Static methods fulfill this role. Like static fields and static constructors they belong to the class itself, not any individual object of that class. This means we can call them without creating an instance of the class.

%This chapter introduces static methods and how to define and use them in your C# programs.

%In the previous chapter, we learned about static constructors and how they are used to initialize static fields when a class is first accessed. Now, we're going to examine another feature that uses the static keyword: static methods.

%A static method is a method that belongs to the class itself rather than any object of the class. Static methods are usually used to perform operations that are independent of object state.

%Static methods can only access static members, as they don't have an instance of the class to reference. This can be beneficial for creating utility functions that don't need to operate on instances of classes.


```{warning}
Remember that using static is counter to the core ideas in object oriented programming, like subtype polymorphism, and can make your code less flexible and maintainable. Because static methods don't work on instances, they can't be overridden or used polymorphically. Use static methods judiciously and remember that there's always an object oriented design that could meet your needs.
```

%{warning}
%While the static keyword might seem like a simple solution in the short-term, it often leads to code that is **harder to test and maintain** in the long run. By using static, you depart from the core ideas in object oriented programming, like subtype polymorphism. This leads to less flexible and maintainable code.
%Additionally, because static members maintain state between calls, they can introduce **unexpected side effects** that can make your code **harder to reason about and test**.
%Static fields are essentially 'global state'.
%Use static members carefully and remember that there always exists an actually object oriented design that meets your needs. You don't need `static`.

You've actually already been using static methods throughout this book without necessarily realizing it. The `Console.WriteLine method`, which we've used for outputting information to the console, is a static method. Here's a quick reminder of its use:

```{code-cell}
Console.WriteLine("Hello, World!");
```

In this case, `WriteLine` is a static method belonging to the `Console` class. We don't have to create an instance of `Console` to use `WriteLine`; instead, we call it directly on the class.

The .NET Framework Class Library (FCL) provides a large number of useful static methods that you can use in your applications. For instance, the `Math` class, which provides methods and constants for trigonometric, logarithmic, and other mathematical functions. The `Pow` method is one example of a static method from this class. It raises a specified number to the power of another specified number:

```{code-cell}
double result = Math.Pow(2, 3);  // Computes: 2 ^ 3
Console.WriteLine(result);
```

In this code, `Math.Pow` is a static method that takes two arguments: the base and the exponent. It calculates the base raised to the power of the exponent and returns the result. In this case it calculates `2` to the power of `3`.

Here's another static method that you've proabbly been using without realizing it. The [string interpolation](string-interpolation) feature in C# is essentially syntactic sugar for a static method call to `String.Format`. You might write code like:

```{code-cell}
string msg = "world";
Console.WriteLine($"Hello, {msg}!");
```

What's actually happening under the hood is something akin to:

```{code-cell}
string msg = "world";
Console.WriteLine(String.Format("Hello, {0}!", msg));
```

As you can see, static methods are a key part of C# and .NET, and they allow us to use functionality without needing to instantiate an object.
The key takeaway is that static methods are a fundamental part of the .NET library and are used in many places, even when it might not be immediately obvious.

Let's now also write our own static method.
Consider a simple game where players can score points. We might want to provide a way to calculate the average score across all players. This operation doesn't depend on a particular player's state, but rather on a static field representing the total points and total number of players.

Here's an example:

```{code-cell}
public class Player
{
    public string Name { get; set; }
    public int Score { get; set; }

    private static int totalScore = 0;
    private static int totalPlayers = 0;

    public Player(string name)
    {
        Name = name;
        totalPlayers++;
    }

    public void AddScore(int score)
    {
        Score += score;
        totalScore += score;
    }

    public static float AverageScore()
    {
        if (totalPlayers == 0)
            return 0;
        else
            return (float)totalScore / totalPlayers;
    }
}
```

In this example, we have a static method called `AverageScore` that calculates and returns the average score of all players. Notice that it doesn't make sense to tie this method to a specific Player instance, as the operation pertains to all players.

```{code-cell}
var player1 = new Player("Alice");
player1.AddScore(100);

var player2 = new Player("Bob");
player2.AddScore(200);

Console.WriteLine(Player.AverageScore());
```

```{warning}
Although it might be tempting to use static methods to perform operations that aren't tied to specific instances, remember that these operations can still be modeled using an object oriented approach. In our `Player` example, we could create a `Game` class that keeps track of all `Player` instances. The `GetTotalScore` method could then be a part of the `Game` class, accessing the `Score` of each `Player` to compute the total. This approach adheres more closely to object oriented principles and can offer greater flexibility and maintainability in the long run.
```

%Static methods can also be used for operations that don't involve any state at all.

%In the next chapter, we will learn about static properties, which, like static methods, are members that belong to the class rather than to instances of the class.


-----------


%- Multiple input types to WriteLine due to overloads.
%- Console can also be thought of as defining a type with only a single member. Static means that there's only one member.
%- Sets and functions. Not elegant due to mutation. Still mention it though. It is still valid, but it might also mutate things beyond the in and out. Use bool negation operation (`!`) since it's unary.
%- Methods can have parameters and thus arity. More on this later.
%- Operators can be unary or nullary.

%- Fat-arrow syntax


%We have actually already seen a *static* method.
%The method `WriteLine` is a static method that's defined on the static class `Console`.
%It is therefore called directly upon references to the class, not on instances of the class.
%We'll talk more about [static classes](static-classes) and [static methods](static-methods) in separate chapters so don't worry too much if your head has started to spin.
%For now however, I just wanted us to quickly think about this method that we've already used a lot in terms of types.
%
%The method `WriteLine` is called by stating the class name `Console`, adding a dot, the static method name `WriteLine`, and then enclosing whatever argument we wish to print in parentheses.
%
%Console.WriteLine("Hello world");
%Console.WriteLine(1);
%Console.WriteLine(true);
%
%Remember how we in the chapter on [mathematical functions](functions) said that we can use set theory to reason about functions?
%Functions map input to output and both static and instance methods are like functions with the important exception that they are also allowed to "mutate" the world.
%We'll talk more about mutation in the chapter on [mutability](mutability) but what we mean is that methods are not only allowed to return some particular output given some particular input but they are also allowed to change things.
%
%The method `WriteLine` is a good example of mutation since it maps all input to a single output value called `void`.
%This output value is special as you are not allowed to pass around instances of the type.
%The type `void` is used when we want to say that a method does not evaluate to any value no matter how we call it.
%In the case of `WriteLine` this makes sense since we're not looking to get a value back but rather to have something printed to screen.
%We call this a "side effect".
%When we're calling `WriteLine` we're looking for the side effect of having whatever we pass it printed to the screen.
%
%
%
%%{exercise}
%% Fizz buzz.
%%





