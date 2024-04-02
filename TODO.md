# The new todo list

- Simple: Default interface methods chapter: should not start from -1.
- Interface default methods. **I have not covered how default methods can be overridden in subclasses.** Code example:
    ```csharp
    ISequence seq = new NaturalNumbers();
    seq.Take(3);
    seq.Take(3);
    Console.WriteLine(seq.Next());

    interface ISequence
    {
        int Next();

        int[] Take(int n)
        {
            int[] result = new int[n];
            for (int i = 0; i < n; i++)
                result[i] = Next();
            return result;
        }
    }

    class NaturalNumbers : ISequence
    {
        private int n = 0;

        public int Next() => n++;

        public int[] Take(int n)
        {
            int x = -1;
            int[] result = new int[n];
            for (int i = 0; i < n; i++)
                result[i] = x++;
            return result;
        }
    }
    ```
- Replace example in base keyword chapter with example from base keyword lab.
- Fragile base class problem must be part of the book.
- The order should be: classes
    - fields
    - instance methods
    - access modifiers
    - the `this` keyword
    - constructors (because we can set initial state)
    - encapsulation (because now we can talk about it properly).
- Some of the early labs use static methods but should use local functions.
- **A MUCH BETTER EXAMPLE FOR THE FIRST GENERICS CHAPTER IS THE ONE I USED IN THE LECTURE. Board and card games: Pair of Cards and DiceRolls. Backgammon, Hold em, and Craps.**
- It's possible to create infinite loop with Computed Properties. See old Properties chapter. Add this.
- Is this true?: Variance in delegates is only applicable to reference types. Value types like structs do not exhibit variance.
- I'm pretty sure UML class diagram stuff is better introduced piece by piece in their respective chapters. But then we would need a single chapter that gives a brief introduction to the concept I suppose?
- Generic supertypes chapter should also discuss interface inheritance. We should also follow the much more logical structure of the OOP2 slides on the chapter. It simplifies the flow.
- Event conventions should mention that On-prefix is NOT EVEN USED that old way in RxNET. Instead it is used the way it is used in e.g. JavaScript.
- Encapsulation should come after properties. First show what we can do, then explain WHY. Makes it simpler to explain encapsulation because we can use public get private set. NOT OBVIOUS. I am using the term encapsulation in the auto properties chapter.
- The point about generic delegates and classes that's being made in the chapter on Generic Delegates should be in the chapter on Delegates.
- Observables and Events should be covered AFTER iterator pattern and Enumerable. Because that would allow us to talk about Rx.NET brings LINQ to observers.
- The covariance, contravariance, and invariance chapters never deal with non-generic subtypes: Covariance permits a method to return a type that is derived from the original return type.
- Should Robustness principle be moved into its own chapter? See old longer version in old/liskov-substitution-principle.md
- Split the variance chapter in two? Covariance and Contravariance?
- Relate LINQ to strategy pattern and relational algebra?
- Should labs be included in the book? No, right?
- Using directive! (imports)
- Reading input.
- Default values (of data types) (länkat: default-values).
- Are lambdas simply syntactic sugar?
- Coupling.
- Data structures.
- RTFM.
- Replace UML diagram in patterns chapters!
- Add Key point boxes to Strategy and Bridge chapters.
- The word built-in should not have a hyphen. Inconsistent usage.
- Optional parameters.
- Should we always link to the docs when discussing classes like EventArgs, List, etc?
- Boilerplate code.
- Should subsection on Event conventions be its own chapter?
- Null reference exceptions. Have linked these to exceptions chapter.
- Local functions should be PascalCase not camelCase.
- Local functions should mention terminology: unary, binary, ternary, etc.
- Perhaps the mermaid example should be extracted from the chapter on composition over inheritance to a new chapter called 'Substitutability'?
- Encapsulation chapter: "Encapsulate what varies".
- 'hard-coding'.
- Static method overloading.
- Namespace without curlys. [All types in file in same namespace](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/namespaces). In classes chapter?
- Note about RTFM very early on.
- `void` in Methods chapter.
- `+=`, `++` (both pre and post increment)
- Syntactic sugar. The term. Used in e.g. fat arrows. Suggestion: Right before ++ += ?
- `Write` not `WriteLine` => Hello world chapter?
- Target-typed new expressions: `Car car = new()`.
- String interpolation + concatenation
- String methods such as `.Length` (must come before reference types chapter).
- It's not mentioned in Instance Methods chapter that an instance method can call another instance method.
- Examples of instance methods that you can call on objects. From .NET.
- The term .NET.
- String methods such as IndexOf, Substring, etc. Must have talked about overloading before. Should this simply be a chapter on reading the documentation of classes?
- The terms framework and library.
- .NET Framework Class Library (FCL). Mentioned in [static methods](static-methods).
- When to introduce the meaning of "keyword"? Introduced in syntax chapter no?
- DRY? Before functions? After iteration?
- When to discuss that variables are [initialized to default value](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/variables)?
    - https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/default-values#default-value-expressions
- When do I discuss the different [types of variables](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/variables#928-local-variables)?
- Truncation (int x = 10/3)?
- Right or left associativity of operators.
- Top-level statements
- Static typing and type systems?
- Semantics
- Paradigm
- Encapsulate what varies. (Not discussed in encapsulation chapter. Also note that chapter on Auto-implemented properties say that we will discuss why properties don't always grant sufficient encapsulation. Deal with in same chapter?)
- Parallell between subroutine/procedure and static methods? Procedural programming.
- Method signatures not discussed in chapter on static methods.
%- Method signature (includes return type in the context of [delegates](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/), but not in the context of overloading).
- Early returns. Could be its own chapter? E.g. searching in arrays.
- Methods are usually verbs. Mention first in local functions chapter?
- Documentation comments.
- Show compiler errors when:
    - calling non-existant method.
    - calling with wrong number of arguments.
    - calling with incorrect type of arguments.
    - using returned value as wrong type.
- Is string interpolation syntactic sugar for `String.Format`? If so then mention this example in static methods chapter.
- Scopes. Named scopes. Relates to namespaces. [See e.g.](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/basic-concepts)
- There's a lot of nuance in the old chapter on subtype polymorphism. Spread it in different places?
- Order of execution: Field initializers vs constructors. Matters?
- Reading type signatures in C# errors. Like when you say try to instantiate a class that has a constructor that takes parameters, but without passing parameters. `Car.Car(string, string)`.
- String.Join used in abstract classes chapter. Introduce where?
- The Everything is an object chapter must also discuss how classes implicitly inherit from `object`.
- Debugging? Debugger in Visual Studio? How to read compiler errors? How to read stack trace upon exceptions?
- UML Class diagrams multiplicity (p. 34 [specification](https://www.omg.org/spec/UML/2.5.1/PDF)).
- `ref` keyword. In reference types chapter? See e.g. [generic swap method](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/generic-methods).
- Type checking chapter, add terminology: static type safety, static type-checking, compile-time type-checking. Almost all references to type safety are linked to the type-checking chapter.
- Overriding ToString(). Everything is an object?
- Dynamic keyword. It's used in chapter on Generics and type errors.
- The table comparing hiding and overriding should also compare interface default implementations.

## Smaller todos

- The example of a star being a composition of two rotated triangles.


# TODO

- IMPORTANT
  - ICharCipher should be char -> char not char -> string. This makes it MUCH easier to make good points in regards to dependency injection and in terms of generics.
  - (!!!!) Replace all 404 images with placeholder images as in chapter on generics e.g.
- CONTEMPLATE
  - Harmonize subchapter of chapters:
    0. Executive summary
    1. Motivation (problem)
    2. Definition
    3. Examples
    4. Exercises
- General
  - Add a license. Ex: https://creativecommons.org/licenses/by-nc-nd/4.0/
  - Links to official documentation like in the [Type Systems](type-systems) chapter?
  - Add "decode" method to all usages of Caesar cipher. This is important because it helps students think about reusability.
  - Static interface methods? https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/static-virtual-interface-members
  - Separation of concerns. First mentioned in static methods chapter.
- Interfaces
  - "Default interface methods"
    - https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-8.0/default-interface-methods
    - https://en.wikipedia.org/wiki/Trait_(computer_programming)
    - https://scg.unibe.ch/archive/papers/Scha03aTraits.pdf
- Subtype polymorphism
  - **More about replace conditional with polymorphism?**
  - Extract intro part on polymorphism from Subtype polymorphism chapter into its own chapter?
  - Refer to Types and Programming Languages by Benjamin Pierce, chapter 22 on polymorphism. Defines substitution.
- Data types
  - Should discuss Reflection?
  - Expand discussion in Data Types chapter on why treating Nullable warnings as errors is a good idea and that this should be the default.
  - Have I emphasized the importance of null reference static analysis enough?
- Compilation
  - Compiler warnings in Compilation chapter.
  - P. 49, section 4.3 of Types and Programming Languages. Bejamin Pierce. Image on how we go from characters on a file to a program that's being printed on screen.
- Indirect object composition
  - Relate to Inversion of Control (IoC).
- Object composition
  - Clarify that we are not talking about merely instantiating another object in an instance method but rather storing an object as an instance variable (meaning as a property or in a field).
  - Perhaps discussion on Dependency should be its own chapter? How does this relate to how we use the term dependency in the context of coupling?
  - "Constructed" could mean that you call someone who constructs. If the thing you call to construct is constructed in you then it's still a "hard" dependency.
  - Use term "collaborator".
- General
  - Reintroduce error code in prefix of printed errors.
  - There is no information on what "keyword" means.
- Sets
  - Perhaps "business objects" is a poor choice of words.
- Variables
  - Variables chapter missing image placeholders.
- Type-checking
  - On the purpose of types: http://www.cse.chalmers.se/edu/year/2011/course/TIN321/lectures/proglang-07.html
  - More about Type Safety. How even addings strings and ints is type safe in some languages. It all depends.
    - Admit that there are multiple definitions. In e.g. the documentation on [Generics] (https://learn.microsoft.com/en-us/dotnet/standard/generics/) they say that generics increase type safety when comparing to non-generic collections like ArrayList. Here they are using the definition that would consider dynamic languages non-type safe. But there is also the definition that leads to treating dynamic langauges (or even almost all) as being type safe. The latter is more about memory safety. Type safety I guess should be its own chapter.
    - Referera till Types and Programming Languages, Benjamin Pierce. 8.3. sid 95. Safety = Progress + Preservation.
    - Makes more sense if we divide it into compile-time type safety and run-time type safety. This makes the concept of unsafe much more sensible. It also makes the concept of uni-typed much more sensible since we can talk about compile-time uni-typed and run-time uni-typed. Not sure what compile-time poly-typed + run-time uni-typed would mean though.
    - https://en.wikipedia.org/wiki/Type_system#Type_safety_and_memory_safety
    - https://web.archive.org/web/20211218122334/http://www.pl-enthusiast.net/2014/08/05/type-safety/
    - https://web.archive.org/web/20211124135419/http://www.pl-enthusiast.net/2014/07/21/memory-safety/
    - https://en.wikipedia.org/wiki/Type_safety
    - https://stackoverflow.com/questions/260626/what-is-type-safe
    - https://courses.cs.washington.edu/courses/cse341/04wi/lectures/26-unsafe-languages.html
    % Det korta svaret ang type safe är att ett språk som är type safe garanterar att alla program skrivna i språket är semantiskt väldefinierade. Om man t.ex. deklarerar en variabel utan att tilldela den ett värde och sen försöker använda den i C# (statiskt typat) så får man ett kompileringsfel. Om man gör samma sak i t.ex. Python eller Ruby (dynamiskt typat) så får man ett exception. Oavsett om det är ett run-time eller ett compile-time fel så är det ett språk som definierats av språket i förhand. Om det inte finns en definition i språket så är det programmet inte väldefinierat och detta
    - https://nddoornekamp.medium.com/typing-static-or-dynamic-strong-or-weak-safe-or-unsafe-f2fbca7182f6
- Type systems
  - Strong vs weak
- Labs
  - Brute-force hangman. Computer does guessing. You input how long the word should be and the program already has a word list stored.
  - Smart hangman. Like simple hangman but guessing computer uses word list and probability theory to make the best guesses.
- IDisposable. Used in e.g. Subscribe method of .NET IObservable.

```csharp
class CaesarCipher : ICipher<char,char>
{
  int steps;
  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  public CaesarCipher (int steps) => this.steps = steps;
  public char Encode (char input)
  {
    int index = alphabet.IndexOf(Char.ToUpper(input));
    if (index == -1) return input;
    int newIndex = (index + steps) % alphabet.Length;
    if (Char.IsUpper(input))
      return alphabet[newIndex];
    else
      return Char.ToLower(alphabet[newIndex]);
  }
}
```

- Benefits of constructors are very similar to partial application when we send in data through the constructor. Our data depends on the state of the object. Being able to store some data in an instance and then use objects of the same type interchangably at runtime. For example instantiating caesar ciphers with multiple different steps, passing them around, and then switching between them.
