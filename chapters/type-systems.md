# Type systems

C# is a statically and nominally typed language with manifested types.
In this chapter we'll talk about what that means.
A type system lets us assign a type to each, so called, term, in a program.
In C#, all [variables](variables), [constants](constants), [expressions that return values](expressions), and methods have a type.

A language with types is said to have a type system and type systems can be classified in a number of dimensions that we'll discuss in this chapter.

- A type system is either [statically or dynamically typed](static-vs-dynamic). This is also simply known as static or dynamic and refers to whether type-checking occurs at compile-time or at run-time.
- Types in a typed language are either [manifested or inferred](manifested-vs-inferred). This regards whether types are explicitly stated in the code by the programmer or whether the types are automatically inferred by the type-checker. You can think of the latter case as the compiler figuring out whatever types must have been used where.
- Types in a typed language are either [nominal, structural, or duck typed](nominal-vs-structural). This refers to whether types are distinguished from one another by means of their names, their structure, or their usage.

% https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/types/


(type-safety)=
(static-vs-dynamic)=
## Static vs dynamic

Whether a language is statically typed or dynamically typed dictates whether [type-checking](type-checking) occurs at [compile-time](compilation) or at [run-time](execution).
Colloquially we refer to this as the language being static or dynamic.

Hopefully you can recall how we, in the chapter on [errors](errors) discussed that compile-time errors ought to be preferred over run-time errors since they guarantee that anytime we see a compile-time error we are saved from all errors that could occur as a consequence of this but at run-time, meaning when the application is running.

By the same token, static typing ought to be preferred over dynamic typing since it gives us type-safety at compile-time instead of at run-time.
Meaning that anytime we get a type error at compile-time we are saved from all other errors that could occur as a consequence of this but at run-time, meaning when the application is running.

% WRONG: I WAS THINKING OF COMPILED VS INTERPRETED.
%Colloquially, we tend to say that the language is either static or dynamic when in fact we should say that the [compiler](compilation) or [interpreter](interpretation) is one or the other.
%We cannot confidently predict whether a language is treated statically or dynamically by just looking at the language itself.
%In practice however, most compilers and interpreters for most languages are all either static or dynamic which leads to us referring to the languages themselves as one or the other.
%The official C# compiler employs static typing and hence C# is usually referred to as a statically typed language.

```{exercise}
What is the difference between statically typed and dynamically typed languages?
```

Some statically typed languages, such as C#, does however provide ways of leaving the realm of static typing at your request.
In C# we have the special type `dynamic` which can hold any run-time type.

```csharp
dynamic v1 = 1;
dynamic v2 = "hello";
dynamic v3 = true;
```

Like in some dynamically typed languages, the value does however still have a run-time type.
Check out the code example below where we check the types of the `dynamic` variables declared above.

```csharp
Console.WriteLine( v1.GetType() );
Console.WriteLine( v2.GetType() );
Console.WriteLine( v3.GetType() );
```

```output
System.Int32
System.String
System.Boolean
```

Using the keyword `dynamic` consequently doesn't mean that we move from a world of multiple types into a world of no types at all.
It means that we move to a uni-typed world where there is only a single compile-time type, namely the type `dynamic`.

% TODO: https://medium.com/@samth/on-typed-untyped-and-uni-typed-languages-8a3b4bedf68c
% TODO: https://chetan.medium.com/duck-typing-in-ruby-212a25b90cec

The compiler assumes that values given the compile-time type `dynamic` supports any operation.
This means that all operations will be allowed at compile-time.
If we invoke an operation that does in fact also exist in the run-time type, the program will compile and run.

```csharp
dynamic x1 = 1;
dynamic x2 = 1;
Console.WriteLine(x1 + x2);
```

```result
2
```

If however we invoke an operation that does *not* exist in the run-time type we then the program will still compile but it will crash with an exception at run-time.
We can get a run-time error if we call a method that doesn't exist:

```csharp
dynamic z = 1;
z.FlyToTheMoon();
```

```output
Unhandled exception. Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: 'int' does not contain a definition for 'FlyToTheMoon'
```

But we can also get a run-time error if we use a value with an operator that isn't supported:

```csharp
dynamic y1 = 1;
dynamic y2 = true;

int result = y1 + y2;
```

```output
Unhandled exception. Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: Operator '+' cannot be applied to operands of type 'int' and 'bool'
```



(manifested-vs-inferred)=
## Manifested vs inferred

Whether a type system uses manifested or inferred types dictates whether we, as programmers, have to explicitly state the types in our programs or whether they are inferred by the compiler.

Very few languages are fully inferred.
Instead, languages are usually only inferred to a certain extent, beyond which you still have to manifest the types since the type inference engine is unable to infer them.
This is a consequence of the sophistication of both the type system and the inference engine.

C# is traditionally a language with manifested types but we can declare, what's known as, "implicitly typed local variables" which have inferred types.
We declare such variables by using the keyword `var` instead of the type of the variable in question.

In the example below, the type of the first variable is manifested while the type of the second variable is inferred.
The compile-time type of both is `int`.

```csharp
int i1 = 1; // Explicitly typed (manifested)
var i2 = 1; // Implicitly typed (inferred)
```

It is important to realize that type inference *infers* types.
Type inference does *not* mean that we completely ignore neither compile-time nor run-time types.
The two compile-time types in the example above are just as "strong".
The fact that one of the types is inferred while the other is manifested is irrelevant.

In the last section, where we discussed static and dynamic, we said that in C# we can use the keyword `dynamic` to bypass static typing.
When using the `dynamic` keyword we make the compile-time type `dynamic`.
But, when using the `var` keyword, we use type inference and let the compiler figure out what compile-time type must be used to make the program compile.
This is not the same thing.

When is it useful to use type inference instead of manifesting types in C#?
One use case it to avoid cluttering up our code with the names of very long type names.
We haven't talked about these types but say you're trying to modeling a chess board as a list of lists of positions.
A list of lists is sometimes also called a two-dimensional lists and is commonly used to represent a grid.

When declaring such a variable we specify the compile-time type on the left and then assign it a value with a run-time type on the right.
If we manifest the type it would look something like this:

```csharp
List<List<Position>> board1 = new List<List<Position>>>();
```

However, since the compile-time type is the same as the run-time type, or in other words, since the type on the left is the same as the type on the right this is a prime use case for type inference.
By using an implicitly typed local variable on the left our code is significantly less cluttered and arguably easier to read.

```csharp
var board2 = new List<List<Piece>>>();
```

The compile-time type of both variables is still the same since this is type inference, not dynamic typing.
The keyword `var` is often also used in [`foreach` loops](iteration) which we will learn about later.

It should be noted that in the example above, the usage of an implicitly typed local variable (`var`) is optional.
However, when you have a value with an [anonymous type](anonymous-types), using `var` is required.
We'll talk more about anonymous types in its own chapter, but for now I just wanted to mention that when you deal with anonymous types, you might have to use `var`.

```{seealso}
See the [official documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/var) for more information about implicitly typed local variables (the keyword `var`).
```

```{exercise}
What is the difference between manifested types and inferred types?
What does this difference mean in terms of compile-time and run-time types?
```

```{exercise}
Can a language be statically typed yet still have mostly inferred types? Why?
```


(nominal-vs-structural)=
## Nominal vs structural

% TODO: http://wiki.c2.com/?NominativeAndStructuralTyping
% TODO: https://medium.com/higher-order-functions/duck-typing-vs-structural-typing-vs-nominal-typing-e0881860bf10
% TODO: - P. 252, section 19.3 of Types and Programming Languages. Bejamin Pierce.

The third dimension in which we can classify a type system is in whether its types are nominal or structural.
Whether the type system is nominative or structural.
Again, many languages are mixes of the two but it's easier to understand the concepts if we look at the extremes.
C# is mostly a nominally typed language but "anonymous types" (see [documentation](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/types/anonymous-types)) are arguably structurally typed.

The key question we're dealing with when we're dealing with nominal and structural typing is substitutability.
Can a particular type be used in a particular place?
More specifically we tend to talk about equivalence and subtyping.
Equivalence regards whether two types are equal while subtyping regards whether one type is a subtype of another.
We have yet to talk about [subtype polymorphism](subtype-polymorphism) so this is a bit too much too soon but think of it this way:
To determine whether a particular type can be used in a particular place we must either prove that the type of the value that we have is equivalent to the type that is expected, or we must prove that the type of the value that we have is a subtype of the type that is expected.

With nominal types, equivalence and subtyping is determined by means of names.
With structural types, equivalence and subtyping is determined by means of structure.

Every nominal type has a name and it is this name that we use to determine equivalence.
If we declare that a type is a subtype of another type then we declare that one name is a subtype of another name.
Hence, we can use the names and subtype information to determine whether a nominal type is a subtype of another nominal type.

Structural types on the other hand don't need names since equivalence and subtyping is determined on the basis of structure.
If the type we need must have some properties, then we simply check whether these properties exist in the type that we have.
If the properties are present then the type that we have is deemed equivalent to the type that we need, and hence can be used.
If the properties are present but the type also has additional properties then it is considered a subtype.

In a structural typing system, a type can be equal to and be a subtype of many other types simultaneously.
In nominal typing two types are only ever equal if they are the same type and they are only ever in a subtype relationship if said relationship has been explicitly defined.

However, as an aside, in nominally typed languages it is usually not possible to let a type be a subtype of another if the type is not also "wider" than the subtype.
Consequently, nominal subtypes are also usually structural subtypes.

%Theoretically, the concept of nominal types can be thought of as a subset of the idea of structural types.
%Any two nominal types that are in an equivalence or subtype relationship is also structurally equivalent.

```{exercise}
What is the difference between a nominative and a structural type system?
```


## Duck typing

Before we leave this chapter we must also talk about something known as duck typing.
Some argue that duck typing is another point on the dimension where we find structural and nominal typing.
Others hold that duck typing is a special case of structural typing.

The name "duck typing" refers to the saying:

```{epigraph}
If it quacks like a duck, it must be a duck.
```

In duck typing, the idea is that it doesn't matter what something "is", it only matters what it "does".
Contrast this to structural typing.
Structural typing determines suitability of a type based on the full structure of the type.
But duck typing determines suitability of a type based on the properties used at run-time.

If we ask something whether it can quack and it can, then it doesn't really matter if it's a duck or not.
For our intents and purposes it behaves like a duck so let's just keep using it like one.

Duck typing is usually employed in dynamic languages such as for example Ruby and JavaScript.
We're not diving into Ruby or JavaScript in this book but here's an example in Ruby.

```ruby
class Duck
  def quack
    puts "Quack"
  end
end

class Robot
  def quack
    puts "Brrr"
  end
end

def test duck
  duck.quack
end

test Duck.new
test Robot.new
```

```output
Quack
Brrr
```

In the example above we're defining two types called `Duck` and `Robot`.
We're defining a method called `test` which takes an argument and calls the method `quack` on that argument.
We're then instantiating one duck and one robot and pass both of them to the `test` method.
Since both objects respond to the `quack` method we conclude that both are ducks.
There is no point in arguing about whether robots are not ducks.
For all intents and purposes they behave like ducks.

When you've read the chapter on [interfaces](interfaces) I highly recommend that you come back to this chapter again and think about the relationship between duck types and interfaces.

```{exercise}
What is duck typing? How does it relate to structural typing?
```

```{exercise}
What is the following maxim trying to convey?
"If it quacks like a duck, it must be a duck."
```



