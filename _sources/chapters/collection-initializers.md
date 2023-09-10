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

# Collection initializers

After delving into the world of generic collections, you might be wondering if there's a more concise way to populate collections right at the time of their declaration. Well, C# offers just that with collection initializers. This feature saves you the need for multiple `Add` calls and makes your code cleaner and easier to understand.

```{admonition} Key point
Collection initializers provide a shorthand for populating collections like `List<T>` and `Dictionary<TKey, TValue>` at the time of their instantiation. They improve code readability and reduce the lines of code needed for setup.
```

Collection initializers work like [object initializers](object-initializers), but instead of setting properties on a single object, they allow you to add multiple elements to a collection.
You've actually already seen collection initializers in action in the chapter on [arrays](arrays).


## What are collection initializers?

In C#, collection initializers are a [syntactic sugar](syntactic-sugar) that allows you to initialize collections with predefined elements in a single, concise statement.

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1150400143410086018/chrokh_crate_with_books_illustration_408211c6-b863-43f0-b71b-9cc3e2a6b475.png
Much like dumping a bunch of books in a crate in one go, collection initializers allow you to populate collections, like lists and dictionaries, with multiple elements in a single line of code.
```

## Syntax of collection initializers

The general syntax for collection initializers involves declaring a new collection and immediately filling it with elements inside curly braces `{}`.

For lists, the syntax is straightforward:

```{code-cell}
// Using a collection initializer to create a list of integers.
var numbers = new List<int> { 1, 2, 3, 4 };
```

The code above is equivalent to the code below.

```{code-cell}
// Creating an empty list of integers.
var numbers = new List<int>();

// Adding elements to the list one by one.
numbers.Add(1);
numbers.Add(2);
numbers.Add(3);
numbers.Add(4);
```

For dictionaries, the syntax involves key-value pairs:

```{code-cell}
// Using a collection initializer to create a dictionary.
var personInfo = new Dictionary<string, string>
{
    { "Name", "Alice" },
    { "Email", "alice@email.com" }
};
```

The following code is equivalent to the code above.

```{code-cell}
// Creating an empty dictionary.
var personInfo = new Dictionary<string, string>();

// Adding key-value pairs to the dictionary one by one.
personInfo.Add("Name", "Alice");
personInfo.Add("Email", "alice@email.com");
```

```{warning}
You can use collection initializers only when creating a collection. To add more elements later, you must use the `Add` method or other appropriate methods.
```

```{note}
The term 'collection initializers' is somewhat misleading because it's not limited to [collections](collections) but can be used for any [enumerable](enumerable) with an `Add` method.
We'll talk more about [enumerables](enumerables) in a later chapter but at this point we should mention that all collections are enumerables.
```

You can also use collection initializers with your own [collections](collections) or [enumerables](enumerables) (that have an `Add` method).


## Conclusion

Collection initializers are a handy feature that lets you initialize collections like lists and dictionaries in a simple and readable manner. They don't replace methods like `Add` but offer a more concise way to populate a collection upon its creation.
Collection initializers can improve readability and [maintainability](maintainability).

```{important}
Use collection initializers judiciously. While they are convenient for small collections, for large or dynamically populated collections, using methods like `Add` may be more appropriate.
```

