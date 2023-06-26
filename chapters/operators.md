# Operators

```{warning}
Work in progress.
```

%- Arithmetic

(string-concatenation)=
%- Concatenation
%- Equality
%  - Value equality vs Reference equality
%- Order
%- Null coalescing (`??`, `??=`)
%- Remainder operator (check for even odd e.g.)
%- `*=`, etc.
%- Right or left associativity
%- Assignment


%## Assignment operator
%In this section we've said that the *variable* goes on the left-hand side while the *value* goes on the right.
%In truth, the right-hand side can actually be any {doc}`expression<expressions>` that evaluates to a value.
%It just so happens that the simplest expression is a value.
%
%We can also assign multiple variables the same expression by simply chaining the variables with an assignment operator (`=`) and then putting the expression in the end.
%
%```csharp
%x1 = x2 = x3 = 100;
%```
%
%At first glance you might think that this is some special syntax.
%However, this is merely a consequence of the fact that (1) assignment is an expression that evaluates to the value of the association and that (2) the assignment expression is right-associative.
%
%We can easily show that assignment expressions evaluates to the value they are assigning by simply printing an assignment expression.
%In the statement below we are printing the result of assigning the value `9` to the variable `x`.
%As expected, the output will be `9`.
%
%```csharp
%Console.WriteLine(x = 9);
%```
%
%```csharp
%9
%```
%
%Right-associative means that we evaluate what's on the right-hand side before we move to the left.
%This is should be more clear if we explicitly write out the parentheses.
%
%```csharp
%(x1 = (x2 = (x3 = 100)));
%```
%
%In the statement above, `x3` is first assigned the value `100`.
%This expression evaluates to the number `100` since this is what was assigned.
%`x2` is then assigned the value `100` and as an expression it evaluates to the number `100` too.
%Finally `x1` is then assigned the value `100`.
%
%Since assignment is just an expression, this means that we can assign anywhere in an expression.
%I would not recommend doing this but it's quite interesting to think about.
%Think about what the following code will generate, and then try it.
%
%```csharp
%int x1 = 1;
%int x2 = 2;
%int x3 = (x1 = x2) + (x2 = 3);
%
%Console.WriteLine(x1);
%Console.WriteLine(x2);
%Console.WriteLine(x3);
%```



%%#### Operators (from old data types chapter)
%
%Let's take operators as an example.
%In this chapter we have used values in arithmetic and logical expressions.
%More specifically we've seen that the type `int` supports the arithmetic addition (`+`) and multiplication (` * `) operators.
%We've also seen that the type `bool` supports the logical or-operator known as logical disjunction (`||`).
%
%This means that the data type `int` supports arithmetic addition and multiplication, while `bool` supports logical disjunction.
%Of course, these types support lots of other operations but let's talk about these.
%
%This is what we mean when we say that a data type supports an operation.
%We can call the operation and the operation somehow acts upon values of the type.
%
%(type-signatures)=
%What about this idea that an operation itself can have a type?
%Well, the type of arithmetic addition could be written as:
%
%```
%(+) :: (int, int) -> int
%```
%
%```{warning}
%This is not C# syntax.
%It is however a fairly common language-agnostic syntax for reasoning about types.
%% TODO: Reintroduce below?
%%When we are defining type signatures like this, we are using a language-agnostic syntax which is also used by popular standards such as e.g. the [Fantasy Land Specification](https://github.com/fantasyland/fantasy-land).
%%We'll talk more about this syntax in the chapter on [type signatures](type-signatures).
%%
%%In actual C# code we use what's known as [method signatures](static-methods).
%%Type signatures are however expressed at a higher level of abstraction, and thus ought to be easier to read and understand, which is why I prefer to use them in this book.
%%You'll find a comparison between type signatures and method signatures in the chapter on [type signatures](type-signatures).
%```
%
%Let's take an even simpler example.
%Assume that we've defined an operation called `inc` that takes integers as input and gives us an integer as output.
%If we pass it `1` we get `2`, if we pass it `2` we get `3`, and so forth.
%We would say that the type of this operation is:
%
%```
%inc :: int -> int
%```
%
%Since this operation takes a single input argument, we can visualize it as a function that maps from the set of integers to the set of integers.
%%See {numref}`fig:inc-type`.
%
%%% TODO: Add figure.
%%```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%%:name: fig:inc-type
%%
%%Visualization of the type of integer incrementation.
%%```
%
%We could also visualize the type of arithmetic addition, but since it takes two integers as input we would have to draw it as a a mapping between the set of ordered integer pairs to the set of integers.
%%See {numref}`fig:addition-type`.
%
%%% TODO: Add figure.
%%```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%%:name: fig:addition-type
%%
%%Visualization of the type of arithmetic addition.
%%```
%
%We would read this as `+` is an operator that when given an `int` and an `int` returns an `int`.
%Of course the arithmetic addition operator is not only defined for whole numbers (integers) but also for `float`, `decimal`, and so forth but let's keep it simple for now.
%Interestingly the addition operator is also defined for strings to implement something known as "string concatenation" but more on this in the chapter on [operators](operators).
%
%%The type signature of the logical disjunction operator (`||`) could be written as:
%%
%%```
%%(||) :: (bool, bool) -> bool
%%```
%%
%%We would read this as `||` is an operator that when given a `bool` and a `bool` returns a `bool`.
%%
%%So what if we try using a logical operator on values of type `int` or an arithmetic operator on values of type `bool`.
%%Meaning what if we try to use an operation in a way that doesn't correspond to its type signature.
%%Let's try adding to values of type `bool` together.
%%
%%```{code-cell}
%%:tags: [raises-exception]
%%bool addedBools = true + true;
%%```
%%
%As you might have suspected not all types support all operations.
%The type `bool`, for example, usually does not support the arithmetic addition operation.
%Checking for this kind of errors is known as type checking and we'll talk about it in the chapter on [type-checking](type-checking).
%
%````{warning}
%When we only consider an operations type signature then we know nothing about the underlying implementation.
%Note how for example how addition, multiplication, subtraction, and division all have the same type signature albeit different names.
%
%```
%(+) :: (int, int) -> int
%(-) :: (int, int) -> int
%(*) :: (int, int) -> int
%(/) :: (int, int) -> int
%```
%````
%
%But we'll talk a lot more about operations in future chapters after we have more skin in the game so let's move on for tnow.



%Since assignment is not equivalence and since we can change the value of variables we can even do bizarre things like incrementing a variable by itself.
%Consider, for example, the statement:
%
%```csharp
%x = x + 1;
%```
%
%In this case we're assigning a value to the variable `x`.
%The value is equal to whatever value `x` contained before, but incremented with one.
%In mathematics it would mean that we are trying to define a variable in terms of itself.
%That is self-referential and makes no sense.
%
%$$
%x = x + 1
%$$
%
%But when we're dealing with imperative assignment, it is entirely fine for a variable to refer to itself as long as it's been assigned a value.
%
%```csharp
%int z;                 // Declare the variable.
%z = 1;                 // Assign it the value 1.
%z = z + 1;             // Increment the variable by 1.
%Console.WriteLine(z);  // Print the variable.
%```
%
%```output
%2
%```
%
%Changing the value of a numeric variable based on the value of itself is in fact such a common operation that there's a special syntax for it.
%If we want to increment the value of the numeric variable `x` by one then we can simply use the increment operator (`++`):
%
%```csharp
%z++
%```
