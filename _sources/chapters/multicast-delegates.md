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

# Multicast delegates

In your journey through understanding delegates, you've been using them primarily to hold a reference to a single method. But what if you wanted a delegate to hold references to multiple methods, and then invoke all those methods in sequence? Enter: multicast delegates.

```{admonition} Key points
- Multicast delegates in C# can hold and invoke multiple method references in sequence.
- They are combined using the addition (`+`) and subtraction (`-`) operators.
- The return value of a multicast delegate with a non-`void` return type is from the last method invoked.
- Multicast delegates lay the foundation for [event](events) handling in C# where multiple subscribers can react to a single event.
```

## Definition

A multicast delegate is a delegate that can hold references to more than one method. When you invoke a multicast delegate, it invokes the list of methods it references in the order they were added.
The capability of a delegate to hold references to multiple methods is built into the delegate type itself, meaning every delegate in C# is inherently a multicast delegate.

## Adding

While every delegate is a multicast delegate by default, the real power of multicasting shines when you combine delegates using the addition (`+`) and subtraction (`-`) operators.

```{code-cell}
// Some example functions.
void Method1() => Console.WriteLine("Method 1");
void Method2() => Console.WriteLine("Method 2");
```

```{code-cell}
// Make delegate instances.
Action method1 = Method1;
Action method2 = Method2;

// Combine delegate instances into multicast delegate instance.
Action multicast = method1 + method2;
```

If we now invoke the multicast delegate then all delegate instances stored in the multicast delegate will be invoked in order.

```{code-cell}
multicast();
```

```{note}
If we add the same delegate instance to a multicast delegate multiple times then the underlying method will be invoked multiple times when the multicast delegate is invoked.
```

Since all delegates are multicast delegates by default you can combine multicast delegates to make multicast delegates.

```{code-cell}
Action multimulti = method1 + multicast;
multimulti();
```

## Removing

You can use the minus operator (`-`) to remove a method reference from a multicast delegate.

```{code-cell}
// Removing `method1` from the multicast delegate.
multicast -= method1;

// Invoking the multicast delegate.
multicast();
```

```{tip}
We can also use the [addition and subtraction assignment operators](arithmetic-operators) (`+=` and `-=`) to add or remove delegate instances to or from an existing multicast delegate. Like this: `multicast += method2`.
```

## Return values

If a multicast delegate has a return type other than `void`, **only the value of the last invoked method is returned**.
It's essential to be aware of this behavior when designing systems using multicast delegates.

```{danger}
If you're familiar with function composition from functional programming it's important to note that multicast delegates is (unfortunately) not an implementation of this concept.
The output of a function in a multicast delegate is **not** passed as input to the next function in the multicast delegate instance.
```

Let's try it out.

```{code-cell}
// Some example functions.
int MethodA() => 10;
int MethodB() => 20;

// Make delegate instances.
Func<int> methodA = MethodA;
Func<int> methodB = MethodB;

// Combine delegate instances into multicast delegate instance.
Func<int> multicast = methodA + MethodB;
```

```{code-cell}
// Only returns 20 and not 10.
Console.WriteLine(multicast());
```

## Exceptions

When one of the methods referenced by a multicast delegate throws an [exception](exceptions), the subsequent methods will not be executed. Therefore, it's crucial to ensure exception handling is appropriately addressed when working with multicast delegates.

```{code-cell}
void GoodMethod() => Console.WriteLine("This method runs!");
void BadMethod() => throw new Exception("This method throws!");

Action goodMethod = GoodMethod;
Action badMethod = BadMethod;

Action combined = goodMethod + badMethod + goodMethod;

try
{
    combined();
}
catch (Exception ex)
{
    Console.WriteLine($"Exception caught: {ex.Message}");
}
```

Notice how we never execute the third delegate in the example above because we encounter an exception in the second method when executing the multicast delegate.

## Conclusion

Multicast delegates offer the flexibility to reference multiple methods and execute them in sequence.
While you might see limited uses for multicast delegates in regular scenarios, their real power and common application are in [events](events). Events in C# use the capabilities of multicast delegates to allow multiple subscribers (methods) for a single event. This means when an event is raised, multiple methods can react to it.
We will explore events in a later chapter.
Stay tuned.

