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

# Variance

```{warning}
Work in progress.
```

## Motivation

Having learned about subtype polymorphism we are now accustomed to the idea that a more specific type (such as a `Cat`) can be used in place of a more general type (such as an `Animal`).
We think of this as `Cat` being a subtype of `Animal` and of `Animal` being substitutable with `Cat`.

However, as soon as you use an instance of one type inside of an instance of another type (possibly through [object composition](object-composition)) we are forced to ask *how subtyping composes*.
This is the question of variance.
What are the subtyping rules for a type that uses instances of another type (possibly through object composition).

This has consequences for both subtyping of non-generic types (meaning the kind of types that we've talked about up to this point) and for generic types.

%However, as soon as you compose a in the case of instance method [overriding](overriding) and [generics](generics) (which we will soon talk about) substitutability is no longer this simple.
%The type of substitutability that we've described above is called `covariance`.
%The specific type can be used instead of the general type.
%It might sound surprising however that when we have a contravariant case, `Animal` can be used instead of `Cat`.
%The general type can be used instead of the specific.

In this chapter we will iron out the variance terminology.
We will then use this terminology in the chapters on [Liskov substitution principle](liskov-substitution-principle) and [variant generic interfaces](variant-generic-interfaces).


## Definition

If a type is used within another type as instance field, an instance property, as a parameter to an instance method, or as the return type of an instance method, then we would say that the first type *uses* the second.
[Object composition](object-composition) is a stronger claim since we then claim that the used object is stored in an instance field or an instance property.
If we simply say that one object *uses* another object we are merely claiming that objects of the first type, somehow, at some point, and for some time, might have access to instances of the second type.
The relationship between the user and the used may be ephemeral.

```{hint}
Variance deals with the questions of how subtyping composes.
```

If type `I` is using type `A`, in the sense above, then we say that `A` must be invariant, covariant, contravariant, or bivariant with respect to `I`.
This question regards whether a subtype of `I` also must contain items of type `A`, or if it can contain some subtype or supertype of `A`.

In the explanations below, we will refer to the type `I<*>` as the "container", where `*` is the type that it *uses*.
We will also use the term "general type" to refer to a supertype, and the term "specific type" to refer to a subtype when discussing the possible variant type.
Meaning the type used in the container.

Let's break down the terminology.

### Covariance
Covariance means that the usual ordering of types hold also in subtypes of the container.
Meaning that a subtype of the container may use a more *specific* type in place of the more *general* type.

Assume that we have the four types `A`, `B`, `I<A>`, and `I<B>`.
If `A` is a subtype of `B` (`A:B`) and if the type contained in `I` is *covariant*, then it must be true that `I<A>` is a *subtype* of `I<B>` (meaning `I<A>:I<B>`).

```
if  A:B  then  I<A>:I<B>
```

### Contravariance

Contravariance means that the usual ordering of types is inverted in subtypes of the container.
Meaning that a subtype of the container may use a more *general* type in place of the more *specific* type.

Assume that we have the four types `A`, `B`, `I<A>`, and `I<B>`.
If `A` is a subtype of `B` (`A:B`) and if the type contained in `I` is *contravariant*, then it must be true that `I<A>` is a *supertype* of `I<B>` (meaning `I<B>:I<A>`).

```
if A:B then I<B>:I<A>
```


### Variance

A type rule that is variant is a type rule that is either covariant, contravariant, or bivariant.

Assume that we have the four types `A`, `B`, `I<A>`, and `I<B>`.
If `A` is a subtype of `B` (`A:B`) and if the type contained in `I` is *variant*, then it must be true that `I<A>` is a subtype of `I<B>`, a supertype of `I<B>`, or both.

```
if A:B then (I<B>:I<A> or I<A>:I<B>)
```


### Bivariance

A type rule that is bivariant is *both* covariant and contravariant.

In other words, in subtypes of the container, the specific type can be used in place of the general type but the general type can also be used in place of the specific type.

This means that if we have `A:B` then we must have both `I<A>:I<B>` *and* `I<B>:I<A>`.



### Invariance

Invariance means that no ordering of types is respected.
The type rule is not variant and thus neither covariant nor contravariant.

Meaning that in subtypes of the container, the same type must be used as was used in the supertype.

This means that even if `A:B` it is neither permissible to state `I<A>:I<B>` nor `I<B>:I<A>`.


% GREAT IDEA: USE KIDS BLOCKS AND HOLES ANALOGY TO EXPLAIN VARIANCE. THESE ARE SOURCES AND SINKS. OUTPUT AND INPUT.

%Constructor is an exception from in=covariant/out=contravariant rule. Not really an exception. The rule doesn't apply. Because constructors are not polymorphic and dynamically dispatched. Constructors are like static methods. Whenever we run them we know exactly what type we have. There is no subtyping.

%Example: Subtyping a covariant list and then adding an item shows why it must be invariant. It both gets and sets. Is this something that should not be discussed here but rather in the chapter on generics and variance?

%https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)


## Example

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

% TODO: Insert superset/subset figure here.

On the flipside, if I claim to be a subtype of some type then whenever I return output from an instance method, then I should only ever return the kind of input that my supertype returns.
But if I want to I might of course return an even *narrower* set of output.
I'm conservative in what I send.
I'm covariant in output.

As we will see in the chapter on the [Liskov substitution principle](liskov-substitution-principle), this maps exactly to the idea of behavioral substitutability.
So imprint this saying in your mind, and return to it, whenever you get confused on this journey into the world of substitutability.

Conveniently, we will, in the chapter on [variant generic interfaces](variant-generic-interfaces) see that the keyword in C# to specify covariance is `out` (as in "output") while the keyword for contravariance is `in` (as in "input").
So as long as you remember the Robustness principle, remember which keyword does what, should be dead simple.


### Covariant return types

C# supports covariant subtypes, but not contravariant parameter types, in classes but not in interfaces.

In the example below we're declaring an abstract class called `CharToCharCipherFactory` with an abstract method with the signature `abstract ICharToCharCipher Make`.
Subclasses of the class must override the method and without covariance, meaning with invariance, they would have to declare that the method also returns something of type `ICharToCharCipher`.

Since C# however does support covariant return types, we can opt to let the overriding method return any subtype of `ICharToCharCipher`.
In the example below, we're declaring that the subclass `CaesarCipherFactory` returns values of type `CaesarCipher` rather than `ICharToCharCipher`.

```{code-cell} csharp
:tags: [hide-input]
interface ICharToCharCipher
{
  char Encode (char input);
}

class CaesarCipher : ICharToCharCipher
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + steps) % alphabet.Length;
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

```{code-cell} csharp
abstract class CharToCharCipherFactory
{
  public abstract ICharToCharCipher Make ();
}

class CaesarCipherFactory : CharToCharCipherFactory
{
  public override CaesarCipher Make ()
    => new CaesarCipher(1);
}
```




## Exercises

```{exercise}
Define the following terms:

1. Covariance.
2. Contravariance.
3. Invariance.
```

```{exercise}
How does variance relate to object composition?
```

```{exercise}
How does the Robustness principle (also known as Postel's law) relate to variance?
```

```{exercise}
What do we mean when we say that method input types is contravariant and method output types are covariant?
```

```{exercise}
Come up with your own example that uses a covariant return type and implement it in code.
```
