# Generics

Remember how we said that there are at least [four types of polymorphism](subtype-polymorphism)?
In object oriented programming subtype polymorphism is the really big one, but in hybrid languages such as C# parametric polymorphism is really important and frequently used.
In C# parametric polymorphism is implemented through the concept known as "generics".

For a basic understanding of generics / parametric polymorphism we must understand the topics listed below.
The concepts are all discussed in separate chapters but in this chapter we provide an overview to the topic of generics as such.

1. [Generic type parameters](generic-type-parameters).
2. [Generic types](generic-types) (classes, interfaces, and structs).
3. [Generic methods](generic-methods).
4. [Generic delegates](delegates).
5. [Type parameter constraints](type-parameter-constraints).
6. [Variance](variance).


## Motivation

When writing object oriented programs, you will often be struck with the feeling that you are repeating yourself.
Up to this point we've pretended that all duplication can be eliminated with subtype polymorphism.
As you might have suspected, this is of course not true.

Think of the case of `CompositeCipher` and `CompositeCharCipher` that we ended up with in the chapter on [abstract dependency injection](abstract-dependency-injection).
Both these classes are dependency injected with different types of ciphers as input.
The implementation of these two classes is virtually the same.

```csharp
class CompositeCipher : ICipher
{
  ICipher cipher1, cipher2;

  public CompositeCipher (ICipher cipher1, ICipher cipher2)
  {
    this.cipher1 = cipher1;
    this.cipher2 = cipher2;
  }

  public string Encode (string input)
    => cipher2.Encode(cipher1.Encode(input));
}

class CompositeCharCipher : ICharCipher
{
  ICharCipher cipher1, cipher2;

  public CompositeCharCipher (ICharCipher cipher1, ICharCipher cipher2)
  {
    this.cipher1 = cipher1;
    this.cipher2 = cipher2;
  }

  public char Encode (char input)
    => cipher2.Encode(cipher1.Encode(input));
}
```

How should we go about removing this duplication?

The classes `CompositeCipher` and `CompositeCharCipher` are fundamentally not in a subtyping relationship because `ICipher` and `ICharCipher` are fundamentally not subtypes.
We've already learned that C# classes supports [covariant return types](variance) but not contravariant parameter types.
Even if C# would support contravariant parameter types and even if variance would be supported in interfaces `ICipher` and `ICharCipher` are still not in a subtyping relationship.
Even if `string` and `char` would be in a suptyping relationship (which they are not) where `char` would be a subtype (think: specialization) of `string` (which makes more sense than the other way around) `ICipher` and `ICharCipher` would still not be in a subtyping relationship.

Why?
Well, because if `ICharCipher` is a subtype of `ICipher` then the *input type* of the `Encode` method must be *covariant* since the subtype `ICharCipher` returns a `char` which then is a specialization/subtype of `string`.
But covariant input is not allowed according to the [Liskov Substitution Principle](liskov-substitution-principle).
Ok, so let's flip it?
Well, if `ICipher` is a subtype of `ICharCipher` then the return type, the *output type* must be contravariant since the subtype `ICipher` returns a `string` which is a generalization/supertype of `char`.
So, in this scenario, subtyping simply doesn't help us eliminate duplication without solving the problem in a completely different way.

Could we use method overloading instead?
Sure, we could have a single interface that defines two encoding methods.
One for `string` and one for `char`.

```csharp
interface ICipher
{
  string Encode (string input);
  char Encode (char input);
}
```

This solves the problem of having two types, but it doesn't solve the problem of eliminating the duplicated code of the `Encode` method in the composite ciphers.
Have a look at the code below.

```csharp
class CompositeCipher : ICipher
{
  ICipher cipher1, cipher2;

  public CompositeCipher (ICipher cipher1, ICipher cipher2)
  {
    this.cipher1 = cipher1;
    this.cipher2 = cipher2;
  }

  public string Encode (string input)
    => cipher2.Encode(cipher1.Encode(input));

  public char Encode (char input)
    => cipher2.Encode(cipher1.Encode(input));
}
```

Without being able to treat `char` based ciphers and `string` based ciphers uniformly there's simply no way to get rid of that duplicated code.

But why would we care about a single duplicated line you might say?
Well, this is merely an example.
If there's one duplicated line, that's a sign that there are many more possible things that could be duplicated.
How about, for example the `ArrayCipher` that we wrote in {numref}`ex:array-cipher`?
That was a cipher that took an array of ciphers as input and then applied them one by one.
In that exercise, `ArrayCipher` dealt with `string` based ciphers, but if we would write an implementation for `char` based ciphers it would be exactly the same.
The only difference between the two would be the types.

Notice a pattern?

```{tip}
If the implementation is the same, but the types are different, then you're probably looking at a scenario where we could use parametric polymorphism.
```

Enter parametric polymorphism.
In the following chapters we will instead replace our interfaces `ICipher` and `ICharCipher` with a single generic interface, called `ICipher<T>`.
This allows us to eliminate further duplication, not only in the interfaces, but also by implementing a single `CompositeCipher<T>` that works for input and outputs of both type `string` and type `char`.

As we shall see, parametric polymorphism not only help us eliminate duplicated code, but also spreads like a virus.
The good kind of virus.
By turning a non-generic type into a generic type it is often possible that things that use this new generic type can too be converted from non-generic to generic types.
And so the meme permeates throughout our code-base.
Generic types increase the [maintainability](maintainability) of our code since they (at least) increase modularity and modularity.

Another important aspect is that of [static type safety](type-checking).
Most things that we do with generics can trivially be achieved in dynamically typed languages, or even in C# by using the [`dynamic` keyword](type-systems) or by simply treating things as the top-type object.
The fact that all types in C# inherit from object is something that we'll discuss in further detail in the chapter on [type hierarchies](type-hierarchies).
Both of these strategies involves [downcasting](object-type-conversions) which may cause [run-time errors](errors).
A major reason for using a language like C# in the first place is the ability to use static typing to avoid run-time errors.
Generics help us write reusable code without loosing static type safety.


## Definition

The word "parametric", in "parametric polymorphism", was presumably chosen since parametrically polymorphic types are *parameterized* over types.
The name "generics" was presumably selected since the use of parametric polymorphism is also known as "generic programming".
Which terminology is used mostly depend on the tradition of the language that we are using and in C# we tend to say "generics" rather than "parametric polymorphism".

%Similarly, in C# we talk about "generic types" and "generic methods" while we in some other languages refer to these as

The idea of a generic type is that it is universally polymorphic.
The instance and static members of a generic type can be defined so that one or more types that these members depend on can be replaced by any possible type.
We can write the implementation of every member for every possible type at the same time.
Said differently, the implementation does not depend on the underlying type that we've parameterized over.

```{hint}
With overloading, we define different implementations for different types.
With generics, we define *a single implementation for all types*.
```

%## Generic types

So, what is a generic type?
The term "generic type" refers to both the "generic type definition" and a "*constructed* generic type".
The former is a type with type parameters that must be replaced with actual types.
The latter is a type that has had its type parameters replaced with actual types.

%In some languages, such as e.g. Haskell, we would not refer to this as a type but a "type constructor".
%In C# we usually call this a generic type but I think the phrase "type constructor" really is quite useful for understanding what we are dealing with.
%A type constructor is not a type.
%It is a constructor, and when you apply it to some types you it constructs a new type.
%%We don't tend to use the terminology "type constructor" in C# but I think it is a quite useful analogy.

```{important}
A generic type definition is not a complete type.
To construct a type we must replace its *type parameters* with actual types in order to form a *constructed generic type*.
```

Think of it this way: A generic type depends on some other type or types, but what these types are is not known at the time you write the implementation of your generic type.
So, instead you parameterize your generic type with some "type parameters".
Whenever someone wishes to use your generic type definition they must replace the type parameters in the generic type definition with actual types so that we get, what is called, a *generic constructed type* or simply a *constructed type*.

% TODO: List<T> on the left and arrows to a bunch of constructions on the right, such as List<int>, List<string>, List<List<Cat>>. Text: Generic type definition on the left and Constructed generic type on the right.
```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:generic-type-definition

A "generic type definition" can be turned into any number of "constructed generic types" by replacing its type parameters with actual types.
```

It is important to realize that all type parameters must be replaced with actual types at compile-time rather than at run-time.
In terms of using the term "polymorphism" we ought to classify this as "static" rather than "dynamic" polymorphism.
With subtype polymorphism, it is possible to defer the decision of which implementation to use at run-time.
With parametric polymorphism, which implementation to use has to be known at compile-time.
Still, it is tremendously useful when it comes to writing reusable and modular code without ever having to give up static typing.

```{admonition} Aside
:class: seealso
If you happen to be familiar with logic quantifiers then we should emphasize that a generic type is a *universally quantified* type.
This is why we say that the type is *universally* polymorphic.
```

Before we wrap this section up, let's finish up with some terminology directly from the [official documentation](https://learn.microsoft.com/en-us/dotnet/standard/generics/):

- *Generic type parameters* (or simply type parameters) are placeholders for types in a generic type definition or generic method definition.
- A *generic type definition* is a class, struct, or an interface declaration with type parameters. It is like a template rather than a complete type definition. An example is `List<T>`.
- A *constructed generic type* is the result of replacing the type parameters in a generic type definition with actual types. An example is: `List<int>`.
- A *generic type* is either a generic type definition or a constructed generic type.
- A *generic method definition* is a method which before its formal parameter list (for values), also contains a list of generic type parameters. Type parameters can be used as the return type or as the type of formal arguments. An example is: `List<T> Repeat<T> (T value, int times)`. The `<T>` in the method name (`Repeat<T>`) is the type parameter.
- A *generic type argument* is whatever type is used to replace a type parameter with an actual type. Just like how an argument is used in place of a parameter when applying methods, a generic type argument is used in place of a generic type parameter.
- The *variance* of generic type parameters determine whether more or less derived type can be used when some constructed generic type is expected. Variance can only be specified for type parameters in generic interfaces.
- *Constraints* on generic type parameters limit the types that can be used as type arguments. You might for example declare that a type parameter must be replaced with an argument that is not null, or that is a `class` (as opposed to a `struct` for example).



## Examples

The most common use-case for generics is collections.
Think about a list for example.
When you're implementing a method that adds items to the list, do you really need to know what type of element you are adding?
Not really, right?
Adding is just a matter of sticking the element into the list.
As long as the type of all elements in the list is the same, and as long as all instances of any list type have the same type, we're fine.

% TODO: Give example of a bunch of lists. Numbers, Strings, red colored dots, blue colored dots.
```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:generic-list

As long as all elements in the list have the same type it doesn't matter what the type is.
None of these lists have the same type, but these types can all be constructed from the generic list type.
```

Let's take a simpler example.
How about the notion of a pair.
This is sometimes also known as a "tuple".
A pair is simply a collection of two elements.
Let's refer to these elements as the `First` element and the `Second` element.
The type of `First` might be the same as the type of `Second` or it might not.
But if we define a data type for a pair then the type of `First` must be the same for every instance of the pair type.
Same for `Second`.

%```csharp
%class Pair<T>
%{
%  public T First { get; set; }
%  public T Second { get; set; }
%}
%```

But if we define a generic type for pairs then we can create any number of non-generic types of pairs without having to write any implementation.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:generic-list

% TODO: Group and color code pairs of similar types.

As long as all instances of a pair type store elements of the same type in the first position and elements of the same type in the right position then it doesn't matter what these types are.
The pairs that are grouped together have the same type, and all pair types could be constructed from the same generic pair type.
```

Can every type be converted into a generic type?
No, some algorithms cannot be expressed without knowledge of the underlying type.
Think about the difference between the act of adding another element to a list (which we've talked about) and that of arithmetic addition.
Arithmetic addition is only defined for numeric types.
If you want to say that there is an implementation for a type that is not a number then you have to define that implementation yourself.
It's not obviously parametrically polymorphic.


## Exercises

```{exercise}
What are generics?
```

```{exercise}
What is parametric polymorphism?
```

```{exercise}
Can any method be converted into a parametrically polymorphic method while still maintaining the same functionality?
Why or why not?
```

```{exercise}
Give an example, in your own words, of a type that could be parametrically polymorphic.
```

```{exercise}
What is the difference between a "generic type definition" and a "constructed generic type"?
```

