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

# Event conventions

The [.NET design guidelines](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/event) and community has quite a few design guidelines when it comes to [events](events).
Let's discuss the key conventions in detail.

```{admonition} Key points
1. Use the predefined generic event handler delegate `EventHandler<TEventArgs>` instead of defining your own.
2. Create your own subclass of `EventArgs` to use in place of `TEventArgs`.
```

## Event handler delegate return type

The design guidelines state that the return type of event handler delegates should be `void`.
The reason for this is simple.

[Multicast delegates](multicast-delegates) only return the value of the last method in the chain of delegates.
Using a return type other than `void` might incorrectly suggest to readers of your code that the event will somehow process values using whatever subscribers are registered to it.


## Event handler delegate parameters

What arguments should be sent to subscribers when an event is invoked?
In other words, what should be the parameters of the event handler delegate?
The guidelines clearly states that we should have two parameters. The first is the 'sender' and the second some 'event arguments'.

1. The sender is the object that raised the event, meaning the publisher. In our example above we can see that we were passing the sender by using the `this` keyword. This parameter is conventionally called `sender`.

2. The event arguments is something we didn't use in our example since we passed a `string` that represented the released episode directly. The idea of event arguments is that we should [encapsulate](encapsulation) the data that needs to be sent in its own object so that we can avoid cascading changes if we need to change what data is being sent later down the line. This parameter is conventionally called `e`.

To better illustrate the use of 'sender' and 'e,' consider the following C# code example.

```{code-cell}
class MyEventPublisher
{
    public delegate void MyEventHandler (object sender, MyEventArgs e);

    public event MyEventHandler MyEvent;

    public void RaiseEvent()
        => MyEvent?.Invoke(this, new MyEventArgs { Message = "Event triggered!" });
}

class MyEventArgs
{
    public string Message { get; init; } = "";
}
```

In this example, the class `MyEventPublisher` has an event named `MyEvent.` The event is triggered by a method called `RaiseEvent.` The `sender` in this case is `this,` and the event arguments or `e` is a new instance of a class called `MyEventArgs` with the `Message` property set to `"Event triggered!"`


## Upcasting sender to `object`

Following the convention, we should define the event handler delegate so that the `sender` is of type `object`. Why such extreme generality? Because this allows us to reuse the same event handler for different events even if they belong to publishers of completely different types.

```{warning}
It could be argued that this convention is detrimental due to over-generalization which may lead to [downcasting](downcasting) later down the line.
```

Upcasting sender to `object` allows for flexibility but also brings the risk of downcasting errors. Consider this example where downcasting goes wrong:

```{code-cell}
void MyEventHandler(object sender, MyEventArgs e)
{
    string stringSender = (string)sender; // Are all objects strings?
}
```

```{code-cell}
:tags: [raises-exception]
// Create publisher.
MyEventPublisher publisher = new MyEventPublisher();

// Register the event handler that uses downcasting.
publisher.MyEvent += MyEventHandler;

// Raise the event.
publisher.RaiseEvent();
```

```output
System.InvalidCastException: Unable to cast object of type 'MyEventPublisher' to type 'System.String'.
```

Notice how our code compiles but throws an exception at run-time.

To avoid downcasting, include the sender or whatever data you actually want to send in your event arguments instead.

```{code-cell}
class MyEventArgs
{
    public MyEventPublisher Sender { get; private set; }
    public string Message { get; init; } = "";

    public MyEventArgs (MyEventPublisher sender, string message)
    {
        Sender = sender;
        Message = message;
    }
}
```

As we can see in the code below, extracting the sender from the event arguments object in such an event handler does *not* require downcasting.
Furthermore, if we would try to convert the sender object to an incompatible type (like how we tried to convert it into a `string` in the previous example) the code would simply not compile.

```{code-cell}
void MyEventHandler(object sender, MyEventArgs e)
{
    MyEventPublisher publisher = e.Sender;
}
```

When raising such an event we simply have to include the sender in the event arguments as well.

```{code-cell}
class MyEventPublisher
{
    public delegate void MyEventHandler (object sender, MyEventArgs e);

    public event MyEventHandler MyEvent;

    public void RaiseEvent()
        => MyEvent?.Invoke(this, new MyEventArgs(this, "Event triggered!"));
}
```

## Predefined generic delegate

The [.NET design guidelines](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/event) state that we should prefer to *not* define our own delegates when using events.
Instead, we should use the predefined generic delegate [`EventHandler<T>`](https://learn.microsoft.com/en-us/dotnet/api/system.eventhandler-1).

Using the predefined generic delegate we can refactor our previous class `MyEventPublisher` like this:

```{code-cell}
class MyEventPublisher
{
    // Notice how we're using the generic delegate instead of defining our own.
    public event EventHandler<MyEventArgs> MyEvent;

    public void RaiseEvent()
        => MyEvent?.Invoke(this, new MyEventArgs { Message = "Event triggered!" });
}
```

Of course, this means that we also would have to define a class called `EpisodeReleasedEventArgs` that contain whatever information we wish to pass.

What are the benefits of doing this?

- **Standardization**: Using `EventHandler<T>` promotes a consistent pattern across different parts of the application as well as across multiple applications. This makes it easier for developers (and code analysis tools) to understand the event-handling logic, as they're dealing with a familiar structure.
- **Reduced boilerplate**: Custom event handler delegates can result in a lot of repeated, boilerplate code. `EventHandler<T>` is a generic delegate that can be specialized with your own type of event argument, thereby reducing the need to write boilerplate code.
- **Loose coupling**: Using a standard delegate helps to decouple the event publisher from subscribers, as the subscribers don't have to reference a custom delegate type defined by the publisher. This makes the components more independent and easier to update or refactor.


## Subclassing predefined event arguments

The .NET guidelines also dictates that our event argument classes should be subclasses of the builtin class [`EventArgs`](https://learn.microsoft.com/en-us/dotnet/api/system.eventargs).

How do you do this? It's straightforward—just define your custom class and inherit from `EventArgs`, adding any additional properties or methods you require.

Using the code we wrote before we would make our class `MyEventArgs` inherit from the predefined class `EventArgs` like this:

```csharp
class MyEventArgs : EventArgs
{
    public string Message { get; init; } = "";
}
```

 Why follow this guideline? There are several reasons.

 - First, it establishes a consistent pattern across .NET projects, making it easier for other developers to understand the structure of your events.
 - Second, it ensures compatibility with a wide range of .NET features and libraries that expect event arguments to be of type `EventArgs` or a subclass thereof.
 - Finally, by inheriting from `EventArgs`, you make it clear that your custom class is intended specifically for event handling, which can aid in code readability and maintainability

```{note}
Only if you are 100% sure that no subscribers will ever need any event arguments should you use `EventArgs` directly without subclassing it.
```


## The `On`-prefix

Sometimes you will see a [`protected`](protected) [virtual](overriding) method that invoke an event being called `On` and the name of the event that it invokes.
Using that convention, our method `ReleaseNewEpisode` would not invoke the event directly, but rather call the method `OnEpisodeReleased` which would invoke the event.

The method `OnEpisodeReleased` corresponds to the method that we in the [Observer pattern](observer-pattern) usually call something like, `notifyObservers`.

Following this convention our `Podcast` class would look like this:

```csharp
class Podcast
{
    public string Title { get; private set; }

    public Podcast(string title) => Title = title;

    public delegate void EpisodeReleasedHandler(Podcast sender, string episodeTitle);

    public event EpisodeReleasedHandler EpisodeReleased;

    public void ReleaseNewEpisode(string episodeName)
    {
        // Some actual code for releasing the episode...
        OnNewEpisode(episodeName); // Calling the on-prefixed method.
    }

    // Here's the new On-prefixed method.
    protected void OnNewEpisode(string episodeName)
        => EpisodeReleased?.Invoke(this, episodeName);

    // More podcast and episode related logic...
}
```

Does this convention have benefits?

- If you're designing a publisher class that should be [inherited](inheritance) from it allows subclasses to define custom behavior for the event invoking method and then call the [base](the-base-keyword) implementation.
- In line with the [single responsibility principle](single-responsibility-principle), the convention separates the business logic (such as the code for releasing an episode) from the code that invokes the event.

```{warning}
Arguably, this convention is an archaic remnant from earlier .NET days where we created subclasses of existing methods and overrode `On`-prefixed methods to create handlers for predefined events.

The intent of the `On`-prefixed method is thus different in the subclass and the superclass which explains the awkward naming.

In some other languages (such as JavasScript) the prefix 'on' is used for the actual event which we here simply called `EpisodeReleased`.
In some frameworks the prefix 'on' is used for handler methods.
```


## Conclusion

In summary, adhering to the .NET event conventions not only standardizes the way [events](events) are implemented but also aids in creating maintainable code.

The two key points emphasized earlier serve as the backbone of these guidelines.
Developers are strongly advised to use the predefined generic event handler `EventHandler<TEventArgs>` and to create their own subclasses of `EventArgs` to use in place of the type parameter `TEventArgs`. Following these practices ensures a cohesive approach to events.

