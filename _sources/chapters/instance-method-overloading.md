# Instance method overloading

%### Overloading (old from instance methods chapter)
%
%Instance methods support [overloading](overloading).
%Overloading of instance methods is not substantially different from overloading of [static methods](static-methods).
%As long as two instance methods have different type signatures they can share the same name.
%
%Let's take the method `Scale` that we defined before as an example.
%In our definition of `Scale` we expected a width and a height multiplier.
%Let's now define an overload of the instance method `Scale` that only expects a single multiplier that we apply to both the width and height.
%
%```{code-cell}
%class Rectangle
%{
%  public int Width;
%  public int Height;
%
%  public void Scale (int width, int height)
%  {
%    Width *= width;
%    Height *= height;
%  }
%
%  public void Scale (int factor)
%  {
%    Width *= factor;
%    Height *= factor;
%  }
%
%  public void Print ()
%    => Console.WriteLine($"{Width} x {Height}");
%}
%```
%
%Notice how we now have two instance methods called `Scale`.
%This is allowed since they have different type signatures.
%
%Of course, we could have implemented our second `Scale` method in terms of our first.
%Think about it.
%Scaling both the width and height with the same multiplier is a special case of scaling width and height with possibly different multipliers.
%
%```{code-cell}
%class Rectangle
%{
%  public int Width;
%  public int Height;
%
%  public void Scale (int width, int height)
%  {
%    Width *= width;
%    Height *= height;
%  }
%
%  public void Scale (int factor)
%    => Scale(factor, factor); // Calls the other overload.
%
%  public void Print ()
%    => Console.WriteLine($"{Width} x {Height}");
%}
%```
%
%```{note}
%An instance method can call other instance methods in the same object it is running.
%This can be done explicitly by using the `this` keyword.
%%The fact that an instance method in an object may call other instance methods in the same object is known as "open recursion".
%```
%
%```{note}
%The keyword `this` is in some languages known as `base`.
%```
