# Type testing

```{warning}
Work in progress.
```

%- Switching over types.
%- There are back-references here from the chapter on classes. Make sure to cover all that stuff.



% TODO: Here's a code example, but do this for primitives.
%Type t1 = typeof(Apple);
%Type t2 = typeof(Pear);
%
%Console.WriteLine(t1);
%Console.WriteLine(t2);
%
%Console.WriteLine(t1 == t2);
%Console.WriteLine(typeof(Apple) == typeof(Apple));
%Console.WriteLine(typeof(Apple) == typeof(Pear));
%
%Apple a1 = new Apple();
%Pear p1 = new Pear();
%
%Console.WriteLine(a1.GetType() == typeof(Apple));
%Console.WriteLine(a1.GetType() == typeof(Pear));
%Console.WriteLine(p1.GetType() == typeof(Pear));
%Console.WriteLine(p1.GetType() == typeof(Apple));
%
%class Apple {}
%class Pear {}



%## From old classes chapter:
%
%We've talked about object equality, let's now talk about type equality.
%Remember the methods `GetType` and `typeof` from the chapter on [type testing](type-testing)?
%These methods work on classes and objects just as well as they work on other types and other values.
%
%Let's define two new classes.
%One that models apples and another one that models pears.
%
%```{code-cell}
%class Apple { }
%class Pear { }
%```
%
%You can extract the [compile-time type](run-time-and-compile-time-types) from the class name by using the `typeof` method.
%
%% TODO: For these manual examples 
%```csharp
%Type t1 = typeof(Apple);
%Type t2 = typeof(Pear);
%
%Console.WriteLine(t1);
%Console.WriteLine(t2);
%```
%
%```
%Apple
%Pear
%```
%
%If you've defined the classes in a namespace, such as e.g. `System` then the program would instead print the name of your namespace followed by a dot and then the name of your class.
%
%```
%System.Apple
%System.Pear
%```
%
%Of course, we can then perform type testing to, at run-time, check whether two types are the same or not.
%
%```{code-cell}
%Console.WriteLine(typeof(Apple) == typeof(Apple));
%Console.WriteLine(typeof(Pear)  == typeof(Pear));
%Console.WriteLine(typeof(Apple) == typeof(Pear));
%```
%
%Ok, so that's the compile-time type.
%But what about the [run-time type](run-time-and-compile-time-types)?
%Same thing as in the chapter on [type testing](type-testing).
%You can extract the run-time type from an object constructed from a class by using the [instance method](instance-methods) `GetType()`.
%We have still not talked about instance methods, but now we're getting very, very close.
%
%```
%Apple apple = new Apple();
%Type t3 = apple.GetType();
%Console.WriteLine(t3);
%```
%
%```
%Apple
%```
%
%So then we can of course check if the run-time type of an object corresponds to some compile-time type.
%
%```{code-cell}
%Apple apple = new Apple();
%Console.WriteLine(apple.GetType() == typeof(Apple));
%Console.WriteLine(apple.GetType() == typeof(Pear));
%```
%
%As we saw in the chapter on [type testing](type-testing), we can also use the more compact pattern `is` to achieve the same thing.
%
%```{code-cell}
%:tags: [remove-stderr]
%Console.WriteLine(apple is Apple);
%Console.WriteLine(apple is Pear);
%```
%
