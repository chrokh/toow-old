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

# Lab: Generic types

## Objective
In this lab exercise, you will utilize generic types to refactor given classes that represent items in a library. This refactoring will allow you to understand and apply the principles of generic programming for creating reusable and type-safe code. The transformation from non-generic to generic code will illustrate the adaptability and maintainability of using generic types in a real-world scenario.

## Provided code
Carefully review the provided code. Notice how `BookItem` and `MagazineItem` share similar structures and functionalities, but they are implemented as separate, distinct classes due to their operation on different types – `Book` and `Magazine`. This design can lead to code duplication, which generics can help eliminate by enabling a single class to operate on different types while maintaining type safety.

```{code-cell}
class Book
{
    public string Title { get; set; }
    public string Author { get; set; }
}

class Magazine
{
    public string Title { get; set; }
    public string Issue { get; set; }
}

class BookItem
{
    public int ID { get; set; }
    public Book Book { get; set; }
    public DateTime AddedToLibrary { get; set; }
    public bool IsCheckedOut { get; set; }
}

class MagazineItem
{
    public int ID { get; set; }
    public Magazine Magazine { get; set; }
    public DateTime AddedToLibrary { get; set; }
    public bool IsCheckedOut { get; set; }
}
```

## Instructions

### Step 1: Analyze the code
Reflect on why having separate `BookItem` and `MagazineItem` classes might be problematic in terms of code redundancy and maintenance.

```{admonition} 🤔 Reflection
How might the use of generic types alleviate the issues identified with the current design?
```

### Step 2: Define a generic class
Create a single generic class `LibraryItem<T>`, where `T` can be any type. Include properties that are common between `BookItem` and `MagazineItem`, such as `ID`, `Item` (of type `T`), `AddedToLibrary`, and `IsCheckedOut`.

### Step 3: Implement a method to display item status

Override the `ToString()` method in `LibraryItem<T>` and return a `string` containing the `ID`, the `AddedToLibrary` date, and whether the book `IsCheckedOut`.

```{admonition} 🤔 Reflection
How does the implementation of this methods in a generic class compare to implementing them in a non-generic class?
How does the addition of new functionality in the generic class illustrate the maintainability and adaptability of generics in software development?
```

```{admonition} 🤔 Reflection
Why is it not possible to access the `Title` of the book or magazine in a library item? How can we also print the information of the book or magazine in the `ToString()` method above?
```

### Step 4: Instantiate and use your generic class

Create instances of `LibraryItem<T>`, using `Book` and `Magazine` as type parameters, and interact with them utilizing the method implemented in Step 3. Reflect on the interactions and the versatility provided by the generic class.

```{code-cell}
:tags: [remove-input]
class LibraryItem<T> { }
```

```{code-cell}
LibraryItem<Book> bookItem = new LibraryItem<Book>( /* .... */ );
LibraryItem<Magazine> magazineItem = new LibraryItem<Magazine>( /* .... */ );
```

## Challenge

Experiment by creating more classes representing other items that you might find in a library like `BoardGame`, `EReader`, and `Tablet`. Then show that you can instantiate `LibraryItem<T>` with these new types. Reflect on the reusability of the generic class with different type parameters.

