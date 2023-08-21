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

# Observer pattern

The Observer pattern is a foundational design pattern that lays the groundwork for many advanced programming concepts such as [events](events) and real-world applications. Have you ever wondered how certain parts of an application get notified when something else changes, without constantly checking that thing? The Observer pattern serves as the foundational mechanism behind such interactions.

```{admonition} Key point
The Observer pattern allows objects, termed 'observers', to listen for and be notified of changes in another object known as the 'observable' or the 'subject'.
```

## Intent

The intent of the Observer pattern is to:

```{epigraph}
Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

-- [Design Patterns: Elements of reusable object-oriented software](https://geni.us/PsXmo).
```

```{admonition} Video lecture
<iframe width="100%" height="315" src="https://www.youtube.com/embed/_BpmfnqjgzQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

## Structure

Let's explain using a real-world example. Think of a podcast app. When a new podcast episode is released, all subscribers are notified. In this analogy, the podcast is the 'observable' (also known as the 'subject'), and the subscribers are the 'observers'. Every subscriber (observer) gets notified (or gets the new podcast episode) whenever there's a change (new episode) in the podcast (the observable).

As depicted in the UML class diagram in {numref}`fig:observer-pattern`, the Observer pattern is comprised of a class that composes an interface of which there are several implementations.

```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Observer_w_update.svg/1280px-Observer_w_update.svg.png
:name: fig:observer-pattern

UML class diagram of observer pattern. [[Source](https://en.wikipedia.org/wiki/Observer_pattern#/media/File:Observer_w_update.svg)]
```

Let's interpret the UML class diagram in the context of our podcast example.

1. The podcast corresponds to the class on the right.
2. The interface on the left captures what it means to be a subscriber of the podcast.
3. The two classes that implement the interface on the left correspond to types of subscribers to the podcast such as a listener.

```{important}
The main advantage of the Observer pattern is its ability to promote [loose coupling](coupling) between objects. The observable doesn't need to know anything specific about its observers, and observers can be added or removed at run-time without affecting the observable's core functionality.
```

## Example

Let's look at the example that we discussed above in code.
Imagine that you're writing a simulation game where you the player can start new podcast that simulation inhabitants can subscribe to.

%The class `Podcast` will serve as the observable podcast that observers can observe.
%When the podcast releases a new episode it will notify all its observers.
%The observers must implement the interface `ISubscriber`.
%This interface will be implemented by a class that models the simulated listeners.

In the code below, `Podcast` is the observable that keeps a list of subscribers (observers). It has methods to add (`Subscribe`) or remove (`Unsubscribe`) subscribers. Whenever a new podcast episode is released (`ReleaseNewEpisode`), all subscribers are notified via their `Update` method.

The observer (`ISubscriber`) interface provides a contract for all concrete observers (like the `Listener` class). Every observer that implements this interface will have the `Update` method, which will be invoked when the subject notifies them.

```{code-cell}
// Observer
interface ISubscriber
{
    void Update(Podcast podcast);
}

// Observable
class Podcast
{
    private List<ISubscriber> subs = new List<ISubscriber>();

    public string Title { get; init; }

    public void Subscribe(ISubscriber subscriber)
        => subs.Add(subscriber);

    public void Unsubscribe(ISubscriber subscriber)
        => subs.Remove(subscriber);

    public void ReleaseNewEpisode()
    {
        // Additional episode-related code...

        notifySubs();
    }

    private void notifySubs()
    {
        foreach (var sub in subs)
            sub.Update(this);
    }
}

// An implementation of the Observer interface.
class Listener : ISubscriber
{
    public string Name { get; init; }

    public void Update(Podcast podcast)
        => Console.WriteLine($"Notification for {Name}: New episode of '{podcast.Title}'.");

    // Additional listener-related code...

}
```

Let's try this out in action.

```{code-cell}
// Create podcast.
Podcast podcast = new Podcast() { Title = "My First Million" };

// Create listeners.
Listener listener1 = new Listener() { Name = "Chamath" };
Listener listener2 = new Listener() { Name = "Friedberg" };

// Subscribe the listeners to the podcast.
podcast.Subscribe(listener1);
podcast.Subscribe(listener2);

// Release a new episode.
podcast.ReleaseNewEpisode();
```

What's the benefit of this design?
Adding new features to the `Podcast` or changing how a `Listener` responds does not affect each other as long as the contract `ISubscriber` is maintained.

```{seealso}
[Events](events), which we will talk about in a coming chapter, is essentially a native implementation of the Observer pattern.
```

A very common use case for the Observer pattern is user interfaces.
Imagine user interface elements like clickable buttons, scrollable text boxes, input text boxes, swipe:able content and so forth.
These elements can be viewed as observables that we can register observers to.

Imagine for example a submission form that you might see on a screen for registering a new user.
Every time you type a new character in the email-box, an observer might be notified that the contents of the box have changed. The observer can then check if the email you've entered for example looks like an email and either display a red cross mark or a green check mark to indicate to the end user that the email that they've entered is considered valid.

Similarly, when the user clicks the submit-button, an observer might receive a notification that the button has been clicked and in response collect the data that has been entered and create a new user account from it.

```{tip}
The ability of the Observer pattern to simplify the solutions to problems that are otherwise quite architecturally complicated should not be underestimated.
```

%The Observer pattern can be found in many real-world applications. GUI elements updating based on data changes, email systems that notify users of new emails, or financial systems that alert users about stock price changes all utilize this pattern.

## Built-in interfaces

Beyond traditional implementations, many modern frameworks offer native support for the Observer pattern.
In .NET we have two native implementations of the Observer pattern.
One is [events](Events) which we'll talk about in the next chapter.
The other is the `IObservable<T>` and `IObserver<T>` interfaces.

%Introduced as part of the Reactive Extensions (Rx), these interfaces offer a more structured approach to handle asynchronous data streams and their observers.

`IObservable<T>` is the counterpart of the 'observable' in our Observer pattern. It represents a provider of push-based notification, and its primary responsibility is to broadcast notifications to all its subscribers.
An object that implements `IObservable<T>` can produce a sequence of values over time and can signal its observers with new data, an error, or its completion.

On the flip side, `IObserver<T>` is the native representation of the observer. Objects that implement this interface can listen to an `IObservable<T>` and react to its notifications. The `IObserver<T>` interface includes three methods: `OnNext`, `OnError`, and `OnCompleted`. `OnNext` is called when there's new data to process and corresponds to the `Update` method discussed earlier in this chapter. `OnError` is triggered if there's an error in the data sequence, and `OnCompleted` is invoked once the data sequence completes and no more data is expected.

```{seealso}
Utilizing `IObservable<T>` and `IObserver<T>` in .NET not only adheres to the standard Observer pattern but also blends seamlessly with the rich ecosystem of [Reactive Extensions (Rx)](reactive). This allows developers to compose, transform, and query asynchronous data streams with more granular control and flexibility.
```

In essence, while the traditional Observer pattern offers a foundational concept, the .NET framework elevates it with native interfaces and tools, making it more powerful and suited for modern, asynchronous programming paradigms.

## Conclusion

In conclusion, the Observer pattern is one of the most versatile and essential patterns in object-oriented design.
In this chapter we've seen how .NET has ready made interfaces for dealing with observers and observables. In a coming chapter, we'll also explore how the observer pattern is also natively implemented in .NET through [events](events).

%As we venture further into design patterns and advanced concepts, understanding the core ideas behind the Observer pattern will provide a solid foundation for mastering more complex patterns and techniques.

