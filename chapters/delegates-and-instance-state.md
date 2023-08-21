# Delegates and Instance State

%## Closures
%Instance methods can be assigned to delegates.
%Num num1 = new Num(10);
%Func<Num> neg = num1.Neg;
%
%Num num2 = neg();
%
%Console.WriteLine(num1.n);
%Console.WriteLine(num2.n);
%
%class Num
%{
%  public int n { get; private set; }
%  public Num (int n)
%    => this.n = n;
%  public Num Neg ()
%    => new Num(-n);
%}


In any journey through C#, delegates often stand out as a powerful tool, acting as type-safe method pointers. However, their nuanced relationship with the state of objects makes them both versatile and, at times, tricky. Understanding this relationship is key to mastering certain aspects of C# and object-oriented design.

Key point: When a delegate points to an instance method, it encapsulates both the method and the object's state, making state management crucial during delegate invocation.

Delegates are more than mere pointers to methods. They hold within them the essence of an object's state, especially when referencing instance methods. This dual nature can sometimes lead to unexpected outcomes.

Imagine a class, Number, which holds an integer value and has a method to double its value:

csharp
Copy code
public class Number
{
    public int Value { get; set; }

    public Number(int value)
    {
        Value = value;
    }

    public void Double()
    {
        Value *= 2;
    }
}

Number myNumber = new Number(5);
Action doubler = myNumber.Double;
doubler();
Console.WriteLine(myNumber.Value);  // Outputs: 10
Here, the delegate doubler might seem independent, yet it's tightly linked to myNumber. Invoking the delegate impacts the state of myNumber, showcasing how state is intertwined with method references in delegates.

Tip: Always be conscious of the object state when working with delegates. A delegate invocation might have side effects on the associated object.

The complexities of delegates become even more apparent when they are used in loops or scenarios involving variable capture:

csharp
Copy code
List<Action> actions = new List<Action>();
for (int i = 0; i < 3; i++)
{
    actions.Add(() => Console.WriteLine(i));
}
foreach (var action in actions)
{
    action();  // Surprisingly, outputs: 3, 3, 3
}
At first glance, one might expect 0, 1, 2 as the output. Yet, each delegate captures the variable i, not its value during creation. When invoked, i is already 3.

Warning: Capturing variables in loops with delegates can lead to unexpected results. Ensure you capture the desired state.

A solution? Localize your variable:

csharp
Copy code
List<Action> actions = new List<Action>();
for (int i = 0; i < 3; i++)
{
    int localI = i;
    actions.Add(() => Console.WriteLine(localI));
}
foreach (var action in actions)
{
    action();  // Now, correctly outputs: 0, 1, 2
}
In essence, while delegates enhance the power of C#, they also introduce subtleties around object state. Grasping these intricacies ensures your C# journey remains less about debugging unexpected behaviors and more about creating robust, intuitive solutions.


-----------

Delegates are more than just pointers to methods; they encapsulate both method information and the object on which they operate, especially when referring to instance methods. This relationship with objects can sometimes lead to unexpected behavior, especially when it comes to the state of objects.

When a delegate instance points to an instance method, it maintains a reference to the object of that instance method. This means that as long as the delegate is alive and holds that reference, the object won't be eligible for garbage collection. More crucially, the delegate invocation can alter the state of the referred object, even if the delegate is passed around or stored separately from its originating object.

Consider this example:

csharp
Copy code
public class Number
{
    public int Value { get; set; }

    public Number(int value)
    {
        Value = value;
    }

    public void Double()
    {
        Value *= 2;
    }
}

Number myNumber = new Number(5);
Action doubler = myNumber.Double;
doubler();
Console.WriteLine(myNumber.Value);  // Outputs: 10
In this code, the delegate doubler points to the Double method of the myNumber instance. When we invoke the delegate using doubler(), it doubles the Value of the myNumber object, even though it may seem that the delegate is independent.

Another point of interest arises when delegates are used within loops:

csharp
Copy code
List<Action> actions = new List<Action>();
for (int i = 0; i < 3; i++)
{
    actions.Add(() => Console.WriteLine(i));
}
foreach (var action in actions)
{
    action();  // Each invocation outputs: 3
}
Here, one might expect the output to be 0, 1, 2, but it's actually 3, 3, 3. This is because the delegate captures the variable i, not its value at the time of creation. By the time the delegates are invoked, i has already reached the value 3.

Attention: Capturing variables with delegates, especially in loops, can lead to unintended behavior. It's essential to be aware of what's being captured and the lifecycle of that captured state.

To avoid such pitfalls, you can create a local copy of the variable inside the loop:

csharp
Copy code
List<Action> actions = new List<Action>();
for (int i = 0; i < 3; i++)
{
    int localI = i;
    actions.Add(() => Console.WriteLine(localI));
}
foreach (var action in actions)
{
    action();  // Outputs: 0, 1, 2
}
In summary, while delegates are powerful tools in C#, their relationship with instance state and captured variables requires careful attention. Being conscious of how delegates interact with object states ensures more predictable and maintainable code.
