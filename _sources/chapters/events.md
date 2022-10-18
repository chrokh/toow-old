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

# Events

```{warning}
Work in progress.
```

## Motivation

As mentioned in the chapter on [observer pattern](observer-pattern), events together with delegates are, in a sense, solving the same problem as the observer pattern.
Events and delegates allow to subscribe to some event, and run some code as a consequence of that event occurring.

%1. Declare a delegate that will be used as the event handler.
%2. Declare an event.
%3. Raise the event somewhere.



## Examples

### Observable ciphers

Let's take the example of generic observable ciphers from the chapter on [observer pattern](observer-pattern:generic-observable-ciphers) and reimplement it using events and delegates.

When using events and delegates our observers become delegates.
So let's start there.
Recall that we had three observers: `CipherViewer`, `CipherWriter`, and `CipherLog`.
But just as in the chapter on observer pattern that last observer is left as an exercise for you.

Let's use simple [local functions](local-functions) to build our two observables that can be stored in delegates.

```{code-cell} csharp
void printTranslation (string input, string output)
  => Console.WriteLine($"\"{input}\" was translated into \"{output}\"");

void writeTranslation (string input, string output)
  => Console.WriteLine("Writing encoded data to file...");
```

Ok, so what about the observable cipher?
Let's build that now.

```{code-cell} csharp
:tags: [hide-input]
interface ICipher<in TIn,out TOut>
{
  TOut Encode (TIn input);
}
```

```{code-cell} csharp
class ObservableCipher<TIn,TOut> : ICipher<TIn,TOut>
{
  // This corresponds to the IObservable interface in observer pattern.
  public delegate void EncodedEventHandler (TIn input, TOut output);

  // This corresponds to the subscribe/unsubscribe methods in the observer pattern.
  public event EncodedEventHandler Encoded;

  public ICipher<TIn,TOut> cipher;

  public ObservableCipher (ICipher<TIn,TOut> cipher)
    => this.cipher = cipher;

  public TOut Encode (TIn input)
  {
    TOut output = cipher.Encode(input); // Delegate the encoding of input.
    onEncoded(input, output);           // Raise event (i.e. notify subscribers).
    return output;
  }

  // This corresponds to the method that notifies all observers in the observer pattern.
  void onEncoded (TIn input, TOut output)
  {
    if (Encoded != null)
      Encoded(input, output);
  }
}
```

Let's now reintroduce our old Reverse cipher class so that we have an actual cipher to work with.

```{code-cell} csharp
class ReverseCipher : ICipher<string,string>
{
  public string Encode (string input)
  {
    string output = "";
    for (int i=input.Length-1; i>=0; i--)
      output += input[i];
    return output;
  }
}
```

Ok, now we are ready to create an instance of our observable cipher.

```{code-cell} csharp
ObservableCipher<string,string> observable
  = new ObservableCipher<string,string>(new ReverseCipher());
```

Let's now add our event handlers to the `Encoded` event.

```{code-cell} csharp
observable.Encoded += printTranslation;
observable.Encoded += writeTranslation;
```

All dressed up. It's time to go.
Let's now run the encode method in our observable cipher to see if our event handlers are fired off in order.

```{code-cell}
observable.Encode("ABC");
observable.Encode("123");
```

```{note}
What is this `+=` syntax used when adding the events?
Events in C# make use of [multi-cast delegates](delegates:multicast).
This allows us to add event handlers to the event by using the `+=` syntax.
```



## Exercises

```{exercise}
What are events and why are they useful?
```

```{exercise}
How are delegates used in events?
```

```{exercise}
It could be argued that events and delegates together solve the same problem as the observer pattern do.
How so?
```

```{exercise}
What is event-driven programming?
```

```{exercise-start}
```
Rewrite the observer `CipherLog` that we wrote in {numref}`ex:observer-pattern:cipher-log` as a method that we can add as an event handler to the event `Encoded` on instances of `ObservableCipher`.
```{code-cell} csharp
class CipherLog
{
  List<(string,string)> log = new List<(string,string)>();
  public void Update (string input, string output)
    => log.Add((input, output));
  public string ToTSV()
  {
    string output = "INPUT\tOUTPUT\n";
    foreach (var entry in log)
      output += $"{entry.Item1}\t{entry.Item2}\n";
    return output;
  }
}
```
```{code-cell} csharp
// Instantiate observable cipher.
ObservableCipher<string,string> observable
  = new ObservableCipher<string,string>(new ReverseCipher());

// Instantiate log that will observe.
CipherLog log = new CipherLog();

// Add the log's update method as an event handler.
observable.Encoded += log.Update;

// Run the encoding on the observable.
observable.Encode("abc");
observable.Encode("ABC");
observable.Encode("123");

// Print the log.
Console.WriteLine(log.ToTSV());
```
```{exercise-end}
```






```{exercise-start}
```
Instantiate two observable ciphers and call them `o1` and `o2`.
The first should wrap a reverse cipher and the other a Caesar cipher with steps set to 1.

Then instantiate two logs and call them `log1` and `log2`.
The first log should be updated whenever any of the two ciphers encode data.
The second log should only be updated when the first cipher encode data.

```{code-cell} csharp
:tags: [remove-input]
ObservableCipher<string,string> o1
  = new ObservableCipher<string,string>(new ReverseCipher());
ObservableCipher<string,string> o2
  = new ObservableCipher<string,string>(new ReverseCipher());

CipherLog log1 = new CipherLog();
CipherLog log2 = new CipherLog();

o1.Encoded += log1.Update;
o1.Encoded += log2.Update;
o2.Encoded += log1.Update;
```

Then encode the following data using the first observable:

```{code-cell} csharp
o1.Encode("abc");
o1.Encode("ABC");
```

And the following input using the second observable:

```{code-cell} csharp
o2.Encode("123");
o2.Encode("987");
```

If you've followed these instructions precisely, then `log1` should report the following when we print it:

```{code-cell} csharp
Console.WriteLine(log1.ToTSV());
```

However `log2` should only contain the following:

```{code-cell} csharp
Console.WriteLine(log2.ToTSV());
```
Bonus question: Why is the output of the two logs different?
```{exercise-end}
```

