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


# Abstract classes

Abstract classes sit between interfaces and regular classes, providing a blend of characteristics that make them both unique and incredibly useful in certain scenarios.

An abstract class is a special type of class that cannot be instantiated. It works as a blueprint for other classes, providing a base from which other classes can inherit. Unlike an interface, an abstract class can contain both abstract (unimplemented) and concrete (non-abstract / implemented) members.

While interfaces can contain concrete [default methods and properties](default-interface-methods), an abstract class can also contain other concrete members like fields, events, and constructors much like a regular class.

Think of an abstract class as an incomplete blueprint that gives the general structure of an object but leaves some details for the inheriting classes to fill in.
An abstract class is declared using the `abstract` keyword.

```{admonition} Key point
An abstract class cannot be instantiated and can contain both abstract and concrete members.
It enforces a contract (like an interface) but also allows for base implementations (like a regular class).
%It provides a common structure for subclasses.
```

%Image: A sketch of a landscape with some parts fully painted and others just outlined.
%Caption: "Abstract classes are like a partially painted sketch, where the basic elements are defined (concrete members), but the inheriting classes need to fill in the rest of the details (abstract methods)."

%The purpose of an abstract class is to provide a common definition, a shared structure, that multiple derived classes can adhere to.

Consider a scenario where we're trying to model sequences of numbers. There are different types of sequences such as an incrementing sequence, a decrementing sequence, or even more complex sequences like Fibonacci or prime numbers. But all these sequences share a common trait: they progress from one number to the next. They all can be seen as a sequence where you can take a certain number of values from them.

Let's use an abstract class for this problem.
We start with an abstract class named `Sequence`.

```{code-cell}
public abstract class Sequence
{
    public int Current { get; protected set; }

    public abstract void Next();

    public int[] Take(int n)
    {
        int[] nums = new int[n];
        for (int i=0; i<nums.Length; i++)
        {
            nums[i] = Current;
            Next();
        }
        return nums;
    }
}
```

Here, `Sequence` is an abstract class with an implemented property `Current` and an implemented method Take. The method Next, however, is declared as abstract without an implementation. This is a placeholder method that any class inheriting from `Sequence` must implement.

Note that we can also add a constructor to our abstract class `Sequence`. As you might remember from the chapter on [constructors](constructors) this would however mean that we no longer have a parameterless constructor which in turn means that decedents of `Sequence` must call this constructor through [constructor chaining](constructor-chaining) using the `base` keyword. In this example we will choose to not add a constructor.

Because `Sequence` is an abstract class our code won't compile if we try to instantiate it:

```{code-cell}
:tags: [raises-exception]
new Sequence(1);
```

We can however create classes that inherit from `Sequence` and if these classes are concrete then we can instantiate them.
Let's create two concrete classes `IncrementingSequence` and `DecrementingSequence` that inherit from `Sequence`:

```{code-cell}
public class IncrementingSequence : Sequence
{
    public IncrementingSequence(int current)
        => Current = current;

    public override void Next()
        => Current++;
}
```

```{code-cell}
public class DecrementingSequence : Sequence
{
    public DecrementingSequence(int current)
        => Current = current;

    public override void Next()
        => Current--;
}
```

We can now use these classes to generate sequences:

```{code-cell}
IncrementingSequence incSeq = new IncrementingSequence(0);
DecrementingSequence decSeq = new DecrementingSequence(10);

Console.WriteLine(String.Join(", ", incSeq.Take(5)));
Console.WriteLine(String.Join(", ", decSeq.Take(5)));
```

This nicely illustrates the power of using abstract classes for shared functionality while allowing each class to define its own specific behavior. The `Take` method is common for all sequences, but the `Next` method is unique to the subclasses, defining its specific behavior.

```{warning}
If all members in an abstract class are marked as `abstract` we should prefer to use an [interface](interfaces) since there's usually no added benefit of using an abstract class. We do still get the downside of subclasses only being able to inherit from a single superclass though.
```

But why would we use an abstract class instead of an [interface](interfaces) or a regular [class](classes)? Here is a simple comparison:

- **Abstract classes** allow you to define some behavior (with implemented methods) and force subclasses to define other behaviors (with abstract methods). They are useful when we want to provide common functionality across a set of related classes, while also ensuring certain methods are customized in subclasses. A subclass can only inherit from a single superclass.
- **Interfaces** are best when we want to define a contract or capability that potentially unrelated classes should follow. Interfaces can have default implementations, but they don't support fields or constructors. If the primary purpose is to specify a contract that many possibly unrelated classes will implement, an interface is a better choice. Since a class can implement multiple interfaces, it allows for a form of multiple inheritance.
- **Regular classes** fully define both data and behavior of an object. A subclass can only inherit from a single superclass.

The two classes `IncrementingSequence` and `DecrementingSequence` are very simple, we could of course have built arbitrarily complex sequences and still let them inherit from `Sequence`. Have a look at the `FibonacciSequence` below for example.

```{code-cell}
class FibonacciSequence : Sequence
{
    int previous = 0;

    public FibonacciSequence()
        => Current = 0;

    public override void Next()
    {
        int nextLast = Current;
        Current = (Current == 0) ? 1 : Current + previous;
        previous = nextLast;
    }
}
```

```{code-cell}
Sequence fib = new FibonacciSequence();
Console.WriteLine(String.Join(", ", fib.Take(10)));
```

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1132156773894205500/chrokh_Fibonacci_sequence_snail_pencil_illustration_83e1505e-31b2-460f-bd03-7dc2691dfb54.png

%If a number series can be described in terms of what the next number is, given the current state, then we can implement it as a child of our `Sequence` class.
```

So, abstract classes are a middle ground between interfaces and regular classes.
Since we're working with [inheritance](inheritance) we get both code-reuse and [subtype polymorphism](subtype-polymorphism).
Make sure you need both before using abstract classes.
Take a moment to experiment with the `Sequence` abstract class and its subclasses we've just created!
See you in the next chapter.
%In the next chapter, we'll look at some advanced uses of abstract classes. But for now, 

