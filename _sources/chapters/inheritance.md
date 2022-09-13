(inheritance)=
# Inheritance


```{warning}
Work in progress.
```

%- Including abstract classes.
%- UML class diagram notation.
%- White-box reuse (as opposed to black-box which is composition) (Gamma et al)
%- Object type (lowercase is an alias for the same as the uppercase)
%- Forward ref to Subtype polymorphism
%- Overriding 

% ## Interface inheritance
%
%Remember how we said that an interface can implement another interface?
%Let me show you an example of that before we move on.
%Let's say that we've got an interface called `IIncrementable` which requires that whoever implements declares an instance method with the signature `void Inc ()`.
%
%```csharp
%interface IIncrementable
%{
%  void Inc ();
%}
%```
%
%Let's then say that we're creating another interface called `IAddable` which requires that whoever implements it declares an instance method with the signature `void Add (int y)`.
%In addition to this however, the interface also requires that you implement the other interface `IIncrementable`.
%
%```csharp
%interface IAddable : IIncrementable
%{
%  void Add (int y);
%}
%```
%
%If we now write a class called `Number` that claims to implement `IAddable` and try to only implement the method `Add` we will get a compilation error.
%
%```csharp
%class Number : IAddable
%{
%  int x = 0;
%
%  public void Add (int y) => x += y;
%}
%```
%
%```output
%error CS0535: 'Number' does not implement interface member 'Incrementable.Inc()'.
%```
%
%Since `IAddable` inherits from the interface `IIncrementable` 
%
%```csharp
%class Number : IAddable
%{
%  int x = 0;
%
%  public void Inc () => x++;
%  public void Add (int y) => x += y;
%}
%```
