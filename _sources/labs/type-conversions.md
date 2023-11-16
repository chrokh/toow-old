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

# Lab: Type Conversions

## Objective

In this lab, we will delve into the crucial concept of type conversions in C#. Understanding and effectively using type conversions is essential in object-oriented programming. We'll focus on implicit and explicit conversions for both value types and classes, enhancing our ability to write robust and efficient C# code.

## Provided Code

```{code-cell}
class Animal { }

class Dog : Animal
{
    public double FetchSuccessRate { get; set; }
}

class Cat : Animal
{
    public double WhiskerLength { get; set; }
}
```

```{code-cell}
Dog dog = new Dog();
Animal animal = new Animal();
```

Carefully review the provided code. Notice how we have a base class `Animal` and a derived class `Dog`.

## Instructions

### Step 1: Implicit Conversions of Value Types

Let's start by performing implicit conversions of value types. An implicit conversion doesn't require a cast and doesn't lose information. Convert the integer `number` to a `double` and store it in a new variable.

```{code-cell}
int number = 5;
```

### Step 2: Explicit Conversions of Value Types

Now, let's explore explicit conversions of value types. Convert the double `decimalNumber` below to an `int`. Note that explicit conversions will result in data loss and require a cast. Show this by printing both the `int` value and the `double` value.

```{code-cell}
double decimalNumber = 99.99;
```

### Step 3: Implicit Conversions of Classes (Upcasting)

Next, showcase upcasting by creating an instance of `Dog` and assigning it to a variable of type `Animal`.

```{admonition} 🤔 Reflection
Why is upcasting is always safe and doesn't require explicit casting?
```

### Step 4: Explicit Conversions of Classes (Downcasting)

Finally, let's showcase downcasting. Call the local function `MakeAnimal` below to make an animal of a random subtype. Then downcast that `Animal` to a `Cat`.

```{code-cell}
Random rng = new Random();
Animal MakeAnimal()
    => rng.Next(0, 1) > 0
    ? new Dog() { FetchSuccessRate = rng.Next(0, 100) / 100 }
    : new Cat() { WhiskerLength = rng.Next(0, 7) };
```

```{admonition} 🤔 Reflection
Reflect on the potential risks associated with downcasting. What happens if the object isn't actually an instance of the class we're casting to?
```

### Step 5: Type testing

Call the method `MakeAnimal` 10 times and store the resulting animals in a `List<Animal>` or `Animal[]`. Then iterate over all the `Animal`s and convert them to either `Cat`s or `Dog`s.
If its a `Cat` then you should print its `WhiskerLength`, if its a dog then you shoudl print its `FetchSuccessRate`.

## Challenge

🦉 A wise owl once said: Just because we *can* do something (*ehum* downcasting) doesn't mean that we *should* do it.
Refactor your code so that we achieve the same result as in Step 5 but without using downcasting.

