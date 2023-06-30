# Exercises

## Classes

```{exercise}
What is the difference between an object and a class?
```

```{exercise}
What is the difference between an object and an instance?
```

```{exercise-start}
```
Given that we have defined a class called `House` with no members like this:
```{code-cell}
class House { }
```
Will the variable `b` below contain `true` or `false`?
Why is this?
```{code-cell}
House h1 = new House();
House h2 = new House();
bool b = h1 == h2;
```
Does it matter if we instead write the code like this?
```{code-cell}
bool b = new House() == new House();
```
```{exercise-end}
```


```{exercise}
Create a UML class diagram that depicts two classes.
One class is called `Apple` and the other `Pear`.
```


```{exercise-start}
```
Write two classes called `Apple` and `Pear`.
When you're done, you should be able to run the following code and get the same result.
Why do we get `true` in some cases as output and `false` in other?
```{code-cell}
:tags: [remove-input]
class Apple {}
class Pear {}
```
```{code-cell}
:tags: [remove-stderr]
Apple apple1 = new Apple();
Apple apple2 = new Apple();

Pear pear1 = new Pear();
Pear pear2 = new Pear();

Console.WriteLine(apple1 == apple1);
Console.WriteLine(apple1 == apple2);
Console.WriteLine(pear1 == pear1);
Console.WriteLine(pear1 == pear2);
```
```{exercise-end}
```


```{exercise-start}
```
Write two classes called `Apple` and `Pear`.
Why does the following line generate a compiler error?
```{code-cell}
:tags: [remove-input]
class Apple {}
class Pear {}
```
```{code-cell}
:tags: [raises-exception, remove-stderr, remove-output]
Apple obj = new Pear();
```
```{exercise-end}
```


```{exercise-start}
```
Write two classes called `Apple` and `Pear`.
Try to run the following code.

1. What is the compiler error that it results in?
2. Why does it result in a compiler error?

```{code-cell}
:tags: [raises-exception, remove-output]
Apple apple = new Apple();
Pear pear = new Pear();
Console.WriteLine(apple == pear);
```
```{exercise-end}
```


```{exercise-start}
```
Write two classes called `Apple` and `Pear`.
Try to run the following lines of code.

1. Which of the lines cause compiler errors?
2. Why do they give a compiler errors?

```{code-cell}
:tags: [raises-exception, remove-output]
Apple f1 = new Apple();
Apple f2 = new Pear();
Pear f3 = new Pear();
Pear f4 = new Apple();
```
```{exercise-end}
```


```{exercise}
Instantiate an object from the class `Apple` and then first compare whether its *run-time type* is equal to the type defined by the class `Apple`.
Then check whether its run-time type is equal to the type defined by the class `Pear`.
First solve these two problems without using the `is` operator and then solve it using the `is` operator.
```


```{exercise}
What is the difference between a static class and a class?
```

```{exercise}
What are class members?
```

```{exercise}
Write a program that instantiates and throws an exception of type `ArgumentException`.
```


## Access modifiers

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


