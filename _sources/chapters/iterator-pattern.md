# Iterator pattern

```{warning}
Work in progress.
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/uNTNEfwYXhI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

% TODO: Have a look at the good todo note in DI chapter. IncrementingCipher. These are essentially sequences. Use it here?



%```{exercise-start}
% REWRITE THIS EXERCISE TO FIT ITERATOR PATTERN.
%Write a generic class called `NonEmptyAppendOnly<T>` that is *never* empty and behaves like in the code example below:
%```
%```{code-cell} csharp
%NonEmptyAppendOnly<int> coll1
%  = new NonEmptyAppendOnly<int>(10);
%NonEmptyAppendOnly<int> coll2
%  = new NonEmptyAppendOnly<int>(new List<int>(){ 10, 20, 30 });
%
%IEnumerable<int> lst1 = coll1.ToEnumerable();
%IEnumerable<int> lst2 = coll2.ToEnumerable();
%
%
%class NonEmptyAppendOnly<T>
%{
%  List<T> xs = new List<T>();
%
%  public NonEmptyAppendOnly (T first)
%    => xs.Add(first);
%
%  public NonEmptyAppendOnly (IEnumerable<T> ys) {
%    foreach (T x in ys) xs.Add(x);
%  }
%
%  public void Append (T x)
%    => xs.Add(x);
%
%  public IEnumerable<T> ToEnumerable ()
%    => xs;
%}
%```
%```{exercise-end}
%```
