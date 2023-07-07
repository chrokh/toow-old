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

In the previous chapter, we introduced read-only fields and discussed how they provide a level of flexibility that constants cannot offer. In this chapter, we'll learn that we can achieve the same effect by using a read-only property, meaning an [auto-implemented property](auto-implemented-properties) that only have a 'get' accessor. It is common practice in C# to use read-only properties instead of read-only fields.

In C#, read-only properties are properties that can only be set at the time of object creation. Once the object is constructed, the value of a read-only property can't be changed.
Practically, this means that the read-only property must be assigned a value at the time of declaration or in the constructor of the class, and after this, it cannot be changed.
%Practically, this means that the property value can be set in a constructor or in the property initializer, but not using an [object initializer](object-initializers).

A read-only property in C# is defined like any other property, but with only a get accessor. Without a set accessor, the property becomes read-only, because there's no way to change the value of the property.
%from outside the class.

Consider the `Book` class, from the chapter on [read-only fields](read-only-fields), where each book has a unique and constant `ISBN`. Here's how you might use a read-only property to represent this:

```{code-cell}
public class Book
{
    public string ISBN { get; }

    // Initial value can be set upon instantiation or initialization only.
    public Book(string isbn)
        => ISBN = isbn;
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

```{warning}
The same dangers that we talked about in the chapter on [read-only fields](read-only-fields) also apply to read-only properties. While read-only *does* mean that the property cannot be reassigned a new value, it *does not* mean that the value it has been assigned *itself* cannot change.

Remember the analogy of a jar with a bag of marbles from the chapter on read-only fields? Even though we cannot replace the bag of marbles with another bag we can change the number of marbles in the bag, without changing the bag.
```

%As you'll see in the upcoming chapters, C# provides various mechanisms to ensure the immutability and integrity of data, such as read-only fields and the init accessor.

