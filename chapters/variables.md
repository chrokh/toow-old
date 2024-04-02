# Variables

Imagine that you've got a kitchen cabinet full of glass or porcelain jars and lots of different items to store. To keep track of the contents you put labels on the jars. In the world of programming, these jars are what we call variables. The label on the jar is the variable name, and the item you put inside the jar is the value.

%https://media.discordapp.net/attachments/1118630713084870736/1121439818338013265/chrokh_a_simple_illustration_of_shelves_of_empty_glass_jars_wit_46908a36-f040-4513-b34c-3c89703ad3c1.png?width=2700&height=1350
%https://media.discordapp.net/attachments/1118630713084870736/1121472410584092702/chrokh_a_simple_flat_illustration_of_shelves_of_porcelain_jars__f303109d-6ee7-41bf-9180-5d9218673600.png?width=1268&height=634
%https://media.discordapp.net/attachments/1118630713084870736/1121470779016622120/chrokh_a_simple_and_flat_illustration_of_shelves_of_labeled_and_8428a6d2-39bb-4e29-9a7b-b965b132ec19.png?width=1268&height=634
%https://media.discordapp.net/attachments/1118630713084870736/1121472404103897118/chrokh_a_simple_flat_illustration_of_shelves_of_porcelain_jars__e97554fc-8fa0-40cc-91d8-0d0d21e25e78.png?width=1268&height=634
```{figure} ../images/cover-variables.jpg
A variable is like a jar, a variable name like a label, and a value its content.
```

Declaring a variable is like adding an empty jar with a label to the shelf. In C#, you declare a variable by stating its type (more on [types](data-types) later) and name. For example, the line `int myNumber;` declares a variable named `myNumber` of type `int`. This is like adding a jar and slapping a 'myNumber' label on it. The `int` tells us what kind of items can be stored in this jar – in this case, integer numbers - meaning whole numbers.

```csharp
// Declaring a variable with a type and a name.
// Putting a new jar on the shelf and labling it.
int myNumber;
```

When you have your labeled jar ready, you can put something in it. This is called assignment. For instance, if you write `myNumber = 10;` you're assigning the value `10` to the variable `myNumber`. This is like putting an item into your labeled jar. The item here is the number `10`.

```csharp
// Assigning a value to a variable.
// Putting some contents into the jar.
myNumber = 10;
```

Often, you'll want to declare a variable and assign a value to it at the same time. This is known as initialization. If you write int `myNumber = 10;` you're declaring a variable and initializing it with a value in one go. This is like getting a new container, labeling it, and putting an item in it right away.

```csharp
// Initializing a variable.
// Putting a new jar on the shelf, labling it, and adding some contents all in one go.
int myNumber = 10;
```

One important thing to note is the difference between an undeclared variable and an uninitialized one. An undeclared variable is like a container without a label – the program doesn't know it exists. An uninitialized variable, on the other hand, is a labeled container that doesn't have anything in it yet. It exists, but it's empty.

If a variable called `yourNumber` is undeclared and you try to use it then you will get the following error:

```output
The name 'yourNumber' does not exist in the current context (CS0103)
```

If the variable is unassigned then you will instead get the following error:

```output
Use of unassigned local variable 'yourNumber'
```


Now, what makes variables particularly interesting in programming is that in some languages (such as C#) their values can change, or in other words, they are 'variable'. This is why they're called variables! Think back to our shelf of jars analogy. Just because you put one item in a jar, it doesn't mean that it has to stay there forever. You can take out the value, put it in another jar or throw it away, and then put a new item in the jar. The same goes for variables in programming.

Take this line of code, for example: `myNumber = 20;`. If we have previously assigned myNumber a value of `10`, this new line doesn't cause an error. Instead, it simply changes the value stored in `myNumber` from `10` to `20`. We say that the variable `myNumber` is mutable, meaning it can be changed.

This leads us to an important point about the equal sign (`=`) in programming. Unlike in mathematics, where it denotes equality, in programming, it denotes assignment. It's more like an arrow pointing from the right to the left, indicating the direction of assignment. So, when you see `myNumber = 20;` you should read it as "myNumber gets the value of 20", rather than "myNumber equals 20". The value on the right is assigned to the variable on the left. This distinction is essential to correctly understanding and using variables in programming.

```{tip}
We often talk about the "left-hand side" and "right-hand side" so it is wise to become accustomed to this terminology.
```

You've learned about declaring, assigning, and initializing variables.
You've learned the difference between an undeclared and an uninitialized variable.
Finally, you've learned about the meaning of the equal sign in programming and about the mutable nature of variables. With these foundations, we're now ready to you're ready to delve deeper into C# programming in the following chapters. Happy coding!


%We can declare multiple variables of the same type on the same line by separating their names with commas.
%To declare the three integer variables `x1`, `x2`, and `x3` we would say:
%
%```csharp
%int x1, x2, x3;
%```
%
%This is known as "multiple declarations" and all variables are left uninitialized.

%If your alarm bells are going off and your thinking that this whole mutation business sounds quite dangerous then you're in good company.
%Mutation is, tongue in cheek, sometimes called the "root of all evil".
%Mutation is one reason that some professionals (myself included) have given up hope on object oriented programming in favor of functional programming.

