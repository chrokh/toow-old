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


% TODO: Simple rock paper scisscors example is perhaps more intuitive than Visitor pattern.
%IHand rock = new Rock();
%IHand paper = new Paper();
%IHand scisscors = new Scisscors();
%
%Console.WriteLine();
%Console.WriteLine(rock.Defeats(rock));
%Console.WriteLine(rock.Defeats(paper));
%Console.WriteLine(rock.Defeats(scisscors));
%
%Console.WriteLine();
%Console.WriteLine(paper.Defeats(rock));
%Console.WriteLine(paper.Defeats(paper));
%Console.WriteLine(paper.Defeats(scisscors));
%
%Console.WriteLine();
%Console.WriteLine(scisscors.Defeats(rock));
%Console.WriteLine(scisscors.Defeats(paper));
%Console.WriteLine(scisscors.Defeats(scisscors));
%
%interface IHand
%{
%  bool Defeats (IHand hand);
%  bool LoosesTo (Rock _);
%  bool LoosesTo (Paper _);
%  bool LoosesTo (Scisscors _);
%}
%
%class Rock : IHand
%{
%  public bool Defeats (IHand other) => other.LoosesTo(this);
%  public bool LoosesTo (Rock _) => false;
%  public bool LoosesTo (Paper _) => true;
%  public bool LoosesTo (Scisscors _) => false;
%}
%
%class Paper : IHand
%{
%  public bool Defeats (IHand hand) => hand.LoosesTo(this);
%  public bool LoosesTo (Rock _) => false;
%  public bool LoosesTo (Paper _) => false;
%  public bool LoosesTo (Scisscors _) => true;
%}
%
%class Scisscors : IHand
%{
%  public bool Defeats (IHand hand) => hand.LoosesTo(this);
%  public bool LoosesTo (Rock _) => true;
%  public bool LoosesTo (Paper _) => false;
%  public bool LoosesTo (Scisscors _) => false;
%}




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

 

