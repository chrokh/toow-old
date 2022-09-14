(pattern-matching)=
# Pattern matching

```{warning}
Work in progress.
```

%- See notes on visitor pattern page.

%bool Compare (Tree t1, Tree t2) =>
%  (t1, t2) switch
%  {
%    (Leaf l1, Leaf l2) => l1 == l2,
%    (Branch, Leaf) => false,
%    (Leaf, Branch) => false,
%    (Branch b1, Branch b2)
%      => Compare(b1.Left, b2.Left) && Compare(b1.Right, b2.Right),
%  };
%
%interface Tree {}
%class Leaf : Tree {}
%class Branch : Tree {
%  public Tree Left { get; private set; }
%  public Tree Right { get; private set; }
%  public Branch (Tree left, Tree right)
%  {
%    Left = left;
%    Right = right;
%  }
%}


