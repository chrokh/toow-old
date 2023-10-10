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

# Lab: Events

## Objective
In this lab, we will refactor the provided chat room and client code that uses the Observer pattern into one that utilizes C#'s native event mechanism. By the end, we should have a better grasp of how events can replace and simplify certain observer scenarios in .NET.

## Provided Code
Carefully review the provided code. Notice that the `ChatRoom` class implements the `IObservable<string>` interface and maintains a list of observers. Each client, in turn, implements the `IObserver<string>` interface. When a message is posted in the chat room, all subscribed clients receive it. Clients can also leave the chat room by calling the `Dispose` method on their subscription.

```{code-cell}
class Client : IObserver<string>
{
    public string ClientName { get; set; }

    public void OnNext(string message)
        => Console.WriteLine($"{ClientName} received: {message}");

    public void OnError(Exception e)
        => Console.WriteLine($"{ClientName} experienced an error: {e.Message}");

    public void OnCompleted()
        => Console.WriteLine($"{ClientName} has left the chat room.");
}
```

```{code-cell}
class ChatRoom : IObservable<string>
{
    private List<IObserver<string>> observers = new List<IObserver<string>>();

    public IDisposable Subscribe(IObserver<string> observer)
    {
        if (!observers.Contains(observer))
            observers.Add(observer);

        return new Unsubscriber(observers, observer);
    }

    public void PostMessage(string message)
    {
        foreach (var observer in observers.ToArray())
            if (observers.Contains(observer))
                observer.OnNext(message);
    }

    private class Unsubscriber : IDisposable
    {
        private List<IObserver<string>> observers;
        private IObserver<string> observer;

        public Unsubscriber(List<IObserver<string>> observers, IObserver<string> observer)
        {
            this.observers = observers;
            this.observer = observer;
        }

        public void Dispose()
        {
            if (observer != null && observers.Contains(observer))
                observers.Remove(observer);
        }
    }
}
```

```csharp
ChatRoom room = new ChatRoom();

Client client1 = new Client() { ClientName = "Alice" };
Client client2 = new Client() { ClientName = "Bob" };

IDisposable aliceSubscription = room.Subscribe(client1);
IDisposable bobSubscription = room.Subscribe(client2);

room.PostMessage("Hello, world!");

// Simulate Alice leaving the chat room.
aliceSubscription.Dispose();

room.PostMessage("Is Alice still here?");
```

## Instructions

### Step 1: Introduce the `MessageEventArgs` class

We will start by creating a new class called `MessageEventArgs` which inherits from `EventArgs`. This class will contain a single property, `Message`, of type `string`.

```{code-cell}
public class MessageEventArgs : EventArgs
{
    public string Message { get; }

    public MessageEventArgs(string message)
    {
        Message = message;
    }
}
```

### Step 2: Replace Observer pattern with Event

Replace the `IObservable<string>` and `IObserver<string>` interfaces in `ChatRoom` and `Client` classes, respectively. Instead, we will declare an event in the `ChatRoom` class called `MessagePosted` of type `EventHandler<MessageEventArgs>`.

In the `ChatRoom` class, fire the event in the `PostMessage` method. In the `Client` class, we will register and unregister for this event, and handle messages using an event handler.

```{code-cell}
class Client
{
    public string ClientName { get; set; }

    public void HandleMessagePosted(object sender, MessageEventArgs e)
        => Console.WriteLine($"{ClientName} received: {e.Message}");
}
```

```{code-cell}
class ChatRoom
{
    public event EventHandler<MessageEventArgs> MessagePosted;

    public void PostMessage(string message)
        => MessagePosted?.Invoke(this, new MessageEventArgs(message));
}
```

### Step 3: Update Client Subscriptions

Adjust how the clients subscribe and unsubscribe from the chat room. Instead of the `Subscribe` method and `Dispose`, we will use `+=` to register for the event and `-=` to unregister.

```{code-cell}
ChatRoom room = new ChatRoom();

Client client1 = new Client() { ClientName = "Alice" };
Client client2 = new Client() { ClientName = "Bob" };

room.MessagePosted += client1.HandleMessagePosted;
room.MessagePosted += client2.HandleMessagePosted;

room.PostMessage("Hello, world!");

// Simulate Alice leaving the chat room.
room.MessagePosted -= client1.HandleMessagePosted;

room.PostMessage("Is Alice still here?");
```

```{admonition} 🤔 Reflection
Consider how the event-driven approach simplifies client subscriptions and the overall flow of the chatroom messaging process. What are the pros and cons of this approach compared to the Observer pattern?
```

## Challenge

1. How would you implement a feature for clients to post messages back to the chat room, which then gets broadcasted to all clients?
2. How could we include the name of the sender in the broadcasted message?
3. Add a new type of client, such as a `BotClient`, which automatically responds to certain keywords in the chat room. Implement this and test its integration.

```{admonition} 🤔 Reflection
Reflect on the ease of adding this feature now that we've switched to an event-driven model. Would it have been more complex with the original Observer pattern? Why or why not?
```

Happy coding!

