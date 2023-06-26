# Type inference

%In the chapter on [variables](variables) we showed how you can declare and initialize a variable by either explicitly stating the data type of the variable or by using the keyword `var` to let the compiler infer the type.
%Compare the following two statements.
%
%```{code-cell}
%int explicitly = 1;
%var implicitly = 2;
%```
%
%In the declaration of the first variable, which we called `explicitly`, we explicitly state that the data type of the variable is `int`.
%In the declaration of the second variable, which we called `implicitly`, we use the `var` keyword to let the compiler *infer* the data type.
%Both variables will be of type `int`.
%Or actually, they will both be of the type `Int32` since, as you might remember, `int` is just an alias for the type `Int32`.
%
%```{code-cell}
%Console.WriteLine( explicitly.GetType() );
%```
%```{code-cell}
%Console.WriteLine( implicitly.GetType() );
%```
%
%Notice how the word `System` and a dot (`.`) is prefixed before the data type when it's printed.
%This is because the data type in question is defined in the "namespace" called `System`.
%More on this in the chapter on [Namespaces](namespaces).
%
%The `GetType()` method is really quite useful when we're learning C# since we can ask any object what it's run-time type is.
%Since all expressions evaluate to objects we can also wrap any expression in parenthases and then ask it what it's type is.
%
%```{code-cell}
%Console.WriteLine( (10 + 10 * 200).GetType() );
%```
%```{code-cell}
%Console.WriteLine( (true || false).GetType() );
%```
%
