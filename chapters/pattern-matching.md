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



%```csharp
%var m1 = new Just<int>(10);
%Maybe<string> m2 = m1.Map(x => x.ToString());
%
%Console.WriteLine(toString(m2));
%
%string toString (Maybe<string> maybe) =>
%  maybe switch
%  {
%    Just<string> just => just.Value,
%    _ => "",
%  };
%
%abstract class Maybe<A>
%{
%  public abstract Maybe<B> Map<B> (Func<A, B> f);
%}
%class Just<A> : Maybe<A>
%{
%  public A Value { get; private set; }
%  public Just(A val) => Value = val;
%  public override Maybe<B> Map<B> (Func<A, B> f)
%    => new Just<B>(f(Value));
%}
%class Nothing<A> : Maybe<A>
%{
%  public override Maybe<B> Map<B> (Func<A, B> f)
%    => new Nothing<B>();
%}
%```

