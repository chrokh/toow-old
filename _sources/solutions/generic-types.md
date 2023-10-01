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

# Solution: Generic types

## Step 2: Define a generic class

```{code-cell}
public class LibraryItem<T>
{
    public int ID { get; set; }
    public T Item { get; set; }
    public DateTime AddedToLibrary { get; set; }
    public bool IsCheckedOut { get; set; }
}
```

## Step 3: Implement a method to display item status (part 1)

```{code-cell}
public class LibraryItem<T>
{
    public int ID { get; set; }
    public T Item { get; set; }
    public DateTime AddedToLibrary { get; set; }
    public bool IsCheckedOut { get; set; }

    public override string ToString()
        => $"ID: {ID}, AddedToLibrary: {AddedToLibrary}, IsCheckedOut: {IsCheckedOut}";
}
```

## Step 3: Implement a method to display item status (part 2)

```{code-cell}
public class Book
{
    public string Title { get; set; }
    public string Author { get; set; }

    public override string ToString()
        => $"{Title} by {Author}";
}
```

```{code-cell}
public class Magazine
{
    public string Title { get; set; }
    public string Issue { get; set; }

    public override string ToString()
        => $"{Title}, Issue {Issue}";
}
```

```{code-cell}
public class LibraryItem<T>
{
    public int ID { get; set; }
    public T Item { get; set; }
    public DateTime AddedToLibrary { get; set; }
    public bool IsCheckedOut { get; set; }

    public override string ToString()
        => $"ID: {ID}, Item: {Item}, AddedToLibrary: {AddedToLibrary}, IsCheckedOut: {IsCheckedOut}";
}
```

## Step 4: Instantiate and use your generic class

```{code-cell}
Book someBook = new Book { Title = "1984", Author = "George Orwell" };
Magazine someMagazine = new Magazine { Title = "Science Daily", Issue = "101" };

LibraryItem<Book> bookItem1 = new LibraryItem<Book>
{
    ID = 1,
    Item = someBook,
    AddedToLibrary = DateTime.Now.AddDays(-10),
    IsCheckedOut = false
};

LibraryItem<Book> bookItem2 = new LibraryItem<Book>
{
    ID = 2,
    Item = someBook,
    AddedToLibrary = DateTime.Now.AddDays(-5),
    IsCheckedOut = true
};

LibraryItem<Magazine> magazineItem1 = new LibraryItem<Magazine>
{
    ID = 3,
    Item = someMagazine,
    AddedToLibrary = DateTime.Now.AddDays(-7),
    IsCheckedOut = false
};

LibraryItem<Magazine> magazineItem2 = new LibraryItem<Magazine>
{
    ID = 4,
    Item = someMagazine,
    AddedToLibrary = DateTime.Now,
    IsCheckedOut = true
};

Console.WriteLine(bookItem1.ToString());
Console.WriteLine(bookItem2.ToString());
Console.WriteLine(magazineItem1.ToString());
Console.WriteLine(magazineItem2.ToString());

```

## Challenge: Create more classes representing other items

```{code-cell}
public class BoardGame
{
    public string Title { get; set; }
    public int Players { get; set; }
}
```

```{code-cell}
public class EReader
{
    public string Brand { get; set; }
    public string Model { get; set; }
}
```

```{code-cell}
public class Tablet
{
    public string Brand { get; set; }
    public string Model { get; set; }
}
```

 Instantiating `LibraryItem<T>` with these new types.

```{code-cell}
BoardGame chess = new BoardGame { Title = "Chess", Players = 2 };
EReader paperwhite = new EReader { Brand = "Amazon", Model = "Kindle Paperwhite" };
Tablet ipadPro = new Tablet { Brand = "Apple", Model = "iPad Air" };

LibraryItem<BoardGame> boardGameItem1 = new LibraryItem<BoardGame>
{
    ID = 5,
    Item = chess,
    AddedToLibrary = DateTime.Now.AddDays(-15),
    IsCheckedOut = true
};

LibraryItem<BoardGame> boardGameItem2 = new LibraryItem<BoardGame>
{
    ID = 6,
    Item = chess,
    AddedToLibrary = DateTime.Now.AddDays(-3),
    IsCheckedOut = false
};

LibraryItem<EReader> eReaderItem1 = new LibraryItem<EReader>
{
    ID = 7,
    Item = paperwhite,
    AddedToLibrary = DateTime.Now.AddDays(-1),
    IsCheckedOut = true
};

LibraryItem<EReader> eReaderItem2 = new LibraryItem<EReader>
{
    ID = 8,
    Item = paperwhite,
    AddedToLibrary = DateTime.Now,
    IsCheckedOut = false
};

LibraryItem<Tablet> tabletItem1 = new LibraryItem<Tablet>
{
    ID = 9,
    Item = ipadPro,
    AddedToLibrary = DateTime.Now.AddDays(-20),
    IsCheckedOut = false
};

LibraryItem<Tablet> tabletItem2 = new LibraryItem<Tablet>
{
    ID = 10,
    Item = ipadPro,
    AddedToLibrary = DateTime.Now.AddDays(-2),
    IsCheckedOut = true
};

Console.WriteLine(boardGameItem1.ToString());
Console.WriteLine(boardGameItem2.ToString());
Console.WriteLine(eReaderItem1.ToString());
Console.WriteLine(eReaderItem2.ToString());
Console.WriteLine(tabletItem1.ToString());
Console.WriteLine(tabletItem2.ToString());
```

