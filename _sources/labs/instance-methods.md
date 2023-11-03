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

# Lab: Instance methods

## Objective

In this lab, we will enhance our understanding of object oriented programming in C# by refactoring local functions or static methods into instance methods. We will work with a simple library system, focusing on the behaviors of books, to illustrate the power of instance methods and the principle of encapsulation.

## Provided Code

Carefully review the provided code. Notice the static method `describe` which prints details of a `Book` object. This demonstrates a procedural approach that we will transform into a more object oriented pattern by enabling each `Book` to handle its own description.

```{code-cell}
:tags: [remove-output]
class Book
{
    public string Title;
    public string Author;
    public int PageCount;
}
```

```{code-cell}
// Static method
static void describe(Book book)
{
    Console.WriteLine($"'{book.Title}' by {book.Author} ({book.PageCount} pages).");
}
```

```{code-cell}
// Example usage
Book book = new Book();
book.Title = "A Random Walk down Wall Street";
book.Author = "Burton G. Malkiel";
book.PageCount = 432;

// Passing the book to the static method.
describe(book);
```

Here, we have a `Book` class with fields that represent the state of a book in a library. Our objective is to modify this procedural code into object oriented code by using instance methods.

## Instructions

We will now turn the `describe` method into an instance method within the class `Book`.
This will allow any `Book` object to describe itself by accessing its own state.

### Step 1: Convert `describe` to an Instance Method

Redefine the `describe` method to be an instance method. It will not take any parameters, as it should now refer to the internal state of the instance.

```{code-cell}
:tags: [remove-output]
class Book
{
    public string Title;
    public string Author;
    public int PageCount;

    // Instance method to describe book details
    public void Describe()
    {
        // Add the implementation here...
    }
}
```

### Step 2: Update Method Invocation

Change the way you call the `Describe` method so that it is called on an instance of `Book` rather than as a static method.

```{code-cell}
:tags: [remove-input,remove-output]
class Book
{
    public string Title;
    public string Author;
    public int PageCount;

    // Instance method to describe book details
    public void Describe()
    {
        Console.WriteLine($"'{Title}' by {Author} ({PageCount} pages).");
    }
}
```

```{code-cell}
Book book = new Book();
book.Title = "How to Win Friends and Influence People";
book.Author = "Dale Carnegie";
book.PageCount = 320;

book.Describe();
```

```{admonition} 🤔 Reflection
In the transition from a static method to an instance method, consider how the context of `Describe` has changed. Why does the instance method `Describe` not need any parameters? How does this relate to encapsulation?
```

## Challenge

Add an instance method called `ReadPage` to the `Book` class that simulates reading a page by incrementing a field called `CurrentPage` and printing a message that a page has been read.

The `ReadPage` method should:

1. Increase `CurrentPage` by one each time it is called.
2. Not allow `CurrentPage` to exceed the `PageCount`.
3. Print a message each time a page is read, and a different message if there are no more pages to read.

After adding the `ReadPage` method to the `Book` class, create two instances of `Book` in the `Main` method and try reading a few pages of them instance.

```{code-cell}
:tags: [remove-input,remove-output]
class Book
{
    public string Title;
    public string Author;
    public int PageCount;
    public int CurrentPage = 0;

    // Instance method to describe book details
    public void Describe()
    {
        Console.WriteLine($"'{Title}' by {Author} ({PageCount} pages).");
    }

    public void ReadPage()
    {
        if (CurrentPage < PageCount)
        {
            CurrentPage++;
            Console.WriteLine($"Reading page {CurrentPage} of '{Title}'. {PageCount-CurrentPage} remaining.");
        }
        else
        {
            Console.WriteLine($"You have finished reading '{Title}'!");
        }
    }
}
```

```{code-cell}
Book b1 = new Book();
Book b2 = new Book();

// Set attributes of b1.
b1.Title = "Built to sell";
b1.Author = "John Warrillow";
b1.PageCount = 3;

// Set attributes of b2.
// ...

// Read pages of b1.
b1.ReadPage();
b1.ReadPage();
b1.ReadPage();
b1.ReadPage();

// Read pages of b2.
// ...
```

```{admonition} 🤔 Reflection
Does reading pages in `b1` affect anything in `b2`?
```

```{admonition} 🤔 Reflection
Reflect on the implementation of the `ReadPage` method. How does managing state within an instance affect the way we think about the data and behavior of objects in object oriented programming?
```

## Conclusion

```{admonition} 🤔 Reflection
Since all fields in `Book` are `public` we can access these fields on any `Book` object. For example, this means that we can update the `CurrentPage` of a book instance by saying `book.CurrentPage = 12` (if the variable containing a `Book` object is called `book`). Why is this problematic?
```

Excellent work! 🌟



