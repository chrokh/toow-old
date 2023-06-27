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

# Type inference

As we venture deeper into the world of C#, there's a handy tool we need to discuss: the `var` keyword. This allows us to declare a variable without having to *explicitly* state its type. This is known as "type inference".

With type inference, the compiler determines the type of the variable at compile-time based on the type of its value. Let's look at a few examples:

```{code-cell}
var numberOfMarbles = 5;  // int
var label = "Cherries";   // string
var isJarFull = true;     // bool
```

In these lines of code, we're not explicitly stating the type of each variable. Instead, we're using the var keyword.
In C#, these variables are called 'implicitly typed local variables'.
Once the code is compiled, `numberOfMarbles` becomes an `int`, `label` is understood to be a `string`, and `isJarFull` is a `bool`.

%https://media.discordapp.net/attachments/1118630713084870736/1123165648953032824/chrokh_an_illustration_of_a_native_american_a_crystal_ball_and__8b16fb50-9dca-4c63-b7ae-500de7985c3a.png?width=2700&height=1180
%https://media.discordapp.net/attachments/1118630713084870736/1123171212596613120/chrokh_a_flat_illustration_of_a_native_american_summoning_and_a_ae949676-cd5d-4609-8100-27c4bc5a9799.png?width=2700&height=1180
```{figure} https://media.discordapp.net/attachments/1118630713084870736/1123175050258952283/chrokh_a_flat_illustration_of_a_native_american_chief_looking_i_ff5ca62e-ada5-4aec-adad-e0361447aa3f.png?width=2700&height=1180

By using the `var` keyword we instruct the compiler to infer the type of the variable from the expression on the right-hand side of the initialization statement.
```

The `var` keyword can make your code cleaner and easier to read, particularly when dealing with complex types. But remember, the variable must be initialized at the time of declaration when using `var`, and the assigned value should not be `null`. This is because the compiler needs to infer the type from the assigned value. For example, this will not compile:

```{code-cell}
:tags: [raises-exception]
var something;
```

Also, once a value is assigned to a variable declared with `var`, the variable's type cannot be changed. It still has a type, albeit implicitly. If you try to assign a value of a different type later, you'll receive a compile-time error:

```{code-cell}
:tags: [raises-exception]
var numberOfMarbles = 5; // int
numberOfMarbles = "Five";
```

Here, because `numberOfMarbles` is inferred to be of type `int` at the time of its initialization, it cannot then be assigned a `string`.

The `var` keyword gives you a way to let the compiler do the work of figuring out the types of your variables for you. It's a powerful tool in your C# toolbox, enabling cleaner and more streamlined code. In the upcoming chapters, we will encounter scenarios where `var` proves particularly beneficial in enhancing code readability and maintainability.

