(liskov-substitution-principle)=
# Liskov substitution principle

```{warning}
Work in progress.
```

- TODO: Circle-ellipse problem is a great example and very important since it is so common. Use it! [https://en.wikipedia.org/wiki/Circle–ellipse_problem]
- TODO: Source for the keynote.


---------


When writing programs in a language with a type system that supports subtyping it is of vital importance that all of our subtypes respect the rules that are set by their supertypes.
If subtypes do not behave according to the specification set by their supertypes, then we cannot safely use subtypes where supertypes are expected without running the risk of unexpected behavior or errors occurring at run-time.


```{code-cell}
// Compiles, but does not make sense.
class Animal { string Name; }
class Fruit : Animal {}
```

## Definition

In an influential keynote adress Barbara Liskov informally proclaimed that substitutability ought to be a property defined so that when subtypes are used instead of supertypes this should not "break" the program.
The concept was later refined in a publication by {cite:t}`liskovAndWing1994`.

```{epigraph}
Let $P(x)$ be a property provable about objects $x$ of type $T$. Then $P(x)$ should be true for objects $y$ of type $S$ where $S$ is a subtype of $T$.

-- {cite:p}`liskovAndWing1994`
```

This view on subtyping has become known as "behavioral subtyping" or "strong behavioral subtyping".
It is also popularly referred to as simply the "Liskov substitution principle", which is why we've named this chapter that.

The principle stipulates some type rules and some behavioral rules.
All or some of the type rules are implemented by compilers, while the behavioral rules are difficult to implement by compilers.

```{seealso}
If you want to understand more about how the behavioral rules could be implemented by compilers I recommend that you read more about [Design By Contract](https://en.wikipedia.org/wiki/Design_by_contract) and Dependent Types.
```


(robustness-principle)=
### Robustness principle

The quote below is known as the Robustness principle, or Postel's laws after Jon Postel {cite:p}`postel1980` used the wording in a specification of TCP.
While not originally stated in a way related to variance, it is a very common saying used to explain variance.
The principles states:

```{epigraph}
[B]e conservative in what you do, be liberal in what you accept from others.

-- {cite:t}`postel1980`
```

The principle suggested that one should be liberal in what data one accepts from others if their intentions are clear.
However, one should simultaneously take great care not to give others incorrect data.

In terms of variance, this means that we should be *contravariant when receiving input*, and *covariant when producing output*.

In other words, if I claim to be a subtype of some type then whenever I receive input in an instance method, then I should at least be able to handle all kinds of input that my supertype can handle.
But I can of course also be able to handle *more* kinds of input.
I'm liberal in what I accept.
I'm contravariant in input.

% TODO: Insert subset/superset figure here?

On the flipside, if I claim to be a subtype of some type then whenever I return output from an instance method, then I should only ever return the kind of input that my supertype returns.
But if I want to I might of course return an even *narrower* set of output.
I'm conservative in what I send.
I'm covariant in output.

This maps exactly to the idea of behavioral substitutability.
So imprint this saying in your mind, and return to it, whenever you get confused on this journey into the world of substitutability.

Conveniently, we will, in the chapter on [variant generic interfaces](variant-generic-interfaces) see that the keyword in C# to specify covariance is `out` (as in "output") while the keyword for contravariance is `in` (as in "input").
So as long as you remember the Robustness principle, remember which keyword does what, should be dead simple.



### Type rules

The Liskov substitution principle stipulates the following three type rules.

1. Subtype method parameter must be *contravariant*.
2. Subtype method return types must be *covariant*.
3. Subtype exceptions must all be the same type or subtypes of exceptions in the supertype.

Remember the robustness principle?
Well, the first two points are basically that principle again.

*Contravariant method parameters* means that instance methods in the subtype must have the same method parameter types as those in the supertype, or more general types.
Meaning that the input types in the subtype must either be the same as those in the supertype or a generalization of the types accepted in the supertype.

If a method parameter type is a generalization of a method parameter type used in the supertype then the subtype will be able to handle all possible input types that can be sent to the supertype since the type used in the subtype is more general.
The subtype will never reject an input type that is supported in the supertype.
The subtype will thus never reject input types in a way that is surprising to a user of the subtype who only knows about the supertype (meaning where the compile-time type is the supertype and the run-time type the subtype).

TODO: Insert figure here?

*Covariant method return types* means that instance methods in the subtype must have the same return types as those in the supertype, or more specialized types.
Meaning that the output types in the subtype must either be the same as those in the supertype or a generalization of the types returned from the supertype.
If a method return type is a specialization of a method return type used in the supertype then the subtype will never return values of a type that is surprising for a user of the subtype who only knows about the supertype (meaning where compile-time type is the supertype and the run-time type the subtype).

TODO: Insert figure here?

The *no new exceptions* rule, means that all exceptions may be thrown in the subtype must be of the same type or a subtype of the exceptions expected from the supertype.
If a method never throws an exception that isn't a subtype of an exception expected from the supertype, then the subtype will never throw an exception that is surprising for a user of the subtype who only knows about the supertype (meaning where the compile-time type is the supertype and the run-time type the subtype).


### Behavioral rules

The Liskov substitution principle stipulates the following four behavioral rules:

- Preconditions cannot be stronger in the subtype.
- Postconditions cannot be weaker in the subtype.
- Single-state invariants must hold in subtype.
- Multi-state invariants must hold in subtype (a.k.a.: the "history rule").

Preconditions, postconditions, and invariants are terms used when discussing the formal specification of programs.
Meaning, when we use formal logic to describe the contract of a section of a program such as a method.

```{seealso}
Some languages have native support formal specification while others such as C# have extensions (such as [Spec#](https://www.microsoft.com/en-us/research/project/spec/)) that provide more compile-time and run-time support for verifying a formal specification.
The Liskov substitution principle does however not stipulate that you use such tools.
The principle merely uses that terminology to define what substitutability ought to mean.
```

*Preconditions* are predicates that must be true before a method is allowed to be executed.
A predicate is a logical statement about something which is either true or false.
If the precondition is not true, then the method is undefined.
In programming terms this could mean that if a method demands that you pass a positive integer but you pass a negative one, then it will throw an [exception](basic-exceptions).

*Postconditions* are predicates that must be true after a method has been executed.
If the postcondition is not true then the method is not a valid implementation of the specification.
In the case of, say, a method that returns the absolute value of a number, the returned value must be positive.

*Single-state invariants* are predicates that must hold true at all times within a type.
This could, for example, mean that the value of some instance variable never may fall outside of some defined bounds.

*Multi-state predicates*, are predicates that must hold true when applied to all pairs of states.
This could, for example, mean that the value of some instance variable always must remain the same or be incremented, but never decremented.


## Examples

### Violations in .NET

In the .NET framework there is a widely used, generic, interface called `ICollection<T>`.
We haven't talked about [generics](generics) yet, but I'm convinced that you'll be able to understand this example anyway.
So if you know nothing about generics, simply ignore the part in the type that says `<T>`.

The interface `ICollection<T>` ([documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.icollection-1?view=net-6.0)) captures the idea of a collection of things.
Examples of collections include lists, linked lists, sets, sorted sets, dictionaries, and so forth.
There's a lot of them.

Now, one method that is declared in the interface `ICollection<T>` is called `Add` ([documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.icollection-1.add?view=net-6.0)) and as you might suspect, the add method should add things to the collection.
But, does everyone who implements the interface `ICollection<T>` also support the `Add` method?
You would hope so, but no.

Suddenly we find a class called `ReadOnlyCollection<T>`.
What does read-only mean?
Well, usually it means that you cannot add things to it because it is only possible to read from it, but never write to it.
Right?

So, what interfaces does this read-only collection implement?
Surely, it couldn't implement the interface `ICollection<T>` since that requires it to specify an `Add` method.
Well, the world is full of violations of behavioral subtyping so indeed it does.
`ReadOnlyCollection<T>` ([documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.readonlycollection-1?view=net-6.0)) implements the interface `ICollection<T>` which demands that it specifies an `Add` method even though it cannot possibly do so since it is read-only.
So what does the poor read-only collection do?
Throws an exception.
Boom.
\*Facepalm\*.

Now, is this truly a violation of the Liskov substitution principle?
Not really, because I didn't tell you the whole truth.
It is a violation of the principle if the type rules of the interface specifies that the add method doesn't throw exceptions.
Alas, it does not.
In the documentation of the add method we can see that `NotSupportedException` is thrown if the collection happen to be read-only.

So, I sort of lied to you when I said that this is a violation of the Liskov substitution principle.
However, here's what I will say.
Just because we couldn't keep our hands out of the cookie jar of reusability and really wanted two things to be in a subtyping relationship we're now left with an interface which is *significantly* less useful than before.

The whole game of static typing is to (prefer compile-time over run-time errors)(prefer-compile-time-errors).
So what is more useful?
An interface whose implementers throw run-time exceptions or an interface whose implementers don't.
Why in the world would we give up compile-time type safety instead of just redesigning a hierarchy that, given behavioral subtyping, clearly doesn't make sense.
What an utterly unnecessary mess.

By the way, there is also the interface `IReadOnlyCollection<T>` which of course, as should be, does *not* subtype `ICollection<T>`.
So I would guess that the decision to let the concrete read-only class implement `ICollection<T>` is a purely pragmatic decision since the language designers wanted to make all the facilities that work on collections available for read-only collections.
Would I still argue that this is the wrong decision though.
Yes.
Doing the wrong thing and calling it pragmatism is a slippery slope.



### History rule

{cite:t}`liskovAndWing1994` gives an example of the three types `Incrementer`, `Doubler`, and `Multiplier` which all subtype the type `Counter`.
The multi-state invariant established by the supertype `Counter` is that the counter never decrements.

As you would imagine from the names of the subclasses, these all respect that multi-state invariant, meaning the "history rule", since they all are merely different ways of incrementing.
If we would create a new subtype called `Decrementor` or `Divider` that decremented the counter we would be violating the history rule.

```
Counter
Incrementer : Counter
Doubler : Counter
Multiplier : Counter
```











% TODO: Add simple figure showing the relationships. Adaptation from {cite:t}`liskovAndWing1994`.



%- LSP.
%- Similar to how Comment chapter argues that you cannot describe all semantic details with names only.

%- Be liberal in what you accept and conservative in what you send. Golden rule. There's also another principle-name for this.

%- Example: `string < char` or `char < string`. Follow up quick discussion from chapter on [generics](generics). Answer: SingleCharString < NonEmptyString < String. Output behaves covariantly, but input (in all but the constructor) is contravariant.

%- ReadOnlyCollection implements ICollection. Violation of LSP with exceptions.
%```csharp
%using System.Collections.Generic;
%using System.Collections.ObjectModel;
%
%IList<int> xs = new List<int>() { 1, 2, 3 };
%ReadOnlyCollection<int> ys = new ReadOnlyCollection<int>(xs);
%ICollection<int> zs = ys;
%xs.Add(4);
%//ys.Add(4); // Doesn't compile. Good.
%zs.Add(4); // Compiles, but throws exception. Bad.
%```
%- Another example like this is Array implements IList but throws NotImplementedException on Add.


%- Return type covariance IS supported in C# since 9.0!!! And is allowed by LSP. Parameter type contravariance is however NOT supported. However it is marked as under consideration in the [spec for C# 9.0](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-9.0/covariant-returns).
%Question is not whether you can return covariant values or not, a valid subtype is a valid subtype. The question is whether you can override a method and define that its return type is covariant and making that a valid subtype.
%
%```csharp
%class A {}
%class B : A {}
%class C : B {}
%
%abstract class Box
%{
%  public abstract B Get ();
%  public abstract void Set (B x);
%}
%
%abstract class SpecialBox : Box
%{
%  public abstract override C Get ();
%  public abstract override void Set (A x);
%}
%```
%
%Only `Set` gives a compiler error.
%
%```output
%error CS0115: 'SpecialBox.Set(A)': no suitable method found to override
%```
%
% Return type covariance is however only supported in inheritance, not in interface implementation.
%
%```csharp
%interface IBox
%{
%  B Get();
%}
%class MyBox : IBox
%{
%  public C Get() => new C();
%}
%```
%```output
%error CS0738: 'MyBox' does not implement interface member 'IBox.Get()'. 'MyBox.Get()' cannot implement 'IBox.Get()' because it does not have the matching return type of 'B'.
%```




%  - https://medium.com/@mwalkerwells/disjoint-union-intersection-relationships-with-flow-600b0cde9b32
%  - The figure drawn in the link above applies to methods in the sense that return types must be less specific in subtypes while input types must be more specific in subtypes.
%   - Start here: This is because functions are contravariant (wider) in input and covariant (narrower) in output. This is not a great explanation either since we can't actually swap out the input type for something more generic. It just expresses the constraints on the permissible behavior of the subtype.
%   - Properties are essentially pairs of methods which means that they must be invariant.
%  - In nominal subtyping it's probably most sensible to think of it in terms of 
% - Give examples of how LSP covariance, contravariance, and invariance rules can be violated by means of exceptions. This was mentioned in the chapter on subtype polymorphism.



%### Variance in C#
%
% PERHAPS CHOOSE AN EXAMPLE THAT IS NOT FUNCTOR (AND DOESN'T RELY ON DELEGATES) AND THEN GIVE THE FUNCTOR EXAMPLE FOR THOSE WHO ARE INTERESTED.
%
%C# only supports covariant return types in inheritance and not in interface implementation.
%This is unfortunate.
%Since, while it is cool that we can do the following:
%
%```{code-cell} csharp
%Box<int> box1 = new Box<int>(100);
%Box<int> box2 = box1.Map(x => x * 2);
%Console.WriteLine(box2.X);
%
%abstract class Functor<T1>
%{
%  abstract public Functor<T2> Map<T2> (Func<T1,T2> f);
%}
%
%class Box<T1> : Functor<T1>
%{
%  public T1 X { get; private set; }
%  public Box (T1 x) => X = x;
%  public override Box<T2> Map<T2> (Func<T1,T2> f)
%    => new Box<T2>(f(X));
%}
%```
%
%It would be more useful if we could use an interface rather than an abstract class since it would allow us to retain the possibility to inherit from something else.
%Remember that one of the drawbacks of [inheritance](inheritance) is that you only get to inherit from a single other class. Which means that we cannot also implement another interface this way, such as, say Applicative functor.
% This would be useful if it was possible to do covariant return types for interfaces. But alas we cannot.
%
%```{code-cell} csharp
%Box<int> box1 = new Box<int>(100);
%Box<int> box2 = box1.Map(x => x * 2);
%Console.WriteLine(box2.X);
%
%interface IFunctor<T1>
%{
%  IFunctor<T2> Map<T2> (Func<T1,T2> f);
%}
%
%class Box<T1> : IFunctor<T1>
%{
%  public T1 X { get; private set; }
%  public Box (T1 x) => X = x;
%  public Box<T2> Map<T2> (Func<T1,T2> f)
%    => new Box<T2>(f(X));
%}
%```



## Exercises

```{exercise}
What is the Liskov substitution principle?
```

```{exercise}
Why must exceptions in the subtype be subtypes (or the same type) of exceptions that can be thrown in the supertype?
```

```{exercise}
How does the Robustness principle (also known as Postel's law) relate to the Liskov substitution principle?
```

```{exercise}
Give your own example, in your own words, of a precondition violation.
```

```{exercise}
Give your own example, in your own words, of a postcondition violation.
```

```{exercise}
Give your own example, in your own words, of a single-state invariant violation.
```

```{exercise}
Give your own example, in your own words, of a multi-state invariant violation.
```

```{exercise}
In the chapter on [interfaces](interfaces:ciphers) we chose to use three interfaces (`ICharToCharCipher`, `ICharToStringCipher`, and `IStringToStringCipher`) instead of one (`ICipher`).
This decision was motivated by the Liskov substitution principle.
Use your own words to explain how.
```

```{exercise}
In the context of the Liskov substitution principle, how does adding more and more members to an interface impact the [modularity, reusability, and modifiability](maintainability:characteristics) of that interface?
```


## Video

Way back in 2017 I recorded a video lecture on the Liskov substitution principle which is embedded below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ObHQHszbIcE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

--------


%### (From old subtyping chapter) Nominal subtyping
%
%Remember how we, in the chapter on [type systems](type-systems), discussed that a type system is either nominal, structural or some combination of the two.
%If a type system is nominal, then subtyping is determined based on the fact that we declare that it is.
%In a structural type system however, subtyping is determined on the basis of the structure of different types.
%
%```{important}
%C# is a nominally typed language, and hence implements nominal subtyping.
%A subtype is a subtype if we nominally declare that it is.
%```
%
%Unfortunately, the existence of [exceptions](exceptions) means that it is quite simple to nominally declare that something is a subtype yet structurally violate the rules of, what is known as, "behavioral subtyping".
%More on this in the chapter on the [Liskov substitution principle](liskov-substitution-principle) (LSP).
%
%Type systems that implement structural subtyping often need to deal with whether or not to support both "width subtyping" and "depth subtyping".
%
%```{seealso}
%The static type checker [Flow](https://flow.org) for the language JavaScript is an example of a type system that supports both depth subtyping and width subtyping.
%```
%
%% TODO: "In a language with structural subtyping, a type U is a subtype of T if its methods and fields are a superset of T’s methods and fields. The interface of a class is simply its public fields and methods; there is no need to declare a separate interface type. In a language with nominal subtyping, on the other hand, U is a subtype of T if and only if it is declared to be. Accordingly, structural subtyping can be considered intrinsic, while nominal subtyping is declarative. Each kind of subtyping has its merits, but a formal model has not been developed for a language that integrates the two subtyping disciplines."
%% https://www.cs.cmu.edu/~aldrich/papers/ecoop08.pdf
%
%% TODO: "We say that T is a subtype of U (written T<:U) if all operations allowed on values of type U are allowed on values of type T."
%% https://www.ifazk.com/blog/2018-11-26-Bounded-field-typing.html
%% Discussed here: https://www.reddit.com/r/ProgrammingLanguages/comments/a1bfa7/depthsubtyping_and_mutation/
%
%% TODO: "In 1990, Cook, et al., proved that inheritance is not subtyping in structurally-typed OO languages.[2]" https://en.wikipedia.org/wiki/Structural_type_system
%
%
