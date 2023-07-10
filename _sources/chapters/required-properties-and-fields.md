# Required properties and fields

% Cannot execute code blocks. Keyword required does not work in the C# version used in the build step.

As you've already learned in previous chapters, [fields](fields) and [properties](properties) are fundamental parts of an object's state. With constructors, you can ensure an object is created in a valid state, but what if you want to provide more flexibility, using [object initializers](object-initializers) for instance, while still guaranteeing that some properties or fields are always assigned a value? In C#, you can achieve this using the `required` modifier.

The `required` modifier can be used in a field or property declaration to enforce that they must be given a value when an object is being initialized. If a `required` property or field is not assigned during initialization, the compiler will raise an error. This is particularly useful when certain properties or fields are essential for the correct operation of an object.

Let's look at this in the context of a `Rectangle` class:

```csharp
public class Rectangle
{
    public required int Width { get; set; }
    public required int Height { get; set; }
}
```

In the above code, `Width` and `Height` are declared as `required`. Now, if we try to create a `Rectangle` object without setting `Width` and `Height`, the compiler will raise two errors:

```csharp
Rectangle r = new Rectangle();
```

```output
Required member 'Rectangle.Height' must be set in the object initializer or attribute constructor. (CS9035)
Required member 'Rectangle.Width' must be set in the object initializer or attribute constructor. (CS9035)
```

But if we provide values for `Width` and `Height` during object initialization, the code will compile and run as expected:

```csharp
Rectangle r = new Rectangle() { Width = 4, Height = 6 };
```

What if we want the fields to be set in the constructor rather than through object initialization?
The compiler does *not* analyze our constructors to figure out whether these properties are set. So, we must use the `[SetsRequiredMembers]` attribute on the constructor. This attribute informs the compiler that this constructor is responsible for setting the `required` members of the class.
If we' don't set the attribute then the compiler will still raise errors when we try to instantiate the class `Rectangle` because it doesn't know that the constructor that we called sets the required attributes.

Let's illustrate this with an example. We will modify our `Rectangle` class to have a constructor:

```csharp
public class Rectangle
{
    public required int Width { get; set; }
    public required int Height { get; set; }

    [SetsRequiredMembers]
    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }
}
```

In this example, the `Rectangle` constructor is decorated with the `[SetsRequiredMembers]` attribute and is responsible for setting the `Width` and `Height` properties. Now, we can create an instance of `Rectangle` like this:

```csharp
// Using constructor, not object initializers.
Rectangle r = new Rectangle(4, 6);
```

In this case, even though we're not using object initializers, the code compiles and runs successfully because the `required` properties `Width` and `Height` are being assigned within the constructor, and this is communicated to the compiler by the `[SetsRequiredMembers]` attribute.
It ensures the compiler understands that the constructor is properly initializing the `required` members of the object, satisfying the constraints imposed by the `required` keyword.

The `required` modifier provides a powerful mechanism to enforce the integrity of your objects during initialization. By enforcing initialization rules it makes your code safer and thus more maintainable. We'll talk more about the benefits of integrity in the chapter on [types over tests](types-over-tests).
In the next chapter, we'll explore `init` accessors, which provide additional control over object initialization.
