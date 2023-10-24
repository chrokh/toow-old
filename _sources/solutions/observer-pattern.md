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

# Solution: Observer pattern

## Challenge Answers

### Feature for clients to post messages back to the chat room

To allow clients to post messages, we can add a new method to the `ChatRoom` class named `ClientPostMessage`. This method will take in both the client's name (sender's name) and the message, and then broadcast this to all clients.

```csharp
public void ClientPostMessage(string clientName, string message)
{
   PostMessage($"{clientName}: {message}");
}
```

### Include the name of the sender in the broadcasted message

This was demonstrated in the method above. By including the client's name as a parameter and prefixing the message with it, we can indicate the sender of each message.

### Implementing a `BotClient`

A `BotClient` could be a special type of client that listens for specific keywords and responds automatically. Here's an example of how we could implement this:

```csharp
class BotClient : Client
{
   public override void OnNext(string message)
   {
       base.OnNext(message);

       // For simplicity, let's say the bot responds when it detects the word "hello".
       if (message.Contains("hello", StringComparison.OrdinalIgnoreCase))
           Console.WriteLine("Bot: Hello, how can I assist you?");
   }
}
```

Testing its integration:

```csharp
BotClient bot = new BotClient() { Name = "Bot" };
room.Subscribe(bot);

room.PostMessage("Hello, is there a bot here?");
```

## 🤔 Reflection

**Advantages of custom implementation:**

- Flexibility: You have complete control over the design and can easily adapt it to specific requirements.
- Semantics: Custom implementation allows for domain-specific method names that are semantically meaningful, making the codebase more intuitive and aligned with your application's domain. This can make the system easier to understand for both developers and stakeholders familiar with the domain.
- Simplicity: For simpler scenarios, a custom implementation might be more straightforward and less complex than the .NET built-in interfaces.

**Disadvantages of custom implementation:**

- Re-inventing the Wheel: You might be implementing functionality that's already provided by the .NET framework.
- Interoperability: Custom implementations might not be as interoperable with other .NET components and libraries as the built-in interfaces.

**Advantages of using .NET built-in interfaces:**

- Standardization: Using a standard approach can make it easier for other developers to understand and maintain the code.
- Interoperability: Built-in interfaces are designed to work seamlessly with other parts of the .NET ecosystem.
- Extendability: Libraries (such as Rx.NET) and components that support these interfaces can be easily integrated.

