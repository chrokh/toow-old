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

```{warning}
Work in progress.
```

## Definition

The definition of the observer pattern from the classic design patterns book {cite:t}`gammaEtAl1995` is as follows:

```{epigraph}
Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

-- {cite:t}`gammaEtAl1995`
```

% TODO: Replace image.
```{figure} https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Observer_w_update.svg/1280px-Observer_w_update.svg.png

UML class diagram of observer pattern.
*[Image will be replaced soon]* [[Image source](https://en.wikipedia.org/wiki/Observer_pattern#/media/File:Observer_w_update.svg)]
```

Observer pattern is in a sense analogous to using [events](events) together with [delegates](delegates).
The object that emits events is the observable, and the delegates are the observers.
We'll talk more about this when we get to the chapter on [events](events).


## Examples

### Observable ciphers

Suppose that we've defined a cipher that takes a really long time to execute.
I let the cipher run on my machine over the night and when it's completed I want to write the resulting output to screen *and* to a file.

While we could certainly do this by simply taking the output from the encode method and writing it to file and to screen.
However, we could also think about this problem in terms of events and notifications.
We want a notification from a cipher when the encoding is completed so that we can do whatever it is we want to do with the output.

Let's try to solve this using the observer pattern.
Assume that we've got our good old `ICipher<TIn,TOut>` interface.

```{code-cell} csharp
interface ICipher<TIn,TOut>
{
  TOut Encode (TIn input);
}
```

Let's then introduce interfaces for the idea of being an observer and that of being an observable.

Our observers are simply required to implement a method called `Update` which takes two strings as arguments.
This method will be called on all observers whenever the observable that they observe have completed its encoding.
The first string parameter represents the input value that was sent to the Encode method and the second represents the output value.

```{code-cell} csharp
interface ICipherObserver
{
  void Update (string input, string output);
}
```

What about the observable cipher?
What does its interface look like?
Well, at the very least, we must be able to register observers to it.
Let's call the method `Add` and let's stop there for now.

```{code-cell} csharp
interface IObservableCipher
{
  void Add (ICipherObserver observer);
}
```

So what might observers look like?
Remember what we said that we wanted to do?
We wanted to write the result of the encoding both to screen and to file.
Let's first build an observer that writes to screen:

```{code-cell} csharp
class CipherViewer : ICipherObserver
{
  public void Update(string input, string output)
    => Console.WriteLine($"\"{input}\" was translated into \"{output}\"");
}
```

Let's now implement an observer that writes to file.
But, since we don't actually care about file writing in this example, let's just wave our hands and pretend that it writes to file.

```{code-cell} csharp
class CipherWriter : ICipherObserver
{
  public void Update(string input, string output)
    => Console.WriteLine("Writing encoded data to file...");
}
```

At least we've got two observers now.
But what about an observable?
Our observers don't yet have anything to observe.
Let's write an observable cipher.
For the purposes of this example it doesn't at all matter what the encode method of the cipher does.
For this reason we'll let the cipher behave like the identity cipher.
Meaning that it returns whatever input we give it back as output.

```{code-cell} csharp
class ObservableCipher : ICipher<string,string>
{
  List<ICipherObserver> observers = new List<ICipherObserver>();

  public void Add (ICipherObserver observer)
    => observers.Add(observer);

  public string Encode (string input)
  {
    System.Threading.Thread.Sleep(2000); // Delay to simulate slow cipher.
    string output = input; // Encode logic here.
    notify(input, output);
    return output;
  }

  void notify (string input, string output)
  {
    foreach (ICipherObserver observer in observers)
      observer.Update(input, output);
  }
}
```

Let's now see all this in action.
First we instantiate the observable.

```{code-cell} csharp
ObservableCipher observable = new ObservableCipher();
```

Then we register any number of observables that we want.

```{code-cell} csharp
observable.Add(new CipherViewer());
observable.Add(new CipherWriter());
```

Then we simply call `Encode` on the observable cipher and watch as the observers get notified about the change and then go on to do their thing.

```{code-cell} csharp
observable.Encode("foobar");
```

Notice how the `Update` method of both observers is executed.
Notice also how we don't actually need to store the return value of the call to the method `Encode`.


(observer-pattern:generic-observable-ciphers)=
### Generic observable ciphers

As you might have suspected however, most of the code in `ObservableCipher` will have to be duplicated as soon as we want to be able to create a new observable cipher.
Such as an observable Caesar cipher, or observable Robbers cipher, etc.
Also, why did we couple to ciphers that take and return strings?
What if we want to observe ciphers that work with single characters?

Can we get rid of that duplicated code by means of inheritance?
Sure, we might be able to do that.
But remember the idea of favoring [composition over inheritance](composition-over-inheritance)?
Remember the [strategy pattern](strategy-pattern)?
Remember [abstract injected object composition](abstract-injected-object-composition)?
Let's use composition and separate the responsibility of being observable from that of translating some input to some output.

Our ciphers of type `ICipher<TIn,TOut>` are already very good at translating from input to output so let's let them keep doing that.
Let's instead write a new observable cipher class that's generic and that has a cipher.
How does the cipher end up in the observable cipher?
Good old [abstract injected object composition](abstract-injected-object-composition).

But let's start by generalizing the observer interface.

```{code-cell} csharp
interface ICipherObserver<TIn,TOut>
{
  void Update (TIn input, TOut output);
}
```

Most code will essentially be the same as before.
We're mostly just replacing actual types with type parameters.

Of course our cipher observers presume that the cipher that they are observing will generate strings as output, based on strings as input so we'll have to say that they implement the interface `ICipherObserver<string,string>`.

```{code-cell} csharp
class CipherViewer : ICipherObserver<string,string>
{
  public void Update(string input, string output)
    => Console.WriteLine($"\"{input}\" was translated into \"{output}\"");
}

class CipherWriter : ICipherObserver<string,string>
{
  public void Update(string input, string output)
    => Console.WriteLine("Writing encode data to file...");
}
```

We're now ready to generalize the observable cipher.
Notice how we're now both generalizing the observable cipher so that it uses two type parameters, but also how we're now accepting another cipher in the constructor.
When the encode method of the observable cipher is called, it delegates to the composed cipher and notifies all observers.
We've now separated the two concerns.
The observable cipher delegates the actual encoding to the composed cipher, but is itself responsible for notifying the observers when the encoding is completed.

```{code-cell} csharp
class ObservableCipher<TIn,TOut> : ICipher<TIn,TOut>
{
  ICipher<TIn,TOut> cipher;
  List<ICipherObserver<TIn,TOut>> observers = new List<ICipherObserver<TIn,TOut>>();

  public ObservableCipher (ICipher<TIn,TOut> cipher)
    => this.cipher = cipher;

  public void Add (ICipherObserver<TIn,TOut> observer)
    => observers.Add(observer);

  public TOut Encode (TIn input)
  {
    TOut output = cipher.Encode(input);  // Delegate the encoding of input.
    notify(input, output);               // Notify all observers.
    return output;
  }

  void notify (TIn input, TOut output)
  {
    foreach (ICipherObserver<TIn,TOut> observer in observers)
      observer.Update(input, output);
  }
}
```

Let's bring back the Reverse cipher so that we can run an example with a cipher that's more interesting than the identity cipher.
%Let's bring back the Caesar cipher so that we can run an example with a cipher that's more interesting than the identity cipher.
%We'll also have to bring in the classes `SubstitutionCipher` and `CharToStringAdapter` to enable us to encode full strings.

```{code-cell} csharp
:tags: [hide-input]
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

Ok, let's now run it to make sure that it works.

```{code-cell} csharp
// Instantiate observable cipher.
ObservableCipher<string,string> observable
  = new ObservableCipher<string,string>(new ReverseCipher());

// Instantiate and add observables.
observable.Add(new CipherViewer());
observable.Add(new CipherWriter());

// Run the encoding on the observable.
observable.Encode("abc");
```


%### Observing key-presses
%
%SIMPLIFIERA DETTA OCH SEPARERA PRINTING IFRPN OBSERVERS.
%TÄNK snarare att en observer subtyp är ett EncodedMessage och den andra typen är en Display. Injecta sedan in alla messages i Display:en innan vi startar vår key stream.
%
%```{code-cell} csharp %KeyObservable keyObservable = new KeyObservable();
%keyObservable.Add(new ScreenClearer());
%keyObservable.Add(new CipherPrinter(" IDENTITY", new IdentityCipher<string>()));
%keyObservable.Add(new CipherPrinter("  ROBBERS", new SubstitutionCipher(new RobbersCipher('o'))));
%keyObservable.Add(new CipherPrinter("CAESAR(2)", new SubstitutionCipher(new CaesarCipher(2))));
%
%while (true)
%{
%  keyObservable.PressKey(Console.ReadKey().KeyChar);
%}
%
%class KeyObservable
%{
%  List<IKeyObserver> observables = new List<IKeyObserver>();
%
%  public void Add (IKeyObserver observer)
%    => observables.Add(observer);
%
%  public void PressKey (char key)
%  {
%    Notify(key);
%  }
%
%  public void Notify (char key)
%  {
%    foreach (IKeyObserver obs in observables)
%      obs.Update(key);
%  }
%}
%
%interface IKeyObserver
%{
%  void Update (char input);
%}
%
%class CipherPrinter : IKeyObserver
%{
%  string name;
%  ICipher<string,string> cipher;
%  string input = "";
%
%  public CipherPrinter (string name, ICipher<string,string> cipher)
%  {
%    this.name = name;
%    this.cipher = cipher;
%  }
%
%  public void Update (char key)
%  {
%    input += key;
%    Console.WriteLine(name + ": " + cipher.Encode(input));
%  }
%}
%
%class ScreenClearer : IKeyObserver
%{
%  public void Update (char input)
%    => Console.Clear();
%}
%
%interface ICipher<in TIn, out TOut>
%{
%  public TOut Encode(TIn input);
%}
%
%class IdentityCipher<T> : ICipher<T,T>
%{
%  public T Encode (T input) => input;
%}
%
%class RobbersCipher : ICipher<char,string>
%{
%  private char vowel;
%
%  public RobbersCipher (char vowel)
%    => this.vowel = vowel;
%
%  public string Encode (char input)
%  {
%    string consonants = "BCDFGHJKLMNPQRSTVXYZ";
%    if (consonants.IndexOf(Char.ToUpper(input)) != -1)
%      return $"{input}{vowel}{input}";
%    else
%      return $"{input}";
%  }
%}
%
%class CaesarCipher : ICipher<char,char>
%{
%  int steps;
%
%  public CaesarCipher (int steps)
%    => this.steps = steps;
%
%  public char Encode (char input)
%  {
%    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
%    int i = alphabet.IndexOf(Char.ToUpper(input));
%    int newIndex = (i + steps) % alphabet.Length;
%    if (i != -1)
%    {
%      if (newIndex < 0)
%        newIndex += alphabet.Length;
%
%      if (Char.IsLower(input))
%        return Char.ToLower(alphabet[newIndex]);
%      else
%        return alphabet[newIndex];
%    }
%    return input;
%  }
%}
%
%class SubstitutionCipher : ICipher<string,string>
%{
%  ICipher<char,string> cipher;
%
%  public SubstitutionCipher (ICipher<char,string> cipher)
%    => this.cipher = cipher;
%
%  public SubstitutionCipher (ICipher<char,char> cipher)
%    => this.cipher = new CharToStringAdapter(cipher);
%
%  public string Encode (string input)
%  {
%    string output = "";
%    foreach (char c in input)
%      output += cipher.Encode(c);
%    return output;
%  }
%}
%
%class CharToStringAdapter : ICipher<char,string>
%{
%  ICipher<char,char> cipher;
%
%  public CharToStringAdapter (ICipher<char,char> cipher)
%    => this.cipher = cipher;
%
%  public string Encode (char input)
%    => cipher.Encode(input).ToString();
%}
%```



## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/_BpmfnqjgzQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Exercises

```{exercise}
What is the observer pattern?
Explain it in your own words and by using an example.
```

```{exercise}
Come up with your own example that meaningfully uses the observer pattern and implement it in code.
```

```{exercise}
What do we mean when we say that observer pattern replaces "polling" with "pushing", from the perspective of the observer?
```

```{exercise}
How are the [maintainability characteristics](maintainability:characteristics) affected when using the observer pattern?
```

```{exercise-start}
:label: ex:observer-pattern:cipher-log
```
Write a class called `CipherLog` that implements the interface `ICipherObserver<string,string>` from this chapter.
The observer should log the input and output of all completed encode operations.
You can choose to log the translations any way you like, but I would suggest a simple list of `(string,string)` tuples.
It should also expose a method with the signature `string ToTSV()` or `string ToCSV()` that returns a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) or [TSV](https://en.wikipedia.org/wiki/Tab-separated_values) formatted string of the full log.
%In the example below I've opted to separate columns with comma (`,`) and rows with semi-colon (`;`).

The completed class should behave like in the example below.

```{code-cell} csharp
:tags: [remove-input]
class CipherLog : ICipherObserver<string,string>
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

// Add the log as an observable.
observable.Add(log);

// Run the encoding on the observable.
observable.Encode("abc");
observable.Encode("ABC");
observable.Encode("123");

// Print the log.
Console.WriteLine(log.ToTSV());
```
```{exercise-end}
```


% TODO: Observable keystream exercise. Useful when trying to understand reactive programming.
%```{exercise-start}
%Write an observable with an instance method that accepts keystrokes.
%
%Observable
%```
%```{code-cell} csharp
%interface IKeyLogger
%{
%  void Add (ICipherDisplay display);
%  void AddChar (char input);
%  void Clear ();
%}
%
%interface IVisualCipher {
%  // If the update method is called Encode then this is basically a cipher?! :O
%  string Encode (string input);
%}
%```
%```{exercise-end}
%```
%
