# Top-level statements

Until now, all of the programs we've written have used a feature called "top-level statements". This feature was added to C# to make it easier to get started with coding in C#.

Consider a simple Hello World program written using top-level statements:

```csharp
Console.WriteLine("Hello, World!");
```

In earlier versions of C#, and even in C# 9.0 and beyond if you choose not to use top-level statements, this program would look like this:

```csharp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

As you can see, top-level statements remove a lot of the boilerplate that is required to define a simple program. Instead of having to define a [namespace](namespaces), a [class](classes), and a `Main` [method](static-methods), you can directly write the code that you want to execute.

The entry point of a C# program is the `Main` method. When you use top-level statements, the C# compiler generates this `Main` method for you. The code that you write is placed inside this `Main` method.

```{important}
Remember, the code that you're writing at the top level is still inside a class and a method. It's just that the C# compiler is doing the work of creating these for you when you use top-level statements.
```

When using top-level statements, your statements and types are placed in the global namespace rather than any specific namespace.
So the top-level statement we showed above would be translated into something like this:

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
```

`Program` is not inside any namespace, so it resides in the global namespace. If you declare other types in the same file as your top-level statements, those types also reside in the global namespace by default, unless you explicitly declare a namespace for them.

```{tip}
Since top-level statements are placed in the global namespace you have to use the `using` directive to import types that you've defined in other namespaces.
```

When you create a new project in an IDE like Visual Studio and choose the option "Do not use top-level statements", this is the format that your program will be in. This is also the format that you will often see in larger programs and libraries, as it allows for greater organization and structure. However, top-level statements can be a convenient tool for small programs and scripts.

```{figure} ../images/do-not-use-top-level-statements.jpg

When you create a new project in Visual Studio you can check a box that causes your generated main program file to not use top-level statements.
```

When using top-level statements, the order in which you declare certain elements matters. As a rule of thumb, `using` directives must be declared at the top of the file, followed by any top-level statements, and then type declarations (like classes, structs, or enums). Any attempt to mix this order can lead to a compiler error.

For example, consider this code:

```csharp
class MyClass { }

Console.WriteLine("Hello, World!");

using System;
```

```output
(3,1): Error CS8803: Top-level statements must precede namespace and type declarations.
(5,1): Error CS1529: A using clause must precede all other elements defined in the namespace except extern alias declarations.
```

If you try to compile this, you'll receive an error message from the compiler. The `using` directive is not at the top of the file and the `Console.WriteLine` statement appears after the `MyClass` declaration, both of which are violations of the rules.

```{tip}
You must always declare your `using` directives at the top, then your top-level statements, and finally your types.
```

```{tip}
If your project file (`*.csproj`) contains a `<StartupObject>` element then top-level statements will not work. By removing it you re-enable top-level statements. This is an issue when you're using some online services like [replit.com](https://replit.com/).
```

%In the upcoming chapters, we'll explore more about the `Main` method, namespaces, classes, and other features that you've seen here. But for now, it's important to understand that even when you're using top-level statements, you're still using these features. You're just letting the C# compiler handle them for you.

