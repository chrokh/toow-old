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

# Values

Programming, at its heart, is about manipulating data. In the world of programming, we often use the term "values" to refer to these pieces of data. A value could be a number, a piece of text, a true or false statement, and many other things.

In C#, when we write a number like 5, a piece of text like `"Hello, World!"`, or a Boolean value like `true` or `false`, we're writing a value. You can think of values as the raw material that our programs work with. The values we write in our programs are called "literals" because their meaning is literally what we write.

%https://media.discordapp.net/attachments/1118630713084870736/1121423141487525949/chrokh_A_symmetic_grid_of_simple_and_flat_illustrations_of_gems_af9a58bd-30e1-4645-849a-71e58b506dfb.png?width=2700&height=1350
```{figure} https://media.discordapp.net/attachments/1118630713084870736/1121423479594557452/chrokh_A_symmetic_grid_of_simple_and_flat_illustrations_of_gems_857f5065-72e5-4975-9cf5-7e7bd1eef6fe.png?width=2700&height=1350
```

In addition to numbers, text, and Boolean values, there's another kind of value that we need to talk about: `null`. This value represents the absence of a value. It's a way of saying "nothing" or "no value." Here's a fun fact: the inventor of `null`, Tony Hoare, has referred to it as his "billion-dollar mistake" because of the numerous errors and crashes it has caused in programs over the years. That said, `null` is a concept we have to live with in many programming languages, including C#, and therefore it's crucial to understand.

```{code-cell} csharp
Console.WriteLine(5);
Console.WriteLine("Hello, World!");
Console.WriteLine(true);
```

In the code above, `5`, `"Hello, World!"`, and `true` are all literal values. The `Console.WriteLine` method prints the value we give it to the console.

It's also worth noting that every value has a type, which determines what kind of data it represents and what operations can be performed on it. We'll dive deeper into [data types](data-types) in a later chapter. For now, just remember that values are the fundamental pieces of data that our programs manipulate.

In the next chapter, we'll take a step forward and learn about "variables", which allow us to store and manipulate these values in more complex ways. Until then, keep exploring!

