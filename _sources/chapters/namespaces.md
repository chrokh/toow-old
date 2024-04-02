# Namespaces

As you begin to write more complex programs with many different types, it becomes crucial to keep your code organized and easy to navigate. Picture a large city, bustling with people and activity. Without a well-structured system of streets and addresses, it would be nearly impossible to find a specific location. This is where namespaces come in. Namespaces in C# act like the addresses and streets of a city, allowing you to navigate your codebase efficiently and avoid naming collisions. They are a fundamental tool in structuring your code in a logical and maintainable way. In this chapter, we will delve into what namespaces are and how to use them effectively in your code.

```{figure} ../images/cover-namespaces.jpg

Namespaces are like adresses.
```

In your journey with C#, you've been creating enums, objects, and methods, all while implicitly working within a namespace, even if it hasn't been explicitly declared. Now, it's time to make our use of namespaces explicit and understand their purpose and power.

%Namespaces in C# are a way of organizing and providing a level of separation for your code.

They are particularly useful in larger projects where the chance of naming collisions increases. Imagine a scenario where you're building a city simulation software. In some places you have traffic lights that can be red, yellow, or green. In other places you have pedestrian traffic lights that are only Red or Green.

```csharp
namespace TrafficControl.Regular
{
    enum TrafficLight
    {
        Red,
        Green,
        Yellow
    }
}

namespace TrafficControl.Pedestrian
{
    enum TrafficLight
    {
        Red,
        Green
    }
}
```

```{attention}
If you're writing these namespaces in your main program file (`Program.cs`) and you're using top-level statements then you must put these namespaces at the end of the file.
```

In this example, by using namespaces, we have two `TrafficLight` enums which don't interfere with each other, despite having the same name. This is the primary function of namespaces - avoiding naming collisions.

To use these namespaces elsewhere in our code, we would reference them fully, like so:

```csharp
var regularLight = TrafficControl.Regular.TrafficLight.Red;
var pedestrianLight = TrafficControl.Pedestrian.TrafficLight.Green;
```

The periods (`.`) in the syntax above is known as 'dot notation'. You can think of this as qualifying an address like: `World.Europe.Sweden.Stockholm`.

This, however, can quickly get cumbersome. Here's where the `using` directive comes in handy. This allows us to bring in a namespace so we don't have to fully qualify the use of a type every time.

```csharp
using TrafficControl.Regular;

// Now we don't have to use the full namespace every time
var regularLight = TrafficLight.Red;
```

```{important}
The using directive can potentially lead to naming conflicts if types with the same name are imported from different namespaces. In such cases, you will need to specify the namespace to resolve the ambiguity.
```

In fact, namespaces are not only used for your own code. When you want to use types from the .NET library, you will often need to import their namespaces. The `System` namespace, which we have used frequently in our examples for `Console.WriteLine()`, is a common one.
When we're using top-level statements, the `System` namespace is already implicitly imported. This is why we don't need to explicitly import it.
If we were to import it however, it would look like this:

```csharp
using System;

Console.WriteLine("Hello, World!");
```

%Sometimes, you'll need types from other namespaces as well.
Consider the Color structure from the System.Drawing namespace, which is used to represent colors in graphics. This namespace is not included automatically even when using top-level statements, so we need to manually include it with the using statement:

%using System.Drawing;
%
%Color red = Color.Red;
%Console.WriteLine($"The RGB values of red are: {red.R}, {red.G}, {red.B}");
%
%This program will output the RGB (Red, Green, Blue) values for the color red, which are `255`, `0`, and `0` respectively. As you can see, the using statement at the top makes it possible for us to use types from the System.Drawing namespace, in this case the Color structure. It's important to note that you'll find yourself using the using statement frequently as you start to utilize more types from the .NET library.

Sometimes, you'll need types from other namespaces as well. Let's say we want to work with file I/O. We'd need to import the `System.IO` namespace. Here's how we can do that:

```csharp
using System.IO;

// We can now use types (like Directory) from the System.IO namespace without prefixing them.
var files = Directory.GetFiles(".");
```

In this case, `Directory` is a type from the `System.IO` namespace. Because we've imported `System.IO`, we can use `Directory.GetFiles` directly.

Namespaces are a fundamental aspect of C#, and getting comfortable with them will enable you to better organize your code and more easily leverage .NET's extensive libraries. In the next chapters, we'll be exploring more complex types that will benefit from being neatly organized within namespaces.


