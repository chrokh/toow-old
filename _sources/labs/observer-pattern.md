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


# Lab: Observer Pattern

## Objective

In this lab, we'll practice the Observer pattern by building a chat room application. The chat room will notify its registered clients every time a new message is posted.

## Part 1: Custom Implementation

### Step 1: Creating our Observer: IClient

Define the observer interface `IClient` which should contain a `ReceiveMessage` method. The chat room will call this method to notify clients of a new message.

```{code-cell}
interface IClient
{
    void ReceiveMessage(string message);
}
```

### Step 2: Creating our Observable: ChatRoom

Design the `ChatRoom` class, which will act as our Observable. This class should have:

- A private list to keep track of registered clients (observers).
- A method to post a new message.
- Methods to add (`RegisterClient`) and remove (`UnregisterClient`) clients.
- A method to notify all registered clients of a new message.

```{code-cell}
class ChatRoom
{
    private List<IClient> clients = new List<IClient>();

    public void RegisterClient(IClient client)
        => clients.Add(client);

    public void UnregisterClient(IClient client)
        => clients.Remove(client);

    public void PostMessage(string message)
    {
        NotifyClients(message);
    }

    private void NotifyClients(string message)
    {
        foreach (var client in clients)
            client.ReceiveMessage(message);
    }
}
```

### Step 3: Implementing a Concrete Observer: Client

Implement a concrete observer, `Client`, which implements the `IClient` interface. When it receives a message update, it should display the new message.

```{code-cell}
class Client : IClient
{
    public string Name { get; set; }

    public void ReceiveMessage(string message)
        => Console.WriteLine($"{Name} received: {message}");
}
```

### Step 4: Testing the Custom Implementation

Test the interaction:

- Instantiate a `ChatRoom`.
- Register a couple of `Client` instances with the chat room.
- Post a new message using the `PostMessage` method and observe the notifications.

```{code-cell}
ChatRoom room = new ChatRoom();

Client client1 = new Client() { Name = "Alice" };
Client client2 = new Client() { Name = "Bob" };

room.RegisterClient(client1);
room.RegisterClient(client2);

room.PostMessage("Hello, world!");
```

## Part 2: Refactoring with .NET Built-in Interfaces

Of course! Let's dive into the details for refactoring with .NET's built-in interfaces for the Observer pattern.

### Step 1: Refactor ChatRoom to use IObservable<T>

1. Update the `ChatRoom` class to implement `IObservable<string>`.

2. Instead of our custom list of clients (`IClient`), we will use a list of `IObserver<string>`.

3. The `IObservable<T>` interface requires an implementation of the `Subscribe` method which replaces our `RegisterClient` method. The `Subscribe` method will return an `IDisposable`, which can be used to unsubscribe or unregister a client from the chat room.

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

### Step 2: Refactor IClient to use IObserver<T>

1. Update the `IClient` interface to extend `IObserver<string>`. The `IObserver<T>` interface has three methods: `OnNext`, `OnError`, and `OnCompleted`. For our chat room application, we will mainly focus on the `OnNext` method which is invoked to provide the subscribed observer with new data (in our case, new chat messages).

2. Implement the `IObserver<string>` interface in our `Client` class.

```{code-cell}
class Client : IObserver<string>
{
    public string Name { get; set; }

    public void OnNext(string message)
        => Console.WriteLine($"{Name} received: {message}");

    public void OnError(Exception e)
        => Console.WriteLine($"{Name} experienced an error: {e.Message}");

    public void OnCompleted()
        => Console.WriteLine($"{Name} has left the chat room.");
}
```

### Step 3: Testing the Refactored Implementation

6. Test the refactored chat room application.

```{code-cell}
ChatRoom room = new ChatRoom();

Client client1 = new Client() { Name = "Alice" };
Client client2 = new Client() { Name = "Bob" };

IDisposable aliceSubscription = room.Subscribe(client1);
IDisposable bobSubscription = room.Subscribe(client2);

room.PostMessage("Hello, world!");

// Simulate Alice leaving the chat room.
aliceSubscription.Dispose();

room.PostMessage("Is Alice still here?");
```

By following these steps, we've successfully refactored our custom chat room application to use the built-in `IObservable<T>` and `IObserver<T>` interfaces from .NET. This provides a standardized way of implementing the Observer pattern and may offer better interoperability with other .NET components and libraries.

## Challenge

1. How would you implement a feature for clients to post messages back to the chat room, which then gets broadcasted to all clients?
2. How could we include the name of the sender in the broadcasted message?
3. Add a new type of client, such as a `BotClient`, which automatically responds to certain keywords in the chat room. Implement this and test its integration.

```{admonition} 🤔 Reflection
Reflect on the difference between implementing the Observer pattern using custom interfaces versus using the built-in .NET interfaces. What are the advantages and disadvantages of each approach?
```

