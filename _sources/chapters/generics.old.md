# Generics

Remember how we said that there are at least [four types of polymorphism](subtype-polymorphism)?
In object oriented programming subtype polymorphism is the really big one, but in hybrid languages such as C# parametric polymorphism is really important and frequently used.
In C# parametric polymorphism is implemented through the concept known as "generics".
For a basic understanding of generics / parametric polymorphism we must understand four concepts:

1. Generic types / type constructors.
2. Type parameters.
3. Type parameter constraints.
4. Variance

We will deal with the first two in this chapter and the remaining two in the separate chapters on [type parameter constraints](type-parameter-constraints) and [variance](variance).

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

  public string Encode (string input)
    => cipher2.Encode(cipher1.Encode(input));
}
```

How should we go about removing this duplication?
If we want to use subtype polymorphism then we have to find a way to either:

1. make `ICipher` implement `ICharCipher`
2. make `ICharCipher` implement `ICipher`, or
3. somehow merge the two interfaces.

%If we're subtyping then it probably makes most sense to say that `char` is a special case of `string` rather than the other way around.
%
Meaning that we would say that `ICharCipher` inherits from `ICipher` (`ICharCipher : ICipher`).
As you will see in the chapter on the [Liskov substitution principle](liskov-substitution-principle) there is no obviously sensible subtype relationship between `char` and `string`.
As a consequence, there isn't a sensible subtype relationship between `ICharCipher` and `ICipher`.
If instead we were trying to turn merge the two interfaces into a single one, we could simply move both `Encode` methods and use [overloading](overloading) since they have different signatures.
However, that doesn't really eliminate the duplication but rather merely puts the duplicated code in the same place so that it isn't scattered.
None of these solutions are particularly appealing, so what are we to do?

Enter parametric polymorphism.
In this chapter we will instead replace our interfaces `ICipher` and `ICharCipher` with a single generic interface, called `ICipher<T>`.
This allows us to eliminate further duplication, not only in the interfaces, but also by implementing a single `CompositeCipher<T>` that works for input and outputs of both type `string` and type `char`.

As we shall see, parametric polymorphism not only help us eliminate duplicated code, but also spreads like a virus.
The good kind of virus.
By turning a non-generic type into a generic type it is often possible that things that use this new generic type can too be converted from non-generic to generic types.
And so the meme permeates throughout our code-base.
Generic types increase the [maintainability](maintainability) of our code since they (at least) increase modularity and modularity.

%But what's the benefit of using generic types when you can?
%There's at least two major benefits.
%
%1. You reduce duplication because you don't have to repeat the same or very similar code for multiple different types.
%2. If you've got a dependency that's generic then it's possible that when you're writing something that uses that dependency it might be possible to make that generic as well.


## Definition

The word "parametric", in "parametric polymorphism", was presumably chosen since parametrically polymorphic types are *parameterized* over types.
The name "generics" was presumably selected since the use of parametric polymorphism is also known as "generic programming".
Which terminology is used mostly depend on the tradition of the language that we are using and in C# we tend to say "generics" rather than "parametric polymorphism" and "generic type" rather than "type constructor".

The idea of a generic type is that it is universally polymorphic.
The instance and static members of a generic type can be defined so that they are valid for any possible type.
We can write the implementation of every member for every possible type at the same time.
Said differently, the implementation does not depend on the underlying type that we've parameterized over.

%## Generic types

So, what is a generic type?
In some languages, such as e.g. Haskell, we would not refer to this as a type but a "type constructor".
In C# we usually call this a generic type but I think the phrase "type constructor" really is quite useful for understanding what we are dealing with.
A type constructor is not a type.
It is a constructor, and when you apply it to some types you it constructs a new type.
%We don't tend to use the terminology "type constructor" in C# but I think it is a quite useful analogy.

```{important}
A generic type is not a complete type.
To construct a type we must replace its *type parameters* with actual types.
```

Think of it this way: A generic type depends on some other type or types, but what these types are is not known at the time you write the implementation of your generic type.
So, instead you parameterize your generic type over some types.
These are known as "type parameters".
Then, whenever someone wishes to use your generic type they must replace these type parameters with actual types so that we get, what is called, a *generic constructed type* or simply a *constructed type*.

It is important to realize that all type parameters must be replaced with actual types upon compilation.
In terms of using the term "polymorphism" we ought to classify this as "static" rather than "dynamic" polymorphism.
With subtype polymorphism, it is possible to defer the decision of which implementation to use at run-time.
With parametric polymorphism, which implementation to use has to be known at compile-time.
Still, it is tremendously useful when it comes to writing reusable and modular code without ever having to give up static typing.

```{admonition} Aside
:class: seealso
If you happen to be familiar with logic quantifiers then we should emphasize that a generic type is a *universally quantified* type.
This is why we say that the type is *universally* polymorphic.
```

TODO:

TODO:

TODO:

TODO:

TODO:
Must define syntax!!!!!!!!!!!
Where can you use `T`? => Class/interface name, method name.
Where can you replace `T` with a type? => Subtyping, overriding(?), 

1. Generic classes.
2. Generic interfaces.
3. Generic methods.
4. Generic delegates.


## Examples

The most common use-case for generics is collections.
Think about a list for example.
When you're implementing a method that adds items to the list, do you really need to know what type of element you are adding?
Not really, right?
Adding is just a matter of sticking the element into the list.
As long as the type of all elements in the list is the same, and as long as all instances of any list type have the same type, we're fine.

```{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
:name: fig:generic-list

% TODO: Give example of a bunch of lists. Numbers, Strings, red colored dots, blue colored dots.

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

```csharp
class Pair<T>
{
  public T First { get; set; }
  public T Second { get; set; }
}
```

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
It's not parametrically polymorphic.

Think back to [subtype polymorphism](subtype-polymorphism).
We define a set of 

The "type parameter" in the generic type `List<T>` is what's denoted by the letter `T`.
The letter `T` is arbitrary in the same sense that any variable name is arbitrary.
Using the letter `T` is merely convention, and has probably caught on since it is the first letter in the word "type".
In Haskell we tend to simply start with the letter `A` and then keep moving forward in the alphabet if we need more parameters.
These names however only tend to be used if there is no other name that more clearly conveys what kind of type the parameter is.

TODO: Write more here.

The generic type `KeyValuePair<TKey, TValue>` for example has two type parameters: `TKey` and `TValue`.
Notice how these are not single-letter names and how we're trying to tell the reader of our generic type a bit more about what these types actually are going to be used for.
The name `TKey` suggests that this is the type that we're going to use for the identifier, the key.
The name `TValue` suggests that this is the type that we're going to use for the value.

Unless a type parameter is constrained (we'll get to this in just a moment) any type can be used in its place.
Importantly, this means that we can use generic types inside of generic types.

```csharp
Collection<KeyValuePair<TKey, TValue>> keyValuePairs;
List<List<List<int>>> threeDimensionalIntGrid;
```

To get access to collection based generic types we need to import the namespace containing generic collections:

```
using System.Collections.Generic;
```

If you think about it as a 
That terminology is quite useful if you 

When we use generics 

To get access to the generic collections in C# we must import the namespace that contains them:

```csharp
using System.Collections.Generic;
```

We already know about [arrays](arrays) but this is not a generic collection.
Let's start with the generic type `List<T>`.
This class defines a generic type.

Remember [arrays](arrays)?
With the introduction of Generics 
There's actually a vast hierarchy 
You might have already 

## Exercises

```{exercise}
What is a generic type?
```

```{exercise}
What is parametric polymorphism?
```

```{exercise}
C# does not use the term "type constructor" and instead simply say "generic type".
What is meant with the term "type constructor" and how would this apply to C#?
```


%Parametric polymorphism.
%
% Lists => MultiCipher based on list.
%
%- Type constructor
%- Type parameter
%- Type parameter constraints
%
%- Bound types
%- Unbound types

%- Example: ICharPredicate from [abstract dependency injection](abstract-dependency-injection) can be an interface where `char` is a type parameter. `IPredicate<char>`. This means that we also could generalize the interface `ICipher` and `ICharCipher` to `ICipher<string,string>` and `ICipher<char, string>`. But in terms of narrative you should start in the later end and then point out that the predicate code becomes a problem if we can't also generalize that. Benefits: Simpler type names and eliminating duplicated code.

%- Example: Identity cipher can be implemented from A -> A. So that we don't need an identity cipher for chars. Actually this is not possible for char cipher since it is char -> string. Possible with constraints?
%
%
%- https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/types
%- https://stackoverflow.com/questions/2173107/what-exactly-is-an-open-generic-type-in-net
%  - Open type (possible to have an instance of an open type?)
%  - Closed type
%  - Constructed type

### Generic methods

```csharp
List<T> zip<T> (List<T> xs, List<T> ys)
{
  List<T> result = new List<T>();
  int n = Math.Max(xs.Count, ys.Count);
  for (int i=0; i<n; i++)
  {
    if (i < xs.Count) result.Add(xs[i]);
    if (i < ys.Count) result.Add(ys[i]);
  }
  return result;
}

var xs = new List<int> { 1, 2 };
var ys = new List<int> { 100, 200, 300 };
List<int> lst = zip(xs, ys);

foreach(int x in lst)
  Console.Write(x + " ");
```

```output
1 100 2 200 300 400
```

