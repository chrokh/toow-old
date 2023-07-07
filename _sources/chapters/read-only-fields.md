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

# Read-only fields

When building software, we often encounter values that, once set, should never be changed.
Read-only fields in C# are fields whose value cannot be changed after its containing object has been created.
A read-only field must be assigned a value at the time of declaration or in the constructor of the class, and after this, it cannot be changed.

%This immutability can ensure consistency and integrity in our applications. C# provides a way to encapsulate this behavior in our objects using read-only properties.

Imagine, for instance, the identifier of a book, the ISBN number. This number is unique to each book and does not change once assigned. We can represent this as a read-only field.

Here's a simple implementation:

```{code-cell}
public class Book
{
    public readonly string ISBN;

    public Book(string isbn)
        => ISBN = isbn;
}
```

In the `Book` class, ISBN is a read-only field. Once it is assigned in the constructor, its value cannot be changed. Let's create an instance of Book:

```{code-cell}
var book = new Book("111");
Console.WriteLine(book.ISBN);
```

Attempting to modify the `ISBN` field after the object has been constructed would result in a compilation error:

```{code-cell}
:tags: [raises-exception]
// The following statement does not compile.
book.ISBN = "222";
```

This ensures the immutability of ISBN after the Book object is created. Utilizing read-only fields can improve the robustness and predictability of your code, particularly when dealing with values that should remain constant after an object's instantiation. This can also help other developers understand the design intent that these values should not be altered after they have been set.

Earlier, we learned about [constants](constants), which are immutable values that must be known at compile-time. They are similar to read-only fields, but there's a key difference: read-only fields can be set at run-time. This allows us to declare read-only fields of any type. Constants on the other hand, only supports a limited set of data types.

Since the value of a read-only field can be set at run-time (as opposed to having to be set at compile-time like constants) we can assign it any expression.
This offers flexibility that constants can't provide.

%Now, here's a subtle yet important point to understand: read-only fields in C# are immutable in the sense that you cannot reassign them, but this does **not** mean the 'value' that the read-only field is pointing to cannot change.

However, there's an important downside that we must remember: while read-only fields in C# are immutable in the sense that you cannot reassign them this does **not** mean the 'value' that the read-only field is pointing to cannot change.

Let's use the analogy of jars containing items.
If a jar is marked as read-only and we put a bag of apples in the jar, it only means that we cannot swap the bag of apples for another bag of apples, it doesn't mean that the bag of apples itself cannot change.

The apples in the bag might still, for example, rot over time. This is permissible because we're not replacing the bag with another bag, we're just changing the contents of it.
In programming terms, we could say that the variable (the jar) is constant, but the value it points to (the bag of apples) can still be modified under certain conditions.

%The bag of apples inside the jar will always be the same bag, but the contents of that bag, the apples might change.

%However, exploring these conditions requires understanding more advanced topics such as [reference types and value types](value-and-reference-semantics), which we will delve into in later chapters. For now, the key takeaway is that constants in C# cannot be **reassigned** once they've been initialized, but depending on what they're holding, the content might still change.

Consider the following example:

```{code-cell}
public class Bag
{
    public int NumberOfMarbles { get; set; }
}
```

```{code-cell}
public class Jar
{
    public readonly Bag Bag;

    public Jar(Bag bag)
        => Bag = bag;
}

```

```{code-cell}
// Create a bag with 10 marbles.
Bag bag = new Bag { NumberOfMarbles = 10 };

// Create a jar that contains the bag.
Jar jar = new Jar(bag);
```

```{code-cell}
// Even though Bag is a read-only field, we can change the contents of the bag.
jar.Bag.NumberOfMarbles = 5;
```

In this code, you are creating a `Bag` with `10` marbles and placing it in a `Jar`. Now, even though the `Bag` field in the `Jar` is read-only, you can still change the number of marbles in the bag. You do this by using the line `jar.Bag.NumberOfMarbles = 5;`. The `Bag` field is like the bag of apples in our analogy, and `NumberOfMarbles` represents the contents of the bag. Despite the `Bag` field being read-only, the contents of the bag, i.e., the number of marbles, can still be changed.

The unique flexibility of read-only fields in C# is very useful but also means that we must be careful not to mistake them for constants.

