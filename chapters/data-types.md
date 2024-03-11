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


# Data types

As you dive deeper into the world of coding, you'll find that the values you've learned to store in variables can be quite different from one another. Just as jars can contain marbles, an apple, water or sand, variables in C# can hold various types of data. Each of these types has unique properties, and each has its own name. In programming, we call these different types of data 'data types'.

In your first program, you've already encountered a data type: the `string`. When you wrote `Console.WriteLine("Hello, World!")` you used a data type called `string` that contains a sequence of characters. The text `"Hello, World!"` is a `string`.

C# has many built-in data types and eventually we will learn to build our own. Here are a few key built-in types.
%but for now, we will focus on the most commonly used ones.

- **Integers** (`int`) are used to store whole numbers, without a decimal point. For example, the number of marbles in a jar would be stored as an integer.
- **Booleans** (`bool`) represent truth values, which can be either `true` or `false`. Imagine you have a label on a jar that indicates whether it's full or not - this could be a boolean.
- **Characters** (`char`) are used to store a single character, like `'a'`, `'b'`, `'c'`, etc. Each letter on a label of a jar could be considered a character.
You declare a variable with a specific data type like this:
- **Strings** (`string`) are used for storing sequences of characters, like words or sentences. The label on a jar could be considered a string.
%- **Floating point numbers** (`double` or `decimal`): These are used for numbers with a decimal point. For instance, the weight of a jar could be stored as a floating point number.

Understanding data types in programming is like understanding different categories of things in real life. For instance, there are different categories for vehicles like cars, bikes, trucks, each with their unique characteristics and purposes.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1122848983853842593/chrokh_a_simple_flat_illustration_of_a_pile_of_screws_and_a_pil_c4d2da9b-5c65-422d-b52a-3545417c2027.png?width=2700&height=1180

If you want me to give you a bolt but I give you a nut then I've misunderstood the type of thing that you need. A data type captures the idea that things can be of different types.
```

You declare [variables](variables) with specific data types like this:

```{code-cell}
int numberOfMarbles;
bool isJarFull;
char firstLetterOfLabel;
string label;
```
%float weightOfJar;

And you can assign values to these variables like this:

```{code-cell}
numberOfMarbles = 5;
isJarFull = true;
firstLetterOfLabel = 'A';
string label;
```
%weightOfJar = 1.5f; // The 'f' after the number indicates it's a float

When we're declaring a variable to be of a particular data type, we're telling the compiler that whatever value the variable contains it will be of that type.
A data type defines a set of values that are members of that type, or a 'value space'.

What happens if you try to store the wrong type of value in a variable? Let's say you tried to put the number `5.5` (a non-whole number) in the `numberOfMarbles` variable. The C# compiler would throw an error because `5.5` isn't an integer. It's important to choose the correct data type for the kind of value you want to store.

```{code-cell}
:tags: [raises-exception]
numberOfMarbles = 5.5;
```

Similarly, we cannot store a `string` in a variable of type `int` or `char`.

```{code-cell}
:tags: [raises-exception]
firstLetterOfLabel = "Fruit";
```

We've mentioned the concept of `null` and how it's a value that represents the absence of a value.
For some types, like `string`, `null` is a valid value, and for some, like `int`, it is not.
We will discuss this [later](reference-types) but the difference between these two categories of types in C# is that the former is a 'reference type' and the latter a 'value type'.

This means you can assign `null` to a variable of type `string` like this:

```{code-cell}
string name = null;
```

But you cannot assign `null` to a variable of type `int`:

```{code-cell}
:tags: [raises-exception]
int age = null;
```

%We will discuss this in further detail later, but for now you should now that `null` is a valid value for some types (known as [reference types](reference-types) like `string`.
%%It should be mentioned that this representation of the absence of a value is, in C#, a valid value for all [reference types](reference-types).
%%Null is a special value that represents the absence of a value or a reference to a value. In C#, null is a valid value for any data type that is a reference type. That means you can assign null to a string variable like this:

There are many more data types in C#, and as you progress, you'll encounter and learn to use them. The data type you choose will depend on the kind of data you're dealing with in your code. For now, understanding these basic data types will equip you with the tools to start writing more complex and interactive programs!

In the next chapter, we'll learn about how we can use these different data types together to perform calculations and operations in our programs. This will introduce us to the concept of 'expressions'.



%## Exercises
%
%```{exercise}
%What are literal values, also known as simply literals?
%```
%
%```{exercise}
%We tend to say that data types define two things.
%What are these two things?
%Explain, in your own words, what this means.
%```
%
%```{exercise}
%What do the terms compile-time type and run-time type mean?
%What's the difference between the two?
%```
%
%```{exercise-start}
%```
%Come up with examples of operations that could have the following types:
%```
%string -> string
%int -> int
%int -> string
%string -> int
%```
%```{exercise-end}
%```


