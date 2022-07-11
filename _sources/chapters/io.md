(io)=
# I/O

- Console I/O
- File I/O
  - Very brief introduction since we haven't learned about classes yet.
- Give very brief introduction to the fact that there are more examples of I/O, such as:
  - HTTP requests.
  - TCP/IP Sockets.
  - Windows Forms
- Include Standard in / standard out?
- Include command line arguments?


```csharp
Console.WriteLine("What's your name?");
string input = Console.ReadLine();
Console.Write("Hello, ");
Console.WriteLine(input);
```

```output
What's your name?
>Chris█
Hello, Chris
```


```csharp
var message = "Hello";
Console.WriteLine(message);
```

- Put “hello world” in a variable and read it from the user.

```output
Hello, Chris
```

```csharp
Console.WriteLine("What's your name?");
string input = Console.ReadLine();
Console.Write("Hello, ");
Console.WriteLine(input);
```

```output
What's your name?
>Chris█
Hello, Chris
```
