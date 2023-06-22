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
