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

# Enumeration types

Picture this: You're programming a traffic light system. You have three colors to work with: red, yellow, and green. How would you represent these in your code? You could use integers, where `0` is red, `1` is yellow, and `2` is green. Or you could use strings, like `"red"`,`"yellow"`, `"green"`.

Both approaches would work, but they're not particularly intuitive or safe. Someone reading your code might not immediately understand what the numbers or strings represent.
Said differently, the set of possible values of `string` or `int` is not the same as that of a traffic light.
The value `"apple"` is for example a valid `string` but not a valid traffic light state.
This is where enums, short for enumerations or enumeration types, come into play in C#.

An enumeration is a distinct type that consists of a set of named constants. It provides a way to define a type that can have one of a few distinct values, and those values can have names that are meaningful to your code.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1123518082258829362/chrokh_a_simple_flat_illustration_of_a_highway_intersection_4b97cc26-a9e4-401c-a8ff-cd9b9317cd75.png?width=2700&height=1180

A traffic light whose states we can enumerate (red, yellow, green) is a splendid example of when enumeration types are useful.
```

Here's how you could define an enumeration for our traffic light colors:

```{code-cell}
enum TrafficLightColor
{
    Red,
    Yellow,
    Green
}
```

In this example, `TrafficLightColor` is an enumeration that has three possible values: `Red`, `Yellow`, and `Green`.

Now, you can define a variable of type `TrafficLightColor`, and assign it one of the values:

```{code-cell}
TrafficLightColor currentColor = TrafficLightColor.Red;
```

This makes your code more readable because it's clear what values `currentColor` can have. More importantly, it makes your code more safe, because you someone cannot accidentally assign an invalid value to `currentColor`.

```{code-cell}
:tags: [raises-exception]
currentColor = TrafficLightColor.Orange;
```

By default, the underlying type of an enumeration is `int`, and the constants are assigned values starting from `0` and increasing by `1` for each item. In our example, `Red` would have a value of `0`, `Yellow` a value of `1`, and `Green` a value of `2`. You can explicitly specify the underlying type and values for the constants when defining the enumeration if you want:

```{code-cell}
enum TrafficLightColor : byte
{
    Red = 1,
    Yellow = 2,
    Green = 3
}
```

In this case, `Red` would have a value of `1`, `Yellow` a value of `2`, and `Green` a value of `3`, and the underlying type of the enumeration is `byte`.

Enumerations enhance the readability, safety, and organization of your code. They're especially useful when a variable can only take one out of a small set of possible values.
There are plenty of cases where enums are useful, but some obvious ones include weekdays and months.

By the way, you've now created your first custom [data type](data-types). You're on a roll, let's keep going.

