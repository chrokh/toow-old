# Generics and type safety

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

```{admonition} Aside
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
