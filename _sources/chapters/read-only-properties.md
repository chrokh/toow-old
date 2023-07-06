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

# Read-only properties

When building software, we often encounter values that, once set, should never be changed. This immutability can ensure consistency and integrity in our applications. C# provides a way to encapsulate this behavior in our objects using read-only properties.

In C#, read-only properties are properties that can only be set at the time of object creation. Once the object is constructed, the value of a read-only property can't be changed.

A read-only property in C# is defined like any other property, but with only a get accessor. Without a set accessor, the property becomes read-only, because there's no way to change the value of the property.
%from outside the class.

Consider a `Book` class, where each book has a unique `ISBN` (International Standard Book Number) that's set when the book is published and can't change afterward. Here's how you might use a read-only property to represent this:

```{code-cell}
public class Book
{
    public string ISBN { get; }

    // Initial value can be set upon instantiation or initialization only.
    public Book(string isbn)
    {
        ISBN = isbn;
    }
}
```

In this example, `ISBN` is a read-only property. The ISBN is passed into the Book constructor when a new `Book` object is created, and the `ISBN` property is set. After that point, the `ISBN` property can't be changed.

```{code-cell}
:tags: [raises-exception]
public class Book
{
    public string ISBN { get; }

    public Book(string isbn)
        => ISBN = isbn;

    // This method does not compile.
    public void ChangeISBN (string ISBN)
        => this.ISBN = ISBN;
}
```

Remember that the intention behind a read-only property is to guarantee that the value remains constant after the object's construction.

%As you'll see in the upcoming chapters, C# provides various mechanisms to ensure the immutability and integrity of data, such as read-only fields and the init accessor.

