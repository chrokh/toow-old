# Visitor pattern

```{warning}
Work in progress.
```

% Maybe make multiple dispatch its own chapter?
%- Multiple dynamic dispatch is available but it is neither type safe nor exhaustive: 
%  - https://chodounsky.com/2014/01/29/dynamic-dispatch-in-c-number/
%  - https://news.ycombinator.com/item?id=14152126
%  - https://shawnhargreaves.com/blog/visitor-and-multiple-dispatch-via-c-dynamic.html
% 
%- Visitor gives multiple dynamic dispatch with type safety. But still not exhaustive. Actually it is exhaustive right?




%interface Tree
%{
%  bool Accept (Visitor v);
%}
%class Leaf : Tree
%{
%  public bool Accept (Visitor v) => v.Visit(this);
%}
%class Branch : Tree {
%  public Tree Left { get; private set; }
%  public Tree Right { get; private set; }
%  public Branch (Tree left, Tree right)
%  {
%    Left = left;
%    Right = right;
%  }
%  public bool Accept (Visitor v) => v.Visit(this);
%}
%
%
%class Visitor
%{
%  // NB: Won't compile if any of these is commented.
%  public bool Visit (Leaf t) => true;
%  public bool Visit (Branch t) => true;
%}

 

