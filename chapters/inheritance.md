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

# Inheritance

```{warning}
Work in progress.
```


## Motivation

Inheritance, in object oriented languages, tend to serve two purposes.

1. Inheritance is a mechanism that allows a subtype to either inherit or [override](overriding) instance members from its supertype.
2. Inheritance causes the subtype to be substitutable for the supertype in the sense of subtype polymorphism.

We have already discussed the benefits of subtype polymorphism in the chapters on [interfaces](interfaces) and [subtype polymorphism](subtype-polymorphism).
We have thus already dealt with the second point above, and will in this chapter therefore mostly focus on the first.
Namely, that of using inheritance to eliminate duplication by allowing subclasses to use code from its superclass.

Nevertheless, it is of *vital importance* to realize that these two purposes always go hand-in-hand.
Whenever we declare that a subclass inherits from a superclass, then we are always and without exception also declaring that the former is a subtype of the latter.

In other words, inheritance always leads to subtype polymorphism which means that we must take care not violate the [Liskov substitution principle](liskov-substitution-principle) or else we are in for a world of hurt.

```{danger}
Inheritance must *not* blindly be used for *code reuse* without respecting the rules of substitutability.
```


## Definition

Inheritance is a binary directed relationship between two (possibly [abstract](abstract-classes)) classes or [interfaces](interface-inheritance).
Similar to the terminology used in [subtype polymorphism](subtype-polymorphism) we refer to the two parties as sub/child/derived class/type and super/parent/base class/type.
The subclass inherits both type and members from its superclass.
We'll discuss abstract classes in a separate chapter.

To declare that a class is a subclass of another class in C# we use the same syntax as we use when declaring that the class implements some [interface](interfaces).
In other words, we write a colon (`:`) after the class name and then the name of the superclass.
In the example below, we declare that the class `Child` inherits from the class `Parent`.

```{code-cell} csharp
class Parent { }
class Child : Parent { }
```

### Inheriting members

We've said that the subclass inherits all ([public or protected](access-modifiers)) members of the superclass.
What does this mean in practice?
In the code below the the subclass contains no instance members.
We do however declare that the subclass inherits from a superclass which does contain a public instance method.

```{code-cell} csharp
class Parent
{
  public void ParentMethod ()
    => Console.WriteLine("Implemented in parent.");
}

class Child : Parent { }
```

Since the superclass defines an instance method we can of course call that instance method on instances of that type.

```{code-cell} csharp
Parent parent = new Parent();
parent.ParentMethod();
```

However, since the subclass inherits from that superclass we can also call that instance method on all instances of the subclass.

```{code-cell} csharp
Child child = new Child(); // Note that this is the subtype!
child.ParentMethod();
```


### Inheriting types

We've also said that the subclass inherits the type of the superclass in the sense of [subtype polymorphism](subtype-polymorphism).
What does this mean?
It means that we can treat instances of the subclass as if they were instances of the superclass.
It means that we can let the compile-time type be the superclass and the run-time type be any subclasses of that superclass.

Given the two types `Parent` and `Child` that we defined above we can therefore assign instances of type `Child` to variables of type `Parent`.
Note how the compile-time type is the general type, while the run-time type is the special type in the code below.

```{code-cell} csharp
Parent child = new Child();
```


### Overriding

We've established that a subclass inherits all members from its superclass.
However, if a member in the superclass is marked as `virtual` then it is possible for the subclass to `override` that implementation.
Meaning, it is possible for the subclass to define its own specialized implementation for that member to use instead of the one defined by the superclass.

Starting from the same code as above, let's rewrite it so that the instance method in the superclass is marked as `virtual` so that we can `override` it in the subclass.

```{tip}
When overriding, what implementation is executed is determined by the *run-time type*.
```

```{code-cell} csharp
class Parent
{
  public virtual void OverriddenMethod ()
    => Console.WriteLine("Implemented in PARENT.");
}

class Child : Parent
{
  public override void OverriddenMethod ()
    => Console.WriteLine("Implemented in CHILD.");
}
```

If we instantiate a `Parent`, treat it as a `Parent`, and then call the instance method, we will execute the implementation defined in `Parent`.
Unsurprising.

```{code-cell} csharp
Parent parentAsParent = new Parent();
parentAsParent.OverriddenMethod();
```

What is also unsurprising, is that if we instantiate a `Child`, treat it as a `Child`, and then call the instance method, we will execute the implementation defined in `Child`.

```{code-cell} csharp
Child childAsChild = new Child();
childAsChild.OverriddenMethod();
```

However, what you might find surprising is that if we instantiate a `Child`, *but* treat it as a `Parent`, and then call the instance method, we will execute the implementation defined in `Child`.

```{code-cell} csharp
Parent childAsParent = new Child();
childAsParent.OverriddenMethod();
```

At first you might find this counter-intuitive.
But, this is the entire point of overriding.
Due to subtype polymorphism you can then treat all subclasses of the same superclass interchangibly, but whenever you call a method marked as `virtual` that has been overridden in the subclass then the specialized method in the subclass is the one that's being executed.
This behavior is also summarized in {numref}`tbl:inheritance:override`.

Remember, when overriding, what implementation to run is determined by the run-time type.

```{list-table} What implementation is executed depends on the run-time type in the case of overriding and the compile-time type in the case of hiding.
:header-rows: 1
:name: tbl:inheritance:override

* - Compile-time type
  - Run-time type
  - Executed implementation (overriding)
  - Executed implementation (hiding)
* - Parent
  - Parent
  - Parent
  - Parent
* - Child
  - Child
  - Child
  - Child
* - Parent
  - Child
  - Child
  - Parent
```

```{seealso}
It should be noted that in some languages, we don't mark what methods are virtual, we mark what methods are not virtual.
In C#, instance methods are non-virtual unless otherwise specified.
In Java, instance methods are virtual unless otherwise specified.
```



### Hiding

Before moving on we need to talk about a concept that isn't actually only related to inheritance, namely method hiding.
Let's say we have a method in a subclass with the same signature as one in the superclass and we mark the method in the subclass as `new` rather than `override`.
In this case we are *not* using overriding.
Instead we are using what is known as "hiding".
We say that the method in the subclass "hides" the method in the superclass.

In {numref}`tbl:inheritance:override` you can see how hiding is different from overriding.

```{tip}
When hiding, what implementation is executed is determined by the *compile-time type*.
```

Let's go through all the same examples as before.
This time however we will mark the method as `new` in the subclass.
Whether we mark the method in the superclass as `virtual` or not does not matter.

```{code-cell} csharp
class Parent
{
  public void HiddenMethod ()
    => Console.WriteLine("Implemented in PARENT.");
}

class Child : Parent
{
  public new void HiddenMethod ()
    => Console.WriteLine("Implemented in CHILD.");
}
```

If we instantiate a `Parent`, treat it as a `Parent`, and then call the instance method, we will execute the implementation defined in `Parent`.
Still, unsurprising.

```{code-cell} csharp
Parent parentAsParent = new Parent();
parentAsParent.HiddenMethod();
```

What is also still unsurprising, is that if we instantiate a `Child`, treat it as a `Child`, and then call the instance method, we will execute the implementation defined in `Child`.

```{code-cell} csharp
Child childAsChild = new Child();
childAsChild.HiddenMethod();
```

However, when we are hiding rather than overriding, instantiate a `Child` but treat it as a `Parent`, and then call the instance method, we will execute the implementation defined in `Parent`.
Remember, when hiding, what implementation to run is determined by the compile-time type.

```{code-cell} csharp
Parent childAsParent = new Child();
childAsParent.HiddenMethod();
```



% Example: Get rid of the foreach? Or is this perhaps not a great solution?

%- Including abstract classes.
%- UML class diagram notation.
%- White-box reuse (as opposed to black-box which is composition) (Gamma et al)
%- Object type (lowercase is an alias for the same as the uppercase). All classes inherit from object.
%- Forward ref to Subtype polymorphism
%- Overriding 


## Examples

%### TODO: Example that's not template method

(inheritance:examples:characterwise)=
### Characterwise ciphers

Remember how we've been unable to get rid of the duplicated `foreach` loop present in all the [substitution ciphers](methods:substitution-ciphers).
The only solution for  this that we've seen so far was given in the chapter on [methods](methods:substitution-ciphers).
In that chapter I suggested that without some form of polymorphism we often have to resort to turning part of our algorithms into data in order to keep increasing abstraction and thus remove duplication.

But in this book we're exploring object oriented programming, so we don't want to be forced to turn our algorithms into data.
We want to let our algorithms be algorithms.

In this example, we'll be able to remove the duplicated `foreach` loop from all substitution cipher classes that implement the interface `ICharToCharCipher`.
Meaning all substitution ciphers that have an encode method which works charwise and replaces each character with a single character.
The Robber's language does *not* fit that description, but Caesar ciphers and the Leet language do so let's use those two.

As alluded to in the motivation section however, it would in this case, as is often the case, be preferable to use composition over inheritance since that would allow us to eliminate all duplication.
But we'll switch to that solution in the chapter on [abstract injected object composition](abstract-injected-object-composition).

We've still got our interfaces from the chapter on [interfaces](interfaces:ciphers) but these don't really help us here.

```{code-cell} csharp
:tags: [hide-input]
interface ICharToCharCipher
{
  char Encode (char input);
}

interface IStringToStringCipher
{
  string Encode (string input);
}

interface ICharToStringCipher
{
  string Encode (char input);
}
```

Let us just first take stock of what the duplication looks like.
Pay special attention to the two implemented methods with the signature `string Encode (string input)` below.
Notice how both implementations are entirely the same.

Let's first have a look at the class `LeetCipher`:

```{code-cell} csharp
:tags: [hide-input]
class LeetCipher : ICharToCharCipher, IStringToStringCipher
{
  public string Encode (string input) {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }

  public char Encode (char input)
    => input switch {
      'L' => '1', '1' => 'L',
      'A' => '4', '4' => 'A',
      'O' => '0', '0' => 'O',
      'T' => '7', '7' => 'T',
      'E' => '3', '3' => 'E',
      _ => input
    };
}
```

Let's then have a look at the class `CaesarCipher`:

```{code-cell} csharp
:tags: [hide-input]
class CaesarCipher : ICharToCharCipher, IStringToStringCipher
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public string Encode (string input) {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }

  public char Encode (char input) {
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

Notice how the implementation of the method with the signature `string Encode (string input)` is *exactly* the same in both classes.
The only thing that's different is in what context the method is executed, which in turn determines which `char Encode (char input)` method is being called.

Again, if we at this point knew about the design principle [composition over inheritance](composition-over-inheritance) we would solve this using [abstract injected object composition](abstract-injected-object-composition).
But, let's take it one step at a time, and let's see what we can do with regular old inheritance first.

Here's the key.
Notice how the implementations of `string Encode (string input)` fulfill the interface `IStringToStringCipher` and depend on `ICharToCharCipher`.
It fulfills the first because the encode method itself is the only method required by that interface.
It depends on the second because the implementation of the encode method delegates to the other overload of `Encode` which takes and returns a character.

So, let's introduce a superclass called `CharWiseCipher` that implements both `IStringToStringCipher` and `ICharToCharCipher`.
We'll let this superclass behave like the [identity cipher](identity-cipher) that we also implemented in the chapter on [subtype polymorphism](subtype-polymorphism:identity-cipher).

In the identity cipher, the encode method that takes and returns a character will simply return whatever character we give it.
Similarly, the encode method that takes and returns a string ought to return whatever we give it.

However, instead of simply returning what we get we will choose to iterate over the input `string`, call the method `char Encode (char input)` for each character one by one, and concatenate the results into a `string` again.
Even though the method that receives and returns a `char` will always return the same `char`
In other words, the implementation of `string Encode (string input)` will be the one that we are trying to unify for the other classes.

But why would we do such a silly thing?
Isn't this just a waste of resources?
Why iterate over the input `string` if we're just going to call a method for each character that always returns the same character that we give it.
Well, because we're going to mark that silly method as `virtual`.
Which means that subclasses of `CharWiseCipher` can `override` our implementation of `char Encode (char input)`.
If they do, then it is no longer pointless for us to iterate over the string and delegate to the overridden method.

Let's look at some code.
Here's our superclass that behaves like the identity cipher.
Pay attention to how we use the keyword `virtual`.

```{code-cell} csharp
class CharWiseCipher : ICharToCharCipher, IStringToStringCipher
{
  public virtual char Encode (char input)
    => input;

  public string Encode (string input)
  {
    string output = "";
    foreach (char letter in input)
      output += Encode (letter);
    return output;
  }
}
```

Let's run it to make sure that it behaves like the identity cipher.

```{code-cell} csharp
CharWiseCipher identity = new CharWiseCipher();
identity.Encode('x');
```

Yup, when we pass it a `char`, we get the same `char` back.
How about a `string`?

```{code-cell} csharp
identity.Encode("Hello world");
```

Works too.
Ok, so we've got the superclass figured out.
Let's create some subclasses.

We'll start with `LeetCipher`.
Pay attention to how we use the keyword `override`.

```{code-cell} csharp
class LeetCipher : CharWiseCipher
{
  public override char Encode (char input)
    => input switch {
      'L' => '1', '1' => 'L',
      'A' => '4', '4' => 'A',
      'O' => '0', '0' => 'O',
      'T' => '7', '7' => 'T',
      'E' => '3', '3' => 'E',
      _ => input
    };
}
```

Hmmm.. does this really work?
Does this `LeetCipher` actually have a method that takes and returns a `string`?
Let's try it out.

```{code-cell} csharp
LeetCipher leet = new LeetCipher();
Console.WriteLine(leet.Encode("LEET 101"));
```

```{code-cell} csharp
Console.WriteLine(leet.Encode("E"));
```

As you can see, it actually works.
The `Encode` method that we've called is defined on the superclass but since our subclass inherits from the superclass we can also call the method on instances of the superclass.
Furthermore, since the `Encode` method calls the other `Encode` method which takes and receives a `char`, and since that method has been overridden in the subclass we get a cipher that no longer behaves as the identity cipher.

```{seealso}
This idea of having a base class with an instance method that uses another instance member that is often overridden in a subclass is known as the Template method pattern.
We'll talk more about [design patterns](design-patterns) in a separate chapter.
```

Pretty neat, no?
Now, let's try the `CaesarCipher`.
Same kind of drill here.

```{code-cell} csharp
class CaesarCipher : CharWiseCipher
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public override char Encode (char input)
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
CaesarCipher leet = new CaesarCipher(2);
Console.WriteLine(leet.Encode("ABC"));
```

```{code-cell} csharp
Console.WriteLine(leet.Encode('A'));
```

Lo and behold.
It works.


### Interface inheritance

Remember how we said that an interface can inherit from another interface?
Let me show you an example of that before we move on.
Let's say that we've got an interface called `IIncrementable` which requires that whoever implements declares an instance method with the signature `void Inc ()`.

```{code-cell} csharp
interface IIncrementable
{
  void Inc ();
}
```

Let's then say that we're creating another interface called `IAddable` which requires that whoever implements it declares an instance method with the signature `void Add (int y)`.
In addition to this however, the interface also inherits from the other interface `IIncrementable`.

```{code-cell} csharp
interface IAddable : IIncrementable
{
  void Add (int y);
}
```

If we now write a class called `Number` that claims to implement `IAddable` and try to only implement the method `Add` we will get a compilation error.

```{code-cell} csharp
:tags: [raises-exception]
class Number : IAddable
{
  int x = 0;

  public void Add (int y) => x += y;
}
```

Since `IAddable` inherits from the interface `IIncrementable`, `Number` must not only implement `Add` but also `Inc`.

```{code-cell} csharp
class Number : IAddable
{
  int x = 0;

  public void Inc () => x++;
  public void Add (int y) => x += y;
}
```


## Exercises

```{exercise}
What is inheritance?
Use your own words, give an example, and then implement that example.
```

```{exercise}
What is an abstract class?
Use your own words, give an example, and then implement that example.
```

```{exercise}
What is overriding?
Use your own words, give an example, and then implement that example.
```

```{exercise}
What is the difference between *overriding*, *overloading*, and *hiding*?
Explain in words and then show the difference by means of an example.
```

```{exercise}
Can the class `ReverseCipher` inherit from `CharWiseCipher`?
Why or why not?
```

```{exercise}
:label: ex:inheritance:robbers-cipher-charwisecipher
Can the class `RobbersCipher` inherit from `CharWiseCipher`?
Why or why not?

Hint: Perhaps the class should be called `CharToCharSubstitutionCipher` or `CharwiseCharToCharCipher`. Why is that?
```

```{exercise}
:label: inheritance:exercises:chartostringsubstitutioncipher
Think about your answer to {numref}`ex:inheritance:robbers-cipher-charwisecipher` and use our implementation of `CharWiseCipher` (which perhaps should be called `CharToCharSubstitutionCipher`) as inspiration for the following exercise.

Write a class called `CharToStringSubstitutionCipher` that implements the interfaces `ICharToStringCipher` and `IStringToStringCipher`.
`RobbersCipher` should inherit from this new class in a way that makes it possible to remove the method with the signature `string Encode (string input)` from `RobbersCipher`.
```

```{exercise}
Can an interface inherit from multiple interfaces?
Try it.
```

```{exercise}
Can we introduce an interface that inherits from all our three cipher interfaces?
What would such an interface mean?
How is it useful?
```


