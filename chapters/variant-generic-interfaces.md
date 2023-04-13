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

# Variant generic interfaces

```{warning}
Work in progress.
```

## Examples


### Predicates

What's an example of something that could be contravariant?
How about predicates?

```{code-cell} csharp
interface IPredicate<in T> // Contravariant!
{
  bool Check (T input);
}
```

Let's say that we have a subtyping hierarchy where `Rectangle` is a subtype of the interface `IShape`.

```{code-cell} csharp
interface IShape
{
  public double Area ();
}

class Rectangle : IShape
{
  int width, height;
  public Rectangle (int width, int height)
  {
    this.width = width;
    this.height = height;
  }
  public double Area () => width * height;
}
```

Let us then define a predicate that works on objects of type `Shape`.

```{code-cell} csharp
class LargerThan : IPredicate<IShape>
{
  double lim;
  public LargerThan (double lim) => this.lim = lim;
  public bool Check (IShape shape) => shape.Area() > lim;
}
```

Since the type parameter in `IPredicate` is contravariant we can now use values of type `IPredicate<IShape>` where values of type `IPredicate<Rectangle>` are expected.

```{code-cell} csharp
IPredicate<IShape> shapePredicate = new LargerThan(2);
IPredicate<Rectangle> p = shapePredicate; // Needs contravariance.
```

Without `T` marked as covariant we would get the following error:

```{code-cell} csharp
:tags: [hide-input, raises-exception]
interface IPredicate<T>
{
  bool Check (T input);
}

interface IShape
{
  public double Area ();
}

class Rectangle : IShape
{
  int width, height;
  public Rectangle (int width, int height)
  {
    this.width = width;
    this.height = height;
  }
  public double Area () => width * height;
}

class LargerThan : IPredicate<IShape>
{
  double lim;
  public LargerThan (double lim) => this.lim = lim;
  public bool Check (IShape shape) => shape.Area() > lim;
}

IPredicate<IShape> shapePredicate = new LargerThan(2);
IPredicate<Rectangle> p = shapePredicate; // Needs contravariance.
```


%``{code-cell} csharp
%//class ConditionalCipher<T> : ICipher<T,T>
%//{
%//  ICipher<T,T> cipher;
%//  IPredicate<T> predicate;
%//  public ConditionalCipher (ICipher<T,T> cipher, IPredicate<T> predicate)
%//  {
%//    this.cipher = cipher;
%//    this.predicate = predicate;
%//  }
%//
%//  public T Encode (T input)
%//  {
%//    if (predicate.Check(input))
%//      return cipher.Encode(input);
%//    else
%//      return input;
%//  }
%//}
%``



### Variant ciphers

Remember `ICipher<TIn,TOut>` from the chapter on on [generic types](generic-types:icipher)?
If you think about it, `TIn` is only used as input, and `TOut` is only used as output.
Consequently, we can, without causing any issues mark `TIn` as being contravariant and `TOut` as being covariant.

```{code-cell} csharp
interface ICipher<in TIn, out TOut>
{
  TOut Encode (TIn input);
}
```

Let's then assume that we've got a cipher that implements this interface.
For the sake of simplicity, let's pick the constant cipher.

```{code-cell} csharp
class ConstantCipher<TIn, TOut> : ICipher<TIn,TOut>
{
  TOut output;
  public ConstantCipher (TOut output) => this.output = output;
  public TOut Encode (TIn input) => output;
}
```

Let's then assume that we have a simple type hierarchy like this:

```{code-cell} csharp
class Animal {}
class Cat : Animal {}
```

Since `TIn` is marked as being contravariant and `TOut` is marked as being covariant we can now do the following:

```{code-cell} csharp
Cat output = new Cat();
ICipher<Cat,Animal> cipher = new ConstantCipher<Animal,Cat>(output);
```

Notice how the type arguments on the left says `<Cat,Animal>` while the type arguments on the right says `<Animal,Cat>`.





(variant-generic-interfaces:cipher-factories)=
### Cipher factories

Let's look at a contravariant example that can be used in the context of our ciphers.
Let's model a type that can spit out any number of objects of another type.
You can think of this as a [factory](factory-method-pattern), a stream, a sequence, an infinite list, or an [iterator](iterator-pattern).

```{code-cell} csharp
interface IFactory<out T>
{
  T Next ();
  IEnumerable<T> Take (int n);
}
```

The method `Next` returns the next element in the sequence.
The method `Take` returns the `n` number of next elements in the sequence wrapped in an `IEnumerable` which you can think of as a read-only collection.
You can read more about `IEnumerable` in a [later chapter](ienumerable).

Let's first define an abstract factory that other factories can inherit from so that we won't have to reimplement the `Take` method for all factories.

```{code-cell} csharp
abstract class Factory<T> : IFactory<T>
{
  public abstract T Next();
  public IEnumerable<T> Take (int n)
  {
    List<T> result = new List<T>();
    for (int i=0; i<n; i++)
      result.Add(Next());
    return result;
  }
}
```

Our old trusted friend `CaesarCipher` remains the same, except that we've now also exposed the `steps` parameter as a property that publicly can be read and privately set.

```{code-cell} csharp
:tags: [hide-input]
interface ICipher<TIn, TOut>
{
  TOut Encode (TIn input);
}

class CaesarCipher : ICipher<char,char>
{
  public int Steps { get; private set; }

  public CaesarCipher (int Steps)
    => this.Steps = Steps;

  public char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + Steps) % alphabet.Length;
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

Let's now build two factories that yield instances of `CaesarCipher`.
The first cipher that the factories generate will have `Steps` set to `0`.
Upon every subsequent generation of a new factory, the factories will either increment or decrement the counter used to determine what number of `Steps` the next cipher will be instantiated with.

```{code-cell} csharp
class IncrementingCaesarCipherFactory : Factory<CaesarCipher>
{
  int i = 0;
  public override CaesarCipher Next () => new CaesarCipher(i++);
}

class DecrementingCaesarCipherFactory : Factory<CaesarCipher>
{
  int i = 0;
  public override CaesarCipher Next () => new CaesarCipher(i--);
}
```

So what can we do with this?
Well, since `T` in the factory interface is covariant, we can assign a typed as a factory that generates subtypes to a variable typed as a factory that generates the supertype.

```{code-cell}
IFactory<CaesarCipher> caesarFactory = new IncrementingCaesarCipherFactory();
IFactory<ICipher<char,char>> charFactory = caesarFactory; // Needs covariance.
```

Why would this be useful?
Well, sometimes we want to be able to treat a variable as its specific type, and sometimes we want to treat it as its general type.

In the example below, we have two methods that take factories of different type.
Since `T` in the factory interface is covariant we can pass the value of type `IFactory<CaesarCipher>` to both methods even though one of them excepts a value of type `IFactory<ICipher<char,char>>`.
Why?
Because a supertype of `CaesarCipher` is `ICipher<char,char>` and the type parameter where we apply this type is covariant.

```{code-cell} csharp
string encodeAny (int n, IFactory<ICipher<char,char>> factory) {
  string output = "";
  foreach (ICipher<char,char> cipher in factory.Take(n))
    output += cipher.Encode('A');
  return output;
}

string encodeCaesar (int n, IFactory<CaesarCipher> factory) {
  string output = "";
  foreach (CaesarCipher cipher in factory.Take(n))
    output += $"{cipher.Steps}=>{cipher.Encode('A')} ";
  return output;
}

IFactory<CaesarCipher> factory = new IncrementingCaesarCipherFactory();

Console.WriteLine(encodeAny(5, factory));
Console.WriteLine(encodeCaesar(5, factory)); // Needs covariance.
```


## Exercises

```{exercise}
In the chapter on [generic types](generic-types:icipher) we introduced the generic interface `ICipher<TIn,TOut>`.
Both type parameters in this generic type *can* be variant.
Explain why this in your own words and write a new version of `ICipher` where the type parameters are variant.
```

```{exercise}
Come up with and implement your own example of an interface with a type parameter that usefully exhibits covariance.
Give an example in code where you are using the fact that the type parameter is covariant.
```

```{exercise}
Come up with and implement your own example of an interface with a type parameter that usefully exhibits contravariance.
Give an example in code where you are using the fact that the type parameter is covariant.
```

```{exercise-start}
```
Why does the following code generate a compiler-error?
```{code-cell} csharp
:tags: [raises-exception, remove-output]
interface IBox<out T>
{
  T Get ();
  void Set(T x);
}
```
```{exercise-end}
```

```{exercise-start}
```
Why does the method `Set` in the following code example *not* generate a compiler-error even though `T` is marked as covariant.
```{code-cell} csharp
interface IBox<out T>
{
  T Get ();
}

class Box<T> : IBox<T>
{
  T x;
  public Box (T x) => this.x = x;
  public T Get () => x;
  public void Set (T x) => this.x = x;
}
```
```{exercise-end}
```


```{exercise-start}
```
Assume that we have the following types.
```{code-cell}
class Box<T>
{
  public T Item { get; set; }
}

interface IAnimal { }
class Cat : IAnimal { }
class Dog : IAnimal { }
```
Disregard the fact that C# only support the variance keywords `in` and `out` on interfaces for a moment.
Keeping variance and compile-time [type safety](type-safety) in mind, why is it important that the example below does not compile?

```{code-cell}
:tags: [raises-exception]
Box<IAnimal> box = new Box<Cat>();
```
```{exercise-end}
```



% Example of variance could be the Predicate interface from an exercise in the chapter on [abstract inject object composition](abstract-injected-object-composition:exercises:predicates). The variant type is always fed in, but never out.

%%```csharp
%%interface ICipher<in TIn, out TOut>
%%{
%%  public TOut Encode (TIn input);
%%}
%%```
%
%
%
%%```csharp
%%Derived d = new Derived();
%%Base b = new Base();
%%
%%// Example 1
%%IBox<Derived> derivedBox = new Box<Derived>(d);
%%IBox<Base> baseBox = derivedBox;
%%
%%// Example 2
%%IBox<Base> box = new Box<Derived>(d);
%%
%%// Example 3 (regular polymorphism to contrast, this is not the thing)
%%IBox<Base> different = new Box<Base>(d);
%%
%%
%%class Base {}
%%class Derived : Base {}
%%
%%interface IBox<out T>
%%{
%%  T Get ();
%%}
%%
%%class Box<T> : IBox<T>
%%{
%%  T x;
%%  // Constructor can still take T as input even thought IBox is covariant. Because constructors are not polymorphic and dynamically dispatched. Constructors are like static methods. Whenever we run them we know exactly what type we have.
%%  public Box (T x) => this.x = x;
%%  public T Get () => x;
%%}
%%```


% TODO: Example where when we go from two type parameters to one:

%IParent<Dog,Dog> id1 = new Identity<Dog>();
%IParent<Dog,Animal> id2 = new Identity<Dog>();
%IParent<Dog,Animal> id3 = new Identity<Animal>();
%
%interface IParent <in T1, out T2>
%{
%  T2 Transform (T1 input);
%}
%
%class Identity<T> : IParent<T,T>
%{
%  public T Transform (T x) => x;
%}
%
%class Animal {}
%class Mammal : Animal {}
%class Cat : Mammal {}
%class Dog : Mammal {}
