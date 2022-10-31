# Variables

%- [Initialized to default value](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/variables)

A variable is a symbolic name that points to a, possibly changing, value.
More concretely a variable is a symbolic name for a location in memory.
Upon compilation, all variable names are replaced by their memory locations.
Variables in programming are similar to but not equivalent to variables in mathematics.

To declare and initialize a variable called `x` and assign it the value `3` in C# we would say:

```csharp
var x = 3;
```

To declare and initialize a variable called `person` and assign it the value `"Chris"` we would say:

```csharp
var person = "Chris";
```

We'll discuss what declaring and initializing means in this chapter.
In a coming chapter we will talk about {doc}`data-types`, and there we will learn to explicitly state the data type of our variables.
For now however we'll use the keyword `var` to declare variables.
This means that the data type of our variable is inferred using what's known as {doc}`type-inference`.
In other words, it means that the compiler "figures out" what data type our variable must have without us having to type it.
More on this in a separate chapter.

Notice how in the examples above `x` and `person` are the symbolic names of the variables, while `3` and `"Chris"` are the values that we assign to them.
The symbolic names `x` and `person` are thus pointing to memory locations and in these memory locations we have stored the values `3` and `"Chris"` respectively.

When using variables, there are three important concepts that we must master: declaration, assignment, and initialization.
Let's first discuss these one by one and then move on to the more advanced concepts of mutability and constants.


## Declaration

When we create a variable we say that we "declare" it.
Declaring a variable is as simple as stating the {doc}`data type<data-types>` (more on types later) of the variable followed by the symbolic name that we want to use to refer to the variable.

```csharp
String author;
int numberOfApples;
```

Note that we can declare variables without assigning them a value.
Variables that have been declared but haven't yet been assigned a value are known as "uninitialized".
If we compile a program that tries to use an uninitialized variable we'll get a compilation error that says "use of unassigned variable".

```csharp
Console.WriteLine(numberOfApples);
```

```output
Use of unassigned local variable 'numberOfApples'.
```

% TODO: Write about the kinds of variables there are in C#? Too much technical detail? https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/variables#928-local-variables

```{note}
The kind of variables that we're looking at in this chapter are, in C#, known as "local variables".
Local variables are "initially unassigned" 
They can be defined in a [block](blocks), a [foreach](iteration) statement, or a [catch](exceptions) clause.
Other kinds of variables are [static variables](static-variables) and [instance variables](fields) (instance fields).
We'll talk more about all these things later.
```

Note that "uninitialized" is *not* the same as "undeclared".

```csharp
Console.WriteLine(nonExistantVariable);
```

```output
The name 'nonExistant' does not exist in the current context.
```

We can declare multiple variables of the same type on the same line by separating their names with commas.
To declare the three integer variables `x1`, `x2`, and `x3` we would say:

```csharp
int x1, x2, x3;
```

This is known as "multiple declarations" and all variables are left uninitialized.


```{exercise}
Declare and initialize variables with the names, types, and values listed in the table below.
Show at least two different ways of doing this.

| Name        | Data type | Value        |
| :--         | :--       | :--          |
| `message`   | `String`  | `"Hello"`    |
| `role`      | `String`  | `"CUSTOMER"` |
| `count`     | `int`     | `"42"`       |
| `available` | `Boolean` | `true`       |
```

```{note}
At this point you might be wondering why all data types we've seen up to this point starts with a capital letter except for `int`.
This is because `int` is an alias for the type `Int32`.
Aliases are defined for more basic types sych as `string`, `bool`, `double`, and so forth.
More on aliases in the chapters on [data types](data-types) and [namespaces](namespaces).

You can find a table of more aliases [in the documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types).
The aliases are, [according to the documentation](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/), preferred since we don't have to explicitly include the namespace `System` to have access to them.
```



## Assignment

When we assign a value to a variable we refer to this as assignment.
We use the equals sign (`=`) to perform assignment.
The variable should be on the left-hand side of the equals symbol and the value should be on the right-hand side.

```csharp
x = 3;
```

```{tip}
We often talk about the "left-hand side" and "right-hand side" so it is wise to become accustomed to what this means.
```

Note that the equals sign (`=`) in imperative programming, is *not* used to mean mathematical equivalence but assignment.
Imperative is the name of the programming paradigm that object oriented programming belong to.
More on this in the chapter on {doc}`paradigms`.

Some languages, such as R, uses a less than sign and a dash which together looks like an arrow pointing to the left (`<-`) for assignment.
This is not valid C# syntax but it is useful to think of assignment as an arrow to the left rather than an equals sign.
Assignment takes the value on the *right* and stores it (or a {doc}`reference<value-and-reference-semantics>` to it, but more on this later) in memory so that we can access it using the symbolic name on the *left*.

```R
x <- 3
```

In mathematics, if we say that $x=3$ then it is possible to *replace* $x$ with $3$.
The two are *the same thing at all times*.
This is known as {doc}`referential transparency<purity>` and is something we'll touch on in a future chapter.
Variables in imperative languages, including object oriented languages, are not referentially transparent.
So assignment does not behave like mathematical equivalence.

So what does assignment mean and how is it different from equivalence?
Remember how variables point to a memory location and how we store values in that memory location?
Well, in a mutable language the contents of that memory location can change.
In C# it is entirely valid to say that `y = 1` and then immediately change it to `2`.

```csharp
int y = 1;
y = 2;
```

The program is of course quite pointless and we might just as well have assigned it the number `2` from the start.
Nevertheless, the program will compile and run.
However, it also means that we cannot ever be sure that just because we initialized a variable to `1` it will stay that way.

In mathematics this would not make any sense.
Either $x$ is equal to $1$ *or* it is equal to $2$.
In mathematics we don't change the contents of a variable.

$$
x = 1\\
x = 2
$$

We'll talk a bit more about the {doc}`imperative programming paradigm<paradigms>` later but for now we should realize that in the imperative paradigm, we execute our programs line by line and that future lines may *change* what was said in previous lines.
But in mathematics (and in the functional paradigm), we state what is true without order of execution.
This mathematical way of thinking where there is no order of execution is reflected in the declarative paradigm where you will find functional and logic programming.
Don't worry if this isn't entirely clear, we'll get back to it in the chapter on {doc}`paradigms`.

Since assignment is not equivalence and since we can change the value of variables we can even do bizarre things like incrementing a variable by itself.
Consider, for example, the statement:

```csharp
x = x + 1;
```

In this case we're assigning a value to the variable `x`.
The value is equal to whatever value `x` contained before, but incremented with one.
In mathematics it would mean that we are trying to define a variable in terms of itself.
That is self-referential and makes no sense.

$$
x = x + 1
$$

But when we're dealing with imperative assignment, it is entirely fine for a variable to refer to itself as long as it's been assigned a value.

```csharp
int z;                 // Declare the variable.
z = 1;                 // Assign it the value 1.
z = z + 1;             // Increment the variable by 1.
Console.WriteLine(z);  // Print the variable.
```

```output
2
```

Changing the value of a numeric variable based on the value of itself is in fact such a common operation that there's a special syntax for it.
If we want to increment the value of the numeric variable `x` by one then we can simply use the increment operator (`++`):

```csharp
z++
```

We'll see more such operations in the chapter on {doc}`operators`.

In this section we've said that the *variable* goes on the left-hand side while the *value* goes on the right.
In truth, the right-hand side can actually be any {doc}`expression<expressions>` that evaluates to a value.
It just so happens that the simplest expression is a value.

We can also assign multiple variables the same expression by simply chaining the variables with an assignment operator (`=`) and then putting the expression in the end.

```csharp
x1 = x2 = x3 = 100;
```

At first glance you might think that this is some special syntax.
However, this is merely a consequence of the fact that (1) assignment is an expression that evaluates to the value of the association and that (2) the assignment expression is right-associative.

We can easily show that assignment expressions evaluates to the value they are assigning by simply printing an assignment expression.
In the statement below we are printing the result of assigning the value `9` to the variable `x`.
As expected, the output will be `9`.

```csharp
Console.WriteLine(x = 9);
```

```csharp
9
```

Right-associative means that we evaluate what's on the right-hand side before we move to the left.
This is should be more clear if we explicitly write out the parentheses.

```csharp
(x1 = (x2 = (x3 = 100)));
```

In the statement above, `x3` is first assigned the value `100`.
This expression evaluates to the number `100` since this is what was assigned.
`x2` is then assigned the value `100` and as an expression it evaluates to the number `100` too.
Finally `x1` is then assigned the value `100`.

Since assignment is just an expression, this means that we can assign anywhere in an expression.
I would not recommend doing this but it's quite interesting to think about.
Think about what the following code will generate, and then try it.

```csharp
int x1 = 1;
int x2 = 2;
int x3 = (x1 = x2) + (x2 = 3);

Console.WriteLine(x1);
Console.WriteLine(x2);
Console.WriteLine(x3);
```

````{admonition} Answer
:class: tip dropdown
```output
2
3
5
```
````





## Initialization

When we create a variable and immediately assign it a value, we say that we declare and "initialize" the variable.
Let's rewrite our previous variable declarations so that we not only declare but also initialize our variables.

```csharp
int numberOfCats = 2;
String author = "Chris";
```

If we initialize the variable immediately upon declaration then we can use the `var` keyword to infer the type.
The variables would still have the same types, we just don't have to state the type explicitly.

```csharp
var numberOfHats = 2;
var friend = "Chris";
```

If we don't initialize the variable we cannot use `var`, since the compiler cannot determine what type we were intending to store in the type.
If we try, then we get a compilation error.

```csharp
var numberOfBats;
```

```output
Implicitly-typed variables must be initialized.
```

We can initialize multiple variables of the same type on the same line by separating their names with commas and assigning their respective values as we go.
To declare the three integer variables `z1`, `z2`, and `z3` and assign them them the values `100`, `200`, and `300` respectively, we would say:

```csharp
int z1 = 100, z2 = 200, z3 = 100;
```

Of course we could break this up into multiple lines.

```csharp
int z1 = 100,
    z2 = 200,
    z3 = 100;
```

But I would be inclined to argue that simply initializing all variables separately would be easier to read.

```csharp
int z1 = 100;
int z2 = 200;
int z3 = 100;
```


(constants)=
## Constants

In C#, variables are, as we've seen, unless otherwise specified, *not* constants.
In other words, the value that they point to can be changed.
However, constants do exist in C#.

To declare a constant we simply prefix the variable declaration with the keyword `const`.
Contrary to variables, constants cannot be changed.
If we declare a constant called `numberOfDogs`, store the number `101`, and then, on the next line, try to reassign the value to `102` we will get a compilation error.

```csharp
const int numberOfDogs = 101;
numberOfDogs = 102;
```

```output
The left-hand side of an assignment must be a variable, property or indexer.
```

Notice how the error message suggests that if the left-hand side of our statement was a variable it would have been fine.
This means that if we had not prepended our declaration with `const` the program would have compiled.

Something to bear in mind is that constants must be initialized when they are declared.
This means that if we try to merely say:

```csharp
const int numberOfFrogs;
```

then we will get a compilation error stating that:

```output
A const field requires a value to be provided.
```

One final, yet important, thing to bear in mind when dealing with constants is that even though the value cannot be reassigned, there's nothing stopping the value of the variable to mutate.
We will talk about {doc}`mutation<mutability>` in a separate chapter but what we mean is that some values can be changed without reassignment.

You can think of this as the difference between changing the name of a person vs choosing a new person.
In the former case, it is the person itself who is mutating (meaning changing), whereas in the latter it is us who is talking about the person who is changing.
Constants only guard against us changing not against others being changed.

If your alarm bells are going off and your thinking that this whole mutation business sounds quite dangerous then you're in good company.
Mutation is, tongue in cheek, sometimes called the "root of all evil".
Mutation is one reason that some professionals (myself included) have given up hope on object oriented programming in favor of functional programming.

More on mutation later.
But for now, be aware that you cannot depend on the value of a constant remaining constant.

```{warning}
You cannot depend on the value of a constant remaining constant.
Constants only prohibit reassignment.
The value of the constant may still mutate.
```

```{exercise}
Declare and initialize three constants of your choice.
```


%```{epigraph} TODO
%Writing is nature’s way of  letting you know how sloppy your thinking is.
%Math is nature’s way of  letting you know how sloppy your writing is.
%[Programming] is nature’s way of  letting you know how sloppy your math is.
%
%--Leslie Lamport {cite:p}`todo`, but I have changed the phrase "formal mathematics" for "programming".
%```

