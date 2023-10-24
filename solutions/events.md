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

# Solution: Events

## Reflection

- **Pros** of the event-driven approach:
  1. Simpler to understand and implement for .NET developers, as events are a native feature of C#.
  2. Less boilerplate code; no need for custom `Subscribe` and `Unsubscribe` methods.
  3. Clearer intent.
- **Cons:**
  1. Events are multicast, which might be overkill for some scenarios.
  2. Harder to implement advanced features such as filtering.

## Challenge

1. **Feature for clients to post messages back to the chat room:**
   - Add a `PostToRoom` method in the `Client` class that calls the `PostMessage` method of `ChatRoom`.

2. **Include the name of the sender in the broadcasted message:**
   - Modify the `MessageEventArgs` to include a `SenderName` property.
   - Modify the `ChatRoom.PostMessage` method to accept a sender and message.

3. **New type of client `BotClient`:**
   - Inherits from `Client` and overrides the `HandleMessagePosted` method to automatically respond to certain keywords.

Let's implement these:

```{code-cell}
class MessageEventArgs : EventArgs
{
    public string SenderName { get; }
    public string Message { get; }

    public MessageEventArgs(string senderName, string message)
    {
        SenderName = senderName;
        Message = message;
    }
}

class Client
{
    public string ClientName { get; set; }
    protected ChatRoom Chat;

    public void JoinRoom(ChatRoom room)
    {
        Chat = room;
        room.MessagePosted += HandleMessagePosted;
    }

    public void LeaveRoom()
    {
        Chat.MessagePosted -= HandleMessagePosted;
    }

    public virtual void HandleMessagePosted(object sender, MessageEventArgs e)
        => Console.WriteLine($"[{ClientName} received]: {e.SenderName}: {e.Message}");

    public void PostToRoom(string message)
    {
        Chat.PostMessage(ClientName, message);
    }
}

class BotClient : Client
{
    public override void HandleMessagePosted(object sender, MessageEventArgs e)
    {
        base.HandleMessagePosted(sender, e);

        if (e.Message.Contains("hello"))
        {
            PostToRoom("Hello, human!");
        }
    }
}

class ChatRoom
{
    public event EventHandler<MessageEventArgs> MessagePosted;

    public void PostMessage(string senderName, string message)
        => MessagePosted?.Invoke(this, new MessageEventArgs(senderName, message));
}
```

```{code-cell}
// Test
ChatRoom room = new ChatRoom();
Client client1 = new Client() { ClientName = "Alice" };
BotClient bot = new BotClient() { ClientName = "Bot123" };

client1.JoinRoom(room);
bot.JoinRoom(room);

client1.PostToRoom("Hello, world!");
bot.PostToRoom("How is everyone?");
client1.PostToRoom("hello");
```

**🤔 Reflection:**
Adding features using the event-driven model feels more integrated and native to C#. With the Observer pattern, adding new features might have required more manual setup, especially in broadcasting messages. The event-driven model is also more flexible, allowing for easy additions and modifications.

