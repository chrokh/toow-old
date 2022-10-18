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

# Delegates

```{warning}
Work in progress.
```

## Motivation

% TODO: This first part should perhaps be moved to strategy pattern intro?
Verbs are just as important as nouns.
Functions are also values.
Functions have types, just like values have types.
The value `2` might have type `int` and the function `+` might have type `int -> int`.
We would read the latter as "int to int".
Or verbosely, we would say that the function `+` maps from `int` to `int`.

Delegates, in C#, can be viewed as a more compact implementation of strategy pattern.
Inversely, strategy pattern can be seen as a way to implement delegates in object oriented languages.

## Definition

A delegate, in C#, is a *type* whose values are methods.
Since we are talking about imperative programming, where functions are usually not [pure](purity), I will, as [previously discussed](methods), use the word "method" rather than "function".

If the values of a type are methods, then the type must define what these methods take as input and what they produce as output.
In other words, a delegate defines the method signature (including return type) that all members of the delegate type, meaning methods that belong to the type, share.
More verbosely, a delegate defines the return type and the parameter list of all values of that delegate type.

Since a delegate is a type and not a value, it has to gate can be defined directly in a [namespace](namespace), or as a member of a [class](classes).
We cannot define a delegate inside a method, just like how we cannot define a new class inside another method.
We can however define a new class inside a namespace or another class.

To define a delegate we use the keyword `delegate` then state the return type of the delegate type, followed by the name of the delegate type, which is finally followed by a parameter list.

```{code-cell} csharp
delegate int BinaryOperation (int x, int y);
```

We can then declare variables of this type like we would any other type.

```{code-cell} csharp
BinaryOperation op;
```

When assigning a value to a variable of our delegate type however, the value must be a method that satisfies the signature of the delegate type.
Let's, for example, say that we have two [local functions](local-functions) called `add` and `sub` which adds and subtracts integers.

```{code-cell} csharp
int Add (int x, int y) => x + y;
int Sub (int x, int y) => x - y;
```

These two methods could be considered values of the delegate type `BinaryOperation` that we've defined.
Why can they be considered members of that type?
Well, because they both take two parameters of type `int` as input, and both produce a single `int` as output.
Their types are `(int, int) -> int` which is the same type as the type that our delegate defined.
They belong to the set of members defined by the delegate type `BinaryOperation`.

This means that we can assign any of the two methods to variables of type `BinaryOperation`.

```{code-cell} csharp
BinaryOperation op1 = Add;
BinaryOperation op2 = Sub;
```

```{warning}
When assigning a method to a variable of a delegate type, we don't invoke the method.
Therefore there are no parenthases (and no argument list) following the words `Add` and `Sub` in the example above.
```


### Variance

Methods don't have to match the type of a delegate *exactly* in order to be considered members.
Like we learned in the chapter on [variance](variance), input types can be contravariant, and output types can be covariant.

This means that a delegate type that expects values of type `Cat` and produces values of type `Animal` also would consider a method that takes `Animal` (because of contravariance in input types) and produces values of type `Cat` (because of covariance in output types) a member of the type defined by the delegate.
Why does this work?
Well, because the method is a member of a subtype of the delegate.
Refer back to the chapter on the [Liskov substitution principle](liskov-substitution-principle) if this doesn't feel intuitive.

```{code-cell} csharp
class Animal {}                       // Supertype
class Cat : Animal {}                 // Subtype
delegate Animal MyDelegate (Cat cat); // Delegate type
Cat MyMethod (Animal a) => new Cat(); // Some method
MyDelegate op = MyMethod;             // Method is member of the delegate type
```


### Generic delegates

As we learned in the chapter on [generic methods](generic-methods), methods can also be generic.
Consequently, delegates can also be generic.

```{code-cell} csharp
delegate T BinaryOperation<T> (T x, T y);

int Add (int x, int y) => x + y;
bool And (bool a, bool b) => a && b;

BinaryOperation<int> op1 = Add;
BinaryOperation<bool> op2 = And;
```


(delegates:multicast)=
### Multicast delegates

Multiple delegates values, in C#, can be combined into a single delegate value.
This is, in C#, known as "multicast delegates".

```{code-cell} csharp
delegate void Operation ();

void Print1 () => Console.WriteLine("hello");
void Print2 () => Console.WriteLine("world");

Operation op1 = Print1;
Operation op2 = Print2;
Operation both = op1 + op2;
```

When invoking the delegate, all methods in the multicast delegate are executed in sequence, and the value of the last method in the delegate is returned.

```{code-cell} csharp
both();
```

```{note}
If you happen to be famililar with function composition you might want to know that multicast delegates unfortunately do not behave like composition.
It seems reasonable to assume that multicast delegates is a feature that exists to simplify the act of adding event handlers.
But more on that in the chapter on [events](events).
```

We can also use the `+=` operator to the same effect.

```{code-cell} csharp
Operation op = Print1;
op += Print2;
```

(func-and-action)=
### Built-in delegate types

.NET has a few built-in delegate types.
Most notable are the `Action` and `Func` types.
I say types not type, because there are versions of the types defined for parameter list lengths from 0 all the way up to 16 parameters.

The types called `Action` can be used to declare delegates that take some number of arguments and don't return a value, or in other words that returns `void`.
The types called `Func` can be used to declare delegates that take some number of arguments and return some value.

So in the examples that we've seen so far we didn't really need to define our own delegates.
Instead we could have simply used the built-in types.

```{code-cell} csharp
Func<int,int,int> op1 = Add;
Func<int,int,int> Op2 = Sub;
Func<bool,bool,bool> Op3 = And;
Action op3 = Print1;
```

```{seealso}
See the documentation for more information on the various versions of [Func](https://learn.microsoft.com/en-us/dotnet/api/system.func-2?view=net-7.0) and [Action](https://learn.microsoft.com/en-us/dotnet/api/system.action?view=net-6.0) respectively.
```

%## Closures
%Instance methods can be assigned to delegates.
%Num num1 = new Num(10);
%Func<Num> neg = num1.Neg;
%
%Num num2 = neg();
%
%Console.WriteLine(num1.n);
%Console.WriteLine(num2.n);
%
%class Num
%{
%  public int n { get; private set; }
%  public Num (int n)
%    => this.n = n;
%  public Num Neg ()
%    => new Num(-n);
%}





## Exercises

```{exercise}
What are delegates and why are they useful?
```

```{exercise}
It could be argued that strategy pattern and delegates solve the same problem (albeit in syntactically different ways).
How so?
```

```{exercise}
Come up with your own example of where delegates could be useful and implement it in code.
```

```{exercise-start}
```
Rewrite the class `ConditionalCipher` from {numref}`ex:generic-types:conditional-cipher` so that the predicate is passed as a delegate.
You can choose whether to write your own predicate type, or use the built-in types `Func<T,TResult>` or `Predicate<T>`.

We should be able to use the conditional cipher as follows.
Let's say that we declare a method that we want to use as a predicate, assign that method to a delegate, and then pass it to the constructor when instantiating a cipher.
```{code-cell} csharp
:tags: [hide-input]
interface ICipher<TIn,TOut>
{
  TOut Encode (TIn input);
}

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
```{code-cell} csharp
:tags: [remove-input]
class ConditionalCipher<T> : ICipher<T,T>
{
  ICipher<T,T> cipher;
  Func<T,bool> pred;

  public ConditionalCipher (ICipher<T,T> cipher, Func<T,bool> pred)
  {
    this.cipher = cipher;
    this.pred = pred;
  }

  public T Encode (T input)
    => pred(input) ? cipher.Encode(input) : input;
}
```
```{code-cell} csharp
bool IsUpper (char c) => Char.IsUpper(c);
Func<char,bool> isUpper = IsUpper;
ConditionalCipher<char> cipher = new ConditionalCipher<char>(new LeetCipher(), isUpper);
```
If we now execute the conditional cipher it should only run the composed cipher if the predicate happens to be true for the input.
```{code-cell} csharp
Console.WriteLine( cipher.Encode('E') );
```
If the predicate isn't true for the input value then we simply get back the same input as output.
```{code-cell} csharp
Console.WriteLine( cipher.Encode('e') );
```
```{exercise-end}
```


% TODO: Add exercise that generalizes IncrementingCaesarCipherFactory and DecrementingCaesarCipherFactory from the chapter on generic variant interfaces. Use delegates instead of hard-coding the operation to perform on the int.


%--------------


% TODO: USE THE STUFF BELOW?

% Include generic delegates if this is not it's own chapter.

% Arguably, strategy pattern and dependency injection exists since functions are usually not first class citizens in object oriented languages.

%- Example: Use delegate version of `Predicate` instead of `IPredicate<T>` that we saw in [generics](generics) and [abstract injected object composition](abstract-injected-object-composition).
%- Implement the method that repeatedly applies ciphers using delegates instead. See the chapter on [subtype polymorphism](subtype-polymorphism).



%```csharp
%int Inc (int x) => x + 1;
%Func<int, int> f = Inc;
%Func<int, int> g = (int x) => x + 1;
%```

% Defer pattern matching part in chapter on pattern matching chapter.
% This is a sensible alternative to the NullObject pattern which is less flexible because there you need to bundle data with the use case of what happens when you want to extract the data. Then again that argument is at the heart of the OOP vs FP debate.
% Also show how this can be written in terms of strategy pattern / dependency injection.

%```csharp
%// Applying a function
%var m1 = new Just<int>(10);
%Maybe<string> m2 = m1.Map(x => x.ToString());
%
%// Pattern matching
%string toString (Maybe<string> maybe) =>
%  maybe switch
%  {
%    Just<string> just => just.Value,
%    _ => "",
%  };
%Console.WriteLine(toString(new Just<string>("hello")));
%Console.WriteLine(toString(new Nothing<string>()));
%
%// Applying an action
%var just = new Just<int>(10);
%just.Map(x => Console.WriteLine(x));
%
%
%abstract class Maybe<A>
%{
%  public abstract Maybe<B> Map<B> (Func<A, B> f);
%  public abstract Maybe<A> Map (Action<A> f);
%}
%class Just<A> : Maybe<A>
%{
%  public A Value { get; private set; }
%  public Just(A val) => Value = val;
%  public override Maybe<B> Map<B> (Func<A, B> f)
%    => new Just<B>(f(Value));
%  public override Maybe<A> Map (Action<A> f)
%  {
%    f(Value);
%    return this;
%  }
%}
%class Nothing<A> : Maybe<A>
%{
%  public override Maybe<B> Map<B> (Func<A, B> f)
%    => new Nothing<B>();
%  public override Maybe<A> Map (Action<A> f)
%    => this;
%}
%```



%```csharp
%class Program
%{
%  delegate bool Bin (bool a, bool b);
%
%  static bool And (bool a, bool b) => a && b;
%
%  public static void Main ()
%  {
%    Bin a = (bool a, bool b) => a && b;
%    Bin b = And;
%
%    // Does not compile since f is of a different type.
%    Func<bool, bool, bool> f = (bool a, bool b) => a && b;
%    Bin c = f;
%  }
%}
%```

