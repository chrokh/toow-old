---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: csharp
  language: .net-csharp
  name: .net-csharp
---

# Generic types

```{warning}
Work in progress.
```

% TODO: ICipher<TIn,TOut> should perhaps be ICipher<TOut,TIn> to be consistent with Func interface.

%TODO: __ Example of variance could be the class using Predicate interface from an exercise in the chapter on [abstract inject object composition](abstract-injected-object-composition:exercises:predicates). Works only for CharToChar but with generics could work on both.__

In the chapter on [generics](generics) we gave an introduction to the different aspects of generics.
In this chapter we will discuss "generic types", meaning generic classes and interfaces.

## Motivation

In the chapter on [generics](generics) we showed how some problems cannot sensibly be solved by means of [subtype polymorphism](subtype-polymorphism) (overriding) or [ad-hoc polymorphism](overloading) (overloading).
In cases where the implementation is the same, but the types are different, and no type can be a subtype of the other, it is instead often possible to use parametric polymorphism (or "generics" as we call it in C#) to eliminate duplication and increase modularity.

The most common use case for generic types in C# is probably that of generic collections.
C# offers an extensive [type hierarchy](type-hierarchies) of generic collection types which include both interfaces and concrete classes.
This involves everything from simple types like `Set<T>` and `Stack<T>` to more complex types like `Dictionary<TKey,TValue>` and `KeyedCollection<TKey,TItem>`.
%Part of this hierarchy is depicted in {numref}`fig:generic-collections-hierarchy`.

But there are tons of problems that we can solve by writing our own generic types and that's mostly what we're going to explore in this chapter.

```{important}
Generic types allow us to build arbitrarily complex types that depend on other types without needing any knowledge of said types, and while still retaining static type safety.
```

If you want to build a type that somehow depends on some other type or types without using generics you have to either resort to using the [dynamic](type-systems) keyword or treat your dependencies as the top-type [object](type-hierarchies).
In both cases we will most likely have to perform unsafe [type conversions](object-type-conversions) to do anything meaningful.
Which means that we run the risk of run-time errors.

Let's look at an example without using generics.
Let's say that we're trying to build a simple and [immutable](immutable-objects) type that simply encapsulates a value of an unknown type.
The value is set through the constructor and can be extracted through a [property](properties).
Let's call it a "box".

Using the `dynamic` keyword it would look something like this:

```csharp
class DynamicBox
{
  public dynamic X { get; private set; }
  public DynamicBox (dynamic x) => X = x;
}
```

Using the top-type object it would look something like this:

```csharp
class ObjectBox
{
  public object X { get; private set; }
  public ObjectBox (object x) => X = x;
}
```

Simple enough, right?
Does it work?
Sure, both these types work in the sense that we can instantiate them and plop any type of value inside.

```{aside}
In fact, if our type could store multiple values at the same time (like say a list) we could even mix values of different types in the same box.
If you want to read more about such a type, have a look at the archeic type `ArrayList` in the [documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.arraylist?view=net-6.0#remarks).
```

Let's try putting values of different types in our boxes.

```csharp
new DynamicBox(123);
new DynamicBox("hello");

new ObjectBox(123);
new ObjectBox("hello");
```

No compile-time errors.
No run-time errors.
So far so good.
But when we try to access the values that are contained in a box we might get slapped with run-time errors since the box could contain values of a type that's different from what we were expecting.
In the example below, we store a `string` in the box built using `dynamic` and then extract the value and try to assign it to a variable of type `int`.
The code compiles.
But what happens when we run it?
Boom!
We get hit with a run-time exception.

```csharp
DynamicBox dynStrBox = new DynamicBox("hello");
int number = dynStrBox.X;
```

```output
Unhandled exception. Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: Cannot implicitly convert type 'string' to 'int'
```

But this error just says that we can't *implicitly* convert between the types.
What if we *explicitly* convert (by saying `(int)dynStrBox.X`)?
Same problem, we just get a different exception.
A `string` is just simply not an `int`.

```output
Unhandled exception. Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: Cannot convert type 'string' to 'int'
```

Let's try doing the same thing with the box built using `object`.
Note that now we're using the type `object` as opposed to bypassing static type-checking all-together, as in the case of using the keyword `dynamic`.
This means that we have to use [downcasting](object-type-conversions) to convert from `object` to whatever type we expect to have.
Same thing here.
The code compiles.
But what happens when we run it?
Boom!
We get hit with a run-time exception.

```csharp
ObjectBox objStrBox  = new ObjectBox("hello");
int number = (int)objStrBox.X;
```

```output
Unhandled exception. System.InvalidCastException: Unable to cast object of type 'System.String' to type 'System.Int32'.
```

At its core, this is question of [dynamic vs static typing](static-vs-dynamic).
If you use downcasting or the dynamic keyword you might as well leave the world of static typing all-together.
As we've discussed in the chapters on [type checking](type-checking) and [type systems](type-systems) static typing has immense benefits.

```{warning}
Static typing has immense benefits.
So don't give it up willy-nilly.
Use generic types to solve the same problem.
Generic types enable us to retain static type safety.
%Go back to the chapters on [type checking](type-checking) and [type systems](type-systems) for more information about the benefits.
```

A generic version of the box type above might look something like this:

```csharp
class Box<T>
{
  public T X { get; private set; }
  public Box (T x) => X = x;
}
```

We can still stick any type of value in the box.
Importantly however, we must declare what type of values we will be putting in the box before we put any values there.
More precisely, we must make a constructed generic type (e.g. `Box<int>`) out of our generic type definition (`Box<T>`) by replacing our type parameter (`<T>`) with a type argument (e.g. `<int>`).

```csharp
Box<int> box5 = new Box<int>(123);
Box<string> box6 = new Box<string>("hello");

int x5 = box5.X; // Compiles.
int x6 = box6.X; // Does not compile!
```

```output
error CS0029: Cannot implicitly convert type 'string' to 'int'.
```

If we now try to convert the value to a type of which it cannot be converted we get a type-error at compile-time.
As we've discussed in [previous chapters](prefer-compile-time-errors) compile-time errors are much preferable than run-time errors.
The code above simply won't compile if the types don't line up.
Therefore we'll never be able to see this error when the application is actually running.


## Definition

A "generic type definition" is not a type but acts as a "template" of a type.
The types of some of the dependencies of the generic type definition are not known at the time of declaration.
These unknown types are represented by [type parameters](generic-type-parameters).

%% TODO:
%%- Pair<T1,T2>
%%- Generic type definition (underline everything)
%%- Generic type name (underline name)
%%- Generic type parameters (underline T1 and T2 in <T1, T2>).
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:generic-type-definition
%
%Parts of a generic type *definition*.
%``

When the generic type definition is turned into a "constructed generic type" it becomes a complete type and no longer acts as a template.
To turn the generic type definition into a constructed generic type we must substitute the type parameters with type arguments, meaning actual types.

%% TODO:
%%- Pair<int,string>
%%- Constructed generic type (underline everything).
%%- Generic type name (underline name)
%%- Generic type arguments (underline `int` and `string` in `<int, string>`).
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:constructed-generic-type
%
%Parts of a *constructed* generic type.
%``

Both classes and interfaces can be used to declare generic type definitions.
However, only interfaces support, what is known as, type parameter "[variance](variance)".
Don't worry if you have no idea what that means.
We will look at variance in detail in the chapter on [variant generic interfaces](variant-generic-interfaces).
This means that all type parameters in generic class definitions are invariant as opposed to variant.

A type parameter can be used anywhere in a generic type definition where a regular type would be used.
This includes input and output types of methods; the type of variables, fields, or properties; or types delegates.

```{warning}
Unless you place [constraints](type-parameter-constraints) on a type parameter you cannot make any assumptions about what its interface is.
```

Importantly, we can also use a type parameter when stating what other types our type [inherits from](inheritance) or which [interfaces](interfaces) it implements.
That means that it's possible to combine [subtyping](subtype-polymorphism) and [generics](generics).
As you might already suspect, that is very useful.
In the examples section you'll find many cases of combining the two.
Let's move on to the examples.


## Examples

In this section we'll first build a simple generic type.
Then we will spend some time refactoring our ciphers to use generics and combine it with subtyping.
Finally, we will explore a few common generic collection types that are built in to .NET.


### Pairs

Let's start by building our own generic type for storing [immutable](immutable-objects) pairs of values.
The two values in any given pair doesn't necessarily have to be of the same type.
This data type is commonly called a "Tuple" and it should be noted that .NET already does has a type like this.
Please see the [documentation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-tuples) for more information.
Nevertheless, this is a simple enough type to make a useful example.
So let's go.

```csharp
class Pair<T1, T2>
{
  public T1 Value1 { get; private set; }
  public T2 Value2 { get; private set; }

  public Pair (T1 value1, T2 value2)
  {
    Value1 = value1;
    Value2 = value2;
  }
}
```

The code above defines a generic class, called `Pair`, with two type parameters referred to as `T1` and `T2`.
Since there's only a single constructor which takes two arguments (one for each value in the pair) there's no way to construct an instance of `Pair` without also providing both values.
The type also contains two [properties](properties) with [public](basic-access-modifiers) getters but private setters.
So when you instantiate a pair you have to provide both values.
When you have an instance you can extract the values but you cannot change them.
That's it, and voilà, we've written our own generic type definition.

How can you use this?
Well, remember, this is only a generic type definition.
You have to turn it into a constructed generic type.
How do you do that?
By simply replacing the type parameters with actual types.

```csharp
Pair<int, int> p1;
Pair<string, bool> p2;
```

In the code we're declaring the two variables `p1` and `p2` and we're saying that their types are two constructed generic types.
The first constructed type replaces both type parameters with `int`.
The second constructed type replaces `T1` with `string` and `T2` with `bool`.
Let's now initialize some variables.

```csharp
Pair<int, int> p3 = new Pair<int, int>(100, 200);
Pair<string, bool> p4 = new Pair<string, bool>("Hello", true);
```

In the code above we create two new pair variables with the same type as before but now we initialize them immediately.

```{warning}
The type arguments in the compile-time type (meaning the type on the left) are the same types as the type arguments in the run-time types (meaning the type on the right).
If the type parameters of the generic type are invariant then they have to be the same for type-checking to succeed.
If you want to be able to use a different type argument in the run-time type, you must make your type parameters variant.
But this we'll look into in the chapter on [variant generic interfaces](variant-generic-interfaces).
```

Remember how we said that generics retain static type safety?
Since the constructed type of `p3` is `Pair<string, bool>` the compiler knows that anytime we use the getter for `Value1` we will get back a `string`, and whenever we access the getter for `Value2` we will get back a `bool`.
That means that if we use the types in an incorrect manner we'll get a compiler error instead of an embarrassing and possibly costly run-time error.
That's great.

```csharp
bool b = p3.Value1;
```

```output
error CS0029: Cannot implicitly convert type 'string' to 'bool'.
```


(generic-types:icipher)=
### Generic cipher interface

Remember how we, in the introductory chapter to [generics](generics), promised that we would combine our [interfaces](interfaces) `IStringToStringCipher`, `ICharToCharCipher`, and `ICharToStringCipher` into a single generic interface?
That's what well do now.
In the coming examples we'll see what this type allows us to do.

Combining the cipher interfaces into a single interface is a simple task as soon as we realize that we can model encoding as the act of taking a value of some type as input and providing a possibly different value of possibly different type as output.
Let's use meaningful names for our type parameters and call the two types `TIn` and `TOut`.
The former (`TIn`) is the type of values that an implementor of our interface can encode.
The latter (`TOut`) is the type of values that an implementor of our interface returns when encoding.

```{code-cell} csharp
interface ICipher<TIn, TOut>
{
  public TOut Encode (TIn input);
}
```

Simple as that.
This means that we're now replacing our old specific and verbosely named interfaces with constructed generic interfaces based on the generic interface above.
See {numref}`tbl:generic-types:examples:mapping` for a summary of what we're replacing our old interfaces with.

```{list-table} We can now replace our old specific interfaces with constructed generic interfaces.
:header-rows: 1
:name: tbl:generic-types:examples:mapping

* - Before
  - After
* - `ICharToCharCipher`
  - `ICipher<char,char>`
* - `ICharToStringCipher`
  - `ICipher<char,string>`
* - `IStringToString`
  - `ICipher<string,string>`
```

We haven't talked about decoding up to this point.
Let's stop and think about it for one second.
If we took a `char` like `L` and encoded it using the `RobbersCipher` with the vowel `o` then we would end up with `LoL`.
We map from `char` to `string`.
If we then wanted to decode that `string` we should map from `string` to `char`.
Before our generic types we could of course just have defined that interface and called it `IStringToCharCipher`.
However, with our generic type in place, it's as simple as making a new constructed generic interface on the fly by simply saying `ICipher<string,char>`.
Pretty neat.


### Identity cipher

Before we start looking at something more complex let's look at the simplest possible cipher, the identity cipher.
Interestingly, the identity cipher can also be implemented generically.
Meaning for all types at the same time.
Since the identity cipher just returns whatever value you give it we don't need any additional type information to implement it.

In the identity cipher however, `TIn` and `TOut` must always be the same type since we always get back the same value as the one we sent in.
So when replacing our type parameters with type arguments we will make sure to use the same type parameter for both `TIn` and `TOut`.
So let's implement that.

```{code-cell} csharp
class IdentityCipher<T> : ICipher<T, T>
{
  public T Encode (T input) => input;
}
```

Notice how we need to specify that `IdentityCipher` too is a generic type definition by adding the type parameter `T` to its type parameter list.
If we hadn't added a type parameter to the type definition we would not have said that `IdentityCipher` is a generic type.
This would lead to a compiler error because in the part where we implement the `ICipher<T>` interface we do mention `T`.
So this type argument `T` needs to be declared as a type somewhere.

```{hint}
Remember that it doesn't matter if we say `A -> A` or `T -> T`.
These are just type parameter names.
What matters is whether the name of two type arguments is the same or not.
```

We are also making use of the same `T` on the line where we define the `Encode` method.
Only the `T` within the parameter list of the type that we're now defining (namely `IdentityCipher` and not `ICipher` is a type parameter.
All other occurrences of `T` are making use of `T`, not declaring that it's a parameter.
In all other occurrences `T` is a [type argument](generics-terminology), not a type parameter.

Had we omitted the type parameter `T` in the subtype `IdentityCipher` we would get three compiler errors.
One for every usage of the type `T` which would no longer be declared.
Have a look at the erroneous code and the corresponding error below.

```{code-cell} csharp
:tags: [raises-exception]
class IdentityCipher : ICipher<T, T>
{
  public T Encode (T input) => input;
}
```

### Concrete ciphers

Let's now make our different ciphers implement this interface.

We'll start with the `CaesarCipher`
Recall that the encoding method of the `CaesarCipher` maps from `char` to `char`.
So our constructed generic interface that we want to implement must have type `ICipher<char, char>`.
Because `TIn` is a `char` and `TOut` is a `char`.
Notice how `CaesarCipher` remains a non-generic type.
All we're doing is that we're saying that it implements an interface which is a constructed generic type.

```{code-cell} csharp
:tags: [hide-input]
class CaesarCipher : ICipher<char,char>
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + steps) % alphabet.Length;
    if (i != -1)
    {
      if (newIndex < 0)
        newIndex += alphabet.Length;

      if (Char.IsLower(input))
        return Char.ToLower(alphabet[newIndex]);
      else
        return alphabet[newIndex];
    }
    return input;
  }
}
```

Now let's try `RobbersCipher`
As we know, the encode method of the `RobbersCipher` maps from `char` to `string`.
So, it's as simple as saying that our class implements the constructed generic interface `ICipher<char,string>`.
In other words, it implements the constructed generic interface `ICipher` where `TIn` is `char` and `TOut` is `string`.

```{code-cell} csharp
:tags: [hide-input]
class RobbersCipher : ICipher<char,string>
{
  private char vowel;

  public RobbersCipher (char vowel)
    => this.vowel = vowel;

  public string Encode (char input)
  {
    string consonants = "BCDFGHJKLMNPQRSTVXYZ";
    if (consonants.IndexOf(Char.ToUpper(input)) != -1)
      return $"{input}{vowel}{input}";
    else
      return $"{input}";
  }
}
```

Same deal with `LeetCipher` but here we implement the constructed generic interface `ICipher<char,char>`.

```{code-cell} csharp
:tags: [hide-input]
class LeetCipher : ICipher<char,char>
{
  public char Encode (char input)
  {
    switch (input)
    {
      case 'L': return '1'; case '1': return 'L';
      case 'A': return '4'; case '4': return 'A';
      case 'O': return '0'; case '0': return 'O';
      case 'T': return '7'; case '7': return 'T';
      case 'E': return '3'; case '3': return 'E';
      default: return input;
    }
  }
}
```

Pretty straight-forward right?
The implementations don't have to change.
All we're doing is that we're replacing our old verbose and overly specific interfaces with constructed generic interfaces.





### Composite ciphers

In the chapter on [abstract injected object composition](abstract-injected-object-composition:examples:composite-ciphers) we implemented a composite cipher that, when encoding, essentially applied one cipher after another.
Unfortunately our implementation only supported ciphers that map from `string` to `string`.
We stated that while it would certainly be both possible and useful to write an implementation that supports ciphers that map from, say, `char` to `char` it would also lead to us duplicating the whole class.
Not good.

Remember how we said that if the implementation is the same, but the types are different, and no type can be a subtype of another, then we can probably use generics?
Well, that's precisely the case that we have here.

Let's write a new and *generic* implementation of `CompositeCipher`.

```{code-cell} csharp
class CompositeCipher<T> : ICipher<T,T>
{
  ICipher<T,T> first, second;

  public CompositeCipher (
      ICipher<T,T> first,
      ICipher<T,T> second)
  {
    this.first = first;
    this.second = second;
  }

  public T Encode (T input)
    => second.Encode(first.Encode(input));
}
```

Does it work like before?
Yes indeed.
All we have to do is to swap out the types and then we can run exactly the same example as before.

```{code-cell} csharp
CompositeCipher<char> composite = new CompositeCipher<char>(
  new CaesarCipher(1),
  new LeetCipher());

Console.WriteLine(composite.Encode('E'));
```

Of course, that's not all.
The whole point of this was that we wanted to be able to support compositions of other types of ciphers.
Did we succeed in that?

To be able to give an example we have to first quickly change the interfaces of our types `SubstitutionCipher` and `CharToStringAdapter` from the chapter on [abstract injected object composition](abstract-injected-object-composition).

```{code-cell} csharp
:tags: [hide-input]
class SubstitutionCipher : ICipher<string,string>
{
  ICipher<char,string> cipher;

  public SubstitutionCipher (ICipher<char,string> cipher)
    => this.cipher = cipher;

  public SubstitutionCipher (ICipher<char,char> cipher)
    => this.cipher = new CharToStringAdapter(cipher);

  public string Encode (string input)
  {
    string output = "";
    foreach (char c in input)
      output += cipher.Encode(c);
    return output;
  }
}

class CharToStringAdapter : ICipher<char,string>
{
  ICipher<char,char> cipher;

  public CharToStringAdapter (ICipher<char,char> cipher)
    => this.cipher = cipher;

  public string Encode (char input)
    => cipher.Encode(input).ToString();
}
```

With that out of the way, let's now look at an example that uses our generic composite cipher type to compose ciphers that map from `string` to `string`.

```{code-cell} csharp
var caesars = new SubstitutionCipher(new CaesarCipher(1));
var leet = new SubstitutionCipher(new LeetCipher());

CompositeCipher<string> composite =
  new CompositeCipher<string>(caesars, leet);

Console.WriteLine(composite.Encode("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
```

### Composing different types

But wait a minute.
Who says the first input have to equal the final output?
It doesn't really matter what type of value the first cipher returns as long as its the same type of value that the second cipher expects as input.

Let's write a more general definition.
How about the following?

```{code-cell} csharp
class CompositeCipher<T1,T2,T3> : ICipher<T1,T3>
{
  ICipher<T1,T2> first;
  ICipher<T2,T3> second;

  public CompositeCipher (
      ICipher<T1,T2> first,
      ICipher<T2,T3> second)
  {
    this.first = first;
    this.second = second;
  }

  public T3 Encode (T1 input)
    => second.Encode(first.Encode(input));
}
```

But why is this needed you ask?
Well, because now we can compose an instance of `RobbersCipher` which maps from `char` to `string` with the other ciphers that map from `char` to `char`.

```{code-cell} csharp
CompositeCipher<char,char,string> composite = new CompositeCipher<char,char,string>(
  new CaesarCipher(1),
  new RobbersCipher('o'));

Console.WriteLine(composite.Encode('A'));
```

% TODO: This example is pointless since we could just as well treat the input as string in the first place no?
%And we can now also compose multiple instances of `RobbersCipher` if we treat the second cipher as taking `string` input.
%
%``{code-cell} csharp
%CompositeCipher<char,string,string> composite = new CompositeCipher<char,string,string>(
%  new RobbersCipher('o'),
%  new SubstitutionCipher(new RobbersCipher('a')));
%
%Console.WriteLine(composite.Encode('L'));
%``

```{seealso}
We are now closing in on something called "function composition" so if your'e intrigued by this then I highly recommend that you look in to functional programming.
But finish this book first, because we have a lot more to learn that will also aid in understanding functional programming.
```

Feels like it's all coming together.
But don't worry, we have many chapters to go and more cool things left to do.



## Exercises

```{exercise}
What are genric types?
```

```{exercise}
What is the difference between a generic type *definition* and a *constructed* generic type?
```

```{exercise}
Why does the generic type `CompositeCipher<T1,T2,T3>` require three type parameters? Can we achieve the same functionality with just two?
```

```{exercise}
Rewrite the class `SequenceCipher` from {numref}`ex:array-cipher` so that it implements a construction of the generic interface `ICipher<TIn,TOut>`.
Bonus question: Can the class `SequenceCipher` be made generic?
Why or why not?
```

```{exercise}
Rewrite the conditional cipher that we implemented in {numref}`abstract-injected-object-composition:exercises:predicates` so that it is generic.

Hint: This also requires that we rewrite the predicate interface from that same exercise.
%ConditionalCipher<TIn,TOut>
%IPredicate<T>
```

```{exercise}
Come up with and implement your own *generic type* that fits into our ecosystem of ciphers.
```

```{exercise}
Come up with and implement your own type that subtypes a constructed generic type.
The constructed generic type should be constructed from one of the generic types that we've discussed in this chapter.
```








% TODO: MUST TALK ABOUT GENERIC COLLECTIONS
%### Lists
%
%Let's look at a few types from the generics collection hierarchy of C#.
%To get access to the generic collection types we must first import the namespace in which they are defined.
%
%```csharp
%using System.Collections.Generic;
%```
%
%One of the more common types is `List<T>`.
%
%```{seealso}
%Remember [arrays](arrays) from an earlier chapter?
%It has been argued that arrays are somewhat obsolete and that we simply should use the generic counterparts in this modern day and age.
%Check out this archived [blog entry](https://learn.microsoft.com/en-us/archive/blogs/ericlippert/arrays-considered-somewhat-harmful) by Eric Lippert if you want to read more about this.
%```
%
%% TODO: Replace this figure.
%```{figure} https://homes.cs.aau.dk/~normark/oop-csharp/html/notes/graphics/small/collection-overview-1-i1.png
%:name: fig:generic-collections-hierarchy
%
%Class diagram of some types that implement or inherit from the `IEnumerable` interface. This figure will be replaced soon.
%[[Image source](https://homes.cs.aau.dk/~normark/oop-csharp/html/notes/graphics/small/collection-overview-1-i1.png)]
%```
%
%%Arrays have this special bracket syntax that we use to instantiate them and then to interact with them.
%%Since `List<T>` is implemented using generics there's no need to learn any special syntax for just this type.
%%You can use bracket syntax to set or get individual elements but 
%
%### IEnumerable
%IEnumerable => No counting.
%ICollection => Counting but no array access.
%IList => Array access.
%
%
%### Keyed collection
%
%https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.keyedcollection-2?view=net-6.0




% TODO: USE ANY OF THE BELOW???

%### Character-wise ciphers
%
%Ok, so we've shown that our ciphers that take values of type `char` as input and produce a value of type `string` or `char` as output can implement our interface `ICipher<TIn,TOut>`.
%Before moving on, let's ask ourselves whether our ciphers that take values of type `string` as input also can implement that interface.
%
%What do you think? Can they?
%Of course, and hopefully you can now see that this is true even without writing any code.
%
%However let's still build something that takes a `string` as input and gives a `string` as output.
%But instead of doing a specific cipher like `ReverseCipher`, let's see if we can make `CharWiseCipher` implement the interface `ICipher<TIn,TOut>`.
%The last time we saw that class was in the chapter on [abstract injected object composition](abstract-injected-object-composition) where its implementation looked like this:
%
%```csharp
%class CharWiseCipher : ICipher
%{
%  ICharCipher charCipher;
%
%  public CharWiseCipher (ICharCipher charCipher)
%    => this.charCipher = charCipher;
%
%  public string Encode (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += charCipher.Encode(c);
%    return output;
%  }
%}
%
%interface ICharCipher
%{
%  public char Encode (char input);
%}
%
%interface ICipher
%{
%  public string Encode (string input);
%}
%```
%
%Notice how our old version of `CharWiseCipher` depends on our old interfaces `ICipher` and `ICharCipher` that we are no longer using.
%Can you see how to rewrite the class so that all these old interfaces are replaced with `ICipher<TIn,TOut>`.
%
%Well, we simply have to replace all occurrences of `ICipher` with `ICipher<string,string>` and all occurrences of `ICharCipher` with `ICipher<char,char>`.
%And that's it.
%Here's what it would look like:
%
%```csharp
%class CharWiseCipher : ICipher<string,string>
%{
%  ICipher<char,char> cipher;
%
%  public CharWiseCipher (ICipher<char,char> cipher)
%    => this.cipher = cipher;
%
%  public string Encode (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += cipher.Encode(c);
%    return output;
%  }
%}
%```
%
%This means that we're back in a position where we can, at run-time, compose `CharWiseCipher` and `LeetCharCipher` to make a leet language cipher that works on whole strings.
%All without loosing static type safety, mind you.
%
%```csharp
%ICipher<string,string> leetCipher = new CharWiseCipher(new LeetCharCipher());
%Console.WriteLine(leetCipher.Encode("LOL"));
%```
%
%```output
%707
%```
%
%%### Char to string ciphers
%
%Could we manage to make additional ciphers that take values of type `char` as input, such as e.g. our Caesar cipher and the Robber's language implement the interface `ICipher<char,char>`?
%If we could then we could use these ciphers that take values of type `char` as input and compose them with `CharWiseCipher` to make ciphers that instead map from `string` to `string`.
%
%Making the `CaesarCharCipher` implement `ICipher<char,char>` is trivial and is left as an exercise for you at the end of this chapter.
%However, making `RobbersCharCipher` implement `ICipher<char,char>` is not possible since its `Encode` method maps to `string` not `char`.
%We've already seen that it implements the interface `ICipher<char,string>`.
%So let's solve this problem together.
%
%### TODO: THIS IS WHERE YOU ARE.
%
%**Detta behöver ha diskuterats i abstract dependency injection-kapitlet. Men där går vi inte hela vägen eftersom vi då hade behövt ett till interface. Eller gör vi det? Bättre att skriva det kapitlet först? Gå tillbaka och skriv om där istället!!!!!!!!!!!!!!!!!!**
%
%```csharp
%constructor overloading.
%```
