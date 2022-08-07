(static-methods)=
# Static methods (procedures)

- Subroutine on Wikipedia
- Static methods in C\#
- Method signature
- Parameters/arguments
- Return type and value
  - In mathematics we say that a function "maps" a certain argument to a certain value, or in other words, a certain input to a certain output. In the imperative programming paradigm however we say that a method "returns" a value. When we define a method we must define what it's, so called, "return type" is. Meaning what the data type is of the values that it returns when we call it.
In mathematics we say that a function "maps" a certain argument to a certain value, or in other words, a certain input to a certain output.
In the imperative programming paradigm however we say that a method "returns" a value 
- Verbs or implicit verbs where Name would usually get or set name.
- Void (a return type)
- Implement solutions for:
  - River crossing problem [{numref}`Chapter %s<algorithms>`].
  - Towers of Hanoi [{numref}`Chapter %s<algorithms>`].
- Parameterization
- Documentation comments.
- Types of methods
  - `WriteLine : String -> void`
  - Refer back to [type-checking](type-checking) chapter.
  - Show compiler errors when:
    - calling non-existant method.
    - calling with wrong number of arguments.
    - calling with incorrect type of arguments.
    - using returned value as wrong type.
- Is string interpolation syntactic sugar for `String.Format`?
- Exercises
  - Write a method that greets a name that you pass.
  - Write a method that computes the hypothenuse.
  - Write a method that converts a `string?` to a `string`. Tie back to the nullable discussion in the chapter on [data types](data-types).

---

#### Static methods

We have however also already seen a *static* method.
The method `WriteLine` is a static method that's defined on the static class `Console`.
It is therefore called directly upon references to the class, not on instances of the class.
We'll talk more about [static classes](static-classes) and [static methods](static-methods) in separate chapters so don't worry too much if your head has started to spin.
For now however, I just wanted us to quickly think about this method that we've already used a lot in terms of types.

The method `WriteLine` is called by stating the class name `Console`, adding a dot, the static method name `WriteLine`, and then enclosing whatever argument we wish to print in parentheses.

```csharp
Console.WriteLine("Hello world");
Console.WriteLine(1);
Console.WriteLine(true);
```

Remember how we in the chapter on [mathematical functions](functions) said that we can use set theory to reason about functions?
Functions map input to output and both static and instance methods are like functions with the important exception that they are also allowed to "mutate" the world.
We'll talk more about mutation in the chapter on [mutability](mutability) but what we mean is that methods are not only allowed to return some particular output given some particular input but they are also allowed to change things.

The method `WriteLine` is a good example of mutation since it maps all input to a single output value called `void`.
This output value is special as you are not allowed to pass around instances of the type.
The type `void` is used when we want to say that a method does not evaluate to any value no matter how we call it.
In the case of `WriteLine` this makes sense since we're not looking to get a value back but rather to have something printed to screen.
We call this a "side effect".
When we're calling `WriteLine` we're looking for the side effect of having whatever we pass it printed to the screen.

In terms of set theory, you can think of the type `void` as the empty set.
In theory, there are no elements of type `void`.
Consequently you couldn't possible store a reference to something of type `void` in a variable.

```{seealso}
%Whether there exists a single value of type `void` or no values (meaning whether `void` is a singleton set or an empty set) is a theoretical question.
This is way beyond the scope of this book, but due to the fact that you can declare pointers of type `void` the case could be made that `void` is a singleton set.
If you're keen to learn more about this, see the page on [Pointer types](https://docs.microsoft.com/en-ca/dotnet/csharp/language-reference/unsafe-code#pointer-types) in the documentation.
```

```{admonition} TODO
- Multiple input types to WriteLine due to overloads.
- Console can also be thought of as defining a type with only a single member. Static means that there's only one member.
- Sets and functions. Not elegant due to mutation. Still mention it though. It is still valid, but it might also mutate things beyond the in and out. Use bool negation operation (`!`) since it's unary.
- Methods can have parameters and thus arity. More on this later.
- Operators can be unary or nullary.
```



