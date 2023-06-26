# Associativity

In addition to [precedence](precedence), operators have another property called 'associativity', which comes into play when operators with the same precedence appear in an expression.
Associativity is the order in which operators of the same precedence are processed.

- Left-associative operators are evaluated from left to right.
- Right-associative operators are evaluated from right to left.

Almost all operators in C# are left-associative, meaning that operations are performed from left to right. For example, the expression `5 - 3 - 1` yields `1` and not `3`. Because subtraction is left-associative, the expression is computed as `(5 - 3) - 1` and not `5 - (3 - 1)`.

However, there are some operators in C# that are right-associative, that is, they group from right to left. A notable example is the assignment operator `=`. In an expression like `a = b = 5`, the operation proceeds from right to left, i.e., `a = (b = 5)`. Here, `b` is first assigned the value `5`, and then `a` is assigned the value of `b`, which is now `5`. So, both `a` and `b` end up with the value `5`.

Understanding precedence and associativity is crucial to understanding how expressions involving multiple operators are evaluated in C#. As a developer, it allows you to write and read code more accurately.


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

