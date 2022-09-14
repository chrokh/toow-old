(instance-methods)=
# Instance methods

```{warning}
Work in progress.
```

%- Overloading
%- Signatures.
%- Void is a return type.
%- Recursion.
%- Late binding, Dynamic binding? Michaelis (2020)
%- Usually verbs. Or implied verbs as discussed in procedures.
%- String manipulation
%  - Substring
%  - IndexOf
%- Expression bodied members (uses the => operator but are not lambda expressions).

% IMPORTANT: Rewrite the old implementation of RobbersLanguage that used a long or-statement to determine if something is a vowel or not. Now we can use `IndexOf` to check if the vowel is in a string of vowels.


We've talked about the type `string`.
The type `string` defines many operations but one operation that we call using dot notation is `Contains`.
The instance method `Contains` accepts an argument of type `string` and returns a boolean that represents whether the `string` instance contains the `string` passed as an argument anywhere.

```csharp
"Hello world".Contains("hello")
```

```output
False
```

To call an instance method, we write the name of a reference to an object or use a literal, add a dot after it, and then write the name of the method we wish to invoke.
We'll talk more about methods later, but we can pass arguments to methods similar to how [mathematical functions](functions) are defined in terms of their arguments.
These arguments can also either be references to objects or literals.
The program below would render the same result as the one above.

```csharp
string message = "Hello world";
string keyword = "hello";
string result  = message.Contains(keyword);

Console.WriteLine(result);
```

Let's look a slightly more complicated example.
In some of the examples in this chapter we called the method `GetType` on values of type `string`, `int`, and `double`.
This means that the these types support the operation `GetType` and that this method is called using dot notation.

```csharp
"A".GetType();
420.GetType();
3.14.GetType();
```

The method `GetType` is an instance method.
It is defined on the class `Object` and called upon instances of it, meaning on objects of that type.
We'll talk more about the built in types in C# in the chapter on [type hierarchies](type-hierarchies) and about [classes](classes) and [objects](objects) later.
What to understand now however is that `GetType` is an operation that we can call on objects of type `string` because all strings can be treated as if they are of type `Object` and since the method is defined as an instance method on that class.

