(liskov-substitution-principle)=
# Liskov substitution principle

```{warning}
Work in progress.
```

%- LSP.
%- Similar to how Comment chapter argues that you cannot describe all semantic details with names only.

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


% Covariant return types means that we can implement functors in C# using abstract classes:
%Box<int> b1 = new Box<int>(10);
%Box<int> b2 = b1.Map(x => x * 2).Map(x => x + 1000);
%Console.WriteLine(b1.X);
%Console.WriteLine(b2.X);
%
%```csharp
%abstract class Functor<T1>
%{
%  public abstract Functor<T2> Map<T2> (Func<T1, T2> f);
%}
%
%class Box<T1> : Functor<T1>
%{
%  public T1 X { get; private set; }
%
%  public Box (T1 x)
%    => X = x;
%
%  public override Box<T2> Map<T2> (Func<T1, T2> f)
%    => new Box<T2>(f(X));
%}
%```
% BUT this is not particularly useful. Since we don't have multiple inheritance and we've now occupied the "spot" for inheritance we can't make the type behave like other things, such as e.g. applicative functor. This would be useful if it was possible to do covariant return types for interfaces. But alas we cannot.



%  - https://medium.com/@mwalkerwells/disjoint-union-intersection-relationships-with-flow-600b0cde9b32
%  - The figure drawn in the link above applies to methods in the sense that return types must be less specific in subtypes while input types must be more specific in subtypes.
%   - Start here: This is because functions are contravariant (wider) in input and covariant (narrower) in output. This is not a great explanation either since we can't actually swap out the input type for something more generic. It just expresses the constraints on the permissible behavior of the subtype.
%   - Properties are essentially pairs of methods which means that they must be invariant.
%  - In nominal subtyping it's probably most sensible to think of it in terms of 
% - Give examples of how LSP covariance, contravariance, and invariance rules can be violated by means of exceptions. This was mentioned in the chapter on subtype polymorphism.


<iframe width="560" height="315" src="https://www.youtube.com/embed/ObHQHszbIcE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

