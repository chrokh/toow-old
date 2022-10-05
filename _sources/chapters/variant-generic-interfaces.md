# Variant generic interfaces

```{warning}
Work in progress.
```

% Example of variance could be the Predicate interface from an exercise in the chapter on [abstract inject object composition](abstract-injected-object-composition:exercises:predicates). The variant type is always fed in, but never out.

%% Pick up on ICipher with two arguments from generic-types chapter. This is a great example because one type is strictly in and one type is strictly out.
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
