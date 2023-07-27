# Access modifiers

In C#, access modifiers are keywords used to specify declared accessibility of a member or a type (e.g. a class). This means that they control *where* classes, methods, and other members can be accessed from.

There are four access modifiers in C#:

- `public`
- `private`
- `internal`.
- `protected`

Then there's the two more esoteric variations `protected internal` and `private protected`. Here we will only focus on `public`, `private`, and `internal`. We will however discuss [`protected`](protected) in a later chapter.

%There are four access modifiers in C#: `public`, `private`, `protected`, and `internal`. Then there's the two more esoteric variations `protected internal` and `private protected`. Here we will only focus on `public`, `private`, and `internal`. However, we will discuss `protected` in a later chapter.

The explanations in this chapter are quite abstract, but it will start to make sense once we look at more concrete examples in the coming chapters.

```{note}
By default, types are `internal` and members are `private`.
These are the access modifiers you get if you don't choose one yourself.
```

```{note}
In C#, the naming conventions for members depend on their access modifiers. Public members typically start with a capital letter (PascalCase), such as `Color` or `Start()`. Private members, on the other hand, often begin with lowercase letter (camelCase), such as `color` or `start()`. These conventions are not enforced by the language, but they are widely accepted best practices in the C# community.
```

## Public

The `public` keyword is an access modifier for types and type members. Public access is the most permissive access level. There are no restrictions on accessing public members, whether it is a class or class members.

```csharp
public class Car {
    public int Color;
    public void Start() { }
}
```

In this example, both `Car` and its members `Color` and `Start` can be accessed from anywhere in your code.


## Private

The `private` keyword is an access modifier for members only and not for types. Private access is the least permissive access level. Private members are accessible only within the body of the type in which they are declared.

```csharp
public class Car {
    private int Color;
    private void Start() { }
}
```

In this example, `Color` and `Start` are only accessible within `Car`. Other classes, even if they're in the same program, can't access these members.


## Internal

The internal keyword is an access modifier for types and type members. Internal members are accessible only within files in the same assembly – in general, this means within the same application or library.

```csharp
internal class Car {
    internal int Color;
    internal void Start() { }
}
```

In this example, `Car`, `Color` and `Start` are only accessible within the same assembly, i.e., they can be accessed anywhere in the same application, but not from other applications or libraries.

Access modifiers in C# help improve the encapsulation of your code by limiting the scope of classes and their members, preventing outside code from inadvertently accessing or modifying data that should be kept internal to a class. These also provide a key part of the interface to a class or struct, by determining which parts of the class are accessible from other code.
We'll talk more about this when we get to encapsulation and information hiding.

