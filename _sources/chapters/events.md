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


%As mentioned in the chapter on [observer pattern](observer-pattern), events together with delegates are, in a sense, solving the same problem as the observer pattern.
%Events and delegates allow to subscribe to some event, and run some code as a consequence of that event occurring.

%1. Declare a delegate that will be used as the event handler.
%2. Declare an event.
%3. Raise the event somewhere.


# Events

Events, together with [delegates](delegates), essentially constitute a native implementation of the [Observer pattern](observer-pattern) in C#.
They provide a simple and built-in way to allow objects, known as publishers, to notify other objects, known as subscribers, of some event which allows the subscribers to execute code in response to the occurrence of the event.

```{admonition} Key points
- Events are built on top of [delegates](delegates).
- Events, together with delegates, is a native implementation of the [Observer pattern](observer-pattern).
```

Here's how to work with events in a nutshell:

1. Declare a delegate (that will be used as the event handler delegate).
2. Declare an event (whose subscribers must be values of the delegate).
3. Define methods whose signatures follows the delegate.
4. Subscribe the methods to the event.
5. Raise the event and watch the methods get executed one by one.

```{important}
Events are like observables and delegates are like observers.
```

%``{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1147519699530289183/chrokh_serene_illustration_of_a_radio_tower_cfecdc8e-3936-4763-bced-3224be82ac3f.png
%Just like a radio tower sends signals to multiple receivers, an event notifies multiple subscribers.
%``

```{figure} https://cdn.discordapp.com/attachments/1118630713084870736/1147524013703307345/chrokh_serene_illustration_of_fire_watch_tower_030a13f5-90ad-4e5f-8a73-5ff913174d54.png
Like a fire watch tower sending out smoke alerts, weather updates, or lightning strikes, events can send different kinds of data to subscribers when the event occurs.
```

## Relation to Observer pattern

Just like with the [Observer pattern](observer-pattern), an event in C# is a way for a class to provide notifications to clients of that class when some interesting activity happens or some state changes. The class that raises the event is known as the 'publisher', and the classes that handle the event are known as 'subscribers'.
In the [Observer pattern](observer-pattern) we call the publishers 'observables' or 'subjects' and the subscribers 'observers'.

```{note}
In events lingo we say that an event is 'raised', 'fired', or 'invoked'.
This corresponds to the state of the observable being updated in the [Observer pattern](observer-pattern).
The consequence in both cases is that we have to notify the subscribers or the observers.
```

%### Observer pattern recap
In the Observer pattern, the observable maintains a list of observers and notifies them of state changes, typically by calling one of their methods. The observable and observers are loosely coupled. The observable knows nothing about the observers, other than that they implement a particular interface.

When using events, the publisher has an event that we register subscribers to. They are loosely coupled since the only thing they know about each other is the signature of, what's known as the 'event handler delegate'.

```{note}
The method in a subscriber that is called when an event is fired is often called a 'listener'.
Subscribing to an event is therefore sometimes referred to as 'listening to an event'.
```

## Relation to delegates

As you know from the chapters on [Delegates](delegates), delegates allow us to treat methods as values that can be stored and passed around.
We've already learned that delegates essentially solve the same problem as the [Strategy pattern](strategy-pattern).
Since observers in the [Observer pattern](observer-pattern) are essentially equivalent to strategies in the [Strategy pattern](strategy-pattern), [delegates](delegates) in C# can effectively serve the same purpose.
In other words, when we have delegates, we don't need a special class or interface for observers.

Think about it, what do observers do?
When the observable is updated, a certain method in the observer is executed.
Observers, like strategies, are merely verbs turned into nouns.
Delegates is the most compact way of solving that problem in C#.

## Syntax

Let's look at the basic syntax of events.
We start by declaring a [delegate](delegate) whose instances will be the subscribers or observers of some event.

```{code-cell}
// Define a delegate that handlers of the event will use.
delegate void MyEventHandler(string message);
```

Let's then define a publisher, or in other words, an observable who can raise events.

```{code-cell}
class Publisher
{
    // Declare the event using the delegate.
    public event MyEventHandler MyEvent;

    // This is how the event is raised.
    public void RaiseEvent()
        => MyEvent?.Invoke("Event raised!");
}
```

The event is essentially a variable of a delegate type while the handler is essentially a method whose type signature matches that delegate.

```{note}
Event handlers are sometimes also called 'event listeners'.
```

```{note}
The question mark at the end of `MyEvent?` is the [null-conditional operator](null-conditional-operator) and has nothing specific to do with events or delegates.
Its purpose here is to avoid null reference [exceptions](exceptions) with as little [boilerplate](boilerplate) as possible.
```

## Basic example

Let's take an example involving podcasts and subscribers that get notified when new episodes are published.
Here's a definition of the `Podcast` class which will serve as the publisher.

```{code-cell}
class Podcast
{
    public string Title { get; private set; }

    public Podcast(string title) => Title = title;

    // The delegate used for event handlers.
    public delegate void EpisodeReleasedHandler(Podcast sender, string episodeTitle);

    // The dispatchable event that handlers can be registered to.
    public event EpisodeReleasedHandler EpisodeReleased;

    public void ReleaseNewEpisode(string episodeName)
    {
        // Some actual code for releasing the episode...
        EpisodeReleased?.Invoke(this, episodeName);
    }

    // More podcast and episode related logic...
}
```

Let's now define a method that we will register as an event handler.
In other words, a method that will be run when the event is raised.
Meaning, a subscriber.

```{code-cell}
class Subscriber
{
    public string Name { get; private set; }

    public Subscriber(string name)
        => Name = name;

    // This instance method will be our event handler.
    public void HandleNewEpisode(Podcast podcast, string episode)
        => Console.WriteLine($"New episode for \"{Name}\" in \"{podcast.Title}\": \"{episode}\"");
}
```

At this point the subscriber is not yet subscribed to the podcast.
For the subscriber to get notified when new episodes are added we must add the handler of an instance of `Subscriber` to the event in our instance of `Podcast`.

```{code-cell}
// A publisher
Podcast podcast = new Podcast("My pod");

// A subscriber who can subscribe to podcasts.
Subscriber subscriber = new Subscriber("Chris");

// Register the event handler to event (i.e. subscribe).
podcast.EpisodeReleased += subscriber.HandleNewEpisode;
```

```{hint}
Notice how we here make use of [multicast delegates](multicast-delegates) through the `+=` syntax.
```

Now that we've registered the subscriber's handler to the event, that method will be run when we fire the event.
Let's try it out by publishing a new episode which will fire the event.

```{code-cell}
// Raising the event invokes all subscribed handlers.
podcast.ReleaseNewEpisode("Episode A");
```

As discussed in the chapter on [multicast delegates](multicast-delegates), we can stack any number of callbacks in a delegate instance.
In the case of the [Observer pattern](observer-pattern) all our subscribers have to implement some interface (usually called `IObserver`), but in the case of events the only requirement is that the handler has the signature required by the event.

To exemplify that we don't even need a subscriber class, let's write some simple [local functions](local-functions) that we can use as event handlers.

```{code-cell}
// Simple local function that counts the number of episodes released.
int numEpisodesReleased = 0;
void IncrementNumEpisodesReleased(Podcast podcast, string episodeTitle)
    => numEpisodesReleased++;

// Simple local function that prints the number of episodes released.
void PrintNumEpisodesReleased(Podcast podcast, string episodeTitle)
    => Console.WriteLine($"{numEpisodesReleased} episodes released across all pods.");
```

Let's add the local functions as listeners to the event.

```{code-cell}
// Register the new event handler to the event (i.e. subscribe).
podcast.EpisodeReleased += IncrementNumEpisodesReleased;
podcast.EpisodeReleased += PrintNumEpisodesReleased;
```

What do you think happens if we now fire the event?

```{code-cell}
// Raise the event again a few times.
podcast.ReleaseNewEpisode("Episode B");
podcast.ReleaseNewEpisode("Episode C");
podcast.ReleaseNewEpisode("Episode D");
```

````{admonition} Question
Why does the output say that we've released 3 and not 4 episodes, even though we raised the event 4 times in total in this chapter?

```{admonition} Answer
:class: dropdown

The output says that we've released 3 and not 4 episodes because the event handler that counts releases was not listening to the event when the event was fired for the first time.
```
````

```{tip}
Events in C# can have modifiers such as `virtual`, `abstract`, `override`, `sealed`, `static`, and more. These can help you control, for example, how events are used in inherited classes.
```

## Conclusion

Events in C# elegantly solve the same problem as the [Observer pattern](observer-pattern). They enable an object (the publisher) to notify other objects (the subscribers) when something of interest occurs. By using events, which are built on top of delegates, you enable a clean separation of concerns, which results in more [maintainable](maintainable) code.

%Observer pattern is in a sense analogous to using [events](events) together with [delegates](delegates).
%The object that emits events is the observable, and the delegates are the observers.

```{seealso}
- [Delegates](delegates)
- [Observer pattern](observer-pattern)
```

By understanding events, [delegates](delegates) and the [Observer pattern](observer-pattern) in C#, you will have grasped the mechanics behind [event-based programming](event-based-programming) which is a powerful architecture that some even call its own [paradigm](paradigms).
You're also on your way to understand the [asynchronous programming model](async) which we'll talk about much later.

In the next chapter we'll talk about important [conventions](event-conventions) in C# related to events.

