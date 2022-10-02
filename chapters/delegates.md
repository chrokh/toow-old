# Delegates

```{warning}
Work in progress.
```

% Include generic delegates if this is not it's own chapter.

% Arguably, strategy pattern and dependency injection exists since functions are usually not first class citizens in object oriented languages.

%- Example: Use delegate version of `Predicate<T>` instead of `IPredicate<T>` that we saw in [generics](generics) and [abstract injected object composition](abstract-injected-object-composition).
%- Implement the method that repeatedly applies ciphers using delegates instead. See the chapter on [subtype polymorphism](subtype-polymorphism).

%```csharp
%int Inc (int x) => x + 1;
%Func<int, int> f = Inc;
%Func<int, int> g = (int x) => x + 1;
%```

% Defer pattern matching part in chapter on pattern matching chapter.
% This is a sensible alternative to the NullObject pattern which is less flexible because there you need to bundle data with the use case of what happens when you want to extract the data. Then again that argument is at the heart of the OOP vs FP debate.
% Also show how this can be written in terms of strategy pattern / dependency injection.

%```csharp
%// Applying a function
%var m1 = new Just<int>(10);
%Maybe<string> m2 = m1.Map(x => x.ToString());
%
%// Pattern matching
%string toString (Maybe<string> maybe) =>
%  maybe switch
%  {
%    Just<string> just => just.Value,
%    _ => "",
%  };
%Console.WriteLine(toString(new Just<string>("hello")));
%Console.WriteLine(toString(new Nothing<string>()));
%
%// Applying an action
%var just = new Just<int>(10);
%just.Map(x => Console.WriteLine(x));
%
%
%abstract class Maybe<A>
%{
%  public abstract Maybe<B> Map<B> (Func<A, B> f);
%  public abstract Maybe<A> Map (Action<A> f);
%}
%class Just<A> : Maybe<A>
%{
%  public A Value { get; private set; }
%  public Just(A val) => Value = val;
%  public override Maybe<B> Map<B> (Func<A, B> f)
%    => new Just<B>(f(Value));
%  public override Maybe<A> Map (Action<A> f)
%  {
%    f(Value);
%    return this;
%  }
%}
%class Nothing<A> : Maybe<A>
%{
%  public override Maybe<B> Map<B> (Func<A, B> f)
%    => new Nothing<B>();
%  public override Maybe<A> Map (Action<A> f)
%    => this;
%}
%```



%```csharp
%class Program
%{
%  delegate bool Bin (bool a, bool b);
%
%  static bool And (bool a, bool b) => a && b;
%
%  public static void Main ()
%  {
%    Bin a = (bool a, bool b) => a && b;
%    Bin b = And;
%
%    // Does not compile since f is of a different type.
%    Func<bool, bool, bool> f = (bool a, bool b) => a && b;
%    Bin c = f;
%  }
%}
%```

