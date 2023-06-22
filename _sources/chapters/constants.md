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

# Constants

When we introduced variables in the previous chapter, we emphasized how flexible they are. They can be assigned a value, then reassigned a different value at any time. This ability to change, or mutability, is part of what makes variables so powerful. But sometimes, this flexibility isn't what we want. In some situations, we want to set a value once and ensure that it never changes. This is where constants come in.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1121469118856577024/chrokh_a_simple_and_flat_illustration_of_a_glass_jar_with_a_pad_a71fd77f-c504-4d4a-8c1b-03aaf88bcfd0.png?width=1268&height=634
A constant is a variable whose value cannot be reassigned, like a jar whose content cannot be replaced.
```

In C#, the keyword `const` is used to declare a constant. A constant is similar to a variable in that it represents a value. However, once a constant is assigned a value, that value cannot be changed. This is why it's called a "constant".

Consider this example:

```{code-cell}
const int HoursInDay = 24;
```

Here, we declare a constant named `HoursInDay` and assign it the value `24`. This value represents the number of hours in a day - a fact that isn't going to change. If we try to assign a new value to `HoursInDay` later in our code, we'll get a compile-time error.

```{code-cell}
:tags: [raises-exception]
HoursInDay = 23;
```

In essence, declaring a value as a constant is like making a promise to the compiler that this value will not change. If you try to break this promise, the compiler won't let you get away with it.

Now, here's a subtle yet important point to understand: constants in C# are immutable, meaning that you cannot change the value of the constant, but this does **not** mean the "value" that the constant is pointing to cannot change.

Let's use the analogy of shelves of jars containing items.
If a jar is marked as a constant and we put a bag of apples in the jar, this only means that we cannot swap the bag of apples for another bag of apples.
If the jar is marked as constant, then we cannot reassign its item.

However, being a constant doesn"t mean that the contents of the bag can't change. The apples in the bag might still rot over time. This is permissible because we're not changing the bag itself, just what's inside it. The bag of apples inside the jar will always be the same bag, but the contents of that bag, the apples might change.

In programming terms, we could say that the variable (the jar) is constant, but the value it points to (the bag of apples) can still be modified under certain conditions. However, exploring these conditions requires understanding more advanced topics such as [reference types and value types](value-and-reference-semantics), which we will delve into in later chapters. For now, the key takeaway is that constants in C# cannot be **reassigned** once they've been initialized, but depending on what they're holding, the content might still change.

And with this understanding of constants, you've taken another step into the realm of C#. The journey continues, so let's move on to the next chapter.

%Understanding when to use variables and when to use constants is a fundamental part of programming. By declaring a value as a constant, you're making your code safer and more expressive. It tells anyone reading your code that this value is a fundamental truth within your program that won't change.

