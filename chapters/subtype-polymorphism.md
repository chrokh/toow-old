(subtype-polymorphism)=
# Subtype polymorphism


```{warning}
Work in progress.
```

%- Quickly get in to the cipher example.

%- Also discuss difference between compile-time types and run-time types or left-hand types and right-hand types.
%  - https://stackoverflow.com/questions/11634079/how-can-i-get-the-data-type-of-a-variable-in-c

%- Refer to Types and Programming Languages by Benjamin Pierce, chapter 22 on polymorphism. Defines substitution.

%- Design principle: Replace conditional with polymorphism

%- Can be achieved using:
%  - Interfaces.
%  - Inheritance:
%- Also known as:
%  - inclusion polymorphism.
%  - simply polymorphism in the context of OOP.
%- Relation to subtypes
%  - https://medium.com/@mwalkerwells/disjoint-union-intersection-relationships-with-flow-600b0cde9b32
%  - The figure drawn in the link above applies to methods in the sense that return types must be less specific in subtypes while input types must be more specific in subtypes.
%   - Start here: This is because functions are contravariant (wider) in input and covariant (narrower) in output. This is not a great explanation either since we can't actually swap out the input type for something more generic. It just expresses the constraints on the permissible behavior of the subtype.
%   - Properties are essentially pairs of methods which means that they must be invariant.
%  - In nominal subtyping it's probably most sensible to think of it in terms of 
%- Nominal vs structural subtyping
%  - Structural gives rise to:
%    - Depth subtyping
%    - Width subtyping
%- Tie back to discussion in [Data types](data-types) on run-time and compile-time types.

% "In a language with structural subtyping, a type U is a subtype of T if its methods and fields are a superset of T’s methods and fields. The interface of a class is simply its public fields and methods; there is no need to declare a separate interface type. In a language with nominal subtyping, on the other hand, U is a subtype of T if and only if it is declared to be. Accordingly, structural subtyping can be considered intrinsic, while nominal subtyping is declarative. Each kind of subtyping has its merits, but a formal model has not been developed for a language that integrates the two subtyping disciplines."
% https://www.cs.cmu.edu/~aldrich/papers/ecoop08.pdf


% "We say that T is a subtype of U (written T<:U) if all operations allowed on values of type U are allowed on values of type T."
% https://www.ifazk.com/blog/2018-11-26-Bounded-field-typing.html
% Discussed here: https://www.reddit.com/r/ProgrammingLanguages/comments/a1bfa7/depthsubtyping_and_mutation/



% "In 1990, Cook, et al., proved that inheritance is not subtyping in structurally-typed OO languages.[2]" https://en.wikipedia.org/wiki/Structural_type_system

