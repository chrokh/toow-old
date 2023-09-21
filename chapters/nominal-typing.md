# Nominal typing

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
