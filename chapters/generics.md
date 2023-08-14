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

# Generics

Sometimes, the only essential difference between two pieces of repeated code is a data type.
As we've learned, eliminating duplication is a key part of improving the [maintainability](maintainability) of software.
With generics, also known as 'parametric polymorphism', we can eliminate such duplication without giving up [static type safety](type-checking).

```{admonition} Key point
Generics allow us to write code that works with *any* data type while retaining static type safety.
This means we can reuse the same code for different data types, and still let the compiler find [type errors](type-checking).
```

Imagine that you've created a type that behaves like a list.
When you're writing the code for the method that adds items to the list, do you really need to know what type of element you are adding?
Not really, right?
Adding is just a matter of sticking the element into the list.
Similarly, as long as all the elements in the list are of the same type, we can safely extract them.
There is no fundamental difference between the code for a list of strings and the code for a list of integers.

%Generics provide us with a way to write code that is flexible and reusable, which can reduce duplication without sacrificing [static type safety](type-safety).

Let's illustrate this by looking at the very commonly used type `List<T>` class from the .NET framework. Think of this as a modern [array](arrays). We'll talk more about lists and how they compare to arrays in the chapter on [collections](collections).

Here's how we might use a `List<T>` to store integers.
First we create a new list:

```{code-cell}
List<int> numbers = new List<int>();
```

Then we add items to the list using the instance method `Add`.
```{code-cell}
numbers.Add(10);
numbers.Add(20);
numbers.Add(30);
```

Now that we have our items in the list, we can, for example, iterate over the collection and print all the items:

```{code-cell}
foreach (var num in numbers)
    Console.WriteLine(num);
```

In this code, `List<T>` is a [generic type](generic-types), specifically a generic class, and `T` is a type parameter. We'll talk more about this terminology in the next chapter but for now you can think of `T` as a placeholder for a type.

To create a list of integers we replace `T` with `int` by writing `List<int>`.
%We say that `List<T>` is a 'generic type definition', while `List<int>` is a 'constructed generic type'. Both are referred to as a 'generic type'
But what if we wanted a list of strings? Simple, we just replace `T` with `string` and write `List<string>`.

```{code-cell}
List<string> words = new List<string>();

words.Add("Hello");
words.Add("Generic");
words.Add("World");

foreach (var word in words)
    Console.WriteLine(word);
```

%Notice how the rest of our code — creating the list, adding items, and iterating through them — stays exactly the same. We can change the type of data our list holds just by changing the type we put in the angle brackets when we create the list.
%This is what we mean when we say that the same code can be used 'with any type'.

We just plug in the type we want and the generic class `List<T>` works just fine.
In fact, since the type parameter `T` can be replaced with any type we can even nest generic types.
For instance, if we wanted to represent a grid or matrix of integers, we could use a list of lists of integers.

```{code-cell}
List<List<int>> grid;
```

The idea of a generic type is that it is universally polymorphic.
The instance and static members of a generic type can be defined so that one or more types that these members depend on can be replaced by any possible type.

In the code above we made use of the instance method `Add` for example.
The implementation for this method is only written once. Yet that same implementation can be used for any type of object that we might want to put in the list.
This is the power of generics.

```{hint}
- With overloading, we define different implementations for different types.
- With overriding, we define specialized implementations for specialized types.
- With generics, we define *a single implementation for all types*.
```

%Let me say that again, they can be replaced by *any possible type* you can think of.
%We write a single implementation that works for every member of every possible type at the same time.

%This is just a basic example, but the concept applies to much more complex scenarios as well.
%Generics in C# can be used with classes, interfaces, and methods, allowing you to create highly reusable and [type-safe](type-safety) code.

Said differently, the implementation does not depend on the underlying type that we've parameterized over.
The reason we can define a generic list type is that all behavior of this type can be described without having to know anything about the type of objects that it stores in the list.

```{warning}
Can every type be converted into a generic type?
No, some algorithms cannot be expressed **without any knowledge of the underlying type**.
Think about the difference between the act of adding another element to a list (which we've talked about) and some other arbitrary type that requires that we do arithmetic on objects of the contained type, or sorting.
Arithmetic and order is only defined for some types, not all.
For instance, while you can add two numbers, you can't add two `Person` objects.
If you have to make *any* assumptions about the underlying type then your code is *not* parametrically polymorphic.
```

%We've barely scratched the surface of what generics can do, but this introductory glimpse should give you a taste of their power.

In essence, generics allow us to write flexible, reusable code without sacrificing type safety. This means we can reduce duplication and improve the [maintainability](maintainability) of our code.
Generics can be a complex topic, and like many aspects of programming, it is often best learned by doing. As you keep exploring, the concepts will start to become more concrete. Don't worry if it seems overwhelming. Take it step by step and keep practicing.
To grok generics, we must understand a number of topics which will be discussed in the coming chapters.
In the next chapter we'll discuss generic types and type parameters.
%The concepts are all discussed in separate chapters but in this chapter we provide an overview to the topic of generics as such.
%
%1. [Generic type parameters](generic-type-parameters).
%2. [Generic types](generic-types) (classes, interfaces, and structs).
%3. [Generic methods](generic-methods).
%4. [Generic delegates](delegates).
%5. [Type parameter constraints](type-parameter-constraints).
%6. [Variance](variance).

%Generics are a powerful tool in your C# toolbox, allowing for more reusable, efficient, and type-safe code. By understanding and using generics, you'll be able to write better, more maintainable code.
%In the following chapters, we will delve deeper into the world of generics, exploring features like
%[generic type parameters](generic-type-parameters),
%[generic types](generic-types),
%[generic methods](generic-methods),
%[type parameter constraints](type-parameter-constraints),
%and eventually even
%[variance](variance).
%Stay tuned!
%and the principles behind them.




