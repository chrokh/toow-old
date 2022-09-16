(generics)=
# Generics

```{warning}
Work in progress.
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
