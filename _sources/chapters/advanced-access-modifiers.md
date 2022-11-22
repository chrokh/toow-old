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

Let's keep working with the sequences that we defined in the chapter on [inheritance](inheritance).
In the superclass `Sequence` we marked the `get` accessor of the property `Current` as `public` but the `set` accessor as `private`.
Now that we know that we should hide [implementation](encapsulation) details in object oriented programming, it makes sense to encapsulate the write rights to the `Current` property.
If we change the accessibility of the `set` accessor to `protected` we are suddenly able to access that property in all subclasses of `Sequence`.

```{code-cell}
class Sequence
{
  public virtual int Current { get; protected set; }

  public Sequence (int initial)
    => Current = initial;

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
Well, some subclasses are pretty awkard (and sometimes even impossible) to implement without having access to (or duplicating) the encapsulated data that is being used in the superclass.
Remember the awkward implementation of the instance method `Next` in the class `SkipSequence` in the chapter on [inheritance](inheritance)?
As discussed there, we could have avoided the problem by simply overriding the property `Current`.
However, since our goal was reuse, we wanted to reuse as much as possible.

%Well, while doing {numref}`ex:inheritance:triangular` and {numref}`ex:inheritance:fibonacci` you probably noticed that it is very difficult to re-use code from the superclass without also having write access to the property that holds the current value.

Remember how we discussed that there are two reasons for using [inheritance](inheritance).
Subtype polymorphism, and code reuse.
If all you want is subtype polymorphism then you should use interfaces.
If however we also want code reuse then we better dang well get some code reuse out of our classes.
Otherwise it's all a sham.

Let's have a look at how we could simplify the code for the class `SkipSequence` if the `set` accessor of the property `Current` in the superclass is marked as `protected` instead of `private`.

```{code-cell}
class SkipSequence : Sequence
{
  int skip;

  public SkipSequence (int initial, int skip)
    : base(initial)
      => this.skip = (skip >= 0) ? skip : 0;

  public override void Next()
    => this.Current += this.skip;
}
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

