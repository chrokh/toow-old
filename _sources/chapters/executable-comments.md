# Executable comments

While compilers and interpreters ignore comments there is a phenomena known as "executable comments", "functional comments", or "annotations".
These types of comments follow a specific syntax, just like regular source code, and can be processesed either by the regular compiler or by some separate program (that is sometimes also referred to as a compiler).

The purpose of executable comments vary but common reasons include the generation of documentation and the adding of types.
Executable comments that document the code are often called "documentation comments" and this is indeed the terminology that we use in C#.
Executable comments that add types are often known as "type annotations" and these exist to add data types to, what is known as, dynamic languages, meaning languages whose compiler or interpreter doesn't enforce types.
We'll talk more about both [data types](data-types) and [dynamic languages](static-vs-dynamic) later.

Documentation comments can be used to generate technical or end-user documentation from your source code.
If you write your comments in accordance with some specific syntax, you can run your source code through some document generating program that processes all your documentation comments and spits out documentation.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:documentation-comments
When using documentation comments and running our program through the compiler we not only get a program but also a set of documentation files.
```

Documentation comments is an excellent way of solving the problem that we discussed in the chapter on [documentation](documentation) where the documentation and code say different things.
By keeping the documentation close to the code we minimize the risk of the documentation and code drifting apart.

- More on documentation comments later in METHOD chapter and CLASS chapter.

To give some examples, in C# we've got [documentation comments](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments), in Java we've got [JavaDoc](https://en.wikipedia.org/wiki/Javadoc), and for web API's we've got [Open API](https://www.openapis.org/) and [Swagger](https://swagger.io).
It is too soon to talk more specifically about the syntax of documentation comments.
We must first talk about [static methods](static-methods), [classes](classes), [instance methods](instance-methods), and [properties](properties).
We will take a brief look at the syntax of documentation comments in these respective chapters.
However, if you want to see some of the syntax now, please see the example below.

````{admonition} Example
:class: info dropdown
This example is greatly inspired by some of the snippets given in the official [documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments).
```csharp
/// <summary>
/// Class <c>Point</c> models a point in a two-dimensional plane.
/// </summary>
public class Point
{
  /// <value>
  /// Property <c>X</c> is the x-coordinate.
  /// </value>
  public int X { get; private set; }

  /// <value>
  /// Property <c>X</c> is the y-coordinate.
  /// </value>
  public int Y { get; private set; }

  /// <summary>
  /// This constructor creates a new Point at (0,0).
  /// </summary>
  public Point() : this(0, 0) {}

  /// <summary>
  /// This constructor creates a new Point at 
  /// (<paramref name="xPos"/>,<paramref name="yPos"/>).
  /// </summary>
  /// <param><c>xPos</c> is the new Point's x-coordinate.
  /// <param><c>yPos</c> is the new Point's y-coordinate.
  public Point(int xPos, int yPos)
  {
    X = xPos;
    Y = yPos;
  }
}
```
````

```{exercise}
What are executable comments?
```

