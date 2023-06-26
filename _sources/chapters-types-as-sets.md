### Values

As you may recall from the chapter on [sets](sets), data types correspond to mathematical sets.
What we mean with this is that whenever we have a data type we can just as well use set theory to reason about that data type and its relation to other data types.

Let's start with something simple like the type `bool`.

```{note}
`bool` is actually an alias for `Boolean` which is the actual name of the type.
The alias is commonly used since it means that we don't explicitly have to have access to the `System` namespace.
More on this in the chapter on [namespaces](namespaces).
```

Think back to our discussion around the set $\mathit{Boolean}$ in the chapter on [Sets](sets).
The set $\mathit{Boolean}$ has two elements: $\mathit{True}$ and $\mathit{False}$.
The set $\mathit{Boolean}$ corresponds to the data type `bool`.
The possible values of `bool` is `true` and `false`.

% TODO: Image
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:bool
%A `bool` is either `true` or `false`.
%``

Ok, so `bool` is a type with a finite set of values.
Can you think of a set that's infinite but that still corresponds to a data type?
How about the set of all positive and negative integers?
In mathematics we usually denote this set with the symbol $\mathbb{Z}$ and we could define it like this.

$$
\mathbb{Z} = \{ \dotsc \enspace , \enspace -2 \enspace , \enspace -1 \enspace , \enspace 0 \enspace , \enspace 1 \enspace , \enspace 2 \enspace , \enspace \dotsc \}
$$

This set does not however correspond to the data type `int`, or more specifically `Int32`.
Why?
Because computer integers are not actually infinite.
There's a maximum number and a minimum number.
If we need to represent a larger or smaller number then we need a different data type.

```{note}
Remember that `int` is an alias for `Int32`.
```

To define a set that corresponds to the data type `int` we must first figure out what the minimum and maximum values are.
We do this by checking two [static](static) properties of the `int` [class](classes).

```{code-cell}
Console.WriteLine(int.MinValue);
```
```{code-cell}
Console.WriteLine(int.MaxValue);
```

Now that we have our limits we can define the set that corresponds to the type `int`.

$$
\mathit{Int} = \{ -2147483648, \enspace \dotsc \enspace -1 \enspace , \enspace 0 \enspace , \enspace 1 \enspace , \enspace \dotsc \enspace 2147483647 \}
$$


Sets can be used to describe both compile-time types and run-time types.

But, what about `null` you might ask.
Well, the short answer is that `int` is not "nullable" which means that its type does not contain the value `null`.
The long answer is that we'll deal with `null` in the chapter on [nothingness](nothingness).

