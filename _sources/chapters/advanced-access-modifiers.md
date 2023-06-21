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

# Advanced access modifiers

% TODO: Fragile base class is a great motivation for when you can use `protected`. I've made a todo note about fragile base class somewhere else already. Think: Rectangle, Square, and a public method Scale that fails to work if Square.Width changes both width and height.

## Motivation

When discussing the [basic access modifiers](basic-access-modifiers) `public` and `private` we mentioned that many object oriented languages have another modifier known as `protected`.
More specifically, if a language supports [inheritance](inheritance) it probably also supports the access modifier `protected`.

Why another modifier?
Well, remember how `private` members only are accessible from wihtin the class they are defined in?
The introduction of `protected` stems from the realization that in a language that supports [inheritance](inheritance) you might also want members that are private within a given inheritance hierarchy.


## Definition

Let's recap the definitions that we gave in the chapter on [basic access modififers](basic-access-modifiers)?

- `public` means accessible by whoever has access to the class.
- `private` means accessible *only* from within the class itself.
- `protected` means accessible *only* from within the class itself *and* any of its [subclasses](inheritance).

A `protected` member is therefore like a `private` member except that it is `private` to the whole inheritance hierarchy below the type in which it is defined.

### UML class diagrams

In UML class diagrams we use the symbol `#` to denote `protected`.


## Examples

### Sequences

Remember how, in the chapter on [inheritance](inheritance:sequences), we defined a bunch of sequences.
Remember how had two main "styles" of writing our algorithms?
One one hand we could write our algorithms as formulas (such as in the case of the square series) and on the other as filters (such as in the case of the palindromic sequence).

In the cases where we overrode the `Current` method we always had to introduce our own instance field that we were able to set the current value to.
This happened because the `set` accessor of the property `Current` was marked as `private` in the superclass `Sequence`.
In other words, subclasses did not have access to the setter even if they overrode the property.

Why did we not just make the `set` accessor `public`?
Because of [information hiding](information-hiding).
We don't want others to be able to at will change the current value of a sequence.
Why?
Well what if we have an `EvenSequence` and someone changes the value to `3`?

Let's now change the access modifier of the `set` accessor to `protected`.
This will allow us to implement some sequences as formulas without having to override the `Current` property.
Why?
Because all subclasses of `Sequence` will now have write-access to that property.

```{code-cell}
class Sequence
{
  public virtual int Current { get; protected set; }

  public virtual void Next()
    => Current++;

  public virtual int[] Take (int n)
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

I don't want to argue that this is a better solution in terms of [maintainability](maintainability) than what we had before.
What I would say however is that changing a piece of data from being `public` to being `protected` would mean that we are hiding more information.
That is a good thing.
At least the data is not public.
However, we didn't actually change data that was marked as `public` to `protected`, we changed something that was `private` to `protected`.
This does indeed feel like a step in the wrong direction.

So why did we do this?
Well, our goal here was code reuse and code reuse will certainly be higher now.
But is it a win?
I don't know.
As you might have understood by now, I'm in the camp that favors composition over inheritance.
But we'll talk more about how that applies here when we get to the chapters on abstract [constructed](abstract-constructed-object-composition) and [injected](abstract-injected-object-composition) composition.

```{tip}
Remember how we discussed that there are two reasons for using [inheritance](inheritance).
Subtype polymorphism, and code reuse.
If all you want is subtype polymorphism then you should use interfaces.
If however we also want code reuse then we better dang well get some code reuse out of our classes.
```

Let's first rewrite the class `StepSequence`.
The implemenation is the same as before except that we now don't have to override the property `Current` since we can both `get` and `set` it in subclasses.

```{code-cell}
class StepSequence : Sequence
{
  private int steps;

  public StepSequence (int steps)
    : this(steps, 0) { }

  public StepSequence (int steps, int initial)
  {
    this.steps = steps;
    this.Current = initial;
  }

  public override void Next()
    => Current += steps;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new StepSequence(10).Take(10)));
```

Let's now try `EvenSequence` and `OddSequence`.
The implementation is really quite trivial now that we have write-access to the property `Current`.

```{code-cell}
class EvenSequence : Sequence
{
  public override void Next ()
    => Current += 2;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new EvenSequence().Take(10)));
```

```{code-cell}
class OddSequence : Sequence
{
  public OddSequence ()
    => Current = 1;

  public override void Next ()
    => Current += 2;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new OddSequence().Take(10)));
```

Before moving on, let me just say that moving to a `protected` `set` accessor of the property `Current` doesn't really affect our implementation of `SquareSequence`.
Because in that subclass we want to keep track of which number we are at currently and then generate the number when asked, rather than storing the actual number itself.
Have a look at the folded code below.
It's the same as before.

```{code-cell}
:tags: [hide-input]
class SquareSequence : Sequence
{
  int n = 0;

  public override int Current
  {
    get => (n * (n + 1)) / 2;
  }

  public override void Next()
    => n++;
}
```


% TODO: What about negaitve numbers?



(protected:sequences)=
### Filtered sequences

Let's now talk about the other way that we were expressing sequences in the chapter on [inheritance](inheritance:sequences)?
When we expressed them as filters applied to a sequence.

Remember the discussion on how the recursive implementation of the method `Next` was duplicated across subclasses of `Sequence` when we tried to express our sequences as filtered sequences?
Would it be possible to eliminate that duplication using yet another type that we could inherit from?
Sure, we could introduce another class that we might call `FilteredSequence` that has a `virtual protected` instance method that returns a `bool`.
This method acts as the filter and by overriding this method we can provide the filter for that particular sequence.

```{code-cell}
class FilteredSequence : Sequence
{
  public override void Next()
  {
    Current++;
    if (!IsValid())
      Next();
  }

  protected virtual bool IsValid ()
    => true;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new FilteredSequence().Take(10)));
```

Let's first reimplement `PalindromicSequence`.

```{code-cell}
class PalindromicSequence : FilteredSequence
{
  protected override bool IsValid ()
  {
    string number = Current.ToString();
    for (int i=0; i<number.Length; i++)
      if (number[i] != number[number.Length - i - 1])
        return false;
    return true;
  }
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new PalindromicSequence().Take(20)));
```

Pretty neat.
Now we only had to override the method `IsValid` and the rest was inherited.
Let's try the `SquareSequence`.

```{code-cell}
class SquareSequence : FilteredSequence
{
  protected override bool IsValid ()
    => (int)Math.Sqrt(Current) * (int)Math.Sqrt(Current) == Current;
}
```

```{code-cell}
Console.WriteLine(String.Join(", ", new SquareSequence().Take(10)));
```

Same thing.
All we had to override was the method `IsValid`.


## Exercises

```{note}
Work in progress.
```


%### Shapes
%
%
%```{code-cell}
%abstract class Shape
%{
%  public int Width { get; protected set; }
%  public int Height { get; protected set; }
%
%  public void Scale (double factor)
%  {
%    Width *= factor;
%    Height *= factor;
%  }
%}
%
%class Rectangle
%{
%
%}
%
%class Oval
%{
%  public Radius
%}
%```


%   - `Coordinate.Add(Coordinate other)` is a good example since `x` and `y` can be `protected`.

