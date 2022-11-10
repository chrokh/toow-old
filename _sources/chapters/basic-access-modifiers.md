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

(access-modifiers)=
# Access modifiers


% ALSO: MODIFIERS FOR CLASSES.



## Motivation

Now that we've talked about both [instance fields](fields) and [instance methods](instance-methods) we're finally ready to meaningfully talk about access modifiers.
Remember how we said that `public` fields "break encapsulation" or "violate the principle of information hiding"?

We said that we should hide data inside objects so that others cannot reach into our objects and change the data on our behalf.
Data should be encapsulated inside objects.
Data is, what we call, an "implementation detail" that should be `private`.


## Definition

We use access modifiers to modify the accessibility of static and instance [fields](fields), static and instance [properties](properties) as well as and [static](static-methods) and [instance methods](instance-methods).
Accessibility is also sometimes referred to as "visibility" or "protection level".
The accessibility level essentially determines whether or not we can access something from outside of it.

We'll talk about access modifiers in relation to the class members fields and methods in this chapter.
Using access modifiers with properties is something that we'll discuss directly in the chapter on access modifiers.

You can also use access modifiers to modify the accessibility of classes, records, and structs but that's not something we'll discuss here.
% TODO: Will we discuss class access modifiers at all in this book?

There are three basic access modifiers that we'll discuss in this book: `public`, `private`, and `protected`.

- `public` means accessible by whoever has access to the class.
- `private` means accessible *only* from within the class itself.
- `protected` means accessible *only* from within the class itself *and* any of its [subclasses](inheritance).

It is important to understand that we are talking about from what *classes* a member is accessible from.
We're not talking about from what *objects* a member is accessible from.

If for example we say that a field called `name` is `private` in a class called `Person` then that doesn't mean that any given person only ever can access its own name.
It can access its own name but it can also access the name of any other person that we've passed it.

Think about it this way: The class `Person` *knows about* the idea of `name` and hence can access the `name` field on any object that it has access to.
Outside of the class `Person` however, we have no idea about the existence of the field `name` since that field has been marked as `private`.
We'll talk more about this caveat in the examples section of this chapter.

Since we have yet to discuss [inheritance](inheritance) we cannot discuss the modifier `protected` in detail, so we'll return to that in a [later chapter](advanced-access-modifiers).

% TODO: Do I need to write more about accessibility and static members in this chapter??


### Methods

Let's talk about methods first since its easier.
To change the accessibility of an [instance method](instance-methods) we simply add an access modifier before the data type in our type signature.
In the case of [static methods](static-methods) we simply add an access modifier before the `static` keyword.

```
<class-identifier>
{
  <access-modifier> [static] <return-type> ([<param1-type> <param1-name>, ...])
  {
    [method-body]
  };
}
```

Notice for example how the method `sizeString` is marked as `private` in the example below. 

```{code-cell}
class Rectangle
{
  public int Width = 0;
  public int Height = 0;

  public void Print ()
    => Console.WriteLine(sizeString());

  private string sizeString ()
    => $"{this.Width} x {this.Height}";
}
```


### Fields

In the case of [properties](properties), which we will talk about soon, we divide the problem of accessibility into the sub-problems of setting and getting a value.
The set accessibility and the get accessibility can be controlled independently.
For fields however we change both the set and get accessibility at the same time.

To change the accessibility of a field we simply add an access modifier before the data type in our definition of the field.

```
<class-identifier>
{
  <access-modifier> [static] <field-type> <field-identifier>;
}
```

We'll give an example of `private` fields in the examples section of this chapter.


### UML class diagrams

In UML class diagrams we use the following symbols to denote different levels of accessibility.

- `+` for `public`.
- `-` for `private`.
- `#` for `protected`.

So if we've got a class called `Rectangle` and it has two `private` fields we might depict it like this:

```
┌────────────────┐
│   Rectangle    │
├────────────────┤
│ - Width : int  │
│ - Height : int │
├────────────────┤
└────────────────┘
```



## Examples

### Rectangles

Remember how we worked with the fields `Width` and `Height` in the class `Rectangle`?
Remember how we said that they "break encapsulation"?
If we were to make them `private` instead of `public` we would simply replace the latter keyword with the former.

```{code-cell}
class Rectangle
{
  private int width = 0;
  private int height = 0;
}
```

```{note}
We've renamed the variables so that their names start with a lowercase letter since they are now private.
As we've mentioned before, the convention in C# is to let `public` members have names that start with an uppercase letter, and `private` members have names that start with a lowercase letter.
```

In C#, fields are `private` by default, so if we omit the access modifier altogether the fields would also be `private`.
So the code below has the same effect as the code above.

```{code-cell}
class Rectangle
{
  int width = 0;
  int height = 0;
}
```

Notice how the compiler is now giving us a warning.
The warning is saying that we've defined the two variables `width` and `height` but that they aren't used anywhere.
The compiler is basically trying to tell us that our program is pointless.

Why didn't we get this error before?
Home come changing the accessibility of these fields to `private` caused the compiler to suddenly be concerned about our program being pointless?
In the chapter on [fields](fields) the compiler warned us that the fields would be initialized to the default value for the type `int` but it never accused us of writing a pointless program.

The difference lies in that the accessibility now is `private`.
If the fields are `private` then their values can *only* be set and retrieved from instance and static members in this same class.
But since the `Rectangle` class, as we've defined it above, has no other members, then it will be impossible to change the values of our fields or to extract the value from them from the outside.
Hence, the fields serves no purpose.

Have a look at what happens if we try to access the fields from the outside.

```{code-cell}
:tags: [raises-exception]
Rectangle rect = new Rectangle();
rect.width = 10;
Console.WriteLine(rect.width);
```

We get two compiler errors and they actually explain exactly what's wrong.
`width`, for example, is "inaccessible due to its protection level".
We get one error for line 2 above and one for line 3.
One error for when we try to set the value and one error for when we try to get it.

So now we've truly encapsulated the notions of `width` and `height` in the concept of `Rectangle`.
But how in the world are we going to be able to do anything useful with them if we can't access them.
Well, this is where [instance methods](instance-methods) that we just learned about (or properties but we'll talk about that later) come in to play.

```{code-cell}
class Rectangle
{
  private int width = 0;
  private int height = 0;

  public void SetWidth (int width)
    => this.width = width;

  public void SetHeight (int height)
    => this.height = height;

  public void Print ()
    => Console.WriteLine($"{width} x {height}");
}
```

No more compiler errors.
Can we use this class?
Indeed we can.

```{code-cell}
Rectangle rect = new Rectangle();
rect.SetWidth(20);
rect.SetHeight(10);
rect.Print();
```

Is it all a win or have we lost something?
Well, since we've made the fields `private` we can no longer use the object initializer syntax.
But in the chapter on [properties](properties) you'll see how we can get that ability back and in the chapter on [constructors](constructors) you'll see why we should prefer constructors over object initializers much of the time.

```{code-cell}
:tags: [raises-exception]
Rectangle rect = new Rectangle() { width = 10 };
```


%### Information hiding

Why is this a win?
Doesn't the new version of `Rectangle` seem more complicated than the old?
Wasn't it more useful before?
Well, the new implementation follows the principle of information hiding.
It doesn't break encapsulation.

```{important}
By making the fields `private` we've encapsulated them and made the class easier to change without breaking other code.
```

Another way to say this is that we've "hidden what might vary".
Yet another way is that we've hidden "implementation details".
The fact that the width and height of a rectangle is modeled using the data type `int` is what we would call an implementation detail.
It's irrelevant to the fact that we're trying to model rectangles.

Let's say that we in the future realize that we want to implement a new method called `Half` which itself could be implemented in terms of the method `Scale` that we [built before](rectangle-scale) if the `Scale` method supported non-integers.
So let's instead rewrite the `Scale` method so that it takes a `double`.

This means that if we pass `0.5` to the method `Scale` then the rectangle should be halved.
However, if our rectangle, for example, has size $(5,5)$ then the new size should be $(2.5, 2.5)$.
But we've modeled the width and height as fields of type `int`.
Is this going to be a costly change?

```{code-cell}
class Rectangle
{
  private double width = 0;  // Changed.
  private double height = 0; // Changed.

  public void SetWidth (int width)
    => this.width = width;

  public void SetHeight (int height)
    => this.height = height;

  public void Scale (double multiplier)  //
  {                                      //
    this.width *= multiplier;            // New method.
    this.height *= multiplier;           //
  }                                      //

  public void Print ()
    => Console.WriteLine($"{width} x {height}");
}
```

No, the change is *not* going to break a lot of other things.
Since the fields are properly encapsulated this implementation detail is trivial to change.
Notice how, beyond adding the new method, we only had to change the type of our instance fields from `int` to `double`.
Nothing else had to change.

Does the code that uses the class `Rectangle` have to change?
No, because, what we will learn to refer to as, the "public interface" of the type `Rectangle` has not actually changed.
Beyond the fact that we added a new instance method.
The only thing that changed was an implementation detail.

All code that used objects of type `Rectangle` should keep working just like it did before.
What would have happened if we had not encapsulated the `Width` and `Height` fields but instead exposed them publicly and then changed the data type of them from `int` to `double`?
Any code that interacted with rectangles might have had to change since it might have been working with values of type `int`, while objects of type `Rectangle` now wants us to give them and yields values of type `double`.



### Classes not objects

Remember how we said that the accessibility determines what *class* has access to a given member, not what *object* has access to it?
Let's take two examples to drive this point home.


#### Instance method accessing another instance

Have a look at the class below.

```{code-cell}
class Person
{
  private string name;

  public void SetName (string name)
    => this.name = name;

  public void Greet (Person other)
    => Console.WriteLine($"Hello {other.name}, my name is {name}.");
}
```

We're defining a class called `Person` with a `private` field called `name`.
The person class has two public instance methods.
One allows us to set the name of a person and the other allows us to greet another person.

This second method is the interesting one since it takes another object as input and wants to access both our name and that other persons name.
Is that possible even though the field `name` is marked as being `private`?

```{code-cell}
Person p1 = new Person();
Person p2 = new Person();

p1.SetName("Jane");
p2.SetName("John");

p1.Greet(p2);
```

Indeed, it is possible.
Why?
Because the field `name` is only private to the class `Person` not to any one specific object of type `Person`.
If you are defining the method in the class `Person` then you have access to the `name` field.


(static-factory-methods)=
#### Static method accessing an instance

Let's take another example, but let's this time use a static method.
Have a look at this class.

```{code-cell}
class Circle
{
  private int radius;

  public static Circle MakeCircle (int radius)
  {
    Circle circle = new Circle();
    circle.radius = radius;
    return circle;
  }

  public void Print ()
    => Console.WriteLine("Circle with radius: " + radius);
}
```

We're defining a class called `Circle` which has a `private` field called `radius`.
There is no public instance method that allows us to set the radius of an object of type `Circle`.
There is however a public instance method that allows us to print a circle.
Then there is a `public` `static` method called `MakeCircle` that takes a radius and returns us an object of type `Circle`.
Is it really possible for that static method to set the radius of the circle?

```{code-cell}
Circle c1 = Circle.MakeCircle(12);
c1.Print();
```

Yes it is.
The static method is defined *in* the class `Circle` and consequently it has access to the field even though the field is marked as `private`.

```{note}
When we've learned about [constructors](constructors) we don't need to write `static` methods like `MakeCircle` anymore.
However, you might want to know that constructors solve basically the same problem as we solved with this ´static´ method.
So if you understand how this static method works, then you're very close to understanding how constructors work.
```

```{note}
The method `MakeCircle` is what we would call a "static factory method".
It's a `static` method that we can call in order to get objects of some type.
In this case the type is `Circle`.
```








## Exercises

```{exercise}
What is the difference between `public` and `private`?
```

```{exercise}
What do we mean when we say that `public` fields "break encapsulation" or "violate the principle of information hiding"?
```

```{exercise}
Redo all the coding exercises in the chapter on [instance methods](instance-methods) and make sure that your solutions work *even* after you've changed the accessibility of all fields to `private`.
In some cases you will need to adapt your solutions.
This is a very important exercise.
```

```{exercise-start}
```
Does the following code compile?
Why or why not?
```{code-cell}
:tags: [raises-exception, remove-output, remove-stderr]
class Person
{
  private string name;

  public void SetName (string name)
    => this.name = name;
}

class Greeter
{
  public void Greet (Person p1, Person p2)
    => Console.WriteLine($"Hello {p1.name}, I am {p2.name}");
}
```
```{exercise-end}
```

```{exercise-start}
```
Does the following code compile?
Why or why not?
```{code-cell}
class Person
{
  private string name;

  public void SetName (string name)
    => this.name = name;

  public static void Greet (Person p1, Person p2)
    => Console.WriteLine($"Hello {p1.name}, I am {p2.name}");
}
```
```{exercise-end}
```


```{exercise}
We've said that `private` means that the member is accessible within the same class not merely within the same object.
Write your own code example to show what this means.
```


